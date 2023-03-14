USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPA6]    Script Date: 20/10/2022 08:35:56 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPA6]
	@pZonaERP VARCHAR(2)				= NULL
	, @pUsuarioERP VARCHAR(6)			= NULL
	, @pResistencia VARCHAR(12)			= NULL
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @pGrpafin INT;

	DECLARE @pNum INT = 0, @pNum1 INT = 0, @pCon INT = 0, @pFlauta VARCHAR(6), @pValRes INT
		, @pFa DECIMAL(18, 2), @pFb DECIMAL(18, 2), @pFc DECIMAL(18, 2)
		, @pArmadoS INT, @pArmadoD INT, @pRMin REAL = 0, @pRMax REAL = 0, @pRstb BIT;

	DECLARE @Corr AS TABLE (ID INT IDENTITY(1,1), v1 VARCHAR(24), v2 REAL, v3 REAL, v4 REAL, v5 REAL, v6 REAL);
	DECLARE @CorrLeidos AS TABLE (ID INT);
	DECLARE @Papel AS TABLE (ID INT IDENTITY(1,1), v1 VARCHAR(24), v2 REAL, v3 REAL, v4 REAL, v5 VARCHAR(4), v6 REAL, v7 REAL);
	DECLARE @PapelLeidos AS TABLE (ID INT);
	DECLARE @PapelLeidos2 AS TABLE (ID INT);
	DECLARE @PapelLeidos3 AS TABLE (ID INT);
	DECLARE @PapelLeidos4 AS TABLE (ID INT);
	DECLARE @Repite AS TABLE (ID INT IDENTITY(1,1), ClaveC VARCHAR(24));
	DECLARE @Ancho AS TABLE (ID INT IDENTITY(1,1), Ancho REAL);
	DECLARE @CPLDAT002 AS TABLE (
		Clave VARCHAR(28), Orden SMALLINT
		, Liner1 VARCHAR(12), AnchoL1 DECIMAL(4,2), Liner2 VARCHAR(12), AnchoL2 DECIMAL(4,2)
		, Liner3 VARCHAR(12), AnchoL3 DECIMAL(4,2), Liner4 VARCHAR(12), AnchoL4 DECIMAL(4,2)
		, Corrugado1 VARCHAR(12), AnchoC1 DECIMAL(4,2), Corrugado2 VARCHAR(12), AnchoC2 DECIMAL(4,2), Corrugado3 VARCHAR(12), AnchoC3 DECIMAL(4,2)
		, CostoM2 REAL, PesoM2 REAL, Mullen REAL, MullenMaximo REAL, EdgeCrush FLOAT, Factor REAL, Ancho REAL, Metros INT
	);
	DECLARE @RestAf AS TABLE (ID INT IDENTITY(1,1), Clave VARCHAR(20));
			
	INSERT INTO @Corr (v1, v2, v3, v4, v5, v6)
	SELECT [Clave Papel], (Peso / 1000), Costo, Resistencia, Ancho, (Totales * 1000) / (Peso / 1000) / (Ancho / 100)
	FROM CPLDAT001
	WHERE Tipo = 'C' AND Resistencia > 0 AND Totales > 0 AND Ancho > 125;

	IF NOT EXISTS(SELECT 1 FROM @Corr)
	BEGIN
		SELECT 'No están definidos los corrugados a utilizar, indique el valor de CMT' AS Mensaje;
		GOTO SALIR_COMBINACIONES_POSIBLES;
	END

	SELECT @pNum = COUNT(1) FROM @Corr;

	-- CARGAR PAPEL Y VERIFICAR VALORES DE MULLEN
	INSERT INTO @Papel (v1, v2, v3, v4, v5, v6, v7)
	SELECT [Clave Papel], (Peso / 1000), Costo, Resistencia, Tipo, Ancho, ((Totales / 1000) / (Peso / 1000) / (Ancho / 100))
	FROM CPLDAT001
	WHERE Tipo != 'C' AND Resistencia > 0 AND Totales > 0;

	IF NOT EXISTS(SELECT 1 FROM @Papel)
	BEGIN
		SELECT 'No están definidos los papeles a utilizar, indique el valor de MULLEN' AS Mensaje;
		GOTO SALIR_COMBINACIONES_POSIBLES;
	END

	SELECT @pNum1 = COUNT(1) FROM @Papel;

	-- ELIMINAR VALORES DE TABLAS
	DELETE FROM CPLDAT002;
	DELETE FROM CPLDAT003 WHERE Usar = 0;
	DELETE FROM CPLDAT004;

	DECLARE @pRestAfin BIT, @pDiasAdelanto SMALLINT, @pExcedente SMALLINT, @pFechaLimite DATE
	SELECT @pRestAfin = ISNULL([Resistenias Afines], 0)
		, @pDiasAdelanto = [Dias Adelanto]
		, @pExcedente = Excedente
		, @pFechaLimite = DATEADD(DAY, [Dias Adelanto], GETDATE())
	FROM CPLDAT006;

	
	-- PETICIÓN DE VALOR DE RESISTENCIA
	SELECT @pResistencia = LTRIM(RTRIM(ISNULL(@pResistencia, '')));
	IF ISNULL(@pResistencia, '') = ''
	BEGIN
		GOTO SALIR_COMBINACIONES_POSIBLES;
	END
	
	-- VALIDA QUE LA RESISTENCIA ESTÉ ACTIVA Y VERIFICA TIPO DE CORRUGADO A PROGRAMAR
	IF ISNULL(@pZonaERP, '') = '01'
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM Cajas01..CmoCat016 WHERE Clave = ISNULL(@pResistencia, '') AND Status = 1)
		BEGIN
			SELECT 'RESISTENCIA ' + ISNULL(@pResistencia, '') + ' Inexistente o dada de baja... Verifique' AS Mensaje;
			GOTO SALIR_COMBINACIONES_POSIBLES;
		END

		SELECT TOP 1 @pFlauta = RTRIM(RTRIM(ISNULL([Primera Flauta], '')) + RTRIM(ISNULL([Segunda Flauta], '')) + RTRIM(ISNULL([Tercera Flauta], '')))
		FROM Cajas01..CmoCat016
		WHERE Clave = ISNULL(@pResistencia, '');

		SELECT @pCon = CASE WHEN LEN(@pFlauta) = 1 THEN 9 WHEN LEN(@pFlauta) = 2 THEN 10 WHEN LEN(@pFlauta) = 3 THEN 50 ELSE 0 END;
	END
	ELSE IF ISNULL(@pZonaERP, '') = '02'
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM Cajas02..CmoCat016 WHERE Clave = ISNULL(@pResistencia, '') AND Status = 1)
		BEGIN
			SELECT 'RESISTENCIA ' + ISNULL(@pResistencia, '') + ' Inexistente o dada de baja... Verifique' AS Mensaje;
			GOTO SALIR_COMBINACIONES_POSIBLES;
		END

		SELECT TOP 1 @pFlauta = RTRIM(RTRIM(ISNULL([Primera Flauta], '')) + RTRIM(ISNULL([Segunda Flauta], '')) + RTRIM(ISNULL([Tercera Flauta], '')))
		FROM Cajas02..CmoCat016
		WHERE Clave = ISNULL(@pResistencia, '');

		SELECT @pCon = CASE WHEN LEN(@pFlauta) = 1 THEN 9 WHEN LEN(@pFlauta) = 2 THEN 10 WHEN LEN(@pFlauta) = 3 THEN 50 ELSE 0 END;
	END
	ELSE IF ISNULL(@pZonaERP, '') = '05'
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM Cajas05..CmoCat016 WHERE Clave = ISNULL(@pResistencia, '') AND Status = 1)
		BEGIN
			SELECT 'RESISTENCIA ' + ISNULL(@pResistencia, '') + ' Inexistente o dada de baja... Verifique' AS Mensaje;
			GOTO SALIR_COMBINACIONES_POSIBLES;
		END

		SELECT TOP 1 @pFlauta = RTRIM(RTRIM(ISNULL([Primera Flauta], '')) + RTRIM(ISNULL([Segunda Flauta], '')) + RTRIM(ISNULL([Tercera Flauta], '')))
		FROM Cajas05..CmoCat016
		WHERE Clave = ISNULL(@pResistencia, '');

		SELECT @pCon = CASE WHEN LEN(@pFlauta) = 1 THEN 9 WHEN LEN(@pFlauta) = 2 THEN 10 WHEN LEN(@pFlauta) = 3 THEN 50 ELSE 0 END;
	END

	SELECT @pValRes = CASE WHEN ISNULL(@pResistencia, '') = 'SG' OR ISNULL(@pResistencia, '') = 'SGB' THEN 7 ELSE 0 END;

	-- DATOS DE FLAUTAS Y RESISTENCIAS MÁXIMAS
	SELECT @pFa = 1.59, @pFb = 1.33, @pFc = 1.42 -- VALORES DE FLAUTAS
		, @pArmadoS = 24, @pArmadoD = 26;

	SELECT @pRstb = CASE WHEN RIGHT(RTRIM(ISNULL(@pResistencia, '')), 1) = 'B' THEN 1 ELSE 0 END;
	
	-- DEFINICIÓN DE RESISTENCIAS
	SELECT @pRMin = 0, @pRMax = 0;
	IF EXISTS(SELECT 1 FROM CPLDAT007 WHERE Clave = ISNULL(@pResistencia, ''))
	BEGIN
		SELECT TOP 1 @pRMin = ISNULL([Resistencia Minima], 0)
			, @pRMax = ISNULL([Resistencia Maxima], 0)
		FROM CPLDAT007
		WHERE Clave = ISNULL(@pResistencia, '');

		UPDATE CplDat014 SET 
			ClaveProceso = '',
			[Clave Resistencia] = ISNULL(@pResistencia, ''),
			Usuario = ISNULL(@pUsuarioERP, ''),
			[Fecha Sistema] = GETDATE();
	END ELSE
	BEGIN
		SELECT 'Resistencia no definida, dar de alta ' + CONVERT(VARCHAR, @pCon) AS Mensaje;
		GOTO SALIR_COMBINACIONES_POSIBLES;
	END

	DECLARE @pContLam DECIMAL(18, 2) = 0, @pPaso1 INT = 0;
	DECLARE @pIdCorr INT, @pIdPapel INT, @pIdPapel2 INT, @pIdPapel3 INT, @pIdPapel4 INT, @pClaveC VARCHAR(24)
		, @pCorrVal1 VARCHAR(24), @pCorrVal2 REAL, @pCorrVal3 REAL, @pCorrVal4 REAL, @pCorrVal5 REAL, @pCorrVal6 REAL
		, @pPapelVal1_1 VARCHAR(24), @pPapelVal2_1 REAL, @pPapelVal3_1 REAL, @pPapelVal4_1 REAL, @pPapelVal5_1 VARCHAR(4), @pPapelVal6_1 REAL, @pPapelVal7_1 REAL
		, @pPapelVal1_2 VARCHAR(24), @pPapelVal2_2 REAL, @pPapelVal3_2 REAL, @pPapelVal4_2 REAL, @pPapelVal5_2 VARCHAR(4), @pPapelVal6_2 REAL, @pPapelVal7_2 REAL
		, @pPapelVal1_3 VARCHAR(24), @pPapelVal2_3 REAL, @pPapelVal3_3 REAL, @pPapelVal4_3 REAL, @pPapelVal5_3 VARCHAR(4), @pPapelVal6_3 REAL, @pPapelVal7_3 REAL
		, @pPapelVal1_4 VARCHAR(24), @pPapelVal2_4 REAL, @pPapelVal3_4 REAL, @pPapelVal4_4 REAL, @pPapelVal5_4 VARCHAR(4), @pPapelVal6_4 REAL, @pPapelVal7_4 REAL
		, @pL1 VARCHAR(24), @pM1 VARCHAR(24), @pL2 VARCHAR(24), @pM2 VARCHAR(24), @pL3 VARCHAR(24), @pM3 VARCHAR(24), @pL4 VARCHAR(24)
		, @pPeso REAL, @pCosto REAL, @pMullen REAL, @pCMT REAL, @pMtsLin REAL, @pMtsLinL REAL, @pPesoLin REAL, @pMullenM REAL
		, @pEdge REAL, @pFactor REAL;

	-- INICIO DE CALCULOS
	WHILE EXISTS(SELECT 1 FROM @Corr WHERE ID NOT IN (SELECT ID FROM @CorrLeidos)) -- RECORRE CORRUGADOS ENCONTRADOS
	BEGIN
		-- OBTENER DATOS DEL PRIMER CORRUGADO
		SELECT TOP 1 @pIdCorr = ID, @pCorrVal1 = v1, @pCorrVal2 = v2, @pCorrVal3 = v3, @pCorrVal4 = v4, @pCorrVal5 = v5, @pCorrVal6 = v6
		FROM @Corr 
		WHERE ID NOT IN (SELECT ID FROM @CorrLeidos);

		-- RECORRE LINER EXTERIOR
		WHILE EXISTS(SELECT 1 FROM @Papel WHERE ID NOT IN (SELECT ID FROM @PapelLeidos)) -- NUM1
		BEGIN
			SELECT TOP 1 @pIdPapel = ID, @pPapelVal1_1 = v1, @pPapelVal2_1 = v2, @pPapelVal3_1 = v3, @pPapelVal4_1 = v4, @pPapelVal5_1 = v5, @pPapelVal6_1 = v6, @pPapelVal7_1 = v7
			FROM @Papel 
			WHERE ID NOT IN (SELECT ID FROM @PapelLeidos);

			-- VERIFICA ANCHO DE PAPELES DIFERENTES
			IF @pCorrVal5 != @pPapelVal6_1 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO4; END

			-- INICIA DE LINER INTERIOR O INTERMEDIO
			WHILE EXISTS(SELECT 1 FROM @Papel WHERE ID NOT IN (SELECT ID FROM @PapelLeidos2)) -- NUM2
			BEGIN
				SELECT TOP 1 @pIdPapel2 = ID
					, @pPapelVal1_2 = v1, @pPapelVal2_2 = v2, @pPapelVal3_2 = v3, @pPapelVal4_2 = v4, @pPapelVal5_2 = v5, @pPapelVal6_2 = v6, @pPapelVal7_2 = v7
				FROM @Papel 
				WHERE ID NOT IN (SELECT ID FROM @PapelLeidos2);

				-- VERIFICA ANCHO DE PAPELES DIFERENTES
				IF @pCorrVal5 != @pPapelVal6_2 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO3; END

				SELECT @pPaso1 = 0;

				-- LINER EXTERIOR DOBLE CORRUGADO
				WHILE EXISTS(SELECT 1 FROM @Papel WHERE ID NOT IN (SELECT ID FROM @PapelLeidos3)) -- NUM3
				BEGIN
					SELECT TOP 1 @pIdPapel3 = ID
						, @pPapelVal1_3 = v1, @pPapelVal2_3 = v2, @pPapelVal3_3 = v3, @pPapelVal4_3 = v4, @pPapelVal5_3 = v5, @pPapelVal6_3 = v6, @pPapelVal7_3 = v7
					FROM @Papel
					WHERE ID NOT IN (SELECT ID FROM @PapelLeidos3);

					IF @pCorrVal5 != @pPapelVal6_3 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO2; END

					-- LINER EXTERIOR DOBLE CORRUGADO
					WHILE EXISTS(SELECT 1 FROM @Papel WHERE ID NOT IN (SELECT ID FROM @PapelLeidos4)) -- NUM4
					BEGIN
						SELECT TOP 1 @pIdPapel4 = ID
							, @pPapelVal1_4 = v1, @pPapelVal2_4 = v2, @pPapelVal3_4 = v3, @pPapelVal4_4 = v4, @pPapelVal5_4 = v5, @pPapelVal6_4 = v6, @pPapelVal7_4 = v7
						FROM @Papel
						WHERE ID NOT IN (SELECT ID FROM @PapelLeidos4);

						IF @pCorrVal5 != @pPapelVal6_4 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						-- CALCULO CORRUGADO SENCILLO

						IF @pCon > 9 AND @pCon < 50 BEGIN GOTO CALCULA_DOBLE_CORRUGADO; END -- VERIFICA SI ES DOBLE CORRUGADO
						IF @pCon >= 50 BEGIN GOTO CALCULA_TRIPLE_CORRUGADO; END				-- VERIFICA SI ES TRIPLE CORRUGADO
						IF @pPaso1 = 1 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO2; END

						SELECT @pL1 = @pPapelVal1_1, @pM1 = @pCorrVal1, @pL2 = @pPapelVal1_2	-- CARGA INFORMACIÓN DEL PAPEL CORRUGADO SENCILLO
							, @pPeso = @pPapelVal2_1 + (@pCorrVal2 * @pFc) + @pPapelVal2_2		-- CARGA PESO CORRUGADO SENCILLO
							, @pCosto = @pPapelVal3_1 + (@pCorrVal3 * @pFc) + @pPapelVal3_2		-- CARGA COSTO CORRUGADO SENCILLO
							, @pMullen = @pPapelVal4_1 + @pPapelVal4_2							-- CARGA MULLEN CORRUGADO SENCILLO
							, @pCMT = @pCorrVal4												-- CALCULA CMT CORRUGADO SENCILLO
							, @pMtsLin = @pCorrVal6 / 1.45										-- CALCULA ML EN BASE AL CORRUGADO
							;

						SELECT @pMtsLinL = CASE WHEN @pL1 = @pL2 THEN @pPapelVal7_1 / 2 ELSE 0 END;								-- AJUSTA ML POR LINER
						SELECT @pMtsLin = CASE WHEN @pMtsLinL > 0 AND @pMtsLinL < @pMtsLin THEN @pMtsLinL ELSE @pMtsLin END;	-- AJUSTA ML AL MINIMO

						SELECT @pMtsLin = CASE WHEN @pPapelVal7_1 < @pMtsLin THEN @pPapelVal7_1 ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_2 < @pMtsLin THEN @pPapelVal7_2 ELSE @pMtsLin END;

						IF @pMtsLin < 350 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END						-- SI ML SON MENORES DE 350 SE DESCARTA
						IF @pPapelVal5_2 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END					-- SI TIPO DE PAPEL ES BLANCO, SE DESCARTA
						IF @pPapelVal2_1 < @pPapelVal2_2 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END		-- SI EL PASO DEL LINER INTERIOR ES MAYOR QUE EL EXTERIOR, DESCARTA
						IF @pPapelVal2_1 - @pPapelVal2_2 > 0.14 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END	-- SI LA DIFERENCIA DE PESO DE PAPEL ES MAYOR A 140 GRAMAS, DESCARTA

						SELECT @pPesoLin = @pPapelVal2_1 + @pPapelVal2_2							-- CALCULA PESO LINERS
						SELECT @pMullenM = (@pMullen + (@pArmadoS * @pPesoLin))						-- CALCULA MULLEN
							, @pPaso1 = 1															-- TODO OK
							;

						IF @pMullenM >= @pRMin AND @pMullen <= @pRMax BEGIN GOTO GRABA_DATOS; END	-- VERIFICA VALORES DE RESISTENCIA DENTRO DEL RANGO
						GOTO BRINCAR_OTRO_PAPEL_CALCULO1;

CALCULA_DOBLE_CORRUGADO:
						-- CALCULO DOBLE CORRUGADO
						IF @pCon < 10 BEGIN GOTO GRABA_DATOS; END	-- INFORMACIÓN DE DOBLE CORRUGADO

						SELECT @pL1 = @pPapelVal1_1, 
								@pM1 = @pCorrVal1, 
								@pL2 = @pPapelVal1_2, 
								@pM2 = @pCorrVal1, 
								@pL3 = @pPapelVal1_3	-- CARGA INFORMACIÓN DEL PAPEL CORRUGADO SENCILLO
							, @pPeso = @pPapelVal2_1 + (@pCorrVal2 * @pFc) + @pPapelVal2_2 + (@pCorrVal2 * @pFb) + @pPapelVal2_3		-- CARGA PESO CORRUGADO SENCILLO
							, @pCosto = @pPapelVal3_1 + (@pCorrVal3 * @pFc) + @pPapelVal3_2 + (@pCorrVal3 * @pFb) + @pPapelVal3_3		-- CARGA COSTO CORRUGADO SENCILLO
							, @pMullen = @pPapelVal4_1 + @pPapelVal4_2 + @pPapelVal4_3													-- CARGA MULLEN CORRUGADO SENCILLO
							, @pCMT = @pCorrVal4 * 1.8																					-- CALCULA CMT CORRUGADO SENCILLO
							, @pMtsLin = @pCorrVal6 / 1.45																				-- CALCULA ML EN BASE AL CORRUGADO
							;

						-- CALCULAR METROS LINEALES MINIMOS DE LOS PAPELES
						SELECT @pMtsLinL = 0;
						SELECT @pMtsLinL = CASE WHEN @pL1 = @pL2 OR @pL1 = @pL3 THEN @pPapelVal7_1 / 2 ELSE @pMtsLinL END;
						SELECT @pMtsLinL = CASE WHEN @pL1 = @pL2 AND @pL1 = @pL3 THEN @pPapelVal7_1 / 3 ELSE @pMtsLinL END;

						SELECT @pMtsLin = CASE WHEN @pMtsLinL > 0 AND @pMtsLinL < @pMtsLin THEN @pMtsLinL ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_1 < @pMtsLin THEN @pPapelVal7_1 ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_2 < @pMtsLin THEN @pPapelVal7_2 ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_3 < @pMtsLin THEN @pPapelVal7_3 ELSE @pMtsLin END;
						IF @pMtsLin < 1000 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END

						IF @pPapelVal5_2 = 'B' OR @pPapelVal5_3 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END -- DESCARTAR PAPELES BLANCOS
						IF @pPapelVal2_1 < @pPapelVal2_2 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						IF @pPapelVal2_1 < @pPapelVal2_3 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						IF (@pPapelVal2_1 - @pPapelVal2_3) > 0.14 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END

						SELECT @pPesoLin = @pPapelVal2_1 + @pPapelVal2_2 + @pPapelVal2_3;	-- CALCULA PESO LINERS
						SELECT @pMullenM = (@pMullen + (@pArmadoD * @pPesoLin));			-- CALCULA MULLEN

						IF @pMullenM >= @pRMin AND @pMullen <= @pRMax BEGIN GOTO GRABA_DATOS; END -- VERIFICA VALORES DE RESISTENCIA DENTRO DEL RANGO
						GOTO BRINCAR_OTRO_PAPEL_CALCULO1;
						
CALCULA_TRIPLE_CORRUGADO:
						-- CALCULO TRIPLE CORRUGADO
						IF @pCon < 50 BEGIN GOTO GRABA_DATOS; END

						SELECT @pL1 = @pPapelVal1_1,
								@pM1 = @pCorrVal1,
								@pL2 = @pPapelVal1_2,
								@pM2 = @pCorrVal1,
								@pL3 = @pPapelVal1_3,
								@pM3 = @pCorrVal1,
								@pL4 = @pPapelVal1_4	-- CARGA INFORMACIÓN DE PAPELES CORRUGADO DOBLE
							-- CARGA INFORMACIÓN DE PESO CORRUGADO DOBLE
							, @pPeso = @pPapelVal2_1 + (@pCorrVal2 * @pFc) + @pPapelVal2_2 + (@pCorrVal2 * @pFb) + @pPapelVal2_3 + (@pCorrVal2 * @pFc) + @pPapelVal2_4
							-- CARGA INFORMACIÓN DE COSTO CORRUGADO DOBLE
							, @pCosto = @pPapelVal3_1 + (@pCorrVal3 * @pFc) + @pPapelVal3_2 + (@pCorrVal3 * @pFb) + @pPapelVal3_3 + (@pCorrVal3 * @pFb) + @pPapelVal3_4
							, @pMullen = @pPapelVal4_1 + @pPapelVal4_2 + @pPapelVal4_3 + @pPapelVal4_4	-- CARGA INFORMACIÓN DE MULLEN CORRUGADO DOBLE
							, @pCMT = @pCorrVal4 * 1.8													-- CARGA INFORMACIÓN DE CMT
							, @pMtsLin = @pCorrVal6 / 1.45												-- CARGA INFORMACIÓN DE ML
							;

						-- CALCULAR METROS LINEALES MINIMOS DE LOS PAPELES
						SELECT @pMtsLinL = 0;
						SELECT @pMtsLinL = CASE WHEN @pL1 = @pL2 OR @pL1 = @pL3 THEN @pPapelVal7_1 / 2 ELSE @pMtsLinL END;
						SELECT @pMtsLinL = CASE WHEN @pL1 = @pL2 AND @pL1 = @pL3 THEN @pPapelVal7_1 / 3 ELSE @pMtsLinL END;

						SELECT @pMtsLin = CASE WHEN @pMtsLinL > 0 AND @pMtsLinL < @pMtsLin THEN @pMtsLinL ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_1 < @pMtsLin THEN @pPapelVal7_1 ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_2 < @pMtsLin THEN @pPapelVal7_2 ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_3 < @pMtsLin THEN @pPapelVal7_3 ELSE @pMtsLin END;
						SELECT @pMtsLin = CASE WHEN @pPapelVal7_4 < @pMtsLin THEN @pPapelVal7_4 ELSE @pMtsLin END;
						IF @pMtsLin < 1000 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END

						IF @pPapelVal5_2 = 'B' OR @pPapelVal5_3 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END	-- DESCARTA PAPELES BLANCOS
						IF @pPapelVal2_1 < @pPapelVal2_2 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						IF @pPapelVal2_1 < @pPapelVal2_3 BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END

						SELECT @pPesoLin = @pPapelVal2_1 + @pPapelVal2_2 + @pPapelVal2_3 + @pPapelVal2_4;	-- CALCULA PESO LINERS
						SELECT @pMullenM = (@pMullen + (@pArmadoD * @pPesoLin));							-- CALCULA MULLEN

						IF @pMullenM >= @pRMin AND @pMullen <= @pRMax BEGIN GOTO GRABA_DATOS; END			-- VERIFICA VALORES DE RESISTENCIA DENTRO DEL RANGO
						GOTO BRINCAR_OTRO_PAPEL_CALCULO1;

GRABA_DATOS:			-- GRABAR INFORMACIÓN
						
						-- VERIFICA VALORES PARA PAPELES BLANCOS
						IF @pPapelVal5_1 = 'B' AND @pPapelVal5_2 = 'B' AND @pPapelVal5_3 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						IF @pPapelVal5_1 = 'B' AND @pPapelVal5_2 = 'N' AND @pPapelVal5_3 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						IF @pPapelVal5_1 = 'B' AND @pPapelVal5_3 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						IF @pPapelVal5_1 = 'B' AND @pPapelVal5_2 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END

						IF @pRstb = 0 AND @pPapelVal5_1 = 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END
						IF @pRstb = 1 AND @pPapelVal5_1 != 'B' BEGIN GOTO BRINCAR_OTRO_PAPEL_CALCULO1; END

						SELECT @pClaveC = RTRIM(@pL1) + RTRIM(@pM1) + RTRIM(@pL2) + RTRIM(@pM2) + RTRIM(@pL3) + RTRIM(@pM3) + RTRIM(@pL4);

						IF NOT EXISTS (SELECT 1 FROM @Repite WHERE ClaveC = RTRIM(@pClaveC))
						BEGIN
							INSERT INTO @Repite (ClaveC)
							VALUES (@pClaveC);
						END ELSE 
						BEGIN
							GOTO BRINCAR_OTRO_PAPEL_CALCULO1;
						END

						SELECT @pEdge = (@pPesoLin * 2 * 0.6) + (@pCMT * 4 * 0.4);		-- COMPLETA DATOS DE EDGE CRUSH
						SELECT @pFactor = (@pMullenM * 0.5) + (@pEdge * 0.5 / @pCosto);

GRABA_LAMINADO:			-- GRABACIÓN DE COMBINACIÓN ENCONTRADA
						DECLARE @pgAL1 REAL, @pgAL2 REAL, @pgAL3 REAL, @pgAL4 REAL, @pgAM1 REAL, @pgAM2 REAL, @pgAM3 REAL
							, @pgL1 VARCHAR(24), @pgL2 VARCHAR(24), @pgL3 VARCHAR(24), @pgL4 VARCHAR(24), @pgM1 VARCHAR(24), @pgM2 VARCHAR(24), @pgM3 VARCHAR(24)
							, @pgCosto REAL, @pgPeso REAL, @pgMullen REAL, @pgMullenM REAL, @pgEdge REAL
							, @pgFactor REAL, @pgAncho REAL, @pgMetros REAL;

						SELECT @pgL1 = @pL1
							, @pgAL1 = CASE WHEN RTRIM(@pL1) != '' THEN (((@pCorrVal5 / 0.254) + 0.1) / 10) ELSE 0 END
							, @pgL2 = @pL2
							, @pgAL2 = CASE WHEN RTRIM(@pL2) != '' THEN (((@pCorrVal5 / 0.254) + 0.1) / 10) ELSE 0 END
							, @pgL3 = @pL3
							, @pgAL3 = CASE WHEN RTRIM(@pL3) != '' THEN (((@pCorrVal5 / 0.254) + 0.1) / 10) ELSE 0 END
							, @pgL4 = @pL4
							, @pgAL4 = CASE WHEN RTRIM(@pL4) != '' THEN (((@pCorrVal5 / 0.254) + 0.1) / 10) ELSE 0 END
							, @pgM1 = @pM1
							, @pgAM1 = CASE WHEN RTRIM(@pM1) != '' THEN (((@pCorrVal5 / 0.254) + 0.1) / 10) ELSE 0 END
							, @pgM2 = @pM2
							, @pgAM2 = CASE WHEN RTRIM(@pM2) != '' THEN (((@pCorrVal5 / 0.254) + 0.1) / 10) ELSE 0 END
							, @pgM3 = @pM3
							, @pgAM3 = CASE WHEN RTRIM(@pM3) != '' THEN (((@pCorrVal5 / 0.254) + 0.1) / 10) ELSE 0 END
							, @pgCosto = @pCosto, @pgPeso = @pPeso, @pgMullen = @pMullen, @pgMullenM = @pMullenM
							, @pgEdge = @pEdge, @pgFactor = @pFactor, @pgAncho = @pCorrVal5, @pgMetros = @pMtsLin;

						-- INSERT
						DECLARE @Registros SMALLINT = 0;
						SELECT TOP 1 @Registros = ISNULL(COUNT(1), 0) + 1 FROM @CPLDAT002;
						SELECT @Registros = CASE WHEN ISNULL(@Registros, 0) = 0 THEN 1 ELSE @Registros END;

						INSERT INTO @CPLDAT002 (Clave, Orden
							, Liner1, AnchoL1, Liner2, AnchoL2, Liner3, AnchoL3, Liner4, AnchoL4
							, Corrugado1, AnchoC1, Corrugado2, AnchoC2, Corrugado3, AnchoC3
							, CostoM2, PesoM2, Mullen, MullenMaximo, EdgeCrush, Factor, Ancho, Metros
						)
						VALUES (RTRIM(@pResistencia) + '-' + RTRIM(CONVERT(VARCHAR, @Registros)), @Registros
							, @pgL1, @pgAL1, @pgL2, @pgAL2, @pgL3, @pgAL3, @pgL4, @pgAL4
							, @pgM1, @pgAM1, @pgM2, @pgAM2, @pgM3, @pgAM3
							, @pgCosto, @pgPeso, @pgMullen, @pgMullenM, @pgEdge, @pgFactor, @pgAncho, @pgMetros
						);

						IF NOT EXISTS (SELECT 1 FROM @Ancho WHERE Ancho = @pCorrVal5)
						BEGIN
							INSERT INTO @Ancho (Ancho)
							VALUES (@pCorrVal5);
						END ELSE
						BEGIN
							GOTO BRINCAR_OTRO_PAPEL_CALCULO1;
						END

BRINCAR_OTRO_PAPEL_CALCULO1:
						INSERT INTO @PapelLeidos4 (ID)
						VALUES (@pIdPapel4);
					END


BRINCAR_OTRO_PAPEL_CALCULO2:
					INSERT INTO @PapelLeidos3 (ID)
					VALUES (@pIdPapel3);
				END


BRINCAR_OTRO_PAPEL_CALCULO3:
				INSERT INTO @PapelLeidos2 (ID)
				VALUES (@pIdPapel2);
			END


BRINCAR_OTRO_PAPEL_CALCULO4:
			INSERT INTO @PapelLeidos (ID)
			VALUES (@pIdPapel);
		END



		INSERT INTO @CorrLeidos (ID)
		VALUES (@pIdCorr);
	END

	INSERT INTO CplDat002 (Clave, Orden
		, Liner1, AnchoL1, Liner2, AnchoL2, Liner3, AnchoL3, Liner4, AnchoL4
		, Corrugado1, AnchoC1, Corrugado2, AnchoC2, Corrugado3, AnchoC3
		, [Costo M2], [Peso M2], Mullen, [Mullen Maximo], [Edge Crush], Factor, Ancho, Metros
	)
	SELECT Clave, Orden
		, Liner1, AnchoL1, Liner2, AnchoL2, Liner3, AnchoL3, Liner4, AnchoL4
		, Corrugado1, AnchoC1, Corrugado2, AnchoC2, Corrugado3, AnchoC3
		, CostoM2, PesoM2, Mullen, MullenMaximo, EdgeCrush, Factor, Ancho, Metros
	FROM @CPLDAT002;

	-- RETORNO DE CALCULO DE PAPELES
	UPDATE CplDat003
		SET Usar = 1
	FROM CplDat003 A
	JOIN @Ancho B ON A.Ancho = B.Ancho;

	-- VERIFICA AFINES RESISTENCIAS
	IF ISNULL(@pRestAfin, 0) = 0 BEGIN GOTO CONTINUA_NORMAL_RESISTENCIA; END -- VERIFICA QUE SI LA RESISTENCIA A PROGRAMAR SE UTILIZARÁ POR GRUPO

	IF NOT EXISTS(SELECT 1 FROM CPLDAT007 WHERE Clave = ISNULL(@pResistencia, '')) BEGIN GOTO SALIR_COMBINACIONES_POSIBLES; END
	ELSE BEGIN SELECT TOP 1 @pGrpafin = ISNULL(Grupo, 0) FROM CPLDAT007 WHERE Clave = ISNULL(@pResistencia, ''); END

ENCONTRO_GRUPO_RESISTENCIA:
	-- CARGA TODAS LAS RESISTENCIAS AFINES
	INSERT INTO @RestAf (Clave)
	SELECT Clave
	FROM CPLDAT007
	WHERE Grupo = @pGrpafin;

CONTINUA_NORMAL_RESISTENCIA:
	DECLARE @Da AS TABLE (
		OrdenProduccion VARCHAR(10), Status VARCHAR(10), ClaveCliente VARCHAR(12), ClaveArticulo VARCHAR(18), Cantidad INT
		, FechaEntrega SMALLDATETIME, Nombre VARCHAR(160), Articulo VARCHAR(60), Resistencia VARCHAR(10), Flauta VARCHAR(3)
		, Ancho REAL, Largo REAL, Proceso VARCHAR(2), Variacion REAL, Piezas DECIMAL(4, 1), PesoUnitario REAL, Lamina VARCHAR(3)
		, Faltan DECIMAL(38, 1), Hojas INT, TKg INT, Max4 DECIMAL(38, 1), Industria VARCHAR(3), Troquel BIT, TM2 INT
		, Parcial VARCHAR(1), ConScore BIT, NScores TINYINT, CantidadTras INT, Autorizado BIT, Excedente REAL
		, lFaltan REAL NOT NULL DEFAULT 0, lHojas REAL NOT NULL DEFAULT 0, lUsar BIT NOT NULL DEFAULT 0
	);
	DECLARE @DaFinal AS TABLE (
		OrdenProduccion VARCHAR(10), Status VARCHAR(10), ClaveCliente VARCHAR(12), ClaveArticulo VARCHAR(18), Cantidad INT
		, FechaEntrega SMALLDATETIME, Nombre VARCHAR(160), Articulo VARCHAR(60), Resistencia VARCHAR(10), Flauta VARCHAR(3)
		, Ancho REAL, Largo REAL, Proceso VARCHAR(2), Variacion REAL, Piezas DECIMAL(4, 1), PesoUnitario REAL, Lamina VARCHAR(3)
		, Faltan DECIMAL(38, 1), Hojas INT, TKg INT, Max4 DECIMAL(38, 1), Industria VARCHAR(3), Troquel BIT, TM2 INT
		, Parcial VARCHAR(1), ConScore BIT, NScores TINYINT, CantidadTras INT, Autorizado BIT, Excedente REAL
		, lFaltan REAL NOT NULL DEFAULT 0, lHojas REAL NOT NULL DEFAULT 0, lUsar BIT NOT NULL DEFAULT 0
	);
	-- CARGA PEDIDOS
	IF ISNULL(@pZonaERP, '') = '01'
	BEGIN
		INSERT INTO @Da (
			OrdenProduccion, Status, ClaveCliente, ClaveArticulo, Cantidad, FechaEntrega, Nombre, Articulo, Resistencia, Flauta
			, Ancho, Largo, Proceso, Variacion, Piezas, PesoUnitario, Lamina, Faltan, Hojas, TKg, Max4, Industria, Troquel
			, TM2, Parcial, ConScore, NScores
		)
		SELECT [Orden Produccion], Status, [Clave Cliente], [Clave Articulo], Cantidad, [Fecha Entrega], Nombre, Articulo, Resistencia, Flauta
			, Ancho, Largo, Proceso, Variacion, Piezas, [Peso Unitario], Lamina, Faltan, Hojas, TKg, Max4, Industria, troquel
			, TM2, Parcial, ConScore, NScores
		FROM CplVis002
		WHERE ISNULL(Largo, 0) != 0 AND ISNULL(Ancho, 0) != 0; --NOT Largo IS NULL AND NOT ANCHO IS NULL
	END ELSE
	BEGIN
		IF ISNULL(@pZonaERP, '') = '02'
		BEGIN
			INSERT INTO @Da (
				OrdenProduccion, Status, ClaveCliente, ClaveArticulo, Cantidad, FechaEntrega, Nombre, Articulo, Resistencia, Flauta
				, Ancho, Largo, Proceso, Variacion, Piezas, PesoUnitario, Lamina, Faltan, Hojas, TKg, Max4, Industria, Troquel
				, TM2, Parcial, ConScore, NScores, CantidadTras, Autorizado
			)
			SELECT A.[Orden Produccion], A.Status, A.[Clave Cliente], A.[Clave Articulo], A.Cantidad, A.[Fecha Entrega], A.Nombre, A.Articulo, A.Resistencia, A.Flauta
				, A.Ancho, A.Largo, A.Proceso, A.Variacion, A.Piezas, A.[Peso Unitario], A.Lamina, A.Faltan, A.Hojas, A.TKg, A.Max4, A.Industria, A.troquel
				, A.TM2, A.Parcial, A.ConScore, A.NScores, B.CantidadTras, B.Autorizado
			FROM CplVis002 A
			LEFT JOIN Cajas02..CmoDat088 B ON A.[Orden Produccion] = B.OP
			WHERE ISNULL(Largo, 0) != 0 AND ISNULL(Ancho, 0) != 0;
		END
		ELSE IF ISNULL(@pZonaERP, '') = '05'
		BEGIN
			INSERT INTO @Da (
				OrdenProduccion, Status, ClaveCliente, ClaveArticulo, Cantidad, FechaEntrega, Nombre, Articulo, Resistencia, Flauta
				, Ancho, Largo, Proceso, Variacion, Piezas, PesoUnitario, Lamina, Faltan, Hojas, TKg, Max4, Industria, Troquel
				, TM2, Parcial, ConScore, NScores, CantidadTras, Autorizado
			)
			SELECT A.[Orden Produccion], A.Status, A.[Clave Cliente], A.[Clave Articulo], A.Cantidad, A.[Fecha Entrega], A.Nombre, A.Articulo, A.Resistencia, A.Flauta
				, A.Ancho, A.Largo, A.Proceso, A.Variacion, A.Piezas, A.[Peso Unitario], A.Lamina, A.Faltan, A.Hojas, A.TKg, A.Max4, A.Industria, A.troquel
				, A.TM2, A.Parcial, A.ConScore, A.NScores, B.CantidadTras, B.Autorizado
			FROM CplVis002 A
			LEFT JOIN Cajas05..CmoDat088 B ON A.[Orden Produccion] = B.OP
			WHERE ISNULL(Largo, 0) != 0 AND ISNULL(Ancho, 0) != 0;
		END
	END

	INSERT INTO @DaFinal (
		OrdenProduccion, Status, ClaveCliente, ClaveArticulo, Cantidad, FechaEntrega, Nombre, Articulo, Resistencia, Flauta
		, Ancho, Largo, Proceso, Variacion, Piezas, PesoUnitario, Lamina, Faltan, Hojas, TKg, Max4, Industria, Troquel
		, TM2, Parcial, ConScore, NScores, CantidadTras, Autorizado, Excedente, lFaltan, lHojas, lUsar
	)
	SELECT A.OrdenProduccion, A.Status, A.ClaveCliente, A.ClaveArticulo, A.Cantidad, A.FechaEntrega, A.Nombre, A.Articulo, A.Resistencia, A.Flauta
		, A.Ancho, A.Largo, A.Proceso, A.Variacion, A.Piezas, A.PesoUnitario, A.Lamina, A.Faltan, A.Hojas, A.TKg, A.Max4, A.Industria, A.Troquel
		, A.TM2, A.Parcial, A.ConScore, A.NScores, A.CantidadTras, A.Autorizado, A.Excedente, A.lFaltan, A.lHojas, A.lUsar
	FROM @Da A
	JOIN @RestAf B ON A.Resistencia = B.Clave
	WHERE ISNULL(A.Largo, 0) > 0 
		AND @pRestAfin > 0 AND A.Resistencia = @pResistencia
		AND FechaEntrega < @pFechaLimite;

	IF ISNULL(@pZonaERP, '') = '02' 
	BEGIN
		UPDATE @DaFinal SET 
			Excedente = 
				CASE WHEN RTRIM(ISNULL(Proceso, '')) = 'K' OR (RTRIM(ISNULL(Proceso, '')) = 'B' AND UPPER(RTRIM(ISNULL(Industria, ''))) = 'IND') 
					THEN
						CASE WHEN Faltan <= 500 THEN 6
							WHEN Faltan > 500 AND Faltan <= 1000 THEN 4
							WHEN Faltan > 1000 AND Faltan <= 2000 THEN 1.5
							WHEN Faltan > 2000 THEN 1
						END
					WHEN RTRIM(ISNULL(Proceso, '')) = 'A' THEN
						CASE WHEN Variacion = 10 OR Variacion = 5 THEN Variacion / 2
							WHEN Faltan <= 500 THEN 17
							WHEN Faltan > 500 AND Faltan <= 1000 THEN 9
							WHEN Faltan > 1000 AND Faltan <= 2000 THEN 7
							WHEN Faltan > 2000 AND Faltan <= 3000 THEN 6
							WHEN Faltan > 3000 THEN 5
						END
					WHEN RTRIM(ISNULL(Proceso, '')) = 'P' THEN
						CASE WHEN Faltan <= 500 THEN 18
							WHEN Faltan > 500 AND Faltan <= 1000 THEN 10
							WHEN Faltan > 1000 AND Faltan <= 2000 THEN 8
							WHEN Faltan > 2000 AND Faltan <= 3000 THEN 7
							WHEN Faltan > 3000 THEN 6
						END
					WHEN RTRIM(ISNULL(Proceso, '')) = 'G' THEN
						CASE WHEN Faltan <= 500 THEN 14
							WHEN Faltan > 500 AND Faltan <= 1000 THEN 10
							WHEN Faltan > 1000 AND Faltan <= 2000 THEN 7
							WHEN Faltan > 2000 AND Faltan <= 3000 THEN 5
							WHEN Faltan > 3000 THEN 4
						END
					WHEN RTRIM(ISNULL(Proceso, '')) = 'C' AND UPPER(RTRIM(ISNULL(Industria, ''))) = 'IND' THEN
						CASE WHEN Faltan <= 500 THEN 26
							WHEN Faltan > 500 AND Faltan <= 1000 THEN 9
							WHEN Faltan > 1000 AND Faltan <= 3000 THEN 5
							WHEN Faltan > 3000 THEN 4
						END
					WHEN RTRIM(ISNULL(Proceso, '')) = 'B' AND UPPER(RTRIM(ISNULL(Industria, ''))) = 'AGR' THEN
						CASE WHEN Variacion = 10 OR Variacion = 5 THEN Variacion / 2
							WHEN Faltan <= 500 THEN 6
							WHEN Faltan > 500 AND Faltan <= 1000 THEN 5
							WHEN Faltan > 1000 AND Faltan <= 3000 THEN 4
							WHEN Faltan > 3000 THEN 1
						END
					WHEN RTRIM(ISNULL(Proceso, '')) = 'C' AND UPPER(RTRIM(ISNULL(Industria, ''))) = 'AGR' THEN
						CASE WHEN Variacion = 10 OR Variacion = 5 THEN Variacion / 2
							WHEN Faltan <= 500 THEN 8
							WHEN Faltan > 500 AND Faltan <= 1000 THEN 7
							WHEN Faltan > 1000 AND Faltan <= 2000 THEN 6
							WHEN Faltan > 2000 AND Faltan <= 3000 THEN 5
							WHEN Faltan > 3000 THEN 3
						END
					ELSE Excedente
				END;

		-- APLICA PARA TODOS LOS PROCESOS EXCEPTO LAMINA
		UPDATE @DaFinal 
			SET Excedente = CASE WHEN (Variacion = 10 OR Variacion = 5) AND Faltan > 3001 THEN Variacion / 2 ELSE Excedente END;

		UPDATE @DaFinal 
			SET Excedente = CASE WHEN RTRIM(ISNULL(Proceso, '')) = 'N' THEN 0 ELSE Excedente END;

		UPDATE @DaFinal 
			SET lFaltan = 
				CASE WHEN ISNULL(Autorizado, -1) = -1 
					THEN Faltan 
					ELSE CASE WHEN ISNULL(Autorizado, 0) = 1 
						THEN ISNULL(Faltan, 0) - ISNULL(CantidadTras, 0)
						ELSE 0
					END
				END
		FROM @DaFinal
		WHERE (ISNULL(Faltan, 0) - ISNULL(CantidadTras, 0)) >= 0;

		UPDATE @DaFinal 
			SET lHojas = 
				CASE WHEN ISNULL(Autorizado, -1) = -1 
					THEN Hojas 
					ELSE CASE WHEN ISNULL(Autorizado, 0) = 1 
						THEN 
							CASE WHEN lFaltan >= 0 THEN ISNULL(Hojas, 0) - ISNULL(CantidadTras, 0)
								ELSE 0
							END
						ELSE 0
					END
				END;

		UPDATE @Da 
			SET lUsar = ISNULL(A.Autorizado, 0)
		FROM @Da A
		WHERE lFaltan >= 0

		DELETE FROM @DaFinal WHERE lFaltan < 0;
	END ELSE
	BEGIN
		DECLARE @pVariacion1 DECIMAL(5, 2), @pVariacion2 DECIMAL(5, 2), @pVariacion3 DECIMAL(5, 2)
			, @pVariacion4 DECIMAL(5, 2), @pVariacion5 DECIMAL(5, 2), @pVariacion6 DECIMAL(5, 2);
		DECLARE @Variacion AS TABLE (ID TINYINT, Variacion DECIMAL(5, 2));

		INSERT INTO @Variacion (ID, Variacion)
		EXEC dbo.CplSP031 @Opcion = 1, @Id = 1;
		INSERT INTO @Variacion (ID, Variacion)
		EXEC dbo.CplSP031 @Opcion = 1, @Id = 2;
		INSERT INTO @Variacion (ID, Variacion)
		EXEC dbo.CplSP031 @Opcion = 1, @Id = 3;
		INSERT INTO @Variacion (ID, Variacion)
		EXEC dbo.CplSP031 @Opcion = 1, @Id = 4;
		INSERT INTO @Variacion (ID, Variacion)
		EXEC dbo.CplSP031 @Opcion = 1, @Id = 5;
		INSERT INTO @Variacion (ID, Variacion)
		EXEC dbo.CplSP031 @Opcion = 1, @Id = 6;

		SELECT @pVariacion1 = CASE WHEN ID = 1 THEN ISNULL(Variacion, 0) ELSE @pVariacion1 END
			, @pVariacion2 = CASE WHEN ID = 2 THEN ISNULL(Variacion, 0) ELSE @pVariacion2 END
			, @pVariacion3 = CASE WHEN ID = 3 THEN ISNULL(Variacion, 0) ELSE @pVariacion3 END
			, @pVariacion4 = CASE WHEN ID = 4 THEN ISNULL(Variacion, 0) ELSE @pVariacion4 END
			, @pVariacion5 = CASE WHEN ID = 5 THEN ISNULL(Variacion, 0) ELSE @pVariacion5 END
			, @pVariacion6 = CASE WHEN ID = 6 THEN ISNULL(Variacion, 0) ELSE @pVariacion6 END
		FROM @Variacion;

		--SELECT @pVariacion1, @pVariacion2, @pVariacion3, @pVariacion4, @pVariacion5, @pVariacion6
		UPDATE @DaFinal SET lFaltan = Faltan, lHojas = Hojas, lUsar = 1;

		UPDATE @DaFinal SET 
			Excedente = 
				CASE WHEN Cantidad >= 5000 THEN @pVariacion1
					WHEN Cantidad < 5000 THEN @pVariacion2
					ELSE Excedente
				END;

		UPDATE @DaFinal SET Excedente = CASE WHEN RTRIM(ISNULL(Proceso, '')) = 'K' OR RTRIM(ISNULL(Proceso, '')) = 'L' THEN @pVariacion3 ELSE Excedente END;
		UPDATE @DaFinal SET Excedente = CASE WHEN ISNULL(Variacion, 0) = 0 THEN @pVariacion4 ELSE Excedente END;
		UPDATE @DaFinal SET Excedente = CASE WHEN Cantidad < 5000 AND Variacion = 0 THEN @pVariacion5 ELSE Excedente END;
		UPDATE @DaFinal SET Excedente = CASE WHEN Cantidad >= 5000 AND Variacion = 0 THEN @pVariacion6 ELSE Excedente END;

	END

	IF ISNULL(@pZonaERP, '') = '01'
	BEGIN
		UPDATE @DaFinal
			SET Excedente = ISNULL(Y.CriVarCat, 0)
		FROM @DaFinal X
		JOIN (
			SELECT TOP 1 A.OP
				, ISNULL(CASE WHEN ISNULL(D.Proceso, '') = 'K' OR ISNULL(D.Proceso, '') = 'P' 
					THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 3)
					ELSE CASE WHEN ISNULL(C.variacion, 0) * 100 = 0 
						THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 4)
						ELSE CASE WHEN A.Cantidad >= 5000 
							THEN CASE WHEN ISNULL(C.variacion, 0) * 100 = 0 
								THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 6)
								ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 1)
							END
							ELSE CASE WHEN ISNULL(C.variacion, 0) * 100 = 0 
								THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 5)
								ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 2)
							END
						END
					END
				END, 0) AS CriVarCat
			FROM Cajas01..CmoDat011 A
			JOIN Cajas01..CmoDat010 B 
			JOIN Cajas01..CmoDat008 C ON C.Pedido = B.PedidoInt ON B.OP = A.Folio_OP
			LEFT JOIN CplVis002 D ON D.[Orden Produccion] = A.OP
			WHERE A.OP IN (SELECT Z.OrdenProduccion FROM @DaFinal Z)
		) Y ON X.OrdenProduccion = Y.OP;
	END

	INSERT INTO CPLDAT004 (
		[Orden Produccion], [Clave Articulo], [Fecha Entrega], Cliente, Articulo, Resistencia, Ancho, Largo, Piezas, 
		Cantidad, Faltan, Hojas, Lamina, Parcial, NScores, Flauta, Tkg, TM2, Mas, Refile, Utilizar, Prior, ConScore
	)
	SELECT OrdenProduccion, ClaveArticulo, FechaEntrega, Nombre, Articulo, Resistencia, Ancho, Largo, Piezas,
		Cantidad, lFaltan, lHojas, Lamina, Parcial, NScores, Flauta, TKg, TM2, Excedente, Troquel, lUsar, 0, ConScore
	FROM @DaFinal;

	--SELECT [Orden Produccion], [Clave Articulo], [Fecha Entrega], Cliente, Articulo, Resistencia, Ancho, Largo, Piezas, 
	--	Cantidad, Faltan, Hojas, Lamina, Parcial, NScores, Flauta, Tkg, TM2, Mas, Refile, Utilizar, Prior, ConScore
	--FROM CPLDAT004;

SALIR_COMBINACIONES_POSIBLES:

	SET NOCOUNT OFF;
END
GO


