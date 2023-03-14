import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const URL_PAPELES = environment.FCAPROGAPI002 + 'Papeles/';

@Injectable({
  providedIn: 'root'
})
export class PapelesserviceService {

  constructor(private http: HttpClient) { }

  ListarPapeles(par: any, fil: any): any {
    const url = URL_PAPELES + 'getPapeles';
   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('clavepapel', fil.clavepapel)
      .append('descripcion', fil.descripcion)
      //.append('ClaveMaquina', fil.ClaveMaquina)
      //.append('Fecha', fil.Fecha);
    return this.http.get(url, {params});
  }

  /*
  getPermisos(): any {
    const url = URL_PAPELES + 'getPermisos';   
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      //.append('clavepapel', fil.clavepapel)
      //.append('descripcion', fil.descripcion)
      //.append('ClaveMaquina', fil.ClaveMaquina)
      //.append('Fecha', fil.Fecha);
    return this.http.get(url, {params});
  }*/

  getPermisos() 
  {
    const url = URL_PAPELES + 'getPermisos';   
    //const url = `${URL_PAROS}getMaquinas?tipoMaquina=${partipoMaquina}` ;
    return this.http.get(url);
  }



  Agregar(Datos: any): any {
    const url = URL_PAPELES + 'Agregar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

  Modificar(Datos: any): any {
    const url = URL_PAPELES + 'Modificar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

  Modificar2(Datos: any): any {
    const url = URL_PAPELES + 'Modificar2';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

  Eliminar(Datos: any): any {
    const url = URL_PAPELES + 'Eliminar';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

}
