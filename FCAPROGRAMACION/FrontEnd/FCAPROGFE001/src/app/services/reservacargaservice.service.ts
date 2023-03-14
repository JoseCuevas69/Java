//import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { Paros } from '../models/paros';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const URL_RESERVAS = environment.FCAPROGAPI002 + 'ReservaCarga/';

@Injectable({
  providedIn: 'root'
})
export class ReservacargaserviceService {

  constructor(private http: HttpClient) { }

  /*
  getMaquinas(partipoMaquina: string) 
  {
    const url = `${URL_PAROS}getMaquinas?tipoMaquina=${partipoMaquina}` ;
    return this.http.get(url);
  }

  getParos(TipoMaquina: string , TipoTiempo: string ,  ClaveMaquina: string, Fecha: string) 
  {
    const url = `${URL_PAROS}GetParos?tipoMaquina=${TipoMaquina}&TipoTiempo=${TipoTiempo}&ClaveMaquina=${ClaveMaquina}&Fecha=${Fecha}` ;
    return this.http.get(url);
  }*/

  listarReservas(par: any, fil: any): any {
    const url = URL_RESERVAS + 'GetReservas';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('parZona', fil.Zona)
    return this.http.get(url, {params});
  }

  Agregar(Datos: any): any {
    const url = URL_RESERVAS + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }


  Editar(parParo: any): any {
    const url = URL_RESERVAS + 'Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parParo, httpOptions);
  }
  Eliminar(parParo: any): any {
    const url = URL_RESERVAS + 'Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parParo, httpOptions);
  }

}
