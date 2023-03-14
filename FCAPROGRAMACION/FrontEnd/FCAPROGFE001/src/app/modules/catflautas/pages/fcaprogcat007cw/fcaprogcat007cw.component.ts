import { Component, OnInit,ViewChild } from '@angular/core';
import { FlautasService } from 'src/app/services/flautas.service';
import swal from 'sweetalert2';
interface Filtros {
  filtro: string;
}
@Component({
  selector: 'app-fcaprogcat007cw',
  templateUrl: './fcaprogcat007cw.component.html',
  styleUrls: ['./fcaprogcat007cw.component.css'],
})
export class Fcaprogcat007cwComponent implements OnInit {
  filtros: Filtros = { filtro: '' };
  @ViewChild('gridFlautas') private Grid: any;
  columnDefs: any;
  Datos = {};
  @ViewChild('mld') private mld: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';

  constructor(public Servicio: FlautasService) { 
    this.columnDefs = [
      {
        headerName: 'Flauta',
        field: 'flauta',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Factor 1',
        field: 'factor1',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Factor 2',
        field: 'factor2',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Factor 3',
        field: 'factor3',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Pegamento',
        field: 'pegamento',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Corrugado',
        field: 'corrugado',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Laminas',
        field: 'laminasmt',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Modificar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridEditar.bind(this),
          label: '<i class="fas fa-pencil-alt"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 1,
        minWidth: 90,
        maxWidth: 100,
        suppressSizeToFit: true
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridEliminar.bind(this),
          label: '<i class="fas fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 1,
        minWidth: 90,
        maxWidth: 100,
        suppressSizeToFit: true
      }
    ];
  }

  ngOnInit(): void {
  }
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
    this.mld.openModal();
  }
  GridEliminar(e): void {
    swal
      .fire({
        title: '¿Desea eliminar el registro?',
        text: e.data.flauta,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.Servicio.Eliminar(e.data).subscribe(
            (data: any) => {
              if (data.correcto) {
                swal.fire('', 'El registro fue eliminado', 'success');
                this.Grid.refreshData();
              } else {
                swal.fire(
                  '',
                  'Ocurrió un error al tratar de guardar los datos. ' +
                    data.mensaje,
                  'error'
                );
              }
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
  btnAgregar(): void {
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-plus';
    this.Datos = {}; 
    this.mld.openModal();
  }
  btnCerrarModal(): void{
    this.btnBuscar();
    this.mld.closeModal();
  }
  btnBuscar(): void {
    this.Grid.refreshData();
  }
}
