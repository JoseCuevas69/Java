import { DatePipe, formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { GridModel } from '../../../../models/common/gridModel';

import {
  maquinas, listSecuencia, estadoMantenimiento, comentariosOP, opsMaquinas, objDisabled, objVisible,
  objCamposGeneral, objCbxMaquinas, objMaquinaMto, colores, mdlBusquedaOP, objSigProgCap, maquinasCanceladas,
  mdlProgramaImpresoras, resultadoCap009, proceso, modificaProceso, rutaProceso, modelMdlCap005, objCamposMdlCap005,
  errorSQL, justificaciones, opc18, objProgramasCap005, opc17p2, opc4p2, mdlCap004, cap004FijarFecha, objProgramasCap001,
  modelMdlCap001, objSPActOpc6, mdlCap003, spActOpc8, cap001SuspenderOP, objCap016, cap016ValidarTraspasoOps, datosGridCap016, spActOpc10, parSPLecOpc23
} from '../../../../models/Programacion/secimp/FCAPROG017MWModel';
import { FCAPROG017MWService } from '../../../../services/Programacion/secimp/fcaprog017-mw.service';

@Component({
  selector: 'app-fcaprog017-mw',
  templateUrl: './fcaprog017-mw.component.html',
  styleUrls: ['./fcaprog017-mw.component.css']
})
export class FCAPROG017MWComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  VERSION: string = '2022.05.14.1';
  pZonaERP: string = '';
  pUser: string = '';
  objColores: colores = {
    accionCorrectiva: '#0000C0', cancelada: '#FF0000', suspendida: '#10A6D8', electronico: '#ff8c00'
  };

  // Campos
  objDisabled: objDisabled = {
    btnAceptarNotas: false, btnAgregarOP: false, btnSubePosicion: false, btnBajaPosicion: false
  };
  objVisible: objVisible = {
    aql: false, lblSuspendida: false, btnOrdenarOP: false, articuloNuevo: false
  };
  objCamposGeneral: objCamposGeneral = {
    esCapAut: false, lblSiguienteProrgama: true, fechaSecuencia: '', txtTotalCantidad: '', txtTotalTiempo: '', txtProgramaCorrug: '',
    notas: '', pintado: false, comentariosProduccion: '', especificacionesProceso: '', programaSeleccionado: ' | Prog. Sel. : ',
    primeroTurnoActual: '', sigProCap: '', fechaTrabajo: '', horaTrabajo: '', turnoTrabajo: 0, imgAtencionVisible: false
  };
  gridSecuenciasPrincipal: GridModel;
  objCbxMaquinas: objCbxMaquinas = { listMaquinas: [], selected: '', tipoSelected: '', rbtnTipoMaquina: '0' };
  objMaquinaMto: objMaquinaMto = { mantenimiento: false, texto: 'Maquina en mantenimiento' };



  // Grid Secuencia
  columnasGridSecuencias: any;
  dataGridSecuencias: Array<listSecuencia> = [];
  objMaquinasCanceladas: maquinasCanceladas = {
    data: [], selected: ''
  };

  // Modal Cambio de Máquina
  // columnasGridMdlCap005: any;
  @ViewChild('mdlCap005') private mdlCap005: any;
  mdlCap005Ref: NgbModalRef;
  objMdlCap005: objCamposMdlCap005 = {
    listProgramas: [], listMaquinas: [], selectedMaquina: '', modificaProceso: false, listModificaProceso: [],
    selectedModificaProceso: '', listJustiticacionCambio: [], selectedJustificacionCambio: '', selectedJustificacionDescripcion: '',
    dataGridMdlCap005: [], columnasGridMdlCap005: [], cantidadInicial: 0, datosOpc18: [], divCantidadVisible: false, cantidad: 0, columnasInconvenientes: []
  };
  objMdlCap005Programas: objProgramasCap005 = {
    cap005TD_001: [], txtJustificacion: '', cveProceso: '', cveMaquina: '', optTipoMaquina: ''
  };
  objMdlCap005Inconvenientes: Array<modelMdlCap005>;

  // Modal Busqueda OP
  @ViewChild('mdlCap013') private mdlCap013: any;
  mdlCap013Ref: NgbModalRef;
  objMdlCap013: mdlBusquedaOP = {
    rbtnFiltroMaquina: '1', txtOP: '', listResultadoMaquinas: [],
    columns: [
      {
        headerName: 'Sec',
        field: 'orden',
        flex: 1,
        minWidth: 35,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Máquina',
        field: 'claveMaquina',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cant.',
        field: 'cantidad',
        flex: 1,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Tipo Máquina',
        field: 'tipoMaquina',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: '',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.clickSeleccionarOPMaquina.bind(this),
          label: '<span class="fa fa-check" title="Seleccionar OP"></span>',
          class: 'btn btn-success btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 1,
        minWidth: 55,
        suppressSizeToFit: true
      }
    ]
  };
  @ViewChild('mdlCap003') private mdlCap003: any;
  mdlCap003Ref: NgbModalRef;
  objMdlCap003: mdlCap003 = {

  };

  @ViewChild('mdlCap016') private mdlCap016: any;
  mdlCap016Ref: NgbModalRef;
  objMdlCap016: objCap016 = {
    listMaquinas: [], selected: '', tipoSelected: '', selectAll: false, dataGrid: [], dataGridInconvenientes: [],
    columns: [
      {
        headerName: 'Sel',
        field: 'seleccionado',
        flex: 1,
        minWidth: 50,
        headerClass: 'header-center header-grid-left',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          disabled: false
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cliente',
        field: 'cliente',
        flex: 4,
        minWidth: 250,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Articulo',
        field: 'articulo',
        flex: 3,
        minWidth: 180,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cve. Art.',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'U.P.',
        field: 'ultimoProceso',
        flex: 1,
        minWidth: 60,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      {
        headerName: 'Cve. Proceso',
        field: 'claveProceso',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Programa',
        field: 'programa',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ],
    columnsInconvenientes: [
      {
        headerName: 'Sel',
        field: 'seleccionado',
        flex: 1,
        minWidth: 50,
        headerClass: 'header-center header-grid-left',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          disabled: false
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 3,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      }
    ]
  };

  @ViewChild('mdlCap004') private mdlCap004: any;
  mdlCap004Ref: NgbModalRef;
  objMdlCap004: mdlCap004 = {
    op: '', fecha: this.pipe.transform(new Date(), 'yyyy-MM-dd'), hora: '00:00', quitar: false, quitarVisible: false, secuenciaSeleccionada: new listSecuencia()
  };

  @ViewChild('mdlCap009') private mdlCap009: any;
  mdlCap009Ref: NgbModalRef;
  objMdlCap009: mdlProgramaImpresoras = {
    txtOP: '', suaje: '', txtAreaUnit: '0', txtLargoLam: '0', txtAnchoLam: '0', dado: '',
    cbxProceso: [], cbxProcesoSelected: '', txtPzasSuaje: '0', txtLargoDes: '0', txtAnchoDes: '0',
    chkModificaProceso: false, cbxModificaProceso: [], cbxModificaProcesoSelected: '',
    txtClaveArticulo: '', txtArticulo: '', txtCliente: '',
    txtSolicitado: '0', txtProducido: '0', txtProgramado: '0', txtExistencia: '0',
    txtColores: '', txtIndustria: '',
    cbxRutaProceso: [], cbxRutaProcesoSelected: '', txtDescripcionRuta: '',
    txtCantidad: '0', txtDuracion: '',
    txtComentarios: '', txtEspProceso: '', txtJustificacion: '',
    proceso: '', fecha: '', chkModificaProcesoVisible: true
  };
  objMdlCap009_DatosBusqueda: resultadoCap009 = {
    op: '', suaje: '', areaUnitaria: '', largoLamina: '', anchoLamina: '', pzasSuaje: '', largoDesarrollo: '', anchoDesarrollo: '',
    claveArticulo: '', nombreArticulo: '', dado: '', fechaEntrega: '', solicitado: '', producido: '', programado: '', existencia: '',
    variacion: '', proceso: '', primerColor: '', segundoColor: '', tercerColor: '', cuartoColor: '', colores: '', rutaProceso: '',
    clavePreparacion: '', industria: '', mvt: false, validaProceso: false, txtValidaProceso: '', produccionHora: '', flauta: '',
    unionPegada: false, piezasXCorte: 0, cantidad: 0, autAgente: false, devuelto: 0, liberadoCostos: false, autorizado: false,
    conScore: false, cantidadSol: 0, cantidadTras: 0, clave: '', ruta: '', resistencia: '', maquinaEstablecida: '', eproceso: '',
    noProducir: false, claveCliente: '', nombreCliente: '', status: '', msjOp: '', msjProducir: '', cajaNueva: false, modificacion: false,
    comentarios: '', retrabajoOP: false
  };

  constructor(
    private modalService: NgbModal,
    public Servicio: FCAPROG017MWService,
    public pipe: DatePipe
  ) {
    this.columnasGridSecuencias = [
      // 0
      {
        headerName: '#',
        field: 'value00',
        flex: 1,
        minWidth: 48,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
        cellStyle: params => {
          if (params.data.electronico) {
            return {color: this.objColores.electronico};
          }
          if (params.data.status === 'CAN') {
            return {color: this.objColores.cancelada};
          }
          if (params.data.status === 'SUS') {
            return {color: this.objColores.suspendida};
          }
          if (!params.data.liberadoDS || params.data.enAtencion === 1) {
            return {color: this.objColores.accionCorrectiva};
          }
          return null;
        }
      },
      // 1
      {
        headerName: 'Op',
        field: 'value01',
        flex: 1,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellStyle: params => {
          if (params.data.electronico) {
            return {color: this.objColores.electronico};
          }
          return null;
        }
      },
      // 2
      {
        headerName: 'Cliente',
        field: 'value02',
        flex: 1,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellStyle: params => {
          if (params.data.electronico) {
            return {color: this.objColores.electronico};
          }
          return null;
        }
      },
      // 3
      {
        headerName: 'Artículo',
        field: 'value03',
        flex: 1,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellStyle: params => {
          if (params.data.status === 'CAN') {
            return {color: this.objColores.cancelada};
          }
          if (params.data.status === 'SUS') {
            return {color: this.objColores.suspendida};
          }
          return null;
        }
      },
      // 4
      {
        headerName: 'Cantid.',
        field: 'value04',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellStyle: params => {
          if (params.data.status === 'CAN') {
            return {color: this.objColores.cancelada};
          }
          if (params.data.status === 'SUS') {
            return {color: this.objColores.suspendida};
          }
          return null;
        }
      },
      // 5
      {
        headerName: 'Prod.',
        field: 'value05',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellStyle: params => {
          if (params.data.status === 'CAN') {
            return {color: this.objColores.cancelada};
          }
          if (params.data.status === 'SUS') {
            return {color: this.objColores.suspendida};
          }
          return null;
        }
      },
      // 6
      {
        headerName: 'U.P.',
        field: 'value06',
        flex: 1,
        minWidth: 60,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        },
        cellStyle: params => {
          if (!params.data.liberadoDS || params.data.enAtencion === 1) {
            return {color: this.objColores.accionCorrectiva};
          }
          return null;
        }
      },
      // 7
      {
        headerName: 'SaldoLam.',
        field: 'value07',
        flex: 1,
        minWidth: 115,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellStyle: params => {
          if (!params.data.liberadoDS || params.data.enAtencion === 1) {
            return {color: this.objColores.accionCorrectiva};
          }
          return null;
        }
      },
      // 8
      {
        headerName: 'Score',
        field: 'value08',
        flex: 1,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      // 9
      {
        headerName: 'Medidas',
        field: 'value09',
        flex: 1,
        minWidth: 125,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 10
      {
        headerName: 'Colores',
        field: 'value10',
        flex: 1,
        minWidth: 200,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 11
      {
        headerName: 'F. Ent.',
        field: 'value11',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 12
      {
        headerName: 'Corr',
        field: 'value12',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 13
      {
        headerName: 'Tmo.',
        field: 'value13',
        flex: 1,
        minWidth: 75,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 14
      {
        headerName: 'FF',
        field: 'value14',
        flex: 1,
        minWidth: 125,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 15
      {
        headerName: 'Programa',
        field: 'value15',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 17
      {
        headerName: 'Fecha Limite',
        field: 'value17',
        flex: 1,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 19
      {
        headerName: 'Inicio',
        field: 'value19',
        flex: 1,
        minWidth: 125,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 22
      {
        headerName: 'Proceso',
        field: 'value22',
        flex: 1,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 26
      {
        headerName: 'Pintado',
        field: 'value26',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      // 27
      {
        headerName: 'Comp-Impre, Acabados',
        field: 'value27',
        flex: 1,
        minWidth: 125,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 28
      {
        headerName: 'Comp Esp LBF',
        field: 'value28',
        flex: 1,
        minWidth: 125,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 29
      {
        headerName: 'EProceso',
        field: 'value29',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 30
      {
        headerName: 'PU Minimo',
        field: 'value30',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 31
      {
        headerName: 'PU Maximo',
        field: 'value31',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // 32
      {
        headerName: 'Clave Artículo',
        field: 'value32',
        flex: 1,
        minWidth: 130,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ];
    this.objMdlCap005.columnasGridMdlCap005 = [
      {
        headerName: 'Programa',
        field: 'programa',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Cantidad',
        field: 'cantidad',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Maq. Origen',
        field: 'maqOrigen',
        flex: 1,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'CveProceso',
        field: 'cveProceso',
        flex: 1,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'U.P.',
        field: 'ultimoProceso',
        flex: 1,
        minWidth: 60,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          disabled: true
          // change: this.changeChkCancelarOPs.bind(this)
        }
      },
      // {
      //   headerName: 'Ultimo Proceso',
      //   field: 'ultimoProceso',
      //   flex: 1,
      //   minWidth: 110,
      //   headerClass: 'header-center header-grid',
      //   cellClass: 'grid-cell-center'
      // },
      {
        headerName: 'Artículo',
        field: 'articulo',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ];
    this.objMdlCap005.columnasInconvenientes =[
      {
        headerName: 'Mensaje',
        field: 'mensajeInvalido',
        flex: 5,
        minWidth: 100,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
    ];
  }

  async ngOnInit(): Promise<void> {
    this.objMdlCap005Inconvenientes = [];
    this.pUser = localStorage.getItem('Usuario');
    this.pZonaERP = localStorage.getItem('Zona');
    this.objCamposGeneral.fechaSecuencia = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    await this.fechaTurnoTrabajo();
    await this.changeRbtnTipoMaquina();

    // // await this.cargaMaquinas(this.objCbxMaquinas.rbtnTipoMaquina);
    // // await this.getSecuencias(this.objCbxMaquinas.rbtnTipoMaquina, this.objCbxMaquinas.selected);
  }

  // ==========================================================================================================================
  // METODOS PRINCIPAL

  async setSigProCap(): Promise<void> {
    const dataSigProCap: Array<objSigProgCap> = await this.obtieneSigProCap();

    this.objCamposGeneral.sigProCap = '';
    this.objCamposGeneral.primeroTurnoActual = '';

    if (dataSigProCap && dataSigProCap.length > 0) {
      if (dataSigProCap[0].msjInfo !== '') {
        this.mensajeFlotante('info', dataSigProCap[0].msjInfo, 5000);
      }

      this.objCamposGeneral.sigProCap = dataSigProCap[0].sigProCap;
      this.objCamposGeneral.primeroTurnoActual = dataSigProCap[0].primeroTurnoActual;
    }
  }

  async getSecuencias(tipoMaquina: string, claveMaquina: string): Promise<void> {
    await this.cargaSecuencias(tipoMaquina, claveMaquina);
    await this.calculaCantidad();
    await this.delay(50);
    this.gridPrincipal_OnReady(this.gridSecuenciasPrincipal);
    if (this.dataGridSecuencias.length > 0) {
      this.objCamposGeneral.fechaSecuencia
        = this.cambiarFormatoFecha(this.dataGridSecuencias[0].value19.substring(0, 10), 'dia', 'mes', 'año', '/', 'yyyy-MM-dd');
    }

    // HABILITAR BOTON ORDENAR POR OP
    this.objVisible.btnOrdenarOP = this.objCbxMaquinas.rbtnTipoMaquina === '1' && this.objCbxMaquinas.selected === 'PALET';
  }

  async cargaMaquinas(tipo: string): Promise<void> {
    this.objCbxMaquinas.listMaquinas = [];
    this.objCbxMaquinas.listMaquinas = await this.getMaquinas(tipo, '');
    if (this.objCbxMaquinas.listMaquinas.length > 0) {
      this.objCbxMaquinas.selected = this.objCbxMaquinas.listMaquinas[0].claveMaquina;
      await this.setMaquinaMantenimiento(this.objCbxMaquinas.selected);
    }
    this.objMdlCap005.listMaquinas = await this.getMaquinas(tipo, this.objCbxMaquinas.tipoSelected);
  }

  async cargaSecuencias(tipo: string, claveMaquina: string): Promise<void> {
    this.blockUI.start('Cargando secuencias...');
    try {
      const values: any = await this.getSecuenciaMaquinasOpsCanceladas(tipo, claveMaquina);
      this.dataGridSecuencias = [];
      this.blockUI.stop();
      if (values.data && values.data.length === 1) {
        if (values.data[0].estatus === 'ERROR') {
          Swal.fire({
            title: 'Información',
            html: values.data[0].notas,
            icon: 'info'
          });
          return;
        }
      }
      this.dataGridSecuencias = values.data;
      this.objMaquinasCanceladas.data = values.data2;

      // MAQUINAS CANCELADAS
      if (values.data2 && values.data2.length > 0) {
        this.lockedCamposGeneral(false);
      }
      else {
        this.lockedCamposGeneral(true);
      }
    } catch (error) {
      this.blockUI.stop();
      Swal.fire({
        title: 'Error',
        html: error.error,
        icon: 'error'
      });
    }
  }

  async calculaCantidad(): Promise<void> {
    this.objCamposGeneral.txtTotalCantidad = '';
    let total = 0, horas = 0, minutos = 0;
    for (const iterator of this.dataGridSecuencias) {
      total += iterator.value04;
      horas = Number(this.getHourMinute(iterator.value13, true));
      minutos += Number(this.getHourMinute(iterator.value13)) + (horas * 60);
    }
    horas = parseInt((minutos / 60).toString());
    minutos = minutos - (horas * 60);
    this.objCamposGeneral.txtTotalTiempo = this.formatoNumber(horas, '00') + ':' + this.formatoNumber(minutos, '00');
    this.objCamposGeneral.txtTotalCantidad = formatNumber(total, 'en-US');
  }

  async setMaquinaMantenimiento(maquina: string): Promise<void> {
    const manto: estadoMantenimiento[] = await this.getMaquinaMantenimiento(maquina.trim());

    this.objMaquinaMto.texto = 'Estado no encontrado';
    this.objMaquinaMto.mantenimiento = false;
    for (const iterator of manto) {
      this.objMaquinaMto.mantenimiento = iterator.estado;
      this.objMaquinaMto.texto = 'Maquina en mantenimiento';
    }
  }

  async gridPrincipal_Change(): Promise<void> {
    // OBTENER FILA SELECCIONADA
    const obj: any = this.gridSecuenciasPrincipal.getSelectedData();
    const secuenciaSeleccionada: listSecuencia = obj.length > 0 ? obj[0] : undefined;
    // SETEAR DATOS GENERALES
    if (secuenciaSeleccionada) {
      const coment: Array<comentariosOP> = await this.getComentariosOPArticulo(secuenciaSeleccionada.value01, secuenciaSeleccionada.value18); // OP, ClaveArticulo
      if (coment.length > 0) {
        this.objCamposGeneral.especificacionesProceso = 'COMENTARIOS DE PROCESO: ' + secuenciaSeleccionada.value29.trim() + '\n';
        for (const iterator of coment) {
          this.objCamposGeneral.especificacionesProceso += '\nCOMENTARIOS DE OP: ' + iterator.comentario.trim();
        }
      }
      else {
        this.objCamposGeneral.especificacionesProceso = secuenciaSeleccionada.value29.trim();
      }
      this.objCamposGeneral.notas = secuenciaSeleccionada.value16.trim();
      this.objVisible.lblSuspendida = secuenciaSeleccionada.value25;
      this.objCamposGeneral.pintado = this.pZonaERP === '01' ? secuenciaSeleccionada.value26 : false;
      this.objCamposGeneral.comentariosProduccion = secuenciaSeleccionada.value21;
      this.objCamposGeneral.programaSeleccionado = ' | Prog. Sel. : ' + secuenciaSeleccionada.value15.toString().trim();
      this.objVisible.aql = secuenciaSeleccionada.value33;
      this.objVisible.articuloNuevo = secuenciaSeleccionada.value34;

      // Habilitar o Deshabilitar botones de subir y bajar posición de secuencia
      this.disabledBtnSubeBajaPosicion(secuenciaSeleccionada);
    }
  }

  disabledBtnSubeBajaPosicion(secuencia: listSecuencia): void {
    if (secuencia.value00 === 1) {
      this.objDisabled.btnSubePosicion = true; this.objDisabled.btnBajaPosicion = false;
    }
    else if (secuencia.value00 === this.dataGridSecuencias.length) {
      this.objDisabled.btnSubePosicion = false; this.objDisabled.btnBajaPosicion = true;
    }
    else {
      this.objDisabled.btnSubePosicion = false; this.objDisabled.btnBajaPosicion = false;
    }
  }

  async changeRbtnTipoMaquina(): Promise<void> {
    await this.cargaMaquinas(this.objCbxMaquinas.rbtnTipoMaquina);
    await this.changeCbxMaquina();
  }
  async changeCbxMaquina(): Promise<void> {
    for (const iterator of this.objCbxMaquinas.listMaquinas) {
      if (iterator.claveMaquina === this.objCbxMaquinas.selected) {
        this.objCbxMaquinas.tipoSelected = iterator.tipoMaquina;
        if (iterator.implementadoAut) {
          this.objCamposGeneral.esCapAut = iterator.esCapAut;
        }
        else {
          this.objCamposGeneral.esCapAut = iterator.implementadoAut;
        }
      }
    }
    await this.getSecuencias(this.objCbxMaquinas.rbtnTipoMaquina, this.objCbxMaquinas.selected);
    await this.marcarSigProCap();
  }

  gridPrincipal_OnReady(ref: GridModel): void {
    this.gridSecuenciasPrincipal = ref;
    this.selectOPGridPrincipalSecuencia(1);
  }

  lockedCamposGeneral(block: boolean): void {
    this.objDisabled.btnAceptarNotas = !block;
    this.objDisabled.btnAgregarOP = !block;
    this.objCamposGeneral.imgAtencionVisible = !block;
  }

  clickAceptarNotas(): void {

  }

  cap016Change_ChkSelectAll(): void {
    for (const iterator of this.objMdlCap016.dataGrid) {
      iterator.seleccionado = this.objMdlCap016.selectAll;
    }
    this.objMdlCap016.dataGrid = cloneDeep(this.objMdlCap016.dataGrid);
  }

  objCap016ValidarTraspasoOps = new cap016ValidarTraspasoOps();
  objSpActOpc10 = new spActOpc10();
  async cap016ClickTraspasarOPs(): Promise<void> {
    if (!this.objMdlCap016.selected) {
      Swal.fire('Información', 'Favor de seleccionar la máquina destino', 'info');
      return;
    }
    var existeSeleccionado = false;
    for (const iterator of this.objMdlCap016.dataGrid) {
      if (iterator.seleccionado) {
        existeSeleccionado = true;
        break;
      }
    }
    if (!existeSeleccionado) {
      Swal.fire('Información', 'Favor de seleccionar al menos una OP a transferir', 'info');
      return;
    }

    this.objCap016ValidarTraspasoOps = new cap016ValidarTraspasoOps();
    var tmpCap016ValidarTraspasoOps: Array<datosGridCap016>;
    tmpCap016ValidarTraspasoOps = [];

    this.objCap016ValidarTraspasoOps.claveMaquina = this.objMdlCap016.selected;
    for (const iterator of this.objMdlCap016.dataGrid) {
      if (iterator.seleccionado) {
        this.objCap016ValidarTraspasoOps.cap016TD_001.push(iterator);
      }
    }
    tmpCap016ValidarTraspasoOps = this.objCap016ValidarTraspasoOps.cap016TD_001;

    this.blockUI.start('');
    await this.Servicio.cap016ValidarTraspasoOps(this.objCap016ValidarTraspasoOps).subscribe(async (res: any) => {
      this.blockUI.stop();
      this.objCap016ValidarTraspasoOps.cap016TD_001 = [];
      if (res) {
        var dataRes: Array<datosGridCap016> = res.data;
        this.objSpActOpc10 = new spActOpc10();
        this.objSpActOpc10.cveMaqOri = '', this.objSpActOpc10.cveMaqDes = '', this.objSpActOpc10.cap016TD_001 = [];
        if (dataRes.length > 0) {
          // Preguntar antes de realizar traspaso
          this.objMdlCap016.dataGridInconvenientes = dataRes;
          await Swal.fire({
            title: 'La(s) siguiente(s) OP(s) ya se encuentra(n) asignada(s) a la máquina ' + this.objMdlCap016.selected,
            html:
              '<label>Seleccionar las OPs que desea agregar de nuevo</label>' +
              '<div class="container-fluid">' +
                '<div class="row">' +
                  '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
                    '<grid-cs #gridMdlCap016Inconvenientes [columnDefs]="objMdlCap016.columnsInconvenientes" [(data)]="objMdlCap016.dataGridInconvenientes" [rowsPerPage]="7" [enablePagination]="true"></grid-cs>' +
                  '</div>' +
                '</div>' +
              '</div>',
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#28A745',
            cancelButtonColor: '#DC3545',
            cancelButtonText: '<i class="fa fa-times"></i> NO',
            confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
          }).then(async (result) => {
            if (result.isConfirmed) {
              // Agregar seleccionados de los inconvenientes encontrados
              for (const iterator of this.objMdlCap016.dataGridInconvenientes) {
                if (iterator.seleccionado) {
                  this.objCap016ValidarTraspasoOps.cap016TD_001.push(iterator);
                }
              }
              // agregar de la lista original los que estén seleccionados pero que no aparezcan en los inconvenientes
              tmpCap016ValidarTraspasoOps.map((fila, i) => {
                this.objCap016ValidarTraspasoOps.cap016TD_001.filter(fila2 => {
                  return fila.op === fila2.op && fila.orden === fila2.orden
                }).length === 0 ? (
                  fila.seleccionado ? (this.objMdlCap016.dataGridInconvenientes.filter(fila3 => {
                    return fila.op === fila3.op && fila.orden === fila3.orden
                  }).length === 0 ? this.objCap016ValidarTraspasoOps.cap016TD_001.push(fila) : fila) : fila
                ) : fila
              });

              this.objSpActOpc10.cveMaqOri = this.objCbxMaquinas.selected;
              this.objSpActOpc10.cveMaqDes = this.objMdlCap016.selected;
              this.objSpActOpc10.cap016TD_001 = this.objCap016ValidarTraspasoOps.cap016TD_001;
              // Ejecutar traspaso con las OPs seleccionadas (después de la validación de inconvenientes)
              this.llamarEjecutarTraspaso();
            }
            else {
              return;
            }
          });
          return;
        }
        else {
          this.objSpActOpc10.cveMaqOri = this.objCbxMaquinas.selected;
          this.objSpActOpc10.cveMaqDes = this.objMdlCap016.selected;
          this.objSpActOpc10.cap016TD_001 = tmpCap016ValidarTraspasoOps;
          // Ejecutar traspaso con las OPs seleccionadas (sin inconvenientes)
          this.llamarEjecutarTraspaso();
        }
      }
    }, async (err: any) => {
      this.blockUI.stop();
      Swal.fire('ERROR', err, 'error');
    });
  }

  async llamarEjecutarTraspaso(): Promise<void> {
    await this.Servicio.cap016TraspasarProgramas(this.objSpActOpc10).subscribe((res: any) => {
      const result: Array<errorSQL> = res.data;
      if (result) {
        if (result.length > 0) {
          Swal.fire(
            result[0].completado ? 'Completado' : 'Información',
            result[0].message,
            result[0].completado ? 'success' : 'info'
          );
        }
        else {
          Swal.fire('Información', 'El proceso de traspaso no se completo de manera correcta', 'info');
        }
      }
      else {
        Swal.fire('Error', 'Ha ocurrido un error durante el proceso de traspaso', 'error');
      }
    }, (err: any) => {
      Swal.fire('Error', 'Ha ocurrido un error durante el proceso de traspaso\n' + err, 'error');
    });
  }

  async abrirMdlTraspasarProgramas(): Promise<void> {
    this.objMdlCap016.listMaquinas = [];
    this.objMdlCap016.dataGrid = [];

    const values: any = await this.Servicio.getDatosCap016(this.objCbxMaquinas.rbtnTipoMaquina, this.objCbxMaquinas.selected);
    if (values) {
      this.objMdlCap016.listMaquinas = values.data;
      this.objMdlCap016.dataGrid = values.data2;

      this.mdlCap016Ref = this.modalService.open(this.mdlCap016, {size: 'xl', backdrop: 'static'});
    }
  }

  objCap001SuspenderOP = new cap001SuspenderOP();
  async suspenderOP(): Promise<void> {
    // Obtener fila seleccionada
    const obj: any = await this.gridSecuenciasPrincipal.getSelectedData();
    const secSelected: listSecuencia = obj.length > 0 ? obj[0] : undefined;

    if (secSelected) {
      this.objCap001SuspenderOP = { programa: 0, suspendido: false };
      // '0' = IMPRESORAS
      if (this.objCbxMaquinas.rbtnTipoMaquina === '0' && this.objCamposGeneral.esCapAut) {
        await this.setSigProCap();
        // AQUI REVISA DE ALGUNO DE LOS DOS PROGRAMAS ES EL SIGUIENTE DE CAPTURAR
        if (secSelected.value15 === Number(this.objCamposGeneral.sigProCap) || secSelected.value15 === Number(this.objCamposGeneral.primeroTurnoActual)) {
          const tmpProd: boolean = await this.tieneProduccionTmpReal(secSelected.value15.toString(), '', this.objCamposGeneral.fechaTrabajo, this.objCamposGeneral.turnoTrabajo);
          if (!tmpProd) {
            var varContabilizadoPlcProg: boolean = await this.contabilizadoPlcProg(this.objCbxMaquinas.selected);
            if (varContabilizadoPlcProg) {
              Swal.fire(
                'Información',
                'Al programa seleccionado se le está contabilizando producción...\n' +
                  'Se recomienda que el operador le capture producción y su desperdicio para continuar... (Programa: ' + secSelected.value15.toString() + ')',
                'info'
              );
              return;
            }
          }
        }
      }

      await Swal.fire({
        title: '',
        text: (secSelected.value25 ? '¿Quitar Estatus Suspendido a OP ' : '¿Continuar con Suspensión de OP ') + secSelected.value01 + '?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: "#28A745",
        cancelButtonColor: "#DC3545",
        cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
        confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.objCap001SuspenderOP = { programa: secSelected.value15, suspendido: !secSelected.value25 };

          this.blockUI.start('');
          await this.Servicio.suspenderOP(this.objCap001SuspenderOP).subscribe(async (res: any) => {
            this.blockUI.stop();
            const datos: Array<errorSQL> = res.data;
            if (datos && datos.length > 0) {
              if (datos[0].completado) {
                Swal.fire('Completado', datos[0].message, 'success');
                await this.changeRbtnTipoMaquina();
              }
              else {
                Swal.fire('Información', datos[0].message, 'info');
              }
            }
            else {
              Swal.fire('Información', 'ocurrió un inconveniente al suspender OP', 'info');
            }
          }, async (err: any) => {
            this.blockUI.stop();
            Swal.fire('Error', 'Error: ' + err.error, 'error');
          });
          return;
        }
      });
    }
  }

  objConsultaProgramasEliminar = new objProgramasCap001();
  objProgramasEliminar = new objSPActOpc6();
  async eliminarOP(): Promise<void> {
    var wJustificacion = '';
    // Obtener fila seleccionada
    const obj: any = await this.gridSecuenciasPrincipal.getSelectedData();
    const secuenciaSeleccionada: listSecuencia = obj.length > 0 ? obj[0] : undefined;

    if (secuenciaSeleccionada) {
      if (secuenciaSeleccionada.value14 !== '') {
        Swal.fire('Información', 'La OP ' + secuenciaSeleccionada.value01 + ' está fija para producirse en ' + secuenciaSeleccionada.value14, 'info');
        return;
      }
      if (secuenciaSeleccionada.value05 > 0) {
        Swal.fire('Información', 'El programa seleccionado tiene producción, se recomienda darlo por terminado... (OP: ' + secuenciaSeleccionada.value01 + ')', 'info');
        return;
      }

      if (this.objCbxMaquinas.rbtnTipoMaquina === '0' && this.objCamposGeneral.esCapAut) {
        await this.setSigProCap();
        var varContabilizadoPlcProg: boolean = await this.contabilizadoPlcProg(this.objCbxMaquinas.selected);
        var varTieneProduccionRealCapSF: boolean = await this.tieneProduccionRealCapSF(secuenciaSeleccionada.value15, '');

        if (
          (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.sigProCap) && varContabilizadoPlcProg) ||
          (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.primeroTurnoActual) && varContabilizadoPlcProg)
        ) {
          if (!this.objMaquinaMto.mantenimiento) {
            Swal.fire(
              'Información',
              'El programa seleccionado está en proceso de producción y tiene una cantidad producida...\n'+
                'Se recomienda que se le capture producción y su desperdicio para continuar... (Programa: ' + secuenciaSeleccionada.value15,
              'info'
            );
            return;
          }
        }

        if (
          (secuenciaSeleccionada.value15 == Number(this.objCamposGeneral.sigProCap) && !varTieneProduccionRealCapSF) ||
          (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.primeroTurnoActual) && !varTieneProduccionRealCapSF)
        ) {
          if (!this.objMaquinaMto.mantenimiento) {
            Swal.fire(
              'Información',
              'El programa seleccionado no ha finalizado su captura de producción...\n'+
                'Se recomienda que el operador capture su desperdicio para continuar... (Programa: ' + secuenciaSeleccionada.value15,
              'info'
            );
            return;
          }
        }
      }

      // this.objCamposGeneral.imgAtencionVisible
      await Swal.fire({
        title: 'Eliminar Op',
        text: '¿Está seguro de Eliminar la Op seleccionada de la Secuencia de Impresoras' + (this.objCamposGeneral.imgAtencionVisible ? ' y Acabados?' : '?'),
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: "#28A745",
        cancelButtonColor: "#DC3545",
        cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
        confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // VALIDA JUSTIFICACIÓN
          if (!await this.validaJustificacionUsuario()) {
            await Swal.fire({
              title: 'Justificación',
              html: 'Justificación de Eliminación de Programa: ',
              input: 'text',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
              inputValidator: async arreglo => {
                if (!arreglo) {
                  return 'Favor de capturar la justificación';
                }
                else {
                  if (this.isNumber(arreglo)) {
                    return 'Es necesario capturar la justificación. No fue posible actualizar.';
                  }
                  if (arreglo.length > 300) {
                    return 'Solo se permiten 300 caracteres. No fue posible actualizar.';
                  }
                  if (!await this.validaJustificacionUsuario()) {
                    return 'Para guardar es necesario capturar la justificación de cambios en programación.';
                  }
                  return undefined;
                }
              }
            }).then(async (result) => {
              if (result.isConfirmed) {
                wJustificacion = result.value.toString();
              }
              else {
                return;
              }
            });
          }

          if (wJustificacion !== '') { wJustificacion = 'Eliminación de Programa. ' + wJustificacion; }

          this.objConsultaProgramasEliminar = new objProgramasCap001();
          this.objConsultaProgramasEliminar.cap005TD_001 = [];
          this.objConsultaProgramasEliminar.cveMaquina = this.objCbxMaquinas.selected;
          this.objConsultaProgramasEliminar.cap005TD_001.push({
            programa: secuenciaSeleccionada.value15, op: '', cantidad: 0, maqOrigen: '',
            cveProceso: '', ultimoProceso: false, articulo: ''
          });

          await this.Servicio.cap001ValidaProgramaProcAuto(this.objConsultaProgramasEliminar).subscribe(async (res: any) => {
            this.blockUI.stop();
            const datos: Array<modelMdlCap001> = res.data;
            var programas = '';

            var tmpCap005TD_001: Array<modelMdlCap001>;
            var tmpCap001TD_001: Array<listSecuencia>;
            tmpCap005TD_001 = []; tmpCap001TD_001 = [];

            // Recorrer multiples OPs seleccionadas
            tmpCap001TD_001.push(secuenciaSeleccionada);
            this.objProgramasEliminar = new objSPActOpc6();
            this.objProgramasEliminar.claveMaquina = this.objCbxMaquinas.selected;
            this.objProgramasEliminar.imgAtencion = this.objCamposGeneral.imgAtencionVisible;
            this.objProgramasEliminar.justificacion = wJustificacion;
            this.objProgramasEliminar.tmpCap001TD_001 = tmpCap001TD_001;

            if (datos && datos.length > 0) {
              for (const iterator of datos) {
                programas += iterator.programa + ', ';
                tmpCap005TD_001.push({
                  programa: iterator.programa, op: '', cantidad: 0, maqOrigen: '',
                  cveProceso: '', ultimoProceso: false, articulo: ''
                });
              }
              this.objProgramasEliminar.tmpCap005TD_001 = tmpCap005TD_001;
              programas = programas.substring(0, programas.length - 2);

              await Swal.fire({
                title: '¿Desea continuar?',
                html: (datos.length > 1 ? 'Los programas ' : 'El programa ') +
                  '(' + programas + ') que desea Eliminar ' +
                  (datos.length > 1 ? 'tienen ' : 'tiene ') + 'un proceso de impresión de etiquetas automático (1/1)',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#28A745",
                cancelButtonColor: "#DC3545",
                cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
                confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  // PENDIENTE 2022/08/11
                  // listSecuencia
                  await this.cap001EliminarOP();
                }
                else {
                  return;
                }
              });
            }
            else if (datos && datos.length === 0) {
              // PENDIENTE 2022/08/11
              // listSecuencia
              await this.cap001EliminarOP();
            }

            await this.marcarSigProCap();
          }, async (err: any) => {
            this.blockUI.stop();
            await Swal.fire('Error', 'Error: ' + err.error, 'error');
          });

          // await this.marcarSigProCap();
          return;
        }
      });
    }
    else {
      Swal.fire('Información', 'No existe registro seleccionado...', 'info');
    }
  }

  async cap001EliminarOP(): Promise<void> {
    await this.Servicio.cap001EliminarOP(this.objProgramasEliminar).subscribe(async (res: any) => {
      const tmpData: Array<errorSQL> = res.data;

      if (tmpData && tmpData.length > 0) {
        Swal.fire(
          tmpData[0].completado ? 'Completado' : 'Información',
          tmpData[0].message,
          tmpData[0].completado ? 'success' : 'info',
        );
      }
      else {
        Swal.fire('ERROR', 'Error al eliminar la OP seleccionada.', 'error');
      }
    }, async (err: any) => {
      this.blockUI.stop();
      await Swal.fire('Error', 'Error: ' + err.error, 'error');
    });
  }

  async aplicarCambios(): Promise<void> {
    if (this.dataGridSecuencias.length > 0) {
      this.objCap001TerminarPrograma2 = { claveMaquina: '', lFecha: '', cap001TD_001: [] };

      this.objCap001TerminarPrograma2 = {
        claveMaquina: this.objCbxMaquinas.selected,
        lFecha: this.objCamposGeneral.fechaSecuencia.replace('-', ''),
        cap001TD_001: this.dataGridSecuencias
      }
      // MANDAR A LLAMAR PARTE 2 DE TERMINAR PROGRAMA (PARA GUARDAR INFORMACIÓN)
      this.blockUI.start('');
      await this.Servicio.cap001TerminarPrograma2(this.objCap001TerminarPrograma2).subscribe(async (res: any) => {
        this.blockUI.stop();
        const datos: Array<errorSQL> = res.data;
        if (datos && datos.length > 0) {
          if (datos[0].completado) {
            await Swal.fire('Completado', '', 'success');
            await this.changeCbxMaquina();
          }
          else {
            await Swal.fire('Información', datos[0].message, 'info');
          }
        }
        else {
          await Swal.fire('Error', 'Ocurrió un error al termniar programa', 'error');
        }
      }, async (err: any) => {
        this.blockUI.stop();
        await Swal.fire('Error', 'Error: ' + err.error, 'error');
      });
    }
    else {
      Swal.fire('Información', 'Sin información, favor de capturar secuencias', 'info');
    }
  }

  objCap001TerminarPrograma = new cap004FijarFecha();
  objCap001TerminarPrograma2 = new spActOpc8();
  async terminaProgramacionOP(): Promise<void> {
    // Obtener fila seleccionada
    const obj: any = await this.gridSecuenciasPrincipal.getSelectedData();
    const secSelected: listSecuencia = obj.length > 0 ? obj[0] : undefined;

    if (secSelected) {
      this.objCap001TerminarPrograma = { programa: 0, claveMaquina: '', op: '', fecha: '', quitar: false };
      this.objCap001TerminarPrograma2 = { claveMaquina: '', lFecha: '', cap001TD_001: [] };
      // '0' = IMPRESORAS
      if (this.objCbxMaquinas.rbtnTipoMaquina === '0' && this.objCamposGeneral.esCapAut) {
        await this.setSigProCap();
        var varContabilizadoPlcProg: boolean = await this.contabilizadoPlcProg(this.objCbxMaquinas.selected);

        if (
          (secSelected.value15 === Number(this.objCamposGeneral.sigProCap) && varContabilizadoPlcProg) ||
          (secSelected.value15 === Number(this.objCamposGeneral.primeroTurnoActual) && varContabilizadoPlcProg)
        ) {
          if (!this.objMaquinaMto.mantenimiento) {
            Swal.fire(
              'Información',
              'Al programa seleccionado se le está contabilizando producción...\n'+
                'Se recomienda que el operador le capture producción y su desperdicio para continuar... (Programa: ' + secSelected.value15.toString() + ')',
              'info'
            );
            return;
          }
        }

        var varTieneProduccionRealCapSF: boolean = await this.tieneProduccionRealCapSF(secSelected.value15, '');
        if (!varTieneProduccionRealCapSF) {
          if (!this.objMaquinaMto.mantenimiento) {
            Swal.fire(
              'Información',
              'El programa seleccionado no ha finalizado su captura de producción...\n'+
                'Se recomienda que el operador capture su desperdicio para continuar... (Programa: ' + secSelected.value15.toString() + ')',
              'info'
            );
            return;
          }
        }
      }

      if (secSelected.value05 === 0) {
        Swal.fire('Información', 'El programa seleccionado no tiene producción...\nSe recomienda cancelarlo...', 'info');
        return;
      }

      await Swal.fire({
        title: '¿Está seguro de Cerrar el Programa seleccioando?',
        text: 'Producido: ' + secSelected.value05.toString(),
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: "#28A745",
        cancelButtonColor: "#DC3545",
        cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
        confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.objCap001TerminarPrograma = {
            programa: secSelected.value15,
            claveMaquina: this.objCbxMaquinas.selected,
            op: '', fecha: '', quitar: false
          };
          this.blockUI.start('');
          await this.Servicio.cap001TerminarPrograma1(this.objCap001TerminarPrograma).subscribe(async (res: any) => {
            this.blockUI.stop();
            const datos: Array<errorSQL> = res.data;
            if (datos && datos.length > 0) {
              if (datos[0].completado) {
                var index = 0;
                for (const elemento of this.dataGridSecuencias) {
                  if (secSelected.value00 === elemento.value00) {
                    this.dataGridSecuencias.splice(index, 1);
                  }
                  index += 1;
                }
                this.dataGridSecuencias.forEach((value, index) => {
                  value.value00 = index + 1;
                });
                this.dataGridSecuencias = cloneDeep(this.dataGridSecuencias);

                this.objCap001TerminarPrograma2 = {
                  claveMaquina: this.objCbxMaquinas.selected,
                  lFecha: this.objCamposGeneral.fechaSecuencia.replace('-', ''),
                  cap001TD_001: this.dataGridSecuencias
                }
                // MANDAR A LLAMAR PARTE 2 DE TERMINAR PROGRAMA
                this.blockUI.start('');
                await this.Servicio.cap001TerminarPrograma2(this.objCap001TerminarPrograma2).subscribe(async (res: any) => {
                  this.blockUI.stop();
                  const datos: Array<errorSQL> = res.data;
                  if (datos && datos.length > 0) {
                    if (datos[0].completado) {
                      await Swal.fire('Completado', '', 'success');
                    }
                    else {
                      await Swal.fire('Información', datos[0].message, 'info');
                    }
                  }
                  else {
                    await Swal.fire('Error', 'Ocurrió un error al termniar programa', 'error');
                  }
                }, async (err: any) => {
                  this.blockUI.stop();
                  await Swal.fire('Error', 'Error: ' + err.error, 'error');
                });
              }
              else {
                await Swal.fire('Información', datos[0].message, 'info');
              }
            }
            else {
              await Swal.fire('Error', 'Ocurrió un error al termniar programa', 'error');
            }
          }, async (err: any) => {
            this.blockUI.stop();
            await Swal.fire('Error', 'Error: ' + err.error, 'error');
          });
          return;
        }
      });
    }
    else {
      Swal.fire('Información', 'No existe registro seleccionado', 'info');
    }
  }

  async secuenciaSubeBaja(sube: boolean): Promise<void> {
    this.blockUI.start(sube ? 'Subiendo OP...' : 'Bajando OP...');
    // Obtener fila seleccionada
    const obj: any = await this.gridSecuenciasPrincipal.getSelectedData();
    const secSelected: listSecuencia = obj.length > 0 ? obj[0] : undefined;

    // Seleccionar siguiente
    await this.selectOPGridPrincipalSecuencia((sube ? secSelected.value00 - 1 : secSelected.value00 + 1));
    const obj2: any = await this.gridSecuenciasPrincipal.getSelectedData();
    const secSelected2: listSecuencia = obj2.length > 0 ? obj2[0] : undefined;

    // Seleccionar el actual
    await this.selectOPGridPrincipalSecuencia(secSelected.value00);

    if (secSelected) {
      if (secSelected.value00 > 1) {
        // PENDIENTE
        if (sube) {
          await this.subeBloqueN(secSelected);
        }
        else {
          await this.bajaBloqueN(secSelected);
        }
        await this.setSigProCap();
        // Activa botones
      }

      // PENDIENTE VALIDAR COLOR DE PROGRAMA
      if (secSelected.value14 !== '') {
        this.blockUI.stop();
        Swal.fire('Información', 'La OP ' + secSelected.value01 + ' está fija para producirse en ' + secSelected.value14, 'info');
        return;
      }
      if (secSelected2.value14 !== '') {
        this.blockUI.stop();
        Swal.fire('Información', 'La OP ' + secSelected2.value01 + ' está fija para producirse en ' + secSelected2.value14, 'info');
        return;
      }

      // '0' = IMPRESORAS
      if (this.objCbxMaquinas.rbtnTipoMaquina === '0' && this.objCamposGeneral.esCapAut) {
        await this.setSigProCap();
        var varContabilizadoPlcProg: boolean = await this.contabilizadoPlcProg(this.objCbxMaquinas.selected);

        if (
          (secSelected.value15 === Number(this.objCamposGeneral.sigProCap) || secSelected2.value15 === Number(this.objCamposGeneral.sigProCap)) ||
          (secSelected.value15 === Number(this.objCamposGeneral.primeroTurnoActual) || secSelected2.value15 === Number(this.objCamposGeneral.primeroTurnoActual))
        ) {
          const tmpProd: boolean = await this.tieneProduccionTmpReal(secSelected.value15.toString(), '', this.objCamposGeneral.fechaTrabajo, this.objCamposGeneral.turnoTrabajo);

          if (!tmpProd) {
            if (varContabilizadoPlcProg) {
              if (!this.objMaquinaMto.mantenimiento) {
                this.blockUI.stop();
                Swal.fire(
                  'Información',
                  'Al programa seleccionado se le está contabilizando producción...\nSe recomienda que el operador le capture producción y su desperdicio para continuar... '
                    + '(Programa: ' + secSelected.value15.toString() + ')',
                  'info'
                );
                return;
              }
            }
          }
        }

      }

      // Mover secuencia
      this.dataGridSecuencias[secSelected.value00 - 1] = secSelected2;
      this.dataGridSecuencias[secSelected2.value00 - 1] = secSelected;
      // this.dataGridSecuencias[secSelected.value00 - 1].value00 = secSelected.value00 + 1;
      // this.dataGridSecuencias[secSelected2.value00 - 1].value00 = secSelected2.value00 - 1;
      secSelected.value00 = (sube ? secSelected.value00 - 1 : secSelected.value00 + 1);
      secSelected2.value00 = (sube ? secSelected2.value00 + 1 : secSelected2.value00 - 1);
      this.dataGridSecuencias = cloneDeep(this.dataGridSecuencias);

      await this.delay(80);

      // Seleccionar secuencia
      await this.selectOPGridPrincipalSecuencia(secSelected.value00);

      // PENDIENTE ACTIVAR BOTONES
      this.blockUI.stop();
    }
    else {
      this.blockUI.stop();
    }
  }

  // PENDIENTE
  async subeBloqueN(secuencia: listSecuencia): Promise<void> {

  }
  // PENDIENTE
  async bajaBloqueN(secuencia: listSecuencia): Promise<void> {

  }

  async openMdlAgregarOP(): Promise<void> {
    if (this.objCbxMaquinas.selected) {
      // Abrir modal Cap003
      this.mdlCap003Ref = this.modalService.open(this.mdlCap003, {size: 'xl', backdrop: 'static'});
    }
    else {
      this.mensajeFlotante('info', 'Favor de seleccionar una máquina...', 3500);
    }
    await this.setSigProCap();
  }

  async cambiarOpMaquina(): Promise<void> {
    // Obtener fila seleccionada
    const obj: any = await this.gridSecuenciasPrincipal.getSelectedData();
    const secuenciaSeleccionada: listSecuencia = obj.length > 0 ? obj[0] : undefined;

    // '0' = IMPRESORAS
    if (this.objCbxMaquinas.rbtnTipoMaquina === '0' && this.objCamposGeneral.esCapAut) {
      await this.setSigProCap();

      if (secuenciaSeleccionada) {
        var varContabilizadoPlcProg: boolean = await this.contabilizadoPlcProg(this.objCbxMaquinas.selected);
        // progPosAct, progPosSig
        var varTieneProduccionRealCapSF: boolean = await this.tieneProduccionRealCapSF(secuenciaSeleccionada.value15, '');

        if (
          (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.sigProCap) && varContabilizadoPlcProg) ||
          (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.primeroTurnoActual) && varContabilizadoPlcProg)
        ) {
          if (!this.objMaquinaMto.mantenimiento) {
            Swal.fire(
              '',
              'Uno de los Programas seleccionados se le esta contabilizando produccion...\n' +
                'Se recomienda que el operador le capture produccion y su desperdicio para continuar... ' +
                '(Programa: ' + secuenciaSeleccionada.value15 + ')',
              'info'
            );
            return;
          }
        }

        if (
          (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.sigProCap && !varTieneProduccionRealCapSF)) ||
          (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.primeroTurnoActual) && !varTieneProduccionRealCapSF)
        ) {
          Swal.fire(
            '',
            'Uno de los Programas ha finalizado su captura de produccion...\n' +
              'No es posible cambiar de maquina (Programa: ' + secuenciaSeleccionada.value15 + ')',
            'info'
          );
          return;
        }
      }
    }

    if (secuenciaSeleccionada) {
      var varValidaArt: boolean = await this.validaArt(secuenciaSeleccionada.value18, this.objCbxMaquinas.selected);
      if (varValidaArt) {
        // value15, value01, value04, maquina, value22, value06, value18
        this.objMdlCap005.dataGridMdlCap005 = [];
        this.objMdlCap005.dataGridMdlCap005.push({
          programa: secuenciaSeleccionada.value15,
          op: secuenciaSeleccionada.value01,              // valor 1
          cantidad: secuenciaSeleccionada.value04,        // valor 2
          maqOrigen: this.objCbxMaquinas.selected,
          cveProceso: secuenciaSeleccionada.value22,
          ultimoProceso: secuenciaSeleccionada.value06,   // valor 3
          articulo: secuenciaSeleccionada.value18,
          mensajeInvalido: ''
        });
        this.objMdlCap005.listProgramas = [];
        this.objMdlCap005.listProgramas = this.objMdlCap005.dataGridMdlCap005;

        // Cargar datos modal (mdlCap005)
        this.objMdlCap005.modificaProceso = false;
        this.objMdlCap005.listMaquinas = await this.getMaquinas(this.objCbxMaquinas.rbtnTipoMaquina, this.objCbxMaquinas.tipoSelected, this.objCbxMaquinas.selected);
        this.objMdlCap005.listJustiticacionCambio = await this.getJustificaciones();
        this.objMdlCap005.listModificaProceso
          = await this.mdlCap009_GetCbxModificaProceso(this.objCbxMaquinas.selected, this.objMdlCap009.chkModificaProceso ? '1' : '0');
        this.objMdlCap005.selectedModificaProceso = secuenciaSeleccionada.value22;

        // Abrir modal
        this.mdlCap005Ref = this.modalService.open(this.mdlCap005, {size: 'md', backdrop: 'static'});

        // Verificar si la OP ya se programó en una máquina y fecha igual, pregunta continuación de la programación
        var res: Array<errorSQL> = await this.getOPProgramada(secuenciaSeleccionada.value01, this.objCbxMaquinas.selected);
        if (res && res.length > 0) {
          await Swal.fire({
            title: '¿Desea continuar?',
            text: 'OP ya Programada para esta Máquina el ' + res[0].message + '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#28A745",
            cancelButtonColor: "#DC3545",
            cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
            confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
          }).then(async (result) => {
            if (result.isDismissed) {
              this.mdlCap005Ref.close();
              return;
            }
          });
        }

        // getOPProgramada2
        this.objMdlCap005.datosOpc18 = [];
        this.objMdlCap005.datosOpc18 = await this.getOPProgramada2(secuenciaSeleccionada.value01, secuenciaSeleccionada.value15, secuenciaSeleccionada.value04);
        if (this.objMdlCap005.datosOpc18 && this.objMdlCap005.datosOpc18.length > 0) {
          if (!this.objMdlCap005.datosOpc18[0].autAgente) {
            Swal.fire('AVISO', 'OP NO AUTORIZADA POR REPRESENTANTE...', 'info');
            this.mdlCap005Ref.close();
            return;
          }
          if (this.objMdlCap005.datosOpc18[0].liberadoCostos) {
            Swal.fire('AVISO', 'OP LIBERADA PARA COSTOS... Programación Inválida', 'info');
            this.mdlCap005Ref.close();
            return;
          }
          if (this.objMdlCap005.datosOpc18[0].largoHoja === 0 || this.objMdlCap005.datosOpc18[0].anchoHoja === 0) {
            Swal.fire('AVISO', 'El articulo no tiene capturadas las medidas de la lámina... No es posible capturar.', 'info');
            this.mdlCap005Ref.close();
            return;
          }

          // VALIDA ULTIMO PROCESO
          this.objMdlCap005.divCantidadVisible = false;
          if (secuenciaSeleccionada.value06) {
            this.objMdlCap005.divCantidadVisible = true;
            this.objMdlCap005.cantidad = secuenciaSeleccionada.value04;
          }
        }
        else {
          Swal.fire('AVISO', 'OP INEXISTENTE O NO AUTORIZADA', 'info');
          this.mdlCap005Ref.close();
          return;
        }
      }
      else {
        Swal.fire('AVISO', 'El proceso de este Artículo está asignado a la máquina actual.\nFavor de revisar', 'info');
        this.mdlCap005Ref.close();
        return;
      }
    }

    this.marcarSigProCap();
  }

  // PENDIENTE
  btnProgramarImpresora(): void {
    if (this.objCbxMaquinas.selected) {

    }
    else {
      this.mensajeFlotante('info', 'Seleccione una máquian para continuar...', 3800);
    }
  }

  async marcarSigProCap(): Promise<void> {
    // '0' = IMPRESORAS
    if (this.objCbxMaquinas.rbtnTipoMaquina === '0' && this.objCamposGeneral.esCapAut) {
      this.objCamposGeneral.lblSiguienteProrgama = true;

      let porMarcar = 0, marcados = 0;

      await this.setSigProCap();

      if (this.objCamposGeneral.primeroTurnoActual !== '') {
        porMarcar += 1;
      }
      if (this.objCamposGeneral.sigProCap !== '') {
        porMarcar += 1;
      }
      // Si son iguales, solo deberá marcar una
      if (this.objCamposGeneral.sigProCap === this.objCamposGeneral.primeroTurnoActual) {
        porMarcar -= 1;
      }

      if (porMarcar > 0) {
        for (const iterator of this.dataGridSecuencias) {
          let value15 = iterator.value15.toString().trim();
          if (value15 === this.objCamposGeneral.sigProCap.trim() || value15 === this.objCamposGeneral.primeroTurnoActual.trim()) {
            this.selectOPGridPrincipalSecuencia(iterator.value00);
            marcados += 1;
          }
          if (marcados === porMarcar) {
            return;
          }
        }
      }
    }
    else {
      this.objCamposGeneral.lblSiguienteProrgama = false;
    }
  }

  // PENDIENTE
  obtieneFechaTurnoPLC(): boolean {
    return false;
  }

  // ==========================================================================================================================
  // MDLCAP005

  async clickMdlCap005_BtnAceptar(): Promise<void> {
    if (await this.validarTodo()) {
      if (await this.validarProgramaProcesoAuto()) {
        this.actualizarMaquina();
      }
    }
  }

  limpiarObjetoProgramas(): void {
    this.objMdlCap005Programas.cap005TD_001 = [];
    this.objMdlCap005Programas.txtJustificacion = '';
    this.objMdlCap005Programas.cveProceso = '';
    this.objMdlCap005Programas.cveMaquina = '';
    this.objMdlCap005Programas.optTipoMaquina = '';
  }

  async validarTodo(): Promise<boolean> {
    var correcto = true;
    this.limpiarObjetoProgramas();
    this.objMdlCap005Programas.cap005TD_001 = this.objMdlCap005.listProgramas;
    this.objMdlCap005Programas.txtJustificacion = this.objMdlCap005.selectedJustificacionCambio;
    this.objMdlCap005Programas.cveProceso = this.objMdlCap005.selectedModificaProceso;
    this.objMdlCap005Programas.cveMaquina = this.objMdlCap005.selectedMaquina;
    this.objMdlCap005Programas.optTipoMaquina = this.objCbxMaquinas.rbtnTipoMaquina;

    this.blockUI.start('');
    await this.Servicio.getValidaTodoCap005(this.objMdlCap005Programas).subscribe(async (res: any) => {
      this.blockUI.stop();
      if (res.data && res.data.length > 0) {
        this.objMdlCap005Inconvenientes = res.data;

        await Swal.fire({
          title: 'Se detectaron los siguientes inconvenientes: ',
          html:
            '<div class="container-fluid">' +
              '<div class="row">' +
                '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
                  '<grid-cs #gridMdlCap005Inconvenientes [columnDefs]="objMdlCap005.columnasInconvenientes" [(data)]="objMdlCap005Inconvenientes" [rowsPerPage]="5" [enablePagination]="true"></grid-cs>' +
                '</div>' +
              '</div>' +
              '<div class="row">' +
                '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
                  '<label><b>Favor de revisar</b></label>' +
                '</div>' +
              '</div>' +
            '</div>',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#28A745',
          // cancelButtonColor: '#DC3545',
          // cancelButtonText: '<i class="fa fa-times"></i> NO',
          confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
        }).then((result) => {
          if (result.value) {
            correcto = false;
          }
        });

        correcto = false;
      }
      else {
        correcto = true;
        if (res.data2 && res.data2.length > 0) {
          var lLargo = 0, lAncho = 0, pPzasSuaje = 0;
          const medidas: opc17p2 = res.data2[0];
          if (this.objMdlCap005Programas.cveProceso === 'PEG') {
            // this.objMdlCap005.datosOpc18[0]
            lLargo = this.objMdlCap005.datosOpc18[0].largoDesarrollo;
            lAncho = this.objMdlCap005.datosOpc18[0].anchoDesarrollo;
            pPzasSuaje = 1;
          }
          else {
            // this.objMdlCap005.datosOpc18[0]
            lLargo = this.objMdlCap005.datosOpc18[0].largoHoja;
            lAncho = this.objMdlCap005.datosOpc18[0].anchoHoja;
            pPzasSuaje = this.objMdlCap005.datosOpc18[0].piezasXhoja;
          }

          if ( (lLargo < medidas.largoMin || lLargo > medidas.largoMax) || (lAncho < medidas.anchoMin || lAncho > medidas.anchoMax) ) {
            Swal.fire('Información', 'La Caja de la Op ' + this.objMdlCap005.listProgramas[0].op + ' no se puede Fabricar por sus dimensiones', 'info');
            correcto = false;
          }
        }
        else{
          correcto = false;
        }
      }
    }, async (err: any) => {
      this.blockUI.stop();
      Swal.fire('Error', 'Error: ' + err.error, 'error');
      correcto = false;
    });

    return correcto;
  }

  async validarProgramaProcesoAuto(): Promise<boolean> {
    var correcto = true;
    this.blockUI.start('');
    await this.Servicio.getValidaProgramaProcAutoCap005(this.objMdlCap005Programas).subscribe(async (res: any) => {
      this.blockUI.stop();
      if (res.data && res.data.length > 0) {
        var programas = '';
        for (const iterator of res.data) {
          programas += iterator.programa.trim() + ', ';
        }
        programas = programas.substring(0, programas.length - 2);

        await Swal.fire({
          title: '¿Desea continuar con el cambio de máquina?',
          html:
            res.data.length > 1
              ? 'Los programas (' + programas + ') que desea cambiar de máquina tienen un proceso de impresión de etiquetas automático (1/1).'
              : 'El programa (' + programas + ') que desea cambiar de máquina tiene un proceso de impresión de etiquetas automático (1/1).',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#28A745',
          cancelButtonColor: '#DC3545',
          cancelButtonText: '<i class="fa fa-times"></i> NO',
          confirmButtonText: '<i class="fa fa-check"></i> SI'
        }).then((result) => {
          if (result.value) {
            correcto = true;
          }
          else {
            correcto = false;
          }
        });
      }
      else {
        correcto = false;
      }
    }, async (err: any) => {
      this.blockUI.stop();
      Swal.fire('Error', 'Error: ' + err.error, 'error');
      correcto = false;
    });

    return correcto;
  }

  async actualizarMaquina(): Promise<void> {
    this.blockUI.start('');
    await this.Servicio.actualizarMaquina(this.objMdlCap005Programas).subscribe(async (res: any) => {
      this.blockUI.stop();
      const datos: Array<errorSQL> = res.data;
      if (datos && datos.length > 0) {
        if (datos[0].completado) {
          Swal.fire('Completado Correctamente', '', 'success');
        }
        else {
          Swal.fire('Información', datos[0].message, 'info');
        }
      }
    }, async (err: any) => {
      this.blockUI.stop();
      Swal.fire('Error', 'Error: ' + err.error, 'error');
    });
  }

  objSPActOpc4 = new opc4p2();
  async cortarOPMaquina(inmPost: boolean): Promise<void> {
    var cantidad = 0, lPrograma = 0, lCantidad = 0, ren = 0, renInmPos = 0, lHoras = 0, lPiezas = 0, lTiempo = 0, lDiferencia = 0, lContinua = true;
    var wJustificacion = '';
    // Obtener fila seleccionada
    const obj: any = await this.gridSecuenciasPrincipal.getSelectedData();
    const secuenciaSeleccionada: listSecuencia = obj.length > 0 ? obj[0] : undefined;

    if (this.objCbxMaquinas.rbtnTipoMaquina === '0' /*&& this.objCamposGeneral.esCapAut*/) {
      await this.setSigProCap();

      if (secuenciaSeleccionada) {
        try {
          var varContabilizadoPlcProg: boolean = await this.contabilizadoPlcProg(this.objCbxMaquinas.selected);
          // progPosAct, progPosSig
          var varTieneProduccionRealCapSF: boolean = await this.tieneProduccionRealCapSF(Number(this.objCamposGeneral.sigProCap), this.objCamposGeneral.primeroTurnoActual);

          if (
            (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.sigProCap) && varContabilizadoPlcProg) ||
            (secuenciaSeleccionada.value15 === Number(this.objCamposGeneral.primeroTurnoActual) && varContabilizadoPlcProg)
          ) {
            if (!varTieneProduccionRealCapSF) {
              if (!this.objMaquinaMto.mantenimiento) {
                Swal.fire(
                  '',
                  'Uno de los Programas seleccionados se le esta contabilizando produccion...\n' +
                    'Se recomienda que el operador le capture produccion y su desperdicio para continuar... ' +
                    '(Programa: ' + secuenciaSeleccionada.value15 + ')',
                  'info'
                );
                return;
              }
            }
          }

          // VALIDA JUSTIFICACIÓN
          if (await !this.validaJustificacionUsuario()) {
            await Swal.fire({
              title: 'Justificación',
              html: 'Justificación de Corte de Programa: ',
              input: 'text',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
              inputValidator: async arreglo => {
                if (!arreglo) {
                  return 'Favor de capturar la justificación';
                }
                else {
                  if (this.isNumber(arreglo)) {
                    return 'Es necesario capturar la justificación. No fue posible actualizar.';
                  }
                  if (arreglo.length > 300) {
                    return 'Solo se permiten 300 caracteres. No fue posible actualizar.';
                  }
                  if (!await this.validaJustificacionUsuario()) {
                    return 'Para guardar es necesario capturar la justificación de cambios en programación.';
                  }
                  return undefined;
                }
              }
            }).then(async (result) => {
              if (result.isConfirmed) {
                wJustificacion = result.value.toString();
              }
            });
          }

          if (wJustificacion !== '') { wJustificacion = 'Corte de Programa. ' + wJustificacion; }

          if (secuenciaSeleccionada.value05 !== 0) {
            lDiferencia = secuenciaSeleccionada.value04 - secuenciaSeleccionada.value05;
            if (lDiferencia > 0) {
              lContinua = false;
            }
          }

          cantidad = secuenciaSeleccionada.value04;

          do {
            await Swal.fire({
              title: 'Cortar OP',
              html: lContinua
                ? 'Teclee la cantidad que tendrá el Nuevo Programa: '
                : 'Programa en proceso de producción, Solo puede reprogramar ' + lDiferencia,
              input: 'text',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
              inputValidator: async arreglo => {
                if (!arreglo) {
                  return 'Favor de capturar la cantidad';
                }
                else {
                  if (!lContinua) {
                    if (this.isNumber(arreglo)) {
                      if (lDiferencia !== Number(arreglo)) {
                        arreglo = String(cantidad + 999);
                      }
                    }
                    else {
                      arreglo = '0';
                    }
                  }

                  if (this.isNumber(arreglo)) {
                    if (Number(arreglo) === 0) {
                      return 'Favor de capturar una cantidad distinta a cero';
                    }
                    else {
                      cantidad = Number(arreglo);
                      lCantidad = cantidad;
                    }
                  }
                  else {
                    cantidad = 0;
                    return 'Valor inválido...';
                  }
                  return undefined;
                }
              }
            }).then(async (result) => {
              if (!result.isConfirmed) {
                return;
              }
            });
          } while (cantidad >= secuenciaSeleccionada.value04);

          this.objSPActOpc4 = new opc4p2();
          this.objSPActOpc4.justificacion = wJustificacion.trim();
          this.objSPActOpc4.inmPost = inmPost;
          this.objSPActOpc4.secuenciaSelected = [];
          this.objSPActOpc4.secuenciaSelected.push(secuenciaSeleccionada);
          this.objSPActOpc4.dataSecuencias = [];
          this.objSPActOpc4.dataSecuencias = this.dataGridSecuencias;

          this.blockUI.start('');
          await this.Servicio.reordenarProgInmediatosPosteriores(this.objSPActOpc4).subscribe(async (res: any) => {
            this.blockUI.stop();
            const datos: Array<errorSQL> = res.data;
            if (datos && datos.length > 0) {
              if (datos[0].completado) {
                await Swal.fire('Completado Correctamente', '', 'success');
              }
              else {
                await Swal.fire('Información', datos[0].message, 'info');
              }
            }
          }, async (err: any) => {
            this.blockUI.stop();
            await Swal.fire('Error', 'Error: ' + err.error, 'error');
          });

          await this.fechaTurnoTrabajo();
          await this.changeRbtnTipoMaquina();
          // // value00 = orden
          // renInmPos = secuenciaSeleccionada.value00 + 1;
          // if (inmPost) {
          //   if (this.dataGridSecuencias.length >= renInmPos) {
          //     for (let index = this.dataGridSecuencias.length; index > renInmPos; index--) {
          //       // const element = array[index];
          //       const tmp: Array<errorSQL> = await this.reordenarProgInmediatosPosteriores(secuenciaSeleccionada.value15);
          //     }
          //   }
          // }

        } catch (error) {
          Swal.fire('Error', error, 'error');
        }
      }
    }
  }

  isNumber(campo: string): boolean {
    return new RegExp('^[0-9]+([.][0-9]+)?$').test(campo.trim());
  }

  // ==========================================================================================================================
  // MDLCAP004

  objCap004FijarFecha = new cap004FijarFecha();
  async clickMdlCap004_BtnAceptar(): Promise<void> {
    this.objCap004FijarFecha = {
      programa: 0, claveMaquina: '', op: '', fecha: '', quitar: false
    };
    if (this.objMdlCap004.secuenciaSeleccionada) {
      this.objCap004FijarFecha = {
        programa: this.objMdlCap004.secuenciaSeleccionada.value15,
        claveMaquina: this.objCbxMaquinas.selected,
        op: this.objMdlCap004.secuenciaSeleccionada.value01,
        fecha: this.cambiarFormatoFecha(this.objMdlCap004.fecha, 'dia', 'mes', 'año', '/', 'yyyy-MM-dd') + ' ' + this.objMdlCap004.hora,
        quitar: this.objMdlCap004.quitar
      };
      this.blockUI.start('');
      await this.Servicio.cap004FijarFecha(this.objCap004FijarFecha).subscribe(async (res: any) => {
        this.blockUI.stop();
        const datos: Array<errorSQL> = res.data;
        if (datos && datos.length > 0) {
          if (datos[0].completado) {
            await Swal.fire('Completado Correctamente', '', 'success');
            this.mdlCap004Ref.close();
          }
          else {
            await Swal.fire('Información', datos[0].message, 'info');
          }
        }
      }, async (err: any) => {
        this.blockUI.stop();
        await Swal.fire('Error', 'Error: ' + err.error, 'error');
      });
    }
  }

  async fijarFecha(): Promise<void> {
    const obj: any = this.gridSecuenciasPrincipal.getSelectedData();
    const secuenciaSeleccionada: listSecuencia = obj.length > 0 ? obj[0] : undefined;

    this.objMdlCap004.op = '';
    this.objMdlCap004.fecha = '';
    this.objMdlCap004.hora = '';
    this.objMdlCap004.quitar = false;
    this.objMdlCap004.quitarVisible = false;
    this.objMdlCap004.secuenciaSeleccionada = new listSecuencia();
    if (secuenciaSeleccionada) {
      this.objMdlCap004.secuenciaSeleccionada = secuenciaSeleccionada;
      this.objMdlCap004.op = secuenciaSeleccionada.value01;
      this.objMdlCap004.fecha = secuenciaSeleccionada.value14 !== '' ? this.cambiarFormatoFecha(secuenciaSeleccionada.value14.substring(0, 10), 'dia', 'mes', 'año', '/', 'yyyy-MM-dd') : this.pipe.transform(new Date(), 'yyyy-MM-dd');
      this.objMdlCap004.hora = secuenciaSeleccionada.value14 !== '' ? secuenciaSeleccionada.value14.substring(11, 5) : '00:00';
      this.objMdlCap004.quitar = false;
      this.objMdlCap004.quitarVisible = true;
      if (this.objCbxMaquinas.rbtnTipoMaquina === '0' && this.objCamposGeneral.esCapAut) {
        if (await this.tieneProduccionTmpReal(secuenciaSeleccionada.value15.toString(), '', this.objCamposGeneral.fechaTrabajo, this.objCamposGeneral.turnoTrabajo)) {
          Swal.fire(
            'Información',
            'Uno de los Programas ha finalizado su captura de producción...\nNo puede modificar la acción fijar fecha (Programa: '
              + secuenciaSeleccionada.value15.toString() + ')',
            'info'
          );
        }
        else {
          this.mdlCap004Ref = this.modalService.open(this.mdlCap004, {size: 'md', backdrop: 'static'});
        }
      }
      else {
        this.mdlCap004Ref = this.modalService.open(this.mdlCap004, {size: 'md', backdrop: 'static'});
      }
    }
    else {
      Swal.fire('Información', 'Ocurrió un error al obtener la secuencia seleccionada', 'info');
    }
  }
  // ==========================================================================================================================

  mdlCap005CbxJustificacion_Change(): void {
    for (const iterator of this.objMdlCap005.listJustiticacionCambio) {
      if (iterator.id === this.objMdlCap005.selectedJustificacionCambio) {
        this.objMdlCap005.selectedJustificacionDescripcion = iterator.descripcion;
      }
    }
  }

  // ==========================================================================================================================
  // METODOS MODAL BUSCA OP

  openMdlCap013(): void {
    this.limpiarModalBusquedaOP();
    this.mdlCap013Ref = this.modalService.open(this.mdlCap013, {size: 'md', backdrop: 'static'});
  }
  async openMdlCap009(): Promise<void> {
    const procesos: Array<modificaProceso>
      = await this.mdlCap009_GetCbxModificaProceso(this.objCbxMaquinas.selected, this.objMdlCap009.chkModificaProceso ? '1' : '0');

    this.objMdlCap009.cbxModificaProceso = procesos;
    this.mdlCap009Ref = this.modalService.open(this.mdlCap009, {size: 'xl', backdrop: 'static'});

    const rutaProceso: Array<rutaProceso> = await this.mdlCap009_GetCbxRutaProceso();
    this.objMdlCap009.cbxRutaProceso = rutaProceso;
    ///*, windowClass: 'center'*/
  }

  async buscarOPEnPrincipal(op: string, allMaquinas: boolean = false): Promise<void> {
    // BUSCA EN MAQUINA ACTUAL (LISTADO YA CARGADO)
    if (!allMaquinas) {
      this.selectOPGridPrincipalOP(op.trim());
      const obj: any = this.gridSecuenciasPrincipal.getSelectedData();
      const secuenciaSeleccionada: listSecuencia = obj.length > 0 ? obj[0] : undefined;
      if (secuenciaSeleccionada) {
        this.gridSecuenciasPrincipal.ensureIndexVisible(secuenciaSeleccionada.value00);
        this.mdlCap013Ref.close();
      }
    }
    // BUSCAR OP EN TODAS LAS MAQUINAS (CONSULTA A BD)
    else {
      const opsAllMaquinas: Array<opsMaquinas> = await this.getAllOpsMaquina(op.trim());
      this.objMdlCap013.listResultadoMaquinas = opsAllMaquinas;
    }
  }

  async clickSeleccionarOPMaquina(obj: any): Promise<void> {
    const selected: opsMaquinas = obj.data;
    if (this.objCbxMaquinas.selected !== selected.claveMaquina) {
      // cbxTipoMaquina = 0 = IMPRESORA | cbxTipoMaquina = 1 = ACABADOS
      this.objCbxMaquinas.rbtnTipoMaquina = selected.cbxTipoMaquina.toString().trim();
      await this.cargaMaquinas(this.objCbxMaquinas.rbtnTipoMaquina);
      this.objCbxMaquinas.selected = selected.claveMaquina;
      await this.changeCbxMaquina();
      this.selectOPGridPrincipalSecuencia(selected.orden);
      this.gridSecuenciasPrincipal.ensureIndexVisible(selected.orden);
      this.mdlCap013Ref.close();
    }
    else {
      this.buscarOPEnPrincipal(this.objMdlCap013.txtOP, false);
    }
  }

  limpiarModalBusquedaOP(): void {
    this.objMdlCap013.rbtnFiltroMaquina = '1';
    this.objMdlCap013.txtOP = '';
    this.objMdlCap013.listResultadoMaquinas = [];
  }

  mdlCap009_LimpiarCamposBusqueda(): void {
    this.objMdlCap009_DatosBusqueda = {
      op: '', suaje: '', areaUnitaria: '', largoLamina: '', anchoLamina: '', pzasSuaje: '', largoDesarrollo: '', anchoDesarrollo: '',
      claveArticulo: '', nombreArticulo: '', dado: '', fechaEntrega: '', solicitado: '', producido: '', programado: '', existencia: '',
      variacion: '', proceso: '', primerColor: '', segundoColor: '', tercerColor: '', cuartoColor: '', colores: '', rutaProceso: '',
      clavePreparacion: '', industria: '', mvt: false, validaProceso: false, txtValidaProceso: '', produccionHora: '', flauta: '',
      unionPegada: false, piezasXCorte: 0, cantidad: 0, autAgente: false, devuelto: 0, liberadoCostos: false, autorizado: false,
      conScore: false, cantidadSol: 0, cantidadTras: 0, clave: '', ruta: '', resistencia: '', maquinaEstablecida: '', eproceso: '',
      noProducir: false, claveCliente: '', nombreCliente: '', status: '', msjOp: '', msjProducir: '', cajaNueva: false, modificacion: false,
      comentarios: '', retrabajoOP: false
    };
  }

  mdlCap013TxtOP_KeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.mdlCap013_BusquedaOP();
    }
  }

  mdlCap013_BusquedaOP(): void {
    if (this.objMdlCap013.txtOP.trim() === '') {
      this.mensajeFlotante('info', 'Favor de capturar la OP', 3000);
      return;
    }
    this.buscarOPEnPrincipal(this.objMdlCap013.txtOP, this.objMdlCap013.rbtnFiltroMaquina === '0' ? true : false);
  }

  // ==========================================================================================================================
  // MDLCAP009
  objCap009ProgAuto = new parSPLecOpc23();
  async cap009ClickProgramacionAuto(): Promise<void> {

    if (
      this.objMdlCap009.txtJustificacion && this.objMdlCap009.txtOP && this.objMdlCap009.txtClaveArticulo && this.objMdlCap009.txtCantidad &&
      this.objMdlCap009.txtProgramado && this.objMdlCap009.txtProducido && this.objMdlCap009.txtSolicitado &&
      this.objMdlCap009_DatosBusqueda.variacion && this.objMdlCap009.txtDescripcionRuta && this.objCbxMaquinas.selected &&
      this.objMdlCap009.cbxModificaProcesoSelected && this.objMdlCap009_DatosBusqueda.maquinaEstablecida &&
      this.objCbxMaquinas.tipoSelected &&
      (this.objMdlCap009_DatosBusqueda.largoDesarrollo || this.objMdlCap009_DatosBusqueda.largoLamina) &&
      (this.objMdlCap009_DatosBusqueda.anchoDesarrollo || this.objMdlCap009_DatosBusqueda.anchoLamina)
    ) {
      this.objCap009ProgAuto = new parSPLecOpc23();
      this.objCap009ProgAuto.justificacion = this.objMdlCap009.txtJustificacion.trim();
      this.objCap009ProgAuto.op = this.objMdlCap009.txtOP.trim();
      this.objCap009ProgAuto.claveArticulo = this.objMdlCap009.txtClaveArticulo.trim();
      this.objCap009ProgAuto.cantidad = this.stringToNumber(this.objMdlCap009.txtCantidad);
      this.objCap009ProgAuto.programado = this.stringToNumber(this.objMdlCap009.txtProgramado);
      this.objCap009ProgAuto.producido = this.stringToNumber(this.objMdlCap009.txtProducido);
      this.objCap009ProgAuto.solicitado = this.stringToNumber(this.objMdlCap009.txtSolicitado);
      this.objCap009ProgAuto.variacion = this.stringToNumber(this.objMdlCap009_DatosBusqueda.variacion);
      this.objCap009ProgAuto.descripcion = this.objMdlCap009.txtDescripcionRuta.trim(); // objMdlCap009.cbxRutaProcesoSelected
      this.objCap009ProgAuto.claveMaquina = this.objCbxMaquinas.selected.trim();
      this.objCap009ProgAuto.claveProceso = this.objMdlCap009.cbxModificaProcesoSelected;
      this.objCap009ProgAuto.maquinaEstablecida = this.objMdlCap009_DatosBusqueda.maquinaEstablecida;
      this.objCap009ProgAuto.tipoMaquina = this.objCbxMaquinas.tipoSelected;
      this.objCap009ProgAuto.largo
        = this.stringToNumber(
          this.objMdlCap009.cbxModificaProcesoSelected === 'PEG'
            ? this.objMdlCap009_DatosBusqueda.largoDesarrollo
            : this.objMdlCap009_DatosBusqueda.largoLamina
        );
      this.objCap009ProgAuto.ancho
        = this.stringToNumber(
          this.objMdlCap009.cbxModificaProcesoSelected === 'PEG'
          ? this.objMdlCap009_DatosBusqueda.anchoDesarrollo
          : this.objMdlCap009_DatosBusqueda.anchoLamina
        );
      this.objCap009ProgAuto.pasoContinua = 0;
      this.objCap009ProgAuto.produccionPT = 0;

      await this.Servicio.cap009ProgramacionAutomatica(this.objCap009ProgAuto).subscribe(async (res: any) => {
        var tmp: Array<errorSQL> = await res.data;
        var obj: errorSQL = {
          id: 0, errorNumber: 0, errorState: 0, errorSeverity: 0, errorProcedure: '', errorLine: 0,
          errorMessage: '', message: '', typeMessage: '', completado: false, pasoContinua: -1
        };

        // var pasoContinua = 0, typeMessage = '';
        if (tmp && tmp.length > 0) {
          obj = tmp[0];
          this.objCap009ProgAuto.pasoContinua = obj.pasoContinua;
          if (obj.typeMessage === 'question') {
            await Swal.fire({
              title: '¿Desea continuar?',
              text: obj.message,
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: "#28A745",
              cancelButtonColor: "#DC3545",
              cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
              confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
            }).then(async (result) => {
              if (result.isConfirmed) {
                obj = await this.repetirProcesoProgramacionAutomatica();
                if (obj.pasoContinua === -1) {
                  return;
                }
                this.objCap009ProgAuto.pasoContinua = obj.pasoContinua;
                obj.typeMessage = obj.typeMessage;
              }
              else {
                return;
              }
            });
          }
          else {
            Swal.fire({
              title: obj.completado ? 'Completado' : (obj.typeMessage === 'info' ? 'Información' : 'Error'),
              html: obj.message,
              icon: obj.completado ? 'success' : (obj.typeMessage === 'info' ? 'info' : 'error')
            });
          }
        }
        else {
          Swal.fire({
            title: 'Información',
            html: 'Se ha producido un inconveniente durante el proceso',
            icon: 'info'
          });
        }
      }, async (err: any) => {
        Swal.fire({
          title: 'Información',
          html: 'Se ha producido un inconveniente durante el proceso ' + err.error,
          icon: 'info'
        });
      });
    }
    else {
      var msj = 'Favor de completar los siguientes datos:\n', msjCampos = '';

      msjCampos = !this.objMdlCap009.txtJustificacion ? 'Justificación' : '';
      msjCampos = !this.objMdlCap009.txtOP ? (msjCampos !== '' ? ', OP' : 'OP') : '';
      msjCampos = !this.objMdlCap009.txtClaveArticulo ? (msjCampos !== '' ? ', Clave Artículo' : 'Clave Artículo') : '';
      msjCampos = !this.objMdlCap009.txtCantidad ? (msjCampos !== '' ? ', Cantidad' : 'Cantidad') : '';
      msjCampos = !this.objMdlCap009.txtProgramado ? (msjCampos !== '' ? ', Programado' : 'Programado') : '';
      msjCampos = !this.objMdlCap009.txtProducido ? (msjCampos !== '' ? ', Producido' : 'Producido') : '';
      msjCampos = !this.objMdlCap009.txtSolicitado ? (msjCampos !== '' ? ', Solicitado' : 'Solicitado') : '';
      msjCampos = !this.objMdlCap009_DatosBusqueda.variacion ? (msjCampos !== '' ? ', Variación' : 'Variación') : '';
      msjCampos = !this.objMdlCap009.txtDescripcionRuta ? (msjCampos !== '' ? ', Ruta' : 'Ruta') : '';
      msjCampos = !this.objCbxMaquinas.selected ? (msjCampos !== '' ? ', Máquina' : 'Máquina') : '';
      msjCampos = !this.objMdlCap009.cbxModificaProcesoSelected ? (msjCampos !== '' ? ', Proceso' : 'Proceso') : '';
      msjCampos = !this.objMdlCap009_DatosBusqueda.maquinaEstablecida ? (msjCampos !== '' ? ', Máquina Establecida' : 'Máquina Establecida') : '';
      msjCampos = !this.objCbxMaquinas.tipoSelected ? (msjCampos !== '' ? ', Tipo de Máquina' : 'Tipo de Máquina') : '';
      msjCampos = !this.objMdlCap009_DatosBusqueda.largoDesarrollo && !this.objMdlCap009_DatosBusqueda.largoLamina ? (msjCampos !== '' ? ', Largo' : 'Largo') : '';
      msjCampos = !this.objMdlCap009_DatosBusqueda.anchoDesarrollo && !this.objMdlCap009_DatosBusqueda.anchoLamina ? (msjCampos !== '' ? ', Acnho' : 'Acnho') : '';

      Swal.fire('Información', msj + msjCampos + '.', 'info');
      return;
    }
  }

  async repetirProcesoProgramacionAutomatica(): Promise<errorSQL> {
    var obj: errorSQL = {
      id: 0, errorNumber: 0, errorState: 0, errorSeverity: 0, errorProcedure: '', errorLine: 0,
      errorMessage: '', message: '', typeMessage: '', completado: false, pasoContinua: -1
    };
    await this.Servicio.cap009ProgramacionAutomatica(this.objCap009ProgAuto).subscribe(async (res: any) => {
      const tmp: Array<errorSQL> = await res.data;

      if (tmp && tmp.length > 0) {
        obj = tmp[0];
        this.objCap009ProgAuto.pasoContinua = obj.pasoContinua;

        if (obj.typeMessage === 'question') {
          await Swal.fire({
            title: '¿Desea continuar?',
            text: obj.message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#28A745",
            cancelButtonColor: "#DC3545",
            cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
            confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
          }).then(async (result) => {
            if (result.isConfirmed) {
              var obj2: errorSQL = await this.repetirProcesoProgramacionAutomatica();
              if (obj2.pasoContinua === -1) {
                return;
              }
              this.objCap009ProgAuto.pasoContinua = obj.pasoContinua;
              obj.typeMessage = obj.typeMessage;
            }
            else {
              return;
            }
          });
        }
        else {
          Swal.fire({
            title: obj.completado ? 'Completado' : (obj.typeMessage === 'info' ? 'Información' : 'Error'),
            html: obj.message,
            icon: obj.completado ? 'success' : (obj.typeMessage === 'info' ? 'info' : 'error')
          });
        }

        return obj;
      }
      else {
        Swal.fire({
          title: 'Información',
          html: 'Se ha producido un inconveniente durante el proceso',
          icon: 'info'
        });
      }
    }, async (err: any) => {
      Swal.fire({
        title: 'Información',
        html: 'Se ha producido un inconveniente durante el proceso ' + err.error,
        icon: 'info'
      });
    });

    return obj;
  }

  mdlCap009TxtOP_KeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.mdlCap009_BusquedaOP();
    }
  }
  async mdlCap009_BusquedaOP(): Promise<void> {
    if (this.objMdlCap009.txtOP) {
      this.blockUI.start('Buscando OP...');
      const datos: any = await this.mdlCap009_BuscaOP('7', this.objMdlCap009.txtOP.trim());
      this.blockUI.stop();
      if (datos.data && datos.data.length > 0) {
        if (datos.data[0].typeMessage === 'info') {
          Swal.fire({
            title: 'Información',
            html: datos.data[0].message,
            icon: datos.data[0].typeMessage,
          });
          return;
        }
        if (datos.data[0].typeMessage === 'question') {
          await Swal.fire({
            title: '¿Desea continuar?',
            text: datos.data[0].message,
            icon: datos.data[0].typeMessage,
            showCancelButton: true,
            confirmButtonColor: "#28A745",
            cancelButtonColor: "#DC3545",
            cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
            confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
          }).then(async (result) => {
            if (result.value) {
              await this.mdlCap009_BuscaOPOpc8();
            }
          });
          return;
        }
        if (datos.data[0].typeMessage === 'success') {
          await this.mdlCap009_BuscaOPOpc8_Success(datos.data2);
        }
      }
    }
    else {
      this.mensajeFlotante('info', 'Favor de Capturar OP', 2800);
    }
  }
  mdlCap009TxtCantidad_KeyPress(event: KeyboardEvent): boolean {
    return this.caracteresNumericos(event.key, this.objMdlCap009.txtCantidad);
  }
  mdlCap009TxtCantidad_Change(): void {
    if (this.objMdlCap009.cbxModificaProcesoSelected && this.objMdlCap009.txtCantidad) {
      // ClaveMaquina, OP, Cantidad, tiempoDevuelto, PzasSuaje, AreaUnitaria, Proceso, ClaveArticulo, Eficiencia

      // this.objCbxMaquinas.selected, this.objMdlCap009.txtOP, this.objMdlCap009.txtCantidad, '', this.objMdlCap009.txtPzasSuaje
      // this.objMdlCap009.txtAreaUnit, this.objMdlCap009.cbxModificaProcesoSelected, this.objMdlCap009.txtClaveArticulo, 0
    }
  }

  async mdlCap009_BuscaOPOpc8(): Promise<void> {
    this.blockUI.start('');
    const datos2: any = await this.Servicio.mdlCap009_BuscaOP('8', this.objMdlCap009.txtOP.trim());
    this.blockUI.stop();
    if (datos2.data && datos2.data.length > 0) {
      if (datos2.data[0].typeMessage === 'info') {
        Swal.fire({
          title: 'Información',
          html: datos2.data[0].message,
          icon: datos2.data[0].typeMessage,
        });
        return;
      }
      if (datos2.data[0].typeMessage === 'success') {
        await this.mdlCap009_BuscaOPOpc8_Success(datos2.data2);
      }
    }
  }
  // PENDIENTE
  async mdlCap009_BuscaOPOpc8_Success(objData: Array<resultadoCap009>): Promise<void> {
    this.mdlCap009_LimpiarCamposBusqueda();
    if (objData && objData.length > 0) {
      this.objMdlCap009_DatosBusqueda = objData[0];

      this.objMdlCap009.txtDescripcionRuta = this.objMdlCap009_DatosBusqueda.rutaProceso;
      this.objMdlCap009.txtClaveArticulo = this.objMdlCap009_DatosBusqueda.claveArticulo;
      this.objMdlCap009.txtArticulo = this.objMdlCap009_DatosBusqueda.nombreArticulo;
      this.objMdlCap009.cbxModificaProcesoSelected = this.objMdlCap009_DatosBusqueda.clavePreparacion;
      this.objMdlCap009.txtColores = this.objMdlCap009_DatosBusqueda.colores;
      this.objMdlCap009.txtSolicitado = this.objMdlCap009_DatosBusqueda.solicitado;
      this.objMdlCap009.txtProducido = this.objMdlCap009_DatosBusqueda.producido;
      this.objMdlCap009.txtProgramado = this.objMdlCap009_DatosBusqueda.programado;
      this.objMdlCap009.txtExistencia = this.objMdlCap009_DatosBusqueda.existencia;
      this.objMdlCap009.txtLargoLam = this.objMdlCap009_DatosBusqueda.largoLamina;
      this.objMdlCap009.txtAnchoLam = this.objMdlCap009_DatosBusqueda.anchoLamina;
      this.objMdlCap009.suaje = this.objMdlCap009_DatosBusqueda.suaje;
      this.objMdlCap009.dado = this.objMdlCap009_DatosBusqueda.dado;
      this.objMdlCap009.fecha = this.objMdlCap009_DatosBusqueda.fechaEntrega;
      this.objMdlCap009.txtPzasSuaje = this.objMdlCap009_DatosBusqueda.pzasSuaje;
      if (this.objCbxMaquinas.rbtnTipoMaquina === '0') {
        if (this.stringToNumber(this.objMdlCap009.txtPzasSuaje) <= 0) {
          this.objMdlCap009.txtPzasSuaje = '1';
        }
      }
      this.objMdlCap009.txtAreaUnit = this.objMdlCap009_DatosBusqueda.areaUnitaria;
      this.objMdlCap009.txtLargoDes = this.objMdlCap009_DatosBusqueda.largoDesarrollo;
      this.objMdlCap009.txtAnchoDes = this.objMdlCap009_DatosBusqueda.anchoDesarrollo;
      this.objMdlCap009.txtIndustria = this.objMdlCap009_DatosBusqueda.industria;
      this.objMdlCap009.chkModificaProcesoVisible = this.objMdlCap009_DatosBusqueda.mvt;
      this.objMdlCap009.proceso = this.objMdlCap009_DatosBusqueda.proceso;
      this.objMdlCap009.txtCliente = this.objMdlCap009_DatosBusqueda.nombreCliente;

      // Obtener procesos
      if (this.objMdlCap009_DatosBusqueda.proceso !== '') {
        const process: Array<proceso> = await this.mdlCap009_GetCbxProceso(this.objMdlCap009_DatosBusqueda.proceso);

        this.objMdlCap009.cbxProceso = process;
        if (process && process.length > 0) {
          this.objMdlCap009.cbxProcesoSelected = process[0].tProceso;
        }

      }

      if (this.objMdlCap009_DatosBusqueda.msjOp !== '' || this.objMdlCap009_DatosBusqueda.msjProducir !== '') {
        var msjOp = this.objMdlCap009_DatosBusqueda.msjOp;
        var msjProd = this.objMdlCap009_DatosBusqueda.msjProducir;
        Swal.fire({
          title: 'Información',
          html: msjOp + (msjProd !== '' && msjOp !== '' ? '\n' : '') + msjProd,
          icon: 'info'
        });
      }
      // this.objMdlCap009.txtDescripcionRuta = objData[0].txtDescripcion;
      // this.objMdlCap009.txtAreaUnit = objData[0].areaUnitaria;
      // this.objMdlCap009.txtLargoLam = objData[0].largoHoja;
      // this.objMdlCap009.txtAnchoLam = objData[0].anchoHoja;
      // this.objMdlCap009.txtPzasSuaje = objData[0].piezasXHoja;
    }
  }


  // ==========================================================================================================================
  // METODOS REUTILIZABLES
  selectOPGridPrincipalSecuencia(secuencia: number = 1): void {
    this.gridSecuenciasPrincipal.select({key: 'value00', rows: [{value00: secuencia}]});
  }
  selectOPGridPrincipalOP(op: string): void {
    this.gridSecuenciasPrincipal.select({key: 'value01', rows: [{value01: op.trim()}]});
  }
  getHourMinute(valor: string, hora: boolean = false): string {
    const arr = valor.split(':');
    return hora ? arr[0] : arr[1];
  }
  formatoNumber(valor: number, format: string): string {
    const widthValor = String(valor).length;
    const widthFormat = format.trim().length;
    let res = '';
    for (let index = 0; index < (widthFormat - widthValor); index++) {
      res += '0';
    }
    return res + String(valor);
  }
  validaUsuarioCalidad(user: string): boolean {
    return user === '011299' || user === '010226' || user === '021251'
  }
  cambiarFormatoFecha(
    fecha: string,
    primero: string = 'dia',
    segundo: string = 'mes',
    tercero: string = 'año',
    separador: string = '/',
    formatoDestino: string = 'yyyy-MM-dd'
  ): string {
    let año, mes, dia, fechaFinal, cero, uno, dos;

    cero = fecha.split(separador)[0].length === 1 ? '0' + fecha.split(separador)[0] : fecha.split(separador)[0];
    uno = fecha.split(separador)[1].length === 1 ? '0' + fecha.split(separador)[1] : fecha.split(separador)[1];
    dos = fecha.split(separador)[2].length === 1 ? '0' + fecha.split(separador)[2] : fecha.split(separador)[2];

    // Primera posición
    if (primero === 'dia') {
      dia = cero;
    }
    if (primero === 'mes') {
      mes = cero;
    }
    if (primero === 'año') {
      año = cero;
    }
    // Segunda posición
    if (segundo === 'dia') {
      dia = uno;
    }
    if (segundo === 'mes') {
      mes = uno;
    }
    if (segundo === 'año') {
      año = uno;
    }
    // Tercera posición
    if (tercero === 'dia') {
      dia = dos;
    }
    if (tercero === 'mes') {
      mes = dos;
    }
    if (tercero === 'año') {
      año = dos;
    }

    // ASIGNAR FORMATO ELEGIDO
    if (new RegExp('^(dd\/MM\/yyyy)$').test(formatoDestino)) {
      fechaFinal = dia + '/' + mes + '/' + año;
    }
    else if (new RegExp('^(dd-MM-yyyy)$').test(formatoDestino)) {
      fechaFinal = dia + '-' + mes + '-' + año;
    }
    else if (new RegExp('^(MM\/dd\/yyyy)$').test(formatoDestino)) {
      fechaFinal = mes + '/' + dia + '/' + año;
    }
    else if (new RegExp('^(MM-dd-yyyy)$').test(formatoDestino)) {
      fechaFinal = mes + '-' + dia + '-' + año;
    }
    else if (new RegExp('^(yyyy\/MM\/dd)$').test(formatoDestino)) {
      fechaFinal = año + '/' + mes + '/' + dia;
    }
    else if (new RegExp('^(yyyy-MM-dd)$').test(formatoDestino)) {
      fechaFinal = año + '-' + mes + '-' + dia;
    }
    else if (new RegExp('^(yyyy\/dd\/MM)$').test(formatoDestino)) {
      fechaFinal = año + '/' + dia + '/' + mes;
    }
    else if (new RegExp('^(yyyy-dd-MM)$').test(formatoDestino)) {
      fechaFinal = año + '-' + dia + '-' + mes;
    }
    else if (new RegExp('^(yyyyMMdd)$').test(formatoDestino)) {
      fechaFinal = año + mes + dia;
    }
    else if (new RegExp('^(yyyyddMM)$').test(formatoDestino)) {
      fechaFinal = año + dia + mes;
    }
    else if (new RegExp('^(ddMMyyyy)$').test(formatoDestino)) {
      fechaFinal = dia + mes + año;
    }
    else if (new RegExp('^(MMddyyyy)$').test(formatoDestino)) {
      fechaFinal = mes + dia + año;
    }

    return fechaFinal;
  }
  async delay(ms: number = 450) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }
  caracteresNumericos(key: string, campo: string): boolean {
    return new RegExp('[0-9\.]').test(key) ? !(new RegExp('[\.]').test(key) && new RegExp('[\.]').test(campo)) : false;
  }
  stringToNumber(valor: string): number {
    return Number(valor.replace(',', ''));
  }
  mensajeFlotante(icono: string, mensaje: string = '', tiempo: number = 1800): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: tiempo
    });

    Toast.fire({
      icon: icono === 'success' ? icono : icono === 'info' ? icono : 'error',
      title: icono === 'success' && mensaje === '' ? 'Completado!' : mensaje
    });
  }

  // ==========================================================================================================================
  // METODOS SERVICIO
  // LEC OPC 1
  async getMaquinas(tipo: string, tipoClave: string, claveMaquina: string = ''): Promise<Array<maquinas>> {
    const value: any = await this.Servicio.getMaquinas(tipo, tipoClave, claveMaquina);
    return value.data;
  }
  // LEC OPC 2
  async getMaquinaMantenimiento(claveMaquina: string): Promise<Array<estadoMantenimiento>> {
    const value: any = await this.Servicio.getMaquinaMantenimiento(claveMaquina);
    return value.data;
  }
  // LEC OPC 3
  async getSecuenciaMaquinasOpsCanceladas(tipo: string, claveMaquina: string): Promise<object> {
    const value: any = await this.Servicio.getSecuenciaMaquinasOpsCanceladas(tipo, claveMaquina);
    return value;
  }
  // LEC OPC 4
  async getComentariosOPArticulo(op: string, claveArticulo: string): Promise<Array<comentariosOP>> {
    const value: any = await this.Servicio.getComentariosOPArticulo(op, claveArticulo);
    return value.data;
  }
  // LEC OPC 5
  async getAllOpsMaquina(op: string): Promise<Array<opsMaquinas>> {
    const value: any = await this.Servicio.getAllOpsMaquina(op);
    return value.data;
  }
  // LEC OPC 6
  async obtieneSigProCap(): Promise<Array<objSigProgCap>> {
    const value: any = await this.Servicio.getSigProCap();
    return value.data;
  }
  // LEC OPC 7 y 8
  async mdlCap009_BuscaOP(opc: string, op: string): Promise<any> {
    const value: any = await this.Servicio.mdlCap009_BuscaOP(opc, op);
    return value;
  }
  // LEC OPC 9
  async mdlCap009_GetCbxModificaProceso(claveMaquina: string, mvt: string): Promise<Array<modificaProceso>> {
    const value: any = await this.Servicio.mdlCap009_GetCbxModificaProceso(claveMaquina, mvt);
    return value.data;
  }
  // LEC OPC 10
  async mdlCap009_GetCbxProceso(claveProceso: string): Promise<Array<proceso>> {
    const value: any = await this.Servicio.mdlCap009_GetCbxProceso(claveProceso);
    return value.data;
  }
  // LEC OPC 11
  async mdlCap009_GetCbxRutaProceso(): Promise<Array<rutaProceso>> {
    const value: any = await this.Servicio.mdlCap009_GetCbxRutaProceso();
    return value.data;
  }
  // LEC OPC 13
  async fechaTurnoTrabajo(): Promise<void> {
    const value: any = await this.Servicio.fechaTurnoTrabajo();
    if (value.data && value.data.length > 0) {
      this.objCamposGeneral.fechaTrabajo = value.data[0].fecha;
      this.objCamposGeneral.horaTrabajo = value.data[0].hora;
      this.objCamposGeneral.turnoTrabajo = value.data[0].turno;
    }
  }
  // LEC OPC 14
  async validaArt(claveArticulo: string, claveMaquina: string): Promise<boolean> {
    const value: any = await this.Servicio.validaArt(claveArticulo, claveMaquina);
    return value.data && value.data.length > 0 ? value.data[0].validaArt : true;
  }
  // LEC OPC 15
  async getOPProgramada(op: string, claveMaquina: string): Promise<Array<errorSQL>> {
    const value: any = await this.Servicio.getOPProgramada(op, claveMaquina);
    return value.data;
  }
  // LEC OPC 16
  async getJustificaciones(): Promise<Array<justificaciones>> {
    const value: any = await this.Servicio.getJustificaciones();
    return value.data;
  }
  // LEC OPC 18
  async getOPProgramada2(op: string, programa: number, cantidad: number): Promise<Array<opc18>> {
    const value: any = await this.Servicio.getOPProgramada2(op, programa, cantidad);
    return value.data;
  }
  // LEC OPC 20
  async validaJustificacionUsuario(): Promise<boolean> {
    const value: any = await this.Servicio.validaJustificacionUsuario();
    return value.data && value.data.length > 0 ? true : false;
  }
  // LEC OPC 21
  async tieneProduccionTmpReal(progPosAct: string, progPosSig: string, fechaTrabajo: string, turnoTrabajo: number): Promise<boolean> {
    const value: any = await this.Servicio.tieneProduccionTmpReal(progPosAct, progPosSig, fechaTrabajo, turnoTrabajo);
    return value.data && value.data.length > 0 ? (value.data[0].cuantos > 0 ? true : false) : false;
  }
  // // ACT OPC 4
  // async reordenarProgInmediatosPosteriores(obj: opc4p2): Promise<Array<errorSQL>> {
  //   const value: any = await this.Servicio.reordenarProgInmediatosPosteriores(obj);
  //   return value.data;
  // }
  // CmoSp377_Opc3
  async contabilizadoPlcProg(claveMaquina: string): Promise<boolean> {
    const value: any = await this.Servicio.getCanSigProCap(claveMaquina);
    return value.data && value.data.length > 0 ? true : false;
  }
  // CmoSp377_Opc9 (PENDIENTE ACTUAL)
  async tieneProduccionRealCapSF(progPosAct: number, progPosSig: string): Promise<boolean> {
    // FechaDeTrabajo, TurnoDeTrabajo, CmbMaquina
    const value: any = await this.Servicio.tieneProduccionRealCapSF(progPosAct.toString(), progPosSig);
    return value.data && value.data.length > 0 && Number(value.data[0].cuantos) > 0 ? true : false;
  }
  // ==========================================================================================================================

}
