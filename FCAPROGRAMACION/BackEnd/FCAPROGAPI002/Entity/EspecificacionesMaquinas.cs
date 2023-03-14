using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class EspecificacionesMaquinas
    {
        public int Restringe { get; set; }
        public string ClaveArticulo { get; set; }
        public string Eproceso { get; set; }
        public string Eprocesocorr { get; set; }
        public string Proceso { get; set; } // Ruta Proceso
        public string Cproceso { get; set; } // Proceso Especial
        public bool Paletizar { get; set; }
        public string ComentariosFabricacion { get; set; }
    }
}
