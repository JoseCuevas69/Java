USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAVENTCAT009]    Script Date: 24/03/2022 10:24:12 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAVENTCAT009](
	[Subcodigo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[CodTipoIndustria] [char](3) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [datetime] NOT NULL,
	[UsuarioInsert] [varchar](6) NOT NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [varchar](6) NULL,
	[NumSubcodigo] [char](4) NULL,
 CONSTRAINT [PK_FCAVENTCAT009] PRIMARY KEY CLUSTERED 
(
	[Subcodigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Numero de identificacion de la tabla original CMOCAT013' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAVENTCAT009', @level2type=N'COLUMN',@level2name=N'NumSubcodigo'
GO


