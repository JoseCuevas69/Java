import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { CPLCAP009Entity, listaDatosPrincipal }
from '../../../models/Programacion/progauto/FCAPROG016MWModel';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'FCAPROG016MW/';

@Injectable({
  providedIn: 'root'
})
export class FCAPROG016MWService {

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
}
