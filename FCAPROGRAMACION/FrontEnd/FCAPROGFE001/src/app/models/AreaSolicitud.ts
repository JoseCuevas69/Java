export interface AreaSolicitud {
    idAreaSolMultiple: number;
    nombreAreaSolMultiple: string;
    ordenFormatoCajaNva: number;
    estatus?: boolean;
}

export class AreaSolicitud {
    idAreaSolMultiple = 0;
    nombreAreaSolMultiple = '';
    ordenFormatoCajaNva = 0;
    estatus ?= true;
}

export interface AreaSolicitudFiltros {
    estatus: boolean;
}

export class AreaSolicitudFiltros {
    estatus = true;
}
