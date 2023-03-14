export interface ConceptoTipoSolicitud {
    seleccionado?: boolean;
    idConcepto: number;
    concepto?: string;
}

export interface ConceptosTipoSolicitud {
    idTipoSolicitud: number;
    conceptos: number[];
}

export class ConceptosTipoSolicitud {
    idTipoSolicitud = 0;
    conceptos: number[] = [];
}
