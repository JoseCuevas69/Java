USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC11]    Script Date: 20/10/2022 08:38:33 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC11]
	@pZonaERP VARCHAR(2)			= NULL
	, @pTabla SMALLINT				= NULL
AS
BEGIN
	SET NOCOUNT ON;
	--DECLARE @pZonaERP VARCHAR(2) = '01'

	DECLARE @CPLDAT009 CPLDAT008TD_001;/*AS TABLE (ID INT,
		OP1 VARCHAR(10), Fecha1 SMALLDATETIME, Multiplos1 DECIMAL(4, 2), Ancho1 REAL, Largo1 REAL, Lam1 INT, Piezas1 INT,
		OP2 VARCHAR(10), Fecha2 SMALLDATETIME, Multiplos2 DECIMAL(4, 2), Ancho2 REAL, Largo2 REAL, Lam2 INT, Piezas2 INT,
		OP3 VARCHAR(10), Fecha3 SMALLDATETIME, Multiplos3 DECIMAL(4, 2), Ancho3 REAL, Largo3 REAL, Lam3 INT, Piezas3 INT,
		[Ancho Total] REAL, [Ancho Papel] REAL, Refile REAL, [Metros Lineales] INT,
		Producto1 VARCHAR(10), Producto2 VARCHAR(10), Producto3 VARCHAR(10), Parcial1 SMALLINT, Parcial2 SMALLINT, Parcial3 SMALLINT,
		Puntos INT, Resistencia VARCHAR(12), Flauta VARCHAR(3), Tranf BIT, Empate VARCHAR(25),
		Cliente1 VARCHAR(80), Articulo1 VARCHAR(50), Cliente2 VARCHAR(80), Articulo2 VARCHAR(50), Cliente3 VARCHAR(80), Articulo3 VARCHAR(50),
		Rest1 VARCHAR(12), Rest2 VARCHAR(12), Rest3 VARCHAR(12), ConScore BIT, ConScore2 BIT, ConScore3 BIT, AnchoStd DECIMAL(6, 2)
	);*/
	DECLARE @res CPLDAT009TD_001;
	DECLARE @ML INT, @M2 REAL, @RP REAL, @S1 REAL, @S2 REAL, @RefilePromedio REAL;

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
	SELECT ID,
		OP1, Fecha1, Multiplos1, Ancho1, Largo1, Lam1, Piezas1, 
		OP2, Fecha2, Multiplos2, Ancho2, Largo2, Lam2, Piezas2, 
		OP3, Fecha3, Multiplos3, Ancho3, Largo3, Lam3, Piezas3, 
		[Ancho Total], [Ancho Papel], Refile, [Metros Lineales],
		Producto1, Producto2, Producto3, Parcial1, Parcial2, Parcial3,
		Puntos, Resistencia, Flauta, Tranf, Empate, 
		Cliente1, Articulo1, Cliente2, Articulo2, Cliente3, Articulo3,
		Rest1, Rest2, Rest3, ConScore, ConScore2, ConScore3, AnchoStd
	FROM CplDat009
	ORDER BY Puntos DESC;

	SELECT @ML = SUM([Metros Lineales]),
		@M2 = SUM((Refile / 10) * [Metros Lineales]),
		@RP = SUM(Refile),
		@S1 = SUM((Refile / 10) * [Metros Lineales]),
		@S2 = SUM([Metros Lineales] * [Ancho Papel])
	FROM @CPLDAT009;

	SELECT @RefilePromedio = CASE WHEN ISNULL(@S2, 0) != 0 THEN ISNULL(@S1, 0) / ISNULL(@S2, 0) ELSE 0 END;
	
	DECLARE @tmp AS TABLE (ID INT, Secuencia INT,
		OP VARCHAR(10), Fecha SMALLDATETIME, Multiplos DECIMAL(4, 2), Ancho REAL, Largo REAL, Lam INT, Piezas INT,
		[Ancho Total] REAL, [Ancho Papel] REAL, Refile REAL, [Metros Lineales] INT,
		Producto VARCHAR(10), Parcial SMALLINT,
		Puntos INT, Resistencia VARCHAR(12), Flauta VARCHAR(3),
		Cliente VARCHAR(80), Articulo VARCHAR(50),
		ConScore BIT, AnchoStd DECIMAL(6, 2)
	);

	;WITH tmp AS (
		SELECT ID, 1 AS Secuencia, OP1 AS OP, Fecha1 AS Fecha, Multiplos1 AS Multiplos
			, Ancho1 AS Ancho, Largo1 AS Largo, Lam1 AS Lam, Piezas1 AS Piezas, Cliente1 AS Cliente, Articulo1 AS Articulo, Producto1 AS Producto
			, Parcial1 AS Parcial, ConScore AS ConScore, Puntos, AnchoStd, Refile, Resistencia, Flauta, [Ancho Total], [Ancho Papel], [Metros Lineales]
		FROM @CPLDAT009
		UNION ALL
		SELECT ID, 2 AS Secuencia, OP2 AS OP, Fecha2 AS Fecha, Multiplos2 AS Multiplos
			, Ancho2 AS Ancho, Largo2 AS Largo, Lam2 AS Lam, Piezas2 AS Piezas, Cliente2 AS Cliente, Articulo2 AS Articulo, Producto2 AS Producto
			, Parcial2 AS Parcial, ConScore2 AS ConScore, Puntos, AnchoStd, Refile, Resistencia, Flauta, [Ancho Total], [Ancho Papel], [Metros Lineales]
		FROM @CPLDAT009
		WHERE RTRIM(ISNULL(OP2, '')) != '' AND RTRIM(ISNULL(OP2, '')) != '0'
		UNION ALL
		SELECT ID, 3 AS Secuencia, OP3 AS OP, Fecha3 AS Fecha, Multiplos3 AS Multiplos
			, Ancho3 AS Ancho, Largo3 AS Largo, Lam3 AS Lam, Piezas3 AS Piezas, Cliente3 AS Cliente, Articulo3 AS Articulo, Producto3 AS Producto
			, Parcial3 AS Parcial, ConScore3 AS ConScore, Puntos, AnchoStd, Refile, Resistencia, Flauta, [Ancho Total], [Ancho Papel], [Metros Lineales]
		FROM @CPLDAT009
		WHERE RTRIM(ISNULL(OP3, '')) != '' AND RTRIM(ISNULL(OP3, '')) != '0'
	)
	INSERT INTO @tmp (
		ID, Secuencia, Refile, Resistencia, Flauta, OP, Fecha, Cliente, Articulo, Ancho, Multiplos, Largo, Lam
		, [Ancho Total], [Ancho Papel], [Metros Lineales], Producto, Parcial, Puntos, ConScore, AnchoStd
	)
	SELECT ID, Secuencia, Refile, Resistencia, Flauta, OP, Fecha, Cliente, Articulo, Ancho, Multiplos, Largo, Lam
		, [Ancho Total], [Ancho Papel], [Metros Lineales], Producto, Parcial, Puntos, ConScore, AnchoStd
	FROM tmp;

	IF ISNULL(@pZonaERP, '') = '01'
	BEGIN
		;WITH valProd1 AS (
			-- OBTENER LO PRODUCIDO POR OP
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS lProducido
			FROM @tmp C
			JOIN Cajas05..CmoDat021 A ON A.OP = C.OP
			JOIN Cajas05..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
			WHERE B.[Ultimo Proceso] = 1
			GROUP BY A.OP
		), valProd2 AS (
			-- OBTENER SOLICITADO
			SELECT A.OP, SUM(ISNULL(Cantidad, 0)) AS lCantidad, SUM(ISNULL(Devuelto, 0)) AS lDevuelto, (SUM(ISNULL(Cantidad, 0)) + SUM(ISNULL(Devuelto, 0))) AS lSolicitado
			FROM @tmp B 
			JOIN Cajas05..CmoDat011 A ON A.OP = B.OP
			GROUP BY A.OP
		), valProd3 AS (
			-- OBTENGO PROGRAMADO
			SELECT A.Op, SUM(ISNULL(A.[Numero Cortes], 0)) AS lCortes, SUM(ISNULL(A.[Piezas Corte], 0)) AS lPiezas, SUM(ISNULL(A.[Hojas Corte], 0)) AS lHojas
				, SUM(ISNULL(A.[Numero Cortes], 0) * ISNULL(A.[Piezas Corte], 0) * ISNULL(A.[Hojas Corte], 0)) AS lProgramado
			FROM @tmp D 
			JOIN Cajas05..CmoDat013 A ON A.Op = D.OP
			JOIN Cajas05..CmoDat012 B ON B.Programa = A.Programa
			JOIN Cajas05..CmoDat011 C ON C.OP = A.Op
			WHERE B.Estatus = 'P'
			GROUP BY A.Op
		), odTmp1 AS (
			-- OBTENER LO RECIBIDO EN EL ALMACEN PT Y EXCEDENTES SOLO LA FABRICACIÓN
			SELECT A.OP, SUM(ISNULL(Entradas, 0) - ISNULL(Salidas, 0)) AS PTActual
			FROM @tmp B
			JOIN Cajas05..CmoTjDat002 A ON A.Op = B.OP
			WHERE A.Almacen = '001'
			GROUP BY A.OP
			UNION
			SELECT A.OP, SUM(A.Entradas - A.Salidas) AS PTActual
			FROM @tmp B
			JOIN Cajas05..CmoTjDat002 A ON A.Op = B.OP
			WHERE A.Almacen = '052'
			GROUP BY A.OP
		), odTmp2 AS (
			-- OBTENER LOS TRASPASOS DE ENTRADA
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS TrasENT
			FROM @tmp C
			JOIN Cajas05..CmoTjDat001 A ON A.Op = C.OP
			JOIN Cajas05..CmoTjCat001 B ON B.Cod = A.Almacen
			WHERE A.Almacen != '052' AND A.Almacen != '100' AND A.Almacen != '001'
				AND A.Movimiento = 'E'
				AND A.Estatus = 'TRAS'
				AND B.TipoAlmacen = 'PT'
			GROUP BY A.Op
		), odTmp3 AS (
			-- OBTENER LOS TRASPASOS DE SALIDA
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS TrasSAL
			FROM @tmp C
			JOIN Cajas05..CmoTjDat001 A ON A.Op = C.OP
			JOIN Cajas05..CmoTjCat001 B ON B.Cod = A.Almacen
			WHERE A.Almacen != '052' AND A.Almacen != '100' AND A.Almacen != '001'
				AND A.Movimiento = 'S'
				AND A.Estatus = 'TRAS'
				AND B.TipoAlmacen = 'PT'
			GROUP BY A.Op
		), res AS (
			SELECT A.ID, A.Secuencia, A.Refile, A.Resistencia, A.Flauta, A.OP, A.Fecha, A.Cliente, A.Articulo, A.Ancho, A.Multiplos, A.Largo, A.Lam
				, A.[Ancho Total], A.[Ancho Papel], A.[Metros Lineales], A.Producto, A.Parcial, A.Puntos, A.ConScore, A.AnchoStd
				, ISNULL(B.lProducido, 0) AS lProducido, ISNULL(F.lCantidad, 0) AS Cantidad, ISNULL(F.lDevuelto, 0) AS Devuelto
				, ISNULL(G.lCortes, 0) AS Cortes, ISNULL(G.lPiezas, 0) AS Piezas, ISNULL(G.lHojas, 0) AS Hojas, ISNULL(G.lProgramado, 0) AS lProgramado
				, ISNULL(F.lSolicitado, 0) AS lSolicitado
				, CASE WHEN ISNULL(F.lSolicitado, 0) < (ISNULL(G.lProgramado, 0) + ISNULL(B.lProducido, 0)) THEN 1 ELSE 0 END AS ProduccionCompleta
				, (ISNULL(A.Lam, 0) * ISNULL(A.Multiplos, 0)) + (ISNULL(H.PTActual, 0) + ISNULL(I.TrasENT, 0) - ISNULL(J.TrasSAL, 0)) AS wProgramado
				, ISNULL(H.PTActual, 0) AS PTActual, ISNULL(I.TrasENT, 0) AS TrasENT, ISNULL(J.TrasSAL, 0) AS TrasSAL
				, ISNULL(H.PTActual, 0) + ISNULL(I.TrasENT, 0) - ISNULL(J.TrasSAL, 0) AS wProducido
			FROM @tmp A
			LEFT JOIN valProd1 B ON B.OP = A.OP
			LEFT JOIN valProd2 F ON F.OP = A.OP
			LEFT JOIN valProd3 G ON G.OP = A.OP
			LEFT JOIN odTmp1 H ON H.OP = A.OP
			LEFT JOIN odTmp2 I ON I.OP = A.OP
			LEFT JOIN odTmp3 J ON J.OP = A.OP
		), validar AS (
			SELECT z.Op, z.PiezasX, z.UltFecha
			FROM res B
			JOIN Cajas05..CmoDat011 A ON A.OP = B.OP
			JOIN (
				SELECT X.op, SUM(x.laminas * y.[Piezas Corte]) AS PiezasX, Max(x.[Fecha Produccion]) AS UltFecha
				FROM Cajas05..Cmodat017 X 
				JOIN Cajas05..Cmodat013 Y ON Y.OP = X.OP AND X.Programa = Y.Programa
				JOIN res W ON W.OP = X.Op
				GROUP BY X.OP
			) z ON z.OP = a.OP
		)
		INSERT INTO @res (
			ID, Secuencia, Refile, Resistencia, Flauta, OP, Fecha, Cliente, Articulo, Ancho, Multiplos, Largo, Lam
			, [Ancho Total], [Ancho Papel], [Metros Lineales], Producto, Parcial, Puntos, ConScore, AnchoStd
			, Producido, Cantidad, Devuelto, Cortes, Piezas, Hojas, ProduccionCompleta, PTActual, TrasENT, TrasSAL
			, OpValidar, PiezasX, UltFecha, Adicional, HayAdicional
		)
		SELECT A.ID, A.Secuencia, A.Refile, A.Resistencia, A.Flauta, A.OP, A.Fecha, A.Cliente, A.Articulo, A.Ancho, A.Multiplos, A.Largo, A.Lam
			, A.[Ancho Total], A.[Ancho Papel], A.[Metros Lineales], A.Producto, A.Parcial, A.Puntos, A.ConScore, A.AnchoStd
			, A.lProducido AS Producido, A.Cantidad, A.Devuelto, A.Cortes, A.Piezas, A.Hojas, A.ProduccionCompleta, (A.PTActual + A.TrasENT - A.TrasSAL), A.TrasENT, A.TrasSAL
			, ISNULL(B.Op, '') AS OpValidar, ISNULL(B.PiezasX, 0) AS PiezasX, B.UltFecha
			, (((A.wProgramado / A.lSolicitado) * 100) - 100) AS Adicional
			, CASE WHEN (((A.wProgramado / A.lSolicitado) * 100) - 100) > 5 THEN 1 ELSE 0 END HayAdicional
		FROM res A
		LEFT JOIN validar B ON A.OP = B.Op;
	END
	ELSE IF ISNULL(@pZonaERP, '') = '02'
	BEGIN
		;WITH valProd1 AS (
			-- OBTENER LO PRODUCIDO POR OP
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS lProducido
			FROM @tmp C
			JOIN Cajas02..CmoDat021 A ON A.OP = C.OP
			JOIN Cajas02..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
			WHERE B.[Ultimo Proceso] = 1
			GROUP BY A.OP
		), valProd2 AS (
			-- OBTENER SOLICITADO
			SELECT A.OP, SUM(ISNULL(Cantidad, 0)) AS lCantidad, SUM(ISNULL(Devuelto, 0)) AS lDevuelto, (SUM(ISNULL(Cantidad, 0)) + SUM(ISNULL(Devuelto, 0))) AS lSolicitado
			FROM @tmp B 
			JOIN Cajas02..CmoDat011 A ON A.OP = B.OP
			GROUP BY A.OP
		), valProd3 AS (
			-- OBTENGO PROGRAMADO
			SELECT A.Op, SUM(ISNULL(A.[Numero Cortes], 0)) AS lCortes, SUM(ISNULL(A.[Piezas Corte], 0)) AS lPiezas, SUM(ISNULL(A.[Hojas Corte], 0)) AS lHojas
				, SUM(ISNULL(A.[Numero Cortes], 0) * ISNULL(A.[Piezas Corte], 0) * ISNULL(A.[Hojas Corte], 0)) AS lProgramado
			FROM @tmp D 
			JOIN Cajas02..CmoDat013 A ON A.Op = D.OP
			JOIN Cajas02..CmoDat012 B ON B.Programa = A.Programa
			JOIN Cajas02..CmoDat011 C ON C.OP = A.Op
			WHERE B.Estatus = 'P'
			GROUP BY A.Op
		), odTmp1 AS (
			-- OBTENER LO RECIBIDO EN EL ALMACEN PT Y EXCEDENTES SOLO LA FABRICACIÓN
			SELECT A.OP, SUM(ISNULL(Entradas, 0) - ISNULL(Salidas, 0)) AS PTActual
			FROM @tmp B
			JOIN Cajas02..CmoTjDat002 A ON A.Op = B.OP
			WHERE A.Almacen = '001'
			GROUP BY A.OP
			UNION
			SELECT A.OP, SUM(A.Entradas - A.Salidas) AS PTActual
			FROM @tmp B
			JOIN Cajas02..CmoTjDat002 A ON A.Op = B.OP
			WHERE A.Almacen = '052'
			GROUP BY A.OP
		), odTmp2 AS (
			-- OBTENER LOS TRASPASOS DE ENTRADA
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS TrasENT
			FROM @tmp C
			JOIN Cajas02..CmoTjDat001 A ON A.Op = C.OP
			JOIN Cajas02..CmoTjCat001 B ON B.Cod = A.Almacen
			WHERE A.Almacen != '052' AND A.Almacen != '100' AND A.Almacen != '001'
				AND A.Movimiento = 'E'
				AND A.Estatus = 'TRAS'
				AND B.TipoAlmacen = 'PT'
			GROUP BY A.Op
		), odTmp3 AS (
			-- OBTENER LOS TRASPASOS DE SALIDA
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS TrasSAL
			FROM @tmp C
			JOIN Cajas02..CmoTjDat001 A ON A.Op = C.OP
			JOIN Cajas02..CmoTjCat001 B ON B.Cod = A.Almacen
			WHERE A.Almacen != '052' AND A.Almacen != '100' AND A.Almacen != '001'
				AND A.Movimiento = 'S'
				AND A.Estatus = 'TRAS'
				AND B.TipoAlmacen = 'PT'
			GROUP BY A.Op
		), res AS (
			SELECT A.ID, A.Secuencia, A.Refile, A.Resistencia, A.Flauta, A.OP, A.Fecha, A.Cliente, A.Articulo, A.Ancho, A.Multiplos, A.Largo, A.Lam
				, A.[Ancho Total], A.[Ancho Papel], A.[Metros Lineales], A.Producto, A.Parcial, A.Puntos, A.ConScore, A.AnchoStd
				, ISNULL(B.lProducido, 0) AS lProducido, ISNULL(F.lCantidad, 0) AS Cantidad, ISNULL(F.lDevuelto, 0) AS Devuelto
				, ISNULL(G.lCortes, 0) AS Cortes, ISNULL(G.lPiezas, 0) AS Piezas, ISNULL(G.lHojas, 0) AS Hojas, ISNULL(G.lProgramado, 0) AS lProgramado
				, ISNULL(F.lSolicitado, 0) AS lSolicitado
				, CASE WHEN ISNULL(F.lSolicitado, 0) < (ISNULL(G.lProgramado, 0) + ISNULL(B.lProducido, 0)) THEN 1 ELSE 0 END AS ProduccionCompleta
				, (ISNULL(A.Lam, 0) * ISNULL(A.Multiplos, 0)) + (ISNULL(H.PTActual, 0) + ISNULL(I.TrasENT, 0) - ISNULL(J.TrasSAL, 0)) AS wProgramado
				, ISNULL(H.PTActual, 0) AS PTActual, ISNULL(I.TrasENT, 0) AS TrasENT, ISNULL(J.TrasSAL, 0) AS TrasSAL
				, ISNULL(H.PTActual, 0) + ISNULL(I.TrasENT, 0) - ISNULL(J.TrasSAL, 0) AS wProducido
			FROM @tmp A
			LEFT JOIN valProd1 B ON B.OP = A.OP
			LEFT JOIN valProd2 F ON F.OP = A.OP
			LEFT JOIN valProd3 G ON G.OP = A.OP
			LEFT JOIN odTmp1 H ON H.OP = A.OP
			LEFT JOIN odTmp2 I ON I.OP = A.OP
			LEFT JOIN odTmp3 J ON J.OP = A.OP
		), validar AS (
			SELECT z.Op, z.PiezasX, z.UltFecha
			FROM res B
			JOIN Cajas02..CmoDat011 A ON A.OP = B.OP
			JOIN (
				SELECT X.op, SUM(x.laminas * y.[Piezas Corte]) AS PiezasX, Max(x.[Fecha Produccion]) AS UltFecha
				FROM Cajas02..Cmodat017 X 
				JOIN Cajas02..Cmodat013 Y ON Y.OP = X.OP AND X.Programa = Y.Programa
				JOIN res W ON W.OP = X.Op
				GROUP BY X.OP
			) z ON z.OP = a.OP
		)
		INSERT INTO @res (
			ID, Secuencia, Refile, Resistencia, Flauta, OP, Fecha, Cliente, Articulo, Ancho, Multiplos, Largo, Lam
			, [Ancho Total], [Ancho Papel], [Metros Lineales], Producto, Parcial, Puntos, ConScore, AnchoStd
			, Producido, Cantidad, Devuelto, Cortes, Piezas, Hojas, ProduccionCompleta, PTActual, TrasENT, TrasSAL
			, OpValidar, PiezasX, UltFecha, Adicional, HayAdicional
		)
		SELECT A.ID, A.Secuencia, A.Refile, A.Resistencia, A.Flauta, A.OP, A.Fecha, A.Cliente, A.Articulo, A.Ancho, A.Multiplos, A.Largo, A.Lam
			, A.[Ancho Total], A.[Ancho Papel], A.[Metros Lineales], A.Producto, A.Parcial, A.Puntos, A.ConScore, A.AnchoStd
			, A.lProducido AS Producido, A.Cantidad, A.Devuelto, A.Cortes, A.Piezas, A.Hojas, A.ProduccionCompleta, (A.PTActual + A.TrasENT - A.TrasSAL), A.TrasENT, A.TrasSAL
			, ISNULL(B.Op, '') AS OpValidar, ISNULL(B.PiezasX, 0) AS PiezasX, B.UltFecha
			, (((A.wProgramado / A.lSolicitado) * 100) - 100) AS Adicional
			, CASE WHEN (((A.wProgramado / A.lSolicitado) * 100) - 100) > 5 THEN 1 ELSE 0 END HayAdicional
		FROM res A
		LEFT JOIN validar B ON A.OP = B.Op;
	END
	ELSE IF ISNULL(@pZonaERP, '') = '05'
	BEGIN
		;WITH valProd1 AS (
			-- OBTENER LO PRODUCIDO POR OP
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS lProducido
			FROM @tmp C
			JOIN Cajas05..CmoDat021 A ON A.OP = C.OP
			JOIN Cajas05..CmoDat020 B ON A.OP = B.OP AND A.Programa = B.Programa
			WHERE B.[Ultimo Proceso] = 1
			GROUP BY A.OP
		), valProd2 AS (
			-- OBTENER SOLICITADO
			SELECT A.OP, SUM(ISNULL(Cantidad, 0)) AS lCantidad, SUM(ISNULL(Devuelto, 0)) AS lDevuelto, (SUM(ISNULL(Cantidad, 0)) + SUM(ISNULL(Devuelto, 0))) AS lSolicitado
			FROM @tmp B 
			JOIN Cajas05..CmoDat011 A ON A.OP = B.OP
			GROUP BY A.OP
		), valProd3 AS (
			-- OBTENGO PROGRAMADO
			SELECT A.Op, SUM(ISNULL(A.[Numero Cortes], 0)) AS lCortes, SUM(ISNULL(A.[Piezas Corte], 0)) AS lPiezas, SUM(ISNULL(A.[Hojas Corte], 0)) AS lHojas
				, SUM(ISNULL(A.[Numero Cortes], 0) * ISNULL(A.[Piezas Corte], 0) * ISNULL(A.[Hojas Corte], 0)) AS lProgramado
			FROM @tmp D 
			JOIN Cajas05..CmoDat013 A ON A.Op = D.OP
			JOIN Cajas05..CmoDat012 B ON B.Programa = A.Programa
			JOIN Cajas05..CmoDat011 C ON C.OP = A.Op
			WHERE B.Estatus = 'P'
			GROUP BY A.Op
		), odTmp1 AS (
			-- OBTENER LO RECIBIDO EN EL ALMACEN PT Y EXCEDENTES SOLO LA FABRICACIÓN
			SELECT A.OP, SUM(ISNULL(Entradas, 0) - ISNULL(Salidas, 0)) AS PTActual
			FROM @tmp B
			JOIN Cajas05..CmoTjDat002 A ON A.Op = B.OP
			WHERE A.Almacen = '001'
			GROUP BY A.OP
			UNION
			SELECT A.OP, SUM(A.Entradas - A.Salidas) AS PTActual
			FROM @tmp B
			JOIN Cajas05..CmoTjDat002 A ON A.Op = B.OP
			WHERE A.Almacen = '052'
			GROUP BY A.OP
		), odTmp2 AS (
			-- OBTENER LOS TRASPASOS DE ENTRADA
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS TrasENT
			FROM @tmp C
			JOIN Cajas05..CmoTjDat001 A ON A.Op = C.OP
			JOIN Cajas05..CmoTjCat001 B ON B.Cod = A.Almacen
			WHERE A.Almacen != '052' AND A.Almacen != '100' AND A.Almacen != '001'
				AND A.Movimiento = 'E'
				AND A.Estatus = 'TRAS'
				AND B.TipoAlmacen = 'PT'
			GROUP BY A.Op
		), odTmp3 AS (
			-- OBTENER LOS TRASPASOS DE SALIDA
			SELECT A.OP, SUM(ISNULL(A.Cantidad, 0)) AS TrasSAL
			FROM @tmp C
			JOIN Cajas05..CmoTjDat001 A ON A.Op = C.OP
			JOIN Cajas05..CmoTjCat001 B ON B.Cod = A.Almacen
			WHERE A.Almacen != '052' AND A.Almacen != '100' AND A.Almacen != '001'
				AND A.Movimiento = 'S'
				AND A.Estatus = 'TRAS'
				AND B.TipoAlmacen = 'PT'
			GROUP BY A.Op
		), res AS (
			SELECT A.ID, A.Secuencia, A.Refile, A.Resistencia, A.Flauta, A.OP, A.Fecha, A.Cliente, A.Articulo, A.Ancho, A.Multiplos, A.Largo, A.Lam
				, A.[Ancho Total], A.[Ancho Papel], A.[Metros Lineales], A.Producto, A.Parcial, A.Puntos, A.ConScore, A.AnchoStd
				, ISNULL(B.lProducido, 0) AS lProducido, ISNULL(F.lCantidad, 0) AS Cantidad, ISNULL(F.lDevuelto, 0) AS Devuelto
				, ISNULL(G.lCortes, 0) AS Cortes, ISNULL(G.lPiezas, 0) AS Piezas, ISNULL(G.lHojas, 0) AS Hojas, ISNULL(G.lProgramado, 0) AS lProgramado
				, ISNULL(F.lSolicitado, 0) AS lSolicitado
				, CASE WHEN ISNULL(F.lSolicitado, 0) < (ISNULL(G.lProgramado, 0) + ISNULL(B.lProducido, 0)) THEN 1 ELSE 0 END AS ProduccionCompleta
				, (ISNULL(A.Lam, 0) * ISNULL(A.Multiplos, 0)) + (ISNULL(H.PTActual, 0) + ISNULL(I.TrasENT, 0) - ISNULL(J.TrasSAL, 0)) AS wProgramado
				, ISNULL(H.PTActual, 0) AS PTActual, ISNULL(I.TrasENT, 0) AS TrasENT, ISNULL(J.TrasSAL, 0) AS TrasSAL
				, ISNULL(H.PTActual, 0) + ISNULL(I.TrasENT, 0) - ISNULL(J.TrasSAL, 0) AS wProducido
			FROM @tmp A
			LEFT JOIN valProd1 B ON B.OP = A.OP
			LEFT JOIN valProd2 F ON F.OP = A.OP
			LEFT JOIN valProd3 G ON G.OP = A.OP
			LEFT JOIN odTmp1 H ON H.OP = A.OP
			LEFT JOIN odTmp2 I ON I.OP = A.OP
			LEFT JOIN odTmp3 J ON J.OP = A.OP
		), validar AS (
			SELECT z.Op, z.PiezasX, z.UltFecha
			FROM res B
			JOIN Cajas05..CmoDat011 A ON A.OP = B.OP
			JOIN (
				SELECT X.op, SUM(x.laminas * y.[Piezas Corte]) AS PiezasX, Max(x.[Fecha Produccion]) AS UltFecha
				FROM Cajas05..Cmodat017 X 
				JOIN Cajas05..Cmodat013 Y ON Y.OP = X.OP AND X.Programa = Y.Programa
				JOIN res W ON W.OP = X.Op
				GROUP BY X.OP
			) z ON z.OP = a.OP
		)
		INSERT INTO @res (
			ID, A.Secuencia, Refile, Resistencia, Flauta, OP, Fecha, Cliente, Articulo, Ancho, Multiplos, Largo, Lam
			, [Ancho Total], [Ancho Papel], [Metros Lineales], Producto, Parcial, Puntos, ConScore, AnchoStd
			, Producido, Cantidad, Devuelto, Cortes, Piezas, Hojas, ProduccionCompleta, PTActual, TrasENT, TrasSAL
			, OpValidar, PiezasX, UltFecha, Adicional, HayAdicional
		)
		SELECT A.ID, A.Secuencia, A.Refile, A.Resistencia, A.Flauta, A.OP, A.Fecha, A.Cliente, A.Articulo, A.Ancho, A.Multiplos, A.Largo, A.Lam
			, A.[Ancho Total], A.[Ancho Papel], A.[Metros Lineales], A.Producto, A.Parcial, A.Puntos, A.ConScore, A.AnchoStd
			, A.lProducido AS Producido, A.Cantidad, A.Devuelto, A.Cortes, A.Piezas, A.Hojas, A.ProduccionCompleta, (A.PTActual + A.TrasENT - A.TrasSAL), A.TrasENT, A.TrasSAL
			, ISNULL(B.Op, '') AS OpValidar, ISNULL(B.PiezasX, 0) AS PiezasX, B.UltFecha
			, (((A.wProgramado / A.lSolicitado) * 100) - 100) AS Adicional
			, CASE WHEN (((A.wProgramado / A.lSolicitado) * 100) - 100) > 5 THEN 1 ELSE 0 END HayAdicional
		FROM res A
		LEFT JOIN validar B ON A.OP = B.Op;
	END

	IF ISNULL(@pTabla, 0) = 0
	BEGIN
		SELECT ID,
			RTRIM(OP1) OP1, CONVERT(VARCHAR, Fecha1, 23) Fecha1, FORMAT(Multiplos1, '#,0.00', 'en-us') AS Multiplos1, FORMAT(Ancho1, '#,0.00', 'en-us') AS Ancho1, FORMAT(Largo1, '#,0.00', 'en-us') AS Largo1, Lam1, Piezas1, 
			RTRIM(OP2) OP2, CONVERT(VARCHAR, Fecha2, 23) Fecha2, FORMAT(Multiplos2, '#,0.00', 'en-us') AS Multiplos2, FORMAT(Ancho2, '#,0.00', 'en-us') AS Ancho2, FORMAT(Largo2, '#,0.00', 'en-us') AS Largo2, Lam2, Piezas2, 
			RTRIM(OP3) OP3, CONVERT(VARCHAR, Fecha3, 23) Fecha3, FORMAT(Multiplos3, '#,0.00', 'en-us') AS Multiplos3, FORMAT(Ancho3, '#,0.00', 'en-us') AS Ancho3, FORMAT(Largo3, '#,0.00', 'en-us') AS Largo3, Lam3, Piezas3, 
			FORMAT([Ancho Total], '#,0.00', 'en-us') AS AnchoTotal, FORMAT([Ancho Papel], '#,0.00', 'en-us') AS AnchoPapel, FORMAT(Refile, '#,0.00', 'en-us') AS Refile, [Metros Lineales] AS MetrosLineales,
			RTRIM(Producto1) Producto1, Parcial1, RTRIM(Cliente1) Cliente1, RTRIM(Articulo1) Articulo1, RTRIM(Rest1) Rest1, ConScore, 
			RTRIM(Producto2) Producto2, Parcial2, RTRIM(Cliente2) Cliente2, RTRIM(Articulo2) Articulo2, RTRIM(Rest2) Rest2, ConScore2, 
			RTRIM(Producto3) Producto3, Parcial3, RTRIM(Cliente3) Cliente3, RTRIM(Articulo3) Articulo3, RTRIM(Rest3) Rest3, ConScore3, 
			Puntos, RTRIM(Resistencia) Resistencia, RTRIM(Flauta) Flauta, Tranf, RTRIM(Empate) Empate, FORMAT(AnchoStd, '#,0.00', 'en-us') AS AnchoStd, 0 AS Seleccionado
		FROM @CPLDAT009;

		SELECT ID, Secuencia, FORMAT(Refile, '#,0.00', 'en-us') AS Refile, RTRIM(Resistencia) Resistencia, RTRIM(Flauta) Flauta, RTRIM(OP) OP, CONVERT(VARCHAR, Fecha, 23) Fecha
			, RTRIM(Cliente) Cliente, RTRIM(Articulo) Articulo, FORMAT(Ancho, '#,0.00', 'en-us') AS Ancho, FORMAT(Multiplos, '#,0.00', 'en-us') AS Multiplos
			, FORMAT(Largo, '#,0.00', 'en-us') AS Largo, Lam, FORMAT([Ancho Total], '#,0.00', 'en-us') AS AnchoTotal, FORMAT([Ancho Papel], '#,0.00', 'en-us') AS AnchoPapel
			, FORMAT([Metros Lineales], '#,0.00', 'en-us') AS MetrosLineales, RTRIM(Producto) Producto, Parcial, Puntos, ConScore
			, FORMAT(AnchoStd, '#,0.00', 'en-us') AS AnchoStd, Producido, Cantidad, Devuelto, Cortes, FORMAT(Piezas, '#,0.00', 'en-us') AS Piezas
			, Hojas, ProduccionCompleta, PTActual, TrasENT, TrasSAL
			, CASE WHEN ProduccionCompleta = 1 THEN OpValidar ELSE '' END AS OpValidar
			, CASE WHEN ProduccionCompleta = 1 THEN PiezasX ELSE 0 END AS PiezasX
			, CASE WHEN ProduccionCompleta = 1 THEN CONVERT(VARCHAR, UltFecha, 23) ELSE '' END AS UltFecha
			, CASE WHEN Adicional < 0 THEN '0.00' ELSE FORMAT(Adicional, '#,0.00', 'en-us') END + ' %' AS Adicional, HayAdicional, Cancelar
		FROM @res
		ORDER BY ID, Puntos DESC;

		SELECT FORMAT(@RefilePromedio, '0.00 %', 'en-us') AS RefProm, FORMAT(@M2 / 100, '#,0.00', 'en-us') AS M2, FORMAT(@ML, '#,0.00', 'en-us') AS ML
			, FORMAT(@RP, '#,0.00', 'en-us') AS RP, FORMAT(@S1, '#,0.00', 'en-us') AS S1, FORMAT(@S2, '#,0.00', 'en-us') AS S2;
	END
	ELSE IF ISNULL(@pTabla, 0) = 1
	BEGIN
		SELECT ID,
			RTRIM(OP1) OP1, CONVERT(VARCHAR, Fecha1, 23) Fecha1, FORMAT(Multiplos1, '#,0.00', 'en-us') AS Multiplos1, FORMAT(Ancho1, '#,0.00', 'en-us') AS Ancho1, FORMAT(Largo1, '#,0.00', 'en-us') AS Largo1, Lam1, Piezas1, 
			RTRIM(OP2) OP2, CONVERT(VARCHAR, Fecha2, 23) Fecha2, FORMAT(Multiplos2, '#,0.00', 'en-us') AS Multiplos2, FORMAT(Ancho2, '#,0.00', 'en-us') AS Ancho2, FORMAT(Largo2, '#,0.00', 'en-us') AS Largo2, Lam2, Piezas2, 
			RTRIM(OP3) OP3, CONVERT(VARCHAR, Fecha3, 23) Fecha3, FORMAT(Multiplos3, '#,0.00', 'en-us') AS Multiplos3, FORMAT(Ancho3, '#,0.00', 'en-us') AS Ancho3, FORMAT(Largo3, '#,0.00', 'en-us') AS Largo3, Lam3, Piezas3, 
			FORMAT([Ancho Total], '#,0.00', 'en-us') AS AnchoTotal, FORMAT([Ancho Papel], '#,0.00', 'en-us') AS AnchoPapel, FORMAT(Refile, '#,0.00', 'en-us') AS Refile, [Metros Lineales] AS MetrosLineales,
			RTRIM(Producto1) Producto1, Parcial1, RTRIM(Cliente1) Cliente1, RTRIM(Articulo1) Articulo1, RTRIM(Rest1) Rest1, ConScore, 
			RTRIM(Producto2) Producto2, Parcial2, RTRIM(Cliente2) Cliente2, RTRIM(Articulo2) Articulo2, RTRIM(Rest2) Rest2, ConScore2, 
			RTRIM(Producto3) Producto3, Parcial3, RTRIM(Cliente3) Cliente3, RTRIM(Articulo3) Articulo3, RTRIM(Rest3) Rest3, ConScore3, 
			Puntos, RTRIM(Resistencia) Resistencia, RTRIM(Flauta) Flauta, Tranf, RTRIM(Empate) Empate, FORMAT(AnchoStd, '#,0.00', 'en-us') AS AnchoStd, 0 AS Seleccionado
		FROM @CPLDAT009;
	END
	ELSE IF ISNULL(@pTabla, 0) = 2
	BEGIN
		SELECT ID, Secuencia, FORMAT(Refile, '#,0.00', 'en-us') AS Refile, RTRIM(Resistencia) Resistencia, RTRIM(Flauta) Flauta, RTRIM(OP) OP, CONVERT(VARCHAR, Fecha, 23) Fecha
			, RTRIM(Cliente) Cliente, RTRIM(Articulo) Articulo, FORMAT(Ancho, '#,0.00', 'en-us') AS Ancho, FORMAT(Multiplos, '#,0.00', 'en-us') AS Multiplos
			, FORMAT(Largo, '#,0.00', 'en-us') AS Largo, Lam, FORMAT([Ancho Total], '#,0.00', 'en-us') AS AnchoTotal, FORMAT([Ancho Papel], '#,0.00', 'en-us') AS AnchoPapel
			, FORMAT([Metros Lineales], '#,0.00', 'en-us') AS MetrosLineales, RTRIM(Producto) Producto, Parcial, Puntos, ConScore
			, FORMAT(AnchoStd, '#,0.00', 'en-us') AS AnchoStd, Producido, Cantidad, Devuelto, Cortes, FORMAT(Piezas, '#,0.00', 'en-us') AS Piezas
			, Hojas, ProduccionCompleta, PTActual, TrasENT, TrasSAL
			, CASE WHEN ProduccionCompleta = 1 THEN OpValidar ELSE '' END AS OpValidar
			, CASE WHEN ProduccionCompleta = 1 THEN PiezasX ELSE 0 END AS PiezasX
			, CASE WHEN ProduccionCompleta = 1 THEN CONVERT(VARCHAR, UltFecha, 23) ELSE '' END AS UltFecha
			, CASE WHEN Adicional < 0 THEN '0.00' ELSE FORMAT(Adicional, '#,0.00', 'en-us') END + ' %' AS Adicional, HayAdicional, Cancelar
		FROM @res
		ORDER BY ID, Puntos DESC;
	END
	ELSE IF ISNULL(@pTabla, 0) = 3
	BEGIN
		SELECT FORMAT(@RefilePromedio, '0.00 %', 'en-us') AS RefProm, FORMAT(@M2 / 100, '#,0.00', 'en-us') AS M2, FORMAT(@ML, '#,0.00', 'en-us') AS ML
			, FORMAT(@RP, '#,0.00', 'en-us') AS RP, FORMAT(@S1, '#,0.00', 'en-us') AS S1, FORMAT(@S2, '#,0.00', 'en-us') AS S2;
	END

	SET NOCOUNT OFF;
END

GO


