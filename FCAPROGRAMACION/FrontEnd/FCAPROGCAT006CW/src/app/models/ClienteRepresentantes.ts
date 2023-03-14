export interface ClienteRepresentantes {
    idCliente: string;
    razonSocial?: string;
    representantes: Representante[];
    eliminable?: boolean;
}

export class ClienteRepresentantes {
    idCliente = '';
    representantes: Representante[] = [];
}

export interface Representante {
    codigoRepresentante: number;
    nombreRepresentante?: string;
    nombre?: string;
    ejecutivos?: Ejecutivo[];
}

export class Representante {
    codigoRepresentante: number;
    nombreRepresentante?: string;
    ejecutivos?: Ejecutivo[];
}

export interface ClienteRepresentantesGuardar {
    idCliente: string;
    representantes: RepresentanteGuardar[];
}

export interface RepresentanteGuardar {
    codigoRepresentante: number;
}

export interface Ejecutivo {
    codigoEjecutivo: number;
    nombreEjecutivo?: string;
}

export class Ejecutivo {
    codigoEjecutivo = 0;
    nombreEjecutivo ? = '';
}
