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
    public class CPLCAP003Controller : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public CPLCAP003Controller(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }

        // ====================================================================================================================================
        // FJLM

        [HttpGet("getDatos")]
        public async Task<IActionResult> getDatos()
        {
            try
            {
                return Ok(await new CPLCAP003Business().getDatos(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getComboModificar")]
        public async Task<IActionResult> getComboModificar()
        {
            try
            {
                return Ok(await new CPLCAP003Business().getComboModificar(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("actualizarTabla")]
        public async Task<IActionResult> actualizarTabla(ParametrosCPLCAP003 Datos)
        {
            try
            {
                return Ok(await new CPLCAP003Business().GuardarDatos(datosToken, Datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("registrar")]
        public async Task<IActionResult> registrar(DatosComboCPLCAP003 Datos)
        {
            try
            {
                return Ok(await new CPLCAP003Business().registrar(datosToken, Datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("modificar")]
        public async Task<IActionResult> modificar(DatosComboCPLCAP003 Datos)
        {
            try
            {
                return Ok(await new CPLCAP003Business().modificar(datosToken, Datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("eliminar")]
        public async Task<IActionResult> eliminar(DatosComboCPLCAP003 Datos)
        {
            try
            {
                return Ok(await new CPLCAP003Business().eliminar(datosToken, Datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        // ====================================================================================================================================
    }
}
