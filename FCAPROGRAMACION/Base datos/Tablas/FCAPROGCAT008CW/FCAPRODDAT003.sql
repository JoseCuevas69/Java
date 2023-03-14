USE [FcaCajas]
GO

/****** Object:  Table [dbo].[FCAPRODDAT003]    Script Date: 27/11/2021 11:13:34 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FCAPRODDAT003](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ZonaId] [char](2) not null,
	[ClaveMaquina] [varchar](10) NOT NULL,
	[RInicial] [int] NOT NULL,
	[RFinal] [int] NOT NULL,
	[Desperdicio] [decimal](9, 5) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioUpdate] [char](6)  NULL,
	[FechaDelete] [smalldatetime] NULL,
	[UsuarioDelete] [char](6)  NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPRODDAT003] ADD  CONSTRAINT [DF_FCAPRODDAT003_FechaInsert]  DEFAULT (getdate()) FOR [FechaInsert]
GO

ALTER TABLE [dbo].[FCAPRODDAT003] ADD  CONSTRAINT [DF_FCAPRODDAT003_Estatus]  DEFAULT ((0)) FOR [Estatus]
GO

--ALTER TABLE [dbo].[FCAPRODDAT003] ADD  CONSTRAINT [DF_FCAPRODDAT003_UsuarioInsert]  DEFAULT ('') FOR [Usuario]
--GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ID de la tabla' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de la maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'ClaveMaquina'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Rango Inicial' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'RInicial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Rango Final' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'RFinal'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Desperdicio' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'Desperdicio'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha ERP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Estatus' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'Estatus'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha de Eliminación' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario ERP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT003', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

INSERT FCAPRODDAT003
SELECT '01',ClaveMaquina,RInicial,RFinal,Desperdicio,Estatus,FechaERP,Usuario,null,null,null,null FROM Cajas01..CmoDat269

INSERT FCAPRODDAT003
SELECT '02',ClaveMaquina,RInicial,RFinal,Desperdicio,Estatus,FechaERP,Usuario,null,null,null,null FROM Cajas02..CmoDat269

INSERT FCAPRODDAT003
SELECT '05',ClaveMaquina,RInicial,RFinal,Desperdicio,Estatus,FechaERP,Usuario,null,null,null,null FROM Cajas05..CmoDat269

--delete from  FCAPRODDAT003

--drop table FCAPRODDAT003
select * from FCAPRODDAT003 order by id asc