using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class FCAPROG013MWBusiness
    {
        // =================================================================================================================================
        // FJLM

        public async Task<Result> getDatosPrincipal(TokenData DatosToken, string clave)
        {
            try
            {
                return await new FCAPROG013MWData().getDatosPrincipal(DatosToken, clave);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getNextClaveProceso(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG013MWData().getNextClaveProceso(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getExistePapel(TokenData DatosToken, string clavePapel)
        {
            try
            {
                return await new FCAPROG013MWData().getExistePapel(DatosToken, clavePapel);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getExistenciaPapel(TokenData DatosToken, string clavePapel, string anchoPapel)
        {
            try
            {
                return await new FCAPROG013MWData().getExistenciaPapel(DatosToken, clavePapel, Convert.ToDouble(anchoPapel));
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getRollosTransito(TokenData DatosToken, string clavePapel, string anchoPapel)
        {
            try
            {
                return await new FCAPROG013MWData().getRollosTransito(DatosToken, clavePapel, Convert.ToDouble(anchoPapel));
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getPapelesDefaultCotizacion(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG013MWData().getPapelesDefaultCotizacion(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getCbxPreparacion(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG013MWData().getCbxPreparacion(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> insertUpdateCplDat002(TokenData DatosToken, ListaCplCap002 datos)
        {
            try
            {
                return await new FCAPROG013MWData().insertUpdateCplDat002(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> updateCplDat002(TokenData DatosToken, ListaCplCap002 datos)
        {
            try
            {
                return await new FCAPROG013MWData().updateCplDat002(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // =================================================================================================================================
    }
}
