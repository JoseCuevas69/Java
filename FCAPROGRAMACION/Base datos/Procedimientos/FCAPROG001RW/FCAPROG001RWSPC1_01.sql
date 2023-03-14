USE CecsoPlan01
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG010MWSPC1]    Script Date: 03/03/2022 11:43:16 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================  
-- Author: Manuel Valenzuela
-- Fecha: 20-Abril-2022
-- Se migro modulo CPLREP009 -> Reporte Verificador de Consumo Corrugadora
-- ==========================================================================================               
                --exec FCAPROG101MWSPC1 3
CREATE PROCEDURE [dbo].[FCAPROG001RWSPC1]    
     @Accion  INT = 0,
	 @ZonaERP VARCHAR(2) = '',
	 @FechaIni smalldatetime = NULL,
	 @FechaFin smalldatetime = NULL,
	 @OpcionTipoRolloSeleccionado VARCHAR(50) = NULL, -- RollosConsumidos, RollosOP, RollosOPTijuana
	 @chkTodosTurnos int = 0,
	 @Turno smallint = NULL,
	 @CodigoRollo VARCHAR(100) = NULL,
	 @Clase VARCHAR(20) = NULL,
	 @SubClase VARCHAR(20) = NULL,
	 @Ancho FLOAT = NULL,
	 @PesoInicial FLOAT = NULL,
	 @PesoInicio FLOAT = NULL,
	 @PesoFinal FLOAT = NULL,
	 @RadioFinal FLOAT = NULL,
	 @TipoOrdenacion VARCHAR(50) = NULL, -- [fecha de entrada], [Fecha Programada y OP], [Gramaje y ancho], [Programa OP #Rollo]
	 @ChkOps int = 0 -- Para calidar filtro de OPs

AS                
    
SET NOCOUNT ON            
    
	
	BEGIN TRY
	BEGIN TRAN
	

	DECLARE @rbReporte SMALLINT = 0 -- 1 = RollosConsumidos, 2 = RollosOP, 3 = RollosOPTijuana

	if @OpcionTipoRolloSeleccionado = 'RollosConsumidos' SET @rbReporte = 1
	if @OpcionTipoRolloSeleccionado = 'RollosOP' SET @rbReporte = 2
	if @OpcionTipoRolloSeleccionado = 'RollosOPTijuana' SET @rbReporte = 3


	 -- Clases
	 IF (@Accion=1)    
     BEGIN    
		 select Distinct CL from Admin04.dbo.AlmNvCat003  order by CL
     END    

	 -- Sub-Clases
	 IF (@Accion=2)    
     BEGIN    
		 select Distinct SCL from Admin04.DBO.AlmNvCat003  order by SCL
     END  
	 
	  -- Tripulaciones
	 IF (@Accion=3)    
     BEGIN    

		 declare @Tripulaciones as TABLE(id int, valor VARCHAR(2))
		 insert into @Tripulaciones(id, valor)values(0, '')
		 insert into @Tripulaciones(id, valor)values(1, '1')
		 insert into @Tripulaciones(id, valor)values(2, '2')
		 insert into @Tripulaciones(id, valor)values(3, '3')

		 select id, valor from @Tripulaciones

     END  


	 IF (@Accion=4)    
     BEGIN
	 
	 
		DECLARE @Query NVARCHAR(MAX) = '' 
		DECLARE @lFiltro VARCHAR(MAX) = ''
		DECLARE @lOrden VARCHAR(MAX) = ''

		DECLARE @FecIniCorta VARCHAR(10) = CONVERT(VARCHAR(10), @FechaIni, 103)
		DECLARE @FecFinCorta VARCHAR(10) = CONVERT(VARCHAR(10), @FechaIni, 103)
		DECLARE @FecFinSigDia VARCHAR(10) = CONVERT(VARCHAR(10), DATEADD(DAY ,1, @FechaFin), 103)


		--SELECT @FecIniCorta AS [@FecIniCorta], @FecFinCorta AS [@FecFinCorta], @FecFinSigDia AS [@FecFinSigDia]
	
		-- Server : [Dell-2003]
		IF (@OpcionTipoRolloSeleccionado = 'RollosOP')
			BEGIN
					
			
				DECLARE @Tmp1 AS TABLE(ConsumoTotal FLOAT)
				
				INSERT INTO @Tmp1(ConsumoTotal)
				SELECT SUM(ISNULL(Consumo,0)) AS ConsumoTotal From CplDat018 A  
				JOIN [Dell-2003].Admin04.dbo.AlmNvMov002 d On d.articulo = a.nrollo and a.documento = d.documento
				WHERE
				-- Todos los turnos
				 (
				 
				 a.Entrada >= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecIniCorta + ' 07:00:00' 
					WHEN @Turno = 1 THEN @FecIniCorta + ' 07:00:00'
					WHEN @Turno = 2 THEN @FecIniCorta + ' 15:00:00'
					WHEN @Turno = 3 THEN @FecIniCorta + ' 23:00:00'
					END 
				
					AND
				 a.Entrada <= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecFinSigDia + ' 06:59:59' 
					WHEN @Turno = 1 THEN @FecFinCorta + ' 14:59:59' 
					WHEN @Turno = 2 THEN @FecFinCorta + ' 22:59:59' 
					WHEN @Turno = 3 THEN @FecFinSigDia + ' 06:59:59' 
					END
				)
				
					AND
				 A.Nrollo =  ISNULL(@CodigoRollo, A.Nrollo) AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @Clase END AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @SubClase END	AND
				 A.Ancho = ISNULL(@Ancho, A.Ancho) AND
				 (A.Consumo + A.Saldo) = ISNULL(@PesoInicial, (A.Consumo + A.Saldo))	AND
				 A.Saldo >= ISNULL(@PesoInicio, A.Saldo)	AND  A.Saldo <= ISNULL(@PesoFinal, A.Saldo) AND
				 RadioFinal = ISNULL(@PesoInicial, RadioFinal)
				
				--INSERT INTO #Tmp1(ConsumoTotal) EXEC (@Query)

				
				SELECT   LTRIM(RTRIM(a.Nrollo)) AS Nrollo
						,LTRIM(RTRIM(a.Tipo)) AS Tipo
						,a.Ancho
						,a.Consumo + Saldo AS PesoInicial
						,A.Entrada
						,A.Salida
						,CAST(a.Consumo AS FLOAT) AS Consumo
						,CAST(a.Saldo AS FLOAT) AS Resto
						,CAST(a.RadioFinal AS FLOAT) AS RadioFinal
						,A.Descripcion
						,ISNULL(B.Programa, 0) AS Programa
						,B.OP
						,B.Consumo AS ConsumoOP
						,Left(Entrada, 11) AS fecha
						,A.Gramaje
						,C.ConsumoTotal
					FROM @Tmp1 C
						,CplDat018 A
					LEFT JOIN CplDat017 B ON A.CveConsumo = B.CveConsumo
						AND A.NRollo = B.NRollo
					JOIN [Dell-2003].Admin04.dbo.AlmNvMov002 d ON d.articulo = a.nrollo
						AND a.documento = d.documento --' + @lFiltro + @lOrden
					WHERE
						-- Todos los turnos
				 (
				 a.Entrada >= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecIniCorta + ' 07:00:00' 
					WHEN @Turno = 1 THEN @FecIniCorta + ' 07:00:00'
					WHEN @Turno = 2 THEN @FecIniCorta + ' 15:00:00'
					WHEN @Turno = 3 THEN @FecIniCorta + ' 23:00:00'
					END 

					AND
				 a.Entrada <= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecFinSigDia + ' 06:59:59' 
					WHEN @Turno = 1 THEN @FecFinCorta + ' 14:59:59' 
					WHEN @Turno = 2 THEN @FecFinCorta + ' 22:59:59' 
					WHEN @Turno = 3 THEN @FecFinSigDia + ' 06:59:59' 
					END
				)

					AND
				 A.Nrollo =  ISNULL(@CodigoRollo, A.Nrollo) AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @Clase END AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @SubClase END	AND
				 A.Ancho = ISNULL(@Ancho, A.Ancho) AND
				 (A.Consumo + A.Saldo) = ISNULL(@PesoInicial, (A.Consumo + A.Saldo))	AND
				 A.Saldo >= ISNULL(@PesoInicio, A.Saldo)	AND  A.Saldo <= ISNULL(@PesoFinal, A.Saldo) AND
				 RadioFinal = ISNULL(@PesoInicial, RadioFinal)
				ORDER BY
					CASE @TipoOrdenacion WHEN 'FechaEntrada' THEN A.Entrada END,
					CASE @TipoOrdenacion WHEN 'GramajeAncho' THEN A.Fecha END, A.Gramaje, A.Ancho,
					CASE @TipoOrdenacion WHEN 'FechaProgOp' THEN A.Fecha END, b.Programa, b.op,
					CASE @TipoOrdenacion WHEN 'FechaOpRollo' THEN A.Fecha END, /*B.OP, B.Programa,*/ B.NRollo

			END
		ELSE
			BEGIN

			--DECLARE @cadOp VARCHAR(50) = ' AND OP <> '''''
			--IF @ChkOps = 1 /*SELECT @cadOp*/ SET @lFiltro = @lFiltro + @cadOp

				-- 1
				declare @tmpRollosX2 as table(
					 HoraInicio VARCHAR(5),HoraFin VARCHAR(5),Nrollo VARCHAR(20),Tipo VARCHAR(30),cveconsumo int,Salida smalldatetime,HoraConsumo VARCHAR(8),
					 ancho decimal(18,2),documento VARCHAR(15),consumoOP decimal(10,2),PesoInicial decimal(18,2),Entrada smalldatetime,
					 consumo decimal(18,2),Resto decimal(18,2),RadioFinal decimal(18,2),Descripcion VARCHAR(30),Programa int,OP VARCHAR(10),
					 fecha smalldatetime,Gramaje decimal(18,2),STATUS bit
					)

				
				INSERT INTO @tmpRollosX2(
					HoraInicio,HoraFin,Nrollo,Tipo,cveconsumo,Salida,HoraConsumo,ancho,documento,consumoOP,
					PesoInicial,Entrada,consumo,Resto,RadioFinal,Descripcion,Programa,OP,fecha,Gramaje,STATUS
				)
				SELECT DISTINCT 
					C.[Hora Inicio] AS HI,
					C.[Hora Fin] AS HF,
					RTRIM(a.Nrollo) AS Nrollo,
					RTRIM(a.Tipo) AS Tipo,
					a.cveconsumo,
					A.Salida,
					CONVERT(VARCHAR(8), A.fecha, 108) AS HoraConsumo,
					a.ancho,
					a.documento,
					B.Consumo AS ConsumoOP,
					a.Consumo + Saldo AS PesoInicial,
					a.Entrada,isnull(a.consumo, 0) AS Consumo,a.Saldo AS Resto,
					a.RadioFinal,
					RTRIM(A.Descripcion) AS Descripcion,
					b.Programa,
					b.OP,
					LEFT(Entrada, 11) AS fecha,
					A.Gramaje,A.STATUS
				FROM cpldat018 A
				LEFT JOIN CplDat017 B ON A.NRollo = B.NRollo AND a.cveconsumo = b.cveconsumo
				LEFT JOIN Cajas01..CmoDat016 C ON C.Programa = B.Programa
					AND (
						DAY(C.Fecha) = DAY(B.Fecha)
						AND MONTH(C.Fecha) = MONTH(B.Fecha)
						AND YEAR(C.Fecha) = YEAR(B.Fecha)
						)
					AND C.Turno = B.TurnoProduccion
				JOIN Admin04.dbo.AlmNvMov002 d ON d.articulo = a.nrollo AND a.documento = d.documento
				--' + @lFiltro + '
				WHERE
				-- Todos los turnos
				
				 (
				 a.Entrada
				 >=
						CASE 
						WHEN @chkTodosTurnos = 1 THEN @FecIniCorta + ' 07:00:00' 
						WHEN @Turno = 1 THEN @FecIniCorta + ' 07:00:00'
						WHEN @Turno = 2 THEN @FecIniCorta + ' 15:00:00'
						WHEN @Turno = 3 THEN @FecIniCorta + ' 23:00:00'
						END 
				AND
				 a.Entrada 
				 <= 
						CASE 
						WHEN @chkTodosTurnos = 1 THEN @FecFinSigDia + ' 06:59:59' 
						WHEN @Turno = 1 THEN @FecFinCorta + ' 14:59:59' 
						WHEN @Turno = 2 THEN @FecFinCorta + ' 22:59:59' 
						WHEN @Turno = 3 THEN @FecFinSigDia + ' 06:59:59' 
						END
				)
				AND
				 A.Nrollo =  ISNULL(@CodigoRollo, A.Nrollo) AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @Clase END AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @SubClase END	AND
				 A.Ancho = ISNULL(@Ancho, A.Ancho) AND
				 (A.Consumo + A.Saldo) = ISNULL(@PesoInicial, (A.Consumo + A.Saldo))	AND
				 A.Saldo >= ISNULL(@PesoInicio, A.Saldo)	AND  A.Saldo <= ISNULL(@PesoFinal, A.Saldo) AND
				 RadioFinal = ISNULL(@PesoInicial, RadioFinal) --AND
				 --LTRIM(B.OP) <> CASE WHEN @ChkOps = 1 THEN '' ELSE LTRIM(B.OP) END
				GROUP BY 
					b.Programa,a.NRollo,a.tipo,a.CveConsumo,A.Salida,A.Consumo,A.Documento,b.OP,b.consumo,a.fecha,
					a.saldo,a.ancho,a.entrada,a.radiofinal,a.descripcion,a.gramaje,a.STATUS,C.[Hora Inicio],C.[Hora Fin]
				ORDER BY Entrada

				
				-- 2

				DECLARE @tmpRollosX1 AS TABLE(documento VARCHAR(15),consumoOP decimal(10,2) PRIMARY KEY(documento));
				INSERT INTO @tmpRollosX1(documento, consumoOP)
				Select  documento,sum(consumoOP) as ConsumoOP from @tmpRollosX2 group by documento

			
				--select * from @tmpRollosX2

				
				-- 3
				DECLARE @tmpRollosX AS TABLE(
					 HI VARCHAR(5),HF VARCHAR(5),Nrollo VARCHAR(20),Tipo VARCHAR(30),cveconsumo int,Salida smalldatetime,HoraConsumo VARCHAR(8),
					 ancho decimal(18,2),documento VARCHAR(15),consumoOP decimal(10,2),PesoInicial decimal(18,2),Entrada smalldatetime,
					 consumo decimal(18,2),Resto decimal(18,2),RadioFinal decimal(18,2),Descripcion VARCHAR(30),Programa int,OP VARCHAR(10),
					 OC VARCHAR(13),fecha smalldatetime,Gramaje decimal(18,2),STATUS bit, Seccion VARCHAR(20)
					)


				INSERT INTO @tmpRollosX(
					 HI,HF,Nrollo,Tipo,cveconsumo,Salida,HoraConsumo,ancho,documento,consumoOP,
					 PesoInicial,Entrada,consumo,Resto,RadioFinal,Descripcion,Programa,OP, OC,fecha,Gramaje,STATUS, Seccion
				)
				SELECT DISTINCT 
					E.[Hora Inicio] AS HI,E.[Hora Fin] AS HF,
					RTRIM(a.Nrollo) AS Nrollo,
					RTRIM(a.Tipo) AS Tipo,
					a.cveconsumo,A.Salida,CONVERT(VARCHAR(8), A.fecha, 108) AS HoraConsumo,
					a.ancho,
					RTRIM(a.documento) AS documento,
					B.Consumo AS ConsumoOP,a.Consumo + Saldo AS PesoInicial,a.Entrada,isnull(a.consumo, 0) AS Consumo,
					a.Saldo AS Resto,a.RadioFinal,
					RTRIM(A.Descripcion) AS Descripcion,b.Programa,
					RTRIM(b.OP) AS OP,
					RTRIM(f.Orden_C) AS OC,
					LEFT(A.Entrada, 11) AS fecha,
					A.Gramaje, A.STATUS, A.Seccion
				FROM cpldat018 A
				LEFT JOIN CplDat017 B ON A.NRollo = B.NRollo AND a.cveconsumo = b.cveconsumo
				LEFT JOIN @tmpRollosX1 C ON c.documento /*COLLATE SQL_Latin1_General_CP1_CI_AS*/ = a.documento
				LEFT JOIN Cajas01..CmoDat016 E ON E.Programa = B.Programa
					AND (
						DAY(E.Fecha) = DAY(B.Fecha)
						AND MONTH(E.Fecha) = MONTH(B.Fecha)
						AND YEAR(E.Fecha) = YEAR(B.Fecha)
						)
					AND E.Turno = B.TurnoProduccion
				LEFT JOIN Admin04.dbo.AlmNvMov002 d ON d.articulo = a.nrollo AND a.documento = d.documento
				LEFT JOIN Admin04.dbo.AlmNvMov001 f ON d.articulo = f.Articulo AND d.almacen = f.Almacen
				--'+@lFiltro+'
				WHERE
				-- Todos los turnos
				 (
				 a.Entrada >= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecIniCorta + ' 07:00:00' 
					WHEN @Turno = 1 THEN @FecIniCorta + ' 07:00:00'
					WHEN @Turno = 2 THEN @FecIniCorta + ' 15:00:00'
					WHEN @Turno = 3 THEN @FecIniCorta + ' 23:00:00'
					END 

					AND
				 a.Entrada <= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecFinSigDia + ' 06:59:59' 
					WHEN @Turno = 1 THEN @FecFinCorta + ' 14:59:59' 
					WHEN @Turno = 2 THEN @FecFinCorta + ' 22:59:59' 
					WHEN @Turno = 3 THEN @FecFinSigDia + ' 06:59:59' 
					END
				) 
					AND
				 A.Nrollo =  ISNULL(@CodigoRollo, A.Nrollo) AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @Clase END AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @SubClase END	AND
				 A.Ancho = ISNULL(@Ancho, A.Ancho) AND
				 (A.Consumo + A.Saldo) = ISNULL(@PesoInicial, (A.Consumo + A.Saldo))	AND
				 A.Saldo >= ISNULL(@PesoInicio, A.Saldo)	AND  A.Saldo <= ISNULL(@PesoFinal, A.Saldo) AND
				 RadioFinal = ISNULL(@PesoInicial, RadioFinal)
				Group BY 
					f.Orden_C,b.Programa,a.NRollo,a.tipo,a.CveConsumo,A.Salida,A.Consumo,A.Documento,b.OP,b.consumo,a.fecha,
					a.saldo,a.ancho,a.entrada,a.radiofinal,a.descripcion,a.gramaje,a.STATUS,E.[Hora Inicio],E.[Hora Fin],A.Seccion
				ORDER BY Entrada
				
				
				--SELECT SUM(consumo) AS consumo, SUM(PesoInicial) AS PesoInicial FROM @tmpRollosX
				--SELECT * FROM @tmpRollosX

				
				-- 4
				UPDATE @tmpRollosX SET Salida= Salida-1 
				WHERE (HoraConsumo >= '00:00:00' AND HoraConsumo <= '06:59:59') OR (  HoraConsumo > '23:59:59')

		
		
				-- 5
				declare @tmpRollos as table(
					 HI VARCHAR(5),HF VARCHAR(5),Nrollo VARCHAR(20),Tipo VARCHAR(30),HoraConsumo VARCHAR(8), ancho decimal(18,2),
					 PesoInicial decimal(18,2),Entrada smalldatetime,Salida smalldatetime,consumo decimal(18,2),Resto decimal(18,2),
					 RadioFinal decimal(18,2),Descripcion VARCHAR(30),Programa int,OP VARCHAR(10), consumoOP decimal(10,2),
					 fecha smalldatetime,Gramaje decimal(18,2),documento VARCHAR(15), cveconsumo int, STATUS bit, OC VARCHAR(13), uso VARCHAR(2)
				)

				
				INSERT INTO @tmpRollos (
					 HI,HF,Nrollo,Tipo,HoraConsumo,ancho,PesoInicial,Entrada,Salida,consumo,Resto,RadioFinal,Descripcion,
					 Programa,OP,consumoOP,fecha,Gramaje,documento,cveconsumo,STATUS,OC,uso
					)
				SELECT DISTINCT 
					HI,HF,a.NRollo,a.Tipo,a.HoraConsumo,A.Ancho,A.PesoInicial,a.Entrada,a.Salida,a.consumo,a.Resto,a.RadioFinal,
					a.Descripcion,a.Programa,a.OP,a.consumoOP,a.Fecha,a.gramaje,a.documento,b.cveconsumo,a.STATUS,a.OC,C.uso
				FROM @tmpRollosX A
				LEFT JOIN CplDat017 B ON 
					A.NRollo /*COLLATE SQL_Latin1_General_CP1_CI_AS*/ = B.NRollo AND 
					a.cveconsumo = b.cveconsumo AND 
					CONVERT(VARCHAR(10), a.salida, 112) = CONVERT(VARCHAR(10), b.fecha, 112)
				INNER JOIN CPLCAT008 C ON A.Seccion = C.SECCION
				WHERE
				-- Todos los turnos
				 (
				 a.Entrada >= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecIniCorta + ' 07:00:00' 
					WHEN @Turno = 1 THEN @FecIniCorta + ' 07:00:00'
					WHEN @Turno = 2 THEN @FecIniCorta + ' 15:00:00'
					WHEN @Turno = 3 THEN @FecIniCorta + ' 23:00:00'
					END 

					AND
				 a.Entrada <= 
					CASE 
					WHEN @chkTodosTurnos = 1 THEN @FecFinSigDia + ' 06:59:59' 
					WHEN @Turno = 1 THEN @FecFinCorta + ' 14:59:59' 
					WHEN @Turno = 2 THEN @FecFinCorta + ' 22:59:59' 
					WHEN @Turno = 3 THEN @FecFinSigDia + ' 06:59:59' 
					END
				)
				AND
				 A.Nrollo =  ISNULL(@CodigoRollo, A.Nrollo) AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @Clase END AND
				 A.Tipo LIKE CASE WHEN @Clase IS NULL THEN A.Tipo ELSE '%' + @SubClase END	AND
				 A.Ancho = ISNULL(@Ancho, A.Ancho) AND
				 --(A.Consumo + A.Saldo) = ISNULL(@PesoInicial, (A.Consumo + A.Saldo))	AND
				 --A.Saldo >= ISNULL(@PesoInicio, A.Saldo)	AND  A.Saldo <= ISNULL(@PesoFinal, A.Saldo) AND
				 RadioFinal = ISNULL(@PesoInicial, RadioFinal)
				GROUP BY 
					a.OC,a.Programa,A.OP,a.NRollo,a.tipo,a.CveConsumo,A.Salida,A.Consumo,A.Documento,b.Programa,b.OP,b.consumo,
					a.NRollo,a.Tipo,a.HoraConsumo,A.Ancho,A.PesoInicial,a.Entrada,a.Salida,a.consumo,a.Resto,a.RadioFinal,A.Descripcion,
					a.consumoOP,a.Fecha,a.gramaje,a.documento,b.cveconsumo,a.STATUS,HI,HF,C.uso
				ORDER BY Entrada

				--select fecha from @tmpRollos
				
				-- 6
				DECLARE @tmpSubTotal AS TABLE(Nrollo VARCHAR(20),consumo decimal(18,2), ConsumoTotal decimal(18,2))
				INSERT INTO @tmpSubTotal(Nrollo, consumo, ConsumoTotal)
				SELECT DISTINCT NRollo,consumo, SUM(consumo) as ConsumoSubTotal from @tmpRollos GROUP BY NRollo, consumo

				--SELECT * FROM @tmpSubTotal

				DECLARE @ConsumoTotal decimal(18,2) = (SELECT SUM(consumo) from @tmpSubTotal)

				-- 7
				SELECT 
					 ltrim(rtrim(HI					)) as HI				
					,ltrim(rtrim(HF					)) as HF				
					,ltrim(rtrim(Nrollo				)) as Nrollo			
					,ltrim(rtrim(Tipo				)) as Tipo			
					,ltrim(rtrim(HoraConsumo		)) as HoraConsumo	
					,ltrim(rtrim(ancho				)) as ancho
					,CAST(PesoInicial AS FLOAT) as PesoInicial
					--,CONVERT(VARCHAR(5), Entrada, 24) AS Entrada		-- Format a hh:mm
					--,CONVERT(VARCHAR(5), Salida, 24) AS Salida		-- Format a hh:mm
					,Entrada
					,Salida
					,CAST(consumo AS FLOAT) as consumo		
					,CAST(Resto AS FLOAT) as Resto			
					,CAST(RadioFinal AS FLOAT) as RadioFinal		 
					,ltrim(rtrim(Descripcion		)) as Descripcion	
					,ltrim(rtrim(Programa			)) as Programa		
					,ltrim(rtrim(OP					)) as OP				
					,ltrim(rtrim(consumoOP			)) as consumoOP		
					,convert(VARCHAR(10),fecha, 103)      as fecha			
					,ltrim(rtrim(Gramaje			)) as Gramaje		
					,ltrim(rtrim(documento			)) as documento		
					,ltrim(rtrim(cveconsumo			)) as cveconsumo		
					,ltrim(rtrim(STATUS				)) as STATUS			
					,ltrim(rtrim(OC					)) as OC				
					,ltrim(rtrim(uso 				)) as uso 			
					,cast(@ConsumoTotal as float)	 as ConsumoTotal 
				FROM  @tmpRollos ORDER BY Fecha,programa, op
				
			END
			
		END

   		COMMIT TRAN	
			END TRY  
			BEGIN CATCH  
				ROLLBACK TRAN

				DECLARE @BD VARCHAR(30)

				SET @BD = (SELECT DB_NAME())
				EXEC Sistemas..ASSSP101 @BD

				----Si hubo errores mandamos el error con su número de línea 
				SELECT 'SQL - ' + ERROR_MESSAGE() + ' - Número de Error: ' + CAST(ERROR_NUMBER() AS NVARCHAR(20)) + ' - Línea: ' + CAST(ERROR_LINE() AS NVARCHAR(20)) AS Mensaje

			END CATCH

GO