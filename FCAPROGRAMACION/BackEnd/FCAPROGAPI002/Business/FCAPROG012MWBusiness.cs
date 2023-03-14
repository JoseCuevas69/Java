using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class FCAPROG012MWBusiness
    {
        public async Task<Result> cargaInfo02(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG012MWData().cargaInfo02(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> registrar(TokenData DatosToken, ListaDataAnchosCPLDAT003 datos)
        {
            try
            {
                return await new FCAPROG012MWData().registrar(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
