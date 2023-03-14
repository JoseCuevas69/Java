import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { FCAPROG012MWService } from '../../../../services/Programacion/progauto/fcaprog012-mw.service';
import { FCAPROG015MWService } from '../../../../services/Programacion/progauto/fcaprog015-mw.service';
import { GridModel } from '../../../../models/common/gridModel';
import { dtsDatos, listaDatos } from '../../../../models/Programacion/progauto/FCAPROG012MWModel';
import { filtros } from '../../../../models/Programacion/progauto/FCAPROG015MWModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fcaprog012-mw',
  templateUrl: './fcaprog012-mw.component.html',
  styleUrls: ['./fcaprog012-mw.component.css']
})
export class FCAPROG012MWComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  tituloCabecera: string = 'Captura de anchos';
  tituloPie: string = 'CPLCAP001 - CAPTURA DE ANCHOS';
  version: string = '';

  filtros5 = new filtros();

  listaDatos: dtsDatos [] = [];
  tmpDatos: dtsDatos [] = [];
  @ViewChild('gridDatos') gridDatos: GridModel;
  columnasGridDatos: any;

  objListaDatos = new listaDatos();

  constructor(
    public Servicio1: FCAPROG012MWService,
    public Servicio5: FCAPROG015MWService
  ) {
    this.columnasGridDatos = [
      {
        headerName: 'USO',
        field: 'usar',
        flex: 1,
        minWidth: 30,
        headerClass: 'header-center header-grid-left',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          change: this.ChangeValor.bind(this)
        }
      },
      {
        headerName: 'ANCHOS CMS',
        field: 'ancho',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'PULGADAS',
        field: 'pulgadas',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // {
      //   headerName: '',
      //   field: 'extra',
      //   flex: 2,
      //   minWidth: 100,
      //   headerClass: 'header-center header-grid-right',
      //   cellClass: 'grid-cell-center'
      // }
    ]
  }

  ChangeValor(obj: any): void {
    console.log(obj);
  }

  ngOnInit(): void {
    // this.listaDatos.push({
    //   usar: false, ancho: 0, pulgadas: 0, extra: 0
    // });
    this.cargarAnchos();
  }

  // =====================================================================================
  // METODOS SERVICIOS

  // Obtener anchos
  async getAnchosUsar(obj: filtros): Promise<Array<any>> {
    return await this.obtenerAnchosUsar(obj);
  }
  async obtenerAnchosUsar(obj: filtros): Promise<Array<any>> {
    const value: any = await this.Servicio5.ObtenerAnchosUsar(obj);
    return value.data;
  }

  // Carga info 02
  async cargaInfo02(): Promise<Array<any>> {
    return await this.obtenerInfo02();
  }
  async obtenerInfo02(): Promise<Array<any>> {
    const value: any = await this.Servicio1.CargaInfo02();
    return value.data;
  }

  // =====================================================================================

  async cargarAnchos(): Promise<void> {
    this.filtros5.usar = -1;
    this.tmpDatos = await this.getAnchosUsar(this.filtros5);
    this.listaDatos = [];
    for (const iterator of this.tmpDatos) {
      if (iterator.pulgadas > 49) {
        this.listaDatos.push(iterator);
      }
    }
  }

  async getInfo02(): Promise<void> {
    this.blockUI.start('Actualizando anchos...');
    this.tmpDatos = await this.cargaInfo02();
    // this.listaDatos = [];
    for (const iterator of this.tmpDatos) {
      if (iterator.pulgadas > 49) {
        this.listaDatos.push(iterator);
      }
    }
    this.blockUI.stop();
    this.delay();
    this.mostrarMensajeFlotante('Actualización Completa!', 0);
    // Swal.fire('Completado', 'Actualización Completada', 'success');
  }

  clickBtnAplicar(): void {
    Swal.fire({
      title: 'Los registros serán modificados',
      text: '¿Desea continuar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#28A745",
      cancelButtonColor: "#DC3545",
      cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
      confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Aplicando Cambios...');
        this.objListaDatos.Datos = this.listaDatos;
        this.Servicio1.registrar(this.objListaDatos).subscribe(async (res: any) => {
          this.blockUI.stop();
          this.delay();
          Swal.fire(
            (res.data.id !== 0 ? 'Completado' : 'Error'),
            res.data.message,
            (res.data.id !== 0 ? 'success' : 'error')
          );
          // this.cargarAnchos();
        }, (err: any) => {
          Swal.fire('Error', 'Error al guardar la información: ' + err.error, 'error');
        });
      }
    });
  }

  async clickBtnRefrescar(): Promise<void> {
    await this.cargarAnchos();
    this.delay();
    this.mostrarMensajeFlotante('Actualizado!', 0);
  }

  async delay(ms: number = 450) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
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
