import { Component, OnInit, ViewChild } from '@angular/core';
import { AprovechamientoLaminaService } from 'src/app/services/Programacion/aprovechamientoLamina.service';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
interface Filtros {
  Op: number;
  ClaveArticulo: string;
}
@Component({
  selector: 'app-pag-pricipal',
  templateUrl: './pag-pricipal.component.html',
  styleUrls: ['./pag-pricipal.component.css']
})
export class PagPricipalComponent implements OnInit {
 // PPricipal
 @BlockUI() blockUI: NgBlockUI;
 filtros: Filtros = { Op: null , ClaveArticulo: ''};
 @ViewChild('gridPrincipal') private Grid: any;
 @ViewChild('modalArticulo') private modalArticulo: any;
 columnDefs: any;
 Datos = {};
 Articulo;

 // Modal
 @ViewChild('mdl') private mdl: any;
 Titulo = '';
 IconoTitulo = '';
 TipoAccion = 'A';

 constructor(public Servicio: AprovechamientoLaminaService) {
   this.columnDefs = [
     {
       headerName: 'Id Tipo Caja',
       field: 'idTipoCaja',
       flex: 2,
       minWidth: 80,
       headerClass: 'header-center header-grid-left',
       cellClass: 'grid-cell-center',
     },
     {
       headerName: 'Clave Diseño',
       field: 'claveDiseno',
       flex: 2,
       minWidth: 80,
       headerClass: 'header-center header-grid',
       cellClass: 'grid-cell-center',
     },
     {
       headerName: 'Descripción',
       field: 'descripcion',
       flex: 4,
       minWidth: 80,
       headerClass: 'header-center header-grid',
       cellClass: 'grid-cell-center',
     },
     {
       headerName: 'Reg. Exporta',
       field: 'regExporta',
       flex: 3,
       minWidth: 80,
       headerClass: 'header-center header-grid',
       cellClass: 'grid-cell-center',
     },
     {
       headerName: 'Con Suaje',
       field: 'conSuaje',
       flex: 3,
       minWidth: 80,
       headerClass: 'header-center header-grid',
       cellClass: 'grid-cell-center',
       valueFormatter: this.bracketsFormatter,
     },
     {
       headerName: 'Editar',
       cellRenderer: 'btnCellRenderer',
       cellRendererParams: {
         onClick: this.GridEditar.bind(this),
         label: '<i class="fa fa-edit"></i>',
         class: 'btn btn-warning btn-sm',
       },
       headerClass: 'header-center header-grid',
       cellClass: 'grid-cell-btn-center',
       flex: 5,
       minWidth: 90,
       maxWidth: 90,
       suppressSizeToFit: true,
     },
     {
       headerName: 'Eliminar',
       cellRenderer: 'btnCellRenderer',
       cellRendererParams: {
         onClick: this.GridEliminar.bind(this),
         label: '<i class="fa fa-trash"></i>',
         class: 'btn btn-danger btn-sm',
       },
       headerClass: 'header-center header-grid-right',
       cellClass: 'grid-cell-btn-center',
       flex: 5,
       minWidth: 90,
       maxWidth: 90,
       suppressSizeToFit: true,
     },
   ];
 }
 ngOnInit(): void {}
 // =================Grid=================//
 bracketsFormatter(params): string {
   if (params.value) {
     return 'SI';
   } else {
     return 'NO';
   }
 }
 GridEditar(e): void {
   this.TipoAccion = 'M';
   this.IconoTitulo = 'fa fa-edit';
   this.Datos = e.data;
   this.mdl.openModal();
 }
 GridEliminar(e): void {
  //  swal
  //    .fire({
  //      title: '¿Desea eliminar el registro?',
  //      text: e.data.claveDiseno,
  //      icon: 'warning',
  //      showCancelButton: true,
  //      confirmButtonColor: '#3085d6',
  //      cancelButtonColor: '#d33',
  //      confirmButtonText: 'Aceptar',
  //      cancelButtonText: 'Cancelar',
  //    })
  //    .then((result) => {
  //      if (result.isConfirmed) {
  //        this.Servicio.Eliminar(e.data).subscribe(
  //          (data: any) => {
  //            if (data.correcto) {
  //              swal.fire('', 'El registro fue eliminado', 'success');
  //              this.Grid.refreshData();
  //            } else {
  //              swal.fire(
  //                '',
  //                'Ocurrió un error al tratar de guardar los datos. ' +
  //                  data.mensaje,
  //                'error'
  //              );
  //            }
  //          },
  //          (error) => {
  //            swal.fire(
  //              'Datos ',
  //              'Ha Ocurrio un Error al Momento de Eliminar,' +
  //                ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
  //                ' <strong>Código de Error: ' +
  //                error.error +
  //                '</strong>',
  //              'error'
  //            );
  //          }
  //        );
  //      }
  //    });
 }
 // =================PPrincipal=================//
 btnBuscarOrdenProduccion(): void {
   console.log(this.filtros.Op);
   if(this.filtros.Op === null || this.filtros.Op === 0){
    swal.fire(
      'Alerta de Sistema',
      'Debe ingresar datos validos para poder buscar información ' ,
      'warning'
    );
    return;
   }
   this.BuscarClaveArticuloPorOp(this.filtros.Op);
 }
 btnAgregar(): void {
   this.TipoAccion = 'A';
   this.IconoTitulo = 'fa fa-plus';
   this.Datos = {};
   this.mdl.openModal();
 }
 btnArtLimpiar(){
  this.Articulo = '';
 }
 BuscarClaveArticuloPorOp(Op: number){
  this.blockUI.start('Buscando...');
  this.Servicio.GetDatosOp(Op).subscribe(
    (data: any) => {
      console.log(data, 'PagPrincipal', 'GetDatosOp');
      if (data.data.length !== 0){
        this.filtros.ClaveArticulo = data.data[0].claveArticulo;
      } else {
        swal.fire(
          'Alerta de Sistema',
          'No se encontraron registros con los datos proporcionados' ,
          'warning'
        );
      }
      this.blockUI.stop();
    },
    (error) => {
      this.blockUI.stop();
      swal.fire(
        'Error de Sistema ',
        'Ha Ocurrio un Error (GetDatosOp),' +
          ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
          ' <strong>Código de Error: ' +
          error.error +
          '</strong>',
        'error'
      );
    }
  );
 }
 KeyPressBuscar(e): void {
  if (e.keyCode === 13) {
    //this.btnBuscar();
  }
}
 // =================Modal=================//
 SelArticuloAgregar(e){
  this.Articulo = e.descripcion;
  this.mdlCerrarArticulo();
 }
 mdlAbrirArticulo(){
  this.modalArticulo.openModal();
 }
 mdlCerrarArticulo(): void {
  this.modalArticulo.closeModal();
}
 btnCerrarModal(): void {
  // this.btnBuscar();
   this.mdl.closeModal();
 }
}
