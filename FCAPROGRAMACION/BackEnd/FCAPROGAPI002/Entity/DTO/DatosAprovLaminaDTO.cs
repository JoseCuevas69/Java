using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class DatosAprovLaminaDTO
    {
        public bool Correcto { get; set; }
        public object DatosGenerales { get; set; }
        public object MaquinasProcesadas { get; set; }
        public object SecuenciaImpresoras { get; set; }
        public object SecuenciaCorrugadora { get; set; }
        public object SaldoLamina { get; set; }
        public object SaldoExcedentes { get; set; }

    }
}
