export class Maquinas {
  claveMaquina: string;
  nombreMaquina: string;
}

export class Desperdicio{
  id: number;
  rInicial: number;
  rFinal: number;
  desperdicio: number;
}

export class MaquinaSelec{
  claveMaquina:string;
  troquela:boolean;
  proceso:string;
  default:boolean;

}
export class Procesos{
  tProceso: number;
  descripcion:string;
}

export class Evaluaciones{
  codEvaluacion: number;
  nombre:string;
}

export class Tripulaciones{
  idTripulacion: number;
  nombre: string;
}

export class Maquina{
   tipoMaquina : string;
   claveMaquina : string;
   nombre : string;
   troquela :boolean; 
   tintasMax : number;
   anchoMax : number;
   anchoMaxT : number;
   anchoMaxAlt : number;
   anchoMin : number;
   largoMax : number;
   largoMaxT : number;
   largoMin : number;
   costoMinuto : number;
   capacidadSemanal : number;
   salariosTurno : number;
   desp1000 : number;
   desp10000 : number;
   despMayor10000 : number;
   m2Hora : number;
   noAceptaPiezasxCorte : boolean; 
   eficiencia : number;
   tproceso : number;
   default : boolean; 
   imprime : boolean; 
   codEvaluacion : number;
   minStd : number;
   turnosxDia : number;
   evaluaMtto : boolean;
   porcenEvaluaMtto :number; 
   evalua : string;
   valMinStd : boolean; 
   evaluaVelocidad : boolean; 
   maquinaPar : number;
   pzaValStd : number;
   esCapAut : boolean; 
   ubucacionPlcCP: number;
   permiteMoficarProd: boolean; 
   implementadoAut: boolean; 
   tipoConsulta: number;
   isRecord: boolean; 
   limiteReserva: number;
   utilizaSuaje66: boolean; 
   utilizaSuaje50: boolean; 
   esCortadora: boolean; 
   esEtiquetadora: boolean; 
   idAreaCosto: number;
}

export class guardaMaquinas{
  Maquinas:Maquina[];
  Desperdicios:Desperdicio[];
  Tripulaciones: Tripulaciones[];
  CambioEficiencia: boolean;
  CambioCodEvaluacion:boolean;
}