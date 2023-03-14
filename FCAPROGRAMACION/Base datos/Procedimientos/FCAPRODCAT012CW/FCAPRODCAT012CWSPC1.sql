USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT012CWSPC1]    Script Date: 24/03/2022 10:39:13 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 15/12/2021
-- Description:	Modulo Cat. de paros
-- =============================================
ALTER PROCEDURE [dbo].[FCAPRODCAT012CWSPC1] @Opcion INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@Filtro VARCHAR(100) = NULL
	,@TipoMaquina VARCHAR(13) = NULL
	,@Estatus BIT = 1
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [FcaCajas01].[dbo].[FCAPRODCAT012]
		WHERE TipoMaquina = ISNULL(@TipoMaquina, TipoMaquina)
			AND Estatus = CASE 
				WHEN @Estatus = 2
					THEN Estatus
				ELSE @Estatus
				END

		SELECT [ClaveParo]
			,[TipoParo]
			,TRIM([TipoParoValida]) AS TipoParoValida
			,[TipoMaquina]
			,[AplicaPareto]
			,[DescuentoIndicador]
			,[Observaciones]
			,[Autoriza]
			,[EsProgramado]
			,[Estatus]
		FROM [dbo].[FCAPRODCAT012]
		WHERE TipoMaquina = ISNULL(@TipoMaquina, TipoMaquina)
			AND Estatus = CASE 
				WHEN @Estatus = 2
					THEN Estatus
				ELSE @Estatus
				END
		ORDER BY [ClaveParo] OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END -- Paros Grid

	IF @Opcion = 2
	BEGIN
		SELECT [ClaveParo]
			,TRIM([TipoParo]) AS TipoParo
			,TRIM([TipoParoValida]) AS TipoParoValida
			,[TipoMaquina]
			,[AplicaPareto]
			,[DescuentoIndicador]
			,[Observaciones]
			,[Autoriza]
			,[EsProgramado]
			,[Estatus]
		FROM [dbo].[FCAPRODCAT012]
	END -- Paros Reporte
END
