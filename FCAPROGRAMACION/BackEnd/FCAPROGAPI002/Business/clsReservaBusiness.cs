using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;

namespace Business
{
   public  class clsReservaBusiness
    {
        //public Task<Result> GetMaquinas(TokenData datosToken, string tipoMaquina)
        //{
        //    return new clsParosData().GetMaquinas(datosToken, tipoMaquina);
        //}

        public Task<Result> GetReservas(TokenData datosToken, int startRow, int endRow, string parZona)
        {
            return new clsReservaData().GetReservas(datosToken, startRow, endRow, parZona);
        }

        public async Task<clsReserva> Agregar(TokenData datosToken, clsReserva parReserva)
        {
            try
            {
                return await new clsReservaData().Agregar(datosToken, parReserva);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsReserva> Modificar(TokenData datosToken, clsReserva parReserva)
        {
            try
            {
                return await new clsReservaData().Modificar(datosToken, parReserva);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsReserva> Eliminar(TokenData datosToken, clsReserva parReserva)
        {
            try
            {
                return await new clsReservaData().Eliminar(datosToken, parReserva);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
