import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoSolicitudFiltros, TipoSolicitudLista } from 'src/app/models/TipoSolicitud';
import { TiposSolicitudService } from 'src/app/services/tipos-solicitud.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipos-solicitud',
  templateUrl: './lista-tipos-solicitud.component.html',
  styleUrls: ['./lista-tipos-solicitud.component.css']
})
export class ListaTiposSolicitudComponent implements OnInit {
  data: TipoSolicitudLista[] = [];
  private innerValue = 0;
  @Input() selectId = '';
  @Input() default = new TipoSolicitudLista();
  @Input() required = false;
  @Output() valueChange = new EventEmitter<number>();
  @Input() filters = new TipoSolicitudFiltros();
  private gridParams = {startRow: 0, endRow: 0};

  @Input() get value(): number {
    return this.innerValue;
  }
  set value(value: number) {
    this.innerValue = value;
    this.valueChange.emit(this.innerValue);
  }

  constructor(private tiposSolicitudService: TiposSolicitudService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.tiposSolicitudService.listar(this.gridParams, this.filters).subscribe(
      (res: { data: TipoSolicitudLista[] }) => {
        this.data = res.data;
      },
      (error: any) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Areas Solicitud, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        );
      }
    );
  }
}
