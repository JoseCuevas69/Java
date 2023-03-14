using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class CPLCAP005Business
    {
        public async Task<Result> getResistencias(TokenData DatosToken)
        {
            try
            {
                return await new CPLCAP005Data().getResistencias(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAnchosUsar(TokenData DatosToken, string usar)
        {
            try
            {
                return await new ProgramacionNormalData().getAnchosUsar(DatosToken, Convert.ToInt32(usar));
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getVariaciones(TokenData DatosToken)
        {
            try
            {
                return await new CPLCAP005Data().getVariaciones(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> actualizarVariaciones(TokenData DatosToken, List<Variaciones> datos)
        {
            try
            {
                return await new CPLCAP005Data().actualizarVariaciones(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> procCalcularProgramas(TokenData DatosToken, string cuchillas)
        {
            try
            {
                return await new CPLCAP005Data().procCalcularProgramas(DatosToken, cuchillas);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cancelarOpsCalcularProgramas(TokenData DatosToken, List<ResData> datos)
        {
            try
            {
                return await new CPLCAP005Data().cancelarOpsCalcularProgramas(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> actualizarScorPrincipal(TokenData DatosToken, ResData datos)
        {
            try
            {
                return await new CPLCAP005Data().actualizarScorPrincipal(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> procValidarArreglos(TokenData DatosToken, int pArreglo)
        {
            try
            {
                return await new CPLCAP005Data().procValidarArreglos(DatosToken, pArreglo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> procValidarPresentacionPintado(TokenData DatosToken, CPLDAT009TD_002 datos)
        {
            try
            {
                return await new CPLCAP005Data().procValidarPresentacionPintado(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // getConfiguracion
        public async Task<Result> getConfiguracion(TokenData DatosToken)
        {
            try
            {
                return await new CPLCAP005Data().getConfiguracion(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // actualizarConfiguracion
        public async Task<Result> actualizarConfiguracion(TokenData DatosToken, clsConfiguracion datos)
        {
            try
            {
                return await new CPLCAP005Data().actualizarConfiguracion(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // CerrarSession
        public async Task<Result> CerrarSession(TokenData DatosToken, clsConfiguracion datos)
        {
            try
            {
                return await new CPLCAP005Data().CerrarSession(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
