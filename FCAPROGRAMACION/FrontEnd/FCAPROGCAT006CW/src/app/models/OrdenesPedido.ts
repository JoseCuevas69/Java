export class OrdenesPedido {
  op: number;
  serie: string;
  ordenImpres: number;
  strOP: string;
  estatus: string;
  cantidad: number;
  fecha: string;
  articulo: string;
  ltsOrdenesPedidos: LtsOrdenesPedidos [] = [];
}

export interface LtsOrdenesPedidos {
  op?: number;
  serie?: string;
  ordenImpres?: number;
  strOP?: string;
  estatus?: string;
  cantidad?: number;
  fecha?: string;
  articulo?: string;
}


