using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class MetrosCuadradosPorPapel
    {
        public int id { get; set;}
        public string papel { get; set;}
        public decimal gramaje { get; set; }
        public decimal factor { get; set; }
        public decimal gramajeXFactor { get; set; }
        public decimal pegamento { get; set; }
        public decimal pesoM2 { get; set; }
        public decimal AnchoStd { get; set; }
        public decimal TrimStd { get; set; }
        public decimal AnchoOptimo { get; set; }
        public decimal TrimOptimo { get; set; }
    }
}
