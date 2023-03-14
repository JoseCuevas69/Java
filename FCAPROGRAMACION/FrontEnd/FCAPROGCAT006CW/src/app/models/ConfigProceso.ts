export interface ConfigProceso {
  idProceso: number;
  nombre: string;
  labels: number;
}
export class ConfigProceso {
  idProceso: number;
  nombre: string;
  labels: number;

  constructor(idProceso?: number, nombre?: string, labels?: number){
    this.idProceso = idProceso;
    this.nombre = nombre;
    this.labels = labels;
  }
}
