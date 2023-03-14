import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PapelesserviceService } from 'src/app/services/papelesservice.service';

interface Filtros {
  clavepapel: string; 
  descripcion: string;
}

@Component({
  selector: 'app-fcaprogcat020cw',
  templateUrl: './fcaprogcat020cw.component.html',
  styleUrls: ['./fcaprogcat020cw.component.css']
})
export class Fcaprogcat020cwComponent implements OnInit {

  @ViewChild('gridPrincipal') grid: any;
  @ViewChild('mdlCaptura', { static: true }) ModalParo;

  IconoTitulo= '';
  TipoAccion: string;
  Datos = {};

  urlReporte: string;

  columnDefs: any;

  filtros: Filtros = 
          { 
            clavepapel: '', 
            descripcion: '', 
          };

  constructor(private route: ActivatedRoute, public papelesserviceService: PapelesserviceService, private modalService: NgbModal) {

    this.columnDefs = [
      { headerName: 'CLAVEPAPEL', field:  'clavepapel', flex: 5, minWidth: 150, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'TIPOPAPEL', field:  'tipopapel', flex: 2, minWidth: 120, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'NOMBRE', field:  'nombre', flex: 2, minWidth: 200, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'PROVEEDOR', field:  'proveedor', flex: 2, minWidth: 150, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'TIPOPROVEEDOR', field:  'tipoproveedor', flex: 2, minWidth: 170, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'PRESENTACION', field:  'presentacion', flex: 2, minWidth: 150, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'GRAMAJE', field:  'gramaje', flex: 2, minWidth: 120, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'RCTCCT', field:  'rctcct', flex: 2, minWidth: 120, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'CMTMEDIUM', field:  'cmtmedium', flex: 2, minWidth: 120, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'CALIBRE', field:  'calibre', flex: 2, minWidth: 120, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'MULLENLINER', field:  'mullenliner', flex: 2, minWidth: 160, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'CLAVEPRINCIPAL', field:  'claveprincipal', flex: 2, minWidth: 150, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'PRECIOTON', field:  'precioton', flex: 2, minWidth: 120, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'PESOSTONELADA', field:  'pesostonelada', flex: 2, minWidth: 160, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'PESOSM2', field:  'pesosm2', flex: 2, minWidth: 120, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      { headerName: 'CVEREFHOMO', field:  'cverefhomo', flex: 2, minWidth: 160, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },

      //{ headerName: 'DOLAR', field:  'dolar', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      //{ headerName: 'FLETEADUANA', field:  'fleteaduana', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      //{ headerName: 'USOCOSTOS', field:  'usocostos', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      //{ headerName: 'CODIGOPAPEL', field:  'codigopapel', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      //{ headerName: 'CAPTURACALIDAD', field:  'capturacalidad', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      //{ headerName: 'CAPTURACOSTOS', field:  'capturacostos', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
      //{ headerName: 'ESTATUS', field:  'estatus', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
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
        flex: 5, minWidth: 90, maxWidth: 90,
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
        flex: 5, minWidth: 90, maxWidth: 90,
        suppressSizeToFit: true,
      },
    ];

   }

  ngOnInit(): void {
  }

  /*
  BuscarParos(): void {
  }

  btnCerrar(): void {
  }

  btnGuardar(): void {
  }*/



  ReportePapeles(): void {
    //urlReporte: string;
    //this.urlReporte="http://datosnv2008.cecso.com.mx/ReportServer/Pages/ReportViewer.aspx?/FcaCajas01/FCAPROG001RW/FCAPROG001RW&rs:Command=Render";
    this.urlReporte="http://datos.cecso.com.mx/ServerRS/Pages/ReportViewer.aspx?/FCACajas01/FCAPROGCAT020RW/FCAPROGCAT020RW&rs:Command=Render"
    window.open(this.urlReporte, "_blank");

    //this.clsHorario.
  

  }


  BuscarPapeles(): void {
    this.grid.refreshData();
  }

  btnAgregar(): void {
  }

  btnCerrarModal(): void {
    this.ModalParo.closeModal();
  }

  btnActualizarGridPopup(): void {
    this.grid.refreshData();
  }

  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.Datos = e.data;
    this.ModalParo.openModal();
  }
    

    GridEliminar(e): void {
      var strTexto = e.data["clavepapel"] + ' - ' + e.data["nombre"];
      swal
        .fire({
          title: '¿Desea eliminar el registro? ' + strTexto ,
          text: e.data.claveDiseno,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        })
        .then((result) => {
          if (result.isConfirmed) {

            this.papelesserviceService.Eliminar(e.data).subscribe(
              (data: any) => {
                swal.fire('', 'El registro fue eliminado', 'success');
                this.grid.refreshData();               
              },
              (error) => {
                swal.fire(
                  'Datos ',
                  'Ha Ocurrio un Error al Momento de Eliminar,' +
                    ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
                    ' <strong>Código de Error: ' +
                    error.error +
                    '</strong>',
                  'error'
                );
              }
            );
          }
        });
    }

}
