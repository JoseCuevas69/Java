import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Estado } from 'src/app/models/Estado';
import { sertrafapi001Service } from 'src/app/shared/services/sertrafapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-estado',
  templateUrl: './lista-estado.component.html',
  styleUrls: ['./lista-estado.component.css'],
})
export class ListaEstadoComponent implements OnInit {
  Estado: Array<Estado>;
  @Input() EstadoValue = 'sel';
  @Input() required = false;
  Clave = '';
  @Input() set ClavePais(value) {
    if (value !== 'sel') {
      this.Clave = value;
      this.buscar();
    }
  }
  @Input() Disabled = false;
  @Output()
  EstadoValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public CatalogosTrafico: sertrafapi001Service) {}

  ngOnInit(): void {
    if (this.Clave === ''){
      this.buscar();
    }
  }

  buscar(): void {
    this.CatalogosTrafico.ListarEstado(this.Clave).subscribe(
      (data: any) => {
        this.Estado = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Estado, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
