using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class SecuenciaCorrugadoraGeneralDTO
    {
        public string Op { get; set; }
        public string Indice { get; set; }
        public int Orden { get; set; }
        public int Programa { get; set; }
        public decimal AnchoPromedio { get; set; }
        public string Resistencia { get; set; }
        public string Flauta { get; set; }
        public string ClaveProceso { get; set; }
        public string KgPapel { get; set; }
        public int Minutosstdproduccion { get; set; }
        public string Fecha { get; set; }
        public string HoraPrograma { get; set; }
        public int MetrosLineales { get; set; }
        public bool EnProceso { get; set; }
        public string ClaveArticulo { get; set; }
        public int TmpStd { get; set; }
        public string Horas { get; set; }
        public string FijarFecha { get; set; }
        public string Status { get; set; }
        public string Comentarios { get; set; }
        public string ComentariosCorr { get; set; }
        public bool LiberadoDS { get; set; }
        public string EProceso { get; set; }
        public string eprocesoCorr { get; set; }
        public string Liner1 { get; set; }
        public decimal AnchoL1 { get; set; }
        public string Liner2 { get; set; }
        public decimal AnchoL2 { get; set; }
        public string Liner3 { get; set; }
        public decimal AnchoL3 { get; set; }
        public string Liner4 { get; set; }
        public decimal AnchoL4 { get; set; }
        public string Variacion { get; set; }
        public string Corrugado1 { get; set; }
        public decimal AnchoC1 { get; set; }
        public string Corrugado2 { get; set; }
        public decimal AnchoC2 { get; set; }
        public string Corrugado3 { get; set; }
        public decimal AnchoC3 { get; set; }
        public string BioPapel { get; set; }
        public bool MVT { get; set; }
        public string ComentariosMVT { get; set; }
    }
    public class BuscarOpDTO
    {
        public string Op { get; set; }
        public string ClaveArticulo { get; set; }
        public string Descripcion { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public int Programa { get; set; }
    }
    public class SubirOrdenDTO {
       public int Programa { get; set; }
       public int OrdenEsp { get; set; }
       public int OrdenAct { get; set; }
    }
    public class ProcesoRevicionExistenciaDTO
    {
        public int Programa { get; set; }
        public string CvePapel { get; set; }
        public decimal Ancho { get; set; }
        public decimal Kilos { get; set; }
        public decimal Saldo { get; set; }
        public bool Pintar { get; set; }
    }
    public class ProgramasDTO
    {
        public bool opApoyoMaquila { get; set; }
        public string TipoAcabado { get; set; }
        public string ClaveArticulo { get; set; }
        public string descripcion { get; set; }
        public string op { get; set; }
        public int Orden { get; set; }
        public int Programa { get; set; }
        public decimal AnchoPromedio { get; set; }
        public string Resistencia { get; set; }
        public string Flauta { get; set; }
        public string ClaveProceso { get; set; }
        public decimal KgPapel { get; set; }
        public int minutosstdproduccion { get; set; }
        public string Fecha { get; set; }
        public string Comentarios { get; set; }
        public int MetrosLineales { get; set; }
        public int Secuencia { get; set; }
        public string FijarFecha { get; set; }
        public string ComentArt { get; set; }
        public string Proceso { get; set; }
        public string Especificacion { get; set; }
        public string EProceso { get; set; }
        public  bool MVT { get; set; }
        public string ComentariosMVT { get; set; }

    }
    public class VelocidadStdCorrDTO
    {
        public decimal VelocidadStdCorr { get; set; }
        public decimal SetUp { get; set; }
    }

    public class TiempoEstandarPrepDTO
    {
       public int Tiempostd { get; set; }
	   public decimal Eficiencia { get; set; }
    }
    public class MaquinaEficienciaDTO
    {
        public decimal Eficiencia { get; set; }
    }
    public class ValidaEstatusOP
    {
        public string OP { get; set; }
        public string Estatus { get; set; }
    }
    public class ValidaOpApoyo
    {
        public string OP { get; set; }
    }
    public class PermitirProgramarOP
    {
        public string OP { get; set; }
        public string ClaveArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string ClaveCliente { get; set; }
        public bool esCecso { get; set; }
        public string NombreCliente { get; set; }
        public int TipoCliente { get; set; }
        public string Agente { get; set; }
        public string ClaveRepresentante { get; set; }
        public string Representante { get; set; }
        public string CorreoRepresentante { get; set; }
        public string ClaveEjecutivo { get; set; }
        public string NombEjecutivo { get; set; }
        public string CorreoEjecutivo { get; set; }
        public decimal CantidadPro { get; set; }
    }
    public class ValidacionEliminados
    {
        public int FolioEmbarque { get; set; }
        public string OP { get; set; }
        public int CantidadSolicitada { get; set; }
        public int Antiguedad { get; set; }
    }
    public class ProcesoRadigrafias
    {
        public string Mensaje { get; set; }
        public int ID { get; set; }
        public string Articulo { get; set; }
        public string Motivo { get; set; }
        public string OP { get; set; }
    }
    public class PesoUnitarioDTO
    {
        public int Programa { get; set; }
		public string Op { get; set; }
	    public string ClaveArticulo { get; set; }
        public string Descripcion { get; set; }
	    public decimal Minimo { get; set; }
        public decimal Maximo { get; set; }
    }
    public class Actualiza
    {
        public List<ActualizaDTO> dtos { get; set; }
    }
    public class ActualizaDTO
    {
       public int Programa { get; set; }
       public int Orden { get; set; }
       public string Comentarios { get; set; }
       public string HoraPrograma { get; set; }
       public string FijarFecha { get; set; }
       public string Horas { get; set; }
    }
    public class VerificadorPapelesDTO
    {
        public string Papel { get; set; }
	    public decimal Ancho { get; set; }
        public decimal TonProg { get; set; }
        public decimal Existencia { get; set; }
    }
    public class ValidarCombinacionDTO
    {
        public int Programa { get; set; }
        public int Folio { get; set; }
        public string Op { get; set; }
    }

}
