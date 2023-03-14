import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

import { Cplcap003Service } from 'src/app/services/cplcap003.service';
import { DatosComboCPLCAP003, ParametrosCPLCAP003 } from '../../../../models/common/cplcap003'

interface TipoBotonGuardar {
  guardar: string;
  modificar: string;
}

@Component({
  selector: 'app-cplcap003',
  templateUrl: './cplcap003.component.html',
  styleUrls: ['./cplcap003.component.css']
})
export class Cplcap003Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  avanceBarra: number = 0;
  tituloCabecera: string = 'Parámetros de Valuación y Cálculo de Arreglos Posibles';
  tituloPie: string = 'CPLCAP003 - PARAMETROS DE VALUACION Y CALCULO DE ARREGLOS POSIBLES';
  version: string = '';
  tipoBotonGuardar: TipoBotonGuardar = {
    guardar: '&nbsp;Guardar', modificar: '&nbsp;Actualizar'
  }

  // Variables principales
  objParametros = new ParametrosCPLCAP003();
  txtResistenciaAfines: string = 'NO';
  chkResistenciaAfines: boolean = false;
  txtRefileMaximo: number = 0;
  txtRefileMinimo: number = 0;
  txtDiasAdelantadoFE: number = 0;
  txtTodosAnchos: string = 'NO';
  chkTodosAnchos: boolean = false;
  txtAnchosCalculo: number = 0;
  txtLargoMinProgr: number = 0;
  txtAumentoPedido: number = 0;
  txtScoresMaximos: number = 0;

  // lblBtnAplicar: string = 'APLICAR';
  // disabledBtnAplicar: boolean = false;
  visibleSpinnerAplicar: boolean = false;
  visibleComboModal: boolean = false;

  chkModificar: boolean = false;
  btnGuardar: string = this.tipoBotonGuardar.guardar;
  btnAplicar: string = 'APLICAR';

  dtsDatosCombo: DatosComboCPLCAP003 [] = [];
  valueSelected: number;
  descripcionSelected: string;
  cantidadSelected: number;
  objDatosCaptura = new DatosComboCPLCAP003();

  @ViewChild('mdlModificacionVariaciones') private mdlModificacionVariaciones: any;
  mdlModificacionVariacionesRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    public Servicio: Cplcap003Service
  ) { }

  async ngOnInit(): Promise<void> {
    this.cargarDatos();
    this.cargarComboModificar();
    // console.log(this.valueSelected);
    // console.log(this.cantidadSelected);
  }

  async refrescarPantalla(): Promise<void> {
    // this.blockUI.start('');
    await this.ngOnInit();
    // this.blockUI.stop();
    this.delay();
    this.mostrarMensajeFlotante('Actualizado!', 0);
  }

  async getDatos(): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerDatos();
    return value.data;
  }
  async cargarDatos(): Promise<void> {
    var obj: ParametrosCPLCAP003[] = await this.getDatos();
    for (const iterator of obj) {
      this.chkResistenciaAfines = iterator.resistenciaAfines;
      this.txtResistenciaAfines = (iterator.resistenciaAfines ? 'SI' : 'NO');
      this.txtRefileMaximo = iterator.refileMaximo;
      this.txtRefileMinimo = iterator.refileMinimo;
      this.txtDiasAdelantadoFE = iterator.diasAdelantadoFE;
      this.chkTodosAnchos = iterator.todosAnchos;
      this.txtTodosAnchos = (iterator.todosAnchos ? 'SI' : 'NO');
      this.txtAnchosCalculo = iterator.anchosCalculo;
      this.txtLargoMinProgr = iterator.largoMinProgr;
      this.txtAumentoPedido = iterator.aumentoPedido;
      this.txtScoresMaximos = iterator.scoresMaximos;
    }
  }

  async getComboModificar(): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerComboModificar();
    return value.data;
  }
  async cargarComboModificar(): Promise<void> {
    this.dtsDatosCombo = await this.getComboModificar();
  }
  changeCombo(): void {
    for (const iterator of this.dtsDatosCombo) {
      if (iterator.codigo === Number(this.valueSelected)) {
        this.cantidadSelected = iterator.cantidad;
        this.descripcionSelected = iterator.descripcion;
        break;
      }
    }

  }

  // Click checkbox Resistencia Afines
  clickChkResistenciaAfines(): void {
    this.chkResistenciaAfines = !this.chkResistenciaAfines;
    this.txtResistenciaAfines = (this.chkResistenciaAfines ? 'SI' : 'NO');
  }

  // Click checkbox Todos Anchos
  clickChkTodosAnchos(): void {
    this.chkTodosAnchos = !this.chkTodosAnchos;
    this.txtTodosAnchos = (this.chkTodosAnchos ? 'SI' : 'NO');
  }

  openModalModificacionVariaciones(): void {
    this.mdlModificacionVariacionesRef = this.modalService.open(this.mdlModificacionVariaciones, {size: 'lg', backdrop: 'static'});
  }

  clickChkModificar(): void {
    this.chkModificar = !this.chkModificar;
    this.visibleComboModal = this.chkModificar;
    this.btnGuardar = (this.chkModificar ? this.tipoBotonGuardar.modificar : this.tipoBotonGuardar.guardar);

    this.valueSelected = undefined;
    this.cantidadSelected = undefined;
    this.descripcionSelected = undefined;

    console.log(this.valueSelected);
  }

  async clickBtnAplicar(): Promise<void> {
    if (this.validaDatos()) {
      this.objParametros.resistenciaAfines = this.chkResistenciaAfines;
      this.objParametros.refileMaximo = this.txtRefileMaximo;
      this.objParametros.refileMinimo = this.txtRefileMinimo;
      this.objParametros.diasAdelantadoFE = this.txtDiasAdelantadoFE;
      this.objParametros.todosAnchos = this.chkTodosAnchos;
      this.objParametros.anchosCalculo = this.txtAnchosCalculo;
      this.objParametros.largoMinProgr = this.txtLargoMinProgr;
      this.objParametros.aumentoPedido = this.txtAumentoPedido;
      this.objParametros.scoresMaximos = this.txtScoresMaximos;
      await this.actualizaTabla(this.objParametros);
    }
  }

  async delay(ms: number = 450) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

  validaDatos(): boolean {
    var valido = true;
    var msj = '';

    if (this.txtRefileMaximo < 25 || this.txtRefileMaximo > 350) {
      valido = false;
      msj += (msj !== '' ? '<br>' : '') + 'El Refile Máximo debe ser >= 25 y <= 350.';
    }
    if (this.txtRefileMinimo < 0 || this.txtRefileMinimo > 40) {
      valido = false;
      msj += (msj !== '' ? '<br>' : '') + 'El Refile Minimo debe ser >= 0 y <= 40.';
    }
    if (this.txtDiasAdelantadoFE < 0) {
      valido = false;
      msj += (msj !== '' ? '<br>' : '') + 'Los días Adelanto deben ser >= 0.';
    }
    if (this.txtLargoMinProgr < 25) {
      valido = false;
      msj += (msj !== '' ? '<br>' : '') + 'El Largo Minimo debe ser >= 25.';
    }
    if (this.txtScoresMaximos < 0 || this.txtScoresMaximos > 30) {
      valido = false;
      msj += (msj !== '' ? '<br>' : '') + 'El Score debe ser >= 0 y <= 30.';
    }

    if (!valido) {
      Swal.fire('Información', msj, 'info');
    }

    return valido;
  }

  async actualizaTabla(obj: ParametrosCPLCAP003): Promise<void> {
    this.blockUI.start('Cargando...');
    this.Servicio.actualizarTabla(obj).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.id !== 0) {
        Swal.fire('Completado', res.data.message, 'success');
      }
      else {
        Swal.fire('Error', 'Error controlado al guardar: ' + res.data.message, 'error');
      }
    }, (err: any) => {
      this.blockUI.stop();
      Swal.fire('Error', 'Error al guardar: ' + err.error, 'error');
    });
  }

  validaCamposLlenosAct(): boolean {
    var valido = true;

    if (this.chkModificar) {
      if (this.valueSelected === undefined || this.valueSelected === null || Number(this.valueSelected) <= 0) {
        valido = false;
      }
    }
    if (this.descripcionSelected === undefined || this.descripcionSelected === null || this.descripcionSelected.trim() === "") {
      valido = false;
    }
    if (this.cantidadSelected === undefined || this.cantidadSelected === null || Number(this.cantidadSelected) <= 0) {
      valido = false;
    }

    return valido;
  }

  validaCamposLlenosDel(): boolean {
    var valido = true;
    if (this.chkModificar) {
      if (this.valueSelected === undefined || this.valueSelected === null || Number(this.valueSelected) <= 0) {
        valido = false;
      }
    }
    else{
      valido = false;
    }
    return valido;
  }

  clickBtnGuardar(): void {
    this.setDatosEnvio();
    this.blockUI.start('Guardando...');
    if (this.btnGuardar === this.tipoBotonGuardar.guardar) {
      if (this.validaCamposLlenosAct()) {
        this.Servicio.registrar(this.objDatosCaptura).subscribe(async (res: any) => {
          if (res.data.id !== 0) {
            await this.cargarComboModificar();
            this.limpiarCaptura();
            this.blockUI.stop();
            this.delay();
            Swal.fire('Completado', res.data.message, 'success');
          }
          else {
            this.blockUI.stop();
            this.delay();
            Swal.fire('Error', 'Error al guardar: ' + res.data.message, 'error');
          }
        }, (err: any) => {
          this.blockUI.stop();
          this.delay();
          Swal.fire('Error', 'Error al guardar: ' + err.error, 'error');
        });
      }
      else {
        this.blockUI.stop();
        this.delay();
        Swal.fire('Información', 'Favor de completar los datos de la variación para poder registrar', 'info');
      }
    }
    else if (this.btnGuardar === this.tipoBotonGuardar.modificar) {
      if (this.validaCamposLlenosAct()) {
        this.Servicio.modificar(this.objDatosCaptura).subscribe(async (res: any) => {
          if (res.data.id !== 0) {
            await this.cargarComboModificar();
            this.limpiarCaptura();
            this.blockUI.stop();
            this.delay();
            Swal.fire('Completado', res.data.message, 'success');
          }
          else {
            this.blockUI.stop();
            this.delay();
            Swal.fire('Error', 'Error al actualizar: ' + res.data.message, 'error');
          }
        }, (err: any) => {
          this.blockUI.stop();
          this.delay();
          Swal.fire('Error', 'Error al actualizar: ' + err.error, 'error');
        });
      }
      else {
        this.blockUI.stop();
        this.delay();
        Swal.fire('Información', 'Favor de completar los datos o seleccionar de la variación para poder actualizar', 'info');
      }
    }
  }

  clickBtnEliminar(): void {
    Swal.fire({
      title: '¿Esta seguro de querer eliminar le registro con codigo # ' + this.valueSelected + '?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#28A745",
      cancelButtonColor: "#DC3545",
      cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
      confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
    }).then((result) => {
      if (result.value) {
        this.setDatosEnvio();
        this.Servicio.eliminar(this.objDatosCaptura).subscribe(async (res: any) => {
          if (res.data.id !== 0) {
            await this.cargarComboModificar();
            this.limpiarCaptura();
            Swal.fire('Completado', res.data.message, 'success');
          }
          else {
            Swal.fire('Error', 'Error al eliminar: ' + res.data.message, 'error');
          }
        }, (err: any) => {
          Swal.fire('Error', 'Error al eliminar: ' + err.error, 'error');
        });
      }
    });
  }

  setDatosEnvio(): void {
    this.objDatosCaptura.codigo = Number(this.valueSelected === undefined || this.valueSelected === null ? 0 : this.valueSelected);
    this.objDatosCaptura.descripcion = this.descripcionSelected;
    this.objDatosCaptura.cantidad = this.cantidadSelected;
  }
  limpiarCaptura(): void {
    this.objDatosCaptura.codigo = undefined;
    this.objDatosCaptura.descripcion = undefined;
    this.objDatosCaptura.cantidad = undefined;
    this.valueSelected = undefined;
    this.descripcionSelected = undefined;
    this.cantidadSelected = undefined;
  }

  mostrarMensajeFlotante(mensaje: string, icono: number, tiempo: number = 2700): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: tiempo
    });

    Toast.fire({
      icon: icono === 0 ? 'success' : icono === 2 ? 'info' : 'error',
      title: mensaje
    });
  }
}
