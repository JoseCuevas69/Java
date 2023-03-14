using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class CPLCAP003Business
    {
        public async Task<Result> getDatos(TokenData DatosToken)
        {
            try
            {
                return await new CPLCAP003Data().getDatos(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getComboModificar(TokenData DatosToken)
        {
            try
            {
                return await new CPLCAP003Data().getComboModificar(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GuardarDatos(TokenData DatosToken, ParametrosCPLCAP003 datos)
        {
            try
            {
                return await new CPLCAP003Data().GuardarDatos(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> registrar(TokenData DatosToken, DatosComboCPLCAP003 datos)
        {
            try
            {
                return await new CPLCAP003Data().registrar(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> modificar(TokenData DatosToken, DatosComboCPLCAP003 datos)
        {
            try
            {
                return await new CPLCAP003Data().modificar(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> eliminar(TokenData DatosToken, DatosComboCPLCAP003 datos)
        {
            try
            {
                return await new CPLCAP003Data().eliminar(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
