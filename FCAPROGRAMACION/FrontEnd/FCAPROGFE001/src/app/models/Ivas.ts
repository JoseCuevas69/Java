export class Ivas{
    idIva: string;
    valorIVA: number;
    columna: number;
    estatusProveedor: boolean;

    constructor(idIva?: string, valorIVA?: number,  columna?: number, estatusProveedor?: boolean){
        this.idIva = idIva;
        this.valorIVA = valorIVA;
        this.columna = columna;
        this.estatusProveedor = estatusProveedor;
    }
}
