using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class CPLCAP005Entity
    {
    }

    public class CPLDAT009
    {
        public int ID { get; set; }
        public string OP1 { get; set; }
        public string Fecha1 { get; set; }
        public double Multiplos1 { get; set; }
        public double Ancho1 { get; set; }
        public double Largo1 { get; set; }
        public int Lam1 { get; set; }
        public int Piezas1 { get; set; }
        public string OP2 { get; set; }
        public string Fecha2 { get; set; }
        public double Multiplos2 { get; set; }
        public double Ancho2 { get; set; }
        public double Largo2 { get; set; }
        public int Lam2 { get; set; }
        public int Piezas2 { get; set; }
        public string OP3 { get; set; }
        public string Fecha3 { get; set; }
        public double Multiplos3 { get; set; }
        public double Ancho3 { get; set; }
        public double Largo3 { get; set; }
        public int Lam3 { get; set; }
        public int Piezas3 { get; set; }
        public double AnchoTotal { get; set; }
        public double AnchoPapel { get; set; }
        public double Refile { get; set; }
        public double MetrosLineales { get; set; }
        public string Producto1 { get; set; }
        public string Producto2 { get; set; }
        public string Producto3 { get; set; }
        public int Parcial1 { get; set; }
        public int Parcial2 { get; set; }
        public int Parcial3 { get; set; }
        public int Puntos { get; set; }
        public string Resistencia { get; set; }
        public string Flauta { get; set; }
        public bool Tranf { get; set; }
        public string Empate { get; set; }
        public string Cliente1 { get; set; }
        public string Articulo1 { get; set; }
        public string Cliente2 { get; set; }
        public string Articulo2 { get; set; }
        public string Cliente3 { get; set; }
        public string Articulo3 { get; set; }
        public string Rest1 { get; set; }
        public string Rest2 { get; set; }
        public string Rest3 { get; set; }
        public bool ConScore { get; set; }
        public bool ConScore2 { get; set; }
        public bool ConScore3 { get; set; }
        public double AnchoStd { get; set; }
        public bool Seleccionado { get; set; }
        public bool ErrorResistencia { get; set; }
        public bool Pintado1 { get; set; }
        public bool Pintado2 { get; set; }
        public bool Pintado3 { get; set; }
    }

    public class CPLDAT009TD_002
    {
        public string pModulo { get; set; }
        public bool pCuchillas3 { get; set; }
        public string pResistencia { get; set; }
        public List<CPLDAT009> datos { get; set; }
        public CPLDAT009TD_002()
        {
            datos = new List<CPLDAT009>();
        }
    }

    public class ResData
    {
        public int Id { get; set; }
        public int Secuencia { get; set; }
        public string OP { get; set; }
        public string Fecha { get; set; }
        public double Multiplos { get; set; }
        public double Ancho { get; set; }
        public double Largo { get; set; }
        public int Lam { get; set; }
        public double AnchoTotal { get; set; }
        public double AnchoPapel { get; set; }
        public double Refile { get; set; }
        public double MetrosLineales { get; set; }
        public string Producto { get; set; }
        public int Parcial { get; set; }
        public int Puntos { get; set; }
        public string Resistencia { get; set; }
        public string Flauta { get; set; }
        public string Cliente { get; set; }
        public string Articulo { get; set; }
        public bool ConScore { get; set; }
        public double AnchoStd { get; set; }
        public int Producido { get; set; }
        public int Cantidad { get; set; }
        public int Devuelto { get; set; }
        public int Cortes { get; set; }
        public double Piezas { get; set; }
        public int Hojas { get; set; }
        public bool ProduccionCompleta { get; set; }
        public int PTActual { get; set; }
        public int TrasENT { get; set; }
        public int TrasSAL { get; set; }
        public string OpValidar { get; set; }
        public int PiezasX { get; set; }
        public string UltFecha { get; set; }
        public string Adicional { get; set; }
        public bool HayAdicional { get; set; }
        public bool Cancelar { get; set; }
    }

    public class TotalesCPLDAT009
    {
        public string refProm { get; set; }
        public string m2 { get; set; }
        public string ml { get; set; }
    }


    public class Variaciones
    {
        public int Id { get; set; }
        public double Variacion { get; set; }
    }

    public class ResistenciasProgramacionNormal
    {
        public string Clave { get; set; }
    }

    public class ParametrosCPLDAT006
    {
        public int Id { get; set; }
        public bool ResisteniasAfines { get; set; }
        public int RefileMaximo { get; set; }
        public int RefileMinimo { get; set; }
        public int DiasAdelanto { get; set; }
        public bool TodosAnchos { get; set; }
        public double AnchoCalculo { get; set; }
        public int LargoMinimo { get; set; }
        public int Excedente { get; set; }
        public int Scores { get; set; }
    }

    public class AnchosCPLDAT003
    {
        public double Ancho { get; set; }
        public bool Usar { get; set; }
        public double Pulgadas { get; set; }
        public int Extra { get; set; }
    }

    public class ListaDataAnchosCPLDAT003
    {
        public List<AnchosCPLDAT003> Datos { get; set; }
        public ListaDataAnchosCPLDAT003()
        {
            Datos = new List<AnchosCPLDAT003>();
        }
    }

    public class TOpAnalizando
    {
        public string OrdenProduccion { get; set; }
        public string Cliente { get; set; }
        public string ClaveArticulo { get; set; }
        public string Articulo { get; set; }
        public int Cantidad { get; set; }
        public DateTime FechaEntrega { get; set; }
        public int Programadas { get; set; }
        public double Largo { get; set; }
        public double Ancho { get; set; }
        public double Piezas { get; set; }
        public string Resistencia { get; set; }
        public int Faltan { get; set; }
        public int Hojas { get; set; }
        public int Tkg { get; set; }
        public int TM2 { get; set; }
        public string Parcial { get; set; }
        public string Lamina { get; set; }
        public string Flauta { get; set; }
        public int Mas { get; set; }
        public bool Prior { get; set; }
        public bool Utilizar { get; set; }
        public bool Refile { get; set; }
        public int NScores { get; set; }
        public bool ConScore { get; set; }
        public string Cproceso { get; set; }
    }

    public class CPLDAT008ArreglosPosibles
    {
        public int Id { get; set; }

        public string Op1 { get; set; }
        public DateTime Fecha1 { get; set; }
        public double Multiplos1 { get; set; }
        public double Ancho1 { get; set; }
        public double Largo1 { get; set; }
        public int Lam1 { get; set; }
        public int Piezas1 { get; set; }

        public string Op2 { get; set; }
        public DateTime Fecha2 { get; set; }
        public double Multiplos2 { get; set; }
        public double Ancho2 { get; set; }
        public double Largo2 { get; set; }
        public int Lam2 { get; set; }
        public int Piezas2 { get; set; }

        public string Op3 { get; set; }
        public DateTime Fecha3 { get; set; }
        public double Multiplos3 { get; set; }
        public double Ancho3 { get; set; }
        public double Largo3 { get; set; }
        public int Lam3 { get; set; }
        public int Piezas3 { get; set; }

        public double AnchoTotal { get; set; }
        public double AnchoPapel { get; set; }
        public double Refile { get; set; }
        public int MetrosLineales { get; set; }
        public string Producto1 { get; set; }
        public string Producto2 { get; set; }
        public string Producto3 { get; set; }
        public int Parcial1 { get; set; }
        public int Parcial2 { get; set; }
        public int Parcial3 { get; set; }
        public int Puntos { get; set; }
        public string Resistencia { get; set; }
        public string Flauta { get; set; }
        public bool Tranf { get; set; }
        public string Cliente1 { get; set; }
        public string Articulo1 { get; set; }
        public string Cliente2 { get; set; }
        public string Articulo2 { get; set; }
        public string Cliente3 { get; set; }
        public string Articulo3 { get; set; }
        public string Empate { get; set; }
        public int Marca { get; set; }
        public string Rest1 { get; set; }
        public string Rest2 { get; set; }
        public bool ConScore { get; set; }
        public bool ConScore2 { get; set; }
        public bool ConScore3 { get; set; }

        public double PuntosMax { get; set; }
    }

    public class AnchoSTD
    {
        public string AnchoStd { get; set; }
    }

    public class ResutladoValidacion
    {
        public int Id { get; set; }
        public string Op { get; set; }
        public string Liner1 { get; set; }
        public string PresentacionArticulo { get; set; }
        public string PresentacionPapel { get; set; }
        public bool PintaCorr { get; set; }
        public bool PintaImp { get; set; }
        public bool Validar { get; set; }
    }

    public class clsConfiguracion
    {
        public int idsesion { get; set; }
        public string usuarioERP { get; set; }
        public string resistencia { get; set; }
        public string numcuchillas { get; set; }
        public bool esactivo { get; set; }
       
    }
}
