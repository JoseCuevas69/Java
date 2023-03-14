USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN002]    Script Date: 19/10/2022 03:42:36 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN002] (@pZonaERP VARCHAR(2), @pMetrosL INT, @pAncho DECIMAL(18, 2), @pClavePapel VARCHAR(12), @pFlauta VARCHAR(3))
RETURNS REAL
AS BEGIN
	DECLARE @out REAL = 0;
	DECLARE @pGramaje NUMERIC(18, 5) = 0;
	DECLARE @pFactor REAL = 1;

	IF ISNULL(@pFlauta, '') != ''
	BEGIN
		SELECT @pFactor = 
			CASE WHEN ISNULL(RTRIM(@pFlauta), '') = 'B' THEN 1.33
				WHEN ISNULL(RTRIM(@pFlauta), '') = 'C' THEN 1.42
				WHEN ISNULL(RTRIM(@pFlauta), '') = 'A' THEN 1.59
				WHEN ISNULL(RTRIM(@pFlauta), '') = 'E' THEN 1.26
				ELSE 1
			END;

		IF ISNULL(@pZonaERP, '') = '01'
		BEGIN
			SELECT TOP 1 @pFactor = CASE WHEN ISNULL(Factor1, 0) > 0 THEN Factor1 ELSE @pFactor END FROM Cajas01..CmoCat015 WHERE Flauta = ISNULL(@pFlauta, '');
		END
		ELSE IF ISNULL(@pZonaERP, '') = '02'
		BEGIN
			SELECT TOP 1 @pFactor = CASE WHEN ISNULL(Factor1, 0) > 0 THEN Factor1 ELSE @pFactor END FROM Cajas02..CmoCat015 WHERE Flauta = ISNULL(@pFlauta, '');
		END
		ELSE IF ISNULL(@pZonaERP, '') = '05'
		BEGIN
			SELECT TOP 1 @pFactor = CASE WHEN ISNULL(Factor1, 0) > 0 THEN Factor1 ELSE @pFactor END FROM Cajas05..CmoCat015 WHERE Flauta = ISNULL(@pFlauta, '');
		END

		SELECT @pFactor = CASE WHEN ISNULL(@pFactor, 0) = 0 THEN 1 ELSE @pFactor END
	END

	IF ISNULL(@pAncho, 0) != 0
	BEGIN
		SELECT @pGramaje = dbo.FCAPROGFUN003(@pZonaERP, @pClavePapel) * ISNULL(@pFactor, 1);
		SELECT @out = @pMetrosL * ((@pAncho * 2.54) / 100) * @pGramaje;
	END

	RETURN ISNULL(@out, 0);
END
GO


