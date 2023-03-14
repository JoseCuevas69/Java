import { FiltrosArt } from './../../../models/Articulo';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ArticulosService } from 'src/app/services/Articulos.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdlbuscararticulo',
  templateUrl: './mdlbuscararticulo.component.html',
  styleUrls: ['./mdlbuscararticulo.component.scss'],
})
export class MdlbuscararticuloComponent implements OnInit {
  filtros: FiltrosArt = {
    filtro: '',
    TipoProducto: '',
    Resistencia: '',
    Suaje: '',
    idCliente: '',
    generico: false,
    sinBackFrom: false,
    Suspendido: false,
    Estatus: true,
    ComponentePrin: '',
  };
  rowClassRules: any;
  @ViewChild('gridPrincipal') private Grid: any;
  @Input() set DatosAdicionales(value) {
    if (Object.keys(value).length !== 0) {
      this.filtros.idCliente = value.idCliente;
      (this.filtros.sinBackFrom = value.sinBackFrom), this.btnBuscar();
    }
  }
  @Output() ItemData = new EventEmitter<any>();
  columnDefs = [];
  constructor(public Service: ArticulosService) {
    this.columnDefs = [
      {
        headerName: 'Clave Art',
        field: 'claveArticulo',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tipo',
        field: 'nombreTipoProducto',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Resistencia',
        field: 'resistencia',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Suaje 50',
        field: 'suaje50',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Suaje 66',
        field: 'suaje66',
        flex: 2,
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
    this.rowClassRules = {
      'articulo-principal': this.valor.bind(this),
    };
  }

  ngOnInit(): void {}

  Seleccionar(e): void {
    console.log(e, 'entro al sel del buscar');
    this.ItemData.emit(e.data);
  }
  KeyPressBuscar(e): void {
    if (e.keyCode === 13) {
      this.btnBuscar();
    }
  }
  btnBuscar(): void {
    this.Grid.refreshData();
  }
  ChangeTipoProducto(e): void {
    this.filtros.TipoProducto = e;
    this.btnBuscar();
  }
  ChangeGenerico(e): void {
    this.filtros.generico = e;
    this.btnBuscar();
  }
  valor(params): boolean {
    if (params.data !== undefined) {
      if (params.data.esPricipal) {
        return true;
      } else {
        return false;
      }
    }
  }
}
