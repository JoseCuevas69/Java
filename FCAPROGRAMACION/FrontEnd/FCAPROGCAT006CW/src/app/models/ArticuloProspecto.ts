export interface ArticuloProspecto {
    claveArticuloProspecto: string;
    claveCliente: string;
    claveTipoIndustria: string;
    claveMoneda: string;
    claveResistencia: string;
    descripcion: string;
    areaUnitaria: number;
    pesoUnitario: number;
    precio: number;
    nombreCliente?: string;
    moneda?: string;
    tipoIndustria?: string;
    resistencia?: string;
}

export class ArticuloProspecto {
    claveArticuloProspecto = '';
    claveCliente = '';
    claveTipoIndustria = 'sel';
    claveMoneda = '0';
    claveResistencia = '';
    descripcion = '';
    areaUnitaria = 0;
    pesoUnitario = 0;
    precio = 0;
}

export interface ArticuloProspectoBasico {
    claveArticuloProspecto: string;
}
export class ArticuloProspectoBasico {
    claveArticuloProspecto = '';
}
