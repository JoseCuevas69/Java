import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipograbado',
  templateUrl: './lista-tipograbado.component.html',
  styleUrls: ['./lista-tipograbado.component.css'],
})
export class ListaTipograbadoComponent implements OnInit {
  ListaTipoGrabado = [];
  @Input() TipoGrabadoValue: string;
  @Input() required = false;
  @Output() TipoGrabadoValueChange = new EventEmitter<string>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaTipoGrabado().subscribe(
      (data: any) => {
        this.ListaTipoGrabado = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Tipo Grabado,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
