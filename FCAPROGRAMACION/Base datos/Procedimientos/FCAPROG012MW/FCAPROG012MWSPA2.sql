USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG012MWSPA2]    Script Date: 19/10/2022 03:48:58 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG012MWSPA2]
	@Opcion INT						= NULL,
	@UsuarioERP VARCHAR(6)			= NULL,
	@AnchosUsar CPLDAT003TD_001		READONLY
AS BEGIN
	DECLARE @Msj VARCHAR(MAX), @Id BIT, @IdSesion INT;
	DECLARE @Sesion AS TABLE (IdSesion INT);

	-- OBTENER SESION DE USUARIO (NUEVA O REGISTRADA)
	INSERT INTO @Sesion (IdSesion)
	EXEC dbo.FCAPROG015MWSPC4 @UsuarioERP = @UsuarioERP;
	SELECT TOP 1 @IdSesion = ISNULL(IdSesion, -1) FROM @Sesion;
	
	BEGIN TRANSACTION
	BEGIN TRY
		IF @Opcion = 1
		BEGIN
			IF ISNULL(@IdSesion, -1) = -1
			BEGIN
				SELECT @Id = 0, @Msj = 'Ocurrió un error al obtener la sesión del usuario "' + ISNULL(@UsuarioERP, '') + '"';
			END ELSE
			BEGIN
				UPDATE CplDat003
					SET Usar = B.Usar
						--, IdSesion = @IdSesion -- PENDIENTE AGREGAR LA SESION 
				FROM CplDat003 A
				JOIN @AnchosUsar B ON A.Ancho = B.Ancho
				WHERE B.Extra = 3; 

				INSERT INTO CplDat003 (Ancho, Usar/*, IdSesion*/)
				SELECT Ancho, Usar/*, @IdSesion*/
				FROM @AnchosUsar
				WHERE Extra != 3;

				SELECT @Id = 1,
					@Msj = 'Actualización Aplicada...';
			END
			
		END

		SELECT @Id AS Id, @Msj AS Message;
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		SELECT 0 AS Id, ERROR_MESSAGE() AS Message;
	END CATCH
END
GO


