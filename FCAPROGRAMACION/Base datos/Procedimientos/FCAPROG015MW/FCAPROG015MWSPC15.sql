USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC15]    Script Date: 20/10/2022 08:40:36 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC15]
	@pZonaERP VARCHAR(2)							= NULL
	--, @pUsuarioERP VARCHAR(6)						= NULL
	--, @pCuchillas3 BIT							= NULL
	--, @pPrograma VARCHAR(15)						= NULL
	, @pIdArreglo INT								= NULL
	--, @pArreglosSeleccionados CPLDAT008TD_001		READONLY
AS 
BEGIN
	SET NOCOUNT ON;
	-- PARAMETROS RECIBIDOS
	--DECLARE @pZonaERP VARCHAR(2) = '01', @pUsuarioERP VARCHAR(6) = '001000'
	--DECLARE @pArreglosSeleccionados CPLDAT008TD_001;
	--DECLARE @pCuchillas3 BIT = 0
	--DECLARE @pPrograma VARCHAR(15) = 'CPLCAP005 v2.0'
	DECLARE @pArreglos CPLDAT008TD_001;
	DECLARE @ResError AS TABLE (Id INT, Message VARCHAR(500));

	-- 
	DECLARE @ArreglosResistencia AS TABLE (ID INT, Mensaje VARCHAR(MAX));
	DECLARE @ResultadoValidacion CMODAT017TD_001;
	DECLARE @pAnchoSTDM CPLDAT009TD_001;
	DECLARE @pAnchosPapel AS TABLE (ID INT IDENTITY(1,1), value01 REAL, value02 BIT, value03 BIT);
	DECLARE @pAnchosPapelLeidos AS TABLE (ID INT);

	IF NOT EXISTS(SELECT 1 FROM CPLDAT009)
	BEGIN
		INSERT INTO @ResError (Id, Message)
		SELECT 0 AS Completado, 'NO EXISTEN DATOS DE ARREGLOS ¡EJECUTE LA CONSULTA DE NUEVO!' AS Mensaje;
		GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
	END ELSE
	BEGIN
		IF ISNULL(@pIdArreglo, -1) > -1
		BEGIN
			IF ISNULL(@pIdArreglo, -1) > 0
			BEGIN
				IF EXISTS(SELECT 1 FROM CPLDAT009 WHERE ID = @pIdArreglo)
				BEGIN
					IF EXISTS(SELECT 1 FROM CPLDAT009 WHERE ID = @pIdArreglo AND Tranf = 1)
					BEGIN
						INSERT INTO @ResError (Id, Message)
						SELECT 0 AS Completado, 'ARREGLO YA VALIDADO' AS Mensaje;
						GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
					END ELSE 
					BEGIN
						---- SACAR ANCHOSSTD
						INSERT INTO @pAnchoSTDM ( ID, OP, AnchoStd )
						SELECT ID, OP1, AnchoStd
						FROM CPLDAT009
						WHERE ID = @pIdArreglo;

						INSERT INTO @pArreglos (ID,
							OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
							OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
							OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
							[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
							Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
							Puntos, Resistencia, Flauta, Tranf, Empate,
							Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
							Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd, Seleccionado
						)
						SELECT ID,
							OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
							OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
							OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
							[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
							Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
							Puntos, Resistencia, Flauta, Tranf, Empate,
							Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
							Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd, 1
						FROM CPLDAT009
						WHERE ID = @pIdArreglo AND Tranf = 0;
					END
				END ELSE
				BEGIN
					INSERT INTO @ResError (Id, Message)
					SELECT 0 AS Completado, 'NO EXISTE EL ARREGLO SELECCIONADO ¡EJECUTE LA CONSULTA DE NUEVO!' AS Mensaje;
					GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
				END
			END ELSE
			BEGIN
				IF NOT EXISTS(SELECT 1 FROM CPLDAT009)
				BEGIN
					INSERT INTO @ResError (Id, Message)
					SELECT 0 AS Completado, 'NO EXISTEN DATOS ARREGLOS ¡EJECUTE LA CONSULTA DE NUEVO!' AS Mensaje;
					GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
				END ELSE
				BEGIN
					---- SACAR ANCHOSSTD
					INSERT INTO @pAnchoSTDM ( ID, OP, AnchoStd )
					SELECT ID, OP1, AnchoStd
					FROM CPLDAT009;

					INSERT INTO @pArreglos (ID,
						OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
						OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
						OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
						[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
						Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
						Puntos, Resistencia, Flauta, Tranf, Empate,
						Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
						Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd, Seleccionado
					)
					SELECT ID,
						OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
						OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
						OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
						[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
						Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
						Puntos, Resistencia, Flauta, Tranf, Empate,
						Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
						Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd, 1
					FROM CPLDAT009
					WHERE Tranf = 0;
				END
			END
		END ELSE
		BEGIN
			INSERT INTO @ResError (Id, Message)
			SELECT 0 AS Completado, 'NUMERO DE ARREGLO NO VALIDO' AS Mensaje;
			GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
		END
	END
	--EXEC dbo.FCAPROG015MWSPC14 @Opcion = 2, @pData = @pAnchoSTDM;

	-- ANALIZAR ARREGLOS A VALIDAR
	INSERT INTO @pAnchosPapel (value01, value02, value03) -- VALUE03 (TRANF)
	SELECT DISTINCT A.[Ancho Papel], 0, B.Tranf
	FROM @pAnchoSTDM A
	JOIN CplDat009 B ON A.ID = B.ID

	-- ANALIZAR COMBINACIONES A VALIDAR
	DECLARE @Combinaciones AS TABLE (
		Orden SMALLINT, Clave VARCHAR(28), [Costo M2] REAL, [Peso M2] REAL, Mullen REAL
		, [Mullen Maximo] REAL, [Edge Crush] FLOAT, Factor REAL, Ancho REAL, Metros INT, Usar BIT
		, Liner1 CHAR(12), AnchoL1 DECIMAL(4, 2), Empalme1 CHAR(12), AnchoEmpalme1 DECIMAL(4, 2)
		, Liner2 CHAR(12), AnchoL2 DECIMAL(4, 2), Empalme2 CHAR(12), AnchoEmpalme2 DECIMAL(4, 2)
		, Liner3 CHAR(12), AnchoL3 DECIMAL(4, 2), Empalme3 CHAR(12), AnchoEmpalme3 DECIMAL(4, 2)
		, Liner4 CHAR(12), AnchoL4 DECIMAL(4, 2), Empalme4 CHAR(12), AnchoEmpalme4 DECIMAL(4, 2)
		, Corrugado1 CHAR(12), AnchoC1 DECIMAL(4, 2), EmpalmeC1 CHAR(12), AnchoEmpalmeC1 DECIMAL(4, 2)
		, Corrugado2 CHAR(12), AnchoC2 DECIMAL(4, 2), EmpalmeC2 CHAR(12), AnchoEmpalmeC2 DECIMAL(4, 2)
		, Corrugado3 CHAR(12), AnchoC3 DECIMAL(4, 2), EmpalmeC3 CHAR(12), AnchoEmpalmeC3 DECIMAL(4, 2)
		, Pulg BIT
	);
	INSERT INTO @Combinaciones (
		Orden, Clave, [Costo M2], [Peso M2], Mullen
		, [Mullen Maximo], [Edge Crush], Factor, Ancho, Metros, Usar
		, Liner1, AnchoL1, Empalme1, AnchoEmpalme1
		, Liner2, AnchoL2, Empalme2, AnchoEmpalme2
		, Liner3, AnchoL3, Empalme3, AnchoEmpalme3
		, Liner4, AnchoL4, Empalme4, AnchoEmpalme4
		, Corrugado1, AnchoC1, EmpalmeC1, AnchoEmpalmeC1
		, Corrugado2, AnchoC2, EmpalmeC2, AnchoEmpalmeC2
		, Corrugado3, AnchoC3, EmpalmeC3, AnchoEmpalmeC3
		, Pulg
	)
	SELECT Orden, Clave, [Costo M2], [Peso M2], Mullen
		, [Mullen Maximo], [Edge Crush], Factor, Ancho, Metros, Usar
		, Liner1, AnchoL1, Empalme1, AnchoEmpalme1
		, Liner2, AnchoL2, Empalme2, AnchoEmpalme2
		, Liner3, AnchoL3, Empalme3, AnchoEmpalme3
		, Liner4, AnchoL4, Empalme4, AnchoEmpalme4
		, Corrugado1, AnchoC1, EmpalmeC1, AnchoEmpalmeC1
		, Corrugado2, AnchoC2, EmpalmeC2, AnchoEmpalmeC2
		, Corrugado3, AnchoC3, EmpalmeC3, AnchoEmpalmeC3
		, Pulg
	FROM CPLDAT002
	WHERE Usar = 1;

	IF NOT EXISTS(SELECT 1 FROM @Combinaciones)
	BEGIN
		INSERT INTO @ResError (Id, Message)
		SELECT 0 AS Completado, 'NO EXISTEN DATOS COMBINACIONES ¡EJECUTE LA CONSULTA DE NUEVO!' AS Mensaje;
		GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
	END

	-- COMPARA MATRIZ CON COMBINACIONES DE PAPEL
	UPDATE @pAnchosPapel SET 
		value02 = 1
	FROM @pAnchosPapel A 
	JOIN @Combinaciones B ON A.value01 = CASE WHEN B.Pulg = 1 THEN (B.Ancho * 2.54) ELSE B.Ancho END;

	UPDATE @pAnchosPapel SET 
		value02 = 1
	FROM @pAnchosPapel A 
	JOIN @Combinaciones B ON A.value01 = ((ISNULL(B.Ancho, 0) * 25.4) + 0.01);

	DECLARE @Anchos VARCHAR(MAX)

	-- ANALIZAR TODOS ANCHOS
	IF EXISTS(SELECT 1 FROM @pAnchosPapel WHERE ISNULL(value02, 0) = 0)
	BEGIN
		SELECT TOP 1 @Anchos = STUFF(
			(
				SELECT ', ' + CONVERT(VARCHAR(MAX), VALUE01) AS [text()]
				FROM @pAnchosPapel
				WHERE ISNULL(value02, 0) = 0
				FOR XML PATH('')
			), 1, 2, '')
		FROM @pAnchosPapel;
		
		INSERT INTO @ResError (Id, Message)
		SELECT 0 AS Completado, 'DEFINA COMBINACIÓN PARA LOS ANCHOS (' + @Anchos + ')' AS Mensaje;
		GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
	END

	-- INICIA VALIDACIÓN EN GRUPO
	
	--INSERT INTO @pAnchosPapelLeidos (ID)
	--SELECT ID
	--FROM @pAnchosPapel
	--WHERE value03 = 1;

	WHILE EXISTS(SELECT 1 FROM @pArreglos WHERE ID NOT IN (SELECT ID FROM @pAnchosPapelLeidos))
	BEGIN
		DECLARE @pTProc VARCHAR(5), @pF1 VARCHAR(5), @pF2 VARCHAR(5), @pF3 VARCHAR(5), @pNum INT, @pAP REAL
			, @pTmpPrepara SMALLINT, @pVelStd DECIMAL(9, 4), @pTmpProduc REAL, @pTmpTotal REAL, @pHORAACT VARCHAR(8)
			, @wPintaCorr BIT, @wPintaImp BIT, @I1 INT = 1

		DECLARE @aIdAncho INT, @aAnchoP REAL, @aTM2 REAL, @aRESISTENCIA VARCHAR(1), @aFlauta VARCHAR(10), @aRefile REAL
			, @aAnchoTotal REAL, @aMetrosLineales INT, @resistencia VARCHAR(15)
			, @aOP1 VARCHAR(10), @aOP2 VARCHAR(10), @aOP3 VARCHAR(10)
			, @aMultiplos1 DECIMAL(4, 2), @aMultiplos2 DECIMAL(4, 2), @aMultiplos3 DECIMAL(4, 2)
			, @aAncho1 REAL, @aAncho2 REAL, @aAncho3 REAL, @aLargo1 REAL, @aLargo2 REAL, @aLargo3 REAL
			, @aLam1 INT, @aLam2 INT, @aLam3 INT, @aPiezas1 INT, @aPiezas2 INT, @aPiezas3 INT
			, @aRest1 VARCHAR(12), @aRest2 VARCHAR(12), @aRest3 VARCHAR(12), @aConScore BIT, @aConScore2 BIT, @aConScore3 BIT

		DECLARE @cbTmpAnchoC REAL, @cbAnchoC REAL, @cbKgPapel REAL, @cbEmpalmes INT, @cbPulg BIT
			, @cbLiner1 VARCHAR(12), @cbLiner2 VARCHAR(12), @cbLiner3 VARCHAR(12), @cbLiner4 VARCHAR(12)
			, @cbEmpalme1 VARCHAR(12), @cbEmpalme2 VARCHAR(12), @cbEmpalme3 VARCHAR(12), @cbEmpalme4 VARCHAR(12)
			, @cbCorrugado1 VARCHAR(12), @cbCorrugado2 VARCHAR(12), @cbCorrugado3 VARCHAR(12)
			, @cbEmpalmeC1 VARCHAR(12), @cbEmpalmeC2 VARCHAR(12), @cbEmpalmeC3 VARCHAR(12)
			, @cbAL1 REAL, @cbAL2 REAL, @cbAL3 REAL, @cbAL4 REAL
			, @cbALE1 REAL, @cbALE2 REAL, @cbALE3 REAL, @cbALE4 REAL
			, @cbAC1 REAL, @cbAC2 REAL, @cbAC3 REAL
			, @cbACE1 REAL, @cbACE2 REAL, @cbACE3 REAL
	
		-- CALCULA DATOS COMBINACIÓN
		SELECT TOP 1 @aIdAncho = ID, @aAnchoP = [Ancho Papel], @aRESISTENCIA = LEFT(ISNULL(Resistencia, ''), 1), @aMetrosLineales = ISNULL([Metros Lineales], 0)
			, @aFlauta = RTRIM(ISNULL(Flauta, '')), @aTM2 = ([Metros Lineales] * [Ancho Papel]) / 100, @aAnchoTotal = [Ancho Total]
			, @aOP1 = RTRIM(ISNULL(OP1, '')), @aOP2 = RTRIM(ISNULL(OP2, '')), @aOP3 = RTRIM(ISNULL(OP3, ''))
			, @aMultiplos1 = ISNULL(Multiplos1, 0), @aMultiplos2 = ISNULL(Multiplos2, 0), @aMultiplos3 = ISNULL(Multiplos3, 0)
			, @aAncho1 = ISNULL(Ancho1, 0), @aAncho2 = ISNULL(Ancho2, 0), @aAncho3 = ISNULL(Ancho3, 0)
			, @aLargo1 = ISNULL(Largo1, 0), @aLargo2 = ISNULL(Largo2, 0), @aLargo3 = ISNULL(Largo3, 0)
			, @aLam1 = ISNULL(Lam1, 0), @aLam2 = ISNULL(Lam2, 0), @aLam3 = ISNULL(Lam3, 0)
			, @aPiezas1 = ISNULL(Piezas1, 0), @aPiezas2 = ISNULL(Piezas2, 0), @aPiezas3 = ISNULL(Piezas3, 0)
			, @aRest1 = ISNULL(Rest1, ''), @aRest2 = ISNULL(Rest2, ''), @aRest3 = ISNULL(Rest3, '')
			, @aConScore = ISNULL(ConScore, 0), @aConScore2 = ISNULL(ConScore2, 0), @aConScore3 = ISNULL(ConScore3, 0)
			, @aRefile = Refile, @resistencia = ISNULL(Resistencia, '')
		FROM @pArreglos
		WHERE ID NOT IN (SELECT ID FROM @pAnchosPapelLeidos);

		SELECT TOP 1 @cbTmpAnchoC = CASE WHEN Pulg = 1 THEN (Ancho * 2.54) ELSE Ancho END 
			, @cbPulg = ISNULL(Pulg, 0)
			, @cbAnchoC = ISNULL(Ancho, 0)
			, @cbLiner1 = ISNULL(Liner1, ''), @cbLiner2 = ISNULL(Liner2, ''), @cbLiner3 = ISNULL(Liner3, ''), @cbLiner4 = ISNULL(Liner4, '')
			, @cbEmpalme1 = ISNULL(Empalme1, ''), @cbEmpalme2 = ISNULL(Empalme2, ''), @cbEmpalme3 = ISNULL(Empalme3, ''), @cbEmpalme4 = ISNULL(Empalme4, '')
			, @cbCorrugado1 = ISNULL(Corrugado1, ''), @cbCorrugado2 = ISNULL(Corrugado2, ''), @cbCorrugado3 = ISNULL(Corrugado3, '')
			, @cbEmpalmeC1 = ISNULL(EmpalmeC1, ''), @cbEmpalmeC2 = ISNULL(EmpalmeC2, ''), @cbEmpalmeC3 = ISNULL(EmpalmeC3, '')
			, @cbKgPapel = [Peso M2] * ISNULL(@aTM2, 0)
			, @cbEmpalmes = 
				CASE WHEN ISNULL(Empalme1, '') != '' AND ISNULL(Empalme2, '') != '' AND ISNULL(Empalme3, '') != '' AND ISNULL(Empalme4, '') != '' AND ISNULL(EmpalmeC1, '') != '' AND ISNULL(EmpalmeC2, '') != '' AND ISNULL(EmpalmeC3, '') != '' THEN 6
					WHEN ISNULL(Empalme1, '') != '' AND ISNULL(Empalme2, '') != '' AND ISNULL(Empalme3, '') != '' AND ISNULL(Empalme4, '') != '' AND ISNULL(EmpalmeC1, '') != '' AND ISNULL(EmpalmeC2, '') != '' THEN 5
					WHEN ISNULL(Empalme1, '') != '' AND ISNULL(Empalme2, '') != '' AND ISNULL(Empalme3, '') != '' AND ISNULL(Empalme4, '') != '' AND ISNULL(EmpalmeC1, '') != '' THEN 4
					WHEN ISNULL(Empalme1, '') != '' AND ISNULL(Empalme2, '') != '' AND ISNULL(Empalme3, '') != '' AND ISNULL(Empalme4, '') != '' THEN 3
					WHEN ISNULL(Empalme1, '') != '' AND ISNULL(Empalme2, '') != '' AND ISNULL(Empalme3, '') != '' THEN 2
					WHEN ISNULL(Empalme1, '') != '' AND ISNULL(Empalme2, '') != '' THEN 1
					WHEN ISNULL(Empalme1, '') != '' THEN 0
					ELSE -1
				END
			, @cbAL1 = CASE WHEN ISNULL(Liner1, '') != '' THEN ISNULL(AnchoL1, 0) ELSE 0 END
			, @cbAL2 = CASE WHEN ISNULL(Liner2, '') != '' THEN ISNULL(AnchoL2, 0) ELSE 0 END
			, @cbAL3 = CASE WHEN ISNULL(Liner3, '') != '' THEN ISNULL(AnchoL3, 0) ELSE 0 END
			, @cbAL4 = CASE WHEN ISNULL(Liner4, '') != '' THEN ISNULL(AnchoL4, 0) ELSE 0 END
			, @cbALE1 = CASE WHEN ISNULL(Empalme1, '') != '' THEN ISNULL(AnchoEmpalme1, 0) ELSE 0 END
			, @cbALE2 = CASE WHEN ISNULL(Empalme2, '') != '' THEN ISNULL(AnchoEmpalme2, 0) ELSE 0 END
			, @cbALE3 = CASE WHEN ISNULL(Empalme3, '') != '' THEN ISNULL(AnchoEmpalme3, 0) ELSE 0 END
			, @cbALE4 = CASE WHEN ISNULL(Empalme4, '') != '' THEN ISNULL(AnchoEmpalme4, 0) ELSE 0 END
			, @cbAC1 = CASE WHEN ISNULL(Corrugado1, '') != '' THEN ISNULL(AnchoC1, 0) ELSE 0 END
			, @cbAC2 = CASE WHEN ISNULL(Corrugado2, '') != '' THEN ISNULL(AnchoC2, 0) ELSE 0 END
			, @cbAC3 = CASE WHEN ISNULL(Corrugado3, '') != '' THEN ISNULL(AnchoC3, 0) ELSE 0 END
			, @cbACE1 = CASE WHEN ISNULL(EmpalmeC1, '') != '' THEN ISNULL(AnchoEmpalmeC1, 0) ELSE 0 END
			, @cbACE2 = CASE WHEN ISNULL(EmpalmeC2, '') != '' THEN ISNULL(AnchoEmpalmeC2, 0) ELSE 0 END
			, @cbACE3 = CASE WHEN ISNULL(EmpalmeC3, '') != '' THEN ISNULL(AnchoEmpalmeC3, 0) ELSE 0 END
		FROM @Combinaciones
		WHERE @aAnchoP = CASE WHEN Pulg = 1 THEN (Ancho * 2.54) ELSE Ancho END

		-- INICIA GRABACIÓN DE ARREGLO
		-- DEFINE TIPO DE PREPARACIÓN
		IF ISNULL(@aRESISTENCIA, '') = 'D'
		BEGIN
			IF ISNULL(@aFlauta, '') != 'NO' AND LEN(ISNULL(@aFlauta, '')) != 2
			BEGIN
				INSERT INTO @ArreglosResistencia (ID, Mensaje)
				SELECT @aIdAncho, 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@resistencia, '');
				GOTO SALTA_ARREGLO_VALIDADO;
			END ELSE
			BEGIN
				SELECT @pTProc = 'CD0'
					, @pF1 = SUBSTRING(ISNULL(@aFlauta, ''), 1, 1)
					, @pF2 = SUBSTRING(ISNULL(@aFlauta, ''), 2, 1)
					, @pF3 = ''
			END
		END
		ELSE IF ISNULL(@aRESISTENCIA, '') = 'S'
		BEGIN
			IF ISNULL(@aFlauta, '') != 'NO' AND LEN(ISNULL(@aFlauta, '')) != 1
			BEGIN
				INSERT INTO @ArreglosResistencia (ID, Mensaje)
				SELECT @aIdAncho, 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@resistencia, '');
				GOTO SALTA_ARREGLO_VALIDADO;
			END ELSE
			BEGIN
				SELECT @pTProc = 'CS0'
					, @pF1 = SUBSTRING(ISNULL(@aFlauta, ''), 1, 1)
					, @pF2 = ''
					, @pF3 = ''
			END
		END
		ELSE IF ISNULL(@aRESISTENCIA, '') = 'T'
		BEGIN
			IF ISNULL(@aFlauta, '') != 'NO' AND LEN(ISNULL(@aFlauta, '')) != 3
			BEGIN
				INSERT INTO @ArreglosResistencia (ID, Mensaje)
				SELECT @aIdAncho, 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@resistencia, '');
				GOTO SALTA_ARREGLO_VALIDADO;
			END ELSE
			BEGIN
				SELECT @pTProc = 'TC'
					, @pF1 = SUBSTRING(ISNULL(@aFlauta, ''), 1, 1)
					, @pF2 = SUBSTRING(ISNULL(@aFlauta, ''), 2, 1)
					, @pF3 = SUBSTRING(ISNULL(@aFlauta, ''), 3, 1)
			END
		END ELSE
		BEGIN
			INSERT INTO @ArreglosResistencia (ID, Mensaje)
			SELECT @aIdAncho, 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@resistencia, '');
			GOTO SALTA_ARREGLO_VALIDADO;
		END

		SELECT @pNum = 
			CASE WHEN ISNULL(@aOP3, '') != '' THEN 3
				WHEN ISNULL(@aOP2, '') != '' THEN 2
				ELSE 1
			END;

		SELECT TOP 1 @pTProc = 
			CASE WHEN ISNULL(ClaveProceso, '') != '' THEN RTRIM(ISNULL(ClaveProceso, '')) ELSE @pTProc END
		FROM CplDat014;
	
		IF ISNULL(@pZonaERP, '') = '01'
		BEGIN
			SELECT TOP 1 @pTmpPrepara = ISNULL([Tiempo Std], 0), @pVelStd = ISNULL(Eficiencia, 0)
			FROM Cajas01..CmoDat018
			WHERE [Clave Proceso] = @pTProc;
		END
		ELSE IF ISNULL(@pZonaERP, '') = '02'
		BEGIN
			SELECT TOP 1 @pTmpPrepara = ISNULL([Tiempo Std], 0), @pVelStd = ISNULL(Eficiencia, 0)
			FROM Cajas02..CmoDat018
			WHERE [Clave Proceso] = @pTProc;
		END
		ELSE IF ISNULL(@pZonaERP, '') = '05'
		BEGIN
			SELECT TOP 1 @pTmpPrepara = ISNULL([Tiempo Std], 0), @pVelStd = ISNULL(Eficiencia, 0)
			FROM Cajas05..CmoDat018
			WHERE [Clave Proceso] = @pTProc;
		END

		--SELECT @pTmpProduc = @aMetrosLineales / CASE WHEN ISNULL(@pVelStd, 0) > 0 THEN @pVelStd ELSE 1 END;
		--SELECT @pTmpTotal = @pTmpProduc
		--	, @pHORAACT = LEFT(CONVERT(VARCHAR, CONVERT(TIME, GETDATE())), 8)
		--	, @pAP = CASE WHEN @cbPulg = 1 THEN ISNULL(@cbAnchoC, 0) ELSE (ISNULL(@cbAnchoC, 0) / 0.2539) / 10 END;
		
		DECLARE @pOpAct VARCHAR(10), @pPresentacionPapel VARCHAR(10), @pPresentacionArticulo VARCHAR(10), @pWaxableKote BIT, @pParafinado BIT
		-- VALIDA PRESENTACIÓN DE PAPEL
		IF ISNULL(@pZonaERP, '') = '01'
		BEGIN
			WHILE @I1 <= @pNum
			BEGIN
				SELECT @pOpAct = ISNULL(CASE WHEN @I1 = 1 THEN @aOP1 WHEN @I1 = 2 THEN @aOP2 WHEN @I1 = 3 THEN @aOP3 END, '');

				IF EXISTS(
					SELECT 1 FROM Admin04..AlmNvCat005 B, Cajas01..CmoDat011 E 
					JOIN Cajas01..CmoTjCat004 C ON C.[Clave Articulo] = E.[Clave Articulo] AND E.OP = ISNULL(@pOpAct, '')
					WHERE RTRIM(B.CL) + RTRIM(B.SCL) = ISNULL(@cbLiner1, '')
				) BEGIN
					SELECT TOP 1 @pPresentacionPapel = B.TipoPresentacion, @pPresentacionArticulo = C.Papel, @pWaxableKote = B.WaxableKote, @pParafinado = C.Parafinado
					FROM Admin04..AlmNvCat005 B, Cajas01..CmoDat011 E 
					JOIN Cajas01..CmoTjCat004 C ON C.[Clave Articulo] = E.[Clave Articulo] AND E.OP = ISNULL(@pOpAct, '')
					WHERE RTRIM(B.CL) + RTRIM(B.SCL) = ISNULL(@cbLiner1, '');

					-- CAMBIO DE KRAFT A BLANCO... SE PROGRAMA BLANCO
					IF UPPER(RTRIM(@pPresentacionArticulo)) = 'KRAFT' AND UPPER(RTRIM(@pPresentacionPapel)) = 'BLANCO'
					BEGIN
						INSERT INTO @ResultadoValidacion (ID, OP, Liner1, PresentacionArticulo, PresentacionPapel, PintaCorr, PintaImp)
						VALUES (@aIdAncho, ISNULL(@pOpAct, ''), ISNULL(@cbLiner1, ''), UPPER(RTRIM(@pPresentacionArticulo)), UPPER(RTRIM(@pPresentacionPapel)), 0, 0)
						---- PREGUNTA AL USUARIO: PROGRAMA: @pOpAct CHR(13) ESTÁ INTENTANDO PROGRAMAR UN PAPEL BLANCO Y EL ARTÍCULO TIENE DEFINIDO UNA PRESENTACIÓN KRAFT...
						---- ¿DESEA CONTINUAR?
						---- SI ACEPTA CONTINUA, Y SALE DE WHILE
						--SELECT @I1 = 3;
						---- EN CASO CONTRARIO MUESTRA MENSAJE Y SALE
						---- APLIQUE LOS CAMBIOS CORRESPONDIENTES E INTENTELO NUEVAMENTE
						--GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
					END
					-- CAMBIO DE BLANCO A KRAFT... SE PROGRAMA KRAFT
					ELSE IF UPPER(RTRIM(@pPresentacionArticulo)) = 'BLANCO' AND UPPER(RTRIM(@pPresentacionPapel)) = 'KRAFT'
					BEGIN
						INSERT INTO @ResultadoValidacion (ID, OP, Liner1, PresentacionArticulo, PresentacionPapel, PintaCorr, PintaImp)
						VALUES (@aIdAncho, ISNULL(@pOpAct, ''), ISNULL(@cbLiner1, ''), UPPER(RTRIM(@pPresentacionArticulo)), UPPER(RTRIM(@pPresentacionPapel)), 1, 0);
						--SELECT @I1 = 3;
						---- PREGUNTA AL USUARIO: PROGRAMA: @pOpAct CHR(13) ESTÁ INTENTANDO PROGRAMAR UN PAPEL KRAFT Y EL ARTÍCULO TIENE DEFINIDO UNA PRESENTACIÓN BLANCO...
						---- ¿DESEA CONTINUAR?
						---- SI ACEPTA PREGUNTAR "PROGRAMA: @pOpAct CHR(13) SE LLEVARÁ A CABO EL PROCESO DE PINTADO EN CORRUGADORA..."
						--	-- SI ACEPTA, @wPintaCorr = true Y SALIR DE WHILE
						--	-- EN CASO CONTRARIO MUESTRA MENSAJE "APLIQUE LOS CAMBIOS CORRESPONDIENTES E INTENTELO NUEVAMENTE" Y SALE
						--	GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
						---- EN CASO CONTRARIO MOSTRAR MENSAJE "APLIQUE LOS CAMBIOS CORRESPONDIENTES OP: @pOpAct E INTENTELO NUEVAMENTE"
						--GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
					END
					-- CAMBIO DE BLANCO A BLANCO... PERO ART PARAFINADO Y PAPEL QUE NO ES WAXABLE/KOTE
					ELSE IF UPPER(RTRIM(@pPresentacionArticulo)) = 'BLANCO' AND UPPER(RTRIM(@pPresentacionPapel)) = 'BLANCO' AND @pWaxableKote = 0 AND @pParafinado = 1
					BEGIN
						INSERT INTO @ResultadoValidacion (ID, OP, Liner1, PresentacionArticulo, PresentacionPapel, PintaCorr, PintaImp)
						VALUES (
							@aIdAncho, ISNULL(@pOpAct, ''), ISNULL(@cbLiner1, ''), UPPER(RTRIM(@pPresentacionArticulo)), UPPER(RTRIM(@pPresentacionPapel)), 0, 1
						);
						--SELECT @I1 = 3;
						---- PREGUNTA AL USUARIO: PROGRAMA: @pOpAct CHR(13) SE LLEVARÁ A CABO EL PROCESO DE PINTADO EN IMPRESIÓN...
						---- ¿DESEA CONTINUAR?
						---- SI ACEPTA @wPintaImp = true Y SALIR DE WHILE
						---- EN CASO CONTRARIO MOSTRAR MENSAJE "APLIQUE LOS CAMBIOS CORRESPONDIENTES OP: @pOpAct E INTENTELO NUEVAMENTE"
						--GOTO SALIR_LLENAR_GRUPO_ARREGLOS;
					END
				END ELSE
				BEGIN
					INSERT INTO @ResultadoValidacion (ID, OP, Liner1, PresentacionArticulo, PresentacionPapel, PintaCorr, PintaImp, Validar)
					VALUES (@aIdAncho, ISNULL(@pOpAct, ''), ISNULL(@cbLiner1, ''), UPPER(RTRIM(@pPresentacionArticulo)), UPPER(RTRIM(@pPresentacionPapel)), 0, 0, 0);
				END

				SELECT @I1 = @I1 + 1;
			END
		END

SALTA_ARREGLO_VALIDADO:
		INSERT INTO @pAnchosPapelLeidos (ID)
		VALUES (@aIdAncho);
	END

	SELECT 1 AS Completado, 'OK' AS Mensaje;

SALIR_LLENAR_GRUPO_ARREGLOS:

	UPDATE @pArreglos SET Pintado1 = 1
	FROM @pArreglos A
	JOIN @ResultadoValidacion B ON A.ID = B.ID AND A.OP1 = B.OP;
	UPDATE @pArreglos SET Pintado2 = 1
	FROM @pArreglos A
	JOIN @ResultadoValidacion B ON A.ID = B.ID AND A.OP2 = B.OP;
	UPDATE @pArreglos SET Pintado3 = 1
	FROM @pArreglos A
	JOIN @ResultadoValidacion B ON A.ID = B.ID AND A.OP3 = B.OP;

	UPDATE @pArreglos SET ErrorResistencia = 1
	FROM @pArreglos A
	JOIN @ArreglosResistencia B ON A.ID = B.ID;

	SELECT Id, Message FROM @ResError

	SELECT ID,
		OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1,
		OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2,
		OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3,
		[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
		Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
		Puntos, Resistencia, Flauta, Tranf, Empate,
		Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
		Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd,
		Seleccionado, ErrorResistencia, Pintado1, Pintado2, Pintado3
	FROM @pArreglos;

	SELECT Id, Mensaje AS Message
	FROM @ArreglosResistencia;

	SELECT ID, OP, Liner1, PresentacionArticulo, PresentacionPapel, PintaCorr, PintaImp
	FROM @ResultadoValidacion;

	SET NOCOUNT OFF;
END


GO


