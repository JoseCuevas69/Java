import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { result } from 'lodash-es';
import { fcaprogapi001Service } from 'src/app/shared/services/fcaprogapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-clavepreparacion',
  templateUrl: './lista-clavepreparacion.component.html',
  styleUrls: ['./lista-clavepreparacion.component.css'],
})
export class ListaClavepreparacionComponent implements OnInit {
  Lista = [];
  @Input() VisibleLabel = true;
  @Input() required = false;
  @Input() label = 'Clave Preparación';
  @Input() disabled = false;
  Dato: string;
  @Input() get Value(): string {
    return this.Dato;
  }
  set Value(value: string) {
    console.log(value, 'imprime esto para ver ñññññ');
    if (value !== ''){
      this.Dato = value;
      this.checked();
    }
  }

  @Output()
  ValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  Change: EventEmitter<any> = new EventEmitter<any>();
  constructor(private Servicios: fcaprogapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }

  Buscar(): void {
    this.Servicios.ListarClavePreparacion().subscribe(
      (data: any) => {
        this.Lista = data.data;
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion (ListarClavePreparacion),' +
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
    const arrValue = this.Datos(e);
    this.Change.emit(arrValue);
  }
  Datos(e): any {
    let arrValue: any = {};
    for (const iterator of this.Lista) {
      if (e === iterator.claveproceso) {
        arrValue = iterator;
      }
    }
    return arrValue;
  }
  checked(): void {
    let val = false;
    for (const iterator of this.Lista) {
      if (this.Dato === iterator.claveproceso) {
        val = true;
        break;
      } else {
        val = false;
      }
    }
    const arrValue = this.Datos(this.Dato);
    let result = { clave: 'S/N', Data: { eficiencia: 1 } };
    if (val) {
      result = { clave: this.Dato, Data: arrValue };
      this.ValueChange.emit(result);
    } else {
      this.Dato = 'S/N';
      this.ValueChange.emit(result);
    }
  }
}
