USE [CecsoPlan01]
GO

/****** Object:  UserDefinedTableType [dbo].[CMODAT011TD_001]    Script Date: 02/11/2022 01:52:06 p.m. ******/
CREATE TYPE [dbo].[CMODAT011TD_001] AS TABLE(
	[Seleccionado] [bit] NULL,
	[UltimoProceso] [bit] NULL,
	[Op] [varchar](20) NULL,
	[Cliente] [varchar](100) NULL,
	[Articulo] [varchar](60) NULL,
	[Cantidad] [int] NULL,
	[LargoDes] [real] NULL,
	[AnchoDes] [real] NULL,
	[PrimerColor] [varchar](13) NULL,
	[SegundoColor] [varchar](13) NULL,
	[TercerColor] [varchar](13) NULL,
	[CuartoColor] [varchar](13) NULL,
	[FechaEntrega] [smalldatetime] NULL,
	[MinutosProduccion] [smallint] NULL,
	[Orden] [smallint] NULL,
	[Programa] [int] NULL,
	[Notas] [varchar](200) NULL,
	[FijarFecha] [smalldatetime] NULL,
	[ClaveArticulo] [varchar](9) NULL,
	[FechaTermino] [smalldatetime] NULL,
	[FechaInicio] [smalldatetime] NULL,
	[Producido] [int] NULL,
	[Estatus] [char](1) NULL,
	[NotasOperacion] [varchar](200) NULL,
	[ClaveProceso] [varchar](10) NULL,
	[Proceso1] [bit] NULL,
	[ProgramaCorr] [int] NULL,
	[ClaveArticulo2] [varchar](9) NULL,
	[FechaCorrug] [smalldatetime] NULL,
	[Suspendido] [bit] NULL,
	[Electronico] [bit] NULL,
	[Pintado] [bit] NULL,
	[Status] [varchar](10) NULL,
	[LiberadoDS] [bit] NULL,
	[PSI] [decimal](18, 2) NULL,
	[LBF] [decimal](18, 2) NULL,
	[CompresionEspOtrosLBF] [decimal](18, 2) NULL,
	[EProceso] [varchar](500) NULL,
	[Minimo] [decimal](6, 2) NULL,
	[Maximo] [decimal](6, 2) NULL,
	[ConScore] [bit] NULL,
	[EnAtencion] [bit] NULL
)
GO


