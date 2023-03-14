using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ClavePreparacionDTO
    {
        public string Claveproceso { get; set; }
		public decimal Produccionhora { get; set; }
		public decimal Eficiencia { get; set; }
		public string Descripcion { get; set; }
    }
    public class PreparacionDTO
    {
      public int Programa { get; set; }
      public string ClaveProceso { get; set; }
	  public int MinutosStdPreparacion { get; set; }
      public int VelocidadStd { get; set; }
	  public decimal EficienciaPrograma { get; set; }
	  public int MinutosStdProduccion { get; set; }
    }
}
