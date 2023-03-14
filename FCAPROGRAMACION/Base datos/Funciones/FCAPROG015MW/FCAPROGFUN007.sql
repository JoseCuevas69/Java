USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN007]    Script Date: 19/10/2022 03:45:49 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN007](@pOP VARCHAR(10), @pZonaERP VARCHAR(2))
RETURNS BIT
AS BEGIN
	DECLARE @out BIT;
	;WITH tblProducido AS (
		SELECT SUM(A.Cantidad) AS Producido, '01' AS ZonaERP, @pOP AS OP
		FROM Cajas01..CmoDat021 A
		JOIN Cajas01..CmoDat020 B ON A.OP = B.OP AND B.Programa = A.Programa
		WHERE A.OP = @pOP AND B.[Ultimo Proceso] = 1
		UNION
		SELECT SUM(A.Cantidad) AS Producido, '02' AS ZonaERP, @pOP AS OP
		FROM Cajas02..CmoDat021 A
		JOIN Cajas02..CmoDat020 B ON A.OP = B.OP AND B.Programa = A.Programa
		WHERE A.OP = @pOP AND B.[Ultimo Proceso] = 1
		UNION
		SELECT SUM(A.Cantidad) AS Producido, '05' AS ZonaERP, @pOP AS OP
		FROM Cajas05..CmoDat021 A
		JOIN Cajas05..CmoDat020 B ON A.OP = B.OP AND B.Programa = A.Programa
		WHERE A.OP = @pOP AND B.[Ultimo Proceso] = 1
	), tblSolicitado AS (
		SELECT (Cantidad + Devuelto) AS Solicitado, '01' AS ZonaERP, @pOP AS OP
		FROM Cajas01..CmoDat011
		WHERE OP = @pOP
		UNION
		SELECT (Cantidad + Devuelto) AS Solicitado, '02' AS ZonaERP, @pOP AS OP
		FROM Cajas02..CmoDat011
		WHERE OP = @pOP
		UNION
		SELECT (Cantidad + Devuelto) AS Solicitado, '05' AS ZonaERP, @pOP AS OP
		FROM Cajas05..CmoDat011
		WHERE OP = @pOP
	), tblProgramado AS (
		SELECT SUM(A.[Numero Cortes] * A.[Piezas Corte] * A.[Hojas Corte]) AS Programado, '01' AS ZonaERP, @pOP AS OP
		FROM Cajas01..CmoDat013 A
		JOIN Cajas01..CmoDat012 B ON A.Programa = B.Programa
		JOIN Cajas01..CmoDat011 C ON C.OP = A.Op
		WHERE A.Op = @pOP AND B.Estatus = 'P'
		UNION
		SELECT SUM(A.[Numero Cortes] * A.[Piezas Corte] * A.[Hojas Corte]) AS Programado, '02' AS ZonaERP, @pOP AS OP
		FROM Cajas02..CmoDat013 A
		JOIN Cajas02..CmoDat012 B ON A.Programa = B.Programa
		JOIN Cajas02..CmoDat011 C ON C.OP = A.Op
		WHERE A.Op = @pOP AND B.Estatus = 'P'
		UNION
		SELECT SUM(A.[Numero Cortes] * A.[Piezas Corte] * A.[Hojas Corte]) AS Programado, '05' AS ZonaERP, @pOP AS OP
		FROM Cajas05..CmoDat013 A
		JOIN Cajas05..CmoDat012 B ON A.Programa = B.Programa
		JOIN Cajas05..CmoDat011 C ON C.OP = A.Op
		WHERE A.Op = @pOP AND B.Estatus = 'P'
	), tmpProducido AS (
		SELECT ISNULL(Producido, 0) AS Producido, OP
		FROM tblProducido
		WHERE ZonaERP = @pZonaERP
	), tmpProgramado AS (
		SELECT ISNULL(Programado, 0) AS Programado, OP
		FROM tblProgramado
		WHERE ZonaERP = @pZonaERP
	), tmpSolicitado AS (
		SELECT ISNULL(Solicitado, 0) AS Solicitado, OP
		FROM tblSolicitado
		WHERE ZonaERP = @pZonaERP
	)
	SELECT TOP 1 @out = CASE WHEN ISNULL(C.Solicitado, 0) < (ISNULL(B.Programado, 0) + ISNULL(A.Producido, 0)) THEN 1 ELSE 0 END
	FROM tmpProducido A
	JOIN tmpProgramado B ON A.OP = B.OP
	JOIN tmpSolicitado C ON A.OP = C.OP

	RETURN ISNULL(@out, 0);
END
GO


