import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaprogapi001Service } from 'src/app/shared/services/fcaprogapi001.service';
import swal from 'sweetalert2';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-cargoareacap',
  templateUrl: './lista-cargoareacap.component.html',
  styleUrls: ['./lista-cargoareacap.component.css']
})
export class ListaCargoareacapComponent implements OnInit {
  Lista = [];
  @Input() Value: string;
  @Input() required = false;
  @Input() label = '';
  @Input() disabled = false;
  @Input() set filtro(value) {
    if (value !== null){
      this.EsAreaCaptura = value;
      this.Buscar();
    }
  }
  @Output() ValueChange = new EventEmitter<any>();
  EsAreaCaptura: boolean;

  constructor(private Servicios: fcaprogapi001Service) { }

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.GetListaArea(this.EsAreaCaptura).subscribe(
      (data: any) => {
        this.Lista = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Area-Cargo,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  public refreshData(): void {
    this.Buscar();
  }
  changeSelect(e): void {
    let obj = {}
    for (const iterator of this.Lista) {
      if(iterator.clave === e){
        obj = iterator;
      }

    }

    this.ValueChange.emit({value:e , data:obj})
  }
}
