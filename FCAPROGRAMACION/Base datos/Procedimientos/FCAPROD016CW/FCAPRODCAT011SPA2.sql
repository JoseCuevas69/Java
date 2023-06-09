USE [FcaCajas]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT011SPA2]    Script Date: 29/08/2022 09:31:13 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 11/12/2021
-- Description:	Modulo Cat. Desperdicios
-- =============================================
CREATE PROCEDURE [dbo].[FCAPRODCAT011SPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@ZonaId CHAR(2)
	,@ClaveArea VARCHAR(3) = NULL
	,@ClaveCargo VARCHAR(2) = NULL
	,@ClaveDesperdicio VARCHAR(3) = NULL
	,@Balance BIT = NULL
	,@ObjetivoEst INT = Null
	,@ObjetivoMax INT = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM [dbo].[FCAPRODCAT011]
				WHERE [Clavearea] = @ClaveArea
					AND [Clavedesperdicio] = @ClaveDesperdicio
					AND [Clavecargo] = @ClaveCargo
					AND EsActivo = 1 AND
					ZonaId= @ZonaId
				) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPRODCAT011] (
				[ZonaId],
				[ClaveArea]
				,[ClaveCargo]
				,[ClaveDesperdicio]
				,[Balance]
				,[EsActivo]
				,[ObjetivoEst]
				,[ObjetivoMax]
				,[FechaInsert]
				,[UsuarioInsert]
				)
			VALUES (
				@ZonaId,
				@ClaveArea
				,@ClaveCargo
				,@ClaveDesperdicio
				,@Balance
				,1
				,@ObjetivoEst
				,@ObjetivoMax
				,GETDATE()
				,@Usuario
				)
		END
		ELSE
		BEGIN
			RAISERROR (
					'Ya Existe Esta Combinacion'
					,11
					,1
					)
		END
	END

	IF @Opcion = 2
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM [dbo].[FCAPRODCAT011]
				WHERE [Clavearea] = @ClaveArea
					AND [Clavedesperdicio] = @ClaveDesperdicio
					AND [Clavecargo] = @ClaveCargo
					AND EsActivo = 1 AND [ZonaId] = @ZonaId
				) = 0
		BEGIN
			UPDATE [dbo].[FCAPRODCAT011]
			SET [ClaveArea] = @ClaveArea
				,[ClaveCargo] = @ClaveCargo
				,[ClaveDesperdicio] = @ClaveDesperdicio
				,[Balance] = @Balance
				,[ObjetivoEst] = @ObjetivoEst
				,[ObjetivoMax] = @ObjetivoMax
				,[FechaUpdate] = GETDATE()
				,[UsuarioUpdate] = @Usuario
				,[FechaDelete] = GETDATE()
				,[UsuarioDelete] = @Usuario
			WHERE [Clavearea] = @ClaveArea
				AND [Clavedesperdicio] = @ClaveDesperdicio
				AND [Clavecargo] = @ClaveCargo
				AND EsActivo = 1 AND [ZonaId] = @ZonaId
		END
		ELSE
		BEGIN
			RAISERROR (
					'Ya Existe Esta Combinacion'
					,11
					,1
					)
		END
	END

	IF @Opcion = 3
	BEGIN
		UPDATE [dbo].[FCAPRODCAT011]
		SET [EsActivo] = 0
			,[FechaDelete] = GETDATE()
			,[UsuarioDelete] = @Usuario
		WHERE [Clavearea] = @ClaveArea
			AND [Clavedesperdicio] = @ClaveDesperdicio
			AND [Clavecargo] = @ClaveCargo
			AND EsActivo = 1
			AND [ZonaId] = @ZonaId
	END
END
