import { Maquina } from 'src/app/models/maquina';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'DisponibilidadMaquina/';

@Injectable({
  providedIn: 'root',
})
export class DisponibilidadMaquinaService {
  constructor(public http: HttpClient) {}

  GetDisponibilidadMaquina( fil: any): any {
    const url = URL + 'GetDisponibilidadMaquina';
    const params = new HttpParams()
    .append('mes', fil.mes)
      .append('anio', fil.anio)
      .append('ClaveMaquina', fil.maquina);
    return this.http.get(url, { params });
  }
  GetValidarDisMaquina( fil: any): any {
    console.log(fil , 'GetValidarDisMaquina');
    const url = URL + 'GetValidarDisMaquina';
    const params = new HttpParams()
    .append('mes', fil.mesOrigen)
      .append('anio', fil.anioOrigen)
      .append('ClaveMaquina', fil.claveMaquinaOrigen)
      .append('ClaveMaquinaDestino', fil.claveMaquinaDestino);
    return this.http.get(url, { params });
  }
  Agregar(Datos: any): any {
    const url = URL + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Copiar(Datos: any): any {
    const url = URL + 'Copiar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Editar(Datos: any): any {
    const url = URL + 'Editar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Eliminar(Datos: any): any {
    const url = URL + 'Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
}
