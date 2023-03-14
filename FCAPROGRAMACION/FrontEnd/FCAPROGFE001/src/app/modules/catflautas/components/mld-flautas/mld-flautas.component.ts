import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Corrugado, Flauta } from 'src/app/models/Flauta';
import { FlautasService } from 'src/app/services/flautas.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { round } from 'lodash';
import { data } from 'jquery';

@Component({
  selector: 'mld-flautas',
  templateUrl: './mld-flautas.component.html',
  styleUrls: ['./mld-flautas.component.css']
})
export class MldFlautasComponent implements OnInit {
  corrugados = [];
  DatCmb = new Array<Corrugado>();
  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
    }
     if (this.TipoAccion === 'M'){
       this.DesFlauta = true;
       this.DesFactorMTS= true;
     } else {
       this.DesFlauta = false;
       this.DesFactorMTS= true;
     }
  }
  DesFlauta = false;
  DesFactorMTS = false;

  @Output() ClickbtnCerrar = new EventEmitter<any>();
  DatFormulario: Flauta = {
    flauta: '',
    factor1: 0,
    factor2: 0,
    factor3: 0,
    pegamento: 0,
    corrugado: '',
    laminasmt: 0,
    factormts: 0,
    piezaspulgadas: 0
  };
  CamposObligatorios = {
    flauta: false,
    corrugado: false,
    laminasmt:false,
  };
  constructor(public Servicio: FlautasService) { }

  ngOnInit(): void {
    this.getCorrugados();
  }
  selectCorrugado(obj: any): void{
    this.DatFormulario.corrugado=obj.data.corrugado;
    
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
  Agregar(): void {
    if (this.DatFormulario.factormts === 0 ){
      this.DatFormulario.factormts = 0
    }
    if (this.DatFormulario.piezaspulgadas === 0 ){
      this.DatFormulario.piezaspulgadas = 0
    }
    this.DatFormulario.factor1 = Number(this.DatFormulario.factor1);
    this.DatFormulario.factor2 = Number(this.DatFormulario.factor2);
    this.DatFormulario.factor3 = Number(this.DatFormulario.factor3);
    this.DatFormulario.piezaspulgadas = Number(this.DatFormulario.piezaspulgadas);
    this.DatFormulario.laminasmt = Number(this.DatFormulario.laminasmt);
    this.DatFormulario.pegamento = Number(this.DatFormulario.pegamento);
    if(this.DatFormulario.factormts === 0){
      const divi = (2.54/3.5)
      this.DatFormulario.factormts = (divi/100);
    }
    
    this.Servicio.Agregar(this.DatFormulario).subscribe(
      (data: any) => {
        this.blockUI.stop();
       if(data.data.valida === 0){
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
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
      }else{
        swal.fire(
          '',
          'Flauta existente. ' + data.mensaje,
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
    this.DatFormulario.factor1 = Number(this.DatFormulario.factor1);
    this.DatFormulario.factor2 = Number(this.DatFormulario.factor2);
    this.DatFormulario.factor3 = Number(this.DatFormulario.factor3);
    this.DatFormulario.piezaspulgadas = Number(this.DatFormulario.piezaspulgadas);
    this.DatFormulario.laminasmt = Number(this.DatFormulario.laminasmt);
    this.DatFormulario.pegamento = Number(this.DatFormulario.pegamento);
    this.Servicio.Editar(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          this.blockUI.stop();
          // this.Limpiar();
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
    if (this.DatFormulario.flauta === '') {
      Validar.val = false;
      this.CamposObligatorios.flauta = true;
    }
    if (this.DatFormulario.corrugado === '') {
      Validar.val = false;
      this.CamposObligatorios.corrugado = true;
    }
    if (this.DatFormulario.laminasmt === 0) {
      Validar.val = false;
      this.CamposObligatorios.laminasmt = true;
    }
    return Validar;
  }
  Limpiar(): void {
    this.DatFormulario = {
      flauta: '',
      factor1: 0,
      factor2: 0,
      factor3: 0,
      corrugado: '',
      factormts: 0,
      laminasmt: 0,
      pegamento: 0,
      piezaspulgadas:0,
    };
  }
  async getCorrugados(): Promise<void> {
    this.DatCmb = await this.obtenerCorrugados();
  }

  async obtenerCorrugados(): Promise<Array<any>> {
    const value: any = await this.Servicio.GetCorrugados();
   
    value.data.forEach(element => {
      this.corrugados.push({
        corrugados: element.corrugado,
        
      });
    });
    return this.corrugados;
  }
}
