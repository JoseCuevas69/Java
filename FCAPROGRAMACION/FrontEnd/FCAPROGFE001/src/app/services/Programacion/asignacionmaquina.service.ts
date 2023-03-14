import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsginacionMaquina } from 'src/app/models/Programacion/AsginacionMaquina';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'AsignacionMaquina/';

@Injectable({
  providedIn: 'root'
})
export class AsignacionmaquinaService {

  constructor(public http: HttpClient) { }

  GetMaquinas(): any {
    const url = URL + 'GetMaquinas';
    return this.http.get(url);
  }

  GetRutas(): any {
    const url = URL + 'GetRutas';
    return this.http.get(url);
  }

  GetProcesosRelacionados(claveArticulo: string): any{
    const url = URL + 'GetProcesosRelacionados';
    const params = new HttpParams()
    .append('ClaveArticulo', claveArticulo);
    return this.http.get(url, { params });
  }

  GetAsginacionMaquina(claveArticulo: string): any{
    const url = URL + 'GetAsginacionMaquina';
    const params = new HttpParams()
    .append('ClaveArticulo', claveArticulo);
    return this.http.get(url, { params });
  }

  GetArticulosPorProceso(par: any, Proceso: string, Articulo?: string): any{
    const url = URL + 'GetArticulosPorProceso';
    const params = new HttpParams()
    .append('startRow', par.startRow)
    .append('endRow', par.endRow)
    .append('proceso', Proceso)
    .append('filtro', Articulo);
    return this.http.get(url, { params });
  }

  GuardarProceso(Datos: Array<AsginacionMaquina>): Observable <any> {
    const url = URL + 'GuardarProcesoMaquina';
    return this.http.post(url, Datos);
  }

  ActualizarProceso(Datos: Array<AsginacionMaquina>): Observable <any> {
    const url = URL + 'ActualizarProcesoMaquina';
    return this.http.post(url, Datos);
  }
}
