import { Component, OnInit, ViewChild } from '@angular/core';
import { CapProdRepGerencialService } from 'src/app/services/Programacion/capprodrepgerencial.service';
// import swal from 'sweetalert2';
interface Filtros {
  filtro: string;
}

@Component({

  selector: 'app-fcaprog010mw',
  templateUrl: './fcaprog010mw.component.html',
  styleUrls: ['./fcaprog010mw.component.css']
})
export class fcaprog010mwComponent implements OnInit {

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

  constructor(public Servicio: CapProdRepGerencialService) {
    this.columnDefs = [
      {
        headerName: 'ClaveMaquina',
        field: 'claveMaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Turnos',
        field: 'turnos',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'M2CargaPendiente',
        field: 'm2CargaPendiente',
        flex: 4,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'M2PromTurno',
        field: 'm2PromTurno',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      // {
      //   headerName: 'Fecha',
      //   field: 'fecha',
      //   flex: 3,
      //   minWidth: 80,
      //   headerClass: 'header-center header-grid',
      //   cellClass: 'grid-cell-center',

      // },
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
  ngOnInit(): void { }

  // =================Grid=================//
  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.Datos = e.data;
    this.mdl.openModal();
  }

  // =================PPrincipal=================//
  btnBuscar(): void {
    this.Grid.refreshData();
  }

  // =================Modal=================//
  btnCerrarModal(): void {
    this.btnBuscar();
    this.mdl.closeModal();
  }
}

