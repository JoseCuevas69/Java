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
    public class clsReservaData
    {
        public async Task<Result> GetReservas(TokenData datosToken, int startRow, int endRow, string parZona)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG005MWSPC1", new { Opcion = 1, startRow, endRow },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsReserva>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }

            return Result;
        }

        public async Task<Result> ValidarFechas(TokenData datosToken, int startRow, int endRow, string parZona)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG005MWSPC1", new { Opcion = 1, startRow, endRow, parZona },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsReserva>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }

            return Result;
        }

        public async Task<Result> ObtenerDiasReservaExcedente(TokenData datosToken, int startRow, int endRow, string parZona)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG005MWSPC1", new { Opcion = 1, startRow, endRow, parZona },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsReserva>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }

            return Result;
        }

        public async Task<Result> ObtenerLimiteReserva(TokenData datosToken, int startRow, int endRow, string parZona)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG005MWSPC1", new { Opcion = 1, startRow, endRow, parZona },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsReserva>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }

            return Result;
        }

        public async Task<clsReserva> Agregar(TokenData datosToken, clsReserva parReserva)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG005MWSPA2",
                            new
                            {
                                Opcion = 1,
                                IdFolio = parReserva.idfolio,
                                FechaInicio = Convert.ToDateTime(parReserva.fechainicio).ToString("yyyyMMdd"),
                                FechaFin = Convert.ToDateTime(parReserva.fechafin).ToString("yyyyMMdd"),
                                Volumen = parReserva.volumen,
                                Comentario = parReserva.comentario,
                                UsuarioERP = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parReserva;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsReserva> Modificar(TokenData datosToken, clsReserva parReserva)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG005MWSPA2",
                            new
                            {
                                Opcion = 2,
                                IdFolio = parReserva.idfolio,
                                FechaInicio = Convert.ToDateTime(parReserva.fechainicio).ToString("yyyyMMdd"),
                                FechaFin = Convert.ToDateTime(parReserva.fechafin).ToString("yyyyMMdd"),
                                Volumen = parReserva.volumen,
                                Comentario = parReserva.comentario,
                                UsuarioERP = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parReserva;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsReserva> Eliminar(TokenData datosToken, clsReserva parReserva)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG005MWSPA2",
                            new
                            {
                                Opcion = 3,
                                IdFolio = parReserva.idfolio,
                                FechaInicio = Convert.ToDateTime(parReserva.fechainicio).ToString("yyyyMMdd"),
                                FechaFin = Convert.ToDateTime(parReserva.fechafin).ToString("yyyyMMdd"),
                                Volumen = parReserva.volumen,
                                Comentario = parReserva.comentario,
                                UsuarioERP = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parReserva;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
