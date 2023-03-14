using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class FCAPROGDAT017Entity
    {
        public string DiaLetra { get; set; }
        public int Dia { get; set; }
        public string Fecha { get; set; }
        public int Turnos { get; set; }
        public List<Disponibilidad> Lstdisponibilidad { get; set; }
    }

    public class Disponibilidad
    {

        public string Fecha { get; set; }
	    public int Turnos { get; set; }
		public string TipoMaquina { get; set; }
	    public string ClaveMaquina { get; set; }
    }
    public class ResultValDisMaq
    {
        public int DisMaquinaOrigen { get; set; }
        public int DisMaquinaDestino { get; set; }
    }
    public class DisCopiaData
    {
        public string ClaveMaquinaOrigen { get; set; }
        public int AnioOrigen { get; set; }
        public int MesOrigen { get; set; }
        public string ClaveMaquinaDestino { get; set; }
    }
}
