USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN006]    Script Date: 19/10/2022 03:44:48 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN006](@pZonaERP VARCHAR(2), @pOP VARCHAR(12))
RETURNS VARCHAR(MAX)
AS BEGIN
	DECLARE @tmp1 AS TABLE (
		OP VARCHAR(10), ClaveArticulo VARCHAR(9), FechaEntrega SMALLDATETIME, Nombre VARCHAR(100), Articulo VARCHAR(60), Resistencia VARCHAR(10),
		Status VARCHAR(10), Ancho REAL, Largo REAL, Piezas DECIMAL(4, 1), Cantidad INT, Faltan INT, Hojas INT, Parcial VARCHAR(1), Flauta VARCHAR(3), TKg INT, TM2 INT,
		Industria VARCHAR(3), NoProducir BIT, ZonaERP VARCHAR(2)
	)

	DECLARE @tmpId BIT, @tmpMensaje AS VARCHAR(MAX), @ClaveArticulo VARCHAR(9);

	;WITH tmp1 AS (
		SELECT A.OP, A.[Clave Articulo], D.[Fecha Entrega], E.Nombre, B.Descripcion AS Articulo, A.Resistencia, A.Status
			, B.[ancho hoja] AS Ancho, B.[largo hoja] AS Largo, B.PiezasXHoja AS Piezas, A.Cantidad, 0 AS Faltan, 0 AS Hojas
			, 'T' AS Parcial, B.Flauta, 0 AS TKg, 0 AS TM2, C.Industria, D.NoProducir, '01' AS ZonaERP
		FROM Cajas01..CmoDat011 A
		JOIN Cajas01..CmoDat010 D ON A.Folio_OP = D.OP
		JOIN Cajas01..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
		JOIN Cajas01..CmoCat013 C ON B.SubCodigo = C.SubCodigo
		JOIN Cajas01..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
		WHERE A.OP = @pOP
		UNION
		SELECT A.OP, A.[Clave Articulo], D.[Fecha Entrega], E.Nombre, B.Descripcion AS Articulo, A.Resistencia, A.Status
			, B.[ancho hoja] AS Ancho, B.[largo hoja] AS Largo, B.PiezasXHoja AS Piezas, A.Cantidad, 0 AS Faltan, 0 AS Hojas
			, 'T' AS Parcial, B.Flauta, 0 AS TKg, 0 AS TM2, C.Industria, D.NoProducir, '02' AS ZonaERP
		FROM Cajas02..CmoDat011 A
		JOIN Cajas02..CmoDat010 D ON A.Folio_OP = D.OP
		JOIN Cajas02..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
		JOIN Cajas02..CmoCat013 C ON B.SubCodigo = C.SubCodigo
		JOIN Cajas02..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
		WHERE A.OP = @pOP
		UNION
		SELECT A.OP, A.[Clave Articulo], D.[Fecha Entrega], E.Nombre, B.Descripcion AS Articulo, A.Resistencia, A.Status
			, B.[ancho hoja] AS Ancho, B.[largo hoja] AS Largo, B.PiezasXHoja AS Piezas, A.Cantidad, 0 AS Faltan, 0 AS Hojas
			, 'T' AS Parcial, B.Flauta, 0 AS TKg, 0 AS TM2, C.Industria, D.NoProducir, '05' AS ZonaERP
		FROM Cajas05..CmoDat011 A
		JOIN Cajas05..CmoDat010 D ON A.Folio_OP = D.OP
		JOIN Cajas05..CmoTjCat004 B ON B.[Clave Articulo] = A.[Clave Articulo]
		JOIN Cajas05..CmoCat013 C ON B.SubCodigo = C.SubCodigo
		JOIN Cajas05..CmoTjCat005 E ON E.Codigo = D.[Clave Cliente]
		WHERE A.OP = @pOP
	)
	INSERT INTO @tmp1 (
		OP, ClaveArticulo, FechaEntrega, Nombre, Articulo, Resistencia, Status, Ancho, Largo, Piezas, 
		Cantidad, Faltan, Hojas, Parcial, Flauta, TKg, TM2, Industria, NoProducir, ZonaERP
	)
	SELECT OP, [Clave Articulo], [Fecha Entrega], Nombre, Articulo, Resistencia, Status, Ancho, Largo, Piezas,
		Cantidad, Faltan, Hojas, Parcial, Flauta, TKg, TM2, Industria, NoProducir, ZonaERP
	FROM tmp1
	WHERE ZonaERP = @pZonaERP;

	DECLARE @Status VARCHAR(10), @NoProducir BIT

	IF EXISTS (SELECT 1 FROM @tmp1)
	BEGIN
		SELECT TOP 1 @Status = Status, @NoProducir = NoProducir, @ClaveArticulo = ClaveArticulo
		FROM @tmp1;

		IF RTRIM(@Status) = 'GEN' BEGIN SELECT @tmpId = 0, @tmpMensaje = 'OP NO Autorizada'; END
		ELSE IF RTRIM(@Status) = 'CAN' BEGIN SELECT @tmpId = 0, @tmpMensaje = 'OP Cancelada'; END
		ELSE IF RTRIM(@Status) = 'SUS' BEGIN SELECT @tmpId = 0, @tmpMensaje = 'OP Suspendida'; END 
		ELSE 
		BEGIN
			IF @NoProducir = 1 
			BEGIN
				SELECT @tmpId = 0, @tmpMensaje = 'OP De NO PRODUCCION...VERIFIQUE';
			END ELSE
			BEGIN
				IF dbo.FCAPROGFUN007(@pOP, @pZonaERP) = 0
				BEGIN
					--SELECT @tmpId = 1, @tmpMensaje = 'OK';
					IF ISNULL(@pZonaERP, '') = '02' AND ISNULL(@ClaveArticulo, '') != ''
					BEGIN
						IF EXISTS (SELECT 1 FROM Cajas02..CmoDat257 WHERE ClaveArticulo = RTRIM(@ClaveArticulo) AND LlevaEtiqueta = 1)
						BEGIN
							IF EXISTS (
								SELECT 1 FROM Cajas02..CmoDat187 A 
								JOIN Cajas02..CmoCat079 B ON A.Cod = B.Codigo
								WHERE A.Estatus = 0 AND B.Estatus = 0 AND A.ClaveArticulo = @ClaveArticulo AND A.Cod = 1
							)
							BEGIN
								SELECT @tmpId = 1, @tmpMensaje = 'OK';
							END ELSE 
							BEGIN
								SELECT @tmpId = 0, @tmpMensaje = 'Favor de capturar el código de la etiqueta en el módulo de captura de combinación estándar de papel (CmoCap076)';
							END
						END
					END ELSE
					BEGIN
						SELECT @tmpId = 1, @tmpMensaje = 'OK';
					END
				END ELSE 
				BEGIN
					-- PREGUNTAR AL USUARIO
					--SELECT @tmpId = 0, @tmpMensaje = 'PREGUNTA';
					SELECT @tmpId = 0, @tmpMensaje = 'Producción Completa para la OP ' + @pOP;
				END
			END
		END
	END ELSE 
	BEGIN
		SELECT @tmpId = 0, @tmpMensaje = 'No se encontró OP en Proceso...';
	END

	RETURN @tmpMensaje;
END
GO


