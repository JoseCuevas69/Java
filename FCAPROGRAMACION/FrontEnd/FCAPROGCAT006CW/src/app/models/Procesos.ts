export interface Proceso {
  claveProceso: string;
  descripcion: string;
  tipoMaquina: string;
  tratamiento: boolean;
  subProceso: string;
  tintas: string;
  conSuaje: boolean;
}
export class Proceso {
  claveProceso: string;
  descripcion: string;
  tipoMaquina: string;
  tratamiento: boolean;
  subProceso: string;
  tintas: string;
  conSuaje: boolean;

  constructor(
    claveProceso?: string,
    descripcion?: string,
    tipoMaquina?: string,
    tratamiento?: boolean,
    subProceso?: string,
    tintas?: string,
    conSuaje?: boolean
  ) {
    this.tipoMaquina = tipoMaquina;
    this.claveProceso = claveProceso;
    this.descripcion = descripcion;
    this.tratamiento = tratamiento;
    this.subProceso = subProceso;
    this.tintas = tintas;
    this.conSuaje = conSuaje;
  }
}
