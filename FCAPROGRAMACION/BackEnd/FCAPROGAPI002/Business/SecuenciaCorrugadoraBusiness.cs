using Data;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Business
{
    public class SecuenciaCorrugadoraBusiness
    {
        public Task<Result> GetSecuenciaCorrugadoraGeneral(string strConexion, int tipofiltro)
        {
            string TipoAcabado = null;
            int? OPApoyoMaquila = null;
            string ZonaApoyo = null;

            switch (tipofiltro)
            {
                case 1:
                    TipoAcabado = "02";
                    OPApoyoMaquila = 1;
                    ZonaApoyo = "01";
                    break;
                case 2:
                    TipoAcabado = "02";
                    OPApoyoMaquila = 1;
                    ZonaApoyo = "02";
                    break;
                case 5:
                    TipoAcabado = "02";
                    OPApoyoMaquila = 1;
                    ZonaApoyo = "05";
                    break;
            }


            return new SecuenciaCorrugadoraData().GetSecuenciaCorrugadoraGeneral(strConexion, TipoAcabado, OPApoyoMaquila, ZonaApoyo);
        }
        public Task<Result> GetAccionesPreventivas(string strConexion)
        {
            return new SecuenciaCorrugadoraData().GetAccionesPreventivas(strConexion);
        }
        public Task<Result> GetDetalleOp(string strConexion, int Programa)
        {
            return new SecuenciaCorrugadoraData().GetDetalleOp(strConexion, Programa);
        }
        public Task<Result> GetBuscaOps(string strConexion, string filtro)
        {
            int? Programa = null;
            string Op = "";

            if (!string.IsNullOrEmpty(filtro))
            {
                if (filtro.All(char.IsDigit))
                {
                    Programa = Int32.Parse(filtro);
                }
                else
                {
                    Op = filtro;
                }
            }

            return new SecuenciaCorrugadoraData().GetBuscaOps(strConexion, Programa , Op);
        }
        public Task<Result> GetProcesoRevicionExistencia(string strConexion)
        {
            return new SecuenciaCorrugadoraData().GetProcesoRevicionExistencia(strConexion);
        }
        public Task<Result> GetProgramas(string strConexion)
        {
            return new SecuenciaCorrugadoraData().GetProgramas(strConexion);
        }
        public Task<Result> GetClavePreparacion(string strConexion)
        {
            return new SecuenciaCorrugadoraData().GetClavePreparacion(strConexion);
        }
        public Task<Result> GetVelocidadStdCorr(string strConexion, string Articulo)
        {
            return new SecuenciaCorrugadoraData().GetVelocidadStdCorr(strConexion, Articulo);
        }
        public Task<Result> GetTiempoEstandarPrep(string strConexion, string Claveproceso)
        {
            return new SecuenciaCorrugadoraData().GetTiempoEstandarPrep(strConexion, Claveproceso);
        }
        public Task<Result> GetMaquinasEficiencia(string strConexion)
        {
            return new SecuenciaCorrugadoraData().GetMaquinasEficiencia(strConexion);
        }
        public Task<Result> GetValidaEstatusOP(string strConexion , int Programa)
        {
            return new SecuenciaCorrugadoraData().GetValidaEstatusOP(strConexion , Programa);
        }
        public Task<Result> GetValidaOpApoyo(string strConexion, string Articulo, string OPApoyo)
        {
            return new SecuenciaCorrugadoraData().GetValidaOpApoyo(strConexion, Articulo, OPApoyo);
        }
        public Task<Result> GetPermitirProgramarOP(string strConexion, string OP)
        {
            return new SecuenciaCorrugadoraData().GetPermitirProgramarOP(strConexion, OP);
        }
        public Task<Result> GetPermitirProgramarOPApoyo(string strConexion, string OP)
        {
            return new SecuenciaCorrugadoraData().GetPermitirProgramarOPApoyo(strConexion, OP);
        }
        public Task<Result> GetValidacionEliminados(string strConexion, string OP)
        {
            return new SecuenciaCorrugadoraData().GetValidacionEliminados(strConexion, OP);
        }
        public Task<Result> GetValidacionEliminadosOpApoyo(string strConexion, string OP)
        {
            return new SecuenciaCorrugadoraData().GetValidacionEliminadosOpApoyo(strConexion, OP);
        }
        public Task<int> GetCombinacion(string strConexion, int Programa)
        {
            return new SecuenciaCorrugadoraData().GetCombinacion(strConexion, Programa);
        }
        public Task<Result> GetAlmacen(string strConexion)
        {
            return new SecuenciaCorrugadoraData().GetAlmacen(strConexion);
        }
        public Task<Result> GetPesoUnitario(string strConexion, int programa)
        {
            return new SecuenciaCorrugadoraData().GetPesoUnitario(strConexion, programa);
        }
        public Task<Result> GetVerificadorPapeles(string strConexion, int programa)
        {
            return new SecuenciaCorrugadoraData().GetVerificadorPapeles(strConexion, programa);
        }
        public Task<Result> GetValidarCombinacion(string strConexion, string op)
        {
            return new SecuenciaCorrugadoraData().GetValidarCombinacion(strConexion, op);
        }
        public async Task<Result> SubirOrden(TokenData datosToken, int Programa, int OrdenEsp, int OrdenAct)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().SubirOrden(datosToken, Programa, OrdenEsp, OrdenAct);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> SubirOrdenporBloque(TokenData datosToken, int Programa, int OrdenAct)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().SubirOrdenporBloque(datosToken, Programa, OrdenAct);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> BajarOrden(TokenData datosToken, int Programa, int OrdenEsp, int OrdenAct)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().BajarOrden(datosToken, Programa, OrdenEsp, OrdenAct);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> BajarOrdenporBloque(TokenData datosToken, int Programa, int OrdenAct)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().BajarOrdenporBloque(datosToken, Programa, OrdenAct);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> ModificaPreparacion(TokenData datosToken, PreparacionDTO datos)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().ModificaPreparacion(datosToken, datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Terminar(TokenData datosToken, int Programa)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().Terminar(datosToken, Programa);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Cancelar(TokenData datosToken, int Programa)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().Cancelar(datosToken, Programa);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> CambiaEstatusPRO(TokenData datosToken, int Programa)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().CambiaEstatusPRO(datosToken, Programa);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> ActivaFolioCombinacion(TokenData datosToken, int Folio)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().ActivaFolioCombinacion(datosToken, Folio);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> AgregarPrograma(TokenData datosToken, int Programa, string Comentarios)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().AgregarPrograma(datosToken, Programa, Comentarios);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> EliminarPrograma(TokenData datosToken, int Programa, bool ChkEliminaImpresoras)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().EliminarPrograma(datosToken, Programa, ChkEliminaImpresoras);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> EliminarFolioCombinacion(TokenData datosToken, int Programa)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().EliminarFolioCombinacion(datosToken, Programa);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Actualiza(TokenData datosToken, Actualiza Datos)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().Actualiza(datosToken, Datos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> CorreoFaltaFolioEmp(TokenData datosToken, string Op)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().CorreoFaltaFolioEmp(datosToken, Op);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> CorreoFaltaFolioEmpOpApoyo(TokenData datosToken, string Op, string OpApoyo)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().CorreoFaltaFolioEmpOpApoyo(datosToken, Op, OpApoyo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> EnviaCorreoNotificacion(TokenData datosToken, string Op, string chkPrograma, string Articulo)
        {
            try
            {
                return await new SecuenciaCorrugadoraData().EnviaCorreoNotificacion(datosToken, Op, chkPrograma, Articulo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public Task<Result> GetProcesoRadigrafias(string strConexion, string OP)
        {
            return new SecuenciaCorrugadoraData().GetProcesoRadigrafias(strConexion, OP);
        }
        public Task<Result> GetPapelAntiguoCierreMes(string strConexion, FiltrosReporteDTO datos)
        {
            string col = "Exi_";
            string nombremes = obtenerNombreMesNumero(datos.Mes);

            col += nombremes.Substring(0,3);

            return new SecuenciaCorrugadoraData().GetPapelAntiguoCierreMes(strConexion, datos, col);
        }
        public Task<Result> GetBuscarAntiguedadDia(string strConexion, FiltrosReporteDTO datos)
        {
            return new SecuenciaCorrugadoraData().GetBuscarAntiguedadDia(strConexion, datos);
        }
        public Task<Result> GetVerificaRestosRollos(string strConexion, int Almacen, decimal Ancho1, string Liner1, string Liner2, string Liner3, string Medium1, decimal AnchoC1, string Medium2, decimal AnchoC2)
        {
            return new SecuenciaCorrugadoraData().GetVerificaRestosRollos(strConexion, Almacen, Ancho1, Liner1, Liner2, Liner3, Medium1, AnchoC1, Medium2, AnchoC2);
        }
        public Task<Result> InsertaFiltros(TokenData datosToken, FiltrosReporteDTO datos)
        {
            string mes = "";
            string nombremes = obtenerNombreMesNumero(datos.Mes);

            mes += nombremes.Substring(0, 3);

            return new SecuenciaCorrugadoraData().InsertaFiltros(datosToken, datos, mes);
        }
        public byte[] Descargar(TokenData datosToken, string Zona, string NombreArchivo)
        {

            SecuenciaCorrugadoraData datFTP = new SecuenciaCorrugadoraData();

            FTPInfo ftpinfo = datFTP.GetFTPInfo(datosToken.Conexion, Zona);

            FtpWebRequest reqFTP;
      
                reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri("ftp://" + ftpinfo.Servidor + ":" + ftpinfo.Puerto + ftpinfo.Path.Trim() + NombreArchivo));
                reqFTP.Method = WebRequestMethods.Ftp.DownloadFile;
                reqFTP.UseBinary = true;
                reqFTP.Credentials = new NetworkCredential(ftpinfo.Usuario.Trim(), ftpinfo.Password.Trim());
                FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
                Stream ftpStream = response.GetResponseStream();
                long cl = response.ContentLength;
                int bufferSize = 2048;
                int readCount;
                byte[] buffer;

                buffer = new byte[16 * 1024];
                using (MemoryStream ms = new MemoryStream())
                {

                    while ((readCount = ftpStream.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        ms.Write(buffer, 0, readCount);
                    }

                    buffer = ms.ToArray();
                }

                ftpStream.Close();

                response.Close();
                return buffer;
           

        }

        private string obtenerNombreMesNumero(int numeroMes)
        {
            try
            {
                DateTimeFormatInfo formatoFecha = CultureInfo.CurrentCulture.DateTimeFormat;
                string nombreMes = formatoFecha.GetMonthName(numeroMes);
                return nombreMes;
            }
            catch
            {
                return "Desconocido";
            }
        }
    }
}
