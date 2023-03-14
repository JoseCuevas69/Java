USE [FcaCajas05]
GO

/****** Object:  Table [dbo].[FCAPROGDAT023]    Script Date: 03/03/2022 11:50:05 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPROGDAT023](
	[ClaveMaquina] [varchar](7) NULL,
	[Turnos] [smallint] NULL,
	[M2CargaPendiente] [int] NULL,
	[M2PromTurno] [int] NULL,
	[Fecha] [smalldatetime] NOT NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[FCAPROGDAT023] ADD  CONSTRAINT [DF_FCAPROGDAT023_Fecha]  DEFAULT (getdate()) FOR [Fecha]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de Maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT023', @level2type=N'COLUMN',@level2name=N'ClaveMaquina'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Turnos Total Laborados en los ultimos 30 Dias' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT023', @level2type=N'COLUMN',@level2name=N'Turnos'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Carga Pendiente Total de los proximos 15 Dias' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT023', @level2type=N'COLUMN',@level2name=N'M2CargaPendiente'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'M2 Promedio Producidos por Turno en base a las estadistica de los ultimos 30 Dias.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT023', @level2type=N'COLUMN',@level2name=N'M2PromTurno'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha de Acualizacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGDAT023', @level2type=N'COLUMN',@level2name=N'Fecha'
GO

