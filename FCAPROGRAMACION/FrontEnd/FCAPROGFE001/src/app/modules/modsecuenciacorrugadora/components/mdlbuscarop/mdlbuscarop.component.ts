import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdlbuscarop',
  templateUrl: './mdlbuscarop.component.html',
  styleUrls: ['./mdlbuscarop.component.css']
})
export class MdlbuscaropComponent implements OnInit {
  DatosGrid = [];
  columnDefs: any;
  Filtro = '';

  @Output() ClickbtnCerrar = new EventEmitter<any>();
  @Output() filtrar = new EventEmitter<any>();


  constructor(public Servicio: SecuenciaCorrugadoraService) {
    this.columnDefs = [
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
      {
        headerName: 'Programa',
        field: 'programa',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
    ];
  }

  ngOnInit(): void {
  }
  BuscarBuscaOps(): void {
    this.Servicio.GetBuscaOps(this.Filtro).subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
          console.log(
            'mdlbuscarop',
            'GetBuscaOps',
            Datos.data
          );
          this.DatosGrid = Datos.data;
          this.filtrar.emit(this.DatosGrid);

        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (BuscarBuscaOps)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarBuscaOps)' +
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
    this.Filtro = '';
  }
  btnBuscar(): void {
    this.BuscarBuscaOps();
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }

}
