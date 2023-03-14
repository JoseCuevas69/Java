import { Component, OnInit, EventEmitter, Input, Output,ViewChild } from '@angular/core';
import { Desperdicio } from 'src/app/models/Produccion/Desperdicio';
import { DesperdiciosService } from 'src/app/services/Programacion/desperdicios.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { cloneDeep } from 'lodash-es';
interface Filtros {
  ClaveArea: string;
  ClaveCargo: string;
  ClaveDesperdicio: number;
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdl-desperdicios',
  templateUrl: './mdl-desperdicios.component.html',
  styleUrls: ['./mdl-desperdicios.component.css']
})
export class MdlDesperdiciosComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  filtros: Filtros = { ClaveArea: '', ClaveDesperdicio: 0 , ClaveCargo: '' };
  @ViewChild('gridPrincipal') private Grid: any;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.LimpiarDes();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
      this.filtros.ClaveDesperdicio = +value.idDesperdicio;
    }
    if (this.TipoAccion === 'M'){
      this.BuscarConfigAreaDesperdicios();
      this.disClvDiseno = true;
    } else {
      this.disClvDiseno = false;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  DatFormulario = {
    descripcionDesperdicio: '',
    idDesperdicio: 0,
    aplicaImpresora: false,
    aplicaCorrugadora: false,
    aplicaAcabado: false,
    aplicaRecuperacionCaja: false,
    datConfiAreaDes: []
  };
  CamposObligatorios = {
    descripcionDesperdicio: false
  };
  DatosFiltrados = [];
  DatosGrid = [];
  columnDefs: any;

  btnNombreConfig = 'Agregar';

  disClvDiseno = false;

   // Modal
   @ViewChild('mdl') private mdl: any;
   @ViewChild('AreaCap') private AreaCap: any;
   @ViewChild('AreaCar') private AreaCar: any;

   DatosModal = {};
   Titulo = '';
   IconoTitulo = '';
   TipoAccionConfig = 'A';

   DatFormularioConfig = {
    claveArea: '',
    claveCargo: '',
    nombreArea: '',
    nombreCargo: '',
    balance: false,
    estatus: false,
    objetivoEst: 0,
    objetivoMax: 0,
  };
  CamposObligatoriosConfig = {
    claveArea: false,
    claveCargo: false,
    estandar: false,
    maximo: false
  };
  disArea = false;
  disCargo = false;

  constructor(public Servicio: DesperdiciosService) {

    this.columnDefs = [
      {
        headerName: 'Area Captura',
        field: 'nombreArea',
        flex: 4,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Area Cargo',
        field: 'nombreCargo',
        flex: 4,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Balance',
        field: 'balance',
        flex: 3,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.GridbracketsFormatter,
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridEditar.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridEliminar.bind(this),
          label: '<i class="fa fa-trash"></i>',
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

  ngOnInit(): void {

  }
  BuscarConfigAreaDesperdicios(){
    this.Servicio.GetConfigAreaDesperdicios(this.filtros).subscribe(
      (data: any) => {
        this.DatosGrid = data.data;
        this.btnBuscar();
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error (ConfigAreaDesperdicios),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  GridbracketsFormatter(params): string {
    if (params.value) {
      return 'SI';
    } else {
      return 'NO';
    }
  }
  GridEditar(e): void {
    this.disArea = true;
    this.disCargo = true;

    this.DatFormularioConfig = cloneDeep(e.data);
    this.btnNombreConfig = 'Editar';
     this.TipoAccionConfig = 'M';
    // this.IconoTitulo = 'fa fa-edit';
    // this.DatosModal = cloneDeep(e.data);
    // this.mdl.openModal();
  }
  GridEliminar(e): void {
    swal
      .fire({
        title: '¿Desea eliminar el registro de configuración de área de desperdicio seleccionado?',
        text: e.data.claveDiseno,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          const result = this.DatosGrid.filter((obj) =>{
            let ok = true;
            if(obj.claveArea === e.data.claveArea && obj.claveCargo === e.data.claveCargo){

                ok = false;
            } else{
                ok = true;
            }
            return ok;
          });
          this.DatosGrid = result;
          this.btnBuscar();
        }
      });
  }
  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    this.DatFormulario.datConfiAreaDes = this.DatosGrid;
    const validar = this.ValidacionesDes();
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
    this.LimpiarDes();
    this.ClickbtnCerrar.emit();
  }
  btnBuscar(): void {
    const result = this.DatosGrid.filter((obj) =>{
      let ok = true;
      if(this.filtros.ClaveArea !== '' && this.filtros.ClaveCargo === ''){
        if (obj.claveArea === this.filtros.ClaveArea){
          ok = true;
        } else{
          ok = false;
        }

      } else
      if(this.filtros.ClaveArea === '' && this.filtros.ClaveCargo !== ''){
        if (obj.claveCargo === this.filtros.ClaveCargo){
          ok = true;
        } else{
          ok = false;
        }
      } else
      if(this.filtros.ClaveArea !== '' && this.filtros.ClaveCargo !== ''){
        if (obj.claveArea === this.filtros.ClaveArea && obj.claveCargo === this.filtros.ClaveCargo){
          ok = true;
        } else{
          ok = false;
        }
      }
      return ok;
    });

    this.DatosFiltrados = result;
  }
  btnCerrarModalConfig(): void {
    this.AreaCap.refreshData();
    this.AreaCar.refreshData();
    this.mdl.closeModal();
  }
  btnAbrirAgregarAreasDes(){

    this.IconoTitulo = 'fa fa-plus';
    this.DatosModal = {};
    this.mdl.openModal();
  }
  ChangeAreaCapturaDes(e): void {
    this.filtros.ClaveArea = e.value;
    this.btnBuscar();
  }
  ChangeCargoDes(e): void{
    this.filtros.ClaveCargo = e.value;
    this.btnBuscar();
  }
  ChangeAreaCapturaConfig(e): void{
    this.DatFormularioConfig.claveArea = e.value;
    this.DatFormularioConfig.nombreArea = e.value + ' - ' + e.data.nombre;
    this.CamposObligatoriosConfig.claveArea = false;
  }
  ChangeCargoConfig(e): void{
    this.DatFormularioConfig.claveCargo = e.value;
    this.DatFormularioConfig.nombreCargo = e.value + ' - ' + e.data.nombre;
    this.CamposObligatoriosConfig.claveCargo = false;
  }
  Agregar(): void {
    this.Servicio.Agregar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          this.blockUI.stop();
          this.LimpiarDes();
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
          swal.fire(
            '',
            'Los Datos fueron editados correctamente',
            'success'
          );
          this.blockUI.stop();
          this.LimpiarDes();
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
  btnGuardarConfig(): void {
    this.blockUI.start('Cargando...');
    const validar = this.ValidacionesConfig();
    if (validar.val) {
      if (this.TipoAccionConfig === 'A') {
        this.AgregarCongig();
      } else {
        this.EditarConfig();
      }
    } else {
      this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }
  }
  AgregarCongig(): void {
    this.blockUI.stop();
    this.GuardarConfig({datos:this.DatFormularioConfig , tipoAccion:'A'});
  }
  EditarConfig(): void {
    this.blockUI.stop();
    this.GuardarConfig({datos:this.DatFormularioConfig, tipoAccion:'M'});
  }
  GuardarConfig(e): void {
    this.btnCerrarModalConfig();
    const Datos = cloneDeep(this.DatosGrid);

    let warning = false;

    if(e.tipoAccion === 'A'){
      for (const iterator of Datos) {
        if(iterator.claveArea === e.datos.claveArea && iterator.claveCargo === e.datos.claveCargo){
          warning = true;
          swal.fire(
            '',
            'No se puede agregar en la lista, ya se encuentra un registro con la configuración.',
            'warning'
          );
          break;
        }
      }
      if(warning){
        return;
      }
      Datos.push(e.datos);
    } else {
      for (const iterator of Datos) {
        if (iterator.claveArea === e.datos.claveArea && iterator.claveCargo === e.datos.claveCargo){
          iterator.balance =  e.datos.balance;
          iterator.objetivoEst = e.datos.objetivoEst;
          iterator.objetivoMax = e.datos.objetivoMax;
        }
      }

    }

    this.DatosGrid = Datos;
    this.btnBuscar();
    this.LimpiarConfig();
  }
  ValidacionesDes(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };
    if (this.DatFormulario.descripcionDesperdicio === '') {
      Validar.val = false;
      this.CamposObligatorios.descripcionDesperdicio = true;
    }
    if (this.DatFormulario.datConfiAreaDes.length === 0 ){
      Validar.val = false;
      Validar.mensaje = 'La captura debe de tener por lo menos una configuración del área de desperdicio';
    }
    return Validar;
  }
  ValidacionesConfig(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };
    if (this.DatFormularioConfig.claveArea === '') {
      Validar.val = false;
      this.CamposObligatoriosConfig.claveArea = true;
    }
    if (this.DatFormularioConfig.claveCargo === '') {
      Validar.val = false;
      this.CamposObligatoriosConfig.claveCargo = true;
    }
    if (this.DatFormularioConfig.objetivoEst === 0 || this.DatFormularioConfig.objetivoEst.toString() === '') {
      Validar.val = false;
      this.CamposObligatoriosConfig.estandar = true;
    }
    if (this.DatFormularioConfig.objetivoMax === 0 || this.DatFormularioConfig.objetivoMax.toString() === '') {
      Validar.val = false;
      this.CamposObligatoriosConfig.maximo = true;
    }

    return Validar;
  }
  LimpiarDes(): void {
    this.DatFormulario = {
      descripcionDesperdicio: '',
      idDesperdicio: 0,
      aplicaImpresora: false,
      aplicaCorrugadora: false,
      aplicaAcabado: false,
      aplicaRecuperacionCaja: false,
      datConfiAreaDes: []
    };
    this.CamposObligatorios = {
      descripcionDesperdicio: false
    };
    this.DatosFiltrados = [];
    this.DatosGrid = [];
    this.LimpiarConfig();
  }
  LimpiarConfig(): void {
    this.btnNombreConfig = 'Agregar';
    this.TipoAccionConfig = 'A';
    this.disArea = false;
    this.disCargo = false;
    this. DatFormularioConfig = {
      claveArea: '',
      claveCargo: '',
      nombreArea: '',
      nombreCargo: '',
      balance: false,
      estatus: false,
      objetivoEst: 0,
      objetivoMax: 0,
    };
    this.CamposObligatoriosConfig = {
      claveArea: false,
      claveCargo: false,
      estandar: false,
      maximo: false
    };
  }
  keyupDescripcionMayus(e): void {
    const input = e.target;
    this.DatFormulario.descripcionDesperdicio = input.value.toUpperCase();
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
