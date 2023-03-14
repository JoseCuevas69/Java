USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG006MWSPA2]    Script Date: 24/03/2022 12:30:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 14/01/2022
-- Description:	DISPONIBILIDAD DE MÁQUINAS
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG006MWSPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@anio INT = NULL
	,@mes INT = NULL
	,@ClaveMaquina VARCHAR(5) = NULL
	,@ClaveMaquinaDestino VARCHAR(5) = NULL
	,@Disponibilidad FCAPROGDAT017TD001 readonly
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		INSERT INTO [dbo].[FCAPROGDAT017] (
			[Fecha]
			,[Turnos]
			,[TipoMaquina]
			,[ClaveMaquina]
			,[Estatus]
			,[FechaInsert]
			,[UsuarioInsert]
			)
		SELECT CONVERT(DATE, Fecha) AS Fecha
			,Turnos
			,TipoMaquina
			,ClaveMaquina
			,1
			,GETDATE()
			,@Usuario
		FROM @Disponibilidad
	END

	IF @Opcion = 2
	BEGIN
		UPDATE t1
		SET t1.[Turnos] = t2.Turnos
			,t1.[FechaUpdate] = GETDATE()
			,t1.[UsuarioUpdate] = @Usuario
		FROM [dbo].[FCAPROGDAT017] t1
		INNER JOIN @Disponibilidad t2 ON t1.Fecha = t2.Fecha
			AND t1.ClaveMaquina = t2.ClaveMaquina
			AND t1.Estatus = 1
	END

	IF @Opcion = 3
	BEGIN
		UPDATE t1
		SET t1.Estatus = 0
			,t1.[FechaBaja] = GETDATE()
			,t1.[UsuarioBaja] = @Usuario
		FROM [dbo].[FCAPROGDAT017] t1
		INNER JOIN @Disponibilidad t2 ON t1.Fecha = t2.Fecha
			AND t1.ClaveMaquina = t2.ClaveMaquina
			AND t1.Estatus = 1
	END

	IF @Opcion = 4
	BEGIN

		DECLARE @TipoMaquina VARCHAR(10) = (SELECT TipoMaquina FROM FCAPROGCAT008 WHERE ClaveMaquina = @ClaveMaquinaDestino  and Estatus = 1 ) 
		INSERT INTO [dbo].[FCAPROGDAT017] (
			[Fecha]
			,[Turnos]
			,[TipoMaquina]
			,[ClaveMaquina]
			,[Estatus]
			,[FechaInsert]
			,[UsuarioInsert]
			)
		SELECT CONVERT(DATE, Fecha) AS Fecha
			,Turnos
			,@TipoMaquina
			,@ClaveMaquinaDestino
			,1
			,GETDATE()
			,@Usuario
		FROM [dbo].[FCAPROGDAT017]
		WHERE YEAR(Fecha) = @anio
			AND MONTH(Fecha) = @mes
			AND ClaveMaquina = @ClaveMaquina
			AND Estatus = 1
	END
END
