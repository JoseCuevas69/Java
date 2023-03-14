using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    //BuscarxPrograma
    public class clsCmbStdDat01
    {
        public string op { get; set; }
        public string clavearticulo { get; set; }
        public string descripcion { get; set; }
        public string nombre { get; set; }
        public string resistencia { get; set; }
        public string flauta { get; set; }
        public float ml { get; set; }
        public float m2 { get; set; }
        public float mcstd { get; set; }
        public string codigo { get; set; }
    }


    //Combinación Estandar, Se encuentra en el WebTab en el Tab Estandares Vs Propuestas,
    //depende del número de Programa que haya seleccionado el Usuario
    public class clsCmbStdDat02
    {
        /*
         Programa    ClaveArticulo Liner1   Corrugado1 Liner2   Corrugado2 Liner3   AnchoStd
         */
        public string programa { get; set; }
        public string clavearticulo { get; set; }
        public string liner1 { get; set; }
        public string corrugado1 { get; set; }
        public string liner2 { get; set; }
        public string corrugado2 { get; set; }
        public string liner3 { get; set; }
        public float anchostd { get; set; }

    }

    //Combinación Propuesta, Se encuentra en el WebTab en el Tab Estandares Vs Propuestas,
    //depende del número de Programa que haya seleccionado el Usuario
    public class clsCmbStdDat03
    {
        public string programa { get; set; }
        public string op { get; set; }
        public string liner1 { get; set; }
        public string corrugado1 { get; set; }
        public string liner2 { get; set; }
        public string corrugado2 { get; set; }
        public string liner3 { get; set; }
        public float anchostd { get; set; }
        public float anchol1 { get; set; }
        public float anchol2 { get; set; }
        public float anchol3 { get; set; }
        public float anchoc1 { get; set; }
        public float anchoc2 { get; set; }
    }

    //COSTO TOTAL ESTANDAR  costoestandar, m2

    public class clsCmbStdDat04
    {  
        public float costoestandar { get; set; }
        public float m2 { get; set; }
    }


}
