import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Almacen } from 'src/app/models/Almacen';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-almacen',
  templateUrl: './lista-almacen.component.html',
  styleUrls: ['./lista-almacen.component.css'],
})
export class ListaAlmacenComponent implements OnInit {
  Almacen: Array<Almacen>;
  @Input() AlmacenValue: string = 'sel';
  @Input() VisibleLabel: boolean = true;
  @Input() AlmacenDisabled: boolean = false;
  @Input() required: boolean = false;
  @Output()
  AlmacenValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.CatalogosVentas.ListarAlmacen().subscribe(
      (data: any) => {
        this.Almacen = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion del Almacen, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
