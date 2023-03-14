import { Component, OnInit, ViewChild } from '@angular/core';
import { GridModel } from 'src/app/models/common/gridModel';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';
import swal from 'sweetalert2';
import {MaquinasService} from 'src/app/services/Programacion/maquinas.service';
import {Desperdicio,MaquinaSelec,Procesos,Evaluaciones,Tripulaciones,Maquina,guardaMaquinas} from 'src/app/models/Programacion/Maquinas';

interface Filtros{
  filtro:string;
}

interface Desperdicios
{id:number;rInicial:number;rFinal:number;desperdicio:number};

@Component({
  selector: 'app-fcaprogcat008-cw',
  templateUrl: './fcaprogcat008-cw.component.html',
  styleUrls: ['./fcaprogcat008-cw.component.css']
})
export class FCAPROGCAT008CWComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('gridPrincipal') private Grid: any;
  @ViewChild('gridDesperdiciosview') private GridDesperdiciosview: any;
  @ViewChild('gridDesperdicioscap') private GridDesperdicioscap: any;
  @ViewChild('gridPuestos') private GridPuestos: any;
  @ViewChild('mdlDesperdicio') private mdlDesperdicio : any;
  @ViewChild('mdlCapDesperdicio') private mdlCapDesperdicio : any;
  @ViewChild('mdlPuestos') private mdlPuestos : any;
  filtros:Filtros={filtro:''};
  mdlDesperdicioRef: NgbModalRef;
  mdlCapDesperdicioRef: NgbModalRef;
  mdlPuestosRef: NgbModalRef;
  columnDefs: any;
  columnDefsDesperdiciosview: any;
  columnDefsDesperdicioscap:any;
  desperdicioDataview: Desperdicio[];
  desperdicioDatacap: Desperdicio[];
  maquinaSeleccionada:MaquinaSelec;
  ocultarCaptura:boolean=true;
  procesos: Procesos[];
  evaluaciones: Evaluaciones[];
  tripulaciones: Tripulaciones[];
  tripulacionesPorMaquina: Tripulaciones[]=[];
  tripulacionSeleccionada: Tripulaciones;
  tripulacionPorMaquinaSeleccionada: Tripulaciones;
  maquinaSelec:Maquina={
    tipoMaquina:''
    ,claveMaquina:''
    ,nombre:''
    ,troquela:false
    ,tintasMax:0
    ,anchoMax : 0
    ,anchoMaxT :0
    ,anchoMaxAlt :0
    ,anchoMin : 0
    ,largoMax :0
    ,largoMaxT : 0
    ,largoMin : 0
    ,costoMinuto :0
    ,capacidadSemanal :0
    ,salariosTurno : 0
    ,desp1000 : 0
    ,desp10000 : 0
    ,despMayor10000 : 0
    ,m2Hora : 0
    ,noAceptaPiezasxCorte : false
    ,eficiencia : 0
    ,tproceso : 0
    ,default : false
    ,imprime : false 
    ,codEvaluacion :0
    ,minStd : 0
    ,turnosxDia : 0
    ,evaluaMtto : false
    ,porcenEvaluaMtto :0
    ,evalua : 'NA'
    ,valMinStd : false 
    ,evaluaVelocidad : false 
    ,maquinaPar :0
    ,pzaValStd :0
    ,esCapAut : false 
    ,ubucacionPlcCP: 0
    ,permiteMoficarProd: false 
    ,implementadoAut: false 
    ,tipoConsulta: 0
    ,isRecord: false 
    ,limiteReserva: 0
    ,utilizaSuaje66: false 
    ,utilizaSuaje50: false 
    ,esCortadora: false 
    ,esEtiquetadora: false 
    ,idAreaCosto: 0

  }
  capturasDesperdicio: Desperdicios={id:0,rInicial:0,rFinal:0,desperdicio:0};
  desperdicioSelec: Desperdicio;
  accionDesperdicios:string;
  maquinasArray: Maquina[]=[];
  guardamaquinas: guardaMaquinas={Maquinas:[],Desperdicios:[],Tripulaciones:[],CambioEficiencia:false,CambioCodEvaluacion:false};
  codEvaluaorig: number=0;
  eficienciaorig: number=0;
  columnDefsPuestos: { headerName: string; field: string; flex: number; minWidth: number; headerClass: string; cellClass: string; }[];
  accion:string='C';
  desabilitaEvaluacion:boolean=true;
  desabilitaPorcEval:boolean=true;
  desperdicioDatacapCopia:Desperdicios[]=[];
  varInicial:number=0;
  varFinal:number=0;
  varDesperdicio:number=0;
  nombreAccion='Guardar';


  constructor(public maquinasService:MaquinasService,private modalService: NgbModal) {
    this.columnDefs = [
      {
        headerName: 'Clave Maquina',
        field: 'claveMaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Troquela',
        field: 'troquela',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter:this.valueFormaterTroquela
      },
      {
        headerName: 'Proceso',
        field: 'proceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Default',
        field: 'default',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        valueFormatter:this.valueFormaterDefault
      },
      {
        headerName: 'Ver Rango Desp.',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.verDesperdicio.bind(this),
          label: '<i class="fa fa-eye"></i>',
          class: 'btn btn-primary btn-sm',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 160,
        maxWidth:160,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.CargaInformaciondeMaquina.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.EliminaMaquina.bind(this),
          label: '<i class="fa fa-trash"></i>',
          class: 'btn btn-danger btn-sm',
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
    ];
    this.columnDefsDesperdiciosview = [
      {
        headerName: 'R.Inicial',
        field: 'rInicial',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'R.Final',
        field: 'rFinal',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        
      },
      {
        headerName: 'Desperdicio',
        field: 'desperdicio',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      }
    ];
    this.columnDefsDesperdicioscap = [
      {
        headerName: 'R.Inicial',
        field: 'rInicial',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'R.Final',
        field: 'rFinal',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        
      },
      {
        headerName: 'Desperdicio',
        field: 'desperdicio',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.actuaizarDesperdicio.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm',
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.eliminarDesperdicio.bind(this),
          label: '<i class="fa fa-trash"></i>',
          class: 'btn btn-danger btn-sm',
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
    ];
    this.columnDefsPuestos = [
      {
        headerName: 'Maquina',
        field: 'nombreMaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Puesto',
        field: 'descripcionPuestos',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        
      },
      {
        headerName: 'Operadores',
        field: 'personasRequeridas',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      }
    ];
   }

  ngOnInit(): void {
    this.desperdicioDatacap=[];
    this.llenarCombosCaptura();
    this.llenarListasTripulaciones('');
    //this.guardamaquinas.Maquinas=[];
  }

  valueFormaterDefault(params):string{
    if(params.value){return 'Default'} else {return ''}
  }
  valueFormaterTroquela(params):string{
    if(params.value){return 'SI'} else {return 'NO'}
  }
  btnBuscar(){
    this.Grid.refreshData();
  }
  verDesperdicio(value:any):void{
    this.maquinaSeleccionada= value.data;
    this.abrirModalDesperdicio();
    this.llenarGridDesperdiciosview(this.maquinaSeleccionada.claveMaquina);
  }
  Captura():void
  {
    this.ocultarCaptura=false;
    this.accion='C';
    this.nombreAccion='Guardar';
  }
  EliminaMaquina(value:any){
    this.maquinaSeleccionada=value.data;
    var maquina=this.maquinaSeleccionada.claveMaquina;
    swal
    .fire({
      title: 'Alerta',
      text: '¿Esta Seguro que desea Eliminar la Maquina: '+maquina+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed)
      {
        
        
        this.maquinasService.EliminaMaquina(this.maquinaSeleccionada).subscribe(
        (res)=>{
          if(res.correcto)
          {
            this.showMessage({title:res.mensaje,icon:'success'});
            this.Grid.refreshData();
          }
        }
       );
     }
    
    });
    
  }
  btnGuarda():void
  {
    this.blockUI.start('Guardando Infomracion..');
    var validares= this.validaAntesGuardar();
    
    if(validares==='')
    {

      var tproceso=String(this.maquinaSelec.tproceso);
      var codEva= String(this.maquinaSelec.codEvaluacion);
      this.maquinaSelec.codEvaluacion=parseInt(codEva==='-1'?'0':codEva);
      this.maquinaSelec.tproceso=parseInt(tproceso);    
      this.maquinaSelec.evalua='NA'

      if (this.accion==='C')
      {
        this.maquinasService.ValidaMaquinaExiste(this.maquinaSelec.claveMaquina).then(
          (res:{totalRecords:number})=>
          {
            switch (res.totalRecords)
            {
              case 0:
                this.guardaMaquinas();
                break;
              case 2:
                this.blockUI.stop();
                this.showMessage({title:'Ya existe una maquina con esta Clave'});
                return;
                break;
              case 1:
                this.blockUI.stop();
                swal
                .fire({
                  title: 'Alerta',
                  text: 'Maquina dada de baja.. Desea Reactivarla?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar',
                  cancelButtonText: 'Cancelar',
                }).then((result) => {
                  if(result.isConfirmed)
                  {
                    this.blockUI.start('Activando Maquina..');
                    this.maquinasService.ActivaMaquina(this.maquinaSelec).subscribe(
                      (res)=>{
                        if(res.correcto)
                        {
                          this.blockUI.stop();
                          this.showMessage({title:res.mensaje});
                          return;
                        }                        
                      }
                    );
                  }
                  else
                  {
                    return;
                  }
                }
              );  
              break;

            }

          }
        )
      }
      else
      {
        this.guardaMaquinas();
      }
     
    }
    else
    {
      this.blockUI.stop();
      this.showMessage({title:validares,icon:'error'});
    }
  }
  guardaMaquinas():void
  {
    this.blockUI.start('Guardando Infomracion..');
    var validares= this.validaAntesGuardar();
    
    if(validares==='')
    {
      
      /*var tproceso=String(this.maquinaSelec.tproceso);
      var codEva= String(this.maquinaSelec.codEvaluacion);
      this.maquinaSelec.codEvaluacion=parseInt(codEva);
      this.maquinaSelec.tproceso=parseInt(tproceso);    
      this.maquinaSelec.evalua='NA'*/

      if(this.eficienciaorig!==this.maquinaSelec.eficiencia){this.guardamaquinas.CambioEficiencia=true}else{this.guardamaquinas.CambioEficiencia=false;}
      if(this.maquinaSelec.default)
      {
        this.maquinasService.ValidaMaquinaDefault(this.maquinaSelec.claveMaquina,this.maquinaSelec.tproceso).then(
          (res:{correcto:boolean})=>
          {
           if(!res.correcto)
           {
              if(this.codEvaluaorig!==this.maquinaSelec.codEvaluacion&&this.codEvaluaorig!==0)
              {
                this.guardamaquinas.CambioCodEvaluacion=true;
                this.blockUI.stop();
                swal
                .fire({
                  title: 'Alerta',
                  text: 'Se ha Detectado un cambio en el Tipo de Evaluación (Sera Necesario Configurar los Niveles de Distintivos de la Maquina Actual),¿Esta Seguro que desea cambiar el Tipo de Evaluación?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar',
                  cancelButtonText: 'Cancelar',
                }).then((result) => {
                  if(result.isConfirmed)
                  {
                    this.blockUI.start('Guardando Infomracion..');
                    this.guardamaquinas.Maquinas.push(this.maquinaSelec);
                    this.guardamaquinas.Desperdicios=this.desperdicioDatacap;
                    this.guardamaquinas.Tripulaciones=this.tripulacionesPorMaquina;
                    this.maquinasService.guardaMaquina(this.guardamaquinas).subscribe(
                      (res)=>{
                        if(res.correcto)
                        {
                          this.blockUI.stop();
                          this.showMessage({title:res.mensaje});
                          this.limpia();
                        }
                      }
                    );
      
                  }
                
                });
              }
              else
              {
                this.guardamaquinas.CambioCodEvaluacion=false;
                this.guardamaquinas.Maquinas.push(this.maquinaSelec);
                this.guardamaquinas.Desperdicios=this.desperdicioDatacap;
                this.guardamaquinas.Tripulaciones=this.tripulacionesPorMaquina;
                this.maquinasService.guardaMaquina(this.guardamaquinas).subscribe(
                  (res)=>{
                    if(res.correcto)
                    {
                      this.blockUI.stop();
                      this.showMessage({title:res.mensaje});
                      this.limpia();
                    }
                  }
                );
              }
            }
            else
            {
              this.blockUI.stop();
              this.showMessage({title:'No se posible definir la máquina como Default, ya existe una maquina como default',icon:'error'});
              this.maquinaSelec.default=false;
            }
          }

        );
      }
      else
      {
        if(this.codEvaluaorig!==this.maquinaSelec.codEvaluacion&&this.codEvaluaorig!==0)
        {
          this.guardamaquinas.CambioCodEvaluacion=true;
          this.blockUI.stop();
          swal
          .fire({
            title: 'Alerta',
            text: 'Se ha Detectado un cambio en el Tipo de Evaluación (Sera Necesario Configurar los Niveles de Distintivos de la Maquina Actual),¿Esta Seguro que desea cambiar el Tipo de Evaluación?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if(result.isConfirmed)
            {
              this.blockUI.start('Guardando Infomracion..');
              this.guardamaquinas.Maquinas.push(this.maquinaSelec);
              this.guardamaquinas.Desperdicios=this.desperdicioDatacap;
              this.guardamaquinas.Tripulaciones=this.tripulacionesPorMaquina;
              this.maquinasService.guardaMaquina(this.guardamaquinas).subscribe(
                (res)=>{
                  if(res.correcto)
                  {
                    this.blockUI.stop();
                    this.showMessage({title:res.mensaje});
                    this.limpia();
                  }
                }
              );

            }
          
          });
        }
        else
        {
          this.guardamaquinas.CambioCodEvaluacion=false;
          this.guardamaquinas.Maquinas.push(this.maquinaSelec);
          this.guardamaquinas.Desperdicios=this.desperdicioDatacap;
          this.guardamaquinas.Tripulaciones=this.tripulacionesPorMaquina;
          this.maquinasService.guardaMaquina(this.guardamaquinas).subscribe(
            (res)=>{
              if(res.correcto)
              {
                this.blockUI.stop();
                this.showMessage({title:res.mensaje});
                this.limpia();
                
              }
            }
          );
        }
      }
    }
    else
    {
      this.blockUI.stop();
      this.showMessage({title:validares,icon:'error'});
    }

    this.guardamaquinas={Maquinas:[],Desperdicios:[],Tripulaciones:[],CambioEficiencia:false,CambioCodEvaluacion:false};
    this.blockUI.stop();
  }

  guardarDesperdicio():void
  {
    console.log(this.accionDesperdicios);
    console.log(this.desperdicioDatacapCopia);
    if (this.varInicial===0 || this.varFinal===0 || this.varDesperdicio===0
      || this.varInicial===null || this.varFinal===null || this.varDesperdicio===null)
    {
      this.showMessage({title:'Debe Capturar los datos completos'})
      return;
    }
    var resultado=this.validacionDesperdicios();
    if (resultado==='')
    {
      if (this.accionDesperdicios==='C')
      {
        //this.desperdicioDatacapCopia.push(this.capturasDesperdicio);
        this.desperdicioDatacapCopia.push({id:0,rInicial:this.varInicial,rFinal:this.varFinal,desperdicio:this.varDesperdicio});
        this.desperdicioDatacap=this.desperdicioDatacapCopia;
        this.GridDesperdicioscap.refreshData();
        this.capturasDesperdicio={id:0,rInicial:0,rFinal:0,desperdicio:0};
        swal
        .fire({
          title: 'Alerta',
          text: 'Desea seguir capturando Desperdicio?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then((result) => {
          if(!result.isConfirmed)
          {
            this.mdlCapDesperdicioRef.close();
          }
          }
        );
        
      }
      else if (this.accionDesperdicios==='A')
      {
        var index=this.desperdicioDatacap.indexOf(this.desperdicioSelec);
        this.desperdicioDatacapCopia.splice(index,1,{id:this.desperdicioSelec.id,rInicial:this.varInicial,rFinal:this.varFinal,desperdicio:this.varDesperdicio});
        this.desperdicioDatacap=this.desperdicioDatacapCopia;
        this.GridDesperdicioscap.refreshData();
        this.mdlCapDesperdicioRef.close();

      }
    }
    else
    {
      this.showMessage({title:resultado});
    }
  }
  actuaizarDesperdicio(value:any):void
  {
    this.desperdicioSelec=value.data;
    this.varInicial=this.desperdicioSelec.rInicial;
    this.varFinal=this.desperdicioSelec.rFinal;
    this.varDesperdicio=this.desperdicioSelec.desperdicio;
    //this.capturasDesperdicio=this.desperdicioSelec;
    this.accionDesperdicios='A'
    console.log(this.desperdicioDatacap);
    this.abrirModalCapDesperdicio();
    
    
  }
  agregaDesperdicio():void
  {
    this.accionDesperdicios='C'
    this.abrirModalCapDesperdicio();
  }
  eliminarDesperdicio(value:any):void
  {
    this.desperdicioSelec=value.data;
    var index= this.desperdicioDatacap.indexOf(this.desperdicioSelec);
    this.desperdicioDatacap.splice(index,1);
    this.GridDesperdicioscap.refreshData();

  }

  CargaInformaciondeMaquina(value:any):void{
    
    this.nombreAccion='Actualizar';
    this.maquinaSeleccionada= value.data;
    this.blockUI.start('Cargando Informacion..');
    this.maquinasService.CargarInformacionMaquina(this.maquinaSeleccionada.claveMaquina).then(
      (res:{data:Maquina})=>{
        this.maquinaSelec=res.data[0];
        if(this.maquinaSelec.codEvaluacion===0){this.desabilitaEvaluacion=true;}
        else{this.desabilitaEvaluacion=false;}
        if(this.maquinaSelec.evaluaMtto){this.desabilitaPorcEval=false;}else{this.desabilitaPorcEval=true;}
        this.codEvaluaorig=this.maquinaSelec.codEvaluacion;
        this.eficienciaorig=this.maquinaSelec.eficiencia;
        this.llenarGridDesperdicioscap(this.maquinaSeleccionada.claveMaquina);
        this.llenarListasTripulaciones(this.maquinaSeleccionada.claveMaquina);
        this.ocultarCaptura=false;
        this.accion='A';
      }
    );


  }

  llenarCombosCaptura():void
  {
    //procesos
    this.maquinasService.ListaProcesos().then(
      (res:{data:Procesos[]})=>{
        this.procesos=res.data;
      },
      (error)=>{console.log(error);}
    );
    //evaluaciones
    this.maquinasService.ListaEvaluaciones().then(
      (res:{data:Evaluaciones[]})=>{
        this.evaluaciones=res.data;
      },
      (error)=>{console.log(error);}
    );

  }

  llenarListasTripulaciones(clavemaq:any):void
  {
    
    this.maquinasService.ListaTripulaciones().then(
      (res:{data:Tripulaciones[]})=>{
        this.tripulaciones=res.data;
      },
      (error)=>{console.log(error);this.blockUI.stop();}
    );
  
    if(clavemaq!==''||clavemaq!==null||clavemaq!=='undefined')
    {
      this.maquinasService.ListaTripulacionesPorMaquina(clavemaq).then(
        (res:{data:Tripulaciones[]})=>{
          this.tripulacionesPorMaquina=res.data;
          this.blockUI.stop();
        },
        (error)=>{console.log(error);this.blockUI.stop();}
      );
    }
   
      
    

  }
  
  abrirModalDesperdicio():void{
    this.mdlDesperdicioRef=this.modalService.open(this.mdlDesperdicio,{size:'lg'});
    this.mdlDesperdicioRef.result.then((result)=>{},(reason)=>{});
  }
  abrirModalCapDesperdicio():void{
   if(this.accionDesperdicios!=='A')
    /*{this.capturasDesperdicio={id:0,rInicial:0,rFinal:0,desperdicio:0};}*/
    {this.varFinal=0;this.varInicial=0;this.varDesperdicio=0;}
    this.mdlCapDesperdicioRef=this.modalService.open(this.mdlCapDesperdicio,{size:'md'});
    this.mdlCapDesperdicioRef.result.then((result)=>{},(reason)=>{});
    this.desperdicioDatacapCopia=this.desperdicioDatacap;
    console.log(this.desperdicioDatacapCopia);
  }
  abrirModalPuestos():void{
    this.mdlPuestosRef=this.modalService.open(this.mdlPuestos,{size:'lg'});
    this.mdlPuestosRef.result.then((result)=>{},(reason)=>{});
  }
  llenarGridDesperdiciosview(filtro:any):void{
    this.maquinasService.ListarDespericio(filtro).then(
      (res:{data:Desperdicio[]})=>{
        this.desperdicioDataview=res.data;
      }
    )

  }

  llenarGridDesperdicioscap(filtro:any):void{
    this.maquinasService.ListarDespericio(filtro).then(
      (res:{data:Desperdicio[]})=>{
        this.desperdicioDatacap=res.data;
      }
    )

  }

  agregaraAsignadas():void
  {
    if(!this.existelemento(this.tripulacionesPorMaquina,this.tripulacionSeleccionada))
    {
      this.tripulacionesPorMaquina.push(this.tripulacionSeleccionada);
      var index=this.tripulaciones.indexOf(this.tripulacionSeleccionada);
      this.tripulaciones.splice(index,1);
    }

  }
  devolverAsignadas():void{
    if(!this.existelemento(this.tripulaciones,this.tripulacionPorMaquinaSeleccionada))
    {
      this.tripulaciones.push(this.tripulacionPorMaquinaSeleccionada);
      var index=this.tripulacionesPorMaquina.indexOf(this.tripulacionPorMaquinaSeleccionada);
      this.tripulacionesPorMaquina.splice(index,1);
    }
    else
    {
      var index=this.tripulacionesPorMaquina.indexOf(this.tripulacionPorMaquinaSeleccionada);
      this.tripulacionesPorMaquina.splice(index,1);

    }
  }
  onSelect(tplc:Tripulaciones): void {
    this.tripulacionSeleccionada = tplc;
  }
  onSelectPormaq(tplc:Tripulaciones): void {
    this.tripulacionPorMaquinaSeleccionada = tplc;
  }
  gridReadyview(ref: GridModel): void {
    if (!this.GridDesperdiciosview) {
      this.GridDesperdiciosview = ref;
    }
  }

  gridReadycap(ref: GridModel): void {
    if (!this.GridDesperdicioscap) {
      this.GridDesperdicioscap = ref;
    }
  }

  changeEvalua():void
  {
    var idEv= Number(String(this.maquinaSelec.codEvaluacion));
    if(idEv!==0)
    {
      this.desabilitaEvaluacion=false;
      
    }
    else
    {
      this.desabilitaEvaluacion=true;
      this.maquinaSelec.evaluaMtto=false;
      this.maquinaSelec.porcenEvaluaMtto=0;
    }
  }
  checkEvl(event):void
  {
    if(event.target.checked)
    {
      this.desabilitaPorcEval=false;
    }
    else
    {
      this.desabilitaPorcEval=true;
      this.maquinaSelec.porcenEvaluaMtto=0;
    }
    
  }
  

  existelemento(array:any,elemento:any):boolean
  {
    var retorna = false;
    for(let a of array)
    {
      if(a['idTripulacion']===elemento['idTripulacion'])
      {
        retorna= true;
        break;
      }

    }
    return retorna;
  }

  validacionDesperdicios():string
  {
    var retorna='';
    for (let a of this.desperdicioDatacapCopia)
    {
      var rangoInicial=String(a['rInicial']);
      var rangoFinal= String(a['rFinal']);
      /*var rgIninialCap=String(this.capturasDesperdicio.rInicial);
      var rgFinalCap=String(this.capturasDesperdicio.rFinal);     */
      var rgIninialCap=String(this.varInicial);
      var rgFinalCap=String(this.varFinal);  
      var bandera=0;

      if(this.accionDesperdicios==='A')
      {
        if ((this.desperdicioSelec.id!==0&&this.desperdicioSelec.id===Number(a['id']))||(rgIninialCap===rangoInicial&&rgFinalCap===rangoFinal))
        {
          bandera=1;
        }
      }

      if(bandera===0)
      {
        if(parseInt(rangoInicial)<=parseInt(rgIninialCap) && parseInt(rangoFinal)>=parseInt(rgIninialCap))
        {
          retorna='El rango incial capturado ya existe';
          break;
        }
        if(parseInt(rangoInicial)<=parseInt(rgFinalCap)&&parseInt(rangoFinal)>=parseInt(rgFinalCap))
        {
          retorna='El rango final capturado ya existe';
          break;
        }
      }
      else
      {
        bandera=0;
      }
      

    }
    return retorna;

  }

  validaAntesGuardar():string
  {
    var retorna='';
    if (this.maquinaSelec.tipoMaquina==='')
    {
      retorna= 'Seleccione el tipo de maquina';
    }
    if(this.maquinaSelec.claveMaquina.length!==5 || this.maquinaSelec.claveMaquina===null){retorna='La clave de la Maquina debe ser de 5 caracteres';}
    if(this.maquinaSelec.tintasMax===null){retorna='Capture el numero de tintas';}
    if(this.maquinaSelec.anchoMax===null){retorna='Capture el Ancho Maximo';}
    if(this.maquinaSelec.anchoMaxT===null){retorna='Capture el Ancho Maximo Troquelado';}
    if(this.maquinaSelec.anchoMaxAlt===null){retorna='Capture el Ancho Maximo Alterno';}
    if(this.maquinaSelec.anchoMin===null){retorna='Capture el Ancho Minimo';}
    if(this.maquinaSelec.largoMax===null){retorna='Capture el Largo Maximo';}
    if(this.maquinaSelec.largoMaxT===null){retorna='Capture el Largo Maximo Troquelado';}
    if(this.maquinaSelec.largoMin===null){retorna='Capture el Largo Minimo';}
    if(this.maquinaSelec.costoMinuto===null){retorna='Capture el Costo por minuto';}
    if(this.maquinaSelec.capacidadSemanal===null){retorna='Capture la capacidad semanal';}
    if(this.maquinaSelec.eficiencia===null){retorna='Capture la Eficiencia';}
    if(this.maquinaSelec.evaluaMtto){if(this.maquinaSelec.porcenEvaluaMtto===null){retorna='Falta especificar porcentaje de mantenimiento';}}
    if(this.desperdicioDatacap.length===0){retorna='Debe agregar desperdcios';}
    if(this.tripulacionesPorMaquina.length===0){retorna='Debe agregar tripulaciones'}

    return retorna;
  }
  validaTipoEvaluacion():boolean
  {
    var retorna=true;
  

    
    return retorna;
  }

  limpia()
  {
    this.ocultarCaptura=true;
    this.desperdicioDatacap=[];
    this.tripulacionesPorMaquina=[];
    this.guardamaquinas={Maquinas:[],Desperdicios:[],Tripulaciones:[],CambioEficiencia:false,CambioCodEvaluacion:false};
    this.maquinaSelec={
      tipoMaquina:''
      ,claveMaquina:''
      ,nombre:''
      ,troquela:false
      ,tintasMax:0
      ,anchoMax : 0
      ,anchoMaxT :0
      ,anchoMaxAlt :0
      ,anchoMin : 0
      ,largoMax :0
      ,largoMaxT : 0
      ,largoMin : 0
      ,costoMinuto :0
      ,capacidadSemanal :0
      ,salariosTurno : 0
      ,desp1000 : 0
      ,desp10000 : 0
      ,despMayor10000 : 0
      ,m2Hora : 0
      ,noAceptaPiezasxCorte : false
      ,eficiencia : 0
      ,tproceso : 0
      ,default : false
      ,imprime : false 
      ,codEvaluacion :0
      ,minStd : 0
      ,turnosxDia : 0
      ,evaluaMtto : false
      ,porcenEvaluaMtto :0
      ,evalua : 'NA'
      ,valMinStd : false 
      ,evaluaVelocidad : false 
      ,maquinaPar :0
      ,pzaValStd :0
      ,esCapAut : false 
      ,ubucacionPlcCP: 0
      ,permiteMoficarProd: false 
      ,implementadoAut: false 
      ,tipoConsulta: 0
      ,isRecord: false 
      ,limiteReserva: 0
      ,utilizaSuaje66: false 
      ,utilizaSuaje50: false 
      ,esCortadora: false 
      ,esEtiquetadora: false 
      ,idAreaCosto: 0
  
    }
    this.Grid.refreshData();
  }

  showMessage(value: {title?: any, text?: any, icon?: SweetAlertIcon}): void {
    
    swal.fire(value.title||'',value.text||'',value.icon||'info');
  }


}
