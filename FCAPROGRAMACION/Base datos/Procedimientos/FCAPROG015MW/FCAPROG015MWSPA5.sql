USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPA5]    Script Date: 20/10/2022 08:35:30 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPA5]
	@ZonaERP VARCHAR(2)					= NULL
	, @Cuchillas3 BIT					= NULL
	, @UsuarioERP VARCHAR(6)			= NULL
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @IdSesion INT, @Activo BIT;
	DECLARE @Res AS TABLE (Id INT, OP1 VARCHAR(500));
	DECLARE @Sesion AS TABLE (IdSesion INT);


--	-- VALIDAR MAXIMO DE 2 USUARIOS EJECUTANDO PROCESO
--	IF (SELECT COUNT(*) FROM tblSesionProgramacion WHERE Activo = 1) >= 2
--	BEGIN
--		-- RECHAZAR PETICIÓN DE PROCESADO
--		-- INDICAR QUE SE HA ALCANZADO EL NUMERO MAXIMO DE SESIONES ABIERTAS
--		INSERT INTO @Res (Id, OP1)
--		VALUES (-1, 'Se alcanzó el número máximo de usuarios ejecutando el proceso, favor de esperar...');
--		GOTO SALIR;
--	END ELSE
--	BEGIN
--		-- ACEPTAR SOLICITUD DE PROCESADO
--		INSERT INTO @Sesion (IdSesion)
--		EXEC dbo.FCAPROG015MWSPC4 @UsuarioERP = @UsuarioERP;

--		SELECT TOP 1 @IdSesion = ISNULL(IdSesion, -1) FROM @Sesion;

--		IF ISNULL(@IdSesion, -1) = -1 
--		BEGIN
--			INSERT INTO @Res (Id, OP1)
--			VALUES (-1, 'Ocurrió un error al obtener la sesión del usuario "' + ISNULL(@UsuarioERP, '') + '"');
--		END ELSE
--		BEGIN
--			IF EXISTS (SELECT 1 FROM tblSesionProgramacion WHERE IdSesion = @IdSesion AND Activo = 1)
--			BEGIN
--				-- INDICAR QUE EL USUARIO YA TIENE SESIÓN ACTIVA
--				INSERT INTO @Res (Id, OP1)
--				VALUES (-1, 'El usuario ya está ejecutando el proceso, favor de intentar más tarde...');
--			END ELSE
--			BEGIN
--				-- ACTIVAR SESIÓN
--				UPDATE tblSesionProgramacion SET Activo = 1
--				WHERE IdSesion = ISNULL(@IdSesion, 0);
--				-- PROCEDER CON EL PROCESADO
--				GOTO SALIR;
--			END
--		END
--	END

--SALIR: 
--	IF EXISTS(SELECT 1 FROM @Res)
--	BEGIN
--		SELECT Id, OP1 FROM @Res;
--	END ELSE
--	BEGIN
		-- EJECUTAR PROCESO
		EXEC dbo.FCAPROG015MWSPA8 @pZonaERP = @ZonaERP, @pCuchillas3 = @Cuchillas3, @IdSesion = @IdSesion;
		EXEC dbo.FCAPROG015MWSPC12 @pZonaERP = @ZonaERP, @pCuchillas3 = @Cuchillas3;
		EXEC dbo.FCAPROG015MWSPC10 @pZonaERP = @ZonaERP;
		EXEC dbo.FCAPROG015MWSPC11 @pZonaERP = @ZonaERP;
	--END

	SET NOCOUNT OFF;
END
GO


