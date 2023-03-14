using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class clsLamTerResultado
    {
        public string op { get; set; }
        public string clavecli { get; set; }
        public string nombrecli { get; set; }
        public string claveart { get; set; }
        public string nombreart { get; set; }
        public Double cantidad { get; set; }
        public string resistencia { get; set; }
        public string flauta { get; set; }
        public string papel { get; set; }
        public string industria { get; set; }
        public Double largolamina { get; set; }
        public Double ancholamina { get; set; }
        public Double piezasxhoja { get; set; }
        public Double areaunitaria { get; set; }
        public Double pesounitario { get; set; }
        public Double largodesarrollo { get; set; }
        public Double anchodesarrollo { get; set; }
        public Double excedente { get; set; }
        public Double cantidadproducida { get; set; }
        public Double excedenteaplicado { get; set; }
        public Double transferido { get; set; }
        public Double saldo { get; set; }
        public string opestatus { get; set; }
        public string opinterplanta { get; set; }
        public string notas { get; set; }
        public string notascartera { get; set; }
        public string notascostos { get; set; }       
    }

    public class clsAlmacen
    {
        public string clave { get; set; }
        public string nombre { get; set; }
        public string tipoalmacen { get; set; }
        public string usuario { get; set; }
    }
}
