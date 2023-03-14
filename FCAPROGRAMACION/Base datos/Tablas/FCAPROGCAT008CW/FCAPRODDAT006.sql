USE [FcaCajas01]
GO

/****** Object:  Table [dbo].[FCAPRODDAT006]    Script Date: 03/12/2021 04:27:39 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--drop table FCAPRODDAT006
CREATE TABLE [dbo].[FCAPRODDAT006](
	[ClaveMaquina] [char](5) NOT NULL,
	[CodVariable] [smallint] NOT NULL,
	[Cantidad] [decimal](9, 4) NOT NULL,
	Estatus bit not null,
	[UsuarioInsert] [char](6) NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioUpdate] [char](6) NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioDelete] [char](6) NULL,
	[FechaDelete] [smalldatetime] NULL,
 CONSTRAINT [PK_FCAPRODDAT006] PRIMARY KEY CLUSTERED 
(
	[ClaveMaquina] ASC,
	[CodVariable] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

--ALTER TABLE [dbo].[FCAPRODDAT006]  WITH NOCHECK ADD  CONSTRAINT [FK_FCAPRODDAT006_CmoCat077] FOREIGN KEY([CodVariable])
--REFERENCES [dbo].[CmoCat077] ([CodVariable])
--NOT FOR REPLICATION 
--GO

--ALTER TABLE [dbo].[FCAPRODDAT006] CHECK CONSTRAINT [FK_FCAPRODDAT006_CmoCat077]
--GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Clave de la Maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT006', @level2type=N'COLUMN',@level2name=N'ClaveMaquina'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Codigo de la Variable' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT006', @level2type=N'COLUMN',@level2name=N'CodVariable'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Cantidad de la Variable en la Maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT006', @level2type=N'COLUMN',@level2name=N'Cantidad'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que Configuro la cantidad a la variable' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT006', @level2type=N'COLUMN',@level2name=N'UsuarioInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se configuro la cantidad a la variable' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT006', @level2type=N'COLUMN',@level2name=N'FechaInsert'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que modifico la cantidad a la variable' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT006', @level2type=N'COLUMN',@level2name=N'UsuarioUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se Modifico la cantidad a la variable' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPRODDAT006', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

INSERT FCAPRODDAT006 (ClaveMaquina,CodVariable,Cantidad,Estatus,UsuarioInsert,FechaInsert)
SELECT ClaveMaquina,CodVariable,Cantidad,0,Usuario,Fecha FROM Cajas01..CMODAT150
