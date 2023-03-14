﻿USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC14]    Script Date: 20/10/2022 08:40:07 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC14]
	@Opcion INT					= NULL
	, @pZonaERP VARCHAR(2)		= NULL
	, @pData CPLDAT009TD_001	READONLY
AS 
BEGIN
	SET NOCOUNT ON;

	BEGIN TRANSACTION
	BEGIN TRY
		-- CANCELAR OPS CANCELADAS POR EL USUARIO
		IF @Opcion = 1
		BEGIN
			UPDATE CplDat004 SET 
				Utilizar = 0
			FROM CplDat004 A
			JOIN @pData B ON A.[Orden Produccion] = B.OP
			WHERE B.Cancelar = 1;

			SELECT 'OK' AS Message;
		END
		-- ACTUALIZAR ANCHOS STD SELECCIONADOS POR EL USUARIO (VALIDAR ARREGLO)
		ELSE IF @Opcion = 2
		BEGIN
			UPDATE CplDat009 SET 
				AnchoStd = B.AnchoStd
			FROM CPLDAT009 A
			JOIN @pData B ON A.ID = B.ID;

			SELECT 'OK' AS Message;
		END

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		SELECT ERROR_MESSAGE() AS Message, ERROR_LINE() AS ErrorLine;
	END CATCH
	SET NOCOUNT ON;
END
GO


