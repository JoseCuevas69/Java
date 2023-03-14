import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoVariacion } from 'src/app/models/TipoVariacion';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-tipovariacion',
  templateUrl: './lista-tipovariacion.component.html',
  styleUrls: ['./lista-tipovariacion.component.css'],
})
export class ListaTipovariacionComponent implements OnInit {
  TipoVariacion: Array<TipoVariacion>;
  @Input() TipoVariacionValue: number = 0;
  @Input() required: boolean = false;
  @Output()
  TipoVariacionValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.CatalogosVentas.ListarTipoVariacion().subscribe(
      (data: any) => {
        this.TipoVariacion = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion del Tipo Variacion, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
