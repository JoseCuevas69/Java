using Dapper;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DisponibilidadMaquinaData
    {
        public async Task<Result> GetDisponibilidadMaquina(string strConexion, int anio, int mes, string ClaveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.DisponibilidadMaquina + "1",
                        new
                        {
                            Opcion = 1,
                            anio = anio,
                            mes = mes,
                            ClaveMaquina = ClaveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<FCAPROGDAT017Entity>();
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
        public async Task<Result> GetMaquina(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.DisponibilidadMaquina + "1",
                        new
                        {
                            Opcion = 2,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<Maquina>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<ResultValDisMaq> GetValidarDisMaquina(string strConexion, int anio, int mes, string ClaveMaquina , string ClaveMaquinaDestino)
        {
            ResultValDisMaq objResult = new ResultValDisMaq();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.DisponibilidadMaquina + "1",
                        new
                        {
                            Opcion = 3,
                            anio = anio,
                            mes = mes,
                            ClaveMaquina = ClaveMaquina,
                            ClaveMaquinaDestino = ClaveMaquinaDestino
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.DisMaquinaOrigen = await result.ReadFirstAsync<int>();
                    objResult.DisMaquinaDestino = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Agregar(TokenData datosToken, FCAPROGDAT017Entity disponibilidad)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.DisponibilidadMaquina + "2",
                        new
                        {
                            Opcion = 1,
                            Usuario = datosToken.Usuario,
                            Disponibilidad = Ds.CreateDataTable(disponibilidad.Lstdisponibilidad).AsTableValuedParameter("FCAPROGDAT017TD001"),

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    return objResult;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                return objResult;
            }
        }
        public async Task<Result> Copiar(TokenData datosToken, DisCopiaData disponibilidad)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.DisponibilidadMaquina + "2",
                        new
                        {
                            Opcion = 4,
                            Usuario = datosToken.Usuario,
                            anio = disponibilidad.AnioOrigen,
                            mes = disponibilidad.MesOrigen,
                            ClaveMaquina = disponibilidad.ClaveMaquinaOrigen,
                            ClaveMaquinaDestino = disponibilidad.ClaveMaquinaDestino

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    return objResult;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                return objResult;
            }
        }
        public async Task<Result> Editar(TokenData datosToken, FCAPROGDAT017Entity disponibilidad)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.DisponibilidadMaquina + "2",
                        new
                        {
                            Opcion = 2,
                            Usuario = datosToken.Usuario,
                            Disponibilidad = Ds.CreateDataTable(disponibilidad.Lstdisponibilidad).AsTableValuedParameter("FCAPROGDAT017TD001"),

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    return objResult;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                return objResult;
            }
        }
        public async Task<Result> Eliminar(TokenData datosToken, FCAPROGDAT017Entity disponibilidad)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.DisponibilidadMaquina + "2",
                        new
                        {
                            Opcion = 3,
                            Usuario = datosToken.Usuario,
                            Disponibilidad = Ds.CreateDataTable(disponibilidad.Lstdisponibilidad).AsTableValuedParameter("FCAPROGDAT017TD001"),

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    return objResult;
                }
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
