import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.FCAPROGAPI001 + 'RepConsumoRollosCorrugadora/';

@Injectable({
  providedIn: 'root',
})
export class RepConsumoRollosCorrugadoraService {
  constructor(public http: HttpClient) {}

  GetClases(): any {
    const url = URL + 'GetClases';
    return this.http.get(url);
  }
  GetSubClases(): any {
    const url = URL + 'GetSubClases';
    return this.http.get(url);
  }

  GetTripulaciones(): any {
    const url = URL + 'GetTripulaciones';
    return this.http.get(url);
  }

   // para grid cs (sin paginado) , uso post para pasarle el modelo.
   GetDatosConsumoRollos(Datos: any): any {
    const url = URL + 'GetDatosConsumoRollos';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
}