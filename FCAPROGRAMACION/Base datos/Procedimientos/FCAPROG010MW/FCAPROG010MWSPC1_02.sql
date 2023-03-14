USE [FcaCajas02]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG010MWSPC1]    Script Date: 03/03/2022 11:43:16 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ==========================================================================================                
-- Author: Enrique Palomares H    
-- Create date: 02 de Abril del 2012    
-- Description: Informacion de la caratula de produccion para reportes gerencial y     
--             directivos, lo solicito Juan Montiel    
--    
-- Aplica al modulo Cmo034MF y se utiliza en el WS CmoWS014    
-- Permiso de Lecturas y Escritura    
-- ==========================================================================================                
-- Modificado: Enrique Palomares
-- Fecha: 05-Abril-2013
-- Se agrego un nuevo parametro el cual permite capturar el valor del promedio 
-- ==========================================================================================  
-- Modificado: Manuel Valenzuela
-- Fecha: 28-Feb-2022
-- Se migro CmoSP372 de Cajas a FCAPROG010MWSPC1 de FcaCajas @Accion = 0 de consulta y agrego parametros:
-- @startRow, @endRow para control de paginación en módulo: FCAPROG010MW
-- ==========================================================================================               
                
CREATE PROCEDURE [dbo].[FCAPROG010MWSPC1]    
     @Accion  INT,    
     @Maquina1 AS VARCHAR(7) = NULL,    
     @Maquina2 AS VARCHAR(7) = NULL,    
     @Turnos AS SmallINT = 0,    
     @Valor AS INT = 0,    
     @Prom AS INT = 0,
     @UsuarioERP AS CHAR(6)=NULL,
	 @startRow AS INT = NULL, 
	 @endRow AS INT = NULL
AS                
    
SET NOCOUNT ON            
    
	DECLARE @TotalRegistros INT

--Resultado de informacion de la carga mensual promedio    
IF (@Accion=0)    
     BEGIN    
         
		SELECT @TotalRegistros = COUNT(*) FROM FCAPROGDAT023 
		
		SELECT ClaveMaquina, Turnos, M2CargaPendiente, M2PromTurno, Fecha 
		FROM FCAPROGDAT023  OFFSET 
		ORDER BY ClaveMaquina OFFSET @startRow ROWS

		FETCH NEXT ISNULL(@endRow, @TotalRegistros) - @startRow ROWS ONLY
		SELECT @TotalRegistros TotalRegistros 

     END    
    
   

GO

