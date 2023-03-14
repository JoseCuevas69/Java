using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;

namespace Business
{
    public class clsArticuloEspBusiness
    {
        public Task<Result> GetMaquinas(TokenData datosToken)
        {
            return new clsArticuloEspData().GetMaquinas(datosToken);
        }

        public Task<Result> GetArticulos(TokenData datosToken, int startRow, int endRow, string parDescripcion)
        {
            return new clsArticuloEspData().GetArticulos(datosToken, startRow, endRow, parDescripcion);
        }

        public Task<Result> GetArticuloEspecialesEnc(TokenData datosToken, string parClaveArticulo, string parClaveMaquina, string parDescripcion)
        {
            return new clsArticuloEspData().GetArticuloEspecialesEnc(datosToken, parClaveArticulo, parClaveMaquina, parDescripcion);
        }

        public Task<Result> GetArticuloEspecialesDet(TokenData datosToken, string parClaveArticulo, string parClaveMaquina, string parDescripcion)
        {
            return new clsArticuloEspData().GetArticuloEspecialesDet(datosToken, parClaveArticulo, parClaveMaquina, parDescripcion);
        }

        public async Task<clsArticuloEsp> AgregarEnc(TokenData datosToken, clsArticuloEsp parArticuloEsp)
        {
            try
            {
                return await new clsArticuloEspData().AgregarEnc(datosToken, parArticuloEsp);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsArticuloEsp> ModificarEnc(TokenData datosToken, clsArticuloEsp parArticuloEsp)
        {
            try
            {
                return await new clsArticuloEspData().ModificarEnc(datosToken, parArticuloEsp);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsArticuloEsp> EliminarEnc(TokenData datosToken, clsArticuloEsp parArticuloEsp)
        {
            try
            {
                return await new clsArticuloEspData().EliminarEnc(datosToken, parArticuloEsp);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }



        public async Task<clsArticuloEspDet> AgregarDet(TokenData datosToken, clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                return await new clsArticuloEspData().AgregarDet(datosToken, parArticuloEspDet);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsArticuloEspDet> ModificarDet(TokenData datosToken, clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                return await new clsArticuloEspData().ModificarDet(datosToken, parArticuloEspDet);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsArticuloEspDet> EliminarDet(TokenData datosToken, clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                return await new clsArticuloEspData().EliminarDet(datosToken, parArticuloEspDet);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
