import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaprogapi001Service } from 'src/app/shared/services/fcaprogapi001.service';
import swal from 'sweetalert2';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-desperdicio',
  templateUrl: './lista-desperdicio.component.html',
  styleUrls: ['./lista-desperdicio.component.css']
})
export class ListaDesperdicioComponent implements OnInit {
  Lista = [];
  @Input() Value: string;
  @Input() required = false;
  @Input() label = '';
  @Input() disabled = false;
  @Output() ValueChange = new EventEmitter<string>();
  constructor(private Servicios: fcaprogapi001Service) { }

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListaDesperdicio().subscribe(
      (data: any) => {
        this.Lista = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Desperdicio,' +
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
