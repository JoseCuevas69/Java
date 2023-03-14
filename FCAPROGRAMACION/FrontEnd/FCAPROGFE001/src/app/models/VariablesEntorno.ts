export interface VariablesEntorno {
    idParametro: number;
    parametro:  string;
    descripcion:  string;
    valor: number;

}

export class VariablesEntorno {
   idParametro = 0;
    parametro =  '';
    descripcion=  '';
    valor  = 0;
    lstdatos: Variables[] = [];
}

export class Variables {
    idParametro = 0;
    valor  = '';
 }

