import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';
import swal from 'sweetalert2';
import {EstandaresimpService} from 'src/app/services/Programacion/estandaresimp.service';
import {ListadoMaquinas,Procesos,TiempoStdPreparacion,VelocidadEstandar,HorariosComida} from 'src/app/models/Programacion/EstandaresImp';
import { environment } from 'src/environments/environment';

interface Filtros{
  tipoMaquina:string;
  claveMaquina:string;
}

@Component({
  selector: 'app-fcaprod002-mw',
  templateUrl: './fcaprod002-mw.component.html',
  styleUrls: ['./fcaprod002-mw.component.css']
})
export class FCAPROD002MWComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('gridTiempoStd') private GridTiempoStd: any;
  @ViewChild('gridTiempoStdCo') private GridTiempoStdCo: any;
  @ViewChild('gridVelocidadStd') private GridVelocidadStd: any;
  @ViewChild('mdlCapTep') private mdlCapTep: any;
  @ViewChild('mdlCapVs') private mdlCapVs: any;
  @ViewChild('mdlTurno') private mdlTurno: any;
  @ViewChild('mdlHorarios') private mdlHorarios: any;
  mdlCapTepRef:NgbModalRef;
  mdlCapVsRef:NgbModalRef;
  mdlTurnoRef: NgbModalRef;
  mdlHorariosRef:NgbModalRef;
  maquinas: ListadoMaquinas[]=[];
  rbVelEstnadar_disabled:boolean=false;
  filtros:Filtros={tipoMaquina:'IM',claveMaquina:''};
  columnDefs:any;
  columnDefsVelStd:any;
  columnDefsCo:any;
  columnDefsCoZonaNav:any;
  columnDefsCoDemasZonas:any;
  tipoCaptura:string='TP';
  GridTiempoStdCo_visible:boolean=false;
  GridTiempoStd_visible:boolean=true;
  GridVelocidadStd_visible:boolean=false;
  procesos:Procesos[];
  eficiencia:TiempoStdPreparacion[]=[];
  tiempoEstandarPre:TiempoStdPreparacion={claveMaquina:'',claveProceso:'',tipoMaquina:'',descripcion:'',tiempoStd:0,eficiencia:0,velocidadObjetivo:0};
  txtEficiencia_disabled:boolean=true;
  txtVelObj_visible:boolean=false;
  lblEficiencia:string='Eficiencia';
  velocidadEstandar:VelocidadEstandar={claveMaquina:'',areaInicial:0,areaFinal:0,velocidadStd:0};
  horarioComida:HorariosComida={claveArea:'',descripcion:'',turno:'',horaInicio:'',horaFinal:'',claveMaquina:''};
  horariosComida:HorariosComida[]=[];
  turno:string='';
  tipoCapturaHorario:string='C';
  btnHorarios_disabled:boolean=false;


  constructor(public estandaresService:EstandaresimpService, private modalService: NgbModal) {
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
        headerName: 'Clave Proceso',
        field: 'claveProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion Proceso',
        field: 'descripcion',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tiempo Actual',
        field: 'tiempoStd',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
         onClick: this.eliminaTiempoEstPre.bind(this),
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
    this.columnDefsVelStd = [
      {
        headerName: 'Clave Maquina',
        field: 'claveMaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Area Inical',
        field: 'areaInicial',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Area Final',
        field: 'areaFinal',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Velocidad Actual',
        field: 'velocidadStd',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
         onClick: this.eliminaVelocidadEstandar.bind(this),
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
    this.columnDefsCoZonaNav = [
      {
        headerName: 'Clave Maquina',
        field: 'claveMaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Clave Proceso',
        field: 'claveProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion Proceso',
        field: 'descripcion',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tiempo Estandar',
        field: 'tiempoStd',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Velocidad',
        field: 'eficiencia',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Velocidad Objetivo',
        field: 'velocidadObjetivo',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
         onClick: this.eliminaTiempoEstPre.bind(this),
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
    this.columnDefsCoDemasZonas = [
      {
        headerName: 'Clave Maquina',
        field: 'claveMaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Clave Proceso',
        field: 'claveProceso',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion Proceso',
        field: 'descripcion',
        flex: 2,
        minWidth: 120,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tiempo Estandar',
        field: 'tiempoStd',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Velocidad',
        field: 'eficiencia',
        flex: 2,
        minWidth: 70,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
         onClick: this.eliminaTiempoEstPre.bind(this),
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
    this.columnDefsCo=this.columnDefsCoDemasZonas;
   }

  ngOnInit(): void {
    this.llenaComboMaquina('IM');
  }

  llenaComboMaquina(tipoMaquina:any):void
  {
    this.estandaresService.ListarMaquinas(tipoMaquina).then(
      (res:{data:ListadoMaquinas[]})=>{
        this.maquinas=res.data;
        this.filtros.claveMaquina=this.maquinas[0].claveMaquina;
        this.cargaGrids();
      }
    );  
  }

  cargaGrids():void
  {
    if(this.filtros.tipoMaquina==='CO')
    {
      this.GridTiempoStd_visible=false;
      this.GridTiempoStdCo_visible=true;
      this.GridVelocidadStd_visible=false;
      this.GridTiempoStdCo.refreshData();

    }
    else
    {
      if(this.tipoCaptura==='TP')
      {
        this.GridTiempoStd_visible=true;
        this.GridTiempoStdCo_visible=false;
        this.GridVelocidadStd_visible=false;
        this.GridTiempoStd.refreshData();
      }
      else
      {
        this.GridTiempoStd_visible=false;
        this.GridTiempoStdCo_visible=false;
        this.GridVelocidadStd_visible=true;
        this.GridVelocidadStd.refreshData();
      }
    }

  }

  abreModalCapturas():void
  {
    if(this.tipoCaptura==='TP' || this.filtros.tipoMaquina==='CO')
    {
      this.abreModalCapturaTep();
    }
    else
    {
      this.abreModalCapturaVs();
    }
  }

  abreModalCapturaTep():void
  {
    this.limpiarTiempoEstPre();
    if (this.filtros.tipoMaquina==='CO'){this.txtEficiencia_disabled=false;this.lblEficiencia='Velocidad'}
    else{this.txtEficiencia_disabled=true;this.lblEficiencia='Eficiencia'}
    if (this.filtros.tipoMaquina=='CO'&&environment.zona==='01'){this.txtVelObj_visible=true;}else{this.txtVelObj_visible=false;}
    this.tiempoEstandarPre.tipoMaquina=this.filtros.tipoMaquina;
    this.tiempoEstandarPre.claveMaquina=this.filtros.claveMaquina;
    this.llenaComboProcesos();
    this.obtieneEficiencia();
    this.mdlCapTepRef=this.modalService.open(this.mdlCapTep,{size:'md'});
    this.mdlCapTepRef.result.then((result)=>{},(reason)=>{});
  
  }
  abreModalCapturaVs():void
  {
    this.limpiaVelocidadEstandar();
    this.velocidadEstandar.claveMaquina=this.filtros.claveMaquina;
    this.mdlCapVsRef=this.modalService.open(this.mdlCapVs,{size:'md'});
    this.mdlCapVsRef.result.then((result)=>{},(reason)=>{});
  }

  abreModalTurno():void
  {
    this.turno='';
    this.mdlTurnoRef=this.modalService.open(this.mdlTurno,{size:'sm'});
    this.mdlTurnoRef.result.then((result)=>{},(reason)=>{});
  }

  abreModalHorarios():void
  {
    
    this.mdlHorariosRef=this.modalService.open(this.mdlHorarios,{size:'md'});
    this.mdlHorariosRef.result.then((result)=>{},(reason)=>{});
  }

  llenaComboProcesos():void
  {
    this.estandaresService.ListarProcesos(this.filtros).then(
      (res:{data:Procesos[]})=>{
        this.procesos=res.data;
        
      }
    );
      
  }

  obtieneEficiencia():void{
    this.estandaresService.getEficiencia(this.filtros.claveMaquina).then(
      (res:{data:TiempoStdPreparacion[]})=>{
        this.eficiencia=res.data;
        this.tiempoEstandarPre.eficiencia=this.eficiencia[0].eficiencia;
      }
    );
  }

  ExisteTurno():void{
    this.limpiarHorario();
    this.horarioComida.turno=this.turno;
    this.estandaresService.ExisteTurno(this.filtros,this.horarioComida.turno).then(
      (res:{data:HorariosComida[]})=>{
        this.horariosComida=res.data;
        if(this.horariosComida.length>0)
        {
          this.horarioComida.claveArea=this.horariosComida[0].claveArea;
          this.horarioComida.claveMaquina=this.horariosComida[0].claveMaquina;
          this.horarioComida.descripcion=this.horariosComida[0].descripcion;
          this.horarioComida.horaInicio=this.horariosComida[0].horaInicio;
          this.horarioComida.horaFinal=this.horariosComida[0].horaFinal;
          this.tipoCapturaHorario='A'

        }
        else
        {
          this.horarioComida.claveArea=this.filtros.tipoMaquina;
          this.horarioComida.claveMaquina=this.filtros.claveMaquina;
          this.horarioComida.descripcion=this.obtieneNombreTipoMaquinas();
          this.showMessage({title:'No existe horario en el turno especificado, favor de capturar uno',text:'',icon:'info'})
          this.tipoCapturaHorario='C';
        }
        this.mdlTurnoRef.close();
        this.abreModalHorarios();
      }
    );
  }

  guardaTiempoEstPre():void
  {
    this.blockUI.start('Guardando..');
    this.estandaresService.GuardaTiempoEstPre(this.tiempoEstandarPre).subscribe(
      (res)=>
      {
        if(res.mensaje==='OK')
        {
          this.showMessage({title:'Se guardo correctamente',text:'',icon:'success'});
          this.cargaGrids();
          this.limpiarTiempoEstPre();
          this.mdlCapTepRef.close();
        }
        else
        {
          this.showMessage({title:'Alerta',text:res.mensaje,icon:'info'});
        }
        this.blockUI.stop();
      }
    );
  }

  eliminaTiempoEstPre(value:any):void
  {
    this.tiempoEstandarPre=value.data;
    swal
    .fire({
      title: 'Alerta',
      text: '¿Esta Seguro que desea Eliminar el proceso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.blockUI.start('Eliminando..');
        this.estandaresService.EliminaTiempoEstPre(this.tiempoEstandarPre).subscribe(
          (res)=>
          {
            if(res.mensaje==='OK')
            {
              this.showMessage({title:'Se Elimino correctamente',text:'',icon:'success'});
              this.limpiarTiempoEstPre();
              this.cargaGrids();
              //this.llenaComboMaquina(this.filtros.tipoMaquina);
              //this.filtros.claveMaquina=this.tiempoEstandarPre.claveMaquina;
            }
            this.blockUI.stop();
          }
        );
     
     }
    
    });
  }

  guardaVelocidadEstandar():void
  {
    this.blockUI.start('Guardando..');
    this.estandaresService.GuardaVelocidadEstandar(this.velocidadEstandar).subscribe(
      (res)=>
      {
        if(res.mensaje==='OK')
        {
          this.showMessage({title:'Se guardo correctamente',text:'',icon:'success'});
          this.cargaGrids();
          this.limpiaVelocidadEstandar();
          this.mdlCapVsRef.close();
        }
        else
        {
          this.showMessage({title:'Alerta',text:res.mensaje,icon:'info'});
        }
        this.blockUI.stop();
      }
    );
  }

  eliminaVelocidadEstandar(value:any):void
  {
    
    this.velocidadEstandar=value.data;
    swal
    .fire({
      title: 'Alerta',
      text: '¿Esta seguro(a) que desea eliminar este registro con el área inicial '+String(this.velocidadEstandar.areaInicial)+' y el área final'+String(this.velocidadEstandar.areaFinal)+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.blockUI.start('Eliminando..');
        this.estandaresService.EliminaVelocidadEstandar(this.velocidadEstandar).subscribe(
          (res)=>
          {
            if(res.mensaje==='OK')
            {
              this.showMessage({title:'Se Elimino correctamente',text:'',icon:'success'});
              this.limpiaVelocidadEstandar();
              this.cargaGrids();
              //this.llenaComboMaquina(this.filtros.tipoMaquina);
              //this.filtros.claveMaquina=this.tiempoEstandarPre.claveMaquina;
            }
            this.blockUI.stop();
          }
        );
     
     }
    
    });
  }

  guardaHorarioComida():void
  {
    if(this.tipoCapturaHorario==='C')
    {
      this.blockUI.start('Guardando..');
      this.estandaresService.GuardaHorarioComida(this.horarioComida).subscribe(
        (res)=>
        {
          if(res.mensaje==='OK')
          {
            this.showMessage({title:'Se Guardo correctamente el horario',text:'',icon:'success'});
            this.limpiarHorario();
            this.mdlHorariosRef.close();
          }
          this.blockUI.stop();
        }
      );
    }
    else
    {
      this.blockUI.start('Actualizando..');
      this.estandaresService.ModificaHorarioComida(this.horarioComida).subscribe(
        (res)=>
        {
          if(res.mensaje==='OK')
          {
            this.showMessage({title:'Se Modifico correctamente el horario',text:'',icon:'success'});
            this.limpiarHorario();
            this.mdlHorariosRef.close();
          }

          this.blockUI.stop();

        }
      );
    }

  }

  limpiarTiempoEstPre():void{
    this.tiempoEstandarPre={claveMaquina:'',claveProceso:'',tipoMaquina:'',descripcion:'',tiempoStd:0,eficiencia:0,velocidadObjetivo:0};
  }
  limpiaVelocidadEstandar():void{
    this.velocidadEstandar={claveMaquina:'',areaInicial:0,areaFinal:0,velocidadStd:0};
  }
  limpiarHorario():void
  {
    this.horarioComida={claveArea:'',descripcion:'',turno:'',horaInicio:'',horaFinal:'',claveMaquina:''};
  }

  rbTipoMaquina_change(e):void
  {
    this.filtros.tipoMaquina=e.target.value;
    if(e.target.value==='CO')
    {
      this.rbVelEstnadar_disabled=true;
     // this.tipoCaptura='TP';
      if(environment.zona==='01'){this.columnDefsCo=this.columnDefsCoZonaNav;}
      this.btnHorarios_disabled=true;
    }
    else
    {
      this.rbVelEstnadar_disabled=false;
      //this.tipoCaptura='TP';
      this.btnHorarios_disabled=false;
      
    }
    this.llenaComboMaquina(e.target.value);

  }

  rbTipoCaptura_onChange(e):void
  {
    this.tipoCaptura=e.target.value;
    this.cargaGrids();
  }

  cbMaquinas_onChange(e):void
  {
    this.cargaGrids();
    //this.GridTiempoStd.refreshData();
  }

  showMessage(value: {title?: any, text?: any, icon?: SweetAlertIcon}): void {
    
    swal.fire(value.title||'',value.text||'',value.icon||'info');
  }

  obtieneNombreTipoMaquinas():string
  {
    var regresa='';
    switch(this.filtros.tipoMaquina)
    {
      case 'IM': regresa='IMPRESORAS'; break;
      case 'AC': regresa='ACABADOS'; break;
      case 'ES': regresa='ESPECIALIDADES'; break;
    }
    return regresa;
  }



}
