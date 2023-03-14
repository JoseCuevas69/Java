import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AreaSolicitud, AreaSolicitudFiltros } from 'src/app/models/AreaSolicitud';
import { AreasSolicitudService } from 'src/app/services/areas-solicitud.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-areas-solicitud',
  templateUrl: './lista-areas-solicitud.component.html',
  styleUrls: ['./lista-areas-solicitud.component.css']
})
export class ListaAreasSolicitudComponent implements OnInit {
  areasSolicitud: AreaSolicitud[] = [];
  private innerValue = 0;
  @Input() selectId = '';
  @Input() default = {idAreaSolMultiple: 0, nombreAreaSolMultiple: 'SELECCIONAR...'};
  @Input() required = false;
  @Output() valueChange = new EventEmitter<number>();
  @Input() filters = new AreaSolicitudFiltros();

  @Input() get value(): number {
    return this.innerValue;
  }
  set value(value: number) {
    this.innerValue = value;
    this.valueChange.emit(this.innerValue);
  }

  constructor(private areasSolicitudService: AreasSolicitudService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.areasSolicitudService.listar(this.filters).subscribe(
    (data: AreaSolicitud[]) => {
      this.areasSolicitud = data;
    },
    (error: any) => {
      swal.fire(
        'Ha Ocurrio un Error',
        'Ha Ocurrio un Error al Momento de Cargar la Informacion de Areas Solicitud, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
        'error'
      );
    });
  }
}
