import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnidadMedida } from 'src/app/models/UnidadMedida';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-unidadmedida',
  templateUrl: './lista-unidadmedida.component.html',
  styleUrls: ['./lista-unidadmedida.component.css'],
})
export class ListaUnidadmedidaComponent implements OnInit {
  ListaUnidadMedida: Array<UnidadMedida>;
  @Input() UnidadMedidaValue: number;
  @Input() required = false;

  @Output() UnidadMedidaValueChange = new EventEmitter<number>();
  @Output() requiredChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListarUnidadMedida().subscribe(
      (data: any) => {
        this.ListaUnidadMedida = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Unidad de Medida,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  Change(e): void {
    this.requiredChange.emit(false);
    this.UnidadMedidaValueChange.emit(e);
  }
}
