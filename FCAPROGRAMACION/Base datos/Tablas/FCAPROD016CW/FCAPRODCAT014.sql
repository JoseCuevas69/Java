USE [FcaCajas]
GO

/****** Object:  Table [dbo].[FCAPRODCAT014]    Script Date: 29/08/2022 09:27:47 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODCAT014](
	[Id] [int] IDENTITY (1,1),
	[Clave] [char](3) NULL,
	[ZonaId] [char](2) NULL,
	[Nombre] [char](30) NULL,
	[Estatus] [bit] NOT NULL,
	[Filtro] [char](1) NULL,
	[FechaInsert] [datetime] NULL DEFAULT GETDATE(),
	[UsuarioInsert] [char](6) NULL,
	[FechaUpdate] [datetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaBaja] [smalldatetime] NULL,
	[UsuarioBaja] [char](6) NULL,
	[EsActivo] [bit] NOT NULL DEFAULT 1
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODCAT014] ADD  CONSTRAINT [DF_FCAPRODCAT014 _Estatus]  DEFAULT ((0)) FOR [Estatus]
GO


