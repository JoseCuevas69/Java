using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class CombinacionEstandarPapel
    {
        public string ClaveArticulo { get; set; }
        public string Liner1 { get; set; }
        public string Corrugado1 { get; set; }
        public string Liner2 { get; set; }
        public string Corrugado2 { get; set; }
        public string Liner3 { get; set; }
        public string Corrugado3 { get; set; }
        public string Liner4 { get; set; }
        public decimal AnchoStd { get; set; }
        public decimal TrimStd { get; set; }
        public decimal AnchoOptimo { get; set; }
        public decimal TrimOptimo { get; set; }
        public string CvePreparacion { get; set; }
        public string Descripcion { get; set; }
        public int Proceso { get; set; }
        public string Cproceso { get; set; }
        public int Pallet { get; set; }
        public string Comentarios { get; set; }
        public string Eproceso { get; set; }
        public string EProcesoCorr { get; set; }
        public bool HandHold { get; set; }
        public bool Parafinado { get; set; }
        public bool Troquel { get; set; }
        public bool StringKing { get; set; }
        public bool ConScore { get; set; }
        public int NScore { get; set; }
        public bool Impremeabilizado { get; set; }
        public bool AplicaSelloFecheroImp { get; set; }
        public decimal PesoM2 { get; set; }
        public bool Existe { get; set; }
    }
}
