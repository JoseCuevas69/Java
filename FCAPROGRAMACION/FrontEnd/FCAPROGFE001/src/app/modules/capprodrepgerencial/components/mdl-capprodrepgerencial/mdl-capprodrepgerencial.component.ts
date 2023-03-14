import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { iCapProdRepGerencial } from 'src/app/models/Programacion/iCapProdRepGerencial';
import { CapProdRepGerencialService } from 'src/app/services/Programacion/capprodrepgerencial.service';

@Component({
  selector: 'app-mdl-capprodrepgerencial',
  templateUrl: './mdl-capprodrepgerencial.component.html',
  styleUrls: ['./mdl-capprodrepgerencial.component.css']
})
export class MdlCapprodrepgerencialComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  @Input() set Datos(value: any) {
    if (Object.keys(value).length !== 0) {
      this.DatFormulario = value;
    }
  }
  @Output() ClickbtnCerrar = new EventEmitter<any>();

  DatFormulario: iCapProdRepGerencial = {
    Accion: 0,
    claveMaquina: '',
    turnos: 0,
    m2CargaPendiente: 0,
    m2PromTurno: 0,
  };


  constructor(public Servicio: CapProdRepGerencialService) { }

  ngOnInit(): void {
  }

  btnGuardar(): void {
    this.blockUI.start('Cargando...');
    this.Agregar();
  }



  btnCerrar(): void {
    this.Limpiar();
    this.ClickbtnCerrar.emit();
  }

  Agregar(): void {

    this.DatFormulario.turnos = Number(this.DatFormulario.turnos);
    this.DatFormulario.m2CargaPendiente = Number(this.DatFormulario.m2CargaPendiente);
    this.DatFormulario.m2PromTurno = Number(this.DatFormulario.m2PromTurno);

    this.Servicio.InsertData(this.DatFormulario).subscribe(
      (data: any) => {
        if (data.correcto) {
          swal.fire(
            '',
            'Los Datos fueron agregados correctamente',
            'success'
          );
          this.blockUI.stop();
          this.Limpiar();
          this.btnCerrar();
        } else {
          this.blockUI.stop();
          swal.fire(
            '',
            'Ocurrió un error al tratar de guardar los datos. ' + data.mensaje,
            'error'
          );
        }
      },
      (error) => {
        this.blockUI.stop();
        swal.fire(
          'Datos ',
          'Ha Ocurrido un Error al Momento de Agregar,' +
            ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,' +
            ' <strong>Código de Error: ' +
            error.error +
            '</strong>',
          'error'
        );
      }
    );
  }

  Limpiar(): void {
    this.DatFormulario = {
      Accion: 0,
      claveMaquina: '',
      turnos: 0,
      m2CargaPendiente: 0,
      m2PromTurno: 0,
    };

  }
}
