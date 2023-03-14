import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI001 + 'TipoCaja/';

@Injectable({
  providedIn: 'root',
})
export class TipoCajaService {
  constructor(public http: HttpClient) {}

  GetTipoCaja(par: any, fil: any): any {
    const url = URL + 'getTipoCaja';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro);
    return this.http.get(url, { params });
  }
  Agregar(Datos: any): any {
    const url = URL + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Editar(Datos: any): any {
    const url = URL + 'Editar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Eliminar(Datos: any): any {
    const url = URL + 'Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
}
