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
    public class FCAPROG016MWController : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public FCAPROG016MWController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }

        [HttpGet("getDatosPrincipal")]
        public async Task<IActionResult> getDatosPrincipal()
        {
            try
            {
                return Ok(await new FCAPROG016MWBusiness().getDatosPrincipal(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("agregarOP")]
        public async Task<IActionResult> agregarOP(FCAPROG016MWEntity datos)
        {
            try
            {
                return Ok(await new FCAPROG016MWBusiness().agregarOP(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("validaVariacion")]
        public async Task<IActionResult> validaVariacion(ListaDatosPrincipal datos)
        {
            try
            {
                return Ok(await new FCAPROG016MWBusiness().ValidaVariacion(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("validaHojasFaltan")]
        public async Task<IActionResult> validaHojasFaltan(ListaDatosPrincipal datos)
        {
            try
            {
                return Ok(await new FCAPROG016MWBusiness().ValidaHojasFaltan(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("aplicarCambios")]
        public async Task<IActionResult> aplicarCambios(ListaDatosPrincipal datos)
        {
            try
            {
                return Ok(await new FCAPROG016MWBusiness().aplicarCambios(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
