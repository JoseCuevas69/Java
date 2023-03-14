using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class KgPapelCalculado
    {
        //public int programa { get; set; }
        public int Programa { get; set; }

        public string Flauta1 { get; set; }
        public string Flauta2 { get; set; }
        public string Flauta3 { get; set; }

        public string Liner1 { get; set; }
        public decimal? AnchoL1 { get; set; }
        public string Empalme1 { get; set; }
        public decimal? AnchoEmpalme1 { get; set; }

        public string Liner2 { get; set; }
        public decimal? AnchoL2 { get; set; }
        public string Empalme2 { get; set; }
        public decimal? AnchoEmpalme2 { get; set; }

        public string Liner3 { get; set; }
        public decimal? AnchoL3 { get; set; }
        public string Empalme3 { get; set; }
        public decimal? AnchoEmpalme3 { get; set; }

        public string Liner4 { get; set; }
        public decimal? AnchoL4 { get; set; }
        public string Empalme4 { get; set; }
        public decimal? AnchoEmpalme4 { get; set; }

        public string Corrugado1 { get; set; }
        public decimal? AnchoC1 { get; set; }
        public string EmpalmeC1 { get; set; }
        public decimal? AnchoEmpalmeC1 { get; set; }

        public string Corrugado2 { get; set; }
        public decimal? AnchoC2 { get; set; }
        public string EmpalmeC2 { get; set; }
        public decimal? AnchoEmpalmeC2 { get; set; }

        public string Corrugado3 { get; set; }
        public decimal? AnchoC3 { get; set; }
        public string EmpalmeC3 { get; set; }
        public decimal? AnchoEmpalmeC3 { get; set; }
       

        //public string ModuloInsert { get; set; }
        //public DateTime? FechaInsert { get; set; }
        //public string UsuarioInsert { get; set; }
        //public string UsuarioUpdate { get; set; }
        //public DateTime? FechaUpdate { get; set; }
        //public string ModuloUpdete { get; set; }
        //public string CombinacionPapel { get; set; }
    }

    public class GramajeListable
    {
        public decimal gramaje { get;}
    }
}
