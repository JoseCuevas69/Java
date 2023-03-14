export interface Resistencia {
    claveResistencia: string;
    descripcion: string;
    presentacion: string;
    liner1: string;
    medium1: string;
    liner2: string;
    medium2: string;
    liner3: string;
    medium3: string;
    liner4: string;
    primeraFlauta: string;
    segundaFlauta: string;
    terceraFlauta: string;
    pesoM2: number;
    claveIngles: string;
    mullen: number;
}

export class Resistencia {
    claveResistencia = '';
    descripcion = '';
    presentacion = '';
    liner1 = '';
    medium1 = '';
    liner2 = '';
    medium2 = '';
    liner3 = '';
    medium3 = '';
    liner4 = '';
    primeraFlauta = '';
    segundaFlauta = '';
    terceraFlauta = '';
    pesoM2 = 0;
    claveIngles = '';
    mullen = 0;
}

export interface ResistenciaListar {
    claveResistencia: string;
    descripcion: string;
    presentacion?: string;
    liner1?: string;
    medium1?: string;
    liner2?: string;
    medium2?: string;
    liner3?: string;
    medium3?: string;
    liner4?: string;
    primeraFlauta?: string;
    segundaFlauta?: string;
    terceraFlauta?: string;
    pesoM2?: number;
    claveIngles?: string;
    mullen?: number;
}
export class ResistenciaListar {
    claveResistencia = '';
    descripcion = '';
    presentacion?: string;
    pesoM2?: number;

    constructor(claveResistencia?: string, descripcion?: string, presentacion?: string, pesoM2?: number){
        this.claveResistencia = claveResistencia;
        this.descripcion = descripcion;
        this.presentacion = presentacion;
        this.pesoM2 = pesoM2;
    }
}
