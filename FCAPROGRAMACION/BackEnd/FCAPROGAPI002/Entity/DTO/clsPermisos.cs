using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class clsPermisos
    {
        public string usuario { get; set; }
        public string aplicacion { get; set; }
        public string propiedad { get; set; }
        public int tipo { get; set; }
        public int permiso { get; set; }
        public bool estatus { get; set; }
    }
}
