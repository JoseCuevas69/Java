USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPRODDAT005]    Script Date: 03/12/2021 08:55:16 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--drop table FCAPRODDAT005
CREATE TABLE [dbo].[FCAPRODDAT005](
	[idTripulacion] [int] NOT NULL,
	[ClaveMaquina] [char](5) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [smalldatetime]  NULL,
	[UsuarioUpdate] [char](6)  NULL,
	[FechaDelete] [smalldatetime]  NULL,
	[UsuarioDelete] [char](6) NULL
 CONSTRAINT [PK_FCAPRODDAT005A] PRIMARY KEY CLUSTERED 
(
	[idTripulacion] ASC,
	[ClaveMaquina] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODDAT005] ADD  CONSTRAINT [DF_FCAPRODDAT005_idTripulacion]  DEFAULT (0) FOR [idTripulacion]
GO

ALTER TABLE [dbo].[FCAPRODDAT005] ADD  CONSTRAINT [DF_FCAPRODDAT005_FechaInsert]  DEFAULT (getdate()) FOR [FechaInsert]
GO

ALTER TABLE [dbo].[FCAPRODDAT005] ADD  CONSTRAINT [DF_FCAPRODDAT005_Estatus]  DEFAULT (0) FOR [Estatus]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de la Tripulacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT005', @level2type=N'COLUMN',@level2name=N'idTripulacion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de la Maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT005', @level2type=N'COLUMN',@level2name=N'ClaveMaquina'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha de Actualizacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT005', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de usuario ERP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT005', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el registro esta Activo (0-Activo, 1-inactivo)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT005', @level2type=N'COLUMN',@level2name=N'Estatus'
GO

INSERT FCAPRODDAT005 (idTripulacion,ClaveMaquina,Estatus,FechaInsert,UsuarioInsert)
select idTripulacion,ClaveMaquina,Estatus,Fecha,Usuario from Cajas01..cmodat143

