export class resistencia {
  clave: string;
}

export class filtros {
  ordenProduccion: string;
  usar: number;
  puntosMax: number;
  zona: string;
}

export class CPLDAT009TD_002 {
  id: number;
	op1: string; fecha1: string; multiplos1: number; ancho1: number; largo1: number; lam1: number; piezas1: number;
	op2: string; fecha2: string; multiplos2: number; ancho2: number; largo2: number; lam2: number; piezas2: number;
	op3: string; fecha3: string; multiplos3: number; ancho3: number; largo3: number; lam3: number; piezas3: number;
	anchoTotal: number; anchoPapel: number; refile: number; metrosLineales: number;
	producto1: string; producto2: string; producto3: string; parcial1: number; parcial2: number; parcial3: number;
	puntos: number; resistencia: string; flauta: string; tranf: boolean; empate: string;
	cliente1: string; articulo1: string; cliente2: string; articulo2: string; cliente3: string; articulo3: string;
	rest1: string; rest2: string; rest3: string; conScore: boolean; conScore2: boolean; conScore3: boolean; anchoStd: number;
	seleccionado: boolean; errorResistencia: boolean;
	pintado1: boolean; pintado2: boolean; pintado3: boolean;
}

export class listCPLDAT009TD_002 {
  pModulo: string;
  pCuchillas3: boolean;
  pResistencia: string;
  datos: Array<CPLDAT009TD_002>;
}

export class ResData {
  id: number;
  secuencia: number;
  op: string;
  fecha: string;
  multiplos: number;
  ancho: number;
	largo: number;
  lam: number;
  anchoTotal: number;
  anchoPapel: number;
  refile: number;
	metrosLineales: number;
  producto: string;
  parcial: number;
  puntos: number;
  resistencia: string;
	flauta: string;
  cliente: string;
  articulo: string;
  conScore: boolean;
  anchoStd: number;
	producido: number;
  cantidad: number;
  devuelto: number;
  cortes: number;
  piezas: number;
	hojas: number;
  produccionCompleta: boolean;
  ptActual: number;
  trasENT: number;
	trasSAL: number;
  opValidar: string;
  piezasX: number;
  ultFecha: string;
  adicional: number;
	hayAdicional: boolean;
  cancelar: boolean;
}

export class Data3 {
  refProm: string;
  m2: string;
  ml: string;
}

export class errorMensaje {
  id: number;
  message: string;
}

export class presentacionPintado {
  id: number;
  op: string;
  liner1: string;
  presentacionArticulo: string;
  presentacionPapel: string;
  pintaCorr: boolean;
  pintaImp: boolean;
  validar: boolean;
}


// usuarioERP, aplicacion, resistencia, a2Cuchillas, a3Cuchillas
// [Clave Resistencia] AS resistencia,  Usuario AS usuarioERP, ClaveProceso, idSession, NumCuchillas, EsActivo
export class clsConfiguracion {
  
  resistencia: string;
  usuarioERP: string;
  claveProceso: string;
  idsesion: Number;
  numcuchillas: string;
  esactivo: boolean;

  /*
  public int idsesion { get; set; }
  public string usuarioERP { get; set; }
  public string resistencia { get; set; }
  public int numcuchillas { get; set; }
  public bool esactivo { get; set; }*/


}




/*




export class tParametros {
  id: number;
  resisteniasAfines: boolean;
  refileMaximo: number;
  refileMinimo: number;
  diasAdelanto: number;
  todosAnchos: boolean;
  anchoCalculo: number;
  largoMinimo: number;
  excedente: number;
  scores: number;
}

export class tAnchos {
  ancho: number;
  usar: boolean;
}

export class tVariables {
  Ide: number;
  RefileMax: number;
  RefileMin: number;
  DiasAdelanto: number;
  FechaLimite: Date;
  TodosAnchos: boolean;
  AnchoCalculo: number;
  LargoMinimo: number;
  ScoresMax: number;
  Verif: number;
  AnchoComb: number;
  Usar: boolean;
  RESISTENCIA: string;
  Lamin: string;
  FechaE: Date;
  CONT: number;
  PRIORIDAD: number;
  NOANCHOS: number;
  CONT2: number;
  SENCILLO: string;
  i: number;
  Z1: number;
  XREFILE: number;
  ANCHO1: number;
  Tantos: number;
  Refile: number;
  MLinea: number;
  k: number;
  J: number;
  z2: number;
  Herm1: string;
  Herm2: string;
  Ancho2: number;
  Tantos2: number;
  M: number;
  Refile2: number;
  MLinea2: number;
  TMLinea: number;
  UnaPrior: number;
  OP1: string;
  OP2: string;
  AnchoUtil: number;
  AnchoPapl: number;
  MetrosLin: number;
  Mult1: number;
  Mult2: number;
  MatPrim: number;
  ManoObr: number;
  CostoArg: number;
  M2Netos: number;
  PuntosArg: number;
  Fecha1: Date;
  Fecha2: Date;
  Dif1: number;
  Dif2: number;
  DifDias: number;
  PuntosFE: number;
  PuntosDifFE: number;
  Piezas1: number;
  Piezas2: number;
  Prod2: string;
  X: number;
  Mej: string;
  Estado2: number;
  Cliente2: string;
  Artic2: string;
  RestOP2: string;
  HOJAS2: number;
  NSCOR2: number;
  HOJAS1: number;
  Prod1: string;
  Cliente1: string;
  Artic1: string;
  RestOP1: string;
  NScor1: number;
  Estado1: number;
  PuntosCom: number;
  TotalPuntos: number;
  lAnchosUsar: number;
  Flag1: boolean;
  Flag2: boolean;
  Opp: OppEntity [];
  AnchoPapel: AnchoPapelEntity [];
  Cm: CmEntity [];
  // -----------------------------------------
  Recalculo: number;
  opprior: number;
  NPROG1: number;
  NPROG2: number;
  Mas1: number;
  TOTAL1: number;
  Mas2: number;
  TOTAL2: number;
  Hojas: number;
  MasP: number;
  Fecha1A: Date;
  PIESAS1: number;
  RestRecs2: number;
  AnchoSTD: string;
  ClvRest: string;
  NoRecalculos: number;
  valormax: number;
  idValorMax: number;
}

export class OppEntity {
  value01: string;
  value02: number;
  value03: number;
  value04: number;
  value05: string;
  value06: Date;
  value07: string;
  value08: number;
  value09: boolean;
  value10: number;
  value11: boolean;
  value12: number;
  value13: number;
}
export class AnchoPapelEntity {
  value01: number;
  value02: number;
  value03: number;
}
export class CmEntity {
  value01: string;
  value02: number;
  value03: number;
  value04: string;
  value05: number;
  value06: number;
  value07: number;
  value08: number;
  value09: number;
  value10: number;
  value11: number;
  value12: Date;
  value13: Date;
  value14: number;
  value15: number;
  value16: string;
  value17: number;
  value18: number;
  value19: string;
  value20: number;
  value21: number;
  value22: number;
  value23: number;
}

export class DatosOps {
  ordenProduccion: string;
  cliente: string;
  claveArticulo: string;
  articulo: string;
  cantidad: number;
  fechaEntrega: Date;
  programadas: number;
  largo: number;
  ancho: number;
  piezas: number;
  resistencia: string;
  faltan: number;
  hojas: number;
  tkg: number;
  tM2: number;
  parcial: string;
  lamina: string;
  flauta: string;
  mas: number;
  prior: boolean;
  utilizar: boolean;
  refile: boolean;
  nScores: number;
  conScore: boolean;
  cproceso: string;

  hojasOrig: number;
  hojasProg: number;
  nCombina: number;
}

export class CPLDAT008ArreglosPosibles {
  id: number;

  op1: string;
  fecha1: Date;
  multiplos1: number;
  ancho1: number;
  largo1: number;
  lam1: number;
  piezas1: number;

  op2: string;
  fecha2: Date;
  multiplos2: number;
  ancho2: number;
  largo2: number;
  lam2: number;
  piezas2: number;

  op3: string;
  fecha3: Date;
  multiplos3: number;
  ancho3: number;
  largo3: number;
  lam3: number;
  piezas3: number;

  anchoTotal: number;
  anchoPapel: number;
  refile: number;
  metrosLineales: number;
  producto1: string;
  producto2: string;
  producto3: string;
  parcial1: number;
  parcial2: number;
  parcial3: number;
  puntos: number;
  resistencia: string;
  flauta: string;
  tranf: boolean;
  cliente1: string;
  articulo1: string;
  cliente2: string;
  articulo2: string;
  cliente3: string;
  articulo3: string;
  empate: string;
  marca: number;
  rest1: string;
  rest2: string;
  conScore: boolean;
  conScore2: boolean;
  conScore3: boolean;

  puntosMax: number;
}

export class dtsAnchoSTD {
  anchoStd: string;
}
*/
