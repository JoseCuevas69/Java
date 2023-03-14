import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GridModel } from 'src/app/models/common/gridModel';
import { ModalModel } from 'src/app/models/common/modalModel';
import { Resistencia } from 'src/app/models/Resistencia';
import { AccesoUsuarios } from 'src/app/models/Programacion/AccesoUsuarios';
import { RutaProceso } from 'src/app/models/Programacion/RutaProceso';
import { ProcesoEspecial } from 'src/app/models/Programacion/ProcesoEspecial';
import { Papeles } from 'src/app/models/Programacion/Papeles';
import { ClavePreparacion } from 'src/app/models/Programacion/ClavePreparacion';
import { Impremeabilizado } from 'src/app/models/Programacion/Impremeabilizado';
import { Insumos } from 'src/app/models/Programacion/Insumos';
import { CombinacionEstandar } from 'src/app/models/Programacion/CombinacionEstandar';
import { ComestandarpapelService } from 'src/app/services/Programacion/comestandarpapel.service';
import Swal from 'sweetalert2';
import { cloneDeep } from 'lodash-es';
import { Articulo } from 'src/app/models/Articulo';
import { FCAPROGDAT006} from 'src/app/models/Programacion/fcaprogdat006';

interface Proceso {
  claveProceso: string;
  descripcion: string;
  isSeleccionado: boolean;
}

interface ListaProceso {
  claveArticulo: string;
  claveRutaProceso: string;
  claveProceso: number;
  estatus: boolean;

}

interface CombinacionPapeles {
  TipoPapel: string;
  clavePapel: string;
  KgM2: number;
  Factor: number;
}

interface Par {
  startRow: number;
  endRow: number;
}

interface LtsFcaprogdat006 {
  claveArticulo: string;
  liner1: string;
  corrugado1: string;
  liner2: string;
  corrugado2: string;
  liner3: string;
  corrugado3: string;
  liner4: string;
  anchoSTD: number;
  trimSTD: number;
  anchoOptimo: number;
  trimOptimo: number;
  cvePreparacion: string;
  estatus: number;
  usuarioInsert: string;
  fechaInsert: Date;
  usuarioUpdate: string;
  fechaUpdate: Date;
  usuarioDelete: string;
  fechaDelete: Date;
}

interface EspecificacionMaquina {
  Restringe: number;
  ClaveArticulo: string;
  Eproceso: string;
  Eprocesocorr: string;
  Proceso: string;
  Cproceso: string;
  Paletizar: boolean;
  ComentariosFabricacion: string;
}

@Component({
  selector: 'app-fcaprog002mw',
  templateUrl: './fcaprog002mw.component.html',
  styleUrls: ['./fcaprog002mw.component.css']
})
export class Fcaprog002mwComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  lFcaprogdat006: LtsFcaprogdat006 = {claveArticulo: '', liner1: '', corrugado1: '', liner2: '', corrugado2: '', liner3: '', corrugado3: '', liner4: '',
                                       anchoSTD: 0, trimSTD: 0, anchoOptimo: 0, trimOptimo: 0, cvePreparacion: '', estatus: 1, usuarioInsert: null,
                                       fechaInsert: null, usuarioUpdate: null, fechaUpdate: null, usuarioDelete: null, fechaDelete: null};
  lProceso: ListaProceso = {claveArticulo: '', claveRutaProceso: '', claveProceso: 0, estatus: true };
  lCombinacionPapeles: CombinacionPapeles = {TipoPapel: '', clavePapel: '', KgM2: 0, Factor: 0};
  lEspecificacionMaquina: EspecificacionMaquina = {Restringe: 0, ClaveArticulo: '', Eproceso: '', Eprocesocorr: '', Proceso: '', Cproceso: '', Paletizar: false, ComentariosFabricacion: ''};
  par: Par = {startRow: 0, endRow: 10};

  Actualizar = false;
  lstCombinacionEstandar = new Array<FCAPROGDAT006>();
  CombinacionEstandar = new CombinacionEstandar();
  ArrayCombinacionEstandar = new Array<CombinacionEstandar>();
  CombinacionPapeles = new Array<CombinacionPapeles>();
  Resistencias = new Array<Resistencia>();
  AccesoUsuario =  new Array<AccesoUsuarios>();
  RutaProceso = new Array<RutaProceso>();
  ProcesoEspecial = new Array<ProcesoEspecial>();
  Proceso = new Array<Proceso>();
  ListarProceso = new Array<ListaProceso>();
  Papeles = new Array<Papeles>();
  ClavePreparacion =  new Array<ClavePreparacion>();
  Impermeabilizado = new Array<Impremeabilizado>();
  Insumos = new Array<Insumos>();
  Articulos = new Array<Articulo>();

  busquedaXArticulo = true;
  busquedaXResistencia = false;
  bloqueaAccesoUsuarios = false;
  ClaveArticulo = '';

  @ViewChild('gridProcesos') GridProcesos: GridModel;
  @ViewChild('gridCombinacion') GridCombinacion: GridModel;
  @ViewChild('gridPapeles') GridPapeles: GridModel;
  @ViewChild('gridInsumos') GridInsumos: GridModel;
  @ViewChild('gridArticulos') GridArticulos: GridModel;
  @ViewChild('gridComentariosOP') GridComentariosOP: GridModel;
  @ViewChild('gridRutaProceso') GridRutaProceso: GridModel;
  @ViewChild('modalCombinacion') modalCombinacion: ModalModel;
  @ViewChild('modalArticulos') modalArticulos: ModalModel;
  @ViewChild('modalComentariosOP') modalComentariosOP: ModalModel;
  @ViewChild('modalMultiplesPiezas') modalMultiplesPiezas: ModalModel;

  mdlCombinacionRef: NgbModalRef;
  mdlArticulosRef: NgbModalRef;
  mdlComentarioOPRef: NgbModalRef;
  mdlMultiplesPiezasRef: NgbModalRef;

  columnGridListaProcesos: any;
  columnGridCombinacion: any;
  columnGridPapel: any;
  columnGridInsumos: any;
  columnGridArticulos: any;
  columnGridComentariosOP: any;
  columnGridRutaProceso: any;

  filtroArticulo = '';
  articuloText = '';
  /*VARIABLES TEMPORALES*/
  resistencia = 'sel';
  claveRutaProceso = 'ZZZ';
  mdlNombreProceso = '';
  cmbProcesoEspecial = '';

  Liner1 = '';
  Liner2 = '';
  Liner3 = '';
  Liner4 = '';
  Medium1 = '';
  Medium2 = '';
  Medium3 = '';

  StrPesoM2 = '0';
  StrPegamento = '0';
  StrGramajexFactor = '0';
  PesoM2 = 0;
  ClaveArticuloSeleccionado = null;
/****************/
  constructor(private modalService: NgbModal, public servicios: ComestandarpapelService) {
    this.GetPapeles();

    this.columnGridListaProcesos = [
      {
        headerName: 'Artículo',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Ruta Proceso',
        field: 'claveRutaProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Proceso',
        field: 'claveProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];

    this.columnGridCombinacion = [
      {
        headerName: 'Artículo',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 115,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 1',
        field: 'liner1',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 1',
        field: 'corrugado1',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 2',
        field: 'liner2',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 2',
        field: 'corrugado2',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 3',
        field: 'liner3',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 3',
        field: 'corrugado3',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 4',
        field: 'liner4',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Proceso',
        field: 'proceso',
        flex: 2,
        minWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'CProceso',
        field: 'cProceso',
        flex: 2,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Pallet',
        field: 'pallet',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Comentarios',
        field: 'comentarios',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'EspProcesoImp',
        field: 'espProcesoImp',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'EspProcesoCorr',
        field: 'EspProcesoCorr',
        flex: 2,
        minWidth: 150,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridSelecionarArticulo.bind(this),
          label: '<i class="fa fa-check"></i>',
          class: 'btn btn-success btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 115,
        suppressSizeToFit: true
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridEditarCombinacionPapel.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 70,
        suppressSizeToFit: true
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridEliminarCombinacionPapel.bind(this),
          label: '<i class="fa fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 90,
        suppressSizeToFit: true
      }
    ];

    this.columnGridInsumos = [
      {
        headerName: 'Cantidad',
        field: 'cantidad',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'A.U.ETIQ',
        field: 'articulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'COD.ALM.REF',
        field: 'articulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'U.APLICA',
        field: 'articulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'UBICACIÓN',
        field: 'articulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'RUTA ETIQ.',
        field: 'articulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];

    this.columnGridArticulos = [
      {
        headerName: 'Clave Artículo',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Nombre Artículo',
        field: 'descripcion',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridSelecionarArticuloModal.bind(this),
          label: '<i class="fa fa-check"></i>',
          class: 'btn btn-success btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 50,
        maxWidth: 120,
        suppressSizeToFit: true
      }
    ];

    this.columnGridComentariosOP = [
      {
        headerName: 'OP',
        field: 'op',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Comentario',
        field: 'comentario',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];

    this.columnGridRutaProceso = [
      {
        headerName: 'Seleccionar',
        field: 'isSeleccionado',
        flex: 1,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
        cellRenderer: 'chkCellRenderer',
        cellRendererParams: {
          change: this.gridSeleccionarProceso.bind(this)
        }
      },
      {
        headerName: 'Proceso',
        field: 'nombreProceso',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];

    this.CargarGridPapeles();
   }
   gridSelecionarArticulo(obj: any): void {
    this.lEspecificacionMaquina.ClaveArticulo = obj.data.claveArticulo;
    this.ClaveArticuloSeleccionado = obj.data.claveArticulo;
   }
   gridEditarCombinacionPapel(obj: any): void {
    this.CombinacionEstandar =  new CombinacionEstandar();

    this.Actualizar = true;
    this.articuloText = obj.data.claveArticulo + ' - ' + obj.data.descripcion;
    this.CombinacionEstandar.claveArticulo = obj.data.claveArticulo;
    this.CombinacionEstandar.anchoSTD = obj.data.anchoStd;
    this.CombinacionEstandar.trimSTD = obj.data.trimStd;
    this.CombinacionEstandar.anchoOptimo = obj.data.anchoOptimo;
    this.CombinacionEstandar.trimOptimo = obj.data.trimOptimo;
    this.CombinacionEstandar.cvePreparacion = obj.data.cvePreparacion;
    this.CombinacionEstandar.handHold = obj.data.handHold;
    this.CombinacionEstandar.troquel = obj.data.troquel;
    this.CombinacionEstandar.parafinado = obj.data.parafinado;
    this.CombinacionEstandar.aplicaSelloFecheroImp = obj.data.aplicaSelloFecheroImp;
    this.CombinacionEstandar.stringKing = obj.data.stringKing;
    this.CombinacionEstandar.cintaRazgado = obj.data.cintaRazgado;
    this.CombinacionEstandar.cintaRefuerzo = obj.data.cintaRefuerzo;
    this.CombinacionEstandar.bolsa = obj.data.bolsa;
    this.CombinacionEstandar.barniz = obj.data.barniz;
    this.CombinacionEstandar.pegamentoImper = obj.data.pegamentoImper;
    this.CombinacionEstandar.conScore = obj.data.conScore;
    this.CombinacionEstandar.nscore = obj.data.nscore;
    this.CombinacionEstandar.impermeabilizado = obj.data.impermeabilizado;
    this.CombinacionEstandar.insumos = obj.data.insumos;

    this.CombinacionPapeles[0].clavePapel = obj.data.liner1;
    this.CombinacionPapeles[1].clavePapel = obj.data.corrugado1;
    this.CombinacionPapeles[2].clavePapel = obj.data.liner2;
    this.CombinacionPapeles[3].clavePapel = obj.data.corrugado2;
    this.CombinacionPapeles[4].clavePapel = obj.data.liner3;
    this.CombinacionPapeles[5].clavePapel = obj.data.corrugado3;
    this.CombinacionPapeles[6].clavePapel = obj.data.liner4;
    this.SeleccionarPapel(obj.data);
    this.openModalAgregar();
   }
   gridEliminarCombinacionPapel(obj: any): void {
    Swal.fire({
      title: '¿Estas Seguro de Eliminar la combinación de papeles para el artículo seleccionado?',
      text: 'Si elimina la combinación de papeles para este artículo, este no sera tomada en cuanta en el proceso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: '<i class="fa fa-undo"></i> Regresar',
      confirmButtonText: '<i class="fa fa-times"></i> Eliminar',
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Eliminando...');
        this.servicios.Eliminar(obj.data.claveArticulo).subscribe((res: any) => {
          this.blockUI.stop();
          if (res.data.resultado > 0){
            Swal.fire('Información', 'Registro Eliminado con Éxito', 'success');
            this.ngOnInit();
          }
        }, (error: any) => {
          this.blockUI.stop();
          Swal.fire('Error', 'Ha ocurrido un error al eliminar el artículo.', 'error');
        });
      }
    });
  }
  gridSelecionarArticuloModal(obj: any): void {
    this.CombinacionEstandar.claveArticulo = obj.data.claveArticulo;
    this.articuloText = obj.data.claveArticulo + ' - ' + obj.data.descripcion;
    this.mdlArticulosRef.close();
    this.filtroArticulo = '';
    this.Articulos = [];
    this.ClaveArticuloSeleccionado = obj.data.claveArticulo;
  }
  gridSeleccionarProceso(obj: any): void {}

  ngOnInit(): void {
    this.GetAccesoUsuario();
    this.GetRutaProceso();
    this.GetProcesoEspecial();
    this.GetClavePreparacion();
    this.GetImpermeabilizado();
    this.GetInsumos();
    this.InicializarDatos();
    this.GetCombinacionEstandarPapel();
  }

  InicializarDatos(): void{
    this.CombinacionEstandar =  new CombinacionEstandar();
    this.CombinacionEstandar.impermeabilizado = '00';
    this.CombinacionEstandar.anchoSTD = 0;
    this.CombinacionEstandar.trimSTD = 0;
    this.CombinacionEstandar.anchoOptimo = 0;
    this.CombinacionEstandar.trimOptimo = 0;
    this.CombinacionEstandar.handHold = false;
    this.CombinacionEstandar.parafinado = false;
    this.CombinacionEstandar.aplicaSelloFecheroImp = false;
    this.CombinacionEstandar.stringKing = false;
    this.CombinacionEstandar.cintaRazgado = false;
    this.CombinacionEstandar.cintaRefuerzo = false;
    this.CombinacionEstandar.bolsa = false;
    this.CombinacionEstandar.barniz = false;
    this.CombinacionEstandar.pegamentoImper = false;
    this.CombinacionEstandar.conScore = false;
  }

  onChangeBusquedaArticulo(e: any): void {
    this.busquedaXArticulo = true;
    this.busquedaXResistencia = false;
    this.ArrayCombinacionEstandar = [];
    this.columnGridCombinacion = [
      {
        headerName: 'Artículo',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 115,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 1',
        field: 'liner1',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 1',
        field: 'corrugado1',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 2',
        field: 'liner2',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 2',
        field: 'corrugado2',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 3',
        field: 'liner3',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 3',
        field: 'corrugado3',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 4',
        field: 'liner4',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Proceso',
        field: 'proceso',
        flex: 2,
        minWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'CProceso',
        field: 'cProceso',
        flex: 2,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Pallet',
        field: 'pallet',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Comentarios',
        field: 'comentarios',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'EspProcesoImp',
        field: 'espProcesoImp',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'EspProcesoCorr',
        field: 'EspProcesoCorr',
        flex: 2,
        minWidth: 150,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridSelecionarArticulo.bind(this),
          label: '<i class="fa fa-check"></i>',
          class: 'btn btn-success btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 115,
        suppressSizeToFit: true
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridEditarCombinacionPapel.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 70,
        suppressSizeToFit: true
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridEliminarCombinacionPapel.bind(this),
          label: '<i class="fa fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 90,
        suppressSizeToFit: true
      }
    ];
  }

  onChangeBusquedaResistencia(e: any): void {
    this.busquedaXResistencia = true;
    this.busquedaXArticulo = false;
    this.ArrayCombinacionEstandar = [];
    this.columnGridCombinacion = [
      {
        headerName: '',
        field: 'existe',
        flex: 4,
        minWidth: 60,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
        cellRenderer: 'chkCellRenderer',
        cellRendererParams: {
          change: this.gridSeleccionarArticulos.bind(this)
        }
      },
      {
        headerName: 'Artículo',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 115,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 1',
        field: 'liner1',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 1',
        field: 'corrugado1',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 2',
        field: 'liner2',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 2',
        field: 'corrugado2',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 3',
        field: 'liner3',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado 3',
        field: 'corrugado3',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Liner 4',
        field: 'liner4',
        flex: 2,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Proceso',
        field: 'proceso',
        flex: 2,
        minWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'CProceso',
        field: 'cProceso',
        flex: 2,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Pallet',
        field: 'pallet',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Comentarios',
        field: 'comentarios',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'EspProcesoImp',
        field: 'espProcesoImp',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'EspProcesoCorr',
        field: 'EspProcesoCorr',
        flex: 2,
        minWidth: 150,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridEditarCombinacionPapel.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 70,
        suppressSizeToFit: true
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.gridEliminarCombinacionPapel.bind(this),
          label: '<i class="fa fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 3,
        minWidth: 90,
        suppressSizeToFit: true
      }
    ];
  }

  gridSeleccionarArticulos(obj: any): void {
    console.log(obj);
  }

  openModalAgregar(): void {
    this.mdlCombinacionRef =  this.modalService.open(this.modalCombinacion, {size: 'xl', backdrop: 'static'});
    this.mdlCombinacionRef.result.then((result) => {}, (reason) => {});
  }

  closeModalAgregar(): void {
    this.mdlCombinacionRef.close();
    this.cleanDatosModal();
  }

  cleanDatosModal(): void {

  }

  openModalArticulos(): void {
    this.mdlArticulosRef = this.modalService.open(this.modalArticulos, {size: 'lg', backdrop: 'static'});
    this.mdlArticulosRef.result.then((result) => {}, (reason) => {});
  }

  closeModalArticulos(): void {
    this.mdlArticulosRef.close();
    this.filtroArticulo = '';
    this.Articulos = [];
  }

  openModalComentariosOP(): void {
    this.mdlComentarioOPRef = this.modalService.open(this.modalComentariosOP, {size: 'lg', backdrop: 'static'});
    this.mdlComentarioOPRef.result.then((result) => {}, (reason) => {});
  }

  closeModalComentariosOP(): void {
    this.mdlComentarioOPRef.close();
  }

  openModalMultiplosPiezas(): void {
    let procesos = '';
    if (this.claveRutaProceso !== 'ZZZ'){
      for (const iterator of this.RutaProceso) {
        if (iterator.claveRutaProceso.trim() === this.claveRutaProceso.trim()) {
          this.mdlNombreProceso = iterator.nombreRutaProceso.trim() + ' [' + iterator.claveRutaProceso.trim() + ']';
          if (iterator.m1 !== null) {
            if (iterator.m1.trim() !== ''){
              procesos = iterator.m1.trim() + ',';
            }
          }
          if (iterator.m2 !== null) {
            if (iterator.m2.trim() !== '') {
              procesos += iterator.m2.trim() + ',';
            }
          }
          if (iterator.m3 !== null) {
            if (iterator.m3.trim() !== '') {
              procesos += iterator.m3.trim() + ',';
            }
          }
          if (iterator.m4 !== null) {
            if (iterator.m4.trim() !== '') {
              procesos += iterator.m4.trim() + ',';
            }
          }
          if (iterator.m5 !== null) {
            if (iterator.m5.trim() !== '') {
              procesos += iterator.m5.trim();
            }
          }
        }
      }

      this.GetProceso(procesos.replace(/,\s*$/, ''));

      this.mdlMultiplesPiezasRef = this.modalService.open(this.modalMultiplesPiezas, {size: 'lg', backdrop: 'static'});
      this.mdlMultiplesPiezasRef.result.then((result) => {}, (reason) => {});

    }else {
      Swal.fire('Información', 'Debe de seleccionar una ruta de proceso', 'info');
    }
  }

  closeModalMultiplosPiezas(): void {
    this.mdlNombreProceso = '';
    this.Proceso = [];
    this.mdlMultiplesPiezasRef.close();
  }

  /* SERVICIOS */

  GetResistencia(): void {
    this.blockUI.start('Cargando Resistencias...');
    this.servicios.GetResistencias().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.Resistencias = res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de la resistencia', 'error');
    });
  }

  onchageResistencias(obj: any): void{
    for (const iterator of this.Resistencias) {
      if (iterator.claveResistencia === obj) {
        this.cleanDatosResistencia();
        this.Liner1 = iterator.liner1;
        this.Liner2 = iterator.liner2;
        this.Liner3 = iterator.liner3;
        this.Liner4 = iterator.liner4;
        this.Medium1 = iterator.medium1;
        this.Medium2 = iterator.medium2;
        this.Medium3 = iterator.medium3;
      }
    }
    this.GetArticulosPorResistencia(obj);
  }

  GetArticulosPorResistencia(resistencia: string): void {
    this.blockUI.start('Buscando Artículos...');
    this.servicios.GetArticulosPorResistencia(this.par, resistencia).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ArrayCombinacionEstandar = res.data;
        this.GridCombinacion.refreshData();
      } else {
        Swal.fire('Información', 'No se encontraron datos con la resistencia: ' + resistencia + ' seleccionada.', 'info');
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Error al obtener la información de los artículos', 'error');
    });
  }

  cleanDatosResistencia(): void {
    this.Liner1 = '';
    this.Liner2 = '';
    this.Liner3 = '';
    this.Liner4 = '';
    this.Medium1 = '';
    this.Medium2 = '';
    this.Medium3 = '';
  }

  GetAccesoUsuario(): void {
    this.blockUI.start('Cargando Acceso a Usuarios...');
    this.servicios.GetPermisosUsuarios().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.AccesoUsuario =  res.data;
        this.bloqueaAccesoUsuarios = true;
        this.lEspecificacionMaquina.Restringe = 1;
      } else {
        this.bloqueaAccesoUsuarios = false;
        this.GetResistencia();
        this.lEspecificacionMaquina.Restringe = 0;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de acceso a usuarios', 'error');
    });
  }

  GetRutaProceso(): void {
    this.blockUI.start('Cargando Ruta Proceso...');
    this.servicios.GetRutaProceso().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.RutaProceso =  res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de ruta procesos', 'error');
    });
  }

  GetProcesoEspecial(): void {
    this.blockUI.start('Cargando Proceso Especial Corrugadora...');
    this.servicios.GetProcesoEspecial().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ProcesoEspecial =  res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de ruta procesos', 'error');
    });
  }

  GetProceso(procesos: string): void {
    this.blockUI.start('Cargando Proceso...');
    this.servicios.GetProceso(procesos).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.Proceso =  res.data; 
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos procesos', 'error');
    });
  }

  AgragarListaProcesos(): void{
    for (const iterator of this.Proceso) {
      if (iterator.isSeleccionado === true){
        this.lProceso = {claveArticulo: '', claveRutaProceso: '', claveProceso: 0, estatus: true };
        this.lProceso.claveArticulo = this.ClaveArticuloSeleccionado;
        this.lProceso.claveRutaProceso = this.claveRutaProceso.trim();
        this.lProceso.claveProceso = Number(iterator.claveProceso);
        this.ListarProceso.push(this.lProceso);
      }
    }
    this.closeModalMultiplosPiezas();
    this.GridProcesos.refreshData();
  }

  GetPapeles(): void {
    this.blockUI.start('Cargando Papeles...');
    this.servicios.GetPapeles().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.Papeles =  res.data;
        this.columnGridPapel = [
          {
            headerName: 'Tipo',
            field: 'TipoPapel',
            flex: 2,
            minWidth: 120,
            headerClass: 'header-center header-grid-left',
            cellClass: 'grid-cell-center'
          },
          {
            headerName: 'Papel',
            field: 'clavePapel',
            flex: 4,
            minWidth: 100,
            headerClass: 'header-grid',
            cellRenderer: 'hybCellRenderer',
            cellRendererParams: {
              type: 'cbx',
              textField: 'clavePapel',
              options: this.Papeles,
              change: this.SeleccionarPapel.bind(this)
            },

          },
          {
            headerName: 'KgM2',
            field: 'KgM2',
            flex: 2,
            minWidth: 120,
            headerClass: 'header-center header-grid',
            cellClass: 'grid-cell-center'
          },
          {
            headerName: 'Factor',
            field: 'Factor',
            flex: 2,
            minWidth: 120,
            headerClass: 'header-center header-grid-right',
            cellClass: 'grid-cell-center'
          }
        ];
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de ruta procesos', 'error');
    });
  }

  GetClavePreparacion(): void {
    this.blockUI.start('Cargando Claves Preparación...');
    this.servicios.GetClavePreparacion().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ClavePreparacion =  res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de ruta procesos', 'error');
    });
  }

  GetImpermeabilizado(): void {
    this.blockUI.start('Cargando Impermeabilizado...');
    this.servicios.GetImpermeabilizado().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.Impermeabilizado =  res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de ruta procesos', 'error');
    });
  }

  GetInsumos(): void {
    this.blockUI.start('Cargando Insumos...');
    this.servicios.GetInsumos().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.Insumos =  res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener los datos de ruta procesos', 'error');
    });
  }

  SeleccionarPapel(obj: any): void{
    let GramajexFactor = 0;

    let Pegamento = 0;

    this.blockUI.start('Calculando Metros Cuadrados del Papel...');
    this.servicios.GetCalculoPesoM2(this.ClaveArticulo, this.CombinacionPapeles[0].clavePapel, this.CombinacionPapeles[1].clavePapel, this.CombinacionPapeles[2].clavePapel, this.CombinacionPapeles[3].clavePapel, this.CombinacionPapeles[4].clavePapel, this.CombinacionPapeles[5].clavePapel, this.CombinacionPapeles[6].clavePapel, null, null).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        for (const iterator of res.data) {
          GramajexFactor += iterator.gramajeXFactor;
          Pegamento += iterator.pegamento;
          this.PesoM2 += iterator.pesoM2;
        }
        this.StrGramajexFactor = GramajexFactor.toFixed(3);
        this.StrPegamento = Pegamento.toFixed(3);
        this.StrPesoM2 = this.PesoM2.toFixed(3);

        for (const iterator of this.CombinacionPapeles) {
          for (const iteratorf of res.data) {
            if (iterator.clavePapel === iteratorf.papel){
              iterator.KgM2 = iteratorf.gramajeXFactor;
              iterator.Factor = iteratorf.factor;
            }
          }
        }
        this.CombinacionPapeles = cloneDeep(this.CombinacionPapeles);
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener la información del calculo de M2 de los papeles', 'error');
    });
  }

  GetArticulos(): void {
    this.blockUI.start('Buscando Artículos...');
    this.servicios.GetArticulos(this.par, this.filtroArticulo).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.Articulos = res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener la información de los artículos', 'error');
    });
  }

  CargarGridPapeles(): void {
    this.lCombinacionPapeles.TipoPapel = 'L1';
    this.lCombinacionPapeles.clavePapel = '';
    this.lCombinacionPapeles.KgM2 = 0;
    this.lCombinacionPapeles.Factor = 0;
    this.CombinacionPapeles.push(this.lCombinacionPapeles);

    this.lCombinacionPapeles = {TipoPapel: '', clavePapel: '', KgM2: 0, Factor: 0};
    this.lCombinacionPapeles.TipoPapel = 'C1';
    this.lCombinacionPapeles.clavePapel = '';
    this.lCombinacionPapeles.KgM2 = 0;
    this.lCombinacionPapeles.Factor = 0;
    this.CombinacionPapeles.push(this.lCombinacionPapeles);

    this.lCombinacionPapeles = {TipoPapel: '', clavePapel: '', KgM2: 0, Factor: 0};
    this.lCombinacionPapeles.TipoPapel = 'L2';
    this.lCombinacionPapeles.clavePapel = '';
    this.lCombinacionPapeles.KgM2 = 0;
    this.lCombinacionPapeles.Factor = 0;
    this.CombinacionPapeles.push(this.lCombinacionPapeles);

    this.lCombinacionPapeles = {TipoPapel: '', clavePapel: '', KgM2: 0, Factor: 0};
    this.lCombinacionPapeles.TipoPapel = 'C2';
    this.lCombinacionPapeles.clavePapel = '';
    this.lCombinacionPapeles.KgM2 = 0;
    this.lCombinacionPapeles.Factor = 0;
    this.CombinacionPapeles.push(this.lCombinacionPapeles);

    this.lCombinacionPapeles = {TipoPapel: '', clavePapel: '', KgM2: 0, Factor: 0};
    this.lCombinacionPapeles.TipoPapel = 'L3';
    this.lCombinacionPapeles.clavePapel = '';
    this.lCombinacionPapeles.KgM2 = 0;
    this.lCombinacionPapeles.Factor = 0;
    this.CombinacionPapeles.push(this.lCombinacionPapeles);

    this.lCombinacionPapeles = {TipoPapel: '', clavePapel: '', KgM2: 0, Factor: 0};
    this.lCombinacionPapeles.TipoPapel = 'C3';
    this.lCombinacionPapeles.clavePapel = '';
    this.lCombinacionPapeles.KgM2 = 0;
    this.lCombinacionPapeles.Factor = 0;
    this.CombinacionPapeles.push(this.lCombinacionPapeles);

    this.lCombinacionPapeles = {TipoPapel: '', clavePapel: '', KgM2: 0, Factor: 0};
    this.lCombinacionPapeles.TipoPapel = 'L4';
    this.lCombinacionPapeles.clavePapel = '';
    this.lCombinacionPapeles.KgM2 = 0;
    this.lCombinacionPapeles.Factor = 0;
    this.CombinacionPapeles.push(this.lCombinacionPapeles);
  }

  GetCombinacionEstandarPapel(): void {
    this.blockUI.start('Buscando Artículos...');
    this.servicios.GetCombinacionEstandarPapel(this.par, this.filtroArticulo).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ArrayCombinacionEstandar = res.data;
        this.GridCombinacion.refreshData();
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un erro al obtener la informacion de combinacion estandar de papel', 'error');
    });
  }

  GuardarCombinacionEstandar(): void {

    const VerificarDatos = this.VerificarDatos();

    if (VerificarDatos === true){
      if (this.Actualizar === false){
        this.CombinacionEstandar.liner1 = this.CombinacionPapeles[0].clavePapel;
        this.CombinacionEstandar.corrugado1 = this.CombinacionPapeles[1].clavePapel;
        this.CombinacionEstandar.liner2 = this.CombinacionPapeles[2].clavePapel;
        this.CombinacionEstandar.corrugado2 = this.CombinacionPapeles[3].clavePapel;
        this.CombinacionEstandar.liner3 = this.CombinacionPapeles[4].clavePapel;
        this.CombinacionEstandar.corrugado3 = this.CombinacionPapeles[5].clavePapel;
        this.CombinacionEstandar.liner4 = this.CombinacionPapeles[6].clavePapel;
        this.CombinacionEstandar.pesoM2 = this.PesoM2;

        this.blockUI.start('Guardando...');
        this.servicios.Agregar(this.CombinacionEstandar).subscribe((res: any) => {
          this.blockUI.stop();
          if (res.data.resultado > 0){
            Swal.fire('Guardado con Éxito', 'El registro se ha guardado con éxito', 'success');
            this.CombinacionPapeles = [];
            this.articuloText = '';
            this.StrGramajexFactor = '0';
            this.StrPegamento = '0';
            this.StrPesoM2 = '0';
            this.InicializarDatos();
            this.closeModalAgregar();
            this.CargarGridPapeles();
          }else {
            Swal.fire('Información', 'Ha ocurrido un error al guardar la información de combinacion estandar de papel', 'info');
          }
        }, (error: any) => {
          this.blockUI.stop();
          Swal.fire('Información', 'Ha ocurrido un error al guardar la información de combinacion estandar de papel ' + error, 'info');
        });
      } else {
        this.CombinacionEstandar.liner1 = this.CombinacionPapeles[0].clavePapel;
        this.CombinacionEstandar.corrugado1 = this.CombinacionPapeles[1].clavePapel;
        this.CombinacionEstandar.liner2 = this.CombinacionPapeles[2].clavePapel;
        this.CombinacionEstandar.corrugado2 = this.CombinacionPapeles[3].clavePapel;
        this.CombinacionEstandar.liner3 = this.CombinacionPapeles[4].clavePapel;
        this.CombinacionEstandar.corrugado3 = this.CombinacionPapeles[5].clavePapel;
        this.CombinacionEstandar.liner4 = this.CombinacionPapeles[6].clavePapel;
        this.CombinacionEstandar.pesoM2 = this.PesoM2;

        this.blockUI.start('Actualizando...');
        this.servicios.Actualizar(this.CombinacionEstandar).subscribe((res: any) => {
          this.blockUI.stop();
          if (res.data.resultado > 0){
            Swal.fire('Actualizado con Éxito', 'El registro se ha actualizado con éxito', 'success');
            this.CombinacionPapeles = [];
            this.articuloText = '';
            this.StrGramajexFactor = '0';
            this.StrPegamento = '0';
            this.StrPesoM2 = '0';
            this.InicializarDatos();
            this.closeModalAgregar();
            this.CargarGridPapeles();
          }else {
            Swal.fire('Información', 'Ha ocurrido un error al actualizar la información de combinacion estandar de papel', 'info');
          }
        }, (error: any) => {
          this.blockUI.stop();
          Swal.fire('Información', 'Ha ocurrido un error al actualizar la información de combinacion estandar de papel ' + error, 'info');
        });
      }
    }
  }

  VerificarDatos(): boolean {
    let token = true;

    if (this.CombinacionEstandar.claveArticulo === null){
      Swal.fire('Información', 'Favor de seleccionar una clave de artículo', 'info');
      token = false;
    }

    if (this.CombinacionEstandar.cvePreparacion === null){
      Swal.fire('Información', 'Favor de seleccionar una clave de preparación', 'info');
      token = false;
    }

    return token;
  }

  GuardarCombinacionPorResistencia(): void {
    this.lstCombinacionEstandar = [];

    for (const iterator of this.ArrayCombinacionEstandar) {
      if (iterator.existe === true){
        this.lFcaprogdat006 = {claveArticulo: '', liner1: '', corrugado1: '', liner2: '', corrugado2: '', liner3: '', corrugado3: '', liner4: '',
                               anchoSTD: 0, trimSTD: 0, anchoOptimo: 0, trimOptimo: 0, cvePreparacion: '', estatus: 1, usuarioInsert: null,
                               fechaInsert: null, usuarioUpdate: null, fechaUpdate: null, usuarioDelete: null, fechaDelete: null};
        this.lFcaprogdat006.claveArticulo = iterator.claveArticulo;
        this.lFcaprogdat006.liner1 = this.Liner1;
        this.lFcaprogdat006.corrugado1 = this.Medium1;
        this.lFcaprogdat006.liner2 = this.Liner2;
        this.lFcaprogdat006.corrugado2 = this.Medium2;
        this.lFcaprogdat006.liner3 = this.Liner3;
        this.lFcaprogdat006.corrugado3 = this.Medium3;
        this.lFcaprogdat006.liner4 = this.Liner4;
        this.lstCombinacionEstandar.push(this.lFcaprogdat006);
      }
    }

    this.blockUI.start('Guardando...');
    this.servicios.GuardarPorResistencia(this.lstCombinacionEstandar).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.resultado > 0){
        Swal.fire('Guardado', 'Guardado Con Éxito', 'success');
        this.InicializarDatos();
        this.lstCombinacionEstandar = [];
        this.ArrayCombinacionEstandar = [];
      }else {
        Swal.fire('Información', 'Ha ocurrido un error al guardados los datos', 'error');
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al guardados los datos', 'error');
    });
  }

  GuardarEspecificaciones(): void {
    this.lEspecificacionMaquina.Proceso = this.claveRutaProceso === 'ZZZ' ? null : this.claveRutaProceso;

    this.blockUI.start('Guardando Especificaciones...');
    this.servicios.GuardarEspecificaciones(this.lEspecificacionMaquina).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.resultado > 0){
        Swal.fire('Guardado', 'Guardado Con Éxito', 'success');
        this.InicializarDatos();
        this.lstCombinacionEstandar = [];
        this.ArrayCombinacionEstandar = [];
        this.lEspecificacionMaquina = {Restringe: 0, ClaveArticulo: '', Eproceso: '', Eprocesocorr: '', Proceso: '', Cproceso: '', Paletizar: false, ComentariosFabricacion: ''};
      }else {
        Swal.fire('Información', 'Ha ocurrido un error al guardados los datos', 'error');
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al guardados los datos', 'error');
    });
  }
}
