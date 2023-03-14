using Dapper;
using Entity;
using Entity.DTO.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Entity.DTO;
using System;
using System.Data;
using Data.BDAdmon;

namespace Data
{
    public class EstandaresImpData
    {
        public async Task<Result> ListarMaquinas(TokenData datosToken, string TipoMaquina)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras+"1", new { Opcion = 1, TipoMaquina },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<Maquinas>();

            }
            return Result;
        }

        public async Task<Result> ListarEstandares(TokenData datosToken, int startRow,int endRow, string TipoMaquina,string ClaveMAquina)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "1", new { Opcion = 2, TipoMaquina,ClaveMAquina,startRow,endRow },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<EstandaresImpEntity>();
                Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }

        public async Task<Result> ListarProcesos(TokenData datosToken, string TipoMaquina, string ClaveMAquina)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "1", new { Opcion = 3, TipoMaquina, ClaveMAquina},
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<Procesos>();
                //Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }

        public async Task<Result> GetEficiencia(TokenData datosToken, string ClaveMaquina)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "1", new { Opcion = 4, ClaveMaquina },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<EstandaresImpEntity>();
                //Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }

        public async Task<Result> ListarVelocidadEstandar(TokenData datosToken, int startRow, int endRow, string ClaveMaquina)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "1", new { Opcion = 5,  ClaveMaquina, startRow, endRow },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<VelocidadEstandar>();
                Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }

        public async Task<Result> ExisteTurno(TokenData datosToken, string ClaveMaquina,string ClaveArea,string Turno)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "1", new { Opcion = 6, ClaveMaquina,ClaveArea,Turno },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<HorariosComida>();

            }
            return Result;
        }


        public async Task<Result> ActulizaTiempoEstPre(TokenData datosToken, EstandaresImpEntity obj)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "2", new 
                { 
                    Opcion = 1, 
                    obj.TipoMaquina,
                    obj.ClaveMaquina,
                    obj.ClaveProceso,
                    obj.TiempoStd,
                    obj.Eficiencia,
                    obj.VelocidadObjetivo,
                    UsuarioERP=datosToken.Usuario
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                //Result.data = await results.ReadAsync<EstandaresImpEntity>();
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }

        public async Task<Result> EliminaTiempoEstPre(TokenData datosToken, EstandaresImpEntity obj)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "2", new
                {
                    Opcion = 2,
                    obj.ClaveMaquina,
                    obj.ClaveProceso,
                    UsuarioERP = datosToken.Usuario
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                //Result.data = await results.ReadAsync<EstandaresImpEntity>();
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }

        public async Task<Result> ActulizaVelocidadEstandar(TokenData datosToken, VelocidadEstandar obj)
        {
            var Result = new Result();
           // SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "2", new
                {
                    Opcion = 3,
                    obj.ClaveMaquina,
                    obj.AreaInicial,
                    obj.AreaFinal,
                    obj.VelocidadStd,
                    UsuarioERP = datosToken.Usuario
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                //Result.data = await results.ReadAsync<EstandaresImpEntity>();
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }

        public async Task<Result> EliminarVelocidadEstandar(TokenData datosToken, VelocidadEstandar obj)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "2", new
                {
                    Opcion = 4,
                    obj.ClaveMaquina,
                    obj.AreaInicial,
                    obj.AreaFinal,
                    obj.VelocidadStd,
                    UsuarioERP = datosToken.Usuario
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                //Result.data = await results.ReadAsync<EstandaresImpEntity>();
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }

        public async Task<Result> GuardaHorariosComida(TokenData datosToken, HorariosComida obj)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "2", new
                {
                    Opcion = 5,
                    obj.ClaveArea,
                    obj.Turno,
                    obj.Descripcion,
                    obj.HoraInicio,
                    obj.HoraFinal,
                    obj.ClaveMaquina,
                    UsuarioERP = datosToken.Usuario
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                //Result.data = await results.ReadAsync<EstandaresImpEntity>();
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }

        public async Task<Result> ModificaHorariosComida(TokenData datosToken, HorariosComida obj)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                var results = await con.QueryMultipleAsync(nombre.EstandaresImpresoras + "2", new
                {
                    Opcion = 6,
                    obj.ClaveArea,
                    obj.Turno,
                    obj.HoraInicio,
                    obj.HoraFinal,
                    obj.ClaveMaquina,
                    UsuarioERP = datosToken.Usuario
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                //Result.data = await results.ReadAsync<EstandaresImpEntity>();
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }
    }
}
