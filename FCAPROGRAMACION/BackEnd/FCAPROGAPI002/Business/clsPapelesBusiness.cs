using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;

namespace Business
{
    public class clsPapelesBusiness
    {
        public Task<Result> GetPapeles(TokenData datosToken, int startRow, int endRow, string ClavePapel, string Descripcion)
        {
            return new clsPapelesData().GetPapeles(datosToken, startRow, endRow, ClavePapel, Descripcion);
        }

        //GetPermisos
        public Task<Result> GetPermisos(TokenData datosToken, int startRow, int endRow)
        {
            return new clsPapelesData().GetPermisos(datosToken, startRow, endRow);
        }

        public async Task<clsPapeles> Agregar(TokenData datosToken, clsPapeles parPapeles)
        {
            try
            {
                return await new clsPapelesData().Agregar(datosToken, parPapeles);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsPapeles> Modificar(TokenData datosToken, clsPapeles parPapeles)
        {
            try
            {
                return await new clsPapelesData().Modificar(datosToken, parPapeles);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsPapeles> Eliminar(TokenData datosToken, clsPapeles parPapeles)
        {
            try
            {
                return await new clsPapelesData().Modificar(datosToken, parPapeles);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsPapeles> Modificar2(TokenData datosToken, clsPapeles parPapeles)
        {
            try
            {
                return await new clsPapelesData().Modificar2(datosToken, parPapeles);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
