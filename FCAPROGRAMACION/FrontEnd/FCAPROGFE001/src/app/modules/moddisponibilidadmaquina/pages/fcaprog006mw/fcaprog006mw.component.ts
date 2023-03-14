
import { Component, OnInit, ViewChild } from '@angular/core';
import { DisponibilidadMaquinaService } from 'src/app/services/Programacion/disponibilidadmaquina.service';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
interface Filtros {
  anio: number;
  mes: number;
  maquina: string;
}

@Component({
  selector: 'app-fcaprog006mw',
  templateUrl: './fcaprog006mw.component.html',
  styleUrls: ['./fcaprog006mw.component.css'],
})
export class Fcaprog006mwComponent implements OnInit {
  // PPricipal
  @BlockUI() blockUI: NgBlockUI;
  filtros: Filtros = { anio: null, mes: null, maquina: '' };
  @ViewChild('gridPrincipal') private Grid: any;
  columnDefs: any;
  Datos = [];
  Anios = [];
  rowClassRules: any;
  Disponibilidad = {
    lstdisponibilidad: [],
  };
  tipoMaquina = '';
  TipoAccion = 'A';
  Accionbtn = 'Guardar';
  // Modal
  @ViewChild('mdl') private mdl: any;
  Titulo = '';
  IconoTitulo = '';
  Turnos = [{ turno: 1 }, { turno: 2 }, { turno: 3 }];

  constructor(public Servicio: DisponibilidadMaquinaService) {
    this.columnDefs = [
      {
        headerName: 'D. S.',
        field: 'diaLetra',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Dia',
        field: 'dia',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Turno',
        field: 'turnos',
        flex: 2,
        minWidth: 170,
        headerClass: 'header-center header-grid-right',
        cellRenderer: 'hybCellRenderer',
        cellRendererParams: {
          params: this.CellRendererHandler.bind(this),
        },
      },
    ];
    this.rowClassRules = {
      background_grid: this.valor.bind(this),
    };
  }
  ngOnInit(): void {
    this.Comboanio();
  }
  // =================Grid=================//
  bracketsFormatter(params): string {
    if (params.value) {
      return 'SI';
    } else {
      return 'NO';
    }
  }
  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.Datos = e.data;
    this.mdl.openModal();
  }
  CellRendererHandler(e): any {
    const params: {
      type?: string;
      disabled?: boolean;
      valueField?: string;
      textField?: string;
      options?: any[];
      change?: any;
    } = {};

    params.type = 'cbx';
    params.valueField = 'turno';
    params.textField = 'turno';
    params.options = this.Turnos;
    if (e.diaLetra === 'Domingo') {
      params.disabled = true;
    }
    params.change = this.ChangeTurno.bind(this);
    return params;
  }
  valor(params): boolean {
    if (params.data !== undefined) {
      if (params.data.diaLetra === 'Domingo') {
        return true;
      } else {
        return false;
      }
    }
  }
  ChangeTurno(e): void {}

  // =================PPrincipal=================//
  ChangeMaquina(e): void {
    this.tipoMaquina = e.tipoMaquina;
  }
  BuscarDisponibilidadMaq(): void {
    this.blockUI.start('Cargando...');
    if (this.filtros.maquina === ''){
      swal.fire(
        '',
        'Debes de seleccionar una clave de máquina',
        'error'
      );
      this.blockUI.stop();
      return;
    }
    this.Servicio.GetDisponibilidadMaquina(this.filtros).subscribe(
      (res: any) => {
        this.blockUI.stop();
        this.Datos = res.data;
        if (res.totalRecords === 0){
          this.TipoAccion = 'A';
          this.Accionbtn = 'Guardar';
        } else {
          this.TipoAccion = 'M';
          this.Accionbtn = 'Modificar';
        }
      },
      (err: any) => {
        this.blockUI.stop();
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Buscar Diseño,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            err.error +
            '</strong>',
          'error'
        );
      }
    );
  }

  btnBuscar(): void {
    this.BuscarDisponibilidadMaq();
    this.Grid.refreshData();
  }
  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    this.ArmarDatos();
    const validar = this.Validar();
    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.Agregar();
      } else {
        this.Editar();
      }
    } else {
      this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }
  }
  btnEliminar(): void {
    swal
      .fire({
        title: '¿Desea eliminar el registro?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.ArmarDatos();
          this.Eliminar();
        }
      });
  }
  Agregar(): void {
    this.Servicio.Agregar(this.Disponibilidad).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          // this.Limpiar();
          this.btnBuscar();
          this.blockUI.stop();
        } else {
          this.blockUI.stop();
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
  Editar(): void {
    this.Servicio.Editar(this.Disponibilidad).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron editados correctamente',
            'success'
          );
          // this.Limpiar();
          this.btnBuscar();
          this.blockUI.stop();
        } else {
          this.blockUI.stop();
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
  Eliminar(): void {
    this.Servicio.Eliminar(this.Disponibilidad).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron Eliminados correctamente',
            'success'
          );
          // this.Limpiar();
          this.btnBuscar();
          this.blockUI.stop();
        } else {
          this.blockUI.stop();
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
    this.Disponibilidad.lstdisponibilidad = [];
    for (const iterator of this.Datos) {
      this.Disponibilidad.lstdisponibilidad.push({
        fecha: iterator.fecha,
        turnos: iterator.turnos,
        tipoMaquina: this.tipoMaquina,
        claveMaquina: this.filtros.maquina,
      });
    }
  }
  Comboanio(): void {
    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    const anioini = Year - 20;
    const aniofin = Year + 5;
    for (let index = anioini; index < aniofin; index++) {
      this.Anios.push(index);
    }
    this.filtros.anio = Year;
    this.filtros.mes = Month;
  }
  KeyPressBuscar(e): void {
    if (e.keyCode === 13) {
      this.btnBuscar();
    }
  }
  // =================Modal=================//
  btnAbrirModal(): void {
    this.IconoTitulo = 'fa fa-copy';
    this.mdl.openModal();
  }
  btnCerrarModal(): void {
    // this.btnBuscar();
    this.mdl.closeModal();
  }
}
