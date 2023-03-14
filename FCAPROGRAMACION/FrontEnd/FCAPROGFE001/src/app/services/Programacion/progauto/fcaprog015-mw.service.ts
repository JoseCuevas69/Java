import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { clsConfiguracion, filtros, listCPLDAT009TD_002, ResData, Variaciones }
from '../../../models/Programacion/progauto/FCAPROG015MWModel';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'FCAPROG015MW/';

@Injectable({
  providedIn: 'root'
})
export class FCAPROG015MWService {

  constructor(public http: HttpClient) { }

  ObtenerVersion(): string {
    return environment.VERSIONCPLCAP005;
  }

  async ObtenerResistencias(): Promise<object> {
    const url = URL_PROGRAMACION + 'getResistencias';
    //const params = new HttpParams();
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  async ObtenerAnchosUsar(obj: filtros): Promise<object> {
    const url = URL_PROGRAMACION + 'getAnchosUsar';
    const params = new HttpParams()
      .append("usar", obj.usar.toString());
    return await this.http.get(url, {params}).toPromise();
  }

  // VARIACIONES
  async ObtenerVariaciones(): Promise<object> {
    const url = URL_PROGRAMACION + 'getVariaciones';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  actualizarVariaciones(obj: Array<Variaciones>): Observable<any> {
    const url = URL_PROGRAMACION + 'actualizarVariaciones';
    return this.http.post(url, obj);
  }

  async EjecutarCalcularProgramas(cuchillas: string): Promise<any> {
    const url = URL_PROGRAMACION + 'procCalcularProgramas';
    const params = new HttpParams()
      .append("cuchillas", cuchillas);
    return await this.http.get(url, {params}).toPromise();
  }

  cancelarOpsCalcularProgramas(obj: Array<ResData>): Observable<any> {
    const url = URL_PROGRAMACION + 'cancelarOpsCalcularProgramas';
    return this.http.post(url, obj);
  }

  actualizarScorPrincipal(obj: ResData): Observable<any> {
    const url = URL_PROGRAMACION + 'actualizarScorPrincipal';
    return this.http.post(url, obj);
  }

  async procValidarArreglos(pArreglo: any): Promise<any> {
    const url = URL_PROGRAMACION + 'procValidarArreglos';
    const params = new HttpParams()
      .append("pArreglo", pArreglo.toString());
    return await this.http.get(url, {params}).toPromise();
  }

  procValidarPresentacionPintado(obj: listCPLDAT009TD_002): Observable<any> {
    const url = URL_PROGRAMACION + 'procValidarPresentacionPintado';
    return this.http.post(url, obj);
  }

  async getConfiguracion(): Promise<object> {
    const url = URL_PROGRAMACION + 'getConfiguracion';
    return await this.http.get(url).toPromise();
  }

  actualizarConfiguracion(obj: clsConfiguracion): Observable<any> {
    const url = URL_PROGRAMACION + 'actualizarConfiguracion';
    return this.http.post(url, obj);
  }

  // CerrarSession
  CerrarSession(obj: clsConfiguracion): Observable<any> {
    const url = URL_PROGRAMACION + 'cerrarSession';
    return this.http.post(url, obj);
  }
}
