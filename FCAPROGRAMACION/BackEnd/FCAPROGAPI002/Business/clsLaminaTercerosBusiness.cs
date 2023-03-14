using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;


namespace Business
{
    public class clsLaminaTercerosBusiness
    {
        public Task<Result> ObtieneAlmacenes(TokenData datosToken)
        {
            return new clsLaminaTercerosData().ObtieneAlmacenes(datosToken);
        }
        public Task<Result> DatosTraspasoOrigen(TokenData datosToken, string parOriAlmacen, string parOriOP)
        {
            return new clsLaminaTercerosData().DatosTraspasoOrigen(datosToken, parOriAlmacen, parOriOP);
        }
        public Task<Result> DatosTraspasoDestino(TokenData datosToken, string parDesAlmacen, string parDesOP)
        {
            return new clsLaminaTercerosData().DatosTraspasoDestino(datosToken, parDesAlmacen, parDesOP);
        }
        public Task<Result> ValidarDatos(TokenData datosToken, clsLamTerFiltros parLamTerFiltros)
        {
            return new clsLaminaTercerosData().ValidarDatos(datosToken, parLamTerFiltros);
        }
        public async Task<clsLamTerMovimiento> AplicarPreEntrada(TokenData datosToken, clsLamTerMovimiento parLamTerMovimiento)
        {
            try
            {
                return await new clsLaminaTercerosData().AplicarPreEntrada(datosToken, parLamTerMovimiento);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public Task<Result> AlmacenesOrigen(TokenData datosToken)
        {
            return new clsLaminaTercerosData().AlmacenesOrigen(datosToken);
        }
        public Task<Result> AlmacenesDestino(TokenData datosToken)
        {
            return new clsLaminaTercerosData().AlmacenesDestino(datosToken);
        }
        public async Task<clsLamTerMovimiento> AplicarTraspaso(TokenData datosToken, clsLamTerMovimiento parLamTerMovimiento)
        {
            try
            {
                return await new clsLaminaTercerosData().AplicarTraspaso(datosToken, parLamTerMovimiento);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
