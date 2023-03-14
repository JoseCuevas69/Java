USE [CecsoPlan01]
GO

/****** Object:  UserDefinedFunction [dbo].[FCAPROGFUN005]    Script Date: 19/10/2022 03:44:22 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[FCAPROGFUN005](@pZonaERP VARCHAR(2), @pOP VARCHAR(10), @pCantidadTras INT)
RETURNS VARCHAR(500)
AS BEGIN
	DECLARE @out VARCHAR(500), @Mensaje VARCHAR(500)

	IF EXISTS(SELECT 1 FROM CplDat014 A JOIN CplDat007 B ON B.Clave = A.[Clave Resistencia])
	BEGIN
		--SELECT TOP 1 @GrupoActivo = ISNULL(B.Grupo, -1), @Resistencia = ISNULL(A.[Clave Resistencia], '')
		--FROM CplDat014 A
		--INNER JOIN CplDat007 B ON B.Clave = A.[Clave Resistencia];

		IF EXISTS(SELECT 1 FROM CplDat006)
		BEGIN
			IF NOT EXISTS (SELECT 1 FROM CplVis002 WHERE [Orden Produccion] = RTRIM(UPPER(@pOP)))
			BEGIN
				IF NOT EXISTS(SELECT 1 FROM CplVis001 WHERE OP = RTRIM(UPPER(@pOP)))
				BEGIN
					SELECT @Mensaje = dbo.FCAPROGFUN006(@pZonaERP, @pOP);
					SELECT @out = CASE WHEN ISNULL(@Mensaje, '') = 'OK' THEN 'TABLA' ELSE @Mensaje END;
				END ELSE
				BEGIN
					SELECT @out = 'CPLVIS001';
				END
			END ELSE
			BEGIN
				SELECT @out = 'CPLVIS002';
			END
		END ELSE 
		BEGIN
			--INSERT INTO @ResultadoInsert (Id, Message)
			SELECT @out = 'No se Encontraron Párametros de Programación';
		END
	END ELSE
	BEGIN
		--INSERT INTO @ResultadoInsert (Id, Message)
		SELECT @out = 'Defina Resistencia a Programar';
	END

	RETURN ISNULL(@out, '')
END
GO


