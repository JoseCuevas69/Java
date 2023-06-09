USE [FcaCajas]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT011SPC1]    Script Date: 29/08/2022 09:31:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 09/12/2021
-- Description:	Modulo Cat. Desperdicios
-- =============================================
CREATE PROCEDURE [dbo].[FCAPRODCAT011SPC1] @Opcion INT
	,@startRow INT = 0
	,@endRow INT = NULL
	,@ClaveArea VARCHAR(3) = NULL
	,@ClaveCargo VARCHAR(2) = NULL
	,@ClaveDesperdicio VARCHAR(3) = NULL
	,@EsAreaCaptura BIT = NULL
	,@ZonaId CHAR(2) = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		SELECT TRIM([ClaveArea]) AS ClaveArea
			, TRIM([ClaveCargo]) AS ClaveCargo
			,TRIM(t1.[ClaveDesperdicio]) AS ClaveDesperdicio
			,CONCAT(t1.ClaveDesperdicio , '-') AS NombreDesperdicio
			,CONCAT(t1.ClaveCargo ,' - ', t3.Nombre) AS NombreCargo
			,CONCAT(t1.ClaveArea ,' - ', t4.Nombre) AS NombreArea
			,[Balance]
			,t1.[EsActivo]
			,[ObjetivoEst]
			,[ObjetivoMax]
		FROM [dbo].[FCAPRODCAT011] t1
		LEFT JOIN [dbo].[FCAPRODCAT014] t3 ON t3.Clave = t1.ClaveCargo AND t3.ZonaId = @ZonaId
		LEFT JOIN [dbo].[FCAPRODCAT014] t4 ON t4.Clave = t1.ClaveArea AND t4.ZonaId = @ZonaId
		WHERE
			 t1.[ClaveDesperdicio] = ISNULL(@ClaveDesperdicio, t1.[ClaveDesperdicio])
			AND t1.EsActivo = 1 AND t1.ZonaId = @ZonaId
		ORDER BY [ClaveDesperdicio]

	END

	IF @Opcion = 2
	BEGIN
		SELECT DISTINCT TRIM(a.[clavedesperdicio]) AS clavedesperdicio
			,a.Descripcion
		FROM [dbo].[FCAPRODCAT013] a
		LEFT JOIN [FcaCajas01].[dbo].[FCAPRODCAT011] b ON b.[Clavedesperdicio] = a.[clavedesperdicio]
		WHERE a.EsActivo = 1 AND ZonaId = @ZonaiD

	END

	IF @Opcion = 3
	BEGIN
		SELECT TRIM([Clave]) AS Clave
			,[Nombre]
			,[EsActivo]
			,[Filtro]
			,[FechaBaja]
		FROM [dbo].[FCAPRODCAT014]
		WHERE [EsActivo] = 1
			AND Filtro in (CASE 
				WHEN 1 = @EsAreaCaptura
					THEN ('A')
				ELSE ('C')
				END, 'T') 
			AND ZonaId = @ZonaiD
	END
END
