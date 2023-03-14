USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG016MWSPC1]    Script Date: 20/10/2022 08:33:21 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FCAPROG016MWSPC1]
	  @Opcion INT						= NULL
	, @pZonaERP VARCHAR(2)				= NULL
	, @pOP VARCHAR(10)					= NULL
	, @pCantidadTras INT				= NULL
	--, @pProceso VARCHAR(10)			= NULL
	--, @pHojas DECIMAL(18, 2)			= NULL
	--, @pVariacion DECIMAL(18, 2)		= NULL
	--, @pCantidadSol DECIMAL(18, 2)	= NULL
	--, @CantAnt DECIMAL(18, 2)			= NULL
	, @pDatosPrincipal CPLDAT004TD_001	READONLY
	, @pUsuarioERP VARCHAR(8)			= NULL
AS 
BEGIN
	DECLARE @Mensaje VARCHAR(500), @Id BIT;
	DECLARE @ResultadoInsert AS TABLE (Id INT, Message VARCHAR(200));

	DECLARE @GrupoActivo SMALLINT, @GrupoGrabar SMALLINT, @ResistenciaAct VARCHAR(15), @Resistencia VARCHAR(15), @Excedente DECIMAL(18, 2)
		, @Faltan DECIMAL(18, 2), @OrdenProduccion VARCHAR(10), @ClaveArticulo VARCHAR(9), @FechaEntrega SMALLDATETIME, @CantAnt DECIMAL(18, 2)
		, @Cliente VARCHAR(100), @Nombre VARCHAR(100), @Articulo VARCHAR(60), @Ancho REAL, @Largo REAL, @Piezas DECIMAL(6, 1), @Cantidad DECIMAL(15, 1)
		, @lFaltan DECIMAL(18, 2), @Hojas INT, @Industria VARCHAR(3), @Parcial VARCHAR(1), @Flauta VARCHAR(3), @Tkg INT, @TM2 INT, @pMas DECIMAL(18, 2)
		, @lPiezas DECIMAL(18, 2), @CantidadSol DECIMAL(18, 2), @CantidadTras DECIMAL(18, 2), @Proceso VARCHAR(2), @Variacion DECIMAL(18, 2)
		, @pHojas DECIMAL(18, 2);

	IF @Opcion = 1
	BEGIN
		IF ISNULL(@pZonaERP, '') = '01'
		BEGIN
			;WITH tmp1 AS (
				SELECT A.Almacen, A.[Clave Articulo] AS ClaveArticulo
					, SUM(ISNULL(A.Entradas, 0)) AS Entradas, SUM(ISNULL(A.Salidas, 0)) AS Salidas
				FROM Cajas01..CmoTjDat002 A
				INNER JOIN Cajas01..CmoTjCat001 B ON A.Almacen = B.Cod
				WHERE A.Entradas > A.Salidas AND B.Inventario = 1 AND A.Almacen IN ('053')
				GROUP BY A.Almacen, A.[Clave Articulo]
			), tmp2 AS (
				SELECT ISNULL(E.Entradas, 0) - ISNULL(E.Salidas, 0) AS Existencia
					, A.Prior, A.Utilizar, A.Refile, A.[Orden Produccion] AS Op, A.[Fecha Entrega] AS FechaEntrega, A.Cliente, A.[Clave Articulo] AS ClaveArticulo, A.Articulo, A.Cantidad
					, A.Hojas, A.Ancho, A.Largo, A.Piezas, A.Resistencia, A.Flauta, A.Tkg, A.Lamina, A.Parcial, A.Mas, A.TM2
					, ISNULL(B.CantidadTras, 0) AS CantidadTras, ISNULL(B.CantidadSol, 0) AS CantidadSol, ISNULL(B.Autorizado, 0) AS Autorizado
					, ISNULL(C.Proceso, '') AS Proceso, (ISNULL(C.Variacion, 0) * 100) AS Variacion, ISNULL(D.ConScore, 0) AS ConScore, ISNULL(F.ExcedentePT, 0) AS ExcedentePT
					, (ISNULL(A.Hojas, 0)*ISNULL(A.Piezas, 0)) AS CantidadValidarTij
				FROM CplDat004 A
				LEFT JOIN CplVis002 C ON A.[Clave Articulo] = C.[Clave Articulo] AND A.[Orden Produccion] = C.[Orden Produccion]
				LEFT JOIN Cajas01..CmoDat088 B ON A.[Orden Produccion] = B.OP AND B.Autorizado = 0
				LEFT JOIN Cajas01..CmoTjCat004 D ON A.[Clave Articulo] = D.[Clave Articulo]
				LEFT JOIN tmp1 E ON E.ClaveArticulo = A.[Clave Articulo]
				LEFT JOIN (
					SELECT A.Op, A.[Clave Articulo], (ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) AS ExcedentePT, A.Almacen
					FROM Cajas01..CmoTjDat002 A
					INNER JOIN Cajas01..CmoTjCat001 B ON A.Almacen = B.Cod AND B.Cod IN ('029', '052', '056')
						AND (A.Entradas - A.Salidas) > 0 AND (B.Inventario = 1 OR B.Excedente = 1) AND B.Resguardo = 0 AND B.TipoAlmacen = 'PT'
					GROUP BY A.[Clave Articulo], A.Almacen, A.Entradas, A.Salidas, A.Op
				) F ON D.[Clave Articulo] = F.[Clave Articulo] AND A.[Orden Produccion] = F.Op
			), tmp3 AS (
				SELECT E.Op, C.Proceso AS Ruta
					, CASE WHEN C.Cproceso = '' THEN '0' ELSE ISNULL(C.Cproceso, '0') END AS ProcesoEsp, A.[Clave Articulo] AS ClaveArticulo
					, CASE WHEN D.Industria = 'AGR' THEN D.Industria ELSE '' END AS Industria
					, CASE WHEN C.Proceso = 'B' OR C.Proceso = 'C' 
						THEN CASE WHEN D.Industria = 'AGR' THEN A.Variacion * 100 ELSE 0 END
						ELSE 0
					END AS Variacion
				FROM tmp2 E
				INNER JOIN Cajas01..OpCorrugadora A ON E.Op = A.OP
				INNER JOIN Cajas01..CmoTjCat004 C
				INNER JOIN Cajas01..CmoCat013 D ON C.SubCodigo = D.SubCodigo ON A.[Clave Articulo] = C.[Clave Articulo]
			), tmp4 AS (
				SELECT B.Op, [1A500], [501A1000], [1001A2000], [2001A3000], [M3000], B.ProcesoEsp
				FROM CplDat070 AS A
				INNER JOIN tmp3 AS B ON A.CodRuta = B.Ruta
					AND A.ProcesoEspecial = B.ProcesoEsp
					AND A.Industria = B.Industria
					AND A.Variacion = B.Variacion
			), tmp5 AS (
				SELECT A.[Clave Articulo], SUM(ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) AS Existencia
				FROM Cajas01..CmoTjDat002 A
				INNER JOIN tmp2 B ON A.Op = B.Op
				WHERE Entradas <> Salidas AND Almacen = '055'
					AND A.[Clave Articulo] = B.ClaveArticulo
				GROUP BY A.[Clave Articulo]
			)
			SELECT Prior
				, CASE WHEN ISNULL(@pZonaERP, '') = '02' 
					THEN CASE WHEN A.CantidadSol > 0 
						THEN CASE WHEN A.Autorizado = 1 AND A.Utilizar = 1 
							THEN 1 
							ELSE 0 
						END 
						ELSE A.Utilizar
					END
					ELSE A.Utilizar
				END AS Usar
				, A.Refile, RTRIM(A.Op) AS Op, CONVERT(VARCHAR, A.FechaEntrega, 23) AS FechaEntrega, RTRIM(A.Cliente) AS Cliente, RTRIM(A.ClaveArticulo) AS ClaveArticulo
				, RTRIM(A.Articulo) AS Articulo, A.Cantidad, A.Hojas
				, FORMAT(A.Ancho, '0.00', 'EN-US') AS Ancho, FORMAT(A.Largo, '0.00', 'EN-US') AS Largo, FORMAT(A.Piezas, '0', 'EN-US') AS Piezas
				, RTRIM(A.Resistencia) AS Resistencia, RTRIM(A.Flauta) AS Flauta, A.Tkg, RTRIM(A.Lamina) AS Lamina, RTRIM(A.Parcial) AS Parcial
				, FORMAT(A.Mas, '0', 'EN-US') AS Mas
				, FORMAT(
				CASE WHEN ISNULL(@pZonaERP, '') = '02' AND ISNULL(B.Op, '') != '' AND ISNULL(B.ProcesoEsp, '') != ''
					THEN CASE WHEN A.CantidadValidarTij <= 500 THEN ISNULL(B.[1A500], 0)
						WHEN A.CantidadValidarTij BETWEEN 501 AND 1000 THEN ISNULL(B.[501A1000], 0)
						WHEN A.CantidadValidarTij BETWEEN 1001 AND 2000 THEN ISNULL(B.[1001A2000], 0)
						WHEN A.CantidadValidarTij BETWEEN 2001 AND 3000 THEN ISNULL(B.[2001A3000], 0)
						WHEN A.CantidadValidarTij > 3000 THEN ISNULL(B.[M3000], 0)
						ELSE 0
					END
					ELSE A.Mas
				END, '0', 'EN-US') AS Mass
				, RTRIM(A.Proceso) AS Proceso
				, RTRIM(CASE WHEN ISNULL(@pZonaERP, '') = '02' AND ISNULL(B.Op, '') != '' AND ISNULL(B.ProcesoEsp, '') != ''
					THEN ISNULL(B.ProcesoEsp, '')
					ELSE A.Proceso
				END) AS Procesoo
				, A.CantidadTras, A.CantidadSol, A.Autorizado, CASE WHEN A.Autorizado = 1 THEN 'SI' ELSE 'NO' END AS Autorizadoo, FORMAT(A.Variacion, '0.00', 'EN-US') AS Variacion
				, A.ConScore, CASE WHEN A.ConScore = 1 THEN 'RAYADA' ELSE 'PLANA' END TxtConScore, A.Existencia, A.Utilizar, A.TM2, A.ExcedentePT
				, CASE WHEN ISNULL(C.[Clave Articulo], '') != '' THEN C.Existencia ELSE 0 END AS ExcedeLamina, (A.Hojas*Piezas) - CantidadTras AS ValAnt
			FROM tmp2 A
			LEFT JOIN tmp4 B ON A.Op = B.Op
			LEFT JOIN tmp5 C ON A.ClaveArticulo = C.[Clave Articulo]
			ORDER BY A.Op;
		END
		ELSE IF ISNULL(@pZonaERP, '') = '02'
		BEGIN
			;WITH tmp1 AS (
				SELECT A.Almacen, A.[Clave Articulo] AS ClaveArticulo
					, SUM(ISNULL(A.Entradas, 0)) AS Entradas, SUM(ISNULL(A.Salidas, 0)) AS Salidas
				FROM Cajas02..CmoTjDat002 A
				INNER JOIN Cajas02..CmoTjCat001 B ON A.Almacen = B.Cod
				WHERE A.Entradas > A.Salidas AND B.Inventario = 1 AND A.Almacen IN ('053')
				GROUP BY A.Almacen, A.[Clave Articulo]
			), tmp2 AS (
				SELECT ISNULL(E.Entradas, 0) - ISNULL(E.Salidas, 0) AS Existencia
					, A.Prior, A.Utilizar, A.Refile, A.[Orden Produccion] AS Op, A.[Fecha Entrega] AS FechaEntrega, A.Cliente, A.[Clave Articulo] AS ClaveArticulo, A.Articulo, A.Cantidad
					, A.Hojas, A.Ancho, A.Largo, A.Piezas, A.Resistencia, A.Flauta, A.Tkg, A.Lamina, A.Parcial, A.Mas, A.TM2
					, ISNULL(B.CantidadTras, 0) AS CantidadTras, ISNULL(B.CantidadSol, 0) AS CantidadSol, ISNULL(B.Autorizado, 0) AS Autorizado
					, ISNULL(C.Proceso, '') AS Proceso, (ISNULL(C.Variacion, 0) * 100) AS Variacion, ISNULL(D.ConScore, 0) AS ConScore, ISNULL(F.ExcedentePT, 0) AS ExcedentePT
					, (ISNULL(A.Hojas, 0)*ISNULL(A.Piezas, 0)) AS CantidadValidarTij
				FROM CplDat004 A
				LEFT JOIN CplVis002 C ON A.[Clave Articulo] = C.[Clave Articulo] AND A.[Orden Produccion] = C.[Orden Produccion]
				LEFT JOIN Cajas02..CmoDat088 B ON A.[Orden Produccion] = B.OP AND B.Autorizado = 0
				LEFT JOIN Cajas02..CmoTjCat004 D ON A.[Clave Articulo] = D.[Clave Articulo]
				LEFT JOIN tmp1 E ON E.ClaveArticulo = A.[Clave Articulo]
				LEFT JOIN (
					SELECT A.Op, A.[Clave Articulo], (ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) AS ExcedentePT, A.Almacen
					FROM Cajas02..CmoTjDat002 A
					INNER JOIN Cajas02..CmoTjCat001 B ON A.Almacen = B.Cod AND B.Cod IN ('029', '052', '056')
						AND (A.Entradas - A.Salidas) > 0 AND (B.Inventario = 1 OR B.Excedente = 1) AND B.Resguardo = 0 AND B.TipoAlmacen = 'PT'
					GROUP BY A.[Clave Articulo], A.Almacen, A.Entradas, A.Salidas, A.Op
				) F ON D.[Clave Articulo] = F.[Clave Articulo] AND A.[Orden Produccion] = F.Op
			), tmp3 AS (
				SELECT E.Op, C.Proceso AS Ruta
					, CASE WHEN C.Cproceso = '' THEN '0' ELSE ISNULL(C.Cproceso, '0') END AS ProcesoEsp, A.[Clave Articulo] AS ClaveArticulo
					, CASE WHEN D.Industria = 'AGR' THEN D.Industria ELSE '' END AS Industria
					, CASE WHEN C.Proceso = 'B' OR C.Proceso = 'C' 
						THEN CASE WHEN D.Industria = 'AGR' THEN A.Variacion * 100 ELSE 0 END
						ELSE 0
					END AS Variacion
				FROM tmp2 E
				INNER JOIN Cajas02..OpCorrugadora A ON E.Op = A.OP
				INNER JOIN Cajas02..CmoTjCat004 C
				INNER JOIN Cajas02..CmoCat013 D ON C.SubCodigo = D.SubCodigo ON A.[Clave Articulo] = C.[Clave Articulo]
			), tmp4 AS (
				SELECT B.Op, [1A500], [501A1000], [1001A2000], [2001A3000], [M3000], B.ProcesoEsp
				FROM CplDat070 AS A
				INNER JOIN tmp3 AS B ON A.CodRuta = B.Ruta
					AND A.ProcesoEspecial = B.ProcesoEsp
					AND A.Industria = B.Industria
					AND A.Variacion = B.Variacion
			), tmp5 AS (
				SELECT A.[Clave Articulo], SUM(ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) AS Existencia
				FROM Cajas02..CmoTjDat002 A
				INNER JOIN tmp2 B ON A.Op = B.Op
				WHERE Entradas <> Salidas AND Almacen = '055'
					AND A.[Clave Articulo] = B.ClaveArticulo
				GROUP BY A.[Clave Articulo]
			)
			SELECT Prior
				, CASE WHEN ISNULL(@pZonaERP, '') = '02' 
					THEN CASE WHEN A.CantidadSol > 0 
						THEN CASE WHEN A.Autorizado = 1 AND A.Utilizar = 1 
							THEN 1 
							ELSE 0 
						END 
						ELSE A.Utilizar
					END
					ELSE A.Utilizar
				END AS Usar
				, A.Refile, RTRIM(A.Op) AS Op, CONVERT(VARCHAR, A.FechaEntrega, 23) AS FechaEntrega, RTRIM(A.Cliente) AS Cliente, RTRIM(A.ClaveArticulo) AS ClaveArticulo
				, RTRIM(A.Articulo) AS Articulo, A.Cantidad, A.Hojas
				, FORMAT(A.Ancho, '0.00', 'EN-US') AS Ancho, FORMAT(A.Largo, '0.00', 'EN-US') AS Largo, FORMAT(A.Piezas, '0', 'EN-US') AS Piezas
				, RTRIM(A.Resistencia) AS Resistencia, RTRIM(A.Flauta) AS Flauta, A.Tkg, RTRIM(A.Lamina) AS Lamina, RTRIM(A.Parcial) AS Parcial
				, FORMAT(A.Mas, '0', 'EN-US') AS Mas
				, FORMAT(
				CASE WHEN ISNULL(@pZonaERP, '') = '02' AND ISNULL(B.Op, '') != '' AND ISNULL(B.ProcesoEsp, '') != ''
					THEN CASE WHEN A.CantidadValidarTij <= 500 THEN ISNULL(B.[1A500], 0)
						WHEN A.CantidadValidarTij BETWEEN 501 AND 1000 THEN ISNULL(B.[501A1000], 0)
						WHEN A.CantidadValidarTij BETWEEN 1001 AND 2000 THEN ISNULL(B.[1001A2000], 0)
						WHEN A.CantidadValidarTij BETWEEN 2001 AND 3000 THEN ISNULL(B.[2001A3000], 0)
						WHEN A.CantidadValidarTij > 3000 THEN ISNULL(B.[M3000], 0)
						ELSE 0
					END
					ELSE A.Mas
				END, '0', 'EN-US') AS Mass
				, RTRIM(A.Proceso) AS Proceso
				, RTRIM(CASE WHEN ISNULL(@pZonaERP, '') = '02' AND ISNULL(B.Op, '') != '' AND ISNULL(B.ProcesoEsp, '') != ''
					THEN ISNULL(B.ProcesoEsp, '')
					ELSE A.Proceso
				END) AS Procesoo
				, A.CantidadTras, A.CantidadSol, A.Autorizado, CASE WHEN A.Autorizado = 1 THEN 'SI' ELSE 'NO' END AS Autorizadoo, FORMAT(A.Variacion, '0.00', 'EN-US') AS Variacion
				, A.ConScore, CASE WHEN A.ConScore = 1 THEN 'RAYADA' ELSE 'PLANA' END TxtConScore, A.Existencia, A.Utilizar, A.TM2, A.ExcedentePT
				, CASE WHEN ISNULL(C.[Clave Articulo], '') != '' THEN C.Existencia ELSE 0 END AS ExcedeLamina, (A.Hojas*Piezas) - CantidadTras AS ValAnt
			FROM tmp2 A
			LEFT JOIN tmp4 B ON A.Op = B.Op
			LEFT JOIN tmp5 C ON A.ClaveArticulo = C.[Clave Articulo]
			ORDER BY A.Op;
		END
		ELSE IF ISNULL(@pZonaERP, '') = '05'
		BEGIN
			;WITH tmp1 AS (
				SELECT A.Almacen, A.[Clave Articulo] AS ClaveArticulo
					, SUM(ISNULL(A.Entradas, 0)) AS Entradas, SUM(ISNULL(A.Salidas, 0)) AS Salidas
				FROM Cajas05..CmoTjDat002 A
				INNER JOIN Cajas05..CmoTjCat001 B ON A.Almacen = B.Cod
				WHERE A.Entradas > A.Salidas AND B.Inventario = 1 AND A.Almacen IN ('053')
				GROUP BY A.Almacen, A.[Clave Articulo]
			), tmp2 AS (
				SELECT ISNULL(E.Entradas, 0) - ISNULL(E.Salidas, 0) AS Existencia
					, A.Prior, A.Utilizar, A.Refile, A.[Orden Produccion] AS Op, A.[Fecha Entrega] AS FechaEntrega, A.Cliente, A.[Clave Articulo] AS ClaveArticulo, A.Articulo, A.Cantidad
					, A.Hojas, A.Ancho, A.Largo, A.Piezas, A.Resistencia, A.Flauta, A.Tkg, A.Lamina, A.Parcial, A.Mas, A.TM2
					, ISNULL(B.CantidadTras, 0) AS CantidadTras, ISNULL(B.CantidadSol, 0) AS CantidadSol, ISNULL(B.Autorizado, 0) AS Autorizado
					, ISNULL(C.Proceso, '') AS Proceso, (ISNULL(C.Variacion, 0) * 100) AS Variacion, ISNULL(D.ConScore, 0) AS ConScore, ISNULL(F.ExcedentePT, 0) AS ExcedentePT
					, (ISNULL(A.Hojas, 0)*ISNULL(A.Piezas, 0)) AS CantidadValidarTij
				FROM CplDat004 A
				LEFT JOIN CplVis002 C ON A.[Clave Articulo] = C.[Clave Articulo] AND A.[Orden Produccion] = C.[Orden Produccion]
				LEFT JOIN Cajas05..CmoDat088 B ON A.[Orden Produccion] = B.OP AND B.Autorizado = 0
				LEFT JOIN Cajas05..CmoTjCat004 D ON A.[Clave Articulo] = D.[Clave Articulo]
				LEFT JOIN tmp1 E ON E.ClaveArticulo = A.[Clave Articulo]
				LEFT JOIN (
					SELECT A.Op, A.[Clave Articulo], (ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) AS ExcedentePT, A.Almacen
					FROM Cajas05..CmoTjDat002 A
					INNER JOIN Cajas05..CmoTjCat001 B ON A.Almacen = B.Cod AND B.Cod IN ('029', '052', '056')
						AND (A.Entradas - A.Salidas) > 0 AND (B.Inventario = 1 OR B.Excedente = 1) AND B.Resguardo = 0 AND B.TipoAlmacen = 'PT'
					GROUP BY A.[Clave Articulo], A.Almacen, A.Entradas, A.Salidas, A.Op
				) F ON D.[Clave Articulo] = F.[Clave Articulo] AND A.[Orden Produccion] = F.Op
			), tmp3 AS (
				SELECT E.Op, C.Proceso AS Ruta
					, CASE WHEN C.Cproceso = '' THEN '0' ELSE ISNULL(C.Cproceso, '0') END AS ProcesoEsp, A.[Clave Articulo] AS ClaveArticulo
					, CASE WHEN D.Industria = 'AGR' THEN D.Industria ELSE '' END AS Industria
					, CASE WHEN C.Proceso = 'B' OR C.Proceso = 'C' 
						THEN CASE WHEN D.Industria = 'AGR' THEN A.Variacion * 100 ELSE 0 END
						ELSE 0
					END AS Variacion
				FROM tmp2 E
				INNER JOIN Cajas05..OpCorrugadora A ON E.Op = A.OP
				INNER JOIN Cajas05..CmoTjCat004 C
				INNER JOIN Cajas05..CmoCat013 D ON C.SubCodigo = D.SubCodigo ON A.[Clave Articulo] = C.[Clave Articulo]
			), tmp4 AS (
				SELECT B.Op, [1A500], [501A1000], [1001A2000], [2001A3000], [M3000], B.ProcesoEsp
				FROM CplDat070 AS A
				INNER JOIN tmp3 AS B ON A.CodRuta = B.Ruta
					AND A.ProcesoEspecial = B.ProcesoEsp
					AND A.Industria = B.Industria
					AND A.Variacion = B.Variacion
			), tmp5 AS (
				SELECT A.[Clave Articulo], SUM(ISNULL(A.Entradas, 0) - ISNULL(A.Salidas, 0)) AS Existencia
				FROM Cajas05..CmoTjDat002 A
				INNER JOIN tmp2 B ON A.Op = B.Op
				WHERE Entradas <> Salidas AND Almacen = '055'
					AND A.[Clave Articulo] = B.ClaveArticulo
				GROUP BY A.[Clave Articulo]
			)
			SELECT Prior
				, CASE WHEN ISNULL(@pZonaERP, '') = '02' 
					THEN CASE WHEN A.CantidadSol > 0 
						THEN CASE WHEN A.Autorizado = 1 AND A.Utilizar = 1 
							THEN 1 
							ELSE 0 
						END 
						ELSE A.Utilizar
					END
					ELSE A.Utilizar
				END AS Usar
				, A.Refile, RTRIM(A.Op) AS Op, CONVERT(VARCHAR, A.FechaEntrega, 23) AS FechaEntrega, RTRIM(A.Cliente) AS Cliente, RTRIM(A.ClaveArticulo) AS ClaveArticulo
				, RTRIM(A.Articulo) AS Articulo, A.Cantidad, A.Hojas
				, FORMAT(A.Ancho, '0.00', 'EN-US') AS Ancho, FORMAT(A.Largo, '0.00', 'EN-US') AS Largo, FORMAT(A.Piezas, '0', 'EN-US') AS Piezas
				, RTRIM(A.Resistencia) AS Resistencia, RTRIM(A.Flauta) AS Flauta, A.Tkg, RTRIM(A.Lamina) AS Lamina, RTRIM(A.Parcial) AS Parcial
				, FORMAT(A.Mas, '0', 'EN-US') AS Mas
				, FORMAT(
				CASE WHEN ISNULL(@pZonaERP, '') = '02' AND ISNULL(B.Op, '') != '' AND ISNULL(B.ProcesoEsp, '') != ''
					THEN CASE WHEN A.CantidadValidarTij <= 500 THEN ISNULL(B.[1A500], 0)
						WHEN A.CantidadValidarTij BETWEEN 501 AND 1000 THEN ISNULL(B.[501A1000], 0)
						WHEN A.CantidadValidarTij BETWEEN 1001 AND 2000 THEN ISNULL(B.[1001A2000], 0)
						WHEN A.CantidadValidarTij BETWEEN 2001 AND 3000 THEN ISNULL(B.[2001A3000], 0)
						WHEN A.CantidadValidarTij > 3000 THEN ISNULL(B.[M3000], 0)
						ELSE 0
					END
					ELSE A.Mas
				END, '0', 'EN-US') AS Mass
				, RTRIM(A.Proceso) AS Proceso
				, RTRIM(CASE WHEN ISNULL(@pZonaERP, '') = '02' AND ISNULL(B.Op, '') != '' AND ISNULL(B.ProcesoEsp, '') != ''
					THEN ISNULL(B.ProcesoEsp, '')
					ELSE A.Proceso
				END) AS Procesoo
				, A.CantidadTras, A.CantidadSol, A.Autorizado, CASE WHEN A.Autorizado = 1 THEN 'SI' ELSE 'NO' END AS Autorizadoo, FORMAT(A.Variacion, '0.00', 'EN-US') AS Variacion
				, A.ConScore, CASE WHEN A.ConScore = 1 THEN 'RAYADA' ELSE 'PLANA' END TxtConScore, A.Existencia, A.Utilizar, A.TM2, A.ExcedentePT
				, CASE WHEN ISNULL(C.[Clave Articulo], '') != '' THEN C.Existencia ELSE 0 END AS ExcedeLamina, (A.Hojas*Piezas) - CantidadTras AS ValAnt
			FROM tmp2 A
			LEFT JOIN tmp4 B ON A.Op = B.Op
			LEFT JOIN tmp5 C ON A.ClaveArticulo = C.[Clave Articulo]
			ORDER BY A.Op;
		END
	END
	ELSE IF @Opcion = 2
	BEGIN
		DECLARE @Res AS TABLE (Mensaje VARCHAR(MAX), ID INT, Articulo VARCHAR(100), Motivo VARCHAR(500), OP VARCHAR(10));
		DECLARE @Autorizado BIT

		IF NOT EXISTS (SELECT 1 FROM CplDat004 WHERE [Orden Produccion] = @pOP)
		BEGIN
			IF ISNULL(@pZonaERP, '') = '02' 
			BEGIN
				INSERT INTO @Res (Mensaje, ID, Articulo, Motivo, OP)
				EXEC Cajas02.dbo.CmoSP507 @Opcion = 3, @OP = @pOP;

				IF NOT EXISTS(SELECT 1 FROM @Res)
				BEGIN
					IF NOT EXISTS (SELECT 1 FROM Cajas02..CmoDat088 WHERE OP = @pOP)
					BEGIN
						-- MANDA A LLAMAR BuscaOps(0)
						--INSERT INTO @ResultadoInsert (Id, Message)
						--EXEC dbo.FCAPROG016MWSPC1 @Opcion = 3, @pZonaERP = @pZonaERP, @pOP = @pOP, @pCantidadTras = 0;

						SELECT @Mensaje = dbo.FCAPROGFUN005(@pZonaERP, @pOP, 0)

						-- Aqui Validar el usuario y resistencia que esta usando CplDat014 y CplDat007.
						-- CplDat007
						IF ISNULL(@Mensaje, '') = 'TABLA' OR ISNULL(@Mensaje, '') = 'CPLVIS001' OR ISNULL(@Mensaje, '') = 'CPLVIS002'
						BEGIN
							SELECT TOP 1 @GrupoActivo = ISNULL(B.Grupo, -1), @ResistenciaAct = ISNULL(A.[Clave Resistencia], '')
							FROM CplDat014 A
							INNER JOIN CplDat007 B ON B.Clave = A.[Clave Resistencia]
							WHERE Usuario = ISNULL(@pUsuarioERP, Usuario);

							SELECT @Excedente = dbo.FCAPROGFUN009(@pZonaERP, @pOP);
						END

						DELETE FROM @ResultadoInsert;
						IF ISNULL(@Mensaje, '') = 'TABLA'
						BEGIN
							SELECT @Mensaje = dbo.FCAPROGFUN006(@pZonaERP, @pOP);
							IF ISNULL(@Mensaje, '') = 'OK'
							BEGIN
								IF ISNULL(@pZonaERP, '') = '01'
								BEGIN
									SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
										, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
										, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
										, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
									FROM Cajas01..CmoDat011 A
									JOIN Cajas01..CmoDat010 D ON A.Folio_OP = D.OP
									JOIN Cajas01..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
									JOIN Cajas01..CmoCat013 C ON B.SubCodigo = C.SubCodigo
									JOIN Cajas01..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
									WHERE A.OP = @pOP
								END
								ELSE IF ISNULL(@pZonaERP, '') = '02'
								BEGIN
									SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
										, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
										, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
										, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
									FROM Cajas02..CmoDat011 A
									JOIN Cajas02..CmoDat010 D ON A.Folio_OP = D.OP
									JOIN Cajas02..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
									JOIN Cajas02..CmoCat013 C ON B.SubCodigo = C.SubCodigo
									JOIN Cajas02..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
									WHERE A.OP = @pOP
								END
								ELSE IF ISNULL(@pZonaERP, '') = '05'
								BEGIN
									SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
										, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
										, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
										, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
									FROM Cajas05..CmoDat011 A
									JOIN Cajas05..CmoDat010 D ON A.Folio_OP = D.OP
									JOIN Cajas05..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
									JOIN Cajas05..CmoCat013 C ON B.SubCodigo = C.SubCodigo
									JOIN Cajas05..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
									WHERE A.OP = @pOP
								END

								-- REGISTRAR
								INSERT INTO @ResultadoInsert (ID, Message)
								EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
									, @pCantidadTras = @CantidadTras
									, @pGrupoActivo = @GrupoActivo
									, @pResistencia = @Resistencia
									, @pExcedente = @Excedente
									, @pFaltan = @Faltan
									, @pOrdenProduccion = @OrdenProduccion
									, @pClaveArticulo = @ClaveArticulo
									, @pFechaEntrega = @FechaEntrega
									, @pNombre = @Nombre
									, @pArticulo = @Articulo
									, @pAncho = @Ancho
									, @pLargo = @Largo
									, @pPiezas = @Piezas
									, @pCantidad = @Cantidad
									, @pHojas = @Hojas
									, @pIndustria = @Industria
									, @pParcial = @Parcial
									, @pFlauta = @Flauta
									, @pTkg = @Tkg
									, @pTM2 = @TM2
									, @pResistenciaActiva = @ResistenciaAct;
							END ELSE
							BEGIN
								INSERT INTO @ResultadoInsert (Id, Message)
								VALUES (0, @Mensaje);
							END
						END 
						ELSE IF ISNULL(@Mensaje, '') = 'CPLVIS001'
						BEGIN
							SELECT @OrdenProduccion = OP, @ClaveArticulo = [Clave Articulo], @FechaEntrega = [Fecha Entrega], @Nombre = NombreCliente
								, @Articulo = NombreArticulo, @Resistencia = Rest, @Ancho = [ancho hoja], @Largo = [largo hoja], @Piezas = PiezasXHoja
								, @Cantidad = Cantidad, @Faltan = Faltan, @Hojas = (Faltan / PiezasXHoja), @Flauta = Flauta
								, @Parcial = CASE WHEN Max4 > 1 THEN 'P' ELSE 'T' END, @Tkg = CAST(Faltan * [Peso Unitario] AS INT)
								, @TM2 = CAST(M2 * Faltan AS INT), @Industria = Industria
							FROM CplVis001
							WHERE OP = RTRIM(UPPER(@pOP));

							-- REGISTRAR
							INSERT INTO @ResultadoInsert (ID, Message)
							EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
								, @pCantidadTras = @CantidadTras
								, @pGrupoActivo = @GrupoActivo
								, @pResistencia = @Resistencia
								, @pExcedente = @Excedente
								, @pFaltan = @Faltan
								, @pOrdenProduccion = @OrdenProduccion
								, @pClaveArticulo = @ClaveArticulo
								, @pFechaEntrega = @FechaEntrega
								, @pNombre = @Nombre
								, @pArticulo = @Articulo
								, @pAncho = @Ancho
								, @pLargo = @Largo
								, @pPiezas = @Piezas
								, @pCantidad = @Cantidad
								, @pHojas = @Hojas
								, @pIndustria = @Industria
								, @pParcial = @Parcial
								, @pFlauta = @Flauta
								, @pTkg = @Tkg
								, @pTM2 = @TM2
								, @pResistenciaActiva = @ResistenciaAct;
						END 
						ELSE IF ISNULL(@Mensaje, '') = 'CPLVIS002'
						BEGIN
							SELECT TOP 1 @Resistencia = RTRIM(Resistencia), @OrdenProduccion = ISNULL([Orden Produccion], '')
								, @Faltan = ISNULL(Faltan, 0), @ClaveArticulo = RTRIM([Clave Articulo]), @FechaEntrega = [Fecha Entrega]
								, @Nombre = RTRIM(Nombre), @Articulo = RTRIM(Articulo), @Ancho = ISNULL(Ancho, 0), @Largo = ISNULL(Largo, 0)
								, @Piezas = ISNULL(Piezas, 0), @Cantidad = ISNULL(Cantidad, 0), @Hojas = ISNULL(Hojas, 0), @Industria = ISNULL(Industria, '')
								, @Parcial = ISNULL(Parcial, ''), @Flauta = ISNULL(Flauta, ''), @Tkg = ISNULL(TKg, 0), @TM2 = ISNULL(TM2, 0)
							FROM CplVis002 
							WHERE [Orden Produccion] = RTRIM(UPPER(@pOP));

							-- REGISTRAR
							INSERT INTO @ResultadoInsert (ID, Message)
							EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
								, @pCantidadTras = @CantidadTras
								, @pGrupoActivo = @GrupoActivo
								, @pResistencia = @Resistencia
								, @pExcedente = @Excedente
								, @pFaltan = @Faltan
								, @pOrdenProduccion = @OrdenProduccion
								, @pClaveArticulo = @ClaveArticulo
								, @pFechaEntrega = @FechaEntrega
								, @pNombre = @Nombre
								, @pArticulo = @Articulo
								, @pAncho = @Ancho
								, @pLargo = @Largo
								, @pPiezas = @Piezas
								, @pCantidad = @Cantidad
								, @pHojas = @Hojas
								, @pIndustria = @Industria
								, @pParcial = @Parcial
								, @pFlauta = @Flauta
								, @pTkg = @Tkg
								, @pTM2 = @TM2
								, @pResistenciaActiva = @ResistenciaAct;
						END
					END ELSE
					BEGIN
						SELECT @CantidadTras = ISNULL(CantidadTras, 0), @Autorizado = ISNULL(Autorizado, 0)
						FROM Cajas02..CmoDat088
						WHERE OP = @pOP;

						IF ISNULL(@CantidadTras, 0) = 0 OR ISNULL(@Autorizado, 0) = 1
						BEGIN
							-- MANDA A LLAMAR BuscaOps(@CantidadTras)
							--INSERT INTO @ResultadoInsert (Id, Message)
							--EXEC dbo.FCAPROG016MWSPC1 @Opcion = 3, @pZonaERP = @pZonaERP, @pOP = @pOP, @pCantidadTras = @CantidadTras;

							SELECT @Mensaje = dbo.FCAPROGFUN005(@pZonaERP, @pOP, @CantidadTras)

							IF ISNULL(@Mensaje, '') = 'TABLA' OR ISNULL(@Mensaje, '') = 'CPLVIS001' OR ISNULL(@Mensaje, '') = 'CPLVIS002'
							BEGIN

								SELECT TOP 1 @GrupoActivo = ISNULL(B.Grupo, -1), @ResistenciaAct = ISNULL(A.[Clave Resistencia], '')
								FROM CplDat014 A
								INNER JOIN CplDat007 B ON B.Clave = A.[Clave Resistencia]
								WHERE Usuario = ISNULL(@pUsuarioERP, Usuario);

								SELECT @Excedente = dbo.FCAPROGFUN009(@pZonaERP, @pOP);
							END

							DELETE FROM @ResultadoInsert;
							IF ISNULL(@Mensaje, '') = 'TABLA'
							BEGIN
								SELECT @Mensaje = dbo.FCAPROGFUN006(@pZonaERP, @pOP);
								IF ISNULL(@Mensaje, '') = 'OK'
								BEGIN
									IF ISNULL(@pZonaERP, '') = '01'
									BEGIN
										SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
											, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
											, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
											, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
										FROM Cajas01..CmoDat011 A
										JOIN Cajas01..CmoDat010 D ON A.Folio_OP = D.OP
										JOIN Cajas01..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
										JOIN Cajas01..CmoCat013 C ON B.SubCodigo = C.SubCodigo
										JOIN Cajas01..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
										WHERE A.OP = @pOP
									END
									ELSE IF ISNULL(@pZonaERP, '') = '02'
									BEGIN
										SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
											, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
											, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
											, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
										FROM Cajas02..CmoDat011 A
										JOIN Cajas02..CmoDat010 D ON A.Folio_OP = D.OP
										JOIN Cajas02..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
										JOIN Cajas02..CmoCat013 C ON B.SubCodigo = C.SubCodigo
										JOIN Cajas02..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
										WHERE A.OP = @pOP
									END
									ELSE IF ISNULL(@pZonaERP, '') = '05'
									BEGIN
										SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
											, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
											, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
											, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
										FROM Cajas05..CmoDat011 A
										JOIN Cajas05..CmoDat010 D ON A.Folio_OP = D.OP
										JOIN Cajas05..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
										JOIN Cajas05..CmoCat013 C ON B.SubCodigo = C.SubCodigo
										JOIN Cajas05..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
										WHERE A.OP = @pOP
									END

									-- REGISTRAR
									INSERT INTO @ResultadoInsert (ID, Message)
									EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
										, @pCantidadTras = @CantidadTras
										, @pGrupoActivo = @GrupoActivo
										, @pResistencia = @Resistencia
										, @pExcedente = @Excedente
										, @pFaltan = @Faltan
										, @pOrdenProduccion = @OrdenProduccion
										, @pClaveArticulo = @ClaveArticulo
										, @pFechaEntrega = @FechaEntrega
										, @pNombre = @Nombre
										, @pArticulo = @Articulo
										, @pAncho = @Ancho
										, @pLargo = @Largo
										, @pPiezas = @Piezas
										, @pCantidad = @Cantidad
										, @pHojas = @Hojas
										, @pIndustria = @Industria
										, @pParcial = @Parcial
										, @pFlauta = @Flauta
										, @pTkg = @Tkg
										, @pTM2 = @TM2
										, @pResistenciaActiva = @ResistenciaAct;
								END ELSE
								BEGIN
									INSERT INTO @ResultadoInsert (Id, Message)
									VALUES (0, @Mensaje);
								END
							END 
							ELSE IF ISNULL(@Mensaje, '') = 'CPLVIS001'
							BEGIN
								SELECT @OrdenProduccion = OP, @ClaveArticulo = [Clave Articulo], @FechaEntrega = [Fecha Entrega], @Nombre = NombreCliente
									, @Articulo = NombreArticulo, @Resistencia = Rest, @Ancho = [ancho hoja], @Largo = [largo hoja], @Piezas = PiezasXHoja
									, @Cantidad = Cantidad, @Faltan = Faltan, @Hojas = (Faltan / PiezasXHoja), @Flauta = Flauta
									, @Parcial = CASE WHEN Max4 > 1 THEN 'P' ELSE 'T' END, @Tkg = CAST(Faltan * [Peso Unitario] AS INT)
									, @TM2 = CAST(M2 * Faltan AS INT), @Industria = Industria
								FROM CplVis001
								WHERE OP = RTRIM(UPPER(@pOP));

								-- REGISTRAR
								INSERT INTO @ResultadoInsert (ID, Message)
								EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
									, @pCantidadTras = @CantidadTras
									, @pGrupoActivo = @GrupoActivo
									, @pResistencia = @Resistencia
									, @pExcedente = @Excedente
									, @pFaltan = @Faltan
									, @pOrdenProduccion = @OrdenProduccion
									, @pClaveArticulo = @ClaveArticulo
									, @pFechaEntrega = @FechaEntrega
									, @pNombre = @Nombre
									, @pArticulo = @Articulo
									, @pAncho = @Ancho
									, @pLargo = @Largo
									, @pPiezas = @Piezas
									, @pCantidad = @Cantidad
									, @pHojas = @Hojas
									, @pIndustria = @Industria
									, @pParcial = @Parcial
									, @pFlauta = @Flauta
									, @pTkg = @Tkg
									, @pTM2 = @TM2
									, @pResistenciaActiva = @ResistenciaAct;
							END 
							ELSE IF ISNULL(@Mensaje, '') = 'CPLVIS002'
							BEGIN
								SELECT TOP 1 @Resistencia = RTRIM(Resistencia), @OrdenProduccion = ISNULL([Orden Produccion], '')
									, @Faltan = ISNULL(Faltan, 0), @ClaveArticulo = RTRIM([Clave Articulo]), @FechaEntrega = [Fecha Entrega]
									, @Nombre = RTRIM(Nombre), @Articulo = RTRIM(Articulo), @Ancho = ISNULL(Ancho, 0), @Largo = ISNULL(Largo, 0)
									, @Piezas = ISNULL(Piezas, 0), @Cantidad = ISNULL(Cantidad, 0), @Hojas = ISNULL(Hojas, 0), @Industria = ISNULL(Industria, '')
									, @Parcial = ISNULL(Parcial, ''), @Flauta = ISNULL(Flauta, ''), @Tkg = ISNULL(TKg, 0), @TM2 = ISNULL(TM2, 0)
								FROM CplVis002 
								WHERE [Orden Produccion] = RTRIM(UPPER(@pOP));

								-- REGISTRAR
								INSERT INTO @ResultadoInsert (ID, Message)
								EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
									, @pCantidadTras = @CantidadTras
									, @pGrupoActivo = @GrupoActivo
									, @pResistencia = @Resistencia
									, @pExcedente = @Excedente
									, @pFaltan = @Faltan
									, @pOrdenProduccion = @OrdenProduccion
									, @pClaveArticulo = @ClaveArticulo
									, @pFechaEntrega = @FechaEntrega
									, @pNombre = @Nombre
									, @pArticulo = @Articulo
									, @pAncho = @Ancho
									, @pLargo = @Largo
									, @pPiezas = @Piezas
									, @pCantidad = @Cantidad
									, @pHojas = @Hojas
									, @pIndustria = @Industria
									, @pParcial = @Parcial
									, @pFlauta = @Flauta
									, @pTkg = @Tkg
									, @pTM2 = @TM2
									, @pResistenciaActiva = @ResistenciaAct;
							END
						END ELSE
						BEGIN
							INSERT INTO @ResultadoInsert (Id, Message)
							SELECT 0, 'OP Marcada para Transferir Excedentes... No autorizado.';
						END
					END
				END ELSE
				BEGIN
					-- PREGUNTAR SI SERÁ PREGUNTA 
					INSERT INTO @ResultadoInsert (Id, Message)
					SELECT 0, 'El artículo de la OP ' + RTRIM(@pOP) + ' está marcado para radiografía por lo que solo debe programarse en el primer turno.';
				END
			END ELSE 
			BEGIN
				-- MANDA A LLAMAR BuscaOps(0)
				--INSERT INTO @ResultadoInsert (Id, Message)
				--EXEC dbo.FCAPROG016MWSPC1 @Opcion = 3, @pZonaERP = @pZonaERP, @pOP = @pOP, @pCantidadTras = 0;

				SELECT @Mensaje = dbo.FCAPROGFUN005(@pZonaERP, @pOP, @CantidadTras)

				IF ISNULL(@Mensaje, '') = 'TABLA' OR ISNULL(@Mensaje, '') = 'CPLVIS001' OR ISNULL(@Mensaje, '') = 'CPLVIS002'
				BEGIN
					SELECT TOP 1 @GrupoActivo = ISNULL(B.Grupo, -1), @ResistenciaAct = ISNULL(A.[Clave Resistencia], '')
					FROM CplDat014 A
					INNER JOIN CplDat007 B ON B.Clave = A.[Clave Resistencia]
					WHERE Usuario = ISNULL(@pUsuarioERP, Usuario);

					SELECT @Excedente = dbo.FCAPROGFUN009(@pZonaERP, @pOP);
				END

				DELETE FROM @ResultadoInsert;
				IF ISNULL(@Mensaje, '') = 'TABLA'
				BEGIN
					SELECT @Mensaje = dbo.FCAPROGFUN006(@pZonaERP, @pOP);
					IF ISNULL(@Mensaje, '') = 'OK'
					BEGIN
						IF ISNULL(@pZonaERP, '') = '01'
						BEGIN
							SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
								, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
								, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
								, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
							FROM Cajas01..CmoDat011 A
							JOIN Cajas01..CmoDat010 D ON A.Folio_OP = D.OP
							JOIN Cajas01..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
							JOIN Cajas01..CmoCat013 C ON B.SubCodigo = C.SubCodigo
							JOIN Cajas01..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
							WHERE A.OP = @pOP
						END
						ELSE IF ISNULL(@pZonaERP, '') = '02'
						BEGIN
							SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
								, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
								, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
								, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
							FROM Cajas02..CmoDat011 A
							JOIN Cajas02..CmoDat010 D ON A.Folio_OP = D.OP
							JOIN Cajas02..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
							JOIN Cajas02..CmoCat013 C ON B.SubCodigo = C.SubCodigo
							JOIN Cajas02..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
							WHERE A.OP = @pOP
						END
						ELSE IF ISNULL(@pZonaERP, '') = '05'
						BEGIN
							SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
								, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
								, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
								, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
							FROM Cajas05..CmoDat011 A
							JOIN Cajas05..CmoDat010 D ON A.Folio_OP = D.OP
							JOIN Cajas05..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
							JOIN Cajas05..CmoCat013 C ON B.SubCodigo = C.SubCodigo
							JOIN Cajas05..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
							WHERE A.OP = @pOP
						END

						-- REGISTRAR
						INSERT INTO @ResultadoInsert (ID, Message)
						EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
							, @pCantidadTras = @CantidadTras
							, @pGrupoActivo = @GrupoActivo
							, @pResistencia = @Resistencia
							, @pExcedente = @Excedente
							, @pFaltan = @Faltan
							, @pOrdenProduccion = @OrdenProduccion
							, @pClaveArticulo = @ClaveArticulo
							, @pFechaEntrega = @FechaEntrega
							, @pNombre = @Nombre
							, @pArticulo = @Articulo
							, @pAncho = @Ancho
							, @pLargo = @Largo
							, @pPiezas = @Piezas
							, @pCantidad = @Cantidad
							, @pHojas = @Hojas
							, @pIndustria = @Industria
							, @pParcial = @Parcial
							, @pFlauta = @Flauta
							, @pTkg = @Tkg
							, @pTM2 = @TM2
							, @pResistenciaActiva = @ResistenciaAct;
					END ELSE
					BEGIN
						INSERT INTO @ResultadoInsert (Id, Message)
						VALUES (0, @Mensaje);
					END
				END 
				ELSE IF ISNULL(@Mensaje, '') = 'CPLVIS001'
				BEGIN
					SELECT @OrdenProduccion = OP, @ClaveArticulo = [Clave Articulo], @FechaEntrega = [Fecha Entrega], @Nombre = NombreCliente
						, @Articulo = NombreArticulo, @Resistencia = Rest, @Ancho = [ancho hoja], @Largo = [largo hoja], @Piezas = PiezasXHoja
						, @Cantidad = Cantidad, @Faltan = Faltan, @Hojas = (Faltan / PiezasXHoja), @Flauta = Flauta
						, @Parcial = CASE WHEN Max4 > 1 THEN 'P' ELSE 'T' END, @Tkg = CAST(Faltan * [Peso Unitario] AS INT)
						, @TM2 = CAST(M2 * Faltan AS INT), @Industria = Industria
					FROM CplVis001
					WHERE OP = RTRIM(UPPER(@pOP));

					-- REGISTRAR
					INSERT INTO @ResultadoInsert (ID, Message)
					EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
						, @pCantidadTras = @CantidadTras
						, @pGrupoActivo = @GrupoActivo
						, @pResistencia = @Resistencia
						, @pExcedente = @Excedente
						, @pFaltan = @Faltan
						, @pOrdenProduccion = @OrdenProduccion
						, @pClaveArticulo = @ClaveArticulo
						, @pFechaEntrega = @FechaEntrega
						, @pNombre = @Nombre
						, @pArticulo = @Articulo
						, @pAncho = @Ancho
						, @pLargo = @Largo
						, @pPiezas = @Piezas
						, @pCantidad = @Cantidad
						, @pHojas = @Hojas
						, @pIndustria = @Industria
						, @pParcial = @Parcial
						, @pFlauta = @Flauta
						, @pTkg = @Tkg
						, @pTM2 = @TM2
						, @pResistenciaActiva = @ResistenciaAct;
				END 
				ELSE IF ISNULL(@Mensaje, '') = 'CPLVIS002'
				BEGIN
					SELECT TOP 1 @Resistencia = RTRIM(Resistencia), @OrdenProduccion = ISNULL([Orden Produccion], '')
						, @Faltan = ISNULL(Faltan, 0), @ClaveArticulo = RTRIM([Clave Articulo]), @FechaEntrega = [Fecha Entrega]
						, @Nombre = RTRIM(Nombre), @Articulo = RTRIM(Articulo), @Ancho = ISNULL(Ancho, 0), @Largo = ISNULL(Largo, 0)
						, @Piezas = ISNULL(Piezas, 0), @Cantidad = ISNULL(Cantidad, 0), @Hojas = ISNULL(Hojas, 0), @Industria = ISNULL(Industria, '')
						, @Parcial = ISNULL(Parcial, ''), @Flauta = ISNULL(Flauta, ''), @Tkg = ISNULL(TKg, 0), @TM2 = ISNULL(TM2, 0)
					FROM CplVis002 
					WHERE [Orden Produccion] = RTRIM(UPPER(@pOP));

					-- REGISTRAR
					INSERT INTO @ResultadoInsert (ID, Message)
					EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
						, @pCantidadTras = @CantidadTras
						, @pGrupoActivo = @GrupoActivo
						, @pResistencia = @Resistencia
						, @pExcedente = @Excedente
						, @pFaltan = @Faltan
						, @pOrdenProduccion = @OrdenProduccion
						, @pClaveArticulo = @ClaveArticulo
						, @pFechaEntrega = @FechaEntrega
						, @pNombre = @Nombre
						, @pArticulo = @Articulo
						, @pAncho = @Ancho
						, @pLargo = @Largo
						, @pPiezas = @Piezas
						, @pCantidad = @Cantidad
						, @pHojas = @Hojas
						, @pIndustria = @Industria
						, @pParcial = @Parcial
						, @pFlauta = @Flauta
						, @pTkg = @Tkg
						, @pTM2 = @TM2
						, @pResistenciaActiva = @ResistenciaAct;
				END
			END
		END ELSE 
		BEGIN
			INSERT INTO @ResultadoInsert (Id, Message)
			SELECT 0, 'Esta OP ya se Encuentra Registrada en el Sistema.';
		END

		IF NOT EXISTS(SELECT 1 FROM @ResultadoInsert)
		BEGIN
			INSERT INTO @ResultadoInsert(Id, Message)
			VALUES(0, 'Ocurrió un error al intentar registrar la OP');
		END

		SELECT Id, Message
		FROM @ResultadoInsert;
	END
	--ELSE IF @Opcion = 3
	--BEGIN
	--	-- BUSCA RESISTENCIA A PROGRAMAR
	--	IF EXISTS(SELECT 1 FROM CplDat014 A JOIN CplDat007 B ON B.Clave = A.[Clave Resistencia])
	--	BEGIN
	--		SELECT TOP 1 @GrupoActivo = ISNULL(B.Grupo, -1), @Resistencia = ISNULL(A.[Clave Resistencia], '')
	--		FROM CplDat014 A
	--		INNER JOIN CplDat007 B ON B.Clave = A.[Clave Resistencia];

	--		IF EXISTS(SELECT 1 FROM CplDat006)
	--		BEGIN
	--			SELECT @Excedente = dbo.FCAPROGFUN009(@pZonaERP, @pOP);

	--			IF NOT EXISTS (SELECT 1 FROM CplVis002 WHERE [Orden Produccion] = RTRIM(UPPER(@pOP)))
	--			BEGIN
	--				IF NOT EXISTS(SELECT 1 FROM CplVis001 WHERE OP = RTRIM(UPPER(@pOP)))
	--				BEGIN
	--					--INSERT INTO @ResultadoInsert (Id, Message)
	--					--EXEC dbo.FCAPROG016MWSPC1 @Opcion = 4, @pZonaERP = @pZonaERP, @pOP = @pOP;
	--					SELECT @Mensaje = dbo.FCAPROGFUN006(@pZonaERP, @pOP);
	--					IF ISNULL(@Mensaje, '') = 'OK'
	--					BEGIN
	--						IF ISNULL(@pZonaERP, '') = '01'
	--						BEGIN
	--							SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
	--								, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
	--								, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
	--								, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
	--							FROM Cajas01..CmoDat011 A
	--							JOIN Cajas01..CmoDat010 D ON A.Folio_OP = D.OP
	--							JOIN Cajas01..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
	--							JOIN Cajas01..CmoCat013 C ON B.SubCodigo = C.SubCodigo
	--							JOIN Cajas01..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
	--							WHERE A.OP = @pOP
	--						END
	--						ELSE IF ISNULL(@pZonaERP, '') = '02'
	--						BEGIN
	--							SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
	--								, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
	--								, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
	--								, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
	--							FROM Cajas02..CmoDat011 A
	--							JOIN Cajas02..CmoDat010 D ON A.Folio_OP = D.OP
	--							JOIN Cajas02..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
	--							JOIN Cajas02..CmoCat013 C ON B.SubCodigo = C.SubCodigo
	--							JOIN Cajas02..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
	--							WHERE A.OP = @pOP
	--						END
	--						ELSE IF ISNULL(@pZonaERP, '') = '05'
	--						BEGIN
	--							SELECT @OrdenProduccion = A.OP, @ClaveArticulo = A.[Clave Articulo], @FechaEntrega = D.[Fecha Entrega], @Nombre = E.Nombre
	--								, @Articulo = B.Descripcion, @Resistencia = A.Resistencia
	--								, @Ancho = B.[ancho hoja], @Largo = B.[largo hoja], @Piezas = B.PiezasXHoja, @Cantidad = A.Cantidad, @Faltan = 0, @Hojas = 0
	--								, @Parcial = 'T', @Flauta = B.Flauta, @TKg = 0, @TM2 = 0, @Industria = C.Industria
	--							FROM Cajas05..CmoDat011 A
	--							JOIN Cajas05..CmoDat010 D ON A.Folio_OP = D.OP
	--							JOIN Cajas05..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
	--							JOIN Cajas05..CmoCat013 C ON B.SubCodigo = C.SubCodigo
	--							JOIN Cajas05..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
	--							WHERE A.OP = @pOP
	--						END

	--						-- REGISTRAR
	--						DELETE FROM @ResultadoInsert;
	--						INSERT INTO @ResultadoInsert (ID, Message)
	--						EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
	--							, @pCantidadTras = @CantidadTras
	--							, @pGrupoActivo = @GrupoActivo
	--							, @pResistencia = @Resistencia
	--							, @pExcedente = @Excedente
	--							, @pFaltan = @Faltan
	--							, @pOrdenProduccion = @OrdenProduccion
	--							, @pClaveArticulo = @ClaveArticulo
	--							, @pFechaEntrega = @FechaEntrega
	--							, @pNombre = @Nombre
	--							, @pArticulo = @Articulo
	--							, @pAncho = @Ancho
	--							, @pLargo = @Largo
	--							, @pPiezas = @Piezas
	--							, @pCantidad = @Cantidad
	--							, @pHojas = @Hojas
	--							, @pIndustria = @Industria
	--							, @pParcial = @Parcial
	--							, @pFlauta = @Flauta
	--							, @pTkg = @Tkg
	--							, @pTM2 = @TM2;
	--					END ELSE
	--					BEGIN
	--						INSERT INTO @ResultadoInsert (Id, Message)
	--						VALUES (0, @Mensaje);
	--					END
	--				END ELSE
	--				BEGIN
	--					SELECT @OrdenProduccion = OP, @ClaveArticulo = [Clave Articulo], @FechaEntrega = [Fecha Entrega], @Nombre = NombreCliente
	--						, @Articulo = NombreArticulo, @Resistencia = Rest, @Ancho = [ancho hoja], @Largo = [largo hoja], @Piezas = PiezasXHoja
	--						, @Cantidad = Cantidad, @Faltan = Faltan, @Hojas = (Faltan / PiezasXHoja), @Flauta = Flauta
	--						, @Parcial = CASE WHEN Max4 > 1 THEN 'P' ELSE 'T' END, @Tkg = CAST(Faltan * [Peso Unitario] AS INT)
	--						, @TM2 = CAST(M2 * Faltan AS INT), @Industria = Industria
	--					FROM CplVis001
	--					WHERE OP = RTRIM(UPPER(@pOP));

	--					-- REGISTRAR
	--					INSERT INTO @ResultadoInsert (ID, Message)
	--					EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
	--						, @pCantidadTras = @CantidadTras
	--						, @pGrupoActivo = @GrupoActivo
	--						, @pResistencia = @Resistencia
	--						, @pExcedente = @Excedente
	--						, @pFaltan = @Faltan
	--						, @pOrdenProduccion = @OrdenProduccion
	--						, @pClaveArticulo = @ClaveArticulo
	--						, @pFechaEntrega = @FechaEntrega
	--						, @pNombre = @Nombre
	--						, @pArticulo = @Articulo
	--						, @pAncho = @Ancho
	--						, @pLargo = @Largo
	--						, @pPiezas = @Piezas
	--						, @pCantidad = @Cantidad
	--						, @pHojas = @Hojas
	--						, @pIndustria = @Industria
	--						, @pParcial = @Parcial
	--						, @pFlauta = @Flauta
	--						, @pTkg = @Tkg
	--						, @pTM2 = @TM2;
	--				END
	--			END ELSE
	--			BEGIN
	--				SELECT TOP 1 @Resistencia = RTRIM(Resistencia), @OrdenProduccion = ISNULL([Orden Produccion], '')
	--					, @Faltan = ISNULL(Faltan, 0), @ClaveArticulo = RTRIM([Clave Articulo]), @FechaEntrega = [Fecha Entrega]
	--					, @Nombre = RTRIM(Nombre), @Articulo = RTRIM(Articulo), @Ancho = ISNULL(Ancho, 0), @Largo = ISNULL(Largo, 0)
	--					, @Piezas = ISNULL(Piezas, 0), @Cantidad = ISNULL(Cantidad, 0), @Hojas = ISNULL(Hojas, 0), @Industria = ISNULL(Industria, '')
	--					, @Parcial = ISNULL(Parcial, ''), @Flauta = ISNULL(Flauta, ''), @Tkg = ISNULL(TKg, 0), @TM2 = ISNULL(TM2, 0)
	--				FROM CplVis002 
	--				WHERE [Orden Produccion] = RTRIM(UPPER(@pOP));

	--				-- REGISTRAR
	--				INSERT INTO @ResultadoInsert (ID, Message)
	--				EXEC dbo.FCAPROG016MWSPA2 @Opcion = 1
	--					, @pCantidadTras = @CantidadTras
	--					, @pGrupoActivo = @GrupoActivo
	--					, @pResistencia = @Resistencia
	--					, @pExcedente = @Excedente
	--					, @pFaltan = @Faltan
	--					, @pOrdenProduccion = @OrdenProduccion
	--					, @pClaveArticulo = @ClaveArticulo
	--					, @pFechaEntrega = @FechaEntrega
	--					, @pNombre = @Nombre
	--					, @pArticulo = @Articulo
	--					, @pAncho = @Ancho
	--					, @pLargo = @Largo
	--					, @pPiezas = @Piezas
	--					, @pCantidad = @Cantidad
	--					, @pHojas = @Hojas
	--					, @pIndustria = @Industria
	--					, @pParcial = @Parcial
	--					, @pFlauta = @Flauta
	--					, @pTkg = @Tkg
	--					, @pTM2 = @TM2;
	--			END

	--			IF NOT EXISTS(SELECT 1 FROM @ResultadoInsert)
	--			BEGIN
	--				INSERT INTO @ResultadoInsert (Id, Message)
	--				SELECT 0, 'Ocurrió un problema al insertar la OP: ' + @pOP;
	--			END
	--		END ELSE 
	--		BEGIN
	--			INSERT INTO @ResultadoInsert (Id, Message)
	--			SELECT 0, 'No se Encontraron Párametros de Programación';
	--		END
	--	END ELSE
	--	BEGIN
	--		INSERT INTO @ResultadoInsert (Id, Message)
	--		SELECT 0, 'Defina Resistencia a Programar';
	--	END

	--	SELECT Id, Message
	--	FROM @ResultadoInsert
	--END
	ELSE IF @Opcion = 4
	BEGIN
		IF ISNULL(@pZonaERP, '') = '01' 
		BEGIN
			SELECT B.Op, A.Programa, CONVERT(VARCHAR, B.[Fecha Produccion], 23) AS FechaProduccion, SUM(B.Laminas * C.[Piezas Corte]) AS Producidas
			FROM Cajas01..CmoDat016 A
			INNER JOIN Cajas01..CmoDat017 B ON B.Programa = A.Programa
			INNER JOIN Cajas01..CmoDat013 C ON C.Programa = B.Programa
			INNER JOIN ( SELECT OP FROM @pDatosPrincipal WHERE Prior = 1 ) D ON B.Op = D.OP
			WHERE B.[Fecha Produccion] >= CONVERT(VARCHAR, DATEADD(DAY, -30, GETDATE()), 112)
			GROUP BY B.Op, A.Programa, A.Turno, B.[Fecha Produccion]
		END
		ELSE IF ISNULL(@pZonaERP, '') = '02' 
		BEGIN
			SELECT B.Op, A.Programa, CONVERT(VARCHAR, B.[Fecha Produccion], 23) AS FechaProduccion, SUM(B.Laminas * C.[Piezas Corte]) AS Producidas
			FROM Cajas02..CmoDat016 A
			INNER JOIN Cajas02..CmoDat017 B ON B.Programa = A.Programa
			INNER JOIN Cajas02..CmoDat013 C ON C.Programa = B.Programa
			INNER JOIN ( SELECT OP FROM @pDatosPrincipal WHERE Prior = 1 ) D ON B.Op = D.OP
			WHERE B.[Fecha Produccion] >= CONVERT(VARCHAR, DATEADD(DAY, -30, GETDATE()), 112)
			GROUP BY B.Op, A.Programa, A.Turno, B.[Fecha Produccion]
		END
		ELSE IF ISNULL(@pZonaERP, '') = '05' 
		BEGIN
			SELECT B.Op, A.Programa, CONVERT(VARCHAR, B.[Fecha Produccion], 23) AS FechaProduccion, SUM(B.Laminas * C.[Piezas Corte]) AS Producidas
			FROM Cajas05..CmoDat016 A
			INNER JOIN Cajas05..CmoDat017 B ON B.Programa = A.Programa
			INNER JOIN Cajas05..CmoDat013 C ON C.Programa = B.Programa
			INNER JOIN ( SELECT OP FROM @pDatosPrincipal WHERE Prior = 1 ) D ON B.Op = D.OP
			WHERE B.[Fecha Produccion] >= CONVERT(VARCHAR, DATEADD(DAY, -30, GETDATE()), 112)
			GROUP BY B.Op, A.Programa, A.Turno, B.[Fecha Produccion]
		END
	END
	ELSE IF @Opcion = 5
	BEGIN
		DECLARE @CantMasVar DECIMAL(18,2)
		SELECT TOP 1 @lPiezas = ISNULL(CantAnt, 0) * ISNULL(Piezas, 0), @CantidadSol = ISNULL(CantidadSol, 0), @CantidadTras = ISNULL(CantidadTras, 0)
			, @Variacion = ISNULL(Variacion, 0), @pOP = ISNULL(Op, ''), @Cantidad = ISNULL(Cantidad, 0), @Hojas = ISNULL(Hojas, 0), @Proceso = ISNULL(Proceso, '')
			, @CantAnt = ISNULL(CantAnt, 0), @pHojas = ISNULL(Hojas, 0), @pMas = ISNULL(Mas, 0)
		FROM @pDatosPrincipal;

		;WITH tmp AS (
			SELECT B.Variacion, '01' AS ZonaERP
			FROM Cajas01..CmoDat011 A
			JOIN Cajas01..CmoDat010 AA ON A.Folio_OP = AA.OP
			JOIN Cajas01..CmoDat008 B ON AA.PedidoInt = B.Pedido
			WHERE A.OP = @pOP
			UNION 
			SELECT B.Variacion, '02' AS ZonaERP
			FROM Cajas02..CmoDat011 A
			JOIN Cajas02..CmoDat010 AA ON A.Folio_OP = AA.OP
			JOIN Cajas02..CmoDat008 B ON AA.PedidoInt = B.Pedido
			WHERE A.OP = @pOP
			UNION 
			SELECT B.Variacion, '05' AS ZonaERP
			FROM Cajas05..CmoDat011 A
			JOIN Cajas05..CmoDat010 AA ON A.Folio_OP = AA.OP
			JOIN Cajas05..CmoDat008 B ON AA.PedidoInt = B.Pedido
			WHERE A.OP = @pOP
		)
		SELECT TOP 1 @Variacion = Variacion 
		FROM tmp 
		WHERE ZonaERP = @pZonaERP;

		SELECT @CantMasVar = @Cantidad + (1 + @Variacion)

		IF @Cantidad > @CantMasVar
		BEGIN
			SELECT @Id = 0, @Mensaje = 'La cantidad no puede pasar de la cantidad solicitada + su variación, en caso de que cuente con ella.';
		END ELSE
		BEGIN
			IF ISNULL(@pZonaERP, '') = '02'
			BEGIN
				SELECT @pMas = ISNULL(dbo.FCAPROGFUN008(@lPiezas, @Proceso, @Variacion), 0);

				IF ISNULL(@CantidadSol, 0) > 0
				BEGIN
					IF ISNULL(@CantAnt, 0) >= ISNULL(@pHojas, 0)
					BEGIN
						UPDATE CplDat004 SET Hojas = @pHojas, Mas = @pMas WHERE [Orden Produccion] = @pOP;
						SELECT @Id = 1, @Mensaje = 'OK';
					END	ELSE
					BEGIN
						SELECT @Id = 0, @Mensaje = 'OP Marcada para Transferir Excedentes... Solo se puede producir ' + CASE WHEN ISNULL(@CantAnt, 0) <= 0 THEN 0 ELSE ISNULL(@CantAnt, 0) END;
					END
				END ELSE
				BEGIN
					UPDATE CplDat004 SET Hojas = @pHojas, Mas = @pMas WHERE [Orden Produccion] = @pOP;
					SELECT @Id = 1, @Mensaje = 'OK';
				END
			END ELSE 
			BEGIN
				UPDATE CplDat004 SET Hojas = @pHojas, Mas = @pMas WHERE [Orden Produccion] = @pOP;
				SELECT @Id = 1, @Mensaje = 'OK';
			END
		END

		SELECT @Id AS Id, @Mensaje AS Message;
	END
	ELSE IF @Opcion = 6
	BEGIN
		DECLARE @Articulos AS TABLE (OP VARCHAR(10), ClaveArticulo VARCHAR(9), FechaCorrug VARCHAR(10), FechaMaestra VARCHAR(10))
		IF ISNULL(@pZonaERP, '') = '02'
		BEGIN
			INSERT INTO @Articulos (OP, ClaveArticulo, FechaCorrug, FechaMaestra)
			SELECT E.OP, E.ClaveArticulo, D.Fecha AS FechaCorrug, A.FechaDigital AS FechaMaestra
			FROM Cajas02..CmoTjCat004 A
			JOIN Cajas02..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
			JOIN Cajas02..CmoDat013 C ON B.OP = C.OP
			JOIN Cajas02..CmoDat012 D ON C.Programa = D.Programa
			JOIN @pDatosPrincipal E ON C.OP = E.OP AND E.ClaveArticulo = B.[Clave Articulo]
			WHERE ISNULL(FechaDigital, '') != '' AND ISNULL(D.Fecha, '') != ''
				AND E.Utilizar = 1
				AND DATEDIFF(DAY, A.FechaDigital, D.Fecha) <= 10
			ORDER BY D.Fecha DESC
		END

		UPDATE CplDat004 SET
			Prior = B.Prior,
			Utilizar = B.Utilizar,
			Refile = B.Refile
		FROM CplDat004 A
		JOIN @pDatosPrincipal B ON A.[Orden Produccion] = B.OP

		SELECT OP, ClaveArticulo, FechaCorrug, FechaMaestra
		FROM @Articulos
	END
	







	--ELSE IF @Opcion = 4
	--BEGIN
	--	DECLARE @tmp1 AS TABLE (
	--		OP VARCHAR(10), ClaveArticulo VARCHAR(9), FechaEntrega SMALLDATETIME, Nombre VARCHAR(100), Articulo VARCHAR(60), Resistencia VARCHAR(10),
	--		Status VARCHAR(10), Ancho REAL, Largo REAL, Piezas DECIMAL(4, 1), Cantidad INT, Faltan INT, Hojas INT, Parcial VARCHAR(1), Flauta VARCHAR(3), TKg INT, TM2 INT,
	--		Industria VARCHAR(3), NoProducir BIT, ZonaERP VARCHAR(2)
	--	)

	--	DECLARE @tmpId BIT, @tmpMensaje AS VARCHAR(MAX);

	--	;WITH tmp1 AS (
	--		SELECT A.OP, A.[Clave Articulo], D.[Fecha Entrega], E.Nombre, B.Descripcion AS Articulo, A.Resistencia, A.Status
	--			, B.[ancho hoja] AS Ancho, B.[largo hoja] AS Largo, B.PiezasXHoja AS Piezas, A.Cantidad, 0 AS Faltan, 0 AS Hojas
	--			, 'T' AS Parcial, B.Flauta, 0 AS TKg, 0 AS TM2, C.Industria, D.NoProducir, '01' AS ZonaERP
	--		FROM Cajas01..CmoDat011 A
	--		JOIN Cajas01..CmoDat010 D ON A.Folio_OP = D.OP
	--		JOIN Cajas01..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
	--		JOIN Cajas01..CmoCat013 C ON B.SubCodigo = C.SubCodigo
	--		JOIN Cajas01..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
	--		WHERE A.OP = @pOP
	--		UNION
	--		SELECT A.OP, A.[Clave Articulo], D.[Fecha Entrega], E.Nombre, B.Descripcion AS Articulo, A.Resistencia, A.Status
	--			, B.[ancho hoja] AS Ancho, B.[largo hoja] AS Largo, B.PiezasXHoja AS Piezas, A.Cantidad, 0 AS Faltan, 0 AS Hojas
	--			, 'T' AS Parcial, B.Flauta, 0 AS TKg, 0 AS TM2, C.Industria, D.NoProducir, '02' AS ZonaERP
	--		FROM Cajas02..CmoDat011 A
	--		JOIN Cajas02..CmoDat010 D ON A.Folio_OP = D.OP
	--		JOIN Cajas02..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
	--		JOIN Cajas02..CmoCat013 C ON B.SubCodigo = C.SubCodigo
	--		JOIN Cajas02..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
	--		WHERE A.OP = @pOP
	--		UNION
	--		SELECT A.OP, A.[Clave Articulo], D.[Fecha Entrega], E.Nombre, B.Descripcion AS Articulo, A.Resistencia, A.Status
	--			, B.[ancho hoja] AS Ancho, B.[largo hoja] AS Largo, B.PiezasXHoja AS Piezas, A.Cantidad, 0 AS Faltan, 0 AS Hojas
	--			, 'T' AS Parcial, B.Flauta, 0 AS TKg, 0 AS TM2, C.Industria, D.NoProducir, '05' AS ZonaERP
	--		FROM Cajas05..CmoDat011 A
	--		JOIN Cajas05..CmoDat010 D ON A.Folio_OP = D.OP
	--		JOIN Cajas05..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
	--		JOIN Cajas05..CmoCat013 C ON B.SubCodigo = C.SubCodigo
	--		JOIN Cajas05..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
	--		WHERE A.OP = @pOP
	--	)
	--	INSERT INTO @tmp1 (
	--		OP, ClaveArticulo, FechaEntrega, Nombre, Articulo, Resistencia, Status, Ancho, Largo, Piezas, 
	--		Cantidad, Faltan, Hojas, Parcial, Flauta, TKg, TM2, Industria, NoProducir, ZonaERP
	--	)
	--	SELECT OP, [Clave Articulo], [Fecha Entrega], Nombre, Articulo, Resistencia, Status, Ancho, Largo, Piezas,
	--		Cantidad, Faltan, Hojas, Parcial, Flauta, TKg, TM2, Industria, NoProducir, ZonaERP
	--	FROM tmp1
	--	WHERE ZonaERP = @pZonaERP;

	--	DECLARE @Status VARCHAR(10), @NoProducir BIT

	--	IF EXISTS (SELECT 1 FROM @tmp1)
	--	BEGIN
	--		SELECT TOP 1 @Status = Status, @NoProducir = NoProducir, @ClaveArticulo = ClaveArticulo
	--		FROM @tmp1;

	--		IF RTRIM(@Status) = 'GEN' BEGIN SELECT @tmpId = 0, @tmpMensaje = 'OP no Autorizada'; END
	--		ELSE IF RTRIM(@Status) = 'CAN' BEGIN SELECT @tmpId = 0, @tmpMensaje = 'OP no Cancelada'; END
	--		ELSE IF RTRIM(@Status) = 'SUS' BEGIN SELECT @tmpId = 0, @tmpMensaje = 'OP no Suspendida'; END 
	--		ELSE 
	--		BEGIN
	--			IF @NoProducir = 1 
	--			BEGIN
	--				SELECT @tmpId = 0, @tmpMensaje = 'OP De NO PRODUCCION...VERIFIQUE';
	--			END ELSE
	--			BEGIN
	--				IF dbo.FCAPROGFUN007(@pOP, @pZonaERP) = 0
	--				BEGIN
	--					SELECT @tmpId = 1, @tmpMensaje = 'OK';
	--				END /*ELSE 
	--				BEGIN
	--					-- PREGUNTAR AL USUARIO
	--					SELECT @tmpId = 0, @tmpMensaje = 'PREGUNTA';
	--				END*/

	--				IF ISNULL(@pZonaERP, '') = '02' AND ISNULL(@ClaveArticulo, '') != ''
	--				BEGIN
	--					IF EXISTS (SELECT 1 FROM Cajas02..CmoDat257 WHERE ClaveArticulo = RTRIM(@ClaveArticulo) AND LlevaEtiqueta = 1)
	--					BEGIN
	--						IF EXISTS (
	--							SELECT 1 FROM Cajas02..CmoDat187 A 
	--							JOIN Cajas02..CmoCat079 B ON A.Cod = B.Codigo
	--							WHERE A.Estatus = 0 AND B.Estatus = 0 AND A.ClaveArticulo = @ClaveArticulo AND A.Cod = 1
	--						)
	--						BEGIN
	--							SELECT @tmpId = 1, @tmpMensaje = 'OK';
	--						END ELSE 
	--						BEGIN
	--							SELECT @tmpId = 0, @tmpMensaje = 'Favor de capturar el código de la etiqueta en el módulo de captura de combinación estándar de papel (CmoCap076)';
	--						END
	--					END
	--				END
	--			END
	--		END
	--	END ELSE 
	--	BEGIN
	--		SELECT @tmpId = 0, @tmpMensaje = 'No se encontró OP en Proceso...';
	--	END

	--	SELECT @tmpId AS Id, @tmpMensaje AS Message;
	--END
END



GO


