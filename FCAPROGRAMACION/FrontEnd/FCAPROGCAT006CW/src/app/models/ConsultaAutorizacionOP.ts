export class ConsultaAutorizacionOP {
  op: number;
  serie: string;
  srtOP: string;
  estatus: string;
  fechaInsert: string;
  estatusAutCostos: boolean;
  fechaAutCostos: string;
  notasCostos: string;
  estatusAutCartera: boolean;
  fechaAutCartera: string;
  notasCartera: string;
  usuarioInsert: string;
  prodNoEmb: boolean;
  facturacionAnticipada: boolean;
  idCliente: string;
  nombreCliente: string;
  idVariacion: number;
  variacion: string;
  correoUsuario: string;
  ListaConsultaAutorizacion: ListaConsultaAutorizacionOP [] = [];
}

export interface ListaConsultaAutorizacionOP {
  op: number;
  serie?: string;
  srtOP?: string;
  estatus?: string;
  fechaInsert?: string;
  estatusAutCostos?: boolean;
  fechaAutCostos?: string;
  notasCostos?: string;
  estatusAutCartera?: boolean;
  fechaAutCartera?: string;
  notasCartera?: string;
  usuarioInsert?: string;
  prodNoEmb?: boolean;
  facturacionAnticipada?: boolean;
  idCliente?: string;
  nombreCliente?: string;
  idVariacion?: number;
  variacion?: string;
  strProdNoEmb: string;
  correoUsuario: string;
}
