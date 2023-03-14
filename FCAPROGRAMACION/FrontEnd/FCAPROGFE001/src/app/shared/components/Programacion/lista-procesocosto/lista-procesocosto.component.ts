import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Promise } from 'ag-grid-community';
import { count } from 'rxjs/operators';
import { fcaprogapi001Service } from 'src/app/shared/services/fcaprogapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-procesocosto',
  templateUrl: './lista-procesocosto.component.html',
  styleUrls: ['./lista-procesocosto.component.css'],
})
export class ListaProcesocostoComponent implements OnInit {
  Lista = [];
  @Input() Value: string;
  @Input() required = false;
  @Input() label = '';
  @Input() disabled = false;
  @Input() nomOpcionDefault = 'SELECCIONAR...';
  @Input() set filtro(value) {
    if (value !== ''){
      this.TipoMaquina = value;
      this.Buscar();
    }
  }
  @Output() ValueChange = new EventEmitter<string>();
  constructor(private Servicios: fcaprogapi001Service) {}

  TipoMaquina = '';
  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListarProcesoCosto(this.TipoMaquina).subscribe(
      (data: any) => {
        this.Lista = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Proceso Costo,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
