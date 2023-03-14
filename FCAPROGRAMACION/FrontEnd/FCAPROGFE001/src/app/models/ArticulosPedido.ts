export class ArticulosPedido {
  ClaveArticulo: string;
  Descripcion: string;
  LargoInterior: number;
  AnchoInterior: number;
  AltoInterior: number;
  Resistencia: string;
  Diseno: string;
  condicionVenta: string;
  Cantidad: number;
  CantidadOP: number;
  PxJ: number;
  Linea: number;
  Precio: number;
  ListaArticulosPedido: ListaArticulosPedido [] = [];
}

export interface ListaArticulosPedido {
  claveArticulo?: string;
  descripcion?: string;
  largoInterior?: number;
  anchoInterior?: number;
  altoInterior?: number;
  resistencia?: string;
  diseno?: string;
  condicionVenta?: string;
  cantidad?: number;
  cantidadOP?: number;
  pxJ?: number;
  linea?: number;
  precio?: number;
}
