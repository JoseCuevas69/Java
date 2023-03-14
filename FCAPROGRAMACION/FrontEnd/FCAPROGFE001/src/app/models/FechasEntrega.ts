export class FechasEntrega{
    Id: number;
    EntregaPeridica: boolean;
    Frecuencia: number;
    FechaEntrega: Date;
    FechaMostrar: string;
    Cantidad: number;
    NotasFechaEntrega: string;
    FechasEntregaList: FechasEntregaLista [] = [];
}

export interface FechasEntregaLista {
    Id: number;
    EntregaPeridica?: boolean;
    Frecuencia?: number;
    FechaEntrega?: Date;
    FechaMostrar?: string;
    Cantidad?: number;
    NotasFechaEntrega?: string;
}
