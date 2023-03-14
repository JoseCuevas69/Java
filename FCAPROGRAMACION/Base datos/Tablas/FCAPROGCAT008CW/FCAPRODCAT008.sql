USE [FCACajas01]
GO

/****** Object:  Table [dbo].[FCAPRODCAT008]    Script Date: 01/12/2021 03:47:22 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODCAT008](
	[IdTripulacion] [int] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Descripcion] [varchar](150) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioUpdate] [char](6)  NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioDelete] [char](6)  NULL,
	[FechaDelete] [smalldatetime]  NULL,
 CONSTRAINT [PK_FCAPRODCAT008] PRIMARY KEY CLUSTERED 
(
	[IdTripulacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de tripulacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT008', @level2type=N'COLUMN',@level2name=N'IdTripulacion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nombre Corto de Tripulación' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT008', @level2type=N'COLUMN',@level2name=N'Nombre'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Descripcion de tripulacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT008', @level2type=N'COLUMN',@level2name=N'Descripcion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario ERP Aque agrega, o ultimo que modifica o si esta eliminado es el usuario que eliminó el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT008', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 Activo 1 Eliminado' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT008', @level2type=N'COLUMN',@level2name=N'Estatus'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha que se agrego, o ultima fecha de modificación o si esta eliminado es la fecha en que se eliminó el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODCAT008', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

INSERT FCAPRODCAT008 (IdTripulacion,Nombre,Descripcion,Estatus,FechaInsert,UsuarioInsert )
select IdTripulacion,Nombre,Descripcion,status,fechaERp,usuario from cajas01..CmoCat071