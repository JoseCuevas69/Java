USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT011SPC1]    Script Date: 24/03/2022 10:45:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 09/12/2021
-- Description:	Modulo Cat. Desperdicios
-- =============================================
ALTER PROCEDURE [dbo].[FCAPRODCAT011SPC1] @Opcion INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@ClaveArea VARCHAR(3) = NULL
	,@ClaveCargo VARCHAR(2) = NULL
	,@ClaveDesperdicio VARCHAR(3) = NULL
	,@EsAreaCaptura BIT = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		SELECT @TotalRegistros = COUNT(*)
		FROM [FcaCajas01].[dbo].[FCAPRODCAT011]
		WHERE [ClaveArea] = ISNULL(@ClaveArea, [ClaveArea])
			AND [ClaveCargo] = ISNULL(@ClaveCargo, [ClaveCargo])
			AND [ClaveDesperdicio] = ISNULL(@ClaveDesperdicio, [ClaveDesperdicio])
			AND Estatus = 1

		SELECT TRIM([ClaveArea]) AS ClaveArea
			, TRIM([ClaveCargo]) AS ClaveCargo
			,TRIM(t1.[ClaveDesperdicio]) AS ClaveDesperdicio
			,CONCAT(t1.ClaveDesperdicio ,' - ', t2.Descripcion) AS NombreDesperdicio
			,CONCAT(t1.ClaveCargo ,' - ', t3.Nombre) AS NombreCargo
			,CONCAT(t1.ClaveArea ,' - ', t4.Nombre) AS NombreArea
			,[Balance]
			,t1.[Estatus]
			,[ObjetivoEst]
			,[ObjetivoMax]
		FROM [FcaCajas01].[dbo].[FCAPRODCAT011] t1
		LEFT JOIN [FcaCajas01].[dbo].[FCAPRODCAT013] t2 ON t2.ClaveDesperdicio = t1.ClaveDesperdicio
		LEFT JOIN [FcaCajas01].[dbo].[FCAPRODCAT014] t3 ON t3.Clave = t1.ClaveCargo
		LEFT JOIN [FcaCajas01].[dbo].[FCAPRODCAT014] t4 ON t4.Clave = t1.ClaveArea
		WHERE [ClaveArea] = ISNULL(@ClaveArea, [ClaveArea])
			AND [ClaveCargo] = ISNULL(@ClaveCargo, [ClaveCargo])
			AND t1.[ClaveDesperdicio] = ISNULL(@ClaveDesperdicio, t1.[ClaveDesperdicio])
			AND t1.Estatus = 1
		ORDER BY [ClaveDesperdicio] OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros TotalRegistros
	END

	IF @Opcion = 2
	BEGIN
		SELECT DISTINCT TRIM(a.[clavedesperdicio]) AS clavedesperdicio
			,a.Descripcion
		FROM [FcaCajas01].[dbo].[FCAPRODCAT013] a
		LEFT JOIN [FcaCajas01].[dbo].[FCAPRODCAT011] b ON b.[Clavedesperdicio] = a.[clavedesperdicio]
		WHERE a.estatus = 1
	END

	IF @Opcion = 3
	BEGIN
		SELECT TRIM([Clave]) AS Clave
			,[Nombre]
			,[Estatus]
			,[Filtro]
			,[FechaBaja]
		FROM [FcaCajas01].[dbo].[FCAPRODCAT014]
		WHERE Estatus = 1
			AND Filtro in (CASE 
				WHEN 1 = @EsAreaCaptura
					THEN ('A')
				ELSE ('C')
				END, 'T')
	END
END
