import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoDato } from 'src/app/models/TipoDato';
import { fcaventapi001Service } from 'src/app/shared/services/fcaventapi001.service';
import swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-tipodato',
  templateUrl: './lista-tipodato.component.html',
  styleUrls: ['./lista-tipodato.component.css'],
})
export class ListaTipodatoComponent implements OnInit {
  TipoDato: TipoDato[] = [];
  @Input() set TipoDatoValue(value) {
    this.seleccionar = new TipoDato(value);
  }
  seleccionar: TipoDato;

  @Input() required = false;
  @Output() TipoDatoValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() requiredChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private Servicios: fcaventapi001Service) {}

  ngOnInit(): void {
    this.Buscar();
  }
  Buscar(): void {
    this.Servicios.ListarTipoDato().subscribe(
      (data: any) => {
        this.TipoDato.push(new TipoDato(0, 'SELECCIONAR...'));
        data.data.forEach((element) => {
          this.TipoDato.push(
            new TipoDato(
              element.idTipoDato,
              element.tipoDato,
              element.permiteLogitud
            )
          );
        });
      },
      (error) => {
        swal.fire(
          'Datos ',
          'Ha Ocurrio un Error al Momento de Cargar la Informacion de Tipo Dato,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }
  Change(e): void {
    this.requiredChange.emit(false);
    this.TipoDatoValueChange.emit(e);
  }
  comparar(Sel: TipoDato, Dat: TipoDato): boolean {
    if (Sel === null || Dat === null) {
      return false;
    }
    return Sel.idTipoDato === Dat.idTipoDato;
  }
}
