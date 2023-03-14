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
    public class ProgramaImpresorasDinamicoData
    {
        public async Task<Result> GetCatMaquinas(string strConexion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 1,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<CatMaquinasDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetOPsProgramarImpresoras(string strConexion, ProgramaLis Programa)
        {
            TranformaDataTable Ds = new TranformaDataTable();
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 2,
                            Programas =  Ds.CreateDataTable(Programa.Programas).AsTableValuedParameter("CMOADAT012TD_002"),
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<OPsPogramarImpresorasDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetOPsOtrosDatos(string strConexion, string Op, string OPCort)
        {
            Result objResult = new Result();
            OtrosDatosDTO obj = new OtrosDatosDTO();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 3,
                            Op,
                            OPCort

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    obj.Programado = await result.ReadFirstAsync<int>();
                    obj.Producido = await result.ReadFirstAsync<int>();
                    obj.Variacion = await result.ReadFirstAsync<decimal>();
                    objResult.data = obj;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetValidarArticulo(string strConexion, string Op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 4,
                            Op

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ValidarArticuloDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetRutaProcMaquinas(string strConexion, string ClaveProceso)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 5,
                            ClaveProceso

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<RutaProcMaquinasDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetMaquinaEstablecida(string strConexion, string ClaveArticulo, int NumProceso)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 6,
                            claveArticulo = ClaveArticulo,
                            numProceso = NumProceso

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<MaquinaEstablecidaDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetProgHisFabricacion(string strConexion ,ProgImpresoraDinamico progImpresora)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 7,
                            progImpresora.TPrepa,
                            progImpresora.ClaveArticulo,
                            progImpresora.lProcesoTipo,
                            progImpresora.MaqEstab,
                            progImpresora.lMaquina,
                            progImpresora.lTipoMaquina,
                            progImpresora.OP,
                            progImpresora.Zona,
                            progImpresora.mx2,
                            progImpresora.cont,
                            progImpresora.SegP,
                            progImpresora.lDesLargo,
                            progImpresora.lDesAncho,
                            progImpresora.Largo,
                            progImpresora.Ancho,
                            lMaquinaNoProgramar = progImpresora.lMaquinaNoProgramar,
                            ldArea = progImpresora.ldArea

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<ProgHisFabricacion>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetBalanceMaquinas(string strConexion, ProgImpresoraDinamico progImpresora)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 8,
                            TPrepa = progImpresora.TPrepa,
                            lProcesoTipo = progImpresora.lProcesoTipo,
                            lMaquina = progImpresora.lMaquina,
                            lMaquinaNoProgramar = progImpresora.lMaquinaNoProgramar,
                            ldArea = progImpresora.ldArea

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<BalanceMaquinasDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> GetVelocidad(string strConexion, ProgImpresoraDinamico progImpresora)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(strConexion))
                {
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Consulta);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "6",
                        new
                        {
                            Opcion = 9,
                            OP = progImpresora.OP,
                            claveArticulo = progImpresora.ClaveArticulo,
                            TPrepa = progImpresora.TPrepa,
                            lProcesoTipo = progImpresora.lProcesoTipo,
                            lMaquina = progImpresora.lMaquina,
                            Zona = progImpresora.Zona,
                            AreaH = progImpresora.AreaH,
                            lNumProceso = progImpresora.lNumProceso,
                            PzsCrt = progImpresora.PzsCrt,
                            wPallet = progImpresora.wPallet,
                            Cantidad = progImpresora.Cantidad,
                            lUltimoProceso = progImpresora.lUltimoProceso,
                            lFechaProgImp = progImpresora.lFechaProgImp,
                            StdPrepImp = progImpresora.StdPrepImp,
                            esMVT = progImpresora.esMVT

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    objResult.data = await result.ReadAsync<VelocidadDTO>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> AgregarProgImpDinamico(TokenData datosToken, ProgImpresorasDinamico progImpresora)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    var parsedDate = DateTime.Parse(progImpresora.fechaentrega);
                    SPNombre nombre = new SPNombre(Enums.SpTipo.Actualiza);
                    var result = await con.QueryMultipleAsync(
                        nombre.SecuenciaCorrugadora + "4",
                        new
                        {
                            Opcion = 1,
                            Usuario = datosToken.Usuario,
                            Programa = progImpresora.programa,
                            orden = progImpresora.Orden,
                            ClaveMaquina = progImpresora.ClaveMaquina,
                            op = progImpresora.op,
                            FechaEntrega = parsedDate,
                            Cantidad = progImpresora.cantidad,
                            ClaveProceso = progImpresora.claveproceso,
                            Suaje = progImpresora.suaje,
                            dado = progImpresora.dado,
                            piezascorte = progImpresora.piezascorte,
                            ultimoproceso = progImpresora.ultimoproceso,
                            minutospreparacion = progImpresora.minutospreparacion,
                            minutosproduccion = progImpresora.minutosproduccion,
                            estatus = progImpresora.estatus,
                            Primercolor = progImpresora.Primercolor,
                            Segundocolor = progImpresora.Segundocolor ,
                            Tercerocolor = progImpresora.Tercerocolor ,
                            CuartoColor = progImpresora.CuartoColor ,
                            imprime = progImpresora.imprime ,
                            pegado = progImpresora.pegado ,
                            tipomaquina = progImpresora.tipomaquina ,
                            velocidadstd = progImpresora.velocidadstd ,
                            Notas = progImpresora.Notas ,
                            medida1 = progImpresora.medida1 ,
                            medida2 = progImpresora.medida2 ,
                            tproceso = progImpresora.tproceso ,
                            programacorr = progImpresora.programacorr ,
                            fechainicio = progImpresora. fechainicio ,
                            fechatermino = progImpresora.fechatermino,
                            proceso1 = progImpresora.proceso1 ,
                            eficiencia = progImpresora.eficiencia,
                            Pintado = progImpresora.Pintado,
                            PorcentajeFPC = progImpresora.PorcentajeFPC,
                            EProceso = progImpresora.EProceso,
                            DesVelSTD  = progImpresora.DesVelSTD,
                            VersionModulo = progImpresora.VersionModulo,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
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
