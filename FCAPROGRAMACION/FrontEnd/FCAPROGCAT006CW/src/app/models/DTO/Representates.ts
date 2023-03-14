import {EjecutivosAsignados} from "./EjecutivosAsignados"
export class Representates{
    CodigoRepresentante: number;
    IdUsuario: string;
    Zona: string;
    NumeroTelefono: string;
    Nombre: string;
    Estatus: boolean;
    CodigoEjecutivo: Array<EjecutivosAsignados>;
}
