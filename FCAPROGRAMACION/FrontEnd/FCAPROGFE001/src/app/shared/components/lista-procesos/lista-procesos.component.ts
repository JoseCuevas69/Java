import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Proceso } from 'src/app/models/Procesos';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-procesos',
  templateUrl: './lista-procesos.component.html',
  styleUrls: ['./lista-procesos.component.css'],
})
export class ListaProcesosComponent implements OnInit {
  Proceso = [];
  @Input() VisibleLabel = true;
  @Input() Disabled = false;
  @Input() required = false;

  @Input() get ProcesoValue(): string {
    return this.seleccionar;
  }
  set ProcesoValue(value) {
    this.seleccionar = value;
    this.ProcesoValueChange.emit(this.seleccionar);
  }
  @Output()
  ProcesoValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  Change: EventEmitter<string> = new EventEmitter<string>();
  seleccionar = '';

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.CatalogosVentas.ListaProcesos().subscribe(
      (data: any) => {
        this.Proceso = data.data;
        this.change(this.seleccionar);
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Proceso, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  change(e): void {
    let arrProceso: any = {};
    for (const iterator of this.Proceso) {
      if (e === iterator.claveProceso) {
        arrProceso = iterator;
      }
    }
    if (Object.keys(arrProceso).length === 0) {
      return;
    }
    this.Change.emit(arrProceso);
  }
}
