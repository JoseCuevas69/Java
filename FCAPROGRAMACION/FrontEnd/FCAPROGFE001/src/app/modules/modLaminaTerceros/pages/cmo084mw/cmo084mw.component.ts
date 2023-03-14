//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { Maquina } from 'src/app/models/maquina';
import swal from 'sweetalert2';
import { LaminatercerosserviceService } from 'src/app/services/laminatercerosservice.service';
import { ActivatedRoute } from '@angular/router';
//import { MatTabGroup } from '@angular/material/tabs';



interface Filtros {
  orialmacen: string; 
  oriop: string;
  desalmacen: string; 
  desop: string;
  cantransferir: number;
  usuario: string;
}

interface clsAlmacen {
  clave: string; 
  nombre: string;
  tipoalmacen: string; 
  usuario: string;
}

interface clsLamTerResultado
{
  op: string; 
  clavecli: string;
  nombrecli: string; 
  claveart: string;
  nombreart : string;
  cantransferir: number;
  cantidad: string;
  resistencia: string;
  flauta: string; 
  papel: string;
  industria: string;
  largolamina: number;
  ancholamina: number;
  piezasxhoja: number;
  areaunitaria: number;
  pesounitario: number;
  largodesarrollo: number;
  anchodesarrollo: number;
  excedente: number;
  cantidadproducida: number;
  excedenteaplicado: number;
  transferido: number;
  saldo: number;
  opestatus: string; 
  opinterplanta: string;
  notas: string;
  notascartera: string;
  notascostos: string;
}

interface clsLamTerMovimiento {
  orialmacen: string; 
  oriop: string;
  desalmacen: string; 
  desop: string;
  cantransferir: number;
  usuario: string;
}


@Component({
  selector: 'app-cmo084mw',
  templateUrl: './cmo084mw.component.html',
  styleUrls: ['./cmo084mw.component.css']
})
export class Cmo084mwComponent implements OnInit {

  strClaveCli: string;
  strOP : string;
  strOPEstatus : string;

/*
  Almacen: clsAlmacen = 
    { 
      clave: '', 
      nombre: '', 
      tipoalmacen: '', 
      usuario: ''
    }*/
    

  filtros: Filtros = 
    { 
      orialmacen: 'undefined', 
      oriop: '', 
      desalmacen: '', 
      desop: '', 
      cantransferir: 0,
      usuario: ''
    };

  tbllamterresultado: clsLamTerResultado = 
    {
      op:  '', 
      clavecli:  '', 
      nombrecli:  '', 
      claveart:  '', 
      nombreart:  '', 
      cantransferir: 0,
      cantidad:  '', 
      resistencia:  '', 
      flauta:  '', 
      papel: '', 
      industria: '', 
      largolamina: 0,
      ancholamina: 0,
      piezasxhoja: 0,
      areaunitaria: 0,
      pesounitario: 0,
      largodesarrollo: 0,
      anchodesarrollo: 0,
      excedente: 0,
      cantidadproducida: 0,
      excedenteaplicado: 0,
      transferido: 0,
      saldo: 0,
      opestatus:  '', 
      opinterplanta:  '', 
      notas:  '', 
      notascartera:  '', 
      notascostos:  ''
    }

    Almacen : Array<clsAlmacen>;

  constructor(private route: ActivatedRoute, public laminatercerosserviceService: LaminatercerosserviceService,  private modalService: NgbModal)
  { }

  ngOnInit(): void {
    this.getAlmacen();
  }

  getAlmacen(): void {
    this.laminatercerosserviceService.getObtieneAlmacenes().subscribe(
      (data: any) => {
        this.Almacen = data.data;

      }, (error) => {
          swal.fire(
            'Ocurrio un Error',
            'Ocurrio un error al cargar la informacion de las Almacenes, favor de comunicarse con informatica y generar un reporte de fallas' + error,
            'error'
          );
        });

  }

  BuscarOp(): void {
    const validarFiltros = this.ValidarFiltros();
    if (validarFiltros.val) {
      this.laminatercerosserviceService.getDatosTraspasoOrigen(this.filtros).subscribe(
        (data: any) => {
  
          this.strClaveCli = "" + data.data[0].clavecli ;
          this.strOP = "" + data.data[0].op;
          this.strOPEstatus = "" + data.data[0].opestatus;

          this.tbllamterresultado.op = ""; 
          this.tbllamterresultado.clavecli = ""; 
          this.tbllamterresultado.nombrecli= "";  
          this.tbllamterresultado.claveart = ""; 
          this.tbllamterresultado.nombreart = "";  
          this.tbllamterresultado.cantransferir = 0; 
          this.tbllamterresultado.cantidad = ""; 
          this.tbllamterresultado.resistencia = ""; 
          this.tbllamterresultado.flauta = ""; 
          this.tbllamterresultado.papel = ""; 
          this.tbllamterresultado.industria  = ""; 
          this.tbllamterresultado.largolamina = 0; 
          this.tbllamterresultado.ancholamina = 0; 
          this.tbllamterresultado.piezasxhoja = 0; 
          this.tbllamterresultado.areaunitaria = 0; 
          this.tbllamterresultado.pesounitario = 0; 
          this.tbllamterresultado.largodesarrollo = 0; 
          this.tbllamterresultado.anchodesarrollo = 0; 
          this.tbllamterresultado.excedente = 0; 
          this.tbllamterresultado.cantidadproducida = 0; 
          this.tbllamterresultado.excedenteaplicado = 0; 
          this.tbllamterresultado.transferido = 0; 
          this.tbllamterresultado.saldo = 0; 
          this.tbllamterresultado.opestatus = ""; 
          this.tbllamterresultado.opinterplanta = ""; 
          this.tbllamterresultado.notas = ""; 
          this.tbllamterresultado.notascartera = "";  
          this.tbllamterresultado.notascostos = ""; 
    
    
            const validar = this.Validaciones();
            if (validar.val) {
              this.tbllamterresultado = data.data[0];
            } else {
              swal.fire('', validar.mensaje, 'error');
            }
        
        
        }, (error) => {
          swal.fire(
            'Ocurrio un Error',
            'Ocurrio un error al cargar la informacion de las OPs, favor de comunicarse con informatica y generar un reporte de fallas' + error,
            'error'
          );
        });

    } else {
      swal.fire('', validarFiltros.mensaje, 'error');
    }
  }



  ValidarFiltros(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };

    if (this.filtros.orialmacen.toString() === "" || this.filtros.orialmacen.toString() === "undefined")
    {
      Validar.val = false;
      Validar.mensaje = "Seleccione un Almacen...";
    } else if (this.filtros.oriop.toString() === "")
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese una OP a buscar...";
    }
    return Validar;
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

    if (this.strClaveCli.toString() != "003910")
    {
      Validar.val = false;
      Validar.mensaje="La OP " + this.strOP + " No Corresponde al Cliente 003910 de Recepcion Lamina Teceros...";
    }
    else if (this.strOPEstatus.toString() == "SUS" || this.strOPEstatus.toString() == "CAN")
    {
      Validar.val = false;
      Validar.mensaje = "La OP " + this.strOP + " esta Cancelada o Suspendida...";
    }    
    if (this.strOPEstatus.toString() == "GEN")
    {
      Validar.val = false;
      Validar.mensaje = "La OP " + this.strOP + " esta Cancelada o Suspendida...";    
    }
    return Validar;
  }


  btnGuardar(): void {
    const validarGuardado = this.ValidarGuardar();
    if (validarGuardado.val) {
      this.laminatercerosserviceService.AplicarPreEntrada(this.filtros).subscribe((data) => {
        swal.fire(
          'Se Genero Pre Entrada',
          'Se genero una Pre Entrada a la OP :' + this.filtros.oriop.toString() + ' - ' + this.filtros.cantransferir.toString(),
          'success'
        );

        this.Limpiar();

        },(error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al generar la Pre Entrada, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        )
      });


     } else {
      swal.fire('', validarGuardado.mensaje, 'error');
    }
    
  }

  ValidarGuardar(): any {
    const Validar = {
      val: true,
      titulo: '',
      mensaje:
        'Para poder guardar la información, es necesario completar toda la información obligatoria',
      case: 0,
      remplazar: null,
    };

    if (this.filtros.orialmacen.toString() === "" || this.filtros.orialmacen.toString() === "undefined")
    {
      Validar.val = false;
      Validar.mensaje = "Seleccione un Almacen...";
    } else if (this.filtros.oriop.toString() === "")
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese una OP a buscar...";
    } else if (this.filtros.cantransferir.toString() === "")
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese La cantidad a Transferir...";
    }
    else  if (this.filtros.cantransferir <= 0)
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese La cantidad Mayor a 0...";
    }
    return Validar;
  }

  Limpiar(): void {

    this.filtros.orialmacen ='undefined'; 
    this.filtros.oriop = ""; 
    this.filtros.desalmacen = "";
    this.filtros.desop = "";
    this.filtros.cantransferir = 0;
    this.filtros.usuario = "";
    

    this.strClaveCli = "" ;
    this.strOP = "" ;
    this.strOPEstatus = "" ;

    this.tbllamterresultado.op = ""; 
    this.tbllamterresultado.clavecli = ""; 
    this.tbllamterresultado.nombrecli= "";  
    this.tbllamterresultado.claveart = ""; 
    this.tbllamterresultado.nombreart = "";  
    this.tbllamterresultado.cantransferir = 0; 
    this.tbllamterresultado.cantidad = ""; 
    this.tbllamterresultado.resistencia = ""; 
    this.tbllamterresultado.flauta = ""; 
    this.tbllamterresultado.papel = ""; 
    this.tbllamterresultado.industria  = ""; 
    this.tbllamterresultado.largolamina = 0; 
    this.tbllamterresultado.ancholamina = 0; 
    this.tbllamterresultado.piezasxhoja = 0; 
    this.tbllamterresultado.areaunitaria = 0; 
    this.tbllamterresultado.pesounitario = 0; 
    this.tbllamterresultado.largodesarrollo = 0; 
    this.tbllamterresultado.anchodesarrollo = 0; 
    this.tbllamterresultado.excedente = 0; 
    this.tbllamterresultado.cantidadproducida = 0; 
    this.tbllamterresultado.excedenteaplicado = 0; 
    this.tbllamterresultado.transferido = 0; 
    this.tbllamterresultado.saldo = 0; 
    this.tbllamterresultado.opestatus = ""; 
    this.tbllamterresultado.opinterplanta = ""; 
    this.tbllamterresultado.notas = ""; 
    this.tbllamterresultado.notascartera = "";  
    this.tbllamterresultado.notascostos = ""; 

  }

}
