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
    public class clsFoliosCmbStdData
    {
        public async Task<Result> GetPermisosUsuario(TokenData datosToken)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG099MWSPC1", new { Opcion = 1, Usuario = datosToken.Usuario },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsPermisos>();
                Result.totalRecords = 1; 
            }
            return Result;
        }
        public async Task<Result> GetBuscarOPsxPrograma(TokenData datosToken, int startRow, int endRow, string parPrograma)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG099MWSPC1", new { Opcion = 2, startRow = startRow, endRow = endRow, Programa = parPrograma },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsCmbStdDat01>();
                Result.totalRecords = await results.ReadFirstAsync<int>();
            }
            return Result;
        }

        public async Task<Result> GetEstandaresvsPropuesta(TokenData datosToken, int startRow, int endRow, string parPrograma, string parCveArticulo, string parOp)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG099MWSPC1", new { Opcion = 3, startRow = startRow, endRow = endRow, Programa = parPrograma, CveArticulo = parCveArticulo, Op = parOp },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsCmbStdDat02>();
                Result.totalRecords = 1; // await results.ReadFirstAsync<int>();
            }
            return Result;
        }

        //GetCombinacionEstPropuestas
        public async Task<Result> GetCombinacionEstPropuestas(TokenData datosToken, int startRow, int endRow, string parPrograma, string parOp)
        {
            var Result = new Result();
            using (var con = new SqlConnection(datosToken.Conexion))
            {
                var results = await con.QueryMultipleAsync("FCAPROG099MWSPC1", new { Opcion = 21, startRow = startRow, endRow = endRow, Programa = parPrograma, Op = parOp },
                    commandType: System.Data.CommandType.StoredProcedure);
                Result.data = await results.ReadAsync<clsCmbStdDat03>();
                Result.totalRecords = 1; //await results.ReadFirstAsync<int>();
            }
            return Result;
        }


        public async Task<clsFoliosCmbStd> CmoDat125_Agregar(TokenData datosToken, clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 1,
                                folio = parFoliosCmbStd.folio,
                                clavecliente = parFoliosCmbStd.clavecliente,
                                porrefile = parFoliosCmbStd.porrefile,
                                fechagen = parFoliosCmbStd.fechagen,
                                solicito = parFoliosCmbStd.solicito,
                                fecautjp = parFoliosCmbStd.fecautjp,
                                propelegjp = parFoliosCmbStd.propelegjp,
                                reviso = parFoliosCmbStd.reviso,
                                causamod = parFoliosCmbStd.causamod,
                                costostd = parFoliosCmbStd.costostd,
                                costoprop1 = parFoliosCmbStd.costoprop1,
                                costoprop2 = parFoliosCmbStd.costoprop2,
                                costoprop3 = parFoliosCmbStd.costoprop3,
                                dif1 = parFoliosCmbStd.dif1,
                                dif2 = parFoliosCmbStd.dif2,
                                dif3 = parFoliosCmbStd.dif3,
                                comentarios = parFoliosCmbStd.comentarios,
                                programa = parFoliosCmbStd.programa,
                                opcomb = parFoliosCmbStd.opcomb,
                                enviacorreos = parFoliosCmbStd.enviacorreos,
                                estatus = parFoliosCmbStd.estatus,
                                usuario = datosToken.Usuario
                                //usuarioinsert = parFoliosCmbStd.usuarioinsert,
                                //fechainsert = parFoliosCmbStd.fechainsert,
                                //usuarioupdate = parFoliosCmbStd.usuarioupdate,
                                //fechaupdate = parFoliosCmbStd.fechaupdate,
                                //usuariodelete = parFoliosCmbStd.usuariodelete,
                                //fechadelete = parFoliosCmbStd.fechadelete,

                            },
                            commandType: CommandType.StoredProcedure); ;

                    return parFoliosCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsFoliosCmbStd> CmoDat125_Modificar(TokenData datosToken, clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 2,
                                folio = parFoliosCmbStd.folio,
                                clavecliente = parFoliosCmbStd.clavecliente,
                                porrefile = parFoliosCmbStd.porrefile,
                                fechagen = parFoliosCmbStd.fechagen,
                                solicito = parFoliosCmbStd.solicito,
                                fecautjp = parFoliosCmbStd.fecautjp,
                                propelegjp = parFoliosCmbStd.propelegjp,
                                reviso = parFoliosCmbStd.reviso,
                                causamod = parFoliosCmbStd.causamod,
                                costostd = parFoliosCmbStd.costostd,
                                costoprop1 = parFoliosCmbStd.costoprop1,
                                costoprop2 = parFoliosCmbStd.costoprop2,
                                costoprop3 = parFoliosCmbStd.costoprop3,
                                dif1 = parFoliosCmbStd.dif1,
                                dif2 = parFoliosCmbStd.dif2,
                                dif3 = parFoliosCmbStd.dif3,
                                comentarios = parFoliosCmbStd.comentarios,
                                programa = parFoliosCmbStd.programa,
                                opcomb = parFoliosCmbStd.opcomb,
                                enviacorreos = parFoliosCmbStd.enviacorreos,
                                estatus = parFoliosCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parFoliosCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsFoliosCmbStd> CmoDat125_Eliminar(TokenData datosToken, clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 3,
                                folio = parFoliosCmbStd.folio,
                                clavecliente = parFoliosCmbStd.clavecliente,
                                porrefile = parFoliosCmbStd.porrefile,
                                fechagen = parFoliosCmbStd.fechagen,
                                solicito = parFoliosCmbStd.solicito,
                                fecautjp = parFoliosCmbStd.fecautjp,
                                propelegjp = parFoliosCmbStd.propelegjp,
                                reviso = parFoliosCmbStd.reviso,
                                causamod = parFoliosCmbStd.causamod,
                                costostd = parFoliosCmbStd.costostd,
                                costoprop1 = parFoliosCmbStd.costoprop1,
                                costoprop2 = parFoliosCmbStd.costoprop2,
                                costoprop3 = parFoliosCmbStd.costoprop3,
                                dif1 = parFoliosCmbStd.dif1,
                                dif2 = parFoliosCmbStd.dif2,
                                dif3 = parFoliosCmbStd.dif3,
                                comentarios = parFoliosCmbStd.comentarios,
                                programa = parFoliosCmbStd.programa,
                                opcomb = parFoliosCmbStd.opcomb,
                                enviacorreos = parFoliosCmbStd.enviacorreos,
                                estatus = parFoliosCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parFoliosCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsPropuestaCmbStd> CmoDat126_Agregar(TokenData datosToken, clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 1,
                                folio = parPropuestaCmbStd.folio,
                                propuno = parPropuestaCmbStd.propuno,
                                propdos = parPropuestaCmbStd.propdos,
                                proptres = parPropuestaCmbStd.proptres,
                                liner1p1 = parPropuestaCmbStd.liner1p1,
                                liner2p1 = parPropuestaCmbStd.liner2p1,
                                liner3p1 = parPropuestaCmbStd.liner3p1,
                                corrugado1p1 = parPropuestaCmbStd.corrugado1p1,
                                corrugado2p1 = parPropuestaCmbStd.corrugado2p1,
                                anchol1p1 = parPropuestaCmbStd.anchol1p1,
                                anchol2p1 = parPropuestaCmbStd.anchol2p1,
                                anchol3p1 = parPropuestaCmbStd.anchol3p1,
                                anchoc1p1 = parPropuestaCmbStd.anchoc1p1,
                                anchoc2p1 = parPropuestaCmbStd.anchoc2p1,
                                liner1p2 = parPropuestaCmbStd.liner1p2,
                                liner2p2 = parPropuestaCmbStd.liner2p2,
                                liner3p2 = parPropuestaCmbStd.liner3p2,
                                corrugado1p2 = parPropuestaCmbStd.corrugado1p2,
                                corrugado2p2 = parPropuestaCmbStd.corrugado2p2,
                                anchol1p2 = parPropuestaCmbStd.anchol1p2,
                                anchol2p2 = parPropuestaCmbStd.anchol2p2,
                                anchol3p2 = parPropuestaCmbStd.anchol3p2,
                                anchoc1p2 = parPropuestaCmbStd.anchoc1p2,
                                anchoc2p2 = parPropuestaCmbStd.anchoc2p2,
                                liner1p3 = parPropuestaCmbStd.liner1p3,
                                liner2p3 = parPropuestaCmbStd.liner2p3,
                                liner3p3 = parPropuestaCmbStd.liner3p3,
                                corrugado1p3 = parPropuestaCmbStd.corrugado1p3,
                                corrugado2p3 = parPropuestaCmbStd.corrugado2p3,
                                anchol1p3 = parPropuestaCmbStd.anchol1p3,
                                anchol2p3 = parPropuestaCmbStd.anchol2p3,
                                anchol3p3 = parPropuestaCmbStd.anchol3p3,
                                anchoc1p3 = parPropuestaCmbStd.anchoc1p3,
                                anchoc2p3 = parPropuestaCmbStd.anchoc2p3,
                                estatus = parPropuestaCmbStd.estatus,
                                /*usuarioinsert = parPropuestaCmbStd.usuarioinsert,
                                fechainsert = parPropuestaCmbStd.fechainsert,
                                usuarioupdate = parPropuestaCmbStd.usuarioupdate,
                                fechaupdate = parPropuestaCmbStd.fechaupdate,
                                usuariodelete = parPropuestaCmbStd.usuariodelete,
                                fechadelete = parPropuestaCmbStd.fechadelete,*/
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parPropuestaCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsPropuestaCmbStd> CmoDat126_Modificar(TokenData datosToken, clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 2,
                                folio = parPropuestaCmbStd.folio,
                                propuno = parPropuestaCmbStd.propuno,
                                propdos = parPropuestaCmbStd.propdos,
                                proptres = parPropuestaCmbStd.proptres,
                                liner1p1 = parPropuestaCmbStd.liner1p1,
                                liner2p1 = parPropuestaCmbStd.liner2p1,
                                liner3p1 = parPropuestaCmbStd.liner3p1,
                                corrugado1p1 = parPropuestaCmbStd.corrugado1p1,
                                corrugado2p1 = parPropuestaCmbStd.corrugado2p1,
                                anchol1p1 = parPropuestaCmbStd.anchol1p1,
                                anchol2p1 = parPropuestaCmbStd.anchol2p1,
                                anchol3p1 = parPropuestaCmbStd.anchol3p1,
                                anchoc1p1 = parPropuestaCmbStd.anchoc1p1,
                                anchoc2p1 = parPropuestaCmbStd.anchoc2p1,
                                liner1p2 = parPropuestaCmbStd.liner1p2,
                                liner2p2 = parPropuestaCmbStd.liner2p2,
                                liner3p2 = parPropuestaCmbStd.liner3p2,
                                corrugado1p2 = parPropuestaCmbStd.corrugado1p2,
                                corrugado2p2 = parPropuestaCmbStd.corrugado2p2,
                                anchol1p2 = parPropuestaCmbStd.anchol1p2,
                                anchol2p2 = parPropuestaCmbStd.anchol2p2,
                                anchol3p2 = parPropuestaCmbStd.anchol3p2,
                                anchoc1p2 = parPropuestaCmbStd.anchoc1p2,
                                anchoc2p2 = parPropuestaCmbStd.anchoc2p2,
                                liner1p3 = parPropuestaCmbStd.liner1p3,
                                liner2p3 = parPropuestaCmbStd.liner2p3,
                                liner3p3 = parPropuestaCmbStd.liner3p3,
                                corrugado1p3 = parPropuestaCmbStd.corrugado1p3,
                                corrugado2p3 = parPropuestaCmbStd.corrugado2p3,
                                anchol1p3 = parPropuestaCmbStd.anchol1p3,
                                anchol2p3 = parPropuestaCmbStd.anchol2p3,
                                anchol3p3 = parPropuestaCmbStd.anchol3p3,
                                anchoc1p3 = parPropuestaCmbStd.anchoc1p3,
                                anchoc2p3 = parPropuestaCmbStd.anchoc2p3,
                                estatus = parPropuestaCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parPropuestaCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsPropuestaCmbStd> CmoDat126_Eliminar(TokenData datosToken, clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 3,
                                folio = parPropuestaCmbStd.folio,
                                propuno = parPropuestaCmbStd.propuno,
                                propdos = parPropuestaCmbStd.propdos,
                                proptres = parPropuestaCmbStd.proptres,
                                liner1p1 = parPropuestaCmbStd.liner1p1,
                                liner2p1 = parPropuestaCmbStd.liner2p1,
                                liner3p1 = parPropuestaCmbStd.liner3p1,
                                corrugado1p1 = parPropuestaCmbStd.corrugado1p1,
                                corrugado2p1 = parPropuestaCmbStd.corrugado2p1,
                                anchol1p1 = parPropuestaCmbStd.anchol1p1,
                                anchol2p1 = parPropuestaCmbStd.anchol2p1,
                                anchol3p1 = parPropuestaCmbStd.anchol3p1,
                                anchoc1p1 = parPropuestaCmbStd.anchoc1p1,
                                anchoc2p1 = parPropuestaCmbStd.anchoc2p1,
                                liner1p2 = parPropuestaCmbStd.liner1p2,
                                liner2p2 = parPropuestaCmbStd.liner2p2,
                                liner3p2 = parPropuestaCmbStd.liner3p2,
                                corrugado1p2 = parPropuestaCmbStd.corrugado1p2,
                                corrugado2p2 = parPropuestaCmbStd.corrugado2p2,
                                anchol1p2 = parPropuestaCmbStd.anchol1p2,
                                anchol2p2 = parPropuestaCmbStd.anchol2p2,
                                anchol3p2 = parPropuestaCmbStd.anchol3p2,
                                anchoc1p2 = parPropuestaCmbStd.anchoc1p2,
                                anchoc2p2 = parPropuestaCmbStd.anchoc2p2,
                                liner1p3 = parPropuestaCmbStd.liner1p3,
                                liner2p3 = parPropuestaCmbStd.liner2p3,
                                liner3p3 = parPropuestaCmbStd.liner3p3,
                                corrugado1p3 = parPropuestaCmbStd.corrugado1p3,
                                corrugado2p3 = parPropuestaCmbStd.corrugado2p3,
                                anchol1p3 = parPropuestaCmbStd.anchol1p3,
                                anchol2p3 = parPropuestaCmbStd.anchol2p3,
                                anchol3p3 = parPropuestaCmbStd.anchol3p3,
                                anchoc1p3 = parPropuestaCmbStd.anchoc1p3,
                                anchoc2p3 = parPropuestaCmbStd.anchoc2p3,
                                estatus = parPropuestaCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parPropuestaCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsAutorizadoresCmbStd> CmoDat127_Agregar(TokenData datosToken, clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 1,
                                folio = parAutorizadoresCmbStd.folio,
                                autgciapta = parAutorizadoresCmbStd.autgciapta,
                                fechgciapta = parAutorizadoresCmbStd.fechgciapta,
                                autcalidad = parAutorizadoresCmbStd.autcalidad,
                                fechcalidad = parAutorizadoresCmbStd.fechcalidad,
                                propelegpta = parAutorizadoresCmbStd.propelegpta,
                                propelegcal = parAutorizadoresCmbStd.propelegcal,
                                costoproppta = parAutorizadoresCmbStd.costoproppta,
                                costopropcal = parAutorizadoresCmbStd.costopropcal,
                                estatus = parAutorizadoresCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parAutorizadoresCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsAutorizadoresCmbStd> CmoDat127_Modificar(TokenData datosToken, clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 2,
                                folio = parAutorizadoresCmbStd.folio,
                                autgciapta = parAutorizadoresCmbStd.autgciapta,
                                fechgciapta = parAutorizadoresCmbStd.fechgciapta,
                                autcalidad = parAutorizadoresCmbStd.autcalidad,
                                fechcalidad = parAutorizadoresCmbStd.fechcalidad,
                                propelegpta = parAutorizadoresCmbStd.propelegpta,
                                propelegcal = parAutorizadoresCmbStd.propelegcal,
                                costoproppta = parAutorizadoresCmbStd.costoproppta,
                                costopropcal = parAutorizadoresCmbStd.costopropcal,
                                estatus = parAutorizadoresCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parAutorizadoresCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsAutorizadoresCmbStd> CmoDat127_Eliminar(TokenData datosToken, clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 3,
                                folio = parAutorizadoresCmbStd.folio,
                                autgciapta = parAutorizadoresCmbStd.autgciapta,
                                fechgciapta = parAutorizadoresCmbStd.fechgciapta,
                                autcalidad = parAutorizadoresCmbStd.autcalidad,
                                fechcalidad = parAutorizadoresCmbStd.fechcalidad,
                                propelegpta = parAutorizadoresCmbStd.propelegpta,
                                propelegcal = parAutorizadoresCmbStd.propelegcal,
                                costoproppta = parAutorizadoresCmbStd.costoproppta,
                                costopropcal = parAutorizadoresCmbStd.costopropcal,
                                estatus = parAutorizadoresCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parAutorizadoresCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<clsConceptosCmbStd> CmoDat132_Agregar(TokenData datosToken, clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 1,
                                folio = parConceptosCmbStd.folio,
                                claveconcepto = parConceptosCmbStd.claveconcepto,
                                estatus = parConceptosCmbStd.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parConceptosCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsConceptosCmbStd> CmoDat132_Modificar(TokenData datosToken, clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 2,
                                //IDParo = parParos.idparo,
                                //TipoTiempo = parParos.tipotiempo,
                                //ClaveMaquina = parParos.clavemaquina,
                                //Fecha = Convert.ToDateTime(parParos.fecha).ToString("yyyyMMdd"),
                                //HoraIni = Convert.ToDateTime(parParos.horaini),
                                //HoraFin = Convert.ToDateTime(parParos.horafin),
                                //Comentario = parParos.comentario,
                                //Estatus = parParos.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parConceptosCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<clsConceptosCmbStd> CmoDat132_Eliminar(TokenData datosToken, clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    con.Execute("FCAPROG099MWSPA1",
                            new
                            {
                                Opcion = 3,
                                //IDParo = parParos.idparo,
                                //TipoTiempo = parParos.tipotiempo,
                                //ClaveMaquina = parParos.clavemaquina,
                                //Fecha = Convert.ToDateTime(parParos.fecha).ToString("yyyyMMdd"),
                                //HoraIni = Convert.ToDateTime(parParos.horaini),
                                //HoraFin = Convert.ToDateTime(parParos.horafin),
                                //Comentario = parParos.comentario,
                                //Estatus = parParos.estatus,
                                usuario = datosToken.Usuario
                            },
                            commandType: CommandType.StoredProcedure);

                    return parConceptosCmbStd;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
