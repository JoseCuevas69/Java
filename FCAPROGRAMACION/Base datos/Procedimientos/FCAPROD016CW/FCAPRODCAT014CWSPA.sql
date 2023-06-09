USE [FcaCajas]
GO
/****** Object:  StoredProcedure [dbo].[FCAPRODCAT014CWSPA]    Script Date: 29/08/2022 09:30:43 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 12/08/2022
-- Description:	Catalogo de Area Desperdicios
-- =============================================
CREATE PROCEDURE [dbo].[FCAPRODCAT014CWSPA] 
	@Opcion INT,
	@ZonaId CHAR(2)
	,@Usuario CHAR(6)
	,@Clave char(3) = NULL
	,@Nombre char(30) = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		IF(SELECT COUNT(*) FROM [dbo].[FCAPRODCAT014] WHERE Clave = @Clave AND ZonaId = @ZonaId ) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPRODCAT014]
			   ([Clave]
			   ,[ZonaId]
			   ,[Nombre]
			   ,[EsActivo]
			   ,[Filtro]
			   ,[FechaInsert]
			   ,[UsuarioInsert]
			   )
			VALUES
			   (@Clave
			   ,@ZonaId
			   ,@Nombre
			   ,1
			   ,'T'
			   ,GETDATE()
			   ,@Usuario
			   )
		 END
		 ELSE 
		 BEGIN
			RAISERROR (
					'La clave ya se encuentra registrada'
					,11
					,1
					)
		 END
	END
	IF @Opcion = 2
	BEGIN
		UPDATE [dbo].[FCAPRODCAT014]
		   SET 
			[Nombre] = @Nombre
			  ,[FechaUpdate] = GETDATE()
			  ,[UsuarioUpdate] = @Usuario
		 WHERE Clave = @Clave
		 AND ZonaId = @ZonaId
	END
	IF @Opcion = 3
	BEGIN
		UPDATE [dbo].[FCAPRODCAT014]
		   SET 
			[EsActivo] = 0
			 ,[FechaBaja] = GETDATE()
			 ,[UsuarioBaja] = @Usuario
		 WHERE Clave = @Clave
		 AND ZonaId = @ZonaId
	END
END
