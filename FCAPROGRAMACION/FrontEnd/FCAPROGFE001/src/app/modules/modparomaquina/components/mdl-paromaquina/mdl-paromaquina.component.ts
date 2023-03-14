import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paros } from 'src/app/models/paros';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ParomaquinaserviceService } from 'src/app/services/paromaquinaservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';


interface clsParo {
  tipotiempo: string;
  clavemaquina: string;
  fecha: string;
  horaini: string;
  horafin: string;
  tiempomin: number;
  comentario: string;
  estatus : boolean;  
  usuario: string;
}

@Component({
  selector: 'mdl-paromaquina',
  templateUrl: './mdl-paromaquina.component.html',
  styleUrls: ['./mdl-paromaquina.component.css']
})
export class MdlParomaquinaComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;


  @Input() dtInicio: string;
  @Input() dtFin: string;

  @Input() inTipoMaquina: string;  
  @Input() inClaveMaquina: string;
  
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) 
    {     
      if (Object.keys(value).length !== 0) {
        this.DatFormulario = value;
      }
      if (this.TipoAccion === 'M'){

        var dateIni = new Date(this.DatFormulario.horaini); 
        var isoDateTimeIni = new Date(dateIni.getTime() - (dateIni.getTimezoneOffset() * 60000)).toISOString();
        this.dtInicio = isoDateTimeIni.slice(0, 16);

        var dateFin = new Date(this.DatFormulario.horafin); 
        var isoDateTimeFin = new Date(dateFin.getTime() - (dateFin.getTimezoneOffset() * 60000)).toISOString();
        this.dtFin = isoDateTimeFin.slice(0, 16);

      } else {
        
        var dateIni = new Date(); 
        var isoDateTimeIni = new Date(dateIni.getTime() - (dateIni.getTimezoneOffset() * 60000)).toISOString();
        this.dtInicio = isoDateTimeIni.slice(0, 16);

        var dateFin = new Date(); 
        var isoDateTimeFin = new Date(dateFin.getTime() - (dateFin.getTimezoneOffset() * 60000)).toISOString();
        this.dtFin = isoDateTimeFin.slice(0, 16);

        this.DatFormulario.comentario='';


      }    

    }
    date: Date;

  @Output() ClickbtnCerrar = new EventEmitter<any>();

  @Output() ClickbtnActualizarGridPopup = new EventEmitter<any>();
  
  Paros : Array<Paros>;

  DatFormulario: clsParo = 
  { 
    tipotiempo: '', 
    clavemaquina: '', 
    fecha: '', 
    horaini: '', 
    horafin: '', 
    tiempomin: 0, 
    comentario: '', 
    estatus : true,  
    usuario: '001000'
  };


  constructor(private route: ActivatedRoute
    , public paromaquinaservice: ParomaquinaserviceService
    , private modalService: NgbModal
    ) {


     }

     ondateChangeddtInicio(eventDate: any): Date | null {
      this.dtInicio = eventDate.target.value;

      var startTime = new Date(this.dtInicio); 
      var endTime = new Date(this.dtFin);
      var difference = endTime.getTime() - startTime.getTime(); 
      var resultInMinutes = Math.round(difference / 60000);

      this.DatFormulario.tiempomin =  resultInMinutes + 0 ;

      if(this.DatFormulario.tiempomin <= 0)
      {
         this.dtInicio = this.dtFin;
        this.DatFormulario.tiempomin=0;
        swal.fire(
          'Favor de seleccionar una fecha inicial menor a fecha final',
          'Validacion de Fechas',
          'error'
        );
      }

      return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
    }  

     ondateChangeddtFin(eventDate: any): Date | null {
      this.dtFin = eventDate.target.value;
      var startTime = new Date(this.dtInicio); 
      var endTime = new Date(this.dtFin);
      var difference = endTime.getTime() - startTime.getTime(); 
      var resultInMinutes = Math.round(difference / 60000);

      this.DatFormulario.tiempomin =  resultInMinutes + 0 ;

      if(this.DatFormulario.tiempomin <= 0)
      {
        this.dtFin= this.dtInicio;
        this.DatFormulario.tiempomin=0;
        swal.fire(
          'Favor de seleccionar una fecha final mayor a fecha inical',
          'Validacion de Fechas',
          'error'
        );
      }



      return !!eventDate.target.value ? new Date(eventDate.target.value) : null;
    }  
    
    setValue(element, date) {
      var isoString = date.toISOString()
      element.value = isoString.substring(0, (isoString.indexOf("T")|0) + 6|0);
  }

  private toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2))
       + 'T' + date.toTimeString().slice(0,5);
}

  ngOnInit(): void {

  }

  btnCerrar(): void {
    this.ClickbtnCerrar.emit();
  }

  btnActualizarGrid(): void {
    this.ClickbtnActualizarGridPopup.emit();
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

    var startTime = new Date(this.dtInicio); 
    var endTime = new Date(this.dtFin);
    var difference = endTime.getTime() - startTime.getTime(); 
    var resultInMinutes = Math.round(difference / 60000);

    if (startTime.getTime() > endTime.getTime()) {
      Validar.val = false;
      Validar.mensaje = 'La fecha hora Inicial debe ser menor a fecha hora final';
    }

    if (resultInMinutes <= 0) {
      Validar.val = false;
      Validar.mensaje = 'Capture un rango de paro mayor que cero.';
    }

    if (this.DatFormulario.comentario === '') {
      Validar.val = false;
    }
    return Validar;
  }





  btnGuardar(): void {    
    this.DatFormulario.tiempomin =  + 0 ;
    this.DatFormulario.fecha = this.dtInicio;
    this.DatFormulario.horaini = this.dtInicio;
    this.DatFormulario.horafin = this.dtFin;
    this.DatFormulario.tipotiempo =  this.inTipoMaquina;
    this.DatFormulario.clavemaquina =  this.inClaveMaquina;
    this.DatFormulario.usuario =  "";

    const validar = this.Validaciones();
    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.paromaquinaservice.Agregar(this.DatFormulario).subscribe((data) => {
          swal.fire(
            'Guardado con Éxito',
            'El Registro fue Guardado con Éxito',
            'success'
          );
          this.btnCerrar();
          },(error) => {
          swal.fire(
            'Ha Ocurrio un Error',
            'Ha Ocurrio un Error al Momento de Guardar el Paro, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
            'error'
          )
        });
      } else {
        this.paromaquinaservice.Editar(this.DatFormulario).subscribe((data) => {
          swal.fire(
            'Actualizado con Éxito',
            'El Registro fue Actualizado con Éxito',
            'success'
          );
          this.btnCerrar();
          },(error) => {
          swal.fire(
            'Ha Ocurrio un Error',
            'Ha Ocurrio un Error al Momento de Guardar el Paro, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
            'error'
          )
        });      
      }

    }
    else {
      //this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }


  }

}
