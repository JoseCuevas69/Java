export interface CampoPorUsuario {
    idUsuario?: string;
    campo: number;
    descripcionCampo?: string;
    campoSeleccionado?: boolean;
}

export class CampoPorUsuario {
    campo: number;
}
