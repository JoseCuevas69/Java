USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGCAT009]    Script Date: 26/03/2022 09:28:25 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGCAT009](
	[TipoMaquina] [nvarchar](2) NOT NULL,
	[ClaveProceso] [nvarchar](10) NOT NULL,
	[Descripcion] [nvarchar](40) NULL,
	[Estatus] [bit] NOT NULL,
	[Tratamiento] [bit] NOT NULL,
	[SubProceso] [char](6) NULL,
	[Tintas] [char](3) NULL,
	[ConSuaje] [bit] NOT NULL,
	[FechaInsert] [datetime] NOT NULL,
	[UsuarioInsert] [varchar](6) NOT NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [varchar](6) NULL,
	[FechaBaja] [datetime] NULL,
	[UsuarioBaja] [varchar](6) NULL,
 CONSTRAINT [PK_FCAPROGCAT009] PRIMARY KEY NONCLUSTERED 
(
	[TipoMaquina] ASC,
	[ClaveProceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGCAT009] ADD  CONSTRAINT [DF_FCAPROGCAT009_Status]  DEFAULT ((0)) FOR [Estatus]
GO

ALTER TABLE [dbo].[FCAPROGCAT009] ADD  CONSTRAINT [DF_FCAPROGCAT009_Tratamiento]  DEFAULT ((0)) FOR [Tratamiento]
GO

ALTER TABLE [dbo].[FCAPROGCAT009] ADD  CONSTRAINT [DF__FCAPROGCA__ConSu__10C14EDC]  DEFAULT ((0)) FOR [ConSuaje]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el proceso lleva Tratamiento especial en los papeles' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT009', @level2type=N'COLUMN',@level2name=N'Tratamiento'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave Equivalente del Proceso de Costos' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT009', @level2type=N'COLUMN',@level2name=N'SubProceso'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Número de tintas que usa el proceso' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT009', @level2type=N'COLUMN',@level2name=N'Tintas'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si la clave de proceso lleva suaje' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT009', @level2type=N'COLUMN',@level2name=N'ConSuaje'
GO

