USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG008MWSPA2]    Script Date: 26/03/2022 09:41:11 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Higuera
-- Create date: 26/03/2022
-- Description:	Sp que utiliza FCAPROG008MW
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG008MWSPA2]
	@Opcion INT,
	@UsuarioERP CHAR(6) =NULL,
	@Clave CHAR(3)=NULL,
	@Descripcion CHAR(40)=NULL,
	@M1 CHAR(2)=NULL,
	@M2 CHAR(2)=NULL,
	@M3 CHAR(2)=NULL,
	@M4 CHAR(2)=NULL,
	@DetalleRutas FCAPROGDAT019TD001 READONLY
AS
BEGIN
	DECLARE @Mensaje AS VARCHAR(1000)='',@I INT=1, @Proceso INT,@Pegar BIT, @TipoMaquina CHAR(2),@Troquela BIT,@Descripcionp CHAR(30)
	IF @Opcion=1
	BEGIN
		WHILE(@I<=4)
		BEGIN
			SELECT @Proceso=TipoMaquina,@Pegar=Pegar FROM @DetalleRutas WHERE MaquinaOrden=@I
			IF @Pegar=1
			BEGIN
				SELECT @TipoMaquina=B.TipoMaquina,@Troquela=B.Troquela,@Descripcionp=A.Descripcion FROM FCAPROGCAT011 A JOIN FCAPROGCAT008 B ON A.TProceso=B.Tproceso
				WHERE A.TProceso=@Proceso AND A.Estatus=0
				IF @TipoMaquina<>'IM'
				BEGIN
					SET @Mensaje='El proceso '+@Descripcionp+' No puede pegar debido a que no es de tipo IM'
					GOTO FIN
				END
				IF @Troquela=1
				BEGIN
					SET @Mensaje= 'El Proceso '+CONVERT(CHAR(2),@Proceso)+' '+@Descripcionp+' No puede pegar debido a que esta identificada como Troquel'
					GOTO FIN
				END
			END
			SET @I=@I+1
		END

		IF(EXISTS(SELECT Clave FROM FCAPROGCAT015 WHERE Clave=@Clave AND Estatus=0))
		BEGIN
			SET @Mensaje= @Clave
			GOTO FIN
		END
		IF(EXISTS(SELECT Clave FROM FCAPROGCAT015 WHERE Clave=@Clave AND Estatus=1))
		BEGIN
			UPDATE FCAPROGCAT015 SET Descripcion=@Descripcion,M1=@M1,M2=@M2,M3=@M3,M4=@M4,FechaUpdate=GETDATE(),UsuarioUpdate=@UsuarioERP WHERE Clave=@Clave
		END
		ELSE
		BEGIN
			INSERT FCAPROGCAT015 (Clave,Descripcion,M1,M2,M3,M4,FechaInsert,UsuarioInsert)
			VALUES (@Clave,@Descripcion,@M1,@M2,@M3,@M4,GETDATE(),@UsuarioERP)
		END

		MERGE FCAPROGDAT019 t
		USING (SELECT * FROM @DetalleRutas) s
		ON (s.TipoMaquina=t.TipoMaquina AND t.ClaveProceso=@Clave)
		WHEN NOT MATCHED BY TARGET THEN
		INSERT
		VALUES(@Clave,s.MaquinaOrden,s.TipoMaquina,s.Pegar,s.Mx2,GETDATE(),@UsuarioERP,NULL,NULL,NULL,NULL,1)
		WHEN MATCHED THEN
		UPDATE SET t.Estatus=1,t.Pegar=s.Pegar,t.Mx2=s.Mx2,t.MaquinaOrden=s.MaquinaOrden, t.FechaUpdate=GETDATE(),t.UsuarioUpdate=@UsuarioERP
		WHEN NOT MATCHED BY SOURCE AND t.Estatus=1 AND t.ClaveProceso=@Clave THEN
		UPDATE SET t.Estatus=0 , t.FechaUpdate=GETDATE(),t.UsuarioUpdate=@UsuarioERP;
		SET @Mensaje='OK'
		SELECT @Mensaje AS Mensaje
	END
	IF @Opcion= 2 --Reactiva ruta
	BEGIN
		UPDATE FCAPROGCAT015 SET Estatus=1 , FechaUpdate=GETDATE(), UsuarioUpdate=@UsuarioERP WHERE Clave=@Clave
		SELECT @Mensaje=Descripcion FROM FCAPROGCAT015 WHERE Clave=@Clave
		SELECT @Mensaje AS Mensaje
	END
	IF @Opcion=3 -- elimina Ruta
	BEGIN
		UPDATE FCAPROGCAT015 SET Estatus=0 , FechaDelete=GETDATE(), UsuarioDelete=@UsuarioERP WHERE Clave=@Clave
		SET @Mensaje='OK'
		SELECT @Mensaje AS Mensaje
	END
	FIN: SELECT @Mensaje AS Mensaje
END
