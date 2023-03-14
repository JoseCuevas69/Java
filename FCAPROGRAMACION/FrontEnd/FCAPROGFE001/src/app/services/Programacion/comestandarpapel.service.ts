import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'ComEstandarPapel/';

@Injectable({
  providedIn: 'root'
})
export class ComestandarpapelService {

  constructor(public http: HttpClient) { }

  GetPermisosUsuarios(): any {
    const url = URL + 'GetAccesosUsuarios';
    return this.http.get(url);
  }

  GetResistencias(): any {
    const url = URL + 'GetResistencias';
    return this.http.get(url);
  }

  GetRutaProceso(): any {
    const url = URL + 'GetRutaProceso';
    return this.http.get(url);
  }

  GetProcesoEspecial(): any {
    const url = URL + 'GetProcesoEspecial';
    return this.http.get(url);
  }

  GetProceso(procesos: string): any {
    const url = URL + 'GetProceso';
    const params = new HttpParams()
    .append('procesos', procesos);
    return this.http.get(url, { params });
  }

  GetPapeles(): any {
    const url = URL + 'GetPapeles';
    return this.http.get(url);
  }

  GetClavePreparacion(): any {
    const url = URL + 'GetClavePreparacion';
    return this.http.get(url);
  }

  GetImpermeabilizado(): any {
    const url = URL + 'GetImpermeabilizado';
    return this.http.get(url);
  }

  GetInsumos(): any {
    const url = URL + 'GetInsumos';
    return this.http.get(url);
  }

  GetCombinacionEstandarPapel(par: any, fil: any): any {
    const url = URL + 'GetCombinacionEstandarPapel';
    const params = new HttpParams()
    .append('startRow', par.startRow)
    .append('endRow', par.endRow)
    .append('filtro', fil);
    return this.http.get(url, {params});
  }

  GetCalculoPesoM2(ClaveArticulo: string, Liner1: string, Corrugado1: string, Liner2: string, Corrugado2: string, Liner3: string, Corrugado3: string, Liner4: string, Resistencia: string, Flauta: string): any {
    const url = URL + 'GetCalculoPesoM2';
    const params = new HttpParams()
    .append('claveArticulo', ClaveArticulo)
    .append('liner1', Liner1)
    .append('corrugado1', Corrugado1)
    .append('liner2', Liner2)
    .append('corrugado2', Corrugado2)
    .append('liner3', Liner3)
    .append('corrugado3', Corrugado3)
    .append('liner4', Liner4)
    .append('resistencia', Resistencia)
    .append('flauta', Flauta);
    return this.http.get(url, { params });
  }

  GetArticulos(par: any, fil: any): any {
    const url = URL + 'GetArticulos';
    const params = new HttpParams()
    .append('startRow', par.startRow)
    .append('endRow', par.endRow)
    .append('filtro', fil);
    return this.http.get(url, {params});
  }

  Agregar(Datos: any): any {
    const url = URL + 'Agregar';
    return this.http.post(url, Datos);
  }

  Actualizar(Datos: any): any {
    const url = URL + 'Actualizar';
    return this.http.post(url, Datos);
  }

  Eliminar(claveArticulo: string): any {
    const url = URL + 'Eliminar';
    return this.http.post(url, claveArticulo);
  }

  GetArticulosPorResistencia(par: any, fil: any): any {
    const url = URL + 'GetArticulosPorResistencia';
    const params = new HttpParams()
    .append('startRow', par.startRow)
    .append('endRow', par.endRow)
    .append('resistencia', fil);
    return this.http.get(url, {params});
  }

  GuardarPorResistencia(Datos: any): any {
    const url = URL + 'GuardarCombinacionPorResistencia';
    return this.http.post(url, Datos);
  }

  GuardarEspecificaciones(Datos: any): any {
    const url = URL + 'GuardarEspecificaciones';
    return this.http.post(url, Datos);
  }
}
