using Dapper;
using Entity;
using Entity.DTO.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Entity.DTO;
using System;
using System.Data;
using System.Xml.Serialization;
using Data.BDAdmon;

namespace Data
{
    public class RutaProcesosData
    {
        public async Task<Result> ListarRutas(TokenData datosToken, int startRow,int endRow)
        {
            var Result = new Result();
          //  SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.RutaProcesos+"1", new { Opcion = 1,startRow,endRow,datosToken.Zona},
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<EncabezadoRutaProcesosEntity>();
                Result.totalRecords = await results.ReadFirstAsync<int>();

            }
            return Result;
        }

        public async Task<Result> ListarProcesosRutas(TokenData datosToken)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.RutaProcesos + "1", new { Opcion = 2, datosToken.Zona },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<ProcesosRutas>();

            }
            return Result;
        }

        public async Task<Result> GetDetalleProcesosRutas(TokenData datosToken,string ClaveProceso)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                var results = await con.QueryMultipleAsync(nombre.RutaProcesos + "1", new { Opcion = 3,ClaveProceso, datosToken.Zona },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<DetalleRutaProcesos>();

            }
            return Result;
        }

        public async Task<Result> GuardaRutas(TokenData datosToken, EncabezadoDetalleRuta obj)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                DataSet dtsDetalle;
                dtsDetalle = SerializedDataSet(obj.DetalleRutas);

                var results = await con.QueryMultipleAsync(nombre.RutaProcesos+"2", new
                {
                    Opcion = 1,
                    obj.Encabezado.Clave,
                    obj.Encabezado.Descripcion,
                    obj.Encabezado.M1,
                    obj.Encabezado.M2,
                    obj.Encabezado.M3,
                    obj.Encabezado.M4,
                    DetalleRutas = dtsDetalle.Tables[0],
                    UsuarioERP=datosToken.Usuario,
                    datosToken.Zona
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }

        public async Task<Result> ReactivaRutas(TokenData datosToken,EncabezadoRutaProcesosEntity obj)
        {
            var Result = new Result();
           // SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);

                var results = await con.QueryMultipleAsync(nombre.RutaProcesos + "2", new
                {
                    Opcion = 2 ,
                    obj.Clave,
                    UsuarioERP = datosToken.Usuario
                    , datosToken.Zona
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }

        public async Task<Result> EliminaRutas(TokenData datosToken, EncabezadoRutaProcesosEntity obj)
        {
            var Result = new Result();
            //SP nombre = new SP();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);

                var results = await con.QueryMultipleAsync(nombre.RutaProcesos + "2", new
                {
                    Opcion = 3,
                    obj.Clave,
                    UsuarioERP = datosToken.Usuario,
                    datosToken.Zona
                },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.Mensaje = await results.ReadFirstAsync<string>();

            }
            return Result;
        }


        DataSet SerializedDataSet(object[] obj)
        {
            XmlSerializer serializer = new XmlSerializer(obj.GetType());
            System.IO.StringWriter sw = new System.IO.StringWriter();
            serializer.Serialize(sw, obj);
            DataSet ds = new DataSet();
            System.IO.StringReader reader = new System.IO.StringReader(sw.ToString());
            ds.ReadXml(reader);
            return ds;
        }


    }
}
