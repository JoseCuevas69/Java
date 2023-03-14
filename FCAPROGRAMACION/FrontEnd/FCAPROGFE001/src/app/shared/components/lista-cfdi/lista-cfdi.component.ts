import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsosCFDI } from 'src/app/models/UsosCFDI';
import {CatFacturacionService} from 'src/app/shared/services/catfacturacion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-cfdi',
  templateUrl: './lista-cfdi.component.html',
  styleUrls: ['./lista-cfdi.component.css']
})
export class ListaCFDIComponent implements OnInit {
  UsoCFDI: Array<UsosCFDI>;
  @Input() CFDIValue: string = 'sel';
  @Input() required: boolean = false;
  @Output() CFDIValueChange: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private CatalogosFac: CatFacturacionService) { }

  ngOnInit() {
    this.buscarUsosCFDI();
  }

  buscarUsosCFDI(){
    this.CatalogosFac.buscarUsosCFDI().subscribe((data:any) => {
      this.UsoCFDI = data;
    },(error) =>{
      swal.fire(
        'Ha Ocurrio un Error',
        'Ha Ocurrio un Error al Momento de Cargar la Informacion de Usos de CFDI, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
        'error'
      );
    });
  }

}
