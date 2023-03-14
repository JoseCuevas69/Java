import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Proceso } from 'src/app/models/Programacion/Proceso';
import { ProcesoService } from 'src/app/services/Programacion/proceso.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mld-proceso',
  templateUrl: './mld-proceso.component.html',
  styleUrls: ['./mld-proceso.component.css'],
})
export class MldProcesoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;

      this.DatoSelCol = this.DatFormulario.tintas;

      if (this.DatFormulario.subProceso === 'DC') {
        this.DatCorrugado = 'Doble';
      } else {
        this.DatCorrugado = 'Sencillo';
      }

      this.CambioCapProcesoCosPorTipoMaq(this.DatFormulario.tipoMaquina);
      this.AcomododeSubProcesos(this.DatFormulario.subProceso);
    }
    this.ValidarTipoAccionModulo();
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  DatFormulario: Proceso = {
    tipoMaquina: '',
    claveProceso: '',
    descripcion: '',
    estatus: false,
    tratamiento: false,
    subProceso: '',
    tintas: '',
    conSuaje: false,
  };
  CamposObligatorios = {
    tipoMaquina: false,
    claveProceso: false,
    descripcion: false,
  };
  DatoSelCol = '1';

  disTipoMaquina = false;
  disClaveProceso = false;

  ListaCorrugado = ['Sencillo', 'Doble'];
  ListaColores = ['1', '2', '3', '4'];

  labelColores = 'Colores:';
  labelTintas = 'Tintas:';

  MosProceso1 = true;
  MosProceso2 = true;
  MosProceso3 = true;
  MosProceso4 = true;
  MosProcesoCost = true;
  MosCorrugado = true;
  MosColores = true;
  MosTintas = true;
  MosConSuaje = false;

  subProceso1 = '';
  subProceso2 = '';
  subProceso3 = '';
  subProceso4 = '';

  DatCorrugado = '';


  constructor(public Servicio: ProcesoService) {
  }

  ngOnInit(): void {}

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
    this.CambioCapProcesoCosPorTipoMaq(e);
    this.CamposObligatorios.tipoMaquina = false;

  }
  Agregar(): void {
    this.Servicio.Agregar(this.DatFormulario).subscribe(
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
  Editar(): void {
    this.Servicio.Editar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('', 'Los Datos fueron editados correctamente', 'success');
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
  Limpiar(): void {
    this.DatFormulario = {
      tipoMaquina: '',
      claveProceso: '',
      descripcion: '',
      estatus: false,
      tratamiento: false,
      subProceso: '',
      tintas: '',
      conSuaje: false,
    };
    this.CamposObligatorios = {
      tipoMaquina: false,
      claveProceso: false,
      descripcion: false,
    };

    this.labelColores = 'Colores:';
    this.labelTintas = 'Tintas:';

    this.MosProceso1 = true;
    this.MosProceso2 = true;
    this.MosProceso3 = true;
    this.MosProceso4 = true;
    this.MosProcesoCost = true;
    this.MosCorrugado = true;
    this.MosColores = true;
    this.MosTintas = true;
    this.MosConSuaje = false;

    this.subProceso1 = '';
    this.subProceso2 = '';
    this.subProceso3 = '';
    this.subProceso4 = '';

    this.DatCorrugado = '';
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
    if (this.DatFormulario.tipoMaquina === '') {
      Validar.val = false;
      this.CamposObligatorios.tipoMaquina = true;
    }
    if (this.DatFormulario.claveProceso === '') {
      Validar.val = false;
      this.CamposObligatorios.claveProceso = true;
    }
    if (this.DatFormulario.descripcion === '') {
      Validar.val = false;
      this.CamposObligatorios.descripcion = true;
    }
    return Validar;
  }
  ValidarTipoAccionModulo(): void {
    if (this.TipoAccion === 'M') {
      this.disTipoMaquina = true;
      this.disClaveProceso = true;
    } else {
      this.disTipoMaquina = false;
      this.disClaveProceso = false;
    }
  }
  CambioCapProcesoCosPorTipoMaq(TipoMaquina): void {
    switch (TipoMaquina) {
      case 'AC':
        this.MosProceso1 = true;
        this.MosProceso2 = true;
        this.MosProceso3 = true;
        this.MosProceso4 = true;
        this.MosProcesoCost = true;
        this.MosCorrugado = false;
        this.MosColores = false;
        this.MosTintas = false;
        this.MosConSuaje = false;
        break;
      case 'CO':
        this.MosProceso1 = true;
        this.MosProceso2 = false;
        this.MosProceso3 = false;
        this.MosProceso4 = false;
        this.MosProcesoCost = true;
        this.MosCorrugado = true;
        this.labelColores = 'Empalmes:';
        this.MosColores = true;
        this.labelTintas = 'Empalmes:';
        this.MosTintas = true;
        this.MosConSuaje = false;
        break;
      case 'ES':
        this.MosProceso1 = true;
        this.MosProceso2 = false;
        this.MosProceso3 = false;
        this.MosProceso4 = false;
        this.MosProcesoCost = true;
        this.MosCorrugado = false;
        this.MosColores = false;
        this.MosTintas = false;
        this.MosConSuaje = false;
        break;
      case 'IM':
        this.MosProceso1 = true;
        this.MosProceso2 = true;
        this.MosProceso3 = true;
        this.MosProceso4 = true;
        this.MosProcesoCost = true;
        this.MosCorrugado = false;
        this.MosColores = true;
        this.MosTintas = true;
        this.MosConSuaje = true;
        break;
      default:
        this.MosProceso1 = true;
        this.MosProceso2 = true;
        this.MosProceso3 = true;
        this.MosProceso4 = true;
        this.MosProcesoCost = true;
        this.MosCorrugado = true;
        this.MosColores = true;
        this.MosTintas = true;
        this.MosConSuaje = false;
        break;
    }
  }
  AcomododeSubProcesos(SubProceso): void {
    if (this.DatFormulario.tipoMaquina === 'CO') {
      this.subProceso1 = 'C';
    } else if (this.DatFormulario.tipoMaquina === 'ES') {
      this.subProceso1 = 'COR';
    }
    else {
      for (let index = 0; index < 4; index++) {
        var sub = SubProceso.substring(index, index + 1);
        switch (index + 1) {
          case 1:
            this.subProceso1 = sub;
            break;
          case 2:
            this.subProceso2 = sub;
            break;
          case 3:
            this.subProceso3 = sub;
            break;
          case 4:
            this.subProceso4 = sub;
            break;
          default:
            break;
        }
      }
    }
  }
  keyupSoloMayus(e){
    const input = e.target;
    this.DatFormulario.claveProceso = input.value.toUpperCase();
  }
}
