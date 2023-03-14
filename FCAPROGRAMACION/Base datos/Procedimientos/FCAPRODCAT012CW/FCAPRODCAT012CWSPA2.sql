USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT012CWSPA2]    Script Date: 24/03/2022 10:39:26 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 15/12/2021
-- Description:	Modulo Cat. de paros
-- =============================================
ALTER PROCEDURE [dbo].[FCAPRODCAT012CWSPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@ClaveParo CHAR(4) = NULL
	,@TipoParo CHAR(30) = NULL
	,@TipoParoValida CHAR(4) = NULL
	,@TipoMaquina CHAR(2) = NULL
	,@AplicaPareto BIT = NULL
	,@DescuentoIndicador BIT = NULL
	,@Observaciones VARCHAR(130) = NULL
	,@Autoriza BIT = NULL
	,@EsProgramado BIT = NULL
AS
BEGIN
	DECLARE @TotalRegistros INT

	IF @Opcion = 1
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM [dbo].[FCAPRODCAT012]
				WHERE ClaveParo = @ClaveParo
				) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPRODCAT012] (
				[ClaveParo]
				,[TipoParo]
				,[TipoParoValida]
				,[TipoMaquina]
				,[AplicaPareto]
				,[DescuentoIndicador]
				,[Observaciones]
				,[Autoriza]
				,[EsProgramado]
				,[Estatus]
				,[FechaInsert]
				,[UsuarioInsert]
				)
			VALUES (
				@ClaveParo
				,@TipoParo
				,@TipoParoValida
				,@TipoMaquina
				,@AplicaPareto
				,@DescuentoIndicador
				,@Observaciones
				,@Autoriza
				,@EsProgramado
				,1
				,GETDATE()
				,@Usuario
				)
		END
		ELSE
		BEGIN
			RAISERROR (
					'La clave paro ya se encuentra agregada'
					,11
					,1
					)
		END
	END
	IF @Opcion = 2
	BEGIN
		UPDATE [dbo].[FCAPRODCAT012]
		   SET 
			  [TipoParo] = @TipoParo
			  ,[TipoParoValida] = @TipoParoValida
			  ,[TipoMaquina] = @TipoMaquina
			  ,[AplicaPareto] = @AplicaPareto
			  ,[DescuentoIndicador] = @DescuentoIndicador
			  ,[Observaciones] = @Observaciones
			  ,[Autoriza] = @Autoriza
			  ,[EsProgramado] = @EsProgramado
			  ,[FechaUpdate] = GETDATE()
			  ,[UsuarioUpdate] = @Usuario
		 WHERE [ClaveParo] = @ClaveParo
	END
	IF @Opcion = 3
	BEGIN
		UPDATE [dbo].[FCAPRODCAT012]
		   SET 
			  [Estatus] = 0
			  ,[FechaBaja] = GETDATE()
			  ,[UsuarioBaja] = @Usuario
		 WHERE [ClaveParo] = @ClaveParo
	END
END
