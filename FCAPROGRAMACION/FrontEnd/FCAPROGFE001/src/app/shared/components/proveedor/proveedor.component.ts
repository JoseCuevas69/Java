import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';

interface Filtros {
  filtro: string;
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss'],
})
export class ProveedorComponent implements OnInit {
  @ViewChild('Grid') private Grid: any;
  @ViewChild('mdlProveedor') private modal: any;
  @Output() ItemData = new EventEmitter<any>();
  filtros: Filtros = { filtro: '' };
  columnDefs: any;
  constructor(public Service: fcaventapi001Service) {
    this.columnDefs = [
      {
        headerName: 'Codigo',
        field: 'codigo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
        flex: 10,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.Seleccionar.bind(this),
          label: '<i class="far fa-hand-pointer"></i>',
          class: 'btn btn-success btn-sm',
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

  AbrirModal(): void {
    this.modal.openModal();
  }
  CerrarModal(): void {
    this.modal.closeModal();
  }
  Seleccionar(value: any): void {
    this.ItemData.emit(value.data);
    this.CerrarModal();
  }
  KeyPressBuscarUsuarioERP(e): void {
    if (e.keyCode === 13) {
      this.BuscarUsuarioERP();
    }
  }
  BuscarUsuarioERP(): void {
    this.Grid.refreshData();
  }
}
