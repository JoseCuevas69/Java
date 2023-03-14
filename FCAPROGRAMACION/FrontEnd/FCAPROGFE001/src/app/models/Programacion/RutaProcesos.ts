export class EncabezadoRutaProcesos
{
     clave :string;
     descripcion :string;
     m1 :string;
     m2 :string;
     m3 :string;
     m4 :string;
     m5 :string;
     horasAdicional :string;
     unionPegada :boolean;

}
export class DetalleRutaProcesos
{
     //claveProceso :string;
     maquinaOrden :number;
     tipoMaquina:number;
     pegar: boolean;
     mx2 :boolean;

}
export class ProcesosRutas{
    selec: boolean;
    tProceso: number;
    descripcion:string;
}

export class EncabezadoDetalleRuta
{
    encabezado: EncabezadoRutaProcesos;
    detalleRutas: DetalleRutaProcesos[];
}