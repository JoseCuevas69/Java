using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class FCAPROG016MWEntity
    {
        public string op { get; set; }
    }

    public class Principal
    {
        public bool Prior { get; set; }
        public bool Usar { get; set; }
        public bool Refile { get; set; }
        public string Op { get; set; }
        public string FechaEntrega { get; set; }
        public string Cliente { get; set; }
        public string ClaveArticulo { get; set; }
        public string Articulo { get; set; }
        public int Cantidad { get; set; }
        public string Hojas { get; set; }
        public string Ancho { get; set; }
        public string Largo { get; set; }
        public string Piezas { get; set; }
        public string Resistencia { get; set; }
        public string Flauta { get; set; }
        public int Tkg { get; set; }
        public string Lamina { get; set; }
        public string Parcial { get; set; }
        public string Mas { get; set; }
        public string Mass { get; set; }
        public string Proceso { get; set; }
        public string Procesoo { get; set; }
        public int CantidadTras { get; set; }
        public int CantidadSol { get; set; }
        public bool Autorizado { get; set; }
        public string Autorizadoo { get; set; }
        public string Variacion { get; set; }
        public bool ConScore { get; set; }
        public string TxtConScore { get; set; }
        public int Existencia { get; set; }
        public bool Utilizar { get; set; }
        public int Tm2 { get; set; }
        public int ExcedentePT { get; set; }
        public int ExcedeLamina { get; set; }
        public double CantAnt { get; set; }
    }

    public class Principal2
    {
        public bool Prior { get; set; }
        public bool Usar { get; set; }
        public bool Refile { get; set; }
        public string Op { get; set; }
        public string FechaEntrega { get; set; }
        public string Cliente { get; set; }
        public string ClaveArticulo { get; set; }
        public string Articulo { get; set; }
        public int Cantidad { get; set; }
        public string Hojas { get; set; }
        public double Ancho { get; set; }
        public double Largo { get; set; }
        public double Piezas { get; set; }
        public string Resistencia { get; set; }
        public string Flauta { get; set; }
        public int Tkg { get; set; }
        public string Lamina { get; set; }
        public string Parcial { get; set; }
        public int Mas { get; set; }
        public string Proceso { get; set; }
        public int CantidadTras { get; set; }
        public int CantidadSol { get; set; }
        public bool Autorizado { get; set; }
        public double Variacion { get; set; }
        public bool ConScore { get; set; }
        public int Existencia { get; set; }
        public bool Utilizar { get; set; }
        public int Tm2 { get; set; }
        public int ExcedentePT { get; set; }
        public int ExcedeLamina { get; set; }
        public double CantAnt { get; set; }
    }

    public class ResValidaVariacion
    {
        public string Op { get; set; }
        public string Programa { get; set; }
        public string FechaProduccion { get; set; }
        public double Producidas { get; set; }
    }

    public class ListaDatosPrincipal
    {
        public List<Principal> data { get; set; }
        ListaDatosPrincipal()
        {
            data = new List<Principal>();
        }
    }
}
