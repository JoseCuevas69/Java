import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CPLCAP009Entity, listaDatos, listaDatosPrincipal } from '../models/common/cplcap009';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'CPLCAP009/';

@Injectable({
  providedIn: 'root'
})
export class Cplcap009Service {

  constructor(public http: HttpClient) { }

  async ObtenerDatosPrincipal(): Promise<object> {
    const url = URL_PROGRAMACION + 'getDatosPrincipal';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  agregarOP(obj: CPLCAP009Entity): Observable<any> {
    const url = URL_PROGRAMACION + 'agregarOP';
    // const params = new HttpParams();
    return this.http.post(url, obj);
  }

  ValidaVariacion(datos: listaDatosPrincipal): Observable<any> {
    const url = URL_PROGRAMACION + 'validaVariacion';
    // const params = new HttpParams();
    return this.http.post(url, datos);
  }

  ValidaHojasFaltan(datos: listaDatosPrincipal): Observable<any> {
    const url = URL_PROGRAMACION + 'validaHojasFaltan';
    // const params = new HttpParams();
    return this.http.post(url, datos);
  }

  AplicarCambios(datos: listaDatosPrincipal): Observable<any> {
    const url = URL_PROGRAMACION + 'aplicarCambios';
    // const params = new HttpParams();
    return this.http.post(url, datos);
  }

  // async agregarOP(op: string): Promise<object> {
  //   const url = URL_PROGRAMACION + 'agregarOP';
  //   const params = new HttpParams()
  //     .append('op', op);
  //   return await this.http.get(url, {params}).toPromise();
  // }
}
