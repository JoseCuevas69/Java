using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class CPLCAP002Entity
    {

    }

    public class ListadoPrincipal
    {
        public bool Usar { get; set; }
        public string Orden { get; set; }
        public string Clave { get; set; }
        public string Ancho { get; set; }
        public string Metros { get; set; }
        public string CostoM2 { get; set; }
        public string PesoM2 { get; set; }
        public string MullenMax { get; set; }

        public string Liner1 { get; set; }
        public string EmpalmeL1 { get; set; }
        public string Corrg1 { get; set; }
        public string EmpalmeC1 { get; set; }

        public string Liner2 { get; set; }
        public string EmpalmeL2 { get; set; }
        public string Corrg2 { get; set; }
        public string EmpalmeC2 { get; set; }

        public string Liner3 { get; set; }
        public string EmpalmeL3 { get; set; }
        public string Corrg3 { get; set; }
        public string EmpalmeC3 { get; set; }

        public string Liner4 { get; set; }
        public string EmpalmeL4 { get; set; }

        public string AnchoL1 { get; set; }
        public string AnchoEmpalme1 { get; set; }
        public string AnchoL2 { get; set; }
        public string AnchoEmpalme2 { get; set; }
        public string AnchoL3 { get; set; }
        public string AnchoEmpalme3 { get; set; }
        public string AnchoL4 { get; set; }
        public string AnchoEmpalme4 { get; set; }

        public string AnchoC1 { get; set; }
        public string AnchoEmpalmeC1 { get; set; }
        public string AnchoC2 { get; set; }
        public string AnchoEmpalmeC2 { get; set; }
        public string AnchoC3 { get; set; }
        public string AnchoEmpalmeC3 { get; set; }
    }

    public class ClaveResistenciaProceso
    {
        public string ClaveResistencia { get; set; }
        public string ClaveProceso { get; set; }
    }

    public class ExistePapel
    {
        public string ClavePapel { get; set; }
        public string Msj { get; set; }
        public bool Estatus { get; set; }
    }

    public class ExistenciaPapel
    {
        public double Existencia { get; set; }
        public string Alma { get; set; }
        public double Ancho { get; set; }
    }

    public class RollosTransito
    {
        public string Papel { get; set; }
        public double Ancho { get; set; }
        public double Cantidad { get; set; }
        public string FechaEstLlegada { get; set; }
    }

    public class CplDat002
    {
        public int Opc { get; set; }
        public string ClaveProceso { get; set; }
    }

    public class CplDat002Entity2
    {
        public string Clave { get; set; }
        public bool Usar { get; set; }
    }

    public class CplDat002Entity
    {
        public string Orden { get; set; }
        public bool Pulg { get; set; }
        public string Clave {get;set;}
        public string Liner1 { get;set;}
        public string Corrugado1 { get;set;}
        public string Liner2 { get;set;}
        public string Corrugado2 { get;set;}
        public string Liner3 { get;set;}
        public string Corrugado3 { get;set;}
        public string Liner4 { get;set;}
        public string Empalme1 { get;set;}
        public string Empalme2 { get;set;}
        public string Empalme3 { get;set;}
        public string Empalme4 { get;set;}
        public string EmpalmeC1 { get;set;}
        public string EmpalmeC2 { get;set;}
        public string EmpalmeC3 { get;set;}
        public string AnchoL1 { get;set;}
        public string AnchoEmpalme1 { get;set;}
        public string AnchoL2 { get;set;}
        public string AnchoEmpalme2 { get;set;}
        public string AnchoL3 { get;set;}
        public string AnchoEmpalme3 { get;set;}
        public string AnchoL4 { get;set;}
        public string AnchoEmpalme4 { get;set;}
        public string AnchoC1 { get;set;}
        public string AnchoEmpalmeC1 { get;set;}
        public string AnchoC2 { get;set;}
        public string AnchoEmpalmeC2 { get;set;}
        public string AnchoC3 { get;set;}
        public string AnchoEmpalmeC3 { get;set;}
        public string Ancho { get;set;}
    }

    public class ListaCplCap002 : CplDat002
    {
        public List<CplDat002Entity> ListaDatos { get; set; }
        public List<CplDat002Entity2> ListaDatos2 { get; set; }
        public ListaCplCap002()
        {
            ListaDatos = new List<CplDat002Entity>();
            ListaDatos2 = new List<CplDat002Entity2>();
        }
    }

    public class PapelesDefaultCotizacion
    {
        public string ClaveArticulo { get; set; }
        public string Liner1 { get; set; }
        public string Corrugado1 { get; set; }
        public string Liner2 { get; set; }
        public string Corrugado2 { get; set; }
        public string CvePreparacion { get; set; }
        public string Liner3 { get; set; }
        public string Corrugado3 { get; set; }
        public string Liner4 { get; set; }
        public string OP { get; set; }
        public string Flauta { get; set; }
        public string Papel { get; set; }
        public string Impermeabilizado { get; set; }
    }

    public class CbxPreparacion
    {
        public string ClaveProceso { get; set; }
        public string Descripcion { get; set; }
    }
}
