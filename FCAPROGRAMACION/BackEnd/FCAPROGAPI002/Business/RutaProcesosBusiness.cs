using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;


namespace Business
{
    public class RutaProcesosBusiness
    {
        public Task<Result> ListarRutas(TokenData datosToken, int startRow, int endRow)
        {
            return new RutaProcesosData().ListarRutas(datosToken,startRow,endRow);
        }
        public Task<Result> ListarProcesosRutas(TokenData datosToken)
        {
            return new RutaProcesosData().ListarProcesosRutas(datosToken);
        }
        public Task<Result> GetDetalleProcesosRutas(TokenData datosToken,string ClaveProceso)
        {
            return new RutaProcesosData().GetDetalleProcesosRutas(datosToken,ClaveProceso);
        }
        public Task<Result> GuardaRutas(TokenData datosToken, EncabezadoDetalleRuta obj)
        {
            return new RutaProcesosData().GuardaRutas(datosToken, obj);
        }
        public Task<Result> ReactivaRutas(TokenData datosToken, EncabezadoRutaProcesosEntity obj)
        {
            return new RutaProcesosData().ReactivaRutas(datosToken,obj);
        }
        public Task<Result> EliminaRutas(TokenData datosToken, EncabezadoRutaProcesosEntity obj)
        {
            return new RutaProcesosData().EliminaRutas(datosToken,obj);
        }
    }
}
