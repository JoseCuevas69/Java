using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;


namespace Business
{
    public class ParosBusiness
    {
        public Task<Result> GetMaquinas(TokenData datosToken, string tipoMaquina)
        {
            return new clsParosData().GetMaquinas(datosToken, tipoMaquina);
        }

        public Task<Result> GetParos(TokenData datosToken, int startRow, int endRow, string TipoMaquina, string TipoTiempo, string ClaveMaquina, string Fecha)
        {
            return new clsParosData().GetParos(datosToken, startRow, endRow, TipoMaquina, TipoTiempo, ClaveMaquina, Fecha);
        }

        public async Task<clsParos> Agregar(TokenData datosToken, clsParos parParos)
        {
            try
            {
                return await new clsParosData().Agregar(datosToken, parParos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsParos> Modificar(TokenData datosToken, clsParos parParos)
        {
            try
            {
                return await new clsParosData().Modificar(datosToken, parParos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsParos> Eliminar(TokenData datosToken, clsParos parParos)
        {
            try
            {
                return await new clsParosData().Eliminar(datosToken, parParos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
