using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;


namespace Business
{
    public class clsFoliosCmbStdBusiness
    {
        public Task<Result> GetPermisosUsuario(TokenData datosToken)
        {
            return new clsFoliosCmbStdData().GetPermisosUsuario(datosToken);
        }

        public Task<Result> GetBuscarOPsxPrograma(TokenData datosToken, int startRow, int endRow, string parPrograma)
        {
            return new clsFoliosCmbStdData().GetBuscarOPsxPrograma(datosToken, startRow, endRow, parPrograma);
        }

        public Task<Result> GetEstandaresvsPropuesta(TokenData datosToken, int startRow, int endRow, string parPrograma, string parCveArticulo, string parOp)
        {
            return new clsFoliosCmbStdData().GetEstandaresvsPropuesta(datosToken, startRow, endRow, parPrograma, parCveArticulo, parOp);
        }

        public Task<Result> GetCombinacionEstPropuestas(TokenData datosToken, int startRow, int endRow, string parPrograma, string parOp)
        {
            return new clsFoliosCmbStdData().GetCombinacionEstPropuestas(datosToken, startRow, endRow, parPrograma, parOp);
        }



        public async Task<clsFoliosCmbStd> CmoDat125_Agregar(TokenData datosToken, clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat125_Agregar(datosToken, parFoliosCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsFoliosCmbStd> CmoDat125_Modificar(TokenData datosToken, clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat125_Modificar(datosToken, parFoliosCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsFoliosCmbStd> CmoDat125_Eliminar(TokenData datosToken, clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat125_Eliminar(datosToken, parFoliosCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<clsPropuestaCmbStd> CmoDat126_Agregar(TokenData datosToken, clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat126_Agregar(datosToken, parPropuestaCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsPropuestaCmbStd> CmoDat126_Modificar(TokenData datosToken, clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat126_Modificar(datosToken, parPropuestaCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsPropuestaCmbStd> CmoDat126_Eliminar(TokenData datosToken, clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat126_Eliminar(datosToken, parPropuestaCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<clsAutorizadoresCmbStd> CmoDat127_Agregar(TokenData datosToken, clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat127_Agregar(datosToken, parAutorizadoresCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsAutorizadoresCmbStd> CmoDat127_Modificar(TokenData datosToken, clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat127_Modificar(datosToken, parAutorizadoresCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsAutorizadoresCmbStd> CmoDat127_Eliminar(TokenData datosToken, clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat127_Eliminar(datosToken, parAutorizadoresCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<clsConceptosCmbStd> CmoDat132_Agregar(TokenData datosToken, clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat132_Agregar(datosToken, parConceptosCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsConceptosCmbStd> CmoDat132_Modificar(TokenData datosToken, clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat132_Modificar(datosToken, parConceptosCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsConceptosCmbStd> CmoDat132_Eliminar(TokenData datosToken, clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                return await new clsFoliosCmbStdData().CmoDat132_Eliminar(datosToken, parConceptosCmbStd);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
