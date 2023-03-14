import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'RutaProcesos/';

@Injectable({
  providedIn: 'root'
})
export class RutaprocesosserviceService {

  constructor(public http: HttpClient) { }

  ListarRutas(par:any,fil:any):any{
    const url = URL + 'getListarRutas';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow);
    return this.http.get(url, { params });

  }

  async ListarProcesosRutas(): Promise<object> {
    const url = URL + 'getListarProcesosRutas';
    //const params = new HttpParams().append('ClaveUsuario', ClaveUsuario);
    const Data = await this.http.get(url).toPromise();
    return Data;
  }
  
  async GetDetalleProcesosRutas(ClaveProceso:string): Promise<object> {
    const url = URL + 'getDetalleProcesosRutas';
    const params = new HttpParams().append('ClaveProceso', ClaveProceso);
    const Data = await this.http.get(url,{params}).toPromise();
    return Data;
  }

  GuardaRutas(obj:any):any
  {
    const url= URL + 'PostGuardaRutas';
    return this.http.post(url,obj);
  }

  EliminaRutas(obj:any):any
  {
    const url= URL + 'PostEliminaRutas';
    return this.http.post(url,obj);
  }

  ReactivaRutas(obj:any):any
  {
    const url= URL + 'PostReactivaRutas';
    return this.http.post(url,obj);
  }
}
