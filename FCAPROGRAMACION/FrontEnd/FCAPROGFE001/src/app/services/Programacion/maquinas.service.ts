import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI001 + 'Maquinas/';

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {

  constructor(public http: HttpClient) { }

  ListarMaquinas(par:any,fil:any):any{
    const url = URL + 'getListarMaquinas';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('ClaveMaquina', fil.filtro)
    return this.http.get(url, { params });

  }

  async ListarDespericio(fil:any):Promise<object>{
    const url = URL + 'getListarDesperdicios';
    const params = new HttpParams()
      .append('ClaveMaquina', fil)
    
    const Data= await this.http.get(url, { params }).toPromise();
    return Data;

  }

 async ListaProcesos():Promise<object>{
    const url = URL + 'getListarProcesos';
    const Data= await this.http.get(url).toPromise();
    return Data;
  }

  async ListaEvaluaciones():Promise<object>{
    const url = URL + 'getListarEvaluaciones';
    const Data= await this.http.get(url).toPromise();
    return Data;
  }

  async ListaTripulaciones():Promise<object>{
    const url = URL + 'getListarTripulaciones';
    const Data= await this.http.get(url).toPromise();
    return Data;
  }

  async ListaTripulacionesPorMaquina(fil:any):Promise<object>{
    const url = URL + 'getListarTripulacionesPorMaquina';
    const params = new HttpParams()
    .append('ClaveMaquina', fil)
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }

  async CargarInformacionMaquina(fil:any):Promise<object>{
    const url = URL + 'getCargaInformacionMaquina';
    const params = new HttpParams()
    .append('ClaveMaquina', fil)
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }

  ListarPuestos(par:any,fil:any):any{
    const url = URL + 'getListarPuestos';
    const params = new HttpParams()
    .append('ClaveMaquina',fil.claveMaquina)
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
    return this.http.get(url, { params });

  }

  async ValidaMaquinaDefault(maquina:any,proceso:any):Promise<object>{
    const url = URL + 'getValidaMaquinaDefault';
    const params = new HttpParams()
    .append('ClaveMaquina', maquina)
    .append('Proceso', proceso)
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }

  async ValidaMaquinaExiste(maquina:any):Promise<object>{
    const url = URL + 'getValidaMaquinaExiste';
    const params = new HttpParams()
    .append('ClaveMaquina', maquina)
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }

  guardaMaquina(obj:any):any
  {
    const url = URL + 'postGuardaMaquina';
    return this.http.post(url,obj);
  }

  EliminaMaquina(obj:any):any
  {
    const url = URL + 'postEliminaMaquina';
    return this.http.post(url,obj);
  }

  ActivaMaquina(obj:any):any
  {
    const url = URL + 'postActivaMaquina';
    return this.http.post(url,obj);
  }




}
