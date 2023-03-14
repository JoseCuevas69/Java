import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdlobservacionesprogimpresora',
  templateUrl: './mdlobservacionesprogimpresora.component.html',
  styleUrls: ['./mdlobservacionesprogimpresora.component.css']
})
export class MdlobservacionesprogimpresoraComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  DatosGrid = [];
  columnDefs: any;
  Programa: number;
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatosGrid = value;
    }
  }

  @Output() ClickbtnCerrar = new EventEmitter<any>();

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
        headerName: 'Cant. Corr.',
        field: 'lPiezas',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Cant. Impr.',
        field: 'cantidad',
        flex: 2,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Comentarios',
        field: 'txtPiezas',
        flex: 5,
        minWidth: 350,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
    ];
  }

  ngOnInit(): void {
  }

  Limpiar(): void {
    this.DatosGrid = [];
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }


}
