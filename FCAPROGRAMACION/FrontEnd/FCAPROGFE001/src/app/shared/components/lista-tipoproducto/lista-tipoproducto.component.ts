import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoProducto } from 'src/app/models/TipoProducto';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipoproducto',
  templateUrl: './lista-tipoproducto.component.html',
  styleUrls: ['./lista-tipoproducto.component.css'],
})
export class ListaTipoproductoComponent implements OnInit {
  TipoProducto: Array<TipoProducto>;
  @Input() TipoProductoValue = '';
  @Input() VisibleLabel = true;
  @Input() BloquearDosPiezas = false;
  @Input() Disabled = false;
  @Input() required = false;
  @Output()
  TipoProductoValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.CatalogosVentas.ListarTipoProducto().subscribe(
      (data: any) => {
        this.TipoProducto = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Tipo Producto, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
