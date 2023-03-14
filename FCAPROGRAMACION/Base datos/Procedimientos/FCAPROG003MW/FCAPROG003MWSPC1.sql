USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG003MWSPC1]    Script Date: 24/03/2022 12:14:05 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 13/12/2021
-- Description:	Paramaetros programacion
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG003MWSPC1] @Opcion INT
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		SELECT [Id]
			,[ResistenciasAfines]
			,[RefileMaximo]
			,[RefileMinimo]
			,[DiasAdelanto]
			,[TodosAnchos]
			,[AnchoCalculo]
			,[LargoMinimo]
			,[Excedente]
			,[Scores]
		FROM [FcaCajas01].[dbo].[FCAPROGDAT009]
	END -- Parametros de programacion
	IF @Opcion = 2
	BEGIN
		SELECT [Codigo]
			  ,[Descripcion]
			  ,[Cantidad]
			  ,[Estatus]
		  FROM [FcaCajas01].[dbo].[FCAPROGDAT015 ] WHERE Estatus = 1
	END -- Variacion 
END
