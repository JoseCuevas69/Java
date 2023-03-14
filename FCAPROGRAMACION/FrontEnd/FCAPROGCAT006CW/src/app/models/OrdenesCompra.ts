export class OrdenesCompra {
  idOrdenCompra: number;
  ordenCompra: string;
  archivoOC: string;
  op: number;
  serie: string;
  idTipoArchivo: number;
  idDocumento: number;
  zona: string;
  LtsOrdenCompra: LtsOrdenCompra [] = [];
}

export interface LtsOrdenCompra {
  idOrdenCompra?: number;
  ordenCompra?: string;
  archivoOC?: string;
  op?: number;
  serie?: string;
  idTipoArchivo?: number;
  idDocumento?: number;
  zona?: string;
}
