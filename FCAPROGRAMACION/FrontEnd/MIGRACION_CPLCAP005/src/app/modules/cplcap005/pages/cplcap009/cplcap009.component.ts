import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GridModel } from 'src/app/models/common/gridModel';

import { Cplcap009Service } from 'src/app/services/cplcap009.service';
import Swal from 'sweetalert2';
import { CPLCAP009Entity, listaDatos, listaDatosPrincipal, resCambiosArticulos, resValidaVariacion } from '../../../../models/common/cplcap009'

@Component({
  selector: 'app-cplcap009',
  templateUrl: './cplcap009.component.html',
  styleUrls: ['./cplcap009.component.css']
})
export class Cplcap009Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  tituloCabecera: string = 'CPLCAP009';

  // ------------------------------------------------------
  columnasGrid: any;
  @ViewChild('gridDatos') gridDatos: GridModel;
  listaDatos: Array<listaDatos>;
  listaDatosSearch: Array<listaDatos>;
  chkAllOps: boolean = true;
  chkValRef: boolean = false;
  txtOP: string = '';
  totKG: number = 0;
  totMts: number = 0;
  datos = new listaDatosPrincipal();
  // ------------------------------------------------------
  @ViewChild('Cap002') private Cap002: any;
  mdlCap002Ref: NgbModalRef;
  mdlTxtOp: string = '';
  // ------------------------------------------------------
  columnasGridVariacion: any;
  listaDatosVariacion: Array<resValidaVariacion>;
  @ViewChild('mdlVariacion') private mdlVariacion: any;
  mdlVariacionRef: NgbModalRef;
  // ------------------------------------------------------
  @ViewChild('mdlCambioArticulos') private mdlCambioArticulos: any;
  mdlCambioArticulosRef: NgbModalRef;
  columnasGridArticulos: any;
  listaDatosArticulos: Array<resCambiosArticulos>;
  // ------------------------------------------------------

  constructor(
    private modalService: NgbModal,
    public Servicio: Cplcap009Service
  ) {
    this.columnasGrid = [
      // Prio
      {
        headerName: 'Prio',
        field: 'prior',
        flex: 1,
        minWidth: 55,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          change: this.changeValorPrior.bind(this)
        }
      },
      // Usar
      {
        headerName: 'Usar',
        field: 'usar',
        flex: 1,
        minWidth: 60,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          change: this.changeValorUsar.bind(this)
        }
      },
      // Ref
      {
        headerName: 'Ref',
        field: 'refile',
        flex: 1,
        minWidth: 55,
        headerClass: 'header-center header-grid',
        cellRenderer: 'hybCellRenderer',
        cellClass: 'grid-cell-btn-center',
        cellRendererParams: {
          type: 'chk',
          change: this.changeValorRef.bind(this)
        }
      },
      // OP
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Fecha Entrega
      {
        headerName: 'Fecha Ent.',
        field: 'fechaEntrega',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Cliente
      {
        headerName: 'Cliente',
        field: 'cliente',
        flex: 3,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Clave Artículo
      {
        headerName: 'Cve. Art.',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Descripción Artículo
      {
        headerName: 'Descripción',
        field: 'articulo',
        flex: 3,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Cantidad
      {
        headerName: 'Cantidad',
        field: 'cantidad',
        flex: 1,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Faltan
      {
        headerName: 'Faltan',
        field: 'hojas',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellRenderer: 'hybCellRenderer',
        cellRendererParams: {
          type: 'txt',
          change: this.changeHojasGridPrincipal.bind(this)
        },
      },
      // Excedente PT
      {
        headerName: 'Excedente PT',
        field: 'excedentePT',
        flex: 2,
        minWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Ancho
      {
        headerName: 'Ancho',
        field: 'ancho',
        flex: 1,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Largo
      {
        headerName: 'Largo',
        field: 'largo',
        flex: 1,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Piezas
      {
        headerName: 'Piezas',
        field: 'piezas',
        flex: 1,
        minWidth: 85,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Resistencia
      {
        headerName: 'Resistencia',
        field: 'resistencia',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Flauta
      {
        headerName: 'Fta.',
        field: 'flauta',
        flex: 1,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // TKg
      {
        headerName: 'TKg',
        field: 'tkg',
        flex: 1,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Tipo
      {
        headerName: 'Tipo',
        field: 'lamina',
        flex: 1,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Parc
      {
        headerName: 'Parc',
        field: 'parcial',
        flex: 1,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Mas
      {
        headerName: 'Mas',
        field: 'mass',
        flex: 1,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Tipo Lamina
      {
        headerName: 'Tipo Lamina',
        field: 'txtConScore',
        flex: 2,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Lamina Saldo
      {
        headerName: 'Lamina Saldo',
        field: 'existencia',
        flex: 2,
        minWidth: 130,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      // Excedente Lamina
      {
        headerName: 'Excedente Lamina',
        field: 'excedeLamina',
        flex: 2,
        minWidth: 130,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      }
    ];
    this.columnasGridVariacion = [
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Programa',
        field: 'programa',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Fecha Producción',
        field: 'fechaProduccion',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Producidas',
        field: 'producidas',
        flex: 1,
        minWidth: 100,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ]
    this.columnasGridArticulos = [
      {
        headerName: 'OP',
        field: 'op',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Clave Artículo',
        field: 'claveArticulo',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Fecha Corrug.',
        field: 'fechaCorrug',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Fecha Maestra',
        field: 'fechaMaestra',
        flex: 1,
        minWidth: 110,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center'
      },
    ];
  }

  changeValorPrior(e: any): void {
    const row: listaDatos = e.data;
    for (const iterator of this.listaDatos) {
      if (iterator.op === row.op) {
        iterator.prior = row.prior;
        break;
      }
    }
  }

  changeValorUsar(e: any): void {
    const row: listaDatos = e.data;
    for (const iterator of this.listaDatos) {
      if (iterator.op === row.op) {
        iterator.usar = row.usar;
        break;
      }
    }
  }

  changeValorRef(e: any): void {
    const row: listaDatos = e.data;
    for (const iterator of this.listaDatos) {
      if (iterator.op === row.op) {
        iterator.refile = row.refile;
        break;
      }
    }
  }

  async ngOnInit(): Promise<void> {
    this.listaDatos = await this.getDatosPrincipal();
    this.listaDatosSearch = this.listaDatos
    this.totKG = 0;
    this.totMts = 0;
    for (const iterator of this.listaDatos) {
      this.totKG += iterator.tkg;
      this.totMts += iterator.tm2;
    }
  }

  async actualizarPantalla(): Promise<void> {
    this.blockUI.start('');
    await this.ngOnInit();
    this.blockUI.stop();
    this.delay();
    this.openMensajeFlotante('Actualizado!');
  }

  async getDatosPrincipal(): Promise<Array<listaDatos>> {
    const value: any = await this.Servicio.ObtenerDatosPrincipal();
    return value.data;
  }

  changeChkAllOps(): void {
    for (const iterator of this.listaDatos) {
      if (iterator.op !== "") {
        iterator.usar = this.chkAllOps;
      }
    }
    this.listaDatosSearch = cloneDeep(this.listaDatos);
  }

  changeChkValRef(): void {
    for (const iterator of this.listaDatos) {
      if (iterator.op !== "") {
        iterator.refile = this.chkValRef;
      }
    }
    this.listaDatosSearch = cloneDeep(this.listaDatos);
  }

  changeTxtOP(): void {
    this.filtrarOPGrid();
  }

  filtrarOPGrid(): void {
    if (this.txtOP.trim() !== '') {
      this.listaDatosSearch = this.filterOps(this.listaDatos, this.txtOP.trim());
    }
    else {
      this.listaDatosSearch = this.listaDatos;
    }
    this.listaDatosSearch = cloneDeep(this.listaDatosSearch);
  }

  filterOps(datos: Array<listaDatos>, campo: string): Array<listaDatos> {
    return datos.filter(function(dato) {
      return dato.op.toLowerCase().indexOf(campo.toLowerCase()) > -1
    });
  }

  openMdlCap002(): void {
    this.mdlCap002Ref = this.modalService.open(this.Cap002, {size: 'md', backdrop: 'static'});
  }
  openMdlCambiosArticulos(): void {
    this.mdlCambioArticulosRef = this.modalService.open(this.mdlCambioArticulos, {size: 'xl', backdrop: 'static'});
  }

  async mdlAgregar(): Promise<void> {
    if (this.mdlTxtOp.trim() !== '' && this.mdlTxtOp) {
      var obj = new CPLCAP009Entity();
      obj.op = this.mdlTxtOp.trim();

      this.blockUI.start('Agregando OP...');
      this.Servicio.agregarOP(obj).subscribe(async (res: any) => {
        // Swal.fire(
        //   (res.data.id !== 0 ? 'Completado' : 'Información'),
        //   res.data.message,
        //   (res.data.id !== 0 ? 'success' : 'info')
        // );
        if (res.data.id !== 0) {
          await this.ngOnInit();
        }
        this.blockUI.stop();
        await this.delay();
        this.mdlTxtOp = "";
        if (res.data.id !== 0) {
          this.openMensajeFlotante(res.data.message, 0, 3500);
        }
        else {
          Swal.fire('Información', res.data.message, 'info');
        }
      }, (err: any) => {
        this.blockUI.stop();
        Swal.fire('Error', 'Error al agregar op: ' + err.error, 'error');
      });
    }
    else {
      Swal.fire('Información', 'Introduzca una Orden de Producción', 'info');
    }
  }

  changeHojasGridPrincipal(e: any): void {
    const row: listaDatos = e.data;
    for (const iterator of this.listaDatos) {
      if (iterator.op === row.op) {
        iterator.hojas = row.hojas;
        break;
      }
    }

    this.gridDatos.refreshDataKeepSelected();
    this.datos.data = [];

    if (row.hojas && Number(row.hojas) !== 0) {
      this.datos.data.push(row);
      this.Servicio.ValidaHojasFaltan(this.datos).subscribe(async (res: any) => {
        if (res.data[0].id > 0) {
          this.openMensajeFlotante("Completado!");
        }
        else {
          Swal.fire('Información', res.data[0].message, 'info');
        }
      }, (err: any) => {
        Swal.fire('Error', 'Error al aplicar cambios: ' + err.error, 'error');
      });
    }
    else {
      Swal.fire('Información', 'Favor de ingresar un número válido', 'info');
    }
  }

  btnAplicar(): void {
    this.blockUI.start('Aplicando cambios...')
    this.datos.data = [];
    for (const iterator of this.listaDatos) {
      this.datos.data.push(iterator);
    }
    this.Servicio.ValidaVariacion(this.datos).subscribe(async (res: any) => {
      this.listaDatosVariacion = res.data;

      if (this.listaDatosVariacion.length > 0) {
        this.blockUI.stop();
        this.delay();
        this.mdlVariacionRef = this.modalService.open(this.mdlVariacion, {size: 'xl', backdrop: 'static'});
      }
      else {
        await this.continuarBtnAplicar();
      }
    }, (err: any) => {
      this.blockUI.stop();
      Swal.fire('Error', 'Error al agregar op: ' + err.error, 'error');
    });
  }

  async continuarBtnAplicar(): Promise<void> {
    this.datos.data = [];
    for (const iterator of this.listaDatos) {
      this.datos.data.push(iterator);
    }
    this.Servicio.AplicarCambios(this.datos).subscribe(async (res: any) => {
      this.listaDatosArticulos = res.data;
      this.blockUI.stop();
      this.delay();
      if (this.listaDatosArticulos.length > 0) {
        this.openMdlCambiosArticulos();
      }
      this.openMensajeFlotante("Cambios Aplicados!");
    }, (err: any) => {
      this.blockUI.stop();
      this.delay();
      Swal.fire('Error', 'Error al aplicar cambios: ' + err.error, 'error');
    });
  }

  openMensajeFlotante(mensaje: string, icono: number = 0, tiempo: number = 2200): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: tiempo
    });

    Toast.fire({
      icon: icono === 0 ? 'success' : icono === 1 ? 'info' : 'error',
      title: mensaje
    });
  }

  async delay(ms: number = 450) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

}
