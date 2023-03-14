USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG012MWSPC1]    Script Date: 19/10/2022 03:57:01 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG012MWSPC1]
	@Opcion	INT						= NULL
AS BEGIN
	IF @Opcion = 1
	BEGIN
		;WITH tmp AS (
			SELECT CONVERT(VARCHAR, CONVERT(MONEY, (CASE WHEN A.IdUnidad = 1 THEN ROUND(A.Ancho,2) ELSE ROUND((A.Ancho*2.54),2) END)), 1) AS Anchura
				, CONVERT(VARCHAR, CONVERT(MONEY, (CASE WHEN A.IdUnidad = 1 THEN ROUND(A.Ancho,2) ELSE ROUND((A.Ancho*2.54),2) END) / 2.54), 1) AS Pulgadas
				, 5 AS Extra
			FROM /*[DELL-2003].*/Papel04.dbo.PapDat005 A
			WHERE (CASE WHEN A.IdUnidad = 1 THEN ROUND(A.Ancho,2) ELSE ROUND((A.Ancho*2.54),2) END) NOT IN(SELECT ROUND(B.Ancho,2) FROM CplDat003 B)
				AND A.IdPrograma > 50
			GROUP BY (CASE WHEN A.IdUnidad = 1 THEN ROUND(A.Ancho,2) ELSE ROUND((A.Ancho*2.54),2) END)
		)
		SELECT Anchura, Pulgadas, Extra
		FROM tmp
		ORDER BY Anchura
	END
END

GO


