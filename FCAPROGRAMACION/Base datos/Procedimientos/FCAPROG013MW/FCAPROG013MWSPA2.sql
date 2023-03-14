USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG013MWSPA2]    Script Date: 19/10/2022 03:58:50 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG013MWSPA2]
	@Opcion INT						= NULL
	, @ClaveProceso VARCHAR(10)		= NULL
	, @Usuario VARCHAR(6)			= NULL
	, @CplDat002 CPLDAT002TD_001	READONLY
	, @CplDat002_2 CPLDAT002TD_002	READONLY
AS BEGIN
	DECLARE @Orden INT;

	BEGIN TRANSACTION
	BEGIN TRY
		-- REGISTRAR
		IF @Opcion = 1
		BEGIN
			SELECT TOP 1 @Orden = Orden + 1 FROM CplDat002 ORDER BY Orden DESC;

			INSERT INTO CplDat002 (
				Orden, Pulg, Clave, Liner1, Corrugado1, Liner2, Corrugado2, Liner3, Corrugado3, Liner4
				, Empalme1, Empalme2, Empalme3, Empalme4, EmpalmeC1, EmpalmeC2, EmpalmeC3
				, AnchoL1, AnchoEmpalme1, AnchoL2, AnchoEmpalme2, AnchoL3, AnchoEmpalme3, AnchoL4, AnchoEmpalme4
				, AnchoC1, AnchoEmpalmeC1, AnchoC2, AnchoEmpalmeC2, AnchoC3, AnchoEmpalmeC3, Ancho
			)
			SELECT @Orden, Pulg, Clave, Liner1, Corrugado1, Liner2, Corrugado2, Liner3, Corrugado3, Liner4
				, Empalme1, Empalme2, Empalme3, Empalme4, EmpalmeC1, EmpalmeC2, EmpalmeC3
				, AnchoL1, AnchoEmpalme1, AnchoL2, AnchoEmpalme2, AnchoL3, AnchoEmpalme3, AnchoL4, AnchoEmpalme4
				, AnchoC1, AnchoEmpalmeC1, AnchoC2, AnchoEmpalmeC2, AnchoC3, AnchoEmpalmeC3, Ancho
			FROM @CplDat002

			UPDATE CplDat014 
				SET ClaveProceso = @ClaveProceso, Usuario = @Usuario, [Fecha Sistema] = GETDATE();

			SELECT 1 AS Id, 'Registrado correctamente' AS Message
		END
		-- MODIFICAR
		ELSE IF @Opcion = 2
		BEGIN
			UPDATE CplDat002
				SET Pulg = B.Pulg, Liner1 = B.Liner1, 
					Corrugado1 = B.Corrugado1, Liner2 = B.Liner2,
					Corrugado2 = B.Corrugado2, Liner3 = B.Liner3,
					Corrugado3 = B.Corrugado3, Liner4 = B.Liner4,
					Empalme1 = B.Empalme1, Empalme2 = B.Empalme2,
					Empalme3 = B.Empalme3, Empalme4 = B.Empalme4,
					EmpalmeC1 = B.EmpalmeC1, EmpalmeC2 = B.EmpalmeC2,
					EmpalmeC3 = B.EmpalmeC3,
					AnchoL1 = B.AnchoL1, AnchoEmpalme1 = B.AnchoEmpalme1,
					AnchoL2 = B.AnchoL2, AnchoEmpalme2 = B.AnchoEmpalme2,
					AnchoL3 = B.AnchoL3, AnchoEmpalme3 = B.AnchoEmpalme3,
					AnchoL4 = B.AnchoL4, AnchoEmpalme4 = B.AnchoEmpalme4,
					AnchoC1 = B.AnchoC1, AnchoEmpalmeC1 = B.AnchoEmpalmeC1,
					AnchoC2 = B.AnchoC2, AnchoEmpalmeC2 = B.AnchoEmpalmeC2,
					AnchoC3 = B.AnchoC3, AnchoEmpalmeC3 = B.AnchoEmpalmeC3,
					Ancho = B.Ancho
			FROM CplDat002 A
			JOIN @CplDat002 B ON A.Clave = B.Clave

			UPDATE CplDat014 
				SET ClaveProceso = @ClaveProceso, Usuario = @Usuario, [Fecha Sistema] = GETDATE();

			SELECT 1 AS Id, 'Modificado correctamente' AS Message
		END
		ELSE IF @Opcion = 3
		BEGIN
			-- ACTUALIZAR CAMPOS DE GRID PRINCIPAL
			UPDATE CplDat002 
				SET Usar = B.Usar
			FROM CplDat002 A
			JOIN @CplDat002_2 B ON A.Clave = B.Clave
		END	

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		SELECT 0 AS Id, ERROR_MESSAGE() AS Message
	END CATCH
END
GO


