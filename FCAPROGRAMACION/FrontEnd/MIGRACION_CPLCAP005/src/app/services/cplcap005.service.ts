import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { clsConfiguracion, filtros, listCPLDAT009TD_002, ResData } from 'src/app/models/common/cplcap005';
import { Observable } from 'rxjs';

import { Variaciones } from '../models/common/Variaciones';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'CPLCAP005/';

@Injectable({
  providedIn: 'root'
})
export class Cplcap005Service {

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


  // async ObtenerParametros(): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getParametros';
  //   //const params = new HttpParams();
  //   return await this.http.get(url/*, {params}*/).toPromise();
  // }

  // async ObtenerDatosOps(): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getDatosOps';
  //   //const params = new HttpParams();
  //   return await this.http.get(url/*, {params}*/).toPromise();
  // }

  // async ObtenerArreglosPosibles(obj: filtros): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getArreglosPosibles';
  //   const params = new HttpParams()
  //     .append("puntos", obj.puntosMax.toString());
  //   return await this.http.get(url, {params}).toPromise();
  // }

  // async ObtenerOpAnalizando(obj: filtros): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getOpAnalizando';
  //   const params = new HttpParams()
  //     .append("op", obj.ordenProduccion);
  //   return await this.http.get(url, {params}).toPromise();
  // }

  // async ObtenerPuntosMaxArreglosPosibles(): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getPuntosMaxArreglosPosibles';
  //   //const params = new HttpParams();
  //   return await this.http.get(url/*, {params}*/).toPromise();
  // }

  // async ObtenerAnchoSTD(obj: filtros): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getAnchoSTD';
  //   const params = new HttpParams()
  //     .append("zona", obj.zona)
  //     .append("op", obj.ordenProduccion);
  //   return await this.http.get(url, {params}).toPromise();
  // }

  // async ObtenerHojasProgramadas(obj: filtros): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getHojasProgramadas';
  //   const params = new HttpParams()
  //     .append("op", obj.ordenProduccion);
  //   return await this.http.get(url, {params}).toPromise();
  // }

  // async ObtenerListadoPrincipal(): Promise<object> {
  //   const url = URL_PROGRAMACION + 'getDatosPrincipal';
  //   //const params = new HttpParams();
  //   return await this.http.get(url/*, {params}*/).toPromise();
  // }
}
