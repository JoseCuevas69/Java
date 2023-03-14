/*import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paros } from '../models/paros';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
*/

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


//const URL_PAROS = environment.FCAPROGAPI002 + 'Paros/';
const URL_PAROS = environment.FCAPROGAPI002 + 'Paros/';

@Injectable({
  providedIn: 'root'
})

export class ParomaquinaserviceService {

  constructor(private http: HttpClient) { }

  getMaquinas(partipoMaquina: string) 
  {
    const url = `${URL_PAROS}getMaquinas?tipoMaquina=${partipoMaquina}` ;
    return this.http.get(url);
  }

  getParos(TipoMaquina: string , TipoTiempo: string ,  ClaveMaquina: string, Fecha: string) 
  {
    const url = `${URL_PAROS}getParos?tipoMaquina=${TipoMaquina}&TipoTiempo=${TipoTiempo}&ClaveMaquina=${ClaveMaquina}&Fecha=${Fecha}` ;
    return this.http.get(url);
  }

  listarParos(par: any, fil: any): any {
    const url = URL_PAROS + 'getParos';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('TipoMaquina', fil.TipoMaquina)
      .append('TipoTiempo', fil.TipoTiempo)
      .append('ClaveMaquina', fil.ClaveMaquina)
      .append('Fecha', fil.Fecha);
    return this.http.get(url, {params});
  }

  Agregar(Datos: any): any {
    const url = URL_PAROS + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }


  Editar(parParo: any): any {
    const url = URL_PAROS + 'Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parParo, httpOptions);
  }
  Eliminar(parParo: any): any {
    const url = URL_PAROS + 'Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parParo, httpOptions);
  }
  
}
