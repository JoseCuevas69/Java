import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Maquina } from 'src/app/models/maquina';
import swal from 'sweetalert2';
import { ParomaquinaserviceService } from 'src/app/services/paromaquinaservice.service';
import { ActivatedRoute } from '@angular/router';
import { Paros } from 'src/app/models/paros';
import { formatDate } from '@angular/common';


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

  public selectedMoment = new Date();

  public filterDateFrom: Date;

  rowAction: Number;
  selectedMaquina: string; 
  IconoTitulo= '';
  Maquinas : Array<Maquina>;

 booImpresora: boolean;
 booCorrugadora: boolean;
 booAcabados: boolean;

 booParosMaquina: boolean;
 booTiempoExtra: boolean;

 booHabilitarBoton: boolean;



  Paros : Array<Paros>;

  @Input() strFilFecha: string;

  @Input() strTipoMaquina: string;
  @Input() strTipoTiempo: string;
  @Input() strClaveMaquina: string;
  @Input() strFecha : string;

  @ViewChild('gridPrincipal') grid: any;

  @ViewChild('mdlparomaquina', { static: true }) ModalParo;


  TipoAccion: string;
  Datos = {};

  tiempoTranscurrido: Date;

  today= new Date();
  jstoday = '';


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

  modalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, public paromaquinaservice: ParomaquinaserviceService, private modalService: NgbModal) {
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'idparo',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Maquina',
        field: 'clavemaquina',
        flex: 8,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Inicio',
        field: 'horainipro',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Fin',
        field: 'horafinpro',
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
          onClick: this.GridEditar.bind(this),
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
          onClick: this.GridEliminar.bind(this),
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

    this.booHabilitarBoton=false
   }

  ngOnInit() {

    var dateFecha = new Date(); 
    var isoDateTimeFecha = new Date(dateFecha.getTime() - (dateFecha.getTimezoneOffset() * 60000)).toISOString();
    this.strFilFecha = isoDateTimeFecha.slice(0, 10);
    this.booParosMaquina=true;
    this.booTiempoExtra=false;

    this.booImpresora=true;
    this.booCorrugadora=false;
    this.booAcabados=false;
    this.getMaquinas("IM");

  }

  onTipoTiempoChange(val: any) {
    this.filtros.TipoTiempo = val.value;
   } 

  onValChange(val: any) {
    this.filtros.TipoMaquina = val.value;
    this.getMaquinas(val.value);
   } 
//onChangeMaquina
  onChangeMaquina(val: any) {
    this.filtros.TipoMaquina = val.value;
    this.getMaquinas(val.value);
  } 


   mostrarModal(modal: any) 
   {
    this.TipoAccion = 'A';
    this.IconoTitulo = 'fa fa-edit';
    this.ModalParo.openModal();
     
   }

   mostrarModal2(modal) {
    this.modalService.open(modal, {ariaLabelledBy: 'AddTipoMov', size: 'lg'});
  }


   openModal(TipoModal, Datos) {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.ModalParo.openModal();
  }

  btnCerrarModal(): void{
    this.ModalParo.closeModal();
  }

  btnActualizarGridPopup(): void{
    this.grid.refreshData(); 
    this.ModalParo.closeModal();
  }

  btnAgregar(): void {

    if(this.filtros.ClaveMaquina.indexOf('defined') > 0)
    {
      this.filtros.ClaveMaquina="";
    }


    if(this.filtros.ClaveMaquina != '')
    {
        this.TipoAccion = 'A';
        this.IconoTitulo = 'fa fa-plus';
        this.Datos = {};
        this.ModalParo.openModal();

    }
    else
    {
      swal.fire(
        'Seleccione una Maquina',
        'Favor de seleccionar una maquina, Para continuar.',
        'error'
      );
    }


  }

  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.Datos = e.data;
    this.ModalParo.openModal();
  }
    

    GridEliminar(e): void {
      swal
        .fire({
          title: '¿Desea eliminar el registro?',
          text: e.data.claveDiseno,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.paromaquinaservice.Eliminar(e.data).subscribe(
              (data: any) => {
                swal.fire('', 'El registro fue eliminado', 'success');
                this.grid.refreshData();               
              },
              (error) => {
                swal.fire(
                  'Datos ',
                  'Ha Ocurrio un Error al Momento de Eliminar,' +
                    ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
                    ' <strong>Código de Error: ' +
                    error.error +
                    '</strong>',
                  'error'
                );
              }
            );
          }
        });
    }


   BuscarParos(): void {
    this.grid.refreshData();
  }
 

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


