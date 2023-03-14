USE [Cecsoplan02]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG017MWSPC4]    Script Date: 02/11/2022 01:47:02 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG017MWSPC4] 
	@ZonaERP VARCHAR(2)					= NULL
	, @OPs FCAPROG009CMP_FCAPROG013MW	READONLY
AS BEGIN
	IF ISNULL(@ZonaERP, '') = '01'
	BEGIN
		IF EXISTS (SELECT 1 FROM Cajas01..CmoDat217 WHERE EstatusInventario = 1)
		BEGIN
			EXEC Cajas01..CMOSP313 @Accion = 2, @OPs = @OPs
		END ELSE
		BEGIN
			IF EXISTS (SELECT 1 FROM @OPs A JOIN Cajas01..CmoTjDat002 B ON A.OP = B.Op WHERE Almacen IN ('053', '116'))
			BEGIN
				SELECT A.OP, SUM(ISNULL(B.Entradas, 0) - ISNULL(B.Salidas, 0)) AS SaldoOP
				FROM @OPs A
				JOIN Cajas01..CmoTjDat002 B ON A.OP = B.Op
				WHERE Almacen IN ('053', '116')
				GROUP BY A.OP
			END
		END
	END
	ELSE IF ISNULL(@ZonaERP, '') = '02'
	BEGIN
		IF EXISTS (SELECT 1 FROM Cajas02..CmoDat217 WHERE EstatusInventario = 1)
		BEGIN
			EXEC Cajas02..CMOSP313 @Accion = 2, @OPs = @OPs
		END ELSE
		BEGIN
			IF EXISTS (SELECT 1 FROM @OPs A JOIN Cajas02..CmoTjDat002 B ON A.OP = B.Op WHERE Almacen IN ('053', '116'))
			BEGIN
				SELECT A.OP, SUM(ISNULL(B.Entradas, 0) - ISNULL(B.Salidas, 0)) AS SaldoOP
				FROM @OPs A
				JOIN Cajas02..CmoTjDat002 B ON A.OP = B.Op
				WHERE Almacen IN ('053', '116')
				GROUP BY A.OP
			END
		END
	END
	ELSE IF ISNULL(@ZonaERP, '') = '05'
	BEGIN
		IF EXISTS (SELECT 1 FROM Cajas05..CmoDat217 WHERE EstatusInventario = 1)
		BEGIN
			EXEC Cajas05..CMOSP313 @Accion = 2, @OPs = @OPs
		END ELSE
		BEGIN
			IF EXISTS (SELECT 1 FROM @OPs A JOIN Cajas05..CmoTjDat002 B ON A.OP = B.Op WHERE Almacen IN ('053', '116'))
			BEGIN
				SELECT A.OP, SUM(ISNULL(B.Entradas, 0) - ISNULL(B.Salidas, 0)) AS SaldoOP
				FROM @OPs A
				JOIN Cajas05..CmoTjDat002 B ON A.OP = B.Op
				WHERE Almacen IN ('053', '116')
				GROUP BY A.OP
			END
		END
	END
END
GO


