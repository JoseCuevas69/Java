import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GridModel } from 'src/app/models/common/gridModel';
import { Contacto, ContactoFiltros } from 'src/app/models/Correos';
import { ClientesVentasService } from 'src/app/services/ClientesVentas.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal-contactos-cliente',
  templateUrl: './modal-contactos-cliente.component.html',
  styleUrls: ['./modal-contactos-cliente.component.css']
})
export class ModalContactosClienteComponent implements OnInit {
  @Input() title = 'Buscar Contactos';
  @Input() iconClass = 'far fa-address-card';
  @Input() filters = new ContactoFiltros();

  @ViewChild('modal') modal: any;
  modalRef: NgbModalRef;

  @ViewChild('grid') private grid: GridModel;
  columnDefs: any[];

  private dataValue: Contacto;
  @Output() dataChange = new EventEmitter<Contacto>();
  @Input() get data(): Contacto {
    return this.dataValue;
  }
  set data(value: Contacto) {
    this.dataValue = value;
    this.dataChange.emit(this.dataValue);
  }
  @Output() selectedData = new EventEmitter<Contacto>();

  contactos: Contacto[];

  constructor(
    private clientesService: ClientesVentasService,
    private modalService: NgbModal
  ) {
    this.columnDefs = [
      {
        headerName: 'Clave',
        field: 'idContacto',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
        flex: 20,
        minWidth: 200,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Teléfono',
        field: 'telefono',
        flex: 15,
        minWidth: 150,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Correo',
        field: 'telefono',
        flex: 15,
        minWidth: 150,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.select.bind(this),
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
    this.search();
  }

  select(e: {data: Contacto}): void{
    this.selectedData.emit(e.data);
    this.data = e.data;
    this.closeModal();
  }

  openModal(): void {
    this.search();

    this.modalRef = this.modalService.open(this.modal, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    this.modalRef.result.then(() => {
      this.contactos = [];
    });
  }

  search(): void {
    this.clientesService.ListarCorreo(this.filters.idCliente).then(
      (res: {data: Contacto[]}) => {
        this.contactos = res.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Contactos de Cliente, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        );
      }
    );
  }

  closeModal(): void {
    this.modalRef.close();
  }

  gridReady(ref: GridModel): void {
    if (!this.grid) {
      this.grid = ref;
    }
  }
}
