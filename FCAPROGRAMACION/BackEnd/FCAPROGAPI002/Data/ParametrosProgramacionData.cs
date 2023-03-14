using Dapper;
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
    public class ParametrosProgramacionData
    {
        public async Task<Result> GetParametrosProg(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.ParametrosProgramacion + "1",
                        new
                        {
                            Opcion = 1,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<FCAPROGDAT009Entity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetVariacion(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.ParametrosProgramacion + "1",
                        new
                        {
                            Opcion = 2,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<FCAPROGDAT015Entity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Agregar(TokenData datosToken, FCAPROGDAT015Entity variacion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.ParametrosProgramacion + "2",
                        new
                        {
                            Opcion = 1,
                            Usuario = datosToken.Usuario,
                            Descripcion = variacion.Descripcion,
                            Cantidad = variacion.Cantidad,
                            

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
        public async Task<Result> Editar(TokenData datosToken, FCAPROGDAT015Entity variacion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.ParametrosProgramacion + "2",
                        new
                        {
                            Opcion = 2,
                            Usuario = datosToken.Usuario,
                            Codigo = variacion.Codigo,
                            Descripcion = variacion.Descripcion,
                            Cantidad = variacion.Cantidad,


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
        public async Task<Result> AgregarParametros(TokenData datosToken, FCAPROGDAT009Entity parametros)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.ParametrosProgramacion + "2",
                        new
                        {
                            Opcion = 3,
                            Usuario = datosToken.Usuario,
                            ResistenciasAfines = parametros.ResistenciasAfines,
                            RefileMaximo = parametros.RefileMaximo,
                            RefileMinimo = parametros.RefileMinimo,
                            DiasAdelanto = parametros.DiasAdelanto,
                            TodosAnchos = parametros.TodosAnchos,
                            AnchoCalculo = parametros.AnchoCalculo,
                            LargoMinimo = parametros.LargoMinimo,
                            Excedente = parametros.Excedente,
                            Scores = parametros.Scores
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
