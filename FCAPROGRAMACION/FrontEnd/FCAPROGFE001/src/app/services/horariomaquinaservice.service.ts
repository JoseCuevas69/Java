import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Horariomaquina } from '../models/horariomaquina';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const URL_HORARIOMAQUINA = environment.FCAPROGAPI002 + 'Horario/';

@Injectable({
  providedIn: 'root'
})
export class HorariomaquinaserviceService {

  constructor(private http: HttpClient) { }

  getMaquinas(partipoMaquina: string) 
  {
    const url = `${URL_HORARIOMAQUINA}getMaquinas` ;
    return this.http.get(url);
  }

  getHorario(ClaveMaquina: string) 
  {
    const url = `${URL_HORARIOMAQUINA}getHorario?ClaveMaquina=${ClaveMaquina}` ;
    return this.http.get(url);
  }

  listargetHorario(par: any, fil: any): any {
    const url = URL_HORARIOMAQUINA + 'getHorario';
   
    const params = new HttpParams()
      .append('ClaveMaquina', fil.ClaveMaquina);
    return this.http.get(url, {params});
  }

  Agregar(Datos: any): any {
    const url = URL_HORARIOMAQUINA + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }


  Editar(parParo: any): any {
    const url = URL_HORARIOMAQUINA + 'Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parParo, httpOptions);
  }

}
