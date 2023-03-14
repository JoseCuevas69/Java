using Dapper;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class VariablesCargaData
    {
        // =================================================================================================
        // FJLM 
        public async Task<Result> getDatos(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CMO070MWSPLecJava",
                        new
                        {
                            Opcion = 1
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<VariablesCargaEntity>();
                    objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> GuardarDatos(TokenData DatosToken, ListaDataVariablesCargaEntity DtsDatos)
        {
            Result objResult = new Result();

            List<VariablesCargaEntity> eDato = new List<VariablesCargaEntity>();
            VariablesCargaEntity dts;

            for (int i = 0; i < DtsDatos.listaDatosCarga.Count; i++)
            {
                dts = new VariablesCargaEntity();
                dts.IdParametro = DtsDatos.listaDatosCarga[i].IdParametro;
                dts.Parametro = DtsDatos.listaDatosCarga[i].Parametro;
                dts.Descripcion = DtsDatos.listaDatosCarga[i].Descripcion;
                dts.Valor = DtsDatos.listaDatosCarga[i].Valor;
                eDato.Add(dts);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CMO070MWSPActJava",
                        new
                        {
                            Opcion = 1,
                            UsuarioERP = DatosToken.Usuario,
                            Datos = Ds.CreateDataTable(eDato).AsTableValuedParameter("CMO070MWTD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        // =================================================================================================
    }
}
