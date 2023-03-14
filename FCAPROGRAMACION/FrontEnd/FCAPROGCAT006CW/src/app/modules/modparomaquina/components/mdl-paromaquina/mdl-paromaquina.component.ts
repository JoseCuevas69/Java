import { Component, Input, OnInit } from '@angular/core';

import { Paros } from 'src/app/models/paros';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
interface clsParo {
  tipotiempo: string;
  clavemaquina: string;
  fecha: string;
  horaini: string;
  horafin: string;
  tiempomin: number;
  comentario: string;
  estatus : boolean;  
  usuario: string;
}
@Component({
  selector: 'mdl-paromaquina',
  templateUrl: './mdl-paromaquina.component.html',
  styleUrls: ['./mdl-paromaquina.component.css']
})
export class MdlParomaquinaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  Paros : Array<Paros>;

  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) 
    {
      //this.Limpiar();
      if (Object.keys(value).length !== 0) {
        this.paro = value;
        if (value.longitud !== 0){
          //this.disabledLogitud = false;
        }
      }
    }

  //TipoMaquina: string , TipoTiempo: string ,  ClaveMaquina: string, Fecha: string
 // @Input() strTipoMaquina: string;
  //@Input() strTipoTiempo: string;
  //@Input() strClaveMaquina: string;
  //@Input() strFecha : string;
  paro: clsParo = 
  { 
    tipotiempo: '', 
    clavemaquina: '', 
    fecha: '', 
    horaini: '', 
    horafin: '', 
    tiempomin: 0 , 
    comentario: '', 
    estatus : true,  
    usuario: '001000'
  };
  //[TipoAccion]="TipoAccion" [Datos]="Datos"

  constructor() { }

  ngOnInit(): void {
    
  }
  AgregarParo(): void {
    
  }

}
