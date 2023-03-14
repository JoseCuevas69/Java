import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'ProgramaImpresorasDinamico/';

@Injectable({
  providedIn: 'root',
})
export class ProgramaImpresorasDinamicoService {
  constructor(public http: HttpClient) {}

  GetCatMaquinas(): any {
    const url = URL + 'GetCatMaquinas';
    return this.http.get(url);
  }

  GetOPsProgramarImpresoras(params: any): any {
    const url = URL + 'GetOPsProgramarImpresoras';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  GetOPsOtrosDatos(filtro): any {
    const url = URL + 'GetOPsOtrosDatos';
    const params = new HttpParams().append('Op', filtro);
    return this.http.get(url, { params });
  }
  GetValidarArticulo(filtro): any {
    const url = URL + 'GetValidarArticulo';
    const params = new HttpParams().append('Op', filtro);
    return this.http.get(url, { params });
  }
  GetRutaProcMaquinas(filtro): any {
    const url = URL + 'GetRutaProcMaquinas';
    const params = new HttpParams().append('ClaveProceso', filtro);
    return this.http.get(url, { params });
  }
  GetMaquinaEstablecida(ClaveArticulo, NumProceso): any {
    const url = URL + 'GetMaquinaEstablecida';
    const params = new HttpParams().append('ClaveArticulo', ClaveArticulo)
    .append('NumProceso', NumProceso);
    return this.http.get(url, { params });
  }
  GetProgHisFabricacion(params: any): any {
    const url = URL + 'GetProgHisFabricacion';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  GetBalanceMaquinas(params: any): any {
    const url = URL + 'GetBalanceMaquinas';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  GetVelicidad(params: any): any {
    const url = URL + 'GetVelocidad';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  AgregarProgImpDinamico(params: any): any {
    const url = URL + 'AgregarProgImpDinamico';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
}
