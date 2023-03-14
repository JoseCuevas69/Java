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
  selector: 'mdlimprimir',
  templateUrl: './mdlimprimir.component.html',
  styleUrls: ['./mdlimprimir.component.css'],
})
export class MdlimprimirComponent implements OnInit {
  TipoRep = '';
  InfoRad = '';
  TamanioPag = '';
  optFechas = false;
  Tipofiltro = null;
  Zona = '';
  lbltex = 'Rango de Secuencia a Imprimir:';
  phtex = 'Ejemplo: 1-5';

  Rango = '';
  FechaMin;
  FechaMax;

  disPag = true;

  filOrdenMin = null;
  filOrdenMax = null;
  filFechaMin = '';
  filFechaMax = '';
  filClaveArt = '';
  filOp = '';

  @Input() set TipoReporte(value: any) {
    this.Limpiar();
    if (value !== '') {
      this.TipoRep = value;
      this.InfoRad = 'RS';
      this.TamanioPag = 'TC';
      if (value === 'B') {
        this.disPag = false;
      } else {
        this.disPag = true;
      }
    }
  }

  @Output() ClickbtnCerrar = new EventEmitter<any>();

  constructor(
    public Servicio: SecuenciaCorrugadoraService,
    public formatter: NgbDateParserFormatter
  ) {
    this.Zona = localStorage.getItem('Zona');
  }

  ngOnInit(): void {}
  ChangeInfoRad(e): void {
    this.InfoRad = e;
    this.Limpiar();
    switch (this.InfoRad) {
      case 'RS':
        this.phtex = 'Ejemplo: 1-5';
        this.lbltex = 'Rango de Secuencia a Imprimir:';
        break;
      case 'CVA':
        this.phtex = '';
        this.lbltex = 'Clave Artículo:';
        break;
      case 'OP':
        this.phtex = '';
        this.lbltex = 'OP:';
        break;
      default:
        break;
    }
  }
  Changefechamin(e): void {
    this.FechaMin = e;
    this.filFechaMin = this.Formatofecha(e);
  }
  Changefechamax(e): void {
    this.FechaMax = e;
    this.filFechaMax = this.Formatofecha(e);
  }
  btnAceptar(): any {
    if (this.optFechas) {
    }
    switch (this.InfoRad) {
      case 'RS':
        const numsRango = this.Rango.split('-', 2);
        if (numsRango.length === 2) {
          this.filOrdenMin = +numsRango[0];
          this.filOrdenMax = +numsRango[1];
        } else {
          this.filOrdenMin = +numsRango[0];
          this.filOrdenMax = +numsRango[0];
        }
        this.Tipofiltro = 1;
        if (
          Number.isNaN(this.filOrdenMin) ||
          this.filOrdenMin === null ||
          Number.isNaN(this.filOrdenMax) ||
          this.filOrdenMax === null
        ) {
          swal.fire(
            'Error',
            'Introduza Correctamente los Rangos de Impresión...',
            'error'
          );
          return;
        }
        break;
      case 'CVA':
        this.filClaveArt = this.Rango;

        if (this.filClaveArt === '') {
          swal.fire(
            'Error',
            'El campo clave articulo no puede esta vacío...',
            'error'
          );
          return;
        }

        if (this.filFechaMin === '' || this.FechaMax === '') {
          swal.fire(
            'Error',
            'Los campos de fecha no pueden estar vacíos...',
            'error'
          );
          return;
        }
        this.Tipofiltro = 2;
        break;
      case 'OP':
        this.filOp = this.Rango;
        if (this.filOp === '') {
          swal.fire('Error', 'El campo Op no puede esta vacío...', 'error');
          return;
        }
        this.Tipofiltro = 3;
        break;
      default:
        break;
    }

    this.Reporte();
  }
  Reporte(): void {
    let url =
      'http://intranet2.cecso.com.mx/erpweb2012/Sistemas/ASS005MW/OpenSRS.aspx?servidorSRS=';
    switch (this.TipoRep) {
      case 'A':
        url +=
          'http://datos.cecso.com.mx/ServerRS&usuarioSRS=reportes&pswSRS=R3portes16&NombreSRS=Reportecplcap010&rutaSRS=/FCACajas/FCAPROG/Reportecplcap010&parametrosSRS=';
        break;
      case 'B':
        if (this.TamanioPag === 'TC') {
          url +=
            'http://datos.cecso.com.mx/ServerRS&usuarioSRS=reportes&pswSRS=R3portes16&NombreSRS=Reportecplcap010B&rutaSRS=/FCACajas/FCAPROG/Reportecplcap010B&parametrosSRS=';
        } else {
          url +=
            'http://datos.cecso.com.mx/ServerRS&usuarioSRS=reportes&pswSRS=R3portes16&NombreSRS=Reportecplcap010B-2&rutaSRS=/FCACajas/FCAPROG/Reportecplcap010B-2&parametrosSRS=';
        }
        break;
      case 'C':
        url +=
          'http://datos.cecso.com.mx/ServerRS&usuarioSRS=reportes&pswSRS=R3portes16&NombreSRS=Reportecplcap010C&rutaSRS=/FCACajas/FCAPROG/Reportecplcap010C&parametrosSRS=';
        break;
      case 'D':
        url +=
          'http://datos.cecso.com.mx/ServerRS&usuarioSRS=reportes&pswSRS=R3portes16&NombreSRS=Reportecplcap010D&rutaSRS=/FCACajas/FCAPROG/Reportecplcap010D&parametrosSRS=';
        break;
      default:
        break;
    }
    url += 'Zona?' + this.Zona + ',tipofiltro?' + this.Tipofiltro;
    if (this.Tipofiltro === 1) {
      url += ',OrdenMin?' + this.filOrdenMin + ',OrdenMax?' + this.filOrdenMax;
    } else if (this.Tipofiltro === 2) {
      url +=
        ',ClaveArt?' +
        this.filClaveArt +
        ',FechaMin?' +
        this.filFechaMin +
        ',FechaMax?' +
        this.filFechaMax;
    } else if (this.Tipofiltro === 3) {
      url += ',Op?' + this.filOp;
    }

    url += '&val=ITEwISE5IYm6EzYVbD1SSzdhl50s';
    window.open(url, '_blank');
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  Limpiar(): void {
    this.FechaMin = '';
    this.FechaMax = '';
    this.Rango = '';
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
