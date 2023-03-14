using Business;
using Entity.DTO;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FCAPROGAPI002.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class FCAPROG017MWController : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public FCAPROG017MWController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Conexion2 = httpContext.HttpContext.Items["Conexion2"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }

        [HttpGet("getMaquinas")]
        public async Task<IActionResult> getMaquinas(string tipo, string tipoClave, string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getMaquinas(datosToken, tipo, tipoClave, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getMaquinaMantenimiento")]
        public async Task<IActionResult> getMaquinaMantenimiento(string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getMaquinaMantenimiento(datosToken, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getSecuenciaMaquinasOpsCanceladas")]
        public async Task<IActionResult> getSecuenciaMaquinasOpsCanceladas(string tipo, string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getSecuenciaMaquinasOpsCanceladas(datosToken, tipo, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getComentariosOPArticulo")]
        public async Task<IActionResult> getComentariosOPArticulo(string op, string claveArticulo)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getComentariosOPArticulo(datosToken, op, claveArticulo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getAllOpsMaquina")]
        public async Task<IActionResult> getAllOpsMaquina(string op)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getAllOpsMaquina(datosToken, op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getSigProCap")]
        public async Task<IActionResult> getSigProCap()
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getSigProCap(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("mdlCap009_BuscaOP")]
        public async Task<IActionResult> mdlCap009_BuscaOP(string opc, string op)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().mdlCap009_BuscaOP(datosToken, opc, op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("mdlCap009_GetCbxModificaProceso")]
        public async Task<IActionResult> mdlCap009_GetCbxModificaProceso(string claveMaquina, string mvt)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().mdlCap009_GetCbxModificaProceso(datosToken, claveMaquina, mvt));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("mdlCap009_GetCbxProceso")]
        public async Task<IActionResult> mdlCap009_GetCbxProceso(string claveProceso)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().mdlCap009_GetCbxProceso(datosToken, claveProceso));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("mdlCap009_GetCbxRutaProceso")]
        public async Task<IActionResult> mdlCap009_GetCbxRutaProceso()
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().mdlCap009_GetCbxRutaProceso(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("fechaTurnoTrabajo")]
        public async Task<IActionResult> fechaTurnoTrabajo()
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().fechaTurnoTrabajo(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("validaArt")]
        public async Task<IActionResult> validaArt(string claveArticulo, string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().validaArt(datosToken, claveArticulo, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getOPProgramada")]
        public async Task<IActionResult> getOPProgramada(string op, string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getOPProgramada(datosToken, op, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getJustificaciones")]
        public async Task<IActionResult> getJustificaciones()
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getJustificaciones(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("getValidaTodoCap005")]
        public async Task<IActionResult> getValidaTodoCap005(objProgramasCap005 objMdlCap005Programas)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getValidaTodoCap005(datosToken, objMdlCap005Programas));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getOPProgramada2")]
        public async Task<IActionResult> getOPProgramada2(string op, string programa, string cantidad)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getOPProgramada2(datosToken, op, programa, cantidad));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("getValidaProgramaProcAutoCap005")]
        public async Task<IActionResult> getValidaProgramaProcAutoCap005(objProgramasCap005 objMdlCap005Programas)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getValidaProgramaProcAutoCap005(datosToken, objMdlCap005Programas));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("validaJustificacionUsuario")]
        public async Task<IActionResult> validaJustificacionUsuario()
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().validaJustificacionUsuario(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("tieneProduccionTmpReal")]
        public async Task<IActionResult> tieneProduccionTmpReal(string progPosAct, string progPosSig, string fechaTrabajo, string turnoTrabajo)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().tieneProduccionTmpReal(datosToken, progPosAct, progPosSig, fechaTrabajo, turnoTrabajo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap001ValidaProgramaProcAuto")]
        public async Task<IActionResult> cap001ValidaProgramaProcAuto(objProgramasCap001 obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap001ValidaProgramaProcAuto(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap009ProgramacionAutomatica")]
        public async Task<IActionResult> cap009ProgramacionAutomatica(parSPLecOpc23 obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap009ProgramacionAutomatica(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getDatosCap016")]
        public async Task<IActionResult> getDatosCap016(string tipo, string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getDatosCap016(datosToken, tipo, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap016ValidarTraspasoOps")]
        public async Task<IActionResult> cap016ValidarTraspasoOps(objCap016ValidarTraspasoOps obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap016ValidarTraspasoOps(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("actualizarMaquina")]
        public async Task<IActionResult> actualizarMaquina(objProgramasCap005 objMdlCap005Programas)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().actualizarMaquina(datosToken, objMdlCap005Programas));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("reordenarProgInmediatosPosteriores")]
        public async Task<IActionResult> reordenarProgInmediatosPosteriores(objActOpc4 objSPActOpc4)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().reordenarProgInmediatosPosteriores(datosToken, objSPActOpc4));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap004FijarFecha")]
        public async Task<IActionResult> cap004FijarFecha(cap004FijarFecha obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap004FijarFecha(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap001EliminarOP")]
        public async Task<IActionResult> cap001EliminarOP(objSPActOpc6 obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap001EliminarOP(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap001TerminarPrograma1")]
        public async Task<IActionResult> cap001TerminarPrograma1(cap004FijarFecha obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap001TerminarPrograma1(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap001TerminarPrograma2")]
        public async Task<IActionResult> cap001TerminarPrograma2(SPActOpc8 obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap001TerminarPrograma2(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("suspenderOP")]
        public async Task<IActionResult> suspenderOP(cap001SuspenderOP obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().suspenderOP(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cap016TraspasarProgramas")]
        public async Task<IActionResult> cap016TraspasarProgramas(SPActOpc10 obj)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().cap016TraspasarProgramas(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getCanSigProCap")]
        public async Task<IActionResult> getCanSigProCap(string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().getCanSigProCap(datosToken, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("tieneProduccionRealCapSF")]
        public async Task<IActionResult> tieneProduccionRealCapSF(string progPosAct, string progPosSig, string claveMaquina)
        {
            try
            {
                return Ok(await new FCAPROG017MWBusiness().tieneProduccionRealCapSF(datosToken, progPosAct, progPosSig, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
