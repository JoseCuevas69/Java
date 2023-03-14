import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.FCAPROGAPI002 + 'EstandaresImp/';

@Injectable({
  providedIn: 'root'
})
export class EstandaresimpService {

  constructor(public http: HttpClient) { }

  ListarEstandares(par:any,fil:any):any{
    const url = URL + 'getListarEstandares';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('TipoMaquina', fil.tipoMaquina)
      .append('ClaveMaquina', fil.claveMaquina)
    return this.http.get(url, { params });

  }

  
  ListarVelocidadEstandar(par:any,fil:any):any{
    const url = URL + 'getListarVelocidadEstandar';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('ClaveMaquina', fil.claveMaquina)
    return this.http.get(url, { params });

  }

  async ListarMaquinas(fil:any):Promise<object>{
    const url = URL + 'getListarMaquinas';
    const params = new HttpParams().append('tipoMaquina',fil);
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }

  async ListarProcesos(fil:any):Promise<object>{
    const url = URL + 'getListarProcesos';
    const params = new HttpParams()
        .append('tipoMaquina', fil.tipoMaquina)
        .append('claveMaquina', fil.claveMaquina);
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }
  async getEficiencia(fil:any):Promise<object>{
    const url = URL + 'getEficiencia';
    const params = new HttpParams()
        .append('claveMaquina', fil);
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }

  async ExisteTurno(fil:any,turno:any):Promise<object>{
    const url = URL + 'getExisteTurno';
    const params = new HttpParams()
        .append('claveMaquina', fil.claveMaquina)
        .append('claveArea', fil.tipoMaquina)
        .append('turno', turno);
    const Data= await this.http.get(url,{params}).toPromise();
    return Data;
  }

  GuardaTiempoEstPre(obj:any):any
  {
    const url= URL + 'PostActTiempoEstPre';
    return this.http.post(url,obj);
  }

  
  EliminaTiempoEstPre(obj:any):any
  {
    const url= URL + 'PostElmTiempoEstPre';
    return this.http.post(url,obj);
  }

  GuardaVelocidadEstandar(obj:any):any
  {
    const url= URL + 'PostActVelocidadEstandar';
    return this.http.post(url,obj);
  }

  EliminaVelocidadEstandar(obj:any):any
  {
    const url= URL + 'PostElmVelocidadEstandar';
    return this.http.post(url,obj);
  }

  GuardaHorarioComida(obj:any):any
  {
    const url= URL + 'PostGuardaHorariosComida';
    return this.http.post(url,obj);
  }

  ModificaHorarioComida(obj:any):any
  {
    const url= URL + 'PostModificaHorariosComida';
    return this.http.post(url,obj);
  }


}
