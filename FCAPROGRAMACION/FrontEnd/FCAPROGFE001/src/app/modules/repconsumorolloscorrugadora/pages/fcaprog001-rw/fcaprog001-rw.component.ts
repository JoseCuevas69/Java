import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { IParametros } from '../../../../models/Programacion/ConsumoRollosCorrugadora/IParametros';
import { IClases } from '../../../../models/Programacion/ConsumoRollosCorrugadora/IClases';
import { ISubClases } from '../../../../models/Programacion/ConsumoRollosCorrugadora/ISubClases';
import { ITripulacion } from '../../../../models/Programacion/ConsumoRollosCorrugadora/ITripulacion';

import { RepConsumoRollosCorrugadoraService } from '../../../../services/Programacion/RepConsumoRollosCorrugadora.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fcaprog001-rw',
  templateUrl: './fcaprog001-rw.component.html',
  styleUrls: ['./fcaprog001-rw.component.css']
})
export class FCAPROG001RWComponent implements OnInit {

  isTodosTurnos: boolean = false;


DatosParametros: IParametros = 
{

  FechaIni:null,
  FechaFin:null,
  OpcionTipoRolloSeleccionado : null,
  chkTodosTurnos: 0,
  Turno: null,
  CodigoRollo: null,
  Clase : null,
  SubClase : null,
  Ancho: null,
  PesoInicial: null,
  PesoInicio: null,
  PesoFinal: null,
  RadioFinal: null,
  TipoOrdenacion: null,
  ChkOps: 0,

};

DataClases : Array<IClases>;
DataSubClases : Array<ISubClases>;
DataTripulacion : Array<ITripulacion>;
DataRepConsumoRollos : Array<IParametros>;

IconoTitulo = '';


// this.datePipes.transform(this.DatFormulario.admcxpadaT001_FechaFactura, 'yyyy-MM-dd') : 

  constructor(public Servicio: RepConsumoRollosCorrugadoraService,  public datePipes: DatePipe) { }




  GetClases() {
    this.Servicio.GetClases().subscribe(
      (data: any) => {
        this.DataClases = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar clases, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
      );
    }

    GetSubClases() {
      this.Servicio.GetSubClases().subscribe(
        (data: any) => {
          this.DataSubClases = data.data;
        },
        (error) => {
          swal.fire(
            'Ha Ocurrio un Error',
            'Ha Ocurrio un Error al Momento de Cargar Sub Clases, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
              error.error +
              '</strong>',
            'error'
          );
        }
        );
      }

      GetTripulaciones() {
        this.Servicio.GetTripulaciones().subscribe(
          (data: any) => {
            this.DataTripulacion = data.data;
          },
          (error) => {
            swal.fire(
              'Ha Ocurrio un Error',
              'Ha Ocurrio un Error al Momento de Cargar Tipos de Industria, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
                error.error +
                '</strong>',
              'error'
            );
          }
          );
        }

      SetFirstAndLastDayOfMonth():void{
        var date = new Date();
        //this.DatosParametros.FechaIni =  new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substr(0, 10);
        this.DatosParametros.FechaIni =  date.toISOString().substr(0, 10);
        this.DatosParametros.FechaFin =  date.toISOString().substr(0, 10);
      }

      HabilitarTurnos():void{
        let chkTurnos = <HTMLInputElement>document.getElementById('chkTodosTurnos')
        let cmbTripulaciones = <HTMLInputElement>document.getElementById('cmbTripulaciones')
        cmbTripulaciones.disabled = true;
        if(chkTurnos.checked == false){
          cmbTripulaciones.disabled = false;
        }
      }

      


      GetDatosConsumoRollos() {
        this.Servicio.GetDatosConsumoRollos(this.DatosParametros).subscribe(
          (data: any) => {
            console.log(data.data);
            this.DataRepConsumoRollos = data.data;
          },
          (error) => {
            swal.fire(
              'Ha Ocurrio un Error',
              'Ha Ocurrio un Error al Momento de Cargar rollos de consumo, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
              error.error +
              '</strong>',
              'error'
            );
          }
        );
      }

        
      ReporteConsumoRollos(): void {
    
        // al captura peso inicio se requiere el radio final:
        if(String(this.DatosParametros.PesoInicio) !== "" && String(this.DatosParametros.RadioFinal) === ''){
          swal.fire('','Capture Peso Final', 'error');
          return;
        }


        // recortar fecha formarto dd/mm/yyyy
        let date1 = this.DatosParametros.FechaIni;
        let date2 = this.DatosParametros.FechaFin;
        this.DatosParametros.FechaIni = this.datePipes.transform(this.DatosParametros.FechaIni, 'dd/MM/yyyy');
        this.DatosParametros.FechaFin = this.datePipes.transform(this.DatosParametros.FechaFin, 'dd/MM/yyyy');

        // Tipo de Rollos a buscar:
        // radios Rollos
        let rbRollosConsumidos = <HTMLInputElement>document.getElementById('rbRollosConsumidos')
        let rbRollosOP = <HTMLInputElement>document.getElementById('rbRollosOP')
        let rbRollosOPTijuana = <HTMLInputElement>document.getElementById('rbRollosOPTijuana')

        if(rbRollosConsumidos.checked) this.DatosParametros.OpcionTipoRolloSeleccionado = 'RollosConsumidos'
        if(rbRollosOP.checked) this.DatosParametros.OpcionTipoRolloSeleccionado = 'RollosOP'
        if(rbRollosOPTijuana.checked) this.DatosParametros.OpcionTipoRolloSeleccionado = 'RollosOPTijuana'

        let chkTodosTurnos = <HTMLInputElement>document.getElementById('chkTodosTurnos')
        let chkOps = <HTMLInputElement>document.getElementById('chkOps')
        this.DatosParametros.chkTodosTurnos = (chkTodosTurnos.checked) ? 1 : 0;
        this.DatosParametros.ChkOps = (chkOps.checked) ? 1 : 0;

        // Clase
        this.DatosParametros.Clase = (this.DatosParametros.Clase === '') ? null : this.DatosParametros.Clase;
        this.DatosParametros.SubClase = (this.DatosParametros.SubClase === '') ? null : this.DatosParametros.SubClase;

        // Turno
        if(this.DatosParametros.chkTodosTurnos === 1 || this.DatosParametros.Turno === null){
          this.DatosParametros.Turno = null;
          this.isTodosTurnos = true;
        }else{
          //this.DatosParametros.Turno = Number(this.DatosParametros.Turno);
          this.isTodosTurnos = false
        }

        // Ordenación:
        // radios Ordenar
        let rbFechaEntrada = <HTMLInputElement>document.getElementById('rbFechaEntrada')
        let rbGramajeAncho = <HTMLInputElement>document.getElementById('rbGramajeAncho')
        let rbFechaProgOp = <HTMLInputElement>document.getElementById('rbFechaProgOp')
        let rbFechaOpRollo = <HTMLInputElement>document.getElementById('rbFechaOpRollo')

        if(rbFechaEntrada.checked) this.DatosParametros.TipoOrdenacion = 'FechaEntrada'
        if(rbGramajeAncho.checked) this.DatosParametros.TipoOrdenacion = 'GramajeAncho'
        if(rbFechaProgOp.checked) this.DatosParametros.TipoOrdenacion = 'FechaProgOp'
        if(rbFechaOpRollo.checked) this.DatosParametros.TipoOrdenacion = 'FechaOpRollo'

        //this.GetDatosConsumoRollos();
    

        let reportName: string = ''
        if(rbRollosConsumidos.checked){
          reportName = 'FCAPROG005RS'
        }
        if(rbRollosOP.checked){
          reportName = 'FCAPROG006RS'
        }
        if(rbRollosOPTijuana.checked){
          reportName = 'FCAPROG006RS'
        }
        let  urlReporte="http://intranet2.cecso.com.mx/erpweb2012/Sistemas/ASS005MW/OpenSRS.aspx?"+
        "servidorSRS=http://datos.cecso.com.mx/ServerRS&usuarioSRS=Admin_SRS16&pswSRS=R3p$erver2016&NombreSRS="+reportName+"&"+
        "rutaSRS=/FcaCajas"+localStorage.getItem('Zona')+"/FCAPROGRAMACION/"+reportName+"&parametrosSRS=" +
        "FechaIni?" + this.DatosParametros.FechaIni +
        ",FechaFin?" + this.DatosParametros.FechaFin +
        ((this.DatosParametros.OpcionTipoRolloSeleccionado===null)?"":",OpcionTipoRolloSeleccionado?" + this.DatosParametros.OpcionTipoRolloSeleccionado) +
        ((this.DatosParametros.chkTodosTurnos===null)?"":",chkTodosTurnos?" + this.DatosParametros.chkTodosTurnos) +
        ((this.DatosParametros.Turno===null)?"":",Turno?" + this.DatosParametros.Turno) +
        ((this.DatosParametros.CodigoRollo===null || this.DatosParametros.CodigoRollo==='')?"":",CodigoRollo?" + this.DatosParametros.CodigoRollo) +
        ((this.DatosParametros.Clase===null || this.DatosParametros.Clase==='')?"":",Clase?" + this.DatosParametros.Clase) +
        ((this.DatosParametros.SubClase===null || this.DatosParametros.SubClase==='')?"":",SubClase?" + this.DatosParametros.SubClase) +
        ((this.DatosParametros.Ancho===null)?"":",Ancho?" + this.DatosParametros.Ancho) +
        ((this.DatosParametros.PesoInicial===null)?"":",PesoInicial?" + this.DatosParametros.PesoInicial) +
        ((this.DatosParametros.PesoInicio===null)?"":",PesoInicio?" + this.DatosParametros.PesoInicio) +
        ((this.DatosParametros.PesoFinal===null)?"":",PesoFinal?" + this.DatosParametros.PesoFinal) +
        ((this.DatosParametros.RadioFinal===null)?"":",RadioFinal?" + this.DatosParametros.RadioFinal) +
        ((this.DatosParametros.TipoOrdenacion===null)?"":",TipoOrdenacion?" + this.DatosParametros.TipoOrdenacion) +
        ((this.DatosParametros.ChkOps===null)?"":",ChkOps?" + this.DatosParametros.ChkOps) +
        "&val=ITEwISE5IYm6EzYVbEfJq0iuWExA";
        
        window.open(urlReporte, "_blank");


      // seteamos fecha yyyy-mm-dd
      this.DatosParametros.FechaIni = date1
      this.DatosParametros.FechaFin = date2
      this.GetTripulaciones();
      

  }

      ngOnInit(): void {
        this.GetClases()
        this.GetSubClases()
        this.GetTripulaciones()
        this.SetFirstAndLastDayOfMonth()
      }
}
