using System;

namespace Entity.DTO
{
    public class ProgramaListable
    {
        public decimal AnchoPromedio { get; set; }
        public string Estatus { get; set; }
        public DateTime? FechaSistema { get; set; }
        public string HoraSistema { get; set; }
        public string Op { get; set; }
        public decimal PiezaCorte { get; set; }
        public short HojasCorte { get; set; }
        public bool LiberadoCostos { get; set; }
        public decimal AnchoHoja { get; set; }
        public decimal LargoHoja { get; set; }
        public double AreaUnitaria { get; set; }
        public string Articulo { get; set; }
    }
}
