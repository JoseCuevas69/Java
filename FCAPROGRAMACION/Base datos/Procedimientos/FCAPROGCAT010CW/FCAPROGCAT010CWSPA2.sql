USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT010CWSPA2]    Script Date: 24/03/2022 10:36:13 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 23/11/2021
-- Description:	CATALOGO DE TIPOS DE CAJAS
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT010CWSPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@ClaveDiseno VARCHAR(10) = NULL
	,@Descripcion VARCHAR(30) = NULL
	,@Estatus BIT = NULL
	,@FechaBaja SMALLDATETIME = NULL
	,@RegExporta VARCHAR(15) = NULL
	,@PermiteCotDirecta BIT = NULL
	,@ConSuaje BIT = NULL
	,@FraccionArancelaria VARCHAR(10) = NULL
	,@IdTipoCaja INT = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM [dbo].[FCAPROGCAT010]
				WHERE [ClaveDiseno] = @ClaveDiseno
				) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPROGCAT010] (
				[ClaveDiseno]
				,[Descripcion]
				,[Estatus]
				,[FechaBaja]
				,[RegExporta]
				,[PermiteCotDirecta]
				,[ConSuaje]
				,[FraccionArancelaria]
				,[FechaInsert]
				,[UsuarioInsert]
				)
			VALUES (
				@ClaveDiseno
				,@Descripcion
				,1
				,@FechaBaja
				,@RegExporta
				,@PermiteCotDirecta
				,@ConSuaje
				,@FraccionArancelaria
				,GETDATE()
				,@Usuario
				)
		END
		ELSE
		BEGIN
			RAISERROR (
					'La Clave Diseño ya se encuentra agregada'
					,11
					,1
					)
		END
	END -- Agregar

	IF @Opcion = 2
	BEGIN
		UPDATE [dbo].[FCAPROGCAT010]
		SET [Descripcion] = @Descripcion
			,[RegExporta] = @RegExporta
			,[PermiteCotDirecta] = @PermiteCotDirecta
			,[ConSuaje] = @ConSuaje
			,[FraccionArancelaria] = @FraccionArancelaria
			,[FechaUpdate] = GETDATE()
			,[UsuarioUpdate] = @Usuario
		WHERE IdTipoCaja = @IdTipoCaja
	END -- Editar

	IF @Opcion = 3
	BEGIN
		UPDATE [dbo].[FCAPROGCAT010]
		SET [Estatus] = 0
			,[FechaBaja] = GETDATE()
			,[UsuarioBaja] = @Usuario
		WHERE IdTipoCaja = @IdTipoCaja
	END -- Eliminar 
END
