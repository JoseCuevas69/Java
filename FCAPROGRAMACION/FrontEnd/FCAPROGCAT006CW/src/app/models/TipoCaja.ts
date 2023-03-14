export interface TipoCaja {
  idTipoCaja: number;
  claveDiseno: string;
  descripcion: string;
  estatus: boolean;
  fechaBaja: string;
  regExporta: string;
  permiteCotDirecta: boolean;
  conSuaje: boolean;
  fraccionArancelaria: string;
  conDesperdicio: boolean;
}
export class TipoCaja {
  idTipoCaja: number;
  claveDiseno: string;
  descripcion: string;
  estatus: boolean;
  fechaBaja: string;
  regExporta: string;
  permiteCotDirecta: boolean;
  conSuaje: boolean;
  fraccionArancelaria: string;
  conDesperdicio: boolean;

  constructor(idTipoCaja?: number , claveDiseno?: string, descripcion?: string, conSuaje?: boolean, conDesperdicio?: boolean){
    this.idTipoCaja = idTipoCaja;
    this.claveDiseno = claveDiseno;
    this.descripcion = descripcion;
    this.conSuaje = conSuaje;
    this.conDesperdicio = conDesperdicio;
  }
}

