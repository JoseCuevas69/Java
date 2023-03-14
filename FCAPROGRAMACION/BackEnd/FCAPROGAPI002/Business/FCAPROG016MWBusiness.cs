using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class FCAPROG016MWBusiness
    {
        public async Task<Result> getDatosPrincipal(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG016MWData().getDatosPrincipal(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> agregarOP(TokenData DatosToken, FCAPROG016MWEntity datos)
        {
            try
            {
                return await new FCAPROG016MWData().agregarOP(DatosToken, datos);
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
                return await new FCAPROG016MWData().ValidaVariacion(DatosToken, datos);
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
                return await new FCAPROG016MWData().ValidaHojasFaltan(DatosToken, datos);
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
                return await new FCAPROG016MWData().aplicarCambios(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
