import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { ERPService } from 'src/app/services/ERP.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface FiltrosUsuarioERP {
  filtro: string;
  DepartamentoId: number;
}

@Component({
  selector: 'app-mldusuario',
  templateUrl: './mldusuario.component.html',
  styleUrls: ['./mldusuario.component.css'],
})
export class MldusuarioComponent implements OnInit {
  @Output() ItemData = new EventEmitter<any>();
  @ViewChild('mdlBuscarUsuario') private mdlBuscarUsuario: any;
  mdlBuscarUsuarioRef: NgbModalRef;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  OpenModalBuscaUsuario(): void {
    this.mdlBuscarUsuarioRef = this.modalService.open(this.mdlBuscarUsuario, {
      size: 'md',
    });
    this.mdlBuscarUsuarioRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
  CloseModalBuscarUsuario() {
    this.mdlBuscarUsuarioRef.close();
  }
  SeleccionItemData(e) {
    this.ItemData.emit(e);
  }
}
@Component({
  selector: 'modal-UsuarioErp',
  template: `
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="form-group">
                <label for="selZona">Usuario ERP:</label>
                <div class="input-group">
                  <input
                    id="txtNombre"
                    [(ngModel)]="filtros.filtro"
                    type="text"
                    class="form-control"
                    placeholder="Buscar por Codigo o Nombre"
                    (keypress)="KeyPressBuscarUsuarioERP($event)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="btnBuscar"
                      (click)="BuscarUsuarioERP()"
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
              <label> Usuarios:</label>
              <grid-ss
                #Grid
                [serviceFunction]="BuscarUsuarioERPService.ListarUsuarioERP"
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
export class Modal implements AfterViewInit {
  @ViewChild('Grid') private Grid: any;
  @Output() ItemData = new EventEmitter<any>();
  filtros: FiltrosUsuarioERP = { filtro: '', DepartamentoId: 0 };
  columnDefs: any;
  constructor(public BuscarUsuarioERPService: ERPService) {
    this.columnDefs = [
      {
        headerName: 'Codigo',
        field: 'id',
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
  BuscarUsuarioERP() {
    this.Grid.refreshData();
  }
  KeyPressBuscarUsuarioERP(e) {
    if (e.keyCode === 13) {
      this.BuscarUsuarioERP();
    }
  }
  Seleccionar(value: any): void {
    this.ItemData.emit(value.data);
  }
}
