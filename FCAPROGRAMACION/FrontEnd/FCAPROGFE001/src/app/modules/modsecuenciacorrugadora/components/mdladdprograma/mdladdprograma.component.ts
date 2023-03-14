import { count } from 'rxjs/operators';
import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SecuenciaCorrugadoraService } from 'src/app/services/Programacion/secuenciacorrugadora.service';
import { ProgramaImpresorasDinamicoService } from 'src/app/services/Programacion/ProgramaImpresorasDinamico.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { cloneDeep, result } from 'lodash-es';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mdladdprograma',
  templateUrl: './mdladdprograma.component.html',
  styleUrls: ['./mdladdprograma.component.css'],
})
export class MdladdprogramaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  DatosGrid = [];
  columnDefs: any;

  EspProc = '';
  EProcesoCorr = '';
  Articulo = '';

  disEspProcImp = false;

  DatosGridPrincipal = [];
  IconoTitulo = '';
  DatosModPreparacion = {};

  DatosConsultarOp = {};

  Zona = '';
  wProgramaAut = false;

  OPsDinamico = [];

  @ViewChild('mdlModPreparacion') private mdlModPreparacion: any;
  @ViewChild('mdlModConsultarOp') private mdlModConsultarOp: any;

  @Input() set Datos(value: any) {
    this.Limpiar();
    if (Object.keys(value).length !== 0) {
      this.DatosGridPrincipal = value;
      this.BuscarProgramas();
    }
  }

  @Output() ClickbtnCerrar = new EventEmitter<any>();
  @Output() wProgramaAutChange = new EventEmitter<any>();

  constructor(
    public Servicio: SecuenciaCorrugadoraService,
    public ServicioProg: ProgramaImpresorasDinamicoService
  ) {
    this.Zona = localStorage.getItem('Zona');
    this.columnDefs = [
      {
        headerName: 'Sec',
        field: 'Sec',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
        cellRenderer: 'hybCellRenderer',
        cellRendererParams: {
          type: 'chk',
          change: this.GridChangeSec.bind(this),
        },
      },
      {
        headerName: 'ver',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridDetalle.bind(this),
          label: '<i class="far fa-eye"></i>',
          class: 'btn btn-info btn-sm',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Acciones',
        cellRenderer: 'popupCellRenderer',
        cellRendererParams: {
          label: '<i class="fas fa-bars"></i> ',
          class: 'btn btn-primary btn-sm',
          disabled: false,
          tipo: 'B1',
          Opciones: [
            {
              tex: 'Modifica Proceso',
              onclick: this.GridModProc.bind(this),
            },
            { tex: 'Consulta OPs', onclick: this.GridConsultaOps.bind(this) },
            { tex: 'Terminar', onclick: this.GridTerminar.bind(this) },
            { tex: 'Cancelar', onclick: this.GridCancelar.bind(this) },
          ],
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 100,
        maxWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: 'L.Maq.',
        field: '',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.GridbracketsFormatterLMaq.bind(this),
      },
      {
        headerName: 'Programa',
        field: 'programa',
        flex: 3,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'OP',
        field: 'op',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Ancho',
        field: 'anchoPromedio',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Resis',
        field: 'resistencia',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Flauta',
        field: 'flauta',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'TProceso',
        field: 'claveProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Kg.Papel',
        field: 'kgPapel',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tiempo',
        field: 'minutosstdproduccion',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'T/Fabricado',
        field: 'fijarFecha',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'M.L',
        field: 'metrosLineales',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Comentarios',
        field: 'comentarios',
        flex: 2,
        minWidth: 300,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripción Artículo',
        field: 'descripcion',
        flex: 2,
        minWidth: 200,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Secuencia',
        field: '',
        flex: 4,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'PapelDiferente',
        field: 'claveArticulo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'pintarCorr',
        field: 'proceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'PintarImp',
        field: '',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'EspProc',
        field: 'especificacion',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'EspProcCorr',
        field: 'eProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'MVT',
        field: 'mvt',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter: this.GridbracketsFormatterMVT,
      },
      {
        headerName: 'ComentariosMVT',
        field: 'comentariosMVT',
        flex: 2,
        minWidth: 100,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center',
      },
    ];
  }

  ngOnInit(): void {}
  BuscarProgramas(): void {
    this.Servicio.GetProgramas().subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
          console.log('mdlAddPrograma', 'GetProgramas', Datos.data);
          this.ValidarExistePrograma(Datos.data);
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (BuscarProgramas)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (BuscarProgramas)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  async BuscarValEstatusOp(Programa): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetValidaEstatusOP(Programa).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetValidaEstatusOP', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarValEstatusOp)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarValEstatusOp)' +
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
  async BuscarValidaOpApoyo(ClaveArticulo: any, OPApoyo: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetValidaOpApoyo(ClaveArticulo, OPApoyo).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetValidaOpApoyo', Datos.data);
            let Op = '';
            if (Datos.data.length !== 0) {
              Op = Datos.data.op;
            } else {
              Op = '';
            }

            resolve(Op);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarValidaOpApoyo)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarValidaOpApoyo)' +
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
  async BuscarPermitirProgramarOP(OP: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetPermitirProgramarOP(OP).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetPermitirProgramarOP', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarPermitirProgramarOP)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarPermitirProgramarOP)' +
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
  async BuscarValidacionEliminados(OP: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetValidacionEliminados(OP).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdladdprograma',
              'GetValidacionEliminados',
              Datos.data
            );

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarValidacionEliminados)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarValidacionEliminados)' +
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
  async BuscarPermitirProgramarOPApoyo(OP: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetPermitirProgramarOPApoyo(OP).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdladdprograma',
              'GetPermitirProgramarOPApoyo',
              Datos.data
            );

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarPermitirProgramarOPApoyo)' +
                Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarPermitirProgramarOPApoyo)' +
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
  async BuscarValidacionEliminadosOpApoyo(OP: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetValidacionEliminadosOpApoyo(OP).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdladdprograma',
              'GetValidacionEliminadosOpApoyo',
              Datos.data
            );

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarValidacionEliminadosOpApoyo)' +
                Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarValidacionEliminadosOpApoyo)' +
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
  async BuscarProcesoRadigrafias(OP: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetProcesoRadigrafias(OP).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetProcesoRadigrafias', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarProcesoRadigrafias)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarProcesoRadigrafias)' +
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
  async BuscarCombinacion(Programa: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.Servicio.GetCombinacion(Programa).subscribe(
        (Datos: any) => {
          console.log('mdladdprograma', 'GetCombinacion', Datos);
          resolve(Datos);
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarCombinacion)' +
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
  GridbracketsFormatterMVT(params): string {
    if (params.value) {
      return 'SI';
    } else {
      return 'NO';
    }
  }
  GridbracketsFormatterLMaq(params): string {
    console.log(params.data);
    if (params.data.opApoyoMaquila && params.data.tipoAcabado.trim() === '02') {
      return '©';
    } else {
      return '';
    }
  }
  async GridChangeSec(e): Promise<void> {
    if (e.value) {
      const valEstOp = await this.ValidarEstatusOp(e.data.programa);
      if (valEstOp) {
      } else {
        const Grid = cloneDeep(this.DatosGrid);
        for (const iterator of Grid) {
          if (iterator.programa === e.data.programa) {
            iterator.Sec = false;
            break;
          }
        }
        this.DatosGrid = Grid;
      }
    }
  }
  GridDetalle(e): void {
    console.log(e);
    this.EProcesoCorr = e.data.eProceso;
    this.EspProc = e.data.especificacion;
    this.Articulo = e.data.descripcion;
  }
  GridModProc(e): void {
    this.DatosModPreparacion = cloneDeep(e.data);
    this.IconoTitulo = 'fas fa-edit';
    this.mdlModPreparacion.openModal();
  }
  GridConsultaOps(e): void {
    this.IconoTitulo = 'far fa-eye';
    this.DatosConsultarOp = e.data;
    this.mdlModConsultarOp.openModal();
  }
  GridTerminar(e): void {
    swal
      .fire({
        title: 'Se Dará por Terminado el Programa : ' + e.data.programa,
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
          this.Servicio.Terminar(e.data.programa).subscribe(
            (data: any) => {
              if (data.correcto) {
                this.BuscarProgramas();
                swal.fire('', 'El programa fue terminado', 'success');
              } else {
                swal.fire(
                  '',
                  'Ocurrió un error al tratar de guardar los datos. ' +
                    data.mensaje,
                  'error'
                );
              }
            },
            (error) => {
              swal.fire(
                'Datos ',
                'Ha Ocurrio un Error (Terminar),' +
                  ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
                  ' <strong>Código de Error: ' +
                  error.error +
                  '</strong>',
                'error'
              );
            }
          );
        }
      });
  }
  GridCancelar(e): void {
    swal
      .fire({
        title:
          'Se Cancelará el Programa : ' +
          e.data.programa +
          ' y no Podrá ser Utilizado...Continuar?',
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
          this.Servicio.Cancelar(e.data.programa).subscribe(
            (data: any) => {
              if (data.correcto) {
                this.BuscarProgramas();
                swal.fire('', 'El programa fue cancelado', 'success');
              } else {
                swal.fire(
                  '',
                  'Ocurrió un error al tratar de guardar los datos. ' +
                    data.mensaje,
                  'error'
                );
              }
            },
            (error) => {
              swal.fire(
                'Datos ',
                'Ha Ocurrio un Error (Cancelar),' +
                  ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
                  ' <strong>Código de Error: ' +
                  error.error +
                  '</strong>',
                'error'
              );
            }
          );
        }
      });
  }
  async btnGuardar(): Promise<any> {
    this.blockUI.start();
    const RelacionProgramasParalelo = [];
    for (const iterator of this.DatosGrid) {
      if (iterator.Sec) {
        console.log('prueba', iterator);
        const OpFolio = iterator.op;
        const ClaveArticulo = iterator.claveArticulo;
        const OPCorte = iterator.op.split('-', 3);
        const OPApoyo = OPCorte[0] + '-' + OPCorte[2];
        const OPMaquila = await this.BuscarValidaOpApoyo(
          OPApoyo,
          ClaveArticulo
        );

        if (this.Zona === '01' && OPMaquila !== '') {
          const valPermOpApoyo = await this.PermitirProgramarOPApoyo(OPMaquila);
          if (!valPermOpApoyo) {
            swal.fire(
              'OPs sin Folios de Embarque.',
              'La OP ' +
                OpFolio +
                ' No tiene Folio de Embarque Generado. ' +
                'Favor de Comunicarse con Dpto Ventas',
              'error'
            );
            this.CorreoFaltaFolioEmpOpApoyo(OpFolio, OPMaquila);
          }
        } else if (this.Zona === '01' || this.Zona === '05') {
          const ValPermOp = await this.PermitirProgramarOP(OpFolio);

          if (!ValPermOp) {
            swal.fire(
              'OPs sin Folios de Embarque.',
              'La OP ' +
                OpFolio +
                ' No tiene Folio de Embarque Generado. ' +
                'Favor de Comunicarse con Dpto Ventas',
              'error'
            );
            this.CorreoFaltaFolioEmp(OpFolio);
          }
        }
        if (this.Zona === '02') {
          const ProcesoRadigrafias = await this.BuscarProcesoRadigrafias(
            OpFolio
          );

          if (ProcesoRadigrafias.length !== 0) {
            const resPreg = await this.PreguntarRadIngenieria(OpFolio);
            if (!resPreg) {
              return;
            } else {
              this.EnviaCorreoNotificacion(
                OpFolio,
                this.disEspProcImp,
                ClaveArticulo
              );
            }
          }
        }
        const Comentarios = iterator.comentarios;
        const lPrograma = iterator.programa;

        this.AgregarPrograma(lPrograma, Comentarios);
        if (this.disEspProcImp) {
          this.CambiaEstatusPro(lPrograma);
        }
        if (this.Zona === '02') {
          const Combinacion = await this.BuscarCombinacion(lPrograma);

          if (typeof Combinacion !== 'undefined') {
            this.ActivaFolioCombinacion(Combinacion);
          }
        }
        if (this.wProgramaAut) {
          if (lPrograma !== '') {
            RelacionProgramasParalelo.push({ Programa: lPrograma });
          }
        }
      }
    }
    await this.ProgramaImpresorasDinamico(RelacionProgramasParalelo);
    console.log(this.OPsDinamico, 'Datos recolectados Opdinamico');
    let lPresenta = false;
    for (const iterator of this.OPsDinamico) {
      if (iterator.op.trim() === '') {
        break;
      }
      if (iterator.txtPiezas !== 'Programado'){
        lPresenta = true;
      }
    }
    this.blockUI.stop();
    this.btnCerrar({}, {datos: this.OPsDinamico, presenta: lPresenta});
  }
  btnCerrar(e , obj): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit(obj);
  }
  btnCerrarModalPreparacion(): void {
    this.BuscarProgramas();
    this.mdlModPreparacion.closeModal();
  }
  btnCerrarModalConsultarOp(): void {
    this.mdlModConsultarOp.closeModal();
  }
  changeProgramaImp(e): void {
    this.disEspProcImp = e.checked;
    if (e.checked) {
      this.wProgramaAut = true;
    } else {
      this.wProgramaAut = false;
    }
  }
  ValidarExistePrograma(Programa): void {
    let ExistePrograma = false;
    const forDatosGrid = [];
    for (const datProg of Programa) {
      for (const datPagPrin of this.DatosGridPrincipal) {
        if (datProg.programa === datPagPrin.programa) {
          ExistePrograma = true;
          break;
        } else {
          ExistePrograma = false;
        }
      }
      if (!ExistePrograma) {
        forDatosGrid.push(datProg);
      }
    }
    this.DatosGrid = forDatosGrid;
  }
  async ValidarEstatusOp(Programa): Promise<any> {
    let Val = false;
    const EstatusOp = await this.BuscarValEstatusOp(Programa);
    if (EstatusOp.length === 0) {
      Val = true;
    } else {
      swal.fire(
        'Validación',
        'OP ' +
          EstatusOp[0].op +
          ' Con estatus CANCELADA ó SUSPENDIDA...Verifique',
        'error'
      );
      Val = false;
    }
    return Val;
  }
  async PermitirProgramarOP(OP: any): Promise<any> {
    const PermitirProgOp = await this.BuscarPermitirProgramarOP(OP);
    let boolReturn = false;
    let TipoCliente = 0;
    if (PermitirProgOp.length !== 0) {
      TipoCliente = PermitirProgOp[0].tipoCliente;
    }
    if (TipoCliente === 1) {
      const ValEliminados = await this.BuscarValidacionEliminados(OP);

      if (ValEliminados.length !== 0) {
        if (ValEliminados[0].antiguedad <= 30) {
          boolReturn = true;
        } else {
          boolReturn = false;
        }
      } else {
        boolReturn = false;
      }
    } else {
      boolReturn = true;
    }

    if (PermitirProgOp.length !== 0) {
      if (PermitirProgOp[0].esCecso) {
        boolReturn = true;
      }
    }
    return boolReturn;
  }
  async PermitirProgramarOPApoyo(OP: any): Promise<any> {
    const PermitirProgOpApoyo = await this.BuscarPermitirProgramarOPApoyo(OP);
    let boolReturn = false;
    let TipoCliente = 0;
    if (PermitirProgOpApoyo.length !== 0) {
      TipoCliente = PermitirProgOpApoyo[0].tipoCliente;
    }
    if (TipoCliente === 1) {
      const ValEliminados = await this.BuscarValidacionEliminadosOpApoyo(OP);

      if (ValEliminados.length !== 0) {
        if (ValEliminados[0].antiguedad <= 30) {
          boolReturn = true;
        } else {
          boolReturn = false;
        }
      } else {
        boolReturn = false;
      }
    } else {
      boolReturn = true;
    }
    if (PermitirProgOpApoyo.length !== 0) {
      if (PermitirProgOpApoyo[0].esCecso) {
        boolReturn = true;
      }
    }

    return boolReturn;
  }
  async PreguntarRadIngenieria(OP): Promise<any> {
    return new Promise((resolve, reject) => {
      swal
        .fire({
          title: 'SISTEMA ERP',
          text:
            'El artículo de la OP ' +
            OP +
            'está marcado para Radiografía por Ingeniería, Favor de Programarse en el primero turno. ¿DESEA PROGRAMARLA DE TODAS MANERAS?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        })
        .then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
  async ActivaFolioCombinacion(Programa): Promise<any> {
    this.Servicio.ActivaFolioCombinacion(Programa).subscribe(
      (data: any) => {
        if (data.correcto) {
        } else {
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. (ActivaFolioCombinacion)' +
              data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error (ActivaFolioCombinacion),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  Limpiar(): void {
    this.DatosGrid = [];
  }
  CambiaEstatusPro(programa): void {
    this.Servicio.CambiaEstatusPRO(programa).subscribe(
      (data: any) => {
        if (data.correcto) {
          this.BuscarProgramas();
          swal.fire('', 'El estatus del programa fue cambiado', 'success');
        } else {
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. ' + data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error (CambiaEstatusPro),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  AgregarPrograma(programa, Comentario): void {
    this.Servicio.AgregarPrograma(programa, Comentario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire('', 'El Programa Fue Agregado', 'success');
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
          'Ha Ocurrio un Error (AgregarPrograma),' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  CorreoFaltaFolioEmp(Op: any): void {
    this.Servicio.CorreoFaltaFolioEmp(Op).subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (CorreoFaltaFolioEmp)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (CorreoFaltaFolioEmp)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  CorreoFaltaFolioEmpOpApoyo(Op: any, OpApoyo: any): void {
    this.Servicio.CorreoFaltaFolioEmpOpApoyo(Op, OpApoyo).subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (CorreoFaltaFolioEmpOpApoyo)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (CorreoFaltaFolioEmpOpApoyo)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  EnviaCorreoNotificacion(Op, chkPrograma, claveArt): void {
    this.Servicio.EnviaCorreoNotificacion(Op, chkPrograma, claveArt).subscribe(
      (Datos: any) => {
        if (Datos.correcto) {
        } else {
          swal.fire(
            'Datos',
            'Ocurrió un error, (CorreoFaltaFolioEmpOpApoyo)' + Datos.mensaje,
            'error'
          );
        }
      },
      (error) => {
        swal.fire(
          'Datos',
          'Ha Ocurrio un Error, (CorreoFaltaFolioEmpOpApoyo)' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  async ProgramaImpresorasDinamico(
    RelacionProgramasParalelo: Array<any>
  ): Promise<any> {
    let EProceso = '';
    let esMVT = false;
    let lPiezas = 0;
    let lSolicitado = 0;
    let lDevuelto = 0;

    let Ancho = 0;
    let Largo = 0;
    let PzsCrt = 0;
    let CPrepar = '';
    let Colores = '';
    let lColor1 = '';
    let lColor2 = '';
    let lColor3 = '';
    let lColor4 = '';
    let Medidas = '';
    let Proceso1 = '';
    let wPallet = false;

    let lPrimerProcesoM1 = '0';
    let lPrimerProcesoM2 = '0';
    let lPrimerProcesoAca = '0';
    let Proceso2 = 0;
    let Proceso3 = 0;

    let TDiseno = '';
    let CantOP = 0;
    let FechaEnt = '';
    let NColores = 0;
    let lSuaje = '';
    let lDado = '';
    let lDesLargo = 0;
    let lDesAncho = 0;

    let lMaquina = '';
    let lTipoMaquina = '';
    let SegP = 0;
    let lProcesoTipo = 0;
    let tPrepa = '';
    let lComentario = '';

    let NoProgramar = false;
    let StdPrepImp = 0;
    let BalanceMaquina = false;
    let BalanceMaquinas = false;
    let lFechaProgImp = '';
    let lFechaProg = '';
    let lMaqNoProg = '';
    let lLargo = 0;
    let lAncho = 0;
    let lFechaCarga = '';

    let VelocImp;
    let lEficImp;
    let lPzasPallet;
    let TmpoEstImp;
    let DblFactor;
    let IntPorcentajeFPC;
    let lPrograma;
    let NSX;
    let lFechaTerImp;
    let lTransaccion;
    let unionPegada;
    let industria;
    let xClaveArticulo;
    let Cantidad;
    let result = false;
    let lError;
//> P1 //
    if (RelacionProgramasParalelo.length === 0) {
      return;
    }
    // const maq = await this.BuscarCatMaquina();

    let ContS = null;
    const DatosPImp = await this.BuscarOPsProgramarImpresoras({
      Programas: RelacionProgramasParalelo,
    });

    if (DatosPImp.length === 0) {
      return;
    }
    this.OPsDinamico = [];
    for (const Ps of DatosPImp) {
      if (ContS === null) {
        ContS = 0;
        EProceso = Ps.eProceso;
        esMVT = Ps.mvt;
        lPiezas = Ps.cantidad;
        lSolicitado = Ps.solicitado;
        lDevuelto = Ps.devuelto;
        this.OPsDinamico[ContS] = Ps;
        if (Ps.proceso.trim() !== '') {
          const OtrosDat = await this.BuscarOPsOtrosDatos(Ps.op);
          if (
            lPiezas + OtrosDat.programado + OtrosDat.producido <=
            lSolicitado + lDevuelto
          ) {
            this.OPsDinamico[ContS].lPiezas = lPiezas;
            this.OPsDinamico[ContS].txtPiezas = 'No programada';
          } else {
            lPiezas =
              lPiezas -
              (lPiezas +
                OtrosDat.programado +
                OtrosDat.producido -
                lSolicitado);
            if (lPiezas < 0) {
              lPiezas = 0;
              this.OPsDinamico[ContS].txtPiezas =
                'No programada, Excede Cantidad Solicitada Con ' +
                (Ps.cantidad + lPiezas);
            } else {
              this.OPsDinamico[ContS].txtPiezas =
                'Excedía Cantidad Solicitada Con ' + (Ps.cantidad - lPiezas);
            }
            this.OPsDinamico[ContS].lPiezas = Ps.cantidad;
            this.OPsDinamico[ContS].cantidad = lPiezas;
          }
        } else {
          this.OPsDinamico[ContS].cantidad = 0;
          this.OPsDinamico[ContS].txtPiezas = 'No Tiene Ruta de Proceso';
        }
      } else {
        let PasarValCantidad = false;
        for (const OPsDin of this.OPsDinamico) {
          if (
            OPsDin.op === Ps.op &&
            OPsDin.claveArticulo === Ps.claveArticulo
          ) {
            OPsDin.cantidad = OPsDin.cantidad + Ps.cantidad;
            lPiezas = OPsDin.cantidad;
            PasarValCantidad = true;
          }
        }
        if (!PasarValCantidad) {
          ContS = ContS + 1;
          this.OPsDinamico[ContS] = Ps;
          lPiezas = Ps.cantidad;
        }
        lSolicitado = Ps.solicitado;
        lDevuelto = Ps.devuelto;

        const OtrosDat = await this.BuscarOPsOtrosDatos(Ps.op);

        if (
          lPiezas + OtrosDat.programado + OtrosDat.producido <=
          lSolicitado + lDevuelto
        ) {
          this.OPsDinamico[ContS].lPiezas = lPiezas;
          this.OPsDinamico[ContS].txtPiezas = 'No programada';
        } else {
          lPiezas =
            lPiezas -
            (lPiezas + OtrosDat.programado + OtrosDat.producido - lSolicitado);
          if (lPiezas < 0) {
            lPiezas = 0;
            this.OPsDinamico[ContS].txtPiezas =
              'No programada, Excede Cantidad Solicitada Con ' +
              (Ps.cantidad - lPiezas);
          } else {
            this.OPsDinamico[ContS].txtPiezas =
              'Excedía Cantidad Solicitada Con ' + (Ps.cantidad + lPiezas);
          }
          this.OPsDinamico[ContS].lPiezas = Ps.cantidad;
          this.OPsDinamico[ContS].cantidad = lPiezas;
        }
      }
    }
    console.log('//> P1 Dto:', this.OPsDinamico , '<<ProgramaImpresorasDinamico>>');

    //> P1 °°
    //> P2 //
    // ----------------------------- Revisar Articulo -----------------------------------
    SiguientePendienteSecuencia: for (const OPsDin of this.OPsDinamico) {
      // Si la cantidad a programar es cero no se programa en máquinas impresoras
      let continuarSiguenteSecu = false;
      if (OPsDin.cantidad !== 0) {
        const ValArt = await this.BuscarValidarArticulo(OPsDin.op);

        if (ValArt.length !== 0) {
          for (const OpA of ValArt) {
            Ancho = OpA.ancho;
            Largo = OpA.largo;
            PzsCrt = OpA.piezas;
            CPrepar = OpA.clavepreparacion;
            Colores =
              OpA.primercolor +
              ' ' +
              OpA.segundocolor +
              ' ' +
              OpA.tercercolor +
              ' ' +
              OpA.cuartocolor;
            lColor1 = OpA.primercolor;
            lColor2 = OpA.segundocolor;
            lColor3 = OpA.tercercolor;
            lColor4 = OpA.cuartocolor;
            Medidas = (Ancho * 10) / 10 + ' X ' + (Largo * 10) / 10;

            if (
              (OpA.opApoyoMaquila && OpA.tipoAcabado === '02') ||
              OpA.proceso.trim() === 'N'
            ) {
              Proceso1 = 'N';
            } else {
              Proceso1 = OpA.proceso.trim();
              wPallet = OpA.pallet;
            }

            TDiseno = OpA.diseno;
            CantOP = OpA.cantidad;
            FechaEnt = OpA.fechaentrega;
            NColores = OpA.colores;
            lSuaje = OpA.suaje.trim();
            lDado = OpA.dado.trim();
            lDesLargo = OpA.largoDesarrollo;
            lDesAncho = OpA.anchoDesarrollo;

            OPsDin.areaunitaria = OpA.areaunitaria;
            OPsDin.largo = Largo;
            OPsDin.cprepar = CPrepar;
            OPsDin.colores = Colores;
            OPsDin.medidas = Medidas;
            OPsDin.fechaEnt = FechaEnt;
            OPsDin.tdiseno = TDiseno;

            let lUltimoProceso = 0;
            let lNumProceso = 0;
            let cont = 0;
            let z = 0;
            let PXSe = '';

            let mx2 = false;
            let MaqEstab = '';

            const RutaProcMaq = await this.BuscarRutaProcMaquinas(Proceso1);
            let indexRPM = 0;
            const countRegRPM = RutaProcMaq.length;
            if (OpA.opApoyoMaquila && OpA.tipoAcabado === '02') {
              indexRPM = RutaProcMaq.length - 1;
            }
            let MaqEstablecida = [];
            let contadorDoWhile = 0;
            //> DO POLEMICO
            do {
              lNumProceso = lNumProceso + 1;

              MaqEstablecida = await this.BuscarMaquinaEstablecida(
                OPsDin.claveArticulo,
                lNumProceso
              );
              for (let index = indexRPM; index < RutaProcMaq.length; index++) {
                const Ps = RutaProcMaq[index];
                if (Ps.mx2 && cont < 1) {
                  if (z > 0) {
                    cont = cont + 1;
                  }
                  if (z === RutaProcMaq.length && wPallet === false) {
                    lUltimoProceso = 1;
                  }
                  if (cont === 0) {
                    z = z + 1;
                  }
                } else if (!Ps.mx2 && z === 0) {
                  cont = 0;
                  z = z + 1;
                  if (z === RutaProcMaq.length && wPallet === false) {
                    lUltimoProceso = 1;
                  }
                } else {
                  cont = 0;
                  z = z + 1;
                  const indexNext = index + 1;
                  if (indexNext < RutaProcMaq.length) {
                    mx2 = RutaProcMaq[indexNext].mx2;
                    if (
                      z === RutaProcMaq.length &&
                      wPallet === false &&
                      mx2 === false
                    ) {
                      lUltimoProceso = 1;
                    }
                  }
                }
              }
              if (z > RutaProcMaq.length && wPallet === false) {
                break;
              }
              if (contadorDoWhile < countRegRPM) {
                for (
                  let index = indexRPM;
                  index < RutaProcMaq.length;
                  index++
                ) {
                  const Ps = RutaProcMaq[index];
                  if (MaqEstablecida.length !== 0) {
                    for (const Rs of MaqEstablecida) {
                      MaqEstab = Rs.claveMaquina.trim();
                    }
                  } else {
                    MaqEstab = '';
                  }

                  if (
                    (OpA.opApoyoMaquila && OpA.tipoAcabado === '02') ||
                    OpA.proceso.trim() === 'N'
                  ) {
                    lMaquina = 'PALET';
                    MaqEstab = '';
                    wPallet = false;
                    lTipoMaquina = 'AC';
                  } else {
                    lMaquina = Ps.maquina.trim();
                    lTipoMaquina = Ps.tipoMaquinaProc.trim();
                  }

                  SegP = Ps.pegar ? -1 : 0;
                  lProcesoTipo = Ps.tproceso;

                  if (RutaProcMaq.length === 0 && wPallet === false) {
                    lUltimoProceso = 1;
                  }
                }
              } else {
                if (RutaProcMaq.length === 0 && wPallet === false) {
                  lUltimoProceso = 1;
                }
                if (wPallet) {
                  lUltimoProceso = 1;
                  lMaquina = 'PALET';
                  SegP = 0;
                  lProcesoTipo = 9;
                  lTipoMaquina = 'AC';
                }
              }

              // MAQUINA WARD Y PEGADO
              tPrepa = OPsDin.clavePreparacion.trim();

              if (
                this.Zona === '02' &&
                tPrepa.substring(tPrepa.length - 1, 1) === 'P' &&
                lMaquina === 'WARD1'
              ) {
                tPrepa = tPrepa.substring(0, tPrepa.length - 1);
              }
              if (SegP === -1) {
                tPrepa = 'PEG';
                lComentario = 'Segundo Proceso Pegado';
              } else {
                lComentario = '';
              }
              // P2 °°
              //> P3 //
              // ------------------Programacion por Historia de Fabricacion------------------
              const Obj = {
                TPrepa: tPrepa,
                ClaveArticulo: OPsDin.claveArticulo,
                lProcesoTipo: lProcesoTipo,
                MaqEstab: MaqEstab,
                lMaquina: lMaquina,
                lTipoMaquina: lTipoMaquina,
                OP: OPsDin.op,
                Zona: this.Zona,
                mx2: mx2,
                cont: cont,
                SegP: SegP,
                lDesLargo: lDesLargo,
                lDesAncho: lDesAncho,
                Largo: Largo,
                Ancho: Ancho,
                lMaquinaNoProgramar: lMaqNoProg,
                ldArea: OPsDin.area,
              };
              const ProgHis = await this.BuscarProgHisFabricacion(Obj);

              for (const iterator of ProgHis) {
                lMaquina = iterator.lMaquina;
                NoProgramar = iterator.noProgramar;
                lFechaProgImp = iterator.lFechaProgImp;
                lFechaProg = iterator.lFechaProg;
                lMaqNoProg = iterator.lMaqNoProg;
                lLargo = iterator.lLargo;
                lAncho = iterator.lAncho;
                esMVT = iterator.esMVT;
                tPrepa = iterator.tPrepa;
                BalanceMaquina = iterator.balanceMaquina;
                StdPrepImp = iterator.stdPrepImp;
                if(iterator.texto !== ''){
                  OPsDin.txtPiezas = iterator.texto;
                }

              }

              if (NoProgramar) {
                lTransaccion = true;
                continue SiguientePendienteSecuencia;
              }
              //> P3 °°
              //> P0 // No se Usara
              // if (BalanceMaquina) {
              //   const ObjBMaq = {
              //     TPrepa: tPrepa.trim(),
              //     lProcesoTipo: lProcesoTipo,
              //     lMaquina: lMaquina,
              //     lMaquinaNoProgramar: lMaqNoProg,
              //     ldArea: OPsDin.area,
              //   };
              //   const Bmaq = await this.BuscarBalanceMaquinas(ObjBMaq);

              //   for (const iterator of Bmaq) {
              //     lMaquina = iterator.lMaquina;
              //     BalanceMaquinas = iterator.balanceMaquinas;
              //     lFechaCarga = iterator.lFechaCarga;
              //   }
              // }
              //> P0 °°
              //> P4 //
              const ObjVel = {
                OP: OPsDin.op,
                claveArticulo: OPsDin.claveArticulo,
                TPrepa: tPrepa.trim(),
                lProcesoTipo: lProcesoTipo,
                lMaquina: lMaquina,
                Zona: this.Zona,
                AreaH: OPsDin.areaunitaria,
                lNumProceso: lNumProceso,
                PzsCrt: PzsCrt,
                wPallet: wPallet,
                Cantidad: OPsDin.cantidad,
                lUltimoProceso: lUltimoProceso,
                lFechaProgImp: lFechaProgImp,
                StdPrepImp: StdPrepImp,
                esMVT: esMVT,
              };

              const vel = await this.BuscarVelicidad(ObjVel);
              for (const iterator of vel) {
                if (iterator.texto !== ''){
                  OPsDin.txtPiezas = iterator.texto;
                }
                lPiezas = iterator.lPiezas;
                VelocImp = iterator.velocImp;
                lEficImp = iterator.lEficImp;
                PXSe = iterator.pxSe;
                lPzasPallet = iterator.lPzasPallet;
                TmpoEstImp = iterator.tmpoEstImp;
                DblFactor = iterator.dblFactor;
                IntPorcentajeFPC = iterator.intPorcentajeFPC;
                lPrograma = iterator.lPrograma;
                NSX = iterator.nsx;
                lFechaTerImp = iterator.lFechaTerImp;
                lTransaccion = iterator.lTransaccion;
                unionPegada = iterator.unionPegada;
                industria = iterator.industria;
                xClaveArticulo = iterator.xClaveArticulo;
                wPallet = iterator.wPallet;
                Cantidad = iterator.cantidad;
                PzsCrt = iterator.pzsCrt;
                StdPrepImp = iterator.stdPrepImp;
                continuarSiguenteSecu = iterator.continuarSiguenteSecu;
              }
              //> P4 °°
              if (continuarSiguenteSecu) {
                // ---------------------------Terminan Calculos----------------------------------------
                // SiguientePendienteSecuencia
                if (lTransaccion && NoProgramar === false) {
                  if (result) {
                    lError = true;
                  }
                  if (lError) {
                    OPsDin.txtPiezas = 'Error en Sistema...';
                  } else {
                    if (
                      OPsDin.txtPiezas === 'No programada' ||
                      OPsDin.txtPiezas === ''
                    ) {
                      OPsDin.txtPiezas = 'Programado';
                    } else {
                      OPsDin.txtPiezas = 'Programado : ' + OPsDin.txtPiezas;
                    }
                  }
                } else {
                  lTransaccion = true;
                }
                continue SiguientePendienteSecuencia;
              }
              //>P5 //
              if (esMVT && this.Zona === '02') {
                lComentario = '';
                lComentario = OPsDin.notas;
              }

              let DesVelSTD = 0;
              if (
                lMaquina === 'SAT2T' &&
                (industria === 'AGR' || industria === 'PAR') &&
                unionPegada === 'SI' &&
                (tPrepa === '1CT' ||
                  tPrepa === '2CT' ||
                  tPrepa === '3CT' ||
                  tPrepa === '1CRT' ||
                  tPrepa === '2CRT' ||
                  tPrepa === '3CRT') &&
                xClaveArticulo === ''
              ) {
                DesVelSTD = 24;
              }

              let DescuentoVELSTD = 0;
              switch (lMaquina) {
                case 'FLEX3':
                  if (tPrepa === 'FLITHO') {
                    DescuentoVELSTD = 63;
                  }
                  break;
                case 'McKin':
                  if (tPrepa === 'FLITHO') {
                    DescuentoVELSTD = 39;
                  }
                  break;
                case 'OKLAH':
                  if (tPrepa === 'FLITHO') {
                    DescuentoVELSTD = 39;
                  }
                  break;
                case 'WARD1':
                  if (tPrepa === 'FLITHO') {
                    DescuentoVELSTD = 60;
                  }
                  break;

                default:
                  break;
              }
              if (esMVT && this.Zona === '02' && lTipoMaquina === 'IM') {
                tPrepa = 'MVT';
              }
              let Notas = '';
              let pintado = 0;
              if (OPsDin.pintadoImp && lTipoMaquina === 'IM') {
                Notas = '    APLICAR PROCESO DE PINTADO ';
                pintado = 1;
              }
              //>P5 °°
              const ObjImpDinamico = {
                programa: lPrograma,
                Orden: NSX,
                ClaveMaquina: lMaquina,
                op: OPsDin.op,
                fechaentrega: OPsDin.fechaEnt,
                cantidad: Cantidad,
                claveproceso: tPrepa,
                suaje: lSuaje,
                dado: lDado,
                piezascorte: PzsCrt > 0 ? PzsCrt : 1,
                ultimoproceso: lUltimoProceso === 1 ? true : false,
                minutospreparacion: Math.round(StdPrepImp),
                minutosproduccion: Math.round(TmpoEstImp),
                estatus: 'P',
                Primercolor: lColor1,
                Segundocolor: lColor2,
                Tercerocolor: lColor3,
                CuartoColor: lColor4,
                imprime: true,
                pegado: SegP === -1 ? true : false,
                tipomaquina: lTipoMaquina,
                velocidadstd: VelocImp,
                Notas: lComentario + Notas,
                medida1: lDesLargo,
                medida2: lDesAncho,
                tproceso: lProcesoTipo,
                programacorr: OPsDin.programa,
                fechainicio: lFechaProgImp,
                fechatermino: lFechaTerImp,
                proceso1: lNumProceso === 1 ? true : false,
                eficiencia: lEficImp,
                Pintado: pintado === 1 ? true : false,
                PorcentajeFPC: IntPorcentajeFPC,
                EProceso: OPsDin.eProceso,
                DesVelSTD: DesVelSTD > 0 ? DesVelSTD : DescuentoVELSTD,
                VersionModulo: '2022.07.21 MW',
              };

              console.log(ObjImpDinamico, ' ObjImpDinamico ');

              result = await this.AgregarProgImpDinamico(ObjImpDinamico);

              contadorDoWhile = contadorDoWhile + 1;
            } while (contadorDoWhile < countRegRPM || wPallet);
          }
        } else {
          swal.fire(
            '',
            'No Existe Datos del Articulo' + OPsDin.claveArticulo,
            'warning'
          );
          return;
        }
      }
      // ---------------------------Terminan Calculos----------------------------------------
      // SiguientePendienteSecuencia
      if (lTransaccion && NoProgramar === false) {
        if (!result) {
          lError = true;
        }
        if (lError) {
          OPsDin.txtPiezas = 'Error en Sistema...';
        } else {
          if (OPsDin.txtPiezas === 'No programada' || OPsDin.txtPiezas === '') {
            OPsDin.txtPiezas = 'Programado';
          } else {
            OPsDin.txtPiezas = 'Programado : ' + OPsDin.txtPiezas;
          }
        }
      } else {
        lTransaccion = true;
      }
    }
  }

  async BuscarCatMaquina(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetCatMaquinas().subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetCatMaquinas', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarCatMaquina)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarCatMaquina)' +
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
  async BuscarOPsProgramarImpresoras(Programa): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetOPsProgramarImpresoras(Programa).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log(
              'mdladdprograma',
              'GetOPsPogramarImpresoras',
              Datos.data
            );

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarOPsPogramarImpresoras)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarOPsPogramarImpresoras)' +
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
  async BuscarOPsOtrosDatos(Op): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetOPsOtrosDatos(Op).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetOPsOtrosDatos', Datos.data);
            Datos.data.variacion = 1 + Datos.data.variacion;
            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarOPsOtrosDatos)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarOPsOtrosDatos)' +
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
  async BuscarValidarArticulo(Op): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetValidarArticulo(Op).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetValidarArticulo', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarValidarArticulo)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarValidarArticulo)' +
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
  async BuscarRutaProcMaquinas(ClaveProceso): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetRutaProcMaquinas(ClaveProceso).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetRutaProcMaquinas', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarRutaProcMaquinas)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarRutaProcMaquinas)' +
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
  async BuscarMaquinaEstablecida(ClaveArticulo, NumProceso): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetMaquinaEstablecida(
        ClaveArticulo,
        NumProceso
      ).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetMaquinaEstablecida', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarMaquinaEstablecida)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarMaquinaEstablecida)' +
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
  async BuscarProgHisFabricacion(obj): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(obj, 'GetProgHisFabricacion');
      this.ServicioProg.GetProgHisFabricacion(obj).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetProgHisFabricacion', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarProgHisFabricacion)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarProgHisFabricacion)' +
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
  async BuscarBalanceMaquinas(obj): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetBalanceMaquinas(obj).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetBalanceMaquinas', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarBalanceMaquinas)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarBalanceMaquinas)' +
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
  async BuscarVelicidad(obj): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.GetVelicidad(obj).subscribe(
        (Datos: any) => {
          if (Datos.correcto) {
            console.log('mdladdprograma', 'GetVelicidad', Datos.data);

            resolve(Datos.data);
          } else {
            swal.fire(
              'Datos',
              'Ocurrió un error, (BuscarVelicidad)' + Datos.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos',
            'Ha Ocurrio un Error, (BuscarVelicidad)' +
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
  async AgregarProgImpDinamico(Obj): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ServicioProg.AgregarProgImpDinamico(Obj).subscribe(
        (data: any) => {
          if (data.correcto) {
            resolve(data.correcto);
          } else {
            resolve(data.correcto);
            swal.fire(
              '',
              'Ocurrió un error al tratar de guardar los datos. (AgregarProgImpDinamico) ' +
                data.mensaje,
              'error'
            );
          }
        },
        (error) => {
          swal.fire(
            'Datos ',
            'Ha Ocurrio un Error (AgregarProgImpDinamico),' +
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
}
