USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG008MWSPC1]    Script Date: 26/03/2022 09:38:35 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Higuera
-- Create date: 26/03/2022
-- Description:	Sp que utiliza FCAPROG008MW
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG008MWSPC1]
	-- Add the parameters for the stored procedure here
	@Opcion AS INT
	,@ClaveProceso AS CHAR(3) = NULL
	,@startRow INT = 0
	,@endRow INT = NULL
	,@Zona CHAR(2)=NULL
AS
BEGIN
	DECLARE @TotalRegistros INT
	IF @Opcion=1
	BEGIN
		SELECT @TotalRegistros=COUNT(*) FROM FCAPROGCAT015 WHERE Estatus=1

		SELECT Clave,Descripcion FROM FCAPROGCAT015 WHERE Estatus=1 
		order by Clave ASC OFFSET @startRow ROWS
		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros AS TotalRegistros
	END
	IF @Opcion=2
	BEGIN
		SELECT TProceso,Descripcion FROM FCAPROGCAT011 WHERE Estatus=0 ORDER BY TProceso
	END
	IF @Opcion=3
	BEGIN
		SELECT TipoMaquina, claveProceso , MaquinaOrden, Mx2, Pegar FROM FCAPROGDAT019 WHERE Estatus=1 AND ClaveProceso=@ClaveProceso
	END
	IF @Opcion=4
	BEGIN
		SELECT b.Descripcion as DescripcionRP, a.ClaveProceso, a.TipoMaquina, c.Descripcion as DescripcionCP  
		FROM FCAPROGDAT019 A 
		JOIN FCAPROGCAT015 B ON A.ClaveProceso = B.Clave  
		JOIN FCAPROGCAT011 C ON A.TipoMaquina = c.tProceso  
		WHERE  A.Estatus =1 and B.Estatus = 1 
		ORDER BY A.ClaveProceso, A.TipoMaquina
	END
END
