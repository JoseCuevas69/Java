USE [FcaCajas]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT016SPC]    Script Date: 29/08/2022 09:55:22 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 17/12/2021
-- Description:	Modulo Cat. Desperdicios
-- =============================================
CREATE PROCEDURE [dbo].[FCAPRODCAT016SPC] @Opcion INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@DescripcionDesperdicio varchar(100) = NULL
	,@ZonaId CHAR(2) = NULL
	,@AplicaImpresora bit  = NULL
	,@AplicaCorrugadora bit  = NULL
	,@AplicaAcabado bit  = NULL
	,@AplicaRecuperacionCaja bit  = NULL

AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [dbo].[FCAPRODCAT016]
		WHERE  [DescripcionDesperdicio] LIKE '%' + ISNULL(@DescripcionDesperdicio, '') +'%'
			AND ([AplicaImpresora] = ISNULL(@AplicaImpresora, [AplicaImpresora]) 
			AND [AplicaCorrugadora] = ISNULL(@AplicaCorrugadora, [AplicaCorrugadora])
			AND [AplicaAcabado] = ISNULL(@AplicaAcabado, [AplicaAcabado])
			AND [AplicaRecuperacionCaja] = ISNULL(@AplicaRecuperacionCaja, [AplicaRecuperacionCaja])) AND
			EsActivo = 1 AND ZonaId= @ZonaId

		SELECT [IdDesperdicio]
			  ,[DescripcionDesperdicio]
			  ,[AplicaImpresora]
			  ,[AplicaCorrugadora]
			  ,[AplicaAcabado]
			  ,[AplicaRecuperacionCaja]
			  ,[EsActivo]
		FROM [dbo].[FCAPRODCAT016] t1
		WHERE [DescripcionDesperdicio] LIKE '%' + ISNULL(@DescripcionDesperdicio, '') +'%'
			AND ([AplicaImpresora] = ISNULL(@AplicaImpresora, [AplicaImpresora]) 
			AND [AplicaCorrugadora] = ISNULL(@AplicaCorrugadora, [AplicaCorrugadora])
			AND [AplicaAcabado] = ISNULL(@AplicaAcabado, [AplicaAcabado])
			AND [AplicaRecuperacionCaja] = ISNULL(@AplicaRecuperacionCaja, [AplicaRecuperacionCaja])) AND
			EsActivo = 1 AND ZonaId= @ZonaId
		ORDER BY [idDesperdicio] OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END

END
