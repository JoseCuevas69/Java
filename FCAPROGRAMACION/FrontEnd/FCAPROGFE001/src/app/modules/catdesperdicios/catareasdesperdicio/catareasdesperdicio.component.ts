import { environment } from './../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DesperdiciosService } from 'src/app/services/Programacion/desperdicios.service';
import swal from 'sweetalert2';
interface Filtros {
  Desperdicio: string;
}
@Component({
  selector: 'catareasdesperdicio',
  templateUrl: './catareasdesperdicio.component.html',
  styleUrls: ['./catareasdesperdicio.component.css']
})
export class CatareasdesperdicioComponent implements OnInit {
   // PPricipal
   filtros: Filtros = { Desperdicio: ''  };
   @ViewChild('gridPrincipal') private Grid: any;
   columnDefs: any;
   Datos = {};

   Usuario = '';
   Zona = '';

   // Modal
   @ViewChild('mdl') private mdl: any;
   Titulo = '';
   IconoTitulo = '';
   TipoAccion = 'A';


  constructor(public Servicio: DesperdiciosService) {
    this.columnDefs = [
      {
        headerName: 'Clave Área',
        field: 'clave',
        flex: 1,
        minWidth: 40,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripción Área',
        field: 'nombre',
        flex: 2,
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

  ngOnInit(): void {
    this.Usuario = localStorage.getItem('Usuario');
    this.Zona = localStorage.getItem('Zona');
  }
     // =================Grid=================//
    GridEditar(e): void {
      this.TipoAccion = 'M';
      this.IconoTitulo = 'fa fa-edit';
      this.Datos = e.data;
      this.mdl.openModal();
    }
    GridEliminar(e): void {
      swal
        .fire({
          title: '¿Desea eliminar el área desperdicio seleccionada?',
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
            this.Servicio.EliminarAreaDesperdicios(e.data).subscribe(
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
                  'Ha Ocurrio un Error al Momento de Eliminar (EliminarAreaDesperdicios),' +
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
    btnRegresar(): void{
      const URLOpen = environment.Server +'desperdicios/fcaprodcat011cw?pUsuario='+this.Usuario+'&pZona='+this.Zona+''
      window.open(URLOpen, '_self');
    }
    btnBuscar(): void {
      this.Grid.refreshData();
    }
    btnAgregar(): void {
      this.TipoAccion = 'A';
      this.IconoTitulo = 'fa fa-plus';
      this.Datos = {};
      this.mdl.openModal();
    }
    // =================Modal=================//
    btnCerrarModal(): void{
      this.btnBuscar();
      this.mdl.closeModal();
    }

}
