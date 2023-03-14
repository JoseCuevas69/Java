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
    public class CPLCAP005Data
    {
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

        public async Task<Result> getVariaciones(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CplSP031",
                        new
                        {
                            Opcion = 1
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Variaciones>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> actualizarVariaciones(TokenData DatosToken, List<Variaciones> datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CplSP032",
                        new
                        {
                            Opcion = 2,
                            UsuarioERP = DatosToken.Usuario,
                            CplCat004TD_001 = Ds.CreateDataTable(datos).AsTableValuedParameter("CplCat004TD_001")
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

        public async Task<Result> procCalcularProgramas(TokenData DatosToken, string cuchillas)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "IniciarProcCalcularProgramas",
                        new
                        {
                            ZonaERP = DatosToken.Zona,
                            Cuchillas3 = cuchillas == "2" ? false : true,
                            UsuarioERP = DatosToken.Usuario
                        
                        },
                    commandType: CommandType.StoredProcedure, commandTimeout: 1200); // 20 mins

                    objResult.Correcto = await result.ReadFirstAsync<bool>();
                    objResult.data = await result.ReadAsync<ErrorSQL>();

                    if (objResult.Correcto)
                    {
                        objResult.data2 = await result.ReadAsync<CPLDAT009>();
                        objResult.data3 = await result.ReadAsync<ResData>();
                        objResult.data4 = await result.ReadAsync<TotalesCPLDAT009>();
                    }

                  

                    //objResult.data = await result.ReadAsync<CPLDAT009>();
                    //objResult.data2 = await result.ReadAsync<ResData>();
                    //objResult.data3 = await result.ReadAsync<TotalesCPLDAT009>();

                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cancelarOpsCalcularProgramas(TokenData DatosToken, List<ResData> datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "ProcValidaciones",
                        new
                        {
                            Opcion = 1,
                            pZonaERP = DatosToken.Zona,
                            pData = Ds.CreateDataTable(datos).AsTableValuedParameter("ResData"),
                            Usuario = DatosToken.Usuario
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

        public async Task<Result> actualizarScorPrincipal(TokenData DatosToken, ResData datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CPLCAP005SPActJava",
                        new
                        {
                            Opcion = 1,
                            ZonaERP = DatosToken.Zona,
                            IdArreglo = datos.Id,
                            Secuencia = datos.Secuencia,
                            OP = datos.OP,
                            Valor = datos.ConScore,
                            Usuario = DatosToken.Usuario
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

        // VALIDAR ARREGLO
        public async Task<Result> procValidarArreglos(TokenData DatosToken, int pArreglo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "ProcValidarArreglos",
                        new
                        {
                            pZonaERP = DatosToken.Zona,
                            pIdArreglo = pArreglo
                        },
                    commandType: CommandType.StoredProcedure, commandTimeout: pArreglo != 0 ? 180 : 1200); // 3 mins | 20 mins
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    objResult.data2 = await result.ReadAsync<CPLDAT009>();
                    objResult.data3 = await result.ReadAsync<ErrorSQL>();
                    objResult.data4 = await result.ReadAsync<ResutladoValidacion>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // VALIDAR ARREGLO
        public async Task<Result> procValidarPresentacionPintado(TokenData DatosToken, CPLDAT009TD_002 datos)
        {
            Result objResult = new Result();

            List<CPLDAT009> eDato = new List<CPLDAT009>();
            CPLDAT009 tmpDato;

            for (int i = 0; i < datos.datos.Count; i++)
            {
                tmpDato = new CPLDAT009();
                tmpDato.ID = datos.datos[i].ID;
                tmpDato.OP1 = datos.datos[i].OP1;
                tmpDato.Fecha1 = datos.datos[i].Fecha1;
                tmpDato.Multiplos1 = datos.datos[i].Multiplos1;
                tmpDato.Ancho1 = datos.datos[i].Ancho1;
                tmpDato.Largo1 = datos.datos[i].Largo1;
                tmpDato.Lam1 = datos.datos[i].Lam1;
                tmpDato.Piezas1 = datos.datos[i].Piezas1;
                tmpDato.OP2 = datos.datos[i].OP2;
                tmpDato.Fecha2 = datos.datos[i].Fecha2;
                tmpDato.Multiplos2 = datos.datos[i].Multiplos2;
                tmpDato.Ancho2 = datos.datos[i].Ancho2;
                tmpDato.Largo2 = datos.datos[i].Largo2;
                tmpDato.Lam2 = datos.datos[i].Lam2;
                tmpDato.Piezas2 = datos.datos[i].Piezas2;
                tmpDato.OP3 = datos.datos[i].OP3;
                tmpDato.Fecha3 = datos.datos[i].Fecha3;
                tmpDato.Multiplos3 = datos.datos[i].Multiplos3;
                tmpDato.Ancho3 = datos.datos[i].Ancho3;
                tmpDato.Largo3 = datos.datos[i].Largo3;
                tmpDato.Lam3 = datos.datos[i].Lam3;
                tmpDato.Piezas3 = datos.datos[i].Piezas3;
                tmpDato.AnchoTotal = datos.datos[i].AnchoTotal;
                tmpDato.AnchoPapel = datos.datos[i].AnchoPapel;
                tmpDato.Refile = datos.datos[i].Refile;
                tmpDato.MetrosLineales = datos.datos[i].MetrosLineales;
                tmpDato.Producto1 = datos.datos[i].Producto1;
                tmpDato.Producto2 = datos.datos[i].Producto2;
                tmpDato.Producto3 = datos.datos[i].Producto3;
                tmpDato.Parcial1 = datos.datos[i].Parcial1;
                tmpDato.Parcial2 = datos.datos[i].Parcial2;
                tmpDato.Parcial3 = datos.datos[i].Parcial3;
                tmpDato.Puntos = datos.datos[i].Puntos;
                tmpDato.Resistencia = datos.datos[i].Resistencia;
                tmpDato.Flauta = datos.datos[i].Flauta;
                tmpDato.Tranf = datos.datos[i].Tranf;
                tmpDato.Empate = datos.datos[i].Empate;
                tmpDato.Cliente1 = datos.datos[i].Cliente1;
                tmpDato.Articulo1 = datos.datos[i].Articulo1;
                tmpDato.Cliente2 = datos.datos[i].Cliente2;
                tmpDato.Articulo2 = datos.datos[i].Articulo2;
                tmpDato.Cliente3 = datos.datos[i].Cliente3;
                tmpDato.Articulo3 = datos.datos[i].Articulo3;
                tmpDato.Rest1 = datos.datos[i].Rest1;
                tmpDato.Rest2 = datos.datos[i].Rest2;
                tmpDato.Rest3 = datos.datos[i].Rest3;
                tmpDato.ConScore = datos.datos[i].ConScore;
                tmpDato.ConScore2 = datos.datos[i].ConScore2;
                tmpDato.ConScore3 = datos.datos[i].ConScore3;
                tmpDato.AnchoStd = datos.datos[i].AnchoStd;
                tmpDato.Seleccionado = datos.datos[i].Seleccionado;
                tmpDato.ErrorResistencia = datos.datos[i].ErrorResistencia;
                tmpDato.Pintado1 = datos.datos[i].Pintado1;
                tmpDato.Pintado2 = datos.datos[i].Pintado2;
                tmpDato.Pintado3 = datos.datos[i].Pintado3;
                eDato.Add(tmpDato);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QueryMultipleAsync(
                        "ProcValidarArreglos2",
                        new
                        {
                            pZonaERP = DatosToken.Zona,
                            pUsuarioERP = DatosToken.Usuario,
                            pModulo = datos.pModulo.ToString().Trim(),
                            pCuchillas3 = datos.pCuchillas3,
                            pResistencia = datos.pResistencia.ToString().Trim(),
                            pData = Ds.CreateDataTable(eDato).AsTableValuedParameter("CPLDAT009TD_002")
                        },
                    commandType: CommandType.StoredProcedure, commandTimeout: 1200); // 20 mins
                    objResult.data2 = await result.ReadAsync<ResData>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }



        public async Task<Result> getConfiguracion(TokenData DatosToken)
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
                            Opcion = 10,
                            Usuario = DatosToken.Usuario
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<clsConfiguracion>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        //actualizarConfiguracion
        public async Task<Result> actualizarConfiguracion(TokenData DatosToken, clsConfiguracion datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CPLCAP005SPActConfiguracion",
                        new
                        {
                            Opcion = 1,
                            idSession = datos.idsesion,
                            UsuarioERP = DatosToken.Usuario,
                            Resistencia = datos.resistencia,
                            NumCuchillas = Convert.ToInt16("0" + datos.numcuchillas),
                            EsActivo =  1  // datos.esactivo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = datos; // result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> CerrarSession(TokenData DatosToken, clsConfiguracion datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CPLCAP005SPActConfiguracion",
                        new
                        {
                            Opcion = 2,
                            idSession = datos.idsesion,
                            UsuarioERP = DatosToken.Usuario,
                            Resistencia = datos.resistencia,
                            NumCuchillas = datos.numcuchillas,
                            EsActivo = 1  // datos.esactivo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = datos; // result;
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
