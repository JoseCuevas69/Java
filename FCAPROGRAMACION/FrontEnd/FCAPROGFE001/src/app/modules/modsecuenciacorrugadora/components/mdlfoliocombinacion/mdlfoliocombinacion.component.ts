import { element } from 'protractor';
import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdlfoliocombinacion',
  templateUrl: './mdlfoliocombinacion.component.html',
  styleUrls: ['./mdlfoliocombinacion.component.css']
})
export class MdlfoliocombinacionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  Programa = null;
  op = '';
  Zona = '';

  DatosGrid = [];
  columnDefs: any;

  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      console.log(value, value.programa);
      this.Programa = value.programa;
      this.op = value.op;
      this.BuscarValidarCombinacion();
    }
  }


  @Output() ClickbtnCerrar = new EventEmitter<any>();

  constructor(
    public Servicio: SecuenciaCorrugadoraService
  ) {
    this.Zona = localStorage.getItem('Zona');

    this.columnDefs = [
      {
        headerName: 'Folio',
        field: 'folio',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Programa',
        field: 'programa',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Op',
        field: 'op',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Reporte',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridReporte.bind(this),
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
    ];
  }

  ngOnInit(): void {}
  GridReporte(e): void{
    let url = '';
    url += 'http://intranetsrs.cecso.com.mx/ReportServer?%2fCajas01%2fCmoSRS007%2fCmoSRS007';
    url += '&Zona=01&ACCION=1&Folio=' + e.data.folio + '&Programa=' + e.data.programa;
    url += '&NombreProyecto=CplCap010&NombreReporte=CmoSRS007&rs%3aCommand=Render&rs%3AFormat=PDF';
    window.open(url, '_blank');
  }
  BuscarValidarCombinacion(): void {
    this.blockUI.start();
    this.Servicio.GetValidarCombinacion(this.op).subscribe(
      (Datos: any) => {
        this.blockUI.stop();
        if (Datos.correcto) {
          console.log(
            'mdldetalles',
            'GetValidarCombinacion',
            Datos.data
          );

          if (!Datos.data.length){
            swal.fire(
              'AVISO',
              'No Existen Folios para Este Programa',
              'error'
            );
          } else {
            this.DatosGrid = Datos.data;
          }

        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (BuscarValidarCombinacion)' + Datos.mensaje,
            'info'
          );
        }
      },
      (error) => {
        this.blockUI.stop();
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarValidarCombinacion)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  Limpiar(): void {
    this.Programa = null;
    this.op = '';
    this.Zona = '';

    this.DatosGrid = [];
  }
}
