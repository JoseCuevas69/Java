USE [FCACAJAS]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT016SPA]    Script Date: 30/08/2022 10:20:11 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 17/12/2021
-- Description:	Modulo Cat. Desperdicios
-- =============================================
CREATE PROCEDURE [dbo].[FCAPRODCAT016SPA] @Opcion INT
	,@Usuario CHAR(6),
	@ZonaId CHAR(2)
	,@DescripcionDesperdicio varchar(100) = NULL
	,@AplicaImpresora bit  = NULL
	,@AplicaCorrugadora bit  = NULL
	,@AplicaAcabado bit  = NULL
	,@AplicaRecuperacionCaja bit  = NULL
	,@tblConfigDesperdicio FCAPRODCAT011TD001 readonly
	,@IdDesperdicio INT  = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	DECLARE @ErrorMessage VARCHAR(100)
	DECLARE @ErrorSeverity VARCHAR(100)
	DECLARE @ErrorState VARCHAR(100)
	IF @Opcion = 1
	BEGIN
	BEGIN TRY
		BEGIN TRANSACTION
			
			INSERT INTO [dbo].[FCAPRODCAT016]
				   (
				   [ZonaId],
				   [DescripcionDesperdicio]
				   ,[AplicaImpresora]
				   ,[AplicaCorrugadora]
				   ,[AplicaAcabado]
				   ,[AplicaRecuperacionCaja]
				   ,[EsActivo]
				   ,[FechaInsert]
				   ,[UsuarioInsert])
			 VALUES
				   (
				   @ZonaId
				   ,@DescripcionDesperdicio
				   , @AplicaImpresora
				   , @AplicaCorrugadora
				   , @AplicaAcabado
				   , @AplicaRecuperacionCaja
				   , 1
				   , GETDATE()
				   ,@Usuario)

			SET @IdDesperdicio = (SELECT IDENT_CURRENT('FCAPRODCAT016'))

			INSERT INTO [dbo].[FCAPRODCAT011] (
				[ClaveArea]
				,[ClaveCargo]
				,[ClaveDesperdicio]
				,[Balance]
				,[EsActivo]
				,[ObjetivoEst]
				,[ObjetivoMax]
				,[FechaInsert]
				,[UsuarioInsert]
				,[ZonaId]
				)
			SELECT  
				ClaveArea
				,ClaveCargo
				,@IdDesperdicio
				,Balance
				,1
				,ObjetivoEst
				,ObjetivoMax
				,GETDATE()
				,@Usuario
				,@ZonaId
				FROM @tblConfigDesperdicio

		COMMIT
	END TRY

	BEGIN CATCH
		ROLLBACK TRANSACTION

		DECLARE @dba_1 AS VARCHAR(20) = (
					SELECT DB_NAME()
					)

			SELECT @ErrorMessage = ERROR_MESSAGE()
				,@ErrorSeverity = ERROR_SEVERITY()
				,@ErrorState = ERROR_STATE()

			RAISERROR (
					@ErrorMessage
					,@ErrorSeverity
					,@ErrorState
					)

		EXEC Sistemas..ASSSP101 @dba_1
	END CATCH
	END

	IF @Opcion = 2
	BEGIN
	BEGIN TRY
		BEGIN TRANSACTION
			UPDATE [dbo].[FCAPRODCAT016]
			   SET
				ZonaId= @ZonaId
				,[DescripcionDesperdicio] = @DescripcionDesperdicio
				  ,[AplicaImpresora] = @AplicaImpresora
				  ,[AplicaCorrugadora] = @AplicaCorrugadora
				  ,[AplicaAcabado] = @AplicaAcabado
				  ,[AplicaRecuperacionCaja] = @AplicaRecuperacionCaja
				  ,[FechaUpdate] = GETDATE()
				  ,[UsuarioUpdate] = @Usuario
			 WHERE IdDesperdicio = @IdDesperdicio

			 MERGE [dbo].[FCAPRODCAT011] AS TARGET
				USING @tblConfigDesperdicio AS SOURCE
					ON (
							TARGET.ClaveArea = SOURCE.ClaveArea
							AND TARGET.ClaveCargo = SOURCE.ClaveCargo
							AND TARGET.ClaveDesperdicio = @IdDesperdicio
							AND TARGET.ZonaId=  @ZonaId
							)
				WHEN MATCHED AND TARGET.ClaveArea = SOURCE.ClaveArea AND TARGET.ClaveCargo = SOURCE.ClaveCargo AND TARGET.ClaveDesperdicio = @IdDesperdicio AND TARGET.EsActivo = 1 AND  TARGET.ZonaId = @ZonaId
				THEN  UPDATE SET TARGET.ObjetivoEst = SOURCE.ObjetivoEst,TARGET.ObjetivoMax = SOURCE.ObjetivoMax,TARGET.Balance = SOURCE.Balance , TARGET.FechaUpdate = GETDATE(),TARGET.UsuarioUpdate = @Usuario
				WHEN NOT MATCHED BY TARGET
					THEN
						INSERT (
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
							@ZonaId
							,SOURCE.ClaveArea
							,SOURCE.ClaveCargo
							,@IdDesperdicio
							,SOURCE.Balance
							,1
							,SOURCE.ObjetivoEst
							,SOURCE.ObjetivoMax
							,GETDATE()
							,@Usuario
							)
				WHEN NOT MATCHED BY SOURCE
					AND TARGET.ClaveDesperdicio = @IdDesperdicio
					THEN
						UPDATE
						SET TARGET.EsActivo = 0
							,TARGET.FechaDelete = GETDATE()
							,TARGET.UsuarioDelete = @Usuario;

		COMMIT
	END TRY

	BEGIN CATCH
		ROLLBACK TRANSACTION

		DECLARE @dba_2 AS VARCHAR(20) = (
					SELECT DB_NAME()
					)

			SELECT @ErrorMessage = ERROR_MESSAGE()
				,@ErrorSeverity = ERROR_SEVERITY()
				,@ErrorState = ERROR_STATE()

			RAISERROR (
					@ErrorMessage
					,@ErrorSeverity
					,@ErrorState
					)

		EXEC Sistemas..ASSSP101 @dba_1
	END CATCH
		
	END

	IF @Opcion = 3
	BEGIN
			UPDATE [dbo].[FCAPRODCAT016]
			   SET [EsActivo] = 0
				  ,[FechaDelete] = GETDATE()
				  ,[UsuarioDelete] = @Usuario
			 WHERE IdDesperdicio = @IdDesperdicio
			 AND ZonaId = @ZonaId

			 UPDATE [dbo].[FCAPRODCAT011]
			   SET [EsActivo] = 0
				  ,[FechaDelete] = GETDATE()
				  ,[UsuarioDelete] = @Usuario
			 WHERE	ClaveDesperdicio = @IdDesperdicio
			 AND ZonaId = @ZonaId
	END
END
