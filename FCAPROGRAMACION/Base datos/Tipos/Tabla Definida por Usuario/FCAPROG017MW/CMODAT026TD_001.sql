USE [CecsoPlan01]
GO

/****** Object:  UserDefinedTableType [dbo].[CMODAT026TD_001]    Script Date: 02/11/2022 01:51:29 p.m. ******/
CREATE TYPE [dbo].[CMODAT026TD_001] AS TABLE(
	[Programa] [varchar](15) NULL,
	[Op] [varchar](12) NULL,
	[Cantidad] [int] NULL,
	[MaqOrigen] [varchar](10) NULL,
	[CveProceso] [varchar](10) NULL,
	[UltimoProceso] [bit] NULL,
	[Articulo] [varchar](15) NULL
)
GO


