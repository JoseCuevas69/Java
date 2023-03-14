using Data.BDAdmon;
using Data.Enums;

namespace Data
{
    public class SPNombre
    {
        private static string TipoAccionNombre;
        public static string SubProVent;

        public string CombinacionEstandarPapel;
        public string AsignacionMaquina;
        public static string SubProProg;
        public static string SubProProd;

        public string ParametrosProgramacion;
        public string MedidasHoja;
        public string DisponibilidadMaquina;
        public string AprovechamientoLamina;
        public string SecuenciaCorrugadora;
        public string EstandaresImpresoras;
        public string RutaProcesos;

        public string TipoCaja;
        public string Proceso;
        public string Maquina;
        public string Combinaciones;




        public SPNombre(SpTipo TipoAccion = SpTipo.Consulta)
        {
            TipoAccionNombre = TipoAccion == SpTipo.Actualiza ? "SPA" : "SPC";
            SubProVent = ProcesosCecso.FcaCajas + SubProcesos.FcaProgramacion;

            CombinacionEstandarPapel = SubProVent + "002MW" + TipoAccionNombre;
            AsignacionMaquina = SubProVent + "007MW" + TipoAccionNombre;
            SubProProg = ProcesosCecso.FcaCajas + SubProcesos.FcaProgramacion;
            SubProProd = ProcesosCecso.FcaCajas + SubProcesos.FcaProduccion;

            ParametrosProgramacion = SubProProg  + "003MW" + TipoAccionNombre;
            MedidasHoja = SubProProg + "004MW" + TipoAccionNombre;
            DisponibilidadMaquina = SubProProg + "006MW" + TipoAccionNombre;
            AprovechamientoLamina = SubProProg + "00MW" + TipoAccionNombre;
            SecuenciaCorrugadora = SubProProg + "000MW" + TipoAccionNombre;
            EstandaresImpresoras = SubProProd + "002MW" + TipoAccionNombre;
            RutaProcesos = SubProProg + "008MW" + TipoAccionNombre;


            TipoCaja = SubProVent + TablaTipo.Catalogo + "010CW" + TipoAccionNombre;
            Proceso = SubProVent + TablaTipo.Catalogo + "009CW" + TipoAccionNombre;
            Maquina = SubProVent + TablaTipo.Catalogo + "008CW" + TipoAccionNombre;
            Combinaciones = SubProVent + TablaTipo.Catalogo + "004CW" + TipoAccionNombre;
        }
    }
}

