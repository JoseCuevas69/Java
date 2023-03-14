import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'AprovechamientoLamina/';

@Injectable({
  providedIn: 'root',
})
export class AprovechamientoLaminaService {
  constructor(public http: HttpClient) {}

  GetDatosOp(fil: any): any {
    const url = URL + 'GetDatosOp';
    const params = new HttpParams()
      .append('Op', fil);
    return this.http.get(url, { params });
  }
  // Agregar(Datos: any): any {
  //   const url = URL + 'Agregar';
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.post(url, Datos, httpOptions);
  // }
  // Editar(Datos: any): any {
  //   const url = URL + 'Editar';
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.post(url, Datos, httpOptions);
  // }
  // Eliminar(Datos: any): any {
  //   const url = URL + 'Eliminar';
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.post(url, Datos, httpOptions);
  // }
}
