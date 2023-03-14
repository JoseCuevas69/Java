export interface TipoSolPorUsuario {
    idTipoSolicitud: number;
    nombreTipoSolicitud?: string;
    idPermiso: number;
    asignacionAutomatica: boolean;
    descripcionAsignacionAutomatica?: string;
    descripcionPermiso?: string;
    ordenAsignacion: number;
    idTipoSolicitudSeleccionado?: boolean;
}

export class TipoSolPorUsuario {
    idTipoSolicitud: number;
    idPermiso: number;
    asignacionAutomatica: boolean;
    ordenAsignacion: number;
}

export interface TipoSolPorUsuarioListar {
    tiposSolicitud: TipoSolPorUsuario[];
    permisos: PermisoTipoSol[];
}

export interface PermisoTipoSol {
    idPermiso: number;
    descripcionPermiso?: string;
}

export class PermisoTipoSol {
    idPermiso: number = null;
    descripcionPermiso ? = '';
}
