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
    public class CPLCAP002Data
    {
        // =================================================================================================
        // FJLM 

        public async Task<Result> getDatosPrincipal(TokenData DatosToken, string clave)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP002SPLecJava",
                        new
                        {
                            Opcion = 1,
                            Clave = (clave == "" ? null : clave)
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ListadoPrincipal>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getNextClaveProceso(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP002SPLecJava",
                        new
                        {
                            Opcion = 2
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ClaveResistenciaProceso>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getExistePapel(TokenData DatosToken, string clavePapel)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP002SPLecJava",
                        new
                        {
                            Opcion = 3,
                            ClavePapelR = clavePapel
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ExistePapel>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getExistenciaPapel(TokenData DatosToken, string clavePapel, double anchoPapel)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP002SPLecJava",
                        new
                        {
                            Opcion = 4,
                            ClavePapelR = clavePapel,
                            AnchoPapelR = anchoPapel
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ExistenciaPapel>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getRollosTransito(TokenData DatosToken, string clavePapel, double anchoPapel)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP002SPLecJava",
                        new
                        {
                            Opcion = 5,
                            ClavePapelR = clavePapel,
                            AnchoPapelR = anchoPapel
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<RollosTransito>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getPapelesDefaultCotizacion(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP002SPLecJava",
                        new
                        {
                            Opcion = 6,
                            ZonaERP = DatosToken.Zona
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<PapelesDefaultCotizacion>();
                    objResult.data2 = await result.ReadAsync<PapelesDefaultCotizacion>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getCbxPreparacion(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP002SPLecJava",
                        new
                        {
                            Opcion = 7,
                            ZonaERP = DatosToken.Zona
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CbxPreparacion>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> insertUpdateCplDat002(TokenData DatosToken, ListaCplCap002 datos)
        {
            Result objResult = new Result();

            List<CplDat002Entity> eDato = new List<CplDat002Entity>();
            CplDat002Entity dts;

            for (int i = 0; i < datos.ListaDatos.Count; i++)
            {
                dts = new CplDat002Entity();
                dts.Orden = datos.ListaDatos[i].Orden;
                dts.Pulg = datos.ListaDatos[i].Pulg;
                dts.Clave = datos.ListaDatos[i].Clave;
                dts.Liner1 = datos.ListaDatos[i].Liner1;
                dts.Corrugado1 = datos.ListaDatos[i].Corrugado1;
                dts.Liner2 = datos.ListaDatos[i].Liner2;
                dts.Corrugado2 = datos.ListaDatos[i].Corrugado2;
                dts.Liner3 = datos.ListaDatos[i].Liner3;
                dts.Corrugado3 = datos.ListaDatos[i].Corrugado3;
                dts.Liner4 = datos.ListaDatos[i].Liner4;
                dts.Empalme1 = datos.ListaDatos[i].Empalme1;
                dts.Empalme2 = datos.ListaDatos[i].Empalme2;
                dts.Empalme3 = datos.ListaDatos[i].Empalme3;
                dts.Empalme4 = datos.ListaDatos[i].Empalme4;
                dts.EmpalmeC1 = datos.ListaDatos[i].EmpalmeC1;
                dts.EmpalmeC2 = datos.ListaDatos[i].EmpalmeC2;
                dts.EmpalmeC3 = datos.ListaDatos[i].EmpalmeC3;
                dts.AnchoL1 = datos.ListaDatos[i].AnchoL1;
                dts.AnchoEmpalme1 = datos.ListaDatos[i].AnchoEmpalme1;
                dts.AnchoL2 = datos.ListaDatos[i].AnchoL2;
                dts.AnchoEmpalme2 = datos.ListaDatos[i].AnchoEmpalme2;
                dts.AnchoL3 = datos.ListaDatos[i].AnchoL3;
                dts.AnchoEmpalme3 = datos.ListaDatos[i].AnchoEmpalme3;
                dts.AnchoL4 = datos.ListaDatos[i].AnchoL4;
                dts.AnchoEmpalme4 = datos.ListaDatos[i].AnchoEmpalme4;
                dts.AnchoC1 = datos.ListaDatos[i].AnchoC1;
                dts.AnchoEmpalmeC1 = datos.ListaDatos[i].AnchoEmpalmeC1;
                dts.AnchoC2 = datos.ListaDatos[i].AnchoC2;
                dts.AnchoEmpalmeC2 = datos.ListaDatos[i].AnchoEmpalmeC2;
                dts.AnchoC3 = datos.ListaDatos[i].AnchoC3;
                dts.AnchoEmpalmeC3 = datos.ListaDatos[i].AnchoEmpalmeC3;
                dts.Ancho = datos.ListaDatos[i].Ancho;

                eDato.Add(dts);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CPLCAP002SPActJava",
                        new
                        {
                            Opcion = 3,
                            ClaveProceso = datos.ClaveProceso,
                            Usuario = DatosToken.Usuario,
                            CplDat002 = Ds.CreateDataTable(eDato).AsTableValuedParameter("CPLDAT002TD_001")
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

        public async Task<Result> updateCplDat002(TokenData DatosToken, ListaCplCap002 datos)
        {
            Result objResult = new Result();

            List<CplDat002Entity2> eDato = new List<CplDat002Entity2>();
            CplDat002Entity2 dts;

            for (int i = 0; i < datos.ListaDatos2.Count; i++)
            {
                dts = new CplDat002Entity2();
                dts.Clave = datos.ListaDatos2[i].Clave;
                dts.Usar = datos.ListaDatos2[i].Usar;

                eDato.Add(dts);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CPLCAP002SPActJava",
                        new
                        {
                            Opcion = datos.Opc,
                            Usuario = DatosToken.Usuario,
                            CplDat002_2 = Ds.CreateDataTable(eDato).AsTableValuedParameter("CPLDAT002TD_002")
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

        // =================================================================================================
    }
}
