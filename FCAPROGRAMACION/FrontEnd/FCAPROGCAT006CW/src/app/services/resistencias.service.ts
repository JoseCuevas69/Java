import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

const URL_API_VENTAS_RESISTENCIAS = environment.FCAVENTAPI001 +  'Resistencias/';

@Injectable({
  providedIn: 'root'
})
export class ResistenciasService {
  constructor(private http: HttpClient) { }

  listarResistencias(par: any, fil: any): any {
    const url = URL_API_VENTAS_RESISTENCIAS + 'Listar';

    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil);
    return this.http.get(url, {params});
  }
}
