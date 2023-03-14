import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ClienteVentas } from '../models/ClienteVentas';
import { environment } from 'src/environments/environment';

const URL_CLIENTE = environment.FCAVENTAPI001 + 'ClienteVentas/';
const URL_PROSPECTOS = environment.FCAVENTAPI001 + 'Prospectos/';

@Injectable({
  providedIn: 'root',
})
export class ClientesVentasService {
  constructor(public http: HttpClient) {}

  Agregar(Cliente: ClienteVentas): any {
    const url = URL_CLIENTE + 'postAgregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Cliente, httpOptions);
  }

  Editar(Cliente: ClienteVentas): any {
    const url = URL_CLIENTE + 'postEditar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Cliente, httpOptions);
  }

  Estatus(Cliente: any): any {
    const url = URL_CLIENTE + 'postEstatus';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Cliente, httpOptions);
  }

  ListarClientes(par: any, fil: any): any {
    const TipoCliente = fil.TipoCliente === undefined ? 0 : fil.TipoCliente;
    const Estatus = fil.Estatus === undefined ? 1 : fil.Estatus;
    const Representante = fil.Representante === undefined ? 0 : fil.Representante;

    const url = URL_CLIENTE + 'getClientes';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('TipoCliente', TipoCliente)
      .append('Representante', Representante)
      .append('Estatus', Estatus);
    return this.http.get(url, { params });
  }

  ListarProspectos(par: any, fil: any): any {
    const Representante = fil.Representante === undefined ? 0 : fil.Representante;

    const url = URL_PROSPECTOS + 'getProspectos';

    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('representante', Representante);
    return this.http.get(url, { params });
  }

  async ListarRefBan(idCliente: any): Promise<object> {
    const url = URL_CLIENTE + 'getRefBancaria';
    const params = new HttpParams().append('IdCliente', idCliente);
    const Data = await this.http.get(url, { params }).toPromise();
    return Data;
  }

  async ListarCorreo(idCliente: any): Promise<object> {
    const url = URL_CLIENTE + 'getCorreos';
    const params = new HttpParams().append('IdCliente', idCliente);

    const Data = await this.http.get(url, { params }).toPromise();
    return Data;
  }

  ListarClientesHabilitados(startRow: any, endRow: any, filtro: string): any {
    const url = URL_CLIENTE + 'getClientesHabilitados';
    const params = new HttpParams()
      .append('startRow', startRow)
      .append('endRow', endRow)
      .append('filtro', filtro);
    return this.http.get(url, { params });
  }
}
