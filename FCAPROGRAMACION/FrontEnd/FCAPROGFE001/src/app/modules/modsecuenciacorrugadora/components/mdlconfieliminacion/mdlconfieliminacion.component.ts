import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  selector: 'mdlconfieliminacion',
  templateUrl: './mdlconfieliminacion.component.html',
  styleUrls: ['./mdlconfieliminacion.component.css'],
})
export class MdlconfieliminacionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  Programa = 0;
  texto = '¿Desea Eliminar el Registro Seleccionado?';
  Zona = '';
  BorrarProgImp = false;

  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.Programa = value.programa;
      console.log(value, value.programa);
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();

  constructor(public Servicio: SecuenciaCorrugadoraService) {
    this.Zona = localStorage.getItem('Zona');
  }

  ngOnInit(): void {
    if (this.Zona === '02') {
      this.texto =
        'Al Eliminar el programa se eliminara su folio de combinación correspondiente. ¿Desea continar? ';
    }
  }
  async BuscarCombinacion(Programa: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetCombinacion(Programa).subscribe(
        (Datos: any) => {
          console.log('mdladdprograma', 'GetCombinacion', Datos);
          resolve(Datos);
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarCombinacion)' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
      );
    });
  }
  changeBorrarProgImp(e): void {
    this.BorrarProgImp = e.checked;
  }
  async btnGuardar(): Promise<any> {
    this.EliminarPrograma(this.Programa, this.BorrarProgImp);
    if (this.Zona === '02') {
      const resCombinacion = await this.BuscarCombinacion(this.Programa);
      if (typeof resCombinacion !== 'undefined') {
        this.EliminarFolioCombinacion(resCombinacion);
      }
    }
    this.btnCerrar();
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  Limpiar(): void {}
  EliminarPrograma(programa, ChkEliminaImpresoras): void {
    this.Servicio.EliminarPrograma(programa, ChkEliminaImpresoras).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('', 'El Programa Fue Eliminado', 'success');
        } else {
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. ' + data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error (EliminarPrograma),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  async EliminarFolioCombinacion(Programa): Promise<any> {
    this.Servicio.EliminarFolioCombinacion(Programa).subscribe(
      (data: any) => {
        if (data.correcto) {
        } else {
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. (EliminarFolioCombinacion)' +
              data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error (EliminarFolioCombinacion),' +
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
