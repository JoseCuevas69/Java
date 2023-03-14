import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { EjecutivosService } from 'src/app/services/Ejecutivos.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface FiltrosEjecutivo {
  filtro: string;
  Estatus: number;
}
@Component({
  selector: 'app-mldejecutivo',
  templateUrl: './mldejecutivo.component.html',
  styleUrls: ['./mldejecutivo.component.css'],
})
export class MldejecutivoComponent implements OnInit {
  @Output() ItemData = new EventEmitter<any>();
  @ViewChild('mdlBuscarEjecutivo') private mdlBuscarEjecutivo: any;
  mdlBuscarEjecutivoRef: NgbModalRef;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  OpenModal(): void {
    this.mdlBuscarEjecutivoRef = this.modalService.open(
      this.mdlBuscarEjecutivo,
      { size: 'md' }
    );
    this.mdlBuscarEjecutivoRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
  CloseModal() {
    this.mdlBuscarEjecutivoRef.close();
  }
  SeleccionItemData(e) {
    this.ItemData.emit(e);
    this.CloseModal();
  }
}

@Component({
  selector: 'modal-Ejecutivo',
  template: `
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="form-group">
                <label for="selZona">Ejecutivo:</label>
                <div class="input-group">
                  <input
                    id="txtNombre"
                    [(ngModel)]="filtros.filtro"
                    type="text"
                    class="form-control"
                    placeholder="Buscar por Codigo o Nombre"
                    (keypress)="KeyPressBuscar($event)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="btnBuscar"
                      (click)="Buscar()"
                    >
                      <span class="fa fa-search"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <label> Ejecutivo:</label>
              <grid-ss
                #Grid
                [serviceFunction]="BuscarEjecutivoService.ListarEjecutivo"
                [columnDefs]="columnDefs"
                [enablePagination]="true"
                [Filters]="filtros"
                [rowsPerPage]="7"
              >
              </grid-ss>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalEjecutivo implements AfterViewInit {
  @ViewChild('Grid') private Grid: any;
  @Output() ItemData = new EventEmitter<any>();
  filtros: FiltrosEjecutivo = { filtro: '', Estatus: 1 };
  columnDefs: any;
  constructor(public BuscarEjecutivoService: EjecutivosService) {
    this.columnDefs = [
      {
        headerName: 'Codigo',
        field: 'idUsuario',
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

  ngAfterViewInit(): void {}
  Buscar() {
    this.Grid.refreshData();
  }
  KeyPressBuscar(e) {
    if (e.keyCode === 13) {
      this.Buscar();
    }
  }
  Seleccionar(value: any): void {
    this.ItemData.emit(value.data);
  }
}
