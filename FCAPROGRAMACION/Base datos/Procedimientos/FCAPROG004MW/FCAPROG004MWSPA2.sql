USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG004MWSPA2]    Script Date: 24/03/2022 12:27:59 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 23/12/2021
-- Description:	CAPTURA MEDIDAS DE HOJA 
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG004MWSPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@ClaveArticulo VARCHAR(12) = NULL
	,@AnchoHoja real = NULL
	,@LargoHoja real = NULL
	,@ConScore bit = NULL
	,@PiezasXHoja decimal(4,1) = NULL
	,@PzasxLargo decimal(5,2) = NULL
	,@PzasxAncho decimal(5,2) = NULL
	,@AumLargo decimal(5,2) = NULL
    ,@AumAncho decimal(5,2) = NULL
	,@SoloLamina bit = NULL
AS	   
BEGIN
	IF @Opcion = 1
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM fcaCajas01..FCAVENTDAT035
				WHERE [ClaveArticulo] = @ClaveArticulo
					AND L_Largo = 0
					AND L_Ancho = 0
				) > 0
		BEGIN
			UPDATE FCAVENTDAT035
			SET L_Largo = @LargoHoja
				,L_Ancho = @AnchoHoja
			WHERE [ClaveArticulo] = @ClaveArticulo
				AND L_Largo = 0
				AND L_Ancho = 0
		END

		UPDATE FCAVENTCAT023
		SET [largohoja] = @LargoHoja 
			,[anchohoja] = @AnchoHoja 
			,piezasxhoja = @piezasxhoja
			,[PzasxLargo] = @PzasxLargo
			,[PzasxAncho] = @PzasxAncho
			,[AumLargo] = @AumLargo
			,[AumAncho] = @AumAncho
			,[ConScore] = @ConScore
			,[SoloLamina] = @SoloLamina
		WHERE [clavearticulo] = @ClaveArticulo
	END
END
