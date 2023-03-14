USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG015MWSPA9]    Script Date: 20/10/2022 08:37:40 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG015MWSPA9]
	@pNextPrograma INT						= NULL
	, @pZonaERP	VARCHAR(2)					= NULL
	, @pUsuarioERP VARCHAR(6)				= NULL
	, @pModulo VARCHAR(30)					= NULL
AS
BEGIN
	SET NOCOUNT ON;

	IF ISNULL(@pZonaERP, '') = '01'
	BEGIN
		UPDATE Cajas01..CmoDat012 SET
			[Kg Papel] = 
				-- Llama a una función para calcular kilogramos de Papel Liner (papel liner con flauta en null)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L1], B.Liner1, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L2], B.Liner2, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L3], B.Liner3, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L4], B.Liner4, NULL) +
				-- Llama a una función para calcular kilogramos de Empalme Papel Liner (papel liner con flauta en null)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme1], B.Empalme1, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme2], B.Empalme2, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme3], B.Empalme3, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme4], B.Empalme4, NULL) +
				-- Llama a una función para calcular kilogramos de Papel Corrugado (papel corrugado con flauta)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C1], B.Corrugado1, B.Flauta1) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C2], B.Corrugado2, B.Flauta2) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C3], B.Corrugado3, B.Flauta3) +
				-- Llama a una función para calcular kilogramos de Empalme Papel Corrugado (papel corrugado con flauta)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C1], B.[Empalme C1], B.Flauta1) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C2], B.[Empalme C2], B.Flauta2) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C3], B.[Empalme C3], B.Flauta3),
			ModuloUpdate = @pModulo,
			FechaUpdate = GETDATE(),
			UsuarioUpdate = @pUsuarioERP
		FROM Cajas01..CmoDat012 A
		JOIN Cajas01..CmoDat014 B ON A.Programa = B.Programa
		WHERE A.Programa = ISNULL(@pNextPrograma, 0);
	END
	ELSE IF ISNULL(@pZonaERP, '') = '02'
	BEGIN
		UPDATE Cajas02..CmoDat012 SET
			[Kg Papel] = 
				-- Llama a una función para calcular kilogramos de Papel Liner (papel liner con flauta en null)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L1], B.Liner1, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L2], B.Liner2, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L3], B.Liner3, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L4], B.Liner4, NULL) +
				-- Llama a una función para calcular kilogramos de Empalme Papel Liner (papel liner con flauta en null)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme1], B.Empalme1, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme2], B.Empalme2, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme3], B.Empalme3, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme4], B.Empalme4, NULL) +
				-- Llama a una función para calcular kilogramos de Papel Corrugado (papel corrugado con flauta)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C1], B.Corrugado1, B.Flauta1) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C2], B.Corrugado2, B.Flauta2) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C3], B.Corrugado3, B.Flauta3) +
				-- Llama a una función para calcular kilogramos de Empalme Papel Corrugado (papel corrugado con flauta)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C1], B.[Empalme C1], B.Flauta1) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C2], B.[Empalme C2], B.Flauta2) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C3], B.[Empalme C3], B.Flauta3),
			ModuloUpdate = @pModulo,
			FechaUpdate = GETDATE(),
			UsuarioUpdate = @pUsuarioERP
		FROM Cajas02..CmoDat012 A
		JOIN Cajas02..CmoDat014 B ON A.Programa = B.Programa
		WHERE A.Programa = ISNULL(@pNextPrograma, 0);
	END
	ELSE IF ISNULL(@pZonaERP, '') = '05'
	BEGIN
		UPDATE Cajas05..CmoDat012 SET
			[Kg Papel] = 
				-- Llama a una función para calcular kilogramos de Papel Liner (papel liner con flauta en null)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L1], B.Liner1, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L2], B.Liner2, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L3], B.Liner3, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho L4], B.Liner4, NULL) +
				-- Llama a una función para calcular kilogramos de Empalme Papel Liner (papel liner con flauta en null)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme1], B.Empalme1, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme2], B.Empalme2, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme3], B.Empalme3, NULL) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme4], B.Empalme4, NULL) +
				-- Llama a una función para calcular kilogramos de Papel Corrugado (papel corrugado con flauta)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C1], B.Corrugado1, B.Flauta1) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C2], B.Corrugado2, B.Flauta2) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho C3], B.Corrugado3, B.Flauta3) +
				-- Llama a una función para calcular kilogramos de Empalme Papel Corrugado (papel corrugado con flauta)
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C1], B.[Empalme C1], B.Flauta1) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C2], B.[Empalme C2], B.Flauta2) +
				dbo.FCAPROGFUN002(@pZonaERP, A.[Metros Lineales], B.[Ancho Empalme C3], B.[Empalme C3], B.Flauta3),
			ModuloUpdate = @pModulo,
			FechaUpdate = GETDATE(),
			UsuarioUpdate = @pUsuarioERP
		FROM Cajas05..CmoDat012 A
		JOIN Cajas05..CmoDat014 B ON A.Programa = B.Programa
		WHERE A.Programa = ISNULL(@pNextPrograma, 0);
	END

	SET NOCOUNT OFF;
END
GO


