import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { listaDatos } from '../models/common/cplcap001';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'CPLCAP001/';

@Injectable({
  providedIn: 'root'
})
export class Cplcap001Service {

  constructor(public http: HttpClient) { }

  async CargaInfo02(): Promise<object> {
    const url = URL_PROGRAMACION + 'cargaInfo02';
    //const params = new HttpParams();
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  registrar(obj: listaDatos): Observable<any> {
    const url = URL_PROGRAMACION + 'registrar';
    return this.http.post(url, obj);
  }
}
