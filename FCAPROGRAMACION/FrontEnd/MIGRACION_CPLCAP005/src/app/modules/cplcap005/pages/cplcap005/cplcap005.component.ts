import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Cplcap005Service } from 'src/app/services/cplcap005.service';
import { resistencia, CPLDAT009TD_002, ResData, Data3, errorMensaje, presentacionPintado, listCPLDAT009TD_002, clsConfiguracion } from 'src/app/models/common/cplcap005';
import Swal from 'sweetalert2';
import { Variaciones } from 'src/app/models/common/Variaciones';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep, xor } from 'lodash-es';
import { DatePipe } from '@angular/common';
import { DateManager } from 'src/app/models/common/dateManager';



@Component({
  selector: 'app-cplcap005',
  templateUrl: './cplcap005.component.html',
  styleUrls: ['./cplcap005.component.css']
})
export class Cplcap005Component implements OnInit {
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
    public Servicio: Cplcap005Service,
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
    return null; 
  }

  // CerrarSession
  async CerrarSession(): Promise<Array<any>> {
    this.Servicio.CerrarSession(this.Configuracion).subscribe(async (res: any) => {

    }, (err: any) => {
      this.blockUI.stop();
      //Swal.fire('Error', 'Error al agregar op: ' + err.error, 'error');
    });    
    return null; 
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
          return undefined;
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
























  /*
  dtsFiltros: filtros;
  dtsTParametros: tParametros [] = [];
  dtsTAnchosUsar: tAnchos [] = [];
  dtsDatosOps: DatosOps [] = [];
  dtsOPAnalizando1: DatosOps [] = [];
  dtsOPAnalizando2: DatosOps [] = [];
  dtsArreglosPosibles: CPLDAT008ArreglosPosibles [] = [];
  dtsArreglosPosiblesRevaluacion: CPLDAT008ArreglosPosibles [] = [];
  dtsPuntosMax: CPLDAT008ArreglosPosibles [] = [];
  dtsAnchoSTD: dtsAnchoSTD [] = [];
  dtsRecs: DatosOps [] = [];





  // mdlFProcsTitulo: string = '';
  mdlFProcsTexto: string = '';

  objVariables = new tVariables();
  // -------------------------------------------------
  // VARIABLES MODULO
  OMITIRRESISTENCIA: boolean;
  EN: number;
  // -------------------------------------------------


  constructor(
    public Servicio: Cplcap005Service
  ) {
    this.dtsFiltros = new filtros();
  }

  ngOnInit(): void {
    // console.log(eval("5+5*5"));
    this.dtsFiltros.zona = localStorage.getItem('Zona').trim();
    this.getResistencias();
  }

  getVersion(): string {
    return this.Servicio.ObtenerVersion();
  }

  changeChkCuchillas(): void {
    if (this.rbtnCuchillas === '2' || this.rbtnCuchillas === '3') {
      this.disabledBtnArreglosOptimos = false;
    }
    else {
      this.disabledBtnArreglosOptimos = false;
    }
  }

  async delay(ms: number) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ejecutar(obj: Array<AnchoPapelEntity>): Promise<void> {
    for (const iterator of obj) {
      iterator.value01 = 5
    }
  }



  // Obtener parametros
  async getParametros(): Promise<Array<any>> {
    return await this.obtenerParametros();
  }
  async obtenerParametros(): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerParametros();
    return value.data;
  }

  // Obtener anchos
  async getAnchosUsar(obj: filtros): Promise<Array<any>> {
    return await this.obtenerAnchosUsar(obj);
  }
  async obtenerAnchosUsar(obj: filtros): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerAnchosUsar(obj);
    return value.data;
  }

  // Obtener datos de Ops
  async getDatosOps(): Promise<Array<any>> {
    return await this.obtenerDatosOps();
  }
  async obtenerDatosOps(): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerDatosOps();
    return value.data;
  }

  // Obtener arreglos posibles
  async getArreglosPosibles(obj: filtros): Promise<Array<any>> {
    return await this.obtenerArreglosPosibles(obj);
  }
  async obtenerArreglosPosibles(obj: filtros): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerArreglosPosibles(obj);
    return value.data;
  }

  // Obtener Op's Analizando
  async getOpAnalizando(obj: filtros): Promise<Array<any>> {
    return await this.obtenerOpAnalizando(obj);
  }
  async obtenerOpAnalizando(obj: filtros): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerOpAnalizando(obj);
    return value.data;
  }

  // Obtener puntos máximos arreglos posibles
  async getPuntosMaxArreglosPosibles(): Promise<Array<any>> {
    return await this.obtenerPuntosMaxArreglosPosibles();
  }
  async obtenerPuntosMaxArreglosPosibles(): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerPuntosMaxArreglosPosibles();
    return value.data;
  }

  // Obtener puntos máximos arreglos posibles
  async getAnchoSTD(obj: filtros): Promise<Array<any>> {
    return await this.obtenerAnchoSTD(obj);
  }
  async obtenerAnchoSTD(obj: filtros): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerAnchoSTD(obj);
    return value.data;
  }

  // Obtener Hojas Programadas
  async getHojasProgramadas(obj: filtros): Promise<Array<any>> {
    return await this.obtenerHojasProgramadas(obj);
  }
  async obtenerHojasProgramadas(obj: filtros): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerHojasProgramadas(obj);
    return value.data;
  }



  // ===============================================================================================================
  // calcularProgramas
  async calcularProgramas(): Promise<void> {
    await this.limpiarObjVariables();
    // Cargar Parametros de Programacion
    // this.mdlFProcsTexto += "<br>&nbsp;Obteniendo Párametros...";
    // await this.delay(2000);
    this.dtsTParametros = await this.getParametros();
    // Cargar Anchos de Programacion
    // this.mdlFProcsTexto += "<br>&nbsp;Obteniendo Anchos a Usar...";
    // await this.delay(2000);
    this.dtsFiltros.usar = 1;
    this.dtsTAnchosUsar = await this.getAnchosUsar(this.dtsFiltros);

    // Limpiando Archivos para ser usados
    // PENDIENTE ELIMINAR TABLAS TArreglosP (CPLDAT008 - Arreglos posibles) y TOpReanalizando (CPLDAT005 - Op Analizando)
    // -- AQUÍ VA EL PENDIENTE --

    // Setear en cero el Ide
    this.objVariables.Ide = 0

    // Parametros de programacion
    if (this.dtsTParametros.length > 0) {
      const hoy = new Date;
      this.objVariables.RefileMax = this.dtsTParametros[0].refileMaximo / 10;
      this.objVariables.RefileMin = this.dtsTParametros[0].refileMinimo / 10;
      this.objVariables.DiasAdelanto = this.dtsTParametros[0].diasAdelanto;
      this.objVariables.FechaLimite = new Date(hoy.setDate(hoy.getDate() + this.dtsTParametros[0].diasAdelanto));
      this.objVariables.TodosAnchos = this.dtsTParametros[0].todosAnchos;
      this.objVariables.AnchoCalculo = this.dtsTParametros[0].anchoCalculo;
      this.objVariables.LargoMinimo = this.dtsTParametros[0].largoMinimo;
      this.objVariables.ScoresMax = this.dtsTParametros[0].scores;
    }

    // Setear ancho papel
    if (this.dtsTAnchosUsar.length > 0) {
      for (const iterator of this.dtsTAnchosUsar) {
        this.objVariables.AnchoPapel.push({value01: -1, value02: -1, value03: -1});
      }
    }
    else {
      this.objVariables.AnchoPapel.push({value01: -1, value02: -1, value03: -1});
    }

    // Preguntar por todos lo anchos
    if (!this.objVariables.TodosAnchos) {
      this.objVariables.AnchoPapel[0].value01 = this.objVariables.AnchoCalculo;
      this.objVariables.Verif = 1;
    }
    else {
      this.objVariables.Verif = 0;

      if (this.dtsTAnchosUsar.length === 0) {
        this.objVariables.Flag1 = true;
        this.salirCalcularProgramas();
        return;
      }

      this.objVariables.AnchoPapel[0].value01 = 0;
      for (const iterator of this.dtsTAnchosUsar) {
        this.objVariables.AnchoComb = iterator.ancho;
        this.objVariables.Usar = iterator.usar;
        this.objVariables.Flag2 = true;

        for (this.objVariables.X = 0; this.objVariables.X < this.objVariables.Verif; this.objVariables.X++) {
          const element = this.objVariables.AnchoPapel[this.objVariables.X];
          if (element.value01 === this.objVariables.AnchoComb || !this.objVariables.Usar) {
            this.objVariables.Flag2 = false;
            break;
          }
        }

        if (this.objVariables.Flag2) {
          this.objVariables.AnchoPapel[this.objVariables.Verif].value01 = this.objVariables.AnchoComb;
          this.objVariables.Verif += 1;
        }
      }
    }




    // Iniciar Datos de Ops
    this.dtsDatosOps = await this.getDatosOps();
    if (this.dtsDatosOps.length === 0) {
      this.objVariables.Mej = "Definir OPs Analizadas";
      Swal.fire({
        title: this.objVariables.Mej.trim(),
        html: '',
        icon: 'info'
      });
      this.salirCalcularProgramas(); // SALIR CALCULAR PROGRAMAS
      return;
    }

    // this.mdlFProcsTexto += "<br>&nbsp;Recorriendo Datos de OP's...";
    // await this.delay(2000);
    if (!this.objVariables.Flag1) {
      // Leer OPs Participantes en la programacion
      this.objVariables.CONT = 0;
      for (const iterator of this.dtsDatosOps) {
        this.objVariables.RESISTENCIA = iterator.resistencia.trim();
        this.objVariables.Lamin = iterator.lamina.trim();
        this.objVariables.FechaE = iterator.fechaEntrega;
        this.objVariables.Usar = iterator.utilizar;

        if (this.objVariables.FechaE >= this.objVariables.FechaLimite || this.objVariables.Usar) {
          // PENDIENTE INSERTAR DATOS EN TOpReanalizando (CPLDAT005)
          // CAMPOS ([Orden Produccion], [Clave Articulo], [Cliente], [Articulo], [Fecha Entrega], [Resistencia], [Ancho], [Largo], [Piezas], [Cantidad], [Faltan], [TKg], [Hojas], [Lamina], [Parcial], [Flauta], [NScores], [Mas], [Utilizar], [Hojas Orig], [Refile], [Prior], ConScore)
          // VALORES (iterator.OrdenProduccion, iterator.ClaveArticulo, iterator.Cliente, iterator.Articulo, (iterator.FechaEntrega, 'yyyymmdd'), iterator.Resistencia, iterator.Ancho, iterator.Largo, iterator.Piezas, iterator.Cantidad, iterator.Faltan, iterator.Tkg, iterator.Hojas, iterator.Lamina, iterator.Parcial, iterator.Flauta, iterator.NScores, iterator.Mas, iterator.Utilizar, iterator.Hojas, iterator.Refile, iterator.Prior, iterator.ConScore)

          this.objVariables.Opp.push({
            value01: iterator.ordenProduccion.trim(),
            value02: iterator.ancho,
            value03: iterator.largo,
            value04: (iterator.hojas * (1 + (iterator.mas / 100))),
            value05: this.objVariables.Lamin.trim(),
            value06: iterator.fechaEntrega,
            value07: iterator.flauta.trim(),
            value08: iterator.piezas,
            value09: iterator.refile,
            value10: 0,
            value11: iterator.prior,
            value12: iterator.nScores,
            value13: null
          });
          this.objVariables.CONT += 1;
          if (iterator.prior) {
            this.objVariables.PRIORIDAD = -1;
          }
        }
      }

      // Inicia secuencia de programacion OPs en dos posiciones
      // Combinacion de Pedidos
      for (this.objVariables.NOANCHOS = 0; this.objVariables.NOANCHOS < this.objVariables.Verif; this.objVariables.NOANCHOS++) {
        // Bucle de Anchos de Papel de 1 hasta Verif = Total
        const elementAnchosPapel = this.objVariables.AnchoPapel[this.objVariables.NOANCHOS];

        elementAnchosPapel.value02 = elementAnchosPapel.value01 - this.objVariables.RefileMin;
        elementAnchosPapel.value03 = elementAnchosPapel.value01 - (this.objVariables.RefileMin / 2);

        this.objVariables.CONT2 = 0;
        if (this.objVariables.Opp[0].value07.length === 1) {
          this.objVariables.SENCILLO = 'S';
        }

        // Bucle de OPs de 1 hasta Cont = Total OPs Participantes
        for (this.objVariables.i = 0; this.objVariables.i < this.objVariables.CONT; this.objVariables.i++) {
          const elementOpp = this.objVariables.Opp[this.objVariables.i];

          if (!elementOpp.value09) {
            this.objVariables.Z1 = 1;
            this.objVariables.XREFILE = 0;
          }
          else {
            this.objVariables.Z1 = 2;
            this.objVariables.XREFILE = this.objVariables.RefileMin;
          }
          this.objVariables.ANCHO1 = elementOpp.value02;
          // Calcula cuantas vezes cave el ancho de la hoja en el ancho de papel
          this.objVariables.Tantos = (this.objVariables.Z1 === 1 ? elementAnchosPapel.value01 : (this.objVariables.Z1 === 2 ? elementAnchosPapel.value02 : 0)) / this.objVariables.ANCHO1;

          // Calcula refile
          this.objVariables.Refile = (this.objVariables.Z1 === 1 ? elementAnchosPapel.value01 : (this.objVariables.Z1 === 2 ? elementAnchosPapel.value02 : 0)) - (this.objVariables.Tantos * this.objVariables.ANCHO1);

          // Calcula Metros lineales
          this.objVariables.MLinea = (this.objVariables.Tantos === 0 ? 0 : ( elementOpp.value04 / this.objVariables.Tantos ) * elementOpp.value03 );

          // OP Combina Sola en el Ancho
          if (this.objVariables.PRIORIDAD === -1 && !elementOpp.value11) {
            this.brincaOPrioridadOP1(elementOpp, elementAnchosPapel); // Verifica priorodad
            break;
          }
          if (this.objVariables.MLinea < (this.objVariables.LargoMinimo * 100)) {
            this.objVariables.Refile = 1000; // Verifica refile contra refile minimo
          }

          // Si los parametros se cumplen carga matriz de arreglo posible
          if (
            (this.objVariables.RefileMax - this.objVariables.RefileMin)
            >= this.objVariables.Refile
          ) {
            this.objVariables.CONT2 += 1;

            this.objVariables.Cm.push({
              value01: elementOpp.value01,
              value02: this.objVariables.Tantos,
              value03: this.objVariables.ANCHO1,
              value04: null,
              value05: null,
              value06: null,
              value07: this.objVariables.Tantos * this.objVariables.ANCHO1,
              value08: this.objVariables.Refile,
              value09: this.objVariables.MLinea / elementOpp.value03,
              value10: null,
              value11: this.objVariables.MLinea,
              value12: elementOpp.value06,
              value13: null,
              value14: elementOpp.value03,
              value15: null,
              value16: elementOpp.value07,
              value17: elementOpp.value04 * elementOpp.value08,
              value18: null,
              value19: null,
              value20: this.objVariables.XREFILE,
              value21: null,
              value22: null,
              value23: null
            });

            elementOpp.value10 += 1;
          }
        }

        // Graba Informacion Arreglos
        for (this.objVariables.X = 0; this.objVariables.X < this.objVariables.CONT2; this.objVariables.X++) {
          this.objVariables.Ide += 1;
          // PENDIENTE INSERTAR TArreglosP (CPLDAT008)
          // CAMPOS  ([ID], [OP1], [Multiplos1], [Ancho1], [OP2], [Multiplos2], [Ancho2], [Ancho Total], [Ancho Papel], [Refile], [Lam1], [Lam2], [Metros Lineales], [Fecha1], [Fecha2], [Largo1], [Largo2], [Resistencia], [Flauta], [Piezas1], [Piezas2], [Empate], [Tranf])
          // VALORES (Ide, Cm.value01, Cm.value02, Cm.value03, Cm.value04, Cm.value05, Cm.value06, Cm.value07, elementAnchosPapel.value01, (elementAnchosPapel.value01 - Cm.value07), Cm.value09, Cm.value10, (Cm.value10 / 100), format(Cm.value12, 'yyyymmdd'), format(Cm.value13, 'yyyymmdd'), Cm.value14, Cm.value15, RESISTENCIA, Cm.value16, Cm.value17, Cm.value18, , Cm.value19, 0)
        }

      }

      // Complementa datos
      for (const opp of this.objVariables.Opp) {
        if (opp.value10 = 0) { opp.value10 = 5000; }
        // PENDIENTE APLICAR ACTUALIZACION BD TOpReanalizando (CPLDAT005)
        // SET NCombina = opp.value10
        // WHERE [Orden Produccion] = 'opp.value01'
      }
    }
    // this.mdlFProcsTexto += "<br>&nbsp;Fin Proceso...";
    // await this.delay(2000);
  }

  async brincaOPrioridadOP1(elementOppI: OppEntity, elementAnchosPapel: AnchoPapelEntity): Promise<void> {
    // Bucle Inverso de Tantos = anchos de hoja en ancho de papel
    for (this.objVariables.k = this.objVariables.Tantos; this.objVariables.k >= 0; this.objVariables.k--) {
      // Inicia Combinacion con la siguente OP
      const elementOppK = this.objVariables.Opp[this.objVariables.k];

      for (this.objVariables.J = this.objVariables.i; this.objVariables.J < this.objVariables.CONT; this.objVariables.J++) {
        const elementOppJ = this.objVariables.Opp[this.objVariables.J];

        if (elementOppI.value01 === elementOppJ.value01) {
          this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
        }
        else {
          if (!elementOppI.value09 && elementOppJ.value09) {
            this.objVariables.z2 = 3;
            this.objVariables.XREFILE = this.objVariables.RefileMin / 2;
          }
          else {
            this.objVariables.z2 = 2;
            this.objVariables.XREFILE = this.objVariables.RefileMin;
          }
          if (elementOppI.value09 && !elementOppJ.value09) {
            this.objVariables.z2 = 3;
            this.objVariables.XREFILE = this.objVariables.RefileMin / 2;
          }
          if (!elementOppI.value09 && !elementOppJ.value09) {
            this.objVariables.z2 = 1;
            this.objVariables.XREFILE = 0;
          }

          if (Number(elementOppI.value01.trim().substring(0, 5)) > Number(elementOppJ.value01.trim().substring(0, 5))) {
            this.objVariables.Herm1 = elementOppJ.value01;
            this.objVariables.Herm2 = elementOppI.value01;
          }
          else {
            this.objVariables.Herm1 = elementOppI.value01;
            this.objVariables.Herm2 = elementOppJ.value01;
          }

          // Verificaciones para que no se programe la misma OP
          if (this.objVariables.SENCILLO === 'S' && elementOppI.value07.trim() !== elementOppJ.value07.trim()) {
            this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
          }
          else {
            this.objVariables.Ancho2 = elementOppJ.value02;
            this.objVariables.Tantos2 = (
              (
                this.objVariables.z2 === 1
                ? elementAnchosPapel.value01
                : (
                  this.objVariables.z2 === 2
                  ? elementAnchosPapel.value02
                  : elementAnchosPapel.value03
                )
              ) - (this.objVariables.ANCHO1 * this.objVariables.k)
            ) / this.objVariables.Ancho2;

            if (this.objVariables.Tantos2 === 0) {
              this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
            }
            else {
              // Valida que las OPs que se combinen no superen los 3.07 mts. ya que en planta
              // Tijuana la mesa de recibo es de esta medida.
              if (this.dtsFiltros.zona === '02' && elementOppI.value03 > 307 && elementOppJ.value03 > 307) {
                this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
              }
              else {
                for (this.objVariables.M = this.objVariables.Tantos2; this.objVariables.M >= 0; this.objVariables.M--) {
                  // Calcula Refile
                  this.objVariables.Refile2 = (
                    (
                      this.objVariables.z2 === 1
                      ? elementAnchosPapel.value01
                      : (
                        this.objVariables.z2 === 2
                        ? elementAnchosPapel.value02
                        : elementAnchosPapel.value03
                      )
                    ) - (
                      (this.objVariables.k * this.objVariables.ANCHO1) +
                      (this.objVariables.M * this.objVariables.Ancho2)
                    )
                  )

                  if (this.objVariables.M === 0) {
                    this.objVariables.MLinea = 0;
                  }
                  else {
                    this.objVariables.MLinea = (elementOppI.value04 / this.objVariables.k) * elementOppI.value03;
                    this.objVariables.MLinea2 = (elementOppJ.value04 / this.objVariables.M) * elementOppJ.value03;
                  }

                  this.objVariables.TMLinea = (
                    this.objVariables.MLinea2 > this.objVariables.MLinea
                    ? this.objVariables.TMLinea = this.objVariables.MLinea
                    : this.objVariables.TMLinea = this.objVariables.MLinea2
                  );

                  // Si los Metros lineales menor a minimo anula refile
                  if (this.objVariables.TMLinea < (this.objVariables.LargoMinimo * 100)) {
                    this.objVariables.Refile2 = 1000;
                  }

                  this.objVariables.UnaPrior = (
                    elementOppI.value11 || elementOppJ.value11 ? -1 : 0
                  )

                  if (this.objVariables.PRIORIDAD === -1 && this.objVariables.UnaPrior === 0) {
                    this.brincaOPrioridadOP2(); // Metodo utilizado solo para evitar continuar
                  }
                  else {
                    if ( (this.objVariables.RefileMax - this.objVariables.RefileMin) >= this.objVariables.Refile2) {
                      this.objVariables.CONT2 += 1;

                      this.objVariables.Cm.push({
                        value01: elementOppI.value01,
                        value02: this.objVariables.k,
                        value03: this.objVariables.ANCHO1,
                        value04: elementOppJ.value01,
                        value05: this.objVariables.M,
                        value06: this.objVariables.Ancho2,
                        value07: (this.objVariables.k * this.objVariables.ANCHO1) + (this.objVariables.M * this.objVariables.Ancho2),
                        value08: this.objVariables.Refile2,
                        value09: this.objVariables.TMLinea / elementOppI.value03,
                        value10: this.objVariables.TMLinea / elementOppJ.value03,
                        value11: this.objVariables.TMLinea,
                        value12: elementOppI.value06,
                        value13: elementOppJ.value06,
                        value14: elementOppI.value03,
                        value15: elementOppJ.value03,
                        value16: elementOppJ.value07,
                        value17: (this.objVariables.TMLinea / elementOppI.value03) * elementOppI.value08 * this.objVariables.k,
                        value18: (this.objVariables.TMLinea / elementOppJ.value03) * elementOppJ.value08 * this.objVariables.M,
                        value19: this.objVariables.Herm1 + " " + this.objVariables.Herm2,
                        value20: this.objVariables.XREFILE,
                        value21: null,
                        value22: null,
                        value23: null
                      });
                      elementOppI.value10 += 1;
                      elementOppJ.value10 += 1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  async salirCalcularProgramas(): Promise<void> {
    // Inicia Valuacion de Arreglos
    this.dtsFiltros.puntosMax = -1;
    this.dtsArreglosPosibles = await this.getArreglosPosibles(this.dtsFiltros);
    if (this.dtsArreglosPosibles.length === 0) {
      this.salirValuacionArreglos(); // Metodo utilizado solo para evitar continuar
      return;
    }

    for (const iterator of this.dtsArreglosPosibles) {
      this.objVariables.OP1 = iterator.op1.trim();
      this.objVariables.OP2 = iterator.op2.trim();
      this.objVariables.AnchoUtil = iterator.anchoTotal;
      this.objVariables.AnchoPapl = iterator.anchoPapel;
      this.objVariables.MetrosLin = iterator.metrosLineales;
      this.objVariables.Mult1 = iterator.multiplos1;

      this.objVariables.Mult2 = (
        iterator.multiplos2 === null || iterator.multiplos2 === undefined ? 0 : iterator.multiplos2
      );

      // Materia Prima
      this.objVariables.MatPrim = (
        // Valor de Materia Prima a 5$/kg
        this.objVariables.AnchoPapl * this.objVariables.MetrosLin / 100 * 5 + this.objVariables.AnchoPapl * 35 / 100 * 5
      );
      this.objVariables.ManoObr = (
        // Valor de Mano obra a 10% de Materia Prima
        this.objVariables.MetrosLin * 0.5 + 100
      );
      this.objVariables.CostoArg = (
        // Valor costo primo
        this.objVariables.MatPrim + this.objVariables.ManoObr
      );
      this.objVariables.M2Netos = (
        // Total metros cuadrados
        this.objVariables.AnchoUtil * this.objVariables.MetrosLin / 100
      );

      this.objVariables.PuntosArg = (
        this.objVariables.M2Netos === 0
        ? 0
        // Convercion a Indice dividiendo entre a 5$/kg
        : (this.objVariables.CostoArg / this.objVariables.M2Netos) / 5
      );

      // Valuacion Fecha Entrega
      this.objVariables.Fecha1 = iterator.fecha1;
      this.objVariables.Fecha2 = iterator.fecha2;
      this.objVariables.Dif1 = this.objVariables.Fecha1.getDate() - (new Date).getDate();

      // calcula diferencia de fechas de entrega y hoy
      this.objVariables.Dif2 = (
        this.objVariables.Fecha2 === null || this.objVariables.Fecha2 === undefined
        ? 0
        : this.objVariables.Fecha2.getDate() - (new Date).getDate()
      );

      this.objVariables.DifDias = this.objVariables.Dif1 + this.objVariables.Dif2;

      this.objVariables.PuntosFE = (
        this.objVariables.DifDias > 21 ? 1.025   // Desperdicio 2.5% por OPs fechas 21 dias Adelanto
        : this.objVariables.DifDias > 15 ? 1.02  // Desperdicio 2.0% por OPs fechas 15 dias Adelanto
        : this.objVariables.DifDias > 7 ? 1.015  // Desperdicio 1.5% por OPs fechas 7 dias Adelanto
        : this.objVariables.DifDias > 2 ? 1.012  // Desperdicio 1.2% por OPs fechas 2 dias Adelanto
        : this.objVariables.DifDias <= 2 ? 1.01  // Desperdicio 1.0% por OPs fechas Atrasadas
        : 0
      );

      // Valuacion Dif. Fechas Entrega
      if (this.objVariables.Fecha2 === null || this.objVariables.Fecha2 === undefined) {
        this.objVariables.PuntosDifFE = 1.01;
      }
      else {
        this.objVariables.DifDias = Math.abs(
          // calcula diferencia de fechas de entrega entre OPs
          this.objVariables.Fecha1.getDate() - this.objVariables.Fecha2.getDate()
        );
        this.objVariables.PuntosDifFE = (
          this.objVariables.DifDias > 21 ? 1.02    // Desperdicio 2.0% por OPs fechas dif. de mas 21 dias
          : this.objVariables.DifDias > 15 ? 1.017 // Desperdicio 1.7% por OPs fechas dif. de 21 dias
          : this.objVariables.DifDias > 7 ? 1.015  // Desperdicio 1.5% por OPs fechas dif. de 15 dias
          : this.objVariables.DifDias > 2 ? 1.012  // Desperdicio 1.2% por OPs fechas dif. de 7 dias
          : this.objVariables.DifDias <= 2 ? 1.01  // Desperdicio 1.0% por OPs fechas dif. de 2 dias
          : 0
        );
      }

      // Valuacion Pedido Completo
      this.objVariables.Piezas1 = iterator.lam1 * iterator.multiplos1;
      this.objVariables.Piezas2 = (
        (iterator.lam2 === null || iterator.lam2 === undefined ? 0 : iterator.lam2) *
        (iterator.multiplos2 === null || iterator.multiplos2 === undefined ? 0 : iterator.multiplos2)
      )
      this.objVariables.Prod2 = null;
      this.objVariables.Estado2 = null;
      this.objVariables.Cliente2 = null;
      this.objVariables.Artic2 = null;
      this.objVariables.RestOP2 = null;

      if (this.objVariables.OP2 !== "" && this.objVariables.OP2 !== null && this.objVariables.OP2 !== undefined) {
        this.dtsFiltros.ordenProduccion = this.objVariables.OP2.trim();
        this.dtsOPAnalizando1 = await this.getOpAnalizando(this.dtsFiltros);
        for (const iterator of this.dtsOPAnalizando1) {
          this.objVariables.HOJAS2 = iterator.hojas;
          this.objVariables.Prod2 = iterator.lamina;
          this.objVariables.Cliente2 = iterator.cliente;
          this.objVariables.Artic2 = iterator.articulo;
          this.objVariables.RestOP2 = iterator.resistencia;
          this.objVariables.NSCOR2 = iterator.nScores;
        }

        this.objVariables.Estado2 = (
          this.objVariables.HOJAS2 === null || this.objVariables.HOJAS2 === undefined || this.objVariables.HOJAS2 === 0
          ? 0
          : (this.objVariables.Piezas2 / this.objVariables.HOJAS2 * 100) / 100
        );

        this.dtsFiltros.ordenProduccion = this.objVariables.OP1.trim();
        this.dtsOPAnalizando2 = await this.getOpAnalizando(this.dtsFiltros);
        for (const iterator of this.dtsOPAnalizando2) {
          this.objVariables.HOJAS1 = iterator.hojas;
          this.objVariables.Prod1 = iterator.lamina;
          this.objVariables.Cliente1 = iterator.cliente;
          this.objVariables.Artic1 = iterator.articulo;
          this.objVariables.RestOP1 = iterator.resistencia;
          this.objVariables.NScor1 = iterator.nScores;
        }
        this.objVariables.Estado1 = (
          (this.objVariables.Piezas1 / this.objVariables.HOJAS1 * 100) / 100
        );

        this.objVariables.PuntosCom = ( // Desperdicio 1.6% por OP completa y corre sola
          this.objVariables.Estado1 >= 0.96 && (this.objVariables.Estado2 === null || this.objVariables.Estado2 === undefined || this.objVariables.Estado2 === 0)
          ? 1.018 : null
        );
        this.objVariables.PuntosCom = ( // Desperdicio 1.8% por OP parcial y corre sola
          this.objVariables.Estado1 < 0.96 && (this.objVariables.Estado2 === null || this.objVariables.Estado2 === undefined || this.objVariables.Estado2 === 0)
          ? 1.02 : null
        );
        this.objVariables.PuntosCom = ( // Desperdicio 1.6% por OP completa,OP completa y corre combinada
          this.objVariables.Estado1 >= 0.96 && this.objVariables.Estado2 >= 0.96
          ? 1.014 : null
        );
        this.objVariables.PuntosCom = ( // Desperdicio 1.8% por OP completa,OP parcial y corre combinada
          this.objVariables.Estado1 >= 0.96 && this.objVariables.Estado2 < 0.96
          ? 1.016 : null
        );
        this.objVariables.PuntosCom = ( // Desperdicio 1.8% por OP parcial,OP completa y corre combinada
          this.objVariables.Estado1 < 0.96 && this.objVariables.Estado2 >= 0.96
          ? 1.017 : null
        );
        this.objVariables.PuntosCom = ( // Desperdicio 2.0% por OP parcial,OP parcial y corre combinada
          this.objVariables.Estado1 < 0.96 && this.objVariables.Estado2 < 0.96
          ? 1.02 : null
        );

        // Calcula Total de Puntos
        this.objVariables.TotalPuntos = (
          this.objVariables.PuntosArg * this.objVariables.PuntosFE *
          this.objVariables.PuntosDifFE * this.objVariables.PuntosCom === 0
          ? 0
          : ( // Calculo de puntuacion aplicando desperdicio
            (1 / this.objVariables.PuntosArg * this.objVariables.PuntosFE * this.objVariables.PuntosDifFE * this.objVariables.PuntosCom) * 1000
          )
        );

        this.objVariables.TotalPuntos = (
          // Verificar numero maximo de escores anular si revaza
          (this.objVariables.Mult1 * this.objVariables.NScor1) +
          (this.objVariables.Mult2 * this.objVariables.NSCOR2)
          > this.objVariables.ScoresMax
          ? 0 : null
        );

        // Grabacion del Arreglo valuado
        // PENDIENTE ACTUALIZAR DATOS
        //  UPDATE CPLDAT008 (TArreglosP) SET
        //     [Cliente1] = this.objVariables.Cliente1
        //     [Cliente2] = this.objVariables.Cliente2
        //     [Articulo1] = this.objVariables.Artic1
        //     [Articulo2] = this.objVariables.Artic2
        //     [Producto1] = this.objVariables.Prod1
        //     [Producto2] = this.objVariables.Prod2
        //     [Parcial1] = this.objVariables.Estado1 * 100
        //     [Parcial2] = this.objVariables.Estado2 * 100
        //     [Puntos] = this.objVariables.TotalPuntos
        //     [Rest1] = this.objVariables.RestOP1
        //     [Rest2] = this.objVariables.RestOP2
        //   WHERE [Id] = iterator.id

      }
    }
  }

  // Metodos utilizados solo para evitar continuar
  brincaOPrioridadOP2(): void { }
  brincaMismaOP(): void { }
  salirValuacionArreglos(): void { }

  // ===============================================================================================================
  // programaPedidosMaximos
  async programaPedidosMaximos(): Promise<void> {
    await this.limpiarObjVariables();
    for (let index = 0; index < 30; index++) {
      this.objVariables.AnchoPapel.push({ value01: -1, value02: -1, value03: -1 });
    }

    // Modulo que Calcula posibles combinaciones de Carton escogiendo las mejores

    this.dtsDatosOps = await this.getDatosOps();
    if (this.dtsDatosOps.length === 0) {
      Swal.fire({
        title: 'Información',
        html: 'No existen OPs a programar...',
        icon: 'info'
      });
      return;
    }

    this.objVariables.Ide = 0;
    // Borrar Datos Arreglos Optimos
    // PENDIENTE DELETE FROM CPLDAT009 (TArreglosO)

    this.dtsTParametros = await this.getParametros();

    if (this.dtsTParametros.length > 0) {
      const hoy = new Date;
      this.objVariables.Recalculo = 200;
      this.objVariables.RefileMax = this.dtsTParametros[0].refileMaximo / 10;
      this.objVariables.RefileMin = this.dtsTParametros[0].refileMinimo / 10;
      this.objVariables.DiasAdelanto = this.dtsTParametros[0].diasAdelanto;
      this.objVariables.FechaLimite = new Date(hoy.setDate(hoy.getDate() + this.objVariables.DiasAdelanto));
      this.objVariables.TodosAnchos = this.dtsTParametros[0].todosAnchos;
      this.objVariables.AnchoCalculo = this.dtsTParametros[0].anchoCalculo;
      this.objVariables.LargoMinimo = this.dtsTParametros[0].largoMinimo;
      this.objVariables.ScoresMax = this.dtsTParametros[0].scores;
      this.objVariables.opprior = 0
    }

    if (!this.objVariables.TodosAnchos) {
      this.objVariables.AnchoPapel[0].value01 = this.objVariables.AnchoCalculo;
      this.objVariables.ClvRest = this.dtsDatosOps[0].resistencia;
      this.objVariables.Verif = 1;
      this.brincaAnchosdePapel(this.dtsDatosOps);
      return;
    }

    // Carga Anchos
    this.objVariables.Verif = 0
    this.dtsFiltros.usar = -1;
    this.dtsTAnchosUsar = await this.getAnchosUsar(this.dtsFiltros);
    if (this.dtsTAnchosUsar.length === 0) {
      // Si no trae información de anchos a usar, salir
      return;
    }

    this.objVariables.AnchoPapel[0].value01 = 0;
    for (const iterator of this.dtsTAnchosUsar) {
      this.objVariables.AnchoComb = iterator.ancho;
      this.objVariables.Usar = iterator.usar;
      for (this.objVariables.X = 0; this.objVariables.X < this.objVariables.Verif; this.objVariables.X++) {
        const elementAnchoPapel = this.objVariables.AnchoPapel[this.objVariables.X];

        if (elementAnchoPapel.value01 === this.objVariables.AnchoComb || !this.objVariables.Usar) {
          break;
        }
        else {
          elementAnchoPapel.value01 = this.objVariables.AnchoComb;
          this.objVariables.Verif += 1;
        }
      }

    }


  }

  async brincaAnchosdePapel(elementOP: DatosOps []): Promise<void> {
    // Inicio Recalculo
    for (this.objVariables.NoRecalculos = 0; this.objVariables.NoRecalculos < this.objVariables.Recalculo; this.objVariables.NoRecalculos++) {
      // const element = array[this.objVariables.NoRecalculos];

      this.dtsPuntosMax = await this.getPuntosMaxArreglosPosibles();
      if (this.dtsPuntosMax.length === 0) {
        break;
      }
      if (this.dtsPuntosMax[0].puntosMax === null || this.dtsPuntosMax[0].puntosMax === undefined) {
        break;
      }

      this.objVariables.valormax = this.dtsPuntosMax[0].puntosMax;

      if (this.objVariables.valormax < -200) {
        break;
      }

      // Busca el Arreglo Con mayor puntacion
      this.dtsFiltros.puntosMax = this.objVariables.valormax;
      this.dtsArreglosPosibles = await this.getArreglosPosibles(this.dtsFiltros);
      if (this.dtsArreglosPosibles.length > 0) {
        this.objVariables.OP1 = this.dtsArreglosPosibles[0].op1.trim();
        this.objVariables.OP2 = this.dtsArreglosPosibles[0].op2.trim();
        this.objVariables.NPROG1 = this.dtsArreglosPosibles[0].lam1 * this.dtsArreglosPosibles[0].multiplos1;
        this.objVariables.NPROG2 = (
          this.dtsArreglosPosibles[0].lam2 === null || this.dtsArreglosPosibles[0].lam2 === undefined ? 0 : this.dtsArreglosPosibles[0].lam2
          *
          this.dtsArreglosPosibles[0].multiplos2 === null || this.dtsArreglosPosibles[0].multiplos2 === undefined ? 0 : this.dtsArreglosPosibles[0].multiplos2
        );
      }


      // SQLFields = "[ID], [OP1], [Fecha1], [Multiplos1], [Ancho1], [Largo1], "
      //       "[Lam1], [Piezas1], [OP2], [Fecha2], [Multiplos2], [Ancho2], [Largo2], "
      //       "[Lam2], [Piezas2], [OP3], [Fecha3], [Multiplos3], [Ancho3], [Largo3], [Lam3],"
      //       "[Piezas3], [Ancho Total], [Ancho Papel], [Refile], [Metros Lineales], [Producto1],"
      //       "[Producto2], [Producto3], [Parcial1], [Parcial2], [Parcial3], [Puntos], "
      //       "[Resistencia], [Flauta], [Tranf], [Empate], [Cliente1], [Articulo1], "
      //       "[Cliente2], [Articulo2], [Cliente3], [Articulo3], [Rest1], [Rest2], "
      //       "[Rest3], ConScore, AnchoStd"


      // Aqui la consulta del AnchoSTD
      this.objVariables.AnchoSTD = "";
      this.dtsFiltros.ordenProduccion = this.objVariables.OP1;
      this.dtsAnchoSTD = await this.getAnchoSTD(this.dtsFiltros);
      this.objVariables.AnchoSTD += (
        this.dtsAnchoSTD.length > 0 ? "'" + this.dtsAnchoSTD[0].anchoStd.trim() + "'" : "0"
      );
      // Aqui termina la consulta del AnchoSTD


      // PENDIENTE INSERTAR VALORES A CPLDAT009 (TArreglosO)
      // [ID]               = this.objVariables.NoRecalculos
      // [OP1]              = this.dtsArreglosPosibles[0].op1
      // [Fecha1]           = this.dtsArreglosPosibles[0].fecha1
      // [Multiplos1]       = this.dtsArreglosPosibles[0].multiplos1
      // [Ancho1]           = this.dtsArreglosPosibles[0].ancho1
      // [Largo1]           = this.dtsArreglosPosibles[0].largo1
      // [Lam1]             = this.dtsArreglosPosibles[0].lam1
      // [Piezas1]          = this.dtsArreglosPosibles[0].piezas1
      // [OP2]              = this.dtsArreglosPosibles[0].op2
      // [Fecha2]           = this.dtsArreglosPosibles[0].fecha2
      // [Multiplos2]       = this.dtsArreglosPosibles[0].multiplos2
      // [Ancho2]           = this.dtsArreglosPosibles[0].ancho2
      // [Largo2]           = this.dtsArreglosPosibles[0].largo2
      // [Lam2]             = this.dtsArreglosPosibles[0].lam2
      // [Piezas2]          = this.dtsArreglosPosibles[0].piezas2
      // [OP3]              = NULL
      // [Fecha3]           = NULL
      // [Multiplos3]       = 0
      // [Ancho3]           = 0
      // [Largo3]           = 0
      // [Lam3]             = 0
      // [Piezas3]          = 0
      // [Ancho Total]      = this.dtsArreglosPosibles[0].anchoTotal
      // [Ancho Papel]      = this.dtsArreglosPosibles[0].anchoPapel
      // [Refile]           = this.dtsArreglosPosibles[0].refile
      // [Metros Lineales]  = this.dtsArreglosPosibles[0].metrosLineales
      // [Producto1]        = this.dtsArreglosPosibles[0].producto1
      // [Producto2]        = this.dtsArreglosPosibles[0].producto2
      // [Producto3]        = NULL
      // [Parcial1]         = this.dtsArreglosPosibles[0].parcial1
      // [Parcial2]         = this.dtsArreglosPosibles[0].parcial2
      // [Parcial3]         = this.dtsArreglosPosibles[0].parcial3
      // [Puntos]           = this.dtsArreglosPosibles[0].puntos
      // [Resistencia]      = this.dtsArreglosPosibles[0].resistencia
      // [Flauta]           = this.dtsArreglosPosibles[0].flauta
      // [Tranf]            = 0
      // [Empate]           = this.dtsArreglosPosibles[0].empate
      // [Cliente1]         = this.dtsArreglosPosibles[0].cliente1
      // [Articulo1]        = this.dtsArreglosPosibles[0].articulo1
      // [Cliente2]         = this.dtsArreglosPosibles[0].cliente2
      // [Articulo2]        = this.dtsArreglosPosibles[0].articulo2
      // [Cliente3]         = NULL
      // [Articulo3]        = NULL
      // [Rest1]            = this.dtsArreglosPosibles[0].rest1
      // [Rest2]            = this.dtsArreglosPosibles[0].rest2
      // [Rest3]            = NULL
      // ConScore           = (this.dtsArreglosPosibles[0].conScore ? 1 : 0)
      // AnchoStd           = this.objVariables.AnchoSTD


      // Realiza anotacion de hojas programadas
      this.dtsFiltros.ordenProduccion = this.objVariables.OP1;
      this.dtsRecs = await this.getHojasProgramadas(this.dtsFiltros);
      if (this.dtsRecs.length > 0) {
        this.objVariables.Mas1 = this.dtsRecs[0].mas;
        this.objVariables.TOTAL1 = (
          this.dtsRecs[0].hojasProg === null || this.dtsRecs[0].hojasProg === undefined ? 0 : this.dtsRecs[0].hojasProg
        );
        this.objVariables.HOJAS1 = this.dtsRecs[0].hojas;

        // PENDIENTE ACTUALIZAR CPLDAT005 (TOpReanalizando) WHERE [Orden Produccion] = this.objVariables.OP1
        // (this.objVariables.HOJAS1 - this.objVariables.NPROG1 / (1 + this.objVariables.Mas1 / 100))  // [Hojas]
        // this.objVariables.TOTAL1 + this.objVariables.NPROG1                                         // [Hojas Prog]

      }

      this.dtsFiltros.ordenProduccion = this.objVariables.OP2;
      this.dtsRecs = await this.getHojasProgramadas(this.dtsFiltros);
      if (this.dtsRecs.length > 0) {
        this.objVariables.Mas2 = this.dtsRecs[0].mas;
        this.objVariables.TOTAL2 = this.dtsRecs[0].hojasProg;
        this.objVariables.HOJAS2 = this.dtsRecs[0].hojas;

        // PENDIENTE ACTUALIZAR CPLDAT005 (TOpReanalizando) WHERE [Orden Produccion] = this.objVariables.OP2
        // (this.objVariables.HOJAS2 - this.objVariables.NPROG2 / (1 + this.objVariables.Mas2 / 100))  // [Hojas]
        // this.objVariables.TOTAL2 + this.objVariables.NPROG2                                         // [Hojas Prog]
      }

      // Borrar Datos Arreglos
      // PENDIENTE BORRAR TArreglosP
      // Delete from CPLDAT008

      // Iniciar Datos
      this.objVariables.RESISTENCIA = elementOP[0].resistencia;
      this.objVariables.SENCILLO = this.objVariables.RESISTENCIA.substring(0, 1);
      for (let index = 0; index < 500; index++) {
        this.objVariables.Opp.push({
          value01: null, value02: null, value03: null, value04: null, value05: null, value06: null, value07: null,
          value08: null, value09: null, value10: null, value11: null, value12: null, value13: null
        });
      }
      this.objVariables.CONT = 0;
      this.objVariables.PRIORIDAD = 0;

      this.dtsFiltros.ordenProduccion = "";
      this.dtsRecs = await this.getHojasProgramadas(this.dtsFiltros);
      for (const iteratorOPR of this.dtsRecs) {
        this.objVariables.Lamin = iteratorOPR.lamina;
        this.objVariables.FechaE = iteratorOPR.fechaEntrega;
        this.objVariables.Hojas = iteratorOPR.hojas;
        this.objVariables.MasP = iteratorOPR.mas;
        if (this.objVariables.FechaE >= this.objVariables.FechaLimite) {
          this.brincaOPPendiente();
        }
        else {
          if (this.objVariables.Hojas <= 0) {
            this.brincaOPPendiente();
          }
          else {
            // Inicia regrabacion de datos en la matriz
            this.objVariables.Opp[this.objVariables.CONT].value01 = iteratorOPR.ordenProduccion;
            this.objVariables.Opp[this.objVariables.CONT].value02 = iteratorOPR.ancho;
            this.objVariables.Opp[this.objVariables.CONT].value03 = iteratorOPR.largo;
            this.objVariables.Opp[this.objVariables.CONT].value04 = iteratorOPR.hojas * (1 + iteratorOPR.mas / 100);
            this.objVariables.Opp[this.objVariables.CONT].value05 = this.objVariables.Lamin;
            this.objVariables.Opp[this.objVariables.CONT].value06 = iteratorOPR.fechaEntrega;
            this.objVariables.Opp[this.objVariables.CONT].value07 = iteratorOPR.flauta;
            this.objVariables.Opp[this.objVariables.CONT].value08 = iteratorOPR.piezas;
            this.objVariables.Opp[this.objVariables.CONT].value09 = iteratorOPR.refile;
            this.objVariables.Opp[this.objVariables.CONT].value10 = 0;
            this.objVariables.Opp[this.objVariables.CONT].value11 = iteratorOPR.prior;
            this.objVariables.Opp[this.objVariables.CONT].value12 = (iteratorOPR.conScore ? 1 : 0);
            this.objVariables.Opp[this.objVariables.CONT].value13 = iteratorOPR.nScores;
            this.objVariables.CONT += 1;
            if (iteratorOPR.prior) {
              this.objVariables.PRIORIDAD = -1;
              this.objVariables.opprior = -1;
            }
          }
        }
      }

      if (this.objVariables.PRIORIDAD === 0 && this.objVariables.opprior === -1) {
        // salirCalcularProgramas
        return;
      }

      // Combinacion de Pedidos
      for (this.objVariables.NOANCHOS = 0; this.objVariables.NOANCHOS < this.objVariables.Verif; this.objVariables.NOANCHOS++) { // Bucle de Anchos de Papel de 1 hasta Verif = Total
        const elementAnchoPapel = this.objVariables.AnchoPapel[this.objVariables.NOANCHOS];

        for (let index = 0; index < 15000; index++) {
          this.objVariables.Cm.push({
            value01: null, value02: null, value03: null, value04: null, value05: null, value06: null, value07: null, value08: null,
            value09: null, value10: null, value11: null, value12: null, value13: null, value14: null, value15: null, value16: null,
            value17: null, value18: null, value19: null, value20: null, value21: null, value22: null, value23: null
          }); // Inicia matris que contendra todas los arreglos posibles
        }

        elementAnchoPapel.value02 = elementAnchoPapel.value01 - this.objVariables.RefileMin;
        elementAnchoPapel.value03 = elementAnchoPapel.value01 - this.objVariables.RefileMin / 2;

        this.objVariables.CONT2 = 0;
        if (this.objVariables.Opp[0].value01.length === 1) {
          this.objVariables.SENCILLO = "S";
        }

        // Bucle de OPs de 1 hasta Cont = Total OPs Participantes
        for (this.objVariables.i = 0; this.objVariables.i < this.objVariables.CONT; this.objVariables.i++) {
          const elementOpp = this.objVariables.Opp[this.objVariables.i];

          this.objVariables.Z1 = ( !elementOpp.value09 ? 1 : 2 );
          this.objVariables.XREFILE = ( !elementOpp.value09 ? 0 : this.objVariables.RefileMin );
          this.objVariables.ANCHO1 = elementOpp.value02;
          this.objVariables.Tantos = (
            this.objVariables.Z1 === 1 ? elementAnchoPapel.value01 : (this.objVariables.Z1 === 2 ? elementAnchoPapel.value02 : 0)
            / this.objVariables.ANCHO1
          );
          this.objVariables.Refile = (
            this.objVariables.Z1 === 1 ? elementAnchoPapel.value01 : (this.objVariables.Z1 === 2 ? elementAnchoPapel.value02 : 0)
            - (this.objVariables.Tantos * this.objVariables.ANCHO1)
          );
          this.objVariables.MLinea = (
            this.objVariables.Tantos === 0 ? 0 : (elementOpp.value04 / this.objVariables.Tantos) * elementOpp.value03
          );

          // Combina Solo
          if (this.objVariables.PRIORIDAD === -1 && !elementOpp.value11) {
            await this.brinacaOPriodidadOP1(elementAnchoPapel, elementOpp);
          }
          else {
            if (this.objVariables.MLinea < (this.objVariables.LargoMinimo * 100)) {
              this.objVariables.Refile = 1000;
            }

            // Si los parametros se cumplen carga matriz de arreglo posible
            if ((this.objVariables.RefileMax - this.objVariables.RefileMin) >= this.objVariables.Refile) {
              this.objVariables.Cm[this.objVariables.CONT2].value01 = elementOpp.value01;
              this.objVariables.Cm[this.objVariables.CONT2].value02 = this.objVariables.Tantos;
              this.objVariables.Cm[this.objVariables.CONT2].value03 = this.objVariables.ANCHO1;
              this.objVariables.Cm[this.objVariables.CONT2].value07 = (this.objVariables.Tantos * this.objVariables.ANCHO1);
              this.objVariables.Cm[this.objVariables.CONT2].value08 = this.objVariables.Refile;
              this.objVariables.Cm[this.objVariables.CONT2].value20 = this.objVariables.XREFILE;
              this.objVariables.Cm[this.objVariables.CONT2].value21 = elementOpp.value12; // Score

              this.objVariables.Cm[this.objVariables.CONT2].value09 = this.objVariables.MLinea / elementOpp.value03;
              this.objVariables.Cm[this.objVariables.CONT2].value11 = this.objVariables.MLinea;
              this.objVariables.Cm[this.objVariables.CONT2].value12 = elementOpp.value06;
              this.objVariables.Cm[this.objVariables.CONT2].value14 = elementOpp.value03;
              this.objVariables.Cm[this.objVariables.CONT2].value16 = elementOpp.value07;
              this.objVariables.Cm[this.objVariables.CONT2].value17 = (this.objVariables.MLinea / elementOpp.value03) * elementOpp.value08 * this.objVariables.Tantos;

              this.objVariables.CONT2 += 1;
            }
          }
        }

        // Graba Informacion
        // PENDIENTE GUARDAR DATOS
        // For X = 1 To CONT2
        //   Ide = Ide + 1
        //   SQLFields = "[ID], [OP1], [Fecha1], [Multiplos1], [Ancho1], [Largo1], " & _
        //       "[Lam1], [Piezas1], [OP2], [Fecha2], [Multiplos2], [Ancho2], [Largo2]," & _
        //       "[Lam2], [Piezas2], [OP3], [Fecha3], [Multiplos3], [Ancho3], [Largo3]," & _
        //       "[Lam3], [Piezas3], [Ancho Total], [Ancho Papel], [Refile]," & _
        //       "[Metros Lineales], [Producto1], [Producto2], [Producto3], " & _
        //       "[Parcial1], [Parcial2], [Parcial3], [Puntos], [Resistencia], " & _
        //       "[Flauta], [Tranf], [Cliente1], [Articulo1], [Cliente2], [Articulo2], " & _
        //       "[Cliente3], [Articulo3], [Empate], [Marca], [Rest1], [Rest2],[ConScore]," & _
        //       "[ConScore2],[ConScore3] "
        //   SQLValues = Str(Ide) + ", '" + CStr(Cm(X, 1)) + "', '" + Format(Cm(X, 12), "yyyymmdd") + "', " + CStr(Cm(X, 2)) + ", "
        //               '  [ID],               [OP1],                            [Fecha1],                     [Multiplos1],
        //   SQLValues = SQLValues + CStr(Cm(X, 3)) + ", " + CStr(Cm(X, 14)) + ", " + CStr(Cm(X, 9)) + ", " + CStr(Cm(X, 17)) + ", "
        //                             '[Ancho1],                 [Largo1],                [Lam1],                 [Piezas1],
        //   SQLValues = SQLValues + "'" + CStr(OnEmpty(Cm(X, 4), "")) + "', '" + Format(Cm(X, 13), "yyyymmdd") + "', " + CStr(OnEmpty(Cm(X, 5), "0")) + ", "
        //                                             '[OP2],                              [Fecha2],                                [Multiplos2],
        //   SQLValues = SQLValues + CStr(OnEmpty(Cm(X, 6), "0")) + ",     " + CStr(OnEmpty(Cm(X, 15), "0")) + ", " + CStr(OnEmpty(Cm(X, 10), "0")) + ", " + CStr(OnEmpty(Cm(X, 18), "0")) + ", "
        //                                       '[Ancho2],                              [Largo2],                             [Lam2],                                    [Piezas2],
        //   SQLValues = SQLValues + "null,     null,        0,         0,        0,      0,       0," + CStr(Cm(X, 7)) + ", " + CStr(AnchoPapel(NOANCHOS, 1)) + ", "
        //                           '[OP3], [Fecha3], [Multiplos3], [Ancho3], [Largo3], [Lam3], [Piezas3], [Ancho Total],                     [Ancho Papel],
        //   SQLValues = SQLValues + CStr((AnchoPapel(NOANCHOS, 1) - Cm(X, 7)) * 10) + ", " + CStr(Cm(X, 11) / 100) + ",   null,         null,       null,       0,      0,            0, "
        //                                           '[Refile],                      [Metros Lineales],  [Producto1], [Producto2], [Producto3], [Parcial1], [Parcial2],     [Parcial3],
        //   SQLValues = SQLValues + "   0, '" + CStr(RESISTENCIA) + "', '" + CStr(Cm(X, 16)) + "', 0,       null,         null,      null,       null,         null,         null, "
        //                         '[Puntos],      [RESISTENCIA],                [Flauta],      [Tranf], [Cliente1], [Articulo1], [Cliente2], [Articulo2], [Cliente3], [Articulo3],
        //   SQLValues = SQLValues + "'" + CStr(OnEmpty(Cm(X, 19), "")) + "',   0,     null,    null," & _
        //   IIf(Trim(Cm(X, 21)) = "", 0, Trim(Cm(X, 21))) & ", " & IIf(Trim(Cm(X, 22)) = "", 0, Trim(Cm(X, 22))) & ",0"
        //                                       ' [Empate],               [Marca], [Rest1], [Rest2]
        //   SQLInsert = "Insert into " + TArreglosP + " (" + SQLFields + ") values(" + SQLValues + ")"
        //   Conexion.Execute SQLInsert
        //   'LUIS F. OSUNA 31125 08/05/20009
        //   'Se cambio el calculo del refile
        //   'Anterior:CStr((Cm(X, 8) + Cm(X, 20)) * 10)
        //   '   Nuevo:CStr((AnchoPapel(NOANCHOS, 1) - Cm(X, 7)) * 10)
        // Next X
      }

      // Revaluacion Arreglos
      this.dtsFiltros.puntosMax = -1;
      this.dtsArreglosPosiblesRevaluacion = await this.getArreglosPosibles(this.dtsFiltros);

      for (const iteratorRevaluacion of this.dtsArreglosPosiblesRevaluacion) {
        this.objVariables.OP1 = iteratorRevaluacion.op1;
        this.objVariables.OP2 = iteratorRevaluacion.op2;
        this.objVariables.AnchoUtil = iteratorRevaluacion.anchoTotal;
        this.objVariables.AnchoPapl = iteratorRevaluacion.anchoPapel;
        this.objVariables.MetrosLin = iteratorRevaluacion.metrosLineales;
        this.objVariables.Mult1 = iteratorRevaluacion.multiplos1;
        this.objVariables.Mult2 = (
          iteratorRevaluacion.multiplos2 !== null && iteratorRevaluacion.multiplos2 !== undefined ? iteratorRevaluacion.multiplos2 : 0
        )

        // Materia Prima
        // Valor de Materia Prima a 5$/kg
        this.objVariables.MatPrim = this.objVariables.AnchoPapl * this.objVariables.MetrosLin / 100 * 5 + this.objVariables.AnchoPapl * 25 / 100 * 5;
        // Valor de Mano obra a 10% de Materia Prima
        this.objVariables.ManoObr = this.objVariables.MetrosLin * 0.5 + 100;
        // Valor costo primo
        this.objVariables.CostoArg = this.objVariables.MatPrim + this.objVariables.ManoObr;
        // Total metros cuadrados
        this.objVariables.M2Netos = this.objVariables.AnchoUtil * this.objVariables.MetrosLin / 100;
        // Conversion a Indice dividiendo entre a 5$/kg
        this.objVariables.PuntosArg = (this.objVariables.CostoArg / this.objVariables.M2Netos) / 5

        // Valuacion Fecha Entrega
        this.objVariables.Fecha1 = iteratorRevaluacion.fecha1;
        this.objVariables.Fecha2 = iteratorRevaluacion.fecha2;
        this.objVariables.Dif1 = this.objVariables.Fecha1.getDate() - (new Date()).getDate();
        this.objVariables.Dif2 = ( // calcula diferencia de fechas de entrega y hoy
          this.objVariables.Fecha2 !== null && this.objVariables.Fecha2 !== undefined ? this.objVariables.Fecha2.getDate() - (new Date()).getDate() : 0
        );
        this.objVariables.DifDias = this.objVariables.Dif1 + this.objVariables.Dif2;
        this.objVariables.PuntosFE = (
          this.objVariables.DifDias > 21 ? 1.025  // Desperdicio 2.5% por OPs fechas 21 dias Adelanto
          : this.objVariables.DifDias > 15 ? 1.02 // Desperdicio 2.0% por OPs fechas 15 dias Adelanto
          : this.objVariables.DifDias > 7 ? 1.015 // Desperdicio 1.5% por OPs fechas 7 dias Adelanto
          : this.objVariables.DifDias > 2 ? 1.012 // Desperdicio 1.2% por OPs fechas 2 dias Adelanto
          : this.objVariables.DifDias <= 2 ? 1.01 // Desperdicio 1.0% por OPs fechas Atrasadas
          : this.objVariables.PuntosFE            // Caso contrario queda igual
        );

        // Valuacion Dif. Fechas Entrega
        if (this.objVariables.Fecha2 === null || this.objVariables.Fecha2 === undefined) {
          this.objVariables.PuntosDifFE = 1.01;
          this.saltaDiferenciaFecha(iteratorRevaluacion);
        }
        else {
          // Calcula diferencia de fechas de entrega entre OPs
          this.objVariables.DifDias = Math.abs(this.objVariables.Fecha1.getDate() - this.objVariables.Fecha2.getDate());
          this.objVariables.PuntosDifFE = (
            this.objVariables.DifDias > 21 ? 1.02     // Desperdicio 2.0% por OPs fechas dif. de mas 21 dias
            : this.objVariables.DifDias > 15 ? 1.017  // Desperdicio 1.7% por OPs fechas dif. de 21 dias
            : this.objVariables.DifDias > 7 ? 1.015   // Desperdicio 1.5% por OPs fechas dif. de 15 dias
            : this.objVariables.DifDias > 2 ? 1.012   // Desperdicio 1.2% por OPs fechas dif. de 7 dias
            : this.objVariables.DifDias <= 2 ? 1.01   // Desperdicio 1.0% por OPs fechas dif. de 2 dias
            : this.objVariables.PuntosDifFE           // Caso contrario queda igual
          );
          this.saltaDiferenciaFecha(iteratorRevaluacion);
        }
      }
    }
  }

  saltaDiferenciaFecha(iteratorRevaluacion: CPLDAT008ArreglosPosibles): void {
    // Valuacion Pedido Completo
    this.objVariables.Piezas1 = iteratorRevaluacion.lam1 * iteratorRevaluacion.multiplos1;
    this.objVariables.Piezas2 = (
      iteratorRevaluacion.lam2 === null || iteratorRevaluacion.lam2 === undefined ? 0 : iteratorRevaluacion.lam2
    ) * (
      iteratorRevaluacion.multiplos2 === null || iteratorRevaluacion.multiplos2 === undefined ? 0 : iteratorRevaluacion.multiplos2
    );
    this.objVariables.Prod2 = null;
    this.objVariables.Estado2 = 0;
    this.objVariables.Cliente2 = null;
    this.objVariables.Artic2 = null;
    this.objVariables.RestOP2 = null;

    if (this.objVariables.OP2.trim() === "") {
      this.objVariables.Estado2 = 0;
      // AQUI VOY
      // this.saltaPedidoCompleto();
    }
  }

  brincaOPPendiente(): void { }
  async brinacaOPriodidadOP1(elementAnchoPapel: AnchoPapelEntity, elementOppI: OppEntity): Promise<void> {
    // Bucle Inverso de Tantos = anchos de hoja en ancho de papel
    for (this.objVariables.k = this.objVariables.Tantos; this.objVariables.k >= 0; this.objVariables.k--) {
      // Inicia Combinacion con la siguente OP
      for (this.objVariables.J = this.objVariables.i; this.objVariables.J < this.objVariables.CONT; this.objVariables.J++) {
        const elementOppJ = this.objVariables.Opp[this.objVariables.J];

        if (elementOppI.value01 === elementOppJ.value01) {
          this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
        }
        else {
          this.objVariables.z2 = ( !elementOppI.value09 && elementOppJ.value09 ? 3 : 2 );
          this.objVariables.XREFILE = ( !elementOppI.value09 && elementOppJ.value09 ? this.objVariables.RefileMin / 2 : this.objVariables.RefileMin );

          if (elementOppI.value09 && !elementOppJ.value09) {
            this.objVariables.z2 = 3;
            this.objVariables.XREFILE = this.objVariables.RefileMin / 2;
          }
          if (!elementOppI.value09 && !elementOppJ.value09) {
            this.objVariables.z2 = 1;
            this.objVariables.XREFILE = 0;
          }

          if (Number(elementOppI.value01.substring(0, 5)) > Number(elementOppJ.value01.substring(0, 5))) {
            this.objVariables.Herm1 = elementOppJ.value01;
            this.objVariables.Herm2 = elementOppI.value01;
          }
          else {
            this.objVariables.Herm1 = elementOppI.value01;
            this.objVariables.Herm2 = elementOppJ.value01;
          }

          // Verificaciones para que no se programe la misma OP
          if (this.objVariables.SENCILLO === "S" && elementOppI.value07 !== elementOppJ.value07) {
            this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
          }
          else {
            this.objVariables.Ancho2 = elementOppJ.value02;
            this.objVariables.Tantos2 = (
              (
                (this.objVariables.z2 === 1 ? elementAnchoPapel.value01 : this.objVariables.z2 === 2 ? elementAnchoPapel.value02 : this.objVariables.z2 === 3 ? elementAnchoPapel.value03 : 0)
                - this.objVariables.ANCHO1 * this.objVariables.k
              ) / this.objVariables.Ancho2
            );

            if (this.objVariables.Tantos2 === 0) {
              this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
            }
            else {
              for (this.objVariables.M = this.objVariables.Tantos2; this.objVariables.M >= 0; this.objVariables.M--) {
                // Valida que las OPs que se combinen no superen los 3.07 mts. ya que en planta Tijuana la mesa de recibo es de esta medida.
                if (this.dtsFiltros.zona === '02' && elementOppI.value03 > 307 && elementOppJ.value03 > 307) {
                  this.brincaMismaOP(); // Metodo utilizado solo para evitar continuar
                  break;
                }

                this.objVariables.Refile2 = (
                  (this.objVariables.z2 === 1 ? elementAnchoPapel.value01 : this.objVariables.z2 === 2 ? elementAnchoPapel.value02 : this.objVariables.z2 === 3 ? elementAnchoPapel.value03 : 0)
                  - ((this.objVariables.k * this.objVariables.ANCHO1) + (this.objVariables.M * this.objVariables.Ancho2))
                );
                if (this.objVariables.M === 0) {
                  this.objVariables.MLinea = 0;
                }
                else {
                  this.objVariables.MLinea = (elementOppI.value04 / this.objVariables.k) * elementOppI.value03;
                  this.objVariables.MLinea2 = (elementOppJ.value04 / this.objVariables.M) * elementOppJ.value03;
                }

                this.objVariables.TMLinea = (
                  this.objVariables.MLinea2 > this.objVariables.MLinea ? this.objVariables.MLinea : this.objVariables.MLinea2
                );

                // Si los Metros lineales menor a minimo anula refile
                if (this.objVariables.TMLinea < this.objVariables.LargoMinimo) {
                  this.objVariables.Refile2 = 1000;
                }

                this.objVariables.UnaPrior = ( elementOppI.value11 || elementOppJ.value11 ? -1 : 0 );
                if (this.objVariables.PRIORIDAD === -1 && this.objVariables.UnaPrior === 0) {
                  this.brincaOPrioridadOP2(); // Metodo utilizado solo para evitar continuar
                }
                else {
                  if (this.objVariables.RefileMax - this.objVariables.RefileMin >= this.objVariables.Refile2) {
                    this.objVariables.Cm[this.objVariables.CONT2].value01 = elementOppI.value01;
                    this.objVariables.Cm[this.objVariables.CONT2].value02 = this.objVariables.k;
                    this.objVariables.Cm[this.objVariables.CONT2].value03 = this.objVariables.ANCHO1;
                    this.objVariables.Cm[this.objVariables.CONT2].value04 = elementOppJ.value01;
                    this.objVariables.Cm[this.objVariables.CONT2].value05 = this.objVariables.M;
                    this.objVariables.Cm[this.objVariables.CONT2].value06 = this.objVariables.Ancho2;
                    this.objVariables.Cm[this.objVariables.CONT2].value07 = (this.objVariables.k * this.objVariables.ANCHO1) + (this.objVariables.M * this.objVariables.Ancho2);
                    this.objVariables.Cm[this.objVariables.CONT2].value08 = this.objVariables.Refile2;
                    this.objVariables.Cm[this.objVariables.CONT2].value19 = this.objVariables.Herm1.trim() + " " + this.objVariables.Herm2.trim();
                    this.objVariables.Cm[this.objVariables.CONT2].value20 = this.objVariables.XREFILE;
                    this.objVariables.Cm[this.objVariables.CONT2].value22 = elementOppJ.value12;

                    this.objVariables.Cm[this.objVariables.CONT2].value09 = this.objVariables.TMLinea / elementOppI.value03;
                    this.objVariables.Cm[this.objVariables.CONT2].value10 = this.objVariables.TMLinea / elementOppJ.value03;
                    this.objVariables.Cm[this.objVariables.CONT2].value11 = this.objVariables.TMLinea;
                    this.objVariables.Cm[this.objVariables.CONT2].value12 = elementOppI.value06;
                    this.objVariables.Cm[this.objVariables.CONT2].value13 = elementOppJ.value06;
                    this.objVariables.Cm[this.objVariables.CONT2].value14 = elementOppI.value03;
                    this.objVariables.Cm[this.objVariables.CONT2].value15 = elementOppJ.value03;
                    this.objVariables.Cm[this.objVariables.CONT2].value16 = elementOppJ.value07;
                    this.objVariables.Cm[this.objVariables.CONT2].value17 = (this.objVariables.TMLinea / elementOppI.value03) * elementOppI.value08 * this.objVariables.k;
                    this.objVariables.Cm[this.objVariables.CONT2].value18 = (this.objVariables.TMLinea / elementOppJ.value03) * elementOppJ.value08 * this.objVariables.M;

                    this.objVariables.CONT2 += 1;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // ===============================================================================================================

  async limpiarObjVariables(): Promise<void> {
    this.objVariables.Ide = null;
    this.objVariables.RefileMax = null;
    this.objVariables.RefileMin = null;
    this.objVariables.DiasAdelanto = null;
    this.objVariables.FechaLimite = null;
    this.objVariables.TodosAnchos = null;
    this.objVariables.AnchoCalculo = null;
    this.objVariables.LargoMinimo = null;
    this.objVariables.ScoresMax = null;
    this.objVariables.Verif = null;
    this.objVariables.AnchoComb = null;
    this.objVariables.Usar = null;
    this.objVariables.RESISTENCIA = null;
    this.objVariables.Lamin = null;
    this.objVariables.FechaE = null;
    this.objVariables.CONT = null;
    this.objVariables.PRIORIDAD = null;
    this.objVariables.NOANCHOS = null;
    this.objVariables.CONT2 = null;
    this.objVariables.SENCILLO = null;
    this.objVariables.i = null;
    this.objVariables.Z1 = null;
    this.objVariables.XREFILE = null;
    this.objVariables.ANCHO1 = null;
    this.objVariables.Tantos = null;
    this.objVariables.Refile = null;
    this.objVariables.MLinea = null;
    this.objVariables.k = null;
    this.objVariables.J = null;
    this.objVariables.z2 = null;
    this.objVariables.Herm1 = null;
    this.objVariables.Herm2 = null;
    this.objVariables.Ancho2 = null;
    this.objVariables.Tantos2 = null;
    this.objVariables.M = null;
    this.objVariables.Refile2 = null;
    this.objVariables.MLinea2 = null;
    this.objVariables.TMLinea = null;
    this.objVariables.UnaPrior = null;
    this.objVariables.OP1 = null;
    this.objVariables.OP2 = null;
    this.objVariables.AnchoUtil = null;
    this.objVariables.AnchoPapl = null;
    this.objVariables.MetrosLin = null;
    this.objVariables.Mult1 = null;
    this.objVariables.Mult2 = null;
    this.objVariables.MatPrim = null;
    this.objVariables.ManoObr = null;
    this.objVariables.CostoArg = null;
    this.objVariables.M2Netos = null;
    this.objVariables.PuntosArg = null;
    this.objVariables.Fecha1 = null;
    this.objVariables.Fecha2 = null;
    this.objVariables.Dif1 = null;
    this.objVariables.Dif2 = null;
    this.objVariables.DifDias = null;
    this.objVariables.PuntosFE = null;
    this.objVariables.PuntosDifFE = null;
    this.objVariables.Piezas1 = null;
    this.objVariables.Piezas2 = null;
    this.objVariables.Prod2 = null;
    this.objVariables.X = null;
    this.objVariables.Mej = null;
    this.objVariables.Estado2 = null;
    this.objVariables.Cliente2 = null;
    this.objVariables.Artic2 = null;
    this.objVariables.RestOP2 = null;
    this.objVariables.HOJAS2 = null;
    this.objVariables.NSCOR2 = null;
    this.objVariables.HOJAS1 = null;
    this.objVariables.Prod1 = null;
    this.objVariables.Cliente1 = null;
    this.objVariables.Artic1 = null;
    this.objVariables.RestOP1 = null;
    this.objVariables.NScor1 = null;
    this.objVariables.Estado1 = null;
    this.objVariables.PuntosCom = null;
    this.objVariables.TotalPuntos = null;
    this.objVariables.lAnchosUsar = null;
    this.objVariables.Flag1 = null;
    this.objVariables.Flag2 = null;
    this.objVariables.Opp = [];
    this.objVariables.AnchoPapel = [];
    this.objVariables.Cm = [];
    // ------------------------------------------------
    this.objVariables.Recalculo = null;
    this.objVariables.opprior = null;
    this.objVariables.NPROG1 = null;
    this.objVariables.NPROG2 = null;
    this.objVariables.Mas1 = null;
    this.objVariables.TOTAL1 = null;
    this.objVariables.Mas2 = null;
    this.objVariables.TOTAL2 = null;
    this.objVariables.Hojas = null;
    this.objVariables.MasP = null;
    this.objVariables.Fecha1A = null;
    this.objVariables.PIESAS1 = null;
    this.objVariables.RestRecs2 = null;
    this.objVariables.AnchoSTD = null;
    this.objVariables.ClvRest = null;
    this.objVariables.NoRecalculos = null;
    this.objVariables.valormax = null;
  }
  */
}
