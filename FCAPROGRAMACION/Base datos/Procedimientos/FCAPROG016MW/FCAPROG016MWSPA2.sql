USE [CecsoPlan01]
GO

/****** Object:  StoredProcedure [dbo].[FCAPROG016MWSPA2]    Script Date: 20/10/2022 08:34:30 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[FCAPROG016MWSPA2]
	@Opcion INT							= NULL
	, @pCantidadTras INT				= NULL
	, @pGrupoActivo SMALLINT			= NULL
	, @pResistencia VARCHAR(15)			= NULL
	, @pExcedente DECIMAL(18, 2)		= NULL
	, @pFaltan DECIMAL(18, 2)			= NULL
	, @pOrdenProduccion VARCHAR(10)		= NULL
	, @pClaveArticulo VARCHAR(9)		= NULL
	, @pFechaEntrega SMALLDATETIME		= NULL
	, @pNombre VARCHAR(100)				= NULL
	, @pArticulo VARCHAR(60)			= NULL
	, @pAncho REAL						= NULL
	, @pLargo REAL						= NULL
	, @pPiezas DECIMAL(6, 1)			= NULL
	, @pCantidad DECIMAL(15, 1)			= NULL
	, @pHojas INT						= NULL
	, @pIndustria VARCHAR(3)			= NULL
	, @pParcial VARCHAR(1)				= NULL
	, @pFlauta VARCHAR(3)				= NULL
	, @pTkg INT							= NULL
	, @pTM2 INT							= NULL
	, @pResistenciaActiva VARCHAR(15)	= NULL
AS
BEGIN
	IF @Opcion = 1
	BEGIN
		BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @plFaltan DECIMAL(18, 2), @pGrupoGrabar SMALLINT;

			IF EXISTS (SELECT 1 FROM CplDat007 WHERE Clave = @pResistencia)
			BEGIN
				SELECT TOP 1 @pGrupoGrabar = Grupo
				FROM CplDat007
				WHERE Clave = @pResistencia

				IF @pGrupoActivo != @pGrupoGrabar
				BEGIN
					SELECT 0 AS Id, 'No Coinciden las Resistencias:<br>Resistencia OP = ' + @pResistencia + '<br>Resistencia Activa = ' + @pResistenciaActiva AS Message;
				END ELSE
				BEGIN
					-- INSERTA_OP_A
					SELECT @plFaltan = CASE WHEN @pCantidadTras > 0 THEN @pFaltan - @pCantidadTras ELSE @pFaltan END;

					IF @plFaltan <= 0 AND @pCantidadTras > 0
					BEGIN
						SELECT 0 AS Id, 'No hay Cantidad Faltante...' AS Message
					END 
					ELSE
					BEGIN
						INSERT INTO CplDat004 (
							[Orden Produccion], [Clave Articulo], [Fecha Entrega], Cliente, Articulo, Resistencia, Ancho, Largo,
							Piezas, Cantidad, Faltan, Hojas, Lamina, Parcial, Flauta, Tkg, TM2, Mas, Prior, Refile, Utilizar
						)
						VALUES (
							@pOrdenProduccion, @pClaveArticulo, @pFechaEntrega, @pNombre, @pArticulo, @pResistencia, @pAncho, @pLargo,
							@pPiezas, @pCantidad, @pFaltan, @pHojas, @pIndustria, @pParcial, @pFlauta, @pTkg, @pTM2, @pExcedente, 0, 0, 1
						);

						IF @@ROWCOUNT > 0
						BEGIN
							SELECT 1 AS Id, 'El Registro Fue Actualizado Satisfactoriamente' AS Message
						END ELSE
						BEGIN
							SELECT 0 AS Id, 'No se pudo Registrar la Orden de Producción' AS Message
						END
					END
				END
			END ELSE 
			BEGIN
				SELECT 0 AS Id, 'No existe Grupo definiado para la Resistencia "' + @pResistencia + '"' AS Message;
			END

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
			SELECT 0 AS Id, ERROR_MESSAGE() AS Message;
		END CATCH
	END
END
GO


