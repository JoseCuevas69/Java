USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROD002MWSPC1]    Script Date: 26/03/2022 09:23:06 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Higuera
-- Create date: 26/03/2022
-- Description:	Sp utilizado en FCAPROD002MW - Estandares de impresoras
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROD002MWSPC1] 
	-- Add the parameters for the stored procedure here
	@Opcion AS INT,
	@TipoMaquina AS CHAR(2)=NULL,
	@ClaveMaquina AS NVARCHAR(10)=NULL,
	@ClaveArea AS CHAR(2)=NULL,
	@Turno AS CHAR(1)=NULL
	,@startRow INT = 0
	,@endRow INT = NULL

AS
BEGIN
	DECLARE @TotalRegistros INT
	IF @Opcion=1 
	BEGIN
		SELECT ClaveMaquina,Nombre FROM FCAPROGCAT008 WHERE TipoMaquina=@TipoMaquina and Estatus=0 ORDER BY ClaveMaquina
	END
	IF @Opcion=2
	BEGIN
		SELECT @TotalRegistros=COUNT(*)
		FROM FCAPRODDAT007 A
		INNER JOIN FCAPROGCAT009 B ON A.ClaveProceso=B.ClaveProceso AND B.Estatus=1
		WHERE A.ClaveMaquina=@ClaveMaquina AND A.TipoMaquina=@TipoMaquina AND A.Estatus=1

		SELECT A.ClaveMaquina,B.ClaveProceso,B.Descripcion,A.TiempoStd,A.Eficiencia,A.VelocidadObjetivo 
		FROM FCAPRODDAT007 A
		INNER JOIN FCAPROGCAT009 B ON A.ClaveProceso=B.ClaveProceso AND B.Estatus=1
		WHERE A.ClaveMaquina=@ClaveMaquina AND A.TipoMaquina=@TipoMaquina AND A.Estatus=1
		ORDER BY A.ClaveProceso OFFSET @startRow ROWS
		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros AS TotalRegistros
	END
	IF @Opcion=3
	BEGIN
		SELECT A.ClaveProceso,A.Descripcion FROM FCAPROGCAT009 A 
		WHERE A.Estatus=1 
		AND A.ClaveProceso NOT IN (SELECT B.ClaveProceso FROM FCAPRODDAT007 B WHERE A.ClaveProceso=B.ClaveProceso AND B.ClaveMaquina=@ClaveMaquina AND B.Estatus=1)
		AND A.TipoMaquina=@TipoMaquina
	END
	IF @Opcion=4
	BEGIN
		SELECT Eficiencia FROM FCAPROGCAT008 WHERE ClaveMaquina=@ClaveMaquina
	END
	IF @Opcion=5
	BEGIN
		SELECT @TotalRegistros=COUNT( *) FROM FCAPRODDAT009 WHERE ClaveMaquina=@ClaveMaquina and Estatus=1

		SELECT ClaveMaquina,AreaInicial,AreaFinal,VelocidadStd FROM FCAPRODDAT009 WHERE ClaveMaquina=@ClaveMaquina and Estatus=1
		ORDER BY AreaInicial OFFSET @startRow ROWS
		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros AS TotalRegistros
	END
	IF @Opcion = 6
	BEGIN
		SELECT HoraInicio,HoraFinal,Turno,Descripción AS Descripcion ,ClaveMaquina,ClaveArea FROM FCAPRODCAT015 WHERE ClaveArea=@ClaveArea AND  ClaveMaquina=@ClaveMaquina AND Estatus=1 AND Aplica=1 AND Turno=@Turno
	END
END
