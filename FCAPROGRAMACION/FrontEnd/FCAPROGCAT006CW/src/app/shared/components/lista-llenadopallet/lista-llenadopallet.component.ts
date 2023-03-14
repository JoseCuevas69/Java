import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-llenadopallet',
  templateUrl: './lista-llenadopallet.component.html',
  styleUrls: ['./lista-llenadopallet.component.css']
})
export class ListaLlenadopalletComponent implements OnInit {
  ListaLlenadoPallet = [];
  @Input() LlenadoPalletValue: number;
  @Input() required = false;
  @Input() Disabled = false;
  @Output() LlenadoPalletValueChange = new EventEmitter<number>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaLlenadoPallet().subscribe(
      (data: any) => {
        this.ListaLlenadoPallet = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de llenado Pallet,' +
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
