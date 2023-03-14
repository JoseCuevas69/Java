import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { TipoCaja } from 'src/app/models/Programacion/TipoCaja';
import { TipoCajaService } from 'src/app/services/Programacion/tipocaja.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdl-tipocaja',
  templateUrl: './mdl-tipocaja.component.html',
  styleUrls: ['./mdl-tipocaja.component.css']
})
export class MdlTipocajaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
    }
    if (this.TipoAccion === 'M'){
      this.disClvDiseno = true;
    } else {
      this.disClvDiseno = false;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  
  DatFormulario: TipoCaja = {
    idTipoCaja: 0,
    claveDiseno: '',
    descripcion: '',
    estatus: false,
    regExporta: '',
    permiteCotDirecta: false,
    conSuaje: false,
    fraccionArancelaria: '',
  };
  CamposObligatorios = {
    ClaveDiseno: false,
    Descripcion: false,
  };
  disClvDiseno = false;
  // event = {};
  constructor(public Servicio: TipoCajaService) { }

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
    if (this.DatFormulario.claveDiseno === '') {
      Validar.val = false;
      this.CamposObligatorios.ClaveDiseno = true;
    }
    if (this.DatFormulario.descripcion === '') {
      Validar.val = false;
      this.CamposObligatorios.Descripcion = true;
    }
    return Validar;
  }
  
  Limpiar(): void {
    this.DatFormulario = {
      idTipoCaja: 0,
      claveDiseno: '',
      descripcion: '',
      estatus: false,
      regExporta: '',
      permiteCotDirecta: false,
      conSuaje: false,
      fraccionArancelaria: '',
    };
    this.CamposObligatorios = {
      ClaveDiseno: false,
      Descripcion: false,
    };
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
