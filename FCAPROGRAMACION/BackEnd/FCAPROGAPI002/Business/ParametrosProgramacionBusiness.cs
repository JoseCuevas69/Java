using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class ParametrosProgramacionBusiness
    {
        public Task<Result> GetParametrosProg (string strConexion)
        {
            return new ParametrosProgramacionData().GetParametrosProg (strConexion);
        }
        public Task<Result> GetVariacion(string strConexion)
        {
            return new ParametrosProgramacionData().GetVariacion(strConexion);
        }
        public async Task<Result> Agregar(TokenData datosToken, FCAPROGDAT015Entity variacion)
        {
            try
            {
                return await new ParametrosProgramacionData().Agregar(datosToken, variacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> Editar(TokenData datosToken, FCAPROGDAT015Entity variacion)
        {
            try
            {
                return await new ParametrosProgramacionData().Editar(datosToken, variacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> AgregarParametros(TokenData datosToken, FCAPROGDAT009Entity parametros)
        {
            try
            {
                return await new ParametrosProgramacionData().AgregarParametros(datosToken, parametros);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
