export class Ciudad {
  claveDestino: string;
  ciudad: string;
  claveEstado: string;

  constructor(claveDestino?: string, ciudad?: string, claveEstado?: string) {
    this.claveDestino = claveDestino;
    this.ciudad = ciudad;
    this.claveEstado = claveEstado;
  }
}
