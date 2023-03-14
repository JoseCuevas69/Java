using System;

namespace Entity.DTO
{
    public class CapturaListable
    {
        public int MyProperty { get; set; }
        public string MetrosLineales { get; set; }
        public string LaminasDespegadas { get; set; }
        public string LaminasCombas { get; set; }
        public string LaminasDesorilladas { get; set; }
        public string HoraInicio { get; set; }
        public string HoraFinal { get; set; }
        public string Fecha { get; set; }
        public string Supervisor { get; set; }
        public string IdTripulacion { get; set; }
        public string Laminas { get; set; }
        public string LaminasDesperdicio { get; set; }
        public string NumeroCortes { get; set; }
        public string Op { get; set; }
    }


    public class CapturaExistenteListable
    {
        public int Programa { get; set; }
    }
}
