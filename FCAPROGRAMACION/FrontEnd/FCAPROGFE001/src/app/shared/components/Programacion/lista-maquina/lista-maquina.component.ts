import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fcaprogapi001Service } from 'src/app/shared/services/fcaprogapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-maquina',
  templateUrl: './lista-maquina.component.html',
  styleUrls: ['./lista-maquina.component.css']
})
export class ListaMaquinaComponent implements OnInit {
  Lista = [];
  @Input() VisibleLabel = true;
  @Input() required = false;
  @Input() label = '';
  @Input() disabled = false;
  Dato: string;
  @Input() get Value(): string{
    return this.Dato;
  }
  set Value(value: string) {
    this.Dato = value;
    this.ValueChange.emit(this.Dato);
  }

  @Output()
  ValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  Change: EventEmitter<any> = new EventEmitter<any>();
  constructor(private Servicios: fcaprogapi001Service) { }

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListarMaquina().subscribe(
      (data: any) => {
        this.Lista = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Maquina,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  change(e): void {
    let arrValue: any = {};
    for (const iterator of this.Lista) {
       if (e === iterator.claveMaquina){
        arrValue = iterator;
       }
      }
    this.Change.emit(arrValue);
  }
}
