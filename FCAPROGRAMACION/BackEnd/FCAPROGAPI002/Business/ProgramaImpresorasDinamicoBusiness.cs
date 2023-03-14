using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class ProgramaImpresorasDinamicoBusiness
    {
        public Task<Result> GetCatMaquinas(string strConexion)
        {
            return new ProgramaImpresorasDinamicoData().GetCatMaquinas(strConexion);
        }
        public Task<Result> GetOPsProgramarImpresoras(string strConexion, ProgramaLis Programa)
        {
            return new ProgramaImpresorasDinamicoData().GetOPsProgramarImpresoras(strConexion, Programa);
        }
        public Task<Result> GetOPsOtrosDatos(string strConexion, string Op)
        {
            string OPCort = Op.Substring(0,5);

            return new ProgramaImpresorasDinamicoData().GetOPsOtrosDatos(strConexion, Op, OPCort);
        }
        public Task<Result> GetValidarArticulo(string strConexion, string Op)
        {

            return new ProgramaImpresorasDinamicoData().GetValidarArticulo(strConexion, Op);
        }
        public Task<Result> GetRutaProcMaquinas(string strConexion, string ClaveProceso)
        {

            return new ProgramaImpresorasDinamicoData().GetRutaProcMaquinas(strConexion, ClaveProceso);
        }
        public Task<Result> GetMaquinaEstablecida(string strConexion, string ClaveArticulo, int NumProceso)
        {

            return new ProgramaImpresorasDinamicoData().GetMaquinaEstablecida(strConexion, ClaveArticulo, NumProceso);
        }
        public Task<Result> GetProgHisFabricacion(string strConexion, ProgImpresoraDinamico progImpresora)
        {

            return new ProgramaImpresorasDinamicoData().GetProgHisFabricacion(strConexion, progImpresora);
        }
        public Task<Result> GetBalanceMaquinas(string strConexion, ProgImpresoraDinamico progImpresora)
        {

            return new ProgramaImpresorasDinamicoData().GetBalanceMaquinas(strConexion, progImpresora);
        }
        public Task<Result> GetVelocidad(string strConexion, ProgImpresoraDinamico progImpresora)
        {

            return new ProgramaImpresorasDinamicoData().GetVelocidad(strConexion, progImpresora);
        }
        public Task<Result> AgregarProgImpDinamico(TokenData datosToken, ProgImpresorasDinamico progImpresora)
        {

            return new ProgramaImpresorasDinamicoData().AgregarProgImpDinamico(datosToken, progImpresora);
        }
    }
}
