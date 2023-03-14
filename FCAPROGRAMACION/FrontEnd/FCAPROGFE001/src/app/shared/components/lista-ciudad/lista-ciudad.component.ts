import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ciudad } from 'src/app/models/Ciudad';
import { sertrafapi001Service } from 'src/app/shared/services/sertrafapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.css'],
})
export class ListaCiudadComponent implements OnInit {
  Ciudad: Ciudad[] = [];
  @Input() set CiudadValue(value) {
    this.seleccionar = new Ciudad(value);
  }
  seleccionar: Ciudad;
  @Input() required = false;
  Clave = '';
  @Input() set ClaveEstado(value) {
    this.Ciudad = [];
    this.Clave = value;
    this.buscar();
  }
  @Output()
  CiudadValueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(public CatalogosTrafico: sertrafapi001Service) {}

  ngOnInit(): void {
    if (this.Clave === ''){
      this.buscar();
    }
  }

  buscar(): void {
    this.CatalogosTrafico.ListarCiudad(this.Clave).subscribe(
      (data: any) => {
        this.Ciudad.push(new Ciudad('sel', 'SELECCIONAR...'));
        data.data.forEach((element) => {
          this.Ciudad.push(
            new Ciudad(
              element.claveDestino,
              element.ciudad,
              element.claveEstado
            )
          );
        });
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Ciudad, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  ChangeCiudad(e): void{
    this.CiudadValueChange.emit(e);
  }
  comparar(Sel: Ciudad, Dat: Ciudad): boolean {
    if (Sel === null || Dat === null) {
      return false;
    }
    return Sel.claveDestino === Dat.claveDestino;
  }
}
