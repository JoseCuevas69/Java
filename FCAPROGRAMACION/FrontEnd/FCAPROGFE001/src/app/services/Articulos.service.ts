import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Articulo} from 'src/app/models/Articulo';
import { environment } from 'src/environments/environment';

const URL_ARTICULOS = environment.FCAVENTAPI001 + 'Articulos/';


@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  constructor(public http: HttpClient) {}

  Agregar(Datos: Articulo): any {
    const url = URL_ARTICULOS + 'postAgregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Editar(Datos: Articulo): any {
    const url = URL_ARTICULOS + 'postEditar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Eliminar(Datos: Articulo): any {
    const url = URL_ARTICULOS + 'postEliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Relacion(Datos: any): any {
    const url = URL_ARTICULOS + 'postRelacion';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Suspendido(Datos: Articulo): any {
    const url = URL_ARTICULOS + 'postSuspendido';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  ListarArticulos(par: any, fil: any): any {
    const url = URL_ARTICULOS + 'getArticulos';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('idCliente', fil.idCliente)
      .append('TipoProducto', fil.TipoProducto)
      .append('Resistencia', fil.Resistencia)
      .append('Suaje', fil.Suaje)
      .append('Generico', fil.generico)
      .append('sinBackFrom', fil.sinBackFrom)
      .append('Suspendido', fil.Suspendido)
      .append('Estatus', fil.Estatus)
      .append('ComponentePrin', fil.ComponentePrin);
    return this.http.get(url, { params });
  }
  ConsecutivoClaveArticulo(idCliente): any {
    const url = URL_ARTICULOS + 'getConsecutivoClaveArticulo';
    const params = new HttpParams()
    .append('idCliente', idCliente);
    return this.http.get(url, { params });
  }
  ClienteDefault(): any {
    const url = URL_ARTICULOS + 'getClienteDefault';
    return this.http.get(url);
  }
  ListaTipoPapel(ClaveArticulo): any {
    const url = URL_ARTICULOS + 'getTipoPapel';
    const params = new HttpParams()
    .append('ClaveArticulo', ClaveArticulo);
    return this.http.get(url, { params });
  }
  CalculosSuajes66(IDSuaje: any): any {
    const url = URL_ARTICULOS + 'getValidarSuaje66';
    const params = new HttpParams()
      .append('IDSuaje', IDSuaje);
    return this.http.get(url, { params });
  }
  CalculosSuajes50(IDSuaje: any): any {
    const url = URL_ARTICULOS + 'getValidarSuaje50';
    const params = new HttpParams()
      .append('IDSuaje', IDSuaje);
    return this.http.get(url, { params });
  }
  ConfigDesperdicio(TipoCaja: any, Flauta: any): any {
    const url = URL_ARTICULOS + 'getConfigDesperdicio';
    const params = new HttpParams()
      .append('TipoCaja', TipoCaja)
      .append('Flauta', Flauta);
    return this.http.get(url, { params });
  }
  ValidarSuaje50Valido(IDSuaje: any): any {
    const url = URL_ARTICULOS + 'getValidarSuaje50Valido';
    const params = new HttpParams()
      .append('IDSuaje', IDSuaje);
    return this.http.get(url, { params });
  }
  ValidarSuaje66Valido(IDSuaje: any): any {
    const url = URL_ARTICULOS + 'getValidarSuaje66Valido';
    const params = new HttpParams()
      .append('IDSuaje', IDSuaje);
    return this.http.get(url, { params });
  }
  ValidarColor(ClavePreparacion: any): any {
    const url = URL_ARTICULOS + 'getValidaColor';
    const params = new HttpParams()
      .append('ClavePreparacion', ClavePreparacion);
    return this.http.get(url, { params });
  }
  Etiqueta(ClaveArticulo: any): any {
    const url = URL_ARTICULOS + 'getEtiqueta';
    const params = new HttpParams()
      .append('ClaveArticulo', ClaveArticulo);
    return this.http.get(url, { params });
  }
  ListaRelacion(ClaveArticulo: any): any {
    const url = URL_ARTICULOS + 'getListaRelacion';
    const params = new HttpParams()
      .append('ClaveArticulo', ClaveArticulo);
    return this.http.get(url, { params });
  }
  async PreciosArticulos(ListaArticulos: any): Promise<object> {
    const url = URL_ARTICULOS + 'PreciosArticulos';
    const params = new HttpParams().append('ListaArticulos', ListaArticulos);

    const Data = await this.http.get(url, { params }).toPromise();
    return Data;
  }

}
