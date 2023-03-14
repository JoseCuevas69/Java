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
  selector: 'mdlverificadorpapeles',
  templateUrl: './mdlverificadorpapeles.component.html',
  styleUrls: ['./mdlverificadorpapeles.component.css']
})
export class MdlverificadorpapelesComponent implements OnInit {
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
      this.BuscarVerificadorPapeles();
    }
  }


  @Output() ClickbtnCerrar = new EventEmitter<any>();

  constructor(
    public Servicio: SecuenciaCorrugadoraService
  ) {
    this.Zona = localStorage.getItem('Zona');

    this.columnDefs = [
      {
        headerName: 'Papel',
        field: 'papel',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Ancho',
        field: 'ancho',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Programado',
        field: 'tonProg',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Existencia Ton',
        field: 'existencia',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
    ];
  }

  ngOnInit(): void {}

  BuscarVerificadorPapeles(): void {
    this.blockUI.start();
    this.Servicio.GetVerificadorPapeles(this.Programa).subscribe(
      (Datos: any) => {
        this.blockUI.stop();
        if (Datos.correcto) {
          console.log(
            'mdldetalles',
            'GetVerificadorPapeles',
            Datos.data
          );
          this.DatosGrid = Datos.data;
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (BuscarVerificadorPapeles)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        this.blockUI.stop();
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarVerificadorPapeles)' +
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
