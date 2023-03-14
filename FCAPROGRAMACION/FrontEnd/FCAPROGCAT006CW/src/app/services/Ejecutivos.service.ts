import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL_EJECUTIVO = environment.FCAVENTAPI001 + 'Ejecutivos/';

@Injectable({
  providedIn: 'root',
})
export class EjecutivosService {
  constructor(public http: HttpClient) {}

  Agregar(Ejecutivo: any): any {
    const url = URL_EJECUTIVO + 'postAgregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Ejecutivo, httpOptions);
  }
  Editar(Ejecutivo: any): any {
    const url = URL_EJECUTIVO + 'postEditar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Ejecutivo, httpOptions);
  }
  Estatus(Ejecutivo: any): any {
    const url = URL_EJECUTIVO + 'postEstatus';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Ejecutivo, httpOptions);
  }
  ListarEjecutivo(par: any, fil: any): any {
    const url = URL_EJECUTIVO + 'getEjecutivo';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('estatus', fil.Estatus);
    return this.http.get(url, { params });
  }
  ValidarUsuarioEjecutivo(IdUsuario: any): any {
    const url = URL_EJECUTIVO + 'getValidarUsuarioEjecutivo';
    const params = new HttpParams()
      .append('IdUsuario', IdUsuario);
    return this.http.get(url, { params });
  }
}
