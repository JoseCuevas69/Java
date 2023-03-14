import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Horariomaquina } from 'src/app/models/horariomaquina';
import { Maquina } from 'src/app/models/maquina';
import { HorariomaquinaserviceService } from 'src/app/services/horariomaquinaservice.service';
import swal from 'sweetalert2';

interface Filtros {
  ClaveMaquina: string; 
}

interface clsHorarioMaquina {
idhorario: number;
clavemaquina: string;
inicioprimero: string;
finprimero: string;
activoprimero: boolean;  
iniciosegundo: string;
finsegundo: string;
activosegundo: boolean;  
iniciotercero: string;
fintercero: string;
activotercero: boolean;  
inicioprimerosabado: string;
finprimerosabado: string;
activoprimerosabado: boolean;  
activoprimerodomingo: boolean;  
iniciosegundosabado: string;
finsegundosabado: string;
activosegundosabado: boolean;  
activosegundodomingo: boolean;  
iniciotercerosabado: string;
fintercerosabado: string;
activotercerosabado: boolean;  
activotercerdomingo: boolean;  
}


@Component({
  selector: 'app-fcaprogcat006cw',
  templateUrl: './fcaprogcat006cw.component.html',
  styleUrls: ['./fcaprogcat006cw.component.css']
})
export class Fcaprogcat006cwComponent implements OnInit {

  @Input() strClaveMaquina: string;
  Maquinas : Array<Maquina>;
  clsHorario: Array<Horariomaquina>;

  TipoAccion: number;
  urlReporte: string;

  strinicioprimero: string;
  strfinprimero : string;
  striniciosegundo : string;
  strfinsegundo : string;
  striniciotercero : string;
  strfintercero : string;
  strinicioprimerosabado : string;
  strfinprimerosabado : string;
  striniciosegundosabado : string;
  strfinsegundosabado : string;
  striniciotercerosabado : string;
  strfintercerosabado : string;
  prueba: any;


  filtros: Filtros = 
  { 
    ClaveMaquina: '' 
  };

  //clsHorarioMaquina

  HorarioMaquina: clsHorarioMaquina = 
  { 
    idhorario: 0,
    clavemaquina: '',
    inicioprimero: '2021-12-07T07:00:00.080',
    finprimero:    '2021-12-07T02:59:59.999',
    activoprimero: false,  
    iniciosegundo: '',
    finsegundo: '',
    activosegundo: false,  
    iniciotercero: '',
    fintercero: '',
    activotercero: false,  
    inicioprimerosabado: '',
    finprimerosabado: '',
    activoprimerosabado: false,  
    activoprimerodomingo: false,  
    iniciosegundosabado: '',
    finsegundosabado: '',
    activosegundosabado: false,  
    activosegundodomingo: false,  
    iniciotercerosabado: '',
    fintercerosabado: '',
    activotercerosabado: false,  
    activotercerdomingo: false 
  };

  constructor(private route: ActivatedRoute, public Horariomaquinaservice: HorariomaquinaserviceService) { }

  ngOnInit(): void {
    this.getMaquinas();
    this.IniciarDatos();
    this.TipoAccion = 1;
  }

  IniciarDatos(){
    this.strinicioprimero = "07:05"  //this.toDateString('2021-12-07T07:15:00.000');
    this.strfinprimero = "07:05"  //this.toDateString('2021-12-07T14:59:59.000');

    this.prueba = "07:05"

    this.HorarioMaquina.idhorario
    this.HorarioMaquina.clavemaquina
    //this.HorarioMaquina.inicioprimero = this.toDateString('2021-12-07T07:00:00.000');
    //this.HorarioMaquina.finprimero    = this.toDateString('2021-12-07T14:59:59.000');
    this.HorarioMaquina.activoprimero
    this.HorarioMaquina.iniciosegundo = this.toDateString('2021-12-07T15:00:00.000');
    this.HorarioMaquina.finsegundo  = this.toDateString('2021-12-07T22:59:59.000');
    this.HorarioMaquina.activosegundo
    this.HorarioMaquina.iniciotercero = this.toDateString('2021-12-07T23:00:00.000');
    this.HorarioMaquina.fintercero    = this.toDateString('2021-12-08T06:59:59.000');
    this.HorarioMaquina.activotercero

    this.HorarioMaquina.inicioprimerosabado = this.toDateString('2021-12-07T07:00:00.000');
    this.HorarioMaquina.finprimerosabado    = this.toDateString('2021-12-07T14:59:59.000');
    this.HorarioMaquina.activoprimerosabado  
    this.HorarioMaquina.activoprimerodomingo
    this.HorarioMaquina.iniciosegundosabado = this.toDateString('2021-12-07T15:00:00.000');
    this.HorarioMaquina.finsegundosabado    = this.toDateString('2021-12-07T22:59:59.000');
    this.HorarioMaquina.activosegundosabado  
    this.HorarioMaquina.activosegundodomingo  
    this.HorarioMaquina.iniciotercerosabado = this.toDateString('2021-12-07T23:00:00.000');
    this.HorarioMaquina.fintercerosabado    = this.toDateString('2021-12-08T06:59:59.000');
    this.HorarioMaquina.activotercerosabado  
    this.HorarioMaquina.activotercerdomingo
  }

  private toDateString(pardate: string): string {
      var dateIni = new Date(pardate); 
      var isoDateTimeIni = new Date(dateIni.getTime() - (dateIni.getTimezoneOffset() * 60000)).toISOString();
      //this.dtInicio = isoDateTimeIni.slice(0, 16);
      return (isoDateTimeIni.slice(0, 16));
  }

  ondateChangeddtInicioPrimero(eventDate: any): Date | null {
    var date = new Date();
       this.HorarioMaquina.inicioprimero =  date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;

    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtFinPrimero(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.finprimero = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtiniciosegundo(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.iniciosegundo = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtfinsegundo(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.finsegundo = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtiniciotercero(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.iniciotercero = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtfintercero(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.fintercero = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtinicioprimerosabado(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.inicioprimerosabado = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtfinprimerosabado(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.finprimerosabado = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtiniciosegundosabado(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.iniciosegundosabado = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtfinsegundosabado(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.finsegundosabado = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtiniciotercerosabado(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.iniciotercerosabado = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }

  ondateChangeddtfintercerosabado(eventDate: any): Date | null {
    var date = new Date(); 
    this.HorarioMaquina.fintercerosabado = date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2)
       + 'T' + eventDate;
    return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
  }


  OnChangeactivoprimero($event){
    this.HorarioMaquina.activoprimero = $event.checked;
  }
  OnChangeactivosegundo($event){
    this.HorarioMaquina.activosegundo = $event.checked;
  }
  OnChangeactivotercero($event){
    this.HorarioMaquina.activotercero = $event.checked;
  }

  OnChangeactivoprimerosabado($event){
    this.HorarioMaquina.activoprimerosabado = $event.checked;
  }
  OnChangeactivoprimerodomingo($event){
    this.HorarioMaquina.activoprimerodomingo = $event.checked;
  }

  OnChangeactivosegundosabado($event){
    this.HorarioMaquina.activosegundosabado = $event.checked;
  }
  OnChangeactivosegundodomingo($event){
    this.HorarioMaquina.activosegundodomingo = $event.checked;
  }

  OnChangeactivotercerosabado($event){
    this.HorarioMaquina.activotercerosabado = $event.checked;
  }
  OnChangeactivotercerdomingo($event){
    this.HorarioMaquina.activotercerdomingo = $event.checked;
  }




  getMaquinas(){    
    this.Horariomaquinaservice.getMaquinas('').subscribe(
      (data: any) => {
        this.Maquinas = data.data;
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de las maquinas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
  }



  getHorarioMaquina($event){

    this.HorarioMaquina.activoprimero = false;
    this.HorarioMaquina.activosegundo = false; //result.activosegundo;
    this.HorarioMaquina.activotercero = false; //result.activotercero; 
    this.HorarioMaquina.activoprimerosabado  = false; //result.activoprimerosabado;
    this.HorarioMaquina.activoprimerodomingo= false; //result.activoprimerodomingo;
    this.HorarioMaquina.activosegundosabado  = false; //result.activosegundosabado;
    this.HorarioMaquina.activosegundodomingo  = false; //result.activosegundodomingo;
    this.HorarioMaquina.activotercerosabado  = false; //result.activotercerosabado;
    this.HorarioMaquina.activotercerdomingo = false; //result.activotercerdomingo;

    this.Horariomaquinaservice.getHorario(this.filtros.ClaveMaquina).subscribe(
      (data: any) => {
        //this.clsHorario = data.data;
        this.TipoAccion = 1;



      

        for(let result of data.data){
          this.clsHorario = result;
          //ids.Push(result.Id);

          this.HorarioMaquina.idhorario = result.idhorario;
          this.HorarioMaquina.clavemaquina = result.clavemaquina;
          this.HorarioMaquina.inicioprimero = this.toDateString(result.inicioprimero);
          this.HorarioMaquina.finprimero    = this.toDateString(result.finprimero);
          this.HorarioMaquina.activoprimero = result.activoprimero;
          this.HorarioMaquina.iniciosegundo = this.toDateString(result.iniciosegundo);
          this.HorarioMaquina.finsegundo  = this.toDateString(result.finsegundo);
          this.HorarioMaquina.activosegundo = result.activosegundo;
          this.HorarioMaquina.iniciotercero = this.toDateString(result.iniciotercero);
          this.HorarioMaquina.fintercero    = this.toDateString(result.fintercero);
          this.HorarioMaquina.activotercero = result.activotercero;
      
          this.HorarioMaquina.inicioprimerosabado = this.toDateString('2021-12-07T07:00:00.000');
          this.HorarioMaquina.finprimerosabado    = this.toDateString('2021-12-07T14:59:59.000');
          this.HorarioMaquina.activoprimerosabado  = result.activoprimerosabado;
          this.HorarioMaquina.activoprimerodomingo= result.activoprimerodomingo;
          this.HorarioMaquina.iniciosegundosabado = this.toDateString('2021-12-07T15:00:00.000');
          this.HorarioMaquina.finsegundosabado    = this.toDateString('2021-12-07T22:59:59.000');
          this.HorarioMaquina.activosegundosabado  = result.activosegundosabado;
          this.HorarioMaquina.activosegundodomingo  = result.activosegundodomingo;
          this.HorarioMaquina.iniciotercerosabado = this.toDateString('2021-12-07T23:00:00.000');
          this.HorarioMaquina.fintercerosabado    = this.toDateString('2021-12-08T06:59:59.000');
          this.HorarioMaquina.activotercerosabado  = result.activotercerosabado;
          this.HorarioMaquina.activotercerdomingo = result.activotercerdomingo;


       }

      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de los Horarios, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
  }

  btnGuardar(): void {
    this.HorarioMaquina.idhorario=0;

    this.HorarioMaquina.clavemaquina = this.filtros.ClaveMaquina;

    if (this.TipoAccion === 1) {
      this.Horariomaquinaservice.Agregar(this.HorarioMaquina).subscribe((data) => {
        swal.fire(
          'Guardado con Éxito',
          'El Registro fue Guardado con Éxito',
          'success'
        );
        //this.btnCerrar();
        },(error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Guardar el Paro, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        )
      });

    }
    else {
      this.Horariomaquinaservice.Editar(this.HorarioMaquina).subscribe((data) => {
        swal.fire(
          'Guardado con Éxito',
          'El Registro fue Guardado con Éxito',
          'success'
        );
        //this.btnCerrar();
        },(error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Guardar el Paro, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        )
      });

    }

  }

  btnImprimir(): void {
    //this.urlReporte="http://datosnv2008.cecso.com.mx/ReportServer/Pages/ReportViewer.aspx?/FcaCajas01/FCAPROG001RW/FCAPROG001RW&rs:Command=Render";
    this.urlReporte="http://datos.cecso.com.mx/ServerRS/Pages/ReportViewer.aspx?/FCACajas/FCAPROG/FCAPROG001RW&rs:Command=Render"
    window.open(this.urlReporte, "_blank");

    //this.clsHorario.
  

  }

}
