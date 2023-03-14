import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const URL = environment.FCAPROGAPI001 + 'ReporteArtMedidas/';

@Injectable({
  providedIn: 'root',
})
export class ReporteartmedidasService {
  constructor(public http: HttpClient) {}


  GetDataTipoIndustria(): any {
    const url = URL + 'GetDataTipoIndustria';
    return this.http.get(url);
  }

  // para grid cs (sin paginado) , uso post para pasarle el modelo.
  GetDataArticulosMaster(Datos: any): any {
    const url = URL + 'GetDataArticulosMaster';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

  

  //  // para grid cs (sin paginado)
  //  GetDataArticulosMaster(Datos: any): any {
  //   const url = URL + 'GetDataArticulosMaster';
  //   const params = new HttpParams()
  //   .append('TipoDeConsulta', Datos.TipoDeConsulta)
  //   .append('AnchoMin', Datos.AnchoMin)
  //   .append('AnchoMax', Datos.AnchoMax)
  //   .append('startRow', Datos.LargoMin)
  //   .append('LargoMax', Datos.LargoMax)
  //   .append('TipoIndustria', Datos.TipoIndustria)
  //   .append('FechaIni', Datos.FechaIni)
  //   .append('FechaFin', Datos.FechaFin)
  //   .append('OrderBy', Datos.OrderBy)
 
  //   return this.http.get(url, {params});
  // }

  // para grid ss (con paginado)
  // GetDataArticulosMaster(par: any, fil: any): any {
  //   const url = URL + 'GetDataArticulosMaster';
  //   const params = new HttpParams()
  //     .append('startRow', par.startRow)
  //     .append('endRow', par.endRow)
  //     .append('filtro', fil.filtro);

  //   return this.http.get(url, { params });


  // }

  InsertData(Datos: any): any {
    const url = URL + 'InsertDataTipoIndustria';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

    // GetData(par: any, fil: any): any {
  //   const url = URL + 'GetDataTipoIndustria';
  //   const params = new HttpParams()
  //     .append('startRow', par.startRow)
  //     .append('endRow', par.endRow)
  //     .append('filtro', fil.filtro);

  //   return this.http.get(url, { params });


  // }

}