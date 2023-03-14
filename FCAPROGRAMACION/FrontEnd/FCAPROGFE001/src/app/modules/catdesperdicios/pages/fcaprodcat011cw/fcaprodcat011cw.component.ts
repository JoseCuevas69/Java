import { Component, OnInit, ViewChild } from '@angular/core';
import { DesperdiciosService } from 'src/app/services/Programacion/desperdicios.service';
import swal from 'sweetalert2';
interface Filtros {
  ClaveArea: string;
  ClaveCargo: string;
  ClaveDesperdicio: string;
}
@Component({
  selector: 'app-fcaprodcat011cw',
  templateUrl: './fcaprodcat011cw.component.html',
  styleUrls: ['./fcaprodcat011cw.component.css']
})
export class Fcaprodcat011cwComponent implements OnInit {
  // PPricipal
  filtros: Filtros = { ClaveArea: '' , ClaveCargo: '', ClaveDesperdicio: '' };
  @ViewChild('gridPrincipal') private Grid: any;
  columnDefs: any;
  Datos = {};

  // Modal
  @ViewChild('mdl') private mdl: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';

  constructor(public Servicio: DesperdiciosService) {
    this.columnDefs = [
      {
        headerName: 'Area Captura',
        field: 'nombreArea',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion Desperdicio',
        field: 'nombreDesperdicio',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Area Cargo',
        field: 'nombreCargo',
        flex: 4,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Balance',
        field: 'balance',
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
  ChangeAreaCaptura(e): void{
    this.filtros.ClaveArea = e;
    this.btnBuscar();
  }
  ChangeDesperdicio(e): void{
    this.filtros.ClaveDesperdicio = e;
    this.btnBuscar();
  }
  ChangeCargo(e): void{
    this.filtros.ClaveCargo = e;
    this.btnBuscar();
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
