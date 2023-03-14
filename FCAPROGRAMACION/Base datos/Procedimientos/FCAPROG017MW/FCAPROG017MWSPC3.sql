USE [Cecsoplan02]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG017MWSPC3]    Script Date: 02/11/2022 11:21:43 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG017MWSPC3]
	@Opcion INT							= NULL
	, @ZonaERP VARCHAR(2)				= NULL
	, @UsuarioERP VARCHAR(6)			= NULL
	, @TipoMaquina INT					= NULL -- 0 = IMPRESORAS, 1 = ACABADOS
	, @TipoClave VARCHAR(5)				= NULL -- 
	, @Programa INT						= NULL
	, @Programas VARCHAR(200)			= NULL
	, @ClaveMaquina VARCHAR(10)			= NULL 
	, @MaquinaEstablecida VARCHAR(10)	= NULL
	, @ClaveProceso VARCHAR(20)			= NULL
	, @OP VARCHAR(12)					= NULL
	, @ClaveArticulo VARCHAR(10)		= NULL
	, @MVT BIT							= NULL
	, @Cantidad INT						= NULL
	, @Programado INT					= NULL
	, @Producido INT					= NULL
	, @Solicitado INT					= NULL
	, @Variacion INT					= NULL
	, @PzasSuaje INT					= NULL
	, @AreaUnitaria REAL				= NULL
	, @Proceso VARCHAR(10)				= NULL
	, @Eficiencia INT					= NULL
	, @txtProceso1 VARCHAR(3)			= NULL
	, @Justificacion VARCHAR(MAX)		= NULL
	, @ProgPosAct VARCHAR(10)			= NULL
	, @ProgPosSig VARCHAR(10)			= NULL
	, @FechaTrabajo VARCHAR(10)			= NULL
	, @TurnoTrabajo TINYINT				= NULL
	, @Descripcion VARCHAR(100)			= NULL
	, @ProduccionPT INT					= NULL
	, @PasoContinua TINYINT				= NULL
	, @Largo INT						= NULL
	, @Ancho INT						= NULL
	, @lFecha SMALLDATETIME				= NULL
	, @lFechaTermino SMALLDATETIME		= NULL
	, @lDuracion INT					= NULL
	, @lFechaProg VARCHAR(30)			= NULL
	, @Area REAL						= NULL
	, @TPrepa INT						= NULL
	, @lSuaje VARCHAR(10)				= NULL
	, @lblIndustria VARCHAR(30)			= NULL
	, @Comentarios VARCHAR(MAX)			= NULL
	, @EProceso VARCHAR(MAX)			= NULL
	, @Cap005TD_001 CMODAT026TD_001		READONLY
	, @Cap016TD_001 CMODAT011TD_001		READONLY
	, @Cap009TD_001 CMOCAT011TD_001		READONLY
AS BEGIN
	SET NOCOUNT ON;
	DECLARE @pModuloInsert VARCHAR(20) = 'CPLCAP012'
	DECLARE @tmpCap005TD_001 AS TABLE(
		ID INT IDENTITY(1,1),
		Programa VARCHAR(15),
		Op VARCHAR(12),
		Cantidad INT,
		MaqOrigen VARCHAR(10),
		CveProceso VARCHAR(10),
		UltimoProceso BIT,
		Articulo VARCHAR(15)
	);
	DECLARE @errCap005TD_001 AS TABLE(
		Programa VARCHAR(15),
		Op VARCHAR(12),
		Cantidad INT,
		MaqOrigen VARCHAR(10),
		CveProceso VARCHAR(10),
		UltimoProceso BIT,
		Articulo VARCHAR(15),
		Valido BIT NOT NULL DEFAULT 0,
		MensajeInvalido VARCHAR(MAX)
	);
	DECLARE @Tipos AS TABLE (Tipo VARCHAR(2));
	DECLARE @tmp AS TABLE (Fecha VARCHAR(30));
	DECLARE @MaquinasOpsCanceladas AS TABLE (ClaveMaquina VARCHAR(10));
	DECLARE @CmoDat020 AS TABLE (OP VARCHAR(12), FechaPrograma SMALLDATETIME, HoraPrograma VARCHAR(8));
	DECLARE @Existencia INT, @lPiezas INT;
	DECLARE @FechaSis VARCHAR(30);
	DECLARE @Completado BIT, @Msj VARCHAR(500), @TypeMessage VARCHAR(10);
	DECLARE @FormatoFecha VARCHAR(20) = 'dd/MM/yyyy HH:mm:ss';
	DECLARE @M AS TABLE (M VARCHAR(50));
	DECLARE @ResOpc10 AS TABLE (Descripcion VARCHAR(30), TProceso VARCHAR(6));
	DECLARE @Salida BIT;
	DECLARE @lMaquina VARCHAR(10) = NULL;
	DECLARE @Resultado AS TABLE (
		OP VARCHAR(12), Cantidad INT, AreaUnitaria REAL, MVT BIT, Resistencia VARCHAR(10), Devuelto INT, LiberadoCostos BIT, LargoDesarrollo REAL, AnchoDesarrollo REAL
		, ClaveArticulo VARCHAR(9), Flauta VARCHAR(3), PiezasXCorte DECIMAL(2, 0), LargoHoja REAL, AnchoHoja REAL
		, PrimerColor VARCHAR(13), SegundoColor VARCHAR(13), TercerColor VARCHAR(13), CuartoColor VARCHAR(13), Suaje varchar(8), Dado VARCHAR(20)
		, ClavePreparacion VARCHAR(10), MaquinaEstablecida VARCHAR(5), Eproceso VARCHAR(500), ConScore BIT
		, Industria VARCHAR(3), FechaEntrega SMALLDATETIME, AutAgente BIT, Clave VARCHAR(3), Ruta VARCHAR(40), UnionPegada BIT
		, CantidadSol INT, CantidadTras INT, Autorizado BIT, Descripcion VARCHAR(60), Proceso VARCHAR(2), PiezasXHoja DECIMAL(4, 1)
		, NoProducir BIT, ClaveCliente VARCHAR(12), NombreCliente VARCHAR(100), Status VARCHAR(6)
		, MsjOp AS 
			CASE WHEN ISNULL(Status, '') = 'TER' THEN 'OP Terminada...'
				WHEN ISNULL(Status, '') = 'CAN' THEN 'OP Cancelada...'
				WHEN ISNULL(Status, '') = 'PEN' THEN 'OP Pendiente...'
				--WHEN ISNULL(Status, '') = 'SUS' THEN 'OP Suspendida...'
				WHEN ISNULL(Status, '') = 'GEN' THEN 'OP No Autorizada...'
				ELSE ''
			END
		, MsjProducir AS 
			CASE WHEN ISNULL(NoProducir, 0) = 1 THEN 'OP Generada de NO PRODUCCIÓN... VERIFIQUE!'
				ELSE ''
			END
		, CajaNueva BIT, Modificacion BIT, Comentarios VARCHAR(500), RetrabajoOP BIT
	);
	DECLARE @CmoSP016_1 AS TABLE (
		UltimoProceso BIT, OP VARCHAR(20), Cliente VARCHAR(100), Articulo VARCHAR(100), Cantidad INT, LargoDesarrollo REAL, AnchoDesarrollo REAL
		, PrimerColor VARCHAR(13), SegundoColor VARCHAR(13), TercerColor VARCHAR(13), CuartoColor VARCHAR(13)
		, FechaEntrega SMALLDATETIME, FijarFecha SMALLDATETIME, FechaTermino SMALLDATETIME, FechaInicio SMALLDATETIME, FechaCorrug SMALLDATETIME
		, MinutosProduccion SMALLINT, Orden SMALLINT, Programa INT, Notas VARCHAR(200)
		, ClaveArticulo VARCHAR(10), ClaveArticulo2 VARCHAR(10)
		, Producido INT, Estatus VARCHAR(1), NotasOperacion VARCHAR(200), ClaveProceso VARCHAR(10), Proceso1 BIT
		, ProgramaCorr INT, Suspendido BIT, Electronico BIT, Pintado BIT, Status VARCHAR(10)
		, LiberadoDS INT, PSI DECIMAL(18, 2), LBF DECIMAL(18, 2), CompresionEspOtrosLBF DECIMAL(18, 2), EProceso VARCHAR(500)
		, Minimo DECIMAL(18, 2), Maximo DECIMAL(18, 2), ConScore BIT, EnAtencion INT--, SaldoOP INT NOT NULL DEFAULT 0
		, Horas INT, Minutos INT, Tiempo VARCHAR(5)
	);
	DECLARE @DataEstatus AS TABLE(Correcto BIT, Mensaje VARCHAR(MAX));
	-- VARIABLES PARA CONTROL DE TABLA (@tmpCap005TD_001)
	DECLARE @IDCap005TD_001 INT, @tPrograma VARCHAR(15), @tOp VARCHAR(12), @tCantidad INT, @tCantidadIni INT
		, @tMaqOrigen VARCHAR(10), @tCveProceso VARCHAR(10), @tUltimoProceso BIT, @tArticulo VARCHAR(15);
	DECLARE @pClaveArticulo VARCHAR(9), @pNombreArticulo VARCHAR(60), @pClaveCliente VARCHAR(12), @pNombreCliente VARCHAR(100), 
		@pTipoCliente TINYINT, @pAgente VARCHAR(4), @pClaveRepresentante VARCHAR(6), @pRepresentante VARCHAR(50), @pCorreoRepresentante VARCHAR(40), 
		@pClaveEjecutivo VARCHAR(6), @pNombEjecutivo VARCHAR(50), @pCorreoEjecutivo VARCHAR(40), @pCantidadPro INT, @pAntiguedad INT = NULL;
	DECLARE @AnchoMax NUMERIC(18, 2), @AnchoMin NUMERIC(18, 2), @LargoMax NUMERIC(18, 2), @LargoMin NUMERIC(18, 2), @Existe BIT = 1;

	INSERT INTO @tmpCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo)
	SELECT Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo
	FROM @Cap005TD_001;

	-- OBTENER FECHA SISTEMA (LeeHoraLocal)
	IF @Opcion = 0
	BEGIN
		DECLARE @Fecha DATETIME = Informatica.[dbo].[MnuFun002](1, ISNULL(@UsuarioERP, ''), ISNULL(@ZonaERP, ''), GETDATE());
		SELECT FORMAT(ISNULL(@Fecha, GETDATE()), @FormatoFecha) AS Fecha;
	END
	-- OBTENER MAQUINAS
	ELSE IF @Opcion = 1
	BEGIN
		IF @TipoMaquina = 0 -- IMPRESORAS
		BEGIN
			INSERT INTO @Tipos (Tipo) VALUES ('IM');
		END ELSE
		BEGIN
			INSERT INTO @Tipos (Tipo) VALUES ('AC'), ('ES');
		END

		IF ISNULL(@TipoClave, '') != ''
		BEGIN
			DELETE FROM @Tipos;
			INSERT INTO @Tipos (TIPO) VALUES (@TipoClave);
		END

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT [Clave Maquina] AS ClaveMaquina, [Tipo Maquina] AS TipoMaquina, EsCapAut, ImplementadoAut
			FROM Cajas01..CmoCat011
			WHERE Status = 0
				AND [Tipo Maquina] IN (SELECT Tipo FROM @Tipos)
				AND [Clave Maquina] NOT IN (ISNULL(@ClaveMaquina, ''));
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT [Clave Maquina] AS ClaveMaquina, [Tipo Maquina] AS TipoMaquina, EsCapAut, ImplementadoAut
			FROM Cajas02..CmoCat011
			WHERE Status = 0
				AND [Tipo Maquina] IN (SELECT Tipo FROM @Tipos)
				AND [Clave Maquina] NOT IN (ISNULL(@ClaveMaquina, ''));
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT [Clave Maquina] AS ClaveMaquina, [Tipo Maquina] AS TipoMaquina, EsCapAut, ImplementadoAut
			FROM Cajas05..CmoCat011
			WHERE Status = 0
				AND [Tipo Maquina] IN (SELECT Tipo FROM @Tipos)
				AND [Clave Maquina] NOT IN (ISNULL(@ClaveMaquina, ''));
		END
	END
	-- MAQUINA EN MANTENIMIENTO (MaquinaEnMntto)
	ELSE IF @Opcion = 2
	BEGIN
		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;

		SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;

		SELECT CASE WHEN COUNT(*) <= 0 THEN 0 ELSE 1 END AS Estado 
		FROM CplCat001
		WHERE ClaveMaquina = @ClaveMaquina
			AND Status = 0
			AND TipoTiempo = 'PM'
			AND @FechaSis BETWEEN Inicio AND Termino;
	END
	-- LEE SECUENCIA (leeProgramaActual)
	ELSE IF @Opcion = 3
	BEGIN
		-- OBTENER FECHA DE USUARIO (ZONAERP)
		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;
		SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;

		DECLARE @SaldosOP AS TABLE (OP VARCHAR(10), SaldoOP INT)

		DECLARE @Maquina AS TABLE (TipoMaquina VARCHAR(2), ClaveMaquina VARCHAR(10), Hoy VARCHAR(20));

		;WITH Maquinas AS (
			SELECT [Tipo Maquina], @FechaSis AS Hoy, [Clave Maquina], '01' AS ZonaERP FROM Cajas01..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina
			UNION
			SELECT [Tipo Maquina], @FechaSis AS Hoy, [Clave Maquina], '02' AS ZonaERP FROM Cajas02..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina
			UNION
			SELECT [Tipo Maquina], @FechaSis AS Hoy, [Clave Maquina], '05' AS ZonaERP FROM Cajas05..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina
		)
		INSERT INTO @Maquina (ClaveMaquina, TipoMaquina, Hoy)
		SELECT [Clave Maquina], [Tipo Maquina], Hoy
		FROM Maquinas
		WHERE ZonaERP = ISNULL(@ZonaERP, '');

		IF NOT EXISTS (SELECT 1 FROM @Maquina) BEGIN 
			SELECT 'No se encontró Tipo de Máquina...' AS Notas, 'ERROR' AS Estatus;
			SELECT 'ERROR' AS ClaveMaquina;
		END ELSE
		BEGIN
			-- TIPO DE MAQUINA
			DECLARE @TMaquina VARCHAR(10)
			IF @TipoMaquina = 0 -- IMPRESORAS
			BEGIN
				SELECT @TMaquina = 'IM,';
			END ELSE
			BEGIN
				SELECT @TMaquina = 'AC,ES,';
			END

			-- AQL DE OPS
			DECLARE @OPAQL AS TABLE (OP VARCHAR(12), AQL BIT);
			DECLARE @ArticuloNuevo AS TABLE (ClaveArticulo VARCHAR(12), PDN INT);

			IF ISNULL(@ZonaERP, '') = '02' AND ISNULL(@ClaveMaquina, '') = 'PALET'
			BEGIN
				INSERT INTO @CmoSP016_1 (
					UltimoProceso, OP, Cliente, Articulo, Cantidad, LargoDesarrollo, AnchoDesarrollo, PrimerColor, SegundoColor, TercerColor, CuartoColor
					, FechaEntrega, MinutosProduccion, Orden, Programa, Notas, FijarFecha, ClaveArticulo, FechaTermino, FechaInicio
					, Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, FechaCorrug, Suspendido, Electronico, Pintado, Status
					, LiberadoDS, PSI, LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
				)
				EXEC Cajas02..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Ban2 = 1, @Tablas = 1;

				INSERT INTO @MaquinasOpsCanceladas (ClaveMaquina)
				EXEC Cajas02..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Ban2 = 1, @Tablas = 2;

				INSERT INTO @OPAQL (OP, AQL)
				SELECT A.OP, CASE WHEN ISNULL(C.Cliente, '') = '' THEN 0 ELSE 1 END
				FROM Cajas02..CmoDat011 A
				JOIN Cajas02..CmoDat010 B
				LEFT JOIN Cajas02..CmoDat238 C ON B.[Clave Cliente] = C.Cliente ON A.Folio_OP = B.OP
				WHERE A.OP IN (SELECT OP FROM @CmoSP016_1);

				INSERT INTO @ArticuloNuevo (ClaveArticulo, PDN)
				SELECT B.[Clave Articulo], COUNT(A.OP)
				FROM Cajas02..CmoDat021 A
				JOIN Cajas02..CmoDat011 B ON A.OP = B.OP
				WHERE B.[Clave Articulo] IN (SELECT ClaveArticulo2 FROM @CmoSP016_1)
				GROUP BY B.[Clave Articulo]
			END ELSE
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO @CmoSP016_1 (
						UltimoProceso, OP, Cliente, Articulo, Cantidad, LargoDesarrollo, AnchoDesarrollo, PrimerColor, SegundoColor, TercerColor, CuartoColor
						, FechaEntrega, MinutosProduccion, Orden, Programa, Notas, FijarFecha, ClaveArticulo, ClaveArticulo2, FechaTermino, FechaInicio
						, Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, FechaCorrug, Suspendido, Electronico, Pintado, Status
						, LiberadoDS, PSI, LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
					)
					EXEC Cajas01..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Tablas = 1;

					INSERT INTO @MaquinasOpsCanceladas (ClaveMaquina)
					EXEC Cajas01..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Ban2 = 1, @Tablas = 2;

					INSERT INTO @OPAQL (OP, AQL)
					SELECT A.OP, CASE WHEN ISNULL(C.Cliente, '') = '' THEN 0 ELSE 1 END
					FROM Cajas01..CmoDat011 A
					JOIN Cajas01..CmoDat010 B
					LEFT JOIN Cajas01..CmoDat238 C ON B.[Clave Cliente] = C.Cliente ON A.Folio_OP = B.OP
					WHERE A.OP IN (SELECT OP FROM @CmoSP016_1);

					INSERT INTO @ArticuloNuevo (ClaveArticulo, PDN)
					SELECT B.[Clave Articulo], COUNT(A.OP)
					FROM Cajas01..CmoDat021 A
					JOIN Cajas01..CmoDat011 B ON A.OP = B.OP
					WHERE B.[Clave Articulo] IN (SELECT ClaveArticulo2 FROM @CmoSP016_1)
					GROUP BY B.[Clave Articulo]
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					INSERT INTO @CmoSP016_1 (
						UltimoProceso, OP, Cliente, Articulo, Cantidad, LargoDesarrollo, AnchoDesarrollo, PrimerColor, SegundoColor, TercerColor, CuartoColor
						, FechaEntrega, MinutosProduccion, Orden, Programa, Notas, FijarFecha, ClaveArticulo, ClaveArticulo2, FechaTermino, FechaInicio
						, Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, FechaCorrug, Suspendido, Electronico, Pintado, Status
						, LiberadoDS, PSI, LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
					)
					EXEC Cajas02..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Tablas = 1;

					INSERT INTO @MaquinasOpsCanceladas (ClaveMaquina)
					EXEC Cajas02..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Ban2 = 1, @Tablas = 2;

					INSERT INTO @OPAQL (OP, AQL)
					SELECT A.OP, CASE WHEN ISNULL(C.Cliente, '') = '' THEN 0 ELSE 1 END
					FROM Cajas02..CmoDat011 A
					JOIN Cajas02..CmoDat010 B
					LEFT JOIN Cajas02..CmoDat238 C ON B.[Clave Cliente] = C.Cliente ON A.Folio_OP = B.OP
					WHERE A.OP IN (SELECT OP FROM @CmoSP016_1);

					INSERT INTO @ArticuloNuevo (ClaveArticulo, PDN)
					SELECT B.[Clave Articulo], COUNT(A.OP)
					FROM Cajas02..CmoDat021 A
					JOIN Cajas02..CmoDat011 B ON A.OP = B.OP
					WHERE B.[Clave Articulo] IN (SELECT ClaveArticulo2 FROM @CmoSP016_1)
					GROUP BY B.[Clave Articulo]
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO @CmoSP016_1 (
						UltimoProceso, OP, Cliente, Articulo, Cantidad, LargoDesarrollo, AnchoDesarrollo, PrimerColor, SegundoColor, TercerColor, CuartoColor
						, FechaEntrega, MinutosProduccion, Orden, Programa, Notas, FijarFecha, ClaveArticulo, ClaveArticulo2, FechaTermino, FechaInicio
						, Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, FechaCorrug, Suspendido, Electronico, Pintado, Status
						, LiberadoDS, PSI, LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
					)
					EXEC Cajas05..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Tablas = 1;

					INSERT INTO @MaquinasOpsCanceladas (ClaveMaquina)
					EXEC Cajas05..CmoSP016 @Maquina = @ClaveMaquina, @TipoMaquina = @TMaquina, @Ban = 1, @Ban2 = 1, @Tablas = 2;

					INSERT INTO @OPAQL (OP, AQL)
					SELECT A.OP, CASE WHEN ISNULL(C.Cliente, '') = '' THEN 0 ELSE 1 END
					FROM Cajas05..CmoDat011 A
					JOIN Cajas05..CmoDat010 B
					LEFT JOIN Cajas05..CmoDat238 C ON B.[Clave Cliente] = C.Cliente ON A.Folio_OP = B.OP
					WHERE A.OP IN (SELECT OP FROM @CmoSP016_1);

					INSERT INTO @ArticuloNuevo (ClaveArticulo, PDN)
					SELECT B.[Clave Articulo], COUNT(A.OP)
					FROM Cajas05..CmoDat021 A
					JOIN Cajas05..CmoDat011 B ON A.OP = B.OP
					WHERE B.[Clave Articulo] IN (SELECT ClaveArticulo2 FROM @CmoSP016_1)
					GROUP BY B.[Clave Articulo]
				END
			END

			DECLARE @OPs FCAPROG009CMP_FCAPROG013MW;
			INSERT INTO @OPs (OP)
			SELECT OP
			FROM @CmoSP016_1;

			INSERT INTO @SaldosOP (OP, SaldoOP)
			EXEC dbo.FCAPROG017MWSPC4 @ZonaERP = @ZonaERP, @OPs = @OPs;

			UPDATE @CmoSP016_1 SET Horas = CASE WHEN MinutosProduccion > 1439 THEN 1439 / 60 ELSE MinutosProduccion / 60 END;
			UPDATE @CmoSP016_1 SET Minutos = CASE WHEN MinutosProduccion > 1439 THEN 1439 - (Horas * 60) ELSE MinutosProduccion - (Horas * 60) END;
			UPDATE @CmoSP016_1 SET
				FechaEntrega = ISNULL(FechaEntrega, CONVERT(SMALLDATETIME, '19000101')),
				FijarFecha = ISNULL(FijarFecha, CONVERT(SMALLDATETIME, '19000101')),
				FechaTermino = ISNULL(FechaTermino, CONVERT(SMALLDATETIME, '19000101')),
				FechaInicio = ISNULL(FechaInicio, CONVERT(SMALLDATETIME, '19000101')),
				FechaCorrug = ISNULL(FechaCorrug, CONVERT(SMALLDATETIME, '19000101'))

			SELECT A.Orden AS Value00, RTRIM(A.OP) AS Value01, RTRIM(A.Cliente) AS Value02, RTRIM(A.Articulo) AS Value03, A.Cantidad AS Value04, A.Producido AS Value05
				, A.UltimoProceso AS Value06, B.SaldoOP AS Value07, A.ConScore AS Value08
				, FORMAT(A.LargoDesarrollo, '0.0', 'EN-US') + ' x ' + FORMAT(A.AnchoDesarrollo, '0.0', 'EN-US') AS Value09
				, (RTRIM(A.PrimerColor) + ' ' + RTRIM(A.SegundoColor) + ' ' + RTRIM(A.TercerColor) + ' ' + RTRIM(A.CuartoColor)) AS Value10
				, CASE WHEN YEAR(A.FechaEntrega) = 1900 THEN '' ELSE FORMAT(A.FechaEntrega, 'dd/MM/yyyy') END AS Value11
				, A.ProgramaCorr AS Value12, FORMAT(Horas, '00') + ':' + FORMAT(Minutos, '00') AS Value13
				, CASE WHEN YEAR(A.FijarFecha) = 1900 THEN '' ELSE FORMAT(ISNULL(A.FijarFecha, ''), 'dd/MM/yyyy HH:mm') END AS Value14
				, A.Programa AS Value15, RTRIM(A.Notas) AS Value16
				, CASE WHEN YEAR(A.FechaTermino) = 1900 THEN '' ELSE FORMAT(A.FechaTermino, 'dd/MM/yyyy HH:mm') END AS Value17
				, RTRIM(A.ClaveArticulo) AS Value18
				, CASE WHEN YEAR(A.FechaInicio) = 1900 
					THEN CASE WHEN YEAR(A.FechaTermino) = 1900 
						THEN LEFT(@FechaSis, 16)
						ELSE FORMAT(A.FechaTermino, 'dd/MM/yyyy HH:mm')
					END
					ELSE FORMAT(A.FechaInicio, 'dd/MM/yyyy HH:mm')
				END AS Value19
				, RTRIM(A.Estatus) AS Value20, RTRIM(A.NotasOperacion) AS Value21, RTRIM(A.ClaveProceso) AS Value22
				, CASE WHEN YEAR(A.FechaCorrug) = 1900 THEN '' ELSE FORMAT(A.FechaCorrug, 'dd/MM/yyyy HH:mm') END AS Value23
				, A.Proceso1 AS Value24, A.Suspendido AS Value25, A.Pintado AS Value26, A.CompresionEspOtrosLBF AS Value27, A.LBF AS Value28
				, RTRIM(A.EProceso) AS Value29, A.Minimo AS Value30, A.Maximo AS Value31, RTRIM(A.ClaveArticulo2) AS Value32
				, A.LargoDesarrollo, A.AnchoDesarrollo, A.MinutosProduccion, A.EnAtencion, A.Electronico, RTRIM(A.Status) AS Status, A.LiberadoDS, A.PSI
				, RTRIM(A.PrimerColor) AS PrimerColor, RTRIM(A.SegundoColor) AS SegundoColor, RTRIM(A.TercerColor) AS TercerColor, RTRIM(A.CuartoColor) AS CuartoColor
				, ISNULL(C.AQL, 0) AS Value33
				, CAST(CASE WHEN ISNULL(D.PDN, 0) = 0 THEN 1 ELSE 0 END AS BIT) AS Value34
				--A.UltimoProceso, A.OP, A.Cliente, A.Articulo, A.Cantidad, A.LargoDesarrollo, A.AnchoDesarrollo
				--, A.PrimerColor, A.SegundoColor, A.TercerColor, A.CuartoColor
				--, CASE WHEN YEAR(A.FechaEntrega) = 1900 THEN '' ELSE FORMAT(A.FechaEntrega, 'dd/MM/yyyy') END AS FechaEntrega
				--, CASE WHEN YEAR(A.FijarFecha) = 1900 THEN '' ELSE FORMAT(ISNULL(A.FijarFecha, ''), 'dd/MM/yyyy HH:mm') END AS FijarFecha
				--, CASE WHEN YEAR(A.FechaTermino) = 1900 THEN '' ELSE FORMAT(A.FechaTermino, 'dd/MM/yyyy') END AS FechaTermino
				--, CASE WHEN YEAR(A.FechaInicio) = 1900 
				--	THEN CASE WHEN YEAR(A.FechaTermino) = 1900 
				--		THEN LEFT(@FechaSis, 16)
				--		ELSE FORMAT(A.FechaTermino, 'dd/MM/yyyy HH:mm')
				--	END
				--	ELSE FORMAT(A.FechaInicio, 'dd/MM/yyyy HH:mm')
				--END AS FechaInicio
				--, CASE WHEN YEAR(A.FechaCorrug) = 1900 THEN '' ELSE FORMAT(A.FechaCorrug, 'dd/MM/yyyy HH:mm') END AS FechaCorrug
				--, A.MinutosProduccion, A.Orden, A.Programa, A.Notas, A.ClaveArticulo, A.ClaveArticulo2, A.ConScore, A.EnAtencion
				--, A.Producido, A.Estatus, A.NotasOperacion, A.ClaveProceso, A.Proceso1, A.ProgramaCorr
				--, A.Suspendido, A.Electronico, A.Pintado, A.Status, A.LiberadoDS, A.PSI, A.LBF, A.CompresionEspOtrosLBF, A.EProceso, A.Minimo, A.Maximo
				--, ISNULL(B.SaldoOP, 0) AS SaldoOP, FORMAT(A.LargoDesarrollo, '#,000.0') + ' x ' + FORMAT(A.AnchoDesarrollo, '#,000.0') AS Medidas
				--, (A.PrimerColor + ' ' + A.SegundoColor + ' ' + A.TercerColor + ' ' + A.CuartoColor) AS Colores
				--, FORMAT(Horas, '00') + ':' + FORMAT(Minutos, '00') AS Tiempo
			FROM @CmoSP016_1 A
			LEFT JOIN @SaldosOP B ON A.OP = B.OP
			LEFT JOIN @OPAQL C ON A.OP = C.OP
			LEFT JOIN @ArticuloNuevo D ON A.ClaveArticulo2 = D.ClaveArticulo;

			SELECT ClaveMaquina
			FROM @MaquinasOpsCanceladas;
		END
	END
	-- OBTIENE COMENTARIOS DE OP
	ELSE IF @Opcion = 4
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT IdComentario, RTRIM(Op) AS Op, RTRIM(Articulo) AS Articulo, RTRIM(Comentario) AS Comentario, UsuarioAct, Estatus, FORMAT(Fecha, 'dd/MM/yyyy') AS Fecha
			FROM Cajas01..[CmoDat234 ]
			WHERE OP = ISNULL(@OP, OP)
				AND Articulo = ISNULL(@ClaveArticulo, Articulo)
				AND Estatus = 0;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT IdComentario, RTRIM(Op) AS Op, RTRIM(Articulo) AS Articulo, RTRIM(Comentario) AS Comentario, UsuarioAct, Estatus, FORMAT(Fecha, 'dd/MM/yyyy') AS Fecha
			FROM Cajas02..[CmoDat234 ]
			WHERE OP = ISNULL(@OP, OP)
				AND Articulo = ISNULL(@ClaveArticulo, Articulo)
				AND Estatus = 0;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT IdComentario, RTRIM(Op) AS Op, RTRIM(Articulo) AS Articulo, RTRIM(Comentario) AS Comentario, UsuarioAct, Estatus, FORMAT(Fecha, 'dd/MM/yyyy') AS Fecha
			FROM Cajas05..[CmoDat234 ]
			WHERE OP = ISNULL(@OP, OP)
				AND Articulo = ISNULL(@ClaveArticulo, Articulo)
				AND Estatus = 0;
		END
	END
	-- BUSCAR OP (TODAS LAS MAQUINAS)
	ELSE IF @Opcion = 5
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT A.Orden, A.[Clave Maquina] AS ClaveMaquina, A.Cantidad, F.[Tipo Maquina] AS  TipoMaquina, CASE WHEN F.[Tipo Maquina] = 'IM' THEN 0 ELSE 1 END AS CbxTipoMaquina
			FROM Cajas01..CmoDat020 A
			JOIN Cajas01..CmoDat011 D ON A.OP = D.op
			JOIN Cajas01..CmoDat010 B ON B.OP = D.Folio_OP 
			JOIN Cajas01..CmoTjCat005 C ON B.[clave cliente] = C.codigo
			JOIN Cajas01..CmoTjCat004 E ON D.[clave articulo] = E.[clave articulo]
			LEFT JOIN Cajas01..CmoCat011 F ON F.[clave maquina] = A.[clave maquina]
			WHERE A.OP = ISNULL(@OP, A.OP) And A.imprime = 1 AND A.estatus IN('P','E')
			ORDER BY a.Orden;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT A.Orden, A.[Clave Maquina] AS ClaveMaquina, A.Cantidad, F.[Tipo Maquina] AS  TipoMaquina, CASE WHEN F.[Tipo Maquina] = 'IM' THEN 0 ELSE 1 END AS CbxTipoMaquina
			FROM Cajas02..CmoDat020 A
			JOIN Cajas02..CmoDat011 D ON A.OP = D.op
			JOIN Cajas02..CmoDat010 B ON B.OP = D.Folio_OP 
			JOIN Cajas02..CmoTjCat005 C ON B.[clave cliente] = C.codigo
			JOIN Cajas02..CmoTjCat004 E ON D.[clave articulo] = E.[clave articulo]
			LEFT JOIN Cajas02..CmoCat011 F ON F.[clave maquina] = A.[clave maquina]
			WHERE A.OP = ISNULL(@OP, A.OP) And A.imprime = 1 AND A.estatus IN('P','E')
			ORDER BY a.Orden;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT A.Orden, A.[Clave Maquina] AS ClaveMaquina, A.Cantidad, F.[Tipo Maquina] AS  TipoMaquina, CASE WHEN F.[Tipo Maquina] = 'IM' THEN 0 ELSE 1 END AS CbxTipoMaquina
			FROM Cajas05..CmoDat020 A
			JOIN Cajas05..CmoDat011 D ON A.OP = D.op
			JOIN Cajas05..CmoDat010 B ON B.OP = D.Folio_OP 
			JOIN Cajas05..CmoTjCat005 C ON B.[clave cliente] = C.codigo
			JOIN Cajas05..CmoTjCat004 E ON D.[clave articulo] = E.[clave articulo]
			LEFT JOIN Cajas05..CmoCat011 F ON F.[clave maquina] = A.[clave maquina]
			WHERE A.OP = ISNULL(@OP, A.OP) And A.imprime = 1 AND A.estatus IN('P','E')
			ORDER BY a.Orden;
		END
	END
	-- OBTIENE SIGUIENTE PROGRAMA A CAPTURAR
	ELSE IF @Opcion = 6
	BEGIN
		DECLARE @FechaUltRegPLC SMALLDATETIME, @TurnoUltRegPLC CHAR(1)

		DECLARE @CplDat025 AS TABLE (FechaUltRegPLC SMALLDATETIME, TurnoUltRegPLC CHAR(1))
		SELECT TOP 1 Fecha AS FechaUltRegPLC, Turno AS TurnoUltRegPLC
		FROM CplDat025 
		WHERE ClaveMaquina = ISNULL(@ClaveMaquina, '')
		ORDER BY Fecha DESC;

		DECLARE @CmoSP377_1 AS TABLE (SigProCap VARCHAR(10), UltimoTurnoAnterior VARCHAR(10), PrimeroTurnoActual VARCHAR(10));

		IF EXISTS (SELECT 1 FROM @CplDat025)
		BEGIN
			SELECT TOP 1 @FechaUltRegPLC = ISNULL(FechaUltRegPLC, CONVERT(SMALLDATETIME, '19000101')), @TurnoUltRegPLC = ISNULL(TurnoUltRegPLC, '')
			FROM @CplDat025;

			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				INSERT INTO @CmoSP377_1 (SigProCap, UltimoTurnoAnterior, PrimeroTurnoActual)
				EXEC Cajas01..CmoSP377 @Accion = 1, @FechaUltRegPLC = @FechaUltRegPLC, @TurnoUltRegPLC = @TurnoUltRegPLC, @ClaveMaquina = @ClaveMaquina;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				INSERT INTO @CmoSP377_1 (SigProCap, UltimoTurnoAnterior, PrimeroTurnoActual)
				EXEC Cajas02..CmoSP377 @Accion = 1, @FechaUltRegPLC = @FechaUltRegPLC, @TurnoUltRegPLC = @TurnoUltRegPLC, @ClaveMaquina = @ClaveMaquina;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				INSERT INTO @CmoSP377_1 (SigProCap, UltimoTurnoAnterior, PrimeroTurnoActual)
				EXEC Cajas05..CmoSP377 @Accion = 1, @FechaUltRegPLC = @FechaUltRegPLC, @TurnoUltRegPLC = @TurnoUltRegPLC, @ClaveMaquina = @ClaveMaquina;
			END

			IF EXISTS (SELECT 1 FROM @CmoSP377_1)
			BEGIN
				SELECT ISNULL(SigProCap, '') AS SigProCap, ISNULL(UltimoTurnoAnterior, '') AS UltimoTurnoAnterior, ISNULL(PrimeroTurnoActual, '') AS PrimeroTurnoActual
					, FORMAT(@FechaUltRegPLC, 'dd/MM/yyyy') AS FechaUltRegPLC, @TurnoUltRegPLC AS TurnoUltRegPLC, '' AS MsjInfo
				FROM @CmoSP377_1;
			END ELSE
			BEGIN
				SELECT '' AS SigProCap, '' AS UltimoTurnoAnterior, '' AS PrimeroTurnoActual, '' AS MsjInfo
					, FORMAT(@FechaUltRegPLC, 'dd/MM/yyyy') AS FechaUltRegPLC, @TurnoUltRegPLC AS TurnoUltRegPLC;
			END
		END ELSE
		BEGIN
			SELECT 'No se pudo encontrar la información del PLC' AS MsjInfo
				, '' AS SigProCap, '' AS UltimoTurnoAnterior, '' AS PrimeroTurnoActual, '' AS FechaUltRegPLC, '' AS TurnoUltRegPLC;
		END
	END
	-- BUSCA OP CAP009 (PARTE 1) 
	ELSE IF @Opcion = 7
	BEGIN
		DECLARE @CmoDat010Tmp AS TABLE(Registros INT);

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @CmoDat010Tmp (Registros)
			SELECT 1
			FROM Cajas01..CmoDat010
			WHERE LEFT(OP, 5) = LEFT(ISNULL(@OP, ''), 5) AND OPMaquila = 1 AND TipoAcabado = '02'
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @CmoDat010Tmp (Registros)
			SELECT 2
			FROM Cajas02..CmoDat010
			WHERE LEFT(OP, 5) = LEFT(ISNULL(@OP, ''), 5) AND OPMaquila = 1 AND TipoAcabado = '02'
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @CmoDat010Tmp (Registros)
			SELECT 5
			FROM Cajas05..CmoDat010
			WHERE LEFT(OP, 5) = LEFT(ISNULL(@OP, ''), 5) AND OPMaquila = 1 AND TipoAcabado = '02'
		END

		IF EXISTS(SELECT 1 FROM @CmoDat010Tmp)
		BEGIN
			SELECT 'info' AS TypeMessage, 'OP de Lamina Maquila Bloqueada Para Programar en Impresoras' AS Message;
			SELECT '' AS OP;
		END ELSE 
		BEGIN
			DELETE FROM @CmoDat010Tmp;

			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				INSERT INTO @CmoDat010Tmp (Registros)
				SELECT 1
				FROM Cajas01..CmoDat010 
				WHERE LEFT(OP, 5) = LEFT(ISNULL(@OP, ''), 5) AND OPApoyoMaquila = 1 AND TipoAcabado = '02'
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				INSERT INTO @CmoDat010Tmp (Registros)
				SELECT 2
				FROM Cajas02..CmoDat010
				WHERE LEFT(OP, 5) = LEFT(ISNULL(@OP, ''), 5) AND OPApoyoMaquila = 1 AND TipoAcabado = '02'
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				INSERT INTO @CmoDat010Tmp (Registros)
				SELECT 5
				FROM Cajas05..CmoDat010 
				WHERE LEFT(OP, 5) = LEFT(ISNULL(@OP, ''), 5) AND OPApoyoMaquila = 1 AND TipoAcabado = '02'
			END

			IF EXISTS(SELECT 1 FROM @CmoDat010Tmp)
			BEGIN
				SELECT 'info' AS TypeMessage, 'OP de Apoyo a Maquila Bloqueada Para Programar en Impresoras' AS Message;
				SELECT '' AS OP;
			END ELSE 
			BEGIN
				INSERT INTO @tmp (Fecha)
				EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;
				SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;

				DECLARE @FechaNow AS SMALLDATETIME = CONVERT(SMALLDATETIME, @FechaSis);

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT TOP 1 @lMaquina = [Clave Maquina] FROM Cajas01..CmoDat020
					WHERE OP = @OP AND Estatus <> 'C' AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @FechaNow);

					-- BUSCA SI LA OP YA SE PROGRAMÓ EN UNA MISMA MÁQUINA PARA UN MISMO DÍA
					INSERT INTO @CmoDat020 (OP, FechaPrograma, HoraPrograma)
					SELECT OP, [Fecha Programa], [Hora Programa] FROM Cajas01..CmoDat020 
					WHERE OP = @OP AND [Clave Maquina] = @lMaquina AND Estatus <> 'C' AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @FechaNow);
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT TOP 1 @lMaquina = [Clave Maquina] FROM Cajas02..CmoDat020
					WHERE OP = @OP AND Estatus <> 'C' AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @FechaNow);

					-- BUSCA SI LA OP YA SE PROGRAMÓ EN UNA MISMA MÁQUINA PARA UN MISMO DÍA
					INSERT INTO @CmoDat020 (OP, FechaPrograma, HoraPrograma)
					SELECT OP, [Fecha Programa], [Hora Programa] FROM Cajas02..CmoDat020 
					WHERE OP = @OP AND [Clave Maquina] = @lMaquina AND Estatus <> 'C' AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @FechaNow);
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT TOP 1 @lMaquina = [Clave Maquina] FROM Cajas05..CmoDat020
					WHERE OP = @OP AND Estatus <> 'C' AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @FechaNow);

					-- BUSCA SI LA OP YA SE PROGRAMÓ EN UNA MISMA MÁQUINA PARA UN MISMO DÍA
					INSERT INTO @CmoDat020 (OP, FechaPrograma, HoraPrograma)
					SELECT OP, [Fecha Programa], [Hora Programa] FROM Cajas05..CmoDat020 
					WHERE OP = @OP AND [Clave Maquina] = @lMaquina AND Estatus <> 'C' AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @FechaNow);
				END

				DECLARE @FechaProg SMALLDATETIME, @HoraProg VARCHAR(8);

				IF EXISTS(SELECT 1 FROM @CmoDat020)
				BEGIN
					SELECT TOP 1 @FechaProg = FechaPrograma, @HoraProg = HoraPrograma FROM @CmoDat020;
					SELECT 'question' AS TypeMessage, 'OP y Programada para la Máquina: ' + @lMaquina + '\n\rEl: ' + FORMAT(@FechaProg, 'dd/MM/yyyy') + ' '
						+ 'A las ' + LEFT(@HoraProg, 5) AS Message;
					SELECT '' AS OP;
				END ELSE
				BEGIN
					EXEC dbo.FCAPROG017MWSPC3 @Opcion = 8, @ZonaERP = @ZonaERP, @OP = @OP;
				END
			END
		END
	END
	-- BUSCA OP CAP009 (PARTE 2)
	ELSE IF @Opcion = 8
	BEGIN
		DECLARE @ValidaProceso BIT = 0, @CveMaquina VARCHAR(10) = NULL, @ClavePreparacion VARCHAR(10) = NULL, @ProduccionHora REAL = NULL;
		DECLARE @NoProducir BIT, @ClaveCliente VARCHAR(12), @Status VARCHAR(6), @Nombre VARCHAR(100), @pOP VARCHAR(10), @PiezasXHoja DECIMAL(4, 1)
			, @Articulo VARCHAR(10), @CveProceso VARCHAR(10), @tProceso VARCHAR(6);

		SELECT @pOP = LEFT(@OP, 5) + RIGHT(@OP, 2);

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @Resultado (
				OP, UnionPegada, Industria, ClaveArticulo, Flauta, PiezasXCorte, Cantidad, Descripcion, Proceso, Clave, Ruta
				, PiezasXHoja, AreaUnitaria, LargoHoja, AnchoHoja
				, PrimerColor, SegundoColor, TercerColor, CuartoColor, Suaje, Dado
				, ClavePreparacion, Resistencia, FechaEntrega
				, AutAgente, Devuelto, MaquinaEstablecida, LiberadoCostos, LargoDesarrollo, AnchoDesarrollo
				, CantidadSol, CantidadTras, Autorizado, Eproceso, MVT, ConScore
				, CajaNueva, Modificacion, Comentarios, RetrabajoOP
			)
			SELECT B.OP, ISNULL(D.UnionPegada, 0), AA.Industria, A.[Clave Articulo], A.Flauta, A.PiezasXCorte, B.Cantidad, A.Descripcion, A.Proceso, RTRIM(D.Clave) AS CLave
				, RTRIM(D.Descripcion) AS Ruta, A.PiezasXHoja, B.[Area unitaria], ISNULL(A.[largo hoja], 0) AS LargoHoja, ISNULL(A.[ancho hoja], 0) AS AnchoHoja
				, A.[1er Color], A.[2do Color], A.[3er Color], A.[4to Color], A.Suaje, A.Dado
				, CASE WHEN B.MVT = 1 THEN 'MVT' ELSE A.[Clave Preparacion] END AS ClavePreparacion, B.Resistencia, C.[Fecha Entrega]
				, C.[Aut Agente], B.Devuelto, ISNULL(A.[Maquina Establecida], ''), B.[Liberado Costos], B.[Largo desarrollo], B.[Ancho Desarrollo]
				, ISNULL(E.CantidadSol, 0) AS CantidadSol, ISNULL(E.CantidadTras, 0) AS CantidadTras, ISNULL(E.Autorizado, 0), ISNULL(A.Eproceso, ''), B.MVT, A.ConScore
				, B.[CajaNueva], B.Modificacion, B.Comentarios, B.RetrabajoOP
			FROM Cajas01..CmoDat011 B
			JOIN Cajas01..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
			JOIN Cajas01..CmoCat013 AA ON A.SubCodigo = AA.SubCodigo
			JOIN Cajas01..CmoDat010 C ON C.OP = B.Folio_OP
			LEFT JOIN Cajas01..CmoCat044 D ON A.Proceso = D.Clave AND A.status = 0
			LEFT JOIN Cajas01..CmoDat088 E ON B.OP = E.OP
			WHERE B.OP = @OP;

			--@Programado, @Existencia, @Producido, @Variacion
			SELECT TOP 1 @Programado = SUM(ISNULL(Cantidad, 0)) FROM Cajas01..CmoDat020 WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Estatus <> 'C';
			
			SELECT TOP 1 @Existencia = SUM(ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) 
			FROM Cajas01..CmoTjDat002 A
			INNER JOIN Cajas01..CmoTjCat001 B ON A.Almacen = B.Cod
			WHERE B.Inventario = 1 AND B.TipoAlmacen = 'PT' AND A.Op = @OP AND (B.Cod < '050' OR B.Cod = '052');

			SELECT TOP 1 @Producido = SUM(ISNULL(A.Cantidad, 0)) 
			FROM Cajas01..CmoDat021 A 
			JOIN Cajas01..CmoDat020 B ON A.OP = B.OP AND B.Programa = A.Programa
			WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

			SELECT TOP 1 @Variacion = SUM(ISNULL(A.VARIACION, 0)) 
			FROM Cajas01..CmoDat008 A 
			JOIN Cajas01..CmoDat010 B ON A.Pedido = B.PedidoInt 
			WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);

			-- VALIDAR PROCESO
			IF EXISTS(SELECT 1 FROM @Resultado)
			BEGIN
				SELECT TOP 1 @Proceso = RTRIM(ISNULL(Proceso, '')) 
					, @Articulo = ClaveArticulo, @CveProceso = Proceso
				FROM @Resultado;

				SELECT TOP 1 @CveMaquina = B.[Clave Maquina]
				FROM Cajas01..CmoCat044 A
				JOIN Cajas01..CmoCat011 B ON A.M1 = B.Tproceso
				WHERE A.Clave = @Proceso;

				IF @ClaveMaquina = @CveMaquina 
				BEGIN
					SELECT @ValidaProceso = 1;
				END

				---- Clave Preparación para buscar proceso
				--SELECT TOP 1 @ClavePreparacion = ClavePreparacion
				--FROM @Resultado;

				---- Datos para cálcular duración aprox. de la corrida.
				--SELECT TOP 1 @ClavePreparacion = @ClavePreparacion + ' -- ' + B.Descripcion, @ProduccionHora = A.[Produccion Hora]
				--FROM Cajas01..CmoDat018 A
				--JOIN Cajas01..CmoCat010 B ON A.[Clave Proceso] = B.[Clave Proceso] AND A.[Tipo Maquina] = B.[Tipo Maquina]
				--WHERE A.[Clave Proceso] = @ClavePreparacion;

				INSERT INTO @ResOpc10 (Descripcion, TProceso)
				EXEC dbo.FCAPROG017MWSPC3 @Opcion = 10, @ZonaERP = @ZonaERP, @ClaveProceso = @CveProceso;

				SELECT TOP 1 @tProceso = TProceso FROM @ResOpc10;

				IF EXISTS (
					SELECT 1 FROM Cajas01..CmoDat213 
					WHERE ClaveArticulo = @Articulo AND CveRutaProceso = @CveProceso AND CveProceso = @tProceso AND Estatus = 0
				)
				BEGIN
					SELECT DISTINCT @PiezasXHoja = PiezasXhoja FROM Cajas01..CmoTjCat004 A WHERE A.[clave articulo] = @Articulo
				END
			END

			-- OBTIENE LOS DATOS DEL CLIENTE PARA ESA OP Y LOS MUESTRA EN PANTALLA
			SELECT @NoProducir = A.NoProducir, @ClaveCliente = A.[Clave Cliente], @Nombre = B.Nombre, @Status = A.Status
			FROM Cajas01..CmoDat010 A
			JOIN Cajas01..CmoTjCat005 B ON A.[Clave Cliente] = B.[Codigo]
			WHERE A.OP = @pOP;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @Resultado (
				OP, UnionPegada, Industria, ClaveArticulo, Flauta, PiezasXCorte, Cantidad, Descripcion, Proceso, Clave, Ruta
				, PiezasXHoja, AreaUnitaria, LargoHoja, AnchoHoja
				, PrimerColor, SegundoColor, TercerColor, CuartoColor, Suaje, Dado
				, ClavePreparacion, Resistencia, FechaEntrega
				, AutAgente, Devuelto, MaquinaEstablecida, LiberadoCostos, LargoDesarrollo, AnchoDesarrollo
				, CantidadSol, CantidadTras, Autorizado, Eproceso, MVT, ConScore
				, CajaNueva, Modificacion, Comentarios, RetrabajoOP
			)
			SELECT B.OP, ISNULL(D.UnionPegada, 0), AA.Industria, A.[Clave Articulo], A.Flauta, A.PiezasXCorte, B.Cantidad, A.Descripcion, A.Proceso, RTRIM(D.Clave) AS CLave
				, RTRIM(D.Descripcion) AS Ruta, A.PiezasXHoja, B.[Area unitaria], ISNULL(A.[largo hoja], 0) AS LargoHoja, ISNULL(A.[ancho hoja], 0) AS AnchoHoja
				, A.[1er Color], A.[2do Color], A.[3er Color], A.[4to Color], A.Suaje, A.Dado
				, CASE WHEN B.MVT = 1 THEN 'MVT' ELSE A.[Clave Preparacion] END AS ClavePreparacion, B.Resistencia, C.[Fecha Entrega]
				, C.[Aut Agente], B.Devuelto, ISNULL(A.[Maquina Establecida], ''), B.[Liberado Costos], B.[Largo desarrollo], B.[Ancho Desarrollo]
				, ISNULL(E.CantidadSol, 0) AS CantidadSol, ISNULL(E.CantidadTras, 0) AS CantidadTras, ISNULL(E.Autorizado, 0), ISNULL(A.Eproceso, ''), B.MVT, A.ConScore
				, B.[CajaNueva], B.Modificacion, B.Comentarios, B.RetrabajoOP
			FROM Cajas02..CmoDat011 B
			JOIN Cajas02..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
			JOIN Cajas02..CmoCat013 AA ON A.SubCodigo = AA.SubCodigo
			JOIN Cajas02..CmoDat010 C ON C.OP = B.Folio_OP
			LEFT JOIN Cajas02..CmoCat044 D ON A.Proceso = D.Clave AND A.status = 0
			LEFT JOIN Cajas02..CmoDat088 E ON B.OP = E.OP
			WHERE B.OP = @OP;

			--@Programado, @Existencia, @Producido, @Variacion
			SELECT TOP 1 @Programado = SUM(ISNULL(Cantidad, 0)) FROM Cajas02..CmoDat020 WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Estatus <> 'C';
			
			SELECT TOP 1 @Existencia = SUM(ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) 
			FROM Cajas02..CmoTjDat002 A
			INNER JOIN Cajas02..CmoTjCat001 B ON A.Almacen = B.Cod
			WHERE B.Inventario = 1 AND B.TipoAlmacen = 'PT' AND A.Op = @OP AND (B.Cod < '050' OR B.Cod = '052');

			SELECT TOP 1 @Producido = SUM(ISNULL(A.Cantidad, 0)) 
			FROM Cajas02..CmoDat021 A 
			JOIN Cajas02..CmoDat020 B ON A.OP = B.OP AND B.Programa = A.Programa
			WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

			SELECT TOP 1 @Variacion = SUM(ISNULL(A.VARIACION, 0)) 
			FROM Cajas02..CmoDat008 A 
			JOIN Cajas02..CmoDat010 B ON A.Pedido = B.PedidoInt 
			WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);

			-- VALIDAR PROCESO
			IF EXISTS(SELECT 1 FROM @Resultado)
			BEGIN
				SELECT TOP 1 @Proceso = RTRIM(ISNULL(Proceso, '')) 
					, @Articulo = ClaveArticulo, @CveProceso = Proceso
				FROM @Resultado;

				SELECT TOP 1 @CveMaquina = B.[Clave Maquina]
				FROM Cajas02..CmoCat044 A
				JOIN Cajas02..CmoCat011 B ON A.M1 = B.Tproceso
				WHERE A.Clave = @Proceso;

				IF @ClaveMaquina = @CveMaquina 
				BEGIN
					SELECT @ValidaProceso = 1;
				END

				---- Clave Preparación para buscar proceso
				--SELECT TOP 1 @ClavePreparacion = ClavePreparacion
				--FROM @Resultado;

				---- Datos para cálcular duración aprox. de la corrida.
				--SELECT TOP 1 @ClavePreparacion = @ClavePreparacion + ' -- ' + B.Descripcion, @ProduccionHora = A.[Produccion Hora]
				--FROM Cajas02..CmoDat018 A
				--JOIN Cajas02..CmoCat010 B ON A.[Clave Proceso] = B.[Clave Proceso] AND A.[Tipo Maquina] = B.[Tipo Maquina]
				--WHERE A.[Clave Proceso] = @ClavePreparacion;

				INSERT INTO @ResOpc10 (Descripcion, TProceso)
				EXEC dbo.FCAPROG017MWSPC3 @Opcion = 10, @ZonaERP = @ZonaERP, @ClaveProceso = @CveProceso;

				SELECT TOP 1 @tProceso = TProceso FROM @ResOpc10;

				IF EXISTS (
					SELECT 1 FROM Cajas02..CmoDat213 
					WHERE ClaveArticulo = @Articulo AND CveRutaProceso = @CveProceso AND CveProceso = @tProceso AND Estatus = 0
				)
				BEGIN
					SELECT DISTINCT @PiezasXHoja = PiezasXhoja FROM Cajas02..CmoTjCat004 A WHERE A.[clave articulo] = @Articulo
				END
			END

			-- OBTIENE LOS DATOS DEL CLIENTE PARA ESA OP Y LOS MUESTRA EN PANTALLA
			SELECT @NoProducir = A.NoProducir, @ClaveCliente = A.[Clave Cliente]
				, @Status = A.Status, @Nombre = B.Nombre
			FROM Cajas02..CmoDat010 A
			JOIN Cajas02..CmoTjCat005 B ON A.[Clave Cliente] = B.[Codigo]
			WHERE A.OP = @pOP;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @Resultado (
				OP, UnionPegada, Industria, ClaveArticulo, Flauta, PiezasXCorte, Cantidad, Descripcion, Proceso, Clave, Ruta
				, PiezasXHoja, AreaUnitaria, LargoHoja, AnchoHoja
				, PrimerColor, SegundoColor, TercerColor, CuartoColor, Suaje, Dado
				, ClavePreparacion, Resistencia, FechaEntrega
				, AutAgente, Devuelto, MaquinaEstablecida, LiberadoCostos, LargoDesarrollo, AnchoDesarrollo
				, CantidadSol, CantidadTras, Autorizado, Eproceso, MVT, ConScore
				, CajaNueva, Modificacion, Comentarios, RetrabajoOP
			)
			SELECT B.OP, ISNULL(D.UnionPegada, 0), AA.Industria, A.[Clave Articulo], A.Flauta, A.PiezasXCorte, B.Cantidad, A.Descripcion, A.Proceso, RTRIM(D.Clave) AS CLave
				, RTRIM(D.Descripcion) AS Ruta, A.PiezasXHoja, B.[Area unitaria], ISNULL(A.[largo hoja], 0) AS LargoHoja, ISNULL(A.[ancho hoja], 0) AS AnchoHoja
				, A.[1er Color], A.[2do Color], A.[3er Color], A.[4to Color], A.Suaje, A.Dado
				, CASE WHEN B.MVT = 1 THEN 'MVT' ELSE A.[Clave Preparacion] END AS ClavePreparacion, B.Resistencia, C.[Fecha Entrega]
				, C.[Aut Agente], B.Devuelto, ISNULL(A.[Maquina Establecida], ''), B.[Liberado Costos], B.[Largo desarrollo], B.[Ancho Desarrollo]
				, ISNULL(E.CantidadSol, 0) AS CantidadSol, ISNULL(E.CantidadTras, 0) AS CantidadTras, ISNULL(E.Autorizado, 0), ISNULL(A.Eproceso, ''), B.MVT, A.ConScore
				, B.[CajaNueva], B.Modificacion, B.Comentarios, B.RetrabajoOP
			FROM Cajas05..CmoDat011 B
			JOIN Cajas05..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
			JOIN Cajas05..CmoCat013 AA ON A.SubCodigo = AA.SubCodigo
			JOIN Cajas05..CmoDat010 C ON C.OP = B.Folio_OP
			LEFT JOIN Cajas05..CmoCat044 D ON A.Proceso = D.Clave AND A.status = 0
			LEFT JOIN Cajas05..CmoDat088 E ON B.OP = E.OP
			WHERE B.OP = @OP;

			--@Programado, @Existencia, @Producido, @Variacion
			SELECT TOP 1 @Programado = SUM(ISNULL(Cantidad, 0)) FROM Cajas05..CmoDat020 WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Estatus <> 'C';
			
			SELECT TOP 1 @Existencia = SUM(ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) 
			FROM Cajas05..CmoTjDat002 A
			INNER JOIN Cajas05..CmoTjCat001 B ON A.Almacen = B.Cod
			WHERE B.Inventario = 1 AND B.TipoAlmacen = 'PT' AND A.Op = @OP AND (B.Cod < '050' OR B.Cod = '052');

			SELECT TOP 1 @Producido = SUM(ISNULL(A.Cantidad, 0)) 
			FROM Cajas05..CmoDat021 A 
			JOIN Cajas05..CmoDat020 B ON A.OP = B.OP AND B.Programa = A.Programa
			WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

			SELECT TOP 1 @Variacion = SUM(ISNULL(A.VARIACION, 0)) 
			FROM Cajas05..CmoDat008 A 
			JOIN Cajas05..CmoDat010 B ON A.Pedido = B.PedidoInt 
			WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);

			-- VALIDAR PROCESO
			IF EXISTS(SELECT 1 FROM @Resultado)
			BEGIN
				SELECT TOP 1 @Proceso = RTRIM(ISNULL(Proceso, '')) 
					, @Articulo = ClaveArticulo, @CveProceso = Proceso
				FROM @Resultado;

				SELECT TOP 1 @CveMaquina = B.[Clave Maquina]
				FROM Cajas05..CmoCat044 A
				JOIN Cajas05..CmoCat011 B ON A.M1 = B.Tproceso
				WHERE A.Clave = @Proceso;

				IF @ClaveMaquina = @CveMaquina 
				BEGIN
					SELECT @ValidaProceso = 1;
				END

				---- Clave Preparación para buscar proceso
				--SELECT TOP 1 @ClavePreparacion = ClavePreparacion
				--FROM @Resultado;

				---- Datos para cálcular duración aprox. de la corrida.
				--SELECT TOP 1 @ClavePreparacion = @ClavePreparacion + ' -- ' + B.Descripcion, @ProduccionHora = A.[Produccion Hora]
				--FROM Cajas05..CmoDat018 A
				--JOIN Cajas05..CmoCat010 B ON A.[Clave Proceso] = B.[Clave Proceso] AND A.[Tipo Maquina] = B.[Tipo Maquina]
				--WHERE A.[Clave Proceso] = @ClavePreparacion;

				INSERT INTO @ResOpc10 (Descripcion, TProceso)
				EXEC dbo.FCAPROG017MWSPC3 @Opcion = 10, @ZonaERP = @ZonaERP, @ClaveProceso = @CveProceso;

				SELECT TOP 1 @tProceso = TProceso FROM @ResOpc10;

				IF EXISTS (
					SELECT 1 FROM Cajas05..CmoDat213 
					WHERE ClaveArticulo = @Articulo AND CveRutaProceso = @CveProceso AND CveProceso = @tProceso AND Estatus = 0
				)
				BEGIN
					SELECT DISTINCT @PiezasXHoja = PiezasXhoja FROM Cajas05..CmoTjCat004 A WHERE A.[clave articulo] = @Articulo
				END
			END

			-- OBTIENE LOS DATOS DEL CLIENTE PARA ESA OP Y LOS MUESTRA EN PANTALLA
			SELECT @NoProducir = A.NoProducir, @ClaveCliente = A.[Clave Cliente]
				, @Status = A.Status, @Nombre = B.Nombre
			FROM Cajas05..CmoDat010 A
			JOIN Cajas05..CmoTjCat005 B ON A.[Clave Cliente] = B.[Codigo]
			WHERE A.OP = @pOP;
		END

		-- ACTUALIZAR DATOS DE CLIENTE
		UPDATE @Resultado SET 
			NoProducir = ISNULL(@NoProducir, 0),
			ClaveCliente = ISNULL(@ClaveCliente, ''),
			NombreCliente = ISNULL(@Nombre, ''),
			Status = ISNULL(@Status, '')
		WHERE OP = @OP;

		IF NOT EXISTS(SELECT 1 FROM @Resultado)
		BEGIN
			SELECT @Salida = 1;
			SELECT 'info' AS TypeMessage, 'OP INEXISTENTE O NO AUTORIZADA...' AS Message;
			SELECT '' AS OP;
		END ELSE
		BEGIN
			-- PROCESO PRODUCTIVO. VALIDA QUE TENGA PROCESO DEFINIDO.
			IF (SELECT TOP 1 ISNULL(Proceso, '') FROM @Resultado) = ''
			BEGIN
				SELECT @Salida = 1;
				SELECT 'info' AS TypeMessage, 'Favor de dar de alta la combinación estándar de papel y la ruta de proceso del artículo.' AS Message;
				SELECT '' AS OP;
			END
			-- PARA PODER PROGRAMAR SE DEBE AUTORIZAR PREVIAMENTE POR EL REPRESENTANTE DE VENTAS
			-- ESTO ES PARA QUE LOS DATOS SEAN VERIFICADOS ANTES DE ENTRAR A PROGRAMACIÓN
			IF (SELECT TOP 1 AutAgente FROM @Resultado) = 0
			BEGIN
				SELECT @Salida = 1;
				SELECT 'info' AS TypeMessage, 'OP NO AUTORIZADA POR REPRESENTANTE...' AS Message;
				SELECT '' AS OP;
			END
			IF (SELECT TOP 1 LiberadoCostos FROM @Resultado) = 1
			BEGIN
				SELECT @Salida = 1;
				SELECT 'info' AS TypeMessage, 'OP LIBERADA PARA COSTOS... Programación Inválida.' AS Message;
				SELECT '' AS OP;
			END
			IF (SELECT TOP 1 CantidadSol FROM @Resultado) > 0
			BEGIN
				IF (SELECT TOP 1 Autorizado FROM @Resultado) = 0
				BEGIN
					SELECT @Salida = 1;
					SELECT 'info' AS TypeMessage, 'OP marcada para transferencia de Excedentes... No Autorizada.' AS Message;
					SELECT '' AS OP;
				END
			END
		END

		IF ISNULL(@Salida, 0) = 0
		BEGIN
			SELECT 'success' AS TypeMessage, 'OK' AS Message;
			SELECT RTRIM(OP) AS Op
				, RTRIM(Suaje) AS Suaje, FORMAT(AreaUnitaria, '#,##0.0000', 'EN-US') AS AreaUnitaria, FORMAT(LargoHoja, '#,##0.0', 'EN-US') AS LargoLamina, FORMAT(AnchoHoja, '#,##0.0', 'EN-US') AS AnchoLamina
				, FORMAT(ISNULL(PiezasXHoja, @PiezasXHoja), '#,##0', 'EN-US') AS PzasSuaje, FORMAT(LargoDesarrollo, '#,##0.0', 'EN-US') AS LargoDesarrollo, FORMAT(AnchoDesarrollo, '#,##0.0', 'EN-US') AS AnchoDesarrollo
				, RTRIM(ClaveArticulo) AS ClaveArticulo, RTRIM(Descripcion) AS NombreArticulo, RTRIM(Dado) AS Dado, FORMAT(FechaEntrega, 'dd/MM/yyyy') AS FechaEntrega
				-- Solicitado, Producido, Programado, Existencia y Variación
				, CASE WHEN ISNULL(Cantidad, 0) + ISNULL(Devuelto, 0) - ISNULL(CantidadTras, 0) = 0 
					THEN '0' 
					ELSE FORMAT(ISNULL(Cantidad, 0) + ISNULL(Devuelto, 0) - ISNULL(CantidadTras, 0), '#,##0', 'EN-US') 
				END AS Solicitado
				, FORMAT(ISNULL(@Producido, 0), '#,##0', 'EN-US') AS Producido, FORMAT(ISNULL(@Programado, 0), '#,##0', 'EN-US') AS Programado
				, FORMAT(ISNULL(@Existencia, 0), '#,##0', 'EN-US') AS Existencia, FORMAT(ISNULL(@Variacion, 0), '#,##0.00', 'EN-US') AS Variacion
				, RTRIM(Proceso) AS Proceso
				, RTRIM(PrimerColor) AS PrimerColor, RTRIM(SegundoColor) AS SegundoColor, RTRIM(TercerColor) AS TercerColor, RTRIM(CuartoColor) AS CuartoColor
				--, RTRIM(PrimerColor) + ' | ' + RTRIM(SegundoColor) + ' | ' + RTRIM(TercerColor) + ' | ' + RTRIM(CuartoColor) AS Colores
				, RTRIM(PrimerColor) 
					+ CASE WHEN RTRIM(SegundoColor) != '' THEN ' | ' + RTRIM(SegundoColor) ELSE '' END
					+ CASE WHEN RTRIM(TercerColor) != '' THEN ' | ' + RTRIM(TercerColor) ELSE '' END
					+ CASE WHEN RTRIM(CuartoColor) != '' THEN ' | ' + RTRIM(CuartoColor) ELSE '' END
				AS Colores
				, CASE WHEN RTRIM(ISNULL(Clave, '')) != '' AND RTRIM(ISNULL(Ruta, '')) != '' 
					THEN RTRIM(Clave) + '   ' + RTRIM(Ruta) + ', UnionPegada = ' + (CASE WHEN UnionPegada = 1 THEN 'SI' ELSE 'NO' END)
					ELSE ''
				END AS RutaProceso
				, RTRIM(ISNULL(@ClavePreparacion, ClavePreparacion)) AS ClavePreparacion, RTRIM(Industria) AS Industria, Mvt
				, @ValidaProceso AS ValidaProceso, CASE WHEN @ValidaProceso = 1 THEN 'SI' ELSE 'NO' END AS TxtValidaProceso
				, FORMAT(ISNULL(@ProduccionHora, 0), '#,##0', 'EN-US') AS ProduccionHora

				, RTRIM(Flauta) AS Flauta, UnionPegada, PiezasXCorte, Cantidad, AutAgente, Devuelto, LiberadoCostos, Autorizado, ConScore, CantidadSol, CantidadTras
				, RTRIM(Clave) AS Clave, RTRIM(Ruta) AS Ruta, RTRIM(Resistencia) AS Resistencia, RTRIM(MaquinaEstablecida) AS MaquinaEstablecida, RTRIM(Eproceso) AS Eproceso

				, NoProducir, ClaveCliente, NombreCliente, Status, MsjOp, MsjProducir
				, CajaNueva, Modificacion, Comentarios, RetrabajoOP
			FROM @Resultado
		END
	END
	-- LLENAR COMBO MODIFICA PROCESO (CAP009) y (CAP005)
	ELSE IF @Opcion = 9
	BEGIN
		;WITH Datos AS (
			SELECT A.[Clave Proceso] AS ClaveProceso, B.Descripcion, '01' AS ZonaERP
			FROM Cajas01..CmoDat018 A
			JOIN Cajas01..CMOCAT010 B ON (A.[Tipo Maquina] + A.[Clave Proceso]) = (B.[Tipo Maquina] + B.[Clave Proceso])
			WHERE B.Status = 0 AND A.Estatus = 0 AND A.[Clave Maquina] = ISNULL(@ClaveMaquina, A.[Clave Maquina])
			UNION
			SELECT A.[Clave Proceso] AS ClaveProceso, B.Descripcion, '02' AS ZonaERP
			FROM Cajas02..CmoDat018 A
			JOIN Cajas02..CMOCAT010 B ON (A.[Tipo Maquina] + A.[Clave Proceso]) = (B.[Tipo Maquina] + B.[Clave Proceso])
			WHERE B.Status = 0 AND A.Estatus = 0 AND A.[Clave Maquina] = ISNULL(@ClaveMaquina, A.[Clave Maquina])
			UNION
			SELECT A.[Clave Proceso] AS ClaveProceso, B.Descripcion, '05' AS ZonaERP
			FROM Cajas05..CmoDat018 A
			JOIN Cajas05..CMOCAT010 B ON (A.[Tipo Maquina] + A.[Clave Proceso]) = (B.[Tipo Maquina] + B.[Clave Proceso])
			WHERE B.Status = 0 AND A.Estatus = 0 AND A.[Clave Maquina] = ISNULL(@ClaveMaquina, A.[Clave Maquina])
		)
		SELECT '' AS ClaveProceso, '' AS Descripcion
		UNION
		SELECT RTRIM(ClaveProceso) AS ClaveProceso, RTRIM(Descripcion) AS Descripcion
		FROM Datos
		WHERE ZonaERP = ISNULL(@ZonaERP, ZonaERP)
			AND ClaveProceso NOT IN (CASE WHEN ISNULL(@MVT, 0) = 0 THEN '' ELSE 'MVT' END)
		ORDER BY ClaveProceso;
	END
	-- LLENAR COMBO PROCESO (CAP009)
	ELSE IF @Opcion = 10
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @M (M)
			SELECT M1 FROM Cajas01..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M1, '')) != '';
			INSERT INTO @M (M)
			SELECT M2 FROM Cajas01..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M2, '')) != '';
			INSERT INTO @M (M)
			SELECT M3 FROM Cajas01..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M3, '')) != '';
			INSERT INTO @M (M)
			SELECT M4 FROM Cajas01..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M4, '')) != '';
			INSERT INTO @M (M)
			SELECT M5 FROM Cajas01..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M5, '')) != '';

			SELECT RTRIM(Descripcion) AS Descripcion, RTRIM(TProceso) AS TProceso
			FROM Cajas01..CmoCat043 
			WHERE TProceso IN ( SELECT M FROM @M );
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @M (M)
			SELECT M1 FROM Cajas02..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M1, '')) != '';
			INSERT INTO @M (M)
			SELECT M2 FROM Cajas02..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M2, '')) != '';
			INSERT INTO @M (M)
			SELECT M3 FROM Cajas02..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M3, '')) != '';
			INSERT INTO @M (M)
			SELECT M4 FROM Cajas02..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M4, '')) != '';
			INSERT INTO @M (M)
			SELECT M5 FROM Cajas02..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M5, '')) != '';
			
			SELECT RTRIM(Descripcion) AS Descripcion, RTRIM(TProceso) AS TProceso
			FROM Cajas02..CmoCat043 
			WHERE TProceso IN ( SELECT M FROM @M );
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @M (M)
			SELECT M1 FROM Cajas05..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M1, '')) != '';
			INSERT INTO @M (M)
			SELECT M2 FROM Cajas05..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M2, '')) != '';
			INSERT INTO @M (M)
			SELECT M3 FROM Cajas05..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M3, '')) != '';
			INSERT INTO @M (M)
			SELECT M4 FROM Cajas05..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M4, '')) != '';
			INSERT INTO @M (M)
			SELECT M5 FROM Cajas05..CmoCat044 WHERE Clave = @ClaveProceso AND RTRIM(ISNULL(M5, '')) != '';
			
			SELECT RTRIM(Descripcion) AS Descripcion, RTRIM(TProceso) AS TProceso
			FROM Cajas05..CmoCat043 
			WHERE TProceso IN ( SELECT M FROM @M );
		END

	END
	-- LLENAR COMBO RUTA DE PROCESO (CAP009)
	ELSE IF @Opcion = 11
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT RTRIM(Clave) AS Clave, RTRIM(Descripcion) + ', UnionPegada = ' + CASE WHEN UnionPegada = 1 THEN 'SI' ELSE 'NO' END AS Descripcion
			FROM Cajas01..CmoCat044
			WHERE STATUS = 0;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT RTRIM(Clave) AS Clave, RTRIM(Descripcion) + ', UnionPegada = ' + CASE WHEN UnionPegada = 1 THEN 'SI' ELSE 'NO' END AS Descripcion
			FROM Cajas02..CmoCat044
			WHERE STATUS = 0;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT RTRIM(Clave) AS Clave, RTRIM(Descripcion) + ', UnionPegada = ' + CASE WHEN UnionPegada = 1 THEN 'SI' ELSE 'NO' END AS Descripcion
			FROM Cajas05..CmoCat044
			WHERE STATUS = 0;
		END
	END
	-- CALCULAR HORA 
	ELSE IF @Opcion = 12
	BEGIN
		-- @ClaveMaquina, @OP, @Cantidad, @PzasSuaje, @AreaUnitaria, @Proceso, @ClaveArticulo
		DECLARE @lOP VARCHAR(12), @lCantidad INT, @lTiempo VARCHAR(10), @lPzasSuaje INT, @lAreaUnit REAL, @lProceso VARCHAR(10), @lArticulo VARCHAR(12), @lEficiencia INT = 1
		DECLARE @wPiezasSuaje INT, @wVelStd INT = 1, @wTiempoStd INT = 1, @lProceso1 BIT = 0, @lArea REAL
			, @lAInicial REAL, @lAFinal REAL, @lHoras INT, @lMinutos INT;

		SELECT @lMaquina = RTRIM(@ClaveMaquina), @lOP = RTRIM(@OP), @lCantidad = @Cantidad, @lPzasSuaje = @PzasSuaje
			, @lAreaUnit = @AreaUnitaria, @lProceso = RTRIM(@Proceso), @lArticulo = RTRIM(@ClaveArticulo);

		SELECT @wPiezasSuaje = CASE WHEN ISNULL(@TipoMaquina, 0) = 0 THEN @lPzasSuaje ELSE 1 END;

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			-- Obtiene eficiencia de cuaquier maquina
			SELECT @lEficiencia = ISNULL(Eficiencia, 1) FROM Cajas01..CmoCat011 WHERE [Clave Maquina] = @lMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			-- Obtiene eficiencia de cuaquier maquina
			SELECT @lEficiencia = ISNULL(Eficiencia, 1) FROM Cajas02..CmoCat011 WHERE [Clave Maquina] = @lMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			-- Obtiene eficiencia de cuaquier maquina
			SELECT @lEficiencia = ISNULL(Eficiencia, 1) FROM Cajas05..CmoCat011 WHERE [Clave Maquina] = @lMaquina;
		END
			
		-- Obtiene area unitaria y piezas suaje
		IF ISNULL(@TipoMaquina, 0) = 0
		BEGIN
			IF ISNULL(@lProceso, '') = ''
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT @lProceso1 = A.Proceso1, @wPiezasSuaje = CASE WHEN ISNULL(@lPzasSuaje, 0) = 0 THEN A.[Piezas Corte] ELSE @wPiezasSuaje END
						, @lArea = ISNULL(B.[Area Unitaria], 0), @lEficiencia = D.Eficiencia, @wTiempoStd = C.[Tiempo Std]
					FROM Cajas01..CmoDat011 B
					JOIN Cajas01..CmoDat020 A ON A.OP = B.OP
					JOIN Cajas01..CmoDat018 C ON C.[Clave Proceso] = A.[Clave Proceso]
					JOIN Cajas01..CmoCat011 D ON D.[Clave Maquina] = C.[Clave Maquina]
					WHERE A.Programa = @lOP
						AND C.[Clave Maquina] = @lMaquina;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT @lProceso1 = A.Proceso1, @wPiezasSuaje = CASE WHEN ISNULL(@lPzasSuaje, 0) = 0 THEN A.[Piezas Corte] ELSE @wPiezasSuaje END
						, @lArea = ISNULL(B.[Area Unitaria], 0), @lEficiencia = D.Eficiencia, @wTiempoStd = C.[Tiempo Std]
					FROM Cajas02..CmoDat011 B
					JOIN Cajas02..CmoDat020 A ON A.OP = B.OP
					JOIN Cajas02..CmoDat018 C ON C.[Clave Proceso] = A.[Clave Proceso]
					JOIN Cajas02..CmoCat011 D ON D.[Clave Maquina] = C.[Clave Maquina]
					WHERE A.Programa = @lOP
						AND C.[Clave Maquina] = @lMaquina;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT @lProceso1 = A.Proceso1, @wPiezasSuaje = CASE WHEN ISNULL(@lPzasSuaje, 0) = 0 THEN A.[Piezas Corte] ELSE @wPiezasSuaje END
						, @lArea = ISNULL(B.[Area Unitaria], 0), @lEficiencia = D.Eficiencia, @wTiempoStd = C.[Tiempo Std]
					FROM Cajas05..CmoDat011 B
					JOIN Cajas05..CmoDat020 A ON A.OP = B.OP
					JOIN Cajas05..CmoDat018 C ON C.[Clave Proceso] = A.[Clave Proceso]
					JOIN Cajas05..CmoCat011 D ON D.[Clave Maquina] = C.[Clave Maquina]
					WHERE A.Programa = @lOP
						AND C.[Clave Maquina] = @lMaquina;
				END
			END ELSE
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT @lProceso1 = CASE WHEN @txtProceso1 = 'SI' THEN 1 ELSE 0 END;
					SELECT @lArea = ISNULL(@lAreaUnit, 0), @wPiezasSuaje = CASE WHEN ISNULL(@lPzasSuaje, 0) = 0 THEN 1 ELSE @wPiezasSuaje END
						, @lEficiencia = A.Eficiencia, @wTiempoStd = C.[Tiempo Std]
					FROM Cajas01..CmoDat018 C
					JOIN Cajas01..CmoCat011 A ON A.[Clave Maquina] = C.[Clave Maquina]
					WHERE C.[Clave Maquina] = @lMaquina AND C.[Clave Proceso] = @lProceso;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT @lProceso1 = CASE WHEN @txtProceso1 = 'SI' THEN 1 ELSE 0 END;
					SELECT @lArea = ISNULL(@lAreaUnit, 0), @wPiezasSuaje = CASE WHEN ISNULL(@lPzasSuaje, 0) = 0 THEN 1 ELSE @wPiezasSuaje END
						, @lEficiencia = A.Eficiencia, @wTiempoStd = C.[Tiempo Std]
					FROM Cajas02..CmoDat018 C
					JOIN Cajas02..CmoCat011 A ON A.[Clave Maquina] = C.[Clave Maquina]
					WHERE C.[Clave Maquina] = @lMaquina AND C.[Clave Proceso] = @lProceso;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT @lProceso1 = CASE WHEN @txtProceso1 = 'SI' THEN 1 ELSE 0 END;
					SELECT @lArea = ISNULL(@lAreaUnit, 0), @wPiezasSuaje = CASE WHEN ISNULL(@lPzasSuaje, 0) = 0 THEN 1 ELSE @wPiezasSuaje END
						, @lEficiencia = A.Eficiencia, @wTiempoStd = C.[Tiempo Std]
					FROM Cajas05..CmoDat018 C
					JOIN Cajas05..CmoCat011 A ON A.[Clave Maquina] = C.[Clave Maquina]
					WHERE C.[Clave Maquina] = @lMaquina AND C.[Clave Proceso] = @lProceso;
				END
			END
		END ELSE
		BEGIN
			SELECT @wTiempoStd = 0;
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				SELECT @wPiezasSuaje = CASE WHEN @lPzasSuaje = 0 THEN A.PiezasXHoja ELSE @wPiezasSuaje END, @lArea = B.[Area unitaria]
				FROM Cajas01..CmoDat011 B
				JOIN Cajas01..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
				WHERE B.[Clave Articulo] = @lArticulo;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				SELECT @wPiezasSuaje = CASE WHEN @lPzasSuaje = 0 THEN A.PiezasXHoja ELSE @wPiezasSuaje END, @lArea = B.[Area unitaria]
				FROM Cajas02..CmoDat011 B
				JOIN Cajas02..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
				WHERE B.[Clave Articulo] = @lArticulo;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				SELECT @wPiezasSuaje = CASE WHEN @lPzasSuaje = 0 THEN A.PiezasXHoja ELSE @wPiezasSuaje END, @lArea = B.[Area unitaria]
				FROM Cajas05..CmoDat011 B
				JOIN Cajas05..CmoTjCat004 A ON A.[Clave Articulo] = B.[Clave Articulo]
				WHERE B.[Clave Articulo] = @lArticulo;
			END
		END

		SELECT @wVelStd = 0;

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			-- OBTIENE VELOCIDAD ESTANDAR DE OPERACIÓN
			SELECT TOP 1 @lAInicial = ISNULL([Area inicial], 0), @lAFinal = ISNULL([Area Final], 0), @wVelStd = ISNULL([Velocidad Std], 0)
			FROM Cajas01..CmoDat026
			WHERE [CLave Maquina] = @lMaquina
				AND Estatus = 0
				AND ISNULL(@lArea, 0) >= ISNULL(@lAInicial, 0)
				AND ISNULL(@lArea, 0) <= ISNULL(@lAFinal, 0);

			-- VALIDA QUE EXISTA EN LA TABLA CMODAT067, SI ENCUENTRA EL ARTICULO ACTIVO EN ESA TABLA, ACTUALIZA EL VALOR QUE TOMA LA VELOCIDAD STD @wVelStd
			SELECT TOP 1 --Proceso1, ClaveMaquina, VelocidadStd
				@wVelStd = CASE WHEN ISNULL(VelocidadStd, 0) > 0 THEN 
								CASE WHEN ISNULL(Proceso1, 0) = 1 AND ISNULL(@lProceso1, 0) = 1 THEN ISNULL(VelocidadStd, 0)
									WHEN ISNULL(Proceso1, 0) = 0 THEN ISNULL(VelocidadStd, 0)
								END
							END
			FROM Cajas01..CmoDat079
			WHERE ClaveArticulo = @ClaveArticulo
				AND Estatus = 0
				AND ClaveMaquina = @ClaveMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			-- OBTIENE VELOCIDAD ESTANDAR DE OPERACIÓN
			SELECT TOP 1 @lAInicial = ISNULL([Area inicial], 0), @lAFinal = ISNULL([Area Final], 0), @wVelStd = ISNULL([Velocidad Std], 0)
			FROM Cajas02..CmoDat026
			WHERE [CLave Maquina] = @lMaquina
				AND Estatus = 0
				AND ISNULL(@lArea, 0) >= ISNULL(@lAInicial, 0)
				AND ISNULL(@lArea, 0) <= ISNULL(@lAFinal, 0);

			-- VALIDA QUE EXISTA EN LA TABLA CMODAT067, SI ENCUENTRA EL ARTICULO ACTIVO EN ESA TABLA, ACTUALIZA EL VALOR QUE TOMA LA VELOCIDAD STD @wVelStd
			SELECT TOP 1 --Proceso1, ClaveMaquina, VelocidadStd
				@wVelStd = CASE WHEN ISNULL(VelocidadStd, 0) > 0 THEN 
								CASE WHEN ISNULL(Proceso1, 0) = 1 AND ISNULL(@lProceso1, 0) = 1 THEN ISNULL(VelocidadStd, 0)
									WHEN ISNULL(Proceso1, 0) = 0 THEN ISNULL(VelocidadStd, 0)
								END
							END,
				@wTiempoStd = CASE WHEN ISNULL(SetUp, 0) > 0 THEN ISNULL(SetUp, 0) ELSE @wTiempoStd END
			FROM Cajas01..CmoDat079
			WHERE ClaveArticulo = @ClaveArticulo
				AND Estatus = 0
				AND ClaveMaquina = @ClaveMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			-- OBTIENE VELOCIDAD ESTANDAR DE OPERACIÓN
			SELECT TOP 1 @lAInicial = ISNULL([Area inicial], 0), @lAFinal = ISNULL([Area Final], 0), @wVelStd = ISNULL([Velocidad Std], 0)
			FROM Cajas05..CmoDat026
			WHERE [CLave Maquina] = @lMaquina
				AND Estatus = 0
				AND ISNULL(@lArea, 0) >= ISNULL(@lAInicial, 0)
				AND ISNULL(@lArea, 0) <= ISNULL(@lAFinal, 0);

			-- VALIDA QUE EXISTA EN LA TABLA CMODAT067, SI ENCUENTRA EL ARTICULO ACTIVO EN ESA TABLA, ACTUALIZA EL VALOR QUE TOMA LA VELOCIDAD STD @wVelStd
			SELECT TOP 1 --Proceso1, ClaveMaquina, VelocidadStd
				@wVelStd = CASE WHEN ISNULL(VelocidadStd, 0) > 0 THEN 
								CASE WHEN ISNULL(Proceso1, 0) = 1 AND ISNULL(@lProceso1, 0) = 1 THEN ISNULL(VelocidadStd, 0)
									WHEN ISNULL(Proceso1, 0) = 0 THEN ISNULL(VelocidadStd, 0)
								END
							END
			FROM Cajas01..CmoDat079
			WHERE ClaveArticulo = @ClaveArticulo
				AND Estatus = 0
				AND ClaveMaquina = @ClaveMaquina;
		END

		SELECT @lDuracion = (
			(
				@lCantidad / (CASE WHEN ISNULL(@wVelStd, 0) = 0 THEN 1 ELSE @wVelStd END) 
			) / (CASE WHEN ISNULL(@lEficiencia, 0) = 0 THEN 1 ELSE @lEficiencia END)
		) / (CASE WHEN ISNULL(@wPiezasSuaje, 0) = 0 THEN 1 ELSE @wPiezasSuaje END);

		-- FACTOR ADICIONAL AL ESTÁNDAR PARA COMPENSAR LA DURACIÓN DE UNA CORRIDA
		DECLARE @DblFactor DECIMAL(18, 2);
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			 SELECT @DblFactor = dbo.FCAPROGFUN004 (@ZonaERP, @lCantidad)
			SELECT @lDuracion = (@lDuracion + @wTiempoStd) * @DblFactor;
		END ELSE
		BEGIN
			SELECT @lDuracion = (@lDuracion + @wTiempoStd);
		END

		SELECT @lDuracion = CASE WHEN ISNULL(@lDuracion, 0) > 1440 THEN 1439 ELSE @lDuracion END;
		SELECT @lHoras = CONVERT(INT, (@lDuracion / 60));
		SELECT @lMinutos = @lDuracion - (@lHoras * 60);
		SELECT @lTiempo = FORMAT(@lHoras, '00') + ':' + FORMAT(@lMinutos, '00');

		SELECT ISNULL(@lDuracion, 0) AS Duracion	-- Variable devuelta CalculaHoras
			, ISNULL(@lHoras, 0) AS Horas			-- 
			, ISNULL(@lMinutos, 0) AS Minutos		-- 
			, ISNULL(@lEficiencia, 0) AS Eficiencia	-- Referencia devuelta CalculaHoras
			, ISNULL(@lTiempo, 0) AS Tiempo			-- Referencia devuelta CalculaHoras
			, ISNULL(@wVelStd, 0) AS wVelStd		-- Velocidad Std
	END
	-- OBTENER FECHA Y TURNO DE TRABAJO
	ELSE IF @Opcion = 13
	BEGIN
		DECLARE @pFecha VARCHAR(10), @pHora VARCHAR(8), @pTurno INT;

		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;

		SELECT TOP 1 @FechaSis = ISNULL(RTRIM(Fecha), FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;
		SELECT @pFecha = LEFT(@FechaSis, 10)
			, @pHora = RIGHT(RTRIM(@FechaSis), 8);

		SELECT 
			@pTurno = CASE WHEN @pHora >= '07:00:00' AND @pHora < '15:00:00' 
				THEN 1
				ELSE
					CASE WHEN @ZonaERP = '01' OR @ZonaERP = '05' 
						THEN 
							CASE WHEN @pHora >= '15:00:00' AND @pHora < '23:00:00' 
								THEN 2
								ELSE 3
							END
						ELSE
							CASE WHEN @pHora >= '15:00:00' AND @pHora < '23:30:00' 
								THEN 2
								ELSE 3
							END
					END
			END,
			@pFecha = CASE WHEN @pHora >= '00:00:00' AND @pHora < '07:00:00' 
				THEN FORMAT(DATEADD(DAY, -1, CONVERT(DATE, @pFecha)), 'yyyy-MM-dd')
				ELSE @pFecha
			END

		SELECT @pFecha AS Fecha, @pHora AS Hora, @pTurno AS Turno
	END
	-- VALIDAR ARTICULO
	ELSE IF @Opcion = 14
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			IF NOT EXISTS( SELECT 1 FROM Cajas01..CmoDat209 WHERE ClaveArticulo = @ClaveArticulo AND ClaveMaquina = @ClaveMaquina AND Estatus = 0 AND Activo = 0 AND MaquinaOrden = 1 ) 
			BEGIN
				SELECT CONVERT(BIT, 1) AS ValidaArt;
			END ELSE
			BEGIN
				SELECT CONVERT(BIT, 0) AS ValidaArt;
			END
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			IF NOT EXISTS( SELECT 1 FROM Cajas02..CmoDat209 WHERE ClaveArticulo = @ClaveArticulo AND ClaveMaquina = @ClaveMaquina AND Estatus = 0 AND Activo = 0 AND MaquinaOrden = 1 ) 
			BEGIN
				SELECT CONVERT(BIT, 1) AS ValidaArt;
			END ELSE
			BEGIN
				SELECT CONVERT(BIT, 0) AS ValidaArt;
			END
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			IF NOT EXISTS( SELECT 1 FROM Cajas05..CmoDat209 WHERE ClaveArticulo = @ClaveArticulo AND ClaveMaquina = @ClaveMaquina AND Estatus = 0 AND Activo = 0 AND MaquinaOrden = 1 ) 
			BEGIN
				SELECT CONVERT(BIT, 1) AS ValidaArt;
			END ELSE
			BEGIN
				SELECT CONVERT(BIT, 0) AS ValidaArt;
			END
		END
	END
	-- VALIDAR OP PROGRAMADA EN LA MISMA MAQUINA Y DÍA (CAP005 BuscaOP PARTE 1)
	ELSE IF @Opcion = 15
	BEGIN
		DECLARE @tmpFecha DATE
		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;

		SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), 'yyyyMMdd')) FROM @tmp;
		SELECT @tmpFecha = CONVERT(DATE, @FechaSis);

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT FORMAT([Fecha Programa], 'dd/MM/yyyy') + ' a las ' + LEFT([Hora Programa], 5) AS Message
			FROM Cajas01..CmoDat020
			WHERE OP = @OP --'I7593-01-T'
				AND [Clave Maquina] = @ClaveMaquina -- 'FLEX3'
				AND Estatus <> 'C'
				AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @tmpFecha);
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT FORMAT([Fecha Programa], 'dd/MM/yyyy') + ' a las ' + LEFT([Hora Programa], 5) AS Message
			FROM Cajas02..CmoDat020
			WHERE OP = @OP --'I7593-01-T'
				AND [Clave Maquina] = @ClaveMaquina -- 'FLEX3'
				AND Estatus <> 'C'
				AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @tmpFecha);
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT FORMAT([Fecha Programa], 'dd/MM/yyyy') + ' a las ' + LEFT([Hora Programa], 5) AS Message
			FROM Cajas05..CmoDat020
			WHERE OP = @OP --'I7593-01-T'
				AND [Clave Maquina] = @ClaveMaquina -- 'FLEX3'
				AND Estatus <> 'C'
				AND CONVERT(DATE, [Fecha Programa]) = CONVERT(DATE, @tmpFecha);
		END
	END
	-- OBTENER JUSTIFICACIONES (CAP005)
	ELSE IF @Opcion = 16
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01' OR ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT FCPRJUCAPRId AS Id, FCPRJUCAPRDescripcion AS Descripcion FROM gxCajas01..FCPG011CT WHERE FCPRJUCAPREstatus = 0;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT FCPRJUCAPRId AS Id, FCPRJUCAPRDescripcion AS Descripcion FROM gxCajas01..FCPG011CT WHERE FCPRJUCAPREstatus = 0;
		END
	END
	-- VALIDAR TODO (ACEPTAR CAMBIO MAQUINA) CAP005 (PARTE 1)
	ELSE IF @Opcion = 17
	BEGIN
		-- @ZonaERP, @UsuarioERP, @TipoMaquina, @ClaveMaquina, @ClaveProceso, @Justificacion, @Cap005TD_001

		WHILE EXISTS(SELECT 1 FROM @tmpCap005TD_001)
		BEGIN
			SELECT TOP 1 @IDCap005TD_001 = ID, @tPrograma = Programa, @tOp = Op, @tCantidad = Cantidad, @tMaqOrigen = MaqOrigen
				, @tCveProceso = CveProceso, @tUltimoProceso = UltimoProceso, @tArticulo = Articulo
				, @tCantidadIni = CASE WHEN UltimoProceso = 1 THEN Cantidad ELSE 0 END
			FROM @tmpCap005TD_001;

			IF (SELECT COUNT(*) FROM @tmpCap005TD_001) = 1
			BEGIN
				IF ISNULL(@tUltimoProceso, 0) = 1 -- Ultimo Proceso
				BEGIN
					IF ISNULL(@tCantidad, 0) <= 0
					BEGIN
						INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
						SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo
							, 'No puede traspasar una OP con cantidad igual a 0, favor de revisar';
					END
					IF ISNULL(@tCantidad, 0) > ISNULL(@tCantidadIni, 0)
					BEGIN
						INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
						SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo
							, 'La cantidad a traspasar no puede ser mayor a la cantidad inicial de la OP, favor de revisar';
					END
				END
			END

			-- SI NO ES ADMINISTRADOR DE PROGRAMACIÓN OBLIGA A CAPTURAR JUSTIFICACIÓN DE CAMBIOS EN PROGRAMACIÓN.
			DECLARE @msjPermisoAdmin VARCHAR(100) = 'Para guardar es necesario seleccionar la justificación de cambios en programación.';
			IF RTRIM(@Justificacion) = ''
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					IF NOT EXISTS(SELECT 1 FROM Cajas01..CmoCat113 WHERE IdEmpleadoProgramacion = @UsuarioERP AND Estatus = 0)
					BEGIN
						INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
						SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo, @msjPermisoAdmin;
					END
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					IF NOT EXISTS(SELECT 1 FROM Cajas02..CmoCat113 WHERE IdEmpleadoProgramacion = @UsuarioERP AND Estatus = 0)
					BEGIN
						INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
						SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo, @msjPermisoAdmin;
					END
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					IF NOT EXISTS(SELECT 1 FROM Cajas05..CmoCat113 WHERE IdEmpleadoProgramacion = @UsuarioERP AND Estatus = 0)
					BEGIN
						INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
						SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo, @msjPermisoAdmin;
					END
				END
			END

			-- 
			DECLARE @msjMaq VARCHAR(500) = 'Clave de Proceso ' + @ClaveProceso + ' no Disponible de la Op para Máquina ' + @ClaveMaquina + ', Verifique el Proceso de la OP: ' + @tOp;
			IF ISNULL(@ZonaERP, '') = '01' AND NOT EXISTS(SELECT 1 FROM Cajas01..CmoDat018 WHERE [Clave Proceso] = @ClaveProceso AND [Clave Maquina] = @ClaveMaquina)
			BEGIN
				INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
				SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo, @msjMaq;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02' AND NOT EXISTS(SELECT 1 FROM Cajas02..CmoDat018 WHERE [Clave Proceso] = @ClaveProceso AND [Clave Maquina] = @ClaveMaquina)
			BEGIN
				INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
				SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo, @msjMaq;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05' AND NOT EXISTS(SELECT 1 FROM Cajas05..CmoDat018 WHERE [Clave Proceso] = @ClaveProceso AND [Clave Maquina] = @ClaveMaquina)
			BEGIN
				INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
				SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo, @msjMaq;
			END

			-- VALIDA QUE LOS ANCHOS DEL CARTON SE ENCUENTRE ENTRE LOS PERMITIDOS PARA EL TIPO DE MAQUINA
			
			IF ISNULL(@TipoMaquina, 0) = 0 -- IMPRESORAS
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01' AND EXISTS(SELECT 1 FROM Cajas01..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina)
				BEGIN
					SELECT TOP 1 @AnchoMax = ISNULL(AnchoMax, 0), @AnchoMin = ISNULL(AnchoMin, 0), @LargoMax = ISNULL(LargoMax, 0), @LargoMin = ISNULL(LargoMin, 0)
					FROM Cajas01..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02' AND EXISTS(SELECT 1 FROM Cajas02..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina)
				BEGIN
					SELECT TOP 1 @AnchoMax = ISNULL(AnchoMax, 0), @AnchoMin = ISNULL(AnchoMin, 0), @LargoMax = ISNULL(LargoMax, 0), @LargoMin = ISNULL(LargoMin, 0)
					FROM Cajas01..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05' AND EXISTS(SELECT 1 FROM Cajas05..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina)
				BEGIN
					SELECT TOP 1 @AnchoMax = ISNULL(AnchoMax, 0), @AnchoMin = ISNULL(AnchoMin, 0), @LargoMax = ISNULL(LargoMax, 0), @LargoMin = ISNULL(LargoMin, 0)
					FROM Cajas01..CmoCat011 WHERE [Clave Maquina] = @ClaveMaquina;
				END ELSE 
				BEGIN
					SELECT @Existe = 0;
					INSERT INTO @errCap005TD_001 (Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido)
					SELECT @tPrograma, @tOp, @tCantidad, @tMaqOrigen, @tCveProceso, @tUltimoProceso, @tArticulo, 'No existen Dimensiones de Máquina: ' + @ClaveMaquina;
				END

				--IF ISNULL(@Existe, 0) = 1
				--BEGIN
				--	IF ISNULL(@tProceso, '') = 'PEG'
				--	BEGIN
				--		SELECT @lLargo = 
				--	END
				--END
			END

			DELETE FROM @tmpCap005TD_001 WHERE ID = @IDCap005TD_001;
		END

		SELECT Programa, Op, Cantidad, MaqOrigen, CveProceso, UltimoProceso, Articulo, MensajeInvalido
		FROM @errCap005TD_001;

		SELECT ISNULL(@AnchoMax, -1) AS AnchoMax, ISNULL(@AnchoMin, -1) AS AnchoMin
			, ISNULL(@LargoMax, -1) AS LargoMax, ISNULL(@LargoMin, -1) AS LargoMin;
	END
	-- DATOS DE PRODUCCIÓN PARA LA OP (CAP005 BuscaOP PARTE 2)
	ELSE IF @Opcion = 18
	BEGIN
		DECLARE @Res18 AS TABLE (
			ZonaERP VARCHAR(2), ClaveArticulo VARCHAR(9), Flauta VARCHAR(3), PiezasXcorte DECIMAL(2, 0), Cantidad INT, Descripcion VARCHAR(100), ConScore BIT,
			PiezasXhoja DECIMAL(4, 1), AreaUnitaria REAL, LargoHoja REAL, AnchoHoja REAL, PrimerColor VARCHAR(13), SegundoColor VARCHAR(13),
			TercerColor VARCHAR(13), CuartoColor VARCHAR(13), Suaje VARCHAR(8), Dado VARCHAR(20), ClaveProceso VARCHAR(10), Resistencia VARCHAR(10),
			PzasHojaProg DECIMAL(4, 2), AutAgente BIT, Devuelto	INT, MaquinaEstablecida VARCHAR(5), LiberadoCostos BIT, LargoDesarrollo REAL, AnchoDesarrollo REAL,
			Programado INT, Existencia INT, Producido INT, Variacion INT
		);
		
		IF ISNULL(@ZonaERP, '') = '01' AND EXISTS(
			SELECT 1 FROM Cajas01..CmoDat020 D 
			JOIN Cajas01..CmoDat011 B ON B.Op = D.Op 
			JOIN Cajas01..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
			JOIN Cajas01..CmoDat010 C ON LEFT(C.op,5) = LEFT(B.op,5) 
			WHERE D.OP = @OP AND Programa = @Programa
		)
		BEGIN
			INSERT INTO @Res18 (
				ZonaERP, ClaveArticulo, Flauta, PiezasXcorte, Cantidad, Descripcion , ConScore,
				PiezasXhoja, AreaUnitaria, LargoHoja, AnchoHoja, PrimerColor, SegundoColor,
				TercerColor, CuartoColor, Suaje, Dado, ClaveProceso, Resistencia, PzasHojaProg, 
				AutAgente, Devuelto, MaquinaEstablecida, LiberadoCostos, LargoDesarrollo, AnchoDesarrollo
			)
			SELECT '01', A.[Clave Articulo],A.Flauta,A.PiezasXcorte,B.Cantidad,A.descripcion, A.ConScore,
				A.PiezasXhoja,B.[Area unitaria],A.[Largo Hoja],A.[ancho hoja],A.[1er Color],A.[2do Color],
				A.[3er Color],A.[4to Color],A.Suaje,A.Dado,D.[clave proceso],B.Resistencia,D.[Piezas Corte] as PzasHojaProg,
				C.[aut agente],B.devuelto,A.[maquina establecida],B.[liberado costos],b.[Largo desarrollo],b.[Ancho desarrollo] 
			FROM Cajas01..CmoDat020 D 
			JOIN Cajas01..CmoDat011 B ON B.Op = D.Op 
			JOIN Cajas01..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
			JOIN Cajas01..CmoDat010 C ON LEFT(C.op,5) = LEFT(B.op,5) 
			WHERE D.OP = @OP AND Programa = @Programa;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02' AND EXISTS(
			SELECT 1 FROM Cajas02..CmoDat020 D 
			JOIN Cajas02..CmoDat011 B ON B.Op = D.Op 
			JOIN Cajas02..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
			JOIN Cajas02..CmoDat010 C ON LEFT(C.op,5) = LEFT(B.op,5) 
			WHERE D.OP = @OP AND Programa = @Programa
		)
		BEGIN
			INSERT INTO @Res18 (
				ZonaERP, ClaveArticulo, Flauta, PiezasXcorte, Cantidad, Descripcion , ConScore,
				PiezasXhoja, AreaUnitaria, LargoHoja, AnchoHoja, PrimerColor, SegundoColor,
				TercerColor, CuartoColor, Suaje, Dado, ClaveProceso, Resistencia, PzasHojaProg, 
				AutAgente, Devuelto, MaquinaEstablecida, LiberadoCostos, LargoDesarrollo, AnchoDesarrollo
			)
			SELECT '02', A.[Clave Articulo],A.Flauta,A.PiezasXcorte,B.Cantidad,A.descripcion, A.ConScore,
				A.PiezasXhoja,B.[Area unitaria],A.[Largo Hoja],A.[ancho hoja],A.[1er Color],A.[2do Color],
				A.[3er Color],A.[4to Color],A.Suaje,A.Dado,D.[clave proceso],B.Resistencia,D.[Piezas Corte] as PzasHojaProg,
				C.[aut agente],B.devuelto,A.[maquina establecida],B.[liberado costos],b.[Largo desarrollo],b.[Ancho desarrollo] 
			FROM Cajas02..CmoDat020 D 
			JOIN Cajas02..CmoDat011 B ON B.Op = D.Op 
			JOIN Cajas02..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
			JOIN Cajas02..CmoDat010 C ON LEFT(C.op,5) = LEFT(B.op,5) 
			WHERE D.OP = @OP AND Programa = @Programa;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05' AND EXISTS(
			SELECT 1 FROM Cajas05..CmoDat020 D 
			JOIN Cajas05..CmoDat011 B ON B.Op = D.Op 
			JOIN Cajas05..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
			JOIN Cajas05..CmoDat010 C ON LEFT(C.op,5) = LEFT(B.op,5) 
			WHERE D.OP = @OP AND Programa = @Programa
		)
		BEGIN
			INSERT INTO @Res18 (
				ZonaERP, ClaveArticulo, Flauta, PiezasXcorte, Cantidad, Descripcion , ConScore,
				PiezasXhoja, AreaUnitaria, LargoHoja, AnchoHoja, PrimerColor, SegundoColor,
				TercerColor, CuartoColor, Suaje, Dado, ClaveProceso, Resistencia, PzasHojaProg, 
				AutAgente, Devuelto, MaquinaEstablecida, LiberadoCostos, LargoDesarrollo, AnchoDesarrollo
			)
			SELECT '05', A.[Clave Articulo],A.Flauta,A.PiezasXcorte,B.Cantidad,A.descripcion, A.ConScore,
				A.PiezasXhoja,B.[Area unitaria],A.[Largo Hoja],A.[ancho hoja],A.[1er Color],A.[2do Color],
				A.[3er Color],A.[4to Color],A.Suaje,A.Dado,D.[clave proceso],B.Resistencia,D.[Piezas Corte] as PzasHojaProg,
				C.[aut agente],B.devuelto,A.[maquina establecida],B.[liberado costos],b.[Largo desarrollo],b.[Ancho desarrollo] 
			FROM Cajas05..CmoDat020 D 
			JOIN Cajas05..CmoDat011 B ON B.Op = D.Op 
			JOIN Cajas05..CmoTjCat004 A ON A.[clave articulo] = B.[clave articulo] 
			JOIN Cajas05..CmoDat010 C ON LEFT(C.op,5) = LEFT(B.op,5) 
			WHERE D.OP = @OP AND Programa = @Programa;
		END

		-- OBTENER OTROS DATOS (PROGRAMADO, EXISTENCIA, PRODUCIDO, VARIACION)
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT @Programado = SUM(Cantidad)
			FROM Cajas01..CmoDat020
			WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Estatus <> 'C';

			SELECT @Existencia = SUM(A.Entradas - A.Salidas)
			FROM Cajas01..CmoTjDat002 A
			INNER JOIN Cajas01..CmoTjCat001 B ON A.Almacen = B.Cod
			WHERE A.OP = @OP AND (B.Inventario = 1 OR B.Cod = '052') AND B.Foraneo = 0;

			SELECT @Producido = SUM(A.Cantidad)
			FROM Cajas01..CmoDat021 A
			JOIN Cajas01..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
			WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

			SELECT @Variacion = A.variacion
			FROM Cajas01..CmoDat008 A
			JOIN Cajas01..CmoDat010 B ON A.Pedido = B.PedidoInt
			WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT @Programado = SUM(Cantidad)
			FROM Cajas02..CmoDat020
			WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Estatus <> 'C';

			SELECT @Existencia = SUM(A.Entradas - A.Salidas)
			FROM Cajas02..CmoTjDat002 A
			INNER JOIN Cajas02..CmoTjCat001 B ON A.Almacen = B.Cod
			WHERE A.OP = @OP AND (B.Inventario = 1 OR B.Cod = '052') AND B.Foraneo = 0;

			SELECT @Producido = SUM(A.Cantidad)
			FROM Cajas02..CmoDat021 A
			JOIN Cajas02..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
			WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

			SELECT @Variacion = A.variacion
			FROM Cajas02..CmoDat008 A
			JOIN Cajas02..CmoDat010 B ON A.Pedido = B.PedidoInt
			WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT @Programado = SUM(Cantidad)
			FROM Cajas05..CmoDat020
			WHERE OP = @OP AND [Ultimo Proceso] = 1 AND Estatus <> 'C';

			SELECT @Existencia = SUM(A.Entradas - A.Salidas)
			FROM Cajas05..CmoTjDat002 A
			INNER JOIN Cajas05..CmoTjCat001 B ON A.Almacen = B.Cod
			WHERE A.OP = @OP AND (B.Inventario = 1 OR B.Cod = '052') AND B.Foraneo = 0;

			SELECT @Producido = SUM(A.Cantidad)
			FROM Cajas05..CmoDat021 A
			JOIN Cajas05..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
			WHERE A.OP = @OP AND B.[Ultimo Proceso] = 1;

			SELECT @Variacion = A.variacion
			FROM Cajas05..CmoDat008 A
			JOIN Cajas05..CmoDat010 B ON A.Pedido = B.PedidoInt
			WHERE LEFT(B.OP, 5) = LEFT(@OP, 5);
		END

		UPDATE @Res18 SET
			Programado = @Programado,
			Existencia = @Existencia,
			Producido = @Producido,
			Variacion = @Variacion
		FROM @Res18;

		SELECT ZonaERP, ClaveArticulo, Flauta, PiezasXcorte, Cantidad, Descripcion, ConScore,
			PiezasXhoja, AreaUnitaria, ISNULL(LargoHoja, 0) AS LargoHoja, ISNULL(AnchoHoja, 0) AS AnchoHoja, PrimerColor, SegundoColor,
			TercerColor, CuartoColor, Suaje, Dado, ClaveProceso, Resistencia, PzasHojaProg, 
			AutAgente, Devuelto, MaquinaEstablecida, LiberadoCostos, LargoDesarrollo, AnchoDesarrollo,
			Programado, Existencia, Producido, Variacion
		FROM @Res18
	END
	-- VALIDAR PROCESO AUTOMATICO (ACEPTAR CAMBIO MAQUINA) CAP005 (PARTE 2)
	ELSE IF @Opcion = 19
	BEGIN
		DECLARE @tmpProgramas AS TABLE (Programa VARCHAR(15))
		WHILE EXISTS (SELECT 1 FROM @tmpCap005TD_001)
		BEGIN
			SELECT TOP 1 @IDCap005TD_001 = ID, @tPrograma = Programa, @tOp = Op, @tCantidad = Cantidad, @tMaqOrigen = MaqOrigen
				, @tCveProceso = CveProceso, @tUltimoProceso = UltimoProceso, @tArticulo = Articulo
				, @tCantidadIni = CASE WHEN UltimoProceso = 1 THEN Cantidad ELSE 0 END
			FROM @tmpCap005TD_001;

			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				IF EXISTS(SELECT 1 FROM Cajas01..CmoDat387 WHERE CveMaquina = @ClaveMaquina AND Estado = 1 AND Programa = @tPrograma)
				BEGIN
					INSERT INTO @tmpProgramas (Programa)
					VALUES (@tPrograma);
				END
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				IF EXISTS(SELECT 1 FROM Cajas02..CmoDat387 WHERE CveMaquina = @ClaveMaquina AND Estado = 1 AND Programa = @tPrograma)
				BEGIN
					INSERT INTO @tmpProgramas (Programa)
					VALUES (@tPrograma);
				END
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				IF EXISTS(SELECT 1 FROM Cajas05..CmoDat387 WHERE CveMaquina = @ClaveMaquina AND Estado = 1 AND Programa = @tPrograma)
				BEGIN
					INSERT INTO @tmpProgramas (Programa)
					VALUES (@tPrograma);
				END
			END

			DELETE FROM @tmpCap005TD_001 WHERE ID = @IDCap005TD_001;
		END

		SELECT Programa
		FROM @tmpProgramas;
	END
	-- VALIDA USUARIO ADMINISTRADOR PARA JUSTIFICACION
	ELSE IF @Opcion = 20
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT 'OK' AS Message
			FROM Cajas01..CmoCat113 
			WHERE IdEmpleadoProgramacion = @UsuarioERP AND Estatus = 0;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT 'OK' AS Message
			FROM Cajas02..CmoCat113 
			WHERE IdEmpleadoProgramacion = @UsuarioERP AND Estatus = 0;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT 'OK' AS Message
			FROM Cajas05..CmoCat113 
			WHERE IdEmpleadoProgramacion = @UsuarioERP AND Estatus = 0;
		END
	END
	-- TIENE PRODUCCIÓN TMP REAL
	ELSE IF @Opcion = 21
	BEGIN
		-- @ZonaERP, @UsuarioERP, @ProgPosAct, @ProgPosSig, @FechaTrabajo, @TurnoTrabajo
		--DECLARE @tmpCmoSP377Opc6 AS TABLE (Cuantos TINYINT)
		SELECT @ProgPosSig = CASE WHEN ISNULL(@ProgPosSig, '') = '' THEN '0' ELSE @ProgPosSig END;
		
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			--INSERT INTO @tmpCmoSP377Opc6 (Cuantos)
			EXEC Cajas01..CmoSP377 
				@Accion = 6,
				@ProgPosAct = @ProgPosAct,
				@ProgPosSig = @ProgPosSig,
				@FechaTrabajo = @FechaTrabajo,
				@TurnoTrabajo = @TurnoTrabajo,
				@ClaveMaquina = @ClaveMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			--INSERT INTO @tmpCmoSP377Opc6 (Cuantos)
			EXEC Cajas02..CmoSP377 
				@Accion = 6,
				@ProgPosAct = @ProgPosAct,
				@ProgPosSig = @ProgPosSig,
				@FechaTrabajo = @FechaTrabajo,
				@TurnoTrabajo = @TurnoTrabajo,
				@ClaveMaquina = @ClaveMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			--INSERT INTO @tmpCmoSP377Opc6 (Cuantos)
			EXEC Cajas05..CmoSP377 
				@Accion = 6,
				@ProgPosAct = @ProgPosAct,
				@ProgPosSig = @ProgPosSig,
				@FechaTrabajo = @FechaTrabajo,
				@TurnoTrabajo = @TurnoTrabajo,
				@ClaveMaquina = @ClaveMaquina;
		END
	END
	-- VALIDA PROGRAMAS EN PROCESO AUTO (1/1) ANTES DE ELIMINAR
	ELSE IF @Opcion = 22
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT A.Programa
			FROM Cajas01..CmoDat387 A
			INNER JOIN @Cap005TD_001 B ON A.Programa = B.Programa
			WHERE A.CveMaquina = @ClaveMaquina
				AND A.Estado = 1;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT A.Programa
			FROM Cajas02..CmoDat387 A
			INNER JOIN @Cap005TD_001 B ON A.Programa = B.Programa
			WHERE A.CveMaquina = @ClaveMaquina
				AND A.Estado = 1;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT A.Programa
			FROM Cajas05..CmoDat387 A
			INNER JOIN @Cap005TD_001 B ON A.Programa = B.Programa
			WHERE A.CveMaquina = @ClaveMaquina
				AND A.Estado = 1;
		END
	END
	-- VALIDAR ETIQUETA (Guardar CAP009) PARTE 1
	ELSE IF @Opcion = 23
	BEGIN
		-- @ZonaERP, @UsuarioERP, @Justificacion, @OP, @ClaveArticulo, @Cantidad, @Programado, @Producido, @Solicitado, @Variacion, @Descripcion, 
		-- @ClaveMaquina, @ClaveProceso, @MaquinaEstablecida, @TipoMaquina, @Largo, @Ancho, @PasoContinua, @ProduccionPT
		DECLARE @tmpOpc23 AS TABLE(Completado BIT, TypeMessage VARCHAR(10), Message VARCHAR(200), PasoContinua TINYINT NOT NULL DEFAULT 0, Programa INT NOT NULL DEFAULT 0);
		DECLARE @tmpJustificacion AS TABLE ( Mensaje VARCHAR(10) );
		DECLARE @tmpGetOpc24 AS TABLE (Completado BIT, TypeMessage VARCHAR(10), Message VARCHAR(200), PasoContinua TINYINT NOT NULL DEFAULT 0, Programa INT)
		SELECT @Completado = 0, @TypeMessage = '', @Msj = '';

		IF ISNULL(@ZonaERP, '') = '02' AND ISNULL(@ClaveArticulo, '') != ''
		BEGIN
			IF EXISTS (SELECT 1 FROM Cajas02..CmoDat257 WHERE ClaveArticulo = @ClaveArticulo AND LlevaEtiqueta = 1)
			BEGIN
				IF NOT EXISTS (
					SELECT 1 FROM Cajas02..CmoDat187 A
					JOIN Cajas02..CmoCat079 B ON A.Cod = B.Codigo
					WHERE A.Estatus = 0 AND B.Estatus = 0 AND A.Cod = 1
				)
				BEGIN
					INSERT INTO @tmpOpc23 (Completado, TypeMessage, Message)
					SELECT 0, 'info', 'Favor de capturar el código de la etiqueta en el módulo de captura de combinación estándar de papel (CmoCap076)';
				END
			END
		END

		IF EXISTS(SELECT 1 FROM @tmpOpc23)
		BEGIN
			SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc23;
		END ELSE
		BEGIN
			-- CONTINUAR
			IF ISNULL(@Justificacion, '') = ''
			BEGIN
				INSERT INTO @tmpJustificacion (Mensaje)
				EXEC dbo.FCAPROG017MWSPC3 @Opcion = 20, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;

				IF NOT EXISTS(SELECT 1 FROM @tmpJustificacion)
				BEGIN
					INSERT INTO @tmpOpc23 (Completado, TypeMessage, Message)
					SELECT 0, 'info', 'Para guardar es necesario capturar la justificación de cambios en programación.';
				END
			END

			IF EXISTS(SELECT 1 FROM @tmpOpc23)
			BEGIN
				SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc23;
			END ELSE
			BEGIN
				-- CONTINUAR
				IF ISNULL(@Justificacion, '') != '' BEGIN SELECT @Justificacion = '' + ISNULL(RTRIM(@Justificacion), '') END;

				-- Candado de OPs para que no permita programar OPs sin folios de embarque.
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					-- PERMITIR PROGRAMAR OP
					INSERT INTO @tmpGetOpc24 (Completado, TypeMessage, Message)
					EXEC dbo.FCAPROG017MWSPC3 @Opcion = 24, @ZonaERP = @ZonaERP, @OP = @OP;

					IF NOT EXISTS(SELECT 1 FROM @tmpGetOpc24 WHERE Completado = 1)
					BEGIN
						-- ENVIAR CORREO
						EXEC dbo.FCAPROG017MWSPC3 @Opcion = 25, @ZonaERP = @ZonaERP, @OP = @OP;						
					END
				END

				IF ISNULL(@ZonaERP, '') = '01' AND NOT EXISTS(SELECT 1 FROM @tmpGetOpc24 WHERE Completado = 1)
				BEGIN
					SELECT Completado, TypeMessage, 'La OP (' + @OP + ') No tiene Folio de Embarque generado, Favor de comunicarse con Dpto Ventas' AS Message
					FROM @tmpGetOpc24;
				END ELSE
				BEGIN
					-- CONTINUAR (VALIDAR_TODO(@ClaveProceso))
					INSERT INTO @tmpOpc23 (Completado, TypeMessage, Message, PasoContinua, Programa)
					EXEC dbo.FCAPROG017MWSPC3 
						@Opcion = 26, 
						@ZonaERP = @ZonaERP, 
						@ClaveArticulo = @ClaveArticulo, 
						@Cantidad = @Cantidad, 
						@Programado = @Programado, 
						@Producido = @Producido, 
						@Solicitado = @Solicitado, 
						@Variacion = @Variacion, 
						@Descripcion = @Descripcion,
						@ClaveMaquina = @ClaveMaquina, 
						@ClaveProceso = @ClaveProceso, 
						@MaquinaEstablecida = @MaquinaEstablecida, 
						@TipoMaquina = @TipoMaquina, 
						@Largo = @Largo, 
						@Ancho = @Ancho, 
						@PasoContinua = @PasoContinua, 
						@ProduccionPT = @ProduccionPT;

					IF NOT EXISTS(SELECT 1 FROM @tmpOpc23 WHERE Completado = 1)
					BEGIN
						SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc23;
					END ELSE
					BEGIN
						DELETE FROM @tmpOpc23;

						-- PENDIENTE CONTINUAR (GUARDAR DATOS)
						INSERT INTO @tmp (Fecha)
						EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;
						SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;

						EXEC dbo.FCAPROG017MWSPA2 
							@ZonaERP = @ZonaERP, 
							@OP = @OP, 
							@UsuarioERP = @UsuarioERP,
							@Cantidad = @Cantidad,
							@TxtDescripcion = @Descripcion,
							@lblIndustria = @lblIndustria,
							@lblProceso = @Proceso,
							@CmbMaquina = @ClaveMaquina,
							@TxtComentarios = @Comentarios,
							@txtEProceso = @EProceso,
							@wJustificacion = @Justificacion;

						SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc23;
					END
				END

				
			END
		END
	END
	-- VALIDA SI PERMITE PROGRAMAR OP (Guardar CAP009) PARTE 2
	ELSE IF @Opcion = 24
	BEGIN
		-- @ZonaERP, @OP
		DECLARE @tmpOpc24 AS TABLE (
			OP VARCHAR(10), ClaveArticulo VARCHAR(9), NombreArticulo VARCHAR(60), ClaveCliente VARCHAR(12), NombreCliente VARCHAR(100), 
			TipoCliente TINYINT, Agente VARCHAR(4), ClaveRepresentante VARCHAR(6), Representante VARCHAR(50), CorreoRepresentante VARCHAR(40), 
			ClaveEjecutivo VARCHAR(6), NombEjecutivo VARCHAR(50), CorreoEjecutivo VARCHAR(40), CantidadPro INT
		);
		DECLARE @tmpCompletado BIT = 0;

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @tmpOpc24 (
				OP, ClaveArticulo, NombreArticulo, ClaveCliente, NombreCliente, TipoCliente, Agente, ClaveRepresentante, 
				Representante, CorreoRepresentante, ClaveEjecutivo, NombEjecutivo, CorreoEjecutivo, CantidadPro
			)
			SELECT A.OP, A.[Clave Articulo], G.Descripcion, B.[Clave Cliente], C.Nombre, C.TipoCliente, C.Agente, D.[Clave Usuario], E.Nombre, E.Correo + '@cecso.com.mx',
				D.Ejecutivo, F.Nombre, F.Correo + '@cecso.com.mx', (CC.[Numero Cortes] * CC.[piezas corte] * CC.[hojas corte]) as CantidadPro
			FROM Cajas01..CmoDat011 A
			INNER JOIN Cajas01..CmoDat010 B ON B.OP = A.Folio_OP
			INNER JOIN Cajas01..CmoTjCat005 C ON C.Codigo = B.[Clave Cliente]
			INNER JOIN Cajas01..CmoTjCat006 D ON  D.Cod = C.Agente
			INNER JOIN Informatica..MnuNvCat003 E ON E.CLAVE = D.[Clave Usuario]
			LEFT JOIN  Informatica..MnuNvCat003 F ON F.Clave = D.Ejecutivo
			INNER JOIN Cajas01..CmoTjCat004 G ON G.[Clave Articulo] = A.[Clave Articulo]
			INNER JOIN Cajas01..CmoDat013 CC 
			INNER JOIN Cajas01..CmoDat012 AA ON AA.Programa = CC.Programa AND AA.Estatus = 'P' AND AA.Orden = 0 ON A.OP = CC.Op
			WHERE A.OP = @OP
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @tmpOpc24 (
				OP, ClaveArticulo, NombreArticulo, ClaveCliente, NombreCliente, TipoCliente, Agente, ClaveRepresentante, 
				Representante, CorreoRepresentante, ClaveEjecutivo, NombEjecutivo, CorreoEjecutivo, CantidadPro
			)
			SELECT A.OP, A.[Clave Articulo], G.Descripcion, B.[Clave Cliente], C.Nombre, C.TipoCliente, C.Agente, D.[Clave Usuario], E.Nombre, E.Correo + '@cecso.com.mx',
				D.Ejecutivo, F.Nombre, F.Correo + '@cecso.com.mx', (CC.[Numero Cortes] * CC.[piezas corte] * CC.[hojas corte]) as CantidadPro
			FROM Cajas02..CmoDat011 A
			INNER JOIN Cajas02..CmoDat010 B ON B.OP = A.Folio_OP
			INNER JOIN Cajas02..CmoTjCat005 C ON C.Codigo = B.[Clave Cliente]
			INNER JOIN Cajas02..CmoTjCat006 D ON  D.Cod = C.Agente
			INNER JOIN Informatica..MnuNvCat003 E ON E.CLAVE = D.[Clave Usuario]
			LEFT JOIN  Informatica..MnuNvCat003 F ON F.Clave = D.Ejecutivo
			INNER JOIN Cajas02..CmoTjCat004 G ON G.[Clave Articulo] = A.[Clave Articulo]
			INNER JOIN Cajas02..CmoDat013 CC 
			INNER JOIN Cajas02..CmoDat012 AA ON AA.Programa = CC.Programa AND AA.Estatus = 'P' AND AA.Orden = 0 ON A.OP = CC.Op
			WHERE A.OP = @OP
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @tmpOpc24 (
				OP, ClaveArticulo, NombreArticulo, ClaveCliente, NombreCliente, TipoCliente, Agente, ClaveRepresentante, 
				Representante, CorreoRepresentante, ClaveEjecutivo, NombEjecutivo, CorreoEjecutivo, CantidadPro
			)
			SELECT A.OP, A.[Clave Articulo], G.Descripcion, B.[Clave Cliente], C.Nombre, C.TipoCliente, C.Agente, D.[Clave Usuario], E.Nombre, E.Correo + '@cecso.com.mx',
				D.Ejecutivo, F.Nombre, F.Correo + '@cecso.com.mx', (CC.[Numero Cortes] * CC.[piezas corte] * CC.[hojas corte]) as CantidadPro
			FROM Cajas05..CmoDat011 A
			INNER JOIN Cajas05..CmoDat010 B ON B.OP = A.Folio_OP
			INNER JOIN Cajas05..CmoTjCat005 C ON C.Codigo = B.[Clave Cliente]
			INNER JOIN Cajas05..CmoTjCat006 D ON  D.Cod = C.Agente
			INNER JOIN Informatica..MnuNvCat003 E ON E.CLAVE = D.[Clave Usuario]
			LEFT JOIN  Informatica..MnuNvCat003 F ON F.Clave = D.Ejecutivo
			INNER JOIN Cajas05..CmoTjCat004 G ON G.[Clave Articulo] = A.[Clave Articulo]
			INNER JOIN Cajas05..CmoDat013 CC 
			INNER JOIN Cajas05..CmoDat012 AA ON AA.Programa = CC.Programa AND AA.Estatus = 'P' AND AA.Orden = 0 ON A.OP = CC.Op
			WHERE A.OP = @OP
		END

		/*
			0 - Inventario     (Traspaso Bodega foráneos)       – Permitirá Programar
			1 - Normal         (Remisiones sin folios)          – Permitirá Programar Solo Si hay Folio de Embarque
			2 - Stock          (Remisión con folios)            – Permitirá Programar
			0 - Conveniencia   (Conveniencia con el cliente)    – Permitirá Programar
		*/

		IF EXISTS(SELECT 1 FROM @tmpOpc24)
		BEGIN
			SELECT TOP 1 --@pClaveArticulo = ClaveArticulo, @pNombreArticulo = NombreArticulo, @pClaveCliente = ClaveCliente, @pNombreCliente = NombreCliente, 
				@pTipoCliente = TipoCliente--, @pAgente = Agente, @pClaveRepresentante = ClaveRepresentante, @pRepresentante = Representante, @pCorreoRepresentante = CorreoRepresentante, 
				--@pClaveEjecutivo = ClaveEjecutivo, @pNombEjecutivo = NombEjecutivo, @pCorreoEjecutivo = CorreoEjecutivo, @pCantidadPro = CantidadPro
			FROM @tmpOpc24;

			IF ISNULL(@pTipoCliente, 0) = 1
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT TOP 1 @pAntiguedad = DATEDIFF(DAY, Fecha_H_Entrega, GETDATE())
					FROM Cajas01..CmoDat080 
					WHERE OP = @OP AND Status = 0;

					IF ISNULL(@pAntiguedad, -1) != -1
					BEGIN
						IF ISNULL(@pAntiguedad, 0) <= 30
						BEGIN
							SELECT @Completado = 1, @TypeMessage = 'success', @Msj = 'OK';
						END ELSE
						BEGIN
							SELECT @Completado = 0, @TypeMessage = 'info', @Msj = 'La OP ' + @OP + ' cuenta con un folio embarque caducado.';
						END
					END ELSE
					BEGIN
						SELECT @Completado = 0, @TypeMessage = 'info', @Msj = 'La OP ' + @OP + ' no cuenta con folio embarque.';
					END
				END
			END ELSE
			BEGIN
				SELECT @Completado = 1, @TypeMessage = 'success', @Msj = 'OK';
			END
		END ELSE
		BEGIN
			SELECT @Completado = 0, @TypeMessage = 'info', @Msj = 'No se encontró información de la OP para validar si se puede programar.';
		END
		-- VALIDA SI ES CLIENTE CECSO
		IF LEFT(ISNULL(@ClaveCliente, ''), 4) = '0039'
		BEGIN
			SELECT @Completado = 1, @TypeMessage = 'success', @Msj = 'OK';
		END

		SELECT @Completado AS Completado, @TypeMessage AS TypeMessage, @Msj AS Message;
	END
	-- ENVIAR EMAIL FOLIOS CIERRE (Guardar CAP009) PARTE 3
	ELSE IF @Opcion = 25
	BEGIN
		-- @ZonaERP, @OP
		DECLARE @tmpOpc25 AS TABLE (
			OP VARCHAR(10), ClaveArticulo VARCHAR(9), NombreArticulo VARCHAR(60), ClaveCliente VARCHAR(12), NombreCliente VARCHAR(100), 
			TipoCliente TINYINT, Agente VARCHAR(4), ClaveRepresentante VARCHAR(6), Representante VARCHAR(50), CorreoRepresentante VARCHAR(40), 
			ClaveEjecutivo VARCHAR(6), NombEjecutivo VARCHAR(50), CorreoEjecutivo VARCHAR(40), CantidadPro INT
		);

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @tmpOpc25 (
				OP, ClaveArticulo, NombreArticulo, ClaveCliente, NombreCliente, TipoCliente, Agente, ClaveRepresentante, 
				Representante, CorreoRepresentante, ClaveEjecutivo, NombEjecutivo, CorreoEjecutivo, CantidadPro
			)
			SELECT A.OP, A.[Clave Articulo], G.Descripcion, B.[Clave Cliente], C.Nombre, C.TipoCliente, C.Agente, D.[Clave Usuario], E.Nombre, E.Correo + '@cecso.com.mx',
				D.Ejecutivo, F.Nombre, F.Correo + '@cecso.com.mx', (CC.[Numero Cortes] * CC.[piezas corte] * CC.[hojas corte]) as CantidadPro
			FROM Cajas01..CmoDat011 A
			INNER JOIN Cajas01..CmoDat010 B ON B.OP = A.Folio_OP
			INNER JOIN Cajas01..CmoTjCat005 C ON C.Codigo = B.[Clave Cliente]
			INNER JOIN Cajas01..CmoTjCat006 D ON  D.Cod = C.Agente
			INNER JOIN Informatica..MnuNvCat003 E ON E.Clave = D.[Clave Usuario]
			LEFT JOIN  Informatica..MnuNvCat003 F ON F.Clave = D.Ejecutivo
			INNER JOIN Cajas01..CmoTjCat004 G ON G.[Clave Articulo] = A.[Clave Articulo]
			INNER JOIN Cajas01..CmoDat013 CC 
			INNER JOIN Cajas01..CmoDat012 AA ON AA.Programa = CC.Programa AND AA.Estatus = 'P' AND AA.Orden = 0 ON A.OP = CC.Op
			WHERE A.OP = @OP
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @tmpOpc25 (
				OP, ClaveArticulo, NombreArticulo, ClaveCliente, NombreCliente, TipoCliente, Agente, ClaveRepresentante, 
				Representante, CorreoRepresentante, ClaveEjecutivo, NombEjecutivo, CorreoEjecutivo, CantidadPro
			)
			SELECT A.OP, A.[Clave Articulo], G.Descripcion, B.[Clave Cliente], C.Nombre, C.TipoCliente, C.Agente, D.[Clave Usuario], E.Nombre, E.Correo + '@cecso.com.mx',
				D.Ejecutivo, F.Nombre, F.Correo + '@cecso.com.mx', (CC.[Numero Cortes] * CC.[piezas corte] * CC.[hojas corte]) as CantidadPro
			FROM Cajas02..CmoDat011 A
			INNER JOIN Cajas02..CmoDat010 B ON B.OP = A.Folio_OP
			INNER JOIN Cajas02..CmoTjCat005 C ON C.Codigo = B.[Clave Cliente]
			INNER JOIN Cajas02..CmoTjCat006 D ON  D.Cod = C.Agente
			INNER JOIN Informatica..MnuNvCat003 E ON E.Clave = D.[Clave Usuario]
			LEFT JOIN  Informatica..MnuNvCat003 F ON F.Clave = D.Ejecutivo
			INNER JOIN Cajas02..CmoTjCat004 G ON G.[Clave Articulo] = A.[Clave Articulo]
			INNER JOIN Cajas02..CmoDat013 CC 
			INNER JOIN Cajas02..CmoDat012 AA ON AA.Programa = CC.Programa AND AA.Estatus = 'P' AND AA.Orden = 0 ON A.OP = CC.Op
			WHERE A.OP = @OP
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @tmpOpc25 (
				OP, ClaveArticulo, NombreArticulo, ClaveCliente, NombreCliente, TipoCliente, Agente, ClaveRepresentante, 
				Representante, CorreoRepresentante, ClaveEjecutivo, NombEjecutivo, CorreoEjecutivo, CantidadPro
			)
			SELECT A.OP, A.[Clave Articulo], G.Descripcion, B.[Clave Cliente], C.Nombre, C.TipoCliente, C.Agente, D.[Clave Usuario], E.Nombre, E.Correo + '@cecso.com.mx',
				D.Ejecutivo, F.Nombre, F.Correo + '@cecso.com.mx', (CC.[Numero Cortes] * CC.[piezas corte] * CC.[hojas corte]) as CantidadPro
			FROM Cajas05..CmoDat011 A
			INNER JOIN Cajas05..CmoDat010 B ON B.OP = A.Folio_OP
			INNER JOIN Cajas05..CmoTjCat005 C ON C.Codigo = B.[Clave Cliente]
			INNER JOIN Cajas05..CmoTjCat006 D ON  D.Cod = C.Agente
			INNER JOIN Informatica..MnuNvCat003 E ON E.Clave = D.[Clave Usuario]
			LEFT JOIN  Informatica..MnuNvCat003 F ON F.Clave = D.Ejecutivo
			INNER JOIN Cajas05..CmoTjCat004 G ON G.[Clave Articulo] = A.[Clave Articulo]
			INNER JOIN Cajas05..CmoDat013 CC 
			INNER JOIN Cajas05..CmoDat012 AA ON AA.Programa = CC.Programa AND AA.Estatus = 'P' AND AA.Orden = 0 ON A.OP = CC.Op
			WHERE A.OP = @OP
		END

		IF EXISTS(SELECT 1 FROM @tmpOpc25)
		BEGIN
			SELECT TOP 1 @pClaveArticulo = RTRIM(ClaveArticulo), @pNombreArticulo = RTRIM(NombreArticulo), @pClaveCliente = RTRIM(ClaveCliente), @pNombreCliente = RTRIM(NombreCliente), 
				@pTipoCliente = TipoCliente, @pAgente = RTRIM(Agente), @pClaveRepresentante = RTRIM(ClaveRepresentante), @pRepresentante = RTRIM(Representante), 
				@pCorreoRepresentante = RTRIM(CorreoRepresentante), @pClaveEjecutivo = RTRIM(ClaveEjecutivo), @pNombEjecutivo = RTRIM(NombEjecutivo), 
				@pCorreoEjecutivo = RTRIM(CorreoEjecutivo), @pCantidadPro = CantidadPro
			FROM @tmpOpc25;

			DECLARE @pNotifica BIT = 0, @pHoraActual INT;
			DECLARE @pMensaje VARCHAR(MAX) = '', @pSubject VARCHAR(200) = '', @pSaludo VARCHAR(200) = '', @pFirma VARCHAR(100) = '', @pNota VARCHAR(300) = '',
				@MensajeDe VARCHAR(20) = 'noreply@cecso.com.mx', @NombreDe VARCHAR(100), @MensajePara VARCHAR(MAX), @CopiaPara VARCHAR(MAX);

			SELECT @pHoraActual = CONVERT(INT, LEFT(CONVERT(TIME, GETDATE()), 2));
			IF ISNULL(@pCorreoEjecutivo, '') != ''
			BEGIN
				SELECT @pNotifica = 1;

				SELECT @NombreDe = '', 
					@MensajePara = 'ecota@cecso.com.mx, ' + @pCorreoEjecutivo + ', ' + @pCorreoRepresentante,
					@CopiaPara = 'amendiv@cecso.com.mx, hpherson@cecso.com.mx, phurtado@cecso.com.mx, lmmurrieta@cecso.com.mx, christian.valenzuela@ciipdetec.com';
				SELECT @pSaludo = CASE WHEN @pHoraActual >= 12 AND @pHoraActual <= 19 THEN 'Buenas Tardes' 
									WHEN @pHoraActual > 19 THEN 'Buenas Noches' 
									ELSE 'Buenos Días'
								END + '<br>';
				SELECT @pFirma = 'Correo enviado automáticamente desde CPLCAP012 - Modificacion a secuencia impresoras<br>'
				SELECT @pSubject = 'La OP ' + @OP + ' - ' + @pClaveArticulo + ' - ' + @pNombreArticulo + ' - No se puede Programar por falta de folio de embarque.';
				SELECT @pMensaje = 'Se le informa que la OP ' + @OP + ' No se puede Programar por falta de folio de embarque. <br>'

				SELECT @pNota = @pNota + '<b>OP:<b> ' + @OP + '<br>';
				SELECT @pNota = @pNota + '<b>Articulo:<b> ' + @pClaveArticulo + ' - ' + @pNombreArticulo + '<br>';
				SELECT @pNota = @pNota + '<b>Cliente:<b> ' + @pClaveCliente + ' - ' + @pNombreCliente + '<br>';
				SELECT @pNota = @pNota + '<b>Cantidad:<b> ' + CONVERT(VARCHAR, @pCantidadPro) + '<br>';

				SELECT @pMensaje = @pSaludo + @pMensaje + @pNota + @pFirma;

				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					IF EXISTS(SELECT 1 FROM Cajas01..CMOHIS057 WHERE OP = @OP) BEGIN SELECT @pNotifica = 0; END
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					IF EXISTS(SELECT 1 FROM Cajas02..CMOHIS057 WHERE OP = @OP) BEGIN SELECT @pNotifica = 0; END
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					IF EXISTS(SELECT 1 FROM Cajas05..CMOHIS057 WHERE OP = @OP) BEGIN SELECT @pNotifica = 0; END
				END

				DECLARE @EML VARCHAR(100) = 'CPLCAP012 ' + FORMAT(GETDATE(), 'yyyy-MM-dd HH.mm.ss.ms');
				-- ENVIAR CORREO
				IF ISNULL(@pNotifica, 0) = 1
				BEGIN
					EXEC Servicios01.dbo.SERSISTSP003 
						@NombreEML = @EML, 
						@De = @MensajeDe, 
						@NombreDe = @NombreDe, 
						@Para = @MensajePara,
						@Asunto = @pSubject,
						@CuerpoTexto = @pMensaje,
						@Copia = @CopiaPara,
						@ObjetoInsert = @pModuloInsert;
				END
			END
		END
	END
	-- VALIDAR TODO (Guardar CAP009) PARTE 4
	ELSE IF @Opcion = 26
	BEGIN
		-- @ZonaERP, @ClaveArticulo, @Cantidad, @Programado, @Producido, @Solicitado, @Variacion, @Descripcion, 
		-- @ClaveMaquina, @ClaveProceso, @MaquinaEstablecida, @TipoMaquina, @Largo, @Ancho, @PasoContinua, @ProduccionPT
		
		DECLARE @tmpOpc26 AS TABLE(Completado BIT, TypeMessage VARCHAR(10), Message VARCHAR(200), PasoContinua TINYINT NOT NULL DEFAULT 0, Programa INT NOT NULL DEFAULT 0);
		DECLARE @lProgramado INT, @lProducido INT, @lSolicitado INT;

		IF ISNULL(@ClaveArticulo, '') = ''
		BEGIN
			INSERT INTO @tmpOpc26 (Completado, Message, TypeMessage)
			VALUES (0, 'Se requiere una OP Activa para programar', 'info');
		END
		ELSE IF ISNULL(@Cantidad, 0) = 0
		BEGIN
			INSERT INTO @tmpOpc26 (Completado, Message, TypeMessage)
			VALUES (0, 'Cantidad inválida en la OP... Corrija', 'info');
		END
		ELSE IF ISNULL(@Descripcion, '') = '' AND ISNULL(@PasoContinua, 0) != 1
		BEGIN
			INSERT INTO @tmpOpc26 (Completado, Message, TypeMessage, PasoContinua)
			VALUES (0, 'OP Sin Ruta de Proceso...', 'question', 1);
		END

		IF EXISTS(SELECT 1 FROM @tmpOpc26)
		BEGIN
			SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
		END ELSE
		BEGIN
			-- CONTINUAR
			--DELETE FROM @tmpOpc26;
			IF ISNULL(@MaquinaEstablecida, '') != ''
			BEGIN
				IF ISNULL(@ClaveMaquina, '') != ISNULL(@MaquinaEstablecida, '') AND ISNULL(@TipoMaquina, 0) != 1
				BEGIN
					INSERT INTO @tmpOpc26 (Completado, Message, TypeMessage)
					VALUES (0, 'La OP únicamente se puede correr en la Máquina ' + ISNULL(@MaquinaEstablecida, '') + '... Verifique máquina asignada al Artículo.', 'info');
				END
			END

			IF EXISTS(SELECT 1 FROM @tmpOpc26)
			BEGIN
				SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
			END ELSE
			BEGIN
				-- CONTINUAR
				--DELETE FROM @tmpOpc26;
				SELECT @lProgramado = @Programado, @lProducido = @Producido, @lPiezas = @Cantidad, @lSolicitado = @Solicitado;

				SELECT @lProgramado = ISNULL(@lPiezas, 0) + ISNULL(@lProducido, 0);

				IF ISNULL(@lProgramado, 0) > (ISNULL(@lSolicitado, 0) * ISNULL(@Variacion, 0))
				BEGIN
					INSERT INTO @tmpOpc26 (Completado, Message, TypeMessage)
					VALUES (
						0, 
						'La suma de Producido (Recibido en PT) más Programado Excede con ' + FORMAT(ISNULL(@lProgramado,0) - ISNULL(@lSolicitado, 0), '###,##0') + ' piezas lo Solicitado... Corrija', 
						'info'
					);
				END

				IF EXISTS(SELECT 1 FROM @tmpOpc26)
				BEGIN
					SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
				END ELSE
				BEGIN
					-- CONTINUAR
					--DELETE FROM @tmpOpc26;

					IF ISNULL(@ProduccionPT, 0) > 0 AND ISNULL(@PasoContinua, 0) != 2
					BEGIN
						SELECT @lProgramado = ISNULL(@lPiezas, 0) + ISNULL(@ProduccionPT, 0);

						INSERT INTO @tmpOpc26(Completado, Message, TypeMessage, PasoContinua)
						VALUES (
							0, 
							'La suma de Producido (no recibido en PT) más Programado Excede con ' + FORMAT(ISNULL(@lProgramado, 0) - ISNULL(@LSolicitado, 0), '###,##0') + ' piezas lo Solicitado...', 
							'question',
							2
						);
					END

					IF EXISTS(SELECT 1 FROM @tmpOpc26)
					BEGIN
						SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
					END ELSE
					BEGIN
						-- VALIDACIÓN QUE APLICA SOLO PARA IMPRESORAS
						IF ISNULL(@TipoMaquina, 0) = 0
						BEGIN
							IF ISNULL(@ZonaERP, '') = '01'
							BEGIN
								IF NOT EXISTS (
									SELECT 1 
									FROM Cajas01..CmoDat018 A 
									INNER JOIN Cajas01..CmoCat010 B ON B.[Clave Proceso] = A.[Clave Proceso] AND B.[Tipo Maquina] = A.[Tipo Maquina]
									WHERE A.[Clave Maquina] = @ClaveMaquina AND A.[Clave Proceso] = @ClaveProceso AND B.Status = 0 AND A.Estatus = 0
								)
								BEGIN
									INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
									VALUES (
										0, 
										'Clave de Proceso no Disponible de la OP para esta Máquina, Verifique el Proceso de la OP.', 
										'info'
									);
								END
							END
							ELSE IF ISNULL(@ZonaERP, '') = '02'
							BEGIN
								IF NOT EXISTS (
									SELECT 1 
									FROM Cajas02..CmoDat018 A 
									INNER JOIN Cajas02..CmoCat010 B ON B.[Clave Proceso] = A.[Clave Proceso] AND B.[Tipo Maquina] = A.[Tipo Maquina]
									WHERE A.[Clave Maquina] = @ClaveMaquina AND A.[Clave Proceso] = @ClaveProceso AND B.Status = 0 AND A.Estatus = 0
								)
								BEGIN
									INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
									VALUES (
										0, 
										'Clave de Proceso no Disponible de la OP para esta Máquina, Verifique el Proceso de la OP.', 
										'info'
									);
								END
							END
							ELSE IF ISNULL(@ZonaERP, '') = '05'
							BEGIN
								IF NOT EXISTS (
									SELECT 1 
									FROM Cajas05..CmoDat018 A 
									INNER JOIN Cajas05..CmoCat010 B ON B.[Clave Proceso] = A.[Clave Proceso] AND B.[Tipo Maquina] = A.[Tipo Maquina]
									WHERE A.[Clave Maquina] = @ClaveMaquina AND A.[Clave Proceso] = @ClaveProceso AND B.Status = 0 AND A.Estatus = 0
								)
								BEGIN
									INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
									VALUES (
										0, 
										'Clave de Proceso no Disponible de la OP para esta Máquina, Verifique el Proceso de la OP.', 
										'info'
									);
								END
							END

							IF EXISTS(SELECT 1 FROM @tmpOpc26)
							BEGIN
								SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
							END ELSE
							BEGIN
								-- CONTINUA
								IF ISNULL(@ZonaERP, '') = '01'
								BEGIN
									IF EXISTS(
										SELECT 1
										FROM Cajas01..CmoCat011
										WHERE [Clave Maquina] = @ClaveMaquina
									)
									BEGIN
										SELECT @AnchoMax = AnchoMax, @AnchoMin = AnchoMin, @LargoMax = LargoMax, @LargoMin = LargoMin
										FROM Cajas01..CmoCat011
										WHERE [Clave Maquina] = @ClaveMaquina;
									END ELSE
									BEGIN
										INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
										VALUES (0, 'No existen dimensiones de Máquina.', 'info');
									END
								END
								ELSE IF ISNULL(@ZonaERP, '') = '02'
								BEGIN
									IF EXISTS(
										SELECT 1
										FROM Cajas02..CmoCat011
										WHERE [Clave Maquina] = @ClaveMaquina
									)
									BEGIN
										SELECT @AnchoMax = AnchoMax, @AnchoMin = AnchoMin, @LargoMax = LargoMax, @LargoMin = LargoMin
										FROM Cajas02..CmoCat011
										WHERE [Clave Maquina] = @ClaveMaquina;
									END ELSE
									BEGIN
										INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
										VALUES (0, 'No existen dimensiones de Máquina.', 'info');
									END
								END
								ELSE IF ISNULL(@ZonaERP, '') = '05'
								BEGIN
									IF EXISTS(
										SELECT 1
										FROM Cajas05..CmoCat011
										WHERE [Clave Maquina] = @ClaveMaquina
									)
									BEGIN
										SELECT @AnchoMax = AnchoMax, @AnchoMin = AnchoMin, @LargoMax = LargoMax, @LargoMin = LargoMin
										FROM Cajas05..CmoCat011
										WHERE [Clave Maquina] = @ClaveMaquina;
									END ELSE
									BEGIN
										INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
										VALUES (0, 'No existen dimensiones de Máquina.', 'info');
									END
								END

								-- VALIDA SI EXISTEN LOS DATOS ANTERIORES
								IF EXISTS(SELECT 1 FROM @tmpOpc26)
								BEGIN
									SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
								END ELSE
								BEGIN
									-- CONTINUA
									IF ISNULL(@ZonaERP, '') != '05'
									BEGIN
										IF (ISNULL(@Largo, 0) < ISNULL(@LargoMin, 0) OR ISNULL(@Largo, 0) > ISNULL(@LargoMax, 0)) OR
											(ISNULL(@Ancho, 0) < ISNULL(@AnchoMin, 0) OR ISNULL(@Ancho, 0) > ISNULL(@AnchoMax, 0))
										BEGIN
											INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
											VALUES (0, 'La Caja de la OP no se puede Fabricar por sus Dimensiones...', 'info');
										END
									END

									IF EXISTS(SELECT 1 FROM @tmpOpc26)
									BEGIN
										SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
										GOTO SALIDA;
									END
								END
							END
						END

						IF ISNULL(@ZonaERP, '') = '01'
						BEGIN
							IF NOT EXISTS(SELECT 1 FROM Cajas01..CmoDat005)
							BEGIN
								INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
								VALUES (0, 'ERROR: Al asignar Programa ' + @Programa + ' ya existe... Comuniquese a Sistemas', 'error');
							END ELSE
							BEGIN
								SELECT TOP 1 @Programa = ISNULL(Impresora, 0) FROM Cajas01..CmoDat005;
							END
						END
						ELSE IF ISNULL(@ZonaERP, '') = '02'
						BEGIN
							IF NOT EXISTS(SELECT 1 FROM Cajas02..CmoDat005)
							BEGIN
								INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
								VALUES (0, 'ERROR: Al asignar Programa ' + @Programa + ' ya existe... Comuniquese a Sistemas', 'error');
							END ELSE
							BEGIN
								SELECT TOP 1 @Programa = ISNULL(Impresora, 0) FROM Cajas02..CmoDat005;
							END
						END
						ELSE IF ISNULL(@ZonaERP, '') = '05'
						BEGIN
							IF NOT EXISTS(SELECT 1 FROM Cajas05..CmoDat005)
							BEGIN
								INSERT INTO @tmpOpc26(Completado, Message, TypeMessage)
								VALUES (0, 'ERROR: Al asignar Programa ' + @Programa + ' ya existe... Comuniquese a Sistemas', 'error');
							END ELSE
							BEGIN
								SELECT TOP 1 @Programa = ISNULL(Impresora, 0) FROM Cajas05..CmoDat005;
							END
						END

						IF EXISTS(SELECT 1 FROM @tmpOpc26)
						BEGIN
							SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
						END ELSE
						BEGIN
							INSERT INTO @tmpOpc26(Completado, Message, TypeMessage, Programa)
							VALUES (1, 'OK', 'success', @Programa);

							SELECT Completado, TypeMessage, Message, PasoContinua, Programa FROM @tmpOpc26;
						END
					END
				END
			END
		END
	END
	-- VALIDAR PARO MAQUINA
	ELSE IF @Opcion = 27
	BEGIN
		-- @ClaveMaquina, @lFecha, @lFechaTermino
		--DECLARE @tmpOpc27 AS TABLE (Duracion INT, Inicio SMALLDATETIME, Termino SMALLDATETIME);

		--INSERT INTO @tmpOpc27 (Duracion, Inicio, Termino)
		SELECT DATEDIFF(MINUTE, Inicio, Termino) AS Duracion, Inicio, Termino
		FROM CPLCAT001
		WHERE ClaveMaquina = @ClaveMaquina
			AND (
				(@lFecha BETWEEN Inicio AND Termino OR @lFechaTermino BETWEEN Inicio AND Termino) OR
				(Inicio BETWEEN @lFecha AND @lFechaTermino OR Termino BETWEEN @lFecha AND @lFechaTermino)
			)
			AND Status = 0 AND TipoTiempo = 'PM'
		ORDER BY Termino;
	END
	-- OBTENER MAQUINA DESTINO PARA CAP016 (TRASPASO DE PROGRAMA)
	ELSE IF @Opcion = 28
	BEGIN
		-- @ZonaERP, @ClaveMaquina, @TipoMaquina
		DECLARE @MaquinaPar INT, @EsEtiquetadora BIT, @lTipos VARCHAR(20);

		DECLARE @Result AS TABLE (
			UltimoProceso BIT, Op VARCHAR(20), Cliente VARCHAR(100), Articulo VARCHAR(60), Cantidad INT, LargoDes REAL, AnchoDes REAL, 
			PrimerColor VARCHAR(13), SegundoColor VARCHAR(13), TercerColor VARCHAR(13), CuartoColor VARCHAR(13), FechaEntrega SMALLDATETIME, MinutosProduccion SMALLINT, 
			Orden SMALLINT, Programa INT, Notas VARCHAR(200), FijarFecha SMALLDATETIME, ClaveArticulo VARCHAR(9), FechaTermino SMALLDATETIME, FechaInicio SMALLDATETIME, 
			Producido INT, Estatus CHAR(1), NotasOperacion VARCHAR(200), ClaveProceso VARCHAR(10), Proceso1 BIT, ProgramaCorr INT, ClaveArticulo2 VARCHAR(9), 
			FechaCorrug SMALLDATETIME, Suspendido BIT, Electronico BIT, Pintado BIT, Status VARCHAR(10), LiberadoDS BIT, PSI DECIMAL(18,2), 
			LBF DECIMAL(18,2), CompresionEspOtrosLBF DECIMAL(18,2), EProceso VARCHAR(500), Minimo DECIMAL(6,2), Maximo DECIMAL(6,2), ConScore BIT, EnAtencion BIT
		);
		DECLARE @Maq AS TABLE (ClaveMaquina VARCHAR(10));

		IF @TipoMaquina = 0 -- IMPRESORAS
		BEGIN
			SELECT @lTipos = 'IM,';
		END ELSE
		BEGIN
			SELECT @lTipos = 'AC,ES,';
		END

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT @MaquinaPar = ISNULL(MaquinaPar, 0), @EsEtiquetadora = ISNULL(EsEtiquetadora, 0)
			FROM Cajas01..CmoCat011
			WHERE [Clave Maquina] = @ClaveMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT @MaquinaPar = ISNULL(MaquinaPar, 0), @EsEtiquetadora = ISNULL(EsEtiquetadora, 0)
			FROM Cajas02..CmoCat011
			WHERE [Clave Maquina] = @ClaveMaquina;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT @MaquinaPar = ISNULL(MaquinaPar, 0), @EsEtiquetadora = ISNULL(EsEtiquetadora, 0)
			FROM Cajas05..CmoCat011
			WHERE [Clave Maquina] = @ClaveMaquina;
		END

		IF ISNULL(@MaquinaPar, 0) != 0 -- PARAFINADORA
		BEGIN
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				INSERT INTO @Maq (ClaveMaquina)
				SELECT [Clave Maquina] AS ClaveMaquina
				FROM Cajas01..CmoCat011
				WHERE Status = 0 AND MaquinaPar = ISNULL(@MaquinaPar, 0);
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				INSERT INTO @Maq (ClaveMaquina)
				SELECT [Clave Maquina] AS ClaveMaquina
				FROM Cajas02..CmoCat011
				WHERE Status = 0 AND MaquinaPar = ISNULL(@MaquinaPar, 0);
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				INSERT INTO @Maq (ClaveMaquina)
				SELECT [Clave Maquina] AS ClaveMaquina
				FROM Cajas05..CmoCat011
				WHERE Status = 0 AND MaquinaPar = ISNULL(@MaquinaPar, 0);
			END
		END ELSE
		BEGIN -- ETIQUETADORA
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				INSERT INTO @Maq (ClaveMaquina)
				SELECT [Clave Maquina] AS ClaveMaquina
				FROM Cajas01..CmoCat011
				WHERE Status = 0 AND EsEtiquetadora = ISNULL(@EsEtiquetadora, 0)
					AND [Clave Maquina] != @ClaveMaquina;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				INSERT INTO @Maq (ClaveMaquina)
				SELECT [Clave Maquina] AS ClaveMaquina
				FROM Cajas02..CmoCat011
				WHERE Status = 0 AND EsEtiquetadora = ISNULL(@EsEtiquetadora, 0)
					AND [Clave Maquina] != @ClaveMaquina;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				INSERT INTO @Maq (ClaveMaquina)
				SELECT [Clave Maquina] AS ClaveMaquina
				FROM Cajas05..CmoCat011
				WHERE Status = 0 AND EsEtiquetadora = ISNULL(@EsEtiquetadora, 0)
					AND [Clave Maquina] != @ClaveMaquina;
			END
		END

		IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			IF ISNULL(@ClaveMaquina, '') = 'PALET'
			BEGIN
				INSERT INTO @Result (
					UltimoProceso, Op, Cliente, Articulo, Cantidad, LargoDes, AnchoDes, 
					PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaEntrega, MinutosProduccion, 
					Orden, Programa, Notas, FijarFecha, ClaveArticulo, FechaTermino, FechaInicio, 
					Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, 
					FechaCorrug, Suspendido, Electronico, Pintado, Status, LiberadoDS, PSI, 
					LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
				)
				EXEC Cajas02..CmoSP016 @ClaveMaquina, @lTipos, 1, 1, 0, NULL, 1
			END ELSE
			BEGIN
				INSERT INTO @Result (
					UltimoProceso, Op, Cliente, Articulo, Cantidad, LargoDes, AnchoDes, 
					PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaEntrega, MinutosProduccion, 
					Orden, Programa, Notas, FijarFecha, ClaveArticulo, ClaveArticulo2, FechaTermino, FechaInicio, 
					Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, 
					FechaCorrug, Suspendido, Electronico, Pintado, Status, LiberadoDS, PSI, 
					LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
				)
				EXEC Cajas02..CmoSP016 @ClaveMaquina, @lTipos, 1, 0, NULL, 0, 1
			END
		END ELSE
		BEGIN
			IF ISNULL(@ClaveMaquina, '') != ''
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO @Result (
						UltimoProceso, Op, Cliente, Articulo, Cantidad, LargoDes, AnchoDes, 
						PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaEntrega, MinutosProduccion, 
						Orden, Programa, Notas, FijarFecha, ClaveArticulo, ClaveArticulo2, FechaTermino, FechaInicio, 
						Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, 
						FechaCorrug, Suspendido, Electronico, Pintado, Status, LiberadoDS, PSI, 
						LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
					)
					EXEC Cajas01..CmoSP016 @ClaveMaquina, @lTipos, 1, 0, NULL, 0, 1
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO @Result (
						UltimoProceso, Op, Cliente, Articulo, Cantidad, LargoDes, AnchoDes, 
						PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaEntrega, MinutosProduccion, 
						Orden, Programa, Notas, FijarFecha, ClaveArticulo, ClaveArticulo2, FechaTermino, FechaInicio, 
						Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, 
						FechaCorrug, Suspendido, Electronico, Pintado, Status, LiberadoDS, PSI, 
						LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
					)
					EXEC Cajas05..CmoSP016 @ClaveMaquina, @lTipos, 1, 0, NULL, 0, 1
				END
			END
		END

		SELECT ClaveMaquina
		FROM @Maq;

		SELECT CAST(0 AS BIT) AS Seleccionado, UltimoProceso, Op, Cliente, Articulo, Cantidad, LargoDes, AnchoDes, 
			PrimerColor, SegundoColor, TercerColor, CuartoColor, FechaEntrega, MinutosProduccion, 
			Orden, Programa, Notas, FijarFecha, ClaveArticulo, ClaveArticulo2, FechaTermino, FechaInicio, 
			Producido, Estatus, NotasOperacion, ClaveProceso, Proceso1, ProgramaCorr, 
			FechaCorrug, Suspendido, Electronico, Pintado, Status, LiberadoDS, PSI, 
			LBF, CompresionEspOtrosLBF, EProceso, Minimo, Maximo, ConScore, EnAtencion
		FROM @Result;
		-- CmoSP016 'FLEX3' , 'IM,', 1,0, NULL, 0 
	END
	-- VALIDAR OPS ANTES DE TRASPASAR
	ELSE IF @Opcion = 29
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT B.Op, B.Orden
			FROM @Cap016TD_001 B
			JOIN Cajas01..CmoDat020 A ON A.OP = B.Op
			WHERE A.[Clave Maquina] = @ClaveMaquina AND A.Estatus IN ('P','E') AND Imprime = 1;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT B.Op, B.Orden
			FROM @Cap016TD_001 B
			JOIN Cajas02..CmoDat020 A ON A.OP = B.Op
			WHERE A.[Clave Maquina] = @ClaveMaquina AND A.Estatus IN ('P','E') AND Imprime = 1;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT B.Op, B.Orden
			FROM @Cap016TD_001 B
			JOIN Cajas05..CmoDat020 A ON A.OP = B.Op
			WHERE A.[Clave Maquina] = @ClaveMaquina AND A.Estatus IN ('P','E') AND Imprime = 1;
		END
	END
	-- BuscaFechaTermino (ClaveMaquina)
	ELSE IF @Opcion = 30
	BEGIN
		-- OBTENER FECHA DE USUARIO (ZONAERP)
		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;
		SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;

		DECLARE @tmpF VARCHAR(30);

		-- Consulta Fecha de Término de la última producción por Máquina
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT @tmpF = FORMAT(MAX(A.fechatermino), @FormatoFecha)
            FROM Cajas01..CmoDat020 A 
            WHERE A.imprime = 1 AND A.estatus IN('E','P') AND NOT A.FechaTermino IS NULL AND A.[clave maquina] = @ClaveMaquina
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT @tmpF = FORMAT(MAX(A.fechatermino), @FormatoFecha)
            FROM Cajas02..CmoDat020 A 
            WHERE A.imprime = 1 AND A.estatus IN('E','P') AND NOT A.FechaTermino IS NULL AND A.[clave maquina] = @ClaveMaquina
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT @tmpF = FORMAT(MAX(A.fechatermino), @FormatoFecha)
            FROM Cajas05..CmoDat020 A 
            WHERE A.imprime = 1 AND A.estatus IN('E','P') AND NOT A.FechaTermino IS NULL AND A.[clave maquina] = @ClaveMaquina
		END

		SELECT ISNULL(@tmpF, @FechaSis) AS BuscaFechaTermino
	END
	-- BuscaArticuloProceso (@Proceso, @ClaveArticulo)
	ELSE IF @Opcion = 31
	BEGIN
		-- SI EXISTE REGISTRO, ENTONCES BuscaArticuloProceso = FALSE
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT A.[clave maquina] AS ClaveMaquina, A.Cantidad 
			FROM Cajas01..CmoDat020 A 
			JOIN Cajas01..CmoDat011 B ON A.OP = B.OP 
			JOIN Cajas01..CmoCat011 C ON C.[clave maquina]= A.[clave maquina] 
			WHERE A.Imprime = 1 AND C.tProceso = @Proceso AND B.[Clave Articulo] = @ClaveArticulo AND A.Estatus IN('P','E');
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT A.[clave maquina] AS ClaveMaquina, A.Cantidad 
			FROM Cajas02..CmoDat020 A 
			JOIN Cajas02..CmoDat011 B ON A.OP = B.OP 
			JOIN Cajas02..CmoCat011 C ON C.[clave maquina]= A.[clave maquina] 
			WHERE A.Imprime = 1 AND C.tProceso = @Proceso AND B.[Clave Articulo] = @ClaveArticulo AND A.Estatus IN('P','E');
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT A.[clave maquina] AS ClaveMaquina, A.Cantidad 
			FROM Cajas05..CmoDat020 A 
			JOIN Cajas05..CmoDat011 B ON A.OP = B.OP 
			JOIN Cajas05..CmoCat011 C ON C.[clave maquina]= A.[clave maquina] 
			WHERE A.Imprime = 1 AND C.tProceso = @Proceso AND B.[Clave Articulo] = @ClaveArticulo AND A.Estatus IN('P','E');
		END
	END
	-- VALIDA FACTOR 
	ELSE IF @Opcion = 32
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT Factor
			FROM Cajas01..CmoCat072
			WHERE Status = 0 AND @Cantidad BETWEEN PzaMin AND PzaMax;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT Factor
			FROM Cajas02..CmoCat072
			WHERE Status = 0 AND @Cantidad BETWEEN PzaMin AND PzaMax;
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT Factor
			FROM Cajas05..CmoCat072
			WHERE Status = 0 AND @Cantidad BETWEEN PzaMin AND PzaMax;
		END
	END
	-- BalanceMaquinas (@Proceso, @ClaveMaquina, @lFechaProg, @MaqNoProg @Cap009TD_001, @Area, @lSuaje) RETURN lMaquina, lFechaCarga, BalanceMaquinas tipo bit
	ELSE IF @Opcion = 33
	BEGIN
		SELECT @Completado = 0;
		-- OBTENER FECHA DE USUARIO (ZONAERP)
		INSERT INTO @tmp (Fecha)
		EXEC dbo.FCAPROG017MWSPC3 @Opcion = 0, @ZonaERP = @ZonaERP, @UsuarioERP = @UsuarioERP;
		SELECT TOP 1 @FechaSis = ISNULL(Fecha, FORMAT(GETDATE(), @FormatoFecha)) FROM @tmp;

		DECLARE @MaqFactibles CMOCAT011TD_001;
		DECLARE @lMaquinaProg VARCHAR(10), @pArea REAL, @lMenorCarga SMALLDATETIME;

		IF EXISTS(SELECT 1 FROM @Cap009TD_001)
		BEGIN
			-- Consulta Máquinas Factibles de Producción de Acuerdo a Capacidad de Largo y Ancho de Máquina
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				SELECT TOP 1 @lMaquina = [Clave Maquina]
				FROM Cajas01..CmoCat011
				WHERE Status = 0 
					AND [Tipo Maquina] = 'IM' 
					AND Tproceso = @Proceso
					AND [Clave Maquina] NOT IN (SELECT ClaveMaquina FROM @Cap009TD_001);
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				SELECT TOP 1 @lMaquina = [Clave Maquina]
				FROM Cajas02..CmoCat011
				WHERE Status = 0 
					AND [Tipo Maquina] = 'IM' 
					AND Tproceso = @Proceso 
					AND [Clave Maquina] NOT IN (SELECT ClaveMaquina FROM @Cap009TD_001);
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				SELECT TOP 1 @lMaquina = [Clave Maquina]
				FROM Cajas05..CmoCat011
				WHERE Status = 0 
					AND [Tipo Maquina] = 'IM' 
					AND Tproceso = @Proceso 
					AND [Clave Maquina] NOT IN (SELECT ClaveMaquina FROM @Cap009TD_001);
			END
		END


		DECLARE @lTurnos AS TABLE (
			ID INT IDENTITY(1,1),
			value01/*ClaveMaquina*/ VARCHAR(10), 
			value02/*Tno1*/ INT, value03/*InicioPrimero*/ VARCHAR(5), value04/*FinPrimero*/ VARCHAR(5), 
			value05/*Tno2*/ INT, value06/*InicioSegundo*/ VARCHAR(5), value07/*FinSegundo*/ VARCHAR(5), 
			value08/*Tno3*/ INT, value09/*InicioTercero*/ VARCHAR(5), value10/*FinTercero*/ VARCHAR(5), 
			value11/*Activo1*/ BIT, value12/*Activo2*/ BIT, value13/*Activo3*/ BIT

			--InicioPrimero VARCHAR(5), InicioSegundo VARCHAR(5), InicioTercero VARCHAR(5), ClaveMaquina VARCHAR(10),
			--FinPrimero VARCHAR(5), FinSegundo VARCHAR(5), FinTercero VARCHAR(5),
			--Activo1 BIT, Activo2 BIT, Activo3 BIT, Tno1 INT, Tno2 INT, Tno3 INT,			
		)

		-- Consulta turnos activos de Máquinas
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @lTurnos (value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13)
			SELECT ISNULL(A.ClaveMaquina, ''), 
				DATEDIFF(n, A.InicioPrimero, A.FinPrimero) AS Tno1, A.InicioPrimero, A.FinPrimero,
				DATEDIFF(n, A.InicioSegundo, A.FinSegundo) AS Tno2, A.InicioSegundo, A.FinSegundo,
				(1440 - CASE WHEN DATEDIFF(n, A.InicioTercero, A.FinTercero) < 0
					THEN DATEDIFF(n, A.FinTercero, A.InicioTercero)
					ELSE DATEDIFF(n, A.InicioTercero, A.FinTercero) 
				END) AS Tno3, A.InicioTercero, A.FinTercero,
				A.ActivoPrimero, A.ActivoSegundo, A.ActivoTercero
				--A.InicioPrimero, A.InicioSegundo, A.InicioTercero, A.ClaveMaquina,
				--A.FinPrimero, A.FinSegundo, A.FinTercero,
				--A.ActivoPrimero AS Activo1,
				--A.ActivoSegundo AS Activo2,
				--A.ActivoTercero AS Activo3,
				--DATEDIFF(n, A.InicioPrimero, A.FinPrimero) AS Tno1,
				--DATEDIFF(n, A.InicioSegundo, A.FinSegundo) AS Tno2,
				--(1440 - CASE WHEN DATEDIFF(n, A.InicioTercero, A.FinTercero) < 0
				--	THEN DATEDIFF(n, A.FinTercero, A.InicioTercero)
				--	ELSE DATEDIFF(n, A.InicioTercero, A.FinTercero) 
				--END) AS Tno3
			FROM CplCat002 A
			JOIN Cajas01..CmoCat011 B ON A.ClaveMaquina = B.[Clave Maquina]
			INNER JOIN (
				SELECT Z.[Clave Maquina]
				FROM Cajas01..CmoDat018 Z
				WHERE Z.Estatus = 0 AND Z.[Clave Proceso] = @TPrepa
			) W ON W.[Clave Maquina] = B.[Clave Maquina]
			WHERE B.Status = 0 AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES') AND B.Tproceso = @Proceso
				AND B.[Clave Maquina] NOT IN (SELECT ClaveMaquina FROM @Cap009TD_001)
				AND (A.ActivoPrimero = 1 OR A.ActivoSegundo = 1 OR A.ActivoTercero = 1)
			ORDER BY A.ClaveMaquina
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @lTurnos (value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13)
			SELECT ISNULL(A.ClaveMaquina, ''), 
				DATEDIFF(n, A.InicioPrimero, A.FinPrimero) AS Tno1, A.InicioPrimero, A.FinPrimero,
				DATEDIFF(n, A.InicioSegundo, A.FinSegundo) AS Tno2, A.InicioSegundo, A.FinSegundo,
				(1440 - CASE WHEN DATEDIFF(n, A.InicioTercero, A.FinTercero) < 0
					THEN DATEDIFF(n, A.FinTercero, A.InicioTercero)
					ELSE DATEDIFF(n, A.InicioTercero, A.FinTercero) 
				END) AS Tno3, A.InicioTercero, A.FinTercero,
				A.ActivoPrimero, A.ActivoSegundo, A.ActivoTercero
			FROM CplCat002 A
			JOIN Cajas02..CmoCat011 B ON A.ClaveMaquina = B.[Clave Maquina]
			INNER JOIN (
				SELECT Z.[Clave Maquina]
				FROM Cajas02..CmoDat018 Z
				WHERE Z.Estatus = 0 AND Z.[Clave Proceso] = @TPrepa
			) W ON W.[Clave Maquina] = B.[Clave Maquina]
			WHERE B.Status = 0 AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES') AND B.Tproceso = @Proceso
				AND B.[Clave Maquina] NOT IN (SELECT ClaveMaquina FROM @Cap009TD_001)
				AND (A.ActivoPrimero = 1 OR A.ActivoSegundo = 1 OR A.ActivoTercero = 1)
			ORDER BY A.ClaveMaquina
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @lTurnos (value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13)
			SELECT ISNULL(A.ClaveMaquina, ''), 
				DATEDIFF(n, A.InicioPrimero, A.FinPrimero) AS Tno1, A.InicioPrimero, A.FinPrimero,
				DATEDIFF(n, A.InicioSegundo, A.FinSegundo) AS Tno2, A.InicioSegundo, A.FinSegundo,
				(1440 - CASE WHEN DATEDIFF(n, A.InicioTercero, A.FinTercero) < 0
					THEN DATEDIFF(n, A.FinTercero, A.InicioTercero)
					ELSE DATEDIFF(n, A.InicioTercero, A.FinTercero) 
				END) AS Tno3, A.InicioTercero, A.FinTercero,
				A.ActivoPrimero, A.ActivoSegundo, A.ActivoTercero
			FROM CplCat002 A
			JOIN Cajas05..CmoCat011 B ON A.ClaveMaquina = B.[Clave Maquina]
			INNER JOIN (
				SELECT Z.[Clave Maquina]
				FROM Cajas05..CmoDat018 Z
				WHERE Z.Estatus = 0 AND Z.[Clave Proceso] = @TPrepa
			) W ON W.[Clave Maquina] = B.[Clave Maquina]
			WHERE B.Status = 0 AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES') AND B.Tproceso = @Proceso
				AND B.[Clave Maquina] NOT IN (SELECT ClaveMaquina FROM @Cap009TD_001)
				AND (A.ActivoPrimero = 1 OR A.ActivoSegundo = 1 OR A.ActivoTercero = 1)
			ORDER BY A.ClaveMaquina
		END

		DECLARE @IDsMaqProg AS TABLE (ID INT);
		DECLARE @ID INT, @pClaveMaquina VARCHAR(10);
		DECLARE @MaquinasProgramar AS TABLE (ID INT IDENTITY(1,1), ClaveMaquina VARCHAR(10), Area REAL)
		-- Consulta que alguna maquina tenga el mismo suaje que el registiro ***  Nuevo   ***
		IF ISNULL(@Area, 0) > 0
		BEGIN
			IF NOT EXISTS(SELECT 1 FROM @lTurnos)
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO @MaquinasProgramar (ClaveMaquina)
					SELECT DISTINCT B.[Clave Maquina]
					FROM Cajas01..CmoDat011 A
					JOIN Cajas01..CmoDat020 B ON A.OP = B.OP
					WHERE B.Imprime = 1 AND B.Estatus IN('E', 'P') AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES')
					GROUP BY B.[Clave Maquina], A.[Largo desarrollo], A.[Ancho Desarrollo]
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					INSERT INTO @MaquinasProgramar (ClaveMaquina)
					SELECT DISTINCT B.[Clave Maquina]
					FROM Cajas02..CmoDat011 A
					JOIN Cajas02..CmoDat020 B ON A.OP = B.OP
					WHERE B.Imprime = 1 AND B.Estatus IN('E', 'P') AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES')
					GROUP BY B.[Clave Maquina], A.[Largo desarrollo], A.[Ancho Desarrollo]
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO @MaquinasProgramar (ClaveMaquina)
					SELECT DISTINCT B.[Clave Maquina]
					FROM Cajas05..CmoDat011 A
					JOIN Cajas05..CmoDat020 B ON A.OP = B.OP
					WHERE B.Imprime = 1 AND B.Estatus IN('E', 'P') AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES')
					GROUP BY B.[Clave Maquina], A.[Largo desarrollo], A.[Ancho Desarrollo]
				END
			END ELSE
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					INSERT INTO @MaquinasProgramar (ClaveMaquina)
					SELECT DISTINCT B.[Clave Maquina]
					FROM Cajas01..CmoDat011 A
					JOIN Cajas01..CmoDat020 B ON A.OP = B.OP
					WHERE B.Imprime = 1 AND B.Estatus IN('E', 'P') AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES')
						AND B.[Clave Maquina] IN (SELECT value01 FROM @lTurnos)
					GROUP BY B.[Clave Maquina], A.[Largo desarrollo], A.[Ancho Desarrollo]
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					INSERT INTO @MaquinasProgramar (ClaveMaquina)
					SELECT DISTINCT B.[Clave Maquina]
					FROM Cajas02..CmoDat011 A
					JOIN Cajas02..CmoDat020 B ON A.OP = B.OP
					WHERE B.Imprime = 1 AND B.Estatus IN('E', 'P') AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES')
						AND B.[Clave Maquina] IN (SELECT value01 FROM @lTurnos)
					GROUP BY B.[Clave Maquina], A.[Largo desarrollo], A.[Ancho Desarrollo]
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					INSERT INTO @MaquinasProgramar (ClaveMaquina)
					SELECT DISTINCT B.[Clave Maquina]
					FROM Cajas05..CmoDat011 A
					JOIN Cajas05..CmoDat020 B ON A.OP = B.OP
					WHERE B.Imprime = 1 AND B.Estatus IN('E', 'P') AND B.[Tipo Maquina] IN ('IM', 'AC', 'ES')
						AND B.[Clave Maquina] IN (SELECT value01 FROM @lTurnos)
					GROUP BY B.[Clave Maquina], A.[Largo desarrollo], A.[Ancho Desarrollo]
				END
			END

			WHILE EXISTS(SELECT 1 FROM @MaquinasProgramar WHERE ID NOT IN (SELECT ID FROM @IDsMaqProg))
			BEGIN
				SELECT TOP 1 @ID = ID, @pClaveMaquina = ClaveMaquina
				FROM @MaquinasProgramar;

				DECLARE @AnchosMaquina AS TABLE (ID INT IDENTITY(1,1), Orden INT, Area REAL);
				DECLARE @IDAnchosMaquina AS TABLE(ID INT);
				DECLARE @IDAnchoMaquina INT;

				INSERT INTO @AnchosMaquina (Orden, Area)
				SELECT ISNULL(MAX(A.orden),0) AS Orden, B.[Largo Desarrollo] * B.[Ancho Desarrollo] AS Area 
				FROM Cajas01..CmoDat020 A 
				JOIN Cajas01..CmoDat011 B ON A.op = B.op 
				WHERE A.[Clave Maquina] IN(@pClaveMaquina) AND A.imprime = 1 AND A.Estatus IN('P','E') 
				GROUP BY A.[Clave Maquina], B.[Largo Desarrollo], B.[Ancho Desarrollo] 
				ORDER BY Orden;

				WHILE EXISTS(SELECT 1 FROM @AnchosMaquina WHERE ID NOT IN (SELECT ID FROM @IDAnchosMaquina))
				BEGIN
					SELECT TOP 1 @IDAnchoMaquina = ID, @pArea = Area
					FROM @AnchosMaquina;

					IF @Area = @pArea
					BEGIN
						SELECT @lMaquinaProg = @pClaveMaquina;
						DELETE FROM @AnchosMaquina;
					END

					INSERT INTO @IDAnchosMaquina (ID)
					VALUES (@IDAnchoMaquina);
				END
				
				INSERT INTO @IDsMaqProg
				VALUES (@ID);
			END

			IF ISNULL(@lMaquinaProg, '') != ''
			BEGIN
				IF ISNULL(@ZonaERP, '') = '01'
				BEGIN
					SELECT @lMenorCarga = MAX(A.FechaTermino)
					FROM Cajas01..CmoDat020 A 
					JOIN Cajas01..cmocat011 B on A.[clave maquina] = B.[clave maquina] 
					WHERE B.Status=0 AND A.imprime = 1 AND A.estatus IN('E','P') AND A.[tipo maquina] IN('IM','AC','ES') 
						AND NOT A.FechaTermino IS NULL AND b.tproceso = @Proceso AND B.[clave maquina] IN(@lMaquinaProg)
					GROUP BY A.[clave maquina], A.fechatermino
					ORDER BY A.fechatermino ASC;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02'
				BEGIN
					SELECT @lMenorCarga = MAX(A.FechaTermino)
					FROM Cajas02..CmoDat020 A 
					JOIN Cajas02..cmocat011 B on A.[clave maquina] = B.[clave maquina] 
					WHERE B.Status=0 AND A.imprime = 1 AND A.estatus IN('E','P') AND A.[tipo maquina] IN('IM','AC','ES') 
						AND NOT A.FechaTermino IS NULL AND b.tproceso = @Proceso AND B.[clave maquina] IN(@lMaquinaProg)
					GROUP BY A.[clave maquina], A.fechatermino
					ORDER BY A.fechatermino ASC;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05'
				BEGIN
					SELECT @lMenorCarga = MAX(A.FechaTermino)
					FROM Cajas05..CmoDat020 A 
					JOIN Cajas05..cmocat011 B on A.[clave maquina] = B.[clave maquina] 
					WHERE B.Status=0 AND A.imprime = 1 AND A.estatus IN('E','P') AND A.[tipo maquina] IN('IM','AC','ES') 
						AND NOT A.FechaTermino IS NULL AND b.tproceso = @Proceso AND B.[clave maquina] IN(@lMaquinaProg)
					GROUP BY A.[clave maquina], A.fechatermino
					ORDER BY A.fechatermino ASC;
				END
			END ELSE
			BEGIN
				GOTO BuscaMenorCarga;
			END

		END ELSE
		BEGIN
BuscaMenorCarga:
			DECLARE @lMaqHor AS TABLE (ID INT IDENTITY(1,1), ClaveMaquina VARCHAR(10), FechaTermino SMALLDATETIME);
			-- Consulta Fecha de Término de la última producción por Máquina
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				INSERT INTO @lMaqHor (ClaveMaquina, FechaTermino)
				SELECT A.[clave maquina], MAX(A.fechatermino) AS FechaTermino 
				FROM Cajas01..CmoDat020 A 
				JOIN Cajas01..CmoCat011 B ON A.[clave maquina] = B.[clave maquina] 
				WHERE B.Status = 0 AND A.imprime =1 AND A.estatus IN('E','P') AND A.[tipo maquina] IN('IM','AC','ES') 
				AND NOT A.FechaTermino IS NULL AND b.tproceso = @Proceso
					AND B.[clave maquina] IN(SELECT value01 FROM @lTurnos)
				GROUP BY A.[clave maquina], A.fechatermino 
				ORDER BY A.fechatermino ASC;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				INSERT INTO @lMaqHor (ClaveMaquina, FechaTermino)
				SELECT A.[clave maquina], MAX(A.fechatermino) AS FechaTermino 
				FROM Cajas02..CmoDat020 A 
				JOIN Cajas02..CmoCat011 B ON A.[clave maquina] = B.[clave maquina] 
				WHERE B.Status = 0 AND A.imprime =1 AND A.estatus IN('E','P') AND A.[tipo maquina] IN('IM','AC','ES') 
				AND NOT A.FechaTermino IS NULL AND b.tproceso = @Proceso
					AND B.[clave maquina] IN(SELECT value01 FROM @lTurnos)
				GROUP BY A.[clave maquina], A.fechatermino 
				ORDER BY A.fechatermino ASC;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				INSERT INTO @lMaqHor (ClaveMaquina, FechaTermino)
				SELECT A.[clave maquina], MAX(A.fechatermino) AS FechaTermino 
				FROM Cajas05..CmoDat020 A 
				JOIN Cajas05..CmoCat011 B ON A.[clave maquina] = B.[clave maquina] 
				WHERE B.Status = 0 AND A.imprime =1 AND A.estatus IN('E','P') AND A.[tipo maquina] IN('IM','AC','ES') 
				AND NOT A.FechaTermino IS NULL AND b.tproceso = @Proceso
					AND B.[clave maquina] IN(SELECT value01 FROM @lTurnos)
				GROUP BY A.[clave maquina], A.fechatermino 
				ORDER BY A.fechatermino ASC;
			END
		END

		DECLARE @lVeces INT = 0, @lRepite BIT = 0;

		DECLARE @IDTurnos INT,
			@value01/*ClaveMaquina*/ VARCHAR(10), 
			@value02/*Tno1*/ INT, @value03/*InicioPrimero*/ VARCHAR(5), @value04/*FinPrimero*/ VARCHAR(5), 
			@value05/*Tno2*/ INT, @value06/*InicioSegundo*/ VARCHAR(5), @value07/*FinSegundo*/ VARCHAR(5), 
			@value08/*Tno3*/ INT, @value09/*InicioTercero*/ VARCHAR(5), @value10/*FinTercero*/ VARCHAR(5), 
			@value11/*Activo1*/ BIT, @value12/*Activo2*/ BIT, @value13/*Activo3*/ BIT;
		DECLARE @IDsTurnos AS TABLE (ID INT);

		IF ISNULL(@lMaquinaProg, '') != ''
		BEGIN
			DECLARE @Bucle BIT = 1;

			WHILE ISNULL(@Bucle, 0) = 1
			BEGIN
				SELECT @lVeces = @lVeces + 1;

				WHILE EXISTS(SELECT 1 FROM @lTurnos WHERE ID NOT IN (SELECT ID FROM @IDsTurnos))
				BEGIN
					SELECT @lRepite = 0;

					SELECT TOP 1 @IDTurnos = ID, @value01 = value01, @value02 = value02, @value03 = value03,
						@value04 = value04, @value05 = value05, @value06 = value06, @value07 = value07,
						@value08 = value08, @value09 = value09, @value10 = value10, @value11 = value11,
						@value12 = value12, @value13 = value13
					FROM @lTurnos
					WHERE ID NOT IN (SELECT ID FROM @IDsTurnos);

					-- Compara las Claves de Máquina
					IF ISNULL(@value01, '') = ISNULL(@lMaquinaProg, '')
					BEGIN
						-- Valida Hora inicio y Fin de Primer Turno
						IF FORMAT(@lMenorCarga, 'HH:mm') >= @value03 AND FORMAT(@lMenorCarga, 'HH:mm') <= @value04
						BEGIN
							IF ISNULL(@value11, 0) = 1 -- Verifica turno1 Activo
							BEGIN
								-- Programa en esta máquina
								SELECT @lRepite = 0;
							END ELSE
							BEGIN
								-- Busca de nuevo la máquina con menos carga
								SELECT @lRepite = 1, 
									@lMenorCarga = FORMAT(@lMenorCarga, 'yyyyMMdd') + ' ' + @value04;
							END
							GOTO SalirWhileTurnos;
						END
						IF FORMAT(@lMenorCarga, 'HH:mm') >= @value06 AND FORMAT(@lMenorCarga, 'HH:mm') <= @value07
						BEGIN
							IF ISNULL(@value12, 0) = 1 -- Verifica turno2 Activo
							BEGIN
								-- Programa en esta máquina
								SELECT @lRepite = 0;
							END ELSE
							BEGIN
								-- Busca de nuevo la máquina con menos carga
								SELECT @lRepite = 1,
									@lMenorCarga = FORMAT(@lMenorCarga, 'yyyyMMdd') + ' ' + @value07;
							END
							GOTO SalirWhileTurnos;
						END
						IF FORMAT(@lMenorCarga, 'HH:mm') >= @value09 OR FORMAT(@lMenorCarga, 'HH:mm') <= @value10
						BEGIN
							IF ISNULL(@value13, 0) = 1 -- Verifica turno2 Activo
							BEGIN
								-- Programa en esta máquina
								SELECT @lRepite = 0;
							END ELSE
							BEGIN
								-- Busca de nuevo la máquina con menos carga
								SELECT @lRepite = 1,
									@lMenorCarga = FORMAT(DATEADD(DAY, 1, @lMenorCarga), 'yyyyMMdd') + ' ' + @value10;
							END
							GOTO SalirWhileTurnos;
						END
					END

					INSERT INTO @IDsTurnos (ID)
					VALUES (@IDTurnos);
				END

SalirWhileTurnos:
				IF ISNULL(@lRepite, 0) = 0
				BEGIN
					-- Valida si la máquina esta en paro en el tiempo a programar
					SELECT TOP 1 @lMenorCarga = Termino, @lRepite = 1
					FROM CplCat001
                    WHERE Clavemaquina = @lMaquinaProg 
						AND @lMenorCarga >= inicio AND @lMenorCarga < termino 
						AND Status = 0 
						AND TipoTiempo = 'PM';
				END

				-- @lMaqHor > 0
				DECLARE @lMaqHorCount INT;
				SELECT @lMaqHorCount = COUNT(*) FROM @lMaqHor;

				IF ISNULL(@lRepite, 0) = 1 AND @lMaqHorCount > 1
				BEGIN
					IF ISNULL(@lVeces, 0) = 100
					BEGIN
						-- Hace hasta 100 intentos de distribuir carga
						SELECT @lMaquinaProg = '', @Bucle = 0;
					END
					-- Establece la nueva fecha/hora de término de máquina seleccionada
					UPDATE @lMaqHor SET
						FechaTermino = @lMenorCarga
					WHERE ID = 1;

					IF ISNULL(@lSuaje, '') != ''
					BEGIN
						SELECT @Bucle = 0;
					END ELSE
					BEGIN
						-- @lMaqHorCount = J
						WHILE EXISTS(SELECT 1 FROM @lMaqHor)
						BEGIN
							-- Busca la máquina con menor carga de producción
							DECLARE @tMaqHorID INT, @tMaqHorCveMaq VARCHAR(10), @tMaqHorFechaTermino SMALLDATETIME;

							SELECT TOP 1 @tMaqHorID = ID, @tMaqHorCveMaq = ClaveMaquina, @tMaqHorFechaTermino = FechaTermino
							FROM @lMaqHor;

							IF @lMenorCarga > @tMaqHorFechaTermino
							BEGIN
								SELECT @lMaquinaProg = RTRIM(@tMaqHorCveMaq), @lMenorCarga = @tMaqHorFechaTermino;
							END

							DELETE FROM @lMaqHor WHERE ID = @tMaqHorID;
						END
					END
				END ELSE
				BEGIN
					SELECT @Bucle = 0;
				END
			END
		END

		IF ISNULL(@lMaquinaProg, '') = ''
		BEGIN
			SELECT @lMenorCarga = CONVERT(SMALLDATETIME, @FechaSis)
		END ELSE
		BEGIN
			SELECT @lMaquina = RTRIM(ISNULL(@lMaquinaProg, ''))
		END

		SELECT @Completado = 1;
		-- RETURN lMaquina, lFechaCarga, BalanceMaquinas tipo bit
		SELECT @lMaquina AS lMaquina, @lMenorCarga AS lFechaCarga, @Completado AS Completado;
	END
SALIDA:
END

GO


