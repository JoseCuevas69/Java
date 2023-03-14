import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Combinaciones } from 'src/app/models/Programacion/Combinaciones';
import { CombinacionesService } from 'src/app/services/Programacion/combinaciones.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdl-combinaciones',
  templateUrl: './mdl-combinaciones.component.html',
  styleUrls: ['./mdl-combinaciones.component.css'],
})
export class MdlCombinacionesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
      this.llenarLinerMedium();
    }
    if (this.TipoAccion === 'M') {
      this.disClv = true;
    } else {
      this.disClv = false;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  DatFormulario: Combinaciones = {
    clave: '',
    presentacion: '',
    liner1: '',
    medium1: '',
    liner2: '',
    medium2: '',
    liner3: '',
    medium3: '',
    liner4: '',
    primeraFlauta: '',
    segundaFlauta: '',
    terceraFlauta: '',
    pesoM2: null,
    descripcion: '',
    estatus: false,
    claveIngles: '',
    mullen: 0,
  };
  CamposObligatorios = {
    clave: false,
    claveIngles: false,
    presentacion: false,
    pesoM2: false,
    descripcion: false
  };
  ArrLiner = [];
  ArrMedium = [];
  IndexEditMedium = null;
  IndexEditLiner = null;
  disClv = false;

  eventTipoNumero = {};

  // Modal
  @ViewChild('mdl') private mdl: any;
  TipoPapel = '';

  constructor(public Servicio: CombinacionesService) {
  }

  ngOnInit(): void {}
  btnAgregarLiner(): void {
    this.TipoPapel = 'L';
    this.mdl.openModal();
  }
  btnEliminarLiner(e): void {
    this.ArrLiner.splice(e, 1);
  }
  btnEditarLiner(e): void {
    this.IndexEditLiner = e;
    this.TipoPapel = 'L';
    this.mdl.openModal();
  }
  btnAgregarMedium(): void {
    this.TipoPapel = 'M';
    this.mdl.openModal();
  }
  btnEliminarMedium(e): void {
    this.ArrMedium.splice(e, 1);
  }
  btnEditarMedium(e): void {
    this.IndexEditMedium = e;
    this.TipoPapel = 'M';
    this.mdl.openModal();
  }
  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    const validar = this.Validaciones();
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
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  btnCerrarModal(): void {
    this.mdl.closeModal();
  }
  ChangePresentacion(e): void {
    this.DatFormulario.presentacion = e;
    this.CamposObligatorios.presentacion = false;
  }
  ChangeBuscarPapel(e): void {
    switch (e.tipoPapel) {
      case 'L':
        if (this.IndexEditLiner !== null) {
          this.ArrLiner.splice(this.IndexEditLiner, 1, { clave: e.clavepapel });
          this.IndexEditLiner = null;
        } else {
          if (this.ArrLiner.length < 4) {
            this.ArrLiner.push({ clave: e.clavepapel });
          }
        }
        break;
      case 'M':
        if (this.IndexEditMedium !== null) {
          this.ArrMedium.splice(this.IndexEditMedium, 1, { clave: e.clavepapel });
          this.IndexEditMedium = null;
        } else {
          if (this.ArrMedium.length < 3) {
            this.ArrMedium.push({ clave: e.clavepapel });
          }
        }
        break;
      default:
        break;
    }
  }
  blurDescripcion(e): void{
    if (e.target.value.length > 0) {
      this.CamposObligatorios.descripcion = false;
    }
  }
  Agregar(): void {
    this.Servicio.Agregar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('', 'Los Datos fueron agregados correctamente', 'success');
          this.blockUI.stop();
          this.Limpiar();
          this.btnCerrar();
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
    this.Servicio.Editar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('', 'Los Datos fueron agregados correctamente', 'success');
          this.blockUI.stop();
          this.Limpiar();
          this.btnCerrar();
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
          'Ha Ocurrio un Error al Momento de Editar,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  Validaciones(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };
    if (this.DatFormulario.clave === '') {
      Validar.val = false;
      this.CamposObligatorios.clave = true;
    }
    if (this.DatFormulario.presentacion === '') {
      Validar.val = false;
      this.CamposObligatorios.presentacion = true;
    }
    if (this.DatFormulario.pesoM2 === null || this.DatFormulario.pesoM2 === 0 ) {
      Validar.val = false;
      this.CamposObligatorios.pesoM2 = true;
    }
    if (this.DatFormulario.descripcion === '') {
      Validar.val = false;
      this.CamposObligatorios.descripcion = true;
    }
    const valLinerMedium = this.ValidarLinerMedium();
    if (!valLinerMedium.val){
      Validar.val = valLinerMedium.val;
      Validar.mensaje = valLinerMedium.mensaje;
    }
    return Validar;
  }
  Limpiar(): void {
    this.DatFormulario = {
      clave: '',
      presentacion: '',
      liner1: '',
      medium1: '',
      liner2: '',
      medium2: '',
      liner3: '',
      medium3: '',
      liner4: '',
      primeraFlauta: '',
      segundaFlauta: '',
      terceraFlauta: '',
      pesoM2: null,
      descripcion: '',
      estatus: false,
      claveIngles: '',
      mullen: 0,
    };
    this.CamposObligatorios = {
      clave: false,
      claveIngles: false,
      presentacion: false,
      pesoM2: false,
      descripcion: false
    };
    this.ArrLiner = [];
    this.ArrMedium = [];
    this.IndexEditMedium = null;
    this.IndexEditLiner = null;
    this.disClv = false;
  }
  ValidarLinerMedium(): any {
    const Validar = {
      val: true,
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
    };
    for (let index = 0; index < this.ArrLiner.length; index++) {
      this.DatFormulario['liner' + (index + 1) ] = this.ArrLiner[index].clave;
    }
    for (let index = 0; index < this.ArrMedium.length; index++) {
      this.DatFormulario['medium' + (index + 1) ] = this.ArrMedium[index].clave;
    }
    if (this.DatFormulario.medium1 === '' && this.DatFormulario.primeraFlauta !== ''){
      Validar.val = false;
      Validar.mensaje = 'Defina Papel Medium...';
    }
    if (this.DatFormulario.medium2 === '' && this.DatFormulario.segundaFlauta !== ''){
      Validar.val = false;
      Validar.mensaje = 'Defina Papel Medium...';
    }
    if (this.DatFormulario.medium3 === '' && this.DatFormulario.terceraFlauta !== ''){
      Validar.val = false;
      Validar.mensaje = 'Defina Papel Medium...';
    }
    if (this.DatFormulario.medium1 !== '' && this.DatFormulario.primeraFlauta === ''){
      Validar.val = false;
      Validar.mensaje = 'Seleccione la  Primera Flauta';
    }
    if (this.DatFormulario.medium2 !== '' && this.DatFormulario.segundaFlauta === ''){
      Validar.val = false;
      Validar.mensaje = 'Seleccione la Segunda Flauta';
    }
    if (this.DatFormulario.medium3 !== '' && this.DatFormulario.terceraFlauta === ''){
      Validar.val = false;
      Validar.mensaje = 'Seleccione la Tercera Flauta';
    }

    return Validar;
  }
  llenarLinerMedium(): void {
    if (this.DatFormulario.liner1 !== ''){
      this.ArrLiner.push({ clave: this.DatFormulario.liner1 });
    }
    if (this.DatFormulario.liner2 !== ''){
      this.ArrLiner.push({ clave: this.DatFormulario.liner2 });
    }
    if (this.DatFormulario.liner3 !== ''){
      this.ArrLiner.push({ clave: this.DatFormulario.liner3 });
    }
    if (this.DatFormulario.liner4 !== ''){
      this.ArrLiner.push({ clave: this.DatFormulario.liner4 });
    }

    if (this.DatFormulario.medium1 !== ''){
      this.ArrMedium.push({ clave: this.DatFormulario.medium1 });
    }
    if (this.DatFormulario.medium2 !== ''){
      this.ArrMedium.push({ clave: this.DatFormulario.medium2 });
    }
    if (this.DatFormulario.medium3 !== ''){
      this.ArrMedium.push({ clave: this.DatFormulario.medium3 });
    }
  }
  keypressTipoNumero(evt): boolean {
    const code = evt.which ? evt.which : evt.keyCode;
    if (code === 8) {
      return true;
    } else if ((code >= 48 && code <= 57) || code === 46) {
      return true;
    } else {
      return false;
    }
  }
}
