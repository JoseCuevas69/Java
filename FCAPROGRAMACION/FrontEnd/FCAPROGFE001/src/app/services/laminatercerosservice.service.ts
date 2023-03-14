import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


const URL_Laminaterceros = environment.FCAPROGAPI002 + 'LaminaTerceros/';

@Injectable({
  providedIn: 'root'
})
export class LaminatercerosserviceService {

  constructor(private http: HttpClient) { }

  getObtieneAlmacenes() 
  {
    const url = `${URL_Laminaterceros}ObtieneAlmacenes`;
    return this.http.get(url);
  }

  getDatosTraspasoOrigen(parLamTerFiltros: any): any {
    const url = URL_Laminaterceros + 'DatosTraspasoOrigen';
    const params = new HttpParams()
    .append('parOriAlmacen', parLamTerFiltros.orialmacen)
    .append('parOriOP', parLamTerFiltros.oriop)
  return this.http.get(url, {params});
  }

  getDatosTraspasoDestino(parLamTerFiltros: any): any {
    const url = URL_Laminaterceros + 'DatosTraspasoDestino';
    const params = new HttpParams()
    .append('parOriAlmacen', parLamTerFiltros.orialmacen)
    .append('parOriOP', parLamTerFiltros.oriop)
    return this.http.get(url, {params});
  }

  getValidarDatos(parLamTerFiltros: any): any {
    const url = URL_Laminaterceros + 'ValidarDatos';
    return this.http.get(url, parLamTerFiltros);
  }

  AplicarPreEntrada(parLamTerMovimiento: any): any {
    const url = URL_Laminaterceros + 'AplicarPreEntrada';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parLamTerMovimiento, httpOptions);
  }

  AlmacenesOrigen() 
  {
    const url = `${URL_Laminaterceros}AlmacenesOrigen`;
    return this.http.get(url);
  }

  AlmacenesDestino() 
  {
    const url = `${URL_Laminaterceros}AlmacenesDestino`;
    return this.http.get(url);
  }

  AplicarTraspaso(parLamTerMovimiento: any): any {
    const url = URL_Laminaterceros + 'AplicarTraspaso';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parLamTerMovimiento, httpOptions);
  }



}
