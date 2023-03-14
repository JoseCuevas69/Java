USE [Cecsoplan02]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG017MWSPA1]    Script Date: 02/11/2022 11:13:04 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FCAPROG017MWSPA1]
	@Opcion INT								= NULL
	, @ZonaERP VARCHAR(2)					= NULL
	, @UsuarioERP VARCHAR(6)				= NULL
	, @ClaveMaquina VARCHAR(10)				= NULL
	, @CveMaqOri VARCHAR(10)				= NULL
	, @CveMaqDes VARCHAR(10)				= NULL
	, @IDJustificacion INT					= NULL
	, @Justificacion VARCHAR(MAX)			= NULL
	, @ClaveProceso VARCHAR(10)				= NULL
	, @pPzasSuaje INT						= NULL
	, @Programa INT							= NULL
	, @Cantidad INT							= NULL
	, @inmPost BIT							= NULL
	, @OP VARCHAR(12)						= NULL
	, @Fecha SMALLDATETIME					= NULL
	, @Quitar BIT							= NULL
	, @ImgAtencion BIT						= NULL
	, @lFecha SMALLDATETIME					= NULL
	, @Suspendido BIT						= NULL
	, @Cap005TD_001 CMODAT026TD_001			READONLY
	, @Cap005TD_002 CMODAT026TD_001			READONLY
	, @Cap001TD_001 CMODAT020TD_001			READONLY
	, @Cap001TD_001Selected CMODAT020TD_001	READONLY
	, @Cap016TD_001 CMODAT011TD_001			READONLY
AS BEGIN
	-- VARIABLES PARA CONTROL DE TABLA (@tmpCap005TD_001)
	DECLARE @Completado BIT = 0, @IDCap005TD_001 INT, @IDCap001TD_001 INT, @tPrograma VARCHAR(15), @tOp VARCHAR(12), @tCantidad INT, @tCantidadIni INT, @Value04 INT, @FechaSis VARCHAR(30)
		, @tMaqOrigen VARCHAR(10), @tCveProceso VARCHAR(10), @tUltimoProceso BIT, @tArticulo VARCHAR(15), @lPrograma INT, @tmpPrograma VARCHAR(15);
	DECLARE @lVelStd INT, @wActualizaVelStd BIT = 0, @CountTmpOpc19 INT, @EsPrimerProceso BIT = 0, @Actualizar2 BIT = 0, @UnionPegada BIT, @xClaveArticulo VARCHAR(15) = NULL
		, @lMinStdPrep SMALLINT, @abc VARCHAR(1), @lTiempo VARCHAR(10), @lMinProd REAL, @wEficiencia INT, @lHoras VARCHAR(10), @Industria VARCHAR(3), @DesVelSTD INT
		, @DescuentoVELSTD INT = 0, @msj VARCHAR(200), @tmpID INT, @tmpProrgama VARCHAR(15), @tClaveArticulo VARCHAR(9), @wActualizaEficiencia BIT = 0;
	DECLARE @tmp AS TABLE (Fecha VARCHAR(30));
	DECLARE @tmpCalculaHoras AS TABLE ( Duracion REAL, Horas INT, Minutos INT, Eficiencia INT, Tiempo VARCHAR(10), wVelStd INT );
	DECLARE @tmpCap005TD_001 AS TABLE(
		ID INT IDENTITY(1,1),
		Programa VARCHAR(15)
	);
	DECLARE @tmpCap005TD_002 AS TABLE(
		ID INT IDENTITY(1,1),
		Programa VARCHAR(15),
		Op VARCHAR(12),
		Cantidad INT,
		MaqOrigen VARCHAR(10),
		CveProceso VARCHAR(10),
		UltimoProceso BIT,
		Articulo VARCHAR(15)
	);
	DECLARE @tmpCap001TD_001 CMODAT020TD_001;
	DECLARE @tmpCap001TD_001Selected CMODAT020TD_001;
	DECLARE @tmpCap016TD_001 AS TABLE (
		ID INT IDENTITY(1,1) NOT NULL, Seleccionado BIT, UltimoProceso BIT, Op VARCHAR(20), Cliente VARCHAR(100), Articulo VARCHAR(60), Cantidad INT, LargoDes REAL, AnchoDes REAL, 
		PrimerColor VARCHAR(13), SegundoColor VARCHAR(13), TercerColor VARCHAR(13), CuartoColor VARCHAR(13), FechaEntrega SMALLDATETIME, MinutosProduccion SMALLINT, 
		Orden SMALLINT, Programa INT, Notas VARCHAR(200), FijarFecha SMALLDATETIME, ClaveArticulo VARCHAR(9), FechaTermino SMALLDATETIME, FechaInicio SMALLDATETIME, 
		Producido INT, Estatus CHAR(1), NotasOperacion VARCHAR(200), ClaveProceso VARCHAR(10), Proceso1 BIT, ProgramaCorr INT, ClaveArticulo2 VARCHAR(9), 
		FechaCorrug SMALLDATETIME, Suspendido BIT, Electronico BIT, Pintado BIT, Status VARCHAR(10), LiberadoDS BIT, PSI DECIMAL(18,2), 
		LBF DECIMAL(18,2), CompresionEspOtrosLBF DECIMAL(18,2), EProceso VARCHAR(500), Minimo DECIMAL(6,2), Maximo DECIMAL(6,2), ConScore BIT, EnAtencion BIT
	);
	DECLARE @tmpIDs AS TABLE (ID INT);

	INSERT INTO @tmpCap005TD_001 (Programa)
	SELECT Programa FROM @Cap005TD_001;

	INSERT INTO @tmpCap005TD_002 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo)
	SELECT Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo
	FROM @Cap005TD_002;

	INSERT INTO @tmpCap001TD_001 (
		Value00, Value01, Value02, Value03, Value04, Value05, Value06, Value07, Value08, Value09, 
		Value10, Value11, Value12, Value13, Value14, Value15, Value16, Value17, Value18, Value19, 
		Value20, Value21, Value22, Value23, Value24, Value25, Value26, Value27, Value28, Value29, 
		Value30, Value31, Value32, Value33, Value34, LargoDesarrollo, AnchoDesarrollo, 
		PrimerColor, SegundoColor, TercerColor, CuartoColor, MinutosProduccion, Electronico, 
		Status, LiberadoDS, PSI, EnAtencion
	)
	SELECT Value00, Value01, Value02, Value03, Value04, Value05, Value06, Value07, Value08, Value09, 
		Value10, Value11, Value12, Value13, Value14, Value15, Value16, Value17, Value18, Value19, 
		Value20, Value21, Value22, Value23, Value24, Value25, Value26, Value27, Value28, Value29, 
		Value30, Value31, Value32, Value33, Value34, LargoDesarrollo, AnchoDesarrollo, 
		PrimerColor, SegundoColor, TercerColor, CuartoColor, MinutosProduccion, Electronico, 
		Status, LiberadoDS, PSI, EnAtencion
	FROM @Cap001TD_001;

	INSERT INTO @tmpCap016TD_001 (
		Seleccionado, UltimoProceso, Op, Cliente, Articulo, Cantidad, LargoDes, AnchoDes, 
		PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaEntrega, MinutosProduccion, 
		Orden, Programa, Notas, FijarFecha, ClaveArticulo, FechaTermino, FechaInicio, 
		Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, ClaveArticulo2, 
		FechaCorrug, Suspendido, Electronico, Pintado, Status, LiberadoDS, PSI , 
		LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
	)
	SELECT Seleccionado, UltimoProceso, Op, Cliente, Articulo, Cantidad, LargoDes, AnchoDes, 
		PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaEntrega, MinutosProduccion, 
		Orden, Programa, Notas, FijarFecha, ClaveArticulo, FechaTermino, FechaInicio, 
		Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, ClaveArticulo2, 
		FechaCorrug, Suspendido, Electronico, Pintado, Status, LiberadoDS, PSI , 
		LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
	FROM @Cap016TD_001

	-- BUSCA ERROR
	IF @Opcion = 1
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			UPDATE Cajas01..CmoDat020
				SET Estatus = 'E'
			FROM Cajas01..CmoDat020 A
			JOIN Cajas01..CmoDat007 B ON A.Programa = B.Programa
			WHERE A.Estatus = 'Z';

			UPDATE Cajas01..CmoDat020
				SET Estatus = 'P'
			FROM Cajas01..CmoDat020
			WHERE Estatus = 'Z';
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			UPDATE Cajas02..CmoDat020
				SET Estatus = 'E'
			FROM Cajas02..CmoDat020 A
			JOIN Cajas02..CmoDat007 B ON A.Programa = B.Programa
			WHERE A.Estatus = 'Z';

			UPDATE Cajas02..CmoDat020
				SET Estatus = 'P'
			FROM Cajas02..CmoDat020
			WHERE Estatus = 'Z';
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			UPDATE Cajas05..CmoDat020
				SET Estatus = 'E'
			FROM Cajas05..CmoDat020 A
			JOIN Cajas05..CmoDat007 B ON A.Programa = B.Programa
			WHERE A.Estatus = 'Z';

			UPDATE Cajas05..CmoDat020
				SET Estatus = 'P'
			FROM Cajas05..CmoDat020
			WHERE Estatus = 'Z';
		END
	END
	-- CAMBIO DE IMPRESORA
	ELSE IF @Opcion = 2
	BEGIN
		-- SOLO PARA QUE NO PROVOQUE ERROR AL MODIFICAR SP
		SELECT TOP 1 * FROM CAJAS01..CMOTJCAT005;
	END
	-- CAMBIO DE MAQUINA
	ELSE IF @Opcion = 3
	BEGIN
		BEGIN TRANSACTION
		BEGIN TRY
			WHILE EXISTS(SELECT 1 FROM @tmpCap005TD_001)
			BEGIN
				SELECT TOP 1 @IDCap005TD_001 = ID, @tPrograma = Programa 
				FROM @tmpCap005TD_001;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					EXEC Cajas01..CmoSP739 @Opcion = 3, @Programa = @tPrograma;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					EXEC Cajas02..CmoSP739 @Opcion = 3, @Programa = @tPrograma;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					EXEC Cajas05..CmoSP739 @Opcion = 3, @Programa = @tPrograma;
				END

				DELETE FROM @tmpCap005TD_001 WHERE ID = @IDCap005TD_001;
			END

			DECLARE @tmpOpc19 AS TABLE (
				Proceso1 BIT, ProcesoCMODAT020 BIT, ClaveMaquina VARCHAR(5), VelocidadStd DECIMAL(6, 2)
			);

			WHILE EXISTS(SELECT 1 FROM @tmpCap005TD_002)
			BEGIN
				SELECT TOP 1 @IDCap005TD_001 = ID, @tPrograma = Programa, @tOp = Op, @tCantidad = Cantidad, @tMaqOrigen = MaqOrigen
					, @tCveProceso = CveProceso, @tUltimoProceso = UltimoProceso, @tArticulo = Articulo
					, @tCantidadIni = CASE WHEN UltimoProceso = 1 THEN Cantidad ELSE 0 END
				FROM @tmpCap005TD_002;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					-- LEE LAS VELOCIDADES DE OPERACION PARA CALCULO DE TIEMPO
					SELECT @lVelStd = A.[Velocidad Std], @wActualizaVelStd = 1
					FROM Cajas01..CmoDat026 A
					INNER JOIN (
						SELECT Y.[Area Unitaria] AS AreaUnitaria, X.OP
						FROM Cajas01..CmoDat011 X
						INNER JOIN Cajas01..CmoTjCat004 Y ON X.[Clave Articulo] = Y.[Clave Articulo]
						WHERE X.OP = @tOp
					) B ON B.OP = @tOp
					WHERE A.Estatus = 0 AND [Clave Maquina] = UPPER(@ClaveMaquina) -- MAQUINA DESTINO

					-- VALIDA QUE EXISTA EN LA TABLA CmoDat079, SI ENCUENTRA EL ARTICULO ACTIVO
					INSERT INTO @tmpOpc19 (Proceso1, ProcesoCMODAT020, ClaveMaquina, VelocidadStd)
					SELECT A.Proceso1, C.Proceso1, A.ClaveMaquina, A.VelocidadStd
					FROM Cajas01..CmoDat079 A
					INNER JOIN Cajas01..CmoDat011 B ON A.[ClaveArticulo] = B.[Clave Articulo]
					INNER JOIN Cajas01..CmoDat020 C ON C.OP = B.OP AND C.Programa = @tPrograma
					WHERE B.OP = @tOp AND A.Estatus = 0 AND A.ClaveMaquina = UPPER(@ClaveMaquina) -- MAQUINA DESTINO
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					-- LEE LAS VELOCIDADES DE OPERACION PARA CALCULO DE TIEMPO
					SELECT @lVelStd = A.[Velocidad Std], @wActualizaVelStd = 1
					FROM Cajas02..CmoDat026 A
					INNER JOIN (
						SELECT Y.[Area Unitaria] AS AreaUnitaria, X.OP
						FROM Cajas02..CmoDat011 X
						INNER JOIN Cajas02..CmoTjCat004 Y ON X.[Clave Articulo] = Y.[Clave Articulo]
						WHERE X.OP = @tOp
					) B ON B.OP = @tOp
					WHERE A.Estatus = 0 AND [Clave Maquina] = UPPER(@ClaveMaquina) -- MAQUINA DESTINO

					-- VALIDA QUE EXISTA EN LA TABLA CmoDat079, SI ENCUENTRA EL ARTICULO ACTIVO
					INSERT INTO @tmpOpc19 (Proceso1, ProcesoCMODAT020, ClaveMaquina, VelocidadStd)
					SELECT A.Proceso1, C.Proceso1, A.ClaveMaquina, A.VelocidadStd
					FROM Cajas02..CmoDat079 A
					INNER JOIN Cajas02..CmoDat011 B ON A.[ClaveArticulo] = B.[Clave Articulo]
					INNER JOIN Cajas02..CmoDat020 C ON C.OP = B.OP AND C.Programa = @tPrograma
					WHERE B.OP = @tOp AND A.Estatus = 0 AND A.ClaveMaquina = UPPER(@ClaveMaquina) -- MAQUINA DESTINO
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					-- LEE LAS VELOCIDADES DE OPERACION PARA CALCULO DE TIEMPO
					SELECT @lVelStd = A.[Velocidad Std], @wActualizaVelStd = 1
					FROM Cajas05..CmoDat026 A
					INNER JOIN (
						SELECT Y.[Area Unitaria] AS AreaUnitaria, X.OP
						FROM Cajas05..CmoDat011 X
						INNER JOIN Cajas05..CmoTjCat004 Y ON X.[Clave Articulo] = Y.[Clave Articulo]
						WHERE X.OP = @tOp
					) B ON B.OP = @tOp
					WHERE A.Estatus = 0 AND [Clave Maquina] = UPPER(@ClaveMaquina) -- MAQUINA DESTINO

					-- VALIDA QUE EXISTA EN LA TABLA CmoDat079, SI ENCUENTRA EL ARTICULO ACTIVO
					INSERT INTO @tmpOpc19 (Proceso1, ProcesoCMODAT020, ClaveMaquina, VelocidadStd)
					SELECT A.Proceso1, C.Proceso1, A.ClaveMaquina, A.VelocidadStd
					FROM Cajas05..CmoDat079 A
					INNER JOIN Cajas05..CmoDat011 B ON A.[ClaveArticulo] = B.[Clave Articulo]
					INNER JOIN Cajas05..CmoDat020 C ON C.OP = B.OP AND C.Programa = @tPrograma
					WHERE B.OP = @tOp AND A.Estatus = 0 AND A.ClaveMaquina = UPPER(@ClaveMaquina) -- MAQUINA DESTINO
				END

				SELECT @CountTmpOpc19 = COUNT(*) FROM @tmpOpc19;

				IF @CountTmpOpc19 > 1 
				BEGIN
					SELECT @msj = 'No fue posible hacer el cambio, Se ha detectado un posible error, favor de reportarlo a informática (1).';
				END 
				ELSE IF @CountTmpOpc19 = 1
				BEGIN
					SELECT TOP 1 @EsPrimerProceso = Proceso1 FROM @tmpOpc19;

					IF (SELECT TOP 1 ISNULL(VelocidadStd, 0) FROM @tmpOpc19) > 0
					BEGIN
						IF ISNULL(@EsPrimerProceso, 0) = 1
						BEGIN
							IF ISNULL((SELECT TOP 1 ProcesoCMODAT020 FROM @tmpOpc19), 0) = 1
							BEGIN
								SELECT TOP 1 @lVelStd = ISNULL(VelocidadStd, 0), @wActualizaVelStd = 1
								FROM @tmpOpc19;
							END
						END ELSE
						BEGIN
							SELECT TOP 1 @lVelStd = ISNULL(VelocidadStd, 0), @wActualizaVelStd = 1
							FROM @tmpOpc19;
						END
					END

					IF ISNULL(@tUltimoProceso, 0) = 1 AND ISNULL(@wActualizaVelStd, 0) = 0
					BEGIN
						SELECT @msj = 'No fue posible actualizar debido a que no encontro la velocidad estándar de la máquina';
					END ELSE
					BEGIN
						SELECT @Actualizar2 = 0;

						-- SE GUARDA JUSTIFICACION
						IF RTRIM(ISNULL(@Justificacion, '')) != ''
						BEGIN
							IF ISNULL(@ZonaERP, '') = '01'
							BEGIN
								INSERT INTO Cajas01..CmoDat231 (Programa, Justificacion, UsuarioERP, FCPRJUCAPRId)
								VALUES (@tPrograma, RTRIM(ISNULL(@Justificacion, '')), @UsuarioERP, @IDJustificacion);
							END
							ELSE IF ISNULL(@ZonaERP, '') = '02'
							BEGIN
								INSERT INTO Cajas02..CmoDat231 (Programa, Justificacion, UsuarioERP, FCPRJUCAPRId)
								VALUES (@tPrograma, RTRIM(ISNULL(@Justificacion, '')), @UsuarioERP, @IDJustificacion);
							END
							ELSE IF ISNULL(@ZonaERP, '') = '05'
							BEGIN
								INSERT INTO Cajas05..CmoDat231 (Programa, Justificacion, UsuarioERP, FCPRJUCAPRId)
								VALUES (@tPrograma, RTRIM(ISNULL(@Justificacion, '')), @UsuarioERP, @IDJustificacion);
							END
						END

						IF ISNULL(@tUltimoProceso, 0) = 1
						BEGIN
							/* Si es una op de ultimo proceso executa el siguiente codigo, 
							para programar la op en la maquina destino y descuenta la cantidad traspasada a la op original. */
							SELECT @lVelStd = CASE WHEN ISNULL(@wActualizaVelStd, 0) = 1 THEN @lVelStd ELSE NULL END;

							IF ISNULL(@ZonaERP, '') = '01'
							BEGIN
								EXEC Cajas01..CmoSP301 
									@MaquinaDes		= @ClaveMaquina,	@ClaveProceso	= @tCveProceso,
									@UltimoProceso	= @tUltimoProceso,	@OP				= @tOp,
									@CveMaquinaOrg	= @tMaqOrigen,		@Programa		= @tPrograma,
									@Cantidad		= @tCantidad,		@VelocidadStd	= @lVelStd;
							END
							ELSE IF ISNULL(@ZonaERP, '') = '02'
							BEGIN
								EXEC Cajas02..CmoSP301
									@MaquinaDes		= @ClaveMaquina,	@ClaveProceso	= @tCveProceso,
									@UltimoProceso	= @tUltimoProceso,	@OP				= @tOp,
									@CveMaquinaOrg	= @tMaqOrigen,		@Programa		= @tPrograma,
									@Cantidad		= @tCantidad,		@VelocidadStd	= @lVelStd;
							END
							ELSE IF ISNULL(@ZonaERP, '') = '05'
							BEGIN
								EXEC Cajas05..CmoSP301 
									@MaquinaDes		= @ClaveMaquina,	@ClaveProceso	= @tCveProceso,
									@UltimoProceso	= @tUltimoProceso,	@OP				= @tOp,
									@CveMaquinaOrg	= @tMaqOrigen,		@Programa		= @tPrograma,
									@Cantidad		= @tCantidad,		@VelocidadStd	= @lVelStd;
							END

							SELECT @Actualizar2 = 1;
						END ELSE
						BEGIN
							IF ISNULL(@ZonaERP, '') = '01'
							BEGIN
								-- OBTIENE TIEMPO ESTANDAR DE PREPARACION
								SELECT TOP 1 @lMinStdPrep = ISNULL([Tiempo Std], 0)
								FROM Cajas01..CmoDat018 
								WHERE [Clave Proceso] = @tCveProceso AND [Clave Maquina] = @ClaveMaquina;
								
								-- ACTUALIZA EL CAMBIO DE PROCESO
								UPDATE Cajas01..CmoDat020 SET
									[Clave Proceso] = @tCveProceso,
									[Minutos Preparacion] = @lMinStdPrep
								WHERE Programa = @tPrograma;
							END
							ELSE IF ISNULL(@ZonaERP, '') = '02'
							BEGIN
								-- OBTIENE TIEMPO ESTANDAR DE PREPARACION
								SELECT TOP 1 @lMinStdPrep = ISNULL([Tiempo Std], 0)
								FROM Cajas02..CmoDat018 
								WHERE [Clave Proceso] = @tCveProceso AND [Clave Maquina] = @ClaveMaquina;

								-- VALIDACION PARA BUSCAR SI SE ENCUENTRA EN EL CATALOGO DE ARTICULOS ESPECIALES
								-- PENDIENTE
								--SELECT @lMinStdPrep = CASE WHEN ISNULL(SetUp, 0) > 0 THEN [Tiempo Std] ELSE @lMinStdPrep END
								--FROM Cajas02..CmoDat079 
								--WHERE ClaveArticulo = @tArticulo;

								-- ACTUALIZA EL CAMBIO DE PROCESO
								UPDATE Cajas02..CmoDat020 SET
									[Clave Proceso] = @tCveProceso,
									[Minutos Preparacion] = @lMinStdPrep
								WHERE Programa = @tPrograma;
							END
							ELSE IF ISNULL(@ZonaERP, '') = '05'
							BEGIN
								-- OBTIENE TIEMPO ESTANDAR DE PREPARACION
								SELECT TOP 1 @lMinStdPrep = ISNULL([Tiempo Std], 0)
								FROM Cajas05..CmoDat018 
								WHERE [Clave Proceso] = @tCveProceso AND [Clave Maquina] = @ClaveMaquina;

								-- ACTUALIZA EL CAMBIO DE PROCESO
								UPDATE Cajas05..CmoDat020 SET
									[Clave Proceso] = @tCveProceso,
									[Minutos Preparacion] = @lMinStdPrep
								WHERE Programa = @tPrograma;
							END

							SELECT @abc = 'C' -- AGREGAR EL ARTÍCULO

							-- ----------------------------------------------------------------------------------------------------
							-- CALCULA HORAS | @ClaveMaquina, @tPrograma, @tCantidad
							-- @ClaveMaquina, @tOP, @tCantidad, ref lTiempo, @PzasSuaje (0), @AreaUnitaria (0), @Proceso (''), @ClaveArticulo (@tArticulo), ref lEficiencia
							INSERT INTO @tmpCalculaHoras (Duracion, Horas, Minutos, Eficiencia, Tiempo, wVelStd)
							EXEC dbo.FCAPROG017MWSPC3 
								@Opcion			= 12,	@ClaveMaquina	= @ClaveMaquina,
								@OP				= @tOP, @Cantidad		= @tCantidad,
								@PzasSuaje		= 0,	@AreaUnitaria	= 0,
								@Proceso		= '',	@ClaveArticulo	= @tArticulo;

							-- 
							IF EXISTS(SELECT 1 FROM @tmpCalculaHoras)
							BEGIN
								SELECT TOP 1 
									@lMinProd = Duracion,
									@lHoras = Tiempo,
									@lVelStd = wVelStd,
									@wEficiencia = Eficiencia
								FROM @tmpCalculaHoras;

								-- @tCveProceso
								SELECT @pPzasSuaje = 
									CASE WHEN @tCveProceso = 'PEGCA' OR @tCveProceso = 'PEG' OR @tCveProceso = 'RAPE' OR @tCveProceso = 'RTP' OR @tCveProceso = 'ENG' OR
											@tCveProceso = '1CRP' OR @tCveProceso = '1CRTP' OR @tCveProceso = '1CTP' OR @tCveProceso = '2CRP' OR @tCveProceso = '2RTP' OR
											@tCveProceso = '2CRTP' OR @tCveProceso = '2CTP' OR @tCveProceso = '3CRP' OR @tCveProceso = '3CRTP' OR @tCveProceso = '4CRP' OR @tCveProceso = '4CRTP'
										THEN 1
										ELSE @pPzasSuaje
									END;

								IF ISNULL(@ZonaERP, '') = '01'
								BEGIN
									SELECT --AA.Industria, D.UnionPegada, D.Clave, D.Descripcion AS Ruta
										@UnionPegada = 
											CASE WHEN ISNULL(RTRIM(D.Clave), '') != '' AND ISNULL(RTRIM(D.Descripcion), '') != ''
												THEN D.UnionPegada
												ELSE @UnionPegada
											END,
										@Industria = AA.Industria
									FROM Cajas01..CmoDat011 B
									JOIN Cajas01..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
									JOIN Cajas01..CmoCat013 AA ON A.SubCodigo = AA.SubCodigo
									JOIN Cajas01..CmoDat010 C ON C.OP = B.Folio_OP
									LEFT JOIN Cajas01..CmoCat044 D ON A.Proceso = D.Clave AND A.Status = 0
									LEFT JOIN Cajas01..CmoDat088 E ON B.OP = E.OP
									WHERE B.OP = @tOp;
								END
								ELSE IF ISNULL(@ZonaERP, '') = '02'
								BEGIN
									SELECT --AA.Industria, D.UnionPegada, D.Clave, D.Descripcion AS Ruta
										@UnionPegada = 
											CASE WHEN ISNULL(RTRIM(D.Clave), '') != '' AND ISNULL(RTRIM(D.Descripcion), '') != ''
												THEN D.UnionPegada
												ELSE @UnionPegada
											END,
										@Industria = AA.Industria
									FROM Cajas02..CmoDat011 B
									JOIN Cajas02..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
									JOIN Cajas02..CmoCat013 AA ON A.SubCodigo = AA.SubCodigo
									JOIN Cajas02..CmoDat010 C ON C.OP = B.Folio_OP
									LEFT JOIN Cajas02..CmoCat044 D ON A.Proceso = D.Clave AND A.Status = 0
									LEFT JOIN Cajas02..CmoDat088 E ON B.OP = E.OP
									WHERE B.OP = @tOp;
								END
								ELSE IF ISNULL(@ZonaERP, '') = '05'
								BEGIN
									SELECT --AA.Industria, D.UnionPegada, D.Clave, D.Descripcion AS Ruta
										@UnionPegada = 
											CASE WHEN ISNULL(RTRIM(D.Clave), '') != '' AND ISNULL(RTRIM(D.Descripcion), '') != ''
												THEN D.UnionPegada
												ELSE @UnionPegada
											END,
										@Industria = AA.Industria
									FROM Cajas05..CmoDat011 B
									JOIN Cajas05..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
									JOIN Cajas05..CmoCat013 AA ON A.SubCodigo = AA.SubCodigo
									JOIN Cajas05..CmoDat010 C ON C.OP = B.Folio_OP
									LEFT JOIN Cajas05..CmoCat044 D ON A.Proceso = D.Clave AND A.Status = 0
									LEFT JOIN Cajas05..CmoDat088 E ON B.OP = E.OP
									WHERE B.OP = @tOp;
								END

								IF ISNULL(@EsPrimerProceso, 0) = 1
								BEGIN
									IF ISNULL(@ZonaERP, '') = '01'
									BEGIN
										SELECT @xClaveArticulo = ISNULL(ClaveArticulo, '')--, Proceso1, ClaveMaquina, VelocidadStd
										FROM Cajas01..CmoDat079
										WHERE ClaveArticulo = @tOP AND Estatus = 0; -- PENDIENTE FILTRO OP O ARTICULO
									END
									ELSE IF ISNULL(@ZonaERP, '') = '02'
									BEGIN
										SELECT @xClaveArticulo = ISNULL(ClaveArticulo, '')--, Proceso1, ClaveMaquina, VelocidadStd
										FROM Cajas02..CmoDat079
										WHERE ClaveArticulo = @tOP AND Estatus = 0; -- PENDIENTE FILTRO OP O ARTICULO
									END
									ELSE IF ISNULL(@ZonaERP, '') = '05'
									BEGIN
										SELECT @xClaveArticulo = ISNULL(ClaveArticulo, '')--, Proceso1, ClaveMaquina, VelocidadStd
										FROM Cajas05..CmoDat079
										WHERE ClaveArticulo = @tOP AND Estatus = 0; -- PENDIENTE FILTRO OP O ARTICULO
									END
								END

								SELECT @ClaveMaquina = ISNULL(RTRIM(@ClaveMaquina), ''), @Industria = ISNULL(RTRIM(@Industria), ''), @UnionPegada = ISNULL(RTRIM(@UnionPegada), 0)
									, @tCveProceso = ISNULL(RTRIM(@tCveProceso), ''), @xClaveArticulo = ISNULL(@xClaveArticulo, '')
									
								IF (
									@ClaveMaquina = '' AND (@Industria = 'AGR' OR @Industria = 'PAR') AND @UnionPegada = 1 AND
									(
										@tCveProceso = '1CT' OR @tCveProceso = '1CRT' OR
										@tCveProceso = '2CT' OR @tCveProceso = '2CRT' OR
										@tCveProceso = '3CT' OR @tCveProceso = '3CRT'
									) AND @xClaveArticulo = ''
								)
								BEGIN
									SELECT @DesVelSTD = 24;
								END

								IF @tCveProceso = 'FLITHO'
								BEGIN
									SELECT @DescuentoVELSTD = 
										CASE WHEN @ClaveMaquina = 'FLEX3' THEN 63 
											WHEN @ClaveMaquina = 'McKin' OR @ClaveMaquina = 'OKLAH' THEN 39
											WHEN @ClaveMaquina = 'WARD1' THEN 60
											ELSE 0
										END;
								END
								
								SELECT @pPzasSuaje = CASE WHEN ISNULL(@pPzasSuaje, 0) = 0 THEN 1 ELSE @pPzasSuaje END
								IF ISNULL(@ZonaERP, '') = '01'
								BEGIN
									UPDATE Cajas01..CmoDat020 SET
										[Clave Maquina]	= @ClaveMaquina,
										[Minutos Produccion] = @lMinProd,
										[Velocidad Std] = @lVelStd,
										Orden = 0, -- PENDIENTE
										[Piezas Corte] = @pPzasSuaje,
										Eficiencia = @wEficiencia,
										DesVelSTD = @DescuentoVELSTD
									WHERE Programa = @tPrograma;
								END
								ELSE IF ISNULL(@ZonaERP, '') = '02'
								BEGIN
									UPDATE Cajas02..CmoDat020 SET
										[Clave Maquina]	= @ClaveMaquina,
										[Minutos Produccion] = @lMinProd,
										[Velocidad Std] = @lVelStd,
										Orden = 0, -- PENDIENTE
										[Piezas Corte] = @pPzasSuaje,
										Eficiencia = @wEficiencia,
										DesVelSTD = @DescuentoVELSTD
									WHERE Programa = @tPrograma;
								END
								ELSE IF ISNULL(@ZonaERP, '') = '05'
								BEGIN
									UPDATE Cajas05..CmoDat020 SET
										[Clave Maquina]	= @ClaveMaquina,
										[Minutos Produccion] = @lMinProd,
										[Velocidad Std] = @lVelStd,
										Orden = 0, -- PENDIENTE
										[Piezas Corte] = @pPzasSuaje,
										Eficiencia = @wEficiencia,
										DesVelSTD = @DescuentoVELSTD
									WHERE Programa = @tPrograma;
								END

								SELECT @Actualizar2 = 1;
							END
							-- ----------------------------------------------------------------------------------------------------
						END
					END
				END
				ELSE BEGIN
					SELECT @msj = 'No fue posible hacer el cambio, Se ha detectado un posible error, favor de reportarlo a informática (2).';
				END
			END
			
			COMMIT TRANSACTION;
			SELECT @Actualizar2 AS Completado
				, CASE WHEN @Actualizar2 = 1 THEN 'OK' ELSE @msj END AS Message;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			SELECT CONVERT(BIT, 0) AS Completado, ERROR_MESSAGE() AS Message;
		END CATCH
	END
	-- REORDENAR LOS ELEMENTOS DEL INMEDIATO POSTERIOR EN ADELANTE
	ELSE IF @Opcion = 4
	BEGIN
		-- @Justificacion, @inmPost, @Cap001TD_001, @Cap001TD_001Selected

		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;

		SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), 'dd/MM/yyyy HH:mm:ss')) FROM @tmp;

		BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @renInmPos INT = 0, @countRegistros INT = 0;

			SELECT TOP 1 @renInmPos = ISNULL(Value00, 0) + 1 
				, @Programa = Value15, @Value04 = Value04
				, @tArticulo = Value18
			FROM @Cap001TD_001Selected;

			IF ISNULL(@inmPost, 0) = 1
			BEGIN
				SELECT @countRegistros = COUNT(*) FROM @tmpCap001TD_001;
				
				IF @countRegistros >= @renInmPos
				BEGIN
					-- REORDENAR LOS ELEMENTOS DEL INMEDIATO POSTERIOR EN ADELANTE
					WHILE @renInmPos <= @countRegistros
					BEGIN
						SELECT TOP 1 @tPrograma = Value15 FROM @tmpCap001TD_001 WHERE Value00 = @renInmPos;

						IF ISNULL(@ZonaERP, '') = '01'
						BEGIN
							UPDATE Cajas01..CmoDat020 SET Orden = Orden - 1
							WHERE Programa = @tPrograma;
						END
						ELSE IF ISNULL(@ZonaERP, '') = '02'
						BEGIN
							UPDATE Cajas02..CmoDat020 SET Orden = Orden - 1
							WHERE Programa = @tPrograma;
						END
						ELSE IF ISNULL(@ZonaERP, '') = '05'
						BEGIN
							UPDATE Cajas05..CmoDat020 SET Orden = Orden - 1
							WHERE Programa = @tPrograma;
						END

						SELECT @renInmPos = @renInmPos + 1;
					END

					SELECT @renInmPos = @renInmPos - 1;
				END
			END

			DECLARE @tmpCmoDat020 AS TABLE (
				Programa INT, ClaveMaquina VARCHAR(12), FechaPrograma SMALLDATETIME, HoraPrograma VARCHAR(8), OP VARCHAR(20), FechaEntrega SMALLDATETIME, Cantidad INT, 
				ClaveProceso VARCHAR(10), Suaje VARCHAR(16), Dado VARCHAR(16), PiezasCorte DECIMAL(4,2), MinutosPreparacion SMALLINT, MinutosProduccion SMALLINT, UltimoProceso BIT, 
				Pegado BIT, PrimerColor VARCHAR(13), SegundoColor VARCHAR(13), TercerColor VARCHAR(13), CuartoColor VARCHAR(13), FechaSistema SMALLDATETIME, HoraSistema VARCHAR(8), 
				Estatus VARCHAR(1), Imprime BIT, Orden SMALLINT, TipoMaquina VARCHAR(2), Usuario VARCHAR(6), Notas VARCHAR(200), VelocidadStd NUMERIC(18,1), tProceso TINYINT, 
				Medida1 DECIMAL(8,3), Medida2 DECIMAL(8,3), Medida3 DECIMAL(8,3), Medida4 DECIMAL(8,3), ProgramaCorr INT, Eficiencia DECIMAL(6,4), Proceso1 BIT
			);

			SELECT @lPrograma = NULL;
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				SELECT TOP 1 @lPrograma = ISNULL(Impresora, 0) FROM Cajas01..CmoDat005;
				
				INSERT INTO @tmpCmoDat020 (
					Programa, ClaveMaquina, FechaPrograma, HoraPrograma, OP, FechaEntrega, Cantidad, ClaveProceso, Suaje, Dado, PiezasCorte, MinutosPreparacion, 
					MinutosProduccion, UltimoProceso, Pegado, PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaSistema, HoraSistema, Estatus, Imprime, 
					Orden, TipoMaquina, Usuario, Notas, VelocidadStd, tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
				)
				SELECT Programa, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [piezas Corte], [Minutos Preparacion], 
					[Minutos Produccion], [Ultimo Proceso], Pegado, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema], [hora sistema], Estatus, Imprime, 
					Orden, [Tipo Maquina], Usuario, Notas, [Velocidad Std], tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
				FROM Cajas01..CmoDat020
				WHERE Programa = @Programa;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				SELECT TOP 1 @lPrograma = ISNULL(Impresora, 0) FROM Cajas02..CmoDat005;
				
				INSERT INTO @tmpCmoDat020 (
					Programa, ClaveMaquina, FechaPrograma, HoraPrograma, OP, FechaEntrega, Cantidad, ClaveProceso, Suaje, Dado, PiezasCorte, MinutosPreparacion, 
					MinutosProduccion, UltimoProceso, Pegado, PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaSistema, HoraSistema, Estatus, Imprime, 
					Orden, TipoMaquina, Usuario, Notas, VelocidadStd, tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
				)
				SELECT Programa, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado,
					CASE WHEN 
						[Clave Proceso] = 'RAPE' OR [Clave Proceso] = '2CRP' OR [Clave Proceso] = 'PEG' OR [Clave Proceso] = '1CRTP' OR [Clave Proceso] = '3CRP' OR 
						[Clave Proceso] = '1CRP' OR [Clave Proceso] = '2RTP' OR [Clave Proceso] = 'RTP' OR [Clave Proceso] = '2CRTP' OR [Clave Proceso] = '4CRP' OR 
						[Clave Proceso] = '1CTP' OR [Clave Proceso] = '2CTP' OR [Clave Proceso] = 'ENG' OR [Clave Proceso] = '3CRTP' OR [Clave Proceso] = '4CRTP'
							THEN '1'
							ELSE [piezas Corte] 
						END as [piezas Corte],
					[Minutos Preparacion], [Minutos Produccion], [Ultimo Proceso], Pegado, [1er Color], [2do Color], [3er Color], [4to Color],
					[Fecha Sistema], [hora sistema], Estatus, Imprime, Orden, [Tipo Maquina], Usuario, Notas, [Velocidad Std],
					tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
				FROM Cajas01..CmoDat020
				WHERE Programa = @Programa;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				SELECT TOP 1 @lPrograma = ISNULL(Impresora, 0) FROM Cajas05..CmoDat005;
				
				INSERT INTO @tmpCmoDat020 (
					Programa, ClaveMaquina, FechaPrograma, HoraPrograma, OP, FechaEntrega, Cantidad, ClaveProceso, Suaje, Dado, PiezasCorte, MinutosPreparacion, 
					MinutosProduccion, UltimoProceso, Pegado, PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaSistema, HoraSistema, Estatus, Imprime, 
					Orden, TipoMaquina, Usuario, Notas, VelocidadStd, tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
				)
				SELECT Programa, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [piezas Corte], [Minutos Preparacion], 
					[Minutos Produccion], [Ultimo Proceso], Pegado, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema], [hora sistema], Estatus, Imprime, 
					Orden, [Tipo Maquina], Usuario, Notas, [Velocidad Std], tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
				FROM Cajas01..CmoDat020
				WHERE Programa = @Programa;
			END


			IF EXISTS (SELECT 1 FROM @tmpCmoDat020)
			BEGIN
				SELECT TOP 1 @tmpPrograma = Programa
				FROM @tmpCmoDat020;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO Cajas01..CmoDat020 (
						Programa, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [piezas Corte], [Minutos Preparacion], 
						[Minutos Produccion], [Ultimo Proceso], Pegado, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema], [hora sistema], Estatus, Imprime, 
						Orden, [Tipo Maquina], Usuario, Notas, [Velocidad Std], tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
					)
					SELECT Programa, ClaveMaquina, LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), OP, FechaEntrega, @Cantidad, ClaveProceso, Suaje, Dado, PiezasCorte, MinutosPreparacion, 
						0/*MinutosProduccion*/, UltimoProceso, Pegado, RTRIM(PrimerColor), RTRIM(SegundoColor), RTRIM(TercerColor), RTRIM(CuartoColor), LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), 'P'/*Estatus*/, 1/*Imprime*/, 
						@renInmPos/*Orden*/, TipoMaquina, @UsuarioERP, RTRIM(Notas), VelocidadStd, tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
					FROM @tmpCmoDat020;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					INSERT INTO Cajas02..CmoDat020 (
						Programa, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [piezas Corte], [Minutos Preparacion], 
						[Minutos Produccion], [Ultimo Proceso], Pegado, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema], [hora sistema], Estatus, Imprime, 
						Orden, [Tipo Maquina], Usuario, Notas, [Velocidad Std], tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
					)
					SELECT Programa, ClaveMaquina, LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), OP, FechaEntrega, @Cantidad, ClaveProceso, Suaje, Dado, PiezasCorte, MinutosPreparacion, 
						0/*MinutosProduccion*/, UltimoProceso, Pegado, RTRIM(PrimerColor), RTRIM(SegundoColor), RTRIM(TercerColor), RTRIM(CuartoColor), LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), 'P'/*Estatus*/, 1/*Imprime*/, 
						@renInmPos/*Orden*/, TipoMaquina, @UsuarioERP, RTRIM(Notas), VelocidadStd, tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
					FROM @tmpCmoDat020;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO Cajas05..CmoDat020 (
						Programa, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [piezas Corte], [Minutos Preparacion], 
						[Minutos Produccion], [Ultimo Proceso], Pegado, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema], [hora sistema], Estatus, Imprime, 
						Orden, [Tipo Maquina], Usuario, Notas, [Velocidad Std], tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
					)
					SELECT Programa, ClaveMaquina, LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), OP, FechaEntrega, @Cantidad, ClaveProceso, Suaje, Dado, PiezasCorte, MinutosPreparacion, 
						0/*MinutosProduccion*/, UltimoProceso, Pegado, RTRIM(PrimerColor), RTRIM(SegundoColor), RTRIM(TercerColor), RTRIM(CuartoColor), LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), 'P'/*Estatus*/, 1/*Imprime*/, 
						@renInmPos/*Orden*/, TipoMaquina, @UsuarioERP, RTRIM(Notas), VelocidadStd, tProceso, Medida1, Medida2, Medida3, Medida4, ProgramaCorr, Eficiencia, Proceso1
					FROM @tmpCmoDat020;
				END

				SELECT @Cantidad = @Value04 - @Cantidad;

				-- CALCULA HORAS | @ClaveMaquina, @tmpPrograma, @tCantidad
				-- @ClaveMaquina, @tOP, @tCantidad, ref lTiempo, @PzasSuaje (0), @AreaUnitaria (0), @Proceso (''), @ClaveArticulo (@tArticulo), ref lEficiencia
				INSERT INTO @tmpCalculaHoras (Duracion, Horas, Minutos, Eficiencia, Tiempo, wVelStd)
				EXEC dbo.FCAPROG017MWSPC3 
					@Opcion			= 12,			@ClaveMaquina	= @ClaveMaquina,
					@OP				= @tmpPrograma, @Cantidad		= @Cantidad,
					@PzasSuaje		= 0,			@AreaUnitaria	= 0,
					@Proceso		= '',			@ClaveArticulo	= @tArticulo; -- CALCULA HORAS

				IF EXISTS(SELECT 1 FROM @tmpCalculaHoras)
				BEGIN
					SELECT TOP 1 
						@lMinProd = Duracion,
						@lHoras = Tiempo,
						@lVelStd = wVelStd,
						@wEficiencia = Eficiencia
					FROM @tmpCalculaHoras;

					IF ISNULL(@ZonaERP, '') = '01'
					BEGIN
						UPDATE Cajas01..CmoDat020 SET
							Cantidad = @Cantidad,
							[Minutos Produccion] = @lMinProd
						WHERE Programa = @Programa;

						UPDATE Cajas01..Cmodat005 SET Impresora = @lPrograma + 1;

						-- ACTUALIZA JUSTIFICACION
						IF ISNULL(LTRIM(RTRIM(@Justificacion)), '') != ''
						BEGIN
							INSERT INTO Cajas01..CmoDat231 (Programa, Justificacion, UsuarioERP)
							VALUES (@Programa, @Justificacion, @UsuarioERP);
						END
					END
					ELSE IF ISNULL(@ZonaERP, '') = '02'
					BEGIN
						UPDATE Cajas02..CmoDat020 SET
							Cantidad = @Cantidad,
							[Minutos Produccion] = @lMinProd
						WHERE Programa = @Programa;

						UPDATE Cajas02..Cmodat005 SET Impresora = @lPrograma + 1;

						-- ACTUALIZA JUSTIFICACION
						IF ISNULL(LTRIM(RTRIM(@Justificacion)), '') != ''
						BEGIN
							INSERT INTO Cajas02..CmoDat231 (Programa, Justificacion, UsuarioERP)
							VALUES (@Programa, @Justificacion, @UsuarioERP);
						END
					END
					ELSE IF ISNULL(@ZonaERP, '') = '05'
					BEGIN
						UPDATE Cajas05..CmoDat020 SET
							Cantidad = @Cantidad,
							[Minutos Produccion] = @lMinProd
						WHERE Programa = @Programa;

						UPDATE Cajas05..Cmodat005 SET Impresora = @lPrograma + 1;

						-- ACTUALIZA JUSTIFICACION
						IF ISNULL(LTRIM(RTRIM(@Justificacion)), '') != ''
						BEGIN
							INSERT INTO Cajas05..CmoDat231 (Programa, Justificacion, UsuarioERP)
							VALUES (@Programa, @Justificacion, @UsuarioERP);
						END
					END
				END
			END
			
			SELECT @Completado = 1;
			COMMIT TRANSACTION;
			SELECT @Completado AS Completado;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			SELECT @Completado AS Completado;
		END CATCH
	END
	-- FIJAR FECHA CAP004
	ELSE IF @Opcion = 5
	BEGIN
		BEGIN TRANSACTION
		BEGIN TRY
			SELECT @Fecha = CASE WHEN ISNULL(@Quitar, 0) = 1 THEN NULL ELSE @Fecha END;
		
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				UPDATE Cajas01..CmoDat020 SET FijarFecha = @Fecha
				WHERE Programa = @Programa AND OP = @OP AND [Clave Maquina] = @ClaveMaquina
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				UPDATE Cajas02..CmoDat020 SET FijarFecha = @Fecha
				WHERE Programa = @Programa AND OP = @OP AND [Clave Maquina] = @ClaveMaquina
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				UPDATE Cajas05..CmoDat020 SET FijarFecha = @Fecha
				WHERE Programa = @Programa AND OP = @OP AND [Clave Maquina] = @ClaveMaquina
			END

			SELECT @Completado = 1;
			SELECT @Completado AS Completado, 'success' AS TypeMessage, 'Se modificó la fecha correctamente' AS Message;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			SELECT @Completado = 0;
			SELECT @Completado AS Completado, 'error' AS TypeMessage, ERROR_MESSAGE() AS Message;
		END CATCH
	END
	-- ELIMINAR OP DE SECUENCIA
	ELSE IF @Opcion = 6
	BEGIN
		-- @ZonaERP, @UsuarioERP, @ImgAtencion, @Justificacion, @ClaveMaquina
		-- @tmpCap005TD_001 = @Cap005TD_001
		-- @tmpCap005TD_002 = @Cap005TD_001
		-- @tmpID, @tmpPrograma

		BEGIN TRANSACTION
		BEGIN TRY
			WHILE EXISTS(SELECT 1 FROM @tmpCap005TD_001)
			BEGIN
				SELECT TOP 1 @tmpID = ID, @tmpPrograma = Programa FROM @tmpCap005TD_001;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					EXEC Cajas01..CmoSP739 @Opcion = 3, @Programa = @tmpPrograma;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					EXEC Cajas02..CmoSP739 @Opcion = 3, @Programa = @tmpPrograma;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					EXEC Cajas05..CmoSP739 @Opcion = 3, @Programa = @tmpPrograma;
				END

				DELETE FROM @tmpCap005TD_001 WHERE ID = @tmpID;
			END

			SELECT @tmpID = NULL, @tmpPrograma = NULL;
			WHILE EXISTS(SELECT 1 FROM @tmpCap001TD_001)
			BEGIN
				--SELECT TOP 1 @tmpID = ID, @tmpPrograma = Programa, @tOp = OP, @tMaqOrigen = MaqOrigen FROM @tmpCap005TD_002;
				-- PENDIENTE
				SELECT TOP 1 @tmpID = Value00, @tmpPrograma = Value15, @tOp = Value01 FROM @tmpCap001TD_001;
				
				-- VALIDA JUSTIFICACIÓN PARA GUARDAR
				IF ISNULL(@Justificacion, '') != ''
				BEGIN
					IF ISNULL(@ZonaERP, '') =  '01'
					BEGIN
						INSERT INTO Cajas01..CmoDat231 (Programa, Justificacion, UsuarioERP) VALUES (@tmpPrograma, ISNULL(@Justificacion, ''), @usuarioERP);
					END
					ELSE IF ISNULL(@ZonaERP, '') =  '02'
					BEGIN
						INSERT INTO Cajas02..CmoDat231 (Programa, Justificacion, UsuarioERP) VALUES (@tmpPrograma, ISNULL(@Justificacion, ''), @usuarioERP);
					END
					ELSE IF ISNULL(@ZonaERP, '') =  '05'
					BEGIN
						INSERT INTO Cajas05..CmoDat231 (Programa, Justificacion, UsuarioERP) VALUES (@tmpPrograma, ISNULL(@Justificacion, ''), @usuarioERP);
					END
				END

				IF ISNULL(@ImgAtencion, 0) = 1
				BEGIN
					IF ISNULL(@ZonaERP, '') =  '01'
					BEGIN
						UPDATE Cajas01..CmoDat020 SET
							Imprime = 0, Estatus = 'C'
						WHERE Estatus IN('P', 'E') AND OP = @tOP;
					END
					ELSE IF ISNULL(@ZonaERP, '') =  '02'
					BEGIN
						UPDATE Cajas02..CmoDat020 SET
							Imprime = 0, Estatus = 'C'
						WHERE Estatus IN('P', 'E') AND OP = @tOP;
					END
					ELSE IF ISNULL(@ZonaERP, '') =  '05'
					BEGIN
						UPDATE Cajas05..CmoDat020 SET
							Imprime = 0, Estatus = 'C'
						WHERE Estatus IN('P', 'E') AND OP = @tOP;
					END
				END ELSE
				BEGIN
					IF ISNULL(@ZonaERP, '') =  '01'
					BEGIN
						UPDATE Cajas01..CmoDat020 SET
							Imprime = 0, Estatus = 'C'
						WHERE [Clave Maquina] = @ClaveMaquina AND OP = @tOP AND Programa = @tmpPrograma;
					END
					ELSE IF ISNULL(@ZonaERP, '') =  '02'
					BEGIN
						UPDATE Cajas02..CmoDat020 SET
							Imprime = 0, Estatus = 'C'
						WHERE [Clave Maquina] = @ClaveMaquina AND OP = @tOP AND Programa = @tmpPrograma;
					END
					ELSE IF ISNULL(@ZonaERP, '') =  '05'
					BEGIN
						UPDATE Cajas05..CmoDat020 SET
							Imprime = 0, Estatus = 'C'
						WHERE [Clave Maquina] = @ClaveMaquina AND OP = @tOP AND Programa = @tmpPrograma;
					END
				END
				
				DELETE FROM @tmpCap001TD_001 WHERE Value00 = @tmpID;
			END

			SELECT @Completado = 1;

			SELECT @Completado AS Completado, 'success' AS TypeMessage, 'OP eliminada correctamente' AS Message;
			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			SELECT @Completado AS Completado, 'error' AS TypeMessage, ERROR_MESSAGE() AS Message;
		END CATCH
	END
	-- TERMINAR PROGRAMA (PARTE 1)
	ELSE IF @Opcion = 7
	BEGIN
		-- @ZonaERP, @ClaveMaquina, @Programa
		BEGIN TRANSACTION;
		BEGIN TRY
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				UPDATE Cajas01..CmoDat020 SET
					Imprime = 0, Estatus = 'T'
				WHERE [Clave Maquina] = @ClaveMaquina
					AND Programa = @Programa;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				UPDATE Cajas02..CmoDat020 SET
					Imprime = 0, Estatus = 'T'
				WHERE [Clave Maquina] = @ClaveMaquina
					AND Programa = @Programa;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				UPDATE Cajas05..CmoDat020 SET
					Imprime = 0, Estatus = 'T'
				WHERE [Clave Maquina] = @ClaveMaquina
					AND Programa = @Programa;
			END

			SELECT @Completado = 1;

			SELECT @Completado AS Completado, 'OK' AS Message;
			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			SELECT @Completado AS Completado, ERROR_MESSAGE() AS Message;
			ROLLBACK TRANSACTION;
		END CATCH
	END
	-- TERMINAR PROGRAMA (PARTE 2) GUARDAPOS
	ELSE IF @Opcion = 8
	BEGIN
		-- @tmpCap001TD_001 = @Cap001TD_001
		-- @ZonaERP, @UsuarioERP, @ClaveMaquina, @lFecha
		BEGIN TRANSACTION;
		BEGIN TRY
			DECLARE @IDs AS TABLE (ID INT)
			DECLARE @lMinutos INT = 0, @lDuracion INT = 0, @lFechaTermino SMALLDATETIME;
			SELECT @lFecha = FORMAT(@lFecha, 'yyyyMMdd') + ' ' + FORMAT(GETDATE(), 'HH:mm');

			--@IDCap001TD_001
			WHILE EXISTS(SELECT 1 FROM @tmpCap001TD_001 WHERE Value00 NOT IN (SELECT ID FROM @IDs))
			BEGIN
				INSERT INTO @tmp (Fecha)
				EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;
				SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), 'dd/MM/yyyy HH:mm:ss')) FROM @tmp;
				DELETE FROM @tmp;

				SELECT TOP 1 @IDCAP001TD_001 = Value00 FROM @tmpCap001TD_001;

				IF ISNULL(@IDCAP001TD_001, 0) = 1
				BEGIN
					SELECT @lTiempo = RIGHT(@lFecha, 5);
				END ELSE
				BEGIN
					IF EXISTS(SELECT 1 FROM @tmpCap001TD_001 WHERE Value00 = @IDCAP001TD_001 AND Value14 != '')
					BEGIN
						-- VALIDA SI TIENE FECHA FIJA PARA CONSIDERAR HORA ACTUAL APARTIR DE LA FECHA ESTABLECIDA
						SELECT TOP 1 @lFecha = Value14 FROM @tmpCap001TD_001 WHERE Value00 = @IDCAP001TD_001;
					END ELSE
					BEGIN
						SELECT TOP 1 @lFecha = Value17 FROM @tmpCap001TD_001 WHERE Value00 = @IDCAP001TD_001 - 1;
					END
				END
				SELECT @lTiempo = Value13 FROM @tmpCap001TD_001 WHERE Value00 = @IDCAP001TD_001;

				IF ISNULL(@lTiempo, '00:00') >= '24:00'
				BEGIN
					SELECT @lTiempo = '23:59';
				END
				SELECT @lTiempo = RTRIM(@lTiempo);
				SELECT @lMinutos = CONVERT(INT, RIGHT(@lTiempo, 2)) + (CONVERT(INT, LEFT(@lTiempo, 2)) * 60);

				SELECT @lFechaTermino = DATEADD(MINUTE, @lDuracion, @lFecha);
				-- VALIDAR PARO MAQUINA (FCAPROG017MWSPC3 opc 27)
				-- @ClaveMaquina, @lFecha, @lMinutos
				DECLARE @tmpOpc27 AS TABLE (ID INT IDENTITY(1,1), Duracion INT, Inicio SMALLDATETIME, Termino SMALLDATETIME);
				DECLARE @ID INT, @Ini SMALLDATETIME, @Fin SMALLDATETIME, @lDuracionParo INT, @ExistenParos BIT = 0;

				INSERT INTO @tmpOpc27 (Duracion, Inicio, Termino)
				EXEC FCAPROG017MWSPC3 @Opcion = 27, @ClaveMaquina = @ClaveMaquina, @lFecha = @lFecha, @lFechaTermino = @lFechaTermino;

				WHILE EXISTS(SELECT 1 FROM @tmpOpc27)
				BEGIN
					SELECT @ExistenParos = 1;
					SELECT TOP 1 @ID = ID, @Ini = Inicio, @Fin = Termino
					FROM @tmpOpc27;

					IF DATEDIFF(MINUTE, @lFecha, @Ini) <= 0 AND DATEDIFF(MINUTE, @lFecha, @Fin) >= 0
					BEGIN
						SELECT @lFecha = @Fin;
					END 
					ELSE IF DATEDIFF(MINUTE, @lFechaTermino, @Ini) <= 0 AND DATEDIFF(MINUTE, @lFechaTermino, @Fin) >= 0
					BEGIN
						SELECT @lDuracion = @lDuracionParo + @lDuracion;
					END
					ELSE IF DATEDIFF(MINUTE, @Ini, @lFecha) <= 0 AND DATEDIFF(MINUTE, @Ini, @lFechaTermino) >= 0
					BEGIN
						SELECT @lDuracion = @lDuracionParo + @lDuracion;
					END

					DELETE FROM @tmpOpc27 WHERE ID = @ID;
				END

				UPDATE @tmpCap001TD_001 SET
					Value17 = DATEADD(MINUTE, @lDuracion, @lFecha),
					Value19 = @lFecha
				WHERE Value00 = @IDCAP001TD_001;

				INSERT INTO @IDs (ID)
				VALUES (@IDCAP001TD_001);
			END

			-- ACTUALIZAR DATOS
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				UPDATE Cajas01..CmoDat020 SET 
					Orden = B.Value00,
					Cantidad = B.Value04,
					FechaTermino = DATEADD(MINUTE, @lDuracion, @lFecha),
					FechaInicio = @lFecha,
					[Fecha Sistema] = ISNULL(@FechaSis, GETDATE()),
					Usuario = @UsuarioERP
				FROM Cajas01..CmoDat020 A
				JOIN @tmpCap001TD_001 B ON A.[Clave Maquina] = @ClaveMaquina
					AND A.OP = B.Value01 AND A.Programa = B.Value15;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				UPDATE Cajas02..CmoDat020 SET 
					Orden = B.Value00,
					Cantidad = B.Value04,
					FechaTermino = B.Value17,
					FechaInicio = @lFecha,
					[Fecha Sistema] = ISNULL(@FechaSis, GETDATE()),
					Usuario = @UsuarioERP
				FROM Cajas02..CmoDat020 A
				JOIN @tmpCap001TD_001 B ON A.[Clave Maquina] = @ClaveMaquina
					AND A.OP = B.Value01 AND A.Programa = B.Value15;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				UPDATE Cajas05..CmoDat020 SET 
					Orden = B.Value00,
					Cantidad = B.Value04,
					FechaTermino = B.Value17,
					FechaInicio = @lFecha,
					[Fecha Sistema] = ISNULL(@FechaSis, GETDATE()),
					Usuario = @UsuarioERP
				FROM Cajas05..CmoDat020 A
				JOIN @tmpCap001TD_001 B ON A.[Clave Maquina] = @ClaveMaquina
					AND A.OP = B.Value01 AND A.Programa = B.Value15;
			END

			SELECT @Completado = 1;
			COMMIT TRANSACTION;
			SELECT @Completado AS Completado, 'success' AS TypeMessage, 'OK' AS Message;
		END TRY
		BEGIN CATCH
			SELECT @Completado = 0;
			ROLLBACK TRANSACTION;
			SELECT @Completado AS Completado, 'error' AS TypeMessage, ERROR_MESSAGE() AS Message;
		END CATCH
	END
	-- SUSPENDER OP (CAP001)
	ELSE IF @Opcion = 9
	BEGIN
		BEGIN TRANSACTION
		BEGIN TRY
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				UPDATE Cajas01..CmoDat020 SET Suspendido = @Suspendido WHERE Programa = @Programa;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				UPDATE Cajas02..CmoDat020 SET Suspendido = @Suspendido WHERE Programa = @Programa;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				UPDATE Cajas05..CmoDat020 SET Suspendido = @Suspendido WHERE Programa = @Programa;
			END

			SELECT @Completado = 1;
			COMMIT TRANSACTION;
			SELECT @Completado AS Completado, 'success' AS TypeMessage, 'OK' AS Message;
		END TRY
		BEGIN CATCH
			SELECT @Completado = 0;
			ROLLBACK TRANSACTION;
			SELECT @Completado AS Completado, 'error' AS TypeMessage, ERROR_MESSAGE() AS Message;
		END CATCH
	END
	-- TRASPASAR PROGRAMAS
	ELSE IF @Opcion = 10
	BEGIN
		DECLARE @lArea REAL = 0, @wPiezasSuaje DECIMAL(4, 1) = 0, @wVelStd INT = 0, @xExisteArticulo VARCHAR(9) = '', @wDescuentoVelStd INT = 0;

		BEGIN TRANSACTION;
		BEGIN TRY
			WHILE EXISTS (SELECT 1 FROM @tmpCap016TD_001 WHERE ID NOT IN (SELECT ID FROM @tmpIDs))
			BEGIN
				SELECT @wActualizaVelStd = 0, @wActualizaEficiencia = 0, @wVelStd = 0, @wEficiencia = 0, @UnionPegada = 0
					, @Industria = '', @xExisteArticulo = '', @wDescuentoVelStd = 0, @DesVelSTD = 0;
				SELECT TOP 1 @ID = ID, @OP = Op, @tClaveArticulo = ISNULL(ClaveArticulo, ClaveArticulo2), @ClaveProceso = ClaveProceso 
					, @tUltimoProceso = UltimoProceso, @Programa = Programa
				FROM @tmpCap016TD_001;

				-- OBTIENE VELOCIDADES
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT TOP 1 @wPiezasSuaje = A.PiezasXhoja, @lArea = B.[Area unitaria] 
					FROM Cajas01..CmoDat011 B 
					JOIN Cajas01..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo]
					WHERE B.[Clave Articulo] = ISNULL(@tClaveArticulo, '');

					SELECT TOP 1 @wVelStd = ISNULL([Velocidad Std], 0), @wActualizaVelStd = 1
					FROM Cajas01..CmoDat026
					WHERE [Clave Maquina] = @CveMaqDes AND Estatus = 0
						AND @lArea BETWEEN [Area Inicial] AND [Area Final];

					-- OBTIENE EFICIENCIA
					SELECT TOP 1 @wEficiencia = Eficiencia, @wActualizaEficiencia = 1
					FROM Cajas01..CmoCat011
					WHERE [Clave Maquina] = UPPER(ISNULL(@CveMaqDes, ''));

					-- CONTINUAR
					SELECT @Industria = ISNULL(RTRIM(aa.Industria), ''), 
						@UnionPegada = CASE WHEN ISNULL(RTRIM(d.Clave), '') != '' AND ISNULL(RTRIM(d.Descripcion), '') != '' THEN d.UnionPegada ELSE 0 END
					FROM Cajas01..CmoDat011 B 
					JOIN Cajas01..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
					JOIN Cajas01..CmoCat013 AA ON a.SubCodigo = aa.SubCodigo 
					JOIN Cajas01..CmoDat010 C ON C.op = B.Folio_op 
					LEFT JOIN Cajas01..CmoCat044 D ON A.Proceso = D.Clave AND A.Status = 0 
					LEFT JOIN Cajas01..CmoDat088 E ON B.OP = E.OP 
					WHERE B.OP = @OP;

					-- VALIDAR SI EXISTE ARTICULO
					SELECT @xExisteArticulo = ISNULL(ClaveArticulo, '') FROM Cajas01..CmoDat067 WHERE ClaveArticulo = @tClaveArticulo;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT TOP 1 @wPiezasSuaje = A.PiezasXhoja, @lArea = B.[Area unitaria] 
					FROM Cajas02..CmoDat011 B 
					JOIN Cajas02..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo]
					WHERE B.[Clave Articulo] = ISNULL(@tClaveArticulo, '');

					SELECT TOP 1 @wVelStd = ISNULL([Velocidad Std], 0), @wActualizaVelStd = 1
					FROM Cajas02..CmoDat026
					WHERE [Clave Maquina] = @CveMaqDes AND Estatus = 0
						AND @lArea BETWEEN [Area Inicial] AND [Area Final];

					-- OBTIENE EFICIENCIA
					SELECT TOP 1 @wEficiencia = Eficiencia, @wActualizaEficiencia = 1
					FROM Cajas02..CmoCat011
					WHERE [Clave Maquina] = UPPER(ISNULL(@CveMaqDes, ''));

					-- CONTINUAR
					SELECT @Industria = ISNULL(RTRIM(aa.Industria), ''), 
						@UnionPegada = CASE WHEN ISNULL(RTRIM(d.Clave), '') != '' AND ISNULL(RTRIM(d.Descripcion), '') != '' THEN d.UnionPegada ELSE 0 END
					FROM Cajas02..CmoDat011 B 
					JOIN Cajas02..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
					JOIN Cajas02..CmoCat013 AA ON a.SubCodigo = aa.SubCodigo 
					JOIN Cajas02..CmoDat010 C ON C.op = B.Folio_op 
					LEFT JOIN Cajas02..CmoCat044 D ON A.Proceso = D.Clave AND A.Status = 0 
					LEFT JOIN Cajas02..CmoDat088 E ON B.OP = E.OP 
					WHERE B.OP = @OP;

					-- VALIDAR SI EXISTE ARTICULO
					SELECT @xExisteArticulo = ISNULL(ClaveArticulo, '') FROM Cajas02..CmoDat067 WHERE ClaveArticulo = @tClaveArticulo;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT TOP 1 @wPiezasSuaje = A.PiezasXhoja, @lArea = B.[Area unitaria] 
					FROM Cajas05..CmoDat011 B 
					JOIN Cajas05..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo]
					WHERE B.[Clave Articulo] = ISNULL(@tClaveArticulo, '');

					SELECT TOP 1 @wVelStd = ISNULL([Velocidad Std], 0), @wActualizaVelStd = 1
					FROM Cajas05..CmoDat026
					WHERE [Clave Maquina] = @CveMaqDes AND Estatus = 0
						AND @lArea BETWEEN [Area Inicial] AND [Area Final];

					-- OBTIENE EFICIENCIA
					SELECT TOP 1 @wEficiencia = Eficiencia, @wActualizaEficiencia = 1
					FROM Cajas05..CmoCat011
					WHERE [Clave Maquina] = UPPER(ISNULL(@CveMaqDes, ''));

					-- CONTINUAR
					SELECT @Industria = ISNULL(RTRIM(aa.Industria), ''), 
						@UnionPegada = CASE WHEN ISNULL(RTRIM(d.Clave), '') != '' AND ISNULL(RTRIM(d.Descripcion), '') != '' THEN d.UnionPegada ELSE 0 END
					FROM Cajas05..CmoDat011 B 
					JOIN Cajas05..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
					JOIN Cajas05..CmoCat013 AA ON a.SubCodigo = aa.SubCodigo 
					JOIN Cajas05..CmoDat010 C ON C.op = B.Folio_op 
					LEFT JOIN Cajas05..CmoCat044 D ON A.Proceso = D.Clave AND A.Status = 0 
					LEFT JOIN Cajas05..CmoDat088 E ON B.OP = E.OP 
					WHERE B.OP = @OP;

					-- VALIDAR SI EXISTE ARTICULO
					SELECT @xExisteArticulo = ISNULL(ClaveArticulo, '') FROM Cajas05..CmoDat067 WHERE ClaveArticulo = @tClaveArticulo;
				END
			
				SELECT @DesVelSTD = 
					CASE WHEN @CveMaqDes = 'SAT2T' AND (@Industria = 'AGR' OR @Industria = 'PAR') AND @UnionPegada = 1 AND
						(
							@ClaveProceso = '1CT ' OR
							@ClaveProceso = '2CT ' OR
							@ClaveProceso = '3CT ' OR
							@ClaveProceso = '1CRT' OR
							@ClaveProceso = '2CRT' OR
							@ClaveProceso = '3CRT'
						) AND @xExisteArticulo = '' 
						THEN 24 ELSE 0 END;

				SELECT @wDescuentoVelStd = 
					CASE WHEN @ClaveProceso = 'FLITHO' 
						THEN CASE 
							WHEN @CveMaqDes = 'FLEX3' THEN 63
							WHEN @CveMaqDes = 'McKin' OR @CveMaqDes = 'OKLAH' THEN 39
							WHEN @CveMaqDes = 'WARD1' THEN 60
						END
						ELSE 0
					END;

				SELECT @DescuentoVELSTD = CASE WHEN ISNULL(@DesVelSTD, 0) > 0 THEN @DesVelSTD ELSE 0 END;

				SELECT @wVelStd = CASE WHEN ISNULL(@wActualizaVelStd, 0) = 1 THEN @wVelStd ELSE NULL END;
				SELECT @wEficiencia = CASE WHEN ISNULL(@wActualizaEficiencia, 0) = 1 THEN @wEficiencia ELSE NULL END;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					EXEC Cajas01..CmoSP301 @CveMaqDes, @ClaveProceso, @tUltimoProceso, @OP, @CveMaqOri, @Programa, @wVelStd, @wEficiencia;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					EXEC Cajas02..CmoSP301 @CveMaqDes, @ClaveProceso, @tUltimoProceso, @OP, @CveMaqOri, @Programa, @wVelStd, @wEficiencia;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					EXEC Cajas05..CmoSP301 @CveMaqDes, @ClaveProceso, @tUltimoProceso, @OP, @CveMaqOri, @Programa, @wVelStd, @wEficiencia;
				END

				INSERT INTO @tmpIDs (ID)
				VALUES (@ID);
			END

			SELECT @Completado = 1;
			SELECT @Completado AS Completado, 'success' AS TypeMessage, 'OK' AS Message;
			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			SELECT @Completado = 0;
			SELECT @Completado AS Completado, 'error' AS TypeMessage, ERROR_MESSAGE() AS Message;
			ROLLBACK TRANSACTION;
		END CATCH
	END
	---- GUARDAR (CAP009) PENDIENTE
	--ELSE IF @Opcion = 11
	--BEGIN
		
	--END
END
GO


