import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigProceso } from 'src/app/models/ConfigProceso';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-configproceso',
  templateUrl: './lista-configproceso.component.html',
  styleUrls: ['./lista-configproceso.component.scss']
})
export class ListaConfigprocesoComponent implements OnInit {
  Proceso = [];
  @Input() VisibleLabel = true;
  @Input() Disabled = false;
  @Input() required = false;

  @Input() get ProcesoValue(): number {
    return this.seleccionar;
  }
  set ProcesoValue(value) {
    this.seleccionar = value;
    this.ProcesoValueChange.emit(this.seleccionar);
  }
  @Output()
  ProcesoValueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  Change: EventEmitter<any> = new EventEmitter<any>();
  seleccionar = 0;

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.CatalogosVentas.ListaConfigProceso().subscribe(
      (data: any) => {
       this.Proceso = data.data;
       this.change(this.seleccionar);
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Configuracion de Proceso, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  change(e): void {
    let arrProceso: any = {};
    for (const iterator of  this.Proceso) {
      if ( e === iterator.idProceso ){
        arrProceso = iterator;
        break;
      }
    }
    if (Object.keys(arrProceso).length === 0){
      this.Change.emit({idProceso: 0, labels: 0});
      return;
    }
    this.Change.emit(arrProceso);
  }
}
