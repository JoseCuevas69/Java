export class TipoDato {
  idTipoDato: number;
  tipoDato: string;
  permiteLogitud: boolean;

  constructor(idTipoDato?: number , tipoDato?: string , permiteLogitud?: boolean){
    this.idTipoDato = idTipoDato;
    this.tipoDato = tipoDato;
    this.permiteLogitud = permiteLogitud;
}
}
export interface TipoDato {
  idTipoDato: number;
  tipoDato: string;
  permiteLogitud: boolean;
}
