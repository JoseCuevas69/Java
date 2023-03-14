USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT009CWSPA2]    Script Date: 24/03/2022 10:09:17 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 26/11/2021
-- Description:	CATALOGO DE PROCESOS
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT009CWSPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@TipoMaquina NVARCHAR(2) = NULL
	,@ClaveProceso NVARCHAR(10) = NULL
	,@Descripcion NVARCHAR(40) = NULL
	,@Estatus BIT = NULL
	,@Tratamiento BIT = NULL
	,@SubProceso CHAR(6) = NULL
	,@Tintas CHAR(3) = NULL
	,@ConSuaje BIT = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM [dbo].[FCAPROGCAT009]
				WHERE TipoMaquina = @TipoMaquina
					AND ClaveProceso = @ClaveProceso
				) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPROGCAT009] (
				[TipoMaquina]
				,[ClaveProceso]
				,[Descripcion]
				,[Estatus]
				,[Tratamiento]
				,[SubProceso]
				,[Tintas]
				,[ConSuaje]
				,[FechaInsert]
				,[UsuarioInsert]
				)
			VALUES (
				@TipoMaquina
				,@ClaveProceso
				,@Descripcion
				,1
				,@Tratamiento
				,@SubProceso
				,@Tintas
				,@ConSuaje
				,GETDATE()
				,@Usuario
				)
		END
		ELSE
		BEGIN
			RAISERROR (
					'La Clava proceso ya se encuentra agregada'
					,11
					,1
					)
		END
	END -- Agregar

	IF @Opcion = 2
	BEGIN
		UPDATE [dbo].[FCAPROGCAT009]
		SET [Descripcion] = @Descripcion
			,[Tratamiento] = @Tratamiento
			,[SubProceso] = @SubProceso
			,[Tintas] = @Tintas
			,[ConSuaje] = @ConSuaje
			,[FechaUpdate] = GETDATE()
			,[UsuarioUpdate] = @Usuario
		WHERE ClaveProceso = @ClaveProceso
			AND TipoMaquina = @TipoMaquina
	END -- Editar

	IF @Opcion = 3
	BEGIN
		UPDATE [dbo].[FCAPROGCAT009]
		SET [Estatus] = @Estatus
			,[FechaBaja] = GETDATE()
			,[UsuarioBaja] = @Usuario
		WHERE ClaveProceso = @ClaveProceso
			AND TipoMaquina = @TipoMaquina
	END -- Estatus
END
