import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subcodigo } from 'src/app/models/DTO/Subcodigo';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-subcodigo',
  templateUrl: './lista-subcodigo.component.html',
  styleUrls: ['./lista-subcodigo.component.css'],
})
export class ListaSubcodigoComponent implements OnInit {
  Subcodigo: Array<Subcodigo>;
  @Input() SubcodigoValue = 0;
  @Input() VisibleLabel = true;
  @Input() Disabled = false;
  @Input() required = false;
  @Output()
  SubcodigoValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.CatalogosVentas.ListaSubcodigo().subscribe(
      (data: any) => {
        this.Subcodigo = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Subcodigo, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
