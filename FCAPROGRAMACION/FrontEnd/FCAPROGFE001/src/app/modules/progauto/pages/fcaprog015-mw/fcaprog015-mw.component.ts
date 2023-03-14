import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


import { FCAPROG015MWService } from '../../../../services/Programacion/progauto/fcaprog015-mw.service';
import {
  resistencia, CPLDAT009TD_002, ResData, Data3, errorMensaje,
  presentacionPintado, listCPLDAT009TD_002, clsConfiguracion, Variaciones
}
from '../../../../models/Programacion/progauto/FCAPROG015MWModel';
import Swal from 'sweetalert2';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-fcaprog015-mw',
  templateUrl: './fcaprog015-mw.component.html',
  styleUrls: ['./fcaprog015-mw.component.css']
})
export class FCAPROG015MWComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  @ViewChild('CplCap002') private CplCap002: any;
  @ViewChild('CplCap009') private CplCap009: any;

  VERSION: string = '';
  rbtnCuchillas: string = '2';
  tabSelected: number = 0;
  disabledBtnArreglosOptimos: boolean = true;
  cbxResistenciaSeleccionada: string = "";
  listaResistencias: resistencia [] = [];

  listaConfiguracion: clsConfiguracion [] = [];

  Configuracion: clsConfiguracion = new clsConfiguracion();


  confirmButton: string = "#28A745";
  cancelButton: string = "#DC3545";

  @ViewChild('mdlValidacion') private mdlValidacion: any;
  mdlValidacionRef: NgbModalRef;

  @ViewChild('fArreglosO') private mdlFArreglosO: any;
  mdlFArreglosORef: NgbModalRef;

  // --------------------------------------------------------
  txtPorcentajeVar1: string = 'Ops >= 5000';
  txtPorcentajeVar2: string = 'Ops < 5000';
  txtPorcentajeVar3: string = 'Proceso = "K" o Proceso = "L"';
  txtPorcentajeVar4: string = 'Cantidad Exacta';
  txtPorcentajeVar5: string = 'OP < 5000 y Cantidad Exacta';
  txtPorcentajeVar6: string = 'OP > 5000 y Cantidad Exacta';

  txtVariacion1: number = 0;
  txtVariacion2: number = 0;
  txtVariacion3: number = 0;
  txtVariacion4: number = 0;
  txtVariacion5: number = 0;
  txtVariacion6: number = 0;
  // --------------------------------------------------------

  disabledBtnValidarArreglo: boolean = false;
  disabledBtnValidarTodo: boolean = false;
  disabledBtnCalculos: boolean = false;
  disabledBtnCalculadora: boolean = false;
  disabledBtnConfVariacion: boolean = false;

  displayArreglosOptimos: boolean = false;
  displayValidarArreglo: boolean = false;
  displayValidarTodo: boolean = false;
  displayCalculos: boolean = false;
  displayCalculadora: boolean = false;
  displayConfVariacion: boolean = false;

  // --------------------------------------------------------
  listaCPLDAT009AO: Array<CPLDAT009TD_002>;
  columnasGridCPLDAT009TD_002: any;
  listaCPLDAT009: Array<CPLDAT009TD_002>;

  columnasGridResDataPrincipal: any;
  columnasGridResDataTmp: any;
  listaResDataTmp: Array<ResData>;
  // listaResDataTmpSinRepetir: Array<ResData>;
  columnasGridResData: any;
  listaResData: Array<ResData>;

  listaData3: Array<Data3>;
  txtRefileProm: string;
  txtM2: string;
  txtTotML: string;

  chkSelAllCancelar: boolean = false;



  @ViewChild('fValidarArregloResistencia') private mdlfValidarArregloResistencia: any;
  mdlfValidarArregloResistenciaRef: NgbModalRef;
  columnasGridResistencia: any;
  listaGridValidaResistencia: Array<errorMensaje>;

  listaCPLDAT009Final: Array<CPLDAT009TD_002>;

  @ViewChild('fValidarArregloPresentacionPintado') private mdlfValidarArregloPresentacionPintado: any;
  mdlfValidarArregloPresentacionPintadoRef: NgbModalRef;
  columnasGridPresentacionPintado: any;
  listaGridValidaPresentacionPintado: Array<presentacionPintado>;

  objCPLDAT009TD_002: listCPLDAT009TD_002;

  constructor(
    private modalService: NgbModal,
    public Servicio: FCAPROG015MWService,
    public datePipe: DatePipe
  ){
    this.columnasGridResDataPrincipal = [
      {
        headerName: '#',
        field: 'id',
        flex: 1,
        minWidth: 48,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Refile',
        field: 'refile',
        flex: 1,
        minWidth: 78,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Rest',
        field: 'resistencia',
        flex: 1,
        minWidth: 78,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Fta.',
        field: 'flauta',
        flex: 1,
        minWidth: 68,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'O.P.',
        field: 'op',
        flex: 1,
        minWidth: 98,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'F. Entr',
        field: 'fecha',
        flex: 1,
        minWidth: 94,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Client',
        field: 'cliente',
        flex: 1,
        minWidth: 94,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Artículo',
        field: 'articulo',
        flex: 1,
        minWidth: 94,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ancho',
        field: 'ancho',
        flex: 1,
        minWidth: 84,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Mult',
        field: 'multiplos',
        flex: 1,
        minWidth: 76,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Largo',
        field: 'largo',
        flex: 1,
        minWidth: 78,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Hojas',
        field: 'lam',
        flex: 1,
        minWidth: 78,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'A. Prog',
        field: 'anchoTotal',
        flex: 1,
        minWidth: 84,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'A. Pap',
        field: 'anchoPapel',
        flex: 1,
        minWidth: 84,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'M. Line',
        field: 'metrosLineales',
        flex: 1,
        minWidth: 84,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Art',
        field: 'producto',
        flex: 1,
        minWidth: 66,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Parc.',
        field: 'parcial',
        flex: 1,
        minWidth: 84,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Pts.',
        field: 'puntos',
        flex: 1,
        minWidth: 72,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Scor',
        field: 'conScore',
        flex: 1,
        minWidth: 64,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          // disabled: true
          change: this.changeChkScorPrincipal.bind(this)
        }
      },
      {
        headerName: 'AnchoSTD',
        field: 'anchoStd',
        flex: 1,
        minWidth: 108,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
    ];
    this.columnasGridResDataTmp = [
      {
        headerName: 'Cancelar',
        field: 'cancelar',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          change: this.changeChkCancelarOPs.bind(this)
        }
      },
      {
        headerName: 'Arreglo',
        field: 'id',
        flex: 1,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Prod. Completa',
        field: 'produccionCompleta',
        flex: 2,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          // params: this.parametrosChk.bind(this)
          disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      {
        headerName: 'Piezas X',
        field: 'piezasX',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ult Movimiento',
        field: 'ultFecha',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Hay Adicional',
        field: 'hayAdicional',
        flex: 2,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          // params: this.parametrosChk.bind(this)
          disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      {
        headerName: 'Adicional',
        field: 'adicional',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ];
    this.columnasGridResData = [
      {
        headerName: '#',
        field: 'id',
        flex: 1,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Resistencia',
        field: 'resistencia',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Fta.',
        field: 'flauta',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Fecha',
        field: 'fecha',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cliente',
        field: 'cliente',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Articulo',
        field: 'articulo',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ancho',
        field: 'ancho',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Mult.',
        field: 'multiplos',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Largo',
        field: 'largo',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Lamina',
        field: 'lam',
        flex: 1,
        minWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ancho Total',
        field: 'anchoTotal',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ancho Papel',
        field: 'anchoPapel',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Metros Lin',
        field: 'metrosLineales',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Prod.',
        field: 'producto',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Parcial',
        field: 'parcial',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Puntos',
        field: 'puntos',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Con Score',
        field: 'conScore',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          // disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      {
        headerName: 'Ancho STD',
        field: 'anchoStd',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      }
    ];
    this.columnasGridResistencia = [
      {
        headerName: 'Arreglo',
        field: 'id',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Mensaje',
        field: 'message',
        flex: 9,
        minWidth: 450,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ];
    this.columnasGridPresentacionPintado = [
      {
        headerName: 'Arreglo',
        field: 'id',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 2,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner1',
        field: 'liner1',
        flex: 2,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Presentación Artículo',
        field: 'presentacionArticulo',
        flex: 2,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Presentación Papel',
        field: 'presentacionPapel',
        flex: 2,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Pinta Corrugadora',
        field: 'pintaCorr',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center disabled',
        cellRendererParams: {
          type: 'chk',
          // change: this.ChangeValor.bind(this)
        }
      },
      {
        headerName: 'Pinta Impresora',
        field: 'pintaImp',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid-right',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center disabled',
        cellRendererParams: {
          type: 'chk',
          // change: this.ChangeValor.bind(this)
        }
      },
    ];
    this.columnasGridCPLDAT009TD_002 = [
      {
        headerName: 'OP1',
        field: 'op1',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'OP2',
        field: 'op2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'OP3',
        field: 'op3',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ];
  }

  changeChkScorPrincipal(e: any): void {
    this.blockUI.start('');
    this.Servicio.actualizarScorPrincipal(e.data).subscribe(async (res: any) => {
      this.blockUI.stop();
      if (res.data.message === 'OK') {
        this.mostrarVentana_OcultarResto(0);
        this.mdlValidacionRef.close();
        await this.delay(200);
        this.mostrarMensajeFlotante('Completado!', 0);
      }
      else {
        Swal.fire('Error', 'Error: ' + res.message, 'error');
      }
    }, (err: any) => {
      this.blockUI.stop();
      Swal.fire('Error', 'Error: ' + err.error, 'error');
    });
  }

  parametrosChk(): any {
    return {type: 'chk', disabled: true};
  }

  ngOnInit(): void {
    this.CerrarSession();

    this.VERSION = this.getVersion();





    this.changeChkCuchillas();
    this.getResistencias();

    this.getConfiguracion();

    this.CplCap002.miResistencia = this.cbxResistenciaSeleccionada;
  }

  changeTab(e: any): void {
    this.tabSelected = Number(e);
  }

  changeChkCancelarOPs(e: any): void {

  }

  clickSelAll(): void {
    for (const iterator of this.listaResDataTmp) {
      iterator.cancelar = this.chkSelAllCancelar;
    }
    this.listaResDataTmp = cloneDeep(this.listaResDataTmp);
  }

  //MCVB - 20220506
  async getConfiguracion(): Promise<void> {
    this.listaConfiguracion = await this.GetConfiguracion();

    //this.Configuracion.a2Cuchillas

    if (this.listaConfiguracion.length > 0) {
      this.cbxResistenciaSeleccionada = this.listaConfiguracion[0].resistencia;

      this.Configuracion.resistencia = this.listaConfiguracion[0].resistencia;
      //this.Configuracion.aplicacion = 'CPLCAP005';
      this.Configuracion.usuarioERP = this.listaConfiguracion[0].usuarioERP;

      if(this.listaConfiguracion[0].numcuchillas==="2")
      {
        this.rbtnCuchillas = '2';
        this.Configuracion.numcuchillas = '2';
        //this.Configuracion.a2Cuchillas = true;
      }

      if(this.listaConfiguracion[0].numcuchillas==="3")
      {
        this.rbtnCuchillas = '3';
        this.Configuracion.numcuchillas = '3';
        //this.Configuracion.a3Cuchillas = true;
      }
      this.ActualizaConfiguracion();
    }
  }

  // Obtener resistencias
  async getResistencias(): Promise<void> {
    this.listaResistencias = await this.obtenerResistencias();
    if (this.listaResistencias.length > 0) {
      this.cbxResistenciaSeleccionada = this.listaResistencias[0].clave;
    }
  }



  async obtenerResistencias(): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerResistencias();
    return value.data;
  }

  async GetConfiguracion(): Promise<Array<any>> {
    const value: any = await this.Servicio.getConfiguracion();
    return value.data;
  }

  async ActualizaConfiguracion(): Promise<Array<any>> {
    this.Servicio.actualizarConfiguracion(this.Configuracion).subscribe(async (res: any) => {

    }, (err: any) => {
      this.blockUI.stop();
      //Swal.fire('Error', 'Error al agregar op: ' + err.error, 'error');
    });
    return [];
  }

  // CerrarSession
  async CerrarSession(): Promise<Array<any>> {
    this.Servicio.CerrarSession(this.Configuracion).subscribe(async (res: any) => {

    }, (err: any) => {
      this.blockUI.stop();
      //Swal.fire('Error', 'Error al agregar op: ' + err.error, 'error');
    });
    return [];
  }



  async getVariaciones(): Promise<Array<Variaciones>> {
    const value: any = await this.Servicio.ObtenerVariaciones();
    return value.data;
  }


  // Métodos
  getVersion(): string {
    return this.Servicio.ObtenerVersion();
  }

  changeChkCuchillas(): void {
    if (this.rbtnCuchillas === '2' || this.rbtnCuchillas === '3') {
      this.disabledBtnArreglosOptimos = false;
    }
    else {
      this.disabledBtnArreglosOptimos = true;
    }

    this.Configuracion.numcuchillas = "";

    if(this.rbtnCuchillas === '2')
    {
      this.Configuracion.numcuchillas = "2";
    }

    if(this.rbtnCuchillas === '3')
    {
      this.Configuracion.numcuchillas = "3";
    }
    this.ActualizaConfiguracion();

  }

  changeCbxResistencia(): void {
    this.CplCap002.miResistencia = this.cbxResistenciaSeleccionada;
    this.Configuracion.resistencia = this.cbxResistenciaSeleccionada;
    this.ActualizaConfiguracion();
  }

  async delay(ms: number = 450) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

  mostrarVentana_OcultarResto(ventana: number): void {
    this.displayArreglosOptimos = ventana === 0 ? true : false;
    this.displayValidarArreglo = ventana === 1 ? true : false;
    this.displayValidarTodo = ventana === 2 ? true : false;
    this.displayCalculos = ventana === 3 ? true : false;
    this.displayCalculadora = ventana === 4 ? true : false;
    this.displayConfVariacion = ventana === 5 ? true : false;
  }

  clickContinuar(): void {
    if (this.listaResDataTmp.find(element => element.cancelar)) {
      Swal.fire({
        title: '¿Seguro de proceder a cancelar las OPs Seleccionadas?',
        html: 'Se cancelarán las OPs para no ser utilizadas',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: this.confirmButton,
        cancelButtonColor: this.cancelButton,
        cancelButtonText: '<i class="fa fa-times"></i> NO',
        confirmButtonText: '<i class="fa fa-check"></i> SI'
      }).then((result) => {
        if (!result.value) {
          this.blockUI.start("Cancelando ops seleccionadas...");
          this.Servicio.cancelarOpsCalcularProgramas(this.listaResDataTmp).subscribe(async (res: any) => {
            this.blockUI.stop();
            if (res.data.message === 'OK') {
              this.mostrarVentana_OcultarResto(0);
              this.mdlValidacionRef.close();
              await this.delay(200);
              this.mostrarMensajeFlotante('Completado!', 0);
            }
            else {
              Swal.fire('Error', 'Error: ' + res.data.message, 'error');
            }
          }, async (err: any) => {
            this.blockUI.stop();
            await this.delay(200);
            Swal.fire('Error', 'Error: ' + err.error, 'error');
          });
          return;
        }
      });
    }
    else {
      this.mostrarVentana_OcultarResto(0);
      this.mdlValidacionRef.close();
    }
  }
  closeModal(): void {
    this.mdlValidacionRef.close();
  }

  calculateDiff(dateSent): number {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  // Boton Arreglos Optimos
  async clickBtnArreglosOptimos(): Promise<void> {
    this.blockUI.start('Calculando programas a ' + this.rbtnCuchillas.toString() + ' cuchillas');
    this.listaResData = [];
    this.txtRefileProm = '';
    this.txtM2 = '';
    this.txtTotML = '';
    try {
      const value = await this.Servicio.EjecutarCalcularProgramas(this.rbtnCuchillas.toString().trim());

      // this.listaCPLDAT009AO = [];
      this.listaResDataTmp = [];
      // this.listaResDataTmpSinRepetir = [];

      if (value) {
        // this.listaCPLDAT009AO = value.data;
        if (value.data && value.data[0].id === -1) {
          this.blockUI.stop();
          Swal.fire({
            title: 'Error',
            html: value.data[0].message,
            icon: 'error'
          });

          return;
        }
        this.listaResData = value.data3;
        this.listaData3 = value.data4;

        // // quitar ops y arreglos repetidos
        // this.listaResData.map((datoRol, i) => {
        //   i === 0 ? datoRol : this.listaResDataTmpSinRepetir.filter(sinRep => {
        //     return sinRep.op === datoRol.op && sinRep.id === datoRol.id
        //   }).length === 0 ? this.listaResDataTmpSinRepetir.push(datoRol) : datoRol
        // });

        for (const iterator of this.listaResData) {
          if (iterator.produccionCompleta || iterator.hayAdicional) {
            this.listaResDataTmp.push(iterator);
          }
        }

        // for (const iterator of this.listaResDataTmpSinRepetir) {
        //   if (!iterator.produccionCompleta || iterator.hayAdicional) {
        //     this.listaResDataTmp.push(iterator);
        //   }
        // }

        // for (const iterator of this.listaResDataTmpSinRepetir) {
        //   this.listaResData.push(iterator);
        // }

        // this.listaResData = cloneDeep(this.listaResData);

        for (const iterator of this.listaData3) {
          this.txtRefileProm = iterator.refProm;
          this.txtM2 = iterator.m2;
          this.txtTotML = iterator.ml;
          break;
        }
        this.blockUI.stop();
        await this.delay(150);

        if (this.listaResDataTmp.length > 0) {
          this.mdlValidacionRef = this.modalService.open(this.mdlValidacion, {size: 'xl', backdrop: 'static'});
          return;
        }
        // else {
        //   this.mdlFArreglosORef = this.modalService.open(this.mdlFArreglosO, {size: 'xl', backdrop: 'static'});
        // }

        this.mostrarVentana_OcultarResto(0);
      }
    } catch (error) {
      this.blockUI.stop();
      Swal.fire({
        title: 'Error',
        html: error,
        icon: 'error'
      });
    }
  }

  setFormat(
      date: string,
      fromFormat: 'yyyy-MM-dd' | 'dd/MM/yyyy' | 'yyyyMMdd',
      toFormat: 'yyyy-MM-dd' | 'dd/MM/yyyy' | 'yyyyMMdd'
  ): string {
      let day = '';
      let month = '';
      let year = '';

      if (fromFormat === 'dd/MM/yyyy') {
          const dateParts = date.split('/');

          if (dateParts.length > 2) {
              day = dateParts[0];
              month = dateParts[1];
              year = dateParts[2];
          } else {
              return '';
          }
      } else if (fromFormat === 'yyyy-MM-dd') {
          const dateParts = date.split('-');

          if (dateParts.length > 2) {
              day = dateParts[2];
              month = dateParts[1];
              year = dateParts[0];
          } else {
              return '';
          }
      } else if (fromFormat === 'yyyyMMdd') {
          if (date.length > 7) {
              day = date.substring(0, 4);
              month = date.substring(4, 6);
              year = date.substring(6, 8);
          } else {
              return '';
          }
      } else {
          return '';
      }

      if (toFormat === 'dd/MM/yyyy') {
          return day + '/' + month + '/' + year;
      } else if (toFormat === 'yyyy-MM-dd') {
          return year + '-' + month + '-' + day;
      } else if (toFormat === 'yyyyMMdd') {
          return year + month + day;
      } else {
          return '';
      }
  }

  // Boton Validar Arreglos
  clickBtnValidarArreglo(): void {
    // this.displayValidarArreglo = !this.displayValidarArreglo;
    // VALIDAR ARREGLO
    Swal.fire({
      title: 'Indique el número de arreglo',
      html: 'O ingrese el número "0" para validar todo',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      inputValidator: arreglo => {
        if (!arreglo) {
          return 'Favor de capturar el número de arreglo';
        }
        else {
          if (!this.isNumber(arreglo)) {
            return 'Favor de capturar sólo números sin decimales y/o positivos';
          }
          return null;
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.clickValidarUnoVariosArreglos(result.value);
      }
    });
  }

  async clickValidarUnoVariosArreglos(arreglo: any): Promise<void> {
    this.blockUI.start(arreglo.toString() !== '0' ? 'Validando Arreglo ' + arreglo.toString() + '...' : 'Validando todos los arreglos...')
    const value = await this.Servicio.procValidarArreglos(arreglo);
    await this.delay(100);
    this.blockUI.stop();

    this.listaCPLDAT009 = [];
    if (value.data && value.data.length > 0) {
      Swal.fire({
        title: 'Información',
        html: value.data[0].message,
        icon: 'info'
      });
      return;
    }

    if (value.data3 && value.data3.length > 0) {
      this.mdlfValidarArregloResistenciaRef = this.modalService.open(this.mdlfValidarArregloResistencia, {size: 'xl', backdrop: 'static'});
      return;
    }

    this.listaCPLDAT009 = value.data2;

    if (value.data4 && value.data4.length > 0) {
      this.mdlfValidarArregloPresentacionPintadoRef = this.modalService.open(this.mdlfValidarArregloPresentacionPintado, {size: 'xl', backdrop: 'static'});
      return;
    }

    this.continuarValidarArreglo();
    this.mostrarVentana_OcultarResto(0);
  }

  clickAceptarPintado(): void {
    Swal.fire({
      title: '¿Seguro que desea proceder?',
      html: 'Se aplicarán los cambios de presentacion de artículo, papel y pintado en corrugadora e impresora indicados',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: this.confirmButton,
      cancelButtonColor: this.cancelButton,
      cancelButtonText: '<i class="fa fa-times"></i> NO',
      confirmButtonText: '<i class="fa fa-check"></i> SI'
    }).then((result) => {
      if (!result.value) {
        this.continuarValidarArreglo();
        return;
      }
    });
  }

  continuarValidarArreglo(): void {
    this.blockUI.start('Aplicando cambios...');
    this.objCPLDAT009TD_002.pModulo = 'CPLDAT005 V2';
    this.objCPLDAT009TD_002.pCuchillas3 = this.rbtnCuchillas === '3' ? true : false;
    this.objCPLDAT009TD_002.pResistencia = this.cbxResistenciaSeleccionada.toString().trim();

    for (const iterator of this.listaCPLDAT009) {
      this.objCPLDAT009TD_002.datos.push(iterator);
    }

    this.Servicio.procValidarPresentacionPintado(this.objCPLDAT009TD_002).subscribe(async (res: any) => {
      this.blockUI.stop();
      if (res.data && res.data.length === 1) {
        if (res.data[0].id === -1) {
          Swal.fire('Error', res.data[0].op1, 'error');
          return;
        }
      }

      this.listaResData = res.data;
      await this.delay(100);
      this.mostrarVentana_OcultarResto(0);
    }, async (err: any) => {
      this.blockUI.stop();
      await this.delay(100);
      Swal.fire('Error', 'Error: ' + err.error, 'error');
    });
  }

  // Boton Validar Todo
  async clickBtnValidarTodo(): Promise<void> {
    this.clickValidarUnoVariosArreglos(0);
  }

  isNumber(campo: string): boolean {
    return new RegExp('^[0-9]+$').test(campo.trim());
  }

  // Boton Cálculos
  clickBtnCalculos(): void {
    this.mostrarVentana_OcultarResto(3);
    // this.displayCalculos = !this.displayCalculos;
    // this.displayCalculadora = false;
    // this.displayConfVariacion = false;
  }

  // Boton Calculadora
  clickBtnCalculadora(): void {
    this.mostrarVentana_OcultarResto(4);
  }

  // Boton Conf. Variacion
  async clickBtnConfVariacion(): Promise<void> {
    if (!this.displayConfVariacion) {
      const values = await this.getVariaciones();

      for (const iterator of values) {
        this.txtVariacion1 = iterator.id === 1 ? iterator.variacion : this.txtVariacion1;
        this.txtVariacion2 = iterator.id === 2 ? iterator.variacion : this.txtVariacion2;
        this.txtVariacion3 = iterator.id === 3 ? iterator.variacion : this.txtVariacion3;
        this.txtVariacion4 = iterator.id === 4 ? iterator.variacion : this.txtVariacion4;
        this.txtVariacion5 = iterator.id === 5 ? iterator.variacion : this.txtVariacion5;
        this.txtVariacion6 = iterator.id === 6 ? iterator.variacion : this.txtVariacion6;
      }
    }

    this.mostrarVentana_OcultarResto(5);
  }

  objVariaciones = new Array<Variaciones>();
  async actualizarVariaciones(): Promise<void> {
    if ((this.txtVariacion1 || this.txtVariacion1 === 0) && (this.txtVariacion2 || this.txtVariacion2 === 0) &&
        (this.txtVariacion3 || this.txtVariacion3 === 0) && (this.txtVariacion4 || this.txtVariacion4 === 0) &&
        (this.txtVariacion5 || this.txtVariacion5 === 0) && (this.txtVariacion6 || this.txtVariacion6 === 0)) {

          this.objVariaciones = [];
          this.objVariaciones.push({ id: 1, variacion: this.txtVariacion1 });
          this.objVariaciones.push({ id: 2, variacion: this.txtVariacion2 });
          this.objVariaciones.push({ id: 3, variacion: this.txtVariacion3 });
          this.objVariaciones.push({ id: 4, variacion: this.txtVariacion4 });
          this.objVariaciones.push({ id: 5, variacion: this.txtVariacion5 });
          this.objVariaciones.push({ id: 6, variacion: this.txtVariacion6 });

          this.Servicio.actualizarVariaciones(this.objVariaciones).subscribe(async (res: any) => {
            Swal.fire('Completado', 'Información actualizada', 'success');
          }, (err: any) => {
            Swal.fire('Error', 'Error al guardar la información: ' + err.error, 'error');
          });
    }
    else {
      Swal.fire({
        title: 'Información',
        html: 'Favor de completar todos los campos de variaciones',
        icon: 'info'
      });
    }
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
