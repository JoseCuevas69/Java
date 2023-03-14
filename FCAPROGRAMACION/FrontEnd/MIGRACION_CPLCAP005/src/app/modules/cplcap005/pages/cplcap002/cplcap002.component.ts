import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import {
  dataGridListado, dataLinerCorru, dtsCplDat014, dtsExistenciaPapel,
  dtsExistePapel, mdlDtsRollosTransito, cap004Entity, CplDat002Entity,
  PapelesDefaultCotizacion, cbxPreparacion
} from 'src/app/models/common/cplcap002';
import { Cplcap002Service } from 'src/app/services/cplcap002.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cplcap002',
  templateUrl: './cplcap002.component.html',
  styleUrls: ['./cplcap002.component.css']
})
export class Cplcap002Component implements OnInit {
  tituloCabecera: string = 'Consulta de Combinaciones Posibles';
  tituloPie: string = 'CPLCAP002 - CONSULTA DE COMBINACIONES POSIBLES';
  version: string = '';
  mdlRegistrar: boolean = true;
  confirmButton: string = "#28A745";
  cancelButton: string = "#DC3545";
  chkSelAll: boolean = false;
  auxResistencia: string;
  public set miResistencia(value: string) {
    // this.mdlCap002_ClaveResistencia = value;
    this.auxResistencia = value;
  }

  objCplDat002 = new CplDat002Entity();

  cbxClaveProceso: string;
  dtsCap002CbxPreparacion = new Array<cbxPreparacion>();

  columnasGridDatos: any;
  listaDatos = new Array<dataGridListado>();

  columnasGridDatosLiners: any;
  listaDatosLiners: dataLinerCorru[] = [];

  columnasGridDatosCorrugs: any;
  listaDatosCorrugs: dataLinerCorru[] = [];

  columnasGridDatosPapelDefault: any;
  listaDatosPapelDefault: PapelesDefaultCotizacion[] = [];
  columnasGridDatosPapelCotizacion: any;
  listaDatosPapelCotizacion: PapelesDefaultCotizacion[] = [];

  columnasGridCap004: any;

  @ViewChild('Cap002') private Cap002: any;
  mdlAgregarRef: NgbModalRef;
  @ViewChild('Cap003') private Cap003: any;
  mdlCap003Ref: NgbModalRef;

  // VARIABLES MODAL
  dtsNextClave: dtsCplDat014[] = [];
  mdlCap002_ClaveResistencia: string = '';
  mdlCap002_ClaveProceso: string;
  mdlCap002_Ancho: number = 0;
  mdlListaRollosTransito: mdlDtsRollosTransito[] = [];
  mdlTmpRollosTransito: mdlDtsRollosTransito[] = [];
  objCap004: cap004Entity[] = [];
  // mdlAceptarRollosTransito: boolean = false;

  dtsExistePapel: dtsExistePapel[] = [];
  dtsExistenciaPapel: dtsExistenciaPapel[] = [];

  // rbtnAgregar: string = '0';

  // changeRbtn(): void {
  //   console.log(this.rbtnAgregar);
  // }

  constructor(
    private modalService: NgbModal,
    public Servicio: Cplcap002Service
  ) {
    this.columnasGridDatos = [
      // {
      //   headerName: '',
      //   cellRenderer: 'btnCellRenderer',
      //   cellRendererParams: {
      //     onClick: this.clickAgregar.bind(this),
      //     label: '<i class="fa fa-plus" title="Agregar"></i>',
      //     class: 'btn btn-success btn-sm'
      //   },
      //   headerClass: 'header-center header-grid-left',
      //   cellClass: 'grid-cell-btn-center',
      //   flex: 1,
      //   minWidth: 80,
      //   suppressSizeToFit: true
      // },
      {
        headerName: '',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.clickCambio.bind(this),
          label: '<i class="fa fa-pencil-alt" title="Cambios"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 1,
        minWidth: 80,
        suppressSizeToFit: true
      },
      {
        headerName: 'Usar',
        field: 'usar',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          // change: this.ChangeValor.bind(this)
        }
      },
      {
        headerName: 'Orden',
        field: 'orden',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Clave',
        field: 'clave',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ancho',
        field: 'ancho',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Metros',
        field: 'metros',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Costo M2',
        field: 'costoM2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Peso M2',
        field: 'pesoM2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Mullen Max',
        field: 'mullenMax',
        flex: 1,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },

      {
        headerName: 'Liner 1',
        field: 'liner1',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Emp. L1',
        field: 'empalmeL1',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corr. 1',
        field: 'corrg1',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Emp. C1',
        field: 'empalmeC1',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },

      {
        headerName: 'Liner 2',
        field: 'liner2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Emp. L2',
        field: 'empalmeL2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corr. 2',
        field: 'corrg2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Emp. C2',
        field: 'empalmeC2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },

      {
        headerName: 'Liner 3',
        field: 'liner3',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Emp. L3',
        field: 'empalmeL3',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corr. 3',
        field: 'corrg3',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Emp. C3',
        field: 'empalmeC3',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },

      {
        headerName: 'Liner 4',
        field: 'liner4',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Emp. L4',
        field: 'empalmeL4',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ];
    this.columnasGridDatosLiners = [
      {
        headerName: 'Liners',
        field: 'descripcion',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Papel',
        field: 'papel',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'txt',
          change: this.ChangePapelLiner.bind(this)
        }
      },
      {
        headerName: 'Ancho',
        field: 'ancho1',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'num',
          change: this.ChangeAncho1.bind(this)
        }
      },
      {
        headerName: 'EMPALME',
        field: 'empalme',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'txt',
          change: this.ChangePapelLiner.bind(this)
        }
      },
      {
        headerName: 'Ancho',
        field: 'ancho2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'num',
          // change: this.ChangeValor.bind(this)
        }
      },
      {
        headerName: 'Exist. 501',
        field: 'existe501',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      }
    ];
    this.columnasGridDatosCorrugs = [
      {
        headerName: 'Corrugados',
        field: 'descripcion',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Papel',
        field: 'papel',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'txt',
          change: this.ChangePapelCorrug.bind(this)
        }
      },
      {
        headerName: 'Ancho',
        field: 'ancho1',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'num',
          change: this.ChangeAncho1.bind(this)
        }
      },
      {
        headerName: 'EMPALME',
        field: 'empalme',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'txt',
          change: this.ChangePapelCorrug.bind(this)
        }
      },
      {
        headerName: 'Ancho',
        field: 'ancho2',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'num',
          // change: this.ChangeValor.bind(this)
        }
      },
      {
        headerName: 'Exist. 501',
        field: 'existe501',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      }
    ];
    this.columnasGridCap004 = [
      {
        headerName: 'Tipo Papel',
        field: 'papel',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ancho Papel',
        field: 'ancho',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cantidad (Ton.)',
        field: 'cantidad',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Fecha Estimada',
        field: 'fechaEstLlegada',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      }
    ];
    this.columnasGridDatosPapelDefault = [
      {
        headerName: '',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.clickAgregarPapelDefault.bind(this),
          label: '<i class="fa fa-plus" title="Agregar"></i>',
          class: 'btn btn-success btn-sm'
        },
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-btn-center',
        flex: 1,
        minWidth: 80,
        suppressSizeToFit: true
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Clave Artículo',
        field: 'claveArticulo',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 1',
        field: 'liner1',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 1',
        field: 'corrugado1',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 2',
        field: 'liner2',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 2',
        field: 'corrugado2',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 3',
        field: 'liner3',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 3',
        field: 'corrugado3',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 4',
        field: 'liner4',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Papel',
        field: 'papel',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Tratamientos Cotizados',
        field: 'impermeabilizado',
        flex: 2,
        minWidth: 240,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cve. Prep.',
        field: 'cvePreparacion',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];
    this.columnasGridDatosPapelCotizacion = [
      {
        headerName: '',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.clickAgregarPapelCotizacion.bind(this),
          label: '<i class="fa fa-plus" title="Agregar"></i>',
          class: 'btn btn-success btn-sm'
        },
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-btn-center',
        flex: 1,
        minWidth: 80,
        suppressSizeToFit: true
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Clave Artículo',
        field: 'claveArticulo',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 1',
        field: 'liner1',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 1',
        field: 'corrugado1',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 2',
        field: 'liner2',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 2',
        field: 'corrugado2',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 3',
        field: 'liner3',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 3',
        field: 'corrugado3',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 4',
        field: 'liner4',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Papel',
        field: 'papel',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Tratamientos Cotizados',
        field: 'impermeabilizado',
        flex: 2,
        minWidth: 240,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cve. Prep.',
        field: 'cvePreparacion',
        flex: 1,
        minWidth: 120,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];
  }

  ngOnInit(): void {
    this.llenargrid();
    this.getCbxPreparacion();
    // this.listaDatos.push({
    //   orden: '', clave: '', usar: false, ancho: '', metros: '', costoM2: '', pesoM2: '', mullenMax: '',
    //   liner1: '', empalmeL1: '', corrg1: '', empalmeC1: '',
    //   liner2: '', empalmeL2: '', corrg2: '', empalmeC2: '',
    //   liner3: '', empalmeL3: '', corrg3: '', empalmeC3: '',
    //   liner4: '', empalmeL4: '',
    //   anchoL1: 0, anchoEmpalme1: 0,
    //   anchoL2: 0, anchoEmpalme2: 0,
    //   anchoL3: 0, anchoEmpalme3: 0,
    //   anchoL4: 0, anchoEmpalme4: 0,
    //   anchoC1: 0, anchoEmpalmeC1: 0,
    //   anchoC2: 0, anchoEmpalmeC2: 0,
    //   anchoC3: 0, anchoEmpalmeC3: 0
    // });
  }

  async refrescarPantalla(): Promise<void> {
    this.ngOnInit();
    await this.delay();
    this.mostrarMensajeFlotante('Actualizado!', 0);
  }

  async delay(ms: number = 450) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

  clickAgregarPapelDefault(obj: any): void {
    console.log(obj);

    const op = String(obj.data.op).trim();
    const l1 = String(obj.data.liner1).trim();
    const c1 = String(obj.data.corrugado1).trim();
    const l2 = String(obj.data.liner2).trim();
    const c2 = String(obj.data.corrugado2).trim();
    const l3 = String(obj.data.liner3).trim();
    const c3 = String(obj.data.corrugado3).trim();
    const l4 = String(obj.data.liner4).trim();
    const papel = String(obj.data.papel).trim();
    const cvePreparacion = String(obj.data.cvePreparacion).trim();

    /*
      1 = OP
      2 = CLAVE ARTICULO
      3 = LINER1
      4 = CORRUG1
      5 = LINER2
      6 = CORRUG2
      7 = LINER3
      8 = CORRUG3
      9 = LINER4
      10 = PAPEL
      11 = IMPERMEABILIZADO
      12 = CVE PREPARACION
    */

      if (!this.validaLiner1(l1, papel)) {
        Swal.fire(
          'Información',
          'No coincide Liner Exterior... (' + papel + ')',
          'info'
        );
        return;
      }
      if (cvePreparacion === "") {
        Swal.fire(
          'Información',
          'Debe asignar la clave de preparación al artículo en el módulo de Combinación Estandar (CMOCAP076)',
          'info'
        );
        return;
      }

      this.listaDatosLiners[0].papel = l1; this.listaDatosLiners[0].ancho1 = 0;
      this.listaDatosLiners[1].papel = l2; this.listaDatosLiners[1].ancho1 = 0;
      this.listaDatosLiners[2].papel = l3; this.listaDatosLiners[2].ancho1 = 0;
      this.listaDatosLiners[3].papel = l4; this.listaDatosLiners[3].ancho1 = 0;
      this.listaDatosCorrugs[0].papel = c1; this.listaDatosCorrugs[0].ancho1 = 0;
      this.listaDatosCorrugs[1].papel = c2; this.listaDatosCorrugs[1].ancho1 = 0;
      this.listaDatosCorrugs[2].papel = c3; this.listaDatosCorrugs[2].ancho1 = 0;

      if (this.dtsCap002CbxPreparacion.length > 0) {
        console.log(this.dtsCap002CbxPreparacion);
        this.cbxClaveProceso = cvePreparacion;
      }
      this.dtsCap002CbxPreparacion = cloneDeep(this.dtsCap002CbxPreparacion);
      this.listaDatosLiners = cloneDeep(this.listaDatosLiners);
      this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);
      this.mdlCap003Ref.close();
  }

  clickAgregarPapelCotizacion(obj: any): void {
    // tipo = 0 default | 1 cotizacion
    console.log(obj);

    const op = String(obj.data.op).trim();
    const l1 = String(obj.data.liner1).trim();
    const c1 = String(obj.data.corrugado1).trim();
    const l2 = String(obj.data.liner2).trim();
    const c2 = String(obj.data.corrugado2).trim();
    const l3 = String(obj.data.liner3).trim();
    const c3 = String(obj.data.corrugado3).trim();
    const l4 = String(obj.data.liner4).trim();
    const papel = String(obj.data.papel).trim();
    const cvePreparacion = String(obj.data.cvePreparacion).trim();

    /*
      1 = OP
      2 = CLAVE ARTICULO
      3 = LINER1
      4 = CORRUG1
      5 = LINER2
      6 = CORRUG2
      7 = LINER3
      8 = CORRUG3
      9 = LINER4
      10 = PAPEL
      11 = IMPERMEABILIZADO
      12 = CVE PREPARACION
    */

    // tipo = 0 = Default
    // tipo = 1 = Cotización
    if (l1 === '') {
      Swal.fire('información', 'No se tienen papeles de cotización para la OP: ' + op);
    }
    else {
      if (!this.validaLiner1(l1, papel)) {
        Swal.fire(
          'Información',
          'No coincide Liner Exterior... (' + papel + ')',
          'info'
        );
        return;
      }
      if (cvePreparacion === "") {
        Swal.fire(
          'Información',
          'Debe asignar la clave de preparación al artículo en el módulo de Combinación Estandar (CMOCAP076)',
          'info'
        );
        return;
      }

      this.listaDatosLiners[0].papel = l1; this.listaDatosLiners[0].ancho1 = 0;
      this.listaDatosLiners[1].papel = l2; this.listaDatosLiners[1].ancho1 = 0;
      this.listaDatosLiners[2].papel = l3; this.listaDatosLiners[2].ancho1 = 0;
      this.listaDatosLiners[3].papel = l4; this.listaDatosLiners[3].ancho1 = 0;
      this.listaDatosCorrugs[0].papel = c1; this.listaDatosCorrugs[0].ancho1 = 0;
      this.listaDatosCorrugs[1].papel = c2; this.listaDatosCorrugs[1].ancho1 = 0;
      this.listaDatosCorrugs[2].papel = c3; this.listaDatosCorrugs[2].ancho1 = 0;

      if (this.dtsCap002CbxPreparacion.length > 0) {
        console.log(this.dtsCap002CbxPreparacion);
        this.cbxClaveProceso = cvePreparacion;
      }
      this.dtsCap002CbxPreparacion = cloneDeep(this.dtsCap002CbxPreparacion);
      this.listaDatosLiners = cloneDeep(this.listaDatosLiners);
      this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);
      this.mdlCap003Ref.close();
    }
  }

  validaLiner1(liner1: string, papel: string): boolean {
    var valido = true;
    papel = papel.toLocaleUpperCase();
    liner1 = liner1.toLocaleUpperCase();
    const a = liner1.match("B");

    if (papel === 'KRAFT') {
      if (a !== null && a !== undefined) {
        valido = false;
      }
    }
    else if (papel === "BLANCO") {
      if (a === null || a === undefined) {
        valido = false;
      }
    }

    return valido;
  }

  llenargrid(): void {
    this.getDatosPrincipal("");
    this.setGridLiners();
    this.setGridCorrugs();
  }

  setGridLiners(): void {
    this.listaDatosLiners = [];
    this.listaDatosLiners.push({
      index: 0, descripcion: '1er Liner', papel: '', ancho1: 0, empalme: '', ancho2: 0, existe501: -1
    });
    this.listaDatosLiners.push({
      index: 1, descripcion: '2do Liner', papel: '', ancho1: 0, empalme: '', ancho2: 0, existe501: -1
    });
    this.listaDatosLiners.push({
      index: 2, descripcion: '3er Liner', papel: '', ancho1: 0, empalme: '', ancho2: 0, existe501: -1
    });
    this.listaDatosLiners.push({
      index: 3, descripcion: '4to Liner', papel: '', ancho1: 0, empalme: '', ancho2: 0, existe501: -1
    });
  }

  setGridCorrugs(): void {
    this.listaDatosCorrugs = [];
    this.listaDatosCorrugs.push({
      index: 0, descripcion: '1er Corrugado', papel: '', ancho1: 0, empalme: '', ancho2: 0, existe501: -1
    });
    this.listaDatosCorrugs.push({
      index: 1, descripcion: '2do Corrugado', papel: '', ancho1: 0, empalme: '', ancho2: 0, existe501: -1
    });
    this.listaDatosCorrugs.push({
      index: 2, descripcion: '3er Corrugado', papel: '', ancho1: 0, empalme: '', ancho2: 0, existe501: -1
    });
  }

  limpiarModalAgregar(): void {
    this.setGridLiners();
    this.setGridCorrugs();
    this.mdlCap002_ClaveResistencia = '';
    this.mdlCap002_ClaveProceso = '';
    this.cbxClaveProceso = '';
    this.mdlCap002_Ancho = 0;
  }

  async clickAgregar(): Promise<void> {
    this.limpiarModalAgregar();
    this.mdlRegistrar = true;
    this.dtsNextClave = await this.getNextClaveProceso();
    for (const iterator of this.dtsNextClave) {
      this.mdlCap002_ClaveResistencia = this.auxResistencia ? this.auxResistencia : iterator.claveResistencia.trim();
      this.mdlCap002_ClaveProceso = iterator.claveProceso.trim();
      this.cbxClaveProceso = iterator.claveProceso.trim();
      break;
    }
    this.mdlAgregarRef = this.modalService.open(this.Cap002, {size: 'xl', backdrop: 'static'});
  }

  async actualizarDatos(): Promise<void> {
    // Actualizar datos Liner
    for (const iterator of this.listaDatosLiners) {
      if (
        iterator.papel !== '' && iterator.papel !== null && iterator.papel !== undefined &&
        iterator.ancho1 !== 0 && iterator.ancho1 !== null && iterator.ancho1 !== undefined
      ) {
        this.dtsExistenciaPapel = await this.getExistenciaPapel(iterator.papel, iterator.ancho1);
        this.listaDatosLiners[iterator.index].existe501 = -1;
        if (this.dtsExistenciaPapel.length === 0) {
          this.listaDatosLiners[iterator.index].existe501 = 0;
        }
        for (const iterator2 of this.dtsExistenciaPapel) {
          this.listaDatosLiners[iterator.index].existe501 = iterator2.existencia;
        }
        this.listaDatosLiners = cloneDeep(this.listaDatosLiners);

        if (iterator.ancho1 > this.mdlCap002_Ancho) {
          this.mdlCap002_Ancho = iterator.ancho1;
        }
      }
    }
    // Actualizar datos Corrugadora
    for (const iterator of this.listaDatosCorrugs) {
      if (
        iterator.papel !== '' && iterator.papel !== null && iterator.papel !== undefined &&
        iterator.ancho1 !== 0 && iterator.ancho1 !== null && iterator.ancho1 !== undefined
      ) {
        this.dtsExistenciaPapel = await this.getExistenciaPapel(iterator.papel, iterator.ancho1);
        this.listaDatosCorrugs[iterator.index].existe501 = -1;
        if (this.dtsExistenciaPapel.length === 0) {
          this.listaDatosCorrugs[iterator.index].existe501 = 0;
        }
        for (const iterator2 of this.dtsExistenciaPapel) {
          this.listaDatosCorrugs[iterator.index].existe501 = iterator2.existencia;
        }
        this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);

        if (iterator.ancho1 > this.mdlCap002_Ancho) {
          this.mdlCap002_Ancho = iterator.ancho1;
        }
      }
    }
  }

  async clickCambio(obj: any): Promise<void> {
    console.log(obj.data);
    this.limpiarModalAgregar();
    this.mdlRegistrar = false;

    this.mdlCap002_ClaveResistencia = obj.data.clave.trim();

    if (this.listaDatosLiners.length === 4) {
      this.listaDatosLiners[0].papel = obj.data.liner1;
      this.listaDatosLiners[0].ancho1 = obj.data.anchoL1;
      this.listaDatosLiners[0].empalme = obj.data.empalmeL1;
      this.listaDatosLiners[0].ancho2 = obj.data.anchoEmpalme1;

      this.listaDatosLiners[1].papel = obj.data.liner2;
      this.listaDatosLiners[1].ancho1 = obj.data.anchoL2;
      this.listaDatosLiners[1].empalme = obj.data.empalmeL2;
      this.listaDatosLiners[1].ancho2 = obj.data.anchoEmpalme2;

      this.listaDatosLiners[2].papel = obj.data.liner3;
      this.listaDatosLiners[2].ancho1 = obj.data.anchoL3;
      this.listaDatosLiners[2].empalme = obj.data.empalmeL3;
      this.listaDatosLiners[2].ancho2 = obj.data.anchoEmpalme3;

      this.listaDatosLiners[3].papel = obj.data.liner4;
      this.listaDatosLiners[3].ancho1 = obj.data.anchoL4;
      this.listaDatosLiners[3].empalme = obj.data.empalmeL4;
      this.listaDatosLiners[3].ancho2 = obj.data.anchoEmpalme4;
    }

    if (this.listaDatosCorrugs.length === 3) {
      this.listaDatosCorrugs[0].papel = obj.data.corrg1;
      this.listaDatosCorrugs[0].ancho1 = obj.data.anchoC1;
      this.listaDatosCorrugs[0].empalme = obj.data.empalmeC1;
      this.listaDatosCorrugs[0].ancho2 = obj.data.anchoEmpalmeC1;

      this.listaDatosCorrugs[1].papel = obj.data.corrg2;
      this.listaDatosCorrugs[1].ancho1 = obj.data.anchoC2;
      this.listaDatosCorrugs[1].empalme = obj.data.empalmeC2;
      this.listaDatosCorrugs[1].ancho2 = obj.data.anchoEmpalmeC2;

      this.listaDatosCorrugs[2].papel = obj.data.corrg3;
      this.listaDatosCorrugs[2].ancho1 = obj.data.anchoC3;
      this.listaDatosCorrugs[2].empalme = obj.data.empalmeC3;
      this.listaDatosCorrugs[2].ancho2 = obj.data.anchoEmpalmeC3;
    }

    this.actualizarDatos();

    // console.log(this.getDataMod(obj.data.clave.trim()));
    this.mdlAgregarRef = this.modalService.open(this.Cap002, {size: 'xl', backdrop: 'static'});
  }

  async ChangePapelLiner(obj: any): Promise<void> {
    console.log(obj);
    const valor = String(obj.value).trim();
    const index = Number(obj.data.index);
    const campo = String(obj.field).trim();

    if (valor === '') {
      if (campo === 'papel') {
        this.listaDatosLiners[index].ancho1 = 0;
        this.listaDatosLiners[index].existe501 = -1;
      }
      else if (campo === 'empalme') {
        this.listaDatosLiners[index].ancho2 = 0;
      }
      this.listaDatosLiners = cloneDeep(this.listaDatosLiners);
    }
    else {
      // verificar que exista la clave de papel ingresada
      this.dtsExistePapel = await this.getExistePapel(valor.toLocaleUpperCase());
      console.log(this.dtsExistePapel);
      for (const iterator of this.dtsExistePapel) {
        if (!iterator.estatus) {
          Swal.fire('Información', iterator.msj, 'info');
        }

        if (campo === 'papel') {
          this.listaDatosLiners[index].papel = iterator.clavePapel.toLocaleUpperCase();
          if (iterator.clavePapel.toLocaleUpperCase() === '') {
            this.listaDatosLiners[index].ancho1 = 0;
          }
        }
        else if (campo === 'empalme') {
          this.listaDatosLiners[index].empalme = iterator.clavePapel.toLocaleUpperCase();
          if (iterator.clavePapel.toLocaleUpperCase() === '') {
            this.listaDatosLiners[index].ancho2 = 0;
          }
        }
        obj.value = iterator.clavePapel.toLocaleUpperCase();
        this.listaDatosLiners = cloneDeep(this.listaDatosLiners);
      }
    }
  }

  async ChangeAncho1(obj: any): Promise<void> {
    console.log(obj);
    const valor = Number(obj.value);
    const index = Number(obj.data.index);
    const campo = String(obj.data.descripcion).trim();
    const papel = String(obj.data.papel).trim();

    if (valor < 20 || valor > 98) {
      if (campo.match('Liner')) {
        this.listaDatosLiners[index].ancho1 = 0;
        this.listaDatosLiners = cloneDeep(this.listaDatosLiners);
      }
      else if (campo.match('Corrugado')) {
        this.listaDatosCorrugs[index].ancho1 = 0;
        this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);
      }
      Swal.fire('Información', 'El ancho debe ser mayor a 20 y menor a 98 pulgadas...', 'info');
    }

    if (papel !== '') {
      this.dtsExistenciaPapel = await this.getExistenciaPapel(papel, valor);
      if (campo.match('Liner')) {
        this.listaDatosLiners[index].existe501 = -1;
        if (this.dtsExistenciaPapel.length === 0) {
          this.listaDatosLiners[index].existe501 = 0;
        }
      }
      else if (campo.match('Corrugado')) {
        this.listaDatosCorrugs[index].existe501 = -1;
        if (this.dtsExistenciaPapel.length === 0) {
          this.listaDatosCorrugs[index].existe501 = 0;
        }
      }

      for (const iterator of this.dtsExistenciaPapel) {
        if (campo.match('Liner')) {
          this.listaDatosLiners[index].existe501 = iterator.existencia;
        }
        else if (campo.match('Corrugado')) {
          this.listaDatosCorrugs[index].existe501 = iterator.existencia;
        }
      }

      if (campo.match('Liner')) {
        this.listaDatosLiners = cloneDeep(this.listaDatosLiners);
      }
      else if (campo.match('Corrugado')) {
        this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);
      }

      await this.actualizarAnchoGeneral();
    }

  }

  async actualizarAnchoGeneral(): Promise<void> {
    var num = 0;
    for (const iterator of this.listaDatosLiners) {
      if (iterator.ancho1 > num) {
        num = iterator.ancho1;
      }
    }
    for (const iterator of this.listaDatosCorrugs) {
      if (iterator.ancho1 > num) {
        num = iterator.ancho1;
      }
    }
    this.mdlCap002_Ancho = Number(num);
  }

  async ChangePapelCorrug(obj: any): Promise<void> {
    const valor = String(obj.value).trim();
    const index = Number(obj.data.index);
    const campo = String(obj.field).trim();

    if (valor === '') {
      if (campo === 'papel') {
        this.listaDatosCorrugs[index].ancho1 = 0;
        this.listaDatosCorrugs[index].existe501 = -1;
      }
      else if (campo === 'empalme') {
        this.listaDatosCorrugs[index].ancho2 = 0;
      }
      this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);
    }
    else {
      // verificar que exista la clave de papel ingresada
      this.dtsExistePapel = await this.getExistePapel(valor.toLocaleUpperCase());
      console.log(this.dtsExistePapel);
      for (const iterator of this.dtsExistePapel) {
        if (!iterator.estatus) {
          Swal.fire('Información', iterator.msj, 'info');
        }

        if (campo === 'papel') {
          this.listaDatosCorrugs[index].papel = iterator.clavePapel.toLocaleUpperCase();
          if (iterator.clavePapel.toLocaleUpperCase() === '') {
            this.listaDatosCorrugs[index].ancho1 = 0;
          }
        }
        else if (campo === 'empalme') {
          this.listaDatosCorrugs[index].empalme = iterator.clavePapel.toLocaleUpperCase();
          if (iterator.clavePapel.toLocaleUpperCase() === '') {
            this.listaDatosCorrugs[index].ancho2 = 0;
          }
        }
        obj.value = iterator.clavePapel.toLocaleUpperCase();

        this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);
      }
    }
  }

  // async ChangeAncho1Corrug(obj: any): Promise<void> {
  //   console.log(obj);
  //   const valor = Number(obj.value);
  //   const index = Number(obj.data.index);
  //   // const campo = String(obj.field).trim();
  //   const papel = String(obj.data.papel).trim();

  //   this.dtsExistenciaPapel = await this.getExistenciaPapel(papel, valor);
  //   this.listaDatosCorrugs[index].existe501 = -1;
  //   if (this.dtsExistenciaPapel.length === 0) {
  //     this.listaDatosCorrugs[index].existe501 = 0;
  //   }
  //   for (const iterator of this.dtsExistenciaPapel) {
  //     this.listaDatosCorrugs[index].existe501 = iterator.existencia;
  //   }
  //   this.listaDatosCorrugs = cloneDeep(this.listaDatosCorrugs);

  //   if (valor > this.mdlCap002_Ancho) {
  //     this.mdlCap002_Ancho = valor;
  //   }
  // }

  // ChangeValor(obj: any): void {
  //   // console.log(obj);
  // }

  // METODOS
  async getCbxPreparacion(): Promise<void> {
    this.dtsCap002CbxPreparacion = await this.obtenerCbxPreparacion();
    if (this.dtsCap002CbxPreparacion.length > 0) {
      if (this.mdlCap002_ClaveProceso !== '') {
        this.cbxClaveProceso = this.mdlCap002_ClaveProceso;
      }
    }
  }

  async obtenerCbxPreparacion(): Promise<Array<cbxPreparacion>> {
    const value: any = await this.Servicio.ObtenerCbxPreparacion();
    const cbxPrep = [];
    cbxPrep.push({ claveProceso: '', descripcion: '' });
    value.data.forEach(element => {
      cbxPrep.push({
        claveProceso: element.claveProceso,
        descripcion: element.descripcion
      });
    });
    return cbxPrep;
  }

  // async obtenerListadoPrincipal(clave: string): Promise<void> {
  //   this.listaDatos = await this.getDatosPrincipal(clave);
  //   console.log(this.listaDatos);
  // }
  async getDatosPrincipal(clave: string): Promise<void> {
    this.listaDatos = await this.obtenerDatosPrincipal(clave);
    // console.log(this.listaDatos);
  }
  async obtenerDatosPrincipal(clave: string): Promise<any> {
    const value: any = await this.Servicio.ObtenerDatosPrincipal(clave);
    return value.data;
  }

  async getNextClaveProceso(): Promise<Array<dtsCplDat014>> {
    return await this.obtenerNextClaveProceso();
  }
  async obtenerNextClaveProceso(): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerNextClaveProceso();
    return value.data;
  }

  async getExistePapel(clavePapel: string): Promise<Array<dtsExistePapel>> {
    return await this.ObtenerExistePapel(clavePapel);
  }
  async ObtenerExistePapel(clavePapel: string): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerExistePapel(clavePapel);
    return value.data;
  }

  async getExistenciaPapel(clavePapel: string, anchoPapel: number): Promise<Array<dtsExistenciaPapel>> {
    return await this.ObtenerExistenciaPapel(clavePapel, anchoPapel);
  }
  async ObtenerExistenciaPapel(clavePapel: string, anchoPapel: number): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerExistenciaPapel(clavePapel, anchoPapel);
    return value.data;
  }

  async getRollosTransito(clavePapel: string, anchoPapel: number): Promise<Array<mdlDtsRollosTransito>> {
    return await this.ObtenerRollosTransito(clavePapel, anchoPapel);
  }
  async ObtenerRollosTransito(clavePapel: string, anchoPapel: number): Promise<Array<any>> {
    const value: any = await this.Servicio.ObtenerRollosTransito(clavePapel, anchoPapel);
    return value.data;
  }

  async getPapelesDefaultCotizacion(): Promise<any> {
    const value: any = await this.Servicio.ObtenerPapelesDefaultCotizacion();
    return value;
  }

  async mdlBtnLeePapelesDefault(): Promise<void> {
    const objRes = await this.getPapelesDefaultCotizacion();
    this.listaDatosPapelDefault = objRes.data;
    this.listaDatosPapelCotizacion = objRes.data2;
    // for (const iterator of objRes.data) {
    //   if (iterator.id === 1) {
    //     this.listaDatosPapelDefault.push(
    //       {
    //         op: iterator.op, claveArticulo: iterator.claveArticulo, liner1: iterator.liner1, linre2: iterator.liner2,
    //         liner3: iterator.liner3, liner4: iterator.liner4, corrugado1: iterator.corrugado1, corrugado2: iterator.corrugado2,
    //         corrugado3: iterator.corrugado3, papel: iterator.papel, tratamientos: iterator.tratamientos, cvePrep: iterator.cvePrep
    //       }
    //     );
    //   }
    //   else if (iterator.id === 2) {
    //     this.listaDatosPapelCotizacion.push(
    //       {
    //         op: iterator.op, claveArticulo: iterator.claveArticulo, liner1: iterator.liner1, linre2: iterator.liner2,
    //         liner3: iterator.liner3, liner4: iterator.liner4, corrugado1: iterator.corrugado1, corrugado2: iterator.corrugado2,
    //         corrugado3: iterator.corrugado3, papel: iterator.papel, tratamientos: iterator.tratamientos, cvePrep: iterator.cvePrep
    //       }
    //     );
    //   }
    // }
    // this.listaDatosPapelCotizacion = objRes.data2;

    console.log(objRes);
    if (this.listaDatosPapelDefault.length > 0) {
      this.mdlCap003Ref = this.modalService.open(this.Cap003, {size: 'xl', backdrop: 'static'});
    }
    else {
      Swal.fire('información', 'No se encontraron papeles', 'info');
    }
  }

  // async getDataMod(clave: string): Promise<Array<dataGridListado>> {
  //   return await this.obtenerDatosPrincipal(clave);
  // }

  async guardarDatos(): Promise<void> {
    var rollosEnTransito: boolean = false;
    const liner0 = this.listaDatosLiners[0];
    const liner1 = this.listaDatosLiners[1];
    const liner2 = this.listaDatosLiners[2];
    const liner3 = this.listaDatosLiners[3];

    const liner4 = this.listaDatosCorrugs[0];
    const liner5 = this.listaDatosCorrugs[1];
    const liner6 = this.listaDatosCorrugs[2];

    if (liner0.papel.trim() === '') {
      Swal.fire('Información', 'Debe capturar el Liner1 antes de guardar.', 'info');
      return;
    }
    if (liner4.papel.trim() !== '' && liner1.papel.trim() === '') {
      Swal.fire('Información', 'Debe capturar el Liner2 antes de guardar.', 'info');
      return;
    }
    if (liner5.papel.trim() !== '' && liner2.papel.trim() === '') {
      Swal.fire('Información', 'Debe capturar el Liner3 antes de guardar.', 'info');
      return;
    }
    if (liner6.papel.trim() !== '' && liner3.papel.trim() === '') {
      Swal.fire('Información', 'Debe capturar el Liner4 antes de guardar.', 'info');
      return;
    }
    if (liner0.ancho1 === 0) {
      Swal.fire('Información', 'Debe capturar el ancho.', 'info');
      return;
    }

    if (this.validarPapeles()) {
      this.objCap004 = [];
      // Obtener rollos en tránsito de liner
      for (const iterator of this.listaDatosLiners) {
        this.mdlTmpRollosTransito = await this.getRollosTransito(iterator.papel, iterator.ancho1);
        for (const rollosTransito of this.mdlTmpRollosTransito) {
          rollosEnTransito = true;
          this.objCap004.push({
            papel: rollosTransito.papel, ancho: rollosTransito.ancho,
            cantidad: rollosTransito.cantidad, fechaEstLlegada: rollosTransito.fechaEstLlegada
          });
        }
      }
      // Obtener rollos en tránsito de corrugadora
      for (const iterator of this.listaDatosCorrugs) {
        this.mdlTmpRollosTransito = await this.getRollosTransito(iterator.papel, iterator.ancho1);
        for (const rollosTransito of this.mdlTmpRollosTransito) {
          rollosEnTransito = true;
          this.objCap004.push({
            papel: rollosTransito.papel, ancho: rollosTransito.ancho,
            cantidad: rollosTransito.cantidad, fechaEstLlegada: rollosTransito.fechaEstLlegada
          });
        }
      }

      if (rollosEnTransito) {
        Swal.fire({
          title: 'Se detectaron los siguientes rollos en Tránsito',
          html:
            '<div class="container-fluid">' +
              '<div class="row">' +
                '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
                  '<grid-cs #gridCap004 [columnDefs]="columnasGridCap004" [(data)]="objCap004" [rowsPerPage]="5" [enablePagination]="true"></grid-cs>' +
                '</div>' +
              '</div>' +
              '<div class="row">' +
                '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
                  '<label>¿Desea continuar guardando el proceso?</label>' +
                '</div>' +
              '</div>' +
            '</div>',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: this.confirmButton,
          cancelButtonColor: this.cancelButton,
          cancelButtonText: '<i class="fa fa-times"></i> NO',
          confirmButtonText: '<i class="fa fa-check"></i> SI'
        }).then((result) => {
          if (!result.value) {
            Swal.fire('Salida', 'No completado', 'info');
            return;
          }
        });
      }
      this.objCplDat002.claveProceso = '';
      this.objCplDat002.opc = 0;
      this.objCplDat002.listaDatos = [];
      this.objCplDat002.listaDatos2 = [];

      this.objCplDat002.claveProceso = this.mdlCap002_ClaveProceso;
      this.objCplDat002.listaDatos.push({
        pulg: true, orden: '0', clave: this.mdlCap002_ClaveResistencia,
        liner1: this.listaDatosLiners[0].papel, corrugado1: this.listaDatosCorrugs[0].papel,
        liner2: this.listaDatosLiners[1].papel, corrugado2: this.listaDatosCorrugs[1].papel,
        liner3: this.listaDatosLiners[2].papel, corrugado3: this.listaDatosCorrugs[2].papel,
        liner4: this.listaDatosLiners[3].papel,
        empalme1: this.listaDatosLiners[0].empalme, empalme2: this.listaDatosLiners[1].empalme,
        empalme3: this.listaDatosLiners[2].empalme, empalme4: this.listaDatosLiners[3].empalme,
        empalmeC1: this.listaDatosCorrugs[0].empalme, empalmeC2: this.listaDatosCorrugs[1].empalme,
        empalmeC3: this.listaDatosCorrugs[2].empalme,
        anchoL1: this.listaDatosLiners[0].ancho1.toString(), anchoEmpalme1: this.listaDatosLiners[0].ancho2.toString(),
        anchoL2: this.listaDatosLiners[1].ancho1.toString(), anchoEmpalme2: this.listaDatosLiners[1].ancho2.toString(),
        anchoL3: this.listaDatosLiners[2].ancho1.toString(), anchoEmpalme3: this.listaDatosLiners[2].ancho2.toString(),
        anchoL4: this.listaDatosLiners[3].ancho1.toString(), anchoEmpalme4: this.listaDatosLiners[3].ancho2.toString(),
        anchoC1: this.listaDatosCorrugs[0].ancho1.toString(), anchoEmpalmeC1: this.listaDatosCorrugs[0].ancho2.toString(),
        anchoC2: this.listaDatosCorrugs[1].ancho1.toString(), anchoEmpalmeC2: this.listaDatosCorrugs[1].ancho2.toString(),
        anchoC3: this.listaDatosCorrugs[2].ancho1.toString(), anchoEmpalmeC3: this.listaDatosCorrugs[2].ancho2.toString(),
        ancho: this.mdlCap002_Ancho.toString()
      });

      if (this.mdlRegistrar) {
        // Registrar
        this.objCplDat002.opc = 1;
      }
      else if (!this.mdlRegistrar) {
        // Modificar
        this.objCplDat002.opc = 2;
      }

      this.Servicio.InsertUpdateCplDat002(this.objCplDat002).subscribe(async (res: any) => {
        Swal.fire(
          (res.data.id !== 0 ? 'Completado' : 'Error'),
          res.data.message,
          (res.data.id !== 0 ? 'success' : 'error')
        );
        this.llenargrid();
        this.mdlAgregarRef.close();
      }, (err: any) => {
        Swal.fire('Error', 'Error al guardar la información: ' + err.error, 'error');
      });

    }
  }

  validarPapeles(): boolean {
    var valido = true;

    for (const iterator of this.listaDatosLiners) {
      if (!this.isnull(iterator.papel) && iterator.papel !== '') {
        if (this.isnull(iterator.ancho1) || iterator.ancho1 === 0) {
          Swal.fire('Información', 'Debe capturar ancho de papel', 'info');
          valido = false;
          break;
        }
        if (!this.isnull(iterator.ancho1) && (iterator.ancho1 < 20 || iterator.ancho1 > 98)) {
          Swal.fire('Información', 'El ancho debe ser mayor a 20 y menor a 98 pulgadas...', 'info');
          valido = false;
          break;
        }
      }
      if (!this.isnull(iterator.empalme) && iterator.empalme !== '') {
        if (this.isnull(iterator.ancho2) || iterator.ancho2 === 0) {
          Swal.fire('Información', 'Debe capturar ancho de papel', 'info');
          valido = false;
          break;
        }
        if (!this.isnull(iterator.ancho2) && (iterator.ancho2 < 20 || iterator.ancho2 > 98)) {
          Swal.fire('Información', 'El ancho debe ser mayor a 20 y menor a 98 pulgadas...', 'info');
          valido = false;
          break;
        }
      }
    }

    if (valido) {
      for (const iterator of this.listaDatosCorrugs) {
        if (!this.isnull(iterator.papel) && iterator.papel !== '') {
          if (this.isnull(iterator.ancho1) || iterator.ancho1 === 0) {
            Swal.fire('Información', 'Debe capturar ancho de papel', 'info');
            valido = false;
            break;
          }
          if (!this.isnull(iterator.ancho1) && (iterator.ancho1 < 20 || iterator.ancho1 > 98)) {
            Swal.fire('Información', 'El ancho debe ser mayor a 20 y menor a 98 pulgadas...', 'info');
            valido = false;
            break;
          }
        }
        if (!this.isnull(iterator.empalme) && iterator.empalme !== '') {
          if (this.isnull(iterator.ancho2) || iterator.ancho2 === 0) {
            Swal.fire('Información', 'Debe capturar ancho de papel', 'info');
            valido = false;
            break;
          }
          if (!this.isnull(iterator.ancho2) && (iterator.ancho2 < 20 || iterator.ancho2 > 98)) {
            Swal.fire('Información', 'El ancho debe ser mayor a 20 y menor a 98 pulgadas...', 'info');
            valido = false;
            break;
          }
        }
      }
    }

    return valido;
  }

  isnull(campo: any): boolean {
    return campo === null || campo === undefined ? true : false;
  }

  // async btnCap004SI(): Promise<void> {
  //   this.mdlAceptarRollosTransito = true;
  // }
  // async btnCap004NO(): Promise<void> {
  //   this.mdlAceptarRollosTransito = false;
  // }

  clickSelAll(): void {
    console.log(this.chkSelAll);
    for (const iterator of this.listaDatos) {
      iterator.usar = this.chkSelAll;
    }
    this.listaDatos = cloneDeep(this.listaDatos);
  }

  clickGrabarDatos(): void {
    this.objCplDat002.listaDatos2 = [];
    for (const iterator of this.listaDatos) {
      this.objCplDat002.listaDatos2.push({
        clave: iterator.clave, usar: iterator.usar
      });
    }

    this.Servicio.UpdateCplDat002(this.objCplDat002).subscribe(async (res: any) => {
      Swal.fire(
        (res.data.id !== 0 ? 'Completado' : 'Error'),
        res.data.message,
        (res.data.id !== 0 ? 'success' : 'error')
      );
      this.llenargrid();
      this.mdlAgregarRef.close();
    }, (err: any) => {
      Swal.fire('Error', 'Error al guardar la información: ' + err.error, 'error');
    });
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
