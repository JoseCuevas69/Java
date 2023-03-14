import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Representante, Representantes } from 'src/app/models/Representantes';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-representantes',
  templateUrl: './lista-representantes.component.html',
  styleUrls: ['./lista-representantes.component.css'],
})
export class ListaRepresentantesComponent implements OnInit {
  Representantes: Array<Representantes>;
  @Input() RepresentantesValue = 0;
  @Input() required = false;
  @Output() RepresentantesValueChange = new EventEmitter<number>();
  @Input() displayDefaultLabel = true;
  @Output() modelChange = new EventEmitter<Representantes>();
  @Input() disabled = false;

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  valueChangeController(idRepresentante: number): void {
    this.RepresentantesValueChange.emit(idRepresentante);
    if (idRepresentante === 0) {
      this.modelChange.emit(null);
    } else {
      for (const representante of this.Representantes) {
        if (representante.codigoRepresentante === idRepresentante) {
          this.modelChange.emit(representante);
          break;
        }
      }
    }
  }

  buscar(): void {
    this.CatalogosVentas.ListarRepresentantes('').subscribe(
      (data: any) => {
        this.Representantes = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de representante, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
