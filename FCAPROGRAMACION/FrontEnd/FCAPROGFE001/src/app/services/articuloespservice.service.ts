//import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//mport { Paros } from '../models/paros';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//ArticuloEspController
const URL_ARTICULOESP = environment.FCAPROGAPI002 + 'ArticuloEsp/';

@Injectable({
  providedIn: 'root'
})
export class ArticuloespserviceService {

  constructor(private http: HttpClient) { }

  getMaquinas() 
  {
    const url = `${URL_ARTICULOESP}getMaquinas`;
    return this.http.get(url);
  }

  getArticulos(par: any, fil: any): any {
    const url = URL_ARTICULOESP + 'getArticulos';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('parDescripcion', fil.Descripcion)
    return this.http.get(url, {params});
  }

  BuscarArticuloEsp(fil: any): any {
    const url = URL_ARTICULOESP + 'getArticuloEspecialesEnc';
   
    const params = new HttpParams()
      .append('parClaveArticulo', fil.clavearticulo)
      .append('parClaveMaquina', fil.clavemaquina)
      .append('parDescripcion', fil.descripcion)

      //this.filtros.clavearticulo = e.data["clavearticulo"]; 
    //this.filtros.clavemaquina = ""; 
    //this.filtros.descripcion = e.data["nombrearticulo"]; 

    return this.http.get(url, {params});
  }

  listarDetalleArticuloEsp(par: any, fil: any): any {
    const url = URL_ARTICULOESP + 'GetArticuloEspecialesDet';
   
    const params = new HttpParams()
      .append('parClaveArticulo', fil.clavearticulo)
      .append('parClaveMaquina', fil.clavemaquina)
      .append('parDescripcion', fil.descripcion)
    return this.http.get(url, {params});
  }

  /*
  listarParos(par: any, fil: any): any {
    const url = URL_PAROS + 'GetParos';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('TipoMaquina', fil.TipoMaquina)
      .append('TipoTiempo', fil.TipoTiempo)
      .append('ClaveMaquina', fil.ClaveMaquina)
      .append('Fecha', fil.Fecha);
    return this.http.get(url, {params});
  }
  */



  AgregarEnc(parDatos: any): any {
    const url = URL_ARTICULOESP + 'AgregarEnc';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parDatos, httpOptions);
  }

  ModificarEnc(parDatos: any): any {
    const url = URL_ARTICULOESP + 'ModificarEnc';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parDatos, httpOptions);
  }

  EliminarEnc(parDatos: any): any {
    const url = URL_ARTICULOESP + 'EliminarEnc';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parDatos, httpOptions);
  }

  AgregarDet(parDatos: any): any {
    const url = URL_ARTICULOESP + 'agregardet';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parDatos, httpOptions);
  }

  ModificarDet(parDatos: any): any {
    const url = URL_ARTICULOESP + 'ModificarDet';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parDatos, httpOptions);
  }

  EliminarDet(parDatos: any): any {
    const url = URL_ARTICULOESP + 'EliminarDet';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, parDatos, httpOptions);
  }

}
