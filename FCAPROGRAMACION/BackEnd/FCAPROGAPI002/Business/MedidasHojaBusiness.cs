using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class MedidasHojaBusiness
    {
        public Task<Result> GetDatArticulo(string strConexion, string claveArticulo)
        {
            return new MedidasHojaData().GetDatArticulo(strConexion, claveArticulo);
        }
        public async Task<Result> Agregar(TokenData datosToken, ArticuloDTO art)
        {
            try
            {
                return await new MedidasHojaData().Agregar(datosToken, art);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
