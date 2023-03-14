USE [Cecsoplan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPA3]    Script Date: 20/10/2022 08:31:52 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FCAPROG015MWSPA3]
	@Opcion INT					= NULL,
	@idSession INT				= NULL,
	@UsuarioERP VARCHAR(8)		= NULL,
	@Resistencia VARCHAR(15)	= NULL,
	@NumCuchillas  TINYINT		= NULL,
	@EsActivo		BIT			= NULL

AS 
BEGIN

	IF(@Opcion = 1)
	BEGIN
		
		IF(LEN(ISNULL(@Resistencia, '')) > 0)
		BEGIN 
			IF(EXISTS (SELECT * FROM CplDat014 WHERE RTRIM (Usuario) = RTRIM(@UsuarioERP)))
			BEGIN
				IF(EXISTS (SELECT * FROM CplDat014 WHERE EsActivo = 0 AND RTRIM (Usuario) = RTRIM(@UsuarioERP)))
				BEGIN
					UPDATE CplDat014 SET 
						  [Clave Resistencia] = ISNULL(@Resistencia, '')
						, [Fecha Sistema] = GETDATE()
						, NumCuchillas = @NumCuchillas
					WHERE Usuario = RTRIM(@UsuarioERP)
				END
				ELSE
				BEGIN
					UPDATE CplDat014 SET 
						  [Clave Resistencia] = ISNULL(@Resistencia, '')
						, [Fecha Sistema] = GETDATE()
						, NumCuchillas = @NumCuchillas
					WHERE Usuario = RTRIM(@UsuarioERP)
				END
			END
			ELSE
			BEGIN
				INSERT INTO CplDat014 ([Clave Resistencia], [Fecha Sistema], Usuario, ClaveProceso, NumCuchillas)
				VALUES (ISNULL(@Resistencia, ''), GETDATE(), @UsuarioERP, '', @NumCuchillas)
			END
		END
	END
	IF(@Opcion = 2)
	BEGIN
		UPDATE CplDat014 SET 
			  [Clave Resistencia] = ISNULL(@Resistencia, '')
			, [Fecha Sistema] = GETDATE()
			, NumCuchillas = @NumCuchillas
			-- , EsActivo = 0
		WHERE Usuario = RTRIM(@UsuarioERP)
	END

END





GO


