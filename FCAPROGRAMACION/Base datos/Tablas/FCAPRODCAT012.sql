USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPRODCAT012]    Script Date: 24/03/2022 10:41:56 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODCAT012](
	[ClaveParo] [varchar](4) NOT NULL,
	[TipoParo] [varchar](30) NOT NULL,
	[TipoParoValida] [varchar](4) NULL,
	[TipoMaquina] [varchar](2) NULL,
	[AplicaPareto] [bit] NOT NULL,
	[DescuentoIndicador] [bit] NOT NULL,
	[Observaciones] [varchar](130) NULL,
	[Autoriza] [bit] NOT NULL,
	[EsProgramado] [bit] NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [datetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaBaja] [datetime] NULL,
	[UsuarioBaja] [char](6) NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
 CONSTRAINT [PK_FCAPRODCAT012] PRIMARY KEY NONCLUSTERED 
(
	[ClaveParo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODCAT012] ADD  CONSTRAINT [DF_FCAPRODCAT012_AplicaPareto]  DEFAULT ((0)) FOR [AplicaPareto]
GO

ALTER TABLE [dbo].[FCAPRODCAT012] ADD  CONSTRAINT [DF_FCAPRODCAT012_DescuentoIndicador]  DEFAULT ((0)) FOR [DescuentoIndicador]
GO

ALTER TABLE [dbo].[FCAPRODCAT012] ADD  CONSTRAINT [DF__FCAPRODCA__Autor__18EC8089]  DEFAULT ((0)) FOR [Autoriza]
GO

ALTER TABLE [dbo].[FCAPRODCAT012] ADD  CONSTRAINT [DF_FCAPRODCAT012_EsProgramado]  DEFAULT ((0)) FOR [EsProgramado]
GO

ALTER TABLE [dbo].[FCAPRODCAT012] ADD  CONSTRAINT [DF_FCAPRODCAT012_Estatus]  DEFAULT ((0)) FOR [Estatus]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Valdrá 1 cuando el tipo de paro capturado se requiera visualizar en el reporte de análisis de pareto (cmoRep054) y 0 cuando no se deba mostrar.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT012', @level2type=N'COLUMN',@level2name=N'AplicaPareto'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el paro se descuenta en indicadores de paros de fabrica de cajas' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT012', @level2type=N'COLUMN',@level2name=N'DescuentoIndicador'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Aqui se capturará cuando se debe usar este Paro y una definición del mismo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT012', @level2type=N'COLUMN',@level2name=N'Observaciones'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el paro tiene asignados Autorizadores, donde 0 es = no tiene asignado autorizadores y 1 es = si tiene autorizadores.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT012', @level2type=N'COLUMN',@level2name=N'Autoriza'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el tipo de paro es programado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT012', @level2type=N'COLUMN',@level2name=N'EsProgramado'
GO


