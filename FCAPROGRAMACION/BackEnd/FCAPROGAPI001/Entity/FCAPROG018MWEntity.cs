using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class actualiza{
        public string Programa { get; set; }
        public string SFechaProduccion { get; set; }
        public string HoraInicio { get; set; }
        public string HoraFin { get; set; }
        public string MetrosLineales { get; set; }
        public string MCuadrados { get; set; }
        public string KgPapel { get; set; }
        public string KgDesp { get; set; }
        public string LaminasDespegadas { get; set; }
        public string LaminasCombas { get; set; }
        public string LaminasDesorilladas { get; set; }
        public string Supervisor { get; set; }
        public string Turno { get; set; }
        public string UsuarioSistema { get; set; }
        public string LaminasDesperdicio { get; set; }
        public string IdTripulacion { get; set; }
        public List<actualizaTablas> tablas { get; set; }
}
    public class actualizaTablas
    {
        public string programa { get; set; }
        public string op { get; set; }
        public string turno { get; set; }
        public string numeroCortes { get; set; }
        public string laminasTotal { get; set; }
        public string laminasMalas { get; set; }
    }

    public class modifica {
        public string TurnoChk { get; set; }
        public string SFechaProduccion { get; set; }
        public string HoraInicio { get; set; }
        public string HoraFin { get; set; }
        public string MetrosLineales { get; set; }
        public string MCuadrados { get; set; }
        public string LaminasDespegadas { get; set; }
        public string LaminasCombas { get; set; }
        public string LaminasDesorilladas { get; set; }
        public string Supervisor { get; set; }
        public string UsuarioSistema { get; set; }
        public string KgPapel { get; set; }
        public string LaminasDesperdicio { get; set; }
        public string IdTripulacion { get; set; }
        public string Programa { get; set; }
        public string Turno { get; set; }
        public string sFecha { get; set; }
        public string FolioDesperdicio { get; set; }
        public List<modificaTablas> tablas { get; set; }
    }

    public class modificaTablas {
        public string numCortes { get; set; }
        public string laminas { get; set; }
        public string laminasDesperdicio { get; set; }
        public string kgDesp { get; set; }
        public string programa { get; set; }
        public string turno { get; set; }
        public string oP { get; set; }
        public string sFechaProduccion { get; set; }
        public string laminasTotal { get; set; }
    }
}
