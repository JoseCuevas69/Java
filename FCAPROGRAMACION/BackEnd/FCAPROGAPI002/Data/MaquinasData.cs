using Dapper;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Data
{
    public class MaquinasData
    {
        public async Task<Result> GetMaquinas(string strConexion, int startRow, int endRow, string TipoMaquina)
        {
            var Result = new Result();
            using (var con = new SqlConnection(strConexion))
            {
                var results = await con.QueryMultipleAsync("FCAPRODCAT003SPC", new { Opcion = 1, startRow, endRow, TipoMaquina },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<Maquina>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }
            return Result;
        }
    }
}
