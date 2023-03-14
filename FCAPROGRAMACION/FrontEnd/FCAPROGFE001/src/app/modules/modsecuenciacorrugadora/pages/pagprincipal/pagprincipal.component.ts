import { trim } from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { cloneDeep } from 'lodash-es';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { promise } from 'protractor';
interface Filtros {
  filtro: string;
}
@Component({
  selector: 'app-pagprincipal',
  templateUrl: './pagprincipal.component.html',
  styleUrls: ['./pagprincipal.component.css'],
})
export class PagprincipalComponent implements OnInit {
  // PPricipal
  @BlockUI() blockUI: NgBlockUI;
  filtros: Filtros = { filtro: '' };
  @ViewChild('gridPrincipal') private Grid: any;
  @ViewChild('gridPesoUnitario') private GridPesoUnit: any;
  @ViewChild('gridComentarios') private GridComentarios: any;

  public rowSelection = 'single';
  columnDefs: any;
  columnPesoUnit: any;
  columnComentarios: any;
  DatosGrid = [];
  GuardarDatosGrid = [];
  DatosAcciones = [];
  DatosGridPesoUnit = [];
  DatosGridComentarios = [];

  btnFijaFecha = 'Acepta';
  TipoModulo;
  Zona;

  BooLock = false;

  selectedRows: any = {};
  Comentario = '';
  EspProd = '';
  ComRollosAntiguos = '';
  ComentariosMVT = '';
  esMVT = false;
  FecInicioProd = '';
  MiHora = new Date().toLocaleString();
  wProgramaAut = false;
  confiSecOrden = 1;

  VisAntiguo = true;
  VisBtnAntiguo = true;
  VisGridPesoUnit = true;
  VisFolioCorrectivo = true;
  VisComentarios = true;
  VisTransferirSec = true;
  VisTransLam = true;
  visComentariosMVT = false;
  visAplicar = true;
  visSubeReg = true;
  visBajaReg = true;
  visEliminar = true;
  visAgregarProg = true;

  disAgregarProg = false;
  disImprimir = false;
  disBuscarOp = false;
  disAntiguo = false;
  disRevicionExistencia = false;

  disBtnAplica = false;
  disBtnVerOp = false;
  disBtnSubeReg = false;
  disBtnBajaReg = false;
  disBtnAgregaProg = false;
  disBtnTraerMaster = false;
  disbtnFijaFecha = false;

  disAtencion = false;
  // Modal
  @ViewChild('mdl') private mdl: any;
  @ViewChild('mdlbuscarop') private mdlbuscarop: any;
  @ViewChild('mdlPosicionEsp') private mdlPosicionEsp: any;
  @ViewChild('mdlAddPrograma') private mdlAddPrograma: any;
  @ViewChild('mdlConfiEliminacion') private mdlConfiEliminacion: any;
  @ViewChild('mdlimprimir') private mdlimprimir: any;
  @ViewChild('mdlfiltroreporte') private mdlfiltroreporte: any;
  @ViewChild('mdlObsProgImpresora') private mdlObsProgImpresora: any;
  @ViewChild('mdlverificadorpapeles') private mdlverificadorpapeles: any;
  @ViewChild('mdlfoliocombinacion') private mdlfoliocombinacion: any;

  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';
  TipoReporte = '';
  TipoAccionPosicionReg = 'Sub';
  DatosDetalles = {};
  DatosBuscarOp = {};
  DatosPosEspecifica = {};
  DatosEliminar = {};
  DatosAddProg = [];
  DatosImprimir = {};
  DatosReporteFil = [];
  DatosObsProgImpresora = [];
  DatosVerificadorpapeles = [];
  Datosfoliocombinacion = [];

  constructor(public Servicio: SecuenciaCorrugadoraService) {
    this.columnDefs = [
      // {
      //   headerName: 'Ver OPs',
      //   cellRenderer: 'btnCellRenderer',
      //   cellRendererParams: {
      //     onClick: this.GridMdlDetalle.bind(this),
      //     label: '<i class="far fa-eye"></i>',
      //     class: 'btn btn-info btn-sm',
      //   },
      //   headerClass: 'header-center header-grid',
      //   cellClass: 'grid-cell-btn-center',
      //   flex: 5,
      //   minWidth: 90,
      //   maxWidth: 90,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Sube Reg.',
      //   cellRenderer: 'popupCellRenderer',
      //   cellRendererParams: {
      //     onClick: this.GridSubeReg.bind(this),
      //     label: '<i class="fas fa-arrow-alt-circle-up"></i>',
      //     class: 'btn btn-primary btn-sm',
      //     Opciones: [
      //       {
      //         tex: 'Posicion Especifica',
      //         onclick: this.GridSubeRegPosEspecifica.bind(this),
      //       },
      //       { tex: 'Mueve Bloque', onclick: this.GridSubeReg.bind(this) },
      //     ],
      //   },
      //   headerClass: 'header-center header-grid',
      //   cellClass: 'grid-cell-btn-center',
      //   flex: 5,
      //   minWidth: 100,
      //   maxWidth: 100,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Baja Reg.',
      //   cellRenderer: 'popupCellRenderer',
      //   cellRendererParams: {
      //     onClick: this.GridBajaReg.bind(this),
      //     label: '<i class="fas fa-arrow-alt-circle-down"></i>',
      //     class: 'btn btn-primary btn-sm',
      //     Opciones: [
      //       {
      //         tex: 'Posicion Especifica',
      //         onclick: this.GridBajaRegPosEspecifica.bind(this),
      //       },
      //       { tex: 'Mueve Bloque', onclick: this.GridBajaReg.bind(this) },
      //     ],
      //   },
      //   headerClass: 'header-center header-grid',
      //   cellClass: 'grid-cell-btn-center',
      //   flex: 5,
      //   minWidth: 100,
      //   maxWidth: 100,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Eliminar',
      //   cellRenderer: 'btnCellRenderer',
      //   cellRendererParams: {
      //     onClick: this.GridEliminar.bind(this),
      //     label: '<i class="fa fa-trash"></i>',
      //     class: 'btn btn-danger btn-sm',
      //   },
      //   headerClass: 'header-center header-grid',
      //   cellClass: 'grid-cell-btn-center',
      //   flex: 5,
      //   minWidth: 100,
      //   maxWidth: 100,
      //   suppressSizeToFit: true,
      // },
      {
        headerName: 'Sec',
        field: 'orden',
        flex: 2,
        cellRenderer: 'labelcol',

        cellRendererParams: {
          class: '',
         display: this.GridDisplayColor.bind(this),
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        minWidth: 54,
        maxWidth: 54,
        suppressSizeToFit: true,
      },
     /*  {
        headerName: 'Prog.',
        field: 'programa',
        flex: 2,
        cellRenderer: 'labelcol',
        cellRendererParams: {
          class: '',
          display: this.GridDisplayProg.bind(this),
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        minWidth: 100,
        maxWidth: 100,
        suppressSizeToFit: true,
      }, */
      {
        headerName: 'Prog.',
        field: 'programa',
        flex: 3,
        cellRenderer: 'labelcol',
        cellRendererParams: {
          class: '',
          display: this.GridDisplayProg.bind(this),
        },
        minWidth: 70,
        maxWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 4,
        minWidth: 90,
        maxWidth: 97,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Ancho',
        field: 'anchoPromedio',
        flex: 3,
        minWidth: 70,
        maxWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Resis',
        field: 'resistencia',
        flex: 3,
        minWidth: 75,
        maxWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Fta.',
        field: 'flauta',
        flex: 3,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        minWidth: 54,
        maxWidth: 54,
      },
      {
        headerName: 'Proceso',
        field: 'claveProceso',
        flex: 3,
        cellRenderer: 'labelcol',
        cellRendererParams: {
          class: '',
          display: this.GridDisplayColor.bind(this),
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        minWidth: 75,
        maxWidth: 83,
      },
      {
        headerName: 'Kg.Papel',
        field: 'kgPapel',
        flex: 3,
        cellRenderer: 'labelcol',
        cellRendererParams: {
          class: '',
          display: this.GridDisplayColor.bind(this),
        },
        minWidth: 90,
        maxWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Min',
        field: 'minutosstdproduccion',
        flex: 3,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.GridbracketMin.bind(this),
        minWidth: 54,
        maxWidth: 54,
      },
      {
        headerName: 'Fec. Fab.',
        field: '',
        flex: 3,
        minWidth: 135,
        maxWidth: 135,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.Gridbracketfecfab.bind(this),
      },
      {
        headerName: 'M.L.',
        field: 'metrosLineales',
        flex: 3,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        minWidth: 60,
        maxWidth: 60,
      },
      {
        headerName: '% de Var.',
        field: 'variacion',
        flex: 3,
        minWidth: 93,
        maxWidth: 93,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Clv. Art.',
        field: 'claveArticulo',
        flex: 3,
        minWidth: 90,
        maxWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Comentarios',
        field: 'comentarios',
        flex: 3,
        minWidth: 90,
        maxWidth: 600,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Fija Fecha',
        field: 'horas',
        flex: 3,
        minWidth: 135,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        // valueFormatter: this.Gridbracketfijarfecha.bind(this),
      },
      {
        headerName: 'PapelDiferente',
        field: 'comentariosCorr',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'PintaCorr',
        field: 'PintaCorr',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'PintalImp',
        field: '',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Estatus',
        field: 'estatus',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'EspProcCorr',
        field: '',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.GridbracketEspProcCorr.bind(this),
      },
      {
        headerName: 'Liner1',
        field: 'liner1',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Liner2',
        field: 'liner2',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Liner3',
        field: 'liner3',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Liner4',
        field: 'liner4',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Corr1',
        field: 'corrugado1',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Corr2',
        field: 'corrugado2',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Corr3',
        field: 'corrugado3',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ancho L1',
        field: 'anchoL1',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ancho L2',
        field: 'anchoL2',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ancho L3',
        field: 'anchoL3',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ancho L4',
        field: 'anchoL4',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ancho C1',
        field: 'anchoC1',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ancho C2',
        field: 'anchoC2',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ancho C3',
        field: 'anchoC3',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'ComentarioBioPalel',
        field: 'bioPapel',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'MVT',
        field: '',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.GridbracketMVT.bind(this),
      },
      {
        headerName: 'ComentariosMVT',
        field: 'comentariosMVT',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.GridbracketMVTCom.bind(this),
      },
    ];
    this.columnPesoUnit = [
      {
        headerName: 'Artículo',
        field: 'descripcion',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Min.',
        field: 'minimo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Max',
        field: 'maximo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
    ];
    this.columnComentarios = [
      {
        headerName: 'Comentarios',
        field: 'orden',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
    ];
  }

  async ngOnInit(): Promise<void> {
    this.TipoModulo = localStorage.getItem('DatoExt');
    this.Zona = localStorage.getItem('Zona');
    this.ValCargarPag();
    await this.Refrescar();
    await this.Actualiza();
  }
  ValCargarPag(): void {
    // (1) CplRep007 (0) CplCap010
    if (this.TipoModulo === '1') {
      this.VisGridPesoUnit = true;
      this.visAplicar = false;
      this.visSubeReg = false;
      this.visBajaReg = false;
      this.visEliminar = false;
      this.visAgregarProg = false;
    } else {
      this.VisGridPesoUnit = false;
      this.visAplicar = true;
      this.visSubeReg = true;
      this.visBajaReg = true;
      this.visAgregarProg = true;
    }
    switch (this.Zona) {
      case '01':
        this.VisAntiguo = true;
        break;
      case '02':
        this.VisAntiguo = false;
        break;
      default:
        break;
    }
  }
  // =================Grid=================//
  Gridbracketfecfab(params): string {
    const timpoext = params.data.minutosstdproduccion + params.data.tmpStd;
    if (params.data.fijarFecha !== '') {
      this.MiHora = this.SumarMinFecha(
        this.ConvertirFechaDate(params.data.fijarFecha),
        timpoext
      );
    } else {
      this.MiHora = this.SumarMinFecha(
        this.ConvertirFechaDate(this.MiHora),
        timpoext
      );
    }
    return this.MiHora;
  }
  GridbracketMin(params): number {
    const timpoext = params.data.minutosstdproduccion + params.data.tmpStd;
    return timpoext;
  }
  GridbracketEspProcCorr(params): string {
    return params.data.eProceso === ''
      ? params.data.eprocesoCorr
      : params.data.eProceso;
  }
  GridbracketMVT(params): string {
    return params.data.mvt ? 'SI' : 'NO';
  }
  GridbracketMVTCom(params): string {
    return params.data.mvt ? params.data.comentariosMVT : '';
  }
  GridDisplayProg(data): string {
    let clase = '';
    if (typeof data.classSpanProg === 'undefined') {
      clase = '';
    } else {
      clase = data.classSpanProg;
    }
    return clase;
  }
  GridDisplayColor(data): string {
    let clase = '';
    if (typeof data.classSpan === 'undefined') {
      clase = '';
    } else {
      clase = data.classSpan;
    }
    return clase;
  }
  GridEditar(e): void {
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-edit';
    // this.Datos = e.data;
    this.mdl.openModal();
  }
  GridMdlDetalle(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.TipoAccion = 'A';
      this.IconoTitulo = 'far fa-eye';
      this.DatosDetalles = cloneDeep(this.selectedRows);
      this.mdl.openModal();
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  GridSubeRegPosEspecifica(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.DatosPosEspecifica = this.selectedRows;
      this.IconoTitulo = 'fas fa-arrow-alt-circle-up';
      this.TipoAccionPosicionReg = 'Sub';
      this.mdlPosicionEsp.openModal();
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  GridSubeReg(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.SubirOrdenporBloque(
        this.selectedRows.programa,
        this.selectedRows.orden
      );
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  GridBajaReg(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.BajarOrdenporBloque(
        this.selectedRows.programa,
        this.selectedRows.orden
      );
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  GridBajaRegPosEspecifica(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.DatosPosEspecifica = this.selectedRows;
      this.IconoTitulo = 'fas fa-arrow-alt-circle-down';
      this.TipoAccionPosicionReg = 'Baj';
      this.mdlPosicionEsp.openModal();
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  GridEliminar(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.DatosEliminar = this.selectedRows;
      this.IconoTitulo = 'fas fa-trash-alt';
      this.mdlConfiEliminacion.openModal();
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  ChangeSelectionGrid(): void {
    const selectedRows = this.Grid.getSelectedData();
    this.selectedRows = selectedRows[0];
    console.log(this.selectedRows, 'selecciones');
    this.CargarInfoSelectRow(this.selectedRows);
  }
  // =================PPrincipal=================//
  async BuscarDatosGenerales(tipo: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetSecuenciaCorrugadoraGeneral(tipo).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            this.blockUI.stop();
            console.log(
              'PagPrincipal',
              'GetSecuenciaCorrugadoraGeneral',
              Datos.data
            );
            this.DatosGrid = Datos.data;
            this.GuardarDatosGrid = Datos.data;
            this.selectedRows = {};
            resolve();
          } else {
            this.blockUI.stop();
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarDatosGenerales)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          this.blockUI.stop();
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarDatosGenerales)' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
      );
    });
  }
  BuscarAccionesPreventivas(): void {
    this.Servicio.GetAccionesPreventivas().subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
          console.log('PagPrincipal', 'GetAccionesPreventivas', Datos.data);
          this.DatosAcciones = Datos.data;
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (BuscarAccionesPreventivas)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarAccionesPreventivas)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  BuscarProcesoRevicionExistencia(): void {
    this.Servicio.GetProcesoRevicionExistencia().subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
          console.log(
            'PagPrincipal',
            'GetProcesoRevicionExistencia',
            Datos.data
          );
          this.ProcesoRevicionExistencia(Datos.data);
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (GetProcesoRevicionExistencia)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarDatosGenerales)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  BuscarPesoUnitario(Programa: number): void {
    this.Servicio.GetPesoUnitario(Programa).subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
          console.log('PagPrincipal', 'GetPesoUnitario', Datos.data);
          this.DatosGridPesoUnit = Datos.data;
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (GetPesoUnitario)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarPesoUnitario)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  async BuscarVerificaRestosRollos(
    Almacen,
    Ancho1,
    Liner1,
    Liner2,
    Liner3,
    Medium1,
    AnchoC1,
    Medium2,
    AnchoC2
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetVerificaRestosRollos(
        Almacen,
        Ancho1,
        Liner1,
        Liner2,
        Liner3,
        Medium1,
        AnchoC1,
        Medium2,
        AnchoC2
      ).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('PagPrincipal', 'GetVerificaRestosRollos', Datos.data);
            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (GetVerificaRestosRollos)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarVerificaRestosRollos)' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
      );
    });
  }
  btnAddPrograma(): void {
    this.DatosAddProg = cloneDeep(this.DatosGrid);
    this.mdlAddPrograma.openModal();
  }
  btnRevicionExistencia(): void {
    this.BuscarProcesoRevicionExistencia();
  }
  btnBuscarOp(): void {
    this.IconoTitulo = 'fa fa-search';
    this.mdlbuscarop.openModal();
  }
  btnBuscar(): void {
    this.Grid.refreshData();
  }
  btnAgregar(): void {
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-plus';
    // this.Datos = {};
    this.mdl.openModal();
  }
  btnEnviosLam(tipo): void {
    this.BuscarDatosGenerales(tipo);
  }
  btnTranferirSecuencia(): void {
    const Tranferir = [];
    for (const iterator of this.DatosGrid) {
      if (iterator.seleccion) {
        Tranferir.push(iterator);
      }
    }

    if (Tranferir.length === 0) {
      swal.fire(
        'Datos',
        'Seleccione por lo menos un Programa para poder Transferir la secuencia',
        'error'
      );
      return;
    }
  }
  btnImprimir(e): void {
    this.TipoReporte = cloneDeep(e);
    this.IconoTitulo = 'fa fa-print';
    this.mdlimprimir.openModal();
  }
  btnFiltrosRep(): void {
    this.IconoTitulo = 'fa fa-plus';
    this.DatosReporteFil = cloneDeep(this.DatosGrid);
    this.mdlfiltroreporte.openModal();
  }
  async btnAplica(): Promise<any> {
    if (this.DatosGrid.length === 0) {
      return;
    }
    await this.Tiempos();
    await this.Actualiza();
    this.Refrescar();
  }
  btnFoliocombinacion(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.IconoTitulo = 'fas fa-exchange-alt';
      this.DatosVerificadorpapeles = cloneDeep(this.selectedRows);
      this.mdlfoliocombinacion.openModal();
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  btnVerificadorPapeles(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      this.IconoTitulo = 'far fa-file';
      this.DatosVerificadorpapeles = cloneDeep(this.selectedRows);
      this.mdlverificadorpapeles.openModal();
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  btnTraerMaestra(): void {
    if (Object.keys(this.selectedRows).length !== 0) {
      if (this.selectedRows.claveArticulo === '') {
        swal.fire(' ', 'No tiene registrado la Clave Articulo', 'warning');
        return;
      }

      const Maestra = this.selectedRows.claveArticulo + '.GIF';

      this.Servicio.DescargarMaestra(
        Maestra,
        (res) => {
          this.blockUI.stop();
        },
        (error) => {
          swal.fire(
            'Datos ',
            'Ha Ocurrio un Error al Momento Buscar Archivo Maestra,' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.message +
              '</strong>',
            'error'
          );
        }
      );
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  async btnFijaFechaEvent(): Promise<void> {
    if (Object.keys(this.selectedRows).length !== 0) {
      const modDatGrid = cloneDeep(this.DatosGrid);
      const index = modDatGrid.findIndex(
        (element) => element.orden === this.selectedRows.orden
      );
      if (this.selectedRows.horas.trim() === 'FF') {
        modDatGrid[index].horas = '';
      } else {
        modDatGrid[index].horas = 'FF';
        const Fecha = new Date();
        const hora = Fecha.getHours();
        const min = Fecha.getMinutes();
        const FechaIniProg = new Date(this.FecInicioProd);
        console.log(
          this.convertirFechaStringSinTiempo(FechaIniProg, 'dd/MM/yyyy') +
            ' ' +
            (hora < 10 ? '0' : '').concat(hora.toString()) +
            ':' +
            (min < 10 ? '0' : '').concat(min.toString())
        );
        modDatGrid[index].fijarFecha =
          this.convertirFechaStringSinTiempo(FechaIniProg, 'dd/MM/yyyy') +
          ' ' +
          (hora < 10 ? '0' : '').concat(hora.toString()) +
          ':' +
          (min < 10 ? '0' : '').concat(min.toString());
      }
      this.DatosGrid = modDatGrid;
      await this.Tiempos();
      await this.Actualiza();
      await this.Refrescar();
    } else {
      swal.fire(
        '',
        '¡No se seleccionó ningún programa, favor de seleccionar! ',
        'warning'
      );
    }
  }
  async Refrescar(): Promise<void> {

    if (this.TipoModulo === '1' && this.Zona === '02') {
      this.BuscarAccionesPreventivas();
    }
    this.blockUI.start();
    await this.BuscarDatosGenerales(0);

    this.Locked(true);
    this.BooLock = false;

    if (this.TipoModulo === '1' && this.Zona === '01') {
      this.VisTransferirSec = true;
      this.VisTransLam = true;
      const AddColum = cloneDeep(this.columnDefs);
      AddColum.splice(5, 0, {
        headerName: '',
        field: 'seleccion',
        flex: 2,
        minWidth: 40,
        maxWidth: 40,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellRenderer: 'hybCellRenderer',
        cellRendererParams: {
          type: 'chk',
          // change: this.ChangeUv.bind(this),
        },
      });
      this.columnDefs = AddColum;
    } else {
      this.VisTransLam = false;
      this.VisTransferirSec = false;
      const AddColum = cloneDeep(this.columnDefs);
      AddColum.splice(0, 5);
    }
    this.confiSecOrden = 1;
    return new Promise((resolve, reject) => {
    const GDatos = cloneDeep(this.DatosGrid);
    for (const lstSecuencia of GDatos) {
      lstSecuencia.orden = this.confiSecOrden ++;
      if (lstSecuencia.enProceso) {
        lstSecuencia.classSpan = 'badge rounded-pill bg-OpsNoLib';
      }
      if (this.TipoModulo === '0') {
        if (lstSecuencia.status.trim() === 'CAN') {
          lstSecuencia.estatus = 1;
          this.BooLock = true;
          lstSecuencia.classSpan = 'badge rounded-pill bg-OpsCancelada';
          lstSecuencia.classSpanProg = 'badge rounded-pill bg-OpsCancelada';
        } else {
          lstSecuencia.estatus = 0;
        }
        if (lstSecuencia.status.trim() === 'SUS') {
           lstSecuencia.estatus = 1;
           this.BooLock = true;
          lstSecuencia.classSpan = 'badge rounded-pill .bg-OpsSuspendida';
        } else {
           lstSecuencia.estatus = 0;
           this.BooLock = false;
        }
      }
      if (this.TipoModulo === '0') {
        if (lstSecuencia.liberadoDS === false) {
          lstSecuencia.classSpan = 'badge rounded-pill bg-OpsNoLib';
        }
      }
      if (this.Zona === '02' && this.TipoModulo === '1') {
        let ArtACP = false;
        for (const datAcciones of this.DatosAcciones) {
          if (lstSecuencia.claveArticulo === datAcciones.claveArticulo) {
            ArtACP = true;
          }
        }
        if (ArtACP) {
          lstSecuencia.classSpan = 'badge rounded-pill bg-OpsSuspendida';
        }
      }
      if (lstSecuencia.comentarios.includes('|')) {
        lstSecuencia.classSpanProg = 'badge rounded-pill bg-OpsEspecial';
      }

      if (lstSecuencia.flauta.trim() === 'C') {
        if (lstSecuencia.corrugado2 === '') {
          lstSecuencia.corrugado2 = lstSecuencia.corrugado1;
          lstSecuencia.liner3 = lstSecuencia.liner2;
        }
        lstSecuencia.corrugado1 = '';
        lstSecuencia.liner2 = '';
        lstSecuencia.corrugado3 = '';
      }
    }

    this.DatosGrid = GDatos;

    if (this.BooLock) {
      this.Locked(false);
    }
    resolve();
    });
  }
  SubirOrdenporBloque(Programa: any, OrdenAct: any): void {
    this.Servicio.SubirOrdenporBloque(Programa, OrdenAct).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('El cambio se realizó satisfactoriamente', '', 'success');
          this.blockUI.stop();
          this.Refrescar();
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
          'Ha Ocurrio un Error (SubirOrdenporBloque),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  BajarOrdenporBloque(Programa: any, OrdenAct: any): void {
    this.Servicio.BajarOrdenporBloque(Programa, OrdenAct).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('El cambio se realizó satisfactoriamente', '', 'success');
          this.blockUI.stop();
          this.Refrescar();
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
          'Ha Ocurrio un Error (BajarOrdenporBloque),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  ProcesoRevicionExistencia(e): void {
    const grid = cloneDeep(this.DatosGrid);

    let Exist = false;
    let Pintar = false;
    for (const iterator of grid) {
      const strPrograma = iterator.programa;

      for (const existencia of e) {
        if (existencia.programa === strPrograma) {
          Exist = true;
          Pintar = existencia.pintar;
          break;
        } else {
          Exist = false;
        }
      }
      if (!Exist) {
        iterator.classSpan = 'badge rounded-pill bg-SinExistencia';
      } else {
        if (Pintar) {
          iterator.classSpan = 'badge rounded-pill bg-SinExistencia';
        }
      }
    }
    this.DatosGrid = grid;
  }
  CargarInfoSelectRow(e): void {
    this.EspProd =
      e.eProceso === '' || e.eProceso ? e.eprocesoCorr : e.eProceso;

    this.CortarComentarioSelectRow(e.comentarios, e.bioPapel);

    if (this.TipoModulo === '1') {
      this.BuscarPesoUnitario(e.programa);
    }

    this.esMVT = e.mvt;

    if (this.Zona === '02' && this.TipoModulo === '0' && this.esMVT === true) {
      this.visComentariosMVT = true;
    } else {
      this.visComentariosMVT = false;
    }

    if (e.horas === 'FF') {
      this.FecInicioProd = e.fijarFecha;
      this.btnFijaFecha = 'Quitar';
    } else {
      this.FecInicioProd = this.convertirFechaStringSinTiempo(
        new Date(),
        'yyyy-MM-dd'
      );
      this.btnFijaFecha = 'Acepta';
    }

    this.VerificaRestosRollosSelectRow(
      e.liner1,
      e.liner2,
      e.liner3,
      e.anchoL1,
      e.corrugado1,
      e.corrugado2,
      e.anchoC1,
      e.anchoC2
    );
    // this.EnableControls();
    //  this.Locked()
    if (this.Zona === '02' && this.TipoModulo === '1') {
      this.LeeComentariosSelectRow(e.claveArticulo);
    }
  }
  CortarComentarioSelectRow(Comentario: string, BioPapel: string): void {
    if (Comentario.includes('|')) {
      this.Comentario = '';
      this.ComRollosAntiguos = '';
      const comenSinRollos = Comentario.split('|', 2);
      if (this.Zona !== '02') {
        this.ComRollosAntiguos = comenSinRollos[1];
      }
      this.Comentario = comenSinRollos[0];
    } else {
      if (this.Zona === '02') {
        if (BioPapel.trim() !== '') {
          this.Comentario = Comentario + ' |' + BioPapel;
        } else {
          this.Comentario = Comentario;
          this.ComRollosAntiguos = '';
        }
      } else {
        this.Comentario = Comentario;
        this.ComRollosAntiguos = '';
      }
    }
  }
  async VerificaRestosRollosSelectRow(
    Liner1,
    Liner2,
    Liner3,
    Ancho1,
    Medium1,
    Medium2,
    AnchoC1,
    AnchoC2
  ): Promise<any> {
    let Alm = null;

    let res = ' |RESTOS DE ROLLOS: ';
    let resAnterior = '';
    // El almacen 501 es restos de rollos Navojoa, 200 es de Tijuana
    if (this.Zona !== '05') {
      Alm = this.Zona === '01' ? 501 : 200;
    } else {
      this.visComentariosMVT = true;
      return;
    }

    const result = await this.BuscarVerificaRestosRollos(
      Alm,
      Ancho1,
      Liner1,
      Liner2,
      Liner3,
      Medium1,
      AnchoC1,
      Medium2,
      AnchoC2
    );

    for (const iterator of result) {
      if (iterator.nombre.trim() !== resAnterior) {
        res = res + ' ' + iterator.nombre.trim();
        resAnterior = iterator.nombre.trim();
        res = res + ' ' + iterator.articulo.trim();
      }
    }
    if (res !== ' |RESTOS DE ROLLOS: ') {
      if (this.Zona === '01') {
        this.visComentariosMVT = false;
        this.ComRollosAntiguos = this.ComRollosAntiguos + '  ' + res;
      } else {
        this.visComentariosMVT = true;
        this.ComentariosMVT = this.ComentariosMVT + '  ' + res;
      }
    }
  }
  LeeComentariosSelectRow(e: string): void {
    const DatGrdComentarios = [];
    for (const iterator of this.DatosAcciones) {
      if (iterator.claveArticulo.trim() === e.trim()) {
        DatGrdComentarios.push(iterator.claveArticulo);
      }
    }
    this.DatosGridComentarios = DatGrdComentarios;
  }
  EnableControls(): void {
    // Pendiente ver las validaciones
  }
  Locked(x): void {
    const dis = x ? false : true;
    this.disBtnAplica = dis;
    this.disBtnVerOp = dis;
    this.disBtnSubeReg = dis;
    this.disBtnBajaReg = dis;
    this.disBtnAgregaProg = dis;
    this.disBtnTraerMaster = dis;
    this.disBuscarOp = dis;
    this.disbtnFijaFecha = dis;

    if (!dis) {
      this.disAtencion = true;
    } else {
      this.disAtencion = false;
    }

    this.ControlesRep007();
  }
  ControlesRep007(): void {
    if (this.Zona === '02' && this.TipoModulo === '1') {
      this.VisFolioCorrectivo = true;
      this.VisComentarios = true;
      this.VisBtnAntiguo = false;
      this.VisAntiguo = false;
    } else {
      this.VisFolioCorrectivo = false;
      this.VisComentarios = false;
      if (this.TipoModulo === '1') {
        this.VisBtnAntiguo = false;
      }
    }
  }
  async Tiempos(): Promise<any> {
    // Reordena el tiempo de fabricacion de los movimientos actuales
    return new Promise((resolve, reject) => {
      const DatSecuencia = cloneDeep(this.DatosGrid);
      if (this.DatosGrid.length === 0) {
        return;
      }
      for (const iterator of DatSecuencia) {
        this.MiHora = this.ConvertirFechaStringConTiempo(new Date());
        if (iterator.fijarFecha === '') {
          iterator.fijarFecha = this.MiHora;
        }
        const timpoext = iterator.minutosstdproduccion + iterator.tmpStd;
        if (this.Zona === '02') {
          if (iterator.horas.trim() === 'FF') {
            this.MiHora = iterator.fijarFecha;
            this.MiHora = this.SumarMinFecha(
              this.ConvertirFechaDate(this.MiHora),
              timpoext
            );
          } else {
            iterator.horas = '';
            iterator.fijarFecha = this.MiHora;
            this.MiHora = this.SumarMinFecha(
              this.ConvertirFechaDate(this.MiHora),
              timpoext
            );
          }
        } else {
          if (
            iterator.horas.trim() === 'FF' &&
            this.ValidarDiferenciaFechasMin(
              this.ConvertirFechaDate(this.MiHora),
              this.ConvertirFechaDate(iterator.fijarFecha)
            ) > 0
          ) {
            this.MiHora = iterator.fijarFecha;
            this.MiHora = this.SumarMinFecha(
              this.ConvertirFechaDate(this.MiHora),
              timpoext
            );
          } else {
            iterator.horas = '';
            iterator.fijarFecha = this.MiHora;
            this.MiHora = this.SumarMinFecha(
              this.ConvertirFechaDate(this.MiHora),
              timpoext
            );
          }
        }

        iterator.miHora = this.MiHora;
      }
      this.DatosGrid = DatSecuencia;
      resolve(true);
    });
  }
  async Actualiza(): Promise<void> {
    if (this.DatosGrid.length === 0) {
      return;
    }
    const lst = [];
    for (const iterator of this.DatosGrid) {
      lst.push({
        Programa: iterator.programa,
        Orden: iterator.orden,
        Comentarios: iterator.comentarios,
        HoraPrograma: iterator.horaPrograma,
        FijarFecha: iterator.fijarFecha,
        Horas: iterator.horas,
      });
    }
    const Datos = {
      dtos: lst,
    };
    this.blockUI.start();
    return new Promise((resolve, reject) => {
      this.Servicio.Actualiza(Datos).subscribe(
        (data: any) => {
          if (data.correcto) {
            this.blockUI.stop();
          } else {
            this.blockUI.stop();
            swal.fire(
              '',
              'Ocurrió un error al tratar de guardar los datos. ' +
                data.mensaje,
              'error'
            );
          }
          resolve();
        },
        (error) => {
          this.blockUI.stop();
          swal.fire(
            'Datos ',
            'Ha Ocurrio un Error (Actualiza),' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
      );
    });
  }
  ChangeFecInicioProd(e): void {
    this.FecInicioProd = e;
  }
  ChangeWprogramaAut(e): void {
    this.wProgramaAut = e;
  }
  KeyPressBuscar(e): void {
    if (e.keyCode === 13) {
      this.btnBuscar();
    }
  }
  ConvertirFechaDate(Fecha: string): Date {
    // Convierte formato dd/mm/yyyy hh:mm
    const DivFechaCompleta = Fecha.split(' ', 2);
    const DivFecha = DivFechaCompleta[0].split('/', 3);
    const DivHora = DivFechaCompleta[1].split(':', 2);

    const anio = +DivFecha[2];
    const mes = +DivFecha[1];
    const dia = +DivFecha[0];

    const hora = +DivHora[0];
    const min = +DivHora[1];
    return new Date(anio, mes - 1, dia, hora, min);
  }
  ConvertirFechaStringConTiempo(Fecha: Date): string {
    // Convierte formato dd/mm/yyyy hh:mm
    const mes = Fecha.getMonth() + 1;
    const dia = Fecha.getDate();
    const hora = Fecha.getHours();
    const min = Fecha.getMinutes();

    return `${(dia < 10 ? '0' : '').concat(dia.toString())}/${(mes < 10
      ? '0'
      : ''
    ).concat(mes.toString())}/${Fecha.getFullYear()} ${(hora < 10
      ? '0'
      : ''
    ).concat(hora.toString())}:${(min < 10 ? '0' : '').concat(min.toString())}`;
  }
  convertirFechaStringSinTiempo(fecha: Date, formato: string): string {
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    switch (formato) {
      case 'dd/MM/yyyy':
        return `${(dia < 10 ? '0' : '').concat(dia.toString())}/${(mes < 10
          ? '0'
          : ''
        ).concat(mes.toString())}/${fecha.getFullYear()}`;
        break;
      case 'yyyy-MM-dd':
        return `${fecha.getFullYear()}-${(mes < 10 ? '0' : '').concat(
          mes.toString()
        )}-${(dia < 10 ? '0' : '').concat(dia.toString())}`;
        break;

      default:
        break;
    }
    if (formato === 'dd/MM/yyyy') {
    } else {
    }
  }
  SumarMinFecha(fecha: Date, sumarsesion: number): string {
    const minutos = fecha.getMinutes();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    fecha.setMinutes(minutos + sumarsesion);

    const hora = fecha.getHours();
    const min = fecha.getMinutes();

    return `${(dia < 10 ? '0' : '').concat(dia.toString())}/${(mes < 10
      ? '0'
      : ''
    ).concat(mes.toString())}/${fecha.getFullYear()} ${(hora < 10
      ? '0'
      : ''
    ).concat(hora.toString())}:${(min < 10 ? '0' : '').concat(min.toString())}`;
  }
  ValidarDiferenciaFechasMin(inifecha: Date, finfecha: Date): number {
    const DifInmilisegundos = finfecha.getTime() - inifecha.getTime();
    return DifInmilisegundos / 60000;
  }
  // =================Modal=================//
  btnCerrarModalDetalle(): void {
    this.mdl.closeModal();
  }
  btnCerrarModalBuscarOp(): void {
    this.mdlbuscarop.closeModal();
  }
  btnCerrarModalPosEspecifica(): void {
    this.Refrescar();
    this.mdlPosicionEsp.closeModal();
  }
  btnCerrarModalAddPrograma(e): void {
    this.Refrescar();
    if (e.presenta) {
      this.DatosObsProgImpresora = e.datos;
      this.mdlObsProgImpresora.openModal();
    }
    this.mdlAddPrograma.closeModal();
  }
  btnCerrarModalConfiEliminacion(): void {
    this.Refrescar();
    this.mdlConfiEliminacion.closeModal();
  }
  btnCerrarModalLimprimir(): void {
    this.mdlimprimir.closeModal();
  }
  btnCerrarModalFiltroRep(): void {
    this.mdlfiltroreporte.closeModal();
  }
  btnCerrarModalObsProgImpresora(): void {
    this.mdlObsProgImpresora.closeModal();
  }
  btnCerrarModalVerificadorpapeles(): void {
    this.mdlverificadorpapeles.closeModal();
  }
  btnCerrarModalfoliocombinacion(): void {
    this.mdlfoliocombinacion.closeModal();
  }
  mdlBuscarOpFiltrarGrid(e): void {
    console.log(e, 'imprime filtros');
    this.DatosGrid = this.GuardarDatosGrid;
    if (e.length === 0) {
      return;
    }
    const filtrosGrid = [];
    for (const filtro of e) {
      for (const grid of this.DatosGrid) {
        if (grid.programa === filtro.programa) {
          filtrosGrid.push(grid);
        }
      }
    }
    console.log(filtrosGrid);
    this.DatosGrid = filtrosGrid;
  }
  DatosLisSecuenciasOut(e): void {
    this.DatosGrid = cloneDeep(e);
  }
}
