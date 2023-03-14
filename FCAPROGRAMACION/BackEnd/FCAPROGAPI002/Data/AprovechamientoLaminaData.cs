using Dapper;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Data.BDAdmon;

namespace Data
{
    public class AprovechamientoLaminaData
    {
        public async Task<Result> GetDatosOp(string strConexion, int Op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.AprovechamientoLamina + "",
                        new
                        {
                            Opcion = 1,
                            OP = Op
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ClaveArticuloporOpDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<DatosAprovLaminaDTO> GetConsultaDatos(string strConexion, int ClaveArticulo)
        {
            DatosAprovLaminaDTO objResult = new DatosAprovLaminaDTO();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.AprovechamientoLamina + "",
                        new
                        {
                            Opcion = 2,
                            ClaveArticulo = ClaveArticulo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.DatosGenerales = await result.ReadAsync<DatosGeneralesDTO>();
                    objResult.MaquinasProcesadas = await result.ReadAsync<MaquinasProcesadasDTO>();
                    objResult.SecuenciaImpresoras = await result.ReadAsync<SecuenciaImpresorasDTO>();
                    objResult.SecuenciaCorrugadora = await result.ReadAsync<SecuenciaCorrugadoraDTO>();
                    objResult.SaldoLamina = await result.ReadAsync<SaldoLaminaDTO>();
                    objResult.SaldoExcedentes = await result.ReadAsync<SaldoExcedentesDTO>();
                    objResult.SaldoExcedentes = await result.ReadAsync<SaldoExcedentesDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
