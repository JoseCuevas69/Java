import { Component, OnInit, ViewChild } from '@angular/core';
import { ParosService } from 'src/app/services/Programacion/paros.service';
import swal from 'sweetalert2';
interface Filtros {
  filtro: string;
  Estatus: number;
}

@Component({
  selector: 'app-fcaprodcat012cw',
  templateUrl: './fcaprodcat012cw.component.html',
  styleUrls: ['./fcaprodcat012cw.component.css'],
})
export class Fcaprodcat012cwComponent implements OnInit {
  // PPricipal
  filtros: Filtros = { filtro: 'CO', Estatus: 2 };
  @ViewChild('gridPrincipal') private Grid: any;
  columnDefs: any;
  Datos = {};

  // Modal
  @ViewChild('mdl') private mdl: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';

  constructor(public Servicio: ParosService) {
    this.columnDefs = [
      {
        headerName: 'Clave Paro',
        field: 'claveParo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tipo Paro',
        field: 'tipoParo',
        flex: 5,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Estatus',
        field: 'estatus',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Tipo Paro Valida',
        field: 'tipoParoValida',
        flex: 4,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.bracketsFormatterTipoParo,
      },
      {
        headerName: 'Aplica Pareto',
        field: 'aplicaPareto',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.bracketsFormatterAplicaPareto,
      },
      {
        headerName: 'Observaciones',
        field: 'observaciones',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
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
      return 'ACTIVO';
    } else {
      return 'INACTIVO';
    }
  }
  bracketsFormatterAplicaPareto(params): string {
    if (params.value) {
      return 'SI';
    } else {
      return 'NO';
    }
  }
  bracketsFormatterTipoParo(params): string {
    switch (params.value) {
      case 'PJ':
        return 'Autorizar Paro';
        break;
      case 'OT':
        return 'Requiere O.T.';
        break;
      case 'MP':
        return 'Mant. Programado';
        break;
      case 'FT':
        return 'Falta de Trabajo';
        break;
      default:
        return 'General';
        break;
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
        text: e.data.claveParo,
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
  btnReporte(): void {
    const url =
      'http://datosnv2008.cecso.com.mx/ReportServer/FcaCajas01/Produccion?%2fFcaCajas01%2fProduccion%2fPlantillaRep&rs:Command=Render&rc:Parameters=Collapsed&rc:Zoom=100&Zona=' +
      localStorage.getItem('Zona') + '&rc:LinkTarget=_parent';
    window.open(url, '_blank');
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
  ChangeTipoMaquina(e): void {
    this.filtros.filtro = e;
    this.btnBuscar();
  }
  ChangeEstatus(e): void {
    this.filtros.Estatus = e;
    this.btnBuscar();
  }
  // =================Modal=================//
  btnCerrarModal(): void {
    this.btnBuscar();
    this.mdl.closeModal();
  }
}
