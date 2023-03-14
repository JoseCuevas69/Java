USE [FcaCajas]
GO

/****** Object:  Table [dbo].[FCAPROGCAT012]    Script Date: 30/11/2021 08:09:20 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGCAT012](
	[CodEvaluacion] [smallint] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Descripcion] [varchar](250) NULL,
	[Parametros] [bit] NOT NULL,
	[Zona] char(2) not null,
	[Estatus] [bit] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioDelete] [char](6) NULL,
	[FechaDelete] [smalldatetime] NULL
 CONSTRAINT [PK_FCAPROGCAT012] PRIMARY KEY CLUSTERED 
(
	[CodEvaluacion] ASC,[Zona] asc
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGCAT012] ADD  CONSTRAINT [DF_FCAPROGCAT012_Estatus]  DEFAULT (0) FOR [Estatus]
GO

ALTER TABLE [dbo].[FCAPROGCAT012] ADD  CONSTRAINT [DF_FCAPROGCAT012_Parametros]  DEFAULT (0) FOR [Parametros]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Codigo del Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'CodEvaluacion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre del Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'Nombre'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripcion del Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'Descripcion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que Dio de Alta El tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que Dio de Alta El tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que Modifico el Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'UsuarioUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se Modifico el Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que Elimino el Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'UsuarioDelete'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se Elimino el Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'FechaDelete'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estatus del Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'Estatus'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 = No se configuran parametros semanales y 1 = Si se configuran parametros semanales' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT012', @level2type=N'COLUMN',@level2name=N'Parametros'
GO

INSERT FCAPROGCAT012
SELECT CodEvaluacion,Nombre,Descripcion,Parametros,'03',Status,UsuarioAlta,FechaAlta,UsuarioModificacion,FechaModificacion,UsuarioElimino,FechaElimino FROM Cajas05..CMOCAT076

update FCAPROGCAT012 set zona='05' where zona='03'
SELECT * FROM FCAPROGCAT012

