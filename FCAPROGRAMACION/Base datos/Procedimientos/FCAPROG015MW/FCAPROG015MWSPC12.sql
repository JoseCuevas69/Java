USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC12]    Script Date: 20/10/2022 08:38:57 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC12]
	@pZonaERP VARCHAR(2)			= NULL
	, @pCuchillas3 BIT				= NULL
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @IDsCPLDAT008 AS TABLE (ID INT);
	DECLARE @pMsj VARCHAR(MAX) = '', @pRecalculo INT = 200, @pNoRecalculos INT, @pRefileMax SMALLINT, @pRefileMin SMALLINT, @pDiasAdelanto SMALLINT, @pFechaLimite DATE
		, @pTodosAnchos BIT, @pAnchoCalculo REAL, @pLargoMinimo INT, @pScoresMax INT
		, @pOP1 VARCHAR(10), @pOP2 VARCHAR(10), @pOP3 VARCHAR(10), @pNPROG1 REAL/*DECIMAL(4, 2)*/, @pNPROG2 REAL/*DECIMAL(4, 2)*/, @pNPROG3 REAL/*DECIMAL(4, 2)*/
		, @pValorMax INT, @pAnchoSTD REAL/*DECIMAL(6, 2)*/, @pSENCILLO VARCHAR(1)
		, @pID1 INT, @pRESISTENCIA VARCHAR(12), @pPRIORIDAD BIT = 0, @pOpPrior BIT = 0
		, @pValue01Ancho REAL, @pValue02Ancho REAL, @pValue03Ancho REAL

	DECLARE @CPLDAT004 AS TABLE (
		OrdenProduccion VARCHAR(10), Cliente VARCHAR(100), ClaveArticulo VARCHAR(9), Articulo VARCHAR(50), Cantidad INT, FechaEntrega SMALLDATETIME,
		Programadas INT, Largo REAL, Ancho REAL, Piezas REAL/*DECIMAL(4, 2)*/, Resistencia VARCHAR(12), Faltan INT, Hojas INT, Tkg INT, TM2 INT, Parcial VARCHAR(10),
		Lamina VARCHAR(10), Flauta VARCHAR(10), Mas SMALLINT, Prior BIT, Utilizar BIT, Refile BIT, NScores INT, ConScore BIT, Cproceso VARCHAR(10)
	);
	DECLARE @AnchoPapel AS TABLE ( ID INT IDENTITY(1,1), value01 REAL, value02 REAL, value03 REAL );
	DECLARE @AnchoPapelLeidos AS TABLE ( ID INT );

	INSERT INTO @CPLDAT004 (
		OrdenProduccion, Cliente, ClaveArticulo, Articulo, Cantidad, FechaEntrega, Programadas, Largo, Ancho, Piezas, 
		Resistencia, Faltan, Hojas, Tkg, TM2, Parcial, Lamina, Flauta, Mas, Prior, Utilizar, Refile, NScores, ConScore, Cproceso
	)
	SELECT [Orden Produccion], Cliente, [Clave Articulo], Articulo, Cantidad, [Fecha Entrega], Programadas, Largo, Ancho, Piezas, 
		Resistencia, Faltan, Hojas, Tkg, TM2, Parcial, Lamina, Flauta, Mas, Prior, Utilizar, Refile, NScores, ConScore, Cproceso
	FROM CPLDAT004
	WHERE Utilizar = 1

	IF NOT EXISTS(SELECT 1 FROM @CPLDAT004)
	BEGIN
		SELECT @pMsj = 'NO EXISTEN OPS A PROGRAMAR';
		GOTO SALIR_CALCULAR_PROGRAMAS;
	END

	DELETE FROM CPLDAT009;

	-- OBTENER PARAMETROS DE PROGRAMACIÓN
	SELECT @pRefileMax = [Refile Maximo], @pRefileMin = [Refile Minimo], @pDiasAdelanto = [Dias Adelanto]
		, @pTodosAnchos = [Todos Anchos], @pAnchoCalculo = [Ancho Calculo], @pLargoMinimo = [Largo Minimo], @pScoresMax = Scores
	FROM CPLDAT006
	WHERE Id = 1;

	-- CALCULOS A PARAMETROS
	SELECT @pRefileMax = @pRefileMax / 10, @pRefileMin = @pRefileMin / 10, @pFechaLimite = DATEADD(DAY, @pDiasAdelanto, GETDATE());
	
	IF @pTodosAnchos = 0
	BEGIN
		INSERT INTO @AnchoPapel (value01)
		VALUES (@pAnchoCalculo);

		GOTO BRINCA_ANCHOS_PAPEL;
	END

	-- CARGAR ANCHOS
	INSERT INTO @AnchoPapel (value01)
	SELECT Ancho
	FROM CPLDAT003
	WHERE Usar = 1
		AND ISNULL(Ancho, 0) != 0

	IF NOT EXISTS(SELECT 1 FROM @AnchoPapel)
	BEGIN
		GOTO SALIR_CALCULAR_PROGRAMAS;
	END

BRINCA_ANCHOS_PAPEL:
	-- INICIO DE RECALCULO

	DECLARE @CPLDAT009 AS TABLE (ID INT,
		OP1 VARCHAR(10), Fecha1 SMALLDATETIME, Multiplos1 INT/*REAL DECIMAL(4, 2)*/, Ancho1 REAL, Largo1 REAL, Lam1 INT, Piezas1 INT,
		OP2 VARCHAR(10), Fecha2 SMALLDATETIME, Multiplos2 INT/*REAL DECIMAL(4, 2)*/, Ancho2 REAL, Largo2 REAL, Lam2 INT, Piezas2 INT,
		OP3 VARCHAR(10), Fecha3 SMALLDATETIME, Multiplos3 INT/*REAL DECIMAL(4, 2)*/, Ancho3 REAL, Largo3 REAL, Lam3 INT, Piezas3 INT,
		[Ancho Total] REAL, [Ancho Papel] REAL, Refile REAL, [Metros Lineales] INT,
		Producto1 VARCHAR(10), Producto2 VARCHAR(10), Producto3 VARCHAR(10), Parcial1 SMALLINT, Parcial2 SMALLINT, Parcial3 SMALLINT,
		Puntos INT, Resistencia VARCHAR(12), Flauta VARCHAR(3), Tranf BIT, Empate VARCHAR(25),
		Cliente1 VARCHAR(80), Articulo1 VARCHAR(50), Cliente2 VARCHAR(80), Articulo2 VARCHAR(50), Cliente3 VARCHAR(80), Articulo3 VARCHAR(50),
		Rest1 VARCHAR(12), Rest2 VARCHAR(12), Rest3 VARCHAR(12), ConScore BIT, ConScore2 BIT, ConScore3 BIT, AnchoStd REAL/*DECIMAL(6, 2)*/
	);

	-- ACTUALIZAR VALORES 2 Y 3 DE ANCHO PAPEL
	UPDATE @AnchoPapel 
		SET value02 = value01 - @pRefileMin,
			value03 = value01 - (@pRefileMin / 2)

	DECLARE @Opp CPLDAT005TD_001 /*AS TABLE (
		ID INT IDENTITY(1,1), value01 VARCHAR(10), value02 REAL, value03 REAL, value04 REAL, value05 VARCHAR(10), value06 DATE
		, value07 VARCHAR(10), value08 REAL/*DECIMAL(4, 2)*/, value09 BIT, value10 INT, value11 BIT, value12 INT, value13 INT
	);*/

	SELECT @pNoRecalculos = 1;
	WHILE @pNoRecalculos <= @pRecalculo
	BEGIN
		-- BUSCAR EL ARREGLO CON MAYOR PUNTACION
		IF NOT EXISTS (SELECT 1 FROM CPLDAT008 WHERE ISNULL(Puntos, 0) >= 200) 
		BEGIN
			GOTO SALIR_CALCULAR_PROGRAMAS;
		END

		SELECT TOP 1 @pValorMax = Puntos
		FROM CPLDAT008
		WHERE ISNULL(Puntos, 0) >= 200
		ORDER BY Puntos DESC

		SELECT TOP 1 @pOP1 = OP1, @pOP2 = OP2, @pOP3 = OP3
			, @pNPROG1 = ISNULL(Lam1, 0) * ISNULL(Multiplos1, 0), @pNPROG2 = ISNULL(Lam2, 0) * ISNULL(Multiplos2, 0)
			, @pNPROG3 = ISNULL(Lam3, 0) * ISNULL(Multiplos3, 0)
		FROM CPLDAT008 
		WHERE Puntos = ISNULL(@pValorMax, 0);

		-- CONSULTA DEL ANCHOSTD
		IF ISNULL(@pZonaERP, '') = '01'
		BEGIN
			SELECT TOP 1 @pAnchoSTD = AnchoSTD
			FROM Cajas01..CmoDat037 A 
			JOIN Cajas01..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @pOP1;
		END 
		ELSE IF ISNULL(@pZonaERP, '') = '02'
		BEGIN
			SELECT TOP 1 @pAnchoSTD = AnchoSTD
			FROM Cajas02..CmoDat037 A 
			JOIN Cajas02..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @pOP1;
		END 
		ELSE IF ISNULL(@pZonaERP, '') = '05'
		BEGIN
			SELECT TOP 1 @pAnchoSTD = AnchoSTD
			FROM Cajas05..CmoDat037 A 
			JOIN Cajas05..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @pOP1;
		END

		INSERT INTO @CPLDAT009 (ID, 
			OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
			OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
			OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
			[Ancho Total], [Ancho Papel], Refile, [Metros Lineales], 
			Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
			Puntos, Resistencia, Flauta, Tranf, Empate, 
			Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
			Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd
		)
		SELECT TOP 1 @pNoRecalculos, 
			ISNULL(@pOP1, ''), Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
			ISNULL(OP2, ''), Fecha2, ISNULL(Multiplos2, 0), ISNULL(Ancho2, 0), ISNULL(Largo2, 0), ISNULL(Lam2, 0), ISNULL(Piezas2, 0),
			ISNULL(OP3, ''), Fecha3, ISNULL(Multiplos3, 0), ISNULL(Ancho3, 0), ISNULL(Largo3, 0), ISNULL(Lam3, 0), ISNULL(Piezas3, 0),
			[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
			Producto1, Producto2, NULL, ISNULL(Parcial1, 0), ISNULL(Parcial2, 0), 0,
			Puntos, Resistencia, Flauta, 0, ISNULL(Empate, ''),
			Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
			Rest1, Rest2, CASE WHEN ISNULL(@pCuchillas3, 0) = 1 THEN Rest2 ELSE '' END, 
			ConScore, ConScore2, ConScore3, ISNULL(@pAnchoSTD, 0)
		FROM CPLDAT008 
		WHERE Puntos = ISNULL(@pValorMax, 0)
			AND OP1 = @pOP1

		SELECT @pOP1 = RTRIM(@pOP1), @pOP2 = RTRIM(@pOP2), @pOP3 = RTRIM(@pOP3);

		-- REALIZA ANOTACION DE HOJAS PROGRAMADAS
		UPDATE CPLDAT005 SET 
			Hojas = (ISNULL(Hojas, 0) - ISNULL(@pNPROG1, 0)) / (1.00 + (ISNULL(Mas, 0) / 100.00)),
			[Hojas Prog] = ISNULL([Hojas Prog], 0) + ISNULL(@pNPROG1, 0)
		WHERE [Orden Produccion] = @pOP1;

		UPDATE CPLDAT005 SET 
			Hojas = (ISNULL(Hojas, 0) - ISNULL(@pNPROG2, 0)) / (1.00 + (ISNULL(Mas, 0) / 100.00)),
			[Hojas Prog] = ISNULL([Hojas Prog], 0) + ISNULL(@pNPROG2, 0)
		WHERE [Orden Produccion] = @pOP2;

		IF ISNULL(@pCuchillas3, 0) = 1
		BEGIN
			UPDATE CPLDAT005 SET 
				Hojas = (ISNULL(Hojas, 0) - ISNULL(@pNPROG3, 0)) / (1.00 + (ISNULL(Mas, 0) / 100.00)),
				[Hojas Prog] = ISNULL([Hojas Prog], 0) + ISNULL(@pNPROG3, 0)
			WHERE [Orden Produccion] = @pOP3;
		END

		-- BORRAR DATOS ARREGLOS
		DELETE FROM CPLDAT008;
		DELETE FROM @Opp;
		
		-- INICIAR DATOS
		INSERT INTO @Opp (Id, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13)
		SELECT ROW_NUMBER() OVER (ORDER BY [Orden Produccion]), [Orden Produccion], Ancho, Largo, (Hojas * (1.00 + (Mas / 100.00))), Lamina, [Fecha Entrega], Flauta, Piezas, Refile, 0, Prior, ConScore, NScores
		FROM CplDat005
		WHERE [Fecha Entrega] < @pFechaLimite AND ISNULL(Hojas, 0) > 0
		
		IF EXISTS (SELECT 1 FROM @Opp WHERE value11 = 1)
		BEGIN
			SELECT @pPRIORIDAD = 1, @pOpPrior = 1;
		END
		
		IF @pPRIORIDAD = 0 AND @pOpPrior = 1
		BEGIN
			GOTO SALIR_CALCULAR_PROGRAMAS;
		END

		SELECT TOP 1 @pRESISTENCIA = Resistencia FROM @CPLDAT004;
		SELECT @pSENCILLO = LEFT(@pRESISTENCIA, 1);

		IF EXISTS(SELECT 1 FROM @Opp WHERE LEN(value07) = 1)
		BEGIN
			SELECT @pSENCILLO = 'S';
		END

		DELETE FROM @AnchoPapelLeidos;
		DECLARE @Cm AS TABLE (
			Ide INT IDENTITY(1,1), ID INT, value01 VARCHAR(10), value02 REAL, value03 REAL, value04 VARCHAR(10), value05 INT, value06 REAL
			, value07 REAL, value08 REAL, value09 INT/*REAL*/, value10 INT, value11 REAL, value12 DATE, value13 DATE
			, value14 REAL, value15 REAL/*DECIMAL(4, 2)*/, value16 VARCHAR(10), value17 INT/*REAL*//*DECIMAL(4, 2)*/, value18 INT/*REAL*//*DECIMAL(4, 2)*/
			, value19 VARCHAR(200), value20 SMALLINT, value21 VARCHAR(10), value22 REAL, value23 REAL, value24 INT/*REAL*/, value25 DATE, value26 REAL, value27 INT/*REAL*/
		);

		-- COMBINACION DE PEDIDOS
		WHILE EXISTS(SELECT 1 FROM @AnchoPapel WHERE ID NOT IN (SELECT ID FROM @AnchoPapelLeidos)) -- NOANCHOS
		BEGIN -- BUCLE DE ANCHOS DE PAPEL DE 1 HASTA TOTAL
			SELECT TOP 1 @pID1 = ID
				, @pValue01Ancho = value01
				, @pValue02Ancho = value02
				, @pValue03Ancho = value03
			FROM @AnchoPapel
			WHERE ID NOT IN (SELECT ID FROM @AnchoPapelLeidos);

			-- EJECUTAR PROCESO (CALCULAR PEDIDOS MAXIMOS)
			INSERT INTO @Cm (
				ID, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11
				, value12, value13, value14, value15, value16, value17, value18, value19, value20, value21, value22, value23
				, value24, value25, value26, value27
			)
			EXEC dbo.FCAPROG015MWSPA7 
				@Tipo = 1,
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
				@pOppR = @Opp;

			INSERT INTO CPLDAT008 (ID, -- GRABA INFORMACIÓN
				OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
				OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
				OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
				[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
				Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
				Puntos, Resistencia, Flauta, Tranf,
				Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
				Empate, Marca, Rest1, Rest2, ConScore, ConScore2, ConScore3
			)
			SELECT Ide, 
				value01, CASE WHEN YEAR(value12) = 1900 THEN NULL ELSE value12 END, value02, value03, value14, value09, value17,
				ISNULL(value04, ''), CASE WHEN YEAR(value13) = 1900 THEN NULL ELSE value13 END, ISNULL(value05, 0), ISNULL(value06, 0), ISNULL(value15, 0), ISNULL(value10, 0), ISNULL(value18, 0),
				ISNULL(value21, ''), CASE WHEN YEAR(value25) = 1900 THEN NULL ELSE value25 END, ISNULL(value22, 0), ISNULL(value23, 0), ISNULL(value26, 0), ISNULL(value24, 0), ISNULL(value27, 0),
				ISNULL(value07, 0), @pValue01Ancho, CASE WHEN ISNULL(@pCuchillas3, 0) = 0 THEN ((@pValue01Ancho - value07) * 10) ELSE (value08 + value20) * 10 END, (value11 / 100),
				NULL, NULL, NULL, 0, 0, 0,
				0, @pRESISTENCIA, value16, 0,
				NULL, NULL, NULL, NULL, NULL, NULL,
				value19, 0, NULL, NULL, ISNULL(value21, 0), ISNULL(value22, 0), 0
			FROM @Cm;

			DELETE FROM @Cm;

			INSERT INTO @AnchoPapelLeidos (ID)
			VALUES (@pID1);
		END

		-- REUTILIZACIÓN DE CODIGO (LLAMAR A OTRO SP INDICANDOLE SI ES DE CALCULAR PROGRAMA O PEDIDOS MAXIMOS)
		-- EN ESTE CASO ES PEDIDOS MAXIMOS @Tipo = 1
		-- Y TAMBIÉN ENVIAR EL PARÁMETRO SCORESMAX (@pScoresMax)
		EXEC dbo.FCAPROG015MWSPC13 @Tipo = 1, @pScoresMax = @pScoresMax, @pCuchillas3 = @pCuchillas3;
		
		SELECT @pNoRecalculos = @pNoRecalculos + 1;
	END
	
SALIR_CALCULAR_PROGRAMAS:
	
	INSERT INTO CPLDAT009 (ID,
		OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
		OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
		OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
		[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
		Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
		Puntos, Resistencia, Flauta, Tranf, Empate,
		Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
		Rest1, Rest2, Rest3, ConScore, AnchoStd
	)
	SELECT ID,
		OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
		OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
		OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
		[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
		Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
		Puntos, Resistencia, Flauta, Tranf, Empate,
		Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
		Rest1, Rest2, Rest3, ConScore, AnchoStd
	FROM @CPLDAT009
	--SELECT @pMsj = CASE WHEN ISNULL(@pMsj, '') = '' THEN 'OK' ELSE @pMsj END;
	--SELECT 'FCAPROG015MWSPC12' AS Proceso, @pMsj AS Mensaje;

	SET NOCOUNT OFF;
END

GO


