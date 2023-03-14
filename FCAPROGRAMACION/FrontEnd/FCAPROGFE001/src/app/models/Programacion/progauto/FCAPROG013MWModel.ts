export class dataGridListado {
  // CPLDAT002
  orden: string;
  clave: string;
  usar: boolean;
  ancho: string;
  metros: string;
  costoM2: string;
  pesoM2: string;
  mullenMax: string;
  //
  liner1: string;
  empalmeL1: string;
  corrg1: string;
  empalmeC1: string;
  //
  liner2: string;
  empalmeL2: string;
  corrg2: string;
  empalmeC2: string;
  //
  liner3: string;
  empalmeL3: string;
  corrg3: string;
  empalmeC3: string;
  //
  liner4: string;
  empalmeL4: string;

  anchoL1: string;
  anchoEmpalme1: string;
  anchoL2: string;
  anchoEmpalme2: string;
  anchoL3: string;
  anchoEmpalme3: string;
  anchoL4: string;
  anchoEmpalme4: string;
  anchoC1: string;
  anchoEmpalmeC1: string;
  anchoC2: string;
  anchoEmpalmeC2: string;
  anchoC3: string;
  anchoEmpalmeC3: string;
}

export class dataLinerCorru {
  index: number;
  descripcion: string;
  papel: string;
  ancho1: number;
  empalme: string;
  ancho2: number;
  existe501: number;
}

export class dtsCplDat014 {
  claveProceso: string;
  claveResistencia: string;
}

export class dtsExistePapel {
  clavePapel: string;
  msj: string;
  estatus: boolean;
}

export class dtsExistenciaPapel {
  existencia: number;
  alma: string;
  ancho: number;
}

export class mdlDtsRollosTransito {
  papel: string;
  ancho: number;
  cantidad: number;
  fechaEstLlegada: string;
}

export class cap004Entity {
  papel: string;
  ancho: number;
  cantidad: number;
  fechaEstLlegada: string;
}

export class CplDat002Entity {
  opc: number;
  claveProceso: string;
  listaDatos: ListaCplDat002[] = [];
  listaDatos2: ListaCplDat002_2[] = [];
}

export class ListaCplDat002 {
  orden: string;
	pulg: boolean;
	clave: string;
	liner1: string;
	corrugado1: string;
	liner2: string;
	corrugado2: string;
	liner3: string;
	corrugado3: string;
	liner4: string;
	empalme1: string;
	empalme2: string;
	empalme3: string;
	empalme4: string;
	empalmeC1: string;
	empalmeC2: string;
	empalmeC3: string;
	anchoL1: string;
	anchoEmpalme1: string;
	anchoL2: string;
	anchoEmpalme2: string;
	anchoL3: string;
	anchoEmpalme3: string;
	anchoL4: string;
	anchoEmpalme4: string;
	anchoC1: string;
	anchoEmpalmeC1: string;
	anchoC2: string;
	anchoEmpalmeC2: string;
	anchoC3: string;
	anchoEmpalmeC3: string;
	ancho: string;
}

export class ListaCplDat002_2 {
  clave: string;
  usar: boolean;
}

export class PapelesDefaultCotizacion {
  op: string;
  claveArticulo: string;
  liner1: string;
  corrugado1: string;
  linre2: string;
  corrugado2: string;
  liner3: string;
  corrugado3: string;
  liner4: string;
  papel: string;
  impermeabilizado: string;
  cvePreparacion: string;
}

export class cbxPreparacion {
  claveProceso: string;
  descripcion: string;
}
