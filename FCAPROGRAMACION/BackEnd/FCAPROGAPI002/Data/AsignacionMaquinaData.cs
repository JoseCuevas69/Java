using Dapper;
using Data.BDAdmon;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class AsignacionMaquinaData
    {
        public async Task<Result> GetMaquinas(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.AsignacionMaquina + "1",
                        new
                        {
                            Opcion = 1
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<MaquinasEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetRutas(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.AsignacionMaquina + "1",
                        new
                        {
                            Opcion = 2
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<RutasEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetProcesosRelacionados(string strConexion, string claveArticulo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.AsignacionMaquina + "1",
                        new
                        {
                            Opcion = 4,
                            ClaveArticulo = claveArticulo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ProcesosArticuloEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetAsginacionMaquina(string strConexion, string claveArticulo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.AsignacionMaquina + "1",
                        new
                        {
                            Opcion = 5,
                            ClaveArticulo = claveArticulo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<AsignacionMaquinaEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetArticulosPorProceso(string strConexion, int StartRow, int EndRow, string proceso, string filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                       nombre.AsignacionMaquina + "1",
                        new
                        {
                            Opcion = 6,
                            Proceso = proceso,
                            FiltroArticulo = filtro == "undefined" ? null : filtro,
                            startRow = StartRow,
                            endRow = EndRow
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ArticulosRutaProcesoEntity>();
                    objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GuardarProcesoMaquina(TokenData datosToken, List<AsignacionMaquinaEntity> datos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        nombre.AsignacionMaquina + "2",
                        new
                        {
                            Opcion = 1,
                            UsuarioERP = datosToken.Usuario,
                            FCAPROGDAT018TD001 = Ds.CreateDataTable(datos).AsTableValuedParameter("FCAPROGDAT018TD001")
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                return objResult;
            }
        }

        public async Task<Result> ActualizarProcesoMaquina(TokenData datosToken, List<AsignacionMaquinaEntity> datos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        nombre.AsignacionMaquina + "2",
                        new
                        {
                            Opcion = 2,
                            UsuarioERP = datosToken.Usuario,
                            FCAPROGDAT018TD001 = Ds.CreateDataTable(datos).AsTableValuedParameter("FCAPROGDAT018TD001")
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                return objResult;
            }
        }
    }
}
