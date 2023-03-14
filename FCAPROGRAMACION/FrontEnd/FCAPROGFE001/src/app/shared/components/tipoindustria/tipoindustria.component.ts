import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SubCodigoService} from 'src/app/services/Subcodigo.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-tipoindustria',
  templateUrl: './tipoindustria.component.html',
  styleUrls: ['./tipoindustria.component.css']
})
export class TipoindustriaComponent implements OnInit {

  ListaIndustria = [];
  @Input() IndustriaValue: string;
  @Input() required = false;
  @Output() ItemData = new EventEmitter<string>();
  constructor(private Servicios: SubCodigoService) { }

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void{
    this.Servicios.ListarTipoIndustria().subscribe((data: any) => {
      this.ListaIndustria = data.data;
    },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Industrias,'
          + ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,'
          + ' <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        );
      });
  }

}

