export class CPLCAP009Entity {
  op: string;
}

export class listaDatos {
  prior: boolean;
  usar: boolean;
  refile: boolean;
  op: string;
  fechaEntrega: string;
  cliente: string;
  claveArticulo: string;
  articulo: string;
  cantidad: number;
  hojas: string;
  ancho: string;
  largo: string;
  piezas: string;
  resistencia: string;
  flauta: string;
  tkg: number;
  lamina: string;
  parcial: string;
  mas: string;
  mass: string;
  proceso: string;
  procesoo: string;
  cantidadTras: number;
  cantidadSol: number;
  autorizado: boolean;
  autorizadoo: string;
  variacion: string;
  conScore: boolean;
  txtConScore: string;
  existencia: number;
  utilizar: boolean;
  tm2: number;
  excedentePT: number;
  excedeLamina: number;
  cantAnt: number;
}

export class listaDatosPrincipal {
  data: listaDatos [] = [];
}

export class resValidaVariacion {
  pp: string;
  programa: string;
  dechaProduccion: string;
  producidas: number;
}

export class resCambiosArticulos {
  op: string;
  claveArticulo: string;
  fechaCorrug: string;
  fechaMaestra: string;
}
