USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT004CWSPA2]    Script Date: 24/03/2022 10:25:16 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 03/12/2021
-- Description:	Catálogo Combinaciones de papel
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT004CWSPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@Clave NVARCHAR(10)
	,@Presentacion NVARCHAR(10) = NULL
	,@Liner1 NVARCHAR(8) = NULL
	,@Medium1 NVARCHAR(8) = NULL
	,@Liner2 NVARCHAR(8) = NULL
	,@Medium2 NVARCHAR(8) = NULL
	,@Liner3 NVARCHAR(8) = NULL
	,@Medium3 NVARCHAR(8) = NULL
	,@Liner4 NVARCHAR(8) = NULL
	,@PrimeraFlauta NVARCHAR(1) = NULL
	,@SegundaFlauta NVARCHAR(1) = NULL
	,@TerceraFlauta NVARCHAR(1) = NULL
	,@PesoM2 REAL = NULL
	,@Descripcion NVARCHAR(40) = NULL
	,@ClaveIngles CHAR(15) = NULL
	,@Mullen TINYINT = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM [dbo].[FCAPROGCAT004]
				WHERE Clave = @Clave
				) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPROGCAT004] (
				[Clave]
				,[Presentacion]
				,[Liner1]
				,[Medium1]
				,[Liner2]
				,[Medium2]
				,[Liner3]
				,[Medium3]
				,[Liner4]
				,[PrimeraFlauta]
				,[SegundaFlauta]
				,[TerceraFlauta]
				,[PesoM2]
				,[Descripcion]
				,[Estatus]
				,[ClaveIngles]
				,[Mullen]
				,[FechaInsert]
				,[UsuarioInsert]
				)
			VALUES (
				@Clave
				,@Presentacion
				,@Liner1
				,@Medium1
				,@Liner2
				,@Medium2
				,@Liner3
				,@Medium3
				,@Liner4
				,@PrimeraFlauta
				,@SegundaFlauta
				,@TerceraFlauta
				,@PesoM2
				,@Descripcion
				,1
				,@ClaveIngles
				,@Mullen
				,GETDATE()
				,@Usuario
				)
		END
		ELSE
		BEGIN
			RAISERROR (
					'La Clave ya se encuentra agregada'
					,11
					,1
					)
		END
	END -- Agregar

	IF @Opcion = 2
	BEGIN
		UPDATE [dbo].[FCAPROGCAT004]
		SET [Presentacion] = @Presentacion
			,[Liner1] = @Liner1
			,[Medium1] = @Medium1
			,[Liner2] = @Liner2
			,[Medium2] = @Medium2
			,[Liner3] = @Liner3
			,[Medium3] = @Medium3
			,[Liner4] = @Liner4
			,[PrimeraFlauta] = @PrimeraFlauta
			,[SegundaFlauta] = @SegundaFlauta
			,[TerceraFlauta] = @TerceraFlauta
			,[PesoM2] = @PesoM2
			,[Descripcion] = @Descripcion
			,[ClaveIngles] = @ClaveIngles
			,[Mullen] = @Mullen
			,[FechaUpdate] = GETDATE()
			,[UsuarioUpdate] = @Usuario
		WHERE [Clave] = @Clave
	END -- Editar

	IF @Opcion = 3
	BEGIN
		UPDATE [dbo].[FCAPROGCAT004]
		SET [Estatus] = 0
			,[FechaBaja] = GETDATE()
			,[UsuarioBaja] = @Usuario
		WHERE [Clave] = @Clave
	END -- Eliminar 
END
