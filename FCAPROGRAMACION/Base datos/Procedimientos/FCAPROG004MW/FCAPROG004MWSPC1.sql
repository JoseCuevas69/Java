USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG004MWSPC1]    Script Date: 24/03/2022 12:27:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 21/12/2021
-- Description:	TABLA CAPTURA MEDIDAS DE HOJA 
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG004MWSPC1] @Opcion INT
	,@ClaveArticulo VARCHAR(12) = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		SELECT PiezasXHoja
			,t2.claveDiseno
			,[largohoja] 
			,[anchohoja] 
			,piezasxhoja 
			,[PzasxLargo] 
			,[PzasxAncho]
			,[AumLargo]
			,[AumAncho]
			,[ConScore] 
			,[SoloLamina]
		FROM FCAVENTCAT023 t1
		INNER JOIN FCAVENTCAT034 t2 ON t1.TipoCaja = t2.IdTipoCaja
		WHERE ClaveArticulo = @ClaveArticulo
	END
END
