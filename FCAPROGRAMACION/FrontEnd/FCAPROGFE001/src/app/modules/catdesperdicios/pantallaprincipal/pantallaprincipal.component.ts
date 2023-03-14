import { cloneDeep } from 'lodash-es';
import { Desperdicio } from 'src/app/models/Programacion/Maquinas';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { DesperdiciosService } from 'src/app/services/Programacion/desperdicios.service';
import swal from 'sweetalert2';
interface Filtros {
  Desperdicio: string;
  aplicaImpresora: boolean,
  aplicaCorrugadora: boolean,
  aplicaAcabados: boolean,
  aplicaRecuperacionCaja: boolean,
}
@Component({
  selector: 'app-pantallaprincipal',
  templateUrl: './pantallaprincipal.component.html',
  styleUrls: ['./pantallaprincipal.component.css']
})
export class PantallaprincipalComponent implements OnInit {
   // PPricipal
   filtros: Filtros = { Desperdicio: '',
   aplicaImpresora: false,
    aplicaCorrugadora: false,
    aplicaAcabados: false,
    aplicaRecuperacionCaja: false,
  };
   @ViewChild('gridPrincipal') private Grid: any;
   columnDefs: any;
   Datos = {};

   // Modal
   @ViewChild('mdl') private mdl: any;
   Titulo = '';
   IconoTitulo = '';
   TipoAccion = 'A';

   Usuario = '';
   Zona = '';

  constructor(public Servicio: DesperdiciosService) {
    this.columnDefs = [
      {
        headerName: 'Id Desperdicio',
        field: 'idDesperdicio',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion Desperdicio',
        field: 'descripcionDesperdicio',
        flex: 3,
        minWidth: 90,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Aplica Impresora',
        field: 'aplicaImpresora',
        flex: 3,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Aplica Corrugadora',
        field: 'aplicaCorrugadora',
        flex: 3,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Aplica Acabado',
        field: 'aplicaAcabado',
        flex: 3,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Aplica Recuperacion Caja',
        field: 'aplicaRecuperacionCaja',
        flex: 3,
        minWidth: 70,
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
        flex: 4,
        minWidth: 70,
        maxWidth: 70,
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
        flex: 4,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
    ];
  }

  ngOnInit(): void {
    this.Usuario = localStorage.getItem('Usuario');
    this.Zona = localStorage.getItem('Zona');
  }
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
    this.Datos = cloneDeep(e.data);
    this.mdl.openModal();
  }
  GridEliminar(e): void {
    swal
      .fire({
        title: '¿Desea eliminar el concepto de desperdicio '+ e.data.descripcionDesperdicio +'?',
        text: '',
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
  btnCatAreaDes(){
    const URLOpen = environment.Server + 'desperdicios/areadesperdicio?pUsuario='+this.Usuario+'&pZona='+this.Zona+''
    window.open(URLOpen, '_self');
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

