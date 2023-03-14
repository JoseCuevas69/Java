import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoSolicitud, TipoSolicitudEstatus, TipoSolicitudFiltros } from '../models/TipoSolicitud';
import { ConceptosTipoSolicitud } from '../models/ConceptoTipoSolicitud';
import { GridParams } from '../models/common/gridParams';

const URL_TIPOS_SOLICITUD = environment.FCAVENTAPI001 +  'TiposSolicitud/';

@Injectable({
  providedIn: 'root'
})
export class TiposSolicitudService {

  constructor(private http: HttpClient) { }

  listar(par: GridParams, fil: TipoSolicitudFiltros): Observable<any> {
    const url = URL_TIPOS_SOLICITUD + 'Listar';
    const params = new HttpParams()
      .append('startRow', par.startRow.toString())
      .append('endRow', par.endRow.toString())
      .append('Filtro', fil.filtro)
      .append('Estatus', fil.estatus.toString())
      .append('Aplicacion', fil.aplicacion.toString());

    return this.http.get(url, {params});
  }

  listarConceptos(idTipoSolicitud: number): Observable<any> {
    const url = URL_TIPOS_SOLICITUD + 'ListarConceptos';
    const params = new HttpParams()
      .append('IdTipoSolicitud', idTipoSolicitud.toString());

    return this.http.get(url, {params});
  }

  guardar(tipoSolicitud: TipoSolicitud): Observable<any> {
    const url = URL_TIPOS_SOLICITUD + 'Guardar';
    return this.http.post(url, tipoSolicitud);
  }

  cambiarEstatus(tipoSolicitud: TipoSolicitudEstatus): Observable<any> {
    const url = URL_TIPOS_SOLICITUD + 'CambiarEstatus';
    return this.http.post(url, tipoSolicitud);
  }

  actualizarConceptos(conceptosTipoSol: ConceptosTipoSolicitud): Observable<any> {
    const url = URL_TIPOS_SOLICITUD + 'ActualizarConceptos';
    return this.http.post(url, conceptosTipoSol);
  }
}
