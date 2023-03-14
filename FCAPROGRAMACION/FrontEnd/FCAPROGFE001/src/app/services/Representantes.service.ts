import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URL_REPRESENTANTES = environment.FCAVENTAPI001 + 'Representantes/';

@Injectable({
  providedIn: 'root',
})
export class RepresentantesService {
  constructor(public http: HttpClient) {}

  Agregar(Representantes: any): any {
    const url = URL_REPRESENTANTES + 'postAgregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Representantes, httpOptions);
  }
  Editar(Representantes: any): any {
    const url = URL_REPRESENTANTES + 'postEditar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Representantes, httpOptions);
  }
  Estatus(Representantes: any): any {
    const url = URL_REPRESENTANTES + 'postEstatus';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Representantes, httpOptions);
  }
  ListarRepresentantes(par: any, fil: any): any {
    const zona = fil.Zona === 'sel' || !fil.Zona ?  '' : fil.Zona;
    const url = URL_REPRESENTANTES + 'getRepresentantes';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('estatus', fil.Estatus)
      .append('zona', zona);
    return this.http.get(url, { params });
  }
  ListarEjecutivos(CodRepresentante: any): Observable<any> {
    const url = URL_REPRESENTANTES + 'getEjecutivos';
    const params = new HttpParams().append(
      'CodRepresentantes',
      CodRepresentante
    );
    return this.http.get(url, { params });
  }
  CorreoRepresentantesEjecutivos(par: any, fil: any): any {
    const zona = fil.Zona === 'sel' ?  '' : fil.Zona ;
    const url = URL_REPRESENTANTES + 'getCorreosRepresentatesEjecutivos';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('zona', zona);
    return this.http.get(url, { params });
  }
}
