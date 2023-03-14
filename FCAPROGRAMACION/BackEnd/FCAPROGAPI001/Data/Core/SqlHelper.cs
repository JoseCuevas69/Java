using Dapper;
using Data.BDAdmon;
using Data.Enums;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Data.Core
{
    public class SqlHelper
    {
        private readonly string _connectionString;

        public SqlHelper(string connectionString)
        {
            _connectionString = connectionString;
        }


        /// <summary>
        /// Ejecuta el SP indicado en modo de <see cref="SpTipo.Consulta"/> para retorarnar una colección <see cref="IEnumerable{T}"/> de elementos donde T es de tipo <typeparamref name="TResult"/>.
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="getSPName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public Task<Result<IEnumerable<TResult>>> ExecuteSPConsultaList<TResult>(Func<SPNombre, string> getSPName, object parameters)
        {
            var sp = new SPNombre(SpTipo.Consulta);
            string spName = getSPName(sp) ?? throw new ArgumentNullException("El nombre del SP no puede estar vacío");
            return Execute(async conn =>
            {
                var result = await conn.QueryAsync<TResult>(
                    spName,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            });
        }


        /// <summary>
        /// Ejecuta el SP indicado en modo de <see cref="SpTipo.Consulta"/> para retorar un valor del tipo <typeparamref name="TResult"/>.
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="getSPName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public Task<Result<TResult>> ExecuteSPConsultaSingle<TResult>(Func<SPNombre, string> getSPName, object parameters)
        {
            var sp = new SPNombre(SpTipo.Consulta);
            string spName = getSPName(sp) ?? throw new ArgumentNullException("El nombre del SP no puede estar vacío");
            return Execute(async conn =>
            {
                var result = await conn.QuerySingleOrDefaultAsync<TResult>(
                    spName,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            });
        }


        /// <summary>
        /// Ejecuta el SP indicado en modo de <see cref="SpTipo.Actualiza"/> para retorarnar una colección <see cref="IEnumerable{T}"/> de elementos donde T es de tipo <typeparamref name="TResult"/>.
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="getSPName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public Task<Result<IEnumerable<TResult>>> ExecuteSPActualiza<TResult>(Func<SPNombre, string> getSPName, object parameters)
        {
            var sp = new SPNombre(SpTipo.Actualiza);
            string spName = getSPName(sp) ?? throw new ArgumentNullException("El nombre del SP no puede estar vacío");
            return Execute(async conn =>
            {
                var result = await conn.QueryAsync<TResult>(
                    spName,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            });
        }


        /// <summary>
        /// Ejecuta el SP indicado en modo de <see cref="SpTipo.Actualiza"/> para retorar únicamente la cantidad de registros afectados.
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="getSPName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public Task<Result<int>> ExecuteSPActualiza(Func<SPNombre, string> getSPName, object parameters)
        {
            var sp = new SPNombre(SpTipo.Actualiza);
            string spName = getSPName(sp) ?? throw new ArgumentNullException("El nombre del SP no puede estar vacío");
            return Execute(async conn =>
            {
                var result = await conn.ExecuteAsync(
                    spName,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            });
        }



        private async Task<Result<TResult>> Execute<TResult>(Func<SqlConnection, Task<TResult>> execute)
        {
            var result = new Result<TResult>();
            try
            {
                using (var con = new SqlConnection(_connectionString))
                {
                    result.Data = await execute(con);
                    result.Success = true;
                }
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
            }

            return result;
        }
    }
}
