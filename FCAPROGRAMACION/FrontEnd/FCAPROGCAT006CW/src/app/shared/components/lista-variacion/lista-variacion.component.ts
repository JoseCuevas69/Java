import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Variacion } from 'src/app/models/Variacion';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-variacion',
  templateUrl: './lista-variacion.component.html',
  styleUrls: ['./lista-variacion.component.css'],
})
export class ListaVariacionComponent implements OnInit {
  Variacion: Array<Variacion>;
  @Input() VariacionValue: number = 0;
  @Input() required: boolean = false;
  @Output()
  VariacionValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.CatalogosVentas.ListarVariacion().subscribe(
      (data: any) => {
        this.Variacion = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Variacion, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
