import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RepresentantesService } from 'src/app/services/Representantes.service';
import { Representante } from 'src/app/models/Representantes';
import { GridModel } from 'src/app/models/common/gridModel';

interface Filtros {
  filtro: string;
  Estatus: number;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal-representantes',
  templateUrl: './modal-representantes.component.html',
  styleUrls: ['./modal-representantes.component.css']
})
export class ModalRepresentantesComponent implements OnInit {
  filtros: Filtros = {filtro: '', Estatus: 1};
  @ViewChild('grid') private grid: GridModel;
  columnDefs: any[];
  iniciando = true;
  private dataValue: Representante;
  @Output() dataChange = new EventEmitter<Representante>();
  @Input() get data(): Representante {
    return this.dataValue;
  }
  set data(value: Representante) {
    this.dataValue = value;
    this.dataChange.emit(this.dataValue);
    this.cancelar();
  }
  @Output() cancel = new EventEmitter<any>();

  constructor(public representantesService: RepresentantesService) {
    this.columnDefs = [
      {
        headerName: 'Representante',
        field: 'nombre',
        flex: 15,
        minWidth: 200,
        headerClass: 'header-center header-grid-left',
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

  ngOnInit(): void { }

  seleccionar(e: any): void{
    this.data = e.data;
  }

  buscar(): void{
    this.grid.refreshData();
  }

  cancelar(): void {
    this.cancel.emit();
  }

  limpiar(): void {
    this.filtros.filtro = '';
  }

  cargar(): void {
    if (!this.iniciando) {
      this.limpiar();
      this.buscar();
    } else {
      this.iniciando = false;
    }
  }
}
