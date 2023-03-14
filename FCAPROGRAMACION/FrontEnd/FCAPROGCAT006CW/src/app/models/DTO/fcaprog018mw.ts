import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class fcaprog018mw {
  fecha: string;
}
export class ops {
  op: string;
  articulo: string;
  largo: string;
  ancho: string;
  hojas: string;
  piezas: string;
  area: string;
  buenas: string;
  malas: string;
  cortes: string;
  m2reales: string;
}

export class buscaCaptura {
  metrosLineales: string;
  laminasDespegadas: string;
  laminasCombas: string;
  laminasDesorilladas: string;
  horaInicio: string;
  horaFinal: string;
  fecha: string;
  supervisor: string;
  idTripulacion: string;
  laminas: string;
  laminasDesperdicio: string;
  numeroCortes: string;
  op: string;
}

export class camposGenerales {
  wFechaAnterior: string;
  idUnicoProduccion: string;
  fecha: string;
  horaIni: string;
  horaFin: string;
  desperdicioImpresora: number;
  desperdicioCorrugadora: number;
  desperdicioLinea: number;
  pesoLamina: number;
  pesoCaja: number;
  retrabajo: number;
  disabledParafina: boolean;
  disabledBtnAcepta: boolean;

  claveMaquina: string;
  op: string;
  claveProceso: string;
  piezasCorte: number;
  tipoMaquina: string;
  cantidad: number;
  ultimoProceso: boolean;
  pegado: boolean;
  primerColor: string;
  segundoColor: string;
  tercerColor: string;
  cuartoColor: string;
  areaUnitaria: number;
  pesoUnitario: number;
  claveArticulo: string;
  articulo: string;
  liberadoCostos: boolean;
}
export class datosBusquedaPrograma {
  estatus: string;
  fechaSistema: string;
  horaSistema: string;
  anchoPromedio: string;
  liberadoCostos: string;
  op: string;
  articulo: string;
  largoHoja: string;
  anchoHoja: string;
  hojasCorte: string;
  piezaCorte: string;
  areaUnitaria: string;
}
export class datosBusquedaProduccion {
  claveMaquina: string;
  op: string;
  fecha: string;
  turno: string;
  cantidad: number;
  fechaSistema: string;
  idUnico: number;
}
export class comboTripulacion {
  idTripulacion: number;
  tripulacion: string;
}
export class cbxTripulaciones {
  selected: number;
  datos: Array<comboTripulacion>;
}
export class datosPrograma {
  programa: number;
  turno: string;
  supervisor: string;
  claveMaquina: string;
  op: string;
  fecha: string;
  horaInicio: string;
  horaTermino: string;
  cantidad: number;
  pickUp: number;
  minutosProduccion: number;
  desperdicioAcabados: number;
  laminaDespeg: number;
  laminaComba: number;
  laminaMedidas: number;
  laminaImpres: number;
  laminaDimens: number;
  laminaPegad: number;
  fechaSistema: string;
  usuario: string;
  excedente: number;
  expCostos: boolean;
  fechaExp: string;
  laminasDesperdicio: number;
  piezasDesperdicio: number;
  canTinta1: number;
  canTinta2: number;
  canTinta3: number;
  canTinta4: number;
  tipoParafina: string;
  sinPreparacion: boolean;
  verificaAduana: boolean;
  produccionPT: number;
  minutosFT: number;
  claveInspector: number;
  pesoLamina: number;
  pesoCaja: number;
  retrabajo: number;
  maqPA: string;
  despPA: number;
  idTripulacion: number;
  despProdEnProc: number;
  motivo: string;
  preAlimentador: boolean;
  fechaInsert: string;
  despCorrNoUtil: number;
  prodProcesoCap: number;
  despPAUtil: number;
  despImpNoConPLC: number;
  idUnico: number;
  moduloInsert: string;
  posicion: number;
  desEtFront: number;
  desEtBack: number;
  cajasComProPLC: number;
  contabilizadoGolpesXSuaje: boolean;
  verificaRuta: boolean;
  minutosComedor: number;
  cajasRecEnProd: number;
}
export class comboSupervisor {
  claveSupervisor: string;
  nombre: string;
}
export class cbxSupervisor {
  selected: string;
  datos: Array<comboSupervisor>;
}
export class comboParafina {
  idParafina: number;
  parafina: string;
}
export class cbxParafina {
  selected: number;
  datos: Array<comboParafina>;
}
export class comboMaquinas {
  claveMaquina: string;
}
export class cbxMaquinas {
  selected: string;
  datos: Array<comboMaquinas>;
}

export class actualiza {
  Programa: string;
  SFechaProduccion: string;
  HoraInicio: string;
  HoraFin: string;
  MetrosLineales: string;
  MCuadrados: string;
  KgPapel: string;
  KgDesp: string;
  LaminasDespegadas: string;
  LaminasCombas: string;
  LaminasDesorilladas: string;
  Supervisor: string;
  Turno: string;
  UsuarioSistema: string;
  LaminasDesperdicio: string;
  IdTripulacion: string;
  tablas: Array<actualizaTablas>;
}

export class actualizaTablas {
  programa: string;
  op: string;
  turno: string;
  numeroCortes: string;
  laminasTotal: string;
  laminasMalas: string;
}

export class modifica {
  turnoChk: string;
  sFechaProduccion: string;
  horaInicio: string;
  horaFin: string;
  metrosLineales: string;
  mCuadrados: string;
  laminasDespegadas: string;
  laminasCombas: string;
  laminasDesorilladas: string;
  supervisor: string;
  usuarioSistema: string;
  kgPapel: string;
  laminasDesperdicio: string;
  idTripulacion: string;
  programa: string;
  turno: string;
  sFecha: string;
  folioDesperdicio: string;
  tablas: Array<modificaTablas>;
}

export class modificaTablas {
  numCortes: string;
  laminas: string;
  laminasDesperdicio: string;
  kgDesp: string;
  programa: string;
  turno: string;
  oP: string;
  sFechaProduccion: string;
  laminasTotal: string;
}

export class objGuardar {
  programa: string;
  op: string;
  turno: string;
  numCortes: string;
  laminasTotal: string;
  laminasMalas: string;
  fechaProduccion: string;
  kgdesp: string;

  laminasTotalCorrugado: string;

  horaInicio: string;
  horaFin: string;
  MtsLin: string;
  m2brutos: string;
  KgPapel: string;
  desp: string;
  combas: string;
  desor: string;
  lSupervisor: string;
  usuarioSistema: string;
  hojasMalas: string;
  idTripulacion: string;
}

export class camposGeneralesL {
  pFechaDel: string;
  pFechaAl: string;
  pFechaProduccion: string;
  pSeleccionarTodos: boolean;
  pTurno: string;
  pSinFechaProd: boolean;
}
export class listProgramasL {
  sel: boolean;
  programa: number;
  maquina: string;
  turno: string;
  op: string;
  idUnico: number;
  fecha: string;
}

export class programas {
  fecha: string;
  supervisor: string;
  idTripulacion: number;
  idUnico: number;
}
export class programasSeleccionadosL {
  programasSeleccionados: Array<programas>;
}
export class leeDesperdicio {
  ClaveDesperdicio: string;
  Cantidad: string;
  FolioDesperdicio: string;
  ClaveCargo: string;
  Op: string;
  Observaciones: string;
}

export class obtieneDesperdicio {
  descripcion: string;
  cantidad: string;
}

