using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class DisponibilidadMaquinaBusiness
    {
        public Task<Result> GetDisponibilidadMaquina(string strConexion, int anio, int mes , string ClaveMaquina)
        {
            return new DisponibilidadMaquinaData().GetDisponibilidadMaquina(strConexion, anio, mes , ClaveMaquina);
        }
        public Task<Result> GetMaquina(string strConexion)
        {
            return new DisponibilidadMaquinaData().GetMaquina(strConexion);
        }
        public Task<ResultValDisMaq> GetValidarDisMaquina(string strConexion, int anio, int mes, string ClaveMaquina, string ClaveMaquinaDestino)
        {
            return new DisponibilidadMaquinaData().GetValidarDisMaquina(strConexion, anio, mes, ClaveMaquina, ClaveMaquinaDestino);
        }
        public async Task<Result> Agregar(TokenData datosToken, FCAPROGDAT017Entity disponibilidad)
        {
            try
            {
                return await new DisponibilidadMaquinaData().Agregar(datosToken, disponibilidad);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Copiar(TokenData datosToken, DisCopiaData disponibilidad)
        {
            try
            {
                return await new DisponibilidadMaquinaData().Copiar(datosToken, disponibilidad);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Editar(TokenData datosToken, FCAPROGDAT017Entity disponibilidad)
        {
            try
            {
                return await new DisponibilidadMaquinaData().Editar(datosToken, disponibilidad);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Eliminar(TokenData datosToken, FCAPROGDAT017Entity disponibilidad)
        {
            try
            {
                return await new DisponibilidadMaquinaData().Eliminar(datosToken, disponibilidad);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
