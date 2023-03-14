USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGCAT004]    Script Date: 24/03/2022 10:30:20 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGCAT004](
	[Clave] [nvarchar](10) NOT NULL,
	[Presentacion] [nvarchar](10) NOT NULL,
	[Liner1] [nvarchar](8) NULL,
	[Medium1] [nvarchar](8) NULL,
	[Liner2] [nvarchar](8) NULL,
	[Medium2] [nvarchar](8) NULL,
	[Liner3] [nvarchar](8) NULL,
	[Medium3] [nvarchar](8) NULL,
	[Liner4] [nvarchar](8) NULL,
	[PrimeraFlauta] [nvarchar](1) NULL,
	[SegundaFlauta] [nvarchar](1) NULL,
	[TerceraFlauta] [nvarchar](1) NULL,
	[PesoM2] [real] NOT NULL,
	[Descripcion] [nvarchar](40) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[ClaveIngles] [varchar](15) NULL,
	[Mullen] [tinyint] NOT NULL,
	[FechaInsert] [datetime] NOT NULL,
	[FechaUpdate] [datetime] NULL,
	[FechaBaja] [datetime] NULL,
	[UsuarioInsert] [varchar](6) NOT NULL,
	[UsuarioUpdate] [varchar](6) NULL,
	[UsuarioBaja] [varchar](6) NULL,
 CONSTRAINT [PK_FCAPROGCAT004] PRIMARY KEY NONCLUSTERED 
(
	[Clave] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGCAT004] ADD  CONSTRAINT [DF_FCAPROGCAT004_PesoM2]  DEFAULT ((0)) FOR [PesoM2]
GO

ALTER TABLE [dbo].[FCAPROGCAT004] ADD  CONSTRAINT [DF_FCAPROGCAT004_Estatus]  DEFAULT ((0)) FOR [Estatus]
GO

ALTER TABLE [dbo].[FCAPROGCAT004] ADD  CONSTRAINT [DF__FCAPROGCA__Mulle__3C9FD11A]  DEFAULT ((3)) FOR [Mullen]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si una resistencia es de tipo mullen.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT004', @level2type=N'COLUMN',@level2name=N'Mullen'
GO


