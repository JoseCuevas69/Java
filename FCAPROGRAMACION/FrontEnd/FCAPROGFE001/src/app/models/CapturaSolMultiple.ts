import { camelCase } from 'lodash-es';

export class Conceptos {
    numTintas = 0;
    pzasXBulto = 0;
    bultosXCama = 0;
    camasXPallet = 0;
    idTipoPaletizado = 0;
    idTipoCaja = 0;
    incluyeImpresion = 'NO';
    resistencia = '';
    resistenciaEsp = false;
    flauta = '';
    presentacion = '';
    escala = '';
    cantidadMuestras = 0;
    largoTotal = '0';
    anchoTotal = '0';
    tunion = '';
    color = '';
    volumen = 0;
    precioLAB = '';
    sello = '';
    bodega = '';
    escalaEtiqueta = '';
    especificacionEtiqueta = '';
    idMoneda = '0';
    idioma = '';
    idImpermeabilizado = 0;
    idMediumParaf = 0;
    idProceso = 0;
    colorEtiqueta = '';
    fechaDyS = '';
    cantidadFab = 0;
    fechaProdRequerida = '';
    ruta = '';
    rutaComentario = '';
    armadoEnMaquina = 'NO';
    especificacionSuaje = '';
    especificacionGrabado = '';
    requiereGrabado = 'NO';

    /**
     * Carga los datos de conceptos que se tienen sobre un objeto dado
     */
    cargar(value: any): void {
        if (Array.isArray(value)) {
            for (const concepto of value as Concepto[]) {
                const campoConcepto = camelCase(concepto.campoBDs);
                if (campoConcepto in this) {
                     concepto.especificacion = this[campoConcepto];

                     if (concepto.permitirRegEspeciales) {
                        const campoConceptoEspecial = campoConcepto + 'Esp';

                        if (campoConceptoEspecial in this) {
                            concepto.especial = this[campoConceptoEspecial];
                        }
                    }
                }
            }
        } else if (typeof value === 'object') {
            for (const key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key) && Object.prototype.hasOwnProperty.call(this, key)) {
                     value[key] = this[key];
                }
            }
        }
    }

    constructor(value?: any) {
        if (Array.isArray(value)) {
            for (const concepto of value as Concepto[]) {
                const campoConcepto = camelCase(concepto.campoBDs);
                if (campoConcepto in this) {
                    this[campoConcepto] = concepto.especificacion;

                    if (concepto.permitirRegEspeciales) {
                        const campoConceptoEspecial = campoConcepto + 'Esp';

                        if (campoConceptoEspecial in this) {
                            this[campoConceptoEspecial] = concepto.especial ? true : false;
                        }
                    }
                }
            }
        } else if (typeof value === 'object') {
            for (const key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key) && Object.prototype.hasOwnProperty.call(this, key)) {
                    this[key] = value[key];
                }
            }
        }
    }
}

class Tintas extends Conceptos {
    tinta1 = '0';
    tinta1Esp = false;
    tinta2 = '0';
    tinta2Esp = false;
    tinta3 = '0';
    tinta3Esp = false;
    tinta4 = '0';
    tinta4Esp = false;
}

export interface SolicitudMultipleFiltros {
    fechaIni: string;
    fechaFin: string;
    idTipoSolicitud: number;
    idSolicitud: number;
}

export class SolicitudMultipleFiltros {
    fechaIni: string = null;
    fechaFin: string = null;
    idTipoSolicitud = 0;
    idSolicitud: number = null;
}

export interface CapturaSolMultiple extends Tintas {
    // Encabezado

    /**
     * 1 - Nueva, 2 - Modificación de maestras, desarrollos, cotizaciones etc., 3 - Nueva a partir de un consecutivo de maestra o desarrollo
     */
    tipoCaptura: number;

    idSolicitud: number;
    esSolicitudMultiple: boolean;
    idRevision: number;
    idRepresentante: number;
    usuarioRepresentante: string;
    idCliente: string;
    idProspecto: string;
    idContacto: number;

    /**
     * Cuando el folio actual es de análisis caja nueva, este campo indica el Folio de solicitud múltiple relacionado
     */
    idSolicitudRelacionada: number;

    muestraPor: string;
    comentariosGenerales: string;
    idEstatusSeguimiento: number;

    /**
     * Id de la solicitud de la que se genera la Copia (opción de Copiar solicitud)
     */
    idSolicitudOrigen: number;

    /**
     * Solicitud de donde tomará el responsable de Atn para asignar la presente solicitud
     */
    idSolicitudSet: number;

    /**
     * Id de la solicitud que tomo de referencia el usuario en la opción "Nuevo a partir de" y "Modificación"
     */
    idSolicitudConsecutivo: number;

    esJuego: boolean;
    generaOportunidad: boolean;

    aplicaSet?: boolean;
    mismoFolio?: boolean;

    tiposSolicitud?: TipoSolicitudListar[];
    especificacionesCriticas?: EspecificacionCritica[];
    combinacionesPapeles?: CombinacionPapeles[];
    consecutivos?: Consecutivo[];
    maquinasArmadoras?: MaquinaArmadora[];
    seguimiento?: Seguimiento[];

    // Detalle de Artículo
    numArticulo: number;
    idArticulo: string;
    articulo: string;
    numArticuloConsecutivo: number;
    idTipoSolicitudConsecutivo: number;
    cambioInterno?: boolean;
    cambioRapido?: boolean;
    seEntregaMuestraFisica?: boolean;
    medidaIntExt?: string;
    udMedida?: string;
    largo?: number;
    ancho?: number;
    fondo?: number;
    comentariosEspecificos?: string;
    idTipoOportunidad?: number;
    idTipoSolicitudGS?: number;
    idCompetidor?: number;
    descripcionCompetidor?: string;
    fechaCierreOportunidad?: string;
}

export class CapturaSolMultiple extends Tintas {
    idSolicitud = 0;
    numArticulo = 0;
    idArticulo = '';
    articulo = '';
    esSolicitudMultiple = false;
    idRevision = 0;
    idRepresentante = 0;
    usuarioRepresentante = '';
    idCliente = '';
    idProspecto = '';
    idContacto = 0;
    idSolicitudRelacionada = 0;
    muestraPor = '';
    comentariosGenerales = '';
    idEstatusSeguimiento = 0;
    tipoCaptura = 0;
    idSolicitudSet = 0;
    esJuego = false;
    generaOportunidad = false;
    generaComentario = false;
    seAnexaGrafico = false;

    idTipoSolicitudGS ?= 0;
    aplicaSet ?= false;
    mismoFolio ?= true;
    comentariosEspecificos ?= '';
    tiposSolicitud?: TipoSolicitudListar[] = [];
    especificacionesCriticas?: EspecificacionCritica[] = [];
    consecutivos?: Consecutivo[] = [];
    combinacionesPapeles?: CombinacionPapeles[] = [];
    maquinasArmadoras?: MaquinaArmadora[] = [];
    seguimiento?: Seguimiento[] = [];

    idSolicitudOrigen = 0;

    numArticuloConsecutivo = 0;
    idTipoSolicitudConsecutivo = 0;
    cambioInterno ?= false;
    cambioRapido ?= false;
    seEntregaMuestraFisica ?= false;
    medidaIntExt ?= 'Interior';
    udMedida ?= 'CM';
    largo?: number = null;
    ancho?: number = null;
    fondo?: number = null;
    idTipoOportunidad ?= 0;
    idCompetidor ?= 0;
    descripcionCompetidor ?= '';
    fechaCierreOportunidad?: string = null;
}

export interface TipoSolicitudListar {
    seleccionada: boolean;
    nombreAreaSolMultiple: string;
    idTipoSolicitud: number;
    nombreTipoSolicitud: string;
    consecutivoCompleto: string;
    consecutivo: string;
    ordenCaptura: number;
    consecutivoExistente: boolean;
    consecutivoCompletoExistente: string;
    permiteEnBaseAConsecutivo: boolean;
    permiteAsignacionDirecta: boolean;
    asignacionDirecta: boolean;
    solAutomatica: boolean;
    siguienteConsecutivo: number;
    disponibleDeInicio: string;
}

export interface EspecificacionCritica {
    seleccionada: boolean;
    idEspecificacion: number;
    especificacion: string;
}

export interface Tinta {
    especial?: boolean;
    idTinta: string;
    color: string;
}

export class Tinta {
    especial ? = false;
    idTinta = '';
    color = '';
}

export interface Papel {
    papel: string;
}

export interface SolicitudPermitida {
    idTipoSolicitud1: number;
    idTipoSolicitud2: number;
    enBaseAConsecutivo: number;
    disponibleNuevoMod: number;
    idTipoSolBase: number;
    idTipoSolObligatorio: number;
}

export class CombinacionPapeles {
    idSolicitud = 0;
    numArticulo = 0;
    idCombinacion = 0;
    liner1 = '';
    corrugado1 = '';
    liner2 = '';
    corrugado2 = '';
    liner3 = '';
}

export interface TipoMaquinaArmadora {
    idTipoMaquina: string;
    nombreTipoMaquina: string;
}

export interface MaquinaArmadora {
    idSolicitud: number;
    numArticulo: number;
    numTipoMaquina: number;
    idTipoMaquina: number;
    iniciaTemporada: number;
    finTemporada: number;
    maquinasRequeridas: number;
    cantCajasArmar: number;
    cantidadEmpaques: number;
    estado: string;
    ciudad: string;
}

export class MaquinaArmadora {
    idSolicitud = 0;
    numArticulo = 0;
    numTipoMaquina = 0;
    idTipoMaquina = 0;
    iniciaTemporada = 0;
    finTemporada = 0;
    maquinasRequeridas: number = null;
    cantCajasArmar: number = null;
    cantidadEmpaques: number = null;
    estado = '';
    ciudad = '';
}

export interface Temporada {
    mes: number;
    nombreMes: string;
}

export interface Concepto {
    idConcepto: number;
    concepto: string;
    especial: boolean;
    campoBDs: string;
    tipo: number;
    longitud: number;
    permitirRegEspeciales: boolean;
    especificacion: any;
}

// TABLAS ESPECIFICACIONES CONCEPTOS

export interface Especificacion {
    id: number | string;
    descripcion: string;
}

export interface Parte {
    claveArticulo: string;
    numArticulo: number;
    descripcion: string;
    articulo: string;
}

export class Parte {
    claveArticulo = '';
    numArticulo = 0;
    descripcion = '';
    articulo = '';
}

export class ParteFiltros {
    filtro = '';
    idSolicitud = 0;
}

export interface Consecutivo {
    id: number;
    consecutivoGenerado: string;
    nombreTipoSolicitud: string;
    articulo: string;
    clienteProspecto: string;
    estatusTipoSolicitud: string;
    estatusFolio: string;
    fechaCaptura: string;
    representante: string;
    usuarioCapturo: string;
    idEstatusSeguimiento: number;
    numArticulo: number;
    idTipoSolicitud: number;
}

export class Consecutivo {
    idSolicitud = 0;
    idRevision = 0;
    idTipoSolicitud = 0;
    numArticulo = 0;
    consecutivoCompletoExistente = '';
    consecutivo = '';
    version = '';
    versionExistente = '';
    idTipoSolicitudBase = 0;
    tipoCaptura = 0;
    ConsecutivoExistente = false;
}

export class ConsecutivoFiltros {
    filtro = '';
    fechaIni: string = null;
    fechaFin: string = null;
}

export interface TrabajoTipoSolicitud {
    idSolicitud: number;
    nombreTipoSolicitud: string;
    idTipoSolicitud: number;
}

export class ArchivosPorArticulo {
    idSolicitud: number;
    numArticulo: number;
    idArchivo: number;
    nombreArchivo: string;
    usuarioInsert: string;
    fechaInsert: string;
}

export interface ArticuloPorSolicitud {
    idSolicitud: number;
    numArticulo: number;
    articulo: string;
}

export class ArticuloIncluido
{
    idSolicitud = 0;
    numArticulo = 0;
    udArticulo = '';
    articulo = '';
    producto = '';
    papeles = '';
    numTintas = 0;
    estibaMax = 0;
    pesoBruto = 0;
    descripcionCompetidor = '';
    largo = '';
    ancho = '';
    fondo = '';
}

export class Seguimiento {
    idSolicitud = 0;
    esSolicitudMultiple = true;
    idRevision = 0;
    idTipoSolicitud = 0;
    numArticulo = 0;
    ordenAtn = 0;
    fechaAtn = '';
    enAtencion = false;
    modEnAtencion = '';
    idPrioridad = 0;
    responsableAtn = '';
    comentarioAtn = '';
    tipoCaptura = 0;
}
