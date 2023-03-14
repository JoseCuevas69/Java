import {Lugaresentrega} from 'src/app/models/LuegaresEntrega';
import {Habilitado} from 'src/app/models/Habilitados';
export class DatosAdicionales {
  idCliente: string;
  facebook: string;
  twitter: string;
  instagram: string;
  pagWeb: string;
  industria: string;
  clasificacion: number;
  directo: boolean;
  noAplica: boolean;
  consignacion: boolean;
  stock: boolean;
  equipoArmador: boolean;
  visitasTecnicas: boolean;
  observaciones: string;
  fortalezas: string;
  debilidades: string;
  oportunidades: string;
  estrategias: string;
  pronosticos: string;
  trasporte: string;
  embarque: string;
  participacionCECSO: string;
  LugaresEntrega: Array<Lugaresentrega>;
  habilitados: Habilitado[];
}
export interface DatosAdicionales {
  idCliente: string;
  facebook: string;
  twitter: string;
  instagram: string;
  pagWeb: string;
  industria: string;
  clasificacion: number;
  noAplica: boolean;
  consignacion: boolean;
  stock: boolean;
  equipoArmador: boolean;
  visitasTecnicas: boolean;
  observaciones: string;
  fortalezas: string;
  debilidades: string;
  oportunidades: string;
  estrategias: string;
  pronosticos: string;
  trasporte: string;
  embarque: string;
  participacionCECSO: string;
  LugaresEntrega: Array<Lugaresentrega>;
  habilitados: Array<Habilitado>;
}

