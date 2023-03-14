using Dapper;
using Entity;
using Entity.DTO.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Entity.DTO;
using System;
using System.Data;

namespace Data
{
    public class clsArticuloEspData
    {
        //public async Task<Result> GetReservas(TokenData datosToken, int startRow, int endRow, string parZona)
        //{
        //    var Result = new Result();
        //    using (var con = new SqlConnection(datosToken.Conexion))
        //    {
        //        var results = await con.QueryMultipleAsync("FCAPROG005MWSPC1", new { Opcion = 1, startRow, endRow },
        //            commandType: System.Data.CommandType.StoredProcedure);
        //        Result.data = await results.ReadAsync<clsReserva>();
        //        Result.totalRecords = await results.ReadFirstAsync<int>();
        //    }

        //    return Result;
        //}
        public async Task<Result> GetMaquinas(TokenData datosToken)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG009MWC1", new { Opcion = 3},
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<Maquina>();
                Result.totalRecords = 1;

            }
            return Result;
        }

        public async Task<Result> GetArticulos(TokenData datosToken, int startRow, int endRow, string parDescripcion)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG009MWC1", new { Opcion = 4, startRow = startRow, endRow = endRow, Descripcion = parDescripcion },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsArticulos>();
                //Result.totalRecords = 1;
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }
            return Result;
        }

        public async Task<Result> GetArticuloEspecialesEnc (TokenData datosToken, string parClaveArticulo, string parClaveMaquina, string parDescripcion)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG009MWC1", new 
                {  
                    Opcion = 1,
                    ClaveArticulo= parClaveArticulo,
                    ClaveMaquina = parClaveMaquina,
                    Descripcion = parDescripcion
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsArticuloEsp>();
                Result.totalRecords = 1;
                //Result.totalRecords = await results.ReadFirstAsync<int>();
            }

            return Result;
        }

        public async Task<Result> GetArticuloEspecialesDet(TokenData datosToken, string parClaveArticulo, string parClaveMaquina, string parDescripcion)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG009MWC1", new
                {
                    Opcion = 2,
                    ClaveArticulo = parClaveArticulo,
                    ClaveMaquina = parClaveMaquina,
                    Descripcion = parDescripcion
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsArticuloEspDet>();
                //Result.totalRecords = 7;
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }

            return Result;
        }

        public async Task<clsArticuloEsp> AgregarEnc(TokenData datosToken, clsArticuloEsp parArticuloEsp)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG009MWA2",
                            new
                            {
                                Opcion = 1,
                                ClaveArticulo = parArticuloEsp.clavearticulo,
                                VelocidadStdCorr = Convert.ToDecimal("0"+ parArticuloEsp.velocidadstdcorr),
                                VelocidadStdImp = Convert.ToDecimal("0" + parArticuloEsp.velocidadstdimp),
                                Seccionada = parArticuloEsp.seccionada,
                                SetUp = Convert.ToDecimal("0" + parArticuloEsp.setup),
                                UsuarioERP = datosToken.Usuario,
                                ClaveMaquina = "",
                                VelocidadStd = Convert.ToDecimal("0"),
                                Proceso1 = false 
                            },
                            commandType: CommandType.StoredProcedure);

                    return parArticuloEsp;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsArticuloEsp> ModificarEnc(TokenData datosToken, clsArticuloEsp parArticuloEsp)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG009MWA2",
                            new
                            {
                                Opcion = 2,
                                ClaveArticulo = parArticuloEsp.clavearticulo,
                                VelocidadStdCorr = Convert.ToDecimal("0" + parArticuloEsp.velocidadstdcorr),
                                VelocidadStdImp = Convert.ToDecimal("0" + parArticuloEsp.velocidadstdimp),
                                Seccionada = parArticuloEsp.seccionada,
                                SetUp = Convert.ToDecimal("0" + parArticuloEsp.setup),
                                UsuarioERP = datosToken.Usuario,
                                ClaveMaquina = "",
                                VelocidadStd = Convert.ToDecimal("0"),
                                Proceso1 = false
                            },
                            commandType: CommandType.StoredProcedure);

                    return parArticuloEsp;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsArticuloEsp> EliminarEnc(TokenData datosToken, clsArticuloEsp parArticuloEsp)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG009MWA2",
                            new
                            {
                                Opcion = 3,
                                ClaveArticulo = parArticuloEsp.clavearticulo,
                                VelocidadStdCorr = Convert.ToDecimal("0" + parArticuloEsp.velocidadstdcorr),
                                VelocidadStdImp = Convert.ToDecimal("0" + parArticuloEsp.velocidadstdimp),
                                Seccionada = parArticuloEsp.seccionada,
                                SetUp = Convert.ToDecimal("0" + parArticuloEsp.setup),
                                UsuarioERP = datosToken.Usuario,
                                ClaveMaquina = "",
                                VelocidadStd = Convert.ToDecimal("0"),
                                Proceso1 = false
                                //ClaveArticulo = parArticuloEsp.clavearticulo,
                                //VelocidadStdCorr = parArticuloEsp.velocidadstdcorr,
                                //VelocidadStdImp = parArticuloEsp.velocidadstdimp,
                                //Seccionada = parArticuloEsp.seccionada,
                                //SetUp = parArticuloEsp.setup,
                                //UsuarioERP = datosToken.Usuario,
                                //ClaveMaquina = "",
                                //VelocidadStd = "",
                                //Proceso1 = ""
                            },
                            commandType: CommandType.StoredProcedure);

                    return parArticuloEsp;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsArticuloEspDet> AgregarDet(TokenData datosToken, clsArticuloEspDet parArticuloEspDet)
        {
            try
            {

//DECLARE @Opcion TinyInt = 4
//DECLARE @ClaveArticulo  VARchar(15) = '0000200002TP'
//DECLARE @VelocidadStdCorr  decimal(6, 2) = 80
//DECLARE @VelocidadStdImp  decimal(6, 2) = 0
//DECLARE @Seccionada  bit = 0
//DECLARE @SetUp decimal(6, 2) = 0
//DECLARE @UsuarioERP char(6) = '001000'
//------------------------------------------
//DECLARE @ClaveMaquina char(10) = 'CECS2'
//DECLARE @VelocidadStd decimal(6, 2) = 150
//DECLARE @Proceso1 bit = 0
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG009MWA2",
                            new
                            {
                                Opcion = 4,
                                ClaveArticulo = parArticuloEspDet.clavearticulo,
                                VelocidadStdCorr = Convert.ToDecimal("0.0"), 
                                VelocidadStdImp = Convert.ToDecimal("0.0"), 
                                Seccionada = 0, 
                                SetUp = Convert.ToDecimal("0" + parArticuloEspDet.setup),
                                UsuarioERP = datosToken.Usuario,
                                ClaveMaquina = parArticuloEspDet.clavemaquina,
                                VelocidadStd = Convert.ToDecimal("0" + parArticuloEspDet.velocidadstd),
                                Proceso1 = parArticuloEspDet.proceso1
                            },
                            commandType: CommandType.StoredProcedure);

                    return parArticuloEspDet;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsArticuloEspDet> ModificarDet(TokenData datosToken, clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG009MWA2",
                            new
                            {
                                Opcion = 5,
                                //ClaveArticulo = parArticuloEspDet.clavearticulo,
                                //VelocidadStdCorr = 0,
                                //VelocidadStdImp = 0,
                                //Seccionada = 0,
                                //SetUp = parArticuloEspDet.setup,
                                //UsuarioERP = datosToken.Usuario,
                                //ClaveMaquina = parArticuloEspDet.clavemaquina,
                                //VelocidadStd = parArticuloEspDet.velocidadstd,
                                //Proceso1 = parArticuloEspDet.proceso1
                                //Opcion = 4,
                                ClaveArticulo = parArticuloEspDet.clavearticulo,
                                VelocidadStdCorr = Convert.ToDecimal("0.0"),
                                VelocidadStdImp = Convert.ToDecimal("0.0"),
                                Seccionada = 0,
                                SetUp = Convert.ToDecimal("0" + parArticuloEspDet.setup),
                                UsuarioERP = datosToken.Usuario,
                                ClaveMaquina = parArticuloEspDet.clavemaquina,
                                VelocidadStd = Convert.ToDecimal("0" + parArticuloEspDet.velocidadstd),
                                Proceso1 = parArticuloEspDet.proceso1
                            },
                            commandType: CommandType.StoredProcedure);

                    return parArticuloEspDet;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsArticuloEspDet> EliminarDet(TokenData datosToken, clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG009MWA2",
                            new
                            {
                                Opcion = 6,
                                ClaveArticulo = parArticuloEspDet.clavearticulo,
                                VelocidadStdCorr = Convert.ToDecimal("0.0"),
                                VelocidadStdImp = Convert.ToDecimal("0.0"),
                                Seccionada = 0,
                                SetUp = Convert.ToDecimal("0" + parArticuloEspDet.setup),
                                UsuarioERP = datosToken.Usuario,
                                ClaveMaquina = parArticuloEspDet.clavemaquina,
                                VelocidadStd = Convert.ToDecimal("0" + parArticuloEspDet.velocidadstd),
                                Proceso1 = parArticuloEspDet.proceso1
                            },
                            commandType: CommandType.StoredProcedure);

                    return parArticuloEspDet;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
