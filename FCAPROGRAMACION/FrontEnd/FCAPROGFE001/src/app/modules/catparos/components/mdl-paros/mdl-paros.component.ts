import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Paros } from 'src/app/models/Produccion/Paros';
import { ParosService } from 'src/app/services/Programacion/paros.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdl-paros',
  templateUrl: './mdl-paros.component.html',
  styleUrls: ['./mdl-paros.component.css']
})
export class MdlParosComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
    }
    if (this.TipoAccion === 'M'){
      this.disClvParo = true;
      this.disTipoMaq = true;
    } else {
      this.disClvParo = false;
      this.disTipoMaq = false;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  DatFormulario: Paros = {
    claveParo: '',
    tipoParo: '',
    tipoParoValida: '',
    tipoMaquina: '',
    aplicaPareto: false,
    descuentoIndicador: false,
    observaciones: '',
    autoriza: false,
    esProgramado: false,
    estatus: false,
  };
  CamposObligatorios = {
    claveParo: false,
    Descripcion: false,
    tipoMaquina: false,
    tipoParoValida: false
  };
  disClvParo = false;
  disTipoMaq = false;


  constructor(public Servicio: ParosService) {
   }

  ngOnInit(): void {
  }

  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    const validar = this.Validaciones();
    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.Agregar();
      } else {
        this.Editar();
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
  ChangeTipoMaquina(e): void {
    this.DatFormulario.tipoMaquina = e;
    this.CamposObligatorios.tipoMaquina = false;
  }
  ChangeTipoValida(e): void {
    this.DatFormulario.tipoParoValida = e;
    this.CamposObligatorios.tipoParoValida = false;
  }
  Agregar(): void {
    this.Servicio.Agregar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
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
  Editar(): void {
    this.Servicio.Editar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
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
          'Ha Ocurrio un Error al Momento de Editar,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
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
    if (this.DatFormulario.claveParo === '') {
      Validar.val = false;
      this.CamposObligatorios.claveParo = true;
    }
    if (this.DatFormulario.tipoParo === '') {
      Validar.val = false;
      this.CamposObligatorios.Descripcion = true;
    }
    if (this.DatFormulario.tipoMaquina === ''){
      Validar.val = false;
      this.CamposObligatorios.tipoMaquina = true;
    }
    if (this.DatFormulario.tipoParoValida === ''){
      Validar.val = false;
      this.CamposObligatorios.tipoParoValida = true;
    }
    return Validar;
  }
  Limpiar(): void {
    this.DatFormulario = {
      claveParo: '',
      tipoParo: '',
      tipoParoValida: '',
      tipoMaquina: '',
      aplicaPareto: false,
      descuentoIndicador: false,
      observaciones: '',
      autoriza: false,
      esProgramado: false,
      estatus: false,
    };
    this.CamposObligatorios = {
      claveParo: false,
      Descripcion: false,
      tipoMaquina: false,
      tipoParoValida: false
    };
  }
  keyupDescripcionMayus(e): void {
    const input = e.target;
    this.DatFormulario.tipoParo = input.value.toUpperCase();
  }
  keyupClaveMayus(e){
    const input = e.target;
    this.DatFormulario.claveParo = input.value.toUpperCase();
  }

}
