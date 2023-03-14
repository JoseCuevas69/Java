USE [CecsoPlan01]
GO

/****** Object:  UserDefinedTableType [dbo].[CPLDAT009TD_001]    Script Date: 19/10/2022 03:28:10 p.m. ******/
CREATE TYPE [dbo].[CPLDAT009TD_001] AS TABLE(
	[ID] [int] NULL,
	[Secuencia] [int] NULL,
	[OP] [varchar](10) NULL,
	[Fecha] [smalldatetime] NULL,
	[Multiplos] [decimal](4, 2) NULL,
	[Ancho] [real] NULL,
	[Largo] [real] NULL,
	[Lam] [int] NULL,
	[Ancho Total] [real] NULL,
	[Ancho Papel] [real] NULL,
	[Refile] [real] NULL,
	[Metros Lineales] [int] NULL,
	[Producto] [varchar](10) NULL,
	[Parcial] [smallint] NULL,
	[Puntos] [int] NULL,
	[Resistencia] [varchar](12) NULL,
	[Flauta] [varchar](3) NULL,
	[Cliente] [varchar](80) NULL,
	[Articulo] [varchar](50) NULL,
	[ConScore] [bit] NULL,
	[AnchoStd] [decimal](6, 2) NULL,
	[Producido] [int] NULL,
	[Cantidad] [int] NULL,
	[Devuelto] [int] NULL,
	[Cortes] [int] NULL,
	[Piezas] [decimal](4, 1) NULL,
	[Hojas] [tinyint] NULL,
	[ProduccionCompleta] [bit] NULL,
	[PTActual] [int] NULL,
	[TrasENT] [int] NULL,
	[TrasSAL] [int] NULL,
	[OpValidar] [varchar](10) NULL,
	[PiezasX] [int] NULL,
	[UltFecha] [date] NULL,
	[Adicional] [decimal](18, 2) NULL,
	[HayAdicional] [bit] NULL,
	[Cancelar] [bit] NOT NULL DEFAULT ((0))
)
GO


