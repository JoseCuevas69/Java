import { Component, OnInit, EventEmitter, Input, Output , ViewChild} from '@angular/core';
import { Desperdicio } from 'src/app/models/Produccion/Desperdicio';
import { DesperdiciosService } from 'src/app/services/Programacion/desperdicios.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';


@Component({
  selector: 'mldconfig-area-desperdicio',
  templateUrl: './mldconfig-area-desperdicio.component.html',
  styleUrls: ['./mldconfig-area-desperdicio.component.css']
})
export class MldconfigAreaDesperdicioComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('mdl') private mdl: any;
  @ViewChild('AreaCap') private AreaCap: any;
  @ViewChild('AreaCar') private AreaCar: any;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
    }
    if (this.TipoAccion === 'M'){
      this.disArea = true;
      this.disCargo = true;

    } else {
      this.disArea = false;
      this.disCargo = false;
    }
  }

  @Output() ClickbtnCerrar = new EventEmitter<any>();
  @Output() GuardarConfig = new EventEmitter<any>();
  DatFormulario = {
    claveArea: '',
    claveCargo: '',
    nombreArea: '',
    nombreCargo: '',
    balance: false,
    estatus: false,
    objetivoEst: 0,
    objetivoMax: 0,
  };
  CamposObligatorios = {
    claveArea: false,
    claveCargo: false,
  };
  disArea = false;
  disCargo = false;

  DatosModal = {};
  IconoTitulo = '';

  constructor(public Servicio: DesperdiciosService) {
  }

  ngOnInit(): void {
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
    this.AreaCap.refreshData();
    this.AreaCar.refreshData();
    this.mdl.closeModal();
  }
  btnAbrirAgregarAreasDes(){

    this.IconoTitulo = 'fa fa-plus';
    this.DatosModal = {};
    this.mdl.openModal();
  }
  ChangeAreaCaptura(e): void{
    this.DatFormulario.claveArea = e.value;
    this.DatFormulario.nombreArea = e.value + ' - ' + e.data.nombre;
    this.CamposObligatorios.claveArea = false;
  }
  ChangeCargo(e): void{
    this.DatFormulario.claveCargo = e.value;
    this.DatFormulario.nombreCargo = e.value + ' - ' + e.data.nombre;
    this.CamposObligatorios.claveCargo = false;
  }
  Agregar(): void {
    this.blockUI.stop();
    this.GuardarConfig.emit({datos:this.DatFormulario , tipoAccion:'A'});
  }
  Editar(): void {
    this.blockUI.stop();
    this.GuardarConfig.emit({datos:this.DatFormulario, tipoAccion:'M'});
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
    if (this.DatFormulario.claveArea === '') {
      Validar.val = false;
      this.CamposObligatorios.claveArea = true;
    }
    if (this.DatFormulario.claveCargo === '') {
      Validar.val = false;
      this.CamposObligatorios.claveCargo = true;
    }

    return Validar;
  }
  Limpiar(): void {
    this. DatFormulario = {
      claveArea: '',
      claveCargo: '',
      nombreArea: '',
      nombreCargo: '',
      balance: false,
      estatus: false,
      objetivoEst: 0,
      objetivoMax: 0,
    };
    this.CamposObligatorios = {
      claveArea: false,
      claveCargo: false,
    };
  }
  keypressTipoNumero(evt){
    const code = evt.which ? evt.which : evt.keyCode;
    if (code === 8) {
      return true;
    } else if (code >= 48 && code <= 57) {
      return true;
    } else {
      return false;
    }
  }
}
