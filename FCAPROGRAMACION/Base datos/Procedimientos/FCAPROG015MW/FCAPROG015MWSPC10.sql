USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPC10]    Script Date: 20/10/2022 08:38:05 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPC10]
	@pZonaERP VARCHAR(2)			= NULL
AS 
BEGIN
	SET NOCOUNT ON;
	BEGIN TRANSACTION
	BEGIN TRY
		IF ISNULL(@pZonaERP, '') = '01'
		BEGIN
			UPDATE CplDat009
				SET ConScore = ISNULL(C.ConScore, 0),
					ConScore2 = ISNULL(E.ConScore, 0),
					ConScore3 = ISNULL(G.ConScore, 0)
			FROM CplDat009 A
			LEFT JOIN Cajas01..CmoDat011 B ON A.OP1 = B.OP
			LEFT JOIN Cajas01..CmoTjCat004 C ON B.[Clave Articulo] = C.[Clave Articulo]
			LEFT JOIN Cajas01..CmoDat011 D ON A.OP2 = D.OP
			LEFT JOIN Cajas01..CmoTjCat004 E ON D.[Clave Articulo] = E.[Clave Articulo]
			LEFT JOIN Cajas01..CmoDat011 F ON A.OP3 = F.OP
			LEFT JOIN Cajas01..CmoTjCat004 G ON F.[Clave Articulo] = G.[Clave Articulo]
		END 
		ELSE IF ISNULL(@pZonaERP, '') = '02'
		BEGIN
			UPDATE CplDat009
				SET ConScore = ISNULL(C.ConScore, 0),
					ConScore2 = ISNULL(E.ConScore, 0),
					ConScore3 = ISNULL(G.ConScore, 0)
			FROM CplDat009 A
			LEFT JOIN Cajas02..CmoDat011 B ON A.OP1 = B.OP
			LEFT JOIN Cajas02..CmoTjCat004 C ON B.[Clave Articulo] = C.[Clave Articulo]
			LEFT JOIN Cajas02..CmoDat011 D ON A.OP2 = D.OP
			LEFT JOIN Cajas02..CmoTjCat004 E ON D.[Clave Articulo] = E.[Clave Articulo]
			LEFT JOIN Cajas02..CmoDat011 F ON A.OP3 = F.OP
			LEFT JOIN Cajas02..CmoTjCat004 G ON F.[Clave Articulo] = G.[Clave Articulo]
		END 
		ELSE IF ISNULL(@pZonaERP, '') = '05'
		BEGIN
			UPDATE CplDat009
				SET ConScore = ISNULL(C.ConScore, 0),
					ConScore2 = ISNULL(E.ConScore, 0),
					ConScore3 = ISNULL(G.ConScore, 0)
			FROM CplDat009 A
			LEFT JOIN Cajas05..CmoDat011 B ON A.OP1 = B.OP
			LEFT JOIN Cajas05..CmoTjCat004 C ON B.[Clave Articulo] = C.[Clave Articulo]
			LEFT JOIN Cajas05..CmoDat011 D ON A.OP2 = D.OP
			LEFT JOIN Cajas05..CmoTjCat004 E ON D.[Clave Articulo] = E.[Clave Articulo]
			LEFT JOIN Cajas05..CmoDat011 F ON A.OP3 = F.OP
			LEFT JOIN Cajas05..CmoTjCat004 G ON F.[Clave Articulo] = G.[Clave Articulo]
		END

		--SELECT 'FCAPROG015MWSPC10' AS Proceso, 'OK' AS Mensaje;
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
	END CATCH
	SET NOCOUNT OFF;
END
GO


