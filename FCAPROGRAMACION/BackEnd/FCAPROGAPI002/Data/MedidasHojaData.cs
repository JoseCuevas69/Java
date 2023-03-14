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
    public class MedidasHojaData
    {
        public async Task<Result> GetDatArticulo(string strConexion, string claveArticulo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.MedidasHoja + "1",
                        new
                        {
                            Opcion = 1,
                            ClaveArticulo = claveArticulo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadFirstAsync<ArticuloDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Agregar(TokenData datosToken, ArticuloDTO art)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    TranformaDataTable Ds = new TranformaDataTable();
                    await con.QueryFirstOrDefaultAsync(
                        nombre.MedidasHoja + "2",
                        new
                        {
                            Opcion = 1,
                            Usuario = datosToken.Usuario,
                            ClaveArticulo = art.ClaveArticulo,
                            AnchoHoja = art.AnchoHoja,
                            LargoHoja = art.LargoHoja,
                            ConScore = art.ConScore,
                            PiezasXHoja = art.PiezasXHoja,
                            PzasxLargo = art.PzasxLargo,
                            PzasxAncho = art.PzasxAncho,
                            AumLargo = art.AumLargo,
                            AumAncho = art.AumAncho,
                            SoloLamina = art.SoloLamina

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    return objResult;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                return objResult;
            }
        }
    }
}
