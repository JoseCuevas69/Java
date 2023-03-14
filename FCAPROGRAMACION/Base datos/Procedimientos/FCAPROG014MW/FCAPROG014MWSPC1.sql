USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG014MWSPC1]    Script Date: 19/10/2022 04:01:41 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[FCAPROG014MWSPC1]
	@Opcion INT								= NULL,
	@ZonaERP VARCHAR(2)						= NULL
AS BEGIN
	IF @Opcion = 1 
	BEGIN
		-- OBTENER PARAMETROS 
		SELECT Id, [Resistenias Afines] AS ResistenciaAfines, [Refile Maximo] AS RefileMaximo, [Refile Minimo] AS RefileMinimo
			, [Dias Adelanto] AS DiasAdelantadoFE, [Todos Anchos] AS TodosAnchos, FORMAT([Ancho Calculo], '#,0.00', 'EN-US') AS AnchosCalculo
			, [Largo Minimo] AS LargoMinProgr, Excedente AS AumentoPedido, Scores AS ScoresMaximos
		FROM CplDat006
		WHERE Id = 1;
	END
	ELSE IF @Opcion = 2
	BEGIN
		-- LLENAR COMBO MODIFICAR
		IF ISNULL(@ZonaERP, '') = '01'
		BEGIN
			SELECT Codigo, Descripcion, Cantidad
			FROM Cajas01..CmoCat080
			WHERE Status = 0
		END
		ELSE IF ISNULL(@ZonaERP, '') = '02'
		BEGIN
			SELECT Codigo, Descripcion, Cantidad
			FROM Cajas02..CmoCat080
			WHERE Status = 0
		END
		ELSE IF ISNULL(@ZonaERP, '') = '05'
		BEGIN
			SELECT Codigo, Descripcion, Cantidad
			FROM Cajas05..CmoCat080
			WHERE Status = 0
		END
	END
END
GO


