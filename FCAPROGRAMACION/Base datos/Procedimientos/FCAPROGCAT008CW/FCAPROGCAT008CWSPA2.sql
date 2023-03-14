USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROGCAT008CWSPA2]    Script Date: 26/03/2022 08:07:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Higuera
-- Create date: 26/03/2022
-- Description:	Sp utilizado en FCAPROG008CW
-- =============================================
ALTER PROCEDURE [dbo].[FCAPROGCAT008CWSPA2]
	-- Add the parameters for the stored procedure here
    @Opcion AS INT ,
	--@TablaMaquina FCAPROGCAT008TD001 READONLY
	@TipoMaquina char(2)= NULL ,
	@ClaveMaquina nvarchar(5)= NULL, 
	@Nombre nvarchar(40)= NULL ,
	@Troquela bit= NULL ,
	@TintasMax tinyint= NULL, 
	@AnchoMax numeric(18, 2) = NULL,
	@AnchoMaxT numeric(18, 2)= NULL ,
	@AnchoMaxAlt numeric(18, 2)= NULL ,
	@AnchoMin numeric(18, 2)= NULL ,
	@LargoMax numeric(18, 2) = NULL,
	@LargoMaxT numeric(18, 2)= NULL ,
	@LargoMin numeric(18, 2)= NULL ,
	@CostoMinuto money = NULL,
	@CapacidadSemanal int= NULL, 
	@SalariosTurno money= NULL ,
	@Desp1000 money= NULL ,
	@Desp10000 money= NULL ,
	@DespMayor10000 money= NULL, 
	@M2Hora decimal(18, 0)= NULL, 
	@Eficiencia decimal(9, 4)= NULL, 
	@Tproceso tinyint= NULL ,
	@Default bit = NULL,
	@CodEvaluacion int= NULL, 
	@MinStd smallint= NULL ,
	@TurnosxDia tinyint= NULL, 
	@EvaluaMtto bit= NULL ,
	@PorcenEvaluaMtto decimal(6, 2) = NULL ,
	@UsuarioERP char(6)= NULL,
	@Desperdicios FCAPRODDAT003TD001 READONLY,
	@Tripulaciones FCAPRODDAT005TD001 READONLY,
	@CambioEficiencia BIT = NULL,
	@CambioCodEvaluacion BIT = NULL

	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	--DECLARE @ClaveMaquina  CHAR(5)=''
    IF @Opcion = 1
	BEGIN
	--set @ClaveMaquina='na'
		--SELECT @ClaveMaquina= ClaveMaquina FROM  @TablaMaquina
		IF EXISTS(SELECT ClaveMaquina FROM FCAPROGCAT008 WHERE ClaveMaquina=@ClaveMaquina)
		BEGIN
			UPDATE  FCAPROGCAT008 
			SET 
			TipoMaquina= @TipoMaquina, 
			nombre= @nombre,
			troquela= @troquela, 
			tintasmax= @tintasmax,
			anchomax= @anchomax, 
			anchomaxt=@anchomaxt,
			anchomaxalt=@anchomaxalt, 
			anchomin=@anchomin,
			largomax=@largomax, 
			largomaxt=@largomaxt,
			largomin=@largomin, 
			costominuto=@costominuto,
			capacidadsemanal=@capacidadsemanal,
			salariosturno=@salariosturno,
			Eficiencia=@Eficiencia,
			[m2hora]=@m2hora , 
			tProceso =@tProceso , 
			MinStd =@MinStd, 
			CodEvaluacion = CONVERT(CHAR(2), @CodEvaluacion) , 
			TurnosxDia =@TurnosxDia  , 
			EvaluaMtto =@EvaluaMtto ,
			PorcenEvaluaMtto =@PorcenEvaluaMtto   , 
			[Default] =@Default,
			UsuarioUpdate=@UsuarioERP,
			FechaUpdate=GETDATE()
			WHERE ClaveMaquina=@ClaveMaquina
			
			

		END
		ELSE
		BEGIN
			INSERT FCAPROGCAT008 ([tipomaquina],[clavemaquina],nombre,troquela,tintasmax,anchomax,anchomaxt,anchomaxalt,anchomin,largomax,largomaxt,largomin,costominuto,capacidadsemanal,salariosturno,desp1000,desp10000,despmayor10000,[m2hora],Eficiencia, tProceso, [Default], CodEvaluacion, MinStd, TurnosxDia, EvaluaMtto, PorcenEvaluaMtto,UsuarioInsert,FechaInsert)
			VALUES( @tipomaquina,@clavemaquina,@nombre,@troquela,@tintasmax,@anchomax,@anchomaxt,@anchomaxalt,@anchomin,@largomax,@largomaxt,@largomin,@costominuto,@capacidadsemanal,@salariosturno,@desp1000,@desp10000,@despmayor10000,@m2hora,@Eficiencia, @tProceso, @Default,CONVERT(CHAR(2), @CodEvaluacion), @MinStd, @TurnosxDia, @EvaluaMtto, @PorcenEvaluaMtto,@UsuarioERP,GETDATE())
		END

		MERGE FCACAJAS..FCAPRODDAT003 t
		USING (SELECT * FROM @Desperdicios) s
		ON (s.ID=t.ID AND t.ClaveMAquina=@ClaveMaquina)
		WHEN NOT MATCHED BY TARGET THEN
		INSERT
		VALUES('01',@ClaveMaquina,s.RInicial,s.RFinal,s.Desperdicio,0,GETDATE(),@UsuarioERP,null,null,null,null)
		WHEN MATCHED  THEN
		UPDATE SET t.Rinicial=s.RInicial, t.RFinal=s.RFinal, t.Desperdicio=s.Desperdicio, t.UsuarioUpdate=@UsuarioERP, t.FechaUpdate=GETDATE(),t.Estatus=0
		WHEN NOT MATCHED BY SOURCE AND t.Estatus=0 AND t.ClaveMAquina=@ClaveMaquina THEN
		UPDATE SET t.Estatus=1 , t.FechaDelete=GETDATE(), t.UsuarioDelete=@UsuarioERP;

		MERGE FCAPRODDAT005 T
		USING (SELECT * FROM @Tripulaciones) s
		ON(t.idTripulacion=s.IdTripulacion and t.ClaveMaquina=@ClaveMaquina)
		WHEN NOT MATCHED BY TARGET THEN
		INSERT
		VALUES(s.IdTripulacion, @ClaveMaquina,0,GETDATE(),@UsuarioERP,null,null,null,null)
		WHEN MATCHED AND t.Estatus=1  THEN
		UPDATE SET t.Estatus=0 , t.FechaUpdate=getdate(), t.UsuarioUpdate=@UsuarioERP
		WHEN NOT MATCHED BY SOURCE AND t.Estatus=0 and t.ClaveMaquina=@ClaveMaquina THEN
		UPDATE SET t.Estatus=1, t.FechaDelete=getdate(), t.UsuarioDelete=@UsuarioERP;

		IF @CambioCodEvaluacion = 1
		BEGIN
			UPDATE FCAPRODDAT006 SET Estatus=1 WHERE ClaveMaquina=@ClaveMaquina
			UPDATE FCAPRODCAT010 SET Estatus=1 WHERE ClaveMaquina=@ClaveMaquina
		END
		--IF @CambioEficiencia = 1
		--BEGIN
		-- ESTA PENDIENTE FALTAN TABLAS Y ENVIO DE CORREO
		--END
	
	END
	IF @Opcion = 2
	BEGIN
		UPDATE FCAPROGCAT008 SET Estatus=1 , UsuarioDelete=@UsuarioERP,FechaDelete=GETDATE() WHERE ClaveMaquina=@ClaveMaquina
	END
	IF @Opcion = 3
	BEGIN
		DECLARE @Proceso INT = NULL
		DECLARE  @defaul bit =0
		SELECT @Default=[Default],@Proceso=Tproceso FROM FCAPROGCAT008 WHERE ClaveMaquina=@ClaveMaquina
		IF EXISTS(SELECT TOP 1 ClaveMaquina FROM FCAPROGCAT008 A JOIN FCAPROGCAT011 B ON A.Tproceso=B.TProceso
		WHERE A.Estatus=0 AND [Default]=1 AND A.ClaveMaquina<>@ClaveMaquina AND A.Tproceso=@Proceso)
		BEGIN
			SET @defaul=0
		END
		ELSE
		BEGIN
			SET @defaul=@Default
		END

		UPDATE FCAPROGCAT008 SET Estatus=0,[Default]=@defaul , UsuarioUpdate=@UsuarioERP,FechaUpdate=GETDATE() WHERE ClaveMaquina=@ClaveMaquina
	
	END
END
