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
    public class clsLaminaTercerosData
    {
        string pvarError= string.Empty;

        #region Metodos - CMO084MW - Captura de Recepcion de Lamina Terceros.
        public async Task<Result> ObtieneAlmacenes(TokenData datosToken)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("CmoSP533", new { Opcion = 1, Usuario = datosToken.Usuario },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsAlmacen>();
                Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }
        public async Task<Result> DatosTraspasoOrigen(TokenData datosToken, string parOriAlmacen, string parOriOP)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("CmoSP533", new { Opcion = 3, OriOP = parOriOP, OriAlmacen = parOriAlmacen },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsLamTerResultado>();
                Result.totalRecords = 1;
                //Result.totalRecords = await results.ReadFirstAsync<int>();
            }
            return Result;
        }
        public async Task<Result> DatosTraspasoDestino(TokenData datosToken, string parDesAlmacen, string parDesOP)
        { // Des
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("CmoSP533", new { Opcion = 4, DesOP = parDesAlmacen, DesAlmacen = parDesOP },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsLamTerResultado>();
                Result.totalRecords = 1;
                //Result.totalRecords = await results.ReadFirstAsync<int>();
            }
            return Result;
        }
        public async Task<Result> ValidarDatos(TokenData datosToken, clsLamTerFiltros parLamTerFiltros)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("CmoSP533", new { 
                    Opcion = 3,

                    //OriAlmacen = parLamTerFiltros.orialmacen,
                    //OriOP = parLamTerMovimiento.oriop,
                    //DesAlmacen = parLamTerMovimiento.desalmacen,
                    //DesOP = parLamTerMovimiento.desop,
                    //CanTransferir = Convert.ToDouble("0" + parLamTerMovimiento.cantransferir),


                    OriAlmacen = parLamTerFiltros.OriAlmacen,
                    OriOP = parLamTerFiltros.OriAlmacen,
                    DesAlmacen = parLamTerFiltros.OriAlmacen,
                    DesOP = parLamTerFiltros.OriAlmacen,
                    //Zona = parLamTerFiltros.OriAlmacen,
                    CanTransferir = Convert.ToDouble("0" + parLamTerFiltros.CanTransferir),
                    UsuarioERP = datosToken.Usuario,
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsLamTerResultado>();
                Result.totalRecords = 1;
                //Result.totalRecords = await results.ReadFirstAsync<int>();
            }
            return Result;
        }
        public async Task<bool> ValidarPeriodo(TokenData datosToken, clsLamTerFiltros parLamTerFiltros)
        {
            bool booReturn = false;
            int intEstatus = 0;
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                

                var results = await con.QueryMultipleAsync("CmoSP533", new
                {
                    Opcion = 3,
                    Programa = "CmoCap044",
                    Periodo = DateTime.Now.ToString("01/MM/yyyy"),
                    TipoAlmacen = "PT",                   
                },
                    commandType: System.Data.CommandType.StoredProcedure);

                Result.data = await results.ReadAsync<clsLamTerResultado>();

                if (pvarError != null)
                {
                    if (pvarError.Length > 0) throw new Exception(pvarError);
                }

                //object data
                /*foreach (object Ren in Result.data[]) //dtsReturn.Tables[0].Rows)
                {
                    //intEstatus = Ren
                        //Convert.ToInt16(Ren["Estatus"].ToString());
                }*/

                if (intEstatus == 0)
                {
                    booReturn = true;
                }
                else if (intEstatus == 2)
                {
                    throw new Exception("Este modulo del sistema ERp no esta dado de alta en el periodo ( " + DateTime.Now.ToString("MMM/yyyy") + ")" + "\n" +
                                        "Actualmente se Encuentra bloqueado, Notificarlo a Control de inventarios ");
                }
                else
                {
                    throw new Exception("Este Modulo no Puede Hacer movimientos  En el Periodo ( " + DateTime.Now.ToString("MMM/yyyy") + ")" + "\n" +
                                        "Por lo tanto no se podra  hacer la Recepcion de PT, Notificarlo a Control de Inventarios ");
                }
            }
            return booReturn;
        }
        public async Task<clsLamTerMovimiento> AplicarPreEntrada(TokenData datosToken, clsLamTerMovimiento parLamTerMovimiento) 
            //AgregarEnc(TokenData datosToken, clsArticuloEsp parArticuloEsp)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("CmoSP534",
                            new
                            {
                                Opcion = 1,

                                OriAlmacen = parLamTerMovimiento.orialmacen,
                                OriOP = parLamTerMovimiento.oriop,
                                DesAlmacen = parLamTerMovimiento.desalmacen,
                                DesOP = parLamTerMovimiento.desop,
                                CanTransferir = Convert.ToDouble("0" + parLamTerMovimiento.cantransferir),
                                //OriAlmacen = parLamTerMovimiento.OriAlmacen,
                                //OriOP = parLamTerMovimiento.OriAlmacen,
                                //DesAlmacen = parLamTerMovimiento.OriAlmacen,
                                //DesOP = parLamTerMovimiento.OriAlmacen,
                                //CanTransferir = Convert.ToDouble("0" + parLamTerMovimiento.CanTransferir),
                                Usuario = datosToken.Usuario,
                            },
                            commandType: CommandType.StoredProcedure);

                    return parLamTerMovimiento;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        #endregion

        #region Metodos - CMO085MW - Captura de Transferencia de Lamina Terceros.
        public async Task<Result> AlmacenesOrigen(TokenData datosToken)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("CmoSP533", new { Opcion = 1, Usuario = datosToken.Usuario },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsAlmacen>();
                Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }
        public async Task<Result> AlmacenesDestino(TokenData datosToken)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("CmoSP533", new { Opcion = 2, Usuario = datosToken.Usuario },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsAlmacen>();
                Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }
        public async Task<clsLamTerMovimiento> AplicarTraspaso(TokenData datosToken, clsLamTerMovimiento parLamTerMovimiento)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("CmoSP534",
                            new
                            {
                                Opcion = 4,
                                OriAlmacen = parLamTerMovimiento.orialmacen,
                                OriOP = parLamTerMovimiento.oriop,
                                DesAlmacen = parLamTerMovimiento.desalmacen,
                                DesOP = parLamTerMovimiento.desop,
                                CanTransferir = Convert.ToDouble("0" + parLamTerMovimiento.cantransferir),
                                Usuario = datosToken.Usuario,
                            },
                            commandType: CommandType.StoredProcedure);

                    return parLamTerMovimiento;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        #endregion

    }
}
