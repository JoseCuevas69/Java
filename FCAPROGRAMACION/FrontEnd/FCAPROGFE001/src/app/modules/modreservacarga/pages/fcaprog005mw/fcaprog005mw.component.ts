//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { Maquina } from 'src/app/models/maquina';
import swal from 'sweetalert2';
import { ReservacargaserviceService } from 'src/app/services/reservacargaservice.service';
import { ActivatedRoute } from '@angular/router';
//import { Paros } from 'src/app/models/paros';
import { formatDate } from '@angular/common';

interface Filtros {
  zona: string;
}

interface clsReserva {
  idfolio : number;
  fechainicio : string;
  fechafin : string;
  volumen : number;
  comentario: string;
  estatus : boolean;  
  usuario: string;
}

@Component({
  selector: 'app-fcaprog005mw',
  templateUrl: './fcaprog005mw.component.html',
  styleUrls: ['./fcaprog005mw.component.css']
})
export class Fcaprog005mwComponent implements OnInit {

  @ViewChild('gridPrincipal') grid: any;

  @ViewChild('mdlCapturaCarga', { static: true }) ModalCarga;

  @Input() dtInicio: string;
  @Input() dtFin: string;

  IconoTitulo= '';


  TipoAccion: string;
  Datos = {};

  tiempoTranscurrido: Date;

  today= new Date();
  jstoday = '';


  columnDefs: any;
  filtros: Filtros = 
          { 
            //TipoMaquina: 'PM', 
            //TipoTiempo: 'IM',
            //ClaveMaquina: '', 
            zona: '01'
          };

  DatFormulario: clsReserva = 
  { 
    idfolio : 0 , 
    fechainicio : '',
    fechafin : '',
    volumen : 0 , 
    comentario: '',
    estatus : true, 
    usuario:  '001000'
  };

  constructor(private route: ActivatedRoute, public reservacargaserviceService: ReservacargaserviceService) { 

    this.columnDefs = [
      {
        headerName: 'Folio',
        field: 'idfolio',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Fecha Ini',
        field: 'fechainicio',
        flex: 8,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'FechaFin',
        field: 'fechafin',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },     
      {
        headerName: 'Volumen (m2)',
        field: 'volumen',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        //valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Comentario',
        field: 'comentario',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        //valueFormatter: this.bracketsFormatter,
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

  ngOnInit(): void {
  }

  btnAgregar(): void {  
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-plus';
    this.Datos = {};
    this.ModalCarga.openModal();
  }

  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.Datos = e.data;
    this.ModalCarga.openModal();
  }

  GridEliminar(e): void {
    swal
    .fire({
      title: '¿Desea eliminar el registro?',
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
        this.reservacargaserviceService.Eliminar(e.data).subscribe(
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





  btnCerrarModal(): void{
    this.grid.refreshData(); 
    this.ModalCarga.closeModal();
  }

  btnActualizarGridPopup(): void{
    this.grid.refreshData(); 
    this.ModalCarga.closeModal();
  }

}
