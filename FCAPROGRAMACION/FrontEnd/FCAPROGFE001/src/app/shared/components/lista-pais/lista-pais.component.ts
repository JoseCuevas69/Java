import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pais } from 'src/app/models/Pais';
import { sertrafapi001Service } from 'src/app/shared/services/sertrafapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-pais',
  templateUrl: './lista-pais.component.html',
  styleUrls: ['./lista-pais.component.css'],
})
export class ListaPaisComponent implements OnInit {
  Pais: Array<Pais>;
  @Input() PaisValue = 'sel';
  @Input() required = false;
  @Input() label = 'Pais:';
  @Input() Disabled = false;
  @Output() PaisValueChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(public CatalogosTrafico: sertrafapi001Service) {}

  ngOnInit(): void {
    this.buscarPais();
  }

  buscarPais(): void {
    this.CatalogosTrafico.ListarPais().subscribe(
      (data: any) => {
        this.Pais = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Pais, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
