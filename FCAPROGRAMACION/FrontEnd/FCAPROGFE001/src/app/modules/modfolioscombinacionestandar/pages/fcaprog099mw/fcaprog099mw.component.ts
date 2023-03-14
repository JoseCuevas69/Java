import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Maquina } from 'src/app/models/maquina';
import swal from 'sweetalert2';
import { FolioscombinacionestandarserviceService } from 'src/app/services/folioscombinacionestandarservice.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';

interface tblPermisos {
  usuario  : string;
  aplicacion  : string;
  propiedad  : string;
  tipo : number;
  permisos : number;
  estatus : boolean; 
  }

interface Filtros {
  folio: string; 
  programa: string;
  op: string;
  clavearticulo: string;  
  flauta: string;
  flauta1 : number;
  flauta2  : number;

}

interface Parametros {
  startRow : Number;
  endRow : Number;
}

interface clsCmbStdDat01 {
  op : string;
  clavearticulo : string;
  descripcion : string;
  nombre : string;
  resistencia : string;
  flauta : string;
  ml : Number;
  m2 : Number;
  mcstd : Number;
  codigo : string;
}

interface clsCmbStdDat02 {
    programa : string;
    clavearticulo : string;
    liner1 : string;
    corrugado1 : string;
    liner2 : string;
    corrugado2 : string;
    liner3 : string;
    anchostd : Number;
    anchol1 : Number;
    anchol2 : Number;
    anchol3 : Number;
    anchoc1 : Number;
    anchoc2 : Number;
}
// clsCmbStdDat03
interface clsCmbStdDat03 {
  programa : string;
  clavearticulo : string;
  liner1 : string;
  corrugado1 : string;
  liner2 : string;
  corrugado2 : string;
  liner3 : string;
  anchostd : Number;
  anchol1 : Number;
  anchol2 : Number;
  anchol3 : Number;
  anchoc1 : Number;
  anchoc2 : Number;
}


//CmoDat125 -> clsFoliosCmbStd
interface clsFoliosCmbStd {
  folio : number;
  clavecliente : string;
  porrefile : string;
  fechagen : string;
  solicito : string;
  fecautjp : string;
  propelegjp : string;
  reviso : string;
  causamod : string;
  costostd : number;
  costoprop1 : number;
  costoprop2 : number;
  costoprop3 : number;
  dif1 : number;
  dif2 : number;
  dif3 : number;
  comentarios : string;
  programa : number;
  opcomb : string;
  enviacorreos : number;
  estatus : boolean;
}

//CmoDat126 -> clsPropuestaCmbStd
interface clsPropuestaCmbStd {
  folio : number;
  propuno : boolean;
  propdos : boolean;
  proptres : boolean;
  liner1p1 : string;
  liner2p1 : string;
  liner3p1 : string;
  corrugado1p1 : string;
  corrugado2p1 : string;
  anchol1p1 : number;
  anchol2p1 : number;
  anchol3p1 : number;
  anchoc1p1 : number;
  anchoc2p1 : number;
  liner1p2 : string;
  liner2p2 : string;
  liner3p2 : string;
  corrugado1p2 : string;
  corrugado2p2 : string;
  anchol1p2 : number;
  anchol2p2 : number;
  anchol3p2 : number;
  anchoc1p2 : number;
  anchoc2p2 : number;
  liner1p3 : string;
  liner2p3 : string;
  liner3p3 : string;
  corrugado1p3 : string;
  corrugado2p3 : string;
  anchol1p3 : number;
  anchol2p3 : number;
  anchol3p3 : number;
  anchoc1p3 : number;
  anchoc2p3 : number;
  estatus : boolean;
}

//CmoDat127 -> clsAutorizadoresCmbStd  c
interface clsAutorizadoresCmbStd {
  folio : number;
  autgciapta : string;
  fechgciapta : string;
  autcalidad : string;
  fechcalidad : string;
  propelegpta : string;
  propelegcal : string;
  costoproppta : number;
  costopropcal : number;
  estatus : boolean;
  /*usuarioinsert : string;
  fechainsert : string;
  usuarioupdate : string;
  fechaupdate : string;
  usuariodelete : string;
  fechadelete : string;*/
}

interface clsPropuestaCmbStd {}


@Component({
  selector: 'app-fcaprog099mw',
  templateUrl: './fcaprog099mw.component.html',
  styleUrls: ['./fcaprog099mw.component.css']
})
export class Fcaprog099mwComponent implements OnInit {
  [x: string]: any;

  booRefile: boolean;
  booCambioCombinacion : boolean;
  booAmbos : boolean;

  booActivar : boolean = true;
  isDisabled : boolean = true;
  //click : boolean = false;

  Datos = {};

matTabs = [1,2,3]; 
@ViewChild('tabGroup', {static:false}) tabGroup: MatTabGroup;

@ViewChild('gridPrincipal') grid: any;



strValueOpc : string;


columnDefs: any;

Permisos : tblPermisos = {
  usuario  :  '001000', 
  aplicacion :  '', 
  propiedad  :  '',
  tipo :  0,
  permisos :  0,
  estatus :  true,
};

par : Parametros = 
{
  startRow : 0,
  endRow : 7
}

filtros: Filtros = 
        { 
          folio: '', 
          programa: '',
          op: '', 
          clavearticulo: '', 
          flauta: '',
          flauta1 : 0,
          flauta2  : 0
        };

  tblDatos001: clsCmbStdDat01 = 
        { 
          op: '', 
          clavearticulo: '',
          descripcion: '',
          nombre: '',
          resistencia: '',
          flauta: '',
          ml: 0,
          m2: 0,
          mcstd: 0,
          codigo: ''
        };
  tblDatos002: clsCmbStdDat02 = {
          programa : '', 
          clavearticulo : '', 
          liner1 : '', 
          corrugado1 : '', 
          liner2 : '', 
          corrugado2 : '', 
          liner3 : '', 
          anchostd :0,
          anchol1 :0,
          anchol2 :0,
          anchol3 :0,
          anchoc1 :0,
          anchoc2 :0
      }
      //clsCmbStdDat03
      tblDatos003: clsCmbStdDat03 = {
        programa : '', 
        clavearticulo : '', 
        liner1 : '', 
        corrugado1 : '', 
        liner2 : '', 
        corrugado2 : '', 
        liner3 : '', 
        anchostd :0,
        anchol1 :0,
        anchol2 :0,
        anchol3 :0,
        anchoc1 :0,
        anchoc2 :0
    }

    //CmoDat125 -> clsFoliosCmbStd
    tblFoliosCmbStd : clsFoliosCmbStd = {
      folio :  0,
      clavecliente :  '',
      porrefile :  '',
      fechagen : '',
      solicito :  '',
      fecautjp : '',
      propelegjp :  '',
      reviso :  '',
      causamod :  '',
      costostd :  0,
      costoprop1 :  0,
      costoprop2 :  0,
      costoprop3 :  0,
      dif1 :  0,
      dif2 :  0,
      dif3 :  0,
      comentarios :  '',
      programa :  0,
      opcomb :  "",
      enviacorreos :  0,
      estatus :  false
    }

     //CmoDat126 -> clsPropuestaCmbStd
    tblPropuestaCmbStd : clsPropuestaCmbStd = {
      folio :  0 ,
      propuno :  false,
      propdos :  false,
      proptres :  false,
      liner1p1 :  "",
      liner2p1 :  "",
      liner3p1 :  "",
      corrugado1p1 :  "",
      corrugado2p1 :  "",
      anchol1p1 :  0,
      anchol2p1 :  0,
      anchol3p1 :  0,
      anchoc1p1 :  0,
      anchoc2p1 :  0,
      liner1p2 :  "",
      liner2p2 :  "",
      liner3p2 :  "",
      corrugado1p2 :  "",
      corrugado2p2 :  "",
      anchol1p2 :  0,
      anchol2p2 :  0,
      anchol3p2 :  0,
      anchoc1p2 :  0,
      anchoc2p2 :  0,
      liner1p3 :  "",
      liner2p3 :  "",
      liner3p3 : "",
      corrugado1p3 :  "",
      corrugado2p3 : "",
      anchol1p3 :  0,
      anchol2p3 :  0,
      anchol3p3 :  0,
      anchoc1p3 :  0,
      anchoc2p3 :  0,
      estatus :  false
    }

    //CmoDat127 -> clsAutorizadoresCmbStd  c
  tblAutorizadoresCmbStd : clsAutorizadoresCmbStd = {
    folio :  0,
    autgciapta : "",
    fechgciapta : "",
    autcalidad :  "",
    fechcalidad : "",
    propelegpta :  "",
    propelegcal :  "",
    costoproppta :  0,
    costopropcal :  0,
    estatus :  false
  }


constructor(private route: ActivatedRoute, public folioscombinacionestandarserviceService: FolioscombinacionestandarserviceService, private modalService: NgbModal) {

  this.columnDefs = [
    { headerName: 'OP', field:  'op', flex: 5, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
    { headerName: 'CVE ARTICULO', field:  'clavearticulo', flex: 2, minWidth: 150, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
    { headerName: 'DESCRIPCION', field:  'descripcion', flex: 2, minWidth: 200, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
    { headerName: 'CLIENTE', field:  'nombre', flex: 2, minWidth: 150, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
    { headerName: 'RESISTENCIA', field:  'resistencia', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
    { headerName: 'FLAUTA', field:  'flauta', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
    { headerName: 'M.L.', field:  'ml', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },
    { headerName: 'M2', field:  'm2', flex: 2, minWidth: 80, headerClass: 'header-center header-grid-left', cellClass: 'grid-cell-center', },

  ];

}

  ngOnInit(): void {
    this.getPermisos();
    //this.tabGroup._tabs.toArray()[2].disabled = true;
    //this.tabGroup._tabs.toArray()[3].disabled = true;
    //this.tabGroup._tabs.toArray()[4].disabled = true;
    //this.tabGroup._tabs.toArray()[2].disabled = true;
    //  or
    //this.tabGroup._tabs['_results'][2].disabled = true;
    this.booActivar = true;

    this.isDisabled = true;
    
  }

  onRefileChange(val: any) {
    this.strValueOpc = val.value; 
   } 

   onCambioCombinacionChange(val: any) {
    this.strValueOpc = val.value;   
   } 

   onAmbosChange(val: any) {
    this.strValueOpc = val.value;
   } 

  BuscarFolio(): void {
    this.grid.refreshData();
  }

  getPermisos(){    
    this.folioscombinacionestandarserviceService.getPermisosUsuario().subscribe(
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


  BuscarPrograma(): void {
    this.folioscombinacionestandarserviceService.getBuscarOPsxPrograma(this.par, this.filtros).subscribe(
      (data: any) => {
        this.tblDatos001 = data.data;
        this.filtros.op = data.data[0]["op"];
        this.filtros.clavearticulo = data.data[0]["clavearticulo"];
        this.filtros.flauta = data.data[0]["flauta"];

// angular.equals(this.filtros.flauta, "C")
// x.match(y) === null

// String("a").valueOf()

var strflauta = new String(this.filtros.flauta);
  
var index = strflauta.localeCompare( "C");

//x.match(y)

if(strflauta.match("C").length > 0) {
  this.filtros.flauta1 = 1.42;
  this.filtros.flauta2 = 1.42;
} 

  

      if(strflauta.localeCompare( "C") === 1) {
          this.filtros.flauta1 = 1.42;
          this.filtros.flauta2 = 1.42;
        } 
        else {
          if(strflauta.localeCompare( "B") === 1){
            this.filtros.flauta1 = 1.33;
            this.filtros.flauta2 = 1.33;
          } 
          else {
            if(strflauta.localeCompare( "CB") === 1){
              this.filtros.flauta1 = 1.42;
              this.filtros.flauta2 = 1.33;
            } 
            else {
              if(strflauta.localeCompare( "BC") === 1){
                this.filtros.flauta1 = 1.33;
                this.filtros.flauta2 = 1.42;
              }     
            }  
          }
        }



        this.getEstandaresvsPropuesta();
        this.getPropuestas();

        this.grid.refreshData();
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de las zonas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
  }

  getEstandaresvsPropuesta(): void {
    this.folioscombinacionestandarserviceService.getEstandaresvsPropuesta(this.par, this.filtros).subscribe(
      (data: any) => {
        //this.tblDatos002 = data.data;

        this.booActivar = false;

        this.tblDatos002.programa  = data.data[0]["programa"];
        this.tblDatos002.clavearticulo  = data.data[0]["clavearticulo"];
        this.tblDatos002.liner1  = data.data[0]["liner1"];
        this.tblDatos002.corrugado1  = data.data[0]["corrugado1"];
        this.tblDatos002.liner2  = data.data[0]["liner2"];
        this.tblDatos002.corrugado2  = data.data[0]["corrugado2"];
        this.tblDatos002.liner3  = data.data[0]["liner3"];
        this.tblDatos002.anchostd  = data.data[0]["anchostd"];
        this.tblDatos002.anchol1 = 0;
        this.tblDatos002.anchol2 = 0;
        this.tblDatos002.anchol3 = 0;
        this.tblDatos002.anchoc1 = 0;
        this.tblDatos002.anchoc2 = 0;


        //this.grid.refreshData();
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de las zonas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
    //this.grid.refreshData();
  }

  getPropuestas(): void {
    this.folioscombinacionestandarserviceService.getCombinacionEstPropuestas(this.par, this.filtros).subscribe(
      (data: any) => {
        //this.tblDatos003 = data.data;

        this.tblPropuestaCmbStd.liner1p1 = data.data[0]["liner1"];
        this.tblPropuestaCmbStd.liner2p1 = data.data[0]["liner2"];
        this.tblPropuestaCmbStd.liner3p1 = data.data[0]["liner3"];
        this.tblPropuestaCmbStd.corrugado1p1 = data.data[0]["corrugado1"];
        this.tblPropuestaCmbStd.corrugado2p1 = data.data[0]["corrugado2"];

        this.tblPropuestaCmbStd.anchol1p1 = data.data[0]["anchol1"];
        this.tblPropuestaCmbStd.anchol2p1 = data.data[0]["anchol2"];
        this.tblPropuestaCmbStd.anchol3p1 = data.data[0]["anchol3"];
        this.tblPropuestaCmbStd.anchoc1p1 = data.data[0]["anchoc1"];
        this.tblPropuestaCmbStd.anchoc2p1 = data.data[0]["anchoc2"];


/*
        this.tblDatos003.programa  = data.data[0]["programa"];
        this.tblDatos003.clavearticulo  = data.data[0]["clavearticulo"];
        this.tblDatos003.liner1  = data.data[0]["liner1"];
        this.tblDatos003.corrugado1  = data.data[0]["corrugado1"];
        this.tblDatos003.liner2  = data.data[0]["liner2"];
        this.tblDatos003.corrugado2  = data.data[0]["corrugado2"];
        this.tblDatos003.liner3  = data.data[0]["liner3"];
        this.tblDatos003.anchostd  = data.data[0]["anchostd"];
        this.tblDatos003.anchol1 = data.data[0]["anchol1"];
        this.tblDatos003.anchol2 = data.data[0]["anchol2"];
        this.tblDatos003.anchol3 = data.data[0]["anchol3"];
        this.tblDatos003.anchoc1 = data.data[0]["anchoc1"];
        this.tblDatos003.anchoc2 = data.data[0]["anchoc2"];
        */


        //this.grid.refreshData();
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de las zonas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
    //this.grid.refreshData();
  }


  BuscarPapeles(): void {
    //this.grid.refreshData();
  }

  btnAgregar(): void {
  }

  btnGenerar(): void {
    //this.booActivar = false;
    this.isDisabled = false;
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

/*
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
    }*/
    
    return Validar;
  }

  btnGuardar(): void {
    /*tblFoliosCmbStd
      folio :  0,
      clavecliente :  '',
      porrefile :  '',
      fechagen : '',
      solicito :  '',
      fecautjp : '',
      propelegjp :  '',
      reviso :  '',
      causamod :  '',
      costostd :  0,
      costoprop1 :  0,
      costoprop2 :  0,
      costoprop3 :  0,
      dif1 :  0,
      dif2 :  0,
      dif3 :  0,
      comentarios :  '',
      programa :  0,
      opcomb :  "",
      enviacorreos :  0,
      estatus :  false*/

      const validar = this.Validaciones();

    //Number(this.DatFormulario.rctcct);
    //this.DatFormulario.rctcct =  Number("0"+this.DatFormulario.rctcct);
    //this.DatFormulario.mullenliner =  Number("0"+this.DatFormulario.mullenliner);
    //this.DatFormulario.cmtmedium =  Number("0"+this.DatFormulario.cmtmedium);
    //this.DatFormulario.calibre =  Number("0"+this.DatFormulario.calibre);

    if (validar.val) {
      if (this.TipoAccion === 'A') {
        this.folioscombinacionestandarserviceService.cmoDat125_Agregar(this.tblFoliosCmbStd).subscribe((data) => {
            this.folioscombinacionestandarserviceService.cmoDat126_Agregar(this.tblPropuestaCmbStd).subscribe((data) => {
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


          },(error) => {
          swal.fire(
            'Ha Ocurrio un Error',
            'Ha Ocurrio un Error al Momento de Guardar el Paro, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
            'error'
          )
        });
      } else {

        //if (this.booEstatus){
          this.folioscombinacionestandarserviceService.cmoDat125_Modificar(this.DatFormulario).subscribe((data) => {
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
        //}
        /*else
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

        }*/

      }



    }
    else {
      //this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }



  }

  btnCancelar(): void {
    this.isDisabled = true;
    this.booActivar = true;
  }

  btnImprimir(): void {
  }


  btnCerrarModal(): void {
    //this.ModalParo.closeModal();
  }

}
