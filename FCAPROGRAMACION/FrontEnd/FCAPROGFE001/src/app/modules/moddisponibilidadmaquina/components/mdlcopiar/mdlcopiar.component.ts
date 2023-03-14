import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DisponibilidadMaquinaService } from 'src/app/services/Programacion/disponibilidadmaquina.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdl-copiar',
  templateUrl: './mdlcopiar.component.html',
  styleUrls: ['./mdlcopiar.component.css'],
})
export class MdlcopiarComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Output() ClickbtnCerrar = new EventEmitter<any>();

  DatFormulario = {
    claveMaquinaOrigen: '',
    anioOrigen: new Date().getFullYear(),
    mesOrigen: null,
    claveMaquinaDestino: '',
  };
  CamposObligatorios = {
    claveMaquinaDestino: false,
    claveMaquinaOrigen: false,
  };
  Anios = [];

  constructor(public Servicio: DisponibilidadMaquinaService) {}

  ngOnInit(): void {
    this.Comboanio();
  }

  async btnGuardar(): Promise<void> {
    this.blockUI.start('Cargando...');
    const validar = await this.Validaciones();
    if (validar.val) {

      const val = await this.GetValidarDisMaquina(this.DatFormulario);
      console.log(val, 'datos del val');
      if (val.disMaquinaDestino !== 0) {
        this.blockUI.stop();
        swal.fire(
          '',
          'El mes de ' +
            this.DatFormulario.mesOrigen +
            ' y año ' +
            this.DatFormulario.anioOrigen +
            ' para la máquina ' +
            this.DatFormulario.claveMaquinaDestino +
            ' ya existe',
          'error'
        );
        return;
      }
      if (val.disMaquinaOrigen !== 0) {
        this.Copiar();
      } else {
        this.blockUI.stop();
        swal.fire(
          '',
          'No se pueden copiar datos debido a que la máquina ' +
            this.DatFormulario.claveMaquinaOrigen
          + ' con el mes de ' +
            this.DatFormulario.mesOrigen +
            ' y año ' +
            this.DatFormulario.anioOrigen +
            ', No tienen datos !!!',
          'error'
        );
      }
    } else {
      this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  ChangeMaquinaOrigen(e): void {
    this.DatFormulario.claveMaquinaOrigen = e;
    this.CamposObligatorios.claveMaquinaOrigen = false;
  }
  ChangeMaquinaDestino(e): void {
    this.DatFormulario.claveMaquinaDestino = e;
    this.CamposObligatorios.claveMaquinaDestino = false;
  }
  Copiar(): void {
    this.Servicio.Copiar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('', 'Los Datos fueron agregados correctamente', 'success');
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
          'Ha Ocurrio un Error al Momento de Agregar,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  async GetValidarDisMaquina(DatFormulario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetValidarDisMaquina(DatFormulario).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          this.blockUI.stop();
          swal.fire(
            'Datos ',
            'Ha Ocurrio un Error,' +
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
  Validaciones(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };
    if (this.DatFormulario.claveMaquinaOrigen === '') {
      Validar.val = false;
      this.CamposObligatorios.claveMaquinaOrigen = true;
    }
    if (this.DatFormulario.claveMaquinaDestino === '') {
      Validar.val = false;
      this.CamposObligatorios.claveMaquinaDestino = true;
    }
    if (this.DatFormulario.mesOrigen === null) {
      Validar.val = false;
      Validar.mensaje = 'Por favor seleccione un mes';
    }
    if (
      this.DatFormulario.claveMaquinaOrigen ===
      this.DatFormulario.claveMaquinaDestino
    ) {
      Validar.val = false;
      Validar.mensaje =
        '¡ No se pueden copiar datos sobre la misma máquina, Por favor seleccione otra maquina destino !';
    }
    return Validar;
  }

  Limpiar(): void {
    this.DatFormulario = {
      claveMaquinaOrigen: '',
      anioOrigen: new Date().getFullYear(),
      mesOrigen: null,
      claveMaquinaDestino: '',
    };
    this.CamposObligatorios = {
      claveMaquinaDestino: false,
      claveMaquinaOrigen: false,
    };
  }
  Comboanio(): void {
    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    const anioini = Year - 20;
    const aniofin = Year + 5;
    for (let index = anioini; index < aniofin; index++) {
      this.Anios.push(index);
    }
  }
  ValideKey(evt): boolean {
    const code = evt.which ? evt.which : evt.keyCode;
    if (code === 8) {
      return true;
    } else if (code >= 48 && code <= 57) {
      return true;
    } else {
      return false;
    }
  }
}
