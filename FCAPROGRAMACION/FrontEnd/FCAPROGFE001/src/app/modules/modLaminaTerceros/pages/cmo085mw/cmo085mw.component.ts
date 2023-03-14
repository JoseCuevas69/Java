
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { LaminatercerosserviceService } from 'src/app/services/laminatercerosservice.service';
import { ActivatedRoute } from '@angular/router';


interface Filtros {
  orialmacen: string; 
  oriop: string;
  desalmacen: string; 
  desop: string;
  cantransferir: number;
  nota: string;
  folio : string;
  fecha : string;
  usuario: string;
  /*orialmacen: string; 
  oriop: string;
  desalmacen: string; 
  desop: string;
  cantransferir: number;
  usuario: string;*/
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
//-------------------------------------------

interface clsTraspaso {
  orialmacen: string; 
  oriop: string;
  desalmacen: string; 
  desop: string;
  cantransferir: number;
  nota: string;
  folio : string;
  fecha : string;
  usuario: string;
}

interface clsLamTerTraspaso
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


@Component({
  selector: 'app-cmo085mw',
  templateUrl: './cmo085mw.component.html',
  styleUrls: ['./cmo085mw.component.css']
})
export class Cmo085mwComponent implements OnInit {

  strClaveCli: string;
  strOP : string;
  strOPEstatus : string;

  filtros: Filtros = 
  { 
    orialmacen: 'undefined', 
    oriop: '', 
    desalmacen: '', 
    desop: '', 
    cantransferir: 0,
    nota: '',
    folio : '',
    fecha : '',
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

  tblTraspaso: clsTraspaso = 
  { 
    orialmacen: 'undefined', 
    oriop: '', 
    desalmacen: '', 
    desop: '', 
    cantransferir: 0,
    nota: '',
    folio : '',
    fecha : '',
    usuario: ''
  };

  tbllamterTraspaso: clsLamTerTraspaso = 
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

  AlmacenOri : Array<clsAlmacen>;
  AlmacenDes : Array<clsAlmacen>;

  constructor(private route: ActivatedRoute, public laminatercerosserviceService: LaminatercerosserviceService,  private modalService: NgbModal)
  { }

  ngOnInit(): void {
    this.getAlmacenOrigen();
    this.getAlmacenDestino();

    this.tblTraspaso.orialmacen = "undefined"; 
    this.tblTraspaso.desalmacen = "undefined"; 
    this.filtros.orialmacen = "undefined"; 


  }

  getAlmacenOrigen(): void {
    this.laminatercerosserviceService.AlmacenesOrigen().subscribe(
      (data: any) => {
        this.AlmacenOri = data.data;

      }, (error) => {
          swal.fire(
            'Ocurrio un Error',
            'Ocurrio un error al cargar la informacion de las Almacenes, favor de comunicarse con informatica y generar un reporte de fallas' + error,
            'error'
          );
        });

  }

  getAlmacenDestino(): void {
    this.laminatercerosserviceService.AlmacenesDestino().subscribe(
      (data: any) => {
        this.AlmacenDes = data.data;

      }, (error) => {
          swal.fire(
            'Ocurrio un Error',
            'Ocurrio un error al cargar la informacion de las Almacenes, favor de comunicarse con informatica y generar un reporte de fallas' + error,
            'error'
          );
        });

  }

  btnCancelar(): void {
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

    this.tblTraspaso.orialmacen = "undefined"; 
    this.tblTraspaso.oriop = ""; 
    this.tblTraspaso.folio = ""; 
    this.tblTraspaso.fecha = ""; 
    this.tblTraspaso.desalmacen = "undefined"; 
    this.tblTraspaso.desop = ""; 
    this.tblTraspaso.cantransferir = 0; 

    this.filtros.oriop = ""; 
    this.filtros.orialmacen = "undefined"; 
    this.filtros.cantransferir = 0;
    
    this.tbllamterTraspaso = this.tbllamterresultado;

  }

  btnGuardar(): void {

    const validarGuardado = this.ValidarGuardar();
    if (validarGuardado.val) {
      this.laminatercerosserviceService.AplicarTraspaso(this.tblTraspaso).subscribe((data) => {
        swal.fire(
          'Se Genero Traspaso',
          'Se genero Traspaso de la OP :' + this.tblTraspaso.oriop.toString() + ' - ' + this.tblTraspaso.cantransferir.toString(),
          'success'
        );

        this.btnCancelar();

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

    if (this.tblTraspaso.orialmacen.toString() === "" || this.tblTraspaso.orialmacen.toString() === "undefined")
    {
      Validar.val = false;
      Validar.mensaje = "Seleccione un Almacen Origen...";
    } else if (this.tblTraspaso.desalmacen.toString() === "" || this.tblTraspaso.desalmacen.toString() === "undefined")
    {
      Validar.val = false;
      Validar.mensaje = "Seleccione un Almacen Destino...";
    } else if (this.tblTraspaso.oriop.toString() === "")
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese una OP a Transferir...";
    } else if (this.tblTraspaso.cantransferir.toString() === "")
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese La cantidad a Transferir...";
    }
    else  if (this.tblTraspaso.cantransferir <= 0)
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese La cantidad Mayor a 0...";
    }
    return Validar;
  }


  btnEnviar(): void {
    const ValidarEnviar = this.ValidarEnviar();
    if (ValidarEnviar.val) {
      this.tbllamterTraspaso = this.tbllamterresultado;
      this.tblTraspaso.oriop = this.filtros.oriop;
      this.tblTraspaso.orialmacen = this.filtros.orialmacen;
      // R3050-01-C
      this.tblTraspaso.desop = this.filtros.oriop;
      this.tblTraspaso.desalmacen = "undefined"; //this.filtros.orialmacen;
      this.tblTraspaso.cantransferir = this.filtros.cantransferir;


    } else {
      swal.fire('', ValidarEnviar.mensaje, 'error');
    }

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
              this.filtros.cantransferir = this.tbllamterresultado.saldo;
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


  ValidarEnviar(): any {
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
      Validar.mensaje = "Ingrese una OP...";
    }else if (this.filtros.cantransferir.toString() === "")
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese una Cantidada a Transferir...";
    } else  if (this.filtros.cantransferir <= 0)
    {
      Validar.val = false;
      Validar.mensaje = "Ingrese La cantidad Mayor a 0...";
    } else  if (this.filtros.cantransferir > this.tbllamterresultado.saldo)
    {
      Validar.val = false;
      Validar.mensaje = "La cantidada a Transferir No debe de pasar el Limite del saldo...";
    }


    


    return Validar;
  }




}
