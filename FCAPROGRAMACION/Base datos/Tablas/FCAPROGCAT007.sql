USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGCAT007]    Script Date: 07/03/2022 04:25:20 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGCAT007](
	[Flauta] [varchar](3) NOT NULL,
	[Factor1] [int] NOT NULL,
	[Factor2] [int] NULL,
	[Factor3] [int] NULL,
	[Pegam] [int] NULL,
	[Corrugado] [char](2) NOT NULL,
	[LaminasMT] [smallint] NOT NULL,
	[PiezasPulgada] [decimal](9, 2) NOT NULL,
	[Descripcion] [char](25) NULL,
	[FactorMtsCubicos] [decimal](6, 4) NOT NULL,
	[Altura] [decimal](5, 4) NOT NULL,
	[MostrarEnSolMultiple] [bit] NOT NULL,
	[AlturaCalcPallet] [varchar](11) NULL,
	[FlautaProgramar] [bit] NULL,
	[UsuarioInsert] [char](6) NULL,
	[FechaInsert] [datetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaUpdate] [char](10) NULL,
	[EsActivo] [bit] NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[FCAPROGCAT007] ADD  CONSTRAINT [DF_FCAPROGCAT007_PiezasPulgada]  DEFAULT ((0)) FOR [PiezasPulgada]
GO

ALTER TABLE [dbo].[FCAPROGCAT007] ADD  CONSTRAINT [DF_FCAPROGCAT007_FactorMtsCubicos]  DEFAULT ((0)) FOR [FactorMtsCubicos]
GO

ALTER TABLE [dbo].[FCAPROGCAT007] ADD  CONSTRAINT [DF_FCAPROGCAT007_Altura]  DEFAULT ((0)) FOR [Altura]
GO

ALTER TABLE [dbo].[FCAPROGCAT007] ADD  CONSTRAINT [DF_FCAPROGCAT007_MostrarEnSolMultiple]  DEFAULT ((0)) FOR [MostrarEnSolMultiple]
GO

ALTER TABLE [dbo].[FCAPROGCAT007] ADD  CONSTRAINT [DF_FCAPROGCAT007_AlturaCalcPallet]  DEFAULT ('') FOR [AlturaCalcPallet]
GO

ALTER TABLE [dbo].[FCAPROGCAT007] ADD  CONSTRAINT [DF_FCAPROGCAT007_FlautaProgramar]  DEFAULT ((0)) FOR [FlautaProgramar]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Flauta' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Flauta'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Factor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Factor1'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Factor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Factor2'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Factor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Factor3'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Pegamento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Pegam'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Corrugado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Corrugado'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Metros laminas' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'LaminasMT'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Pulgadas' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'PiezasPulgada'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripcion de flauta' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Descripcion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Factor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'FactorMtsCubicos'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Altura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'Altura'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario de registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha de registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'usuario de actualizacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'UsuarioUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha de actualizacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'activo = 1 innactivo = 0' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT007', @level2type=N'COLUMN',@level2name=N'EsActivo'
GO


