import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdlposicion-esp',
  templateUrl: './mdlposicion-esp.component.html',
  styleUrls: ['./mdlposicion-esp.component.css'],
})
export class MdlposicionEspComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'Sub';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatosReg = value;
      this.Orden = value.orden;
      this.Programa = value.programa;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  DatosReg: any;
  Posicion: number;
  Orden: number;
  Programa: number;
  constructor(public Servicio: SecuenciaCorrugadoraService) {}

  ngOnInit(): void {}
  Limpiar(): void {
    this.Programa = null;
    this.Orden = null;
    this.Posicion = null;
  }
  Validar(): any {
    let Val = { val: true, tex: '' };
    if (this.Posicion <= 0) {
      Val.val = false;
      Val.tex = 'La Posición no puede ser menor o igual a 0';
    }
    switch (this.TipoAccion) {
      case 'Sub':
        if (this.DatosReg.orden < this.Posicion) {
          Val.val = false;
          Val.tex = 'La posición debe ser menor a la actual';
        }

        break;
      case 'Baj':
        if (this.DatosReg.orden > this.Posicion) {
          Val.val = false;
          Val.tex = 'La posición debe ser mayor a la actual';
        }
        break;
      default:
        break;
    }

    return Val;
  }
  btnGuardar(): void {
    const Val = this.Validar();
    if (Val.val) {
      switch (this.TipoAccion) {
        case 'Sub':
          this.SubirOrden(this.Programa, this.Posicion, this.Orden);
          break;
        case 'Baj':
          this.BajarOrden(this.Programa, this.Posicion, this.Orden);
          break;

        default:
          break;
      }
    } else {
      swal.fire('', Val.tex, 'error');
    }
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  SubirOrden(Programa: any, OrdenEsp: any, OrdenAct: any): void {
    this.Servicio.SubirOrden(Programa, OrdenEsp, OrdenAct).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('El cambio se realizó satisfactoriamente', '', 'success');
          this.blockUI.stop();
          this.Limpiar();
          this.btnCerrar();
        } else {
          this.blockUI.stop();
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. ' + data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        this.blockUI.stop();
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error (SubirOrden),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  BajarOrden(Programa: any, OrdenEsp: any, OrdenAct: any): void {
    this.Servicio.BajarOrden(Programa, OrdenEsp, OrdenAct).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('El cambio se realizó satisfactoriamente', '', 'success');
          this.blockUI.stop();
          this.Limpiar();
          this.btnCerrar();
        } else {
          this.blockUI.stop();
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. ' + data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        this.blockUI.stop();
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error (BajarOrden),' +
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
