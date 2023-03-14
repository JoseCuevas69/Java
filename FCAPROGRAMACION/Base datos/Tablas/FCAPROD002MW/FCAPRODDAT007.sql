USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPRODDAT007]    Script Date: 26/03/2022 09:27:03 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODDAT007](
	[TipoMaquina] [nvarchar](2) NULL,
	[ClaveMaquina] [nvarchar](5) NULL,
	[ClaveProceso] [char](10) NULL,
	[TiempoStd] [smallint] NULL,
	[Eficiencia] [decimal](9, 4) NOT NULL,
	[ProduccionHora] [real] NULL,
	[VelocidadObjetivo] [decimal](7, 2) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaDelete] [smalldatetime] NULL,
	[UsuarioDelete] [char](6) NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODDAT007] ADD  CONSTRAINT [DF_FCAPRODDAT007_Eficiencia]  DEFAULT ((0)) FOR [Eficiencia]
GO

ALTER TABLE [dbo].[FCAPRODDAT007] ADD  DEFAULT ((0)) FOR [VelocidadObjetivo]
GO

ALTER TABLE [dbo].[FCAPRODDAT007] ADD  CONSTRAINT [DF_FCAPRODDAT007_Estatus]  DEFAULT ((1)) FOR [Estatus]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Establece la velocidad Objetivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT007', @level2type=N'COLUMN',@level2name=N'VelocidadObjetivo'
GO


