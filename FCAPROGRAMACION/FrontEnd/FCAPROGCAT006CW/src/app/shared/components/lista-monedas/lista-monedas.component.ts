import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Monedas } from 'src/app/models/Monedas';
import swal from 'sweetalert2';
import { CatFacturacionService } from 'src/app/shared/services/catfacturacion.service';
import { ControlContainer } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-monedas',
  templateUrl: './lista-monedas.component.html',
  styleUrls: ['./lista-monedas.component.css'],
})
export class ListaMonedasComponent implements OnInit {
  _MonedaValue = '0';
  @Input() set MonedaValue(value: string) {
    if (value !== undefined) {
      this._MonedaValue = value;
    }
  }
  @Input() disabled = false;
  @Output()
  MonedaValueChange: EventEmitter<string> = new EventEmitter<string>();
  Monedas: Array<Monedas>;
  constructor(private CatalogosFac: CatFacturacionService) {}

  ngOnInit(): void {
    this.buscarMonedas();
  }

  buscarMonedas(): void {
    this.CatalogosFac.buscarMonedas().subscribe(
      (data: Array<Monedas>) => {
        this.Monedas = data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de las Monedas, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  change(): void {
    this.MonedaValueChange.emit(this._MonedaValue);
  }
}
