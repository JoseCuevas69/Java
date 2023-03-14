import {Paso1} from 'src/app/models/Paso1';
export interface Lugaresentrega {
  idCliente: string;
  idLugarEntrega: number;
  claveCiudad: string;
  nombreCiudad: string;
  claveEstado: string;
  cp: string;
  colonia: string;
  labPlanta: boolean;
  direccion: string;
  referencias: string;
  horario: string;
  diasRecibe: string;
  contacto: string;
  telefono: string;
  nombreEmpacadora: string;
  Paso1: Array<Paso1>;
}
export class Lugaresentrega {
  idCliente: string;
  idLugarEntrega: number;
  claveCiudad: string;
  nombreCiudad: string;
  claveEstado: string;
  cp: string;
  colonia: string;
  labPlanta: boolean;
  direccion: string;
  referencias: string;
  horario: string;
  diasRecibe: string;
  contacto: string;
  telefono: string;
  nombreEmpacadora: string;
  Paso1: Array<Paso1>;
  LugarEntregaList: Lugaresentrega [] = [];
  LugaresentregaManual: Lugaresentrega [] = [];
}

export class LugaresentregaManual {
  idCliente: string;
  idLugarEntrega: number;
}
