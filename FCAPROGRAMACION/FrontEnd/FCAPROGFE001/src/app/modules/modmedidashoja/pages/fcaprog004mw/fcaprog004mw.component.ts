import { Component, OnInit, ViewChild } from '@angular/core';
import { MedidasHojaService } from 'src/app/services/Programacion/MedidasHoja.service';
import swal from 'sweetalert2';
import { MathHelper } from 'src/app/models/common/MathHelper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
interface Filtros {
  filtro: string;
}

@Component({
  selector: 'app-fcaprog004mw',
  templateUrl: './fcaprog004mw.component.html',
  styleUrls: ['./fcaprog004mw.component.css'],
})
export class Fcaprog004mwComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  round = new MathHelper();
  // PPricipal
  filtros: Filtros = { filtro: '' };

  Datos = {};

  DatosPagPrincipal = {
    articuloNombre: '',
    claveArticulo: '',
    flauta: '',
    claveDiseno: '',
    resistencia: '',
    anchoDes: 0,
    largoDes: 0,
    pzasxAncho: 0,
    pzasxLargo: 0,
    piezasXHoja : 0,
    conScore: false,
    aumLargo: 0,
    aumAncho: 0,
    anchoHoja: 0,
    largoHoja: 0,
    soloLamina: false,
  };

  disAumLargo = true;
  disAumAncho = true;
  disConScore = true;
  disSoloLamin = true;

  disCalcular = true;
  disAgregar = true;
  // Modal
  @ViewChild('mdl') private mdl: any;
  @ViewChild('modalArticulo') private modalArticulo: any;
  Titulo = '';
  IconoTitulo = '';
  TipoAccion = 'A';

  constructor(public Servicio: MedidasHojaService) {}
  ngOnInit(): void {}
  // =================PPrincipal=================//
  BuscarTipoCaja(): void {
    this.blockUI.start('Cargando...');
    this.Servicio.GetTipoCaja(this.filtros).subscribe(
      (res: any) => {
        this.blockUI.stop();
        this.DatosPagPrincipal.claveDiseno = res.data.claveDiseno;
        this.DatosPagPrincipal.piezasXHoja  = res.data.piezasXHoja;
        this.DatosPagPrincipal.soloLamina = res.data.soloLamina;
        this.DatosPagPrincipal.conScore = res.data.conScore;
        this.ChangeConscore(this.DatosPagPrincipal.conScore);
        this.DatosPagPrincipal.aumAncho = res.data.aumAncho;
        this.DatosPagPrincipal.aumLargo = res.data.aumLargo;
        this.DatosPagPrincipal.anchoHoja = res.data.anchoHoja;
        this.DatosPagPrincipal.largoHoja = res.data.largoHoja;
        this.DatosPagPrincipal.pzasxAncho = res.data.pzasxAncho;
        this.DatosPagPrincipal.pzasxLargo = res.data.pzasxLargo;
        this.mdlCerrarArticulo();
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
  btnAgregar(): void {
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-plus';
    this.Datos = {};
    this.mdl.openModal();
  }
  btnAbrirArticulo(): void {
    this.modalArticulo.openModal();
  }
  btnArtLimpiar(): void {
    this.DatosPagPrincipal.claveArticulo = '';
    this.DatosPagPrincipal.articuloNombre = '';
    this.Limpiar();
  }
  btnCalcular(): void {
    const pzasuaj = this.DatosPagPrincipal.pzasxLargo * this.DatosPagPrincipal.pzasxAncho;
    const ancHoj = this.DatosPagPrincipal.anchoDes * this.DatosPagPrincipal.pzasxAncho + this.DatosPagPrincipal.aumAncho;
    const larHoj = this.DatosPagPrincipal.largoDes * this.DatosPagPrincipal.pzasxLargo + this.DatosPagPrincipal.aumLargo;
    this.DatosPagPrincipal.piezasXHoja  = this.round.roundDecimals(pzasuaj.toString(), '2');
    this.DatosPagPrincipal.anchoHoja = this.round.roundDecimals(ancHoj.toString(), '2');
    this.DatosPagPrincipal.largoHoja = this.round.roundDecimals(larHoj.toString(), '2');
  }
  btnGuardar(): void {
    this.blockUI.start('Cargando...');
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
  ChangeConscore(e): void {
    this.DatosPagPrincipal.conScore = e;
    if (this.DatosPagPrincipal.conScore) {
      this.disAumAncho = true;
      this.DatosPagPrincipal.aumAncho = 0;
    } else {
      this.disAumAncho = false;
    }
  }
  Agregar(): void {
    this.Servicio.Agregar(this.DatosPagPrincipal).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          this.Limpiar();
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

    if (
      (this.DatosPagPrincipal.conScore === false && this.DatosPagPrincipal.aumLargo === 0) ||
      (this.DatosPagPrincipal.aumAncho === 0 && this.DatosPagPrincipal.soloLamina === false)
    ) {
      Validar.val = false;
      Validar.mensaje = 'Debe de capturar los datos donde indica el Aumento LARGO y ANCHO para proceder con la actualizacion';
    }
    if (this.DatosPagPrincipal.pzasxLargo === null) {
      Validar.val = false;
    }
    if (this.DatosPagPrincipal.pzasxAncho === null) {
      Validar.val = false;
    }
    if (this.DatosPagPrincipal.piezasXHoja  === null) {
      Validar.val = false;
    }
    if (this.DatosPagPrincipal.anchoHoja === null || this.DatosPagPrincipal.anchoHoja === 0) {
      Validar.val = false;
      Validar.mensaje = 'La cantidad del Ancho Hoja no puede ser 0...';
    }
    if (this.DatosPagPrincipal.largoHoja === null || this.DatosPagPrincipal.largoHoja === 0) {
      Validar.val = false;
      Validar.mensaje = 'La cantidad del Largo Hoja no puede ser 0...';
    }
    if ( this.DatosPagPrincipal.aumAncho === null){
      Validar.val = false;
    }
    if (this.DatosPagPrincipal.aumLargo === null){
      Validar.val = false;
    }
    if (this.DatosPagPrincipal.piezasXHoja  > 0) {
      const val = this.DatosPagPrincipal.pzasxLargo * this.DatosPagPrincipal.pzasxAncho;
      if (val !== this.DatosPagPrincipal.piezasXHoja ){
        Validar.val = false;
        Validar.mensaje = 'Las Piezas Suaje No Coninciden con la Multiplicacion de Largo por Ancho';
      }

    }
    return Validar;
  }
  Limpiar(): void {
    this.DatosPagPrincipal = {
      articuloNombre: '',
      claveArticulo: '',
      flauta: '',
      claveDiseno: '',
      resistencia: '',
      anchoDes: 0,
      largoDes: 0,
      pzasxAncho: 0,
      pzasxLargo: 0,
      piezasXHoja : 0,
      conScore: false,
      aumLargo: 0,
      aumAncho: 0,
      anchoHoja: 0,
      largoHoja: 0,
      soloLamina: false,
    };

    this.disAumLargo = true;
    this.disAumAncho = true;
    this.disConScore = true;
    this.disSoloLamin = true;

    this.disCalcular = true;
    this.disAgregar = true;
  }
  // =================Modal=================//
  SelArticuloAgregar(e): void {
    this.DatosPagPrincipal.articuloNombre = e.descripcion;
    this.DatosPagPrincipal.claveArticulo = e.claveArticulo;
    this.DatosPagPrincipal.flauta = e.flauta;
    this.filtros.filtro = e.claveArticulo;
    this.DatosPagPrincipal.resistencia = e.resistencia;
    this.DatosPagPrincipal.anchoDes = e.anchoDes;
    this.DatosPagPrincipal.largoDes = e.largoDes;

    this.disAumLargo = false;
    this.disAumAncho = false;
    this.disConScore = false;
    this.disSoloLamin = false;

    this.disCalcular = false;
    this.disAgregar = false;
    this.BuscarTipoCaja();
  }
  mdlCerrarArticulo(): void {
    this.modalArticulo.closeModal();
  }
}
