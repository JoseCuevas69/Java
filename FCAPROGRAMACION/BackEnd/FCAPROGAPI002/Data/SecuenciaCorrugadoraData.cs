using Dapper;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Data.BDAdmon;

namespace Data
{
    public class SecuenciaCorrugadoraData
    {
        public async Task<Result> GetSecuenciaCorrugadoraGeneral(string strConexion, string TipoAcabado, int? OPApoyoMaquila, string ZonaApoyo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 1,
                            TipoAcabado,
                            OPApoyoMaquila = OPApoyoMaquila == 0 ? null : OPApoyoMaquila,
                            ZonaApoyo

                        },
                    commandType: CommandType.StoredProcedure , commandTimeout: 300);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<SecuenciaCorrugadoraGeneralDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetAccionesPreventivas(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 2,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<AccionesPreventivasDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetDetalleOp(string strConexion, int Programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 3,
                            Programa = Programa
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<DetalleOpDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetBuscaOps(string strConexion, int? Programa , string Op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 4,
                            Programa = Programa,
                            Op = Op
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<BuscarOpDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetProcesoRevicionExistencia(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "2",
                        new
                        {
                            Opcion = 1,
                         
                        },
                    commandType: CommandType.StoredProcedure, commandTimeout: 300);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ProcesoRevicionExistenciaDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetProgramas(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 5,

                        },
                    commandType: CommandType.StoredProcedure, commandTimeout: 300);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ProgramasDTO>();
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
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 6,

                        },
                    commandType: CommandType.StoredProcedure, commandTimeout: 300);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ClavePreparacionDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetVelocidadStdCorr(string strConexion, string Articulo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 7,
                            Articulo = Articulo

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<VelocidadStdCorrDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetTiempoEstandarPrep(string strConexion, string Claveproceso)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 8,
                            Claveproceso = Claveproceso

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<TiempoEstandarPrepDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetMaquinasEficiencia(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 9,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<MaquinaEficienciaDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetValidaEstatusOP(string strConexion, int Programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 10,
                            Programa = Programa
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ValidaEstatusOP>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetValidaOpApoyo(string strConexion, string Articulo, string OPApoyo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 11,
                            Articulo = Articulo,
                            OPApoyo = OPApoyo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ValidaOpApoyo>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetPermitirProgramarOP(string strConexion, string OP)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 12,
                            OP = OP
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<PermitirProgramarOP>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetValidacionEliminados(string strConexion, string OP)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 13,
                            OP = OP
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ValidacionEliminados>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetPermitirProgramarOPApoyo(string strConexion, string OP)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 14,
                            OP = OP
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<PermitirProgramarOP>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetValidacionEliminadosOpApoyo(string strConexion, string OP)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 15,
                            OP = OP
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ValidacionEliminados>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<int> GetCombinacion(string strConexion, int Programa)
        {
            int objResult = 0;
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 16,
                            Programa = Programa
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetAlmacen(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 17,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<AlmacenDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetPesoUnitario(string strConexion , int programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 18,
                            Programa = programa
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<PesoUnitarioDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetVerificadorPapeles(string strConexion, int programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 19,
                            Programa = programa
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<VerificadorPapelesDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetValidarCombinacion(string strConexion, string op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 20,
                            op
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ValidarCombinacionDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> SubirOrden(TokenData datosToken, int Programa , int OrdenEsp , int OrdenAct)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 1,
                            Usuario = datosToken.Usuario,
                            Programa = Programa,
                            OrdenEsp = OrdenEsp,
                            OrdenAct = OrdenAct
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
        public async Task<Result> SubirOrdenporBloque(TokenData datosToken, int Programa, int OrdenAct)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 2,
                            Usuario = datosToken.Usuario,
                            Programa = Programa,
                            OrdenAct = OrdenAct
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
        public async Task<Result> BajarOrden(TokenData datosToken, int Programa, int OrdenEsp, int OrdenAct)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 3,
                            Usuario = datosToken.Usuario,
                            Programa = Programa,
                            OrdenEsp = OrdenEsp,
                            OrdenAct = OrdenAct
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
        public async Task<Result> BajarOrdenporBloque(TokenData datosToken, int Programa, int OrdenAct)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 4,
                            Usuario = datosToken.Usuario,
                            Programa = Programa,
                            OrdenAct = OrdenAct
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
        public async Task<Result> ModificaPreparacion(TokenData datosToken, PreparacionDTO datos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 5,
                            Usuario = datosToken.Usuario,
                            Programa = datos.Programa,
                            ClaveProceso = datos.ClaveProceso,
                            MinutosStdPreparacion = datos.MinutosStdPreparacion,
                            VelocidadStd = datos.VelocidadStd,
                            EficienciaPrograma = datos.EficienciaPrograma,
                            MinutosStdProduccion = datos.MinutosStdProduccion
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
        public async Task<Result> Terminar(TokenData datosToken, int Programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 6,
                            Usuario = datosToken.Usuario,
                            Programa = Programa,
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
        public async Task<Result> Cancelar(TokenData datosToken, int Programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 7,
                            Usuario = datosToken.Usuario,
                            Programa = Programa,
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
        public async Task<Result> CambiaEstatusPRO(TokenData datosToken, int Programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 8,
                            Usuario = datosToken.Usuario,
                            Programa = Programa,
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
        public async Task<Result> ActivaFolioCombinacion(TokenData datosToken, int Folio)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 9,
                            datosToken.Usuario,
                            Folio,
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
        public async Task<Result> AgregarPrograma(TokenData datosToken, int Programa, string Comentarios)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 10,
                            datosToken.Usuario,
                            Programa,
                            Comentarios
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
        public async Task<Result> EliminarPrograma(TokenData datosToken, int Programa, bool ChkEliminaImpresoras)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 11,
                            datosToken.Usuario,
                            Programa,
                            ChkEliminaImpresoras,
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
        public async Task<Result> EliminarFolioCombinacion(TokenData datosToken, int Programa)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 12,
                            datosToken.Usuario,
                            Programa
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
        public async Task<Result> Actualiza(TokenData datosToken, Actualiza Datos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "1",
                        new
                        {
                            Opcion = 13,
                            Usuario = datosToken.Usuario,
                            tblSecuencias = Ds.CreateDataTable(Datos.dtos).AsTableValuedParameter("CMOADAT012TD_001"),
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
        public async Task<Result> CorreoFaltaFolioEmp(TokenData datosToken, string Op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "2",
                        new
                        {
                            Opcion = 1,
                            Usuario = datosToken.Usuario,
                            Zona = datosToken.Zona,
                            op = Op,
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
        public async Task<Result> CorreoFaltaFolioEmpOpApoyo(TokenData datosToken, string Op, string OpApoyo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "2",
                        new
                        {
                            Opcion = 2,
                            Usuario = datosToken.Usuario,
                            Zona = datosToken.Zona,
                            op = Op,
                            OpApoyo = OpApoyo, 
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
        public async Task<Result> EnviaCorreoNotificacion(TokenData datosToken, string Op, string chkPrograma, string Articulo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "2",
                        new
                        {
                            Opcion = 3,
                            Usuario = datosToken.Usuario,
                            op = Op,
                            chkPrograma = chkPrograma,
                            Articulo = Articulo
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
        public async Task<Result> GetProcesoRadigrafias(string strConexion, string OP)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "3",
                        new
                        {
                            Opcion = 1,
                            OP = OP
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ProcesoRadigrafias>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetPapelAntiguoCierreMes(string strConexion, FiltrosReporteDTO datos, string col)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "5",
                        new
                        {
                            Opcion = 1,
                            FechaFinDeMes = datos.FechaFinDeMes,
                            Año = datos.Anio,
                            Almacen = datos.Almacen,
                            antiguedadIguala = datos.AntiguedadIguala,
                            col = col
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<CierreMesDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetBuscarAntiguedadDia(string strConexion, FiltrosReporteDTO datos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "5",
                        new
                        {
                            Opcion = 2,
                            Almacen = datos.Almacen,
                            antiguedadIguala = datos.AntiguedadIguala,
                            Fecha = datos.AntiguedadDia
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<CierreMesDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetVerificaRestosRollos(string strConexion, int Almacen , decimal Ancho1, string Liner1, string Liner2, string Liner3, string Medium1, decimal AnchoC1, string Medium2, decimal AnchoC2)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "5",
                        new
                        {
                            Opcion = 3,
                            Almacen = Almacen,
                            Ancho1,
                            Liner1,
                            Liner2,
                            Liner3,
                            Medium1,
                            AnchoC1,
                            Medium2,
                            AnchoC2,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<VerificaRestosRollosDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> InsertaFiltros(TokenData datosToken, FiltrosReporteDTO datos, string mes)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.SecuenciaCorrugadora + "3",
                        new
                        {
                            Opcion = 1,
                            datosToken.Usuario,
                            FechaFinDeMes = datos.FechaFinDeMes,
                            Año = datos.Anio,
                            Mes = mes,
                            Almacen = datos.Almacen,
                            AntiguedadDia = datos.AntiguedadDia,
                            NumeroRollos = datos.NumRollo,
                            Cierre = datos.Cierre
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
        public FTPInfo GetFTPInfo(string strConexion, string Zona)
        {
            try
            {
                FTPInfo objResult = new FTPInfo();
                using (var con = new SqlConnection(strConexion))
                {
                    var result = con.QuerySingle<FTPInfo>("FCAPROG000MWSPC1",
                        new
                        {
                            Opcion = 21,
                            Zona = Zona
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult = result;
                }
                return objResult;
            }
            catch (Exception e)
            {
                throw new ArgumentException(e.Message);
            }
        }
    }
}
