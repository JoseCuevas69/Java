USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPA2]    Script Date: 20/10/2022 08:30:02 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPA2]
	@Opcion INT						= NULL,
	@ZonaERP VARCHAR(2)				= NULL,
	@IdArreglo INT					= NULL,
	@Secuencia INT					= NULL,
	@OP VARCHAR(10)					= NULL,
	@Valor BIT						= NULL
AS 
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY
		-- ACTUALIZAR ARREGLOS OPTIMOS (SCOR)
		IF @Opcion = 1
		BEGIN
			UPDATE CplDat009 SET 
				ConScore = CASE WHEN @Secuencia = 1 THEN @Valor ELSE ConScore END,
				ConScore2 = CASE WHEN @Secuencia = 2 THEN @Valor ELSE ConScore2 END,
				ConScore3 = CASE WHEN @Secuencia = 3 THEN @Valor ELSE ConScore3 END
			WHERE ID = @IdArreglo
				AND (
					OP1 = @OP OR OP2 = @OP OR OP3 = @OP
				)
			
			IF ISNULL(@ZonaERP, '') = '01'
			BEGIN
				UPDATE Cajas01..CmoTjCat004 SET 
					ConScore = @Valor
				FROM Cajas01..CmoTjCat004 A
				JOIN Cajas01..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
				WHERE B.OP = @OP
			END 
			ELSE IF ISNULL(@ZonaERP, '') = '02'
			BEGIN
				UPDATE Cajas02..CmoTjCat004 SET 
					ConScore = @Valor
				FROM Cajas02..CmoTjCat004 A
				JOIN Cajas02..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
				WHERE B.OP = @OP
			END 
			ELSE IF ISNULL(@ZonaERP, '') = '05'
			BEGIN
				UPDATE Cajas05..CmoTjCat004 SET 
					ConScore = @Valor
				FROM Cajas05..CmoTjCat004 A
				JOIN Cajas05..CmoDat011 B ON A.[Clave Articulo] = B.[Clave Articulo]
				WHERE B.OP = @OP
			END
		END

		COMMIT TRANSACTION;
		SELECT 1 AS Id, 'OK' AS Message;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		SELECT 0 AS Id, ERROR_MESSAGE() AS Message;
	END CATCH
END
GO


