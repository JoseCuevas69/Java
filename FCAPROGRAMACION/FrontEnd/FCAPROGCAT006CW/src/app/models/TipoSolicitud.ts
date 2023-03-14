export interface TipoSolicitud {
    idTipoSolicitud: number;
    idAreaSolMultiple: number;
    nombreTipoSolicitud: string;
    descripcionModificacion: string;
    ordenAsignacion: number;
    ordenAsignacionMaestra: number;
    aplicaEnSolMultiple: boolean;
    aplicaEnAnalisisCajaNva: boolean;
    diasAtencionEstandar: number;
    ordenImp: number;
    solAutomatica: boolean;
    asignacionAutomatica: boolean;
    permiteAsignacionDirecta: boolean;
    permiteEnBaseAConsecutivo: boolean;
    correoAsignaResponsable: boolean;
    correoAsignaCapturo: boolean;
    correoAsignaOtros: string;
    correoLiberaCapturo: boolean;
    correoLiberaOtros: string;
    estatus: boolean;
}

export class TipoSolicitud {
    idTipoSolicitud = 0;
    idAreaSolMultiple = 0;
    nombreTipoSolicitud = '';
    descripcionModificacion = '';
    ordenAsignacion = 0;
    ordenAsignacionMaestra = 0;
    aplicaEnSolMultiple = true;
    aplicaEnAnalisisCajaNva = false;
    diasAtencionEstandar = 0;
    ordenImp = 0;
    solAutomatica = false;
    asignacionAutomatica = false;
    permiteAsignacionDirecta = false;
    permiteEnBaseAConsecutivo = false;
    correoAsignaResponsable = false;
    correoAsignaCapturo = false;
    correoAsignaOtros = '';
    correoLiberaCapturo = false;
    correoLiberaOtros = '';
    estatus = true;
}

export interface TipoSolicitudFiltros {
    filtro: string;
    estatus: boolean;
    aplicacion: boolean;
}

export class TipoSolicitudFiltros {
    filtro = '';
    estatus = true;
    aplicacion = true;
}

export interface TipoSolicitudEstatus {
    idTipoSolicitud: number;
    estatus: boolean;
}

export interface TipoSolicitudLista {
    idTipoSolicitud: number;
    nombreTipoSolicitud: string;
}

export class TipoSolicitudLista {
    idTipoSolicitud = 0;
    nombreTipoSolicitud = 'SELECCIONAR...';
}

