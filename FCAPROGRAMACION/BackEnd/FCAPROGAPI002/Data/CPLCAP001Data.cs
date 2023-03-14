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
    public class CPLCAP001Data
    {
        public async Task<Result> cargaInfo02(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "CPLCAP001SPLecJava",
                        new
                        {
                            Opcion = 1
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AnchosCPLDAT003>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> registrar(TokenData DatosToken, ListaDataAnchosCPLDAT003 datos)
        {
            Result objResult = new Result();

            List<AnchosCPLDAT003> eDato = new List<AnchosCPLDAT003>();
            AnchosCPLDAT003 dts;

            for (int i = 0; i < datos.Datos.Count; i++)
            {
                dts = new AnchosCPLDAT003();
                dts.Ancho = datos.Datos[i].Ancho;
                dts.Pulgadas = datos.Datos[i].Pulgadas;
                dts.Usar = datos.Datos[i].Usar;
                dts.Extra = datos.Datos[i].Extra;
                eDato.Add(dts);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "CPLCAP001SPActJava",
                        new
                        {
                            Opcion = 1,
                            AnchosUsar = Ds.CreateDataTable(eDato).AsTableValuedParameter("CPLCAP001TD_001")
                            // =================================================================================================================
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
    }
}
