using Data;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class ProgramacionNormalBusiness
    {
        // =================================================================================================================================
        // FJLM

        public async Task<Result> getResistencias(TokenData DatosToken)
        {
            try
            {
                return await new ProgramacionNormalData().getResistencias(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getParametros(TokenData DatosToken)
        {
            try
            {
                return await new ProgramacionNormalData().getParametros(DatosToken);
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

        public async Task<Result> getDatosOps(TokenData DatosToken)
        {
            try
            {
                return await new ProgramacionNormalData().getDatosOps(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getArreglosPosibles(TokenData DatosToken, string puntos)
        {
            try
            {
                return await new ProgramacionNormalData().getArreglosPosibles(DatosToken, Convert.ToInt32(puntos));
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOpAnalizando(TokenData DatosToken, string op)
        {
            try
            {
                return await new ProgramacionNormalData().getOpAnalizando(DatosToken, op);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getPuntosMaxArreglosPosibles(TokenData DatosToken)
        {
            try
            {
                return await new ProgramacionNormalData().getPuntosMaxArreglosPosibles(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAnchoSTD(TokenData DatosToken, string zona, string op)
        {
            try
            {
                return await new ProgramacionNormalData().getAnchoSTD(DatosToken, zona, op);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getHojasProgramadas(TokenData DatosToken, string op)
        {
            try
            {
                return await new ProgramacionNormalData().getHojasProgramadas(DatosToken, op);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // =================================================================================================================================
    }
}
