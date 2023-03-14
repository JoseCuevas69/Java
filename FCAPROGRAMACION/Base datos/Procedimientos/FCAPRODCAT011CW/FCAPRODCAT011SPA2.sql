USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT011SPA2]    Script Date: 24/03/2022 10:46:28 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 11/12/2021
-- Description:	Modulo Cat. Desperdicios
-- =============================================
ALTER PROCEDURE [dbo].[FCAPRODCAT011SPA2] @Opcion INT
	,@Usuario VARCHAR(6)
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
					AND estatus = 1
				) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPRODCAT011] (
				[ClaveArea]
				,[ClaveCargo]
				,[ClaveDesperdicio]
				,[Balance]
				,[Estatus]
				,[ObjetivoEst]
				,[ObjetivoMax]
				,[FechaInsert]
				,[UsuarioInsert]
				)
			VALUES (
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
					AND estatus = 1
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
				AND estatus = 1
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
		SET [Estatus] = 0
			,[FechaDelete] = GETDATE()
			,[UsuarioDelete] = @Usuario
		WHERE [Clavearea] = @ClaveArea
			AND [Clavedesperdicio] = @ClaveDesperdicio
			AND [Clavecargo] = @ClaveCargo
			AND estatus = 1
	END
END
