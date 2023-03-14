USE [CecsoPlan01]
GO

/****** Object:  UserDefinedTableType [dbo].[CPLDAT002TD_001]    Script Date: 19/10/2022 03:25:42 p.m. ******/
CREATE TYPE [dbo].[CPLDAT002TD_001] AS TABLE(
	[Orden] [smallint] NULL,
	[Pulg] [bit] NULL,
	[Clave] [nvarchar](28) NULL,
	[Liner1] [char](12) NULL,
	[Corrugado1] [char](12) NULL,
	[Liner2] [char](12) NULL,
	[Corrugado2] [char](12) NULL,
	[Liner3] [char](12) NULL,
	[Corrugado3] [char](12) NULL,
	[Liner4] [char](12) NULL,
	[Empalme1] [char](12) NULL,
	[Empalme2] [char](12) NULL,
	[Empalme3] [char](12) NULL,
	[Empalme4] [char](12) NULL,
	[EmpalmeC1] [char](12) NULL,
	[EmpalmeC2] [char](12) NULL,
	[EmpalmeC3] [char](12) NULL,
	[AnchoL1] [decimal](4, 2) NULL,
	[AnchoEmpalme1] [decimal](4, 2) NULL,
	[AnchoL2] [decimal](4, 2) NULL,
	[AnchoEmpalme2] [decimal](4, 2) NULL,
	[AnchoL3] [decimal](4, 2) NULL,
	[AnchoEmpalme3] [decimal](4, 2) NULL,
	[AnchoL4] [decimal](4, 2) NULL,
	[AnchoEmpalme4] [decimal](4, 2) NULL,
	[AnchoC1] [decimal](4, 2) NULL,
	[AnchoEmpalmeC1] [decimal](4, 2) NULL,
	[AnchoC2] [decimal](4, 2) NULL,
	[AnchoEmpalmeC2] [decimal](4, 2) NULL,
	[AnchoC3] [decimal](4, 2) NULL,
	[AnchoEmpalmeC3] [decimal](4, 2) NULL,
	[Ancho] [real] NULL
)
GO


