USE [FcaCajas]
GO

/****** Object:  Table [dbo].[FCAPRODCAT016]    Script Date: 29/08/2022 09:25:29 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODCAT016](
	[IdDesperdicio] [smallint] IDENTITY(1,1) NOT NULL,
	[ZonaId] [CHAR](2) NOT NULL,
	[DescripcionDesperdicio] [varchar](100) NOT NULL,
	[AplicaImpresora] [bit] NOT NULL,
	[AplicaCorrugadora] [bit] NOT NULL,
	[AplicaAcabado] [bit] NOT NULL,
	[AplicaRecuperacionCaja] [bit] NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [datetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaDelete] [datetime] NULL,
	[UsuarioDelete] [char](6) NULL,
	[EsActivo] [bit] NOT NULL DEFAULT 1
 CONSTRAINT [PK_FCAPRODCAT016] PRIMARY KEY CLUSTERED 
(
	[IdDesperdicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODCAT016] ADD  CONSTRAINT [DF_FCAPRODCAT016_Estatus]  DEFAULT ((1)) FOR [Estatus]
GO

ALTER TABLE [dbo].[FCAPRODCAT016] ADD  CONSTRAINT [DF_FCAPRODCAT016_FechaInsert]  DEFAULT (getdate()) FOR [FechaInsert]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identificador del desperdicio' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'IdDesperdicio'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripcion del desperdicio' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'DescripcionDesperdicio'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determina si el desperdicio aplica para impresora' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'AplicaImpresora'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determina si el desperdicio aplica para corrugadora' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'AplicaCorrugadora'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determina si el desperdicio aplica para acabado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'AplicaAcabado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determina si el desperdicio aplica para recuperacion caja' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'AplicaRecuperacionCaja'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estatus 1 Activo 0 Inactivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'Estatus'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se da de alta el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que dio de alta el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se actualizó el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que actualizó el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'UsuarioUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se dio de baja el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'FechaDelete'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que dio de baja el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT016', @level2type=N'COLUMN',@level2name=N'UsuarioDelete'
GO


