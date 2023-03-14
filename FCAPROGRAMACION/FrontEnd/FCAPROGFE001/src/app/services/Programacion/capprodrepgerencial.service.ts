import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.FCAPROGAPI001 + 'capprodrepgerencial/';

@Injectable({
  providedIn: 'root',
})
export class CapProdRepGerencialService {
  constructor(public http: HttpClient) {}

  GetData(par: any, fil: any): any {
    const url = URL + 'GetCargaMaquinas';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro);

    return this.http.get(url, { params });


  }

  InsertData(Datos: any): any {
    const url = URL + 'InsertCargaMaquinas';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

}
