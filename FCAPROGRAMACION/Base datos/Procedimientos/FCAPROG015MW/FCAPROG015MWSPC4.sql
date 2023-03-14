USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC4]    Script Date: 20/10/2022 08:35:00 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC4] 
	@UsuarioERP VARCHAR(6)
AS 
BEGIN
	DECLARE @Sesion INT;

	BEGIN TRANSACTION
	BEGIN TRY
		IF NOT EXISTS (SELECT 1 FROM tblSesionProgramacion WHERE UsuarioERP = ISNULL(@UsuarioERP, ''))
		BEGIN
			-- REGISTRAR USUARIO POR PRIMERA VEZ
			INSERT INTO tblSesionProgramacion (UsuarioERP)
			VALUES (@UsuarioERP);
			SELECT @Sesion = @@IDENTITY;
		END ELSE 
		BEGIN
			-- OBTENER LA SESIÓN DEL USUARIO
			SELECT TOP 1 @Sesion = IdSesion 
			FROM tblSesionProgramacion 
			WHERE UsuarioERP = ISNULL(@UsuarioERP, '');
		END

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		SELECT @Sesion = -1;
		ROLLBACK TRANSACTION;
	END CATCH

	SELECT ISNULL(@Sesion, -1) AS IdSesion;
END
GO


