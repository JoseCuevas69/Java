USE [FcaCajas01]

GO
/****** Object:  Table [dbo].[FCAPRODCAT009]    Script Date: 04/12/2021 09:35:57 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODCAT009](
	[ID] [tinyint] IDENTITY(1,1) NOT NULL,
	[CveMaquina] [char](8) NOT NULL,
	[CvePuesto] [int] NOT NULL,
	[PersonasRequeridas] [int] NOT NULL,
	[CveArea] [int] NOT NULL,
	[CveFuncion] [int] NOT NULL,
	[Factor] [decimal](18, 4) NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioDelete] [char](6) NULL,
	[FechaDelete] [smalldatetime] NULL,
	[Estatus] [bit] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODCAT009] ADD  DEFAULT ((0)) FOR [CveArea]
GO

ALTER TABLE [dbo].[FCAPRODCAT009] ADD  CONSTRAINT [DF_CMOHIS062_CveFuncion]  DEFAULT ((0)) FOR [CveFuncion]
GO

ALTER TABLE [dbo].[FCAPRODCAT009] ADD  CONSTRAINT [DF_CMOHIS062_Factor]  DEFAULT ((0)) FOR [Factor]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador de Insercion de Cada Registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda la Clave de Maquina para la cual se Captura el Puesto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'CveMaquina'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda la Clave de Puesto que se Captura.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'CvePuesto'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda el Numero de Personas Requeridas para Cubrir el Puesto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'PersonasRequeridas'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda la clave del Usuario que genera la Captura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda la Fecha en la que se Genera la Captura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda la calve de Usuario que Realiza la Modificacion de la captura.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'UsuarioUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda la Fecha de Modificacion de Captura.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda el Estatus con el Se Representa el Registro (1- Inactivo, o Activo).' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'Estatus'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda la clave del area a la cual pertenece el puesto.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'CveArea'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarada la clave de Funcion Asignada al Puesto Capturado.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'CveFuncion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guarda Nuemero de Factori que intervine en el calculo del Costo del Puesto para Puestos Compartidos.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT009', @level2type=N'COLUMN',@level2name=N'Factor'
GO

INSERT FCAPRODCAT009 (CveMaquina,CvePuesto,PersonasRequeridas,CveFuncion,Factor,FechaInsert,UsuarioInsert,Estatus)
SELECT CveMaquina,CvePuesto,PersonasRequeridas,CveFuncion,Factor,FechaInsert,UsuarioInsert,Estatus FROM Cajas01..CMOCAT196


