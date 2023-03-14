import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { listaDatos } from '../../../models/Programacion/progauto/FCAPROG012MWModel';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'FCAPROG012MW/';

@Injectable({
  providedIn: 'root'
})
export class FCAPROG012MWService {

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
