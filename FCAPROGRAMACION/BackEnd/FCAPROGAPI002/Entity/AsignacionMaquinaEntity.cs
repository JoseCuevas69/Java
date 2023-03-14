using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class AsignacionMaquinaEntity
    {
        public int MaquinaOrden { get; set; }
        public string ClaveArticulo { get; set; }
        public string ClaveMaquina { get; set; }
        public int Activo { get; set; }
        public int Estatus { get; set; }
        public string UsuarioInsert { get; set; }
        public DateTime? FechaInsert { get; set; }
        public string UsuarioUpdate { get; set; }
        public DateTime? FechaUpdate { get; set; }
        public string UsuarioDelete { get; set; }
        public DateTime? FechaDelete { get; set; }
    }
}