using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ProgramaImpresorasDinamicoController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public ProgramaImpresorasDinamicoController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }
        [HttpGet("GetCatMaquinas")]
        public async Task<IActionResult> GetCatMaquinas()
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetCatMaquinas(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("GetOPsProgramarImpresoras")]
        public async Task<IActionResult> GetOPsProgramarImpresoras(ProgramaLis Programa)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetOPsProgramarImpresoras(datosToken.Conexion, Programa));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetOPsOtrosDatos")]
        public async Task<IActionResult> GetOPsOtrosDatos(string Op)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetOPsOtrosDatos(datosToken.Conexion, Op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetValidarArticulo")]
        public async Task<IActionResult> GetValidarArticulo(string Op)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetValidarArticulo(datosToken.Conexion, Op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetRutaProcMaquinas")]
        public async Task<IActionResult> GetRutaProcMaquinas(string ClaveProceso)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetRutaProcMaquinas(datosToken.Conexion, ClaveProceso));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetMaquinaEstablecida")]
        public async Task<IActionResult> GetMaquinaEstablecida(string ClaveArticulo, int NumProceso)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetMaquinaEstablecida(datosToken.Conexion, ClaveArticulo, NumProceso));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("GetProgHisFabricacion")]
        public async Task<IActionResult> GetProgHisFabricacion(ProgImpresoraDinamico progImpresora)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetProgHisFabricacion(datosToken.Conexion, progImpresora));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("GetBalanceMaquinas")]
        public async Task<IActionResult> GetBalanceMaquinas(ProgImpresoraDinamico progImpresora)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetBalanceMaquinas(datosToken.Conexion, progImpresora));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("GetVelocidad")]
        public async Task<IActionResult> GetVelocidad(ProgImpresoraDinamico progImpresora)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().GetVelocidad(datosToken.Conexion, progImpresora));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("AgregarProgImpDinamico")]
        public async Task<IActionResult> AgregarProgImpDinamico(ProgImpresorasDinamico progImpresora)
        {
            try
            {
                return Ok(await new ProgramaImpresorasDinamicoBusiness().AgregarProgImpDinamico(datosToken, progImpresora));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}