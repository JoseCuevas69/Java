USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG003MWSPA2]    Script Date: 24/03/2022 12:14:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 20/12/2021
-- Description:	Paramaetros programacion
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG003MWSPA2] @Opcion INT
	,@Usuario VARCHAR(6)
	,@Codigo INT = NULL
	,@Descripcion VARCHAR(100) = NULL
	,@Cantidad DECIMAL(18, 4) = NULL
	,@ResistenciasAfines BIT = NULL
	,@RefileMaximo SMALLINT = NULL
	,@RefileMinimo SMALLINT = NULL
	,@DiasAdelanto SMALLINT = NULL
	,@TodosAnchos BIT = NULL
	,@AnchoCalculo REAL = NULL
	,@LargoMinimo INT = NULL
	,@Excedente SMALLINT = NULL
	,@Scores INT = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		INSERT INTO [dbo].[FCAPROGDAT015 ] (
			[Descripcion]
			,[Cantidad]
			,[Usuario]
			,[FechaAct]
			,[Estatus]
			)
		VALUES (
			@Descripcion
			,@Cantidad
			,@Usuario
			,GETDATE()
			,1
			)
	END -- agregar variacion

	IF @Opcion = 2
	BEGIN
		UPDATE [dbo].[FCAPROGDAT015 ]
		SET [Descripcion] = @Descripcion
			,[Cantidad] = @Cantidad
			,[Usuario] = @Usuario
		WHERE Codigo = @Codigo
	END -- editar variacion

	IF @Opcion = 3
	BEGIN
		IF (
				SELECT COUNT(*)
				FROM [dbo].[FCAPROGDAT009]
				) = 0
		BEGIN
			INSERT INTO [dbo].[FCAPROGDAT009] (
				[Id]
				,[ResistenciasAfines]
				,[RefileMaximo]
				,[RefileMinimo]
				,[DiasAdelanto]
				,[TodosAnchos]
				,[AnchoCalculo]
				,[LargoMinimo]
				,[Excedente]
				,[Scores]
				)
			VALUES (
				1
				,@ResistenciasAfines
				,@RefileMaximo
				,@RefileMinimo
				,@DiasAdelanto
				,@TodosAnchos
				,@AnchoCalculo
				,@LargoMinimo
				,@Excedente
				,@Scores
				)
		END
		ELSE
		BEGIN
			UPDATE [dbo].[FCAPROGDAT009]
			SET [AnchoCalculo] = @AnchoCalculo
				,Excedente = @Excedente
				,[DiasAdelanto] = @DiasAdelanto
				,[LargoMinimo] = @LargoMinimo
				,[RefileMaximo] = @RefileMaximo
				,[RefileMinimo] = @RefileMinimo
				,Scores = @Scores
				,[ResistenciasAfines] = @ResistenciasAfines
				,[TodosAnchos] = @TodosAnchos
		END 
	END -- Agregar Parametros
END
