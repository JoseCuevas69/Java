import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const URL_TIPOCLIENTE = environment.FCAVENTAPI001 + 'TipoCliente/';

@Injectable({
  providedIn: 'root',
})
export class TipoClienteService {
  constructor(public http: HttpClient) {}

  ListarTipoCliente(): any {
    const url = URL_TIPOCLIENTE + 'getTipoCliente';
    return this.http.get(url);
  }
}
