import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CplDat002Entity } from '../models/common/cplcap002';

const URL_PROGRAMACION = environment.FCAPROGAPI002 + 'CPLCAP002/';

@Injectable({
  providedIn: 'root'
})
export class Cplcap002Service {

  constructor(public http: HttpClient) { }

  async ObtenerDatosPrincipal(clave: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getDatosPrincipal';
    const params = new HttpParams()
      .append("clave", clave);
    return await this.http.get(url, {params}).toPromise();
  }

  async ObtenerNextClaveProceso(): Promise<object> {
    const url = URL_PROGRAMACION + 'getNextClaveProceso';
    //const params = new HttpParams();
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  async ObtenerExistePapel(clavePapel: string): Promise<object> {
    const url = URL_PROGRAMACION + 'getExistePapel';
    const params = new HttpParams()
      .append("clavePapel", clavePapel);
    return await this.http.get(url, {params}).toPromise();
  }

  async ObtenerExistenciaPapel(clavePapel: string, anchoPapel: number): Promise<object> {
    const url = URL_PROGRAMACION + 'getExistenciaPapel';
    const params = new HttpParams()
      .append("clavePapel", clavePapel)
      .append("anchoPapel", anchoPapel.toString());
    return await this.http.get(url, {params}).toPromise();
  }

  async ObtenerRollosTransito(clavePapel: string, anchoPapel: number): Promise<object> {
    const url = URL_PROGRAMACION + 'getRollosTransito';
    const params = new HttpParams()
      .append("clavePapel", clavePapel)
      .append("anchoPapel", anchoPapel.toString());
    return await this.http.get(url, {params}).toPromise();
  }

  async ObtenerPapelesDefaultCotizacion(): Promise<object> {
    const url = URL_PROGRAMACION + 'getPapelesDefaultCotizacion';
    // const params = new HttpParams();
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  async ObtenerCbxPreparacion(): Promise<object> {
    const url = URL_PROGRAMACION + 'getCbxPreparacion';
    // const params = new HttpParams();
    return await this.http.get(url/*, {params}*/).toPromise();
  }

  InsertUpdateCplDat002(obj: CplDat002Entity): Observable<any> {
    const url = URL_PROGRAMACION + 'insertUpdateCplDat002';
    // const params = new HttpParams();
    return this.http.post(url, obj);
  }

  UpdateCplDat002(obj: CplDat002Entity): Observable<any> {
    const url = URL_PROGRAMACION + 'updateCplDat002';
    // const params = new HttpParams();
    return this.http.post(url, obj);
  }
}
