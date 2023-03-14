USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAVENTDAT015]    Script Date: 24/03/2022 12:23:39 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAVENTDAT015](
	[IdSolicitud] [int] NOT NULL,
	[NumArticulo] [int] NOT NULL,
	[IdConcepto] [int] NOT NULL,
	[Resultado] [varchar](100) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [datetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaDelete] [datetime] NULL,
	[UsuarioDelete] [char](6) NULL,
 CONSTRAINT [PK_FCAVENTDAT015] PRIMARY KEY CLUSTERED 
(
	[IdSolicitud] ASC,
	[NumArticulo] ASC,
	[IdConcepto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAVENTDAT015] ADD  CONSTRAINT [DF_FCAVENTDAT015_Resultado]  DEFAULT ('') FOR [Resultado]
GO

ALTER TABLE [dbo].[FCAVENTDAT015] ADD  CONSTRAINT [DF_FCAVENTDAT015_Estatus]  DEFAULT ((1)) FOR [Estatus]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Folio de la solicitud Análisis Caja nueva' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'IdSolicitud'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Numero del artículo solicitado en el análisis de caja nueva' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'NumArticulo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Concepto solicitado en el análisis de caja nueva' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'IdConcepto'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Resultado capturado por las áreas responsables de atención.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'Resultado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1 Activo 0 Eliminado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'Estatus'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se dio de alta el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que dio de alta el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Última Fecha en que se actualizó el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Último Usuario que actualizó el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'UsuarioUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se dio de baja el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'FechaDelete'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que dio de baja el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTDAT015', @level2type=N'COLUMN',@level2name=N'UsuarioDelete'
GO


