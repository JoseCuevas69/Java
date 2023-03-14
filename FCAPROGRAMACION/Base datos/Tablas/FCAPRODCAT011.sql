USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPRODCAT011]    Script Date: 24/03/2022 10:54:03 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODCAT011](
	[ClaveArea] [varchar](3) NULL,
	[ClaveCargo] [varchar](2) NOT NULL,
	[ClaveDesperdicio] [varchar](3) NOT NULL,
	[Balance] [bit] NOT NULL,
	[Estatus] [bit] NOT NULL,
	[ObjetivoEst] [int] NULL,
	[ObjetivoMax] [int] NULL,
	[FechaInsert] [datetime] NOT NULL,
	[UsuarioInsert] [varchar](6) NOT NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [varchar](6) NULL,
	[FechaDelete] [datetime] NULL,
	[UsuarioDelete] [varchar](6) NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODCAT011] ADD  CONSTRAINT [DF_FCAPRODCAT011_Balance]  DEFAULT ((0)) FOR [Balance]
GO

ALTER TABLE [dbo].[FCAPRODCAT011] ADD  CONSTRAINT [DF_FCAPRODCAT011_Estatus]  DEFAULT ((0)) FOR [Estatus]
GO


