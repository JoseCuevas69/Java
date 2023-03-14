USE [FcaCajas05]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG004RSSPC1]    Script Date: 27/04/2022 11:41:21 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		EML
-- Create date: 27/04/2022
-- Description:	SP para la generacion del reporte de programas de produccion - FCAPROG004RS.
--				Tiene dos opciones la cuales se manejan por el filtro de Justificacion
--				el cual es mandado desde el reporte y actualiza la consulta para agregar unos joins de justificacion a la consulta principal
-- =============================================
CREATE PROCEDURE [dbo].[FCAPROG004RSSPC1]
	@Accion					AS INT	= NULL,
	@FechaIni				AS date  = NULL,
	@FechaFin				AS date = NULL,
	@UltimoP				AS bit	= NULL,
	@UltimoPFiltro			AS NVARCHAR(MAX) = NULL,
	@Tipo					AS INT	= NULL,
	@TipoFiltro				AS NVARCHAR(MAX) = NULL,
	@Validacion             AS VARCHAR(200) = NULL,
	@Justificacion          AS bit  = NULL,
	@JustificacionJoin		AS NVARCHAR(MAX) = NULL,
	@JustificacionOrder     AS NVARCHAR(MAX) = NULL,
	@JustificacionSelect    AS NVARCHAR(MAX) = NULL,
	@Query					AS NVARCHAR(MAX) = NULL
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
			SET @TipoFiltro = ''
	       IF @Tipo	= 2 BEGIN SET @TipoFiltro = ' AND a.op like '''+ @Validacion +'%''' END
           IF @Tipo	= 3 BEGIN  SET @TipoFiltro = ' AND a.[clave maquina] like '''+ @Validacion +'%''' END
		   IF @Tipo	= 4 BEGIN  SET @TipoFiltro = ' AND b.[clave articulo] like '''+ @Validacion +'%''' END  
		   

	DECLARE @tblTmpfull as table (op varchar(10),cantidad int,clavemaquina varchar(10),programa varchar(10),fechaprograma date,descripcion varchar(80), ultimoproceso varchar(2),clavearticulo varchar(30), OPPrograma varchar(50),Justificacion char(200), FechaJustificacion date,Usuario char(200),FCPRJUCAPRDescripcion char(200) )
	DECLARE @tblTmp     as table (op varchar(10),cantidad int,clavemaquina varchar(10),programa varchar(10),fechaprograma date,descripcion varchar(80), ultimoproceso varchar(2),clavearticulo varchar(30), OPPrograma varchar(50) )
	IF @Justificacion = 0 BEGIN
		 IF @UltimoP			    = 1 BEGIN SET @UltimoPFiltro = ' AND a.[ultimo proceso]= 1 '  END
		   ELSE BEGIN SET @UltimoPFiltro = '' END
		   
		  IF @Justificacion = 1
			BEGIN
			
				SET @JustificacionJoin = 'JOIN Cajas05..CmoDat231 d      LEFT JOIN Capacitacion01..Empleados e ON e.Clave = d.UsuarioERP       LEFT JOIN Capacitacion02..Empleados f  ON f.Clave = d.UsuarioERP   ON d.Programa = a.Programa AND d.Estatus = 0    LEFT join gxCajas01..FCPG011CT g on d.FCPRJUCAPRId = g.FCPRJUCAPRId '
				SET @JustificacionOrder = ' , d.FechaAct '
				SET @JustificacionSelect = ',d.Justificacion, d.FechaAct AS FechaJustificacion,  ISNULL(e.Nombre, f.Nombre) AS Usuario,g.FCPRJUCAPRDescripcion '
			END
			ELSE 
			BEGIN 
			
				SET @JustificacionJoin = ''
				SET @JustificacionOrder = ''
				SET @JustificacionSelect = ''
			END

		SET @Query = N' SELECT a.op,a.cantidad,a.[clave maquina],a.programa,a.[fecha programa],c.descripcion, a.[ultimo proceso], b.[clave articulo], a.OP + CAST( a.Programa AS VARCHAR) AS OPPrograma 
		from Cajas05..cmodat020 a 
			JOIN Cajas05..Cmodat011 b on a.op=b.op 
			JOIN Cajas05..CmoTjCat004 c ON b.[clave articulo] = c.[clave articulo] 
		WHERE a.[fecha programa] BETWEEN ''' + convert(varchar,@FechaIni,112)+ ' 00:00:00' + ''' AND ''' + convert(varchar,@FechaFin,112)+ ' 23:59:59' + ''' '+ @UltimoPFiltro +' '+ @TipoFiltro +' ORDER BY  a.op,a.programa '
		
		 
			--SELECT @TipoFiltro
			--SELECT @Query
				INSERT INTO @tblTmp (op ,cantidad ,clavemaquina ,programa ,fechaprograma ,descripcion , ultimoproceso ,clavearticulo , OPPrograma)
				EXEC (@Query)
				SELECT * FROM @tblTmp
		
		
		--INSERT INTO @tblTmp (op ,cantidad ,clavemaquina ,programa ,fechaprograma ,descripcion , ultimoproceso ,clavearticulo , OPPrograma)
		--EXEC (@Query)

		
	END
	IF @Justificacion = 1 BEGIN
		 IF @UltimoP			    = 1 BEGIN SET @UltimoPFiltro = ' AND a.[ultimo proceso]= 1 '  END
		   ELSE BEGIN SET @UltimoPFiltro = '' END
		   
		  IF @Justificacion = 1
			BEGIN
			
				SET @JustificacionJoin = 'JOIN Cajas05..CmoDat231 d      LEFT JOIN Capacitacion01..Empleados e ON e.Clave = d.UsuarioERP       LEFT JOIN Capacitacion02..Empleados f  ON f.Clave = d.UsuarioERP   ON d.Programa = a.Programa AND d.Estatus = 0    LEFT join gxCajas01..FCPG011CT g on d.FCPRJUCAPRId = g.FCPRJUCAPRId '
				SET @JustificacionOrder = ' , d.FechaAct '
				SET @JustificacionSelect = ',d.Justificacion, d.FechaAct AS FechaJustificacion,  ISNULL(e.Nombre, f.Nombre) AS Usuario,g.FCPRJUCAPRDescripcion '
			END
			ELSE 
			BEGIN 
			
				SET @JustificacionJoin = ''
				SET @JustificacionOrder = ''
				SET @JustificacionSelect = ''
			END

		SET @Query = N' SELECT a.op,a.cantidad,a.[clave maquina],a.programa,a.[fecha programa],c.descripcion, a.[ultimo proceso], b.[clave articulo], a.OP + CAST( a.Programa AS VARCHAR) AS OPPrograma 
			   '+ @JustificacionSelect +'
		from Cajas05..cmodat020 a 
			JOIN Cajas05..Cmodat011 b on a.op=b.op 
			JOIN Cajas05..CmoTjCat004 c ON b.[clave articulo] = c.[clave articulo] 
			'+ @JustificacionJoin +'
		WHERE a.[fecha programa] BETWEEN ''' + convert(varchar,@FechaIni,112)+ ' 00:00:00'  + ''' AND ''' + convert(varchar,@FechaFin,112)+ ' 23:59:59'  + ''' '+ @UltimoPFiltro +' '+ @TipoFiltro +' ORDER BY  a.op,a.programa '+ @JustificacionOrder +' '
		
		 
				INSERT INTO @tblTmpfull (op ,cantidad ,clavemaquina ,programa ,fechaprograma ,descripcion , ultimoproceso ,clavearticulo , OPPrograma ,Justificacion , FechaJustificacion ,Usuario ,FCPRJUCAPRDescripcion)
				EXEC (@Query)
				SELECT * FROM @tblTmpfull
				--SELECT @Query
				--SELECT @TipoFiltro
		
		--INSERT INTO @tblTmp (op ,cantidad ,clavemaquina ,programa ,fechaprograma ,descripcion , ultimoproceso ,clavearticulo , OPPrograma)
		--EXEC (@Query)

		
	END
	
END

