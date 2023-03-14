USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGDAT017]    Script Date: 31/01/2022 01:54:13 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGDAT017](
	[Fecha] [date] NOT NULL,
	[Turnos] [decimal](3, 2) NOT NULL,
	[TipoMaquina] [char](2) NOT NULL,
	[ClaveMaquina] [char](10) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [datetime] NOT NULL,
	[FechaUpdate] [datetime] NULL,
	[FechaBaja] [datetime] NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[UsuarioUpdate] [char](6) NULL,
	[UsuarioBaja] [char](6) NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGDAT017] ADD  CONSTRAINT [DF_FCAPROGDAT017_Turnos]  DEFAULT ((0)) FOR [Turnos]
GO

ALTER TABLE [dbo].[FCAPROGDAT017] ADD  CONSTRAINT [DF_FCAPROGDAT017_Status]  DEFAULT ((0)) FOR [Estatus]
GO


