import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-acomodo',
  templateUrl: './lista-acomodo.component.html',
  styleUrls: ['./lista-acomodo.component.scss'],
})
export class ListaAcomodoComponent implements OnInit {
  ListaAcomodo = [];
  @Input() AcomodoValue: number;
  @Input() required = false;
  @Input() Disabled = false;
  @Input() texto = '';
  @Output() AcomodoValueChange = new EventEmitter<number>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaAcomodo().subscribe(
      (data: any) => {
        this.ListaAcomodo = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Acomodo,' +
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
