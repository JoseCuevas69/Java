using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Business;
using Entity.DTO;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class SecuenciaCorrugadoraController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public SecuenciaCorrugadoraController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }
        [HttpGet("GetSecuenciaCorrugadoraGeneral")]
        public async Task<IActionResult> GetSecuenciaCorrugadoraGeneral(int tipofiltro)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetSecuenciaCorrugadoraGeneral(datosToken.Conexion, tipofiltro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetAccionesPreventivas")]
        public async Task<IActionResult> GetAccionesPreventivas()
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetAccionesPreventivas(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetDetalleOp")]
        public async Task<IActionResult> GetDetalleOp(int Programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetDetalleOp(datosToken.Conexion, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetBuscaOps")]
        public async Task<IActionResult> GetBuscaOps(string filtro)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetBuscaOps(datosToken.Conexion, filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetProcesoRevicionExistencia")]
        public async Task<IActionResult> GetProcesoRevicionExistencia()
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetProcesoRevicionExistencia(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetProgramas")]
        public async Task<IActionResult> GetProgramas()
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetProgramas(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetClavePreparacion")]
        public async Task<IActionResult> GetClavePreparacion()
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetClavePreparacion(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetVelocidadStdCorr")]
        public async Task<IActionResult> GetVelocidadStdCorr(string Articulo)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetVelocidadStdCorr(datosToken.Conexion, Articulo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetTiempoEstandarPrep")]
        public async Task<IActionResult> GetTiempoEstandarPrep(string Claveproceso)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetTiempoEstandarPrep(datosToken.Conexion, Claveproceso));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetMaquinasEficiencia")]
        public async Task<IActionResult> GetMaquinasEficiencia()
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetMaquinasEficiencia(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetValidaEstatusOP")]
        public async Task<IActionResult> GetValidaEstatusOP(int Programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetValidaEstatusOP(datosToken.Conexion, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetValidaOpApoyo")]
        public async Task<IActionResult> GetValidaOpApoyo(string Articulo, string OPApoyo)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetValidaOpApoyo(datosToken.Conexion, Articulo, OPApoyo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetPermitirProgramarOP")]
        public async Task<IActionResult> GetPermitirProgramarOP(string OP)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetPermitirProgramarOP(datosToken.Conexion, OP));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetPermitirProgramarOPApoyo")]
        public async Task<IActionResult> GetPermitirProgramarOPApoyo(string OP)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetPermitirProgramarOPApoyo(datosToken.Conexion, OP));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetValidacionEliminados")]
        public async Task<IActionResult> GetValidacionEliminados(string OP)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetValidacionEliminados(datosToken.Conexion, OP));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetValidacionEliminadosOpApoyo")]
        public async Task<IActionResult> GetValidacionEliminadosOpApoyo(string OP)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetValidacionEliminadosOpApoyo(datosToken.Conexion, OP));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetCombinacion")]
        public async Task<IActionResult> GetCombinacion(int Programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetCombinacion(datosToken.Conexion, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetAlmacen")]
        public async Task<IActionResult> GetAlmacen()
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetAlmacen(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetPesoUnitario")]
        public async Task<IActionResult> GetPesoUnitario(int programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetPesoUnitario(datosToken.Conexion, programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetVerificadorPapeles")]
        public async Task<IActionResult> GetVerificadorPapeles(int programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetVerificadorPapeles(datosToken.Conexion, programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetValidarCombinacion")]
        public async Task<IActionResult> GetValidarCombinacion(string op)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetValidarCombinacion(datosToken.Conexion, op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("SubirOrden")]
        public async Task<IActionResult> SubirOrden(SubirOrdenDTO Datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().SubirOrden(datosToken, Datos.Programa, Datos.OrdenEsp, Datos.OrdenAct));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("SubirOrdenporBloque")]
        public async Task<IActionResult> SubirOrdenporBloque(SubirOrdenDTO Datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().SubirOrdenporBloque(datosToken, Datos.Programa, Datos.OrdenAct));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("BajarOrden")]
        public async Task<IActionResult> BajarOrden(SubirOrdenDTO Datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().BajarOrden(datosToken, Datos.Programa, Datos.OrdenEsp, Datos.OrdenAct));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("BajarOrdenporBloque")]
        public async Task<IActionResult> BajarOrdenporBloque(SubirOrdenDTO Datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().BajarOrdenporBloque(datosToken, Datos.Programa, Datos.OrdenAct));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("ModificaPreparacion")]
        public async Task<IActionResult> ModificaPreparacion(PreparacionDTO datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().ModificaPreparacion(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("Terminar")]
        public async Task<IActionResult> Terminar(int Programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().Terminar(datosToken, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("Cancelar")]
        public async Task<IActionResult> Cancelar(int Programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().Cancelar(datosToken, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("CambiaEstatusPRO")]
        public async Task<IActionResult> CambiaEstatusPRO(int Programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().CambiaEstatusPRO(datosToken, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("AgregarPrograma")]
        public async Task<IActionResult> AgregarPrograma(int Programa, string Comentarios)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().AgregarPrograma(datosToken, Programa, Comentarios));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("EliminarPrograma")]
        public async Task<IActionResult> EliminarPrograma(int Programa, bool ChkEliminaImpresoras)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().EliminarPrograma(datosToken, Programa, ChkEliminaImpresoras));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("EliminarFolioCombinacion")]
        public async Task<IActionResult> EliminarFolioCombinacion(int Programa)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().EliminarFolioCombinacion(datosToken, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("Actualiza")]
        public async Task<IActionResult> Actualiza(Actualiza Datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().Actualiza(datosToken, Datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("ActivaFolioCombinacion")]
        public async Task<IActionResult> ActivaFolioCombinacion(int Folio)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().ActivaFolioCombinacion(datosToken, Folio));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("CorreoFaltaFolioEmp")]
        public async Task<IActionResult> CorreoFaltaFolioEmp(string Op)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().CorreoFaltaFolioEmp(datosToken, Op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("CorreoFaltaFolioEmpOpApoyo")]
        public async Task<IActionResult> CorreoFaltaFolioEmpOpApoyo(string Op, string OpApoyo)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().CorreoFaltaFolioEmpOpApoyo(datosToken, Op, OpApoyo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("EnviaCorreoNotificacion")]
        public async Task<IActionResult> EnviaCorreoNotificacion(string Op, string chkPrograma, string Articulo)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().EnviaCorreoNotificacion(datosToken, Op, chkPrograma, Articulo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetProcesoRadigrafias")]
        public async Task<IActionResult> GetProcesoRadigrafias(string OP)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetProcesoRadigrafias(datosToken.Conexion, OP));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("GetPapelAntiguoCierreMes")]
        public async Task<IActionResult> GetPapelAntiguoCierreMes(FiltrosReporteDTO datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetPapelAntiguoCierreMes(datosToken.Conexion, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("GetBuscarAntiguedadDia")]
        public async Task<IActionResult> GetBuscarAntiguedadDia(FiltrosReporteDTO datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetPapelAntiguoCierreMes(datosToken.Conexion, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetVerificaRestosRollos")]
        public async Task<IActionResult> GetVerificaRestosRollos(int Almacen, decimal Ancho1, string Liner1, string Liner2, string Liner3, string Medium1, decimal AnchoC1, string Medium2, decimal AnchoC2)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().GetVerificaRestosRollos(datosToken.Conexion, Almacen, Ancho1, Liner1, Liner2, Liner3, Medium1, AnchoC1, Medium2, AnchoC2));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("InsertaFiltros")]
        public async Task<IActionResult> InsertaFiltros(FiltrosReporteDTO datos)
        {
            try
            {
                return Ok(await new SecuenciaCorrugadoraBusiness().InsertaFiltros(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("Descargar")]
        public IActionResult Descargar(string Zona, string NombreArch)
        {
            try
            {
                string tipoArchivo = "text/gif";
                byte[] ArchivoBytes = new SecuenciaCorrugadoraBusiness().Descargar(datosToken, Zona, NombreArch);


                return File(ArchivoBytes, tipoArchivo, NombreArch);
            }
            catch (WebException ex)
            {
                String status = ((FtpWebResponse)ex.Response).StatusDescription;
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, $"Internal server error, {status}");
            }
        }
    }
}