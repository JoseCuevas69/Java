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
    public class clsParosData
    {

        public async Task<Result> GetMaquinas(TokenData datosToken, string TipoMaquina)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG001MWSPC1", new { Opcion = 1, TipoMaquina },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<Maquina>();

            }
            return Result;
        }

        public async Task<Result> GetParos(TokenData datosToken, int startRow, int endRow, string TipoMaquina, string TipoTiempo, string ClaveMaquina, string Fecha)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG001MWSPC1", new { Opcion = 2, startRow, endRow, TipoMaquina, TipoTiempo, ClaveMaquina, Fecha},
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsParos>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }

            return Result;
        }

        public async Task<clsParos> Agregar(TokenData datosToken, clsParos parParos)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("PFCAPROG001MWSPA2",
                            new
                            {
                                Opcion = 1,
                                IDParo = parParos.idparo,
                                TipoTiempo = parParos.tipotiempo,
                                ClaveMaquina = parParos.clavemaquina,
                                Fecha = Convert.ToDateTime(parParos.fecha).ToString("yyyyMMdd"),
                                HoraIni = Convert.ToDateTime(parParos.horaini),
                                HoraFin = Convert.ToDateTime(parParos.horafin),
                                Comentario = parParos.comentario,
                                Estatus = parParos.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parParos;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsParos> Modificar(TokenData datosToken, clsParos parParos)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("PFCAPROG001MWSPA2",
                            new
                            {
                                Opcion = 2,
                                IDParo = parParos.idparo,
                                TipoTiempo = parParos.tipotiempo,
                                ClaveMaquina = parParos.clavemaquina,
                                Fecha = Convert.ToDateTime(parParos.fecha).ToString("yyyyMMdd"),
                                HoraIni = Convert.ToDateTime(parParos.horaini),
                                HoraFin = Convert.ToDateTime(parParos.horafin),
                                Comentario = parParos.comentario,
                                Estatus = parParos.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parParos;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsParos> Eliminar(TokenData datosToken, clsParos parParos)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("PFCAPROG001MWSPA2",
                            new
                            {
                                Opcion = 3,
                                IDParo = parParos.idparo,
                                TipoTiempo = parParos.tipotiempo,
                                ClaveMaquina = parParos.clavemaquina,
                                Fecha = Convert.ToDateTime(parParos.fecha).ToString("yyyyMMdd"),
                                HoraIni = Convert.ToDateTime(parParos.horaini),
                                HoraFin = Convert.ToDateTime(parParos.horafin),
                                Comentario = parParos.comentario,
                                Estatus = parParos.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parParos;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }




    }
}
