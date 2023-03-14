import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Almacen } from 'src/app/models/Almacen';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-almacenstock',
  templateUrl: './lista-almacenstock.component.html',
  styleUrls: ['./lista-almacenstock.component.css'],
})
export class ListaAlmacenstockComponent implements OnInit {
  AlmacenStock: Array<Almacen>;
  @Input() AlmacenStockValue: string = 'sel';
  @Input() VisibleLabel: boolean = true;
  @Input() required: boolean = false;
  @Input() AlmacenStockDisabled: boolean = false;
  @Output()
  AlmacenStockValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.CatalogosVentas.ListarAlmacenStock().subscribe(
      (data: any) => {
        this.AlmacenStock = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion del Almacen Stock, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
