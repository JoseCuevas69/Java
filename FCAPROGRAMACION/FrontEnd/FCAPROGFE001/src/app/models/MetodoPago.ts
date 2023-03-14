export class MetodoPago {
    idMetodoPago : string
    descripcionMetodoPago : string
    fechaInicioDeVigencia : Date
    fechaFinDeVigencia : Date

    constructor(idMetodoPago?:string, descripcionMetodoPago?:string){
        this.idMetodoPago=idMetodoPago;
        this.descripcionMetodoPago=descripcionMetodoPago;
    }
}