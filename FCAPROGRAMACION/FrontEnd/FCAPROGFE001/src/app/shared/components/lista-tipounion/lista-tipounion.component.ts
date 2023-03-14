import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipounion',
  templateUrl: './lista-tipounion.component.html',
  styleUrls: ['./lista-tipounion.component.css']
})
export class ListaTipounionComponent implements OnInit {

  TipoUnion = [];
  @Input() TipoUnionValue: string;
  @Input() required = false;
  @Input() Disabled = false;
  @Output() TipoUnionValueChange = new EventEmitter<string>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaTipoUnion().subscribe(
      (data: any) => {
        this.TipoUnion = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Flautas,' +
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
