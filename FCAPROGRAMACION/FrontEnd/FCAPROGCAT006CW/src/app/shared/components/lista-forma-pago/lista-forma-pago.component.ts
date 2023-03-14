import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormasPago } from 'src/app/models/FormasPago';
import swal from 'sweetalert2';
import { CatFacturacionService } from 'src/app/shared/services/catfacturacion.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-forma-pago',
  templateUrl: './lista-forma-pago.component.html',
  styleUrls: ['./lista-forma-pago.component.css'],
})
export class ListaFormaPagoComponent implements OnInit {
  FormasPago: FormasPago[] = [];
  @Input() set FormaPagoValue(value) {
    this.seleccionar = new FormasPago(value);
  }
  seleccionar: FormasPago;

  @Input() required = false;
  @Output() FormaPagoValueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private CatalogosFac: CatFacturacionService) {}

  ngOnInit(): void {
    this.buscarFormasPago();
  }

  buscarFormasPago(): void {
    this.CatalogosFac.buscarFormasPago().subscribe(
      (data: Array<FormasPago>) => {
        this.FormasPago.push(new FormasPago('sel', 'SELECCIONAR...'));
        data.forEach((element) => {
          this.FormasPago.push(
            new FormasPago(
              element.idFormaPago,
              element.descripcionFormasPago,
              element.requiereReferencia
            )
          );
        });
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de las Formas de Pago, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  changeFormaPago(e): void {
    this.FormaPagoValueChange.emit(e);
  }

  comparar(Sel: FormasPago, Dat: FormasPago): boolean {
    if (Sel === null || Dat === null) {
      return false;
    }
    return Sel.idFormaPago === Dat.idFormaPago;
  }
}
