USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN004]    Script Date: 19/10/2022 03:43:52 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN004] ( @ZonaERP VARCHAR(2), @Cantidad DECIMAL(18,2) )
	RETURNS DECIMAL(18,2)
AS BEGIN
	DECLARE @Factor DECIMAL(18, 2) = 0;
	
	IF ISNULL(@ZonaERP, '') = '01'
	BEGIN
		SELECT TOP 1 @Factor = ISNULL(Factor, 0)
		FROM Cajas01..CmoCat072
		WHERE Status = 0 
			AND ISNULL(@Cantidad, 0) >= PzaMin AND ISNULL(@Cantidad, 0) <= PzaMax;
	END
	ELSE IF ISNULL(@ZonaERP, '') = '02'
	BEGIN
		SELECT TOP 1 @Factor = ISNULL(Factor, 0)
		FROM Cajas02..CmoCat072
		WHERE Status = 0 
			AND ISNULL(@Cantidad, 0) >= PzaMin AND ISNULL(@Cantidad, 0) <= PzaMax;
	END
	ELSE IF ISNULL(@ZonaERP, '') = '05'
	BEGIN
		SELECT TOP 1 @Factor = ISNULL(Factor, 0)
		FROM Cajas05..CmoCat072
		WHERE Status = 0 
			AND ISNULL(@Cantidad, 0) >= PzaMin AND ISNULL(@Cantidad, 0) <= PzaMax;
	END

	RETURN @Factor;
END
GO


