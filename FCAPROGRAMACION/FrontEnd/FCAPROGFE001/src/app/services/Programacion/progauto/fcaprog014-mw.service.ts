import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { DatosComboCPLCAP003, ParametrosCPLCAP003 } from '../../../models/Programacion/progauto/FCAPROG014MWModel';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'FCAPROG014MW/';

@Injectable({
  providedIn: 'root'
})
export class FCAPROG014MWService {

  constructor(public http: HttpClient) { }

  async ObtenerDatos(): Promise<object> {
    const url = URL_PROGRAMACION + 'getDatos';
    //const params = new HttpParams();
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  async ObtenerComboModificar(): Promise<object> {
    const url = URL_PROGRAMACION + 'getComboModificar';
    //const params = new HttpParams();
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  actualizarTabla(obj: ParametrosCPLCAP003): Observable<any> {
    const url = URL_PROGRAMACION + 'actualizarTabla';
    return this.http.post(url, obj);
  }

  registrar(obj: DatosComboCPLCAP003): Observable<any> {
    const url = URL_PROGRAMACION + 'registrar';
    return this.http.post(url, obj);
  }

  modificar(obj: DatosComboCPLCAP003): Observable<any> {
    const url = URL_PROGRAMACION + 'modificar';
    return this.http.post(url, obj);
  }

  eliminar(obj: DatosComboCPLCAP003): Observable<any> {
    const url = URL_PROGRAMACION + 'eliminar';
    return this.http.post(url, obj);
  }
}
