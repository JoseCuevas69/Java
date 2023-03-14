USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT010CWSPC1]    Script Date: 24/03/2022 10:36:29 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 25/11/2021
-- Description:	CATALOGO DE TIPO CAJA
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT010CWSPC1] @Opcion INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@Filtro VARCHAR(100) = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [FcaCajas01].[dbo].[FCAPROGCAT010]
		WHERE (
				ClaveDiseno LIKE '%' + @filtro + '%'
				OR Descripcion LIKE '%' + @filtro + '%'
				)
			AND Estatus = 1

		SELECT [IdTipoCaja]
			,[ClaveDiseno]
			,[Descripcion]
			,[Estatus]
			,[FechaBaja]
			,[RegExporta]
			,[PermiteCotDirecta]
			,[ConSuaje]
			,[FraccionArancelaria]
		FROM [FcaCajas01].[dbo].[FCAPROGCAT010]
		WHERE (
				ClaveDiseno LIKE '%' + @filtro + '%'
				OR Descripcion LIKE '%' + @filtro + '%'
				)
			AND Estatus = 1
		ORDER BY [ClaveDiseno] OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END
END
