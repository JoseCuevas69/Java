import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Variaciones } from 'src/app/models/Programacion/Variaciones';
import { ParametrosProgramacionService } from 'src/app/services/Programacion/parametrosprog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mld-modvariaciones',
  templateUrl: './mld-modvariaciones.component.html',
  styleUrls: ['./mld-modvariaciones.component.css']
})
export class MldModvariacionesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  DatFormulario: Variaciones = {
    codigo: 0,
    descripcion: '',
    cantidad: 0,
  };
  CamposObligatorios = {
    descripcion: false,
    Cantidad: false ,
  };
  chkMod = false;
  MosModificar = false;
  eventTipoNumero = {};
  codVariacion = 0;

  constructor(public Servicio: ParametrosProgramacionService) {
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
  ChangeVariacion(e): void {
      this.DatFormulario.codigo = e.codigo;
      this.DatFormulario.descripcion = e.descripcion;
      this.DatFormulario.cantidad = e.cantidad;
  }
  Changechkmod(e): void{
    this.chkMod = e;
    if (e){
      this.MosModificar = true;
      this.TipoAccion = 'M';
    } else {
      this.MosModificar = false;
      this.TipoAccion = 'A';
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
    if (this.DatFormulario.descripcion === '') {
      Validar.val = false;
      this.CamposObligatorios.descripcion = true;
    }
    if (this.DatFormulario.cantidad === null) {
      Validar.val = false;
      this.CamposObligatorios.Cantidad = true;
    }
    return Validar;
  }
  Limpiar(): void {
    this.DatFormulario = {
      codigo: 0,
      descripcion: '',
      cantidad: 0,
    };
    this.CamposObligatorios = {
      descripcion: false,
      Cantidad: false ,
    };
    this.chkMod = false;
    this.MosModificar = false;
    this.codVariacion = 0;
  }
  keypressTipoNumero(evt): boolean {
    const code = evt.which ? evt.which : evt.keyCode;
    if (code === 8) {
      return true;
    } else if (code >= 46 && code <= 57) {
      return true;
    } else {
      return false;
    }
  }

}
