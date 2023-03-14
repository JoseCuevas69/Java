using Data;
using Entity.DTO.Common;
using System.Threading.Tasks;

namespace Business
{
    public class MaquinasBusiness
    {
        public Task<Result> GetMaquinas(string strConexion, int startRow, int endRow, string tipoMaquina)
        {
            return new MaquinasData().GetMaquinas(strConexion, startRow, endRow, tipoMaquina);
        }
    }
}
