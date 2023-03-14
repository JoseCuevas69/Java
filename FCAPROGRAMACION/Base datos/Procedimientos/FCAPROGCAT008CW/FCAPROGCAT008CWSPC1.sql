USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT008CWSPC1]    Script Date: 26/03/2022 08:03:42 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Higuera
-- Create date: 21/11/2021
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT008CWSPC1]
	-- Add the parameters for the stored procedure here
	@Opcion AS INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@ClaveMaquina NVARCHAR(5)=null
	,@TipoValidacion CHAR(5)=NULL
	,@Rango INT = NULL,
	@Proceso INT = NULL
AS
BEGIN
	
	DECLARE @TotalRegistros INT

	IF @Opcion= 1
	BEGIN
		
		SELECT @TotalRegistros= COUNT(*)
		FROM FCAPROGCAT008 A 
		JOIN FCAPROGCAT011 B ON A.Tproceso=B.Tproceso
		WHERE A.Estatus=0 AND A.ClaveMaquina LIKE '%'+ISNULL(@ClaveMaquina,A.ClaveMaquina)+ '%'

		SELECT ClaveMaquina,Troquela,b.descripcion as Proceso,[Default] FROM FCAPROGCAT008 A 
		JOIN FCAPROGCAT011 B ON A.Tproceso=B.Tproceso
		WHERE A.Estatus=0 AND A.ClaveMaquina LIKE '%'+ISNULL(@ClaveMaquina,A.ClaveMaquina)+ '%'
		ORDER BY ClaveMaquina OFFSET @startRow ROWS
		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros AS TotalRegistros
	END
	
	IF @Opcion=2
	BEGIN
		
		--SELECT @TotalRegistros=COUNT(*) FROM FCACAJAS..FCAPRODDAT003 WHERE ClaveMaquina=@ClaveMaquina AND Estatus=0
		--AND ZonaId= RIGHT(DB_NAME(),2)

		SELECT ID,RInicial,RFinal,Desperdicio FROM FCACAJAS..FCAPRODDAT003 WHERE ClaveMaquina=@ClaveMaquina AND Estatus=0
		AND ZonaId= RIGHT(DB_NAME(),2)
		ORDER BY RInicial,RFinal
		--OFFSET @startRow ROWS
		--FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		--SELECT @TotalRegistros AS TotalRegistros

	END
	IF @Opcion=3
	BEGIN
		SELECT TProceso,Descripcion FROM FCAPROGCAT011 WHERE Estatus=0
	END
	IF @Opcion=4
	BEGIN
		SELECT 0 AS CodEvaluacion ,'Ninguno' AS Nombre
		UNION
		SELECT CodEvaluacion,Nombre FROM FCAPROGCAT012 WHERE Estatus=0 order by CodEvaluacion
	END
	IF @Opcion=5
	BEGIN
		SELECT IdTripulacion,RTRIM(Nombre) AS Nombre FROM FCAPRODCAT008 WHERE Estatus=0 ORDER BY IdTripulacion
	END
	IF @Opcion=6
	BEGIN
		SELECT A.IdTripulacion,RTRIM(A.Nombre) AS Nombre FROM FCAPRODCAT008 A
		INNER JOIN FCAPRODDAT005 B ON A.IdTripulacion=B.idTripulacion
		WHERE A.Estatus=0 AND B.Estatus=0 AND B.ClaveMaquina=ISNULL(@ClaveMaquina,-1) ORDER BY a.IdTripulacion
	END
	IF @Opcion = 7
	BEGIN
		SELECT TipoMaquina,ClaveMaquina,Nombre,Troquela,TintasMax,AnchoMax,AnchoMaxT,AnchoMaxAlt,AnchoMin,LargoMax,LargoMaxT,LargoMin,CostoMinuto,CapacidadSemanal,SalariosTurno,M2Hora,Eficiencia,[Default],Tproceso,CAST(RTRIM(CodEvaluacion) AS INT) AS CodEvaluacion,MinStd,TurnosxDia,EvaluaMtto,PorcenEvaluaMtto,Desp1000,Desp10000,DespMayor10000 FROM FCAPROGCAT008
		WHERE ClaveMaquina=@ClaveMaquina  AND Estatus=0
	END
	IF @Opcion=8
	BEGIN
	 DECLARE @Resultado bit =0		
		IF EXISTS(SELECT TOP 1 ClaveMaquina FROM FCAPROGCAT008 A JOIN FCAPROGCAT011 B ON A.Tproceso=B.TProceso
		WHERE A.Estatus=0 AND [Default]=1 AND A.ClaveMaquina<>@ClaveMaquina AND A.Tproceso=@Proceso)
		BEGIN
			SELECT @Resultado= 1 
		END
		ELSE
		BEGIN
			SELECT @Resultado=0 
		END
		SELECT @Resultado AS Resultado

	END

	IF @Opcion= 9 
	BEGIN
		DECLARE @Puestos AS TABLE (NombreMaquina VARCHAR(40),DescripcionPuestos VARCHAR(40),PersonasRequeridas INT)
		INSERT @Puestos
		SELECT DISTINCT  C.Nombre AS NombreMaquina, B.Nombre AS DescripcionPuesto, A.PersonasRequeridas
		FROM FCAPRODCAT009 A  
		INNER JOIN Capacitacion01..Puestos B ON A.CvePuesto=B.Puesto  
		INNER JOIN FCAPROGCAT008 C ON RTRIM(LTRIM(A.CveMaquina))=C.[ClaveMaquina]  
		INNER JOIN (SELECT 0 AS CveArea, 'General' AS Area  
					 Union All  
					 SELECT A.Clave AS CveArea,A.Nombre AS Area FROM Capacitacion01..Areas A) D ON A.CveArea=D.CveArea  
		WHERE CveMaquina=@ClaveMaquina
		AND CASE WHEN A.CveArea=0 THEN A.CveArea ELSE  B.Area END=D.CveArea 
		

		SELECT @TotalRegistros= COUNT(*)   FROM @Puestos 

		SELECT * FROM @Puestos
		ORDER BY NombreMaquina OFFSET @startRow ROWS
		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros AS TotalRegistros

	END
	IF @Opcion=10
	BEGIN	
		DECLARE @Resultados INT = 0
		IF EXISTS(SELECT  ClaveMaquina FROM FCAPROGCAT008 WHERE ClaveMaquina=@ClaveMaquina)
		BEGIN
			SELECT @Resultados= CASE WHEN Estatus=1THEN 1 ELSE 2 END FROM FCAPROGCAT008  WHERE ClaveMaquina=@ClaveMaquina
		END
		ELSE
		BEGIN
			SELECT @Resultados=0 
		END
		SELECT @Resultados AS Resultado

	END
END
