import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fcaprogapi001Service } from 'src/app/shared/services/fcaprogapi001.service';
import { GridModel } from 'src/app/models/common/gridModel';

interface Filtros {
  filtro: string;
  TipoPapel: string;
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdl-buscarpapel',
  templateUrl: './mdl-buscarpapel.component.html',
  styleUrls: ['./mdl-buscarpapel.component.css']
})
export class MdlBuscarpapelComponent implements OnInit {
  filtros: Filtros = {filtro: '', TipoPapel: ''};
  @ViewChild('grid') private grid: GridModel;
  columnDefs: any[];
  iniciando = true;
  private dataValue;
  @Input() get data(): any {
    return this.dataValue;
  }
  set data(value: any) {
    this.dataValue = value;
    this.dataChange.emit(this.dataValue);
    this.cancelar();
  }
  @Input() set filtro(value){
    if (value !== ''){
      this.filtros.TipoPapel = value;
      this.buscar();
    }
  }
  @Output() dataChange = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  constructor(public Service: fcaprogapi001Service) {
    this.columnDefs = [
      {
        headerName: 'Clave',
        field: 'clavepapel',
        flex: 2,
        minWidth: 200,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Nombre',
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
    this.filtros.TipoPapel = '';
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
