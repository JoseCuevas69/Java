USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG014MWSPA2]    Script Date: 19/10/2022 04:02:16 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[FCAPROG014MWSPA2]
	@Opcion INT								= NULL,
	@ResistenciaAfines BIT					= NULL,
	@RefileMaximo DECIMAL(18, 2)			= NULL,
	@RefileMinimo DECIMAL(18, 2)			= NULL,
	@DiasAdelantoFE INT						= NULL,
	@TodosAnchos BIT						= NULL,
	@AnchosCalculo DECIMAL(18, 2)			= NULL,
	@LargoMinProgr DECIMAL(18, 2)			= NULL,
	@AumentoPedido DECIMAL(18, 2)			= NULL,
	@ScoresMaximos DECIMAL(18, 2)			= NULL,

	@Codigo INT								= NULL,
	@Descripcion VARCHAR(100)				= NULL,
	@Cantidad DECIMAL(5, 4)					= NULL,
	@Usuario VARCHAR(6)						= NULL,

	@ZonaERP VARCHAR(2)						= NULL
AS BEGIN
	DECLARE @Msj VARCHAR(MAX) = '', @Estatus BIT = 0, @Bandera BIT = 1;
	DECLARE @RestAna VARCHAR(30), @RestAfin BIT, @Excedente SMALLINT, @FechaLimite DATE, @GrpAfin SMALLINT;
	DECLARE @Resit VARCHAR(10), @Largo REAL, @FechaE SMALLDATETIME, @ID INT, @IDCplDat007 INT;
	DECLARE @CplDat007 AS TABLE (
		Clave NVARCHAR(20), [Resistencia Minima] REAL, [Resistencia Maxima] REAL, Grupo	SMALLINT, Descripcion VARCHAR(50)
	);
	DECLARE @CplDat007_2 AS TABLE (
		ID INT, Clave NVARCHAR(20), [Resistencia Minima] REAL, [Resistencia Maxima] REAL, Grupo	SMALLINT, Descripcion VARCHAR(50), Activo BIT NOT NULL DEFAULT 1
	);
	DECLARE @CplVis002 AS TABLE (
		ID INT, [Orden Produccion] VARCHAR(10), Status VARCHAR(10), [Clave Cliente] VARCHAR(12), [Clave Articulo] VARCHAR(18), [Cantidad] INT,
		[Fecha Entrega] SMALLDATETIME, Nombre VARCHAR(160), Articulo  VARCHAR(60), Resistencia VARCHAR(10), Flauta VARCHAR(3),
		Ancho REAL, Largo REAL, Proceso VARCHAR(2), Variacion REAL, Piezas DECIMAL(5, 4), [Peso Unitario] REAL, Lamina VARCHAR(3),
		Faltan DECIMAL, Hojas INT, TKg INT, Max4 DECIMAL, Industria VARCHAR(3), troquel BIT, TM2 INT, Parcial VARCHAR(1), ConScore BIT, NScores TINYINT
	)

	BEGIN TRANSACTION;
	BEGIN TRY
		IF @Opcion = 1 
		BEGIN
			UPDATE CplDat006 
				SET [Ancho Calculo] = @AnchosCalculo,
					Excedente = @AumentoPedido,
					[Dias Adelanto] = @DiasAdelantoFE,
					[Largo Minimo] = @LargoMinProgr,
					[Refile Maximo] = @RefileMaximo,
					[Refile Minimo] = @RefileMinimo,
					Scores = @ScoresMaximos,
					[Resistenias Afines] = @ResistenciaAfines,
					[Todos Anchos] = @TodosAnchos
			WHERE Id = 1;

			IF @@ROWCOUNT > 0 
			BEGIN
				SELECT @RestAna = SUBSTRING(Clave, 1, CHARINDEX ('-', Clave, 1) - 1) FROM CplDat002;

				IF ISNULL(@RestAna, '') != ''
				BEGIN
					SELECT @RestAfin = [Resistenias Afines]
						, @Excedente = Excedente 
						, @FechaLimite = DATEADD(DAY, [Dias Adelanto], GETDATE())
					FROM CplDat006;

					IF @@ROWCOUNT > 0 
					BEGIN
						SELECT @GrpAfin = Grupo
						FROM CplDat007
						WHERE Clave = @RestAna;

						IF @@ROWCOUNT > 0
						BEGIN
							IF ISNULL(@GrpAfin, -1) != -1
							BEGIN
								INSERT INTO @CplDat007 (Clave, [Resistencia Minima], [Resistencia Maxima], Grupo, Descripcion)
								SELECT Clave, [Resistencia Minima], [Resistencia Maxima], Grupo, Descripcion
								FROM CplDat007
								WHERE Grupo = @GrpAfin;

								IF @@ROWCOUNT > 0 
								BEGIN
									INSERT INTO @CplDat007_2 (ID, Clave, [Resistencia Minima], [Resistencia Maxima], Grupo, Descripcion)
									SELECT ROW_NUMBER() OVER (ORDER BY Clave), Clave, [Resistencia Minima], [Resistencia Maxima], Grupo, Descripcion
									FROM @CplDat007

									IF @@ROWCOUNT > 0
									BEGIN
										DELETE FROM CplDat004;

										INSERT INTO @CplVis002 (
											ID, [Orden Produccion], Status, [Clave Cliente], [Clave Articulo], Cantidad, [Fecha Entrega], Nombre
											, Articulo, Resistencia, Flauta, Ancho, Largo, Proceso, Variacion, Piezas, [Peso Unitario]
											, Lamina, Faltan, Hojas, TKg, Max4, Industria, troquel, TM2, Parcial, ConScore, NScores
										)
										SELECT ROW_NUMBER() OVER (ORDER BY [Orden Produccion]), [Orden Produccion], Status, [Clave Cliente], [Clave Articulo], Cantidad, [Fecha Entrega], Nombre
											, Articulo, Resistencia, Flauta, Ancho, Largo, Proceso, Variacion, Piezas, [Peso Unitario]
											, Lamina, Faltan, Hojas, TKg, Max4, Industria, troquel, TM2, Parcial, ConScore, NScores
										FROM CplVis002;

										IF @@ROWCOUNT > 0
										BEGIN
											WHILE EXISTS(SELECT 1 FROM @CplVis002)
											BEGIN
												SELECT TOP 1 @ID = ID FROM @CplVis002;
												SELECT @Bandera = 1;

												SELECT @Resit = Resistencia, @Largo = Largo, @FechaE = [Fecha Entrega]
												FROM @CplVis002
												WHERE ID = @ID;

												IF @@ROWCOUNT > 0
												BEGIN
													IF @Largo = 0 BEGIN SELECT @Bandera = 0; END
													IF (@RestAfin = 0 AND @Resit <> @RestAna) BEGIN SELECT @Bandera = 0; END
													IF @FechaE >= @FechaLimite BEGIN SELECT @Bandera = 0; END
													IF @RestAfin = 0 
													BEGIN 
														-- INSERTAR DATOS
														INSERT INTO CplDat004 (
															[Orden Produccion], [Clave Articulo], [Fecha Entrega], Cliente, Articulo, Resistencia, Ancho, Largo, Piezas
															, Cantidad, Faltan, Hojas, Lamina, Parcial, Flauta, Tkg, TM2, Mas, Refile, Utilizar, [Prior]
														)
														SELECT [Orden Produccion], [Clave Articulo], [Fecha Entrega], Nombre, Articulo, Resistencia, Ancho, Largo, Piezas
															, Cantidad, Faltan, Hojas, Lamina, Parcial, Flauta, Tkg, TM2, @Excedente, CASE WHEN troquel = 0 THEN 1 ELSE 0 END, 1, 0
														FROM @CplVis002
														WHERE ID = @ID;

														IF @@ROWCOUNT <= 0
														BEGIN
															SELECT @Msj = 'No se pudo guardar la información 8'
																, @Estatus = 0;
														END

														SELECT @Bandera = 0;
													END
			
													WHILE EXISTS(SELECT 1 FROM @CplDat007_2 WHERE Activo = 1)
													BEGIN
														SELECT TOP 1 @IDCplDat007 = ID FROM @CplDat007_2 WHERE Activo = 1;
														IF @Resit = (SELECT TOP 1 Clave FROM @CplDat007_2 WHERE ID = @IDCplDat007 AND Activo = 1) AND @Bandera = 1 BEGIN
															-- INSERTAR DATOS
															INSERT INTO CplDat004 (
																[Orden Produccion], [Clave Articulo], [Fecha Entrega], Cliente, Articulo, Resistencia, Ancho, Largo, Piezas
																, Cantidad, Faltan, Hojas, Lamina, Parcial, Flauta, Tkg, TM2, Mas, Refile, Utilizar, [Prior]
															)
															SELECT [Orden Produccion], [Clave Articulo], [Fecha Entrega], Nombre, Articulo, Resistencia, Ancho, Largo, Piezas
																, Cantidad, Faltan, Hojas, Lamina, Parcial, Flauta, Tkg, TM2, @Excedente, CASE WHEN troquel = 0 THEN 1 ELSE 0 END, 1, 0
															FROM @CplVis002
															WHERE ID = @IDCplDat007;

															SELECT @Bandera = 0;
														END
														UPDATE @CplDat007_2 SET Activo = 0 WHERE ID = @IDCplDat007;
													END

													UPDATE @CplDat007_2 SET Activo = 1
													DELETE FROM @CplVis002 WHERE ID = @ID;
												END 
												ELSE
												BEGIN
													SELECT @Msj = 'No se pudo guardar la información 7'
														, @Estatus = 0;
												END
											END
		
											SELECT @Msj = 'Los Registros Fueron Procesados con Éxito!'
												, @Estatus = 1;
										END
										ELSE
										BEGIN
											SELECT @Msj = 'No se pudo guardar la información 6'
												, @Estatus = 0;
										END
									END
									ELSE
									BEGIN
										SELECT @Msj = 'No se pudo guardar la información 5'
											, @Estatus = 0;
									END
								END
								ELSE
								BEGIN
									SELECT @Msj = 'No se pudo guardar la información 4'
										, @Estatus = 0;
								END
							END
							ELSE BEGIN
								SELECT @Msj = 'Imposible Procesar los Datos'
									, @Estatus = 0;
							END
						END
						ELSE
						BEGIN
							SELECT @Msj = 'No se pudo guardar la información 3'
								, @Estatus = 0;
						END
					END
					ELSE 
					BEGIN
						SELECT @Msj = 'No se pudo guardar la información 2'
							, @Estatus = 0;
						ROLLBACK TRANSACTION;
					END
				END
				ELSE
				BEGIN
					SELECT @Msj = 'Los Registros Fueron Procesados con Éxito!, Sin embargo no hay datos en CplDat002'
						, @Estatus = 1;
				END
			END
			ELSE 
			BEGIN
				SELECT @Msj = 'No se pudo guardar la información 1'
					, @Estatus = 0;
			END
			
			SELECT @Msj AS Message, @Estatus AS Id;
		END
		ELSE IF @Opcion = 2 
		BEGIN
			-- GUARDAR
			IF ISNULL(@ZonaERP, '') = '01' 
			BEGIN
				INSERT INTO Cajas01..CmoCat080 (Descripcion, Cantidad, Usuario, FechaAct, Status)
				VALUES (@Descripcion, @Cantidad, @Usuario, GETDATE(), 0);
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02' 
			BEGIN
				INSERT INTO Cajas02..CmoCat080 (Descripcion, Cantidad, Usuario, FechaAct, Status)
				VALUES (@Descripcion, @Cantidad, @Usuario, GETDATE(), 0);
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05' 
			BEGIN
				INSERT INTO Cajas05..CmoCat080 (Descripcion, Cantidad, Usuario, FechaAct, Status)
				VALUES (@Descripcion, @Cantidad, @Usuario, GETDATE(), 0);
			END

			SELECT 'Operación realizada correctamente' AS Message, 1 AS Id;
		END
		ELSE IF @Opcion = 3 
		BEGIN
			-- MODIFICAR
			IF ISNULL(@ZonaERP, '') = '01' 
			BEGIN
				UPDATE Cajas01..CmoCat080 
					SET Descripcion = @Descripcion,
						Cantidad = @Cantidad,
						Usuario = @Usuario,
						FechaAct = GETDATE()
				WHERE Codigo = @Codigo;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02' 
			BEGIN
				UPDATE Cajas02..CmoCat080 
					SET Descripcion = @Descripcion,
						Cantidad = @Cantidad,
						Usuario = @Usuario,
						FechaAct = GETDATE()
				WHERE Codigo = @Codigo;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05' 
			BEGIN
				UPDATE Cajas05..CmoCat080 
					SET Descripcion = @Descripcion,
						Cantidad = @Cantidad,
						Usuario = @Usuario,
						FechaAct = GETDATE()
				WHERE Codigo = @Codigo;
			END

			SELECT 'Operación realizada correctamente' AS Message, 1 AS Id;
		END
		ELSE IF @Opcion = 4
		BEGIN
			-- ELIMINAR
			IF ISNULL(@ZonaERP, '') = '01' 
			BEGIN
				UPDATE Cajas01..CmoCat080 
					SET Status = 1,
						FechaAct = GETDATE(),
						Usuario = @Usuario
				WHERE Codigo = @Codigo;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02' 
			BEGIN
				UPDATE Cajas02..CmoCat080 
					SET Status = 1,
						FechaAct = GETDATE(),
						Usuario = @Usuario
				WHERE Codigo = @Codigo;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05' 
			BEGIN
				UPDATE Cajas05..CmoCat080 
					SET Status = 1,
						FechaAct = GETDATE(),
						Usuario = @Usuario
				WHERE Codigo = @Codigo;
			END

			SELECT 'Operación realizada correctamente' AS Message, 1 AS Id;
		END

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		SELECT ERROR_MESSAGE() AS Message, 0 AS Id;
	END CATCH
END
GO


