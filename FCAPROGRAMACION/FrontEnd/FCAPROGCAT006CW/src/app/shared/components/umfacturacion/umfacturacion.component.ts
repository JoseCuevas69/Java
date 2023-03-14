import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {fcaventapi001Service} from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'select-umfacturacion',
  templateUrl: './umfacturacion.component.html',
  styleUrls: ['./umfacturacion.component.css']
})
export class UmfacturacionComponent implements OnInit {

  ListaUMFac = [];
  @Input() UmFacturacionValue: number;
  @Input() required: boolean = false;
  @Output() ItemData = new EventEmitter<number>();
  constructor(private Servicios: fcaventapi001Service) { }

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(){
    this.Servicios.ListarUMFacturacion().subscribe((data: any) => {
      this.ListaUMFac = data.data;
    },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista de Industrias,'
          + ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,'
          + ' <strong>Código de Error: ' + error.error + '</strong>',
          'error'
        );
      });
  }

}