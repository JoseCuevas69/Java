USE [CecsoPlan01]
GO

/****** Object:  UserDefinedTableType [dbo].[CMODAT017TD_001]    Script Date: 19/10/2022 03:30:12 p.m. ******/
CREATE TYPE [dbo].[CMODAT017TD_001] AS TABLE(
	[ID] [int] NULL,
	[OP] [varchar](10) NULL,
	[Liner1] [varchar](12) NULL,
	[PresentacionArticulo] [varchar](10) NULL,
	[PresentacionPapel] [varchar](10) NULL,
	[PintaCorr] [bit] NULL,
	[PintaImp] [bit] NULL,
	[Validar] [bit] NOT NULL DEFAULT ((1))
)
GO


