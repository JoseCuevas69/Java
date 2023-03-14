import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI001 + 'Desperdicios/';

@Injectable({
  providedIn: 'root',
})
export class DesperdiciosService {
  constructor(public http: HttpClient) {}

  GetDesperdicios(par: any, fil: any): any {
    const url = URL + 'getDesperdicios';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('DescripcionDesperdicio', fil.Desperdicio)
      .append('AplicaImpresora', fil.aplicaImpresora)
      .append('AplicaCorrugadora', fil.aplicaCorrugadora)
      .append('AplicaAcabado', fil.aplicaAcabados)
      .append('AplicaRecuperacionCaja', fil.aplicaRecuperacionCaja);
    return this.http.get(url, { params });
  }
  GetConfigAreaDesperdicios(fil: any): any {
    const url = URL + 'getConfigAreaDesperdicios';
    const params = new HttpParams()
      .append('ClaveDesperdicio', fil.ClaveDesperdicio);
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
  GetAreaDesperdicios(par: any, fil: any): any {
    const url = URL + 'getAreaDesperdicios';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('Desperdicio', fil.Desperdicio)
    return this.http.get(url, { params });
  }
  AgregarAreaDesperdicios(Datos: any): any {
    const url = URL + 'AgregarAreaDesperdicios';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  EditarAreaDesperdicios(Datos: any): any {
    const url = URL + 'EditarAreaDesperdicios';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  EliminarAreaDesperdicios(Datos: any): any {
    const url = URL + 'EliminarAreaDesperdicios';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
}
