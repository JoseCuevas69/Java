import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdlmodpreparacion',
  templateUrl: './mdlmodpreparacion.component.html',
  styleUrls: ['./mdlmodpreparacion.component.css'],
})
export class MdlmodpreparacionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.Preparacion = value.claveProceso.trim();
      this.HorasProd = value.kgPapel;
      this.MetrosLineales = value.metrosLineales;
      this.Programa = value.programa;
      this.Articulo = value.claveArticulo;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();
  Preparacion = 'S/N';
  HorasProd = null;
  MetrosLineales = null;
  Programa = null;
  Articulo = '';
  VelStd = 0;

  constructor(public Servicio: SecuenciaCorrugadoraService) {}

  ngOnInit(): void {}
  async BuscarVelocidadStdCorr(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetVelocidadStdCorr(this.Articulo).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdlmodpreparacion', 'GetVelocidadStdCorr', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarVelocidadStdCorr)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarVelocidadStdCorr)' +
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
  async BuscarTiempoEstandarPrep(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetTiempoEstandarPrep(this.Preparacion).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdlmodpreparacion',
              'GetTiempoEstandarPrep',
              Datos.data
            );
            let MinStdPrep = 0;
            if (Datos.data.length !== 0) {
              MinStdPrep = Datos.data[0].tiempostd;
            } else {
              MinStdPrep = 0;
            }

            resolve(MinStdPrep);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarTiempoEstandarPrep)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarTiempoEstandarPrep)' +
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
  async BuscarMaquinasEficiencia(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetMaquinasEficiencia().subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdlmodpreparacion',
              'GetMaquinasEficiencia',
              Datos.data
            );
            resolve(Datos.data[0].eficiencia);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarTiempoEstandarPrep)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarTiempoEstandarPrep)' +
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
  async Calcular(): Promise<any> {
    let lVelStd = 0;

    if (this.VelStd > 0) {
      lVelStd = this.VelStd;
    }

    const VelocidadStdCorr = await this.BuscarVelocidadStdCorr();
    if (VelocidadStdCorr.length !== 0) {
      if (VelocidadStdCorr.velocidadStdCorr > 0) {
        lVelStd = VelocidadStdCorr.velocidadStdCorr;
      }
    }

    const tiempo = this.MetrosLineales / (lVelStd / 60);
    const horas = tiempo / 60;
    this.HorasProd = horas;
  }
  Limpiar(): void {
    this.Preparacion = '';
    this.HorasProd = null;
    this.MetrosLineales = null;
    this.Programa = null;
    this.Articulo = '';
    this.VelStd = 0;
  }
  async btnGuardar(): Promise<any> {
    this.blockUI.start('Guardar...');
    let TMinStdPrep = await this.BuscarTiempoEstandarPrep();

    let lVelStd = 0;

    if (this.VelStd > 0) {
      lVelStd = this.VelStd;
    }

    const VelocidadStdCorr = await this.BuscarVelocidadStdCorr();
    if (VelocidadStdCorr.length !== 0) {
      if (VelocidadStdCorr[0].velocidadStdCorr > 0) {
        lVelStd = VelocidadStdCorr[0].velocidadStdCorr;
      }
      if (VelocidadStdCorr[0].setUp > 0) {
        TMinStdPrep = VelocidadStdCorr[0].setUp;
      }
    }

    const Tiempo = this.MetrosLineales / lVelStd === 0 ? 1 : lVelStd;
    const Eficiencia = await this.BuscarMaquinasEficiencia();

    const datos = {
      Programa: this.Programa,
      ClaveProceso: this.Preparacion,
      MinutosStdPreparacion: TMinStdPrep,
      VelocidadStd: lVelStd,
      EficienciaPrograma: Eficiencia,
      MinutosStdProduccion: Tiempo
    };

    console.log(datos, 'datos de mandar');

    this.ModificaPreparacion(datos);
  }
  ModificaPreparacion(datos: any): void {
    this.Servicio.ModificaPreparacion(datos).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('El cambio se realizó con éxito', '', 'success');
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
          'Ha Ocurrio un Error (ModificaPreparacion),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }
  btnCalculaDatos(): void {
    this.Calcular();
  }
  ChangeClavePrepa(e): void {
    this.Preparacion = e.clave;
    this.VelStd = e.Data.eficiencia;
  }
}
