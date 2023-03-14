import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResistenciaListar } from 'src/app/models/Resistencia';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-resistencias',
  templateUrl: './lista-resistencias.component.html',
  styleUrls: ['./lista-resistencias.component.css'],
})
export class ListaResistenciasComponent implements OnInit {
  Resistencia: ResistenciaListar[] = [];
  @Input() VisibleLabel = true;
  @Input() Disabled = false;
  @Input() required = false;

  @Input() set ResistenciaValue(value) {
    this.seleccionar = new ResistenciaListar(value);
  }
  @Output()
  ResistenciaValueChange: EventEmitter<any> = new EventEmitter<any>();
  seleccionar: ResistenciaListar;

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.CatalogosVentas.ListaResistencias().subscribe(
      (data: any) => {
        this.Resistencia.push(new ResistenciaListar('SELECCIONAR...'));
        data.data.forEach((element) => {
          this.Resistencia.push(
            new ResistenciaListar(
              element.claveResistencia,
              element.descripcion,
              element.presentacion,
              element.pesoM2
            )
          );
        });
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Resistencia, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  changeResistencia(e): void {
    this.ResistenciaValueChange.emit(e);
  }

  comparar(Sel: ResistenciaListar, Dat: ResistenciaListar): boolean {
    if (Sel === null || Dat === null) {
      return false;
    }
    return Sel.claveResistencia === Dat.claveResistencia;
  }
}
