import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { Component, OnInit } from '@angular/core';
import { Maquina } from 'src/app/models/maquina';
import swal from 'sweetalert2';

//ParomaquinaserviceService   src/app/services/Paromaquinaservice.Service
import { ParomaquinaserviceService } from 'src/app/services/paromaquinaservice.service';
import { ActivatedRoute } from '@angular/router';
import { Paros } from 'src/app/models/paros';


interface Filtros {
  TipoMaquina: string; 
  TipoTiempo: string;
  ClaveMaquina: string; 
  Fecha: string;
}

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
  selector: 'app-fcaprog001mw',
  templateUrl: './fcaprog001mw.component.html',
  styleUrls: ['./fcaprog001mw.component.css']
})



export class Fcaprog001mwComponent implements OnInit {

  rowAction: Number;
  selectedMaquina: string; 
  IconoTitulo= '';
  Maquinas : Array<Maquina>;

  Paros : Array<Paros>;

  //TipoMaquina: string , TipoTiempo: string ,  ClaveMaquina: string, Fecha: string
  @Input() strTipoMaquina: string;
  @Input() strTipoTiempo: string;
  @Input() strClaveMaquina: string;
  @Input() strFecha : string;

  @ViewChild('gridPrincipal') grid: any;

  @ViewChild('mdlparomaquina', { static: true }) ModalParo;


  TipoAccion: string;
  //IconoTitulo: 'fa fa-edit';
  Datos: any; //e.data;


  //Maquinas = [{nombre: 'prueba'}];
  columnDefs: any;
  filtros: Filtros = 
          { 
            TipoMaquina: 'PM', 
            TipoTiempo: 'IM',
            ClaveMaquina: '', 
            Fecha: ''
          };

  paro: clsParo = 
  { 
    tipotiempo: '', 
    clavemaquina: '', 
    fecha: '', 
    horaini: '', 
    horafin: '', 
    tiempomin: 0 , 
    comentario: '', 
    estatus : true,  
    usuario: '001000'
  };
/*
  paro.tipotiempo
  paro.clavemaquina
  paro.fecha
  paro.horaini
  paro.horafin
  paro.tiempomin
  paro.comentario
  paro.estatus
  paro.usuario
*/
  modalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, public paromaquinaservice: ParomaquinaserviceService, private modalService: NgbModal) {

    this.columnDefs = [
      {
        headerName: 'Maquina',
        field: 'clavemaquina',
        flex: 10,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Inicio',
        field: 'horaini',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Fin',
        field: 'horafin',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        //valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Tiempo Min',
        field: 'tiempomin',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        //valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Fecha',
        field: 'fecha',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        //valueFormatter: this.bracketsFormatter,
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.openModal.bind(this),
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
          //onClick: this.GridEliminar.bind(this),
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

    //Maquinas : new Array<Maquina>();
    //Remisiones : new Array<Remisiones>();


   }

  ngOnInit() {
    this.getMaquinas("IM");
  }

  onValChange(val: string) {
    this.getMaquinas(val);
   } 


   mostrarModal(modal: any) 
   {
    //this.TipoAccion = 'M';
    //this.IconoTitulo = 'fa fa-edit';
    //this.openModal.bind(this);

    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-edit';
    //this.Datos = e.data;
    this.ModalParo.openModal();

     //this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'Proveedores', size: 'xl',backdrop: 'static', keyboard: false});
   }

   
   openModal(TipoModal, Datos) {

    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    //this.Datos = e.data;
    this.ModalParo.openModal();



  }
    

   GridEditar(e): void {
    //this.mostrarModal('content');
    //this.TipoAccion = 'M';
    //this.IconoTitulo = 'fa fa-edit';
    //this.Datos = e.data;
    //this.mdlConceptos.openModal();
    //this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'Proveedores', size: 'xl',backdrop: 'static', keyboard: false});
    }


   BuscarParos(): void {
    this.grid.refreshData();
  }

  AgregarParo(): void {
    /*this.paromaquinaservice.Agregar(this.paro).subscribe(
      (data: any) => {
        this.Maquinas = data.data;
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de las zonas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });*/

      this.paromaquinaservice.Agregar(this.paro).subscribe((data) => {
        swal.fire(
          'Guardado con Éxito',
          'El Registro fue Guardado con Éxito',
          'success'
        );
        //this.getTiposMovimiento();
        //this.TMovimiento = new TipoMovimiento();
        },(error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Guardar el Tipo Movimiento, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        )
      });

    //Agregar
    //this.grid.refreshData();
  }

  // BuscarParos (){
     //TipoMaquina: string , TipoTiempo: string ,  ClaveMaquina: string, Fecha: string 
     //GetParos
/*
     @Input() strTipoMaquina: string;
     @Input() strTipoTiempo: string;
     @Input() strClaveMaquina: string;
     @Input() strFecha : string;
     */

     //this.filtros.TipoMaquina

/*
     this.paromaquinaservice.getParos(this.strTipoMaquina , this.strTipoTiempo ,  this.strClaveMaquina, this.strFecha).subscribe(
      (data: any) => {
        this.Paros = data.data;
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de las zonas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
*/

 //  }

    //------------------------------------------------------------------
  //#region Metodos de Consultas
  //------------------------------------------------------------------

  /// Metodo de consulta obtener Zonas
  getMaquinas(partipoMaquina: string){
    
    this.paromaquinaservice.getMaquinas(partipoMaquina).subscribe(
      (data: any) => {
        this.Maquinas = data.data;
      }, (error) => {
        swal.fire(
          'Ocurrio un Error',
          'Ocurrio un error al cargar la informacion de las zonas, favor de comunicarse con informatica y generar un reporte de fallas' + error,
          'error'
        );
      });
  }

}
/*
function subscribe(arg0: (data: Array<Maquina>) => void, arg1: (error: any) => void) {
  throw new Error('Function not implemented.');
}*/

