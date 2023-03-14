import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

const URL = environment.FCAPROGAPI002 + 'SecuenciaCorrugadora/';

@Injectable({
  providedIn: 'root',
})
export class SecuenciaCorrugadoraService {
  public urlImagen: string | SafeResourceUrl =
  'assets/img/user/user-default.png';
  constructor(public http: HttpClient) {}

  // GetSecuenciaCorrugadoraGeneral(par: any, fil: any): any {
  //   const url = URL + 'GetSecuenciaCorrugadoraGeneral';
  //   const params = new HttpParams()
  //     .append('startRow', par.startRow)
  //     .append('endRow', par.endRow)
  //     .append('filtro', fil.filtro);
  //   return this.http.get(url, { params });
  // }
  GetSecuenciaCorrugadoraGeneral(Tipo: any): any {
    const url = URL + 'GetSecuenciaCorrugadoraGeneral';
    const params = new HttpParams().append('tipofiltro', Tipo);
    return this.http.get(url, { params });
  }
  GetAccionesPreventivas(): any {
    const url = URL + 'GetAccionesPreventivas';
    // const params = new HttpParams()
    //   .append('filtro', fil.filtro);
    return this.http.get(url);
  }
  GetDetalleOp(filtro: any): any {
    const url = URL + 'GetDetalleOp';
    const params = new HttpParams().append('Programa', filtro);
    return this.http.get(url, { params });
  }
  GetBuscaOps(filtro: any): any {
    const url = URL + 'GetBuscaOps';
    const params = new HttpParams().append('filtro', filtro);
    return this.http.get(url, { params });
  }
  GetProcesoRevicionExistencia(): any {
    const url = URL + 'GetProcesoRevicionExistencia';
    return this.http.get(url);
  }
  GetProgramas(): any {
    const url = URL + 'GetProgramas';
    return this.http.get(url);
  }
  GetVelocidadStdCorr(filtro: any): any {
    const url = URL + 'GetVelocidadStdCorr';
    const params = new HttpParams().append('Articulo', filtro);
    return this.http.get(url, { params });
  }
  GetTiempoEstandarPrep(filtro: any): any {
    const url = URL + 'GetTiempoEstandarPrep';
    const params = new HttpParams().append('Claveproceso', filtro);
    return this.http.get(url, { params });
  }
  GetMaquinasEficiencia(): any {
    const url = URL + 'GetMaquinasEficiencia';
    return this.http.get(url);
  }
  GetValidaEstatusOP(filtro: any): any {
    const url = URL + 'GetValidaEstatusOP';
    const params = new HttpParams().append('Programa', filtro);
    return this.http.get(url, { params });
  }
  GetValidaOpApoyo(Articulo: any, OPApoyo: any): any {
    const url = URL + 'GetValidaOpApoyo';
    const params = new HttpParams()
      .append('Articulo', Articulo)
      .append('OPApoyo', OPApoyo);
    return this.http.get(url, { params });
  }
  GetPermitirProgramarOP(OP: any): any {
    const url = URL + 'GetPermitirProgramarOP';
    const params = new HttpParams()
      .append('OP', OP);
    return this.http.get(url, { params });
  }
  GetValidacionEliminados(OP: any): any {
    const url = URL + 'GetValidacionEliminados';
    const params = new HttpParams()
      .append('OP', OP);
    return this.http.get(url, { params });
  }
  GetPermitirProgramarOPApoyo(OP: any): any {
    const url = URL + 'GetPermitirProgramarOPApoyo';
    const params = new HttpParams()
      .append('OP', OP);
    return this.http.get(url, { params });
  }
  GetValidacionEliminadosOpApoyo(OP: any): any {
    const url = URL + 'GetValidacionEliminadosOpApoyo';
    const params = new HttpParams()
      .append('OP', OP);
    return this.http.get(url, { params });
  }
  GetCombinacion(filtro: any): any {
    const url = URL + 'GetCombinacion';
    const params = new HttpParams().append('Programa', filtro);
    return this.http.get(url, { params });
  }
  GetPesoUnitario(filtro: any): any {
    const url = URL + 'GetPesoUnitario';
    const params = new HttpParams().append('programa', filtro);
    return this.http.get(url, { params });
  }
  GetVerificadorPapeles(filtro: any): any {
    const url = URL + 'GetVerificadorPapeles';
    const params = new HttpParams().append('programa', filtro);
    return this.http.get(url, { params });
  }
  GetValidarCombinacion(filtro: any): any {
    const url = URL + 'GetValidarCombinacion';
    const params = new HttpParams().append('op', filtro);
    return this.http.get(url, { params });
  }
  SubirOrden(Programa: any, OrdenEsp: any, OrdenAct: any): any {
    const params = { Programa, OrdenEsp, OrdenAct };
    const url = URL + 'SubirOrden';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  SubirOrdenporBloque(Programa: any, OrdenAct: any): any {
    const params = { Programa: Programa, OrdenAct: OrdenAct };
    const url = URL + 'SubirOrdenporBloque';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  BajarOrden(Programa: any, OrdenEsp: any, OrdenAct: any): any {
    const params = { Programa, OrdenEsp, OrdenAct };
    const url = URL + 'BajarOrden';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  BajarOrdenporBloque(Programa: any, OrdenAct: any): any {
    const params = { Programa: Programa, OrdenAct: OrdenAct };
    const url = URL + 'BajarOrdenporBloque';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  ModificaPreparacion(params: any): any {
    const url = URL + 'ModificaPreparacion';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  Terminar(filtro: any): any {
    const url = URL + 'Terminar';
    const params = new HttpParams().append('Programa', filtro);
    return this.http.get(url, { params });
  }
  Cancelar(filtro: any): any {
    const url = URL + 'Cancelar';
    const params = new HttpParams().append('Programa', filtro);
    return this.http.get(url, { params });
  }
  CambiaEstatusPRO(filtro: any): any {
    const url = URL + 'CambiaEstatusPRO';
    const params = new HttpParams().append('Programa', filtro);
    return this.http.get(url, { params });
  }
  AgregarPrograma(filtro: any, Comentario: any): any {
    const url = URL + 'AgregarPrograma';
    const params = new HttpParams().append('Programa', filtro)
    .append('Comentarios', Comentario);
    return this.http.get(url, { params });
  }
  EliminarPrograma(Programa: any, ChkEliminaImpresoras: any ): any {
    const url = URL + 'EliminarPrograma';
    const params = new HttpParams().append('Programa', Programa)
    .append('ChkEliminaImpresoras', ChkEliminaImpresoras);
    return this.http.get(url, { params });
  }
  EliminarFolioCombinacion(Programa: any): any {
    const url = URL + 'EliminarFolioCombinacion';
    const params = new HttpParams().append('Programa', Programa);
    return this.http.get(url, { params });
  }
  Actualiza(Datos: any): any {
    const url = URL + 'Actualiza';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }
  ActivaFolioCombinacion(filtro: any): any {
    const url = URL + 'ActivaFolioCombinacion';
    const params = new HttpParams().append('Folio', filtro);
    return this.http.get(url, { params });
  }
  CorreoFaltaFolioEmp(filtro: any): any {
    const url = URL + 'CorreoFaltaFolioEmp';
    const params = new HttpParams().append('Op', filtro);
    return this.http.get(url, { params });
  }
  CorreoFaltaFolioEmpOpApoyo(filtro: any, OpApoyo: any): any {
    const url = URL + 'CorreoFaltaFolioEmpOpApoyo';
    const params = new HttpParams().append('Op', filtro)
    .append('OpApoyo', OpApoyo);
    return this.http.get(url, { params });
  }
  EnviaCorreoNotificacion(Op: any, chkPrograma: any, Articulo: any ): any {
    const url = URL + 'EnviaCorreoNotificacion';
    const params = new HttpParams().append('Op', Op)
    .append('chkPrograma', chkPrograma)
    .append('Articulo', Articulo);
    return this.http.get(url, { params });
  }
  GetProcesoRadigrafias(OP: any): any {
    const url = URL + 'GetProcesoRadigrafias';
    const params = new HttpParams()
      .append('OP', OP);
    return this.http.get(url, { params });
  }
  GetPapelAntiguoCierreMes(params: any): any {
    const url = URL + 'GetPapelAntiguoCierreMes';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  GetBuscarAntiguedadDia(params: any): any {
    const url = URL + 'GetBuscarAntiguedadDia';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  GetVerificaRestosRollos(Almacen, Ancho1, Liner1, Liner2, Liner3, Medium1, AnchoC1, Medium2, AnchoC2): any {
    console.log(Almacen, Ancho1, Liner1, Liner2, Liner3, Medium1, AnchoC1, Medium2, AnchoC2, 'prueba');
    const url = URL + 'GetVerificaRestosRollos';
    const params = new HttpParams().append('Almacen', Almacen)
    .append('Ancho1', Ancho1)
    .append('Liner1', Liner1)
    .append('Liner2', Liner2)
    .append('Liner3', Liner3)
    .append('Medium1', Medium1)
    .append('AnchoC1', AnchoC1)
    .append('Medium2', Medium2)
    .append('AnchoC2', AnchoC2);
    return this.http.get(url, { params });
  }
  InsertaFiltros(params: any): any {
    console.log(params, 'InsertaFiltros');
    const url = URL + 'InsertaFiltros';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, params, httpOptions);
  }
  DescargarMaestra(
    NombreArch: string,
    onCorrect?: (res: string | SafeResourceUrl) => void,
    onError?: (rej: { message: string; error: any }) => void
  ): void {
    const url = URL + 'Descargar';
    const params = new HttpParams()
      .append('Zona', localStorage.getItem('Zona'))
      .append('NombreArch', NombreArch);

    this.http.get(url, { params, responseType: 'blob' }).subscribe(
      (res: Blob) => {
        console.log(res, 'archivo');
        saveAs(res, NombreArch);
        if (onCorrect) {
          onCorrect('Correcto !');
        }
      },
      (error: any) => {
        if (onError) {
          onError({ message: 'Error obteniendo Imagen.', error });
        }
      }
    );
  }
  // Editar(Datos: any): any {
  //   const url = URL + 'Editar';
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.post(url, Datos, httpOptions);
  // }
  // Eliminar(Datos: any): any {
  //   const url = URL + 'Eliminar';
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.post(url, Datos, httpOptions);
  // }
}
