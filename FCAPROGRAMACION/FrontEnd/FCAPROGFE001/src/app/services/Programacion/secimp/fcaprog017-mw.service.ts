import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import {
  cap001SuspenderOP, cap004FijarFecha, cap016ValidarTraspasoOps, objProgramasCap001,
  objProgramasCap005, objSPActOpc6, opc4p2, parSPLecOpc23, spActOpc10, spActOpc8
} from '../../../models/Programacion/secimp/FCAPROG017MWModel';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'FCAPROG017MW/';

@Injectable({
  providedIn: 'root'
})
export class FCAPROG017MWService {

  constructor(public http: HttpClient) { }
  // LEC OPC 1
  async getMaquinas(tipo: string, tipoClave: string, claveMaquina: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getMaquinas';
    const params = new HttpParams()
      .append("tipo", tipo)
      .append("tipoClave", tipoClave)
      .append('claveMaquina', claveMaquina);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 2
  async getMaquinaMantenimiento(claveMaquina: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getMaquinaMantenimiento';
    const params = new HttpParams()
      .append("claveMaquina", claveMaquina);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 3
  async getSecuenciaMaquinasOpsCanceladas(tipo: string, claveMaquina: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getSecuenciaMaquinasOpsCanceladas';
    const params = new HttpParams()
      .append("tipo", tipo)
      .append("claveMaquina", claveMaquina);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 4
  async getComentariosOPArticulo(op: string, claveArticulo: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getComentariosOPArticulo';
    const params = new HttpParams()
      .append("op", op)
      .append("claveArticulo", claveArticulo);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 5
  async getAllOpsMaquina(op: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getAllOpsMaquina';
    const params = new HttpParams()
      .append("op", op);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 6
  async getSigProCap(): Promise<object> {
    const url = URL_PROGRAMACION + 'getSigProCap';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  // LEC OPC 7 y 8
  async mdlCap009_BuscaOP(opc: string, op: string): Promise<object> {
    const url = URL_PROGRAMACION + 'mdlCap009_BuscaOP';
    const params = new HttpParams()
      .append("opc", opc)
      .append("op", op);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 9
  async mdlCap009_GetCbxModificaProceso(claveMaquina: string, mvt: string): Promise<object> {
    const url = URL_PROGRAMACION + 'mdlCap009_GetCbxModificaProceso';
    const params = new HttpParams()
      .append("claveMaquina", claveMaquina)
      .append("mvt", mvt);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 10
  async mdlCap009_GetCbxProceso(claveProceso: string): Promise<object> {
    const url = URL_PROGRAMACION + 'mdlCap009_GetCbxProceso';
    const params = new HttpParams()
      .append("claveProceso", claveProceso);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 11
  async mdlCap009_GetCbxRutaProceso(): Promise<object> {
    const url = URL_PROGRAMACION + 'mdlCap009_GetCbxRutaProceso';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  // LEC OPC 13
  async fechaTurnoTrabajo(): Promise<object> {
    const url = URL_PROGRAMACION + 'fechaTurnoTrabajo';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  // LEC OPC 14
  async validaArt(claveArticulo: string, claveMaquina: string): Promise<object> {
    const url = URL_PROGRAMACION + 'validaArt';
    const params = new HttpParams()
      .append('claveArticulo', claveArticulo)
      .append('claveMaquina', claveMaquina);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 15
  async getOPProgramada(op: string, claveMaquina: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getOPProgramada';
    const params = new HttpParams()
      .append('op', op)
      .append('claveMaquina', claveMaquina);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 16
  async getJustificaciones(): Promise<object> {
    const url = URL_PROGRAMACION + 'getJustificaciones';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  // LEC OPC 17
  getValidaTodoCap005(obj: objProgramasCap005): Observable<any> {
    const url = URL_PROGRAMACION + 'getValidaTodoCap005';
    return this.http.post(url, obj);
  }
  // LEC OPC 18
  async getOPProgramada2(op: string, programa: number, cantidad: number): Promise<object> {
    const url = URL_PROGRAMACION + 'getOPProgramada2';
    const params = new HttpParams()
      .append('op', op)
      .append('programa', programa.toString())
      .append('cantidad', cantidad.toString());
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 19
  getValidaProgramaProcAutoCap005(obj: objProgramasCap005): Observable<any> {
    const url = URL_PROGRAMACION + 'getValidaProgramaProcAutoCap005';
    return this.http.post(url, obj);
  }
  // LEC OPC 20
  async validaJustificacionUsuario(): Promise<object> {
    const url = URL_PROGRAMACION + 'validaJustificacionUsuario';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  // LEC OPC 21
  async tieneProduccionTmpReal(progPosAct: string, progPosSig: string, fechaTrabajo: string, turnoTrabajo: number): Promise<object> {
    const url = URL_PROGRAMACION + 'tieneProduccionTmpReal';
    const params = new HttpParams()
      .append('progPosAct', progPosAct)
      .append('progPosSig', progPosSig)
      .append('fechaTrabajo', fechaTrabajo)
      .append('turnoTrabajo', turnoTrabajo.toString())
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 22
  cap001ValidaProgramaProcAuto(objProgramasCap001: objProgramasCap001): Observable<any> {
    const url = URL_PROGRAMACION + 'cap001ValidaProgramaProcAuto';
    return this.http.post(url, objProgramasCap001);
  }
  // LEC OPC 23
  // PENDIENTE
  cap009ProgramacionAutomatica(objCap009OP: parSPLecOpc23): Observable<any> {
    const url = URL_PROGRAMACION + 'cap009ProgramacionAutomatica';
    return this.http.post(url, objCap009OP);
  }
  // LEC OPC 28
  async getDatosCap016(tipo: string, claveMaquina: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getDatosCap016';
    const params = new HttpParams()
      .append("tipo", tipo)
      .append('claveMaquina', claveMaquina);
    return await this.http.get(url, {params}).toPromise();
  }
  // LEC OPC 29
  cap016ValidarTraspasoOps(objProgramasCap001: cap016ValidarTraspasoOps): Observable<any> {
    const url = URL_PROGRAMACION + 'cap016ValidarTraspasoOps';
    return this.http.post(url, objProgramasCap001);
  }
  // ACT OPC 03
  actualizarMaquina(obj: objProgramasCap005): Observable<any> {
    const url = URL_PROGRAMACION + 'actualizarMaquina';
    return this.http.post(url, obj);
  }
  // ACT OPC 04
  reordenarProgInmediatosPosteriores(objSPActOpc4: opc4p2): Observable<any> {
    const url = URL_PROGRAMACION + 'reordenarProgInmediatosPosteriores';
    return this.http.post(url, objSPActOpc4);
  }
  // ACT OPC 05
  cap004FijarFecha(objSPActOpc5: cap004FijarFecha): Observable<any> {
    const url = URL_PROGRAMACION + 'cap004FijarFecha';
    return this.http.post(url, objSPActOpc5);
  }
  // ACT OPC 06
  cap001EliminarOP(objSPActOpc6: objSPActOpc6): Observable<any> {
    const url = URL_PROGRAMACION + 'cap001EliminarOP';
    return this.http.post(url, objSPActOpc6);
  }
  // ACT OPC 07
  cap001TerminarPrograma1(objSPActOpc7: cap004FijarFecha): Observable<any> {
    const url = URL_PROGRAMACION + 'cap001TerminarPrograma1';
    return this.http.post(url, objSPActOpc7);
  }
  // ACT OPC 08
  cap001TerminarPrograma2(objSPActOpc8: spActOpc8): Observable<any> {
    const url = URL_PROGRAMACION + 'cap001TerminarPrograma2';
    return this.http.post(url, objSPActOpc8);
  }
  // ACT OPC 09
  suspenderOP(objSPActOpc9: cap001SuspenderOP): Observable<any> {
    const url = URL_PROGRAMACION + 'suspenderOP';
    return this.http.post(url, objSPActOpc9);
  }
  // ACT OPC 10
  cap016TraspasarProgramas(objSPActOpc10: spActOpc10): Observable<any> {
    const url = URL_PROGRAMACION + 'cap016TraspasarProgramas';
    return this.http.post(url, objSPActOpc10);
  }
  // // ACT OPC 04
  // async reordenarProgInmediatosPosteriores(programa: number): Promise<object> {
  //   const url = URL_PROGRAMACION + 'reordenarProgInmediatosPosteriores';
  //   const params = new HttpParams()
  //     .append('programa', programa.toString());
  //   return await this.http.get(url, {params}).toPromise();
  // }

  async getCanSigProCap(claveMaquina: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getCanSigProCap';
    const params = new HttpParams()
      .append("claveMaquina", claveMaquina);
    return await this.http.get(url, {params}).toPromise();
  }

  async tieneProduccionRealCapSF(progPosAct: string, progPosSig: string): Promise<object> {
    const url = URL_PROGRAMACION + 'tieneProduccionRealCapSF';
    const params = new HttpParams()
      .append('progPosAct', progPosAct)
      .append('progPosSig', progPosSig);
    return await this.http.get(url/*, {params}*/).toPromise();
  }
}
