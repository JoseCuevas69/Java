import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'MedidasHoja/';

@Injectable({
  providedIn: 'root',
})
export class MedidasHojaService {
  constructor(public http: HttpClient) {}

  GetTipoCaja( fil: any): any {
    const url = URL + 'GetDatArticulo';
    const params = new HttpParams()
      .append('claveArticulo', fil.filtro);
    return this.http.get(url, { params });
  }
  Agregar(Datos: any): any {
    const url = URL + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
}
