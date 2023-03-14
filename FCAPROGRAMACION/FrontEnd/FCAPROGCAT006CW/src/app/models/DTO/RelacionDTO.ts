import { Relacion } from './Relacion';
export class RelacionDTO {
  idCliente: string;
    nombreCliente: string;
    claveArticulo: string;
    nombreArticuloPrincipal: string;
    relacion: Array<Relacion>;
}
