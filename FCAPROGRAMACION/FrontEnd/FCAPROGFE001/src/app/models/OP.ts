import { ArticulosPedido } from './ArticulosPedido';

export class OP {
  OP: string;
  Estatus: string;
  Pedido: string;
  ClaveCliente: string;
  IdLugarEntrega: number;
  FechaEntrega: string;
  NotasOP: string;
  DiasInventario: number;
  NoProducir: boolean;
  Tasa0: boolean;
  IMMEX: string;
  RegistroMaquila: string;
  FacturaRemision: boolean;
  IVA: number;
  FacturacionAnticipada: boolean;
  Moneda: boolean;

  OPMaquila: boolean; // OP Solicita Maquila
  OPMaquilaLamina: boolean; // OPSolicitaMaquilaSoloLamina
  OPMaquilaPT: boolean; // OPSolicitaMaquilaSoloPT
  OPMaquilaLaminaPT: boolean; // OPSolicitaMaquilaLaminaMasPT

  LaminaExterna: boolean;
  TipoAcabado: string;
  Zona: string;
  OpPT: boolean;
  OpSTOCK: boolean;
  FacturaDirecta: boolean;
  RefBancaria: string;
  IdFormaPago: number;
  SinPaso1IMMEX: boolean;
  MVT: boolean;
  Modificacion: boolean;
  Retrabajo: boolean;
  EOL: boolean;
  CajaNueva: boolean;
  OPCECSO: boolean;
  Serie: string;
  DatosArticulos: Array<ArticulosPedido>;
}
