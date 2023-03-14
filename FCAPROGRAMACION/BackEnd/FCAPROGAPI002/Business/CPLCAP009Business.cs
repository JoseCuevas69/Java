using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class CPLCAP009Business
    {
        public async Task<Result> getDatosPrincipal(TokenData DatosToken)
        {
            try
            {
                return await new CPLCAP009Data().getDatosPrincipal(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> agregarOP(TokenData DatosToken, CPLCAP009Entity datos)
        {
            try
            {
                return await new CPLCAP009Data().agregarOP(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> ValidaVariacion(TokenData DatosToken, ListaDatosPrincipal datos)
        {
            try
            {
                return await new CPLCAP009Data().ValidaVariacion(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> ValidaHojasFaltan(TokenData DatosToken, ListaDatosPrincipal datos)
        {
            try
            {
                return await new CPLCAP009Data().ValidaHojasFaltan(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> aplicarCambios(TokenData DatosToken, ListaDatosPrincipal datos)
        {
            try
            {
                return await new CPLCAP009Data().aplicarCambios(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
