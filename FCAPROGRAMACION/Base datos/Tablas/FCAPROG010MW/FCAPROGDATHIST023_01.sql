USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPROGDATHIST023]    Script Date: 03/03/2022 11:52:32 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGDATHIST023](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaveMaquina] [varchar](7) NOT NULL,
	[Turnos] [smallint] NOT NULL,
	[M2CargaPendiente] [int] NOT NULL,
	[M2PromTurno] [int] NOT NULL,
	[UsuarioERP] [char](6) NOT NULL,
	[UltimaFecha] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_FCAPROGDATHIST023] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[FCAPROGDATHIST023] ADD  CONSTRAINT [DF_FCAPROGDATHIST023_Turnos]  DEFAULT ((0)) FOR [Turnos]
GO

ALTER TABLE [dbo].[FCAPROGDATHIST023] ADD  CONSTRAINT [DF_FCAPROGDATHIST023_UltimaFecha]  DEFAULT (getdate()) FOR [UltimaFecha]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Consecutivo de registros' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDATHIST023', @level2type=N'COLUMN',@level2name=N'Id'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de la maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDATHIST023', @level2type=N'COLUMN',@level2name=N'ClaveMaquina'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Total de turnos mensuales' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDATHIST023', @level2type=N'COLUMN',@level2name=N'Turnos'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'M2 en carga pendiente mensual' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDATHIST023', @level2type=N'COLUMN',@level2name=N'M2CargaPendiente'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Promedio de carga pendiente entre turnos' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDATHIST023', @level2type=N'COLUMN',@level2name=N'M2PromTurno'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'clave del usuario de captura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDATHIST023', @level2type=N'COLUMN',@level2name=N'UsuarioERP'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha automatica al insertar el registro' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDATHIST023', @level2type=N'COLUMN',@level2name=N'UltimaFecha'
GO

