import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Maquina } from 'src/app/models/maquina';
import swal from 'sweetalert2';
import { FolioscombinacionestandarserviceService } from 'src/app/services/folioscombinacionestandarservice.service';
import { ActivatedRoute } from '@angular/router';

interface Filtros {
  folio: string; 
  programa: string; 
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

@Component({
  selector: 'app-tabfolio',
  templateUrl: './tabfolio.component.html',
  styleUrls: ['./tabfolio.component.css']
})
export class TabfolioComponent implements OnInit {

  booRefile: boolean;
  booCambioCombinacion : boolean;
  booAmbos : boolean;

  strValueOpc : string;

 
  @ViewChild('gridPrincipal') grid: any;

  columnDefs: any;

  filtros: Filtros = 
          { 
            folio: '', 
            programa: '' 
          };

    constructor(private route: ActivatedRoute, public folioscombinacionestandarserviceService: FolioscombinacionestandarserviceService, private modalService: NgbModal) {
  //constructor() { 
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
  BuscarPrograma(): void {
    this.grid.refreshData();
  }

  btnAgregar(): void {
  }

  btnCerrarModal(): void {
    //this.ModalParo.closeModal();
  }

}
