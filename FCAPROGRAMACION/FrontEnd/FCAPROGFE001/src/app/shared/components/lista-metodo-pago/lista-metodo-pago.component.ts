import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

import { MetodoPago } from 'src/app/models/MetodoPago';
import { CatFacturacionService } from '../../services/catfacturacion.service';

@Component({
  selector: 'app-lista-metodo-pago',
  templateUrl: './lista-metodo-pago.component.html',
  styleUrls: ['./lista-metodo-pago.component.css']
})
export class ListaMetodoPagoComponent implements OnInit {

  MetodoPago: MetodoPago[] = [];
  @Input() set MetodoPagoValue(value) {
    this.seleccionar = new MetodoPago(value);
  }
  seleccionar: MetodoPago;

  @Input() required = false;
  @Output() MetodoPagoValueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private CatalogosFac: CatFacturacionService) {}

  ngOnInit(): void {
    this.buscarMetodoPago();
  }

  buscarMetodoPago(): void{
    this.CatalogosFac.buscarMetodoPago().subscribe(
      (data: Array<MetodoPago>) => {
        this.MetodoPago.push(new MetodoPago('sel', 'SELECCIONAR...'));
        data.forEach((element) => {
          this.MetodoPago.push(
            new MetodoPago(
              element.idMetodoPago,
              element.descripcionMetodoPago
            )
          );
        });
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de metodos de Pago, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }

  changeMetodoPago(e): void{
    this.MetodoPagoValueChange.emit(e);
  }

  comparar(Sel: MetodoPago, Dat: MetodoPago): boolean {
    if (Sel === null || Dat === null) {
      return false;
    }
    return Sel.idMetodoPago === Dat.idMetodoPago;
  }
}
