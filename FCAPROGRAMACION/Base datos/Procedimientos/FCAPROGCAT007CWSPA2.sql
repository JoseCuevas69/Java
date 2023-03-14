USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT007CWSPA2]    Script Date: 07/03/2022 04:26:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




/*
	Realizado por : EML
	Fecha de Creación : 16/11/2021
	Objetivo : Administracion de flautas.

	Funcionalidad :

		Opcion 1 = Registro de Flautas 
										FCAPROGCAT007
		Opcion 2 = Actualizacion de Flautas 
										FCAPROGCAT007
		Opcion 3 = Eliminar de Flautas 
										FCAPROGCAT007

*/

ALTER PROC [dbo].[FCAPROGCAT007CWSPA2]
	  @Opcion		TINYINT
	, @Filtro		VARCHAR(20)		= NULL
	, @startRow		INT				= 0
	, @endRow		INT				= NULL
	, @FiltroUN		VARCHAR(50)		= NULL
	,@TotalRegistros int = NULL
	,@Flauta		VARCHAR(3)		= NULL
	,@Factor1		real			= NULL
	,@Factor2		real			= NULL
	,@Factor3		real			= NULL
	,@Pegamento		real			= NULL
	,@Corrugado		VARCHAR(3)		= NULL
	,@LaminasMT		real			= NULL
	,@piezaspulgadas decimal(9,2)	= NULL
	,@factormts		decimal(6,4)	= NULL
	,@Usuario		VARCHAR(6)		= NULL
	,@Valida		int				= NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN	
		--SET @factormts = (@factormts/0.72571) 
		SELECT @Valida = count(Flauta) from FCAPROGCAT007 where Flauta = @Flauta AND EsActivo = 1
		IF @Valida = 0
		BEGIN
			INSERT INTO FCAPROGCAT007 ( Flauta,Factor1,Factor2,Factor3,Pegam,Corrugado,LaminasMT,FactorMtsCubicos,PiezasPulgada,UsuarioInsert,FechaInsert,EsActivo,AlturaCalcPallet,FlautaProgramar,MostrarEnSolMultiple)
			Values					  (@Flauta,@Factor1,@Factor2,@Factor3,@Pegamento,@Corrugado,@LaminasMT,@factormts,@piezaspulgadas,@Usuario,GETDATE(),1,0,0,0)	
		END 
		 SELECT @Valida as valida
	END
	IF @Opcion = 2
	BEGIN	
		Update FCAPROGCAT007 SET 
		 Factor1=@Factor1,
		 Factor2=@Factor2,
		 Factor3=@Factor3,
		 Pegam=@Pegamento,
		 Corrugado=@Corrugado,
		 LaminasMT=@LaminasMT,
		 PiezasPulgada = @piezaspulgadas ,
		 FactorMtsCubicos = @factormts,
		 UsuarioUpdate=@Usuario,
		 FechaUpdate=GETDATE()
		where Flauta = @Flauta
	END
	IF @Opcion = 3
	BEGIN	
		Update FCAPROGCAT007 SET 
		 UsuarioUpdate=@Usuario,
		 FechaUpdate=GETDATE(),
		 EsActivo = 0
		where Flauta = @Flauta
	END
	
END
