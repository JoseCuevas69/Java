using Dapper;
using Entity;
using Entity.DTO.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Entity.DTO;
using System;
using System.Data;

namespace Data
{
    public class clsPapelesData
    {
        public async Task<Result> GetPapeles(TokenData datosToken, int startRow, int endRow, string ClavePapel, string Descripcion)
        {
            //  @Opcion AS TinyInt
            //, @StartRow AS INT = 0
            //, @EndRow AS INT = 0
            //, @ClavePapel AS VARCHAR(20) = NULL
            //, @Descripcion AS VARCHAR(50) = NULL
            // [FCAPROGCAT020CWSPC1]

            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))

            {
                var results = await con.QueryMultipleAsync("FCAPROGCAT020CWSPC1", new { Opcion = 1, startRow, endRow, ClavePapel, Descripcion },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsPapeles>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }
            return Result;
        }

        public async Task<Result> GetPermisos(TokenData datosToken, int startRow, int endRow)
        {
            //  @Opcion AS TinyInt
            //, @StartRow AS INT = 0
            //, @EndRow AS INT = 0
            //, @ClavePapel AS VARCHAR(20) = NULL
            //, @Descripcion AS VARCHAR(50) = NULL
            // [FCAPROGCAT020CWSPC1]

            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))

            {
                var results = await con.QueryMultipleAsync("FCAPROGCAT020CWSPC1", new { Opcion = 2, StartRow = startRow, EndRow = endRow, ClavePapel="", Descripcion = "", Usuario = datosToken.Usuario },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsPermisos>();
                Result.totalRecords = 1; // await results.ReadFirstAsync<int>();
            }
            return Result;
        }

        public async Task<clsPapeles> Agregar(TokenData datosToken, clsPapeles parPapeles)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {

                    con.Execute("FCAPROGCAT020CWSPA1",
                            new
                            {
                                Opcion = 1,
                                clavepapel = parPapeles.clavepapel,
                                gramaje = parPapeles.gramaje,
                                precioton = parPapeles.precioton,
                                pesosm2 = parPapeles.pesosm2,
                                tipopapel = parPapeles.tipopapel,
                                nombre = parPapeles.nombre,
                                proveedor = parPapeles.proveedor,
                                dolar = parPapeles.dolar,
                                fleteaduana = parPapeles.fleteaduana,
                                pesostonelada = parPapeles.pesostonelada,
                                mullenliner = parPapeles.mullenliner,
                                cmtmedium = parPapeles.cmtmedium,
                                usocostos = parPapeles.usocostos,
                                calibre = parPapeles.calibre,
                                tipoproveedor = parPapeles.tipoproveedor,
                                presentacion = parPapeles.presentacion,
                                claveprincipal = parPapeles.claveprincipal,
                                rctcct = parPapeles.rctcct,
                                codigopapel = parPapeles.codigopapel,
                                capturacalidad = parPapeles.capturacalidad,
                                capturacostos = parPapeles.capturacostos,
                                cverefhomo = parPapeles.cverefhomo,
                                estatus = parPapeles.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parPapeles;
                }
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
                using (var con = new SqlConnection(datosToken.Conexion))
                {

                    con.Execute("FCAPROGCAT020CWSPA1",
                            new
                            {
                                Opcion = 2,
                                clavepapel = parPapeles.clavepapel,
                                tipopapel = parPapeles.tipopapel,
                                nombre = parPapeles.nombre,
                                proveedor = parPapeles.proveedor,
                                tipoproveedor = parPapeles.tipoproveedor,
                                gramaje = parPapeles.gramaje,
                                presentacion = parPapeles.presentacion,
                                rctcct = parPapeles.rctcct,
                                cmtmedium = parPapeles.cmtmedium,
                                mullenliner = parPapeles.mullenliner,
                                calibre = parPapeles.calibre,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parPapeles;
                }
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
                using (var con = new SqlConnection(datosToken.Conexion))
                {

                    con.Execute("FCAPROGCAT020CWSPA1",
                            new
                            {
                                Opcion = 3,
                                clavepapel = parPapeles.clavepapel,
                                tipopapel = parPapeles.tipopapel,
                                nombre = parPapeles.nombre,
                                proveedor = parPapeles.proveedor,
                                tipoproveedor = parPapeles.tipoproveedor,
                                gramaje = parPapeles.gramaje,
                                presentacion = parPapeles.presentacion,
                                rctcct = parPapeles.rctcct,
                                cmtmedium = parPapeles.cmtmedium,
                                mullenliner = parPapeles.mullenliner,
                                calibre = parPapeles.calibre,
                                usuario = datosToken.Usuario
                                //clavepapel = parPapeles.clavepapel,
                                //gramaje = parPapeles.gramaje,
                                //precioton = parPapeles.precioton,
                                //pesosm2 = parPapeles.pesosm2,
                                //tipopapel = parPapeles.tipopapel,
                                //nombre = parPapeles.nombre,
                                //proveedor = parPapeles.proveedor,
                                //dolar = parPapeles.dolar,
                                //fleteaduana = parPapeles.fleteaduana,
                                //pesostonelada = parPapeles.pesostonelada,
                                //mullenliner = parPapeles.mullenliner,
                                //cmtmedium = parPapeles.cmtmedium,
                                //usocostos = parPapeles.usocostos,
                                //calibre = parPapeles.calibre,
                                //tipoproveedor = parPapeles.tipoproveedor,
                                //presentacion = parPapeles.presentacion,
                                //claveprincipal = parPapeles.claveprincipal,
                                //rctcct = parPapeles.rctcct,
                                //codigopapel = parPapeles.codigopapel,
                                //capturacalidad = parPapeles.capturacalidad,
                                //capturacostos = parPapeles.capturacostos,
                                //cverefhomo = parPapeles.cverefhomo,
                                //estatus = parPapeles.estatus,
                                //usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parPapeles;
                }
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
                using (var con = new SqlConnection(datosToken.Conexion))
                {

                    con.Execute("FCAPROGCAT020CWSPA1",
                            new
                            {
                                Opcion = 3,
                                clavepapel = parPapeles.clavepapel,
                                tipopapel = parPapeles.tipopapel,
                                nombre = parPapeles.nombre,
                                proveedor = parPapeles.proveedor,
                                tipoproveedor = parPapeles.tipoproveedor,
                                //-----------------------------------------
                                gramaje = parPapeles.gramaje,
                                presentacion = parPapeles.presentacion,
                                rctcct = parPapeles.rctcct,
                                cmtmedium = parPapeles.cmtmedium,
                                mullenliner = parPapeles.mullenliner,
                                calibre = parPapeles.calibre,
                                //-----------------------------------------
                                claveprincipal = parPapeles.claveprincipal,
                                precioton = parPapeles.precioton,
                                pesosm2 = parPapeles.pesosm2,
                                codigopapel = parPapeles.codigopapel,
                                dolar = parPapeles.dolar,
                                fleteaduana = parPapeles.fleteaduana,
                                //-----------------------------------------
                                usuario = datosToken.Usuario
                                //clavepapel = parPapeles.clavepapel,
                                //gramaje = parPapeles.gramaje,
                                //precioton = parPapeles.precioton,
                                //pesosm2 = parPapeles.pesosm2,
                                //tipopapel = parPapeles.tipopapel,
                                //nombre = parPapeles.nombre,
                                //proveedor = parPapeles.proveedor,
                                //dolar = parPapeles.dolar,
                                //fleteaduana = parPapeles.fleteaduana,
                                //pesostonelada = parPapeles.pesostonelada,
                                //mullenliner = parPapeles.mullenliner,
                                //cmtmedium = parPapeles.cmtmedium,
                                //usocostos = parPapeles.usocostos,
                                //calibre = parPapeles.calibre,
                                //tipoproveedor = parPapeles.tipoproveedor,
                                //presentacion = parPapeles.presentacion,
                                //claveprincipal = parPapeles.claveprincipal,
                                //rctcct = parPapeles.rctcct,
                                //codigopapel = parPapeles.codigopapel,
                                //capturacalidad = parPapeles.capturacalidad,
                                //capturacostos = parPapeles.capturacostos,
                                //cverefhomo = parPapeles.cverefhomo,
                                //estatus = parPapeles.estatus,
                                //usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parPapeles;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
