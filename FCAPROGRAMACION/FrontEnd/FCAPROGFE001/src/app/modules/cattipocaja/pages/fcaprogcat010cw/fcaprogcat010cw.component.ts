import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoCajaService } from 'src/app/services/Programacion/tipocaja.service';
import swal from 'sweetalert2';
interface Filtros {
  filtro: string;
}
@Component({
  selector: 'app-fcaprogcat010cw',
  templateUrl: './fcaprogcat010cw.component.html',
  styleUrls: ['./fcaprogcat010cw.component.css'],
})
export class Fcaprogcat010cwComponent implements OnInit {
  // PPricipal
  filtros: Filtros = { filtro: '' };
  @ViewChild('gridPrincipal') private Grid: any;
  columnDefs: any;
  Datos = {};

  // Modal
  @ViewChild('mdl') private mdl: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';

  constructor(public Servicio: TipoCajaService) {
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
  // =================PPrincipal=================//
  btnBuscar(): void {
    this.Grid.refreshData();
  }
  btnAgregar(): void {
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-plus';
    this.Datos = {};
    this.mdl.openModal();
  }
  KeyPressBuscar(e): void {
    if (e.keyCode === 13) {
      this.btnBuscar();
    }
  }
  // =================Modal=================//
  btnCerrarModal(): void{
    this.btnBuscar();
    this.mdl.closeModal();
  }
}
