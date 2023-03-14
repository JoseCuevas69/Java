import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Credito } from 'src/app/models/Credito';
import { amdccobapi001Service } from 'src/app/shared/services/amdccobapi001.service';
import swal from 'sweetalert2';

@Component({
  selector: 'lista-credito',
  templateUrl: './lista-credito.component.html',
  styleUrls: ['./lista-credito.component.css'],
})
export class ListaCreditoComponent implements OnInit {
  Credito: Array<Credito>;
  @Input() CreditoValue: string = 'sel';
  @Input() required: boolean = false;
  @Output()
  CreditoValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public CatalogosTrafico: amdccobapi001Service) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.CatalogosTrafico.ListarTipoCredito().subscribe(
      (data: any) => {
        this.Credito = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Credito, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
