using Business;
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
    public class ProgramacionNormalController : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public ProgramacionNormalController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }

        // ====================================================================================================================================
        // FJLM

        [HttpGet("getResistencias")]
        public async Task<IActionResult> getResistencias()
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getResistencias(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getParametros")]
        public async Task<IActionResult> getParametros()
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getParametros(datosToken));
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

        [HttpGet("getDatosOps")]
        public async Task<IActionResult> getDatosOps()
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getDatosOps(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getArreglosPosibles")]
        public async Task<IActionResult> getArreglosPosibles(string puntos)
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getArreglosPosibles(datosToken, puntos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getOpAnalizando")]
        public async Task<IActionResult> getOpAnalizando(string op)
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getOpAnalizando(datosToken, op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getPuntosMaxArreglosPosibles")]
        public async Task<IActionResult> getPuntosMaxArreglosPosibles()
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getPuntosMaxArreglosPosibles(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getAnchoSTD")]
        public async Task<IActionResult> getAnchoSTD(string zona, string op)
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getAnchoSTD(datosToken, zona, op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getHojasProgramadas")]
        public async Task<IActionResult> getHojasProgramadas(string op)
        {
            try
            {
                return Ok(await new ProgramacionNormalBusiness().getHojasProgramadas(datosToken, op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        // ====================================================================================================================================
    }
}
