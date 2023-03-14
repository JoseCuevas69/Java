USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGCAT015]    Script Date: 26/03/2022 09:43:27 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGCAT015](
	[Clave] [char](3) NOT NULL,
	[Descripcion] [char](40) NOT NULL,
	[M1] [char](2) NULL,
	[M2] [char](2) NULL,
	[M3] [char](2) NULL,
	[M4] [char](2) NULL,
	[M5] [char](2) NULL,
	[HorasAdicional] [smallint] NOT NULL,
	[UnionPegada] [bit] NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaDelete] [smalldatetime] NULL,
	[UsuarioDelete] [char](6) NULL,
	[Estatus] [bit] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGCAT015] ADD  CONSTRAINT [DF_FCAPROGCAT015_HorasAdicional]  DEFAULT ((0)) FOR [HorasAdicional]
GO

ALTER TABLE [dbo].[FCAPROGCAT015] ADD  CONSTRAINT [DF_FCAPROGCAT015_UnionPegada]  DEFAULT ((0)) FOR [UnionPegada]
GO

ALTER TABLE [dbo].[FCAPROGCAT015] ADD  CONSTRAINT [DF_FCAPROGCAT015_Estatus]  DEFAULT ((1)) FOR [Estatus]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tiempo Aidicional que sera considerado para el calculo de Simulador de Fechas.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT015', @level2type=N'COLUMN',@level2name=N'HorasAdicional'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Union Pegada' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT015', @level2type=N'COLUMN',@level2name=N'UnionPegada'
GO

