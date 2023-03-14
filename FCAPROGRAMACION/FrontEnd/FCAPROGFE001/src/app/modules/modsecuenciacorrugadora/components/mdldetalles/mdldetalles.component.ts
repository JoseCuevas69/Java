import { data } from 'jquery';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdldetalles',
  templateUrl: './mdldetalles.component.html',
  styleUrls: ['./mdldetalles.component.css'],
})
export class MdldetallesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  DatosGrid = [];
  columnDefs: any;
  @Input() TipoAccion = 'A';
  Programa: number;
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      console.log(value, value.programa);
      this.Programa = value.programa;
      this.BuscarDatosGenerales();
    }
  }

  @Output() ClickbtnCerrar = new EventEmitter<any>();

  constructor(public Servicio: SecuenciaCorrugadoraService) {
    this.columnDefs = [
      {
        headerName: 'Traer Master',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridTraerMaster.bind(this),
          label: '<i class="fas fa-book"></i>',
          class: 'btn btn-info btn-sm',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Articulo',
        field: 'descripcion',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Cliente',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
    ];
  }

  ngOnInit(): void {}
  GridTraerMaster(e): void {
    if (e.data.claveArticulo === '') {
      swal.fire(' ', 'No tiene registrado la Clave Articulo', 'warning');
      return;
    }

    const Maestra = e.data.claveArticulo + '.GIF';

    this.Servicio.DescargarMaestra(
      Maestra,
      (res) => {
        this.blockUI.stop();
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento Buscar Archivo Maestra,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.message +
            '</strong>',
          'error'
        );
      }
    );
  }
  BuscarDatosGenerales(): void {
    this.blockUI.start();
    this.Servicio.GetDetalleOp(this.Programa).subscribe(
      (Datos: any) => {
        this.blockUI.stop();
        if (Datos.correcto) {
          console.log('mdldetalles', 'GetDetalleOp', Datos.data);
          this.DatosGrid = Datos.data;
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (BuscarDatosGenerales)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        this.blockUI.stop();
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarDatosGenerales)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  Limpiar(): void {
    this.DatosGrid = [];
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
}
