USE [FcaCajas]
GO

/****** Object:  Table [dbo].[FCAPROGCAT008]    Script Date: 25/11/2021 03:18:14 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
--DROP TABLE FCAPROGCAT008
CREATE TABLE [dbo].[FCAPROGCAT008](
	[TipoMaquina] [char](2) NOT NULL,
	[ClaveMaquina] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](40) NULL,
	[Troquela] [bit] NOT NULL,
	[TintasMax] [tinyint] NOT NULL,
	[AnchoMax] [numeric](18, 2) NOT NULL,
	[AnchoMaxT] [numeric](18, 2) NOT NULL,
	[AnchoMaxAlt] [numeric](18, 2) NOT NULL,
	[AnchoMin] [numeric](18, 2) NOT NULL,
	[LargoMax] [numeric](18, 2) NOT NULL,
	[LargoMaxT] [numeric](18, 2) NOT NULL,
	[LargoMin] [numeric](18, 2) NOT NULL,
	[CostoMinuto] [money] NOT NULL,
	[CapacidadSemanal] [int] NOT NULL,
	[SalariosTurno] [money] NOT NULL,
	[Desp1000] [money] NOT NULL,
	[Desp10000] [money] NOT NULL,
	[DespMayor10000] [money] NOT NULL,
	[M2Hora] [decimal](18, 0) NULL,
	[NoAceptaPiezasxCorte] [bit] NOT NULL,
	[Eficiencia] [decimal](9, 4) NOT NULL,
	[Tproceso] [tinyint] NULL,
	[Default] [bit] NOT NULL,
	[Imprime] [bit] NOT NULL,
	[CodEvaluacion] [char](2) NULL,
	[MinStd] [smallint] NOT NULL,
	[TurnosxDia] [tinyint] NOT NULL,
	[EvaluaMtto] [bit] NOT NULL,
	[PorcenEvaluaMtto] [decimal](6, 2) NOT NULL,
	[Evalua] [char](1) NOT NULL,
	[ValMinStd] [bit] NOT NULL,
	[EvaluaVelocidad] [bit] NULL,
	[MaquinaPar] [int] NOT NULL,
	[PzaValStd] [smallint] NOT NULL,
	[EsCapAut] [bit] NOT NULL,
	[UbucacionPlcCP] [tinyint] NOT NULL,
	[PermiteMoficarProd] [bit] NOT NULL,
	[ImplementadoAut] [bit] NOT NULL,
	[TipoConsulta] [tinyint] NOT NULL,
	[IsRecord] [bit] NOT NULL,
	[LimiteReserva] [int] NULL,
	[UtilizaSuaje66] [bit] NULL,
	[UtilizaSuaje50] [bit] NULL,
	[EsCortadora] [bit] NOT NULL,
	[EsEtiquetadora] [bit] NULL,
	[idAreaCosto] [tinyint] NULL,
	[Zona] [char](2) NOT NULL,
	[Estatus] [bit] NOT NULL,
	[FechaInsert] [smalldatetime] NOT NULL,
	[UsuarioInsert][char](6) NOT NULL,
	[FechaUpdate] [smalldatetime] NULL,
	[UsuarioUpdate][char](6) NULL,
	[FechaDelete] [smalldatetime] NULL,
	[UsuarioDelete][char](6) NULL
 CONSTRAINT [PK_FCAPROGCAT008] PRIMARY KEY NONCLUSTERED 
(
	[TipoMaquina] ASC,
	[ClaveMaquina] ASC,
	[Zona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Troquela]  DEFAULT (0) FOR [Troquela]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_TintasMax]  DEFAULT (0) FOR [TintasMax]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_AnchoMax]  DEFAULT (0) FOR [AnchoMax]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_AnchoMaxT]  DEFAULT (0) FOR [AnchoMaxT]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_AnchoMaxAlt]  DEFAULT (0) FOR [AnchoMaxAlt]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_AnchoMin]  DEFAULT (0) FOR [AnchoMin]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_LargoMax]  DEFAULT (0) FOR [LargoMax]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_LargoMaxT]  DEFAULT (0) FOR [LargoMaxT]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_LargoMin]  DEFAULT (0) FOR [LargoMin]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_CostoMinuto]  DEFAULT (0) FOR [CostoMinuto]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_CapacidadSemanal]  DEFAULT (0) FOR [CapacidadSemanal]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_SalariosTurno]  DEFAULT (0) FOR [SalariosTurno]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Desp1000]  DEFAULT (0) FOR [Desp1000]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Desp10000]  DEFAULT (0) FOR [Desp10000]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_DespMayor10000]  DEFAULT (0) FOR [DespMayor10000]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Estatus]  DEFAULT (1) FOR [Estatus]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_M2Hora]  DEFAULT (0) FOR [M2Hora]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_NoAceptaPiezasxCorte]  DEFAULT (0) FOR [NoAceptaPiezasxCorte]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Eficiencia]  DEFAULT (0) FOR [Eficiencia]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Default]  DEFAULT (0) FOR [Default]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Imprime]  DEFAULT (0) FOR [Imprime]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_MinStd]  DEFAULT (0) FOR [MinStd]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_TurnosxDia]  DEFAULT (0) FOR [TurnosxDia]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_EvaluaMtto]  DEFAULT (0) FOR [EvaluaMtto]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_PorcenEvaluaMtto]  DEFAULT (0) FOR [PorcenEvaluaMtto]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_Evalua]  DEFAULT (0) FOR [Evalua]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF__FCAPROGCAT008__ValMi__52050254]  DEFAULT (0) FOR [ValMinStd]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT (0) FOR [EvaluaVelocidad]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT (0) FOR [MaquinaPar]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT (0) FOR [PzaValStd]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [EsCapAut]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [UbucacionPlcCP]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [PermiteMoficarProd]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [ImplementadoAut]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [TipoConsulta]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [IsRecord]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [LimiteReserva]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [UtilizaSuaje66]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [UtilizaSuaje50]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [EsCortadora]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  CONSTRAINT [DF_FCAPROGCAT008_EsEtiquetadora]  DEFAULT ((0)) FOR [EsEtiquetadora]
GO

ALTER TABLE [dbo].[FCAPROGCAT008] ADD  DEFAULT ((0)) FOR [idAreaCosto]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si la maquina es Flexografica. Se usa distinguir de las maquinas troqueladoras.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'Imprime'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Codigo del Tipo de Evaluacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'CodEvaluacion'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Minutos Standar de la Maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'MinStd'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Turnos x Dia de la Maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'TurnosxDia'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 = No es Evaluada por Mantenimiento y 1 = Evaluada por mantenimiento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'EvaluaMtto'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Porcentajes que se Evaluan en Mantenimiento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'PorcenEvaluaMtto'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 = No Se Evalua, 1 = Eficiencia, 2 = M2 y 3 = Piezas' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'Evalua'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Usuario que Relizo alguna modificacion a la maquina' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'UsuarioUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Fecha en que se realizo la Modificacion' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'FechaUpdate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el tipo de maquina aplicara para el calculo de la disminucion del 28%.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'EvaluaVelocidad'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica las maquinas que son par, ejemplo cuando dos maquinas tengan el mismo valor seran maquinas par.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'MaquinaPar'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Contiene las piezas las cuales se consideran para aplicar el porcentaje de la velocidad estandar.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'PzaValStd'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica las maquinas en donde se procesa la producion Automatica.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'EsCapAut'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica la Ubicacion del PLC que envia la señal al CECSOPLAN  (0 = NO TIENE 1 = ALIMENTADOR  2 = BARRAS).' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'UbucacionPlcCP'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si puede modificar la producción de impresoras (0= no permite,1 si permite).' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'PermiteMoficarProd'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si en el CPLCAP012 se aplican las validacion de la segunda etapa del proceso productivo.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'ImplementadoAut'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica cómo se utiliza en el reporte de records de producción (1= records por maquina 2= records por pzas. 3=ambos casos).' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'TipoConsulta'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si es usado en el reporte de records de producción (0= no se toma en cuenta para el reporte, 1= si se toma en cuenta para el reporte).' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'IsRecord'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Limite de reserva de carga' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'LimiteReserva'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si la maquina utiliza suaje 66' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'UtilizaSuaje66'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si la maquina utiliza suaje 50' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'UtilizaSuaje50'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Identifica si la maquina es cortadora.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'EsCortadora'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0=No, 1= Si  ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'EsEtiquetadora'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si aplica la maquina para Costos Historicos (0-NO APLICA, 1-Corrugadora, 2-Impresora, 3-Acabados).' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'FCAPROGCAT008', @level2type=N'COLUMN',@level2name=N'idAreaCosto'
GO

insert fcaPROGCAT008 ([TipoMaquina] ,
	[ClaveMaquina] ,
	[Nombre],
	[Troquela] ,
	[TintasMax] ,
	[AnchoMax] ,
	[AnchoMaxT] ,
	[AnchoMaxAlt] ,
	[AnchoMin] ,
	[LargoMax] ,
	[LargoMaxT] ,
	[LargoMin] ,
	[CostoMinuto] ,
	[CapacidadSemanal] ,
	[SalariosTurno] ,
	[Desp1000] ,
	[Desp10000] ,
	[DespMayor10000] ,
	[M2Hora] ,
	[NoAceptaPiezasxCorte] ,
	[Eficiencia] ,
	[Tproceso] ,
	[Default] ,
	[Imprime] ,
	[CodEvaluacion] ,
	[MinStd] ,
	[TurnosxDia] ,
	[EvaluaMtto] ,
	[PorcenEvaluaMtto],
	[Evalua] ,
	[ValMinStd] ,
	[EvaluaVelocidad],
	[MaquinaPar] ,
	[PzaValStd] ,
	[EsCapAut] ,
	[UbucacionPlcCP] ,
	[PermiteMoficarProd] ,
	[ImplementadoAut] ,
	[TipoConsulta], 
	[IsRecord] ,
	[LimiteReserva],
	[UtilizaSuaje66] ,
	[UtilizaSuaje50],
	[EsCortadora] ,
	[EsEtiquetadora],
	[idAreaCosto] ,
	[Zona] ,
	[Estatus] ,
	[FechaInsert] ,
	[UsuarioInsert],
	[FechaUpdate] ,
	[UsuarioUpdate],
	[FechaDelete] ,
	[UsuarioDelete])
	SELECT [Tipo Maquina],  [Clave Maquina] ,
	[Nombre],
	[Troquela] ,
	[TintasMax] ,
	[AnchoMax] ,
	[AnchoMaxT] ,
	[AnchoMaxAlt] ,
	[AnchoMin] ,
	[LargoMax] ,
	[LargoMaxT] ,
	[LargoMin] ,
	[CostoMinuto] ,
	[CapacidadSemanal] ,
	[SalariosTurno] ,
	[Desp1000] ,
	[Desp10000] ,
	[DespMayor10000] ,
	[M2 Hora] ,
	[NoAcepta PiezasxCorte] ,
	[Eficiencia] ,
	[Tproceso] ,
	[Default] ,
	[Imprime] ,
	[CodEvaluacion] ,
	[MinStd] ,
	[TurnosxDia] ,
	[EvaluaMtto] ,
	[PorcenEvaluaMtto],
	[Evalua] ,
	[ValMinStd] ,
	[EvaluaVelocidad],
	[MaquinaPar] ,
	[PzaValStd] ,
	[EsCapAut] ,
	[UbucacionPlcCP] ,
	[PermiteMoficarProd] ,
	[ImplementadoAut] ,
	[TipoConsulta], 
	[IsRecord] ,
	[LimiteReserva],
	[UtilizaSuaje66] ,
	[UtilizaSuaje50],
	[EsCortadora] ,
	[EsEtiquetadora],
	[idAreaCosto] ,
	'05' ,
	Status,
	ISNULL(FechaMODIFICACION,GETDATE()) ,
	ISNULL(UsuarioModificacion,'001000'),
	NULL ,
	NULL ,
	NULL  ,
	NULL 
	FROM Cajas02..CMOCAT011

