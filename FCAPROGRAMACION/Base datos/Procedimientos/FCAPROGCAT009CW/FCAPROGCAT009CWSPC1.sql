USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT009CWSPC1]    Script Date: 24/03/2022 10:09:34 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 25/11/2021
-- Description:	CATALOGO DE PROCESOS
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT009CWSPC1] @Opcion INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@Filtro VARCHAR(100) = NULL
	,@TipoMaquina NVARCHAR(2) = NULL
	,@Estatus INT = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [FcaCajas01].[dbo].[FCAPROGCAT009]
		WHERE TipoMaquina = ISNULL(@TipoMaquina, TipoMaquina)
			AND (
				ClaveProceso LIKE '%' + @filtro + '%'
				OR Descripcion LIKE '%' + @filtro + '%'
				)
			AND Estatus = CASE 
				WHEN @Estatus = 2
					THEN Estatus
				ELSE @Estatus
				END

		SELECT [TipoMaquina]
			,[ClaveProceso]
			,[Descripcion]
			,[Estatus]
			,[Tratamiento]
			,ISNULL(TRIM ([SubProceso]),'') AS SubProceso
			,ISNULL(TRIM ([Tintas]), '') AS Tintas
			,[ConSuaje]
		FROM [FcaCajas01].[dbo].[FCAPROGCAT009]
		WHERE TipoMaquina = ISNULL(@TipoMaquina, TipoMaquina)
			AND (
				ClaveProceso LIKE '%' + @filtro + '%'
				OR Descripcion LIKE '%' + @filtro + '%'
				)
			AND Estatus = CASE 
				WHEN @Estatus = 2
					THEN Estatus
				ELSE @Estatus
				END
		ORDER BY [ClaveProceso] OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END -- Proceso 

	IF @Opcion = 2
	BEGIN
		SELECT [TipoMaquina]
			,[Proceso]
			,[SubProceso]
		FROM [FcaCajas01].[dbo].[FCAPROGCAT013] WHERE TipoMaquina = ISNULL(@TipoMaquina,TipoMaquina)
	END -- Proceso por Tipo Maquina 
	IF @Opcion = 3
	BEGIN
		SELECT [IdTipoMaquina]
			,[Nombre]
		FROM [FcaCajas01].[dbo].[FCAPROGCAT014] WHERE Estatus = 1 
	END -- Tipo Maquina
END
