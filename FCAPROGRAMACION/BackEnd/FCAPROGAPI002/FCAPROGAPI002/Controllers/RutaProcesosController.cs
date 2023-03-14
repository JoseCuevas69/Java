using System;
using System.Threading.Tasks;
using Business;
using Entity.DTO.Common;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;


namespace FCAPROGAPI002.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class RutaProcesosController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

        public RutaProcesosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;

            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();

        }

        [HttpGet("getListarRutas")]
        public async Task<IActionResult> listarRutas(int startRow, int endRow)
        {
            try
            {
                return Ok(await new RutaProcesosBusiness().ListarRutas(datosToken,startRow,endRow));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getListarProcesosRutas")]
        public async Task<IActionResult> listarProcesosRutas(int startRow, int endRow)
        {
            try
            {
                return Ok(await new RutaProcesosBusiness().ListarProcesosRutas(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getDetalleProcesosRutas")]
        public async Task<IActionResult> GetDetalleProcesosRutas(string ClaveProceso)
        {
            try
            {
                return Ok(await new RutaProcesosBusiness().GetDetalleProcesosRutas(datosToken,ClaveProceso));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostGuardaRutas")]
        public async Task<IActionResult> GuardaRutas(EncabezadoDetalleRuta obj)
        {
            try
            {
                return Ok(await new RutaProcesosBusiness().GuardaRutas(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostReactivaRutas")]
        public async Task<IActionResult> ReactivaRutas(EncabezadoRutaProcesosEntity obj)
        {
            try
            {
                return Ok(await new RutaProcesosBusiness().ReactivaRutas(datosToken,obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostEliminaRutas")]
        public async Task<IActionResult> EliminaRutas(EncabezadoRutaProcesosEntity obj)
        {
            try
            {
                return Ok(await new RutaProcesosBusiness().EliminaRutas(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}