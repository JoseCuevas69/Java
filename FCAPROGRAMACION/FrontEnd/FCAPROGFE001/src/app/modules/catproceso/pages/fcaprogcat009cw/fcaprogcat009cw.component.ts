import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesoService } from 'src/app/services/Programacion/proceso.service';
import swal from 'sweetalert2';
interface Filtros {
  filtro: string;
  TipoMaquina: string;
  Estatus: number;
}
@Component({
  selector: 'app-fcaprogcat009cw',
  templateUrl: './fcaprogcat009cw.component.html',
  styleUrls: ['./fcaprogcat009cw.component.css'],
})
export class Fcaprogcat009cwComponent implements OnInit {
  // PPricipal
  filtros: Filtros = { filtro: '', TipoMaquina: '' , Estatus: 2};
  @ViewChild('gridPrincipal') private Grid: any;
  columnDefs: any;
  Datos = {};

  // Modal
  @ViewChild('mdl') private mdl: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';
  constructor(public Servicio: ProcesoService) {
    this.columnDefs = [
      {
        headerName: 'Tipo Máquina',
        field: 'tipoMaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Clave Proceso',
        field: 'claveProceso',
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
        headerName: 'Con Suaje',
        field: 'conSuaje',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Estatus',
        field: 'estatus',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridEstatus.bind(this),
          label: [
            '<i class="far fa-circle"></i>',
            '<i class="fas fa-check-circle"></i>',
          ],
          class: ['btn btn-danger btn-sm', 'btn btn-success btn-sm'],
          type: 'btnCheck',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
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
  GridEstatus(e): void {
    const dat = {
      estatus: !e.data.estatus,
      tipoMaquina: e.data.tipoMaquina,
      claveProceso:  e.data.claveProceso
    };
    swal
      .fire({
        title: '¿Estás seguro que deseas cambiar el estatus?',
        text: 'Codigo ' + e.data.claveProceso,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.Servicio.Estatus(dat).subscribe(
            (data: any) => {
              if (data.correcto) {
                swal.fire(
                  '',
                  'El estatus del registro ha cambiado correctamente.',
                  'success'
                );
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
                'Ha Ocurrio un Error al Momento de Cambiae el Estatus' +
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
  ChangeTipoMaquina(e): void {
    this.filtros.TipoMaquina = e;
    this.btnBuscar();
  }
  ChangeEstatus(e): void{
    this.filtros.Estatus = e;
    this.btnBuscar();
  }
  KeyPressBuscar(e): void {
    if (e.keyCode === 13) {
      this.btnBuscar();
    }
  }
  // =================Modal=================//
  btnCerrarModal(): void {
    this.btnBuscar();
    this.mdl.closeModal();
  }
}
