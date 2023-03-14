import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tinta',
  templateUrl: './lista-tinta.component.html',
  styleUrls: ['./lista-tinta.component.css']
})
export class ListaTintaComponent implements OnInit {
  ListaTinta = [];
  @Input() TintaValue: number;
  @Input() required = false;
  @Input() label = '';
  @Output() TintaValueChange = new EventEmitter<number>();
  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaTinta().subscribe(
      (data: any) => {
        this.ListaTinta = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Tinta,' +
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

