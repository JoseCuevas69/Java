import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MaestraNo } from 'src/app/models/DTO/MaestraNo';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-maestrano',
  templateUrl: './lista-maestrano.component.html',
  styleUrls: ['./lista-maestrano.component.css']
})
export class ListaMaestranoComponent implements OnInit {
  MaestraNo: Array<MaestraNo>;
  @Input() MaestraNoValue = '';
  @Input() required = false;
  @Output()
  MaestraNoValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() mosLabel = true;
  constructor(public CatalogosVentas: fcaventapi001Service) { }

  ngOnInit(): void {
    this.buscar();
  }
  buscar(): void {
    this.CatalogosVentas.ListarMaestraNo().subscribe(
      (data: any) => {
        this.MaestraNo = data.data;
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Maestra No. , Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
}
