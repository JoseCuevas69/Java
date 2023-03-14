USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT004CWSPC1]    Script Date: 24/03/2022 10:25:36 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V
-- Create date: 02/12/2021
-- Description:	Catálogo Combinaciones de papel
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT004CWSPC1] @Opcion INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@Filtro VARCHAR(100) = NULL
	,@TipoPapel Nvarchar(1) = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [FcaCajas01].[dbo].[FCAPROGCAT004]
		WHERE Clave LIKE '%' + @Filtro + '%'
		AND Estatus = 1

		SELECT [Clave]
			,[Presentacion]
			,[Liner1]
			,[Medium1]
			,[Liner2]
			,[Medium2]
			,[Liner3]
			,[Medium3]
			,[Liner4]
			,[PrimeraFlauta]
			,[SegundaFlauta]
			,[TerceraFlauta]
			,[PesoM2]
			,[Descripcion]
			,[Estatus]
			,[ClaveIngles]
			,[Mullen]
		FROM [FcaCajas01].[dbo].[FCAPROGCAT004]
		WHERE Clave LIKE '%' + @Filtro + '%'
		AND Estatus = 1
		ORDER BY [Clave] OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END -- Combinaciones

	IF @Opcion = 2
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [FcaCajas01].[dbo].[FCAPROGCAT002]
		WHERE (
				[Clavepapel] LIKE '%' + @Filtro + '%'
				OR Nombre LIKE '%' + @Filtro + '%'
				)
			AND [Tipopapel] = ISNULL(@TipoPapel,[Tipopapel])
			AND STATUS = 0

		SELECT [Clavepapel] AS Clavepapel
			,Nombre
			,[Tipopapel] AS TipoPapel
		FROM [FcaCajas01].[dbo].[FCAPROGCAT002]
		WHERE (
				[Clavepapel] LIKE '%' + @Filtro + '%'
				OR Nombre LIKE '%' + @Filtro + '%'
				)
			AND [Tipopapel] = ISNULL(@TipoPapel,[Tipopapel])
			AND STATUS = 0
		ORDER BY [Clavepapel] OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END -- Papel
	
END
