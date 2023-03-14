USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG013MWSPC1]    Script Date: 19/10/2022 03:57:41 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG013MWSPC1]
	@Opcion INT						= NULL, 
	@Clave VARCHAR(15)				= NULL,
	@ClavePapelR VARCHAR(24)		= NULL,
	@AnchoPapelR DECIMAL(6, 3)		= NULL,
	@ZonaERP VARCHAR(2)				= NULL
AS BEGIN
	DECLARE @TotalRegistros INT = NULL
		, @Orden INT
		, @ClaveResistenciaCplDat014 VARCHAR(15)
		, @ClaveResistenciaCplDat002 VARCHAR(15)
		, @ClaveProceso VARCHAR(10);

	IF @Opcion = 1 
	BEGIN
		SELECT FORMAT(Orden, '0', 'EN-US') AS Orden, RTRIM(Clave) AS Clave, Usar, FORMAT(Ancho, '0.00', 'EN-US') AS Ancho, FORMAT(Metros, '0.00', 'EN-US') AS Metros
			, FORMAT([Costo M2], '0.00', 'EN-US') AS CostoM2, FORMAT([Peso M2], '0.00', 'EN-US') AS PesoM2, FORMAT([Mullen Maximo], '0.00', 'EN-US') AS MullenMax
			, RTRIM(Liner1) AS Liner1, RTRIM(Empalme1) AS EmpalmeL1, RTRIM(Corrugado1) AS Corrg1, RTRIM(EmpalmeC1) AS EmpalmeC1
			, RTRIM(Liner2) AS Liner2, RTRIM(Empalme2) AS EmpalmeL2, RTRIM(Corrugado2) AS Corrg2, RTRIM(EmpalmeC2) AS EmpalmeC2
			, RTRIM(Liner3) AS Liner3, RTRIM(Empalme3) AS EmpalmeL3, RTRIM(Corrugado3) AS Corrg3, RTRIM(EmpalmeC3) AS EmpalmeC3
			, RTRIM(Liner4) AS Liner4, RTRIM(Empalme4) AS EmpalmeL4
			, FORMAT(AnchoL1, '0.00', 'EN-US') AS AnchoL1, FORMAT(AnchoEmpalme1, '0.00', 'EN-US') AS AnchoEmpalme1, FORMAT(AnchoL2, '0.00', 'EN-US') AS AnchoL2, FORMAT(AnchoEmpalme2, '0.00', 'EN-US') AS AnchoEmpalme2
			, FORMAT(AnchoL3, '0.00', 'EN-US') AS AnchoL3, FORMAT(AnchoEmpalme3, '0.00', 'EN-US') AS AnchoEmpalme3, FORMAT(AnchoL4, '0.00', 'EN-US') AS AnchoL4, FORMAT(AnchoEmpalme4, '0.00', 'EN-US') AS AnchoEmpalme4
			, FORMAT(AnchoC1, '0.00', 'EN-US') AS AnchoC1, FORMAT(AnchoEmpalmeC1, '0.00', 'EN-US') AS AnchoEmpalmeC1
			, FORMAT(AnchoC2, '0.00', 'EN-US') AS AnchoC2, FORMAT(AnchoEmpalmeC2, '0.00', 'EN-US') AS AnchoEmpalmeC2
			, FORMAT(AnchoC3, '0.00', 'EN-US') AS AnchoC3, FORMAT(AnchoEmpalmeC3, '0.00', 'EN-US') AS AnchoEmpalmeC3
		FROM CplDat002
		WHERE Clave = ISNULL(@Clave, Clave)
		ORDER BY Orden, Ancho DESC
	END
	ELSE IF @Opcion = 2 
	BEGIN
		SELECT TOP 1 @ClaveResistenciaCplDat014 = RTRIM([Clave Resistencia]), @ClaveProceso = RTRIM(ClaveProceso)
		FROM CplDat014

		SELECT TOP 1 @Orden = Orden, @ClaveResistenciaCplDat002 = RTRIM(SUBSTRING(Clave, 1, LEN(Clave) - LEN(Orden) - 1))
		FROM CplDat002
		ORDER BY Orden DESC

		IF ISNULL(@ClaveResistenciaCplDat002, '') != ''
		BEGIN
			SELECT @Clave = @ClaveResistenciaCplDat002 + '-' + CONVERT(VARCHAR, (@Orden + 1));
		END
		ELSE 
		BEGIN
			IF ISNULL(@ClaveResistenciaCplDat014, '') = ''
			BEGIN
				SELECT @Clave = 'SR-1';
			END
			ELSE
			BEGIN
				SELECT @Clave = @ClaveResistenciaCplDat014 + '-1';
			END
		END

		SELECT @Clave AS ClaveResistencia, @ClaveProceso AS ClaveProceso;
	END
	ELSE IF @Opcion = 3
	BEGIN
		DECLARE @Msj VARCHAR(MAX) = '', @Estatus BIT = 0, @ClavePapel VARCHAR(24) = '';

		SELECT @ClavePapelR = UPPER(RTRIM(@ClavePapelR));

		SELECT @ClavePapel = UPPER(RTRIM([Clave Papel]))
		FROM CplDat001
		WHERE [Clave Papel] = @ClavePapelR


		IF ISNULL(@ClavePapel, '') != ''
		BEGIN
			IF EXISTS(SELECT 1 FROM Cajas01..CmoCat009 WHERE [Clave papel] = @ClavePapelR AND status = 0)
			BEGIN
				SELECT @ClavePapel = @ClavePapelR
					, @Msj = ''
					, @Estatus = 1;
			END
			ELSE
			BEGIN
				SELECT @Msj = 'Clave de Papel "' + @ClavePapelR + '" no existe o fue dada de baja en el Catálogo de Cajas'
					, @Estatus = 0
					, @ClavePapel = '';
			END
		END
		ELSE 
		BEGIN
			IF NOT EXISTS(SELECT 1 FROM Admin04..AlmNvCat005 WHERE RTRIM(CL)+RTRIM(SCL) = @ClavePapelR)
			BEGIN
				SELECT @ClavePapel = ''
					, @Msj = 'Clave de Papel "' + @ClavePapelR + '" no existe en Invetario de Rollos'
					, @Estatus = 0;
			END
			ELSE 
			BEGIN
				IF EXISTS(SELECT 1 FROM Cajas01..CmoCat009 WHERE [Clave papel] = @ClavePapelR AND status = 0)
				BEGIN
					SELECT @ClavePapel = @ClavePapelR
						, @Msj = ''
						, @Estatus = 1;
				END
				ELSE
				BEGIN
					SELECT @Msj = 'Clave de Papel "' + @ClavePapelR + '" no existe o fue dada de baja en el Catálogo de Cajas'
						, @Estatus = 0
						, @ClavePapel = '';
				END
			END
		END

		SELECT @ClavePapel AS ClavePapel, @Msj AS Msj, @Estatus AS Estatus;
	END
	ELSE IF @Opcion = 4
	BEGIN
		SELECT @ClavePapelR = UPPER(RTRIM(@ClavePapelR));

		SELECT CONVERT(DECIMAL(6, 3), SUM(Exi_Uni/1000)) AS Existencia, A.Alma, B.Ancho
		FROM Admin04.dbo.AlmNvSal001 A 
		INNER JOIN Admin04.dbo.AlmNvCat003 b ON a.Articulo = b.Codigo
		WHERE A.Exi_Uni > 0 
			AND (RTRIM(B.CL) + RTRIM(B.SCL)) = ISNULL(@ClavePapelR, '')
			AND B.Ancho = ISNULL(@AnchoPapelR, 0) 
			AND A.alma = 501
		GROUP BY A.Alma, B.Ancho
	END
	ELSE IF @Opcion = 5
	BEGIN
		SELECT @ClavePapelR = UPPER(RTRIM(@ClavePapelR));

		SELECT DISTINCT RTRIM(E.CL) + RTRIM(E.SCL) AS Papel, E.Ancho
			, ISNULL(F.Toneladas * 1000, G.Cantidad) / 1000 AS Cantidad, CONVERT(VARCHAR, F.FechaEstLlegada, 23) AS FechaEstLlegada
		FROM Admin04.dbo.ComMov002 A 
		JOIN Admin04.dbo.AlmNvCat003 E ON E.Codigo = A.ARTICULO
		LEFT JOIN Admin04.dbo.ComDat018 F ON A.ORDEN_C = F.OrdenCompra AND A.Articulo = F.Articulo AND F.Estatus = 0 
		LEFT JOIN Admin04.dbo.AlmNvMov001 G ON A.ORDEN_C = G.Orden_C AND A.Partida1 = G.Partida2 AND ISNULL(F.Factura, G.Factura) = ISNULL(G.Factura, F.Factura)
		WHERE RTRIM(E.CL) + RTRIM(E.SCL) = ISNULL(@ClavePapelR, '') 
			AND ANCHO = ISNULL(@AnchoPapelR, 0)
			AND ISNULL(F.Toneladas * 1000, G.Cantidad) > 0 AND F.FechaEstLlegada IS NOT NULL
			AND F.FechaEstLlegada BETWEEN DATEADD(DD, 0, GETDATE()) AND DATEADD(DD, 2, GETDATE())
	END
	ELSE IF @Opcion = 6
	BEGIN
		SET NOCOUNT ON;
		DECLARE @Ops AS TABLE (OP VARCHAR(10));
		DECLARE @Resultado AS TABLE (
			ClaveArticulo VARCHAR(9), Liner1 VARCHAR(16), Corrugado1 VARCHAR(16), Liner2 VARCHAR(16), Corrugado2 VARCHAR(16), CvePreparacion VARCHAR(10),
			Liner3 VARCHAR(16), Corrugado3 VARCHAR(16), Liner4 VARCHAR(16),
			OP VARCHAR(10), Flauta VARCHAR(3), Papel VARCHAR(10), Impermeabilizado VARCHAR(30)
		);
		DECLARE @Resultado2 AS TABLE (
			ID INT IDENTITY(1, 1), ClaveArticulo VARCHAR(9), Liner1 VARCHAR(16), Corrugado1 VARCHAR(16), Liner2 VARCHAR(16), Corrugado2 VARCHAR(16), CvePreparacion VARCHAR(10),
			Liner3 VARCHAR(16), Corrugado3 VARCHAR(16), Liner4 VARCHAR(16),
			OP VARCHAR(10), Flauta VARCHAR(3), Papel VARCHAR(10), Impermeabilizado VARCHAR(30)
		);
		DECLARE @Resultado2Tmp AS TABLE (
			ID INT, ClaveArticulo VARCHAR(9), Liner1 VARCHAR(16), Corrugado1 VARCHAR(16), Liner2 VARCHAR(16), Corrugado2 VARCHAR(16), CvePreparacion VARCHAR(10),
			Liner3 VARCHAR(16), Corrugado3 VARCHAR(16), Liner4 VARCHAR(16),
			OP VARCHAR(10), Flauta VARCHAR(3), Papel VARCHAR(10), Impermeabilizado VARCHAR(30)
		);

		INSERT INTO @Ops (OP)
		SELECT RTRIM(OP1) FROM CplDat009 WHERE ISNULL(OP1, '') != ''
		UNION
		SELECT RTRIM(OP2) FROM CplDat009 WHERE ISNULL(OP2, '') != ''
		UNION
		SELECT RTRIM(OP3) FROM CplDat009 WHERE ISNULL(OP3, '') != '';

		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			INSERT INTO @Resultado (
				OP, ClaveArticulo, Liner1, Corrugado1, Liner2, Corrugado2, 
				CvePreparacion, Liner3, Corrugado3, Liner4, Flauta, Papel, Impermeabilizado
			)
			SELECT RTRIM(B.OP), RTRIM(A.[Clave Articulo]), RTRIM(A.Liner1), RTRIM(A.Corrugado1), RTRIM(A.Liner2), RTRIM(A.Corrugado2), RTRIM(A.CvePreparacion),
				RTRIM(A.Liner3), RTRIM(A.Corrugado3), RTRIM(A.Liner4), RTRIM(C.Flauta), RTRIM(C.Papel), 
				ISNULL(RTRIM(D.Impermeabilizado) + ' - ' + RTRIM(E.Descripcion), 'SIN COTIZACIÓN')  AS Impermeabilizado
			FROM Cajas01..CMODAT037 A
			JOIN Cajas01..CMODAT011 B ON A.[CLAVE ARTICULO] = B.[CLAVE ARTICULO]
			LEFT JOIN Cajas01..CMOTJCAT004 C ON  A.[CLAVE ARTICULO] = C.[CLAVE ARTICULO]
			LEFT JOIN Costos01..COSDAT003 D ON D.[NUMERO COTIZACION] =  B.NUMEROCOTIZACION AND B.COMPONENTE=D.CLAVECOMPONENTE
			LEFT JOIN Costos01..COSCAT009 E ON D.IMPERMEABILIZADO = E.CLAVETIPO
			WHERE B.OP IN ( SELECT OP FROM @OPS )
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			INSERT INTO @Resultado (
				OP, ClaveArticulo, Liner1, Corrugado1, Liner2, Corrugado2, 
				CvePreparacion, Liner3, Corrugado3, Liner4, Flauta, Papel, Impermeabilizado
			)
			SELECT RTRIM(B.OP), RTRIM(A.[Clave Articulo]), RTRIM(A.Liner1), RTRIM(A.Corrugado1), RTRIM(A.Liner2), RTRIM(A.Corrugado2), RTRIM(A.CvePreparacion),
				RTRIM(A.Liner3), RTRIM(A.Corrugado3), RTRIM(A.Liner4), RTRIM(C.Flauta), RTRIM(C.Papel), 
				ISNULL(RTRIM(D.Impermeabilizado) + ' - ' + RTRIM(E.Descripcion), 'SIN COTIZACIÓN')  AS Impermeabilizado
			FROM Cajas02..CMODAT037 A
			JOIN Cajas02..CMODAT011 B ON A.[CLAVE ARTICULO] = B.[CLAVE ARTICULO]
			LEFT JOIN Cajas02..CMOTJCAT004 C ON  A.[CLAVE ARTICULO] = C.[CLAVE ARTICULO]
			LEFT JOIN Costos02..COSDAT003 D ON D.[NUMERO COTIZACION] =  B.NUMEROCOTIZACION AND B.COMPONENTE=D.CLAVECOMPONENTE
			LEFT JOIN Costos02..COSCAT009 E ON D.IMPERMEABILIZADO = E.CLAVETIPO
			WHERE B.OP IN ( SELECT OP FROM @OPS )
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			INSERT INTO @Resultado (
				OP, ClaveArticulo, Liner1, Corrugado1, Liner2, Corrugado2, 
				CvePreparacion, Liner3, Corrugado3, Liner4, Flauta, Papel, Impermeabilizado
			)
			SELECT RTRIM(B.OP), RTRIM(A.[Clave Articulo]), RTRIM(A.Liner1), RTRIM(A.Corrugado1), RTRIM(A.Liner2), RTRIM(A.Corrugado2), RTRIM(A.CvePreparacion),
				RTRIM(A.Liner3), RTRIM(A.Corrugado3), RTRIM(A.Liner4), RTRIM(C.Flauta), RTRIM(C.Papel), 
				ISNULL(RTRIM(D.Impermeabilizado) + ' - ' + RTRIM(E.Descripcion), 'SIN COTIZACIÓN')  AS Impermeabilizado
			FROM Cajas05..CMODAT037 A
			JOIN Cajas05..CMODAT011 B ON A.[CLAVE ARTICULO] = B.[CLAVE ARTICULO]
			LEFT JOIN Cajas05..CMOTJCAT004 C ON  A.[CLAVE ARTICULO] = C.[CLAVE ARTICULO]
			LEFT JOIN Costos05..COSDAT003 D ON D.[NUMERO COTIZACION] =  B.NUMEROCOTIZACION AND B.COMPONENTE=D.CLAVECOMPONENTE
			LEFT JOIN Costos05..COSCAT009 E ON D.IMPERMEABILIZADO = E.CLAVETIPO
			WHERE B.OP IN ( SELECT OP FROM @OPS )
		END

		INSERT INTO @Resultado2 (
			OP, ClaveArticulo, CvePreparacion, Papel, Impermeabilizado
		)
		SELECT OP, ClaveArticulo, CvePreparacion, Papel, Impermeabilizado
		FROM @Resultado

		INSERT INTO @Resultado2Tmp (ID, OP, ClaveArticulo, CvePreparacion, Papel, Impermeabilizado)
		SELECT ID, OP, ClaveArticulo, CvePreparacion, Papel, Impermeabilizado
		FROM @Resultado2

		DECLARE @ID INT, @OP VARCHAR(10) = '', @NumCotizacion VARCHAR(16)
			, @Liner1 VARCHAR(16), @Medium1 VARCHAR(16), @Liner2 VARCHAR(16), @Medium2 VARCHAR(16)
			, @Liner3 VARCHAR(16), @Medium3 VARCHAR(16), @Liner4 VARCHAR(16)
		DECLARE @tblPapelesCotizacion AS TABLE (
			OP VARCHAR(10), ClaveArticulo VARCHAR(9), Resistencia VARCHAR(10)
			, Liner1 VARCHAR(16), Medium1 VARCHAR(16), Liner2 VARCHAR(16), Medium2 VARCHAR(16)
			, Liner3 VARCHAR(16), Medium3 VARCHAR(16), Liner4 VARCHAR(16)
			, CostoAdicional DECIMAL(12, 4), CostoVariable DECIMAL(12, 4), NumeroCotizacion VARCHAR(16)
		);

		DECLARE @tableOps CMODAT020TD_001;

		IF EXISTS(SELECT 1 FROM @Resultado2Tmp)
		BEGIN
			--INSERT INTO @tableOps (OP)
			--SELECT OP
			--FROM @Resultado2Tmp;

			IF ISNULL(@ZonaERP, '') = '01' 
			BEGIN
				--DELETE FROM Costos01..TmpOPs;

				INSERT INTO Costos01..TmpOPs (OP)
				SELECT OP
				FROM @Resultado2Tmp;

				INSERT INTO @tblPapelesCotizacion (
					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
				)
				EXEC Costos01..CosSP027 @IntOPC = 7;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02' 
			BEGIN
				--DELETE FROM Costos02..TmpOPs;

				INSERT INTO Costos02..TmpOPs (OP)
				SELECT OP
				FROM @Resultado2Tmp;

				INSERT INTO @tblPapelesCotizacion (
					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
				)
				EXEC Costos02..CosSP027 @IntOPC = 7;
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05' 
			BEGIN
				--DELETE FROM Costos05..TmpOPs;

				INSERT INTO Costos05..TmpOPs (OP)
				SELECT OP
				FROM @Resultado2Tmp;

				INSERT INTO @tblPapelesCotizacion (
					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
				)
				EXEC Costos05..CosSP027 @IntOPC = 7;
			END

			IF EXISTS(SELECT 1 FROM @tblPapelesCotizacion WHERE ISNULL(NumeroCotizacion, '') != '')
			BEGIN
				UPDATE @Resultado2 SET
					Liner1 = RTRIM(ISNULL(B.Liner1, '')), Liner2 = RTRIM(ISNULL(B.Liner2, '')), Liner3 = RTRIM(ISNULL(B.Liner3, '')), Liner4 = RTRIM(ISNULL(B.Liner4, '')),
					Corrugado1 = RTRIM(ISNULL(B.Medium1, '')), Corrugado2 = RTRIM(ISNULL(B.Medium2, '')), Corrugado3 = RTRIM(ISNULL(B.Medium3, ''))
				FROM @Resultado2 A
				JOIN @tblPapelesCotizacion B ON RTRIM(A.OP) = RTRIM(B.OP)
				WHERE ISNULL(B.NumeroCotizacion, '') != '';
			END
		END
		/*WHILE EXISTS(SELECT 1 FROM @Resultado2Tmp)
		BEGIN
			SELECT TOP 1 @ID = ID FROM @Resultado2Tmp;
			SELECT @OP = OP FROM @Resultado2Tmp WHERE ID = @ID;

			IF ISNULL(@ZonaERP, '') = '01' 
			BEGIN
				INSERT INTO @tblPapelesCotizacion (
					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
				)
				EXEC Costos01..CosSP027 2, @OP
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				INSERT INTO @tblPapelesCotizacion (
					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
				)
				EXEC Costos02..CosSP027 2, @OP
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				INSERT INTO @tblPapelesCotizacion (
					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
				)
				EXEC Costos05..CosSP027 2, @OP
			END

			IF EXISTS(SELECT 1 FROM @tblPapelesCotizacion)
			BEGIN
				SELECT TOP 1 @NumCotizacion = RTRIM(NumeroCotizacion)
					, @Liner1 = RTRIM(Liner1), @Medium1 = RTRIM(Medium1), @Liner2 = RTRIM(Liner2), @Medium2 = RTRIM(Medium2)
					, @Liner3 = RTRIM(Liner3), @Medium3 = RTRIM(Medium3), @Liner4 = RTRIM(Liner4)
				FROM @tblPapelesCotizacion;
				IF ISNULL(@NumCotizacion, '') != ''
				BEGIN
					UPDATE @Resultado2
						SET Liner1 = @Liner1, Corrugado1 = @Medium1, Liner2 = @Liner2, Corrugado2 = @Medium2,
							Liner3 = @Liner3, Corrugado3 = @Medium3, Liner4 = @Liner4
					WHERE ID = @ID
				END
			END

			DELETE FROM @tblPapelesCotizacion
			DELETE FROM @Resultado2Tmp WHERE ID = @ID;
		END*/

		DELETE FROM @tblPapelesCotizacion;
		DELETE FROM @Resultado2Tmp;

		INSERT INTO @Resultado2Tmp (ID, OP, ClaveArticulo, CvePreparacion, Papel, Impermeabilizado)
		SELECT ID, OP, ClaveArticulo, CvePreparacion, Papel, Impermeabilizado
		FROM @Resultado2

		DECLARE @tablaOP AS TABLE(
			id INT, OPZonaQueConsulta VARCHAR(10), OPZonaDeApoyo VARCHAR(10), ZonaQueConsulta VARCHAR(10), ZonaDeApoyo VARCHAR(10), NumeroCotizacion VARCHAR(30)
		);
		DECLARE @OpApoyo VARCHAR(12)
			, @ZonaApoyo VARCHAR(12)
			, @Cotizacion VARCHAR(30)


		DELETE FROM @tableOps;
		IF EXISTS(SELECT 1 FROM @Resultado2Tmp)
		BEGIN
			--INSERT INTO @tableOps (OP)
			--SELECT OP
			--FROM @Resultado2Tmp;

			IF ISNULL(@ZonaERP, '') = '01' 
			BEGIN
				--DELETE FROM Costos01..TmpOPs;

				INSERT INTO Costos01..TmpOPs (OP)
				SELECT OP
				FROM @Resultado2Tmp;

				INSERT INTO @tablaOP (id, OPZonaQueConsulta, OPZonaDeApoyo, ZonaQueConsulta, ZonaDeApoyo, NumeroCotizacion)
				EXEC Costos01..CosSP027 @IntOPC = 6, @zonaERP = @ZonaERP
			END
			ELSE IF ISNULL(@ZonaERP, '') = '02' 
			BEGIN
				--DELETE FROM Costos02..TmpOPs;

				INSERT INTO Costos02..TmpOPs (OP)
				SELECT OP
				FROM @Resultado2Tmp;

				INSERT INTO @tablaOP (id, OPZonaQueConsulta, OPZonaDeApoyo, ZonaQueConsulta, ZonaDeApoyo, NumeroCotizacion)
				EXEC Costos02..CosSP027 @IntOPC = 6, @zonaERP = @ZonaERP
			END
			ELSE IF ISNULL(@ZonaERP, '') = '05' 
			BEGIN
				--DELETE FROM Costos05..TmpOPs;

				INSERT INTO Costos05..TmpOPs (OP)
				SELECT OP
				FROM @Resultado2Tmp;

				INSERT INTO @tablaOP (id, OPZonaQueConsulta, OPZonaDeApoyo, ZonaQueConsulta, ZonaDeApoyo, NumeroCotizacion)
				EXEC Costos05..CosSP027 @IntOPC = 6, @zonaERP = @ZonaERP
			END

			DELETE FROM @tableOps;
			IF EXISTS(SELECT 1 FROM @tablaOP)
			BEGIN
				--INSERT INTO @tableOps (OP)
				--SELECT OPZonaDeApoyo
				--FROM @tablaOP
				--WHERE ISNULL(NumeroCotizacion, '') != '';

				IF ISNULL(@ZonaERP, '') = '01' 
				BEGIN
					--DELETE FROM Costos01..TmpOPs;

					INSERT INTO Costos01..TmpOPs (OP)
					SELECT OPZonaDeApoyo
					FROM @tablaOP
					WHERE ISNULL(NumeroCotizacion, '') != '';

					INSERT INTO @tblPapelesCotizacion (
						OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
						Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
					)
					EXEC Costos01..CosSP027 @IntOPC = 7;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '02' 
				BEGIN
					--DELETE FROM Costos02..TmpOPs;

					INSERT INTO Costos02..TmpOPs (OP)
					SELECT OPZonaDeApoyo
					FROM @tablaOP
					WHERE ISNULL(NumeroCotizacion, '') != '';

					INSERT INTO @tblPapelesCotizacion (
						OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
						Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
					)
					EXEC Costos02..CosSP027 @IntOPC = 7;
				END
				ELSE IF ISNULL(@ZonaERP, '') = '05' 
				BEGIN
					--DELETE FROM Costos05..TmpOPs;

					INSERT INTO Costos05..TmpOPs (OP)
					SELECT OPZonaDeApoyo
					FROM @tablaOP
					WHERE ISNULL(NumeroCotizacion, '') != '';

					INSERT INTO @tblPapelesCotizacion (
						OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
						Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
					)
					EXEC Costos05..CosSP027 @IntOPC = 7;
				END

				IF EXISTS(SELECT 1 FROM @tblPapelesCotizacion WHERE ISNULL(NumeroCotizacion, '') != '')
				BEGIN
					UPDATE @Resultado2 SET
						Liner1 = RTRIM(ISNULL(B.Liner1, '')), Liner2 = RTRIM(ISNULL(B.Liner2, '')), Liner3 = RTRIM(ISNULL(B.Liner3, '')), Liner4 = RTRIM(ISNULL(B.Liner4, '')),
						Corrugado1 = RTRIM(ISNULL(B.Medium1, '')), Corrugado2 = RTRIM(ISNULL(B.Medium2, '')), Corrugado3 = RTRIM(ISNULL(B.Medium3, ''))
					FROM @Resultado2 A
					JOIN @tblPapelesCotizacion B ON RTRIM(A.OP) = RTRIM(B.OP)
					WHERE ISNULL(B.NumeroCotizacion, '') != '';
				END

				--IF EXISTS(SELECT 1 FROM @tblPapelesCotizacion)
				--BEGIN
				--	SELECT TOP 1 @NumCotizacion = RTRIM(NumeroCotizacion)
				--		, @Liner1 = RTRIM(Liner1), @Medium1 = RTRIM(Medium1), @Liner2 = RTRIM(Liner2), @Medium2 = RTRIM(Medium2)
				--		, @Liner3 = RTRIM(Liner3), @Medium3 = RTRIM(Medium3), @Liner4 = RTRIM(Liner4)
				--	FROM @tblPapelesCotizacion;

				--	UPDATE @Resultado2
				--		SET Liner1 = @Liner1, Corrugado1 = @Medium1, Liner2 = @Liner2, Corrugado2 = @Medium2,
				--			Liner3 = @Liner3, Corrugado3 = @Medium3, Liner4 = @Liner4
				--	WHERE ID = @ID

				--	DELETE FROM @tblPapelesCotizacion
				--END
			END
		END

		--WHILE EXISTS(SELECT 1 FROM @Resultado2Tmp)
		--BEGIN
		--	SELECT TOP 1 @ID = ID FROM @Resultado2Tmp;
		--	SELECT @OP = OP FROM @Resultado2Tmp WHERE ID = @ID;

		--	IF ISNULL(@ZonaERP, '') = '01' 
		--	BEGIN
		--		INSERT INTO @tablaOP (id, OPZonaQueConsulta, OPZonaDeApoyo, ZonaQueConsulta, ZonaDeApoyo, NumeroCotizacion)
		--		EXEC Costos01..CosSP027 @IntOPC = 5, @OP = @OP, @zonaERP = @ZonaERP
		--	END
		--	ELSE IF ISNULL(@ZonaERP, '') = '02' 
		--	BEGIN
		--		INSERT INTO @tablaOP (id, OPZonaQueConsulta, OPZonaDeApoyo, ZonaQueConsulta, ZonaDeApoyo, NumeroCotizacion)
		--		EXEC Costos02..CosSP027 @IntOPC = 5, @OP = @OP, @zonaERP = @ZonaERP
		--	END
		--	ELSE IF ISNULL(@ZonaERP, '') = '05' 
		--	BEGIN
		--		INSERT INTO @tablaOP (id, OPZonaQueConsulta, OPZonaDeApoyo, ZonaQueConsulta, ZonaDeApoyo, NumeroCotizacion)
		--		EXEC Costos05..CosSP027 @IntOPC = 5, @OP = @OP, @zonaERP = @ZonaERP
		--	END

		--	IF EXISTS(SELECT 1 FROM @tablaOP)
		--	BEGIN
		--		SELECT TOP 1 @OpApoyo = OPZonaDeApoyo, @ZonaApoyo = ZonaDeApoyo, @Cotizacion = NumeroCotizacion
		--		FROM @tablaOP

		--		IF ISNULL(@NumCotizacion, '') != ''
		--		BEGIN
		--			IF ISNULL(@ZonaERP, '') = '01' 
		--			BEGIN
		--				INSERT INTO @tblPapelesCotizacion (
		--					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
		--					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
		--				)
		--				EXEC Costos01..CosSP027 2, @OpApoyo
		--			END
		--			ELSE IF ISNULL(@ZonaERP, '') = '02' 
		--			BEGIN
		--				INSERT INTO @tblPapelesCotizacion (
		--					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
		--					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
		--				)
		--				EXEC Costos02..CosSP027 2, @OpApoyo
		--			END
		--			ELSE IF ISNULL(@ZonaERP, '') = '05' 
		--			BEGIN
		--				INSERT INTO @tblPapelesCotizacion (
		--					OP, ClaveArticulo, Resistencia, Liner1, Medium1, Liner2, Medium2,
		--					Liner3, Medium3, Liner4, CostoAdicional, CostoVariable, NumeroCotizacion
		--				)
		--				EXEC Costos05..CosSP027 2, @OpApoyo
		--			END

		--			IF EXISTS(SELECT 1 FROM @tblPapelesCotizacion)
		--			BEGIN
		--				SELECT TOP 1 @NumCotizacion = RTRIM(NumeroCotizacion)
		--					, @Liner1 = RTRIM(Liner1), @Medium1 = RTRIM(Medium1), @Liner2 = RTRIM(Liner2), @Medium2 = RTRIM(Medium2)
		--					, @Liner3 = RTRIM(Liner3), @Medium3 = RTRIM(Medium3), @Liner4 = RTRIM(Liner4)
		--				FROM @tblPapelesCotizacion;

		--				UPDATE @Resultado2
		--					SET Liner1 = @Liner1, Corrugado1 = @Medium1, Liner2 = @Liner2, Corrugado2 = @Medium2,
		--						Liner3 = @Liner3, Corrugado3 = @Medium3, Liner4 = @Liner4
		--				WHERE ID = @ID

		--				DELETE FROM @tblPapelesCotizacion
		--			END
		--		END

		--		DELETE FROM @tablaOP;
		--	END

		--	DELETE FROM @Resultado2Tmp WHERE ID = @ID;
		--END

		-- DEVOLVER AMBAS TABLAS
		SELECT /*1 AS Id, */ClaveArticulo, Liner1, Corrugado1, Liner2, Corrugado2, CvePreparacion, 
			Liner3, Corrugado3, Liner4, OP, Flauta, Papel, Impermeabilizado
		FROM @Resultado
		--UNION ALL
		SELECT /*2 AS Id, */ClaveArticulo, Liner1, Corrugado1, Liner2, Corrugado2, CvePreparacion, 
			Liner3, Corrugado3, Liner4, OP, Flauta, Papel, Impermeabilizado
		FROM @Resultado2

		SET NOCOUNT OFF;
	END
	ELSE IF @Opcion = 7
	BEGIN
		IF ISNULL(@ZonaERP, '') = '01' 
		BEGIN
			SELECT [Clave Proceso] AS ClaveProceso, Descripcion
			FROM Cajas01..CmoCat010
			WHERE [Tipo Maquina] = 'CO' AND Status = 0
			ORDER BY [Clave Proceso]
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02' 
		BEGIN
			SELECT [Clave Proceso] AS ClaveProceso, Descripcion
			FROM Cajas02..CmoCat010
			WHERE [Tipo Maquina] = 'CO' AND Status = 0
			ORDER BY [Clave Proceso]
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05' 
		BEGIN
			SELECT [Clave Proceso] AS ClaveProceso, Descripcion
			FROM Cajas05..CmoCat010
			WHERE [Tipo Maquina] = 'CO' AND Status = 0
			ORDER BY [Clave Proceso]
		END
	END
END
GO


