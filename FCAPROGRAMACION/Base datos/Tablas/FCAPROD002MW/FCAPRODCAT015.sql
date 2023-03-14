USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPRODCAT015]    Script Date: 26/03/2022 09:29:04 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODCAT015](
	[ClaveArea] [char](2) NOT NULL,
	[Descripción] [char](15) NOT NULL,
	[Turno] [char](1) NOT NULL,
	[HoraInicio] [char](5) NOT NULL,
	[HoraFinal] [char](5) NOT NULL,
	[ClaveMaquina] [varchar](5) NULL,
	[Aplica] [bit] NOT NULL,
	[FechaCambio] [smalldatetime] NULL,
	[MinutosComedor] [smallint] NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaDelete] [smalldatetime] NULL,
	[UsuarioDelete] [char](6) NULL,
	[Estatus] [bit] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODCAT015] ADD  DEFAULT ((0)) FOR [MinutosComedor]
GO

ALTER TABLE [dbo].[FCAPRODCAT015] ADD  DEFAULT ((1)) FOR [Estatus]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Minutos de Comedor.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT015', @level2type=N'COLUMN',@level2name=N'MinutosComedor'
GO

