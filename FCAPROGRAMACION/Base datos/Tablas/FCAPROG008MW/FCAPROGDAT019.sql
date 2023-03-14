USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGDAT019]    Script Date: 26/03/2022 09:44:20 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGDAT019](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaveProceso] [char](3) NOT NULL,
	[MaquinaOrden] [tinyint] NOT NULL,
	[TipoMaquina] [tinyint] NOT NULL,
	[Pegar] [bit] NOT NULL,
	[Mx2] [bit] NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaDelete] [smalldatetime] NULL,
	[UsuarioDelete] [char](6) NULL,
	[Estatus] [bit] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGDAT019] ADD  CONSTRAINT [DF_FCAPROGDAT019_MaquinaOrden]  DEFAULT ((0)) FOR [MaquinaOrden]
GO

ALTER TABLE [dbo].[FCAPROGDAT019] ADD  CONSTRAINT [DF_FCAPROGDAT019_TipoMaquina]  DEFAULT ((0)) FOR [TipoMaquina]
GO

ALTER TABLE [dbo].[FCAPROGDAT019] ADD  CONSTRAINT [DF_FCAPROGDAT019_Pegar]  DEFAULT ((0)) FOR [Pegar]
GO

ALTER TABLE [dbo].[FCAPROGDAT019] ADD  CONSTRAINT [DF_FCAPROGDAT019_Mx2]  DEFAULT ((0)) FOR [Mx2]
GO

ALTER TABLE [dbo].[FCAPROGDAT019] ADD  CONSTRAINT [DF_FCAPROGDAT019_Estatus]  DEFAULT ((1)) FOR [Estatus]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Valida [Si=1 / No=0] el Valor de la columna Máximo, para que no sobrepase el valor máximo al valor esperado de un artículo.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'Id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de Ruta de Proceso' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'ClaveProceso'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Orden de la secuencia de Máquinas' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'MaquinaOrden'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tipo de Máquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'TipoMaquina'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el Proceso a ejecutar es solo pegado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'Pegar'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el proceso se ejecutara dos veces por la misma maquina.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'Mx2'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FechaInsert del Sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'UsuarioInsert ERP que actualiza el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el registro es Activo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT019', @level2type=N'COLUMN',@level2name=N'Estatus'
GO


