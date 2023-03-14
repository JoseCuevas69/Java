import { Component, OnInit,  ViewChild, Input,Output,EventEmitter} from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DesperdiciosService } from 'src/app/services/Programacion/desperdicios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'mldagregarareadesperdicio',
  templateUrl: './mldagregarareadesperdicio.component.html',
  styleUrls: ['./mldagregarareadesperdicio.component.css']
})
export class MldagregarareadesperdicioComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('mdl') private mdl: any;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.eventLimpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
    }
    if (this.TipoAccion === 'M'){
      this.disClv = true;
    } else {
      this.disClv = false;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();

  DatFormulario = {
    clave: '',
    nombre: '',
  };

  CamposObligatorios = {
    clave: false,
    nombre: false,
  };

  disClv = false;

  constructor(public Servicio: DesperdiciosService) {
  }

  ngOnInit(): void {
  }
  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    const validar = this.eventValidarDatos();
    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.funAgregar();
      } else {
        this.funEditar();
      }
    } else {
      this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }
  }
  btnCerrar(): void {
    this.eventLimpiar();
    this.ClickbtnCerrar.emit();
  }
  changeClave(e): void {
    this.DatFormulario.clave = e;
    this.CamposObligatorios.clave = false;

  }
  changeNombre(e): void {
    this.DatFormulario.nombre = e;
    this.CamposObligatorios.nombre = false;

  }
  eventLimpiar(){
    this.DatFormulario = {
      clave: '',
      nombre: '',
    };

    this.CamposObligatorios = {
      clave: false,
      nombre: false,
    };
  }
  eventValidarDatos(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar todos loa datos obligatorios',
      case: 0,
      remplazar: null,
    };

    if (this.DatFormulario.clave === '') {
      Validar.val = false;
      this.CamposObligatorios.clave = true;
    }
    if (this.DatFormulario.nombre === '') {
      Validar.val = false;
      this.CamposObligatorios.nombre = true;
    }
    return Validar;
  }
  keyupClaveMayus(e): void {
    const input = e.target;
    this.DatFormulario.clave = input.value.toUpperCase();
  }
  keyupNombreMayus(e): void {
    const input = e.target;
    this.DatFormulario.nombre = input.value.toUpperCase();
  }
  funAgregar(): void {
    this.Servicio.AgregarAreaDesperdicios(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          this.blockUI.stop();
          this.eventLimpiar();
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
          'Ha Ocurrio un Error al Momento de Agregar (AgregarAreaDesperdicios),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  funEditar(): void {
    this.Servicio.EditarAreaDesperdicios(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          this.blockUI.stop();
          this.eventLimpiar();
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
          'Ha Ocurrio un Error al Momento de Editar (EditarAreaDesperdicios),' +
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
