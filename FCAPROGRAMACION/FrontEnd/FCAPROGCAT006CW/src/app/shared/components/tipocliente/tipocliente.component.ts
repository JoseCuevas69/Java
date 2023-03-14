import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoClienteService } from 'src/app/services/TipoCliente.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-tipocliente',
  templateUrl: './tipocliente.component.html',
  styleUrls: ['./tipocliente.component.css'],
})
export class TipoclienteComponent implements OnInit {
  ListaTipoCliente = [];
  @Input() TipoClienteValue: number;
  @Output() ItemData = new EventEmitter<number>();
  @Input() required: boolean;

  constructor(private Servicios: TipoClienteService) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListarTipoCliente().subscribe(
      (data: any) => {
        this.ListaTipoCliente = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Tipo Cliente,' +
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
