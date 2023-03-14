import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DiasInventario } from 'src/app/models/DiasInventario';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-diasinventario',
  templateUrl: './lista-diasinventario.component.html',
  styleUrls: ['./lista-diasinventario.component.css'],
})
export class ListaDiasinventarioComponent implements OnInit {
  DiasInventario: Array<DiasInventario>;
  @Input() DiasInventarioValue: number = 0;
  @Input() VisibleLabel: boolean = true;
  @Input() Disabled: boolean = false;
  @Input() required: boolean = false;
  @Output()
  DiasInventarioValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.CatalogosVentas.ListarDiasInventario().subscribe(
      (data: any) => {
        this.DiasInventario = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Dias Inventario, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
