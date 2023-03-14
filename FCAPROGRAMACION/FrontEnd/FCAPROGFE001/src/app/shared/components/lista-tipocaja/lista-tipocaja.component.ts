import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoCaja } from 'src/app/models/TipoCaja';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipocaja',
  templateUrl: './lista-tipocaja.component.html',
  styleUrls: ['./lista-tipocaja.component.css']
})
export class ListaTipocajaComponent implements OnInit {
  TipoCaja: TipoCaja[] = [];
  @Input() VisibleLabel = true;
  @Input() Disabled = false;
  @Input() required = false;
  @Input() MostrarConSuaje = false;
  Dato: number;
  @Input() get TipoCajaValue(): number{
    return this.Dato;
  }
  set TipoCajaValue(value: number) {
    this.Dato = value;
    this.TipoCajaValueChange.emit(this.Dato);
  }

  @Output()
  TipoCajaValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  Change: EventEmitter<any> = new EventEmitter<any>();
  seleccionar: TipoCaja;
  TipoCajaConSuaje = '';

  constructor(public CatalogosVentas: fcaventapi001Service) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.CatalogosVentas.ListaTipoCaja().subscribe(
      (data: any) => {
        this.TipoCaja = data.data;
        this.change(this.Dato);
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Tipo Caja, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  change(e): void {
    let arrTipoCaja: any = {};
    for (const iterator of this.TipoCaja) {
       if (e === iterator.idTipoCaja){
        arrTipoCaja = iterator;
       }
      }
    if (Object.keys(arrTipoCaja).length === 0) {
      this.TipoCajaConSuaje = '';
      return;
    } else {
      if (arrTipoCaja.conSuaje) {
        this.TipoCajaConSuaje = 'Con Suaje';
      } else {
        this.TipoCajaConSuaje = 'Sin Suaje';
      }
    }
    this.Change.emit(arrTipoCaja);
  }
}

