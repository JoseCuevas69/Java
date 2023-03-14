import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaSolicitudFiltros } from '../models/AreaSolicitud';

const URL_AREAS_SOLICITUD = environment.FCAVENTAPI001 +  'AreasSolicitud/';

@Injectable({
  providedIn: 'root'
})
export class AreasSolicitudService {

  constructor(private http: HttpClient) { }

  listar(fil: AreaSolicitudFiltros): Observable<any> {
    const url = URL_AREAS_SOLICITUD + 'Listar';
    const params = new HttpParams()
      .append('Estatus', fil.estatus.toString());
    return this.http.get(url, {params});
  }
}
