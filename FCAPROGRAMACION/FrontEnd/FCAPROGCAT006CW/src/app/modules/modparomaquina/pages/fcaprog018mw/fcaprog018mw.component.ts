import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Fcaprog019mwService } from 'src/app/services/fcaprog019mw.service';
import Swal from 'sweetalert2';

import {
  camposGenerales, datosBusquedaPrograma, cbxTripulaciones,
  fcaprog018mw, cbxSupervisor, cbxParafina, objGuardar, ops, obtieneDesperdicio, actualiza, actualizaTablas, buscaCaptura, comboSupervisor, comboTripulacion, modifica, modificaTablas
} from '../../../../models/DTO/fcaprog018mw';
import { Fcaprog018mwService } from '../../../../services/fcaprog018mw.service';

@Component({
  selector: 'app-fcaprog018mw',
  templateUrl: './fcaprog018mw.component.html',
  styleUrls: ['./fcaprog018mw.component.css']
})
export class Fcaprog018mwComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  camposGenerales: camposGenerales;
  programa: 0;
  turno: '1';
  fecha: string;
  mdlValidaRef: NgbModalRef;
  cbxTripulaciones: Array<comboTripulacion>;
  cbxSupervisor: Array<comboSupervisor>;
  supervisorSeleccionado: string;
  tripulacionSeleccionado: number;
  objGuardar: objGuardar;
  columnasGrid1: any;
  datosGrid1 = [];
  ops: ops[] = [];
  singleOps = new ops;
  desperdicioSeleccionado: string;
  fechaProduccion: string;
  txtMetrosL: string;
  txtM2netos: string;
  txtMinutos: string;
  txtM2brutos: string;
  txtHoraFin: string;
  txtHoraInicio: string;
  wAnchoPromedio: string;
  txtKgPapel: string;
  modo = 'Acepta';
  txtDesp = "";
  txtCombas = "";
  txtDesor = "";
  dtActualizar: actualiza;
  dtModifica: modifica;
  kgdesp: string;
  usuario: string;
  optTurno = false;
  wFolioDesperdicio: number;
  constructor(
    public pipe: DatePipe,
    public servicio: Fcaprog018mwService,
    public servicio019: Fcaprog019mwService
  ) {
    this.columnasGrid1 = [
      {
        headerName: 'Descripcion',
        field: 'descripcion',
        flex: 1,
        minWidth: 95,
        headerClass: 'header-center header-grid-left',
      },
      {
        headerName: 'Cantidad',
        field: 'cantidad',
        flex: 1,
        minWidth: 95,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellRenderer: 'hybCellRenderer',
        cellRendererParams: {
          type: 'num',
          change: this.changeCantidadGridConceptos.bind(this),
        },
      },
    ];
  }

  async ngOnInit(): Promise<void> {
    this.camposGenerales = new camposGenerales();
    await this.cargaCbxSupervisor();
    await this.obtieneDesperdicio();
    await this.cargaCbxTripulaciones();
  }
  changeCantidadGridConceptos(obj: any): void {
    if (this.desperdicioSeleccionado == '' || this.desperdicioSeleccionado == undefined) {
      this.mensajeFlotante("Seleccione una OP primero", 3000, 1);
      return;
    }
    const row: ops = obj.data;
    var total = 0;
    for (const iterator of this.datosGrid1) {
      total = total + Number(iterator.cantidad);
    }

    this.ops.filter(x => x.op == this.desperdicioSeleccionado).forEach(z => z.malas = total.toString());
    this.CalculaDatos(this.desperdicioSeleccionado);
    //this.LeeDesperdicio();
  }
  /*
  LeeDesperdicio(){
        let i, lCantidad;
        this.wFolioDesperdicio = 0
        lCantidad = 0
        const obj: any = await this.servicio.leeDesperdicio(this.programa.toString(),this.turno,this.fechaProduccion,this.desperdicioSeleccionado);
        if (obj.success && obj.data.length > 0) {
          for (const iterator of obj) {
            
          }
        }
        
        
        Do While Not tbGeneral.EOF
            For i = 1 To .grdDesImpresora.Rows - 1
                If .grdDesImpresora.TextMatrix(i, 4) = tbGeneral![clave Desperdicio] & "" _
                   And .grdDesImpresora.TextMatrix(i, 5) = tbGeneral![clave Cargo] & "" _
                   And .lblOP.Caption = tbGeneral!op & "" Then
                    .grdDesImpresora.TextMatrix(i, 1) = tbGeneral!cantidad
                    lCantidad = lCantidad + tbGeneral!cantidad
                    wFolioDesperdicio = tbGeneral![Folio Desperdicio]
                    .grdDesImpresora.TextMatrix(i, 6) = "A"
                    Exit For
                End If
            Next i
            tbGeneral.MoveNext
        Loop
        .txtMalas(wIndex) = lCantidad
        End With
        tbGeneral.Close
End Sub
  }*/
  async btnBuscarPrograma(): Promise<void> {
    if (this.programa) {
      this.blockUI.start('Obteniendo programa');
      try {
        const objBuscaPrograma: any = await this.servicio.buscaPrograma(this.programa);
        this.blockUI.stop();
        if (objBuscaPrograma.success && objBuscaPrograma.data.length > 0) {
          const obj: Array<datosBusquedaPrograma> = objBuscaPrograma.data;
          for (const iterator of obj) {
            if (iterator.estatus == 'C') {
              Swal.fire('Error', "Programa cancelado el " + iterator.fechaSistema + " a las " + iterator.horaSistema + "...", 'error');
            }
            this.wAnchoPromedio = iterator.anchoPromedio;
            this.singleOps.op = iterator.op;
            this.singleOps.articulo = iterator.articulo;
            this.singleOps.largo = iterator.largoHoja;
            this.singleOps.ancho = iterator.anchoHoja;
            this.singleOps.hojas = iterator.hojasCorte;
            this.singleOps.piezas = iterator.piezaCorte;
            this.singleOps.area = Number(iterator.areaUnitaria).toFixed(4);
            if (this.singleOps.cortes == undefined || this.singleOps.cortes.length === 0) {
              this.singleOps.cortes = "0";
            }
            if (this.singleOps.malas == undefined || this.singleOps.malas.length === 0) {
              this.singleOps.malas = "0";
            }
            if (this.singleOps.m2reales == undefined || this.singleOps.m2reales.length === 0) {
              this.singleOps.m2reales = "0";
            }

            if (this.singleOps.op != '') {
              this.ops.push(this.singleOps);
              this.singleOps = new ops;
            }
          }
        }
        else {
          this.mensajeFlotante('Número de Programa INEXISTENTE', 3000, 1);
        }
      } catch (error) {
        this.blockUI.stop();
        Swal.fire('Error', error.error, 'error');
      }
    }
    else {
      this.mensajeFlotante('Favor de capturar el programa', 3000, 1);
    }
  }
  async buscaCaptura() {
    if (this.programa == 0 || this.programa == undefined || this.fecha == '' || this.fecha == undefined) {
      this.mensajeFlotante('Favor de capturar programa y fecha de producción', 3000, 1);
      this.fecha == '';
      return;
    }
    this.iniciaProduccion();
    let BuscaCaptura = false;
    let wCalcula = true;
    if (this.programa == 0) {
      return false;
    } else {
      BuscaCaptura = false;
      const res: any = await this.servicio.buscaCaptura(this.programa, this.turno, this.fecha);
      if (res.success && res.data.length > 0) {
        const data: Array<buscaCaptura> = res.data;
        for (const iterator of data) {
          this.txtMetrosL = Number(iterator.metrosLineales).toFixed(2).toString();
          this.txtDesp = iterator.laminasDespegadas;
          this.txtCombas = iterator.laminasCombas;
          this.txtDesor = iterator.laminasDesorilladas;

          if (iterator.horaInicio == "" || iterator.horaInicio == "00:00") {
            this.txtHoraInicio = "00:00";
          } else {
            const date = new Date("01-01-2017 " + iterator.horaInicio);
            let latest_date = this.pipe.transform(date, 'HH:mm');
            this.txtHoraInicio = latest_date;
          }
          if (iterator.horaFinal == "" || iterator.horaFinal == "00:00") {
            this.txtHoraFin = "00:00";
          } else {
            const date2 = new Date("01-01-2017 " + iterator.horaFinal);
            let latest_date2 = this.pipe.transform(date2, 'HH:mm');
            this.txtHoraFin = latest_date2;
          }
          this.fechaProduccion = this.pipe.transform(iterator.fecha, "dd/MM/yyyy");
          this.supervisorSeleccionado = this.cbxSupervisor.find(x => x.claveSupervisor.trim() == iterator.supervisor.trim()).claveSupervisor;
          this.tripulacionSeleccionado = this.cbxTripulaciones.find(x => x.idTripulacion == Number(iterator.idTripulacion)).idTripulacion;

          for (const op of data) {
            let exists = this.ops.find(x => x.op == op.op);
            if (exists) {
              this.ops.filter(x => x.op == op.op).forEach(z => z.buenas = op.laminas);
              this.ops.filter(x => x.op == op.op).forEach(z => z.malas = op.laminasDesperdicio);
              this.ops.filter(x => x.op == op.op).forEach(z => z.cortes = op.numeroCortes);
            }
          }

          BuscaCaptura = true;
          wCalcula = false;
        }
      }
    }
    return BuscaCaptura;
  }
  async txtTurno_Change(): Promise<void> {
    if (await this.buscaCaptura()) {
      this.CalculaProduccion();
      this.optTurno = false;
      this.modo = "Modifica";
    } else {
      this.modo = "Acepta";
    }
  }
  async cargaCbxSupervisor(): Promise<void> {
    const res: any = await this.servicio.buscaSupervisor();
    if (res.success && res.data.length > 0) {
      this.cbxSupervisor = res.data;
    }
  }
  async cargaCbxTripulaciones(): Promise<void> {
    const res: any = await this.servicio.buscaTripulaciones();
    if (res.success && res.data.length > 0) {
      this.cbxTripulaciones = res.data;
    }
  }
  async iniciaProduccion(): Promise<void> {
    const res: any = await this.servicio019.leeHoraLocal();
    if (res.success && res.data.length > 0) {
      const data: Array<fcaprog018mw> = res.data;
      for (const iterator of data) {
        this.fecha = iterator.fecha.substring(0, 10).trim();
        this.camposGenerales.horaIni = iterator.fecha.substring(11, 16).trim();
        this.camposGenerales.horaFin = iterator.fecha.substring(11, 16).trim();
      }
    }
    this.camposGenerales.desperdicioImpresora = 0;
    this.camposGenerales.desperdicioCorrugadora = 0;
    this.camposGenerales.desperdicioLinea = 0;
  }
  async validaDatos(): Promise<boolean> {
    if (!this.programa) {
      this.mensajeFlotante('Seleccione un Programa', 3000, 1);
      return false;
    }
    if (!this.supervisorSeleccionado) {
      this.mensajeFlotante('Seleccione un Supervisor', 3000, 1);
      return false;
    }
    if (!this.turno) {
      this.mensajeFlotante('Seleccione un Turno', 3000, 1);
      return false;
    }
    if (!this.supervisorSeleccionado) {
      this.mensajeFlotante('Seleccione una Tripulación', 3000, 1);
      return false;
    }
    const res: any = await this.servicio.ValidaDatos(this.programa, this.turno);
    if (res.success && res.data.length > 0) {
      this.mensajeFlotante('No se Actualizaron los Datos... Ya existe Información en el Turno modificado', 3000, 1);
      return false;
    }
    return true;
  }
  async CalculaKgPapel() {
    if (this.programa.toString() == '' || this.programa.toString() == undefined) {
      this.mensajeFlotante("No deje vacío el espacio de programa", 3000, 1);
      return;
    }
    let lFlauta1 = "", lFlauta2, lFlauta3, lGramaje;
    let liner1, liner2, liner3, liner4, Eliner1, Eliner2, Eliner3, Eliner4;
    let Aliner1, Aliner2, Aliner3, Aliner4, AEliner1, AEliner2, AEliner3, AEliner4;
    let Med1, Med2, Med3, eMed1, eMed2, eMed3;
    let AMed1, AMed2, AMed3, AeMed1, AeMed2, AeMed3;
    let lPesoTot, lPeso, lFactor;
    let lMtsLin;

    const obj: any = await this.servicio.CalculaKGPapel(this.programa.toString());
    this.blockUI.stop();
    lPesoTot = 0
    lPeso = 0
    if (obj.success && obj.data.length > 0) {
      for (const iterator of obj.data) {
        lPesoTot = 0
        lPeso = 0
        lMtsLin = this.txtMetrosL;
        lFlauta1 = iterator.flauta1
        lFlauta2 = iterator.flauta2
        lFlauta3 = iterator.flauta3
        liner1 = iterator.liner1
        liner2 = iterator.liner2
        liner3 = iterator.liner3
        liner4 = iterator.liner4

        Aliner1 = (Number(iterator.anchoL1) * 2.54);
        Aliner2 = (Number(iterator.anchoL2) * 2.54);
        Aliner3 = (Number(iterator.anchoL3) * 2.54);
        Aliner4 = (Number(iterator.anchoL4) * 2.54);
        Eliner1 = iterator.empalme1
        Eliner2 = iterator.empalme2
        Eliner3 = iterator.empalme3
        Eliner4 = iterator.empalme4
        AEliner1 = (Number(iterator.anchoEmpalme1) * 2.54);
        AEliner2 = (Number(iterator.anchoEmpalme2) * 2.54);
        AEliner3 = (Number(iterator.anchoEmpalme3) * 2.54);
        AEliner4 = (Number(iterator.anchoEmpalme4) * 2.54);
        lGramaje = Number(await this.Gramaje(liner1));
        lPeso = Number(lGramaje * (Aliner1 / 100) * lMtsLin);
        lPesoTot = lPesoTot + lPeso;
        lGramaje = Number(await this.Gramaje(Eliner1));
        lPeso = Number(lGramaje * (AEliner1 / 100) * lMtsLin);
        lPesoTot = lPesoTot + lPeso;

        if (liner2.trim() != "") {
          lGramaje = Number(await this.Gramaje(liner2));
          lPeso = Number(lGramaje * (Aliner2 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso;
          lGramaje = Number(await this.Gramaje(Eliner2));
          lPeso = Number(lGramaje * (AEliner2 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso;
        }
        if (liner3.trim() != "") {
          lGramaje = Number(await this.Gramaje(liner3));
          lPeso = Number(lGramaje * (Aliner3 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso;
          lGramaje = Number(await this.Gramaje(Eliner3));
          lPeso = Number(lGramaje * (AEliner3 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso;
        }
        if (liner4.trim() != "") {
          lGramaje = Number(await this.Gramaje(liner4));
          lPeso = Number(lGramaje * (Aliner4 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso;
          lGramaje = Number(await this.Gramaje(Eliner4));
          lPeso = Number(lGramaje * (AEliner4 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso;
        }

        Med1 = iterator.corrugado1;
        Med2 = iterator.corrugado2;
        Med3 = iterator.corrugado3;

        AMed1 = (Number(iterator.anchoC1) * 2.54);
        AMed2 = (Number(iterator.anchoC2) * 2.54);
        AMed3 = (Number(iterator.anchoC3) * 2.54);
        eMed1 = iterator.empalmeC1;
        eMed2 = iterator.empalmeC2;
        eMed3 = iterator.empalmeC3;
        AeMed1 = (Number(iterator.anchoEmpalmeC1) * 2.54);
        AeMed2 = (Number(iterator.anchoEmpalmeC2) * 2.54);
        AeMed3 = (Number(iterator.anchoEmpalmeC3) * 2.54);

        if (Med1.trim() != "") {
          lFactor = (lFlauta1 == 'C' ? 1.42 : (lFlauta1 == "B" ? 1.33 : 1.59))
          lGramaje = Number(await this.Gramaje(Med1));
          lPeso = Number(lFactor * lGramaje * (AMed1 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso
          lGramaje = Number(await this.Gramaje(eMed1));
          lPeso = Number(lFactor * lGramaje * (AeMed1 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso
        }
        if (Med2.trim() != "") {
          lFactor = (lFlauta2 == "C" ? 1.42 : (lFlauta2 == "B" ? 1.33 : 1.59))
          lGramaje = Number(await this.Gramaje(Med2));
          lPeso = Number(lFactor * lGramaje * (AMed2 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso
          lGramaje = Number(await this.Gramaje(eMed2));
          lPeso = Number(lFactor * lGramaje * (AeMed2 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso
        }
        if (Med3.trim() != "") {
          lFactor = (lFlauta3 == "C" ? 1.42 : (lFlauta3 == "B" ? 1.33 : 1.59))
          lGramaje = Number(await this.Gramaje(Med3));
          lPeso = Number(lFactor * lGramaje * (AMed3 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso
          lGramaje = Number(await this.Gramaje(eMed3));
          lPeso = Number(lFactor * lGramaje * (AeMed3 / 100) * lMtsLin);
          lPesoTot = lPesoTot + lPeso
        }

        this.txtKgPapel = lPesoTot.toFixed(0);
      }
    }
  }
  async Gramaje(lClave: string): Promise<string> {
    let gramaje = "";
    const obj: any = await this.servicio.Gramaje(lClave);
    if (obj.success && obj.data.length > 0) {
      for (const iterator of obj.data) {
        gramaje = iterator.gramaje;
        break;
      }
    }
    return gramaje;
  }
  async btnAcepta(): Promise<void> {
    if (!this.validaDatos()) {
      return;
    }
    this.CalculaProduccion();
    this.CalculaKgPapel();

    if (this.modo == 'Acepta') {
      this.actualiza();
      this.modo = 'Modifica';
    } else {
      this.modifica();
    }
  }
  async buscaCapturaExistente(): Promise<boolean> {
    let BuscaCapturaExistente = false;

    const res: any = await this.servicio.buscaCapturaExistente(this.programa.toString(), this.turno, this.fecha);
    if (res.success && res.data.length > 0) {
      BuscaCapturaExistente = true;
      this.mensajeFlotante('Ya existe Captura de Producción Corrugadora...Verifique los Datos e Intente de Nuevo', 1, 3000);
    }

    return BuscaCapturaExistente;
  }
  async actualiza() {
    let lPzasCorte, lHojasBuenas, lSupervisor;
    let lNumCortes, LaminasMalas, LaminasTotal, lHojasMalas, lHojasMalasTotal;
    lSupervisor = this.supervisorSeleccionado;

    if (this.txtDesp.trim() == "") {
      this.txtDesp = "0";
    }
    if (this.txtCombas.trim() == "") {
      this.txtCombas = "0";
    }
    if (this.txtDesor.trim() == "") {
      this.txtDesor = "0";
    }

    lHojasMalasTotal = 0
    let existe = await this.buscaCapturaExistente();
    if (existe) {
      return;
    }
    this.dtActualizar = new actualiza;
    this.dtActualizar.tablas = new Array<actualizaTablas>();
    for (const op of this.ops) {
      lNumCortes = Number(op.cortes).toFixed(0);
      lPzasCorte = Number(op.largo).toFixed(0);
      lHojasBuenas = Number(op.buenas).toFixed(0);
      lHojasMalas = Number(op.malas).toFixed(0);
      LaminasTotal = lHojasBuenas;
      LaminasMalas = lHojasMalas;
      lHojasMalasTotal = Number(lHojasMalasTotal) + Number(LaminasMalas);
      let newOp = new actualizaTablas;
      newOp.programa = this.programa.toString();
      newOp.op = op.op;
      newOp.turno = this.turno.toString();
      newOp.numeroCortes = op.cortes;
      newOp.laminasTotal = op.buenas;
      newOp.laminasMalas = op.malas;
      newOp.laminasTotal = (Number(op.buenas) * Number(op.cortes)).toString();
      this.dtActualizar.tablas.push(newOp);
    }
    this.dtActualizar.Programa = this.programa.toString();
    this.dtActualizar.SFechaProduccion = this.fecha.toString();
    this.dtActualizar.HoraInicio = this.txtHoraInicio.toString();
    this.dtActualizar.HoraFin = this.txtHoraFin.toString();
    this.dtActualizar.MetrosLineales = Number(this.txtMetrosL).toFixed(0).toString();
    this.dtActualizar.MCuadrados = this.txtM2brutos.toString();
    this.dtActualizar.KgPapel = this.txtKgPapel.toString();
    this.dtActualizar.KgDesp = "0";
    this.dtActualizar.LaminasDespegadas = this.txtDesp.toString();
    this.dtActualizar.LaminasCombas = this.txtCombas.toString();
    this.dtActualizar.LaminasDesorilladas = this.txtDesor.toString();
    this.dtActualizar.Supervisor = this.supervisorSeleccionado.toString();
    this.dtActualizar.Turno = this.turno.toString();
    this.dtActualizar.UsuarioSistema = localStorage.getItem("Usuario").toString();
    this.dtActualizar.LaminasDesperdicio = lHojasMalasTotal.toString();
    this.dtActualizar.IdTripulacion = this.tripulacionSeleccionado.toString();

    const res: any = await this.servicio.actualiza(this.dtActualizar);
    if (res.success) {
      this.mensajeFlotante("Actualización Realizada", 3000);
    }
  }

  async modifica() {
    let lPzasCorte, lHojasBuenas, lSupervisor;
    let lNumCortes, LaminasMalas, LaminasTotal, lHojasMalas, lHojasMalasTotal;
    lSupervisor = this.supervisorSeleccionado;

    if (this.txtDesp.trim() == "") {
      this.txtDesp = "0";
    }
    if (this.txtCombas.trim() == "") {
      this.txtCombas = "0";
    }
    if (this.txtDesor.trim() == "") {
      this.txtDesor = "0";
    }

    lHojasMalasTotal = 0

    this.dtModifica = new modifica;
    this.dtModifica.tablas = new Array<modificaTablas>();
    for (const op of this.ops) {
      lNumCortes = Number(op.cortes).toFixed(0);
      lPzasCorte = Number(op.largo).toFixed(0);
      lHojasBuenas = Number(op.buenas).toFixed(0);
      lHojasMalas = Number(op.malas).toFixed(0);
      LaminasTotal = lHojasBuenas;
      LaminasMalas = lHojasMalas;
      lHojasMalasTotal = Number(lHojasMalasTotal) + Number(LaminasMalas);
      let newOp = new modificaTablas;
      newOp.numCortes = op.cortes;
      newOp.laminas = LaminasTotal;
      newOp.laminasDesperdicio = lHojasMalasTotal.toString();
      newOp.kgDesp = this.txtDesp.toString();
      newOp.programa = this.programa.toString();
      newOp.turno = this.turno.toString();
      newOp.oP = op.op;
      newOp.sFechaProduccion = this.fecha.toString();
      newOp.laminasTotal = Number(((lHojasBuenas * lPzasCorte) - Number(op.buenas) * lPzasCorte)).toFixed(0);
      this.dtModifica.tablas.push(newOp);
    }

    this.dtModifica.turnoChk = this.optTurno.toString() == 'false' ? '0' : '1' ;
    this.dtModifica.sFechaProduccion = this.fecha.toString();
    this.dtModifica.horaInicio = this.txtHoraInicio.toString();
    this.dtModifica.horaFin = this.txtHoraFin.toString();
    this.dtModifica.metrosLineales = Number(this.txtMetrosL).toFixed(0).toString();
    this.dtModifica.mCuadrados = this.txtM2brutos.toString();
    this.dtModifica.laminasDespegadas = this.txtDesp.toString();
    this.dtModifica.laminasCombas = this.txtCombas.toString();
    this.dtModifica.laminasDesorilladas = this.txtDesor.toString();
    this.dtModifica.supervisor = this.supervisorSeleccionado.toString();
    this.dtModifica.usuarioSistema = localStorage.getItem("Usuario").toString();
    this.dtModifica.kgPapel = this.txtKgPapel.toString();
    this.dtModifica.laminasDesperdicio = lHojasMalasTotal.toString();
    this.dtModifica.idTripulacion = this.tripulacionSeleccionado.toString();
    this.dtModifica.programa = this.programa.toString();
    this.dtModifica.turno = this.turno.toString();
    this.dtModifica.sFecha = this.fecha.toString();
    this.dtModifica.folioDesperdicio = '1';

    const res: any = await this.servicio.modifica(this.dtModifica);
    if (res.success) {
      this.mensajeFlotante("Actualización Realizada", 3000);
    }
  }
  btnCalcula() {
    this.CalculaProduccion();
    this.CalculaKgPapel();
  }
  dateDiff(horaI: string, horaF: string) {
    var hi = '', hf = '';
    var mHi = 0, mHf = 0, difMin = 0;
    if (horaI > horaF) { hi = horaF; hf = horaI; }
    else { hi = horaI; hf = horaF; }

    mHi = (Number(hi.substring(0, 2)) * 60) + Number(hi.substring(3, 5));
    mHf = (Number(hf.substring(0, 2)) * 60) + Number(hf.substring(3, 5));
    difMin = mHf - mHi;

    return difMin;
  }
  async m3_txtHora_change(): Promise<void> {
    var lMin = 0;
    lMin = await this.dateDiff(this.camposGenerales.horaIni, this.camposGenerales.horaFin);
    if (lMin < 0) {
      lMin = 1440 - lMin;
    }
    if (lMin > 450) {
      Swal.fire('Información', 'Tiempo calculado ' + lMin.toString() + " minutos... Por favor, verifique", 'info');
    }
  }
  mensajeFlotante(mensaje: string, tiempo: number = 2700, icono: number = 0): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: tiempo
    });

    Toast.fire({
      icon: icono === 0 ? 'success' : icono === 1 ? 'info' : 'error',
      title: mensaje
    });
  }
  CalculaDatos(op: string): void {
    let opChange = this.ops.filter(x => x.op == op)[0];
    let lBuenas = opChange.buenas;
    let lMalas = opChange.malas;
    let lHLargo = opChange.largo;
    let lHAncho = opChange.ancho;
    let lHCorte = opChange.hojas;
    let lMtsLin = 0;
    this.ops.filter(x => x.op == op).forEach(z => z.m2reales = ((Number(lBuenas) * Number(lHLargo) * Number(lHAncho)) / 10000).toFixed(1));

    if (Number(lHCorte) > 0) {
      this.ops.filter(x => x.op == op).forEach(z => z.cortes = (((Number(lBuenas) + Number(lMalas)) / Number(lHCorte)).toFixed(0)));
      let temp = this.ops.filter(x => x.op == op)[0];
      lMtsLin = ((Number(temp.cortes) * Number(lHLargo)) / 100);
      if (lMtsLin > Number(this.txtMetrosL)) {
        this.txtMetrosL = Math.ceil(Number(lMtsLin)).toFixed(1).toString();
      }
    }
  }
  CalculaProduccion() {
    if (this.txtHoraFin.toString() == '' || this.txtHoraFin.toString() == undefined || this.txtHoraInicio.toString() == '' || this.txtHoraInicio.toString() == undefined) {
      this.mensajeFlotante("Seleccione el rango de horas", 3000, 1);
      return;
    }
    this.txtMetrosL = "0";
    let lMtsNetos = 0;
    let lPzasCorte = 0;
    let lAreaUnit = 0;
    let lHojasBuenas = 0;
    let LaminasBuenas = 0;

    for (let index = 0; index < this.ops.length; index++) {
      lPzasCorte = Number(this.ops[index].cortes);
      lAreaUnit = Number(this.ops[index].area);
      lHojasBuenas = Number(this.ops[index].buenas);
      LaminasBuenas = lHojasBuenas * lPzasCorte;
      lMtsNetos = (lMtsNetos + (LaminasBuenas * lAreaUnit));
      this.CalculaDatos(this.ops[index].op);
    }

    this.txtM2netos = Number(lMtsNetos).toFixed(1);
    let horaInicio = this.txtHoraInicio;
    let horaFin = this.txtHoraFin;


    let lMin = this.dateDiff(horaInicio, horaFin);
    let lHora = Math.floor(Number(lMin / 60)).toFixed(0);
    lMin = (lMin - (Number(lHora) * 60));
    if (Number(lHora) < 0) {
      lHora = 24 + lHora
    }
    let lMtsLin = Number(this.txtMetrosL);
    let newMin = '';
    if (lHora.length < 2) { lHora = '0' + lHora; } else { lHora = lHora; }
    if (lMin.toString().length < 2) { newMin = '0' + lMin } else { newMin = lMin.toString(); }

    this.txtMinutos = lHora + ":" + newMin;
    this.txtM2brutos = ((Number(this.wAnchoPromedio) * lMtsLin) / 100).toFixed(1);
  }
  async txtBuenasChange(op: string, lBuenas: any, lMalas: any): Promise<void> {
    let opChange = this.ops.filter(x => x.op == op)[0];
    let lHLargo = opChange.largo;
    let lHAncho = opChange.ancho
    let lHCorte = opChange.hojas;
    this.ops.filter(x => x.op == op).forEach(z => z.buenas = lBuenas.target.value);
    this.ops.filter(x => x.op == op).forEach(z => z.m2reales = ((Number(lBuenas.target.value) * Number(lHLargo) * Number(lHAncho)) / 10000).toFixed(1));
    if (Number(lHCorte) > 0) {
      this.ops.filter(x => x.op == op).forEach(z => z.cortes = ((Number(lBuenas.target.value) + Number(lMalas) / Number(lHCorte)).toFixed(0)));
    }
    this.CalculaDatos(op);
  }
  async onFocus(op: string): Promise<void> {
    this.desperdicioSeleccionado = op;
  }
  async obtieneDesperdicio() {
    const objDesperdicio: any = await this.servicio.ObtieneDesperdicio();
    this.datosGrid1 = [];
    if (objDesperdicio.success && objDesperdicio.data.length > 0) {
      const obj: Array<obtieneDesperdicio> = objDesperdicio.data;
      for (const iterator of obj) {
        let desperdicio = new obtieneDesperdicio;
        desperdicio.cantidad = '0';
        desperdicio.descripcion = iterator.descripcion;
        this.datosGrid1.push(desperdicio);
      }
    }
  }
}
