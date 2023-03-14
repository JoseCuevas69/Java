export class FormasPago {
    idFormaPago : string
    descripcionFormasPago : string
    requiereReferencia: boolean

    constructor(idFormaPago?: string , descripcionFormasPago?:string , requiereReferencia?:boolean){
        this.idFormaPago=idFormaPago;
        this.descripcionFormasPago =descripcionFormasPago;
        this.requiereReferencia = requiereReferencia;
    }
}