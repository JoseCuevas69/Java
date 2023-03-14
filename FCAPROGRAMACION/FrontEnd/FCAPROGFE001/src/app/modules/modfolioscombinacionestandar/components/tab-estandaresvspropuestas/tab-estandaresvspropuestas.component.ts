import { Component, OnInit } from '@angular/core';

interface Filtros {
  clavepapel: string; 
  descripcion: string;
}

@Component({
  selector: 'app-tab-estandaresvspropuestas',
  templateUrl: './tab-estandaresvspropuestas.component.html',
  styleUrls: ['./tab-estandaresvspropuestas.component.css']
})
export class TabEstandaresvspropuestasComponent implements OnInit {

  booRefile: boolean;
  booCambioCombinacion : boolean;
  booAmbos : boolean;

  columnDefs: any;

  filtros: Filtros = 
          { 
            clavepapel: '', 
            descripcion: '', 
          };

  constructor() { }

  ngOnInit(): void {
  }

  onRefileChange(val: any) {
    //this.filtros.TipoTiempo = val.value;
   } 

   onCambioCombinacionChange(val: any) {
    //this.filtros.TipoMaquina = val.value;
    //this.getMaquinas(val.value);
   } 

   onAmbosChange(val: any) {
    //this.filtros.TipoMaquina = val.value;
    //this.getMaquinas(val.value);
   } 

  BuscarPapeles(): void {
    //this.grid.refreshData();
  }

  btnAgregar(): void {
  }

  btnCerrarModal(): void {
    //this.ModalParo.closeModal();
  }

}
