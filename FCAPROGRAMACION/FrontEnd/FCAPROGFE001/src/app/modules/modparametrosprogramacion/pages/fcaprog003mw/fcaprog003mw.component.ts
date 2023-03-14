import { Component, OnInit, ViewChild } from '@angular/core';
import { ParametrosProgramacionService } from 'src/app/services/Programacion/parametrosprog.service';
import { ParametrosProg } from 'src/app/models/Programacion/ParametrosProg';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
interface Filtros {
  filtro: string;
}
@Component({
  selector: 'app-fcaprog003mw',
  templateUrl: './fcaprog003mw.component.html',
  styleUrls: ['./fcaprog003mw.component.css'],
})
export class Fcaprog003mwComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // PPricipal
  filtros: Filtros = { filtro: '' };
  @ViewChild('gridPrincipal') private Grid: any;
  columnDefs: any;
  DatosPagPrincipal: ParametrosProg = {
    id: 0,
    resistenciasAfines: false,
    refileMaximo: 0,
    refileMinimo: 0,
    diasAdelanto: 0,
    todosAnchos: false,
    anchoCalculo: 0,
    largoMinimo: 0,
    excedente: 0,
    scores: 0,
  };
  txtresistenciasAfines = '';
  txttodosAnchos = '';

  // Modal
  @ViewChild('mdl') private mdl: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';

  constructor(public Servicio: ParametrosProgramacionService) {
  }
  ngOnInit(): void {
    this.BuscarDatos();
  }
  // =================PPrincipal=================//
  BuscarDatos(): void {
    this.blockUI.start('Cargando...');
    this.Servicio.GetParametrosProg().subscribe(
      (res: any) => {
        this.blockUI.stop();
        this.DatosPagPrincipal = res.data[0];
        this.txtresistenciasAfines = this.boolLetras(this.DatosPagPrincipal.resistenciasAfines);
        this.txttodosAnchos = this.boolLetras(this.DatosPagPrincipal.todosAnchos);
      },
      (err: any) => {
        this.blockUI.stop();
      }
    );
  }

  btnAgregar(): void {
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-plus';
    this.mdl.openModal();
  }
  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    const validar = this.ValidarDatos();
    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.Agregar();
      }
    } else {
      this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }
  }
  ChangeResistenciasAfines(e): void{
    this.DatosPagPrincipal.resistenciasAfines = e;
    this.txtresistenciasAfines = this.boolLetras(this.DatosPagPrincipal.resistenciasAfines);
  }
  ChangeTodosAnchos(e): void{
    this.DatosPagPrincipal.todosAnchos = e;
    this.txttodosAnchos = this.boolLetras(this.DatosPagPrincipal.todosAnchos);

  }
  boolLetras(valor): string {
    let txt = '';
    if(valor){
      txt = 'SI';
    } else {
      txt = 'NO';
    }
    return txt;
  }
  Agregar(): void {
    this.Servicio.AgregarParametros(this.DatosPagPrincipal).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          this.blockUI.stop();
          this.BuscarDatos();
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
  ValidarDatos(): any{
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };
    if (this.DatosPagPrincipal.refileMaximo < 25 || this.DatosPagPrincipal.refileMaximo > 350 ) {
      Validar.val = false;
      Validar.mensaje = 'Error: El Refile Maximo debe ser, >=25 y <=350';
    }
    if (this.DatosPagPrincipal.refileMinimo < 0 || this.DatosPagPrincipal.refileMinimo > 40 ) {
      Validar.val = false;
      Validar.mensaje = 'Error: El Refile Minimo debe ser, >=0 y <=40';
    }
    if (this.DatosPagPrincipal.diasAdelanto < 0) {
      Validar.val = false;
      Validar.mensaje = 'Error: Los Dias Adelanto deben ser, >=0';
    }
    if (this.DatosPagPrincipal.largoMinimo < 99) {
      Validar.val = false;
      Validar.mensaje = 'Error: El Largo Minimo deben ser, >99';
    }
    if (this.DatosPagPrincipal.scores < 0 || this.DatosPagPrincipal.scores > 30 ) {
      Validar.val = false;
      Validar.mensaje = 'Error: El Score deben ser, >=0 y <=30';
    }
    return Validar;
  }
  // =================Modal=================//
  btnCerrarModal(): void {
    this.mdl.closeModal();
  }
}
