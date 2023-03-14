using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class AsignacionMaquinaBusiness
    {
        public Task<Result> GetMaquinas(string strConexion)
        {
            return new AsignacionMaquinaData().GetMaquinas(strConexion);
        }

        public Task<Result> GetRutas(string strConexion)
        {
            return new AsignacionMaquinaData().GetRutas(strConexion);
        }

        public Task<Result> GetProcesosRelacionados(string strConexion, string ClaveArticulo)
        {
            return new AsignacionMaquinaData().GetProcesosRelacionados(strConexion, ClaveArticulo);
        }

        public Task<Result> GetAsginacionMaquina(string strConexion, string ClaveArticulo)
        {
            return new AsignacionMaquinaData().GetAsginacionMaquina(strConexion, ClaveArticulo);
        }

        public Task<Result> GetArticulosPorProceso(string strConexion, int startRow, int endRow, string proceso, string filtro)
        {
            return new AsignacionMaquinaData().GetArticulosPorProceso(strConexion, startRow, endRow, proceso, filtro);
        }

        public async Task<Result> GuardarProcesoMaquina(TokenData datosToken, List<AsignacionMaquinaEntity> datos)
        {
            try
            {
                return await new AsignacionMaquinaData().GuardarProcesoMaquina(datosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> ActualizarProcesoMaquina(TokenData datosToken, List<AsignacionMaquinaEntity> datos)
        {
            try
            {
                return await new AsignacionMaquinaData().ActualizarProcesoMaquina(datosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
