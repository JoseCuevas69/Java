using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ProgramaImpresorasDinamico
    {
    }
    public class CatMaquinasDTO
    {
		public int Tproceso { get; set; }
		public string ClaveMaquina { get; set; }
		public decimal AnchoMin { get; set; }
		public decimal AnchoMax { get; set; }
		public decimal LargoMin { get; set; }
		public decimal LargoMax { get; set; }
		public bool MaqDefault { get; set; }
		public int Tintasmax { get; set; }
		public int ProduccionHora { get; set; }
		public string TipoMaquina { get; set; }

	}
	public class OPsPogramarImpresorasDTO
	{
		public int Programa { get; set; }
		public string Op { get; set; }
		public decimal Cantidad { get; set; }
		public string Proceso { get; set; }
		public string ClaveArticulo { get; set; }
		public string Cliente { get; set; }
		public string Articulo { get; set; }
		public int Solicitado { get; set; }
		public int Devuelto { get; set; }
		public bool PintadoImp { get; set; }
		public decimal Area { get; set; }
		public string EProceso { get; set; }
		public string Notas { get; set; }
		public string ClavePreparacion { get; set; }
		public bool MVT { get; set; }
	}
	public class ProgramaLis
	{
		public List<ProgramaAUX> Programas { get; set; }

		ProgramaLis()
		{
			Programas = new List<ProgramaAUX>();
		}
	}
	public class ProgramaAUX
	{
		public int Programa { get; set; }
	}
	public class OtrosDatosDTO
	{
		public int Programado { get; set; }
		public int Producido { get; set; }
		public decimal Variacion { get; set; }
	}
	public class ValidarArticuloDTO
	{
		public bool OpApoyoMaquila { get; set; }
		public string TipoAcabado { get; set; }
		public decimal Areaunitaria { get; set; }
		public decimal Largo { get; set; }
		public decimal Ancho { get; set; }
		public decimal Piezas { get; set; }
		public string Suaje { get; set; }
		public string Dado { get; set; }
		public decimal LargoDesarrollo { get; set; }
		public decimal AnchoDesarrollo { get; set; }
		public string Clavepreparacion { get; set; }
		public string Primercolor { get; set; }
		public string Segundocolor { get; set; }
		public string Tercercolor { get; set; }
		public string Cuartocolor { get; set; }
		public string Proceso { get; set; }
		public bool Parafinado { get; set; }
		public bool Pallet { get; set; }
		public string MaquinaEstablecida { get; set; }
		public string Diseno { get; set; }
		public int Cantidad { get; set; }
		public string Fechaentrega { get; set; }
		public int Colores { get; set; }
	}
	public class RutaProcMaquinasDTO
	{
		public int MaquinaOrden { get; set; } 
		public int TipoMaquina { get; set; }
		public bool Pegar { get; set; }
		public string Maquina { get; set; }
		public string TipoMaquinaProc { get; set; }
		public int Tproceso { get; set; }
		public bool Mx2 { get; set; }
	}
	public class MaquinaEstablecidaDTO
	{
		public int MaquinaOrden { get; set; }
		public string ClaveArticulo { get; set; }
		public string ClaveMaquina { get; set; }
		public bool Activo { get; set; }
	}
	public class ProgImpresoraDinamico
	{
		public string TPrepa { get; set; }
		public string ClaveArticulo { get; set; }
		public int lProcesoTipo { get; set; }
		public string MaqEstab { get; set; }
		public string lMaquina { get; set; }
		public string lTipoMaquina { get; set; }
		public string OP { get; set; }
		public string Zona { get; set; }
		public bool mx2 { get; set; }
		public int cont { get; set; }
		public int SegP { get; set; }
		public decimal lDesLargo { get; set; }
		public decimal lDesAncho { get; set; }
		public decimal Largo { get; set; }
		public decimal Ancho { get; set; }
		public string lMaquinaNoProgramar { get; set; }
		public decimal ldArea { get; set; }
		public decimal AreaH { get; set; }
		public int lNumProceso { get; set; }
		public int PzsCrt { get; set; }
		public bool wPallet { get; set; }
		public int Cantidad { get; set; }
		public int lUltimoProceso { get; set; }
		public string lFechaProgImp { get; set; }
		public int StdPrepImp { get; set; }
		public bool esMVT { get; set; }

	}
	public class ProgHisFabricacion
	{
		public string Texto { get; set; }
		public string lMaquina { get; set; }
		public bool NoProgramar { get; set; }
		public string lFechaProgImp { get; set; }
		public string lFechaProg { get; set; }
		public string lMaqNoProg { get; set; }
		public decimal lLargo { get; set; }
		public decimal lAncho { get; set; }
		public bool esMVT { get; set; }
		public string TPrepa { get; set; }
		public bool BalanceMaquina { get; set; }
		public int StdPrepImp { get; set; }
	}
	public class BalanceMaquinasDTO
	{
		public bool BalanceMaquinas { get; set; }
		public string lMaquina { get; set; }
		public string lFechaCarga { get; set; }
	}
	public class VelocidadDTO
	{
		public string Texto { get; set; }
		public int lPiezas { get; set; }
		public decimal VelocImp { get; set; }
		public decimal lEficImp { get; set; }
		public string PXSe { get; set; }
		public int lPzasPallet { get; set; }
		public decimal TmpoEstImp { get; set; }
		public decimal DblFactor { get; set; }
		public int IntPorcentajeFPC { get; set; }
		public int lPrograma { get; set; }
		public int NSX { get; set; }
		public string lFechaTerImp { get; set; }
		public bool lTransaccion { get; set; }
		public string unionPegada { get; set; }
		public string industria { get; set; }
		public string xClaveArticulo { get; set; }
		public bool wPallet { get; set; }
		public int Cantidad { get; set; }
		public int PzsCrt { get; set; }
		public decimal StdPrepImp { get; set; }
		public bool ContinuarSiguenteSecu { get; set; }
	}
	public class ProgImpresorasDinamico
	{
		public int programa { get; set; }
		public int Orden { get; set; }
		public string ClaveMaquina { get; set; }
		public string op { get; set; }
		public string fechaentrega { get; set; }
		public int cantidad { get; set; }
		public string claveproceso { get; set; }
		public string suaje { get; set; }
		public string dado { get; set; }
		public decimal piezascorte { get; set; }
		public bool ultimoproceso { get; set; }
		public int minutospreparacion { get; set; }
		public int minutosproduccion { get; set; }
		public string  estatus { get; set; }
		public string Primercolor { get; set; }
		public string Segundocolor { get; set; }
		public string Tercerocolor { get; set; }
		public string CuartoColor { get; set; }
		public bool imprime { get; set; }
		public bool pegado { get; set; }
		public string tipomaquina { get; set; }
		public decimal velocidadstd { get; set; }
		public string Notas { get; set; }
		public decimal medida1 { get; set; }
		public decimal medida2 { get; set; }
		public int tproceso { get; set; }
		public int programacorr { get; set; }
		public string fechainicio { get; set; }
		public string fechatermino { get; set; }
		public bool proceso1 { get; set; }
		public decimal eficiencia { get; set; }
		public bool Pintado { get; set; }
		public int PorcentajeFPC { get; set; }
		public string EProceso { get; set; }
		public int DesVelSTD { get; set; }
		public string VersionModulo { get; set; }
	}
}
