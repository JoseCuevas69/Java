using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ArticuloDTO
    {
        public decimal PiezasXHoja { get; set; }
        public string claveDiseno { get; set; }
		public string ClaveArticulo { get; set; }
		public decimal AnchoHoja { get; set; }
		public decimal LargoHoja { get; set; }
		public bool ConScore { get; set; }
		public decimal PzasxLargo { get; set; }
		public decimal PzasxAncho { get; set; }
		public decimal AumLargo { get; set; }
		public decimal AumAncho { get; set; }
		public bool SoloLamina { get; set; }

	}
}
