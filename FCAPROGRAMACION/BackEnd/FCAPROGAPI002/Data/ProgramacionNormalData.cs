using Dapper;
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
    public class ProgramacionNormalData
    {
        // =================================================================================================
        // FJLM 

        public async Task<Result> getResistencias(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 1
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ResistenciasProgramacionNormal>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getParametros(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 2
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ParametrosCPLDAT006>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAnchosUsar(TokenData DatosToken, int usar)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 3,
                            Usar = usar
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AnchosCPLDAT003>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getDatosOps(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 4
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<TOpAnalizando>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getArreglosPosibles(TokenData DatosToken, int puntos)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 5,
                            PuntosMax = puntos
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CPLDAT008ArreglosPosibles>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOpAnalizando(TokenData DatosToken, string op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 6,
                            OrdenProduccion = op
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<TOpAnalizando>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getPuntosMaxArreglosPosibles(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 7
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CPLDAT008ArreglosPosibles>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAnchoSTD(TokenData DatosToken, string zona, string op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 8,
                            Zona = zona,
                            OrdenProduccion = op
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AnchoSTD>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getHojasProgramadas(TokenData DatosToken, string op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP005SPLecJava",
                        new
                        {
                            Opcion = 9,
                            OrdenProduccion = (op == "" ? null : op)
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<TOpAnalizando>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // =================================================================================================
    }
}
