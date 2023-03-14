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
    public class FCAPROG015MWController : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public FCAPROG015MWController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }

        [HttpGet("getResistencias")]
        public async Task<IActionResult> getResistencias()
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().getResistencias(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getAnchosUsar")]
        public async Task<IActionResult> getAnchosUsar(string usar)
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getAnchosUsar(datosToken, usar));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getVariaciones")]
        public async Task<IActionResult> getVariaciones()
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().getVariaciones(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("actualizarVariaciones")]
        public async Task<IActionResult> actualizarVariaciones(List<Variaciones> datos)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().actualizarVariaciones(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("procCalcularProgramas")]
        public async Task<IActionResult> procCalcularProgramas(string cuchillas)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().procCalcularProgramas(datosToken, cuchillas));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("cancelarOpsCalcularProgramas")]
        public async Task<IActionResult> cancelarOpsCalcularProgramas(List<ResData> datos)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().cancelarOpsCalcularProgramas(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("actualizarScorPrincipal")]
        public async Task<IActionResult> actualizarScorPrincipal(ResData datos)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().actualizarScorPrincipal(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("procValidarArreglos")]
        public async Task<IActionResult> procValidarArreglos(string pArreglo)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().procValidarArreglos(datosToken, Convert.ToInt32(pArreglo)));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("procValidarPresentacionPintado")]
        public async Task<IActionResult> procValidarPresentacionPintado(CPLDAT009TD_002 datos)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().procValidarPresentacionPintado(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        // getc
        [HttpGet("getConfiguracion")]
        public async Task<IActionResult> getConfiguracion()
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().getConfiguracion(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("actualizarConfiguracion")]
        public async Task<IActionResult> actualizarConfiguracion(clsConfiguracion datos)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().actualizarConfiguracion(datosToken, datos));
                //return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        // CerrarSession
        [HttpPost("cerrarSession")]
        public async Task<IActionResult> CerrarSession(clsConfiguracion datos)
        {
            try
            {
                return Ok(await new FCAPROG015MWBusiness().actualizarConfiguracion(datosToken, datos));
                //return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }


    }
}
