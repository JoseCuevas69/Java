import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdlfiltroreporte',
  templateUrl: './mdlfiltroreporte.component.html',
  styleUrls: ['./mdlfiltroreporte.component.css'],
})
export class MdlfiltroreporteComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  rdoAntiguedad = true;

  disAntiguedadDia = true;
  disMes = false;
  disAnio = false;

  Anios = [];
  DatosLisSecuencias = [];
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (value.length !== 0) {
      this.DatosLisSecuencias = value;
    }
  }
  @Output() DatosLisSecuenciasOut = new EventEmitter<any>();
  @Output() ClickbtnCerrar = new EventEmitter<any>();

  DatFormulario = {
    anio: null,
    mes: null,
    antiguedadDia: '',
    antiguedadIguala: 1,
    almacen: 0,
    numRollo: 0,
    fechaFinDeMes: '',
    cierre: false,
  };
  AtiguedadDia = '';
  constructor(public Servicio: SecuenciaCorrugadoraService, public formatter: NgbDateParserFormatter) {}

  ngOnInit(): void {
    this.Comboanio();
  }

  btnAceptar(): any {
    this.blockUI.start('Cargando...');
    const validar = this.Validar();
    if (validar.val) {
      // Asigna la fecha fin de mes
      this.DatFormulario.fechaFinDeMes = this.obtenerFechaFinDeMes(
        this.DatFormulario.anio,
        this.DatFormulario.mes
      );
      if (this.rdoAntiguedad) {
        this.DatFormulario.cierre = false;
        this.BuscaCierre();
        this.InsertaFiltros(this.DatFormulario);
      } else {
        this.DatFormulario.cierre = true;
        this.BuscarDia();
        this.InsertaFiltros(this.DatFormulario);
      }
      this.Limpiar();
      this.ClickbtnCerrar.emit();
    } else {
      this.blockUI.stop();
      swal.fire('', validar.tex, 'error');
    }
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  ChangeAntiguedad(e): void {
    this.rdoAntiguedad = e;
    this.BloquearCamposAntiguedad(e);
  }
  BloquearCamposAntiguedad(valor): void {
    if (valor) {
      this.disAntiguedadDia = true;
      this.disMes = false;
      this.disAnio = false;
    } else {
      this.disAntiguedadDia = false;
      this.disMes = true;
      this.disAnio = true;
    }
  }
  Limpiar(): void {
    this.DatFormulario = {
      anio: null,
      mes: null,
      antiguedadDia: '',
      antiguedadIguala: 1,
      almacen: 0,
      numRollo: 0,
      fechaFinDeMes: '',
      cierre: false,
    };
    this.AtiguedadDia = '';
    this.rdoAntiguedad = true;

    this.disAntiguedadDia = true;
    this.disMes = false;
    this.disAnio = false;
    this.Comboanio();
  }
  Validar(): any {
    const val = {
      val: true,
      tex: '',
    };
    if (
      this.DatFormulario.numRollo === null ||
      this.DatFormulario.numRollo === 0
    ) {
      val.val = false;
      val.tex = 'Falta Especificar el No de Rollos';
    }
    if (this.DatFormulario.almacen === 0) {
      val.val = false;
      val.tex = 'Falta Especificar el Almacen';
    }
    if (!this.rdoAntiguedad){
      if (this.AtiguedadDia === ''){
        val.val = false;
        val.tex = 'Falta Especificar la Fecha';
      }
    }
    return val;
  }
  Comboanio(): void {
    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    const anioini = Year - 20;
    const aniofin = Year + 5;
    for (let index = anioini; index < aniofin; index++) {
      this.Anios.push(index);
    }
    this.DatFormulario.anio = Year;
    this.DatFormulario.mes = Month;
  }
  async BuscaCierre(): Promise<any> {
    const dat = await this.PapelAntiguoCierreMes(this.DatFormulario);

    for (const iterator of this.DatosLisSecuencias) {
      let Comentarios = '';
      const elementfil = [];
      for (let index = 0; index < dat.length; index++) {
        const element = dat[index];
        if (
          element.tipoPapel.trim() === iterator.liner1.trim() &&
          element.ancho === iterator.anchoL1
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.liner2.trim() &&
          element.ancho === iterator.anchoL2
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.liner3.trim() &&
          element.ancho === iterator.anchoL3
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.liner4.trim() &&
          element.ancho === iterator.anchoL4
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.corrugado1.trim() &&
          element.ancho === iterator.anchoC1
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.corrugado2.trim() &&
          element.ancho === iterator.anchoC2
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.corrugado3.trim() &&
          element.ancho === iterator.anchoC3
        ) {
          elementfil.push(element);
        }
      }
      let ComRollos = '';
      let tipoPapel = '';
      if (elementfil.length !== 0) {
        for (let index = 0; index < this.DatFormulario.numRollo; index++) {
          const element = elementfil[index];
          ComRollos += element.articulo.trim() + ' ';
          tipoPapel = element.tipoPapel.trim();
        }
        Comentarios =
          'USAR ROLLOS: ' + ComRollos + ' DE ' + tipoPapel + ' ANTIGUO /';
      }
      let comensinRollo = '';
      if (Comentarios !== '') {
        if (iterator.comentarios.includes('|')) {
          comensinRollo = iterator.comentarios.substring(
            0,
            iterator.comentarios.indexOf('|') - 1
          );
          iterator.comentarios = comensinRollo + '| ' + Comentarios;
          Comentarios = '';
        } else {
          iterator.comentarios = iterator.comentarios + '| ' + Comentarios;
          Comentarios = '';
        }
      } else {
        if (Comentarios !== '') {
          comensinRollo = iterator.comentarios.substring(
            0,
            iterator.comentarios.indexOf('|') - 1
          );
          iterator.comentarios = comensinRollo;
        }
      }
      if (iterator.comentarios.length > 500) {
        swal.fire(
          'Datos',
          'El Programa ' +
            iterator.programa +
            ' Se Excede en la Longitud del Comentario, se Guardara Incompleto',
          'error'
        );
      }
    }
    this.DatosLisSecuenciasOut.emit(this.DatosLisSecuencias);
  }
  async BuscarDia(): Promise<any> {
    this.DatFormulario.antiguedadDia = this.Formatofecha(this.AtiguedadDia);
    const dat = await this.BuscarAntiguedadDia(this.DatFormulario);

    for (const iterator of this.DatosLisSecuencias) {
      let Comentarios = '';
      const elementfil = [];
      for (let index = 0; index < dat.length; index++) {
        const element = dat[index];
        if (
          element.tipoPapel.trim() === iterator.liner1.trim() &&
          element.ancho === iterator.anchoL1
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.liner2.trim() &&
          element.ancho === iterator.anchoL2
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.liner3.trim() &&
          element.ancho === iterator.anchoL3
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.liner4.trim() &&
          element.ancho === iterator.anchoL4
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.corrugado1.trim() &&
          element.ancho === iterator.anchoC1
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.corrugado2.trim() &&
          element.ancho === iterator.anchoC2
        ) {
          elementfil.push(element);
        } else if (
          element.tipoPapel.trim() === iterator.corrugado3.trim() &&
          element.ancho === iterator.anchoC3
        ) {
          elementfil.push(element);
        }
      }
      let ComRollos = '';
      let tipoPapel = '';
      if (elementfil.length !== 0) {
        for (let index = 0; index < this.DatFormulario.numRollo; index++) {
          const element = elementfil[index];
          ComRollos += element.articulo.trim() + ' ';
          tipoPapel = element.tipoPapel.trim();
        }
        Comentarios =
          'USAR ROLLOS: ' + ComRollos + ' DE ' + tipoPapel + ' ANTIGUO /';
      }
      let comensinRollo = '';
      if (Comentarios !== '') {
        if (iterator.comentarios.includes('|')) {
          comensinRollo = iterator.comentarios.substring(
            0,
            iterator.comentarios.indexOf('|') - 1
          );
          iterator.comentarios = comensinRollo + '| ' + Comentarios;
          Comentarios = '';
        } else {
          iterator.comentarios = iterator.comentarios + '| ' + Comentarios;
          Comentarios = '';
        }
      } else {
        if (Comentarios !== '') {
          comensinRollo = iterator.comentarios.substring(
            0,
            iterator.comentarios.indexOf('|') - 1
          );
          iterator.comentarios = comensinRollo;
        }
      }
      if (iterator.comentarios.length > 500) {
        swal.fire(
          'Datos',
          'El Programa ' +
            iterator.programa +
            ' Se Excede en la Longitud del Comentario, se Guardara Incompleto',
          'error'
        );
      }
    }
    this.DatosLisSecuenciasOut.emit(this.DatosLisSecuencias);
  }
  async PapelAntiguoCierreMes(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetPapelAntiguoCierreMes(params).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdlfiltroreporte',
              'GetPapelAntiguoCierreMes',
              Datos.data
            );
            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (PapelAntiguoCierreMes)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (PapelAntiguoCierreMes)' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
      );
    });
  }
  async BuscarAntiguedadDia(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetBuscarAntiguedadDia(params).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdlfiltroreporte',
              'GetBuscarAntiguedadDia',
              Datos.data
            );
            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (GetBuscarAntiguedadDia)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (GetBuscarAntiguedadDia)' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
      );
    });
  }
  InsertaFiltros(params: any): void {
      this.Servicio.InsertaFiltros(params).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdlfiltroreporte', 'InsertaFiltros', Datos.data);
            this.blockUI.stop();
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (InsertaFiltros)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (InsertaFiltros)' +
              ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
              ' <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
      );
  }
  obtenerFechaFinDeMes(anio, mes): string {
    const fechaFin = new Date();
    console.log(this.FormatearFecha(new Date(anio, mes, 0)));
    return this.FormatearFecha(new Date(anio, mes, 0));
  }
  FormatearFecha(fecha): string {
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    return `${fecha.getFullYear()}${(mes < 10 ? '0' : '').concat(mes)}${(dia <
    10
      ? '0'
      : ''
    ).concat(dia)}`;
  }
  Formatofecha(fecha): string {
    const aux = this.formatter.parse(fecha);
    let Fecha = '';
    let dia = '';
    let mes = '';

    if (aux.day <= 9) {
      dia = '0' + aux.day;
    } else {
      dia = aux.day.toString();
    }
    if (aux.month <= 9) {
      mes = '0' + aux.month;
    } else {
      mes = aux.month.toString();
    }

    Fecha = aux.year + mes + dia;
    return Fecha;
  }
}
