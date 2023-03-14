using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class clsAutorizadoresCmbStd
    {
        public int folio { get; set; }
        public string autgciapta { get; set; }
        public DateTime fechgciapta { get; set; }
        public string autcalidad { get; set; }
        public DateTime fechcalidad { get; set; }
        public string propelegpta { get; set; }
        public string propelegcal { get; set; }
        public float costoproppta { get; set; }
        public float costopropcal { get; set; }
        public bool estatus { get; set; }
        public string usuario { get; set; }

        //public DateTime fechainsert { get; set; }
        //public string usuarioupdate { get; set; }
        //public DateTime fechaupdate { get; set; }
        //public string usuariodelete { get; set; }
        //public DateTime fechadelete { get; set; }
    }
}
