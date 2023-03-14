using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    class FCAPROG017MWEntity
    {
    }

    public class SPActOpc8
    {
        public string ClaveMaquina { get; set; }
        public string LFecha { get; set; }
        public List<secuencia> CAP001TD_001 { get; set; }
        public SPActOpc8()
        {
            CAP001TD_001 = new List<secuencia>();
        }
    }

    public class SPActOpc10
    {
        public string CveMaqOri { get; set; }
        public string CveMaqDes { get; set; }
        public List<datosGridCap016> CAP016TD_001 { get; set; }
        public SPActOpc10()
        {
            CAP016TD_001 = new List<datosGridCap016>();
        }
    }

    public class maquinas
    {
        public string ClaveMaquina { get; set; }
        public string TipoMaquina { get; set; }
        public bool EsCapAut { get; set; }
        public bool ImplementadoAut { get; set; }
    }

    public class estadoMantenimiento
    {
        public bool Estado { get; set; }
    }

    public class secuencia
    {
        public int Value00 { get; set; }
        public string Value01 { get; set; }
        public string Value02 { get; set; }
        public string Value03 { get; set; }
        public int Value04 { get; set; }
        public int Value05 { get; set; }
        public bool Value06 { get; set; }
        public int Value07 { get; set; }
        public bool Value08 { get; set; }
        public string Value09 { get; set; }
        public string Value10 { get; set; }
        public string Value11 { get; set; }
        public int Value12 { get; set; }
        public string Value13 { get; set; }
        public string Value14 { get; set; }
        public int Value15 { get; set; }
        public string Value16 { get; set; }
        public string Value17 { get; set; }
        public string Value18 { get; set; }
        public string Value19 { get; set; }
        public string Value20 { get; set; }
        public string Value21 { get; set; }
        public string Value22 { get; set; }
        public string Value23 { get; set; }
        public bool Value24 { get; set; }
        public bool Value25 { get; set; }
        public bool Value26 { get; set; }
        public double Value27 { get; set; }
        public double Value28 { get; set; }
        public string Value29 { get; set; }
        public double Value30 { get; set; }
        public double Value31 { get; set; }
        public string Value32 { get; set; }
        public bool Value33 { get; set; }
        public bool Value34 { get; set; }

        //public bool UltimoProceso { get; set; }
        //public string OP { get; set; }
        //public string Cliente { get; set; }
        //public string Articulo { get; set; }
        //public int Cantidad { get; set; }
        public double LargoDesarrollo { get; set; }
        public double AnchoDesarrollo { get; set; }
        public string PrimerColor { get; set; }
        public string SegundoColor { get; set; }
        public string TercerColor { get; set; }
        public string CuartoColor { get; set; }
        //public string FechaEntrega { get; set; }
        public int MinutosProduccion { get; set; }
        //public int Orden { get; set; }
        //public int Programa { get; set; }
        //public string Notas { get; set; }
        //public string FijarFecha { get; set; }
        //public string ClaveArticulo { get; set; }
        //public string ClaveArticulo2 { get; set; }
        //public string FechaTermino { get; set; }
        //public string FechaInicio { get; set; }
        //public int Producido { get; set; }
        //public string Estatus { get; set; }
        //public string NotasOperacion { get; set; }
        //public string ClaveProceso { get; set; }
        //public bool Proceso1 { get; set; }
        //public int ProgramaCorr { get; set; }
        //public string FechaCorrug { get; set; }
        //public bool Suspendido { get; set; }
        public bool Electronico { get; set; }
        //public bool Pintado { get; set; }
        public string Status { get; set; }
        public int LiberadoDS { get; set; }
        public double PSI { get; set; }
        //public double LBF { get; set; }
        //public double CompresionEspOtrosLBF { get; set; }
        //public string EProceso { get; set; }
        //public double Minimo { get; set; }
        //public double Maximo { get; set; }
        //public bool ConScore { get; set; }
        public int EnAtencion { get; set; }

        //public int SaldoOP { get; set; }
        //public string Medidas { get; set; }
        //public string Colores { get; set; }
        //public string Tiempo { get; set; }
    }

    public class comentariosOP
    {
        public int IdComentario { get; set; }
        public string Op { get; set; }
        public string Articulo { get; set; }
        public string Comentario { get; set; }
        public string UsuarioAct { get; set; }
        public bool Estatus { get; set; }
        public string Fecha { get; set; }
    }

    public class opsMaquinas
    {
        public int Orden { get; set; }
        public string ClaveMaquina { get; set; }
        public int Cantidad { get; set; }
        public string TipoMaquina { get; set; }
        public int CbxTipoMaquina { get; set; }
    }

    public class objSigProgCap
    {
        public string msjInfo { get; set; }
        public string sigProCap { get; set; }
        public string ultimoTurnoAnterior { get; set; }
        public string primeroTurnoActual { get; set; }
        public string fechaUltRegPLC { get; set; }
        public string turnoUltRegPLC { get; set; }
    }

    public class resultadoCap009
    {
        public string OP { get; set; }
        public string Suaje { get; set; }
        public string AreaUnitaria { get; set; }
        public string LargoLamina { get; set; }
        public string AnchoLamina { get; set; }
        public string PzasSuaje { get; set; }
        public string LargoDesarrollo { get; set; }
        public string AnchoDesarrollo { get; set; }
        public string ClaveArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string Dado { get; set; }
        public string FechaEntrega { get; set; }
        public string Solicitado { get; set; }
        public string Producido { get; set; }
        public string Programado { get; set; }
        public string Existencia { get; set; }
        public string Variacion { get; set; }
        public string Proceso { get; set; }
        public string PrimerColor { get; set; }
        public string SegundoColor { get; set; }
        public string TercerColor { get; set; }
        public string CuartoColor { get; set; }
        public string Colores { get; set; }
        public string RutaProceso { get; set; }
        public string ClavePreparacion { get; set; }
        public string Industria { get; set; }
        public bool Mvt { get; set; }
        public bool ValidaProceso { get; set; }
        public string TxtValidaProceso { get; set; }
        public string ProduccionHora { get; set; }
        public string Flauta { get; set; }
        public bool UnionPegada { get; set; }
        public double PiezasXCorte { get; set; }
        public int Cantidad { get; set; }
        public bool AutAgente { get; set; }
        public int Devuelto { get; set; }
        public bool LiberadoCostos { get; set; }
        public bool Autorizado { get; set; }
        public bool ConScore { get; set; }
        public int CantidadSol { get; set; }
        public int CantidadTras { get; set; }
        public string Clave { get; set; }
        public string Ruta { get; set; }
        public string Resistencia { get; set; }
        public string MaquinaEstablecida { get; set; }
        public string Eproceso { get; set; }
        public bool NoProducir { get; set; }
        public string ClaveCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Status { get; set; }
        public string MsjOp { get; set; }
        public string MsjProducir { get; set; }
        public bool CajaNueva { get; set; }
        public bool Modificacion { get; set; }
        public string Comentarios { get; set; }
        public bool RetrabajoOP { get; set; }
    }

    public class cbxModificaProceso
    {
        public string ClaveProceso { get; set; }
        public string Descripcion { get; set; }
    }

    public class cbxProceso
    {
        public string Descripcion { get; set; }
        public string TProceso { get; set; }
    }

    public class cbxRutaProceso
    {
        public string Clave { get; set; }
        public string Descripcion { get; set; }
    }

    public class ObjCanSigProCap
    {
        public string CanSigProCap { get; set; }
    }

    public class objFechaTurnoTrabajo
    {
        public string Fecha { get; set; }
        public string Hora { get; set; }
        public int Turno { get; set; }
    }

    public class objTieneProduccionRealCapSF
    {
        public int Cuantos { get; set; }
    }

    public class objValidaArt
    {
        public bool ValidaArt { get; set; }
    }

    public class objJustificaciones
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
    }

    public class mdlMdlCap005
    {
        public int Programa { get; set; }
        public string Op { get; set; }
        public int Cantidad { get; set; }
        public string MaqOrigen { get; set; }
        public string CveProceso { get; set; }
        public bool UltimoProceso { get; set; }
        public string Articulo { get; set; }
    }

    public class modelMdlCap005 : mdlMdlCap005
    {
        public string MensajeInvalido { get; set; }
    }

    public class opc17p2
    {
        public double AnchoMax { get; set; }
        public double AnchoMin { get; set; }
        public double LargoMax { get; set; }
        public double LargoMin { get; set; }
    }

    public class objProgramasCap001 : dataObjProgramasCap005
    {
        public List<mdlMdlCap005> Cap005TD_001 { get; set; }
        public objProgramasCap001()
        {
            Cap005TD_001 = new List<mdlMdlCap005>();
        }
    }

    public class dataObjProgramasCap005
    {
        public string txtJustificacion { get; set; }
        public string CveProceso { get; set; }
        public string CveMaquina { get; set; }
        public string OptTipoMaquina { get; set; }
    }

    public class objProgramasCap005 : dataObjProgramasCap005
    {
        public List<modelMdlCap005> Cap005TD_001 { get; set; }
        public objProgramasCap005()
        {
            Cap005TD_001 = new List<modelMdlCap005>();
        }
    }

    public class parSPLecOpc23
    {
        public string Justificacion { get; set; }
        public string Op { get; set; }
        public string ClaveArticulo { get; set; }
        public int Cantidad { get; set; }
        public int Programado { get; set; }
        public int Producido { get; set; }
        public int Solicitado { get; set; }
        public int Variacion { get; set; }
        public string Descripcion { get; set; }
        public string ClaveMaquina { get; set; }
        public string ClaveProceso { get; set; }
        public string MaquinaEstablecida { get; set; }
        public string TipoMaquina { get; set; }
        public double Largo { get; set; }
        public double Ancho { get; set; }
        public int PasoContinua { get; set; }
        public int ProduccionPT { get; set; }
    }

    public class objCap016ValidarTraspasoOps
    {
        public string ClaveMaquina { get; set; }
        public List<datosGridCap016> Cap016TD_001 { get; set; }
        public objCap016ValidarTraspasoOps()
        {
            Cap016TD_001 = new List<datosGridCap016>();
        }
    }

    public class objActOpc4
    {
        public bool InmPost { get; set; }
        public string Justificacion { get; set; }
        public List<secuencia> dataSecuencias { get; set; }
        public List<secuencia> secuenciaSelected { get; set; }
        public objActOpc4()
        {
            dataSecuencias = new List<secuencia>();
            secuenciaSelected = new List<secuencia>();
        }
    }

    public class cap001SuspenderOP
    {
        public bool Suspendido { get; set; }
        public int Programa { get; set; }
    }

    public class datosTraspasarProgramas
    {
        public string ClaveMaquina { get; set; }
        public List<datosGridCap016> dataProgramas { get; set; }
        public datosTraspasarProgramas()
        {
            dataProgramas = new List<datosGridCap016>();
        }
    }

    public class datosGridCap016
    {
        public bool Seleccionado { get; set; }
        public bool UltimoProceso { get; set; }
        public string Op { get; set; }
        public string Cliente { get; set; }
        public string Articulo { get; set; }
        public int Cantidad { get; set; }
        public double LargoDes { get; set; }
        public double AnchoDes { get; set; }
        public string PrimerColor { get; set; }
        public string SegundoColor { get; set; }
        public string TercerColor { get; set; }
        public string CuartoColor { get; set; }
        public string FechaEntrega { get; set; }
        public int MinutosProduccion { get; set; }
        public int Orden { get; set; }
        public int Programa { get; set; }
        public string Notas { get; set; }
        public string FijarFecha { get; set; }
        public string ClaveArticulo { get; set; }
        public string ClaveArticulo2 { get; set; }
        public string FechaTermino { get; set; }
        public string FechaInicio { get; set; }
        public int Producido { get; set; }
        public string Estatus { get; set; }
        public string NotasOperacion { get; set; }
        public string ClaveProceso { get; set; }
        public bool Proceso1 { get; set; }
        public int ProgramaCorr { get; set; }
        public string FechaCorrug { get; set; }
        public bool Suspendido { get; set; }
        public bool Electronico { get; set; }
        public bool Pintado { get; set; }
        public string Status { get; set; }
        public bool LiberadoDS { get; set; }
        public double Psi { get; set; }
        public double Lbf { get; set; }
        public double CompresionEspOtrosLBF { get; set; }
        public string EProceso { get; set; }
        public double Minimo { get; set; }
        public double Maximo { get; set; }
        public bool ConScore { get; set; }
        public bool EnAtencion { get; set; }
    }

    public class cap004FijarFecha
    {
        public int Programa { get; set; }
        public string ClaveMaquina { get; set; }
        public string Op { get; set; }
        public string Fecha { get; set; }
        public bool Quitar { get; set; }
    }

    public class opc18
    {
        public string ZonaERP { get; set; }
        public string ClaveArticulo { get; set; }
        public string Flauta { get; set; }
        public double PiezasXcorte { get; set; }
        public int Cantidad { get; set; }
        public string Descripcion { get; set; }
        public bool ConScore { get; set; }
        public double PiezasXhoja { get; set; }
        public double AreaUnitaria { get; set; }
        public double LargoHoja { get; set; }
        public double AnchoHoja { get; set; }
        public string PrimerColor { get; set; }
        public string SegundoColor { get; set; }
        public string TercerColor { get; set; }
        public string CuartoColor { get; set; }
        public string Suaje { get; set; }
        public string Dado { get; set; }
        public string ClaveProceso { get; set; }
        public string Resistencia { get; set; }
        public double PzasHojaProg { get; set; }
        public bool AutAgente { get; set; }
        public int Devuelto { get; set; }
        public string MaquinaEstablecida { get; set; }
        public bool LiberadoCostos { get; set; }
        public double LargoDesarrollo { get; set; }
        public double AnchoDesarrollo { get; set; }
        public int Programado { get; set; }
        public int Existencia { get; set; }
        public int Producido { get; set; }
        public int Variacion { get; set; }
    }

    public class objSPActOpc6
    {
        public List<mdlMdlCap005> TmpCap005TD_001 { get; set; }
        public List<secuencia> TmpCap001TD_001 { get; set; }
        public objSPActOpc6()
        {
            TmpCap005TD_001 = new List<mdlMdlCap005>();
            TmpCap001TD_001 = new List<secuencia>();
        }
        public bool ImgAtencion { get; set; }
        public string Justificacion { get; set; }
        public string ClaveMaquina { get; set; }
    }
}
