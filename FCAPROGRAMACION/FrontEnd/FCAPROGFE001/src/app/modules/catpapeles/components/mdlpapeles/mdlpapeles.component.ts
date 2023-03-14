import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paros } from 'src/app/models/paros';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ParomaquinaserviceService } from 'src/app/services/paromaquinaservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { PapelesserviceService } from 'src/app/services/papelesservice.service';

interface tblDatos {
  clavepapel : string;
  gramaje : number;
  precioton : number;
  pesosm2 : number;
  tipopapel : string;
  nombre : string;
  proveedor : string;
  dolar : boolean;
  fleteaduana : number;
  pesostonelada : number;
  mullenliner : number;
  cmtmedium : number;
  usocostos : boolean;
  calibre : number;
  tipoproveedor : string;
  presentacion : string;
  claveprincipal : string;
  rctcct : number;
  codigopapel : string;
  capturacalidad : boolean;
  capturacostos : boolean;
  cverefhomo : string;
  estatus : boolean;  
  usuario: string;
}

interface tblPermisos {
usuario  : string;
aplicacion  : string;
propiedad  : string;
tipo : number;
permisos : number;
estatus : boolean; 
}

@Component({
  selector: 'app-mdlpapeles',
  templateUrl: './mdlpapeles.component.html',
  styleUrls: ['./mdlpapeles.component.css']
})
export class MdlpapelesComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  booEstatus: boolean;
  IsVisField1: boolean;
  IsVisField2: boolean;


  //@Input() dtInicio: string;
  //@Input() dtFin: string;

  //@Input() inTipoMaquina: string;  
  //@Input() inClaveMaquina: string;
  
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) 
    {     
      this.booEstatus = this.Permisos["estatus"];

      if (Object.keys(value).length !== 0) {
        if (this.booEstatus){
          this.IsVisField1 = false;
          this.IsVisField2 = true;
        }
        else
        {
          this.IsVisField1 = true;
          this.IsVisField2 = false;
        }
        this.DatFormulario = value;
      }

      if (this.TipoAccion === 'M'){

      } else {

      }    

    }
    date: Date;

  @Output() ClickbtnCerrar = new EventEmitter<any>();

  @Output() ClickbtnActualizarGridPopup = new EventEmitter<any>();
  
  Paros : Array<Paros>;

  DatFormulario: tblDatos = 
  { 
    clavepapel :  '',
    gramaje :   0,
    precioton :   0,
    pesosm2 :   0,
    tipopapel :  '',
    nombre :  '',
    proveedor :  "",
    dolar :  false,
    fleteaduana :   0,
    pesostonelada :   0, 
    mullenliner :   0,
    cmtmedium :  0, 
    usocostos :  false,
    calibre :  0,
    tipoproveedor :  '', 
    presentacion : '', 
    claveprincipal :  '',
    rctcct :  0,
    codigopapel :  '', 
    capturacalidad :  false,
    capturacostos :  false,
    cverefhomo :  '', 
    estatus :  false,
    usuario: '001000'
  };

  Permisos : tblPermisos = {
    usuario  :  '001000', 
    aplicacion :  '', 
    propiedad  :  '',
    tipo :  0,
    permisos :  0,
    estatus :  false,
  };


  constructor(private route: ActivatedRoute
    , public papelesserviceService: PapelesserviceService
    , private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPermisos();
  }

  getPermisos(){    
    this.papelesserviceService.getPermisos().subscribe(
      (data: any) => {
        this.Permisos = data.data[0];
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de permisos, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
  }

  OnChangechkDollar($event){
    this.DatFormulario.dolar = $event.checked;
  }

  btnCerrar(): void {
    this.ClickbtnCerrar.emit();
  }

  //buscarRollos
  buscarRollos(): void {
    //this.ClickbtnCerrar.emit();
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


    if (this.DatFormulario.rctcct < 0) {
      Validar.val = false;
    }
    if (this.DatFormulario.cmtmedium < 0) {
      Validar.val = false;
    }
    if (this.DatFormulario.mullenliner < 0) {
      Validar.val = false;
    }
    if (this.DatFormulario.calibre < 0) {
      Validar.val = false;
    }
    
    return Validar;
  }





  btnGuardar(): void {    
    const validar = this.Validaciones();

    //Number(this.DatFormulario.rctcct);
    this.DatFormulario.rctcct =  Number("0"+this.DatFormulario.rctcct);
    this.DatFormulario.mullenliner =  Number("0"+this.DatFormulario.mullenliner);
    this.DatFormulario.cmtmedium =  Number("0"+this.DatFormulario.cmtmedium);
    this.DatFormulario.calibre =  Number("0"+this.DatFormulario.calibre);

    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.papelesserviceService.Agregar(this.DatFormulario).subscribe((data) => {
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

        if (this.booEstatus){
          this.papelesserviceService.Modificar2(this.DatFormulario).subscribe((data) => {
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
        else
        {
          this.papelesserviceService.Modificar(this.DatFormulario).subscribe((data) => {
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



    }
    else {
      //this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }
    


  }

}
