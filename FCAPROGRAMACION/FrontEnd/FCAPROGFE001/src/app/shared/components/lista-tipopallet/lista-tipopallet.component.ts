import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipopallet',
  templateUrl: './lista-tipopallet.component.html',
  styleUrls: ['./lista-tipopallet.component.css'],
})
export class ListaTipopalletComponent implements OnInit {
  ListaTipopallet = [];
  @Input() TipopalletValue: string;
  @Input() required = false;
  @Input() Disabled = false;
  @Output() TipopalletValueChange = new EventEmitter<string>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaTipoPallet().subscribe(
      (data: any) => {
        this.ListaTipopallet = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Tipo Pallet,' +
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
