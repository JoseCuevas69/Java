USE [Cecsoplan02]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG017MWSPA2]    Script Date: 02/11/2022 11:18:30 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FCAPROG017MWSPA2] -- ProgramaImpresorasDinamico
	@ZonaERP VARCHAR(2)				= NULL,
	@OP VARCHAR(12)					= NULL,
	@UsuarioERP VARCHAR(6)			= NULL,
	@Cantidad INT					= NULL,
	@TxtDescripcion VARCHAR(200)	= NULL,
	@lblIndustria VARCHAR(10)		= NULL,
	@lblProceso VARCHAR(10)			= NULL,
	@CmbMaquina VARCHAR(10)			= NULL,
	@TxtComentarios VARCHAR(MAX)	= NULL, 
	@txtEProceso VARCHAR(MAX)		= NULL,
	@wJustificacion VARCHAR(MAX)	= NULL
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @tmp AS TABLE (Fecha VARCHAR(30));
	DECLARE @FechaSis VARCHAR(30), @ClaveArticulo VARCHAR(9), @lFechaProgImp VARCHAR(30), @NoProgramar BIT, @lPrograma INT, @lError BIT;
	DECLARE @FormatoFecha VARCHAR(20) = 'dd/MM/yyyy HH:mm:ss';
	DECLARE @StdPrepImp SMALLINT, @AreaH REAL, @VelocImp REAL, @lEficImp DECIMAL(9,4), @lPzasPallet REAL, @TmpoEstImp REAL, @lFechaTerImp SMALLDATETIME, @lAfectaImp INT;
	DECLARE @Completado BIT = 0;--, @Completado BIT = 0, @Error BIT = 0;
	DECLARE @value01 INT, @value02 INT, @value03 INT, @value04 INT, @value05 INT, @value06 REAL, @value07 REAL, @value08 INT, @value09 VARCHAR(10), @value10 VARCHAR(52), 
		@value11 VARCHAR(20), @value12 SMALLDATETIME, @value13 INT, @value14 INT, @value15 INT, @value16 INT, @value17 INT, @value18 INT, @value19 INT, @value20 INT, 
		@value21 VARCHAR(10), @value22 INT, @value23 INT, @value24 VARCHAR(200), @value25 BIT, @value26 REAL
		--, @value27 INT, @value28 INT, @value29 INT, @value30 INT, 
		--@value31 INT, @value32 INT, @value33 INT, @value34 INT, @value35 INT, @value36 INT, @value37 INT, @value38 INT, @value39 INT, @value40 INT

	BEGIN TRANSACTION;
	BEGIN TRY

		DECLARE @MMq AS TABLE (
			v0 TINYINT, v1 VARCHAR(10), v2 DECIMAL(18,2), v3 DECIMAL(18,2), v4 DECIMAL(18,2), v5 DECIMAL(18,2), v6 BIT, v7 TINYINT, v8 INT
		);
		-- TABLA DE OPS A PROGRAMAR
		DECLARE @OpsProgramar AS TABLE (
			ID INT IDENTITY(1,1), OP VARCHAR(10), Proceso VARCHAR(2), ClaveArticulo VARCHAR(9), Articulo VARCHAR(60), 
			ClaveCliente VARCHAR(12), Solicitado INT, Devuelto INT, Area REAL, ConScore BIT
		);
		DECLARE @OPsDinamico AS TABLE (
			ID INT, value01 INT, value02 INT, value03 INT, value04 INT, value05 INT, value06 REAL, value07 REAL, value08 INT, value09 VARCHAR(10), value10 VARCHAR(52), 
			value11 VARCHAR(20), value12 SMALLDATETIME, value13 INT, value14 INT, value15 INT, value16 INT, value17 INT, value18 INT, value19 INT, value20 INT, 
			value21 VARCHAR(10), value22 INT, value23 INT, value24 VARCHAR(200), value25 BIT, value26 REAL, value27 INT, value28 INT, value29 INT, value30 INT, 
			value31 INT, value32 INT, value33 INT, value34 INT, value35 INT, value36 INT, value37 INT, value38 INT, value39 INT, value40 INT
		);
		DECLARE @IDs AS TABLE (ID INT);

		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;
		SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;
	
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @MMq (v0, v1, v2, v3, v4, v5, v6, v7, v8)
			SELECT TProceso, [Clave Maquina], AnchoMin, AnchoMax, LargoMin, LargoMax, [Default], TintasMax, 60
			FROM Cajas01..CmoCat011
			WHERE Status = 0
			ORDER BY [Clave Maquina];

			INSERT INTO @OpsProgramar (OP, Proceso, ClaveArticulo, Articulo, ClaveCliente, Solicitado, Devuelto, Area, ConScore)
			SELECT B.OP, D.Proceso, B.[Clave Articulo], D.Descripcion, C.[Clave Cliente], B.Cantidad
				, B.Devuelto, (ISNULL(B.[Ancho Desarrollo], 0) * ISNULL(B.[Largo desarrollo], 0)), D.ConScore
			FROM Cajas01..CmoDat011 B
			JOIN Cajas01..CmoDat010 C ON C.OP = B.OP
			JOIN Cajas01..CmoTjCat004 D ON D.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @OP;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @MMq (v0, v1, v2, v3, v4, v5, v6, v7, v8)
			SELECT TProceso, [Clave Maquina], AnchoMin, AnchoMax, LargoMin, LargoMax, [Default], TintasMax, 60
			FROM Cajas02..CmoCat011
			WHERE Status = 0
			ORDER BY [Clave Maquina];

			INSERT INTO @OpsProgramar (OP, Proceso, ClaveArticulo, Articulo, ClaveCliente, Solicitado, Devuelto, Area, ConScore)
			SELECT B.OP, D.Proceso, B.[Clave Articulo], D.Descripcion, C.[Clave Cliente], B.Cantidad
				, B.Devuelto, (ISNULL(B.[Ancho Desarrollo], 0) * ISNULL(B.[Largo desarrollo], 0)), D.ConScore
			FROM Cajas02..CmoDat011 B
			JOIN Cajas02..CmoDat010 C ON C.OP = B.OP
			JOIN Cajas02..CmoTjCat004 D ON D.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @OP;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @MMq (v0, v1, v2, v3, v4, v5, v6, v7, v8)
			SELECT TProceso, [Clave Maquina], AnchoMin, AnchoMax, LargoMin, LargoMax, [Default], TintasMax, 60
			FROM Cajas05..CmoCat011
			WHERE Status = 0
			ORDER BY [Clave Maquina];

			INSERT INTO @OpsProgramar (OP, Proceso, ClaveArticulo, Articulo, ClaveCliente, Solicitado, Devuelto, Area, ConScore)
			SELECT B.OP, D.Proceso, B.[Clave Articulo], D.Descripcion, C.[Clave Cliente], B.Cantidad
				, B.Devuelto, (ISNULL(B.[Ancho Desarrollo], 0) * ISNULL(B.[Largo desarrollo], 0)), D.ConScore
			FROM Cajas05..CmoDat011 B
			JOIN Cajas05..CmoDat010 C ON C.OP = B.OP
			JOIN Cajas05..CmoTjCat004 D ON D.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @OP;
		END

		IF NOT EXISTS(SELECT 1 FROM @OpsProgramar)
		BEGIN
			GOTO SalirSecuenciaPendiente;
		END

		INSERT INTO @OPsDinamico (ID, value01, value02, value03, value04, value05, value22, value25, value26)
		SELECT ID, OP, ClaveArticulo, ClaveCliente, Articulo
			, CASE WHEN @Cantidad > Solicitado THEN Solicitado ELSE @Cantidad END
			, 0, 0, Area
		FROM @OpsProgramar;

		DECLARE @lId INT, @lProceso VARCHAR(2), @lProgramado INT, @lExistencia INT, @lProducido INT, @lVariacion REAL, @lDevuelto INT, @lPiezas INT, @lSolicitado INT;
	
		WHILE EXISTS(SELECT 1 FROM @OpsProgramar WHERE ID NOT IN(SELECT ID FROM @IDs))
		BEGIN
			SELECT TOP 1 
				@lId = ISNULL(ID, 0), @lProceso = ISNULL(Proceso, ''), @lDevuelto = ISNULL(Devuelto, 0), 
				@lPiezas = CASE WHEN @Cantidad > Solicitado THEN ISNULL(Solicitado, 0) ELSE @Cantidad END,
				@lSolicitado = ISNULL(Solicitado, 0), @ClaveArticulo = RTRIM(ClaveArticulo)
			FROM @OpsProgramar;

			IF @lProceso != ''
			BEGIN
				-- OTROS DATOS
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT @lProgramado = SUM(Cantidad)
					FROM Cajas01..CmoDat020
					WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Imprime = 1 AND Estatus IN ('E', 'P');

					--SELECT @lExistencia = SUM(A.Entradas - A.Salidas)
					--FROM Cajas01..CmoTjDat002 A
					--INNER JOIN Cajas01..CmoTjCat001 B ON A.Almacen = B.Cod
					--WHERE A.OP = @OP AND (B.Inventario = 1 OR B.Cod = '052') AND B.Foraneo = 0 AND B.[tipoalmacen] ='PT';

					SELECT @lProducido = SUM(A.Cantidad)
					FROM Cajas01..CmoDat021 A
					JOIN Cajas01..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
					WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

					SELECT @lVariacion = 1 + ISNULL(A.variacion, 0)
					FROM Cajas01..CmoDat008 A
					JOIN Cajas01..CmoDat010 B ON A.Pedido = B.PedidoInt
					WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT @lProgramado = SUM(Cantidad)
					FROM Cajas02..CmoDat020
					WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Imprime = 1 AND Estatus IN ('E', 'P');

					--SELECT @lExistencia = SUM(A.Entradas - A.Salidas)
					--FROM Cajas02..CmoTjDat002 A
					--INNER JOIN Cajas02..CmoTjCat001 B ON A.Almacen = B.Cod
					--WHERE A.OP = @OP AND (B.Inventario = 1 OR B.Cod = '052') AND B.Foraneo = 0 AND B.[tipoalmacen] ='PT';

					SELECT @lProducido = SUM(A.Cantidad)
					FROM Cajas02..CmoDat021 A
					JOIN Cajas02..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
					WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

					SELECT @lVariacion = 1 + ISNULL(A.variacion, 0)
					FROM Cajas02..CmoDat008 A
					JOIN Cajas02..CmoDat010 B ON A.Pedido = B.PedidoInt
					WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT @lProgramado = SUM(Cantidad)
					FROM Cajas05..CmoDat020
					WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Imprime = 1 AND Estatus IN ('E', 'P');

					--SELECT @lExistencia = SUM(A.Entradas - A.Salidas)
					--FROM Cajas05..CmoTjDat002 A
					--INNER JOIN Cajas05..CmoTjCat001 B ON A.Almacen = B.Cod
					--WHERE A.OP = @OP AND (B.Inventario = 1 OR B.Cod = '052') AND B.Foraneo = 0 AND B.[tipoalmacen] ='PT';

					SELECT @lProducido = SUM(A.Cantidad)
					FROM Cajas05..CmoDat021 A
					JOIN Cajas05..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
					WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

					SELECT @lVariacion = 1 + ISNULL(A.variacion, 0)
					FROM Cajas05..CmoDat008 A
					JOIN Cajas05..CmoDat010 B ON A.Pedido = B.PedidoInt
					WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);
				END

				IF ( (ISNULL(@lPiezas, 0) + ISNULL(@lProgramado, 0) + ISNULL(@lProducido, 0)) <= (ISNULL(@lSolicitado, 0) + ISNULL(@lDevuelto, 0)) )
				BEGIN
					UPDATE @OPsDinamico SET
						value23 = @lPiezas,
						value24 = 'No programada'
					WHERE ID = @lId
				END ELSE 
				BEGIN
					SELECT @lPiezas = CASE WHEN ISNULL(@lProducido, 0) != 0 
						THEN @lPiezas - (ISNULL(@lPiezas, 0) + ISNULL(@lProgramado, 0) + ISNULL(@lProducido, 0) - ISNULL(@lSolicitado, 0))
						ELSE @lPiezas
					END

					UPDATE @OPsDinamico SET
						value24 = CASE WHEN ISNULL(@lPiezas, 0) < 0 
							THEN 'No programada, Excede Cantidad Solicitada'
							ELSE 'Excedía Cantidad Solicitada'
						END
					WHERE ID = @lId;
					SELECT @lPiezas = CASE WHEN ISNULL(@lPiezas, 0) < 0 THEN 0 ELSE @lPiezas END;

					UPDATE @OPsDinamico SET value23 = ISNULL(value05, 0) WHERE ID = @lId;
					UPDATE @OPsDinamico SET value05 = ISNULL(@lPiezas, 0) WHERE ID = @lId;
				END
			END ELSE
			BEGIN
				UPDATE @OPsDinamico SET 
					value05 = 0,
					value24 = 'No Tiene Ruta de Proceso'
				WHERE ID = @lId;
			END

			INSERT INTO @IDs (ID)
			VALUES (@lId);
		END

		-- REVISAR ARTICULO
		DELETE FROM @IDs;
			
		WHILE EXISTS(SELECT 1 FROM @OPsDinamico WHERE ID NOT IN (SELECT ID FROM @IDs))
		BEGIN
			SELECT TOP 1 @lId = ID
				, @value01 = value01, @value02 = value02, @value03 = value03, @value04 = value04, @value05 = value05, @value06 = value06, @value07 = value07, @value08 = value08, @value09 = value09, @value10 = value10
				, @value11 = value11, @value12 = value12, @value13 = value13, @value14 = value14, @value15 = value15, @value16 = value16, @value17 = value17, @value18 = value18, @value19 = value19, @value20 = value20
				, @value21 = value21, @value22 = value22, @value23 = value23, @value24 = value24, @value25 = value25, @value26 = value26
				--, @value27 = value27, @value28 = value28, @value29 = value29, @value30 = value30
				--, @value31 = value31, @value32 = value32, @value33 = value33, @value34 = value34, @value35 = value35, @value36 = value36, @value37 = value37, @value38 = value38, @value39 = value39, @value40 = value40
			FROM @OPsDinamico
			WHERE ID NOT IN (SELECT ID FROM @IDs);

			IF ISNULL(@value05, 0) = 0
			BEGIN
				GOTO SiguientePendienteSecuencia;
			END

			DECLARE @ArticuloEncontrado AS TABLE (
				ID INT IDENTITY(1,1), AreaUnitaria REAL, Largo REAL, Ancho REAL, Piezas DECIMAL(4,1), Suaje VARCHAR(8), Dado VARCHAR(20), LargoDesarrollo REAL, AnchoDesarrollo REAL,
				ClavePreparacion VARCHAR(10), PrimerColor VARCHAR(13), SegundoColor VARCHAR(13), TercerColor VARCHAR(13), CuartoColor VARCHAR(13), Proceso VARCHAR(2),
				Parafinado BIT, Pallet BIT, MaquinaEstablecida VARCHAR(5), Diseño VARCHAR(10), Cantidad INT, FechaEntrega SMALLDATETIME, Colores INT
			)

			INSERT INTO @ArticuloEncontrado (
				AreaUnitaria, Largo, Ancho, Piezas, Suaje, Dado, LargoDesarrollo, AnchoDesarrollo,
				ClavePreparacion, PrimerColor, SegundoColor, TercerColor, CuartoColor, Proceso,
				Parafinado, Pallet, MaquinaEstablecida, Diseño, Cantidad, FechaEntrega, Colores
			)
			SELECT [area unitaria], largo, ancho, Piezas, Suaje, Dado, [Largo Desarrollo], [Ancho Desarrollo], 
				[Clave Preparacion], [1er Color], [2do Color], [3er Color], [4to Color], proceso,
				Parafinado, Pallet, [Maquina Establecida], Diseno, Cantidad, [Fecha Entrega], Colores
			FROM CplVis020 
			WHERE OP = @value01;

			IF NOT EXISTS(SELECT 1 FROM @ArticuloEncontrado)
			BEGIN
				SELECT 'No Existen Datos del Articulo ' + RTRIM(ISNULL(@value02, '')) AS Message, 'info' AS TypeMessage, CAST(0 AS BIT) AS Completado;
				GOTO SalirSecuenciaPendiente;
			END

			DECLARE @Ancho REAL, @Largo REAL, @CPrepar VARCHAR(10), @PzsCrt DECIMAL(4,1), @Colores VARCHAR(52), 
				@PrimerColor VARCHAR(13), @SegundoColor VARCHAR(13), @TercerColor VARCHAR(13), @CuartoColor VARCHAR(13),
				@Medidas VARCHAR(20), @Proceso1 VARCHAR(2), @wPallet BIT, @lPrimerProcesoM1 INT = 0, @lPrimerProcesoM2 INT = 0, @lPrimerProcesoAca INT = 0,
				@Proceso2 INT = 0, @Proceso3 INT = 0, @TDiseno VARCHAR(10), @CantOP INT, @FechaEnt SMALLDATETIME, @NColores INT, @lSuaje VARCHAR(8), @lDado VARCHAR(20),
				@lDesLargo REAL, @lDesAncho REAL, @AreaUnit REAL;

			SELECT TOP 1 @Ancho = Ancho, @Largo = Largo, @CPrepar = ClavePreparacion, 
				@PrimerColor = RTRIM(PrimerColor), @SegundoColor = RTRIM(SegundoColor), 
				@TercerColor = RTRIM(TercerColor), @CuartoColor = RTRIM(CuartoColor),
				@Colores = RTRIM(PrimerColor) + RTRIM(SegundoColor) + RTRIM(TercerColor) + RTRIM(CuartoColor),
				@Medidas = CONVERT(VARCHAR, Ancho) + ' X ' + CONVERT(VARCHAR, Largo),
				@Proceso1 = ISNULL(Proceso, ''), @wPallet = ISNULL(Pallet, 0), @TDiseno = RTRIM(Diseño), @CantOP = ISNULL(Cantidad, 0),
				@FechaEnt = FechaEntrega, @NColores = Colores, @lSuaje = RTRIM(Suaje), @lDado = RTRIM(Dado), @lDesLargo = ISNULL(LargoDesarrollo, 0),
				@lDesAncho = ISNULL(AnchoDesarrollo, 0), @AreaUnit = ISNULL(AreaUnitaria, 0)
			FROM @ArticuloEncontrado;

			SELECT TOP 1 @PzsCrt = 
				CASE WHEN ISNULL(@ZonaERP, '') = '01'
					THEN Piezas
					ELSE CASE WHEN ISNULL(@CPrepar, '') = 'PEG' OR ISNULL(@CPrepar, '') = 'RAPE' OR ISNULL(@CPrepar, '') = 'RTP'
							OR ISNULL(@CPrepar, '') = 'ENG' OR /*3*/ ISNULL(@CPrepar, '') = '1CRP' OR /*3*/ ISNULL(@CPrepar, '') = '1CRTP'
							OR /*3*/ ISNULL(@CPrepar, '') = '1CTP' OR /*3*/ ISNULL(@CPrepar, '') = '2CRP' OR ISNULL(@CPrepar, '') = '2RTP'
							OR ISNULL(@CPrepar, '') = '2CRTP' OR ISNULL(@CPrepar, '') = '2CTP' OR ISNULL(@CPrepar, '') = '3CRP'
							OR ISNULL(@CPrepar, '') = '3CRTP' OR ISNULL(@CPrepar, '') = '4CRP' OR ISNULL(@CPrepar, '') = '4CRTP'
						THEN 1
						ELSE Piezas
					END
				END
			FROM @ArticuloEncontrado;

			UPDATE @OPsDinamico SET
				value06 = @AreaUnit, value07 = @Largo, value08 = 0, value09 = @CPrepar,
				value10 = @Colores, value11 = @Medidas, value12 = @FechaEnt, value21 = @TDiseno
			WHERE ID = @lId;

			-- MAQUINA A ASIGNAR
			-- PENDIENTE LOS TIPOS DE DATOS
			DECLARE @MaquinaAsignar AS TABLE (
				ID INT IDENTITY(1,1), MaquinaOrden TINYINT, aTipoMaquina TINYINT, Pegar BIT, Maquina VARCHAR(10), bTipoMaquina VARCHAR(2), TProceso TINYINT, Mx2 BIT
			);

			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				INSERT INTO @MaquinaAsignar (MaquinaOrden, aTipoMaquina, Pegar, Maquina, bTipoMaquina, TProceso, Mx2)
				SELECT A.MaquinaOrden, A.TipoMaquina, A.Pegar, ISNULL(B.[Clave Maquina],'') AS Maquina, B.[Tipo Maquina], B.TProceso, A.Mx2
				FROM Cajas01..CmoDat113 A
				LEFT JOIN Cajas01..CmoCat011 B ON B.Tproceso = A.TipoMaquina AND B.Status = 0 AND B.[Default] = 1
				WHERE A.Estatus = 0 AND A.ClaveProceso = RTRIM(@Proceso1)
				ORDER BY A.MaquinaOrden;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				INSERT INTO @MaquinaAsignar (MaquinaOrden, aTipoMaquina, Pegar, Maquina, bTipoMaquina, TProceso, Mx2)
				SELECT A.MaquinaOrden, A.TipoMaquina, A.Pegar, ISNULL(B.[Clave Maquina],'') AS Maquina, B.[Tipo Maquina], B.TProceso, A.Mx2
				FROM Cajas02..CmoDat113 A
				LEFT JOIN Cajas02..CmoCat011 B ON B.Tproceso = A.TipoMaquina AND B.Status = 0 AND B.[Default] = 1
				WHERE A.Estatus = 0 AND A.ClaveProceso = RTRIM(@Proceso1)
				ORDER BY A.MaquinaOrden;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				INSERT INTO @MaquinaAsignar (MaquinaOrden, aTipoMaquina, Pegar, Maquina, bTipoMaquina, TProceso, Mx2)
				SELECT A.MaquinaOrden, A.TipoMaquina, A.Pegar, ISNULL(B.[Clave Maquina],'') AS Maquina, B.[Tipo Maquina], B.TProceso, A.Mx2
				FROM Cajas05..CmoDat113 A
				LEFT JOIN Cajas05..CmoCat011 B ON B.Tproceso = A.TipoMaquina AND B.Status = 0 AND B.[Default] = 1
				WHERE A.Estatus = 0 AND A.ClaveProceso = RTRIM(@Proceso1)
				ORDER BY A.MaquinaOrden;
			END

			DECLARE @IDsMaqAsignar AS TABLE (ID INT);
			DECLARE @lNumProceso INT = 0, @cont INT = 0, @z INT = 0, @lUltimoProceso BIT = 0, @MaqEstab VARCHAR(10) = '', @lComentario VARCHAR(200), 
				@ContImp INT = 0, @lFechaProg VARCHAR(30), @lMaqNoProg VARCHAR(10), @lMaq VARCHAR(9), @lBalancea BIT = 0, @tmpmaq VARCHAR(10) = '';
			DECLARE @IdMaqAsignar INT, @MaquinaOrden TINYINT, @TipoMaquina TINYINT, @SegP BIT, @lMaquina VARCHAR(10), 
				@lTipoMaquina VARCHAR(2), @lProcesoTipo TINYINT, @mx2 BIT, @TotalMaquinaAsignar INT = 0, @TPrepa INT

			--MaquinaOrden TINYINT, aTipoMaquina TINYINT, Pegar BIT, Maquina VARCHAR(10), bTipoMaquina VARCHAR(2), TProceso TINYINT, Mx2 BIT
			SELECT @TotalMaquinaAsignar = COUNT(*) FROM @MaquinaAsignar;
			DECLARE @Comp BIT = 0;

			WHILE EXISTS(SELECT 1 FROM @MaquinaAsignar WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar)) OR ISNULL(@wPallet, 0) = 1
			BEGIN
				SELECT @lUltimoProceso = 0, @lNumProceso = @lNumProceso + 1;
				SELECT TOP 1 @IdMaqAsignar = ID, @MaquinaOrden = MaquinaOrden, @TipoMaquina = aTipoMaquina, 
					@SegP = Pegar, @lMaquina = Maquina, @lTipoMaquina = bTipoMaquina, @lProcesoTipo = TProceso, @mx2 = ISNULL(Mx2, 0)
				FROM @MaquinaAsignar 
				WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar)

				-- SELECCIONA LA MAQUINA ESTABLECIDA PARA CADA PROCESO DEL ARTICULO
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT @MaqEstab = RTRIM(ISNULL(ClaveMaquina, '')) 
					FROM Cajas01..CmoDat209 
					WHERE ClaveArticulo = @ClaveArticulo AND MaquinaOrden = @lNumProceso;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT @MaqEstab = RTRIM(ISNULL(ClaveMaquina, '')) 
					FROM Cajas02..CmoDat209 
					WHERE ClaveArticulo = @ClaveArticulo AND MaquinaOrden = @lNumProceso;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT @MaqEstab = RTRIM(ISNULL(ClaveMaquina, '')) 
					FROM Cajas05..CmoDat209 
					WHERE ClaveArticulo = @ClaveArticulo AND MaquinaOrden = @lNumProceso;
				END

				IF ISNULL(@mx2, 0) = 1 AND @cont < 1
				BEGIN
					IF ISNULL(@z, 0) > 0
					BEGIN
						SELECT @cont = @cont + 1;
					END
					IF ISNULL(@z, 0) = @TotalMaquinaAsignar AND ISNULL(@wPallet, 0) = 1
					BEGIN
						SELECT @lUltimoProceso = 1;
					END
					IF ISNULL(@cont, 0) = 0
					BEGIN
						SELECT @z = @z + 1
					END
				END
				ELSE IF ISNULL(@mx2, 0) = 0 AND ISNULL(@z, 0) = 0
				BEGIN
					SELECT @cont = 0, @z = @z + 1;
					IF ISNULL(@z, 0) = @TotalMaquinaAsignar AND ISNULL(@wPallet, 0) = 0
					BEGIN
						SELECT @lUltimoProceso = 1;
					END
				END ELSE
				BEGIN
					SELECT @cont = 0, @z = @z + 1;
				
					INSERT INTO @IDsMaqAsignar (ID)
					VALUES (@IdMaqAsignar);

					IF EXISTS (SELECT 1 FROM @MaquinaAsignar WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar))
					BEGIN
						SELECT TOP 1 @mx2 = ISNULL(Mx2, 0) FROM @MaquinaAsignar WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar);
						IF ISNULL(@z, 0) = @TotalMaquinaAsignar AND ISNULL(@wPallet, 0) = 0 AND ISNULL(@mx2, 0) = 0
						BEGIN
							SELECT @lUltimoProceso = 1;
						END
					END
				END

				IF ISNULL(@z, 0) > @TotalMaquinaAsignar AND ISNULL(@wPallet, 0) = 0
				BEGIN
					GOTO SalirBucle;
				END

				IF EXISTS (SELECT 1 FROM @MaquinaAsignar WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar))
				BEGIN
					SELECT TOP 1 @IdMaqAsignar = ID, @MaquinaOrden = MaquinaOrden, @TipoMaquina = aTipoMaquina, 
						@SegP = Pegar, @lMaquina = Maquina, @lTipoMaquina = bTipoMaquina, @lProcesoTipo = TProceso, @mx2 = ISNULL(Mx2, 0)
					FROM @MaquinaAsignar 
					WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar);

					IF NOT EXISTS (SELECT 1 FROM @MaquinaAsignar WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar)) AND ISNULL(@wPallet, 0) = 0
					BEGIN
						SELECT @lUltimoProceso = 1;
					END
				END ELSE
				BEGIN
					IF NOT EXISTS (SELECT 1 FROM @MaquinaAsignar WHERE ID NOT IN (SELECT ID FROM @IDsMaqAsignar)) AND ISNULL(@wPallet, 0) = 0
					BEGIN
						SELECT @lUltimoProceso = 1;
					END

					IF ISNULL(@wPallet, 0) = 1
					BEGIN
						SELECT @lUltimoProceso = 1, @lMaquina = 'PALLET', @SegP = 0, @lProcesoTipo = 9, @lTipoMaquina = 'AC'
					END
				END

				SELECT @TPrepa = @value09;

				IF ISNULL(@SegP, 0) = 1
				BEGIN
					SELECT @TPrepa = 'PEG', @lComentario = 'Segundo Proceso Pegado';
				END ELSE
				BEGIN
					SELECT @lComentario = '';
				END

				-- PROGRAMACIÓN POR HISTORIA DE FABRICACIÓN
				DECLARE @HstIm AS TABLE (value01 INT, value02 INT, value03 INT, value04 INT)
				DECLARE @tmpHstIm AS TABLE (ClaveMaquina VARCHAR(10), Tproceso TINYINT, TCantidad INT, Tminutos INT, Velc INT, Nveces INT)


				-- Localiza Historia de Articulos filtrado por Articulo

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO @tmpHstIm (ClaveMaquina, Tproceso, TCantidad, Tminutos, Velc, Nveces)
					SELECT A.[Clave Maquina], D.Tproceso,
						SUM(A.Cantidad) AS TCantidad, SUM(A.[Minutos Produccion]) AS Tminutos,
						SUM(A.Cantidad)/SUM(A.[Minutos Produccion]) AS Velc,
						COUNT(a.[Clave Maquina]) AS Nveces
					FROM Cajas01..CmoDat021 A
					JOIN Cajas01..CmoDat011 B ON A.OP = B.OP 
					JOIN Cajas01..CmoTjCat004 C  ON C.[Clave Articulo] = B.[Clave Articulo] 
					JOIN Cajas01..CmoCat011 D ON D.[Clave Maquina] = A.[Clave Maquina] 
					JOIN Cajas01..CmoDat113 E ON D.TProceso = E.TipoMaquina AND C.Proceso = E.[ClaveProceso] 
					JOIN Cajas01..CmoDat020 F ON F.Programa= A.Programa
					WHERE D.[tipo maquina] = 'IM' And D.status = 0 AND A.Cantidad > 0 AND A.[Minutos Produccion] > 0 
						AND B.[Clave Articulo] = @value02 AND D.TProceso = @lProcesoTipo AND F.[Clave Proceso] = @TPrepa
					GROUP BY A.[Clave Maquina], D.Tproceso  
					ORDER BY 5 DESC, 3 DESC;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					INSERT INTO @tmpHstIm (ClaveMaquina, Tproceso, TCantidad, Tminutos, Velc, Nveces)
					SELECT A.[Clave Maquina], D.Tproceso,
						SUM(A.Cantidad) AS TCantidad, SUM(A.[Minutos Produccion]) AS Tminutos,
						SUM(A.Cantidad)/SUM(A.[Minutos Produccion]) AS Velc,
						COUNT(a.[Clave Maquina]) AS Nveces
					FROM Cajas02..CmoDat021 A
					JOIN Cajas02..CmoDat011 B ON A.OP = B.OP 
					JOIN Cajas02..CmoTjCat004 C  ON C.[Clave Articulo] = B.[Clave Articulo] 
					JOIN Cajas02..CmoCat011 D ON D.[Clave Maquina] = A.[Clave Maquina] 
					JOIN Cajas02..CmoDat113 E ON D.TProceso = E.TipoMaquina AND C.Proceso = E.[ClaveProceso] 
					JOIN Cajas02..CmoDat020 F ON F.Programa= A.Programa
					WHERE D.[tipo maquina] = 'IM' And D.status = 0 AND A.Cantidad > 0 AND A.[Minutos Produccion] > 0 
						AND B.[Clave Articulo] = @value02 AND D.TProceso = @lProcesoTipo AND F.[Clave Proceso] = @TPrepa
					GROUP BY A.[Clave Maquina], D.Tproceso  
					ORDER BY 5 DESC, 3 DESC;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO @tmpHstIm (ClaveMaquina, Tproceso, TCantidad, Tminutos, Velc, Nveces)
					SELECT A.[Clave Maquina], D.Tproceso,
						SUM(A.Cantidad) AS TCantidad, SUM(A.[Minutos Produccion]) AS Tminutos,
						SUM(A.Cantidad)/SUM(A.[Minutos Produccion]) AS Velc,
						COUNT(a.[Clave Maquina]) AS Nveces
					FROM Cajas05..CmoDat021 A
					JOIN Cajas05..CmoDat011 B ON A.OP = B.OP 
					JOIN Cajas05..CmoTjCat004 C  ON C.[Clave Articulo] = B.[Clave Articulo] 
					JOIN Cajas05..CmoCat011 D ON D.[Clave Maquina] = A.[Clave Maquina] 
					JOIN Cajas05..CmoDat113 E ON D.TProceso = E.TipoMaquina AND C.Proceso = E.[ClaveProceso] 
					JOIN Cajas05..CmoDat020 F ON F.Programa= A.Programa
					WHERE D.[tipo maquina] = 'IM' And D.status = 0 AND A.Cantidad > 0 AND A.[Minutos Produccion] > 0 
						AND B.[Clave Articulo] = @value02 AND D.TProceso = @lProcesoTipo AND F.[Clave Proceso] = @TPrepa
					GROUP BY A.[Clave Maquina], D.Tproceso  
					ORDER BY 5 DESC, 3 DESC;
				END

				IF EXISTS (SELECT 1 FROM @tmpHstIm)
				BEGIN
					-- Selecciona Máquina Dode Más se corrió y a la eficiencia mas alta
					SELECT TOP 1 @lMaquina = RTRIM(ClaveMaquina) FROM @tmpHstIm
				END

				-- ------------------------------------------------------------------------------------------------------
				-- Verifica Maquina Establecida
				IF ISNULL(@MaqEstab, '') != '' AND @lMaquina != 'PALLET'
				BEGIN
					SELECT @lMaquina = @MaqEstab;
				END

				SELECT @lFechaProg = '';

				DECLARE @spBuscaFechaTermino AS TABLE (BuscaFechaTermino VARCHAR(30));
				DECLARE @spBuscaArticuloProceso AS TABLE (ClaveMaquina VARCHAR(10), Cantidad INT);
				DECLARE @spBalanceMaquina AS TABLE (lMaquina VARCHAR(10), lFechaCarga SMALLDATETIME, BalanceMaquinas BIT)
				DECLARE @MaxMin AS TABLE (ID INT IDENTITY(1,1), AnchoMax NUMERIC(18,2), AnchoMin NUMERIC(18,2), LargoMax NUMERIC(18,2), LargoMin NUMERIC(18,2), ClaveMaquina VARCHAR(10))
				DECLARE @IDMaxMin INT, @lLargo REAL, @lAncho REAL, @AnchoMax NUMERIC(18,2), @AnchoMin NUMERIC(18,2), @LargoMax NUMERIC(18,2), @LargoMin NUMERIC(18,2);

				IF ISNULL(@lTipoMaquina, '') = 'IM'
				BEGIN
					SELECT @lMaqNoProg = '', @lMaq = @lMaquina, @lProceso = @lProcesoTipo, @lMaq = RTRIM(@lMaq);

					IF RTRIM(@lMaq) != ''
					BEGIN
						-- Busca fecha termino
						INSERT INTO @spBuscaFechaTermino (BuscaFechaTermino)
						EXEC dbo.FCAPROG017MWSPC3 @Opcion = 30, @ZonaERP = @ZonaERP, @ClaveMaquina = @lMaq;

						SELECT TOP 1 @lFechaProg = BuscaFechaTermino FROM @spBuscaFechaTermino;

						-- Si tiene Máquina Establecida no busca otra Alternativa para Programarla
						IF ISNULL(@MaqEstab, '') != ISNULL(@lMaq, '')
						BEGIN
							-- Valida para aplicar criterio de carga por Articulo en Proceso.
							-- Esto solo aplica al proceso uno.
							SELECT @lBalancea = 1;

							IF ISNULL(@lProceso, 0) = 1
							BEGIN
								INSERT INTO @spBuscaArticuloProceso (ClaveMaquina, Cantidad)
								EXEC dbo.FCAPROG017MWSPC3 @Opcion = 31, @ZonaERP = @ZonaERP, @Proceso = @lProceso, @ClaveArticulo = @value02;

								SELECT @lBalancea = CASE WHEN EXISTS(SELECT 1 FROM @spBuscaArticuloProceso) THEN 0 ELSE 1 END;
							END
							IF ISNULL(@mx2, 0) = 1 AND ISNULL(@cont, 0) > 0
							BEGIN
								SELECT @lBalancea = 0, @lMaq = @tmpmaq
							END

							IF ISNULL(@lBalancea, 0) = 1
							BEGIN
								-- Busca fecha termino
								INSERT INTO @spBuscaFechaTermino (BuscaFechaTermino)
								EXEC dbo.FCAPROG017MWSPC3 @Opcion = 30, @ZonaERP = @ZonaERP, @ClaveMaquina = @lMaq;

								SELECT TOP 1 @lFechaProg = BuscaFechaTermino FROM @spBuscaFechaTermino;

								-- Verifica Maximos y minimos
								-- Valida que los anchos del carton se encuentre entre los permitidos para el tipo de maquina

								IF ISNULL(@ZonaERP, '') = '01'
								BEGIN
									INSERT INTO @MaxMin (AnchoMax, AnchoMin, LargoMax, LargoMin, ClaveMaquina)
									SELECT DISTINCT A.AnchoMax, A.AnchoMin, A.LargoMax, A.LargoMin, A.[Clave Maquina] 
									FROM Cajas01..CmoCat011 A 
									INNER JOIN Cajas01..CmoDat018 B ON A.[Clave Maquina] = B.[Clave Maquina]
									WHERE A.Tproceso = @lProceso AND A.Status = 0 AND B.Estatus = 0 AND B.[Clave Proceso] = @TPrepa;
								END
								ELSE IF ISNULL(@ZonaERP, '') = '02'
								BEGIN
									INSERT INTO @MaxMin (AnchoMax, AnchoMin, LargoMax, LargoMin, ClaveMaquina)
									SELECT DISTINCT A.AnchoMax, A.AnchoMin, A.LargoMax, A.LargoMin, A.[Clave Maquina] 
									FROM Cajas02..CmoCat011 A 
									INNER JOIN Cajas02..CmoDat018 B ON A.[Clave Maquina] = B.[Clave Maquina]
									WHERE A.Tproceso = @lProceso AND A.Status = 0 AND B.Estatus = 0 AND B.[Clave Proceso] = @TPrepa;
								END
								ELSE IF ISNULL(@ZonaERP, '') = '05'
								BEGIN
									INSERT INTO @MaxMin (AnchoMax, AnchoMin, LargoMax, LargoMin, ClaveMaquina)
									SELECT DISTINCT A.AnchoMax, A.AnchoMin, A.LargoMax, A.LargoMin, A.[Clave Maquina] 
									FROM Cajas05..CmoCat011 A 
									INNER JOIN Cajas05..CmoDat018 B ON A.[Clave Maquina] = B.[Clave Maquina]
									WHERE A.Tproceso = @lProceso AND A.Status = 0 AND B.Estatus = 0 AND B.[Clave Proceso] = @TPrepa;
								END

								DECLARE @MaqNoProg CMOCAT011TD_001;
								DECLARE @tmpMaqNoProg VARCHAR(10);

								WHILE EXISTS(SELECT 1 FROM @MaxMin)
								BEGIN
									SELECT TOP 1 @IDMaxMin = ID, @AnchoMax = AnchoMax, @AnchoMin = AnchoMin, 
										@LargoMax = LargoMax, @LargoMin = LargoMin, @tmpMaqNoProg = ClaveMaquina
									FROM @MaxMin;

									SELECT @lLargo = CASE WHEN ISNULL(@SegP, 0) = 1 THEN @lDesLargo ELSE @Largo END, 
										   @lAncho = CASE WHEN ISNULL(@SegP, 0) = 1 THEN @lDesAncho ELSE @Ancho END;

									IF (
										ISNULL(@lLargo, 0) < ISNULL(@LargoMin, 0) OR ISNULL(@lLargo, 0) > ISNULL(@LargoMax, 0) OR
										ISNULL(@lAncho, 0) < ISNULL(@AnchoMin, 0) OR ISNULL(@lAncho, 0) > ISNULL(@AnchoMax, 0)
									)
									BEGIN
										-- Identifica las máquinas que no pueden procesar al Artículo para Descartarlas
										INSERT INTO @MaqNoProg (ClaveMaquina)
										VALUES (@tmpMaqNoProg);
									END

									DELETE FROM @MaxMin WHERE ID = @IDMaxMin;
								END

								-- lProceso, lMaq, lFechaProg, lMaqNoProg, OPsDinamico(X2, 26), TPrepa
								-- PARAMETROS SP (@Proceso, @ClaveMaquina, @lFechaProg, @MaqNoProg, @Area, @TPrepa)
								-- BALANCE MAQUINAS (@lProceso, @lMaq, @lFechaProg, @MaqNoProg, @value26, @TPrepa)
								INSERT INTO @spBalanceMaquina (lMaquina, lFechaCarga, BalanceMaquinas)
								EXEC dbo.FCAPROG017MWSPC3 
									@Opcion = 33, 
									@ZonaERP = @ZonaERP, 
									@Proceso = @lProceso, 
									@ClaveMaquina = @lMaq,
									@lFechaProg = @lFechaProg,
									@Area = @value26,
									@TPrepa = @TPrepa,
									@lSuaje = @lSuaje,
									@Cap009TD_001 = @MaqNoProg;

								SELECT TOP 1 @lMaquina = lMaquina, @lFechaProg = lFechaCarga FROM @spBalanceMaquina;
							END ELSE
							BEGIN
								-- Busca fecha termino
								INSERT INTO @spBuscaFechaTermino (BuscaFechaTermino)
								EXEC dbo.FCAPROG017MWSPC3 @Opcion = 30, @ZonaERP = @ZonaERP, @ClaveMaquina = @lMaq;

								SELECT TOP 1 @lFechaProg = BuscaFechaTermino FROM @spBuscaFechaTermino;
							END
						END

						SELECT @lFechaProgImp = @lFechaProg;
					END

					SELECT @lMaquina = @lMaq, @NoProgramar = 0;

					IF ISNULL(@lMaquina, '') = ''
					BEGIN
						SELECT @NoProgramar = 1;
					END

					IF ISNULL(@NoProgramar, 0) = 1
					BEGIN
						UPDATE @OPsDinamico SET 
							value26 = 'No existe Capacidad en Impresoras'
						WHERE ID = @lId;
						GOTO SiguientePendienteSecuencia;
					END

					IF ISNULL(@ZonaERP, '') = '01' 
					BEGIN
						SELECT @StdPrepImp = [Tiempo Std]
						FROM Cajas01..CmoDat018
						WHERE [Clave Maquina] = RTRIM(@lMaquina)
							AND [Clave Proceso] = RTRIM(@TPrepa)
							AND Estatus = 0;
					END
					ELSE IF ISNULL(@ZonaERP, '') = '02' 
					BEGIN
						SELECT @StdPrepImp = [Tiempo Std]
						FROM Cajas02..CmoDat018
						WHERE [Clave Maquina] = RTRIM(@lMaquina)
							AND [Clave Proceso] = RTRIM(@TPrepa)
							AND Estatus = 0;
					END
					ELSE IF ISNULL(@ZonaERP, '') = '05' 
					BEGIN
						SELECT @StdPrepImp = [Tiempo Std]
						FROM Cajas05..CmoDat018
						WHERE [Clave Maquina] = RTRIM(@lMaquina)
							AND [Clave Proceso] = RTRIM(@TPrepa)
							AND Estatus = 0;
					END
				END ELSE
				BEGIN
					DECLARE @tmpExiste AS TABLE (TiempoStd SMALLINT, ClaveProceso VARCHAR(10));

					IF ISNULL(@ZONAERP, '') = '01'
					BEGIN
						INSERT INTO @tmpExiste (TiempoStd, ClaveProceso)
						SELECT A.[Tiempo Std], A.[Clave Proceso]
						FROM Cajas01..CmoDat018 A 
						INNER JOIN Cajas01..CmoCat011 B ON A.[Clave Maquina] = B.[Clave Maquina] 
						WHERE A.[clave maquina] = @lMaquina AND A.estatus = 0 AND B.Status = 0;
					END
					ELSE IF ISNULL(@ZONAERP, '') = '02'
					BEGIN
						INSERT INTO @tmpExiste (TiempoStd, ClaveProceso)
						SELECT A.[Tiempo Std], A.[Clave Proceso]
						FROM Cajas02..CmoDat018 A 
						INNER JOIN Cajas02..CmoCat011 B ON A.[Clave Maquina] = B.[Clave Maquina] 
						WHERE A.[clave maquina] = @lMaquina AND A.estatus = 0 AND B.Status = 0;
					END
					ELSE IF ISNULL(@ZONAERP, '') = '05'
					BEGIN
						INSERT INTO @tmpExiste (TiempoStd, ClaveProceso)
						SELECT A.[Tiempo Std], A.[Clave Proceso]
						FROM Cajas05..CmoDat018 A 
						INNER JOIN Cajas05..CmoCat011 B ON A.[Clave Maquina] = B.[Clave Maquina] 
						WHERE A.[clave maquina] = @lMaquina AND A.estatus = 0 AND B.Status = 0;
					END

					IF NOT EXISTS(SELECT 1 FROM @tmpExiste)
					BEGIN
						SELECT @NoProgramar = 0;
						
						UPDATE @OPsDinamico SET value24 = 'No existe Capacidad en Acabados Máquina ' + @lMaquina
						WHERE ID = @lId;

						GOTO SiguientePendienteSecuencia;
					END ELSE
					BEGIN
						SELECT TOP 1 @StdPrepImp = TiempoStd, @TPrepa = ClaveProceso
						FROM @tmpExiste;
					END
				END

				SELECT TOP 1 @value01 = value01, @value02 = value02, @value03 = value03, @value04 = value04, @value05 = value05, @value06 = value06, @value07 = value07, @value08 = value08, @value09 = value09, @value10 = value10
					, @value11 = value11, @value12 = value12, @value13 = value13, @value14 = value14, @value15 = value15, @value16 = value16, @value17 = value17, @value18 = value18, @value19 = value19, @value20 = value20
					, @value21 = value21, @value22 = value22, @value23 = value23, @value24 = value24, @value25 = value25, @value26 = value26
					--, @value27 = value27, @value28 = value28, @value29 = value29, @value30 = value30
					--, @value31 = value31, @value32 = value32, @value33 = value33, @value34 = value34, @value35 = value35, @value36 = value36, @value37 = value37, @value38 = value38, @value39 = value39, @value40 = value40
				FROM @OPsDinamico
				WHERE ID = @lId

				-- 
				SELECT @AreaH = @value06;

				-- ===========================================================
				--   LEE LAS VELOCIDADES DE OPERACION PARA CALCULO DE TIEMPO
				-- ===========================================================
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT TOP 1 @VelocImp = A.[Velocidad Std], @lEficImp = B.Eficiencia 
					FROM Cajas01..CmoDat026 A 
					JOIN Cajas01..CmoCat011 B ON A.[clave maquina] = B.[clave maquina]  
					WHERE A.Estatus = 0 And A.[clave maquina] = @lMaquina
					ORDER BY A.[clave maquina], A.[Area Inicial];
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT TOP 1 @VelocImp = A.[Velocidad Std], @lEficImp = B.Eficiencia 
					FROM Cajas02..CmoDat026 A 
					JOIN Cajas02..CmoCat011 B ON A.[clave maquina] = B.[clave maquina]  
					WHERE A.Estatus = 0 And A.[clave maquina] = @lMaquina
						AND [Area inicial] <= @AreaH AND [Area Final] >= @AreaH
					ORDER BY A.[clave maquina], A.[Area Inicial];
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT TOP 1 @VelocImp = A.[Velocidad Std], @lEficImp = B.Eficiencia 
					FROM Cajas05..CmoDat026 A 
					JOIN Cajas05..CmoCat011 B ON A.[clave maquina] = B.[clave maquina]  
					WHERE A.Estatus = 0 And A.[clave maquina] = @lMaquina
					ORDER BY A.[clave maquina], A.[Area Inicial];
				END

				-- ===========================================================================
				-- VALIDA QUE EXISTA EN LA TABLA CMODAT067, SI ENCUENTRA EL ARTICULO ACTIVO EN ESA TABLA, ACTUALIZA EL VALOR QUE TOMA LA VELOCIDAD STD ( VelocImp )
				-- Se Agrega una variable para indicar si existe el articulo la pone en la variable xarticulo

				DECLARE @xClaveArticulo VARCHAR(10)
				DECLARE @STDf AS TABLE (ID INT IDENTITY(1,1), ClaveArticulo VARCHAR(9), Proceso1 BIT, ClaveMaquina VARCHAR(5), VelocidadStd DECIMAL(6,2), SetUp DECIMAL(6,2))

				IF ISNULL(@lNumProceso, 0) = 1
				BEGIN
					-- En caso de Ser Zona 02 Se Agrega Campo en select para Obtener Tiempo de preparacion para Articulos Especiales
					IF ISNULL(@ZonaERP, '') = '01'
					BEGIN
						INSERT INTO @STDf (ClaveArticulo, Proceso1, ClaveMaquina, VelocidadStd)
						SELECT ClaveArticulo, Proceso1, ClaveMaquina, VelocidadStd
						FROM Cajas01..CmoDat079
						WHERE ClaveArticulo = @value02 AND Estatus = 0;
					END
					ELSE IF ISNULL(@ZonaERP, '') = '02'
					BEGIN
						INSERT INTO @STDf (ClaveArticulo, Proceso1, ClaveMaquina, VelocidadStd, SetUp)
						SELECT ClaveArticulo, Proceso1, ClaveMaquina, VelocidadStd, SetUp
						FROM Cajas02..CmoDat079
						WHERE ClaveArticulo = @value02 AND Estatus = 0;
					END
					ELSE IF ISNULL(@ZonaERP, '') = '05'
					BEGIN
						INSERT INTO @STDf (ClaveArticulo, Proceso1, ClaveMaquina, VelocidadStd)
						SELECT ClaveArticulo, Proceso1, ClaveMaquina, VelocidadStd
						FROM Cajas05..CmoDat079
						WHERE ClaveArticulo = @value02 AND Estatus = 0;
					END

					IF EXISTS(SELECT 1 FROM @STDf)
					BEGIN
						SELECT TOP 1 @xClaveArticulo = ClaveArticulo FROM @STDf;
					END

					WHILE EXISTS(SELECT 1 FROM @STDf)
					BEGIN
						DECLARE @STDfID INT, @STDfClaveArticulo VARCHAR(9), @STDfProceso1 BIT, @STDfClaveMaquina VARCHAR(5), @STDfVelocidadStd DECIMAL(6,2), @STDfSetUp DECIMAL(6,2);

						SELECT TOP 1 @STDfID = ID, @STDfClaveArticulo = ClaveArticulo, @STDfProceso1 = Proceso1,
							@STDfClaveMaquina = ClaveMaquina, @STDfVelocidadStd = VelocidadStd, @STDfSetUp = SetUp
						FROM @STDf;

						IF ISNULL(@STDfVelocidadStd, 0) > 0 AND ISNULL(@STDfClaveMaquina, '') = ISNULL(@lMaquina, '')
						BEGIN
							SELECT @VelocImp = @STDfVelocidadStd;
						END

						-- Se agrego validaciòn para que Cuando este registrado el Articulo en estandares especiales, 
						-- Se toma el Tiempo de preparaciòn de lo Capturado en el modulo Datos Produccion Articulos Especiales (CmoCap114)
						IF ISNULL(@ZonaERP, '') = '02'
						BEGIN
							IF ISNULL(@STDfClaveMaquina, '') = ISNULL(@lMaquina, '') AND ISNULL(@STDfSetUp, 0) > 0
							BEGIN
								SELECT @StdPrepImp = @STDfSetUp;
							END
						END

						DELETE FROM @STDf WHERE ID = @STDfID;
					END
				END ELSE
				BEGIN
					SELECT @PzsCrt = 1
				END

				-- ===========================================================================
				-- Calculos  nuevos ke se tienen ke haer para las makinmas.. ac es
				-- ===========================================================================
				DECLARE @tmpPiezasPallet DECIMAL(18,2)
				SELECT @VelocImp = CASE WHEN ISNULL(@VelocImp, 0) = 0 THEN 100 ELSE @VelocImp END;
				SELECT @StdPrepImp = CASE WHEN ISNULL(@StdPrepImp, 0) = 0 THEN 13 ELSE @StdPrepImp END;
				
				IF ISNULL(@lMaquina, '') != ''
				BEGIN
					-- Si la máquina es PALET aplica otra formula para calcular la velocidad
					IF ISNULL(@wPallet, 0) = 1 AND ISNULL(@lUltimoProceso, 0) = 1
					BEGIN
						IF ISNULL(@ZonaERP, '') = '01'
						BEGIN
							SELECT @tmpPiezasPallet = [camasxpallet] * [PiezasxBulto] * BultosxCama
							FROM Cajas01..CmoTjCat004
							WHERE [Clave Articulo] = RTRIM(@value02);
						END
						ELSE IF ISNULL(@ZonaERP, '') = '02'
						BEGIN
							SELECT @tmpPiezasPallet = [camasxpallet] * [PiezasxBulto] * BultosxCama
							FROM Cajas02..CmoTjCat004
							WHERE [Clave Articulo] = RTRIM(@value02);
						END
						ELSE IF ISNULL(@ZonaERP, '') = '05'
						BEGIN
							SELECT @tmpPiezasPallet = [camasxpallet] * [PiezasxBulto] * BultosxCama
							FROM Cajas05..CmoTjCat004
							WHERE [Clave Articulo] = RTRIM(@value02);
						END

						IF ISNULL(@tmpPiezasPallet, 0) != 0
						BEGIN
							SELECT @lPzasPallet = ISNULL(@value05, 0) / ISNULL(@tmpPiezasPallet, 0);
							SELECT @TmpoEstImp = (@lPzasPallet / (@VelocImp * @lEficImp)) + @StdPrepImp
							SELECT @wPallet = 0;
						END ELSE
						BEGIN
							-- TmpoEstImp = (CLng("0" & OPsDinamico(X2, 5)) / IIf(VelocImp = 0, 1, VelocImp) / IIf(lEficImp = 0, 1, lEficImp) / PzsCrt) + StdPrepImp
							SELECT @TmpoEstImp = 
								(ISNULL(@value05, 0) / (CASE WHEN ISNULL(@VelocImp, 0) = 0 THEN 1 ELSE @VelocImp END) / (CASE WHEN ISNULL(@lEficImp, 0) = 0 THEN 1 ELSE @lEficImp END) / @PzsCrt) + @StdPrepImp
						END
					END
				END

				-- Se incrementa un 60% al tiempo Calculado esto para compenzar contra el tiempo Real
				DECLARE @DblFactor REAL = 0;
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT @DblFactor = ISNULL(Factor, 0)
					FROM Cajas01..CmoCat072
					WHERE Status = 0 AND @value05 BETWEEN PzaMin AND PzaMax;
				END
				SELECT @TmpoEstImp = CASE WHEN ISNULL(@TmpoEstImp, 0) / 60 > 23 THEN 1380 ELSE @TmpoEstImp END;

				DECLARE @tmp1 AS TABLE (ClaveProceso VARCHAR(10), ClaveMaquina VARCHAR(10));

				IF ISNULL(@TPrepa, 0) != 0 AND RTRIM(ISNULL(@lMaquina, '')) != ''
				BEGIN
					IF ISNULL(@ZonaERP, '') = '01'
					BEGIN
						INSERT INTO @tmp1 (ClaveProceso, ClaveMaquina)
						SELECT B.[Clave Proceso], C.[Clave Maquina] 
						FROM Cajas01..CmoDat018 B 
						JOIN Cajas01..CmoCat011 C ON B.[Clave Maquina] = C.[Clave Maquina] 
						WHERE B.[Clave Maquina] = @lMaquina AND B.[Clave Proceso] = @TPrepa AND B.Estatus = 0 AND C.Status = 0;
					END
					ELSE IF ISNULL(@ZonaERP, '') = '02'
					BEGIN
						INSERT INTO @tmp1 (ClaveProceso, ClaveMaquina)
						SELECT B.[Clave Proceso], C.[clave maquina] 
						FROM Cajas02..CmoDat018 B 
						JOIN Cajas02..CmoCat011 C ON B.[Clave Maquina] = C.[Clave Maquina] 
						WHERE B.[Clave Maquina] = @lMaquina AND B.[Clave Proceso] = @TPrepa AND B.Estatus = 0 AND C.Status = 0;
					END
					ELSE IF ISNULL(@ZonaERP, '') = '05'
					BEGIN
						INSERT INTO @tmp1 (ClaveProceso, ClaveMaquina)
						SELECT B.[Clave Proceso], C.[clave maquina] 
						FROM Cajas05..CmoDat018 B 
						JOIN Cajas05..CmoCat011 C ON B.[Clave Maquina] = C.[Clave Maquina] 
						WHERE B.[Clave Maquina] = @lMaquina AND B.[Clave Proceso] = @TPrepa AND B.Estatus = 0 AND C.Status = 0;
					END
				END

				IF NOT EXISTS(SELECT 1 FROM @tmp1)
				BEGIN
					UPDATE @OPsDinamico SET
						value23 = @value05,
						value05 = 0,
						value24 = 'No hay Capacidad de Proceso ' + CONVERT(VARCHAR, @TPrepa) + ' en Máquina ' + @lMaq
					WHERE ID = @lId;

					GOTO SiguientePendienteSecuencia;
				END

				-- Se agrego el campo PorcentajeFPC para que actualice el porcentaje de pedidos cortos.
				-- Toma el número siguiente de programa.
				DECLARE @IntPorcentajeFPC TINYINT = 0, @NSX TINYINT;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT TOP 1 @IntPorcentajeFPC = Porcentaje, @lPrograma = Impresora FROM Cajas01..CmoDat005;

					-- Toma el número siguiente de programa
					SELECT @NSX = ISNULL(MAX(Orden), 0) + 1
					FROM Cajas01..CmoDat020
					WHERE [Clave Maquina] = @lMaquina
						AND Imprime = 1 AND Estatus IN('P','E');
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT TOP 1 @IntPorcentajeFPC = Porcentaje, @lPrograma = Impresora FROM Cajas02..CmoDat005;

					-- Toma el número siguiente de programa
					SELECT @NSX = ISNULL(MAX(Orden), 0) + 1
					FROM Cajas02..CmoDat020
					WHERE [Clave Maquina] = @lMaquina
						AND Imprime = 1 AND Estatus IN('P','E');
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT TOP 1 @IntPorcentajeFPC = Porcentaje, @lPrograma = Impresora FROM Cajas05..CmoDat005;

					-- Toma el número siguiente de programa
					SELECT @NSX = ISNULL(MAX(Orden), 0) + 1
					FROM Cajas05..CmoDat020
					WHERE [Clave Maquina] = @lMaquina
						AND Imprime = 1 AND Estatus IN('P','E');
				END


				-- Calcula Fecha Término de Prod. Impresoras
				SELECT @lFechaTerImp = CASE WHEN ISNULL(@lFechaProgImp, '') != '' THEN DATEADD(N, @TmpoEstImp, @lFechaProgImp) ELSE @lFechaTerImp END;

				-- ======================================================================================================================================
				-- Graba en la Base de Datos afectando la tabla Programación Impresoras

				IF ISNULL(@ZonaERP, '') = '02' AND (
					ISNULL(@CPrepar, '') = 'PEG' OR ISNULL(@CPrepar, '') = 'RAPE' OR ISNULL(@CPrepar, '') = 'RTP' OR ISNULL(@CPrepar, '') = 'ENG' OR
					LEFT(ISNULL(@CPrepar, ''), 3) = '1CRP' OR LEFT(ISNULL(@CPrepar, ''), 3) = '1CRTP' OR LEFT(ISNULL(@CPrepar, ''), 3) = '1CTP' OR LEFT(ISNULL(@CPrepar, ''), 3) = '2CRP' OR
					ISNULL(@CPrepar, '') = '2RTP' OR ISNULL(@CPrepar, '') = '2CRTP' OR ISNULL(@CPrepar, '') = '2CTP' OR ISNULL(@CPrepar, '') = '3CRP' OR
					ISNULL(@CPrepar, '') = '3CRTP' OR ISNULL(@CPrepar, '') = '4CRP' OR ISNULL(@CPrepar, '') = '4CRTP'
				)
				BEGIN
					SELECT @PzsCrt = 1;
				END

				-- =====================
				-- Obtiene un valor del 25% para aquellos movimientos que cumplan con los siguiente criterios
				-- * Maquina=SAT2T
				-- * Tipo=AGRICOLA
				-- * Pegado=A,C,D,I,J y T
				-- * ClavePreparacion=1CT, 2CT, 3CT, 1CRT, 2CRT, 3CRT
				-- =====================
				DECLARE @unionPegada VARCHAR(2);
				IF RIGHT(RTRIM(@TxtDescripcion), 2) = 'SI'
				BEGIN
					SELECT @unionPegada = 'SI';
				END

				DECLARE @DesVelSTD INT = 0;
				SELECT @lblIndustria = LTRIM(RTRIM(ISNULL(@lblIndustria, ''))),
					@lblProceso = LTRIM(RTRIM(ISNULL(@lblProceso, ''))),
					@CmbMaquina = LTRIM(RTRIM(ISNULL(@CmbMaquina, ''))),
					@TxtComentarios = LTRIM(RTRIM(ISNULL(@TxtComentarios, ''))),
					@txtEProceso = LTRIM(RTRIM(ISNULL(@txtEProceso, '')));

				SELECT @DesVelSTD = 
					CASE WHEN ISNULL(@lMaquina, '') = 'SAT2T' AND ( @lblIndustria = 'AGR' OR @lblIndustria = 'PAR' ) 
							AND @unionPegada = 'SI' AND (
								@lblProceso = '1CT' OR @lblProceso = '2CT' OR @lblProceso = '3CT' OR 
								@lblProceso = '1CRT' OR @lblProceso = '2CRT' OR @lblProceso = '3CRT'
							) AND @xClaveArticulo = '' 
						THEN 24 
						ELSE @DesVelSTD 
					END;

				-- Descuento de Velocidad Standar para los procesos FLITHO
				DECLARE @DescuentoVELSTD INT = 0;

				SELECT @DescuentoVELSTD = 
					CASE WHEN @TPrepa = 'FLITHO'
						THEN 
							CASE WHEN @CmbMaquina = 'FLEX3' THEN 63
								WHEN @CmbMaquina = 'McKin' OR @CmbMaquina = 'OKLAH' THEN 39
								WHEN @CmbMaquina = 'WARD1' THEN 60
								ELSE @DescuentoVELSTD
							END
						ELSE @DescuentoVELSTD
					END;


				-- ===========================================================================================
				-- INSERTAR
				SELECT TOP 1 @value01 = value01, @value02 = value02, @value03 = value03, @value04 = value04, @value05 = value05, @value06 = value06, @value07 = value07, @value08 = value08, @value09 = value09, @value10 = value10
					, @value11 = value11, @value12 = value12, @value13 = value13, @value14 = value14, @value15 = value15, @value16 = value16, @value17 = value17, @value18 = value18, @value19 = value19, @value20 = value20
					, @value21 = value21, @value22 = value22, @value23 = value23, @value24 = value24, @value25 = value25, @value26 = value26
					--, @value27 = value27, @value28 = value28, @value29 = value29, @value30 = value30
					--, @value31 = value31, @value32 = value32, @value33 = value33, @value34 = value34, @value35 = value35, @value36 = value36, @value37 = value37, @value38 = value38, @value39 = value39, @value40 = value40
				FROM @OPsDinamico
				WHERE ID = @lId;

				SELECT @PzsCrt = CASE WHEN ISNULL(@PzsCrt, 0) > 0 THEN @PzsCrt ELSE 1 END;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO Cajas01..CmoDat020 (
						Programa, Orden, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [Piezas Corte],
						[Ultimo Proceso], [Minutos Preparacion], [Minutos Produccion], Estatus, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema],
						[hora sistema], Usuario, Imprime, Pegado, [Tipo Maquina], [Velocidad Std], Notas, 
						Medida1, Medida2, Tproceso, ProgramaCorr, FechaInicio, FechaTermino,
						Proceso1, Eficiencia, Pintado, PorcentajeFPC, Eproceso, DesVelSTD
					)
					VALUES (
						@lPrograma, @NSX, @lMaquina, LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), @value01, @value12, @value05, @TPrepa, @lSuaje, @lDado, @PzsCrt,
						@lUltimoProceso, @StdPrepImp, @TmpoEstImp, 'P', @PrimerColor, @SegundoColor, @TercerColor, @CuartoColor, LEFT(@FechaSis, 10), 
						RIGHT(RTRIM(@FechaSis), 8), @UsuarioERP, 1, @SegP, @lTipoMaquina, @VelocImp, @TxtComentarios + ' P.Aut ' + CASE WHEN @value25 = 1 AND @lTipoMaquina = 'IM' THEN 'APLICAR PROCESO DE PINTADO' ELSE '' END,
						@lDesLargo, @lDesAncho, @lProcesoTipo, @value22, @lFechaProgImp, @lFechaTerImp, 
						CASE WHEN ISNULL(@lNumProceso, 0) = 1 THEN 1 ELSE 0 END, @lEficImp, CASE WHEN ISNULL(@value25, 0) = 1 AND ISNULL(@lTipoMaquina, '') = 'IM' THEN 1 ELSE 0 END,
						@IntPorcentajeFPC, @txtEProceso, CASE WHEN ISNULL(@DesVelSTD, 0) > 0 THEN @DesVelSTD ELSE @DescuentoVELSTD END
					)
					SELECT @lAfectaImp = @@ROWCOUNT;

					UPDATE Cajas01..CmoDat005 SET Impresora = @lPrograma + 1;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					INSERT INTO Cajas02..CmoDat020 (
						Programa, Orden, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [Piezas Corte],
						[Ultimo Proceso], [Minutos Preparacion], [Minutos Produccion], Estatus, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema],
						[hora sistema], Usuario, Imprime, Pegado, [Tipo Maquina], [Velocidad Std], Notas, 
						Medida1, Medida2, Tproceso, ProgramaCorr, FechaInicio, FechaTermino,
						Proceso1, Eficiencia, Pintado, PorcentajeFPC, Eproceso, DesVelSTD
					)
					VALUES (
						@lPrograma, @NSX, @lMaquina, LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), @value01, @value12, @value05, @TPrepa, @lSuaje, @lDado, @PzsCrt,
						@lUltimoProceso, @StdPrepImp, @TmpoEstImp, 'P', @PrimerColor, @SegundoColor, @TercerColor, @CuartoColor, LEFT(@FechaSis, 10), 
						RIGHT(RTRIM(@FechaSis), 8), @UsuarioERP, 1, @SegP, @lTipoMaquina, @VelocImp, @TxtComentarios + ' P.Aut ' + CASE WHEN @value25 = 1 AND @lTipoMaquina = 'IM' THEN 'APLICAR PROCESO DE PINTADO' ELSE '' END,
						@lDesLargo, @lDesAncho, @lProcesoTipo, @value22, @lFechaProgImp, @lFechaTerImp, 
						CASE WHEN ISNULL(@lNumProceso, 0) = 1 THEN 1 ELSE 0 END, @lEficImp, CASE WHEN ISNULL(@value25, 0) = 1 AND ISNULL(@lTipoMaquina, '') = 'IM' THEN 1 ELSE 0 END,
						@IntPorcentajeFPC, @txtEProceso, CASE WHEN ISNULL(@DesVelSTD, 0) > 0 THEN @DesVelSTD ELSE @DescuentoVELSTD END
					)
					SELECT @lAfectaImp = @@ROWCOUNT;

					UPDATE Cajas01..CmoDat005 SET Impresora = @lPrograma + 1;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO Cajas05..CmoDat020 (
						Programa, Orden, [Clave Maquina], [Fecha Programa], [Hora Programa], OP, FechaEntrega, Cantidad, [Clave Proceso], Suaje, Dado, [Piezas Corte],
						[Ultimo Proceso], [Minutos Preparacion], [Minutos Produccion], Estatus, [1er Color], [2do Color], [3er Color], [4to Color], [Fecha Sistema],
						[hora sistema], Usuario, Imprime, Pegado, [Tipo Maquina], [Velocidad Std], Notas, 
						Medida1, Medida2, Tproceso, ProgramaCorr, FechaInicio, FechaTermino,
						Proceso1, Eficiencia, Pintado, PorcentajeFPC, Eproceso, DesVelSTD
					)
					VALUES (
						@lPrograma, @NSX, @lMaquina, LEFT(@FechaSis, 10), RIGHT(RTRIM(@FechaSis), 8), @value01, @value12, @value05, @TPrepa, @lSuaje, @lDado, @PzsCrt,
						@lUltimoProceso, @StdPrepImp, @TmpoEstImp, 'P', @PrimerColor, @SegundoColor, @TercerColor, @CuartoColor, LEFT(@FechaSis, 10), 
						RIGHT(RTRIM(@FechaSis), 8), @UsuarioERP, 1, @SegP, @lTipoMaquina, @VelocImp, @TxtComentarios + ' P.Aut ' + CASE WHEN @value25 = 1 AND @lTipoMaquina = 'IM' THEN 'APLICAR PROCESO DE PINTADO' ELSE '' END,
						@lDesLargo, @lDesAncho, @lProcesoTipo, @value22, @lFechaProgImp, @lFechaTerImp, 
						CASE WHEN ISNULL(@lNumProceso, 0) = 1 THEN 1 ELSE 0 END, @lEficImp, CASE WHEN ISNULL(@value25, 0) = 1 AND ISNULL(@lTipoMaquina, '') = 'IM' THEN 1 ELSE 0 END,
						@IntPorcentajeFPC, @txtEProceso, CASE WHEN ISNULL(@DesVelSTD, 0) > 0 THEN @DesVelSTD ELSE @DescuentoVELSTD END
					)
					SELECT @lAfectaImp = @@ROWCOUNT;

					UPDATE Cajas01..CmoDat005 SET Impresora = @lPrograma + 1;
				END
				-- ===========================================================================================

				SELECT @Comp = 1;
				INSERT INTO @IDsMaqAsignar (ID)
				VALUES (@IdMaqAsignar);
			END
SalirBucle:
		

			-- TERMINAN CALCULOS
SiguientePendienteSecuencia:
			IF ISNULL(@NoProgramar, 0) = 0
			BEGIN
				IF ISNULL(@lAfectaImp, 0) <= 0
				BEGIN
					SELECT @lError = 1;
				END
			END

			IF ISNULL(@lError, 0) = 1
			BEGIN
				UPDATE @OPsDinamico SET value24 = 'Error en Sistema...'
				WHERE ID = @lId;

				SELECT TOP 1 @value24 = value24
				FROM @OPsDinamico
				WHERE ID = @lId;

				GOTO Error;
			END ELSE
			BEGIN
				-- xPrograma & ",'" & wJustificacion & "','" & Usuario
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO Cajas01..CmoDat231 (Programa, Justificacion, UsuarioERP)
					VALUES (@lPrograma, @wJustificacion, @UsuarioERP);
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					INSERT INTO Cajas02..CmoDat231 (Programa, Justificacion, UsuarioERP)
					VALUES (@lPrograma, @wJustificacion, @UsuarioERP);
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO Cajas05..CmoDat231 (Programa, Justificacion, UsuarioERP)
					VALUES (@lPrograma, @wJustificacion, @UsuarioERP);
				END

				IF ISNULL(@value24, '') = 'No programada' OR ISNULL(@value24, '') = ''
				BEGIN
					UPDATE @OPsDinamico SET value24 = 'Programado'
					WHERE ID = @lId;
				END ELSE
				BEGIN
					UPDATE @OPsDinamico SET value24 = 'Programado: ' + @value24
					WHERE ID = @lId;
				END

				SELECT TOP 1 @value24 = value24
				FROM @OPsDinamico
				WHERE ID = @lId;

				SELECT @Completado = 1;
			END

			INSERT INTO @IDs (ID)
			VALUES (@lId);
		END
		
SalirSecuenciaPendiente:

		SELECT @Completado AS Programado, @value24 AS Message, 'success' AS TypeMessage;
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
Error:
		SELECT @Completado = 0, @value24 = CASE WHEN @value24 != '' THEN @value24 + '\n' + ERROR_MESSAGE() ELSE @value24 END;
		ROLLBACK TRANSACTION;

		SELECT @Completado AS Programado, @value24 AS Message, 'error' AS TypeMessage;
	END CATCH
	SET NOCOUNT OFF;
END
GO


