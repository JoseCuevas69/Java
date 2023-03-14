USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN009]    Script Date: 19/10/2022 03:47:01 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN009](@pZonaERP VARCHAR(2), @pOP VARCHAR(12))
RETURNS DECIMAL(18, 2)
AS BEGIN
	DECLARE @Excedente DECIMAL(18, 2) = 0;

	IF ISNULL(@pZonaERP, '') = '01'
	BEGIN
		SELECT @Excedente = ISNULL(
			CASE WHEN ISNULL(D.Proceso, '') = 'K' OR ISNULL(D.Proceso, '') = 'P' 
				THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 3)
				ELSE CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
					THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 4)
					ELSE CASE WHEN A.Cantidad >= 5000 
						THEN CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
							THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 6)
							ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 1)
						END
						ELSE CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
							THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 5)
							ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 2)
						END
					END
				END
			END, 0)
		FROM Cajas01..CmoDat011 A
		JOIN Cajas01..CmoDat010 B 
		JOIN Cajas01..CmoDat008 C ON C.Pedido = B.PedidoInt ON B.OP = A.Folio_OP
		LEFT JOIN CplVis002 D ON D.[Orden Produccion] = A.OP
		WHERE A.OP = ISNULL(UPPER(RTRIM(@pOP)), '');
	END
	ELSE IF ISNULL(@pZonaERP, '') = '02'
	BEGIN
		SELECT @Excedente = ISNULL(
			CASE WHEN ISNULL(D.Proceso, '') = 'K' OR ISNULL(D.Proceso, '') = 'P' 
				THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 3)
				ELSE CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
					THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 4)
					ELSE CASE WHEN A.Cantidad >= 5000 
						THEN CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
							THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 6)
							ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 1)
						END
						ELSE CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
							THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 5)
							ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 2)
						END
					END
				END
			END, 0)
		FROM Cajas02..CmoDat011 A
		JOIN Cajas02..CmoDat010 B 
		JOIN Cajas02..CmoDat008 C ON C.Pedido = B.PedidoInt ON B.OP = A.Folio_OP
		LEFT JOIN CplVis002 D ON D.[Orden Produccion] = A.OP
		WHERE A.OP = ISNULL(UPPER(RTRIM(@pOP)), '')
	END
	ELSE IF ISNULL(@pZonaERP, '') = '05'
	BEGIN
		SELECT @Excedente = ISNULL(
			CASE WHEN ISNULL(D.Proceso, '') = 'K' OR ISNULL(D.Proceso, '') = 'P' 
				THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 3)
				ELSE CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
					THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 4)
					ELSE CASE WHEN A.Cantidad >= 5000 
						THEN CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
							THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 6)
							ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 1)
						END
						ELSE CASE WHEN (ISNULL(C.variacion, 0) * 100) = 0
							THEN (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 5)
							ELSE (SELECT TOP 1 Variacion FROM CplCat004 WHERE Id = 2)
						END
					END
				END
			END, 0)
		FROM Cajas05..CmoDat011 A
		JOIN Cajas05..CmoDat010 B 
		JOIN Cajas05..CmoDat008 C ON C.Pedido = B.PedidoInt ON B.OP = A.Folio_OP
		LEFT JOIN CplVis002 D ON D.[Orden Produccion] = A.OP
		WHERE A.OP = ISNULL(UPPER(RTRIM(@pOP)), '')
	END

	RETURN @Excedente;
END
GO


