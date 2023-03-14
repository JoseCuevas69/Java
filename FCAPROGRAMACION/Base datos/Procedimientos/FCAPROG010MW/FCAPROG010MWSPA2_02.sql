USE [FcaCajas02]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG010MWSPA2]    Script Date: 03/03/2022 11:44:12 a. m. ******/
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
-- Se migro CmoSP372 a FCAPROG010MWSPA2 opcion 2 de actualizacion
-- ========================================================================================== 
                
                
CREATE PROCEDURE [dbo].[FCAPROG010MWSPA2]    
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
    

--Inserta los valores del primer GRID    
IF (@Accion=1)    
     BEGIN  
          INSERT FCAPROGDATHIST023(ClaveMaquina,Turnos,M2CargaPendiente,M2PromTurno,UsuarioERP)   
                 SELECT ClaveMaquina,Turnos,M2CargaPendiente,M2PromTurno,@UsuarioERP  
                 FROM FCAPROGDAT023   
                 WHERE ClaveMaquina = @Maquina1    
              
          UPDATE FCAPROGDAT023 SET Turnos=@Turnos,     
                               M2CargaPendiente=@Valor,    
                               M2PromTurno=@Prom  
          WHERE ClaveMaquina = @Maquina1    
     END    
    
     

GO

