USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC16]    Script Date: 20/10/2022 08:41:01 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC16]
	@pZonaERP VARCHAR(2)						= NULL
	, @pUsuarioERP VARCHAR(6)					= NULL
	, @pModulo VARCHAR(20)						= NULL
	, @pCuchillas3 BIT							= NULL
	, @pResistencia VARCHAR(12)					= NULL
	, @pArreglosSeleccionados CPLDAT008TD_001	READONLY
	--, @ResultadoValidacion CMODAT017TD_001	READONLY
AS 
BEGIN 
	DECLARE @pAnchosPapelLeidos AS TABLE (ID INT);
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

	WHILE EXISTS(SELECT 1 FROM @pArreglosSeleccionados WHERE ID NOT IN (SELECT ID FROM @pAnchosPapelLeidos))
	BEGIN
		DECLARE @pTProc VARCHAR(5), @pF1 VARCHAR(5), @pF2 VARCHAR(5), @pF3 VARCHAR(5), @pNum INT, @pAP REAL
			, @pTmpPrepara SMALLINT, @pVelStd DECIMAL(9, 4), @pTmpProduc REAL, @pTmpTotal REAL, @pHORAACT VARCHAR(8)
			, @wPintaCorr BIT, @wPintaImp BIT, @I1 INT = 1

		DECLARE @aIdAncho INT, @aAnchoP REAL, @aTM2 REAL, @aRESISTENCIA VARCHAR(1), @aFlauta VARCHAR(10), @aRefile REAL
			, @aAnchoTotal REAL, @aMetrosLineales INT
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
			, @aRefile = Refile
		FROM @pArreglosSeleccionados
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

		---- INICIA GRABACIÓN DE ARREGLO
		---- DEFINE TIPO DE PREPARACIÓN
		--IF ISNULL(@aRESISTENCIA, '') = 'D'
		--BEGIN
		--	IF ISNULL(@aFlauta, '') != 'NO' AND LEN(ISNULL(@aFlauta, '')) != 2
		--	BEGIN
		--		SELECT 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@aRESISTENCIA, '');
		--		GOTO SALTA_ARREGLO_VALIDADO;
		--	END ELSE
		--	BEGIN
		--		SELECT @pTProc = 'CD0'
		--			, @pF1 = SUBSTRING(ISNULL(@aFlauta, ''), 1, 1)
		--			, @pF2 = SUBSTRING(ISNULL(@aFlauta, ''), 2, 1)
		--			, @pF3 = ''
		--	END
		--END
		--ELSE IF ISNULL(@aRESISTENCIA, '') = 'S'
		--BEGIN
		--	IF ISNULL(@aFlauta, '') != 'NO' AND LEN(ISNULL(@aFlauta, '')) != 1
		--	BEGIN
		--		SELECT 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@aRESISTENCIA, '');
		--		GOTO SALTA_ARREGLO_VALIDADO;
		--	END ELSE
		--	BEGIN
		--		SELECT @pTProc = 'CS0'
		--			, @pF1 = SUBSTRING(ISNULL(@aFlauta, ''), 1, 1)
		--			, @pF2 = ''
		--			, @pF3 = ''
		--	END
		--END
		--ELSE IF ISNULL(@aRESISTENCIA, '') = 'T'
		--BEGIN
		--	IF ISNULL(@aFlauta, '') != 'NO' AND LEN(ISNULL(@aFlauta, '')) != 3
		--	BEGIN
		--		SELECT 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@aRESISTENCIA, '');
		--		GOTO SALTA_ARREGLO_VALIDADO;
		--	END ELSE
		--	BEGIN
		--		SELECT @pTProc = 'TC'
		--			, @pF1 = SUBSTRING(ISNULL(@aFlauta, ''), 1, 1)
		--			, @pF2 = SUBSTRING(ISNULL(@aFlauta, ''), 2, 1)
		--			, @pF3 = SUBSTRING(ISNULL(@aFlauta, ''), 3, 1)
		--	END
		--END ELSE
		--BEGIN
		--	SELECT 'FLAUTA ' + ISNULL(@aFlauta, '') + ' DE ARREGLO ' + CONVERT(VARCHAR, @aIdAncho) + ' NO COINCIDE CON RESISTENCIA ' + ISNULL(@aRESISTENCIA, '');
		--	GOTO SALTA_ARREGLO_VALIDADO;
		--END

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

		SELECT @pTmpProduc = @aMetrosLineales / CASE WHEN ISNULL(@pVelStd, 0) > 0 THEN @pVelStd ELSE 1 END;
		SELECT @pTmpTotal = @pTmpProduc
			, @pHORAACT = LEFT(CONVERT(VARCHAR, CONVERT(TIME, GETDATE())), 8)
			, @pAP = CASE WHEN @cbPulg = 1 THEN ISNULL(@cbAnchoC, 0) ELSE (ISNULL(@cbAnchoC, 0) / 0.2539) / 10 END;
		

		BEGIN TRANSACTION
		BEGIN TRY

			-- CONTINUAR
			DECLARE @pTmpAnchoStd REAL, @pTmpOP VARCHAR(12), @pMCSTD REAL, @pEficiencia DECIMAL(9, 4), @pNextPrograma INT

			SELECT TOP 1 @pTmpAnchoStd = AnchoStd, @pTmpOP = OP1
			FROM @pArreglosSeleccionados
			WHERE ID = @aIdAncho;

			IF ISNULL(@pZonaERP, '') = '01'
			BEGIN
				SELECT TOP 1 @pNextPrograma = ISNULL(Corrugadora, 0)
				FROM Cajas01..CmoDat005
			END
			ELSE IF ISNULL(@pZonaERP, '') = '02'
			BEGIN
				SELECT TOP 1 @pNextPrograma = ISNULL(Corrugadora, 0)
				FROM Cajas02..CmoDat005
			END
			ELSE IF ISNULL(@pZonaERP, '') = '05'
			BEGIN
				SELECT TOP 1 @pNextPrograma = ISNULL(Corrugadora, 0)
				FROM Cajas05..CmoDat005
			END
		
			SELECT @pMCSTD = 
				CASE WHEN @pTmpAnchoStd > 0 AND @pTmpOP = @aOP1 
					THEN ((@pTmpAnchoStd * 2.54) * @aMetrosLineales) / 100
					ELSE 0
				END;

			DECLARE @tmpCMODAT014 AS TABLE (
				ID INT, OP VARCHAR(10), Fecha SMALLDATETIME, Multiplos DECIMAL(4, 2), Ancho REAL, Largo REAL, Lam INT, Piezas INT, Rest VARCHAR(12), ConScore BIT,
				TFlauta VARCHAR(3), CProc VARCHAR(12), DProc VARCHAR(12), Comenta VARCHAR(MAX)
			);

			DECLARE @pMULTACT REAL, @pAnchAct REAL, @pLargAct REAL, @pLamAct REAL, @pArtAct REAL, @pRestAct AS VARCHAR(12), @pConScore BIT
				, @pTFlauta VARCHAR(3), @pCProc VARCHAR(12), @pDProc VARCHAR(12)

			IF ISNULL(@pZonaERP, '') = '01'
			BEGIN
				SELECT @pEficiencia = ISNULL(Eficiencia, 0)
				FROM Cajas01..CmoCat011
				WHERE [Clave Maquina] = 'CORR1'

				INSERT INTO Cajas01..CmoDat012 (Programa, 
					[Clave Proceso], [Ancho Utilizado], [Ancho Promedio], [Minutos Std Preparacion], [Minutos Std Produccion], 
					[Velocidad Std], Refile, Fecha, [Hora Programa], [Metros Lineales], M2, [Kg Papel], Horas, [Fecha Sistema], [Hora Sistema], 
					Usuario, Estatus, Imprime, Orden, PintadoCorr, PintadoImp, McSTD, AnchoSTD, ModuloInsert, EficienciaPrograma
				)
				VALUES (@pNextPrograma, 
					@pTProc, ((@aAnchoTotal * 10) / 10), ((@aAnchoP * 10) / 10), @pTmpPrepara, @pTmpProduc,
					@pVelStd, @aRefile, GETDATE(), @pHORAACT, ((@aMetrosLineales * 10) / 10), @aTM2, ((@cbKgPapel * 10) / 10), @pTmpTotal, GETDATE(), @pHORAACT, 
					@pUsuarioERP, 'P', 0, 0, @wPintaCorr, @wPintaImp, @pMCSTD, @pTmpAnchoStd, @pModulo, @pEficiencia
				);

				-- GRABA COMBINACIÓN DE PAPEL
				INSERT INTO Cajas01..CmoDat014 (Programa, 
					Liner1, [Ancho L1], Empalme1, [Ancho Empalme1],
					Liner2, [Ancho L2], Empalme2, [Ancho Empalme2],
					Liner3, [Ancho L3], Empalme3, [Ancho Empalme3],
					Liner4, [Ancho L4], Empalme4, [Ancho Empalme4],
					Corrugado1, [Ancho C1], [Empalme C1], [Ancho Empalme C1],
					Corrugado2, [Ancho C2], [Empalme C2], [Ancho Empalme C2],
					Corrugado3, [Ancho C3], [Empalme C3], [Ancho Empalme C3],
					Flauta1, Flauta2, Flauta3, ModuloInsert, UsuarioInsert, FechaInsert
				)
				VALUES (@pNextPrograma,
					@cbLiner1, @cbAL1, @cbEmpalme1, @cbALE1,
					@cbLiner2, @cbAL2, @cbEmpalme2, @cbALE2,
					@cbLiner3, @cbAL3, @cbEmpalme3, @cbALE3,
					@cbLiner4, @cbAL4, @cbEmpalme4, @cbALE4,
					@cbCorrugado1, @cbAC1, @cbEmpalmeC1, @cbACE1,
					@cbCorrugado2, @cbAC2, @cbEmpalmeC2, @cbACE2,
					@cbCorrugado3, @cbAC3, @cbEmpalmeC3, @cbACE3,
					@pF1, @pF2, @pF3, @pModulo, @pUsuarioERP, GETDATE()
				);
			END
			ELSE IF ISNULL(@pZonaERP, '') = '02'
			BEGIN
				SELECT @pEficiencia = ISNULL(Eficiencia, 0)
				FROM Cajas02..CmoCat011
				WHERE [Clave Maquina] = 'CORR1'

				INSERT INTO Cajas02..CmoDat012 (
					Programa, [Clave Proceso], [Ancho Utilizado], [Ancho Promedio], [Minutos Std Preparacion], [Minutos Std Produccion], 
					[Velocidad Std], Refile, Fecha, [Hora Programa], [Metros Lineales], M2, [Kg Papel], Horas, [Fecha Sistema], [Hora Sistema], 
					Usuario, Estatus, Imprime, Orden, PintadoCorr, PintadoImp, McSTD, AnchoSTD, ModuloInsert, EficienciaPrograma
				)
				VALUES (
					@pNextPrograma, @pTProc, ((@aAnchoTotal * 10) / 10), ((@aAnchoP * 10) / 10), @pTmpPrepara, @pTmpProduc,
					@pVelStd, @aRefile, GETDATE(), @pHORAACT, ((@aMetrosLineales * 10) / 10), @aTM2, ((@cbKgPapel * 10) / 10), @pTmpTotal, GETDATE(), @pHORAACT, 
					@pUsuarioERP, 'P', 0, 0, @wPintaCorr, @wPintaImp, @pMCSTD, @pTmpAnchoStd, @pModulo, @pEficiencia
				);

				-- GRABA COMBINACIÓN DE PAPEL
				INSERT INTO Cajas02..CmoDat014 (Programa, 
					Liner1, [Ancho L1], Empalme1, [Ancho Empalme1],
					Liner2, [Ancho L2], Empalme2, [Ancho Empalme2],
					Liner3, [Ancho L3], Empalme3, [Ancho Empalme3],
					Liner4, [Ancho L4], Empalme4, [Ancho Empalme4],
					Corrugado1, [Ancho C1], [Empalme C1], [Ancho Empalme C1],
					Corrugado2, [Ancho C2], [Empalme C2], [Ancho Empalme C2],
					Corrugado3, [Ancho C3], [Empalme C3], [Ancho Empalme C3],
					Flauta1, Flauta2, Flauta3, ModuloInsert, UsuarioInsert, FechaInsert
				)
				VALUES (@pNextPrograma,
					@cbLiner1, @cbAL1, @cbEmpalme1, @cbALE1,
					@cbLiner2, @cbAL2, @cbEmpalme2, @cbALE2,
					@cbLiner3, @cbAL3, @cbEmpalme3, @cbALE3,
					@cbLiner4, @cbAL4, @cbEmpalme4, @cbALE4,
					@cbCorrugado1, @cbAC1, @cbEmpalmeC1, @cbACE1,
					@cbCorrugado2, @cbAC2, @cbEmpalmeC2, @cbACE2,
					@cbCorrugado3, @cbAC3, @cbEmpalmeC3, @cbACE3,
					@pF1, @pF2, @pF3, @pModulo, @pUsuarioERP, GETDATE()
				);
			END
			ELSE IF ISNULL(@pZonaERP, '') = '05'
			BEGIN
				SELECT @pEficiencia = ISNULL(Eficiencia, 0)
				FROM Cajas05..CmoCat011
				WHERE [Clave Maquina] = 'CORR1'

				INSERT INTO Cajas05..CmoDat012 (
					Programa, [Clave Proceso], [Ancho Utilizado], [Ancho Promedio], [Minutos Std Preparacion], [Minutos Std Produccion], 
					[Velocidad Std], Refile, Fecha, [Hora Programa], [Metros Lineales], M2, [Kg Papel], Horas, [Fecha Sistema], [Hora Sistema], 
					Usuario, Estatus, Imprime, Orden, PintadoCorr, PintadoImp, McSTD, AnchoSTD, ModuloInsert, EficienciaPrograma
				)
				VALUES (
					@pNextPrograma, @pTProc, ((@aAnchoTotal * 10) / 10), ((@aAnchoP * 10) / 10), @pTmpPrepara, @pTmpProduc,
					@pVelStd, @aRefile, GETDATE(), @pHORAACT, ((@aMetrosLineales * 10) / 10), @aTM2, ((@cbKgPapel * 10) / 10), @pTmpTotal, GETDATE(), @pHORAACT, 
					@pUsuarioERP, 'P', 0, 0, @wPintaCorr, @wPintaImp, @pMCSTD, @pTmpAnchoStd, @pModulo, @pEficiencia
				);

				-- GRABA COMBINACIÓN DE PAPEL
				INSERT INTO Cajas05..CmoDat014 (Programa, 
					Liner1, [Ancho L1], Empalme1, [Ancho Empalme1],
					Liner2, [Ancho L2], Empalme2, [Ancho Empalme2],
					Liner3, [Ancho L3], Empalme3, [Ancho Empalme3],
					Liner4, [Ancho L4], Empalme4, [Ancho Empalme4],
					Corrugado1, [Ancho C1], [Empalme C1], [Ancho Empalme C1],
					Corrugado2, [Ancho C2], [Empalme C2], [Ancho Empalme C2],
					Corrugado3, [Ancho C3], [Empalme C3], [Ancho Empalme C3],
					Flauta1, Flauta2, Flauta3, ModuloInsert, UsuarioInsert, FechaInsert
				)
				VALUES (@pNextPrograma,
					@cbLiner1, @cbAL1, @cbEmpalme1, @cbALE1,
					@cbLiner2, @cbAL2, @cbEmpalme2, @cbALE2,
					@cbLiner3, @cbAL3, @cbEmpalme3, @cbALE3,
					@cbLiner4, @cbAL4, @cbEmpalme4, @cbALE4,
					@cbCorrugado1, @cbAC1, @cbEmpalmeC1, @cbACE1,
					@cbCorrugado2, @cbAC2, @cbEmpalmeC2, @cbACE2,
					@cbCorrugado3, @cbAC3, @cbEmpalmeC3, @cbACE3,
					@pF1, @pF2, @pF3, @pModulo, @pUsuarioERP, GETDATE()
				);
			END

			-- GRABAR DETALLE OP PROGRAMA
			INSERT INTO @tmpCMODAT014 (ID, OP, Multiplos, Ancho, Largo, Lam, Piezas, Rest, ConScore)
			VALUES (1, @aOP1, @aMultiplos1, @aAncho1, @aLargo1, @aLam1, @aPiezas1, @aRest1, @aConScore)
				, (2, @aOP2, @aMultiplos2, @aAncho2, @aLargo2, @aLam2, @aPiezas2, @aRest2, @aConScore2)
				, (3, @aOP3, @aMultiplos3, @aAncho3, @aLargo3, @aLam3, @aPiezas3, @aRest3, @aConScore3);

			DECLARE @pComenta VARCHAR(MAX);

			DECLARE @pOpAct VARCHAR(10)

			SELECT @I1 = 1; 
			WHILE @I1 < @pNum
			BEGIN
				SELECT @pComenta = '',
					@pOpAct = ISNULL(
						CASE WHEN @I1 = 1 THEN ISNULL(@aOP1, '') 
							WHEN @I1 = 2 THEN ISNULL(@aOP2, '') 
							WHEN @I1 = 3 THEN ISNULL(@aOP3, '') 
							ELSE NULL 
						END
					, '');

				IF ISNULL(@pZonaERP, '') = '01'
				BEGIN
					SELECT @pTFlauta = ISNULL(Flauta, ''), @pCProc = ISNULL(Cproceso, '')
					FROM Cajas01..CmoTjCat004 A
					JOIN Cajas01..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
					WHERE B.OP = @pOpAct
				END
				ELSE IF ISNULL(@pZonaERP, '') = '02'
				BEGIN
					SELECT @pTFlauta = ISNULL(Flauta, ''), @pCProc = ISNULL(Cproceso, '')
					FROM Cajas02..CmoTjCat004 A
					JOIN Cajas02..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
					WHERE B.OP = @pOpAct
				END
				ELSE IF ISNULL(@pZonaERP, '') = '05'
				BEGIN
					SELECT @pTFlauta = ISNULL(Flauta, ''), @pCProc = ISNULL(Cproceso, '')
					FROM Cajas05..CmoTjCat004 A
					JOIN Cajas05..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
					WHERE B.OP = @pOpAct
				END
			
				SELECT @pComenta = CASE WHEN ISNULL(@wPintaCorr, 0) = 1 THEN ' Com. Aut. APLICA PROCESO DE PINTADO ' ELSE '' END;
				SELECT @pComenta = @pComenta + CASE WHEN ISNULL(@pTFlauta, '') = 'B' AND @I1 = 1 THEN 'Cuidado Flauta B ' ELSE '' END;

				SELECT @pDProc = ISNULL(Descripcion, '')
				FROM CplDat015 
				WHERE Clave = ISNULL(@pCProc, '');

				SELECT @pComenta = @pComenta + CASE WHEN @pDProc != '' AND @pTFlauta = 'B' THEN @pDProc ELSE '' END;
				SELECT @pComenta = CASE WHEN @pDProc != '' AND @pTFlauta != 'B' THEN @pDProc ELSE @pComenta END;

				UPDATE @tmpCMODAT014 SET
					TFlauta = @pTFlauta, CProc = @pCProc, DProc = @pDProc, Comenta = @pComenta
				WHERE ID = @I1;
			END

			SELECT TOP 1 @pComenta = STUFF(
				(
					SELECT ', ' + CONVERT(VARCHAR, Comenta) AS [text()]
					FROM @tmpCMODAT014
					FOR XML PATH('')
				), 1, 2, '') 
			FROM @tmpCMODAT014

			IF ISNULL(@pZonaERP, '') = '01'
			BEGIN
				INSERT INTO Cajas01..CmoDat013 (
					Programa, OP, Resistencia, Flauta, [Numero Cortes], [Piezas Corte], [Hojas Corte], 
					[Ancho Hoja], [Largo Hoja], Estatus, orden, secuencia, ConScore
				)
				SELECT @pNextPrograma, OP, Rest, @aFlauta, Lam, ((Piezas / Lam) * Multiplos), (Multiplos + 0.01), 
					((Ancho / 10) * 10), ((Largo / 10) * 10), 'P', 0, ID, ConScore
				FROM @tmpCMODAT014;

				-- ACTUALIZA FOLIO CORRUGADORA
				UPDATE Cajas01..CmoDat005 SET
					Corrugadora = @pNextPrograma + 1;
				
				-- ACTUALIZA COMENTARIOS DE PROGRAMACIÓN
				UPDATE Cajas01..CmoDat012 SET
					Comentarios = @pComenta,
					ModuloUpdate = @pModulo,
					FechaUpdate = GETDATE(),
					UsuarioUpdate = @pUsuarioERP
				WHERE Programa = @pNextPrograma
			END
			ELSE IF ISNULL(@pZonaERP, '') = '02'
			BEGIN
				INSERT INTO Cajas02..CmoDat013 (
					Programa, OP, Resistencia, Flauta, [Numero Cortes], [Piezas Corte], [Hojas Corte], 
					[Ancho Hoja], [Largo Hoja], Estatus, orden, secuencia, ConScore
				)
				SELECT @pNextPrograma, OP, Rest, @aFlauta, Lam, ((Piezas / Lam) * Multiplos), (Multiplos + 0.01), 
					((Ancho / 10) * 10), ((Largo / 10) * 10), 'P', 0, ID, ConScore
				FROM @tmpCMODAT014;
			
				-- ACTUALIZA FOLIO CORRUGADORA
				UPDATE Cajas02..CmoDat005 SET
					Corrugadora = @pNextPrograma + 1;
				
				-- ACTUALIZA COMENTARIOS DE PROGRAMACIÓN
				UPDATE Cajas02..CmoDat012 SET
					Comentarios = @pComenta,
					ModuloUpdate = @pModulo,
					FechaUpdate = GETDATE(),
					UsuarioUpdate = @pUsuarioERP
				WHERE Programa = @pNextPrograma
			END
			ELSE IF ISNULL(@pZonaERP, '') = '05'
			BEGIN
				INSERT INTO Cajas05..CmoDat013 (
					Programa, OP, Resistencia, Flauta, [Numero Cortes], [Piezas Corte], [Hojas Corte], 
					[Ancho Hoja], [Largo Hoja], Estatus, orden, secuencia, ConScore
				)
				SELECT @pNextPrograma, OP, Rest, @aFlauta, Lam, ((Piezas / Lam) * Multiplos), (Multiplos + 0.01), 
					((Ancho / 10) * 10), ((Largo / 10) * 10), 'P', 0, ID, ConScore
				FROM @tmpCMODAT014;
			
				-- ACTUALIZA FOLIO CORRUGADORA
				UPDATE Cajas05..CmoDat005 SET
					Corrugadora = @pNextPrograma + 1;

				-- ACTUALIZA COMENTARIOS DE PROGRAMACIÓN
				UPDATE Cajas05..CmoDat012 SET
					Comentarios = @pComenta,
					ModuloUpdate = @pModulo,
					FechaUpdate = GETDATE(),
					UsuarioUpdate = @pUsuarioERP
				WHERE Programa = @pNextPrograma
			END

			-- MARCA ARREGLO VALIDADO
			UPDATE CplDat009 SET
				Tranf = 1
			WHERE ID = @aIdAncho;

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			SELECT -1 AS Id, ERROR_MESSAGE() AS OP1
			GOTO SALIR;
		END CATCH
		
		-- ACTUALIZA KILOGRAMOS
		EXEC dbo.FCAPROG015MWSPA9 @pNextPrograma = @pNextPrograma, @pZonaERP = @pZonaERP, @pUsuarioERP = @pUsuarioERP, @pModulo = @pModulo;

SALTA_ARREGLO_VALIDADO:
		INSERT INTO @pAnchosPapelLeidos (ID)
		VALUES (@aIdAncho);
	END
	
	EXEC dbo.FCAPROG015MWSPA6 @pZonaERP = @pZonaERP, @pUsuarioERP = @pUsuarioERP, @pResistencia = @pResistencia;

	EXEC dbo.FCAPROG015MWSPA8 @pZonaERP = @pZonaERP, @pCuchillas3 = @pCuchillas3;

	--DECLARE @CPLDAT009 CPLDAT009TD_001; /*AS TABLE (ID INT,
	--	OP1 VARCHAR(10), Fecha1 SMALLDATETIME, Multiplos1 DECIMAL(4, 2), Ancho1 REAL, Largo1 REAL, Lam1 INT, Piezas1 INT,
	--	OP2 VARCHAR(10), Fecha2 SMALLDATETIME, Multiplos2 DECIMAL(4, 2), Ancho2 REAL, Largo2 REAL, Lam2 INT, Piezas2 INT,
	--	OP3 VARCHAR(10), Fecha3 SMALLDATETIME, Multiplos3 DECIMAL(4, 2), Ancho3 REAL, Largo3 REAL, Lam3 INT, Piezas3 INT,
	--	[Ancho Total] REAL, [Ancho Papel] REAL, Refile REAL, [Metros Lineales] INT,
	--	Producto1 VARCHAR(10), Producto2 VARCHAR(10), Producto3 VARCHAR(10), Parcial1 SMALLINT, Parcial2 SMALLINT, Parcial3 SMALLINT,
	--	Puntos INT, Resistencia VARCHAR(12), Flauta VARCHAR(3), Tranf BIT, Empate VARCHAR(25),
	--	Cliente1 VARCHAR(80), Articulo1 VARCHAR(50), Cliente2 VARCHAR(80), Articulo2 VARCHAR(50), Cliente3 VARCHAR(80), Articulo3 VARCHAR(50),
	--	Rest1 VARCHAR(12), Rest2 VARCHAR(12), Rest3 VARCHAR(12), ConScore BIT, ConScore2 BIT, ConScore3 BIT, AnchoStd DECIMAL(6, 2), Seleccionado BIT
	--);*/
	
	--INSERT INTO @CPLDAT009 (ID,
	--	OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1, 
	--	OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2, 
	--	OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3, 
	--	[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
	--	Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
	--	Puntos, Resistencia, Flauta, Tranf, Empate, 
	--	Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
	--	Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd, Seleccionado
	--)
	EXEC dbo.FCAPROG015MWSPC11 @pZonaERP = @pZonaERP, @pTabla = 2

	--SELECT ID,
	--	OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1, 
	--	OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2, 
	--	OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3, 
	--	[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
	--	Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
	--	Puntos, Resistencia, Flauta, Tranf, Empate, 
	--	Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
	--	Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd, Seleccionado
	--FROM @CPLDAT009;

SALIR:
	
END
GO


