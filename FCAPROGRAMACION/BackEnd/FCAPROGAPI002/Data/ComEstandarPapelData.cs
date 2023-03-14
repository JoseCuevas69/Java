using Dapper;
using Data.BDAdmon;
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
    public class ComEstandarPapelData
    {
        public async Task<Result> GetResistencias(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 1
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<Resistencia>();
                }
                return objResult;
            } 
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetAccesosUsuarios(string strConexion, string usuarioerp)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 2,
                            UsuarioERP = usuarioerp
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<AccesosUsuarios>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetRutaProceso(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 3
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<RutaProceso>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetProcesoEspecial(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 4
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ProcesoEspecial>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetProceso(string strConexion, string procesos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 5,
                            procesos = procesos
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<Proceso>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetPapeles(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 6
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<Papeles>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetClavePreparacion(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 7
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ClavePreparacion>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetImpermeabilizado(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 8
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<Impremeabilizado>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetInsumos(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 9
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<Insumos>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GetCombinacionEstandarPapel(string strConexion, int startRow, int endRow, string descripcion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 10,
                            startRow = startRow,
                            endRow = endRow,
                            Descripcion = descripcion
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CombinacionEstandarPapel>();
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

        public async Task<Result> GetCalculoPesoM2(string strConexion, string claveArticulo, string liner1, string corrugado1, string liner2, string corrugado2, string liner3, string corrugado3,string liner4, string resistencia, string flauta)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "3",
                        new
                        {
                            claveArticulo = claveArticulo,
                            Liner1 = liner1,
                            Liner2 = liner2,
                            Liner3 = liner3,
                            Liner4 = liner4,
                            Corrugado1 = corrugado1,
                            Corrugado2 = corrugado2,
                            Corrugado3 = corrugado3,
                            Resistencia = resistencia,
                            Flauta = flauta
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<MetrosCuadradosPorPapel>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetArticulos(string strConexion, int startRow, int endRow, string filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 11,
                            startRow = startRow,
                            endRow = endRow,
                            ClaveArticulo = filtro
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Articulos>();
                    objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GuardarCombinacionEstandar(TokenData datosToken, CombinacionEstandarPapel data)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result =  await con.QueryFirstOrDefaultAsync(
                        nombre.CombinacionEstandarPapel + "2",
                        new
                        {
                            Opcion = 1,
                            ClaveArticulo = data.ClaveArticulo,
                            Liner1 = data.Liner1,
                            Corrugado1 = data.Corrugado1,
                            Liner2 = data.Liner2,
                            Corrugado2 = data.Corrugado2,
                            Liner3 = data.Liner3,
                            Corrugado3 = data.Corrugado3,
                            Liner4 = data.Liner4,
                            AnchoStd = data.AnchoStd,
                            TrimStd = data.TrimStd,
                            AnchoOptimo = data.AnchoOptimo,
                            TrimOptimo = data.TrimOptimo,
                            CvePreparacion = data.CvePreparacion,
                            HandHold = data.HandHold,
                            Parafinado = data.Parafinado,
                            Troquel = data.Troquel,
                            StringKing = data.StringKing,
                            ConScore = data.ConScore,
                            NScore = data.NScore,
                            Impremeabilizado = data.Impremeabilizado,
                            AplicaSelloFecheroImp = data.AplicaSelloFecheroImp,
                            PesoM2 = data.PesoM2,
                            UsuarioErp = datosToken.Usuario
                        },
                        commandType: CommandType.StoredProcedure);
                        objResult.data = result;

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

        public async Task<Result> ActualizarCombinacionEstandar(TokenData datosToken, CombinacionEstandarPapel data)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        nombre.CombinacionEstandarPapel + "2",
                        new
                        {
                            Opcion = 2,
                            ClaveArticulo = data.ClaveArticulo,
                            Liner1 = data.Liner1,
                            Corrugado1 = data.Corrugado1,
                            Liner2 = data.Liner2,
                            Corrugado2 = data.Corrugado2,
                            Liner3 = data.Liner3,
                            Corrugado3 = data.Corrugado3,
                            Liner4 = data.Liner4,
                            AnchoStd = data.AnchoStd,
                            TrimStd = data.TrimStd,
                            AnchoOptimo = data.AnchoOptimo,
                            TrimOptimo = data.TrimOptimo,
                            CvePreparacion = data.CvePreparacion,
                            HandHold = data.HandHold,
                            Parafinado = data.Parafinado,
                            Troquel = data.Troquel,
                            StringKing = data.StringKing,
                            ConScore = data.ConScore,
                            NScore = data.NScore,
                            Impremeabilizado = data.Impremeabilizado,
                            AplicaSelloFecheroImp = data.AplicaSelloFecheroImp,
                            PesoM2 = data.PesoM2,
                            UsuarioErp = datosToken.Usuario
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

        public async Task<Result> EliminarCombinacionEstandar(TokenData datosToken, string claveArticulo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        nombre.CombinacionEstandarPapel + "2",
                        new
                        {
                            Opcion = 3,
                            ClaveArticulo = claveArticulo,
                            UsuarioErp = datosToken.Usuario
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

        public async Task<Result> GetArticulosPorResistencia(string strConexion, int startRow, int endRow, string resistencia)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.CombinacionEstandarPapel + "1",
                        new
                        {
                            Opcion = 12,
                            startRow = startRow,
                            endRow = endRow,
                            Resistencia = resistencia
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CombinacionEstandarPapel>();
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

        public async Task<Result> GuardarCombinacionPorResistencia(TokenData datosToken, List<FCAPROGDAT006TD001> datos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        nombre.CombinacionEstandarPapel + "2",
                        new
                        {
                            Opcion = 4,
                            UsuarioERP = datosToken.Usuario,
                            FCAPROGDAT006TD001 = Ds.CreateDataTable(datos).AsTableValuedParameter("FCAPROGDAT006TD001")
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

        public async Task<Result> GuardarEspecificaciones(TokenData datosToken, EspecificacionesMaquinas datos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        nombre.CombinacionEstandarPapel + "2",
                        new
                        {
                            Opcion = 5,
                            UsuarioERP = datosToken.Usuario,
                            Restringe = datos.Restringe,
                            ClaveArticulo = datos.ClaveArticulo,
                            EProceso = datos.Eproceso,
                            EProcesoCorr = datos.Eprocesocorr,
                            Proceso = datos.Proceso,
                            Cproceso = datos.Cproceso,
                            Paletizar = datos.Paletizar,
                            ComentarioFabricacion = datos.ComentariosFabricacion
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
