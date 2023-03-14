import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import { GridModel } from 'src/app/models/common/gridModel';

interface Filtros {
  filtro: string;
  Usuario: string;
  Zona: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal-responsable',
  templateUrl: './modal-responsable.component.html',
  styleUrls: ['./modal-responsable.component.scss'],
})
export class ModalResponsableComponent implements OnInit {
  filtros: Filtros = { filtro: '', Usuario: '', Zona: '' };
  @ViewChild('grid') private grid: GridModel;
  columnDefs: any[];
  iniciando = true;
  private dataValue: any;
  @Output() dataChange = new EventEmitter<any>();
  @Input() get data(): any {
    return this.dataValue;
  }
  set data(value: any) {
    this.dataValue = value;
    this.dataChange.emit(this.dataValue);
    this.cancelar();
  }
  @Input() set datafiltro(value: any) {
    console.log(value);
    this.filtros.Usuario = value.Usuario;
    this.filtros.Zona = value.Zona;
  }
  @Output() cancel = new EventEmitter<any>();

  constructor(public Service: fcaventapi001Service) {
    this.columnDefs = [
      {
        headerName: 'Responsable',
        field: 'nombre',
        flex: 15,
        minWidth: 200,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.seleccionar.bind(this),
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

  seleccionar(e: any): void {
    this.data = e.data;
  }

  buscar(): void {
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
