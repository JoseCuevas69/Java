using Data;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class AprovechamientoLaminaBusiness
    {
        public Task<Result> GetDatosOp(string strConexion , int Op)
        {
            return new AprovechamientoLaminaData().GetDatosOp(strConexion, Op);
        }
    }
}
