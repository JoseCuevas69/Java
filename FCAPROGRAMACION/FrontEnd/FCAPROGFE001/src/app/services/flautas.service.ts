import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL_Flautas = environment.FCAPROGAPI001 + 'Flautas/';

@Injectable({
  providedIn: 'root',
})
export class FlautasService {
  constructor(public http: HttpClient) {}

   ListarFlautas(par: any,fil: any): any {
      const url = URL_Flautas + 'getFlautas';
      const params = new HttpParams()
        .append('startRow', par.startRow)
        .append('endRow', par.endRow)
        .append('filtro', fil.filtro);
      return this.http.get(url, { params });
    }  
    async GetCorrugados(): Promise<object> {
      const url = URL_Flautas + 'getCorrugados';
      // const params = new HttpParams()
      //   .append('startRow', par.startRow)
      //   .append('endRow', par.endRow)
      // return this.http.get(url, { params });
      const Data = await this.http.get(url/*, {params}*/).toPromise();
      return Data;
    }   
  Agregar(Datos: any): any {
    const url = URL_Flautas + 'GuardarFlauta';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Editar(Datos: any): any {
    const url = URL_Flautas + 'ModificarFlautas';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  Eliminar(Datos: any): any {
    const url = URL_Flautas + 'EliminarFlautas';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
}
