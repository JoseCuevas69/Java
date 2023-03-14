
export interface CorreoAccionesList {
  IdUsuario: string;
  IdEmpleado: string;
  NombreEmpleado: string;
  CorreoEmpleado: string;
  Notificar: boolean;
}

export class CorreoAcciones {
  IdUsuario: string;
  IdEmpleado: string;
  NombreEmpleado: string;
  CorreoEmpleado: string;
  Notificar: boolean;
  ListaCorreoAcciones: CorreoAccionesList [] = [];
}
