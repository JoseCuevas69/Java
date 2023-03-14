import { Component, OnInit,ViewChild } from '@angular/core';
import { NumberFilter } from 'ag-grid-community';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { VarEntornoService } from 'src/app/services/varentorno.service';
import swal from 'sweetalert2';
import { VariablesEntorno } from '../../../../models/VariablesEntorno';

interface Filtros {
  filtro: string;
}
@Component({
  selector: 'app-fcaprog010mw',
  templateUrl: './fcaprog010mw.component.html',
  styleUrls: ['./fcaprog010mw.component.css'],
})
export class Fcaprog010mwComponent implements OnInit {
  filtros: Filtros = { filtro: '' };
  @ViewChild('gridVarEntorno') private Grid: any;
  columnDefs: any;
  Datos = [];
  Variables= new VariablesEntorno;
  @BlockUI() blockUI: NgBlockUI;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';
  eventTipoNumero = {};

  constructor(public Servicio: VarEntornoService) { 
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'idParametro',
        flex: 1,
        maxWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Parametro',
        field: 'parametro',
        flex: 1,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Descripcion',
        field: 'descripcion',
        flex: 2,
        minWidth: 140,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Valor',
        field: 'valor',
        flex: 1,
        maxWidth: 150,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center',
        
        editable: true,
        singleClickEdit:true,
        CellEditorParams:{
          class: 'form-control form-control-sm',
          valueField: 'valor',
          optionChange: this.ChangeValor.bind(this)
        }
      },
     
    ];


    // this.eventTipoNumero = {
    //   keypress: this.ValideKey.bind(this),
    // };

  }

  ngOnInit(): void {
    this.cargaDatos();
  }
  async cargaDatos(): Promise<void> {
    const data = await this.Servicio.ListarVarEntorno().toPromise();
    this.Datos = data.data;
  }
  bracketsFormatter(params): string {
    if (params.value) {
      return 'SI';
    } else {
      return 'NO';
    }
  }
  ChangeValor():void{
    this.Grid.refreshDataKeepSelected();
  }

  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    this.ArmarDatos();
    const validar = this.Validar();
    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.Agregar();
      } 
    } else {
      this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }
  }

  Validar(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };

    /*if (this.DatosPagPrincipal.pzasxLargo === null) {
      Validar.val = false;
    }*/
    return Validar;
  }
  ArmarDatos(): void {
    this.Variables.lstdatos = [];
    for (const iterator of this.Datos) {
      this.Variables.lstdatos.push({
        valor: String(iterator.valor),
        idParametro: iterator.idParametro,
      });
    }
  }
  Agregar(): void {
    this.Servicio.Editar(this.Variables).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          // this.Limpiar();
          this.Grid.refreshData();
          this.blockUI.stop();
        } else {
          this.blockUI.stop();
          this.Grid.refreshData();
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. ' + data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        this.blockUI.stop();
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Agregar,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  // GridEditar(e): void {
  //    this.TipoAccion = 'M';
  //    this.IconoTitulo = 'fa fa-edit';
  //    this.Datos = e.data;
  // }
  // ValideKey(evt): boolean {
  //   const code = evt.which ? evt.which : evt.keyCode;
  //   if (code === 8) {
  //     return true;
  //   } else if ((code >= 48 && code <= 57) || code === 46) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
