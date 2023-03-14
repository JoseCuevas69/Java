import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Articulo } from 'src/app/models/Articulo';
import { GridModel } from 'src/app/models/common/gridModel';
import { ModalModel } from 'src/app/models/common/modalModel';
import { Maquina } from 'src/app/models/maquina';
import { RutaProceso } from 'src/app/models/Programacion/RutaProceso';
import { ComestandarpapelService } from 'src/app/services/Programacion/comestandarpapel.service';
import { AsignacionmaquinaService} from 'src/app/services/Programacion/asignacionmaquina.service';
import { AsginacionMaquina } from 'src/app/models/Programacion/AsginacionMaquina';
import { ArticulosRutaProceso } from 'src/app/models/Programacion/ArticulosRutaProceso';
import Swal from 'sweetalert2';

interface Par {
  startRow: number;
  endRow: number;
}

export interface Procesos {
  maquinaOrden: number;
  claveArticulo: string;
  claveMaquina: string;
  activo: number;
  estatus: number;
  usuarioInsert: string;
  fechaInsert: Date;
  usuarioUpdate: string;
  fechaUpdate: Date;
  usuarioDelete: string;
  fechaDelete: Date;
}


@Component({
  selector: 'app-fcaprog007mw',
  templateUrl: './fcaprog007mw.component.html',
  styleUrls: ['./fcaprog007mw.component.css']
})
export class Fcaprog007mwComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  par: Par = {startRow: 0, endRow: 10};
  ltsProceso: Procesos = {maquinaOrden: 0, claveArticulo: '', claveMaquina: '', activo: 1, estatus: 1,
                          usuarioInsert: null, fechaInsert: null, usuarioUpdate: null, fechaUpdate: null,
                          usuarioDelete: null, fechaDelete: null};

  ArticuloText = '';
  filtroArticulo = '';
  rutaProcesoSeleccionado = '';
  checkArtivar = false;
  cmbRutasProceso = 'sel';
  proceso1 = false;
  proceso2 = false;
  proceso3 = false;
  Selproceso1 = 'sin';
  Selproceso2 = 'sin';
  Selproceso3 = 'sin';
  ClaveArticulo = '';
  seleccionartodos = false;

  columnGridArticulos: any;
  columnGridArticulosProcesos: any;

  Articulos = new Array<Articulo>();
  ltsMaquina =  new Array<Maquina>();
  ltsRutaProceso = new Array<RutaProceso>();
  AsignacionMaquina =  new Array<AsginacionMaquina>();
  ltsArticulosPorProceso = new Array<ArticulosRutaProceso>();

  @ViewChild('gridArticulos') GridArticulos: GridModel;
  @ViewChild('gridArticulosProcesos') GridArticulosProcesos: GridModel;
  @ViewChild('modalArticulos') modalArticulos: ModalModel;
  @ViewChild('modalArticulosProcesos') modalArticulosProcesos: ModalModel;

  mdlArticulosRef: NgbModalRef;
  mdlArticulosProcesoRef: NgbModalRef;

  constructor(private modalService: NgbModal, public servicios: ComestandarpapelService, public serviciosAsignacion: AsignacionmaquinaService) {
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

    this.columnGridArticulosProcesos = [
      {
        headerName: 'Seleccionar',
        field: 'activo',
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
        headerName: 'Clave Artículo',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Nombre Artículo',
        field: 'nombreArticulo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Proceso 1',
        field: 'maquina1',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Proceso 2',
        field: 'maquina2',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Proceso 3',
        field: 'maquina3',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];
  }

  gridSeleccionarArticulos(obj: any): void {
    console.log(obj);
  }

  SeleccionarTodos(): void {
    if (this.seleccionartodos === true){
      for (const iterator of this.ltsArticulosPorProceso) {
        iterator.activo = true;      }
    } else{
      for (const iterator of this.ltsArticulosPorProceso) {
        iterator.activo = false;
      }
    }
    this.GridArticulosProcesos.refreshData();
  }

  gridSelecionarArticuloModal(obj: any): void {
    this.ArticuloText =  obj.data.claveArticulo + ' - ' + obj.data.descripcion;
    this.ClaveArticulo = obj.data.claveArticulo;

    this.blockUI.start('Buscando...');
    this.serviciosAsignacion.GetProcesosRelacionados(obj.data.claveArticulo).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0) {
        this.blockUI.start('Buscando...');
        this.serviciosAsignacion.GetAsginacionMaquina(obj.data.claveArticulo).subscribe((result: any) => {
          this.blockUI.stop();
          if (result.data.length > 0){
            for (const iterator of res.data) {
              if (iterator.maquinaOrden === 1){
                this.proceso1 = true;
              }
              if (iterator.maquinaOrden === 2){
                this.proceso2 = true;
              }
              if (iterator.maquinaOrden === 3){
                this.proceso3 = true;
              }
            }
          }else {
            for (const iterator of res.data) {
              if (iterator.maquinaOrden === 1){
                this.proceso1 = true;
              }
              if (iterator.maquinaOrden === 2){
                this.proceso2 = true;
              }
              if (iterator.maquinaOrden === 3){
                this.proceso3 = true;
              }
            }
          }
        }, (error: any) => {
          Swal.fire('Información', 'Ha ocurrido un error al obtener la información de la asignación de máquinas', 'error');
        });
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al obtener la información de los procesos por artículo', 'error');
    });

    this.closeModalArticulos();
  }

  ngOnInit(): void {
    this.GetMaquinas();
    this.GetRutas();
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

  GetMaquinas(): void {
    this.blockUI.start('Buscando Máquinas...');
    this.serviciosAsignacion.GetMaquinas().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ltsMaquina = res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al tratar de obtener el listado de máquinas', 'info');
    });
  }

  GetRutas(): void {
    this.blockUI.start('Buscando Rutas Proceso...');
    this.serviciosAsignacion.GetRutas().subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ltsRutaProceso = res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al tratar de obtener el listado de rutas procesos', 'info');
    });
  }

  GetArticulosProcesos(): void {
    this.blockUI.start('Buscando Artículos por Proceso...');
    this.serviciosAsignacion.GetArticulosPorProceso(this.par, this.cmbRutasProceso, this.filtroArticulo).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ltsArticulosPorProceso = res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al tratar de obtener el listado de rutas procesos', 'info');
    });
  }

  GuardarProcesosArticulos(): void{
    this.AsignacionMaquina = [];

    if (this.ClaveArticulo !== ''){
      if (this.proceso1 === true) {
        this.ltsProceso = {maquinaOrden: 0, claveArticulo: '', claveMaquina: '', activo: 1, estatus: 1, usuarioInsert: null, fechaInsert: null, usuarioUpdate: null, fechaUpdate: null, usuarioDelete: null, fechaDelete: null};
        this.ltsProceso.claveArticulo = this.ClaveArticulo;
        this.ltsProceso.activo = 1;
        this.ltsProceso.estatus = 1;
        this.ltsProceso.maquinaOrden = 1;
        this.ltsProceso.claveMaquina =  this.Selproceso1;
        this.AsignacionMaquina.push(this.ltsProceso);
      }

      if (this.proceso2 === true) {
        this.ltsProceso = {maquinaOrden: 0, claveArticulo: '', claveMaquina: '', activo: 1, estatus: 1, usuarioInsert: null, fechaInsert: null, usuarioUpdate: null, fechaUpdate: null, usuarioDelete: null, fechaDelete: null};
        this.ltsProceso.claveArticulo = this.ClaveArticulo;
        this.ltsProceso.activo = 1;
        this.ltsProceso.estatus = 1;
        this.ltsProceso.maquinaOrden = 2;
        this.ltsProceso.claveMaquina =  this.Selproceso2;
        this.AsignacionMaquina.push(this.ltsProceso);
      }

      if (this.proceso3 === true) {
        this.ltsProceso = {maquinaOrden: 0, claveArticulo: '', claveMaquina: '', activo: 1, estatus: 1, usuarioInsert: null, fechaInsert: null, usuarioUpdate: null, fechaUpdate: null, usuarioDelete: null, fechaDelete: null};
        this.ltsProceso.claveArticulo = this.ClaveArticulo;
        this.ltsProceso.activo = 1;
        this.ltsProceso.estatus = 1;
        this.ltsProceso.maquinaOrden = 3;
        this.ltsProceso.claveMaquina =  this.Selproceso3;
        this.AsignacionMaquina.push(this.ltsProceso);
      }
      this.blockUI.start('Guardando...');
      this.serviciosAsignacion.GuardarProceso(this.AsignacionMaquina).subscribe((res: any) => {
        this.blockUI.stop();
        if (res.data.resultado > 0){
          this.LimpiarDatos();
          Swal.fire('Información', 'Procesos guardados con éxito', 'success');
        } else {
          Swal.fire('Información', 'No se ha podido guardar la información de los procesos', 'error');
        }
      }, (error: any) => {
        this.blockUI.stop();
        Swal.fire('Información', 'Ha ocurrido un error al guardar los datos del proceso... ', 'error');
      });
    } else{
      Swal.fire('Información', 'Debe de seleccionar un Artículo para seleccionar los procesos', 'info');
    }
  }

  ActulizarProcesos(): void {
    this.AsignacionMaquina = [];
    for (const iterator of this.ltsArticulosPorProceso) {
        this.ltsProceso = {maquinaOrden: 0, claveArticulo: '', claveMaquina: '', activo: 0, estatus: 0, usuarioInsert: null, fechaInsert: null, usuarioUpdate: null, fechaUpdate: null, usuarioDelete: null, fechaDelete: null};
        this.ltsProceso.claveArticulo = iterator.claveArticulo;
        this.ltsProceso.activo = iterator.activo === true ? 1 : 0;
        this.AsignacionMaquina.push(this.ltsProceso);
    }

    this.blockUI.start('Actualizando...');
    this.serviciosAsignacion.ActualizarProceso(this.AsignacionMaquina).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.resultado > 0){
        this.closeModalArticulosProcesos();
        Swal.fire('Información', 'La información ha sido actualizada con éxito', 'success');
      }else {
        Swal.fire('Información', 'Ha ocurrido un error al actualizar los datos', 'error');
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al actualizar los datos', 'error');
    });
  }

  ObtenerArticulosPorProceso(ruta: string): void {
    this.blockUI.start('Buscando Artículos por Proceso...');
    this.serviciosAsignacion.GetArticulosPorProceso(this.par, ruta).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.data.length > 0){
        this.ltsArticulosPorProceso = res.data;
      }
    }, (error: any) => {
      this.blockUI.stop();
      Swal.fire('Información', 'Ha ocurrido un error al tratar de obtener el listado de rutas procesos', 'info');
    });
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

  openModalArticulosProcesos(): void {
    for (const iterator of this.ltsRutaProceso) {
      if (iterator.claveRutaProceso === this.cmbRutasProceso){
        this.rutaProcesoSeleccionado = ' ' + iterator.claveRutaProceso.trim() + ' - ' + iterator.nombreRutaProceso.trim();
      }
    }

    if (this.cmbRutasProceso === 'sel'){
      Swal.fire('Información', 'Es necesario capturar una ruta', 'info');
    }else {
      this.ObtenerArticulosPorProceso(this.cmbRutasProceso.trim());
      this.mdlArticulosProcesoRef =  this.modalService.open(this.modalArticulosProcesos, {size: 'lg', backdrop: 'static'});
      this.mdlArticulosProcesoRef.result.then((result) => {}, (reason) => {});
    }
  }

  closeModalArticulosProcesos(): void{
    this.mdlArticulosProcesoRef.close();
    this.filtroArticulo = '';
    this.LimpiarDatos();
    this.ltsArticulosPorProceso = [];
    this.seleccionartodos = false;
    this.cmbRutasProceso = 'sel';
    this.checkArtivar =  false;
  }

  LimpiarDatos(): void {
    this.ArticuloText = '';
    this.filtroArticulo = '';
    this.rutaProcesoSeleccionado = '';
    this.checkArtivar = false;
    this.cmbRutasProceso = 'sel';
    this.proceso1 = false;
    this.proceso2 = false;
    this.proceso3 = false;
    this.Selproceso1 = 'sin';
    this.Selproceso2 = 'sin';
    this.Selproceso3 = 'sin';
    this.ClaveArticulo = '';
  }

}
