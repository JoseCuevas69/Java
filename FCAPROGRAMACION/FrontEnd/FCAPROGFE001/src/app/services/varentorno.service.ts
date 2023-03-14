import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { VariablesEntorno } from '../models/VariablesEntorno';


const URL_VarEntorno = environment.FCAPROGAPI001 + 'VarEntorno/';

@Injectable({
  providedIn: 'root',
})
export class VarEntornoService {
  constructor(public http: HttpClient) {}

   ListarVarEntorno(): Observable<any> {
      const url = URL_VarEntorno + 'getVarEntorno';
      const params = new HttpParams();
      return this.http.get(url, { params });
    }  
 
  Editar(Datos: VariablesEntorno): Observable<any> {
    const url = URL_VarEntorno + 'Editar';
      // const httpOptions = {
      //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // };
    return this.http.post(url, Datos);
  }
 
}
