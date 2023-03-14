import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaprogapi001Service } from 'src/app/shared/services/fcaprogapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'prog-lista-almacen',
  templateUrl: './lista-almacen.component.html',
  styleUrls: ['./lista-almacen.component.css']
})
export class ProgListaAlmacenComponent implements OnInit {
  Lista = [];
  @Input() Value: number;
  @Input() required = false;
  @Input() label = '';
  @Input() disabled = false;
  @Output() ValueChange = new EventEmitter<number>();
  constructor(private Servicios: fcaprogapi001Service) { }

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaAlmacen().subscribe(
      (data: any) => {
        this.Lista = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion (ListaAlmacen),' +
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

