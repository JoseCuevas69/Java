using Data;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class ComEstandarPapelBusiness
    {
        public Task<Result> GetResistencias(string strConexion)
        {
            return new ComEstandarPapelData().GetResistencias(strConexion);
        }
        public Task<Result> GetAccesosUsuarios(string strConexion, string UsuarioERP)
        {
            return new ComEstandarPapelData().GetAccesosUsuarios(strConexion, UsuarioERP);
        }
        public Task<Result> GetRutaProceso(string strConexion)
        {
            return new ComEstandarPapelData().GetRutaProceso(strConexion);
        }
        public Task<Result> GetProcesoEspecial(string strConexion)
        {
            return new ComEstandarPapelData().GetProcesoEspecial(strConexion);
        }
        public Task<Result> GetProceso(string strConexion, string procesos)
        {
            return new ComEstandarPapelData().GetProceso(strConexion, procesos);
        }
        public Task<Result> GetPapeles(string strConexion)
        {
            return new ComEstandarPapelData().GetPapeles(strConexion);
        }
        public Task<Result> GetClavePreparacion(string strConexion)
        {
            return new ComEstandarPapelData().GetClavePreparacion(strConexion);
        }
        public Task<Result> GetImpermeabilizado(string strConexion)
        {
            return new ComEstandarPapelData().GetImpermeabilizado(strConexion);
        }
        public Task<Result> GetInsumos(string strConexion)
        {
            return new ComEstandarPapelData().GetInsumos(strConexion);
        }
        public Task<Result> GetCombinacionEstandarPapel(string strConexion, int startRow, int endRow, string filtro)
        {
            return new ComEstandarPapelData().GetCombinacionEstandarPapel(strConexion, startRow, endRow, filtro);
        }
        public Task<Result> GetCalculoPesoM2(string strConexion, string claveArticulo, string liner1, string corrugado1, string liner2, string corrugado2, string liner3, string corrugado3, string liner4, string resistencia, string flauta)
        {
            return new ComEstandarPapelData().GetCalculoPesoM2(strConexion, claveArticulo, liner1, corrugado1, liner2, corrugado2, liner3, corrugado3, liner4, resistencia, flauta);
        }
        public Task<Result> GetArticulos(string strConexion, int startRow, int endRow, string filtro)
        {
            return new ComEstandarPapelData().GetArticulos(strConexion, startRow, endRow, filtro);
        }
        public async Task<Result> Agregar(TokenData datosToken, CombinacionEstandarPapel data)
        {
            try
            {
                return await new ComEstandarPapelData().GuardarCombinacionEstandar(datosToken, data);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> ActualizarCombinacionEstandar(TokenData datosToken, CombinacionEstandarPapel data)
        {
            try
            {
                return await new ComEstandarPapelData().ActualizarCombinacionEstandar(datosToken, data);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> EliminarCombinacionEstandar(TokenData datosToken, string claveArticulo)
        {
            try
            {
                return await new ComEstandarPapelData().EliminarCombinacionEstandar(datosToken, claveArticulo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public Task<Result> GetArticulosPorResistencia(string strConexion, int startRow, int endRow, string resistencia)
        {
            return new ComEstandarPapelData().GetArticulosPorResistencia(strConexion, startRow, endRow, resistencia);
        }

        public async Task<Result> GuardarCombinacionPorResistencia(TokenData datosToken, List<FCAPROGDAT006TD001> datos)
        {
            try
            {
                return await new ComEstandarPapelData().GuardarCombinacionPorResistencia(datosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GuardarEspecificaciones(TokenData datosToken, EspecificacionesMaquinas datos)
        {
            try
            {
                return await new ComEstandarPapelData().GuardarEspecificaciones(datosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
