USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROD002MWSPA2]    Script Date: 26/03/2022 09:25:38 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Higuera
-- Create date: 26/03/2022
-- Description:	Sp utilizado en FCAPROD002MW - Estandares de impresoras
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROD002MWSPA2] 
	@Opcion INT,
	@TipoMaquina NVARCHAR(4)=NULL,
	@ClaveMaquina NVARCHAR(10)=NULL,
	@ClaveProceso CHAR(10)=NULL,
	@TiempoStd INT=NULL,
	@Eficiencia DECIMAL (9,4)=NULL,
	@VelocidadObjetivo DECIMAL (7,2)=NULL,
	@AreaInicial REAL =NULL,
	@AreaFinal REAL =NULL,
	@VelocidadStd REAL =NULL,
	@ClaveArea CHAR(2)=NULL,
	@Descripcion CHAR(15)=NULL,
	@HoraInicio CHAR(5)=NULL,
	@HoraFinal CHAR(5)=NULL,
	@Turno CHAR(1)=NULL,
	@UsuarioERP CHAR(6)=NULL
AS
BEGIN
	DECLARE @Mensaje AS VARCHAR(1000)='', @SubProceso AS CHAR(6), @Tintas AS CHAR(3), @DescripcionP NVARCHAR(80),@Imp BIT,@EficienciaCorr DECIMAL (9,4)
	DECLARE @FechaCambio AS SMALLDATETIME
	DECLARE @TmpVelocidades AS TABLE (Troquelado BIT, Pegada BIT)
	IF @Opcion = 1 --Guarda el tiempo estandar
	BEGIN
	    
		--Valida Si existe el proceso
		IF (EXISTS(SELECT ClaveProceso FROM FCAPROGCAT009 WHERE ClaveProceso=@ClaveProceso AND Estatus=1))
		BEGIN
			SELECT @SubProceso=ISNULL(SubProceso,''),@Tintas=ISNULL(Tintas,'') FROM FCAPROGCAT009 WHERE ClaveProceso=@ClaveProceso AND Estatus=1
			IF (@SubProceso='' OR @Tintas='') --valida si se capturo subproceso por parte de costos
			BEGIN
				SET @Mensaje='No es posible agregar el proceso debido a que no se ha capturado la equivalencia al subProceso de Costos, es necesario verlo con el área de Costos'
				GOTO FIN
			END
		END
		ELSE
		BEGIN
			SET @Mensaje='No es posible agregar el proceso debido a que no se encontro en CmoCat010.'
			GOTO FIN
		END

		IF (EXISTS(SELECT ClaveMaquina from FCAPRODDAT007 WHERE ClaveMaquina=@ClaveMaquina AND ClaveProceso=@ClaveProceso))
		BEGIN
			UPDATE FCAPRODDAT007 SET TiempoStd=@TiempoStd,Eficiencia=@Eficiencia,VelocidadObjetivo=@VelocidadObjetivo,FechaUpdate=GETDATE(),UsuarioUpdate=@UsuarioERP, Estatus=1
			WHERE ClaveMaquina=@ClaveMaquina AND ClaveProceso=@ClaveProceso
			SET @Mensaje='OK'
		END
		ELSE
		BEGIN
			INSERT FCAPRODDAT007 (TipoMaquina,ClaveMaquina,ClaveProceso,TiempoStd,Eficiencia,VelocidadObjetivo,FechaInsert,UsuarioInsert)
			VALUES (@TipoMaquina,@ClaveMaquina,@ClaveProceso,@TiempoStd,@Eficiencia,@VelocidadObjetivo,GETDATE(),@UsuarioERP)
			SET @Mensaje='OK'
		END

		IF @TipoMaquina<>'CO' BEGIN
			SELECT @SubProceso=ISNULL(SubProceso,''),@Tintas=ISNULL(Tintas,''),@DescripcionP=Descripcion FROM FCAPROGCAT009 WHERE ClaveProceso=@ClaveProceso AND Estatus=1
			IF @SubProceso<>'' BEGIN
				IF (EXISTS(SELECT Subproceso FROM FCACAJAS..FCACOSTCAT025 WHERE SubProceso=@SubProceso AND Tintas=@Tintas AND ClaveMaquina=@ClaveMaquina AND EsActivo=1 AND ZonaId=RIGHT(DB_NAME(),2)))
				BEGIN
					UPDATE FCACAJAS..FCACOSTCAT025 SET TipoPreparacion=@DescripcionP,TiempoEstandar=@TiempoStd, Eficiencia=@Eficiencia,FechaHoraUpd=GETDATE(),UsuarioERPUpd=@UsuarioERP
					WHERE Subproceso=@SubProceso AND Tintas=@Tintas AND ClaveMaquina=@ClaveMaquina AND ZonaId=RIGHT(DB_NAME(),2)
				END
				ELSE
				BEGIN
					INSERT FCACAJAS..FCACOSTCAT025 (ClaveMaquina,Subproceso,Tintas,TipoPreparacion,TiempoEstandar,Eficiencia,ZonaId,FechaHoraIns,UsuarioERPIns,EsActivo)
					VALUES (@ClaveMaquina,@SubProceso,@Tintas,@DescripcionP,@TiempoStd,@Eficiencia,RIGHT(DB_NAME(),2),GETDATE(),@UsuarioERP,1)
				END
			END
		END
		ELSE IF @TipoMaquina = 'CO'
		BEGIN
			SELECT @EficienciaCorr=Eficiencia FROM FCAPROGCAT008 WHERE ClaveMaquina=@ClaveMaquina
			IF RIGHT(@ClaveProceso,2) = '0I' OR RIGHT(@ClaveProceso,2) = 'LI'
			BEGIN
				SET @Imp=1
			END
			ELSE
			BEGIN
				SET @Imp=0
			END
			IF (EXISTS(SELECT * FROM FCACAJAS..FCACOSTCAT018 WHERE Corrugado=@SubProceso AND Impermeabilizado=@Imp AND EsActivo=1 AND ZonaId=RIGHT(DB_NAME(),2)))
			BEGIN
				UPDATE FCACAJAS..FCACOSTCAT018 SET Eficiencia=@EficienciaCorr, Velocidad=@Eficiencia,MinutosPreparacion=@TiempoStd,FechaHoraUpd=GETDATE(),UsuarioERPUpd=@UsuarioERP
				WHERE Corrugado=@SubProceso AND Impermeabilizado=@Imp AND ZonaId=RIGHT(DB_NAME(),2)
			END
			ELSE
			BEGIN
				INSERT FCACAJAS..FCACOSTCAT018 (Corrugado,Impermeabilizado,Velocidad,Eficiencia,MinutosPreparacion,FechaHoraIns,UsuarioERPIns,ZonaId,EsActivo)
				VALUES (@SubProceso,@Imp,@Eficiencia,@EficienciaCorr,@TiempoStd,GETDATE(),@UsuarioERP,RIGHT(DB_NAME(),2),1)
			END
		END
	END
	IF @Opcion= 2 --Elimina logicamente el tiempo estandar
	BEGIN
		UPDATE FCAPRODDAT007 SET Estatus=0,FechaDelete=GETDATE(),UsuarioDelete=@UsuarioERP WHERE ClaveMaquina=@ClaveMaquina AND ClaveProceso=@ClaveProceso
		
		--Costos
		SELECT @SubProceso=ISNULL(SubProceso,''),@Tintas=ISNULL(Tintas,''),@DescripcionP=Descripcion FROM FCAPROGCAT009 WHERE ClaveProceso=@ClaveProceso AND Estatus=1
		IF(@SubProceso<>'' AND @Tintas<>'')
		BEGIN
			IF (NOT EXISTS(SELECT ClaveMaquina FROM FCAPRODDAT007 A JOIN FCAPROGCAT009 B ON A.ClaveProceso=B.ClaveProceso WHERE A.ClaveMaquina=@ClaveMaquina AND A.Estatus=1 AND B.SubProceso=@SubProceso AND B.Tintas=@Tintas))
			BEGIN
				IF @TipoMaquina <> 'CO'
				BEGIN
					INSERT INTO FCACAJAS..FCACOSTCAT025HIS 
					SELECT Id,ClaveMaquina,Subproceso,Tintas,TipoPreparacion,TiempoEstandar,Eficiencia,EsActivo,UsuarioERPIns,FechaHoraIns,UsuarioERPUpd,FechaHoraUpd,UsuarioERPDel,FechaHoraDel,ZonaId,@UsuarioERP,GETDATE() 
					FROM FCACAJAS..FCACOSTCAT025 WHERE ClaveMaquina=@ClaveMaquina AND Subproceso=@SubProceso AND Tintas=@Tintas

					UPDATE FCACAJAS..FCACOSTCAT025 SET EsActivo=0,FechaHoraDel=GETDATE(),UsuarioERPDel=@UsuarioERP WHERE ClaveMaquina=@ClaveMaquina AND Subproceso=@SubProceso AND Tintas=@Tintas
				END
				ELSE
				BEGIN
					IF RIGHT(@ClaveProceso,2) = '0I' OR RIGHT(@ClaveProceso,2) = 'LI'
					BEGIN
						SET @Imp=1
					END
					ELSE
					BEGIN
						SET @Imp=0
					END
					INSERT INTO FCACAJAS..FCACOSTCAT018HIS
					SELECT Id,ZonaId,Corrugado,Impermeabilizado,Velocidad,Eficiencia,MinutosPreparacion,EsActivo,UsuarioERPIns,FechaHoraIns,UsuarioERPUpd,FechaHoraUpd,UsuarioERPDel,FechaHoraDel,@UsuarioERP,GETDATE()
					FROM FCACAJAS..FCACOSTCAT018 WHERE Corrugado=@SubProceso AND Impermeabilizado=@Imp

					UPDATE FCACAJAS..FCACOSTCAT018 SET EsActivo=0,FechaHoraDel=GETDATE(),UsuarioERPDel=@UsuarioERP  WHERE Corrugado=@SubProceso AND Impermeabilizado=@Imp
				END
			END
		END

		SET @Mensaje='OK'
	END

	IF @Opcion = 3
	BEGIN
		IF (EXISTS(SELECT ClaveMaquina FROM FCAPRODDAT009 WHERE ClaveMaquina=@ClaveMaquina AND AreaInicial=@AreaInicial AND AreaFinal=@AreaFinal AND Estatus=1))
		BEGIN
			SET @Mensaje='El área inicial y área final ya existen para la máquina '+@ClaveMaquina
			GOTO FIN
		END
		ELSE
		BEGIN
			INSERT FCAPRODDAT009 (ClaveMaquina,AreaInicial,AreaFinal,VelocidadStd,FechaInsert,UsuarioInsert)
			VALUES (@ClaveMaquina,@AreaInicial,@AreaFinal,@VelocidadStd,GETDATE(),@UsuarioERP)
			
			--Costos
			SELECT @Eficiencia=Eficiencia  FROM FCAPROGCAT008 WHERE ClaveMaquina=@ClaveMaquina

			INSERT @TmpVelocidades VALUES (1,1)
			INSERT @TmpVelocidades VALUES (1,0)
			INSERT @TmpVelocidades VALUES (0,1)
			INSERT @TmpVelocidades VALUES (0,0)

			MERGE FCACAJAS..FCACOSTCAT024 t
			USING (SELECT * FROM @TmpVelocidades) s
			ON (t.[Clave Maquina]=@ClaveMaquina AND t.AreaInicial=@AreaInicial AND t.AreaFinal=@AreaFinal
			AND t.Troquelado=s.Troquelado AND t.Pegada=s.Pegada AND t.EsActivo=1 AND t.ZonaId=RIGHT(DB_NAME(),2))
			WHEN NOT MATCHED BY TARGET THEN
			INSERT
			VALUES(RIGHT(DB_NAME(),2),@ClaveMaquina,s.Troquelado,s.Pegada,@AreaInicial,@AreaFinal,@VelocidadStd,@Eficiencia,1,@UsuarioERP,GETDATE(),NULL,NULL,NULL,NULL)
			WHEN MATCHED THEN
			UPDATE SET t.Velocidad=@VelocidadStd, Eficiencia=@Eficiencia;
			SET @Mensaje='OK'
		END
	END
	IF @Opcion = 4
	BEGIN
		UPDATE FCAPRODDAT009 SET Estatus=0, FechaDelete=GETDATE(), UsuarioDelete=@UsuarioERP WHERE ClaveMaquina=@ClaveMaquina AND AreaInicial=@AreaInicial AND AreaFinal=@AreaFinal AND Estatus=1
		
		INSERT INTO FCACAJAS..FCACOSTCAT024HIS
		SELECT Id,ZonaId,[Clave Maquina],Troquelado,Pegada,AreaInicial,AreaFinal,Velocidad,Eficiencia,EsActivo,UsuarioERPIns,FechaHoraIns,UsuarioERPUpd,FechaHoraUpd,UsuarioERPDel,FechaHoraDel,@UsuarioERP,GETDATE()
		FROM FCACAJAS..FCACOSTCAT024
		WHERE [Clave Maquina]=@ClaveMaquina AND AreaInicial=@AreaInicial AND AreaFinal=@AreaFinal

		UPDATE FCACAJAS..FCACOSTCAT024 SET EsActivo=0,FechaHoraDel=GETDATE(),UsuarioERPDel=@UsuarioERP
		WHERE [Clave Maquina]=@ClaveMaquina AND AreaInicial=@AreaInicial AND AreaFinal=@AreaFinal
		
		SET @Mensaje='OK'
	END
	IF @Opcion= 5
	BEGIN
		SELECT TOP 1 @FechaCambio=FechaCambio  FROM FCAPRODCAT015
		INSERT FCAPRODCAT015 (ClaveArea,Descripción,Turno,HoraInicio,HoraFinal,ClaveMaquina,Aplica,FechaCambio,FechaInsert,UsuarioInsert) 
		VALUES (@ClaveArea,@Descripcion,@Turno,@HoraInicio,@HoraFinal,@ClaveMaquina,1,@FechaCambio,GETDATE(),@UsuarioERP)
		SET @Mensaje='OK'
	END
	IF @Opcion= 6
	BEGIN
		UPDATE FCAPRODCAT015  SET HoraInicio=@HoraInicio,HoraFinal=@HoraFinal, FechaUpdate=GETDATE(),UsuarioUpdate=@UsuarioERP
		WHERE ClaveArea=@ClaveArea AND ClaveMaquina=@ClaveMaquina AND Aplica=1   AND Turno=@Turno
		SET @Mensaje='OK'
	END

	FIN: SELECT @Mensaje AS Mensaje
END
