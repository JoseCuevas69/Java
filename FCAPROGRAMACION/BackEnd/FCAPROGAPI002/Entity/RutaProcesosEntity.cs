using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class EncabezadoRutaProcesosEntity
    {
		public string Clave { get; set; }
		public string Descripcion { get; set; }
		public string M1 { get; set; }
		public string M2 { get; set; }
		public string M3 { get; set; }
		public string M4 { get; set; }
		public string M5 { get; set; }
		public string HorasAdicional { get; set; }
		public bool UnionPegada { get; set; }

	}

	public class DetalleRutaProcesos
	{
		//public string ClaveProceso { get; set; }
		public int MaquinaOrden {get;set;}
		public int TipoMaquina {get;set;}
		public bool Pegar {get;set;}
		public bool Mx2 {get;set;}
	}

	public class ProcesosRutas
	{
		public bool Selec { get; set; }
		public int TProceso { get; set; }
		public string Descripcion { get; set; }
	}
	public class EncabezadoDetalleRuta
	{
		public EncabezadoRutaProcesosEntity Encabezado { get; set; }
		public DetalleRutaProcesos[] DetalleRutas { get; set; }
	}
}
