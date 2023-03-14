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
    public class FCAPROG014MWData
    {
        public async Task<Result> getDatos(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG014MWSPC1",
                        new
                        {
                            Opcion = 1
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ParametrosCPLCAP003>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getComboModificar(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG014MWSPC1",
                        new
                        {
                            Opcion = 2,
                            ZonaERP = DatosToken.Zona
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<DatosComboCPLCAP003>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GuardarDatos(TokenData DatosToken, ParametrosCPLCAP003 datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "FCAPROG014MWSPA2",
                        new
                        {
                            Opcion = 1,
                            ResistenciaAfines = datos.ResistenciaAfines,
                            RefileMaximo = datos.RefileMaximo,
                            RefileMinimo = datos.RefileMinimo,
                            DiasAdelantoFE = datos.DiasAdelantadoFE,
                            TodosAnchos = datos.TodosAnchos,
                            AnchosCalculo = datos.AnchosCalculo,
                            LargoMinProgr = datos.LargoMinProgr,
                            AumentoPedido = datos.AumentoPedido,
                            ScoresMaximos = datos.ScoresMaximos
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> registrar(TokenData DatosToken, DatosComboCPLCAP003 datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "FCAPROG014MWSPA2",
                        new
                        {
                            Opcion = 2,
                            Descripcion = datos.Descripcion,
                            Cantidad = datos.Cantidad,
                            Usuario = DatosToken.Usuario,
                            ZonaERP = DatosToken.Zona
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> modificar(TokenData DatosToken, DatosComboCPLCAP003 datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "FCAPROG014MWSPA2",
                        new
                        {
                            Opcion = 3,
                            Codigo = datos.Codigo,
                            Descripcion = datos.Descripcion,
                            Cantidad = datos.Cantidad,
                            Usuario = DatosToken.Usuario,
                            ZonaERP = DatosToken.Zona
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> eliminar(TokenData DatosToken, DatosComboCPLCAP003 datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "FCAPROG014MWSPA2",
                        new
                        {
                            Opcion = 4,
                            Codigo = datos.Codigo,
                            Usuario = DatosToken.Usuario,
                            ZonaERP = DatosToken.Zona
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
