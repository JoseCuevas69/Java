import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clasificacion } from 'src/app/models/Clasificacion';
import swal from 'sweetalert2';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-clasificacion',
  templateUrl: './lista-clasificacion.component.html',
  styleUrls: ['./lista-clasificacion.component.css'],
})
export class ListaClasificacionComponent implements OnInit {
  @Input() ClasificacionValue = 0;
  @Input() disabled = false;
  @Input() required = false;
  @Output()
  ClasificacionValueChange: EventEmitter<number> = new EventEmitter<number>();
  Clasificacion: Array<Clasificacion>;
  constructor(private fcaventapi001: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.fcaventapi001.ListarClasificacion().subscribe(
      (data: any) => {
        this.Clasificacion = data.data;
        this.selDefault();
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Clasificación, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  change(): void {
    this.ClasificacionValueChange.emit(this.ClasificacionValue);
  }
  selDefault(): void {
    for (const iterator of this.Clasificacion) {
      if (iterator.mostrarPorDefault) {
        this.ClasificacionValue = iterator.idClasificacion;
        break;
      }
    }
  }
}
