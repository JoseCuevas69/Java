import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paros } from '../models/paros';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const URL_PAROS = environment.FCAPROGAPI002 + 'Paros/';

@Injectable({
  providedIn: 'root'
})

export class ParomaquinaserviceService {

  constructor(private http: HttpClient) { }

  /// Metodo de consultas
  /// GET: /Paros/getMaquinas
  getMaquinas(partipoMaquina: string) 
  {
    const url = `${URL_PAROS}getMaquinas?tipoMaquina=${partipoMaquina}` ;
    return this.http.get(url);
  }

  /// Metodo de consultas
  /// GET: /Paros/getMaquinas
  getParos(TipoMaquina: string , TipoTiempo: string ,  ClaveMaquina: string, Fecha: string) 
  {
    const url = `${URL_PAROS}GetParos?tipoMaquina=${TipoMaquina}&TipoTiempo=${TipoTiempo}&ClaveMaquina=${ClaveMaquina}&Fecha=${Fecha}` ;
    return this.http.get(url);
  }

  listarParos(par: any, fil: any): any {
    const url = URL_PAROS + 'GetParos';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('TipoMaquina', fil.TipoMaquina)
      .append('TipoTiempo', fil.TipoTiempo)
      .append('ClaveMaquina', fil.ClaveMaquina)
      .append('Fecha', fil.Fecha);
    return this.http.get(url, {params});
  }

  Agregar(parParo: any): any {
    const url = URL_PAROS + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parParo, httpOptions);
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
  

  /*
    /// Metodo para Agregar Catalogo de Paros
    /// GET: /Paros/Agregar
    funAgregar(parParo: Paros){
      return this.http.post(URL_PAROS + 'Agregar', parParo);
    }

    /// Metodo para Modificar  Catalogo de Paros
    /// GET: /Paros/Modificar
    funModificar(parParo: Paros){
      return this.http.post(URL_PAROS + 'Modificar', parParo);
    }

    /// Metodo para Modificar  Catalogo de Paros
    /// GET: /Paros/Modificar
    funEliminar(parParo: Paros){
      return this.http.post(URL_PAROS + 'Eliminar', parParo);
    }
*/
}
