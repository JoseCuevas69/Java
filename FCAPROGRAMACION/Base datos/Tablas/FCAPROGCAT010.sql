USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGCAT010]    Script Date: 24/03/2022 10:32:59 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGCAT010](
	[IdTipoCaja] [int] IDENTITY(1,1) NOT NULL,
	[ClaveDiseno] [varchar](10) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[RegExporta] [varchar](50) NULL,
	[PermiteCotDirecta] [bit] NOT NULL,
	[ConSuaje] [bit] NOT NULL,
	[FraccionArancelaria] [varchar](10) NULL,
	[FechaInsert] [datetime] NULL,
	[UsuarioInsert] [varchar](6) NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [varchar](6) NULL,
	[FechaBaja] [datetime] NULL,
	[UsuarioBaja] [varchar](6) NULL,
 CONSTRAINT [PK_FCAPROGCAT010] PRIMARY KEY CLUSTERED 
(
	[ClaveDiseno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGCAT010] ADD  CONSTRAINT [DF_FCAPROGCAT010_Estatus]  DEFAULT ((0)) FOR [Estatus]
GO

ALTER TABLE [dbo].[FCAPROGCAT010] ADD  CONSTRAINT [DF__FCAPROGCA__Permi__5F5EFD72]  DEFAULT ((0)) FOR [PermiteCotDirecta]
GO

ALTER TABLE [dbo].[FCAPROGCAT010] ADD  CONSTRAINT [DF__FCAPROGCA__ConSu__605321AB]  DEFAULT ((0)) FOR [ConSuaje]
GO

ALTER TABLE [dbo].[FCAPROGCAT010] ADD  CONSTRAINT [DF__FCAPROGCA__Fracc__614745E4]  DEFAULT ('') FOR [FraccionArancelaria]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Permite cotización directa en solicitud múltiple Cmo030MF.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT010', @level2type=N'COLUMN',@level2name=N'PermiteCotDirecta'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'indica si el tipo de caja lleva suaje' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT010', @level2type=N'COLUMN',@level2name=N'ConSuaje'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Atributo opcional que sirve para expresar la fracción arancelaria correspondiente a la descripción de la mercancía exportada.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT010', @level2type=N'COLUMN',@level2name=N'FraccionArancelaria'
GO


