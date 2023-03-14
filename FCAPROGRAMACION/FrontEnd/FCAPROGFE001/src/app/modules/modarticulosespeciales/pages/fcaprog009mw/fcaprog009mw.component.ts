import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Maquina } from 'src/app/models/maquina';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
//import { formatDate } from '@angular/common';

import { ArticuloespserviceService } from 'src/app/services/articuloespservice.service';

interface FiltrosEnc {
  clavearticulo: string; 
  clavemaquina: string;
  descripcion: string; 
}

interface Filtros {
  clavearticulo: string; 
  clavemaquina: string;
  descripcion: string; 
}

interface clsArticuloEsp {
  clavearticulo : string;
  velocidadstdcorr : string;
  velocidadstdimp : string;
  seccionada : boolean;
  setup : string;
  estatus : boolean;  
  usuario: string;
}

interface clsArticuloEspDet {
  clavearticulo : string;
  clavemaquina : string;
  velocidadstd : string;  
  proceso1 : boolean;
  setup : string;
  estatus : boolean;  
  usuario: string;
  }

@Component({
  selector: 'app-fcaprog009mw',
  templateUrl: './fcaprog009mw.component.html',
  styleUrls: ['./fcaprog009mw.component.css']
})

export class Fcaprog009mwComponent implements OnInit {

  public selectedMoment = new Date();
  public filterDateFrom: Date;

  boochkSeleccionada: boolean;
  intVelocidad: string;
  intVelocidadStd: string;



  rowAction: Number;
  selectedMaquina: string; 
  IconoTitulo= '';


  busquedaArticuloCodigo : string;
  busquedaArticuloNombre : string;
  
  Maquinas : Array<Maquina>;



  @Input() strTipoMaquina: string;
  @Input() strTipoTiempo: string;
  @Input() strClaveMaquina: string;

  @ViewChild('gridPrincipal') grid: any;

  @ViewChild('gridBuscarArticulos') gridBuscarArt: any;

  @ViewChild('mdlparomaquina', { static: true }) ModalParo;

  @ViewChild('mdlparomaquina', { static: true }) ModalBuscarArt;
 

  TipoAccion: string;
  Datos = {};

  columnDefs: any;
  columnBuscar: any;

  filtrosenc: FiltrosEnc = 
  { 
    clavearticulo: '', 
    clavemaquina: '',
    descripcion: '' 
  };

  filtros: Filtros = 
          { 
            clavearticulo: '', 
            clavemaquina: '',
            descripcion: ''
          };

  articuloesp: clsArticuloEsp = 
  { 
    clavearticulo : '', 
    velocidadstdcorr : '0', 
    velocidadstdimp : '0', 
    seccionada : false, 
    setup : '0', 
    estatus : true, 
    usuario: '001000'   
  };

  articuloespdet: clsArticuloEspDet = 
  { 
    clavearticulo : '', 
    clavemaquina : '', 
    velocidadstd : '', 
    proceso1 :  true, 
    setup : '', 
    estatus : true, 
    usuario: '001000'   
  };
  


  modalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, public articuloespserviceService: ArticuloespserviceService, private modalService: NgbModal) 
  { 
    this.columnDefs = [
      {
        headerName: 'Cve Maquina',
        field: 'clavemaquina',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },      
      {
        headerName: 'Velocidad',
        field: 'velocidadstd',
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


this.columnBuscar = [
  {
    headerName: 'Clave Articulo',
    field: 'clavearticulo',
    flex: 2,
    minWidth: 80,
    headerClass: 'header-center header-grid-left',
    cellClass: 'grid-cell-center',
  },      
  {
    headerName: 'Nombre Articulo',
    field: 'nombrearticulo',
    flex: 3,
    minWidth: 80,
    headerClass: 'header-center header-grid',
    cellClass: 'grid-cell-center',
    //valueFormatter: this.bracketsFormatter,
  },
  {
    headerName: 'Seleccionar',
    cellRenderer: 'btnCellRenderer',
    cellRendererParams: {
      onClick: this.Seleccionar.bind(this),
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
];

  }

  ngOnInit(): void {
    this.getMaquinas();
    this.boochkSeleccionada = false;
  }

  OnChangechkSeleccionada($event){
    this.boochkSeleccionada = $event.checked;
  }


  getMaquinas(){    
    this.articuloespserviceService.getMaquinas().subscribe(
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

  mostrarModal(modal) 
  {
    this.modalRef = this.modalService.open(modal, {ariaLabelledBy: 'Proveedores', size: 'xl',backdrop: 'static', keyboard: false});
  }

  btnCerrarModal(): void{
    this.ModalParo.closeModal();
  }

  btnActualizarGridPopup(): void{
    this.grid.refreshData(); 
    this.ModalParo.closeModal();
  }

  btnImprimir(): void {
    //this.gridBuscarArt.refreshData();
  }

  btnGuardar(): void {
    this.articuloesp.clavearticulo = this.filtros.clavearticulo;
    this.articuloesp.velocidadstdcorr = this.intVelocidadStd; 
    this.articuloesp.velocidadstdimp = '0'; 
    this.articuloesp.seccionada = this.boochkSeleccionada; 
    this.articuloesp.setup = '0';
    this.articuloesp.estatus = true; 
    this.articuloesp.usuario = '001000';
    
    this.articuloespserviceService.AgregarEnc(this.articuloesp).subscribe((data) => {
        swal.fire(
          'Guardado con Éxito',
          'El Registro fue Guardado con Éxito',
          'success'
        );
      },(error) => {
      swal.fire(
        'Ha Ocurrio un Error',
        'Ha Ocurrio un Error al Momento de Guardar la Velocidad de Maquina, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
        'error'
      )
    });

  }

  btnAgregar(): void {

    if(this.filtros.clavearticulo.indexOf('defined') > 0)
    {
      this.filtros.clavearticulo="";
    }

    if(this.filtros.clavearticulo != '')
    {
      this.TipoAccion = 'A';
      this.IconoTitulo = 'fa fa-plus';
      this.Datos = {};
      this.ModalParo.openModal();
    }
    else
    {
      swal.fire(
        'Seleccione una Articulo',
        'Favor de seleccionar una Articulo, Para continuar.',
        'error'
      );
    }
  }

  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.IconoTitulo = 'fa fa-edit';
    this.Datos = e.data;

    this.articuloespdet.clavearticulo = this.filtros.clavearticulo;
    this.articuloespdet.clavemaquina  =  this.filtros.clavemaquina;
    this.articuloespdet.velocidadstd  =  this.intVelocidadStd; 
    
    this.filtros.clavearticulo = e.data["clavearticulo"]; 
    this.filtros.clavemaquina = e.data["clavemaquina"]; 
    this.intVelocidadStd = e.data["velocidadstd"]; ;

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
            this.articuloespserviceService.EliminarDet(e.data).subscribe(
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

  buscarArticulos(): void {

    
    this.filtros.clavearticulo = this.busquedaArticuloCodigo;
    this.filtros.clavemaquina = ""; // this.busquedaArticuloNombre;
    this.filtros.descripcion = this.busquedaArticuloNombre;

    this.gridBuscarArt.refreshData();
  }

  Seleccionar(e): void {
    this.filtros.clavearticulo = e.data["clavearticulo"]; 
    this.filtros.clavemaquina = ""; 
    this.filtros.descripcion = e.data["nombrearticulo"]; 
    this.filtrosenc.clavearticulo = this.filtros.clavearticulo; 
    this.filtrosenc.descripcion = this.filtros.descripcion;
    
    this.boochkSeleccionada = e.data["seccionada"]; 
    this.intVelocidad = e.data["velocidadstdcorr"]; 
    //        public string velocidadstdcorr { get; set; }
    //public string seccionada { get; set; }

    this.grid.refreshData();

    this.modalRef.close();

    //this. btnCerrarModal();
  }

  PopupbtnCerrar(): void {
    this.ModalParo.closeModal();
  }

  PopupbtnGuardar(): void {
    this.articuloesp.clavearticulo = this.filtros.clavearticulo;
    this.articuloesp.velocidadstdcorr = this.intVelocidadStd; 
    this.articuloesp.velocidadstdimp = '0'; 
    this.articuloesp.seccionada = this.boochkSeleccionada; 
    this.articuloesp.setup = '0';
    this.articuloesp.estatus = true; 
    this.articuloesp.usuario = '001000';

    
    this.articuloespdet.clavearticulo = this.filtros.clavearticulo;
    this.articuloespdet.clavemaquina  =  this.filtros.clavemaquina;
    this.articuloespdet.velocidadstd  =  this.intVelocidadStd; 
    this.articuloespdet.proceso1  =  true; 
    this.articuloespdet.setup  =  ''; 
    this.articuloespdet.estatus  =  true; 
    this.articuloespdet.usuario = '001000';  


    const validar = true; //this.Validaciones();
    //if (validar) {
      if (this.TipoAccion === 'A') {

        this.articuloespserviceService.AgregarEnc(this.articuloesp).subscribe((data) => {
            this.articuloespserviceService.AgregarDet(this.articuloespdet).subscribe((data) => {
              swal.fire(
                'Guardado con Éxito',
                'El Registro fue Guardado con Éxito',
                'success'
              );    
              this.grid.refreshData();
              },(error) => {
              swal.fire(
                'Ha Ocurrio un Error',
                'Ha Ocurrio un Error al Momento de Guardar la Velocidad de Maquina, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
                'error'
              )
            });
            this.ModalParo.closeModal();
          //this.btnCerrar();
          },(error) => {
          swal.fire(
            'Ha Ocurrio un Error',
            'Ha Ocurrio un Error al Momento de Guardar la Velocidad de Maquina, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
            'error'
          )
        });
      } else {
        this.articuloespserviceService.AgregarEnc(this.articuloesp).subscribe((data) => {
          this.articuloespserviceService.ModificarDet(this.articuloespdet).subscribe((data) => {
            swal.fire(
              'Guardado con Éxito',
              'El Registro fue Guardado con Éxito',
              'success'
            );    
            this.grid.refreshData();
            },(error) => {
            swal.fire(
              'Ha Ocurrio un Error',
              'Ha Ocurrio un Error al Momento de Guardar la Velocidad de Maquina, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
              'error'
            )
          });
          this.ModalParo.closeModal();
        //this.btnCerrar();
        },(error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Guardar la Velocidad de Maquina, Favor de Comunicarse con el Área de Informática y Levantar un Reporte de Fallas, <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        )
      });
      }

    /*}
    else {
      //this.blockUI.stop();
      swal.fire('', validar.mensaje, 'error');
    }*/


  }

}
