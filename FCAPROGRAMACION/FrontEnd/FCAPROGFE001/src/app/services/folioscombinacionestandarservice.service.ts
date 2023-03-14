import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


const URL_Folioscombinacionestandar = environment.FCAPROGAPI002 + 'FoliosCmbStd/';

@Injectable({
  providedIn: 'root'
})
export class FolioscombinacionestandarserviceService {

  constructor(private http: HttpClient) { }

  getPermisosUsuario() 
  {
    const url = `${URL_Folioscombinacionestandar}getPermisosUsuario`;
    return this.http.get(url);
  }

  getBuscarOPsxPrograma(par: any, fil: any): any {
    const url = URL_Folioscombinacionestandar + 'getBuscarOPsxPrograma';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('parPrograma', fil.programa)
    return this.http.get(url, {params});
  }

  getEstandaresvsPropuesta(par: any, fil: any): any {
    const url = URL_Folioscombinacionestandar + 'getEstandaresvsPropuesta';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('parPrograma', fil.programa)
      .append('parCveArticulo', fil.clavearticulo)
      .append('parOp', fil.op)
    return this.http.get(url, {params});
  }

  getCombinacionEstPropuestas(par: any, fil: any): any {
    const url = URL_Folioscombinacionestandar + 'getCombinacionEstPropuestas';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('parPrograma', fil.programa)
      //.append('parCveArticulo', fil.CveArticulo)
      .append('parOp', fil.op)
    return this.http.get(url, {params});
  }

  cmoDat125_Agregar(parFoliosCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat125_Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parFoliosCmbStd, httpOptions);
  }

  cmoDat125_Modificar(parFoliosCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat125_Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parFoliosCmbStd, httpOptions);
  }

  cmoDat125_Eliminar(parFoliosCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat125_Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parFoliosCmbStd, httpOptions);
  }


  cmoDat126_Agregar(parPropuestaCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat126_Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parPropuestaCmbStd, httpOptions);
  }

  cmoDat126_Modificar(parPropuestaCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat126_Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parPropuestaCmbStd, httpOptions);
  }

  CmoDat126_Eliminar(parPropuestaCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'CmoDat126_Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parPropuestaCmbStd, httpOptions);
  }


  cmoDat127_Agregar(parAutorizadoresCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat127_Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parAutorizadoresCmbStd, httpOptions);
  }

  cmoDat127_Modificar(parAutorizadoresCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat127_Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parAutorizadoresCmbStd, httpOptions);
  }

  cmoDat127_Eliminar(parAutorizadoresCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat127_Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parAutorizadoresCmbStd, httpOptions);
  }

  cmoDat132_Agregar(parConceptosCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat132_Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parConceptosCmbStd, httpOptions);
  }

  cmoDat132_Modificar(parConceptosCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat132_Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parConceptosCmbStd, httpOptions);
  }

  cmoDat132_Eliminar(parConceptosCmbStd: any): any {
    const url = URL_Folioscombinacionestandar + 'cmoDat132_Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parConceptosCmbStd, httpOptions);
  }


}
