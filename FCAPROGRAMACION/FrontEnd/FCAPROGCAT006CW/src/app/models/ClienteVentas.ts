import {ReferenciaBancaria} from 'src/app/models/ReferenciaBancaria';
import {Correos} from 'src/app/models/Correos';


export class ClienteVentas {
    idCliente: string;
    RazonSocial: string;
    TipoCliente: number;
    idDocumento: number;
    NombreImagen: string;
    ClaseCliente: string;
    IdTax: string;
    RFC: string;
    AplicaOperSubdivision: boolean;
    CFDI: string;
    Credito: string;
    CURP: string;
    IMMEX: string;
    Moneda: string;
    UMFacturacion: number;
    IVA: string;
    FacLinea: boolean;
    PrecioDolarFacMN: boolean;
    InfoCrediticia: string;
    RefBancarias: Array<ReferenciaBancaria>;
    ClavePais: string;
    ClaveEstado: string;
    ClaveCiudad: string;
    Direccion: string;
    CP: string;
    Representante: number;
    enviarCertificado: boolean;
    Certificado: string;
    TipoRemisionado: number;
    Almacen: string;
    AlmacenStock: string;
    SolEmbarque: boolean;
    RevOp: boolean;
    RevMaestra: boolean;
    Inventario: number;
    Variacion: number;
    TipoVariacion: number;
    PalEspecial: boolean;
    PalModProduccion: boolean;
    CamposCorreo: Array<Correos>;
    Tasa0: boolean;
    NombreEstado: string;
    NombreCiudad: string;
    CondicionVenta: string;
    VariacionEmbarque: string;
    TipoVariacionDes: string;
    ClientesList: ClienteVentasListar[] = [];
    ClientesHabilitados: ClienteHabilitadosListar[] = [];
    ClientesHabilitadosManual: ClientesHabilitadosManual [] = [];
    zona: string;

}

export interface ClienteVentasListar {
    idCliente: string;
    razonSocial: string;
    tipoCliente?: number;
    idDocumento?: number;
    nombreImagen?: string;
    claseCliente?: string;
    idTax?: string;
    rFC?: string;
    aplicaOperSubdivision?: boolean;
    cfdi?: string;
    credito?: string;
    cURP?: string;
    iMMEX?: string;
    moneda?: string;
    uMFacturacion?: number;
    iVA?: string;
    facLinea?: boolean;
    precioDolarFacMN?: boolean;
    infoCrediticia?: string;
    refBancarias?: Array<ReferenciaBancaria>;
    clavePais?: string;
    claveEstado?: string;
    claveCiudad?: string;
    direccion?: string;
    cP?: string;
    representante?: number;
    enviarCertificado?: boolean;
    certificado?: string;
    tipoRemisionado?: number;
    almacen?: string;
    almacenStock?: string;
    solEmbarque?: boolean;
    revOp?: boolean;
    revMaestra?: boolean;
    inventario?: number;
    variacion?: number;
    tipoVariacion?: number;
    palEspecial?: boolean;
    palModProduccion?: boolean;
    camposCorreo?: Correos[];
    tasa0?: boolean;
    zona?: string;
}

export class ClienteVentasListar {
    idCliente = '';
    razonSocial = '';
}
export interface ClienteHabilitadosListar {
  idCliente: string;
  razonSocial: string;
  tipoCliente?: number;
  idDocumento?: number;
  nombreImagen?: string;
  claseCliente?: string;
  idTax?: string;
  rFC?: string;
  aplicaOperSubdivision?: boolean;
  cFDI?: string;
  credito?: string;
  cURP?: string;
  iMMEX?: string;
  moneda?: string;
  uMFacturacion?: number;
  iVA?: string;
  facLinea?: boolean;
  precioDolarFacMN?: boolean;
  infoCrediticia?: string;
  refBancarias?: Array<ReferenciaBancaria>;
  clavePais?: string;
  claveEstado?: string;
  claveCiudad?: string;
  direccion?: string;
  cP?: string;
  representante?: number;
  certificado?: string;
  tipoRemisionado?: number;
  almacen?: string;
  almacenStock?: string;
  solEmbarque?: boolean;
  revOp?: boolean;
  revMaestra?: boolean;
  inventario?: number;
  variacion?: number;
  tipoVariacion?: number;
  palEspecial?: boolean;
  palModProduccion?: boolean;
  camposCorreo?: Correos[];
  tasa0?: boolean;
}

export class ClientesHabilitadosManual {
  idCliente = '';
  razonSocial = '';
}

export interface HabilitadosManual {
  idCliente?: number;
  razonSocial?: string;
}
