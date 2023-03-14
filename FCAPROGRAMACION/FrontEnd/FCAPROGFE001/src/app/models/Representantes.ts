export interface Representante {
    codigoRepresentante: number;
    nombreRepresentante?: string;
    idUsuario?: string;
    zona?: string;
    nombre?: string;
}

export class Representantes {
    codigoRepresentante: number;
    idUsuario: string;
    zona: string;
    nombre: string;
}
