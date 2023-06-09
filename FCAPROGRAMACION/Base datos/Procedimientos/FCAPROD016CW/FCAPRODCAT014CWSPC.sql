USE [FcaCajas]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT014CWSPC]    Script Date: 29/08/2022 09:30:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 12/08/2022
-- Description:	Catalogo de Area Desperdicios
-- =============================================
CREATE PROCEDURE [dbo].[FCAPRODCAT014CWSPC]
	 @Opcion INT 
	,@startRow INT = 0
	,@endRow INT = NULL
	,@ZonaId VARCHAR(2)
	,@Desperdicio VARCHAR(30)
AS
BEGIN
	DECLARE @TotalRegistros INT 
	IF @Opcion = 1
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [dbo].[FCAPRODCAT014]
		WHERE (Nombre LIKE '%'+ ISNULL(@Desperdicio, '') + '%'
			OR [Clave] = ISNULL(@Desperdicio, [Clave]))
			AND EsActivo = 1 AND
			ZonaId = @ZonaId

		SELECT Clave
			,TRIM(Nombre) AS Nombre
			,Filtro
			,[EsActivo]
		FROM [dbo].[FCAPRODCAT014] t1
		WHERE (Nombre LIKE '%'+ ISNULL(@Desperdicio, '') + '%'
			OR [Clave] = ISNULL(@Desperdicio, [Clave]))
			AND EsActivo = 1 AND
			ZonaId = @ZonaId
		ORDER BY Clave OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END 
END
