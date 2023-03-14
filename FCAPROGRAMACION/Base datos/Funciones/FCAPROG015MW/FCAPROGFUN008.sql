USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN008]    Script Date: 19/10/2022 03:46:30 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN008](@lCantidad REAL, @lProceso VARCHAR(20), @lVariacion DECIMAL(18, 2))
RETURNS DECIMAL(18, 2)
AS
BEGIN
	DECLARE @ValidaVariacion DECIMAL(18, 2)

	IF ISNULL(@lProceso, '') = '' BEGIN SELECT @ValidaVariacion = 0 END
	ELSE 
	BEGIN
		IF ISNULL(@lProceso, '') = 'A' OR ISNULL(@lProceso, '') = 'Q' OR ISNULL(@lProceso, '') = 'O' OR ISNULL(@lProceso, '') = 'I'
		BEGIN
			SELECT @ValidaVariacion = @lVariacion / 2;
		END ELSE
		BEGIN
			SELECT TOP 1 @ValidaVariacion = 
				CASE WHEN @lCantidad <= 500 THEN [1A500]
					WHEN @lCantidad > 500 AND @lCantidad <= 1000 THEN [501A1000]
					WHEN @lCantidad > 1000 AND @lCantidad <= 2000 THEN [1001A2000]
					WHEN @lCantidad > 2000 AND @lCantidad <= 3000 THEN [2001A3000]
					WHEN @lCantidad > 3000 THEN [M3000]
				END
			FROM CplDat070
			WHERE CodRuta = RTRIM(@lProceso)
		END
	END

	RETURN ISNULL(@ValidaVariacion, 0);
END
GO


