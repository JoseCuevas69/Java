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
    public class FCAPROG017MWData
    {
        public async Task<Result> getMaquinas(TokenData DatosToken, string tipo, string tipoClave, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 1,
                            ZonaERP = DatosToken.Zona,
                            TipoMaquina = Convert.ToInt32(tipo),
                            TipoClave = tipoClave,
                            ClaveMaquina = claveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<maquinas>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getMaquinaMantenimiento(TokenData DatosToken, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 2,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario,
                            ClaveMaquina = claveMaquina.Trim()
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<estadoMantenimiento>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getSecuenciaMaquinasOpsCanceladas(TokenData DatosToken, string tipo, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 3,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario,
                            TipoMaquina = Convert.ToInt32(tipo),
                            ClaveMaquina = claveMaquina.Trim()
                        },
                    commandType: CommandType.StoredProcedure, commandTimeout: 180);
                    objResult.data = await result.ReadAsync<secuencia>();
                    objResult.data2 = await result.ReadAsync<maquinas>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getComentariosOPArticulo(TokenData DatosToken, string op, string claveArticulo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 4,
                            ZonaERP = DatosToken.Zona,
                            OP = op.Trim(),
                            ClaveArticulo = claveArticulo.Trim()
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<comentariosOP>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAllOpsMaquina(TokenData DatosToken, string op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 5,
                            ZonaERP = DatosToken.Zona,
                            OP = op.Trim()
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<opsMaquinas>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getSigProCap(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 6,
                            ZonaERP = DatosToken.Zona
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<objSigProgCap>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_BuscaOP(TokenData DatosToken, string opc, string op)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = Convert.ToInt32(opc), // OPCIÓN 7 U 8 DEPENDIENDO
                            ZonaERP = DatosToken.Zona,
                            OP = op
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    objResult.data2 = await result.ReadAsync<resultadoCap009>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_GetCbxModificaProceso(TokenData DatosToken, string claveMaquina, string mvt)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 9,
                            ZonaERP = DatosToken.Zona,
                            ClaveMaquina = claveMaquina,
                            MVT = mvt == "1" ? true : false
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<cbxModificaProceso>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_GetCbxProceso(TokenData DatosToken, string claveProceso)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 10,
                            ZonaERP = DatosToken.Zona,
                            ClaveProceso = claveProceso
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<cbxProceso>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_GetCbxRutaProceso(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 11,
                            ZonaERP = DatosToken.Zona
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<cbxRutaProceso>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // PENDIENTE
        public async Task<Result> mdlCap009_GetCalcularHora(
            TokenData DatosToken, string claveMaquina, string op, string cantidad, string pzasSuaje, 
            string areaUnitaria, string proceso, string claveArticulo, string eficiencia
        )
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 12,
                            ZonaERP = DatosToken.Zona
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<cbxRutaProceso>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> fechaTurnoTrabajo(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 13,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<objFechaTurnoTrabajo>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> validaArt(TokenData DatosToken, string claveArticulo, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 14,
                            ZonaERP = DatosToken.Zona,
                            ClaveArticulo = claveArticulo,
                            ClaveMaquina = claveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<objValidaArt>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOPProgramada(TokenData DatosToken, string op, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 15,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario,
                            OP = op,
                            ClaveMaquina = claveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getJustificaciones(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 16,
                            ZonaERP = DatosToken.Zona
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<objJustificaciones>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getValidaTodoCap005(TokenData DatosToken, objProgramasCap005 objDatosCap005)
        {
            Result objResult = new Result();
            List<mdlMdlCap005> eDato = new List<mdlMdlCap005>();
            mdlMdlCap005 dato;

            foreach (var item in objDatosCap005.Cap005TD_001)
            {
                dato = new mdlMdlCap005();
                dato.Programa = item.Programa;
                dato.Op = item.Op;
                dato.Cantidad = item.Cantidad;
                dato.MaqOrigen = item.MaqOrigen;
                dato.CveProceso = item.CveProceso;
                dato.UltimoProceso = item.UltimoProceso;
                dato.Articulo = item.Articulo;
                eDato.Add(dato);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 17,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario,
                            TipoMaquina = objDatosCap005.OptTipoMaquina,
                            ClaveMaquina = objDatosCap005.CveMaquina,
                            ClaveProceso = objDatosCap005.CveProceso,
                            Justificacion = objDatosCap005.txtJustificacion,
                            Cap005TD_001 = Ds.CreateDataTable(eDato).AsTableValuedParameter("CMODAT026TD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<modelMdlCap005>();
                    objResult.data2 = await result.ReadAsync<opc17p2>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOPProgramada2(TokenData DatosToken, string op, string programa, string cantidad)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 18,
                            ZonaERP = DatosToken.Zona,
                            OP = op,
                            Programa = programa,
                            Cantidad = cantidad
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<opc18>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getValidaProgramaProcAutoCap005(TokenData DatosToken, objProgramasCap005 objDatosCap005)
        {
            Result objResult = new Result();
            List<mdlMdlCap005> eDato = new List<mdlMdlCap005>();
            mdlMdlCap005 dato;

            foreach (var item in objDatosCap005.Cap005TD_001)
            {
                dato = new mdlMdlCap005();
                dato.Programa = item.Programa;
                dato.Op = item.Op;
                dato.Cantidad = item.Cantidad;
                dato.MaqOrigen = item.MaqOrigen;
                dato.CveProceso = item.CveProceso;
                dato.UltimoProceso = item.UltimoProceso;
                dato.Articulo = item.Articulo;
                eDato.Add(dato);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 19,
                            ZonaERP = DatosToken.Zona,
                            //UsuarioERP = DatosToken.Usuario,
                            //TipoMaquina = objDatosCap005.OptTipoMaquina,
                            ClaveMaquina = objDatosCap005.CveMaquina,
                            //ClaveProceso = objDatosCap005.CveProceso,
                            //Justificacion = objDatosCap005.txtJustificacion,
                            Cap005TD_001 = Ds.CreateDataTable(eDato).AsTableValuedParameter("CMODAT026TD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<mdlMdlCap005>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> validaJustificacionUsuario(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 20,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> tieneProduccionTmpReal(TokenData DatosToken, string progPosAct, string progPosSig, string fechaTrabajo, string turnoTrabajo)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 21,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario,
                            ProgPosAct = progPosAct,
                            ProgPosSig = progPosSig,
                            FechaTrabajo = fechaTrabajo,
                            TurnoTrabajo = turnoTrabajo
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<objTieneProduccionRealCapSF>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001ValidaProgramaProcAuto(TokenData DatosToken, objProgramasCap001 obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 22,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario,
                            ClaveMaquina = obj.CveMaquina,
                            Cap005TD_001 = Ds.CreateDataTable(obj.Cap005TD_001).AsTableValuedParameter("CMODAT026TD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<mdlMdlCap005>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap009ProgramacionAutomatica(TokenData DatosToken, parSPLecOpc23 obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 23,
                            ZonaERP = DatosToken.Zona,
                            UsuarioERP = DatosToken.Usuario,
                            Justificacion = obj.Justificacion,
                            OP = obj.Op,
                            ClaveArticulo = obj.ClaveArticulo,
                            Cantidad = obj.Cantidad,
                            Programado = obj.Programado,
                            Producido = obj.Producido,
                            Solicitado = obj.Solicitado,
                            Variacion = obj.Variacion,
                            Descripcion = obj.Descripcion,
                            ClaveMaquina = obj.ClaveMaquina,
                            ClaveProceso = obj.ClaveProceso,
                            MaquinaEstablecida = obj.MaquinaEstablecida,
                            TipoMaquina = obj.TipoMaquina,
                            Largo = obj.Largo,
                            Ancho = obj.Ancho,
                            PasoContinua = obj.PasoContinua,
                            ProduccionPT = obj.ProduccionPT
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getDatosCap016(TokenData DatosToken, string tipo, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 28,
                            ZonaERP = DatosToken.Zona,
                            TipoMaquina = Convert.ToInt32(tipo),
                            ClaveMaquina = claveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<maquinas>();
                    objResult.data2 = await result.ReadAsync<datosGridCap016>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap016ValidarTraspasoOps(TokenData DatosToken, objCap016ValidarTraspasoOps obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPC3",
                        new
                        {
                            Opcion = 29,
                            ZonaERP = DatosToken.Zona,
                            ClaveMaquina = obj.ClaveMaquina,
                            Cap016TD_001 = Ds.CreateDataTable(obj.Cap016TD_001).AsTableValuedParameter("CMODAT011TD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<mdlMdlCap005>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        // SP Acción
        public async Task<Result> actualizarMaquina(TokenData DatosToken, objProgramasCap005 objDatosCap005)
        {
            Result objResult = new Result();
            List<mdlMdlCap005> eDato = new List<mdlMdlCap005>();
            mdlMdlCap005 dato;

            foreach (var item in objDatosCap005.Cap005TD_001)
            {
                dato = new mdlMdlCap005();
                dato.Programa = item.Programa;
                dato.Op = item.Op;
                dato.Cantidad = item.Cantidad;
                dato.MaqOrigen = item.MaqOrigen;
                dato.CveProceso = item.CveProceso;
                dato.UltimoProceso = item.UltimoProceso;
                dato.Articulo = item.Articulo;
                eDato.Add(dato);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 3,
                            ZonaERP = DatosToken.Zona,
                            //UsuarioERP = DatosToken.Usuario,
                            //TipoMaquina = objDatosCap005.OptTipoMaquina,
                            ClaveMaquina = objDatosCap005.CveMaquina,
                            //ClaveProceso = objDatosCap005.CveProceso,
                            //Justificacion = objDatosCap005.txtJustificacion,
                            Cap005TD_001 = Ds.CreateDataTable(eDato).AsTableValuedParameter("CMODAT026TD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> reordenarProgInmediatosPosteriores(TokenData DatosToken, objActOpc4 obj)
        {
            Result objResult = new Result();
            List<secuencia> eDato1 = obj.dataSecuencias;
            List<secuencia> eDato2 = obj.secuenciaSelected;

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 4,
                            ZonaERP = DatosToken.Zona,
                            Usuario = DatosToken.Usuario,
                            Cap001TD_001 = Ds.CreateDataTable(eDato1).AsTableValuedParameter("CMODAT020TD_001"),
                            Cap001TD_001Selected = Ds.CreateDataTable(eDato2).AsTableValuedParameter("CMODAT020TD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap004FijarFecha(TokenData DatosToken, cap004FijarFecha obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 5,
                            ZonaERP = DatosToken.Zona,
                            Usuario = DatosToken.Usuario,
                            Programa = obj.Programa,
                            ClaveMaquina = obj.ClaveMaquina,
                            OP = obj.Op,
                            Fecha = obj.Fecha,
                            Quitar = obj.Quitar
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001EliminarOP(TokenData DatosToken, objSPActOpc6 obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 6,
                            ZonaERP = DatosToken.Zona,
                            Usuario = DatosToken.Usuario,
                            Cap005TD_001 = Ds.CreateDataTable(obj.TmpCap005TD_001).AsTableValuedParameter("CMODAT026TD_001"),
                            Cap001TD_001 = Ds.CreateDataTable(obj.TmpCap001TD_001).AsTableValuedParameter("CMODAT020TD_001"),
                            ImgAtencion = obj.ImgAtencion,
                            Justificacion = obj.Justificacion,
                            ClaveMaquina = obj.ClaveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001TerminarPrograma1(TokenData DatosToken, cap004FijarFecha obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 7,
                            ZonaERP = DatosToken.Zona,
                            Programa = obj.Programa,
                            ClaveMaquina = obj.ClaveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001TerminarPrograma2(TokenData DatosToken, SPActOpc8 obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 8,
                            ZonaERP = DatosToken.Zona,
                            lFecha = obj.LFecha,
                            ClaveMaquina = obj.ClaveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> suspenderOP(TokenData DatosToken, cap001SuspenderOP obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 9,
                            ZonaERP = DatosToken.Zona,
                            Suspendido = obj.Suspendido,
                            Programa = obj.Programa
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap016TraspasarProgramas(TokenData DatosToken, SPActOpc10 obj)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG017MWSPA1",
                        new
                        {
                            Opcion = 10,
                            ZonaERP = DatosToken.Zona,
                            CveMaqOri = obj.CveMaqOri,
                            CveMaqDes = obj.CveMaqDes,
                            CAP016TD_001 = Ds.CreateDataTable(obj.CAP016TD_001).AsTableValuedParameter("CMODAT011TD_001")
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getCanSigProCap(TokenData DatosToken, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion2))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "CmoSp377",
                        new
                        {
                            Accion = 3,
                            ClaveMaquina = claveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ObjCanSigProCap>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        // PENDIENTE ACTUAL
        public async Task<Result> tieneProduccionRealCapSF(TokenData DatosToken, string progPosAct, string progPosSig, string claveMaquina)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion2))
                {
                    TranformaDataTable Ds = new TranformaDataTable();
                    var result = await con.QueryMultipleAsync(
                        "CmoSp377",
                        new
                        {
                            Accion = 9,
                            ProgPosAct = progPosAct,
                            ProgPosSig = progPosSig,
                            ClaveMaquina = claveMaquina
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<objTieneProduccionRealCapSF>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
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
