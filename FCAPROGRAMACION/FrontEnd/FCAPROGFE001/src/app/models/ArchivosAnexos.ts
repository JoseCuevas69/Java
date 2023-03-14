export class ArchivosAnexos{
  rutaArchivo: string;
  rutaArchivoCmo046MW: string;
  idSolicitud: number;
  idArchivo: number;
  fescripcion: string;
  gechaInsert: string;
  usuarioArchivo: string;
  origen: string;
  analisisSolMultiple: boolean;
  numArticulo: number;
  idArticulo: string;
  articulo: string;
  tipoSolicitud: string;
  nombreArchivo: string;
  servidor: string;
  usuarioFTP: string;
  pswFTP: string;
  tipoLiberacion: boolean;
  ltsArchivosAnexos: LtsArchivosAnexos [] = [];
}

export interface LtsArchivosAnexos {
  rutaArchivo?: string;
  rutaArchivoCmo046MW?: string;
  idSolicitud?: number;
  idArchivo?: number;
  fescripcion?: string;
  gechaInsert?: string;
  usuarioArchivo?: string;
  origen?: string;
  analisisSolMultiple?: boolean;
  numArticulo?: number;
  idArticulo?: string;
  articulo?: string;
  tipoSolicitud?: string;
  nombreArchivo?: string;
  servidor?: string;
  usuarioFTP?: string;
  pswFTP?: string;
  tipoLiberacion?: boolean;
}
