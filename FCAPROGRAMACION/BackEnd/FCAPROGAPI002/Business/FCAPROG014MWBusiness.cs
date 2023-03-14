using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class FCAPROG014MWBusiness
    {
        public async Task<Result> getDatos(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG014MWData().getDatos(DatosToken);
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
                return await new FCAPROG014MWData().getComboModificar(DatosToken);
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
                return await new FCAPROG014MWData().GuardarDatos(DatosToken, datos);
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
                return await new FCAPROG014MWData().registrar(DatosToken, datos);
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
                return await new FCAPROG014MWData().modificar(DatosToken, datos);
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
                return await new FCAPROG014MWData().eliminar(DatosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
