using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class EstandaresImpEntity
    {
        public string TipoMaquina { get; set; }
        public string ClaveMaquina { get; set; }
        public string ClaveProceso { get; set; }
        public string Descripcion { get; set; }
        public int TiempoStd { get; set; }
        public double Eficiencia { get; set; }
        public double VelocidadObjetivo { get; set; }

    }

    public class Maquinas
    {
        public string ClaveMaquina { get; set; }
        public string Nombre { get; set; }
    }

    public class Procesos
    {
        public string ClaveProceso { get; set; }
        public string Descripcion { get; set; }
    }

    public class VelocidadEstandar
    {
        public string ClaveMaquina { get; set; }
        public float AreaInicial { get; set; }
        public float AreaFinal { get; set; }
        public float VelocidadStd { get; set; }

    }

    public class HorariosComida
    {
        public string ClaveArea { get; set; }
        public string Descripcion { get; set; }
        public string Turno { get; set; }
        public string HoraInicio { get; set; }
        public string HoraFinal { get; set; }
        public string ClaveMaquina { get; set; }

    }
}
