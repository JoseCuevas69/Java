using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class CPLCAP003Entity
    {

    }

    public class ParametrosCPLCAP003
    {
        public int Id { get; set; }
        public bool ResistenciaAfines { get; set; }
        public double RefileMaximo { get; set; }
        public double RefileMinimo { get; set; }
        public double DiasAdelantadoFE { get; set; }
        public bool TodosAnchos { get; set; }
        public double AnchosCalculo { get; set; }
        public double LargoMinProgr { get; set; }
        public double AumentoPedido { get; set; }
        public double ScoresMaximos { get; set; }
    }

    public class DatosComboCPLCAP003
    {
        public int Codigo { get; set; }
        public string Descripcion { get; set; }
        public double Cantidad { get; set; }
    }
}
