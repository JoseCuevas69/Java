import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SweetAlertIcon } from 'sweetalert2';
import swal from 'sweetalert2';
import {RutaprocesosserviceService} from 'src/app/services/Programacion/rutaprocesosservice.service';
import { GridModel } from 'src/app/models/common/gridModel';
import {EncabezadoRutaProcesos,ProcesosRutas,DetalleRutaProcesos,EncabezadoDetalleRuta} from 'src/app/models/programacion/RutaProcesos';

interface Detalles{
  mx2M1:boolean,
  pegaM1:boolean,
  mx2M2:boolean,
  pegaM2:boolean,
  mx2M3:boolean,
  pegaM3:boolean,
  mx2M4:boolean,
  pegaM4:boolean
}

@Component({
  selector: 'app-fcaprog008-mw',
  templateUrl: './fcaprog008-mw.component.html',
  styleUrls: ['./fcaprog008-mw.component.css']
})
export class FCAPROG008MWComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('gridRutas') private GridRutas: any;
  @ViewChild('gridProcesos') private gridProcesos: GridModel;
  columnDefs:any;
  columnDefsPro:any;
  procesosRutas:ProcesosRutas[]=[];
  procesoSelec:ProcesosRutas;
  rutaSelec:EncabezadoRutaProcesos;
  encabezadoRutasProcesos:EncabezadoRutaProcesos={clave:'',descripcion:'',m1:'',m2:'',m3:'',m4:'',m5:'',horasAdicional:'',unionPegada:false};
  captura_visible:boolean=false;
  detallesRutasProcesos:DetalleRutaProcesos[]=[];
  detalles:Detalles={mx2M1:false,mx2M2:false,mx2M3:false,mx2M4:false,pegaM1:false,pegaM2:false,pegaM3:false,pegaM4:false};
  encabezadodetalleRuta:EncabezadoDetalleRuta={encabezado:{clave:'',descripcion:'',m1:'',m2:'',m3:'',m4:'',m5:'',horasAdicional:'',unionPegada:false},detalleRutas:[]};

  constructor(public rutasServices:RutaprocesosserviceService) {
    this.columnDefs = [
      {
        headerName: 'Clave',
        field: 'clave',
        flex: 1,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion',
        field: 'descripcion',
        flex: 2,
        minWidth: 385,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Modificar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
        onClick: this.btnModificar_click.bind(this),
          label: '<i class="fa fa-pen"></i>',
          class: 'btn btn-warning btn-sm',
        },
        headerClass: 'header-center header-grid-right',
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
        onClick: this.btnElimina_click.bind(this),
          label: '<i class="fa fa-trash"></i>',
          class: 'btn btn-danger btn-sm',
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      }
    ];
    this.columnDefsPro= [
      {
        headerName: 'Seleccione',
        field: 'selec',
       cellRenderer: 'chkCellRenderer',
          cellRendererParams: {
            /*display: this.displayActualizaCliente.bind(this)*/
            change:this.changeSelec.bind(this)
          },
        cellClass: 'grid-cell-center',
        headerClass: 'header-center header-grid-right',
        flex: 1,
        minWidth: 90,
        //suppressSizeToFit: true
      },
      {
        headerName: 'TProceso',
        field: 'tProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center'
      },
      {
        headerName: 'Descripcion',
        field: 'descripcion',
        flex: 6,
        minWidth: 110,
        headerClass: 'header-grid'
      }
    ];
   }

  ngOnInit(): void {
    this.cargaGridProcesos();
  }

  btnAgregar_click():void
  {
    this.captura_visible=true;
  }
  btnModificar_click(value:any):void
  {
   
    this.limpiar();
    this.rutaSelec=value.data;
    this.encabezadoRutasProcesos.clave=this.rutaSelec.clave;
    this.encabezadoRutasProcesos.descripcion=this.rutaSelec.descripcion;
    this.rutasServices.GetDetalleProcesosRutas(this.rutaSelec.clave).then(
      (res:{data:DetalleRutaProcesos[]})=>
      {
        this.detallesRutasProcesos=res.data;
        for (let a of this.detallesRutasProcesos)
        {
          switch (a['maquinaOrden'])
          {
            case 1:
              this.encabezadoRutasProcesos.m1=String(a['tipoMaquina']);
              this.detalles.mx2M1=a['mx2'];
              this.detalles.pegaM1=a['pegar'];
              break;
            case 2:
              this.encabezadoRutasProcesos.m2=String(a['tipoMaquina']);
              this.detalles.mx2M2=a['mx2'];
              this.detalles.pegaM2=a['pegar'];
              break;
            case 3:
              this.encabezadoRutasProcesos.m3=String(a['tipoMaquina']);
              this.detalles.mx2M3=a['mx2'];
              this.detalles.pegaM3=a['pegar'];
              break;
            case 4:
              this.encabezadoRutasProcesos.m4=String(a['tipoMaquina']);
              this.detalles.mx2M4=a['mx2'];
              this.detalles.pegaM4=a['pegar'];
              break;

          }

          for (let b of this.procesosRutas)
          {
            if(a['tipoMaquina']===b['tProceso'])
            {
              b['selec']=true;
              break;
            }
          }
        }

        this.gridProcesos.refreshData();
        this.captura_visible=true;
      }
    );
    
  }

  btnGuarda_click():void
  {
    this.blockUI.start('Guardando...');
    const regex =/^[0-9]*$/;
    this.encabezadodetalleRuta.detalleRutas=[];
    if(this.encabezadoRutasProcesos.clave===''||this.encabezadoRutasProcesos.clave===null)
    {
      this.showMessage({title:'Debe Capturar la clave',text:'',icon:'info'});
      this.blockUI.stop();
      return;
    }
    if(this.encabezadoRutasProcesos.descripcion===''||this.encabezadoRutasProcesos.descripcion===null)
    {
      this.showMessage({title:'Debe Capturar la descripcion',text:'',icon:'info'});
      this.blockUI.stop();
      return;
    }
    /*var m1,m2,m3,m4;
    m1=Number(this.encabezadoRutasProcesos.m1);
    m2=Number(this.encabezadoRutasProcesos.m2);
    m3=Number(this.encabezadoRutasProcesos.m3);
    m4=Number(this.encabezadoRutasProcesos.m4);*/
    this.encabezadodetalleRuta.encabezado=this.encabezadoRutasProcesos;

    this.encabezadodetalleRuta.detalleRutas.push({maquinaOrden:1,tipoMaquina:Number(this.encabezadoRutasProcesos.m1),pegar:this.detalles.pegaM1,mx2:this.detalles.mx2M1})
    if(this.encabezadoRutasProcesos.m2!=='')
    {
      this.encabezadodetalleRuta.detalleRutas.push({maquinaOrden:2,tipoMaquina:Number(this.encabezadoRutasProcesos.m2),pegar:this.detalles.pegaM2,mx2:this.detalles.mx2M2})
    }
    if(this.encabezadoRutasProcesos.m3!=='')
    {
    this.encabezadodetalleRuta.detalleRutas.push({maquinaOrden:3,tipoMaquina:Number(this.encabezadoRutasProcesos.m3),pegar:this.detalles.pegaM3,mx2:this.detalles.mx2M3})
    }
    if(this.encabezadoRutasProcesos.m4!=='')
    {
    this.encabezadodetalleRuta.detalleRutas.push({maquinaOrden:4,tipoMaquina:Number(this.encabezadoRutasProcesos.m4),pegar:this.detalles.pegaM4,mx2:this.detalles.mx2M4})
    }
    this.rutasServices.GuardaRutas(this.encabezadodetalleRuta).subscribe(
      (res)=>
      {
        if(res.mensaje==='OK')
        {
          this.blockUI.stop();
          this.showMessage({title:'Se Guardo Correctamente',text:'',icon:'success'});
          this.GridRutas.refreshData();
        }
        else if(res.mensaje.trim()===this.encabezadoRutasProcesos.clave.trim())
        {
          this.blockUI.stop();
          swal
          .fire({
            title: 'Alerta',
            text: 'Ya existe un registro con esta clave: '+res.mensaje+' ¿Desea Reactivarla?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if(result.isConfirmed)
            { 
              this.blockUI.start('Reactivando...');
              this.rutasServices.ReactivaRutas(this.encabezadoRutasProcesos).subscribe(
                (res)=>{
                  if(res.mensaje!=='')
                  {
                    
                    this.showMessage({title:'Se Reactivo con exito',text:'',icon:'success'});
                    this.blockUI.stop();
                    this.encabezadoRutasProcesos.descripcion=res.mensaje;
                    this.GridRutas.refreshData();

                  }
                }
              )

            }
          }
          );
        }
        else
        {
          this.blockUI.stop();
          this.showMessage({title:'Alerta',text:res.mensaje,icon:'info'});
        }
      }
    );

  }

  btnCancela_click():void
  {
    this.limpiar();
    this.captura_visible=false;
  }

  btnElimina_click(value:any):void{
    this.rutaSelec=value.data;
    swal
          .fire({
            title: 'Alerta',
            text: '¿Esta seguro que desea eliminar? '+this.rutaSelec.clave+' '+this.rutaSelec.descripcion,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if(result.isConfirmed)
            {
              this.blockUI.start('Eliminando...');
              this.rutasServices.EliminaRutas(this.rutaSelec).subscribe(
                (res)=>{
                  if (res.mensaje==='OK')
                  {
                    this.blockUI.stop();
                    this.showMessage({title:'Se Elimino con exito',text:'',icon:'success'});
                    this.GridRutas.refreshData();
                  }
                }
              );
            }
          }
          );
   
  }

  cargaGridProcesos():void{
    this.rutasServices.ListarProcesosRutas().then(
      (res:{data:ProcesosRutas[]})=>{
        this.procesosRutas=res.data;
      }
    )
  }
  changeSelec(value:any):void{
    this.procesoSelec=value.data;
    if (this.procesoSelec.selec)
    {
      if(this.encabezadoRutasProcesos.m1==='')
      {
        this.encabezadoRutasProcesos.m1=String(this.procesoSelec.tProceso);
      }
      else if(this.encabezadoRutasProcesos.m2==='')
      {
        this.encabezadoRutasProcesos.m2=String(this.procesoSelec.tProceso);
      }
      else if(this.encabezadoRutasProcesos.m3==='')
      {
        this.encabezadoRutasProcesos.m3=String(this.procesoSelec.tProceso); 
      }
      else if(this.encabezadoRutasProcesos.m4==='')
      {
        this.encabezadoRutasProcesos.m4=String(this.procesoSelec.tProceso);
      }
    }
    else
    {
      switch(this.procesoSelec.tProceso)
      {
        case Number(this.encabezadoRutasProcesos.m1):
          this.encabezadoRutasProcesos.m1='';
          break;
        case Number(this.encabezadoRutasProcesos.m2):
          this.encabezadoRutasProcesos.m2='';
          break;
        case Number(this.encabezadoRutasProcesos.m3):
          this.encabezadoRutasProcesos.m3='';
          break;
        case Number(this.encabezadoRutasProcesos.m4):
          this.encabezadoRutasProcesos.m4='';
          break;
      }
    }
    this.gridProcesos.refreshData();

  }

  limpiar()
  {
    this.encabezadoRutasProcesos={clave:'',descripcion:'',m1:'',m2:'',m3:'',m4:'',m5:'',horasAdicional:'',unionPegada:false};
    this.detalles={mx2M1:false,mx2M2:false,mx2M3:false,mx2M4:false,pegaM1:false,pegaM2:false,pegaM3:false,pegaM4:false};
    for (let a of this.procesosRutas)
    {
      a['selec']=false;
    }
    this.gridProcesos.refreshData();
  }

  verReporte_click()
  {
    window.open('http://datos.cecso.com.mx/ServerRS/Pages/ReportViewer.aspx?/FCACajas/FCAPROG/FCAPROG002RS&rs:Command=Render','_blank');
  }

  gridReady(ref: GridModel): void {
    if (!this.gridProcesos) {
      this.gridProcesos = ref;
    }
  }

  showMessage(value: {title?: any, text?: any, icon?: SweetAlertIcon}): void {
    
    swal.fire(value.title||'',value.text||'',value.icon||'info');
  }

}
