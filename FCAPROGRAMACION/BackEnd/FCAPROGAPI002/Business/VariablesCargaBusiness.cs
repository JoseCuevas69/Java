using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class VariablesCargaBusiness
    {
        // =================================================================================================================================
        // FJLM
        public async Task<Result> getDatos(TokenData DatosToken)
        {
            try
            {
                return await new VariablesCargaData().getDatos(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GuardarDatos(TokenData DatosToken, ListaDataVariablesCargaEntity DtsDatos)
        {
            try
            {
                return await new VariablesCargaData().GuardarDatos(DatosToken, DtsDatos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        // =================================================================================================
    }
}
