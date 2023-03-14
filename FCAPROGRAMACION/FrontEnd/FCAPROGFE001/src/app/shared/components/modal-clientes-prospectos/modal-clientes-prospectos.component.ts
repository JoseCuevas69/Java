import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClientesVentasService } from 'src/app/services/ClientesVentas.service';
import { ClienteVentasListar } from 'src/app/models/ClienteVentas';
import { GridModel } from 'src/app/models/common/gridModel';

interface Filtros {
  filtro: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal-clientes-prospectos',
  templateUrl: './modal-clientes-prospectos.component.html',
  styleUrls: ['./modal-clientes-prospectos.component.css']
})
export class ModalClientesProspectosComponent implements OnInit {
  @Input() filtros: Filtros = {filtro: ''};
  @ViewChild('grid') private grid: GridModel;
  @Input() Tipo: 'clientes' | 'prospectos' | '' = '';
  TipoListar: 'CL' | 'PR' = 'CL';
  columnDefs: any[];
  private dataValue: ClienteVentasListar;
  @Output() dataChange = new EventEmitter<ClienteVentasListar>();
  @Input() get data(): ClienteVentasListar {
    return this.dataValue;
  }
  set data(value: ClienteVentasListar) {
    this.dataValue = value;
    this.dataChange.emit(this.dataValue);
  }
  @Output() cancel = new EventEmitter<any>();

  constructor(public Servicios: ClientesVentasService) {
    this.columnDefs = [
      {
        headerName: 'Codigo',
        field: 'idCliente',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Nombre/Razon Solcial',
        field: 'razonSocial',
        flex: 10,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.seleccionar.bind(this),
          label: '<i class="far fa-hand-pointer"></i>',
          class: 'btn btn-success btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true
      }
    ];
  }

  ngOnInit(): void {
    if (this.Tipo === 'prospectos') {
      this.TipoListar = 'PR';
    }
  }

  seleccionar(e: {data: ClienteVentasListar}): void {
    this.data = e.data;
  }

  buscar(): void{
    if (this.grid) {
      this.grid.refreshData();
    }
  }

  cancelar(evt: any): void {
    this.cancel.emit(evt);
  }

  limpiar(): void {
    this.filtros.filtro = '';
    if (this.Tipo === 'prospectos') {
      this.TipoListar = 'PR';
    } else {
      this.TipoListar = 'CL';
    }
  }

  cargar(): void {
    this.limpiar();
    this.buscar();
  }

  radioChange(): void {
    this.filtros.filtro = '';
    this.buscar();
  }
}
