USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPA7]    Script Date: 20/10/2022 08:36:25 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPA7]
	@Tipo BIT					= NULL -- DE DONDE ES LLAMADO EL PROCEDIMIENTO (0 = CalcularPrograma, 1 = PedidosMaximos)
	, @pZonaERP VARCHAR(2)		= NULL
	--, @pIDAncho INT			= NULL
	, @pValue01Ancho REAL		= NULL
	, @pValue02Ancho REAL		= NULL
	, @pValue03Ancho REAL		= NULL
	, @pRefileMin REAL			= NULL
	, @pRefileMax REAL			= NULL
	, @pLargoMinimo REAL		= NULL
	, @pSENCILLO VARCHAR(1)		= NULL
	, @pPRIORIDAD BIT			= NULL
	, @pCuchillas3 BIT			= NULL
	, @pOppR CPLDAT005TD_001	READONLY
AS 
BEGIN
	SET NOCOUNT ON;

	DECLARE @Opp CPLDAT005TD_001; /*AS TABLE (
		ID INT IDENTITY(1,1), value01 VARCHAR(10), value02 REAL, value03 REAL, value04 REAL, value05 VARCHAR(10), 
		value06 DATE, value07 VARCHAR(10), value08 REAL, value09 BIT, value10 INT, value11 BIT, value12 INT, value13 INT
	);*/
	
	INSERT INTO @Opp (ID, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13)
	SELECT			  ID, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13
	FROM @pOppR;

	-- VARIABLES LOCALES DEL PROCESO
	DECLARE @OppLeidasI AS TABLE ( ID INT );
	DECLARE @OppLeidasJ AS TABLE ( ID INT );
	DECLARE @OppLeidasT AS TABLE ( ID INT );
	DECLARE 
		@pValue01OppI VARCHAR(10), @pValue02OppI REAL, @pValue03OppI REAL, @pValue04OppI INT, @pValue05OppI VARCHAR(10), @pValue06OppI DATE, @pValue07OppI VARCHAR(10), @pValue08OppI REAL/*DECIMAL(4, 2)*/, @pValue09OppI BIT, @pValue10OppI INT, @pValue11OppI BIT, @pValue12OppI INT, @pValue13OppI INT, 
		@pValue01OppJ VARCHAR(10), @pValue02OppJ REAL, @pValue03OppJ REAL, @pValue04OppJ INT, @pValue05OppJ VARCHAR(10), @pValue06OppJ DATE, @pValue07OppJ VARCHAR(10), @pValue08OppJ REAL/*DECIMAL(4, 2)*/, @pValue09OppJ BIT, @pValue10OppJ INT, @pValue11OppJ BIT, @pValue12OppJ INT, @pValue13OppJ INT, 
		@pValue01OppT VARCHAR(10), @pValue02OppT REAL, @pValue03OppT REAL, @pValue04OppT INT, @pValue05OppT VARCHAR(10), @pValue06OppT DATE, @pValue07OppT VARCHAR(10), @pValue08OppT REAL/*DECIMAL(4, 2)*/, @pValue09OppT BIT, @pValue10OppT INT, @pValue11OppT BIT, @pValue12OppT INT, @pValue13OppT INT, 
		@pIDI INT, @pIDJ INT, @pIDT INT, @pK INT, @pM INT, @pL INT, 
		@pZ1 INT, @pZ2 INT, @pXREFILE REAL/*SMALLINT*/, @pANCHO1 REAL, @pTantos INT, @pRefile REAL, @pMLinea REAL, @pMLinea1 REAL, @pUnaPrior INT, 
		@pHerm1 VARCHAR(20), @pHerm2 VARCHAR(20), @pAncho2 REAL, @pTantos2 INT, @pRefile2 REAL, @pMLinea2 REAL, @pTMLinea REAL, 
		@pAncho3 REAL, @pTantos3 INT, @pRefile3 REAL, @pMLinea3 REAL

	DECLARE @Cm AS TABLE (
		Ide INT IDENTITY(1,1), ID INT, value01 VARCHAR(10), value02 REAL, value03 REAL, value04 VARCHAR(10), value05 INT, value06 REAL
		, value07 REAL, value08 REAL, value09 INT/*REAL*/, value10 INT, value11 REAL, value12 DATE, value13 DATE
		, value14 REAL, value15 REAL/*DECIMAL(4, 2)*/, value16 VARCHAR(10), value17 INT/*REAL*//*DECIMAL(4, 2)*/, value18 INT/*REAL*//*DECIMAL(4, 2)*/
		, value19 VARCHAR(200), value20 SMALLINT, value21 VARCHAR(10), value22 REAL, value23 REAL, value24 INT/*REAL*/, value25 DATE, value26 REAL, value27 INT/*REAL*/
	);

	--SELECT @pValue01OppI = NULL, @pValue02OppI = NULL, @pValue03OppI = NULL, @pValue04OppI = NULL, @pValue05OppI = NULL, @pValue06OppI = NULL, @pValue07OppI = NULL
	--	, @pValue08OppI = NULL, @pValue09OppI = NULL, @pValue10OppI = NULL, @pValue11OppI = NULL, @pValue12OppI = NULL, @pValue13OppI = NULL
	--	, @pValue01OppJ = NULL, @pValue02OppJ = NULL, @pValue03OppJ = NULL, @pValue04OppJ = NULL, @pValue05OppJ = NULL, @pValue06OppJ = NULL, @pValue07OppJ = NULL
	--	, @pValue08OppJ = NULL, @pValue09OppJ = NULL, @pValue10OppJ = NULL, @pValue11OppJ = NULL, @pValue12OppJ = NULL, @pValue13OppJ = NULL
	--	, @pValue01OppT = NULL, @pValue02OppT = NULL, @pValue03OppT = NULL, @pValue04OppT = NULL, @pValue05OppT = NULL, @pValue06OppT = NULL, @pValue07OppT = NULL
	--	, @pValue08OppT = NULL, @pValue09OppT = NULL, @pValue10OppT = NULL, @pValue11OppT = NULL, @pValue12OppT = NULL, @pValue13OppT = NULL
	--	, @pIDI = NULL, @pIDJ = NULL, @pIDT = NULL, @pK = NULL, @pM = NULL, @pL = NULL
	--	, @pZ1 = NULL, @pZ2 = NULL, @pXREFILE = NULL, @pANCHO1 = NULL, @pTantos = NULL, @pRefile = NULL, @pMLinea = NULL, @pMLinea1 = NULL, @pUnaPrior = NULL
	--	, @pHerm1 = NULL, @pHerm2 = NULL, @pAncho2 = NULL, @pTantos2 = NULL, @pRefile2 = NULL, @pMLinea2 = NULL, @pTMLinea = NULL
	--	, @pAncho3 = NULL, @pTantos3 = NULL, @pRefile3 = NULL, @pMLinea3 = NULL
	
	WHILE EXISTS(SELECT 1 FROM @Opp WHERE ID NOT IN (SELECT ID FROM @OppLeidasI)) -- I
	BEGIN -- BUCLE DE OPS DE 1 HASTA CONT = TOTAL OPS PARTICIPANTES
		-- LIMPIAR VALORES PARA NUEVO PASO
		SELECT @pValue01OppI = NULL, @pValue02OppI = NULL, @pValue03OppI = NULL, @pValue04OppI = NULL, @pValue05OppI = NULL, @pValue06OppI = NULL, @pValue07OppI = NULL
			, @pValue08OppI = NULL, @pValue09OppI = NULL, @pValue10OppI = NULL, @pValue11OppI = NULL, @pValue12OppI = NULL, @pValue13OppI = NULL
			, @pValue01OppJ = NULL, @pValue02OppJ = NULL, @pValue03OppJ = NULL, @pValue04OppJ = NULL, @pValue05OppJ = NULL, @pValue06OppJ = NULL, @pValue07OppJ = NULL
			, @pValue08OppJ = NULL, @pValue09OppJ = NULL, @pValue10OppJ = NULL, @pValue11OppJ = NULL, @pValue12OppJ = NULL, @pValue13OppJ = NULL
			, @pValue01OppT = NULL, @pValue02OppT = NULL, @pValue03OppT = NULL, @pValue04OppT = NULL, @pValue05OppT = NULL, @pValue06OppT = NULL, @pValue07OppT = NULL
			, @pValue08OppT = NULL, @pValue09OppT = NULL, @pValue10OppT = NULL, @pValue11OppT = NULL, @pValue12OppT = NULL, @pValue13OppT = NULL
			, @pIDI = NULL, @pIDJ = NULL, @pIDT = NULL, @pK = NULL, @pM = NULL, @pL = NULL
			, @pZ1 = NULL, @pZ2 = NULL, @pXREFILE = NULL, @pANCHO1 = NULL, @pTantos = NULL, @pRefile = NULL, @pMLinea = NULL, @pMLinea1 = NULL, @pUnaPrior = NULL
			, @pHerm1 = NULL, @pHerm2 = NULL, @pAncho2 = NULL, @pTantos2 = NULL, @pRefile2 = NULL, @pMLinea2 = NULL, @pTMLinea = NULL
			, @pAncho3 = NULL, @pTantos3 = NULL, @pRefile3 = NULL, @pMLinea3 = NULL

		SELECT TOP 1 @pIDI = ID
			, @pValue01OppI = value01, @pValue02OppI = value02, @pValue03OppI = value03, @pValue04OppI = value04, @pValue05OppI = value05
			, @pValue06OppI = value06, @pValue07OppI = value07, @pValue08OppI = value08, @pValue09OppI = value09, @pValue10OppI = value10
			, @pValue11OppI = value11, @pValue12OppI = value12, @pValue13OppI = value13
		FROM @Opp
		WHERE ID NOT IN (SELECT ID FROM @OppLeidasI);

		IF @pValue09OppI = 0
		BEGIN
			SELECT @pZ1 = 1, @pXREFILE = 0;
		END ELSE
		BEGIN
			SELECT @pZ1 = 2, @pXREFILE = @pRefileMin;
		END
		
		SELECT @pANCHO1 = @pValue02OppI;
		-- CALCULA CUANTAS VECES CABE EL ANCHO DE LA HOJA EN EL ANCHO DE PAPEL
		SELECT @pTantos = 
				CASE WHEN @pZ1 = 1 THEN @pValue01Ancho
					WHEN @pZ1 = 2 THEN @pValue02Ancho
				END / @pANCHO1;
			
		-- CALCULA REFILE
		SELECT @pRefile = 
			CASE WHEN @pZ1 = 1 THEN @pValue01Ancho
				WHEN @pZ1 = 2 THEN @pValue02Ancho
			END - (@pTantos * @pANCHO1);

		-- CALCULA METROS LINEALES
		SELECT @pMLinea = CASE WHEN @pTantos = 0 THEN 0 ELSE (@pValue04OppI / @pTantos) * @pValue03OppI END

		-- OP COMBINA SOLA EN EL ANCHO
		IF ISNULL(@pPRIORIDAD, 0) = 1 AND ISNULL(@pValue11OppI, 0) = 0
		BEGIN
			GOTO BRINCA_OPRIORIDAD_OP1;
		END

		-- VERIFICA REFILE CONTRA REFILE MINIMO
		IF @pMLinea < (@pLargoMinimo * 100)
		BEGIN
			SELECT @pRefile = 1000;
		END

		-- SI LOS PARAMETROS SE CUMPLEN CARGA MATRIZ DE ARREGLO POSIBLE
		IF (@pRefileMax - @pRefileMin) >= @pRefile
		BEGIN
			INSERT INTO @Cm (
				value01, value02, value03, value07, value08, value09, value11, 
				value12, value14, value16, value17, value20--, value21
			)
			VALUES (
				@pValue01OppI, @pTantos, @pANCHO1, (@pTantos * @pANCHO1), @pRefile, (@pMLinea / @pValue03OppI), @pMLinea,
				@pValue06OppI, @pValue03OppI, @pValue07OppI, (@pValue04OppI * @pValue08OppI), @pXREFILE--, CONVERT(VARCHAR, @pValue12OppI)
				--, (@pMLinea / @pValue03OppI) * @pValue08OppI * @pTantos
			);
			
			-- PREGUNTAR SI ES DEL PROCESO DE CALCULAR PROGRAMAS PARA SUMAR 1 AL VALOR 10
			IF ISNULL(@Tipo, 0) = 0
			BEGIN
				UPDATE @Opp
					SET value10 = ISNULL(value10, 0) + 1
				WHERE ID = @pIDI;
			END
		END

BRINCA_OPRIORIDAD_OP1:
		-- BUCLE INVERSO DE TANTOS = ANCHOS DE HOJA EN ANCHO DE PAPEL
		SELECT @pK = @pTantos;
		WHILE @pK >= 1
		BEGIN
			DELETE FROM @OppLeidasJ;
			--WAITFOR DELAY '00:00:00.300' -- DELAY DE 300 MILISEGUNDOS
			-- SE AGREGAN ID DE OPS YA VALIDADAS DE I EN J PARA NO VOLVER A PASAR POR ELLAS
			INSERT INTO @OppLeidasJ (ID)
			SELECT ID FROM @OppLeidasI;
			
			WHILE EXISTS(SELECT 1 FROM @Opp WHERE ID NOT IN (SELECT ID FROM @OppLeidasI) AND ID NOT IN (SELECT ID FROM @OppLeidasJ)) -- @pJ < @pCONT
			BEGIN
				-- INICIA COMBINACION CON LA SIGUENTE OP
				SELECT TOP 1 @pIDJ = ID, @pValue01OppJ = value01, @pValue02OppJ = value02, @pValue03OppJ = value03, @pValue04OppJ = value04
					, @pValue05OppJ = value05, @pValue06OppJ = value06, @pValue07OppJ = value07, @pValue08OppJ = value08, @pValue09OppJ = value09
					, @pValue10OppJ = value10, @pValue11OppJ = value11, @pValue12OppJ = value12, @pValue13OppJ = value13
				FROM @Opp
				WHERE ID NOT IN ( SELECT ID FROM @OppLeidasI UNION SELECT ID FROM @OppLeidasJ );

				IF @pValue01OppI = @pValue01OppJ
				BEGIN
					GOTO BRINCA_MISMA_OP;
				END

				IF @pValue09OppI = 0 AND @pValue09OppJ = 1
				BEGIN
					SELECT @pZ2 = 3, @pXREFILE = (@pRefileMin / 2);
				END ELSE
				BEGIN
					SELECT @pZ2 = 2, @pXREFILE = @pRefileMin
				END

				IF @pValue09OppI = 1 AND @pValue09OppJ = 0
				BEGIN
					SELECT @pZ2 = 3, @pXREFILE = (@pRefileMin / 2);
				END

				IF @pValue09OppI = 0 AND @pValue09OppJ = 0
				BEGIN
					SELECT @pZ2 = 1, @pXREFILE = 0;
				END

				-- FUNCION PARA OBTENER COINCIDENCIA CON EXPRESION REGULAR
				DECLARE @OP1 VARCHAR(10), @OP2 VARCHAR(10);
				SELECT @OP1 = 
					CASE WHEN LEN(dbo.GetMatch(LEFT(@pValue01OppI, 5), '%[^A-Za-z]%')) > 0
						THEN '0'
						ELSE dbo.GetMatch(LEFT(@pValue01OppI, 5), '%[^0-9]%')
					END;
				SELECT @OP2 =
					CASE WHEN LEN(dbo.GetMatch(LEFT(@pValue01OppJ, 5), '%[^A-Za-z]%')) > 0
						THEN '0'
						ELSE dbo.GetMatch(LEFT(@pValue01OppJ, 5), '%[^0-9]%')
					END;

				SELECT @pHerm1 = CASE WHEN CONVERT(INT, @OP1) > CONVERT(INT, @OP2) THEN @pValue01OppJ ELSE @pValue01OppI END
				SELECT @pHerm2 = CASE WHEN CONVERT(INT, @OP1) > CONVERT(INT, @OP2) THEN @pValue01OppI ELSE @pValue01OppJ END
				
				-- VERIFICACIONES PARA QUE NO SE PROGRAME LA MISMA OP
				IF @pSENCILLO = 'S' AND @pValue07OppI != @pValue07OppJ
				BEGIN
					GOTO BRINCA_MISMA_OP;
				END

				SELECT @pAncho2 = @pValue02OppJ, 
					@pTantos2 = (
						CASE WHEN @pZ2 = 1 THEN @pValue01Ancho
							WHEN @pZ2 = 2 THEN @pValue02Ancho
							WHEN @pZ2 = 3 THEN @pValue03Ancho
						END - (@pANCHO1 * @pK)) / @pAncho2;

				-- VERIFICACIONES PARA QUE NO SE PROGRAME LA MISMA OP
				IF ISNULL(@pTantos2, 0) = 0
				BEGIN
					GOTO BRINCA_MISMA_OP;
				END

				IF ISNULL(@pCuchillas3, 0) = 0
				BEGIN
					-- VALIDA QUE LAS OPS QUE SE COMBINEN NO SUPEREN LOS 3.07 MTS. YA QUE EN PLANTA
					-- TIJUANA LA MESA DE RECIBO ES DE ESTA MEDIDA.
					IF @pZonaERP = '02' AND @pValue03OppI > 307 AND @pValue03OppJ > 307
					BEGIN
						GOTO BRINCA_MISMA_OP;
					END
				END
				
				SELECT @pM = @pTantos2
				WHILE @pM >= 1
				BEGIN
					-- CALCULA REFILE
					SELECT @pRefile2 = 
						CASE WHEN @pZ2 = 1 THEN @pValue01Ancho
							WHEN @pZ2 = 2 THEN @pValue02Ancho
							WHEN @pZ2 = 3 THEN @pValue03Ancho
							ELSE 0
						END - ( (@pK * @pANCHO1) + (@pM * @pAncho2) );

					SELECT @pMLinea = CASE WHEN @pM = 0 THEN 0 ELSE (@pValue04OppI / @pK) * @pValue03OppI END;
					SELECT @pMLinea2 = CASE WHEN @pM = 0 THEN 0 ELSE (@pValue04OppJ / @pM) * @pValue03OppJ END;

					SELECT @pTMLinea = CASE WHEN @pMLinea2 > @pMLinea THEN @pMLinea ELSE @pMLinea2 END;
					-- SI LOS METROS LINEALES MENOR A MINIMO ANULA REFILE
					IF @pTMLinea < (@pLargoMinimo * 100) 
					BEGIN
						SELECT @pRefile2 = 1000;
					END

					SELECT @pUnaPrior = CASE WHEN @pValue11OppI = 1 OR @pValue11OppJ = 1 THEN 1 ELSE 0 END;

					IF @pPRIORIDAD = 1 AND @pUnaPrior = 0
					BEGIN
						GOTO BRINCA_OPRIORIDAD_OP2;
					END
					
					IF (@pRefileMax - @pRefileMin) >= @pRefile2
					BEGIN
						--SELECT @pCONT2 = @pCONT2 + 1;
						IF ISNULL(@Tipo, 0) = 0
						BEGIN
							-- CALCULAR PROGRAMAS
							INSERT INTO @Cm (
								value01, value02, value03, value04, value05, value06, value07, value08, 
								value09, value10, value11, value12, value13, value14, value15, value16, 
								value17, value18, 
								value19, value20, value21, value22, value23
							)
							VALUES (
								@pValue01OppI, @pK, @pANCHO1, @pValue01OppJ, @pM, @pAncho2, (@pK * @pANCHO1) + (@pM * @pAncho2), @pRefile2,
								(@pTMLinea / @pValue03OppI), (@pTMLinea / @pValue03OppJ), @pTMLinea, @pValue06OppI, @pValue06OppJ, @pValue03OppI, @pValue03OppJ, @pValue07OppJ,
								(@pTMLinea / @pValue03OppI) * @pValue08OppI * @pK, (@pTMLinea / @pValue03OppJ) * @pValue08OppJ * @pM,
								(@pHerm1 + ' ' + @pHerm2), @pXREFILE, NULL, NULL, NULL
							);
							UPDATE @Opp SET value10 = ISNULL(value10, 0) + 1
							WHERE ID = @pIDI;
							UPDATE @Opp SET value10 = ISNULL(value10, 0) + 1
							WHERE ID = @pIDJ;
						END ELSE
						BEGIN
							-- PROGRAMA PEDIDOS MAXIMOS
							INSERT INTO @Cm (
								value01, value02, value03, value04, value05, value06, value07, value08, 
								value09, value10, value11, value12, value13, value14, value15, value16, 
								value17, value18, 
								value19, value20, value22
							)
							VALUES (
								@pValue01OppI, @pK, @pANCHO1, @pValue01OppJ, @pM, @pAncho2, (@pK * @pANCHO1) + (@pM * @pAncho2), @pRefile2,
								(@pTMLinea / @pValue03OppI), (@pTMLinea / @pValue03OppJ), @pTMLinea, @pValue06OppI, @pValue06OppJ, @pValue03OppI, @pValue03OppJ, @pValue07OppJ,
								(@pTMLinea / @pValue03OppI) * @pValue08OppI * @pK, (@pTMLinea / @pValue03OppJ) * @pValue08OppJ * @pM,
								@pHerm1 + ' ' + @pHerm2, @pXREFILE, CASE WHEN ISNULL(@pCuchillas3, 0) = 0 THEN @pValue12OppJ ELSE NULL END
							);

							IF ISNULL(@pCuchillas3, 0) = 1
							BEGIN
								UPDATE @Opp SET value10 = ISNULL(value10, 0) + 1
								WHERE ID = @pIDI;
								UPDATE @Opp SET value10 = ISNULL(value10, 0) + 1
								WHERE ID = @pIDJ;
							END	
						END
					END

BRINCA_OPRIORIDAD_OP2:
					IF ISNULL(@pCuchillas3, 0) = 1 -- SI ES DE 3 CUCHILLAS REALIZAR LAS SIGUIENTES ACCIONES
					BEGIN
						DELETE FROM @OppLeidasT;
						-- SE AGREGAN ID DE OPS YA VALIDADAS DE I Y J EN T PARA NO VOLVER A PASAR POR ELLAS
						INSERT INTO @OppLeidasT (ID)
						SELECT ID FROM @OppLeidasI
						UNION 
						SELECT ID FROM @OppLeidasJ;

						WHILE EXISTS(SELECT 1 FROM @Opp WHERE ID NOT IN (SELECT ID FROM @OppLeidasI) AND ID NOT IN (SELECT ID FROM @OppLeidasJ) AND ID NOT IN (SELECT ID FROM @OppLeidasT))
						BEGIN
							-- INICIA COMBINACION CON LA SIGUENTE OP
							SELECT TOP 1 @pIDT = ID, @pValue01OppT = value01, @pValue02OppT = value02, @pValue03OppT = value03, @pValue04OppT = value04
								, @pValue05OppT = value05, @pValue06OppT = value06, @pValue07OppT = value07, @pValue08OppT = value08, @pValue09OppT = value09
								, @pValue10OppT = value10, @pValue11OppT = value11, @pValue12OppT = value12, @pValue13OppT = value13
							FROM @Opp
							WHERE ID NOT IN (SELECT ID FROM @OppLeidasI) 
								AND ID NOT IN (SELECT ID FROM @OppLeidasJ)
								AND ID NOT IN (SELECT ID FROM @OppLeidasT);

							IF @pValue01OppJ = @pValue01OppT
							BEGIN
								GOTO BRINCA_MISMA_OP3;
							END

							SELECT @pZ2 = 3, @pXREFILE = (@pRefileMin / 2);
							IF @pValue09OppI = 0 AND @pValue09OppJ = 0 AND @pValue09OppT = 0
							BEGIN
								SELECT @pZ2 = 1, @pXREFILE = 0;
							END
							IF @pValue09OppI = 1 AND @pValue09OppJ = 1 AND @pValue09OppT = 1
							BEGIN
								SELECT @pZ2 = 2, @pXREFILE = @pRefileMin;
							END

							-- FUNCION PARA OBTENER COINCIDENCIA CON EXPRESION REGULAR
							DECLARE @OP_1 VARCHAR(10), @OP_2 VARCHAR(10);
							SELECT @OP_1 = 
								CASE WHEN LEN(dbo.GetMatch(LEFT(@pValue01OppI, 5), '%[^A-Za-z]%')) > 0
									THEN '0'
									ELSE dbo.GetMatch(LEFT(@pValue01OppI, 5), '%[^0-9]%')
								END;
							SELECT @OP_2 =
								CASE WHEN LEN(dbo.GetMatch(LEFT(@pValue01OppJ, 5), '%[^A-Za-z]%')) > 0
									THEN '0'
									ELSE dbo.GetMatch(LEFT(@pValue01OppJ, 5), '%[^0-9]%')
								END;

							SELECT @pHerm1 = CASE WHEN CONVERT(INT, @OP_1) > CONVERT(INT, @OP_2) THEN @pValue01OppJ ELSE @pValue01OppI END
							SELECT @pHerm2 = CASE WHEN CONVERT(INT, @OP_1) > CONVERT(INT, @OP_2) THEN @pValue01OppI ELSE @pValue01OppJ END
							
							-- Verificaciones para que no se programe la misma OP
							IF @pSENCILLO = 'S' AND @pValue07OppI != @pValue07OppJ BEGIN GOTO BRINCA_MISMA_OP; END
							IF @pSENCILLO = 'S' AND @pValue07OppI != @pValue07OppT BEGIN GOTO BRINCA_MISMA_OP; END
							IF @pSENCILLO = 'S' AND @pValue07OppJ != @pValue07OppT BEGIN GOTO BRINCA_MISMA_OP; END

							SELECT @pAncho3 = @pValue02OppT, 
								@pTantos3 = (
									CASE WHEN @pZ2 = 1 THEN @pValue01Ancho
										WHEN @pZ2 = 2 THEN @pValue02Ancho
										WHEN @pZ2 = 3 THEN @pValue03Ancho
										ELSE 0
									END - ( @pANCHO1 * @pK ) - (@pAncho2 * @pM)) / @pAncho3;

							IF ISNULL(@pTantos3, 0) = 0
							BEGIN
								GOTO BRINCA_MISMA_OP3;
							END

							SELECT @pL = @pTantos3;
							WHILE @pL >= 1
							BEGIN
								SELECT @pRefile3 = 
									CASE WHEN @pZ2 = 1 THEN @pValue01Ancho
										WHEN @pZ2 = 2 THEN @pValue02Ancho
										WHEN @pZ2 = 3 THEN @pValue03Ancho
										ELSE 0
									END - ( (@pK * @pANCHO1) + (@pM * @pAncho2) + (@pL * @pAncho3) );

								IF @pL = 0
								BEGIN
									SELECT @pMLinea = 0;
								END ELSE
								BEGIN
									SELECT @pMLinea1 = (@pValue04OppI / @pK) * @pValue03OppI,
										@pMLinea2 = (@pValue04OppJ / @pM) * @pValue03OppJ,
										@pMLinea3 = (@pValue04OppT / @pL) * @pValue03OppT
								END

								SELECT @pTMLinea = CASE WHEN @pMLinea2 < @pMLinea1 THEN @pMLinea2 ELSE @pMLinea1 END;
								IF @pMLinea3 < @pTMLinea 
								BEGIN
									SELECT @pTMLinea = @pMLinea3;
								END

								IF @pTMLinea < (@pLargoMinimo * 100)
								BEGIN
									-- SI LOS METROS LINEALES MENOR A MINIMO ANULA REFILE
									SELECT @pRefile3 = 1000;
								END

								SELECT @pUnaPrior = CASE WHEN @pValue11OppI = 1 OR @pValue11OppJ = 1 OR @pValue11OppT = 1 THEN 1 ELSE 0 END;

								IF @pPRIORIDAD = 1 AND @pUnaPrior = 0
								BEGIN
									GOTO BRINCA_OPRIORIDAD_OP3;
								END

								IF (@pRefileMax - @pRefileMin) >= @pRefile3
								BEGIN
									INSERT INTO @Cm (
										value01, value02, value03, 
										value04, value05, value06, 
										value07, value08, 
										value09, value10, 
										value11, value12, 
										value13, value14, 
										value15, value16, 
										value17, value18, 
										value19, value20, 
										value21, value22, value23, value24, 
										value25, value26, value27
									)
									VALUES (
										@pValue01OppI, @pK, @pANCHO1, 
										@pValue01OppJ, @pM, @pAncho2,
										(@pK * @pANCHO1) + (@pM * @pAncho2) + (@pL * @pAncho3), @pRefile3,
										(@pTMLinea / @pValue03OppI), (@pTMLinea / @pValue03OppJ),
										@pTMLinea, @pValue06OppI,
										@pValue06OppJ, @pValue03OppI,
										@pValue03OppJ, @pValue07OppJ,
										((@pTMLinea / @pValue03OppI) * @pValue08OppI * @pK), ((@pTMLinea / @pValue03OppJ) * @pValue08OppJ * @pM),
										(@pHerm1 + ' ' + @pHerm2), @pXREFILE,
										@pValue01OppT, @pL, @pValue02OppT, (@pTMLinea / @pValue03OppT),
										@pValue06OppT, @pValue03OppT, ((@pTMLinea / @pValue03OppT) * @pValue08OppT * @pL)
									)

									UPDATE @Opp SET value10 = value10 + 1
									WHERE ID = @pIDI;
									UPDATE @Opp SET value10 = value10 + 1
									WHERE ID = @pIDJ;
								END
BRINCA_OPRIORIDAD_OP3:
								SELECT @pL = @pL - 1;
							END
BRINCA_MISMA_OP3:
							INSERT INTO @OppLeidasT (ID)
							VALUES (@pIDT);
						END
					END
		
					SELECT @pM = @pM - 1;
				END
BRINCA_MISMA_OP:
				INSERT INTO @OppLeidasJ (ID)
				VALUES (@pIDJ)
			END
			
			SELECT @pK = @pK - 1;
		END

		INSERT INTO @OppLeidasI (ID)
		VALUES (@pIDI);
	END

	-- COMPLEMENTA DATOS
	UPDATE @Opp
		SET value10 = 5000
	WHERE ISNULL(value10, 0) = 0

	UPDATE CPLDAT005
		SET NCombina = ISNULL(B.value10, 0)
	FROM CPLDAT005 A
	JOIN @Opp B ON A.[Orden Produccion] = B.value01

	SELECT ID, value01, value02, value03, value04, value05, value06, value07, value08, value09, value10, value11, value12, value13
		, value14, value15, value16, value17, value18, value19, value20, value21, value22, value23, value24, value25, value26, value27
	FROM @Cm;
	
	SET NOCOUNT OFF;
END
GO


