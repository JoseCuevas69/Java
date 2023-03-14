USE [FcaCajas01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROGCAT007CWSPC1]    Script Date: 07/03/2022 04:27:24 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





/*
	Realizado por : EML
	Fecha de Creación : 16/11/2021
	Objetivo : Consultar Flautas.

	Funcionalidad :

		Opcion 1 = Consultar Flautas de cmocat015
										FCAPROGCAT007

*/

CREATE PROC [dbo].[FCAPROGCAT007CWSPC1]
	  @Opcion		TINYINT
	, @Filtro		VARCHAR(20)		= NULL
	, @startRow		INT				= 0
	, @endRow		INT				= NULL
	, @FiltroUN		VARCHAR(50)		= NULL
	,@TotalRegistros int = NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN	
		
	SELECT @TotalRegistros = COUNT(*) FROM FCAPROGCAT007 
	where EsActivo = 1 AND flauta LIKE '%' + ISNULL(@Filtro, '') + '%'

		SELECT Flauta,Factor1,Factor2,Factor3,Pegam as Pegamento,Corrugado,LaminasMT,
		CASE WHEN FactorMtsCubicos <> 0 AND PiezasPulgada <> 0 then ROUND(((2.54/PiezasPulgada)/100),5) else  ROUND(FactorMtsCubicos,5) END as factormts,
		PiezasPulgada as piezaspulgadas 
		FROM FCAPROGCAT007 A
		where EsActivo = 1 AND flauta LIKE '%' + ISNULL(@Filtro, '') + '%'
		ORDER BY Flauta ASC
		OFFSET @startRow ROWS
		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY

		SELECT @TotalRegistros AS TotalRegistros
		--AND 
		--EsActivo = 1		
	END
	IF @Opcion = 2
	BEGIN	
		SELECT [Clave Corrugado] as corrugado from costos01..coscat018 
		order by [Clave Corrugado]
	END
	
END

GO


