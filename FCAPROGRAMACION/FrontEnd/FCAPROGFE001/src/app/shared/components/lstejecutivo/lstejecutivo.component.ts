import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { GridModel } from 'src/app/models/common/gridModel';
import swal from 'sweetalert2';

@Component({
  selector: 'lstejecutivo',
  templateUrl: './lstejecutivo.component.html',
  styleUrls: ['./lstejecutivo.component.css'],
})
export class LstejecutivoComponent implements OnInit {
  @ViewChild('GridEjecutivo', { static: false }) private GridEje: GridModel;
  @ViewChild('mldejecutivo') private mldejecutivo: any;
  @Input() set data(value: any) {
    this.CargarDatos(value);
  }
  @Output() itemData = new EventEmitter<any[]>();
  columnDefs: any;
  Datos = [];
  constructor() {
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
        headerName: 'Titular',
        field: 'titular',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridCheck.bind(this),
          label: [
            '<i class="fas fa-user-alt"></i>',
            '<i class="fas fa-user-check"></i>',
          ],
          class: ['btn btn-light btn-sm', 'btn btn-light btn-sm'],
          type: 'btnCheck',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Quitar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridQuitar.bind(this),
          label: '<i class="far fa-minus-square"></i>',
          class: 'btn btn-danger btn-sm',
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
  GridQuitar(e) {
    let resDatos = this.ClonarDatos();
    let posItem = null;
    for (let index = 0; index < resDatos.length; index++) {
      if (resDatos[index].idUsuario === e.data.idUsuario) {
        posItem = index;
        break;
      }
    }

    resDatos.splice(posItem, 1);
    this.Datos = resDatos;
    this.itemData.emit(this.Datos);
  }
  GridCheck(e) {
    let newDatos = this.ClonarDatos();
    let Index = null;
    for (let index = 0; index < newDatos.length; index++) {
      if (newDatos[index].idUsuario === e.data.idUsuario) {
        Index = index;
        break;
      }
    }
    newDatos[Index].titular = !newDatos[Index].titular;

    this.Datos = newDatos;
    this.itemData.emit(this.Datos);
  }

  btnAgregarEjecutivo() {
    this.mldejecutivo.OpenModal();
  }

  CargarDatos(data) {
    this.Datos = data;
  }

  GetEjecutivos(e) {
    let newDatos = this.ClonarDatos();
    let ValClaveEje = false;
    for (let index = 0; index < this.Datos.length; index++) {
      if (this.Datos[index].idUsuario === e.idUsuario) {
        ValClaveEje = true;
        break;
      }
    }
    if (ValClaveEje) {
      swal.fire(
        'Datos ',
        'El Ejecutivo "' + e.nombre + '" ya se encuentra agregado en la tabla',
        'warning'
      );
    } else {
      Object.defineProperty(e, 'titular', { value: false });
      newDatos.push(e);
      this.Datos = newDatos;
      this.itemData.emit(this.Datos);
    }
  }
  ClonarDatos() {
    const DatosTabla = [];
    this.Datos.forEach((val) => DatosTabla.push(Object.assign({}, val)));
    return DatosTabla;
  }
}
