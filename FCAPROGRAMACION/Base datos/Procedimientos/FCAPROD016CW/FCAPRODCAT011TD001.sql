USE [FCACAJAS]
GO
/****** Object:  UserDefinedTableType [dbo].[FCAPRODCAT011TD001]    Script Date: 30/08/2022 09:34:58 a. m. ******/
CREATE TYPE [dbo].[FCAPRODCAT011TD001] AS TABLE(
	[ClaveArea] [varchar](3) NULL,
	[ClaveCargo] [varchar](3) NOT NULL,
	[Balance] [bit] NOT NULL,
	[ObjetivoEst] [int] NULL,
	[ObjetivoMax] [int] NULL
)
GO


