export class ListadoMaquinas{
    claveMaquina: string;
    nombre:string;
}

export class Procesos
{
    claveProceso:string;
    descripcion:string;
}

export class TiempoStdPreparacion
{
     tipoMaquina:string;
     claveMaquina:string;
     claveProceso:string;
     descripcion:string;
     tiempoStd:number;
     eficiencia:number;
     velocidadObjetivo:number
}

export class VelocidadEstandar
{
    claveMaquina:string;
    areaInicial:number;
    areaFinal:number;
    velocidadStd:number;

}

export class HorariosComida
{
    claveArea:string;
    descripcion:string;
    turno:string;
    horaInicio:string;
    horaFinal:string;
    claveMaquina:string;

}