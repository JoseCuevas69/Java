import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ivas } from 'src/app/models/Ivas';
import swal from 'sweetalert2';
import { CatFacturacionService } from 'src/app/shared/services/catfacturacion.service';

@Component({
  selector: 'lista-iva',
  templateUrl: './lista-iva.component.html',
  styleUrls: ['./lista-iva.component.css'],
})
export class ListaIVAComponent implements OnInit {
  IVA: Ivas[] = [];
  @Input() set IvaValue(value) {
    this.seleccionar = new Ivas(value);
  }
  seleccionar: Ivas;

  @Output() IvaValueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private Servicios: CatFacturacionService) {}

  ngOnInit() {
    this.buscarIVA();
  }

  buscarIVA() {
    this.Servicios.buscarIva().subscribe(
      (data: Array<Ivas>) => {
        data.forEach((element) => {
          this.IVA.push(
            new Ivas(
              element.idIva,
              element.valorIVA,
              element.columna,
              element.estatusProveedor
            )
          );
        });
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion del IVA,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, ' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  ChangeIva(e) {
    this.IvaValueChange.emit(e);
  }
  comparar(Sel: Ivas, Dat: Ivas) {
    if (Sel == null || Dat == null) {
      return false;
    }
    return Sel.idIva === Dat.idIva;
  }
}
