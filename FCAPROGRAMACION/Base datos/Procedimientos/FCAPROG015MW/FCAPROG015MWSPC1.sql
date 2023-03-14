USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC1]    Script Date: 19/10/2022 04:04:36 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FCAPROG015MWSPC1]
	@Opcion INT								= NULL,
	@OrdenProduccion VARCHAR(10)			= NULL,
	@Usar INT								= NULL,
	@PuntosMax INT							= NULL,
	@Zona VARCHAR(2)						= NULL,
	@Usuario VARCHAR(8)						= NULL
AS BEGIN
	DECLARE @TotalRegistros INT = NULL;
	SELECT @Usar = CASE WHEN @Usar = -1 THEN NULL ELSE @Usar END;
	SELECT @PuntosMax = CASE WHEN @PuntosMax = -1 THEN NULL ELSE @PuntosMax END;
	SELECT @OrdenProduccion = CASE WHEN @OrdenProduccion = '' THEN NULL ELSE @OrdenProduccion END;

	IF @Opcion = 1 
	BEGIN
		SELECT A.Clave
		FROM CPLDAT007 A 
		LEFT JOIN CPLDAT014 B ON A.Clave = B.[Clave Resistencia]
		ORDER BY B.[Clave Resistencia] DESC
	END
	ELSE IF @Opcion = 2 
	BEGIN
		SELECT Id, [Resistenias Afines] AS ResisteniasAfines, [Refile Maximo] AS RefileMaximo, [Refile Minimo] AS RefileMinimo, [Dias Adelanto] AS DiasAdelanto
			, [Todos Anchos] AS TodosAnchos, [Ancho Calculo] AS AnchoCalculo, [Largo Minimo] AS LargoMinimo, Excedente, Scores
		FROM CPLDAT006
	END
	ELSE IF @Opcion = 3 
	BEGIN
		SELECT CONVERT(VARCHAR, CONVERT(MONEY, Ancho), 1) AS Ancho, Usar
			, CONVERT(VARCHAR, CONVERT(MONEY, (Ancho / 2.54)), 1) AS Pulgadas, 3 AS Extra
		FROM CPLDAT003 
		WHERE Usar = ISNULL(@Usar, Usar)
		ORDER BY Ancho
	END
	ELSE IF @Opcion = 4 
	BEGIN
		SELECT [Orden Produccion] AS OrdenProduccion, Cliente, [Clave Articulo] AS ClaveArticulo, Articulo, Cantidad, [Fecha Entrega] AS FechaEntrega
			, Programadas, Largo, Ancho, Piezas, Resistencia, Faltan, Hojas, Tkg, TM2, Parcial, Lamina, Flauta, Mas, Prior, Utilizar, Refile, NScores, ConScore, Cproceso
		FROM CPLDAT004
		WHERE Utilizar = 1
	END
	ELSE IF @Opcion = 5 
	BEGIN
		SELECT ID, OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1, OP2, Fecha2, Multiplos2, Ancho2, Largo2
			, Lam2, Piezas2, OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3, [Ancho Total] AS AnchoTotal, [Ancho Papel] AS AnchoPapel
			, Refile, [Metros Lineales] AS MetrosLineales, Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3, Puntos, Resistencia
			, Flauta, Tranf, Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3, Empate, Marca, Rest1, Rest2, ConScore, ConScore2, ConScore3
		FROM CPLDAT008
		WHERE Puntos = ISNULL(@PuntosMax, Puntos)
	END
	ELSE IF @Opcion = 6 
	BEGIN
		SELECT [Orden Produccion] AS OrdenProduccion, Cliente, [Clave Articulo] AS ClaveArticulo, Articulo, Cantidad, [Fecha Entrega] AS FechaEntrega
			, Programadas, Largo, Ancho, Piezas, Resistencia, Faltan, Hojas, Tkg, TM2, Parcial, Lamina, Flauta, Mas, Prior, Utilizar, Refile, NScores, ConScore, Cproceso
		FROM CPLDAT004
		WHERE [Orden Produccion] = @OrdenProduccion
	END
	ELSE IF @Opcion = 7 
	BEGIN
		SELECT MAX(Puntos) AS PuntosMax
		FROM CPLDAT008
	END
	ELSE IF @Opcion = 8 
	BEGIN
		IF ISNULL(@Zona, '') = '01' BEGIN
			SELECT A.AnchoStd
			FROM Cajas01..CmoDat037 A
			JOIN Cajas01..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @OrdenProduccion;
		END
		ELSE IF ISNULL(@Zona, '') = '02' BEGIN
			SELECT A.AnchoStd
			FROM Cajas02..CmoDat037 A
			JOIN Cajas02..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @OrdenProduccion;
		END
		ELSE IF ISNULL(@Zona, '') = '05' BEGIN
			SELECT A.AnchoStd
			FROM Cajas05..CmoDat037 A
			JOIN Cajas05..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
			WHERE B.OP = @OrdenProduccion;
		END
	END
	ELSE IF @Opcion = 9 
	BEGIN
		SELECT [Orden Produccion] AS OrdenProduccion, Cliente, [Clave Articulo] AS ClaveArticulo, Articulo, Cantidad,
			[Fecha Entrega] AS FechaEntrega, Largo, Ancho, Piezas, Resistencia, Faltan, Hojas, Tkg, Parcial, Lamina, Flauta, 
			Mas, Utilizar, [Hojas Orig] AS HojasOrig, [Hojas Prog] AS HojasProg, Prior, Refile, NCombina, NScores, ConScore
		FROM CPLDAT005
		WHERE [Orden Produccion] = ISNULL(@OrdenProduccion, [Orden Produccion])
	END

	--ELSE IF @Opcion = 2 BEGIN
	--	SELECT Orden, Clave, Usar, Ancho, Metros, [Costo M2] AS CostoM2, [Peso M2] AS PesoM2, [Mullen Maximo] AS MullenMax
	--		, Liner1, Empalme1 AS EmpalmeL1, Corrugado1 AS Corrg1, EmpalmeC1
	--		, Liner2, Empalme2 AS EmpalmeL2, Corrugado2 AS Corrg2, EmpalmeC2
	--		, Liner3, Empalme3 AS EmpalmeL3, Corrugado3 AS Corrg3, EmpalmeC3
	--		, Liner4, Empalme4 AS EmpalmeL4
	--	FROM CPLDAT002
	--END
	-- Configuracion Incial de modulo
	ELSE IF @Opcion = 10
	BEGIN
		SELECT usuarioERP, aplicacion, a2Cuchillas, a3Cuchillas, resistencia
		FROM tblCPLCAP005Configuracion
		WHERE aplicacion = 'CPLCAP005'
		AND usuarioERP = @Usuario --'500067'
	END

END


--Completion time: 2022-05-05T14:32:34.3424784-08:00






GO

