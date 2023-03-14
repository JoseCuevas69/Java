USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPA8]    Script Date: 20/10/2022 08:37:00 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPA8]
	@pZonaERP VARCHAR(2)				= NULL
	, @pCuchillas3 BIT					= NULL
	, @IdSesion INT						= NULL
AS
BEGIN
	SET NOCOUNT ON;
	-- =======================================================================================================================
	-- VARIABLES
	DECLARE @pMsj VARCHAR(MAX) = '', @pFlag1 BIT, @pRefileMax REAL, @pRefileMin REAL, @pDiasAdelanto SMALLINT
		, @pFechaLimite DATE, @pTodosAnchos BIT, @pAnchoCalculo REAL, @pLargoMinimo REAL, @pScoresMax INT
		, @pID1 INT, @pRESISTENCIA VARCHAR(12), @pPRIORIDAD INT, @pSENCILLO VARCHAR(1)
		, @pValue01Ancho REAL, @pValue02Ancho REAL, @pValue03Ancho REAL

	DECLARE @dtsTAnchosUsar AS TABLE ( ID INT IDENTITY(1,1), Ancho REAL, Usar BIT );

	DECLARE @AnchoPapel AS TABLE ( ID INT, value01 REAL, value02 REAL, value03 REAL );
	DECLARE @AnchoPapelLeidos AS TABLE ( ID INT );
	DECLARE @CPLDAT008 AS TABLE (Ide INT IDENTITY(1,1), [ID] INT,
		[OP1] VARCHAR(10), [Multiplos1] DECIMAL(4,2), [Ancho1] REAL,
		[OP2] VARCHAR(10), [Multiplos2] DECIMAL(4,2), [Ancho2] REAL,
		[OP3] VARCHAR(10), [Multiplos3] DECIMAL(4,2), [Ancho3] REAL,
		[Ancho Total] REAL, [Ancho Papel] REAL, [Refile] REAL,
		[Lam1] INT, [Lam2] INT, [Lam3] INT, [Metros Lineales] INT,
		[Fecha1] SMALLDATETIME, [Fecha2] SMALLDATETIME, [Fecha3] SMALLDATETIME,
		[Largo1] REAL, [Largo2] REAL, [Largo3] REAL,
		[Resistencia] VARCHAR(12), [Flauta] VARCHAR(3),
		[Piezas1] INT, [Piezas2] INT, [Piezas3] INT,
		[Empate] VARCHAR(25), [Tranf] BIT
	);

	DECLARE @dtsDatosOps AS TABLE (
		ID INT IDENTITY(1,1), OrdenProduccion VARCHAR(10), Cliente VARCHAR(100), ClaveArticulo VARCHAR(9), Articulo VARCHAR(50), Cantidad INT, FechaEntrega DATE
		, Programadas INT, Largo REAL, Ancho REAL, Piezas REAL/*DECIMAL(4, 2)*/, Resistencia VARCHAR(12), Faltan INT, Hojas INT, Tkg INT, TM2 INT
		, Parcial VARCHAR(10), Lamina VARCHAR(10), Flauta VARCHAR(10), Mas SMALLINT, Prior BIT, Utilizar BIT, Refile BIT, NScores INT, ConScore BIT, Cproceso VARCHAR(10)
	);
	DECLARE @Opp AS TABLE (
		ID INT IDENTITY(1,1), value01 VARCHAR(10), value02 REAL, value03 REAL, value04 REAL, value05 VARCHAR(10), value06 DATE
		, value07 VARCHAR(10), value08 REAL/*DECIMAL(4, 2)*/, value09 BIT, value10 INT, value11 BIT, value12 INT, value13 INT
	);
	DECLARE @OppEnvio CPLDAT005TD_001;
	-- =======================================================================================================================

	-- OBTENER PARAMETROS DE PROGRAMACIÓN
	SELECT @pRefileMax = [Refile Maximo], @pRefileMin = [Refile Minimo], @pDiasAdelanto = [Dias Adelanto]
		, @pTodosAnchos = [Todos Anchos], @pAnchoCalculo = [Ancho Calculo], @pLargoMinimo = [Largo Minimo], @pScoresMax = Scores
	FROM CPLDAT006
	WHERE Id = 1;

	-- CALCULOS A PARAMETROS
	SELECT @pRefileMax = @pRefileMax / 10, @pRefileMin = @pRefileMin / 10, @pFechaLimite = DATEADD(DAY, @pDiasAdelanto, GETDATE());

	-- OBTENER ANCHOS A UTILIZAR
	INSERT INTO @dtsTAnchosUsar (Ancho, Usar)
	SELECT Ancho, Usar
	FROM CPLDAT003 
	WHERE Usar = 1;

	-- SETEAR ANCHO PAPEL
	INSERT INTO @AnchoPapel (ID, value01, value02, value03)
	SELECT ID, -1, -1, -1
	FROM @dtsTAnchosUsar;

	---- PENDIENTE DESCOMENTAR DELETE'S PARA LA FUNCIONALIDAD FINAL
	 DELETE FROM CPLDAT008 -- ARREGLOS POSIBLES
	 DELETE FROM CPLDAT005 -- OP ANALIZANDO

	-- EN CASO DE NO CONTENER REGISTROS @dtsTAnchosUsar, INSERTAR 1 EN @AnchoPapel
	IF NOT EXISTS(SELECT 1 FROM @AnchoPapel)
	BEGIN
		INSERT INTO @AnchoPapel (ID, value01, value02, value03) 
		SELECT 1, -1, -1, -1;
	END

	-- PREGUNTAR POR TODOS LO ANCHOS
	IF @pTodosAnchos = 0
	BEGIN
		UPDATE @AnchoPapel SET value01 = @pAnchoCalculo WHERE ID = 1;
	END
	ELSE
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM @dtsTAnchosUsar)
		BEGIN
			SELECT @pFlag1 = 1;
			GOTO SALIR_CALCULAR_PROGRAMAS;
		END

		-- CARGAR ANCHOS DE PROGRAMACION
		UPDATE @AnchoPapel 
			SET value01 = CASE WHEN A.value01 != B.Ancho OR B.Usar = 1 THEN B.Ancho ELSE 0 END
		FROM @AnchoPapel A
		JOIN @dtsTAnchosUsar B ON A.ID = B.ID
	END

	-- ELIMINAR VALORES EN CERO
	DELETE FROM @AnchoPapel WHERE ISNULL(value01, 0) = 0

	-- Iniciar Datos de OPs
	INSERT INTO @dtsDatosOps (
		OrdenProduccion, Cliente, ClaveArticulo, Articulo, Cantidad, FechaEntrega, Programadas, Largo, Ancho, Piezas, Resistencia, 
		Faltan, Hojas, Tkg, TM2, Parcial, Lamina, Flauta, Mas, Prior, Utilizar, Refile, NScores, ConScore, Cproceso
	)
	SELECT [Orden Produccion], Cliente, [Clave Articulo], Articulo, Cantidad, [Fecha Entrega], Programadas, Largo, Ancho, Piezas, Resistencia, 
		Faltan, Hojas, Tkg, TM2, Parcial, Lamina, Flauta, Mas, Prior, Utilizar, Refile, NScores, ConScore, Cproceso
	FROM CPLDAT004
	WHERE Utilizar = 1;

	IF NOT EXISTS(SELECT 1 FROM @dtsDatosOps)
	BEGIN
		SELECT @pMsj = 'DEFINIR OPs ANALIZADAS';
		GOTO SALIR_CALCULAR_PROGRAMAS; -- SALIR CALCULAR PROGRAMAS
	END

	IF ISNULL(@pFlag1, 0) = 0
	BEGIN
		-- LEER OPs PARTICIPANTES EN LA PROGRAMACION
		SELECT TOP 1 @pRESISTENCIA = Resistencia
		FROM @dtsDatosOps

		-- PENDIENTE DESCOMENTAR INSERT
		INSERT INTO CplDat005 (
			[Orden Produccion], [Clave Articulo], [Cliente], [Articulo], [Fecha Entrega], [Resistencia], [Ancho], [Largo], [Piezas], [Cantidad], 
			[Faltan], [TKg], [Hojas], [Lamina], [Parcial], [Flauta], [NScores], [Mas], [Utilizar], [Hojas Orig], [Refile], [Prior], ConScore
		)
		SELECT OrdenProduccion, ClaveArticulo, Cliente, Articulo, FechaEntrega, Resistencia, Ancho, Largo, Piezas, Cantidad,
			Faltan, Tkg, Hojas, Lamina, Parcial, Flauta, NScores, Mas, Utilizar, Hojas, Refile, Prior, ConScore
		FROM @dtsDatosOps
		WHERE FechaEntrega < @pFechaLimite OR Utilizar = 1;

		INSERT INTO @Opp (value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13)
		SELECT OrdenProduccion, Ancho, Largo, (Hojas * (1.00 + (Mas / 100.00))), Lamina, FechaEntrega, Flauta, Piezas, Refile, 0, Prior, NScores, NULL
		FROM @dtsDatosOps
		WHERE FechaEntrega < @pFechaLimite OR Utilizar = 1;

		INSERT INTO @OppEnvio(ID, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13)
		SELECT ID, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13
		FROM @Opp;

		-- SI EXISTE UNO CON PRIORIDAD, ENTONCES MARCAR LA PRIODIDAD EN 1
		SELECT @pPRIORIDAD = CASE WHEN EXISTS(SELECT 1 FROM @dtsDatosOps WHERE Prior = 1) THEN 1 ELSE 0 END;

		-- NOANCHOS
		-- ACTUALIZAR VALORES DE ANCHOPAPEL
		UPDATE @AnchoPapel 
			SET value02 = value01 - @pRefileMin,
				value03 = value01 - (@pRefileMin / 2)

		-- VERIFICAR SENCILLO
		SELECT @pSENCILLO = CASE WHEN LEN(value07) = 1 THEN 'S' END
		FROM @OppEnvio
		WHERE ID = 1

		--SELECT * FROM @OppEnvio

		SELECT @pID1 = NULL
		-- INICIA SECUENCIA DE PROGRAMACION OPs EN DOS POSICIONES
		-- COMBINACION DE PEDIDOS
		WHILE EXISTS(SELECT 1 FROM @AnchoPapel WHERE ID NOT IN (SELECT ID FROM @AnchoPapelLeidos))
		BEGIN
			DECLARE @Cm AS TABLE (
				ID INT, value01 VARCHAR(10), value02 REAL, value03 REAL, value04 VARCHAR(10), value05 INT, value06 REAL
				, value07 REAL, value08 REAL, value09 REAL, value10 REAL, value11 REAL, value12 DATE, value13 DATE
				, value14 REAL, value15 REAL/*DECIMAL(4, 2)*/, value16 VARCHAR(10), value17 REAL/*DECIMAL(4, 2)*/, value18 REAL/*DECIMAL(4, 2)*/, value19 VARCHAR(200), value20 SMALLINT
				, value21 VARCHAR(10), value22 REAL, value23 REAL
				, value24 REAL, value25 DATE, value26 REAL, value27 REAL
			);
			DELETE FROM @Cm;

			SELECT TOP 1 @pID1 = ID, @pValue01Ancho = value01, @pValue02Ancho = value02, @pValue03Ancho = value03
			FROM @AnchoPapel 
			WHERE ID NOT IN (SELECT ID FROM @AnchoPapelLeidos)

			INSERT INTO @Cm (
				ID, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13, 
				value14, value15, value16, value17, value18, value19, value20, value21, value22, value23, value24, value25, value26, value27
			)
			EXEC dbo.FCAPROG015MWSPA7 
				@Tipo = 0,
				@pZonaERP = @pZonaERP,
				--@pIDAncho = @pID1,
				@pValue01Ancho = @pValue01Ancho,
				@pValue02Ancho = @pValue02Ancho,
				@pValue03Ancho = @pValue03Ancho,
				@pRefileMin = @pRefileMin,
				@pRefileMax = @pRefileMax,
				@pLargoMinimo = @pLargoMinimo,
				@pSENCILLO = @pSENCILLO,
				@pPRIORIDAD = @pPRIORIDAD,
				@pCuchillas3 = @pCuchillas3,
				@pOppR = @OppEnvio;

			-- GUARDA INFORMACIÓN ARREGLOS
			INSERT INTO @CPLDAT008 ([ID], 
				[OP1], [Multiplos1], [Ancho1], 
				[OP2], [Multiplos2], [Ancho2], 
				[OP3], [Multiplos3], [Ancho3],
				[Ancho Total], [Ancho Papel], [Refile], 
				[Lam1], [Lam2], [Lam3], [Metros Lineales], 
				[Fecha1], [Fecha2], [Fecha3],
				[Largo1], [Largo2], [Largo3], 
				[Resistencia], [Flauta], 
				[Piezas1], [Piezas2], [Piezas3], 
				[Empate], [Tranf]
			) 
			SELECT A.ID, 
				A.value01, A.value02, A.value03, 
				ISNULL(A.value04, '0'), ISNULL(A.value05, 0), ISNULL(A.value06, 0), 
				ISNULL(A.value21, '0'), ISNULL(A.value22, 0), ISNULL(A.value23, 0),
				A.value07, @pValue01Ancho, 
					CASE WHEN ISNULL(@pCuchillas3, 0) = 0 
						THEN ((ISNULL(@pValue01Ancho, 0) - ISNULL(A.value07, 0)) * 10)	-- 2 CUCHILLAS
						ELSE ((ISNULL(A.value08, 0) + ISNULL(A.value20, 0)) * 10)		-- 3 CUCHILLAS
					END, 
				A.value09, ISNULL(A.value10, 0), ISNULL(A.value24, 0), (ISNULL(A.value11, 0) / 100), 
				A.value12, A.value13, A.value25,
				A.value14, ISNULL(A.value15, 0), ISNULL(a.value26, 0), 
				@pRESISTENCIA, A.value16, 
				A.value17, ISNULL(A.value18, 0), ISNULL(A.value27, 0), 
				ISNULL(A.value19, ''), 0
			FROM @Cm A

			INSERT INTO @AnchoPapelLeidos (ID)
			VALUES (@pID1)
		END

		INSERT INTO CPLDAT008 ([ID], 
			[OP1], [Multiplos1], [Ancho1], 
			[OP2], [Multiplos2], [Ancho2], 
			[OP3], [Multiplos3], [Ancho3],
			[Ancho Total], [Ancho Papel], [Refile], 
			[Lam1], [Lam2], [Lam3], [Metros Lineales], 
			[Fecha1], [Fecha2], [Fecha3],
			[Largo1], [Largo2], [Largo3], 
			[Resistencia], [Flauta], 
			[Piezas1], [Piezas2], [Piezas3], 
			[Empate], [Tranf]
		)
		SELECT Ide, 
			[OP1], [Multiplos1], [Ancho1], 
			[OP2], [Multiplos2], [Ancho2], 
			[OP3], [Multiplos3], [Ancho3],
			[Ancho Total], [Ancho Papel], [Refile], 
			[Lam1], [Lam2], [Lam3], [Metros Lineales], 
			[Fecha1], [Fecha2], [Fecha3],
			[Largo1], [Largo2], [Largo3], 
			[Resistencia], [Flauta], 
			[Piezas1], [Piezas2], [Piezas3], 
			[Empate], [Tranf]
		FROM @CPLDAT008;
	END

SALIR_CALCULAR_PROGRAMAS:
	-- INICIA VALUACIÓN DE ARREGLOS
	-- REUTILIZACIÓN DE CODIGO (LLAMAR A OTRO SP INDICANDOLE SI ES DE CALCULAR PROGRAMA O PEDIDOS MAXIMOS)
	-- EN ESTE CASO ES CALCULAR PROGRAMAS @Tipo = 0
	-- Y TAMBIÉN ENVIAR EL PARÁMETROS SCORESMAX (@pScoresMax)
	EXEC dbo.FCAPROG015MWSPC13 @Tipo = 0, @pScoresMax = @pScoresMax, @pCuchillas3 = @pCuchillas3;

	--SELECT @pMsj = CASE WHEN ISNULL(@pMsj, '') = '' THEN 'OK' ELSE @pMsj END;
	--SELECT 'FCAPROG015MWSPA8' AS Proceso, @pMsj AS Mensaje;

	SET NOCOUNT OFF;
END
GO


