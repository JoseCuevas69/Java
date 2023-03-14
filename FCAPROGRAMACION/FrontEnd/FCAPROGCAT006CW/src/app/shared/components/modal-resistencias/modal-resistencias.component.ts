import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ResistenciasService } from 'src/app/services/resistencias.service';
import { ResistenciaListar } from 'src/app/models/Resistencia';
import { GridModel } from 'src/app/models/common/gridModel';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal-resistencias',
  templateUrl: './modal-resistencias.component.html',
  styleUrls: ['./modal-resistencias.component.css']
})
export class ModalResistenciasComponent implements OnInit {
  filtro = '';
  @ViewChild('grid') private grid: GridModel;
  columnDefs: any[];
  iniciando = true;
  private dataValue: ResistenciaListar;
  @Output() dataChange = new EventEmitter<ResistenciaListar>();
  @Input() get data(): ResistenciaListar {
    return this.dataValue;
  }
  set data(value: ResistenciaListar) {
    this.dataValue = value;
    this.dataChange.emit(this.dataValue);
  }
  @Output() cancel = new EventEmitter<any>();

  constructor(public service: ResistenciasService) {
    this.columnDefs = [
      {
        headerName: 'Clave Resistencia',
        field: 'claveResistencia',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
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
  }

  seleccionar(e: any): void{
    this.data = e.data;
  }

  buscar(): void{
    this.grid.refreshData();
  }

  cancelar(evt: any): void {
    this.cancel.emit(evt);
  }

  limpiar(): void {
    this.filtro = '';
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
