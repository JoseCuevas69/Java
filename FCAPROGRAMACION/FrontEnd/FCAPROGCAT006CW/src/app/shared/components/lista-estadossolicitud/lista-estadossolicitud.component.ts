import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-estadossolicitud',
  templateUrl: './lista-estadossolicitud.component.html',
  styleUrls: ['./lista-estadossolicitud.component.scss']
})
export class ListaEstadossolicitudComponent implements OnInit {
  EstadoSolicitud = [];
  @Input() EstadoSolicitudValue = 0;
  @Input() VisibleLabel = true;
  @Input() Disabled = false;
  @Input() required = false;
  @Output()
  EstadoSolicitudValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.CatalogosVentas.ListaEstatusSeguimiento().subscribe(
      (data: any) => {
        this.EstadoSolicitud = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
