import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoRemisionado } from 'src/app/models/TipoRemisionado';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-tiporemisionado',
  templateUrl: './lista-tiporemisionado.component.html',
  styleUrls: ['./lista-tiporemisionado.component.css'],
})
export class ListaTiporemisionadoComponent implements OnInit {
  TipoRemisionado: Array<TipoRemisionado>;
  @Input() TipoRemisionadoValue: number = 0;
  @Input() required: boolean = false;
  @Output()
  TipoRemisionadoValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.CatalogosVentas.ListarTipoRemisionado().subscribe(
      (data: any) => {
        this.TipoRemisionado = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Tipo Remisionado, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
