using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class FiltrosReporteDTO
    {
        public int Anio { get; set; }
        public int Mes { get; set; }
        public string AntiguedadDia { get; set; }
        public int AntiguedadIguala { get; set; }
        public int Almacen { get; set; }
        public int NumRollo { get; set; }
        public string FechaFinDeMes { get; set; }
        public bool Cierre { get; set; }
    }

    public class CierreMesDTO
    {
        public string FechaEntrada { get; set; }
        public string Almacen { get; set; }
        public string Articulo { get; set; }
        public string TipoPapel { get; set; }
        public decimal Ancho { get; set; }
        public string Unidad { get; set; }
        public string LineaCola { get; set; }
        public int Maquina {get; set; }
        public string Especificacion { get; set; }
        public int Existencia { get; set; }
        public int MTSLIN { get; set; }
        public int DiasAntiguedad { get; set; }
    }
    public class VerificaRestosRollosDTO
    {
        public string Nombre { get; set; }
        public string Articulo { get; set; }
        public decimal SaldoActual { get; set; }

    }
}