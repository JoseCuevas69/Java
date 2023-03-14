USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN003]    Script Date: 19/10/2022 03:43:31 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN003](@pZonaERP VARCHAR(2), @pClavePapel VARCHAR(12))
RETURNS NUMERIC(18, 5)
AS BEGIN
	DECLARE @out NUMERIC(18, 5) = 0;

	IF ISNULL(@pZonaERP, '') = '01'
	BEGIN
		SELECT TOP 1 @out = Gramaje FROM Cajas01..CmoCat009 WHERE [Clave papel] = ISNULL(@pClavePapel, '');
	END
	ELSE IF ISNULL(@pZonaERP, '') = '02'
	BEGIN
		SELECT TOP 1 @out = Gramaje FROM Cajas02..CmoCat009 WHERE [Clave papel] = ISNULL(@pClavePapel, '');
	END
	ELSE IF ISNULL(@pZonaERP, '') = '05'
	BEGIN
		SELECT TOP 1 @out = Gramaje FROM Cajas05..CmoCat009 WHERE [Clave papel] = ISNULL(@pClavePapel, '');
	END	

	RETURN ISNULL(@out, 0);
END

GO


