using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class clsReserva
    {
        public int idfolio { get; set; }
        public string fechainicio { get; set; }
        public string fechafin { get; set; }
        public string fechainiciopro { get; set; }
        public string fechafinpro { get; set; }
        public int volumen { get; set; }
        public string comentario { get; set; }
        public bool estatus { get; set; }
        public string usuario { get; set; }
    }
}
