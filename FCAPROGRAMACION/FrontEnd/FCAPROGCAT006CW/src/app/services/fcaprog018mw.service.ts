import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { actualiza, modifica, objGuardar, programasSeleccionadosL } from '../models/DTO/fcaprog018mw';

const URL_PROGRAMACION = environment.FCAPROGAPI001 + 'FCAPROG018MW/';

@Injectable({
  providedIn: 'root'
})
export class Fcaprog018mwService {

  constructor(public http: HttpClient) { }

  async leeHoraLocal(): Promise<object> {
    const url = URL_PROGRAMACION + 'leeHoraLocal';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  async ObtieneDesperdicio():Promise<object>{
    const url = URL_PROGRAMACION + 'ObtieneDesperdicios';
    return this.http.get(url).toPromise();
  }
  async leeDesperdicio(programa: string, turno: string, fechaProduccion: string, op: string):Promise<object>{
    const url = URL_PROGRAMACION + 'LeeDesperdicio';
    const params = new HttpParams()
    .append("programa", programa.toString().trim())
    .append("turno", turno.toString().trim())
    .append("fechaProduccion", fechaProduccion.toString().trim())
    .append("op", op.toString().trim());
    return this.http.get(url).toPromise();
  }
  async buscaPrograma(programa: number): Promise<object> {
    const url = URL_PROGRAMACION + 'buscaPrograma';
    const params = new HttpParams()
      .append("programa", programa.toString().trim());
    return await this.http.get(url, {params}).toPromise();
  }
  async buscaProduccion(programa: number): Promise<object> {
    const url = URL_PROGRAMACION + 'buscaProduccion';
    const params = new HttpParams()
      .append("programa", programa.toString().trim());
    return await this.http.get(url, {params}).toPromise();
  }
  async buscaSupervisor(): Promise<object> {
    const url = URL_PROGRAMACION + 'ObtieneSupervisores';
    // const params = new HttpParams()
    return await this.http.get(url/*, {params}*/).toPromise();
  }
  async buscaTripulaciones(): Promise<object> {
    const url = URL_PROGRAMACION + 'ObtieneTripulaciones';
    return await this.http.get(url).toPromise();
  }
  // METODOS DE PAGINA L
  async CalculaKGPapel(programa: string): Promise<any> {
    const url = URL_PROGRAMACION + 'CalculaKGPapel';
    const params = new HttpParams()
      .append('programa', programa);
    return await this.http.get(url, {params}).toPromise();
  }
  async Gramaje(clavePapel: string): Promise<any> {
    const url = URL_PROGRAMACION + 'ObtieneGramaje';
    const params = new HttpParams()
      .append('clavePapel', clavePapel);
    return await this.http.get(url, {params}).toPromise();
  }
  async ValidaDatos(programa: string, turno: string): Promise<any> {
    const url = URL_PROGRAMACION + 'ValidaDatos';
    const params = new HttpParams()
    .append('programa', programa)
    .append('turno', turno);
    return await this.http.get(url, {params}).toPromise();
  }
  async buscaCapturaExistente(programa: string, turno: string, fecha: string): Promise<any> {
    const url = URL_PROGRAMACION + 'ValidaDatos';
    const params = new HttpParams()
    .append('programa', programa)
    .append('turno', turno)
    .append('fechaProduccion', fecha);
    return await this.http.get(url, {params}).toPromise();
  }
  actualiza(datos: actualiza): Promise<any> {
    const url = URL_PROGRAMACION + 'Actualiza';
    return this.http.post(url,datos).toPromise();
  }
  modifica(datos: modifica): Promise<any> {
    const url = URL_PROGRAMACION + 'Modifica';
    return this.http.post(url,datos).toPromise();
  }
  async buscaCaptura(programa: string, turno: string, fechaProduccion: string): Promise<object> {
    const url = URL_PROGRAMACION + 'BuscaCaptura';
    const params = new HttpParams()
      .append("programa", programa.trim())
      .append("turno", turno.toString().trim())
      .append("fechaProduccion", fechaProduccion.trim())
    return await this.http.get(url, {params}).toPromise();
  }
}
