export class errorSQL {
  id: number;
  errorNumber: number;
  errorState: number;
  errorSeverity: number;
  errorProcedure: string;
  errorLine: number;
  errorMessage: string;
  message: string;
  typeMessage: string;
  completado: boolean;
  pasoContinua: number;
}
export class maquinas {
  claveMaquina: string;
  maquina: string;
  tipoMaquina: string;
  esCapAut: boolean;
  implementadoAut: boolean;
}
export class estadoMantenimiento {
  estado: boolean;
}
export class objSPActOpc6 {
  tmpCap005TD_001: Array<modelMdlCap001>;
  tmpCap001TD_001: Array<listSecuencia>;
  imgAtencion: boolean;
  justificacion: string;
  claveMaquina: string;
}

export class listSecuencia {
  value00: number;
  value01: string;
  value02: string;
  value03: string;
  value04: number;
  value05: number;
  value06: boolean;
  value07: number;
  value08: boolean;
  value09: string;
  value10: string;
  value11: string;
  value12: number;
  value13: string;
  value14: string;
  value15: number;
  value16: string;
  value17: string;
  value18: string;
  value19: string;
  value20: string;
  value21: string;
  value22: string;
  value23: string;
  value24: boolean;
  value25: boolean;
  value26: boolean;
  value27: number;
  value28: number;
  value29: string;
  value30: number;
  value31: number;
  value32: string;
  value33: boolean;
  value34: boolean;

  // ultimoProceso: boolean;
  // op: string;
  // cliente: string;
  // articulo: string;
  // cantidad: number;
  largoDesarrollo: number;
  anchoDesarrollo: number;
  primerColor: string;
  segundoColor: string;
  tercerColor: string;
  cuartoColor: string;
  // fechaEntrega: string;
  minutosProduccion: number;
  // orden: number;
  // programa: number;
  // notas: string;
  // fijarFecha: string;
  // claveArticulo: string;
  // claveArticulo2: string;
  // fechaTermino: string;
  // fechaInicio: string;
  // producido: number;
  // estatus: string;
  // notasOperacion: string;
  // claveProceso: string;
  // proceso1: boolean;
  // programaCorr: number;
  // fechaCorrug: string;
  // suspendido: boolean;
  electronico: boolean;
  // pintado: boolean;
  status: string;
  liberadoDS: number;
  psi: number;
  // lbf: number;
  // compresionEspOtrosLBF: number;
  // eProceso: string;
  // minimo: number;
  // maximo: number;
  // conScore: boolean;
  enAtencion: number;

  // saldoOP: number;
  // medidas: string;
  // colores: string;
  // tiempo: string;
}
export class comentariosOP {
  idComentario: number;
  op: string;
  articulo: string;
  comentario: string;
  usuarioAct: string;
  estatus: boolean;
  fecha: string;
}
export class opsMaquinas {
  orden: number;
  claveMaquina: string;
  cantidad: number;
  tipoMaquina: string;
  cbxTipoMaquina: number;
}
export class objSigProgCap {
  msjInfo: string;
  sigProCap: string;
  ultimoTurnoAnterior: string;
  primeroTurnoActual: string;
  fechaUltRegPLC: string;
  turnoUltRegPLC: string;
}
export class resultadoCap009 {
  op: string;
  suaje: string;
  areaUnitaria: string;
  largoLamina: string;
  anchoLamina: string;
  pzasSuaje: string;
  largoDesarrollo: string;
  anchoDesarrollo: string;
  claveArticulo: string;
  nombreArticulo: string;
  dado: string;
  fechaEntrega: string;
  solicitado: string;
  producido: string;
  programado: string;
  existencia: string;
  variacion: string;
  proceso: string;
  primerColor: string;
  segundoColor: string;
  tercerColor: string;
  cuartoColor: string;
  colores: string;
  rutaProceso: string;
  clavePreparacion: string;
  industria: string;
  mvt: boolean;
  validaProceso: boolean;
  txtValidaProceso: string;
  produccionHora: string;
  flauta: string;
  unionPegada: boolean;
  piezasXCorte: number;
  cantidad: number;
  autAgente: boolean;
  devuelto: number;
  liberadoCostos: boolean;
  autorizado: boolean;
  conScore: boolean;
  cantidadSol: number;
  cantidadTras: number;
  clave: string;
  ruta: string;
  resistencia: string;
  maquinaEstablecida: string;
  eproceso: string;
  noProducir: boolean;
  claveCliente: string;
  nombreCliente: string;
  status: string;
  msjOp: string;
  msjProducir: string;

  cajaNueva: boolean;
  modificacion: boolean;
  comentarios: string;
  retrabajoOP: boolean;
}
export class modelMdlCap005 {
  programa: number; op: string; cantidad: number; maqOrigen: string;
  cveProceso: string; ultimoProceso: boolean; articulo: string; mensajeInvalido: string;
}
export class objProgramasCap005 {
  cap005TD_001: Array<modelMdlCap005>;
  txtJustificacion: string;
  cveProceso: string;
  cveMaquina: string;
  optTipoMaquina: string;
}
export class modelMdlCap001 {
  programa: number; op: string; cantidad: number; maqOrigen: string;
  cveProceso: string; ultimoProceso: boolean; articulo: string;
}
export class objProgramasCap001 {
  cap005TD_001: Array<modelMdlCap001>;
  txtJustificacion: string;
  cveProceso: string;
  cveMaquina: string;
  optTipoMaquina: string;
}
export class opc17p2 {
  anchoMax: number;
  anchoMin: number;
  largoMax: number;
  largoMin: number;
}
export class parSPLecOpc23
{
  justificacion: string;
  op: string;
  claveArticulo: string;
  cantidad: number;
  programado: number;
  producido: number;
  solicitado: number;
  variacion: number;
  descripcion: string;
  claveMaquina: string;
  claveProceso: string;
  maquinaEstablecida: string;
  tipoMaquina: string;
  largo: number;
  ancho: number;
  pasoContinua: number;
  produccionPT: number;
}

export class opc4p2 {
  inmPost: boolean;
  justificacion: string;
  dataSecuencias: Array<listSecuencia>;
  secuenciaSelected: Array<listSecuencia>;
}

export class cap004FijarFecha {
  programa: number;
  claveMaquina: string;
  op: string;
  fecha: string;
  quitar: boolean;
}

export class spActOpc8 {
  claveMaquina: string;
  lFecha: string;
  cap001TD_001: Array<listSecuencia>;
}

export class cap001SuspenderOP {
  suspendido: boolean;
  programa: number;
}
export class objCap016 {
  listMaquinas: Array<maquinas>;
  selected: string;
  tipoSelected: string;
  selectAll: boolean;
  columns: any;
  dataGrid: Array<datosGridCap016>;
  columnsInconvenientes: any;
  dataGridInconvenientes: Array<datosGridCap016>;
}
export class cap016ValidarTraspasoOps {
  claveMaquina: string;
  cap016TD_001: Array<datosGridCap016>;
}
export class spActOpc10 {
  cveMaqOri: string;
  cveMaqDes: string;
  cap016TD_001: Array<datosGridCap016>;
}



export interface datosGridCap016 {
  seleccionado: boolean;
  ultimoProceso: boolean;
  op: string;
  cliente: string;
  articulo: string;
  cantidad: number;
  largoDes: number;
  anchoDes: number;
  primerColor: string;
  segundoColor: string;
  tercerColor: string;
  cuartoColor: string;
  fechaEntrega: string;
  minutosProduccion: number;
  orden: number;
  programa: number;
  notas: string;
  fijarFecha: string;
  claveArticulo: string;
  claveArticulo2: string;
  fechaTermino: string;
  fechaInicio: string;
  producido: number;
  estatus: string;
  notasOperacion: string;
  claveProceso: string;
  proceso1: boolean;
  programaCorr: number;
  fechaCorrug: string;
  suspendido: boolean;
  electronico: boolean;
  pintado: boolean;
  status: string;
  liberadoDS: boolean;
  psi: number;
  lbf: number;
  compresionEspOtrosLBF: number;
  eProceso: string;
  minimo: number;
  maximo: number;
  conScore: boolean;
  enAtencion: boolean;
}
export interface objDisabled {
  btnAceptarNotas: boolean;
  btnAgregarOP: boolean;
  btnSubePosicion: boolean;
  btnBajaPosicion: boolean;
}
export interface objVisible {
  aql: boolean;
  articuloNuevo: boolean;
  lblSuspendida: boolean;
  btnOrdenarOP: boolean;
}
export interface objCamposGeneral {
  esCapAut: boolean;
  lblSiguienteProrgama: boolean;
  fechaSecuencia: string;
  txtTotalCantidad: string;
  txtTotalTiempo: string;
  txtProgramaCorrug: string;
  notas: string;
  pintado: boolean;
  comentariosProduccion: string;
  especificacionesProceso: string;
  programaSeleccionado: string;
  primeroTurnoActual: string;
  sigProCap: string;
  fechaTrabajo: string;
  horaTrabajo: string;
  turnoTrabajo: number;
  imgAtencionVisible: boolean;
}
export interface objCbxMaquinas {
  listMaquinas: Array<maquinas>;
  selected: string;
  tipoSelected: string;
  rbtnTipoMaquina: string;
};
export interface objMaquinaMto {
  mantenimiento: boolean;
  texto: string;
};
export interface colores {
  accionCorrectiva: string;
  cancelada: string;
  suspendida: string;
  electronico: string;
}
export interface mdlCap003 {

}
export interface mdlCap004 {
  op: string;
  fecha: string;
  hora: string;
  quitar: boolean;
  quitarVisible: boolean;
  secuenciaSeleccionada: listSecuencia;
}
export interface mdlBusquedaOP {
  rbtnFiltroMaquina: string;
  txtOP: string;
  columns: any;
  listResultadoMaquinas: opsMaquinas [];
}
export interface mdlProgramaImpresoras {
  txtOP: string;
  txtIndustria: string;
  suaje: string;
  txtAreaUnit: string;
  txtLargoLam: string;
  txtAnchoLam: string;
  dado: string;
  cbxProceso: Array<any>;
  cbxProcesoSelected: string;
  txtPzasSuaje: string;
  txtLargoDes: string;
  txtAnchoDes: string;
  chkModificaProceso: boolean;
  chkModificaProcesoVisible: boolean;
  cbxModificaProceso: Array<modificaProceso>;
  cbxModificaProcesoSelected: string;
  txtClaveArticulo: string;
  txtArticulo: string;
  txtCliente: string;
  txtSolicitado: string;
  txtProducido: string;
  txtProgramado: string;
  txtExistencia: string;
  txtColores: string;
  cbxRutaProceso: Array<rutaProceso>;
  cbxRutaProcesoSelected: string;
  txtDescripcionRuta: string;
  txtCantidad: string;
  txtDuracion: string;
  txtComentarios: string;
  txtEspProceso: string;
  txtJustificacion: string;
  proceso: string;
  fecha: string;
}
export interface modificaProceso {
  claveProceso: string;
  descripcion: string;
}
export interface proceso {
  descripcion: string;
  tProceso: string;
}
export interface rutaProceso {
  clave: string;
  descripcion: string;
}
export interface maquinasCanceladas {
  data: Array<maquinas>;
  selected: string;
}
export interface objCamposMdlCap005 {
  listProgramas: Array<modelMdlCap005>;
  // tempListProgramas: Array<modelMdlCap005>;
  listMaquinas: Array<maquinas>;
  selectedMaquina: string;
  modificaProceso: boolean;
  listModificaProceso: Array<modificaProceso>;
  selectedModificaProceso: string;
  // disabledModificaProceso: boolean;
  listJustiticacionCambio: Array<justificaciones>;
  selectedJustificacionCambio: string;
  selectedJustificacionDescripcion: string;
  columnasGridMdlCap005: any;
  dataGridMdlCap005: Array<modelMdlCap005>;
  cantidadInicial: number;
  datosOpc18: Array<opc18>;
  divCantidadVisible: boolean;
  cantidad: number;
  columnasInconvenientes: any;
}
export interface justificaciones {
  id: string;
  descripcion: string;
}
export class opc18 {
  zonaERP: string;
  claveArticulo: string;
  flauta: string;
  piezasXcorte: number;
  cantidad: number;
  descripcion: string;
  conScore: boolean;
  piezasXhoja: number;
  areaUnitaria: number;
  largoHoja: number;
  anchoHoja: number;
  primerColor: string;
  segundoColor: string;
  tercerColor: string;
  cuartoColor: string;
  suaje: string;
  dado: string;
  claveProceso: string;
  resistencia: string;
  pzasHojaProg: number;
  autAgente: boolean;
  devuelto: number;
  maquinaEstablecida: string;
  liberadoCostos: boolean;
  largoDesarrollo: number;
  anchoDesarrollo: number;
  programado: number;
  existencia: number;
  producido: number;
  variacion: number;
}

// class listOPSecuenciaMaquina {
//   secuencia: number;
//   claveMaquina: string;
//   cantidad: number;
//   idTipoMaquina: number;
//   tipoMaquina: string;
// }
