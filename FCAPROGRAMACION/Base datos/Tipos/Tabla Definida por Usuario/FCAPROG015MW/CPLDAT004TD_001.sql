USE [CecsoPlan01]
GO

/****** Object:  UserDefinedTableType [dbo].[CPLDAT004TD_001]    Script Date: 19/10/2022 03:29:03 p.m. ******/
CREATE TYPE [dbo].[CPLDAT004TD_001] AS TABLE(
	[Prior] [bit] NULL,
	[Usar] [bit] NULL,
	[Refile] [bit] NULL,
	[Op] [varchar](10) NULL,
	[FechaEntrega] [varchar](10) NULL,
	[Cliente] [varchar](100) NULL,
	[ClaveArticulo] [varchar](10) NULL,
	[Articulo] [varchar](100) NULL,
	[Cantidad] [int] NULL,
	[Hojas] [int] NULL,
	[Ancho] [real] NULL,
	[Largo] [real] NULL,
	[Piezas] [real] NULL,
	[Resistencia] [varchar](12) NULL,
	[Flauta] [varchar](10) NULL,
	[Tkg] [int] NULL,
	[Lamina] [varchar](10) NULL,
	[Parcial] [varchar](10) NULL,
	[Mas] [int] NULL,
	[Proceso] [varchar](2) NULL,
	[CantidadTras] [int] NULL,
	[CantidadSol] [int] NULL,
	[Autorizado] [bit] NULL,
	[Variacion] [real] NULL,
	[ConScore] [bit] NULL,
	[Existencia] [int] NULL,
	[Utilizar] [bit] NULL,
	[Tm2] [int] NULL,
	[ExcedentePT] [int] NULL,
	[ExcedeLamina] [int] NULL,
	[CantAnt] [int] NULL
)
GO


