USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC13]    Script Date: 20/10/2022 08:39:42 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC13]
	@Tipo BIT					= NULL -- DE DONDE ES LLAMADO EL PROCEDIMIENTO (0 = CalcularPrograma, 1 = PedidosMaximos)
	, @pScoresMax INT			= NULL -- SCORE MÁXIMO
	, @pCuchillas3 BIT			= NULL -- (0=2 CUCHILLAS, 1=3 CUCHILLAS)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ValorTipo REAL

	SELECT @ValorTipo = CASE WHEN ISNULL(@Tipo, 0) = 0 
		THEN 35.00		-- CalcularPrograma
		ELSE CASE WHEN ISNULL(@pCuchillas3, 0) = 0 
			THEN 25.00	-- PedidosMaximos 2 Cuchillas
			ELSE 35.00	-- PedidosMaximos 3 Cuchillas
		END
	END

	DECLARE @CPLDAT008 AS TABLE (
		ID INT
		, OP1 VARCHAR(10), Fecha1 SMALLDATETIME, Multiplos1 DECIMAL(4, 2), Ancho1 REAL, Largo1 REAL, Lam1 REAL, Piezas1 REAL
		, OP2 VARCHAR(10), Fecha2 SMALLDATETIME, Multiplos2 DECIMAL(4, 2), Ancho2 REAL, Largo2 REAL, Lam2 REAL, Piezas2 REAL
		, OP3 VARCHAR(10), Fecha3 SMALLDATETIME, Multiplos3 DECIMAL(4, 2), Ancho3 REAL, Largo3 REAL, Lam3 REAL, Piezas3 REAL
		, [Ancho Total] REAL, [Ancho Papel] REAL, Refile REAL, [Metros Lineales] INT
		, Producto1 VARCHAR(10), Producto2 VARCHAR(10), Producto3 VARCHAR(10)
		, Parcial1 SMALLINT, Parcial2 SMALLINT, Parcial3 SMALLINT
		, Puntos INT, Resistencia VARCHAR(12), Flauta VARCHAR(3), Tranf BIT
		, Cliente1 VARCHAR(80), Articulo1 VARCHAR(50)
		, Cliente2 VARCHAR(80), Articulo2 VARCHAR(50)
		, Cliente3 VARCHAR(80), Articulo3 VARCHAR(50)
		, Empate VARCHAR(25), Marca SMALLINT
		, Rest1 VARCHAR(12), Rest2 VARCHAR(12)
		, ConScore BIT, ConScore2 BIT, ConScore3 BIT
		, ValorTipo REAL
		-- MATERIA PRIMA
		, MatPrim AS ((([Ancho Papel] * [Metros Lineales]) / 100.00) * 5.00) + ((([Ancho Papel] * ValorTipo) / 100.00) * 5.00)	-- VALOR DE MATERIA PRIMA A 5$/KG
		, ManoObr AS ([Metros Lineales] * 0.5) + 100.00																			-- VALOR DE MANO OBRA A 10% DE MATERIA PRIMA
		, CostoArg REAL --AS MatPrim + ManoObr																					-- VALOR COSTO PRIMO
		, M2Netos AS ([Ancho Total] * [Metros Lineales]) / 100.00																-- TOTAL METROS CUADRADOS
		, PuntosArg REAL --AS CASE WHEN M2Netos = 0 THEN 0 ELSE (CostoArg / M2Netos) / 5 END									-- CONVERCION A INDICE DIVIDIENDO ENTRE A 5$/KG
		-- VALUACIÓN FECHA ENTREGA
		, Dif1 AS DATEDIFF(DAY, GETDATE(), Fecha1)																				-- CALCULA DIFERENCIA DE FECHAS DE ENTREGA Y HOY
		, Dif2 AS CASE WHEN Fecha2 IS NULL THEN 0 ELSE DATEDIFF(DAY, GETDATE(), Fecha2)	END										-- CALCULA DIFERENCIA DE FECHAS DE ENTREGA Y HOY
		, Dif3 AS CASE WHEN Fecha3 IS NULL THEN 0 ELSE DATEDIFF(DAY, GETDATE(), Fecha3)	END
		, DifDias INT --AS Dif1 + Dif2
		, DifDias1 INT
		, DifDias2 INT
		, DifDias3 INT
		, PuntosFE AS 
			CASE WHEN DifDias > 21 THEN 1.025																-- DESPERDICIO 2.5% POR OPS FECHAS 21 DIAS ADELANTO
				WHEN DifDias > 15 THEN 1.02																	-- DESPERDICIO 2.0% POR OPS FECHAS 15 DIAS ADELANTO
				WHEN DifDias > 7 THEN 1.015																	-- DESPERDICIO 1.5% POR OPS FECHAS 7 DIAS ADELANTO
				WHEN DifDias > 2 THEN 1.012																	-- DESPERDICIO 1.2% POR OPS FECHAS 2 DIAS ADELANTO
				WHEN DifDias <= 2 THEN 1.01																	-- DESPERDICIO 1.0% POR OPS FECHAS ATRASADAS
			END
		-- VALUACION DIF. FECHAS ENTREGA
		, DifDias1_2 INT --AS ABS(DATEDIFF(DAY, Fecha1, Fecha2))											-- CALCULA DIFERENCIA DE FECHAS DE ENTREGA ENTRE OPS
		, PuntosDifFE AS 
			CASE WHEN Fecha2 IS NULL THEN 1.01
				ELSE CASE WHEN DifDias1_2 > 21 THEN 1.02													-- DESPERDICIO 2.0% POR OPS FECHAS DIF. DE MAS 21 DIAS
					WHEN DifDias1_2 > 15 THEN 1.017															-- DESPERDICIO 1.7% POR OPS FECHAS DIF. DE 21 DIAS
					WHEN DifDias1_2 > 7 THEN 1.015															-- DESPERDICIO 1.5% POR OPS FECHAS DIF. DE 15 DIAS
					WHEN DifDias1_2 > 2 THEN 1.012															-- DESPERDICIO 1.2% POR OPS FECHAS DIF. DE 7 DIAS
					WHEN DifDias1_2 <= 2 THEN 1.01															-- DESPERDICIO 1.0% POR OPS FECHAS DIF. DE 2 DIAS
				END
			END
		-- VALUACION PEDIDO COMPLETO
		, Piezas_1 REAL /*DECIMAL(18, 2)*/ --AS Lam1 * Multiplos1
		, Piezas_2 REAL /*DECIMAL(18, 2)*/ --AS ISNULL(Lam2, 0) * ISNULL(Multiplos2, 0)
		, Piezas_3 REAL /*DECIMAL(18, 2)*/ --AS ISNULL(Lam3, 0) * ISNULL(Multiplos3, 0)
		, HOJAS_2 REAL
		, Prod_2 VARCHAR(10)
		, Cliente_2 VARCHAR(100)
		, Artic_2 VARCHAR(50)
		, RestOP_2 VARCHAR(12)
		, NSCOR_2 INT
		, Estado_2 REAL /*DECIMAL(18, 2)*/ /*AS 
			CASE WHEN ISNULL(OP2, '') = '' THEN NULL 
				ELSE CASE WHEN ISNULL(HOJAS_2, 0) = 0 THEN 0 
					ELSE (Piezas_2 / HOJAS_2 * 100) / 100 
				END
			END*/
		, HOJAS_3 REAL
		, Prod_3 VARCHAR(10)
		, Cliente_3 VARCHAR(100)
		, Artic_3 VARCHAR(50)
		, RestOP_3 VARCHAR(12)
		, NSCOR_3 INT
		, Estado_3 INT/*REAL*/ /*DECIMAL(18, 2)*/
		, HOJAS_1 REAL
		, Prod_1 VARCHAR(10)
		, Cliente_1 VARCHAR(100)
		, Artic_1 VARCHAR(50)
		, RestOP_1 VARCHAR(12)
		, NSCOR_1 INT
		, Estado_1 REAL/*REAL*/ /*DECIMAL(18, 2)*/ --AS (Piezas_1 / HOJAS_1 * 100) / 100
		, PuntosCom AS 
			CASE WHEN Estado_1 >= 0.96 AND ISNULL(Estado_2, -1) = -1 THEN 1.018 							-- DESPERDICIO 1.6% POR OP COMPLETA Y CORRE SOLA
				WHEN Estado_1 < 0.96 AND ISNULL(Estado_2, -1) = -1 THEN 1.02								-- DESPERDICIO 1.8% POR OP PARCIAL Y CORRE SOLA
				WHEN Estado_1 >= 0.96 AND ISNULL(Estado_2, 0) >= 0.96 THEN 1.014							-- DESPERDICIO 1.6% POR OP COMPLETA,OP COMPLETA Y CORRE COMBINADA
				WHEN Estado_1 >= 0.96 AND ISNULL(Estado_2, 0) < 0.96 THEN 1.016								-- DESPERDICIO 1.8% POR OP COMPLETA,OP PARCIAL Y CORRE COMBINADA
				WHEN Estado_1 < 0.96 AND ISNULL(Estado_2, 0) >= 0.96 THEN 1.017								-- DESPERDICIO 1.8% POR OP PARCIAL,OP COMPLETA Y CORRE COMBINADA
				WHEN Estado_1 < 0.96 AND ISNULL(Estado_2, 0) < 0.96 THEN 1.02								-- DESPERDICIO 2.0% POR OP PARCIAL,OP PARCIAL Y CORRE COMBINADA
			END
		-- CALCULA TOTAL DE PUNTOS
		, ScoresMax INT
		, TotalPuntos REAL /*DECIMAL(18, 2)*/ /*AS
			CASE WHEN (Multiplos1 * NSCOR_1) + (Multiplos1 * NSCOR_2) > ScoresMax THEN 0 -- VERIFICAR NUMERO MAXIMO DE ESCORES ANULAR SI REVAZA
				ELSE CASE WHEN ISNULL(PuntosArg, 0) * ISNULL(PuntosFE, 0) * ISNULL(PuntosDifFE, 0) * ISNULL(PuntosCom, 0) = 0 THEN 0
					ELSE (1 / (ISNULL(PuntosArg, 0) * ISNULL(PuntosFE, 0) * ISNULL(PuntosDifFE, 0) * ISNULL(PuntosCom, 0))) * 1000 -- CALCULO DE PUNTUACION APLICANDO DESPERDICIO
				END
			END*/
	);

	-- REAVALUACIÓN ARREGLOS
	INSERT INTO @CPLDAT008 (ID
		, OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1
		, OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2
		, OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3
		, [Ancho Total], [Ancho Papel], Refile, [Metros Lineales]
		, Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3
		, Puntos, Resistencia, Flauta, Tranf, ValorTipo
		, Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3
		, Empate, Marca, Rest1, Rest2, ConScore, ConScore2, ConScore3
	)
	SELECT ID
		, OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1
		, OP2, CASE WHEN Fecha2 IS NULL THEN '19000101' ELSE Fecha2 END, ISNULL(Multiplos2, 0), Ancho2, Largo2, Lam2, Piezas2
		, OP3, CASE WHEN Fecha3 IS NULL THEN '19000101' ELSE Fecha3 END, ISNULL(Multiplos3, 0), Ancho3, Largo3, Lam3, Piezas3
		, [Ancho Total], [Ancho Papel], Refile, [Metros Lineales]
		, Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3
		, Puntos, Resistencia, Flauta, Tranf, @ValorTipo
		, Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3
		, Empate, Marca, Rest1, Rest2, ConScore, ConScore2, ConScore3
	FROM CPLDAT008

	-- CALCULAR CAMPOS
	UPDATE @CPLDAT008 SET 
		-- MATERIA PRIMA
		CostoArg = ISNULL(MatPrim, 0) + ISNULL(ManoObr, 0),																-- VALOR COSTO PRIMO
		PuntosArg = CASE WHEN M2Netos = 0 THEN 0 ELSE ((ISNULL(MatPrim, 0) + ISNULL(ManoObr, 0)) / M2Netos) / 5.00 END,	-- CONVERCION A INDICE DIVIDIENDO ENTRE A 5$/KG
		-- VALUACIÓN FECHA ENTREGA
		DifDias = -- CALCULAR PuntosFE
			CASE WHEN ISNULL(@pCuchillas3, 0) = 0 
				THEN ISNULL(Dif1, 0) + ISNULL(Dif2, 0) 
				ELSE CASE WHEN ISNULL(Dif1, 0) < ISNULL(Dif2, 0) AND ISNULL(Dif1, 0) < ISNULL(Dif3, 0) THEN ISNULL(Dif1, 0)
					WHEN ISNULL(Dif2, 0) < ISNULL(Dif1, 0) AND ISNULL(Dif2, 0) < ISNULL(Dif3, 0) THEN ISNULL(Dif2, 0)
					WHEN ISNULL(Dif3, 0) < ISNULL(Dif1, 0) AND ISNULL(Dif3, 0) < ISNULL(Dif2, 0) THEN ISNULL(Dif3, 0)
					ELSE ISNULL(Dif1, 0)
				END
			END, 
		DifDias1_2 = ABS(DATEDIFF(DAY, Fecha2, Fecha1)),	-- CALCULA DIFERENCIA DE FECHAS DE ENTREGA ENTRE OPS
		Piezas_1 = ISNULL(Lam1, 0) * ISNULL(Multiplos1, 0),
		Piezas_2 = ISNULL(Lam2, 0) * ISNULL(Multiplos2, 0),
		Piezas_3 = ISNULL(Lam3, 0) * ISNULL(Multiplos3, 0),
		DifDias2 = 0, DifDias3 = 0

	-- VALIDAR ACTUALIZAR DIFERENCIA DE DIAS CUANDO SEA A 3 CUCHILLAS
	IF ISNULL(@pCuchillas3, 0) = 1
	BEGIN
		-- ACTUALIZAR DIFERENCIA DE DIAS PARA LA FECHA 3
		UPDATE @CPLDAT008 SET
			DifDias1 = CASE WHEN Fecha3 IS NOT NULL THEN ABS(DATEDIFF(DAY, Fecha1, Fecha3)) END,
			DifDias2 = CASE WHEN Fecha3 IS NOT NULL THEN ABS(DATEDIFF(DAY, Fecha2, Fecha3)) END;

		-- CALCULAR PuntosDifFE
		UPDATE @CPLDAT008 SET 
			DifDias1_2 = 
				CASE WHEN DifDias1 > DifDias1_2
					THEN DifDias1
					ELSE DifDias1_2
				END;

		UPDATE @CPLDAT008 SET 
			DifDias1_2 = 
				CASE WHEN DifDias2 > DifDias1_2
					THEN DifDias2
					ELSE DifDias1_2
				END;
	END

	UPDATE @CPLDAT008 SET 
		HOJAS_2 = ISNULL(B.Hojas, 0),
		Prod_2 = ISNULL(B.Lamina, ''),
		Cliente_2 = ISNULL(B.Cliente, ''),
		Artic_2 = ISNULL(B.Articulo, ''),
		RestOP_2 = ISNULL(B.Resistencia, ''),
		NSCOR_2 = ISNULL(B.NScores, 0),
		ScoresMax = @pScoresMax
	FROM @CPLDAT008 A
	LEFT JOIN CPLDAT004 B ON A.OP2 = B.[Orden Produccion];

	IF ISNULL(@pCuchillas3, 0) = 1
	BEGIN
		UPDATE @CPLDAT008 SET 
			HOJAS_3 = ISNULL(B.Hojas, 0),
			Prod_3 = ISNULL(B.Lamina, ''),
			Cliente_3 = ISNULL(B.Cliente, ''),
			Artic_3 = ISNULL(B.Articulo, ''),
			RestOP_3 = ISNULL(B.Resistencia, ''),
			NSCOR_3 = ISNULL(B.NScores, 0)
		FROM @CPLDAT008 A
		LEFT JOIN CPLDAT004 B ON A.OP3 = B.[Orden Produccion];
	END
		
	UPDATE @CPLDAT008 SET 
		HOJAS_1 = ISNULL(B.Hojas, 0),
		Prod_1 = ISNULL(B.Lamina, ''),
		Cliente_1 = ISNULL(B.Cliente, ''),
		Artic_1 = ISNULL(B.Articulo, ''),
		RestOP_1 = ISNULL(B.Resistencia, ''),
		NSCOR_1 = ISNULL(B.NScores, 0)
	FROM @CPLDAT008 A
	LEFT JOIN CPLDAT004 B ON A.OP1 = B.[Orden Produccion];

	UPDATE @CPLDAT008 SET 
		-- VALUACIÓN FECHA ENTREGA
		Estado_1 = CASE WHEN ISNULL(HOJAS_1, 0) = 0 
			THEN CASE WHEN ISNULL(@pCuchillas3, 0) = 0 THEN 0 ELSE (Piezas_1 / 1.00)  END
			ELSE ((Piezas_1 / HOJAS_1) * 100.00) / 100.00 END,
		Estado_2 = CASE WHEN ISNULL(OP2, '') = '' THEN 0 
				ELSE CASE WHEN ISNULL(HOJAS_2, 0) = 0 THEN 0 
					ELSE (Piezas_2 / HOJAS_2 * 100.00) / 100.00
				END
			END,
		Estado_3 = CASE WHEN ISNULL(OP2, '') = '' THEN 0 
				ELSE CASE WHEN ISNULL(HOJAS_3, 0) = 0 THEN 0
					ELSE (Piezas_3 / HOJAS_3 * 100.00) / 100.00
				END
			END;

	-- 3 CUCHILLAS
	IF ISNULL(@pCuchillas3, 0) = 1
	BEGIN
		UPDATE @CPLDAT008 SET 
			Estado_2 = CASE WHEN ISNULL(Estado_2, 0) = 0 THEN 0.01 ELSE Estado_2 END,
			Estado_3 = CASE WHEN ISNULL(Estado_3, 0) = 0 THEN 0.01 ELSE Estado_3 END;
	END

	UPDATE @CPLDAT008 SET
		-- CALCULA TOTAL DE PUNTOS
		TotalPuntos = 
			CASE WHEN (Multiplos1 * NSCOR_1) + (Multiplos2 * NSCOR_2) + (CASE WHEN ISNULL(@pCuchillas3, 0) = 1 THEN (Multiplos3 * NSCOR_3) ELSE 0 END) > ScoresMax 
				THEN 0 -- VERIFICAR NUMERO MAXIMO DE ESCORES ANULAR SI ES MAYOR
				ELSE CASE WHEN ISNULL(PuntosArg, 0) * ISNULL(PuntosFE, 0) * ISNULL(PuntosDifFE, 0) * ISNULL(PuntosCom, 0) = 0 THEN 0
					ELSE ((1.00 / (ISNULL(PuntosArg, 0)) * (ISNULL(PuntosFE, 0) * ISNULL(PuntosDifFE, 0) * ISNULL(PuntosCom, 0)))) * 1000.00 -- CALCULO DE PUNTUACION APLICANDO DESPERDICIO
				END
			END;

	-- GRABACION DEL ARREGLO VALUADO
	UPDATE CPLDAT008 SET 
		Cliente1 = ISNULL(B.Cliente_1, ''), Cliente2 = ISNULL(B.Cliente_2, ''), Cliente3 = ISNULL(B.Cliente_3, ''),
		Articulo1 = ISNULL(B.Artic_1, ''), Articulo2 = ISNULL(B.Artic_2, ''), Articulo3 = ISNULL(B.Artic_3, ''),
		Producto1 = ISNULL(B.Prod_1, ''), Producto2 = ISNULL(B.Prod_2, ''), Producto3 = ISNULL(B.Prod_3, ''),
		Parcial1 = ISNULL(B.Estado_1, 0) * 100.00, Parcial2 = ISNULL(B.Estado_2, 0) * 100.00, Parcial3 = ISNULL(B.Estado_3, 0) * 100.00,
		Rest1 = ISNULL(B.RestOP_1, ''), Rest2 = ISNULL(B.RestOP_2, ''),
		Puntos = ISNULL(B.TotalPuntos, 0)
	FROM CPLDAT008 A
	JOIN @CPLDAT008 B ON A.ID = B.ID;
	
	SET NOCOUNT OFF;
END
GO


