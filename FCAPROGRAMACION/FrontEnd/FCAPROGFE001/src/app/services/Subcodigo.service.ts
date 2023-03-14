import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL_SUBCODIGO = environment.FCAVENTAPI001 + 'Subcodigo/';
const URL_TIPOINDUSTRIA = environment.FCAVENTAPI001 + 'TipoIndustria/';

@Injectable({
  providedIn: 'root',
})
export class SubCodigoService {
  constructor(public http: HttpClient) {}

  Agregar(Subcodigo: any): any {
    const url = URL_SUBCODIGO + 'postAgregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Subcodigo, httpOptions);
  }
  Editar(Subcodigo: any): any {
    const url = URL_SUBCODIGO + 'postEditar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Subcodigo, httpOptions);
  }
  Eliminar(Subcodigo: any): any {
    const url = URL_SUBCODIGO + 'postEliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Subcodigo, httpOptions);
  }
  ListarSubcodigo(par: any, fil: any): any {
    let CodTipoIndustria =
      fil.CodTipoIndustria === 'sel' ? '' : fil.CodTipoIndustria;
    const url = URL_SUBCODIGO + 'getSubcodigo';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('CodTipoIndustria', CodTipoIndustria);
    return this.http.get(url, { params });
  }
  ListarTipoIndustria(): any {
    const url = URL_TIPOINDUSTRIA + 'getTipoIndustria';
    return this.http.get(url);
  }
}
