import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipopaletizado',
  templateUrl: './lista-tipopaletizado.component.html',
  styleUrls: ['./lista-tipopaletizado.component.css'],
})
export class ListaTipopaletizadoComponent implements OnInit {
  ListaTipopaletizado = [];
  @Input() TipopaletizadoValue: number;
  @Input() required = false;
  @Input() Disabled = false;
  @Output() TipopaletizadoValueChange = new EventEmitter<number>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaTipoPaletizado().subscribe(
      (data: any) => {
        this.ListaTipopaletizado = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Tipo Paletizado,' +
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
