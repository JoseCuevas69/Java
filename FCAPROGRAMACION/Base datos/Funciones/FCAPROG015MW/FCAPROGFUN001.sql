USE [CecsoPlan01]
GO
/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN001]    Script Date: 19/10/2022 03:33:05 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[FCAPROGFUN001](@input VARCHAR(MAX), @pattern VARCHAR(MAX) /*'%[^0-9]%'*/)
	RETURNS VARCHAR(MAX)
AS BEGIN
	DECLARE @inputData VARCHAR(MAX) = @input --'GE098EKS9VER1'       
	DECLARE @intPosition INT
	SET @intPosition = PATINDEX(@pattern, @inputData)

	WHILE @intPosition > 0
	BEGIN
		SET @inputData = STUFF(@inputData, @intPosition, 1, '');
		SET @intPosition = PATINDEX(@pattern, @inputData );
	END
	
	RETURN @inputData;
	--SELECT 'GE098EKS9VER1' as InputString, @inputData AS AlphabetsOnly
END