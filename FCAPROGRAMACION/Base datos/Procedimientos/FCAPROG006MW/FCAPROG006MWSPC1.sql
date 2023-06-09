USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG006MWSPC1]    Script Date: 24/03/2022 12:30:26 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Marco Borbón V.
-- Create date: 11/01/2022
-- Description:	DISPONIBILIDAD DE MÁQUINAS
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROG006MWSPC1] @Opcion INT
	,@anio INT = NULL
	,@mes INT = NULL
	,@ClaveMaquina VARCHAR(5) = NULL
	,@ClaveMaquinaDestino VARCHAR(5) = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		DECLARE @TblFechas TABLE (
			rownum INT
			,Fecha DATE
			)
		DECLARE @fechaSig DATE = NULL
		DECLARE @fechaAct DATE = dateFromParts(@anio, @mes, 1)
		DECLARE @day INT

		SET @day = DAY(EOMONTH(@fechaAct))
		SET @fechaSig = Dateadd(day, Day(@day - 1), @fechaAct);;

		WITH c1
		AS (
			SELECT tbl.n
			FROM (
				VALUES (1)
					,(1)
					,(1)
					,(1)
					,(1)
					,(1)
					,(1)
					,(1)
				) tbl(n)
			)
			,c2
		AS (
			SELECT 1 AS c
			FROM c1
			CROSS JOIN c1 AS t
			)
			,c3
		AS (
			SELECT 1 AS c
			FROM c2
			CROSS JOIN c2 AS t
			)
			,c4
		AS (
			SELECT 1 AS c
			FROM c3
			CROSS JOIN c3 AS t
			)
			,Nums
		AS (
			SELECT ROW_NUMBER() OVER (
					ORDER BY (
							SELECT NULL
							)
					) AS rownum
			FROM c4
			)
			,interval
		AS (
			SELECT TOP (DATEDIFF(day, @fechaAct, @fechaSig) - 1 + 1) 1 + rownum - 1 AS n
			FROM Nums
			)
		INSERT INTO @TblFechas
		SELECT ROW_NUMBER() OVER (
				ORDER BY (DATEADD(day, n - 1, @fechaAct))
				) AS rownum
			,DATEADD(day, n - 1, @fechaAct) AS fecha
		FROM interval

		SELECT DATENAME(dw, t1.Fecha) AS DiaLetra
			,DAY(t1.fecha) AS Dia
			,CONVERT(VARCHAR, t1.Fecha, 103) AS Fecha
			,a.Turnos
		FROM @TblFechas t1
		LEFT JOIN FCaCajas01..FCAPROGDAT017 a ON t1.Fecha = a.Fecha
			AND a.ClaveMaquina = @ClaveMaquina
			AND Estatus = 1

		SELECT COUNT(*)
		FROM FCaCajas01..FCAPROGDAT017
		WHERE YEAR(Fecha) = @anio
			AND MONTH(Fecha) = @mes
			AND ClaveMaquina = @ClaveMaquina
			AND Estatus = 1
	END

	IF @Opcion = 2
	BEGIN
		SELECT TipoMaquina
			,ClaveMaquina
			,Nombre
		FROM FCAPROGCAT008
		WHERE Estatus = 1
		ORDER BY Nombre
	END -- Maquina

	IF @Opcion = 3
	BEGIN
		SELECT COUNT(*)
		FROM FCaCajas01..FCAPROGDAT017
		WHERE YEAR(Fecha) = @anio
			AND MONTH(Fecha) = @mes
			AND ClaveMaquina = @ClaveMaquina
			AND Estatus = 1

			SELECT COUNT(*)
		FROM FCaCajas01..FCAPROGDAT017
		WHERE YEAR(Fecha) = @anio
			AND MONTH(Fecha) = @mes
			AND ClaveMaquina = @ClaveMaquinaDestino
			AND Estatus = 1
	END -- validar datos copia
END
