USE [FcaCajas01]
GO
/****** Object:  StoredProcedure [dbo].[FCAPROG0100MWSPC1]    Script Date: 14/03/2022 08:42:14 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
-- ==========================================================================================                  
-- Author: Manuel Valenzuela  
-- Fecha: 17-Marzo-2022  
-- Migración módulo CMOREP049 -> consulta artículos por medidas (reporte)
-- ==========================================================================================                 
                  
CREATE PROCEDURE [dbo].[FCAPROG007RSSPC1]      
     @Accion  INT,      
	 @TipoDeConsulta AS VARCHAR(20) = NULL,		-- Indica si se cargara informacion de Cajas o de Lámina 
	 @AnchoMin AS DECIMAL(10,2) = NULL,			-- Ancho de Hoja Minimo
	 @AnchoMax AS DECIMAL(10,2) = NULL,			-- Ancho de Hoja Maximo
	 @LargoMin AS DECIMAL(10,2) = NULL,			-- Largo de Hoja Minimo
	 @LargoMax AS DECIMAL(10,2) = NULL,			-- Largo de Hoja Maximo
	 @TipoIndustria AS CHAR(4) = NULL,			-- Clave del Tipo de Industria
	 @FechaIni AS DATETIME = NULL,				-- Fecha Inicial
	 @FechaFin AS DATETIME = NULL,				-- Fecha Final
	 @OrderBy AS VARCHAR(500) = NULL,			-- Cadena para ordenamiento por filtros indicados ejem: ORDER BY ancho, Largo, etc}
	 @Zona AS CHAR(02) = NULL					-- Zona ERP

	 
AS                  
      
SET NOCOUNT ON              
      
  
    DECLARE @TotalRegistros INT




	
	IF (@Accion=1)      
     BEGIN      
           
		  DECLARE @TablaTipoIndustria AS TABLE(Clave VARCHAR(20), Descripcion VARCHAR(100), Status BIT)  
		  INSERT INTO @TablaTipoIndustria(Clave, Descripcion, Status)VALUES('AGR', 'AGRICOLA', 0)  
		  INSERT INTO @TablaTipoIndustria(Clave, Descripcion, Status)VALUES('AVI', 'AVICOLA', 0)  
		  INSERT INTO @TablaTipoIndustria(Clave, Descripcion, Status)VALUES('IND', 'INDUSTRIAL', 0)  
		  INSERT INTO @TablaTipoIndustria(Clave, Descripcion, Status)VALUES('PAR', 'PARAFINADO', 0)  
    
		  SELECT Clave, Descripcion FROM @TablaTipoIndustria WHERE Status = 0  
    
  
     END  
  


	 IF (@Accion=2)      
     BEGIN  
	 
			IF @TipoDeConsulta = 'Lamina'
			BEGIN

				-- Valido por zona ya que la 05 usa tablas diferentes a zonas 01 y 02
				IF @Zona = '05'
				BEGIN
					SELECT DISTINCT e.CodTipoIndustria AS Industria
						,C.op
						,CAST(A.[AnchoInt] AS DECIMAL(18,2)) AS Ancho
						,CAST(A.LargoInt AS DECIMAL(18,2)) AS largo
						,B.FechaInsert AS fecha
						,C.ClaveArticulo as clavearticulo
						,A.descripcion AS articulo
						,A.resistencia
						,A.flauta
					FROM /*CmoDat011*/FCAVENTDAT035 C
					JOIN /*CmoTjCat004*/FCAVENTCAT023 A ON A.ClaveArticulo = C.ClaveArticulo
					JOIN /*Cmocat013*/FCAVENTCAT009 e ON A.subcodigo = e.subcodigo
					JOIN /*CmoDat010*/FCAVENTDAT034 B ON B.OP = C.Folio_OP
					WHERE A.AnchoInt >= isnull(@AnchoMin, A.AnchoInt)
						AND A.AnchoInt <= isnull(@AnchoMax, A.AnchoInt)
						AND A.LargoInt >= isnull(@LargoMin, A.LargoInt)
						AND A.LargoInt <= isnull(@LargoMax, A.LargoInt)
						AND e.CodTipoIndustria = isnull(@TipoIndustria, e.CodTipoIndustria)
						AND (
							(
								B.FechaInsert >= isnull(@FechaIni, B.FechaInsert)
								AND B.FechaInsert <= isnull(@FechaFin, B.FechaInsert)
								)
							)
					ORDER BY B.FechaInsert
				END
				--  otras zonas (01, 02)
				ELSE
				BEGIN
					SELECT DISTINCT e.CodTipoIndustria AS Industria
						,A.op
						,CAST(A.AnchoHoja AS DECIMAL(18,2)) AS ancho
						,CAST(A.AnchoHoja AS DECIMAL(18,2)) AS largo
						,B.fecha
						,C.ClaveArticulo as clavearticulo
						,D.descripcion AS articulo
						,A.resistencia
						,A.flauta
					FROM /*CmoDat013*/FCAPROGDAT002 A
					JOIN /*CmoDat016*/FCAPRODDAT023 B ON A.programa = B.programa
					JOIN /*CmoDat011*/FCAVENTDAT035 C ON A.op = C.op
					JOIN /*CmoTjCat004*/FCAVENTCAT023 D ON C.ClaveArticulo = D.ClaveArticulo
					JOIN /*Cmocat013*/FCAVENTCAT009 e ON d.subcodigo = e.subcodigo
					WHERE A.AnchoHoja >= isnull(@AnchoMin, A.AnchoHoja)
						AND A.AnchoHoja <= isnull(@AnchoMax, A.AnchoHoja)
						AND A.LargoHoja >= isnull(@LargoMin, A.LargoHoja)
						AND A.LargoHoja <= isnull(@LargoMax, A.LargoHoja)
						AND e.CodTipoIndustria = isnull(@TipoIndustria, e.CodTipoIndustria)
						AND (
							(
								B.fecha >= isnull(@FechaIni, B.fecha)
								AND B.fecha <= isnull(@FechaFin, B.fecha)
								)
							)
					ORDER BY B.Fecha
				END

			END

			-- 
			ELSE -- IF @TipoDeConsulta = 'Cajas'
			BEGIN
				SELECT DISTINCT e.CodTipoIndustria as Industria
					,B.op
					,A.AnchoDesarrollo AS ancho
					,A.LargoDesarrollo AS largo
					,A.ClaveArticulo as clavearticulo
					,B.Fecha AS fecha
					,C.descripcion AS articulo
					,A.resistencia
					,C.flauta
				FROM /*CmoDat011*/FCAVENTDAT035 A
				JOIN /*CmoDat021*/FCAPROGDAT014 B ON /*A.OP*/
					REPLICATE('0', 5 - DATALENGTH(LTRIM(RTRIM(CAST(ISNULL(A.OP,0) AS VARCHAR(5)))))) + 
					LTRIM(RTRIM(CAST(A.OP AS VARCHAR(5))))  +  '-' + 
					REPLICATE('0', 2 - DATALENGTH(LTRIM(RTRIM(CAST(ISNULL(A.OrdenImpres,0) AS VARCHAR(2)))))) + 
					LTRIM(RTRIM(CAST(A.OrdenImpres AS VARCHAR(2))))+ '-' + 
					CASE  WHEN A.Serie ='N' THEN  'C' ELSE A.Serie END = B.OP
				JOIN /*CmoTjCat004*/FCAVENTCAT023 C ON C.ClaveArticulo = A.ClaveArticulo
				JOIN /*Cmocat013*/FCAVENTCAT009 E ON c.subcodigo = e.subcodigo
				WHERE A.AnchoDesarrollo >= isnull(@AnchoMin, A.AnchoDesarrollo)
					AND A.AnchoDesarrollo <= isnull(@AnchoMax, A.AnchoDesarrollo)
					AND A.LargoDesarrollo >= isnull(@LargoMin, A.LargoDesarrollo)
					AND A.LargoDesarrollo <= isnull(@LargoMax, A.LargoDesarrollo)
					AND e.CodTipoIndustria = isnull(@TipoIndustria, e.CodTipoIndustria)
					AND (
						(
							B.fecha >= isnull(@FechaIni, B.fecha)
							AND B.fecha <= isnull(@FechaFin, B.fecha)
							)
						OR (
							B.Fecha IS NULL
							AND (
								B.FechaSistema BETWEEN @FechaIni
									AND @FechaFin
								)
							)
						)
				ORDER BY B.Fecha


			END

     END      
      

	       
    
      
  
  