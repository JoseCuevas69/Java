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
    public class CPLCAP002Controller : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public CPLCAP002Controller(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }

        [HttpGet("getDatosPrincipal")]
        public async Task<IActionResult> getDatosPrincipal(string clave = "")
        {
            try
            {
                return Ok(await new CPLCAP002Business().getDatosPrincipal(datosToken, clave));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getNextClaveProceso")]
        public async Task<IActionResult> getNextClaveProceso()
        {
            try
            {
                return Ok(await new CPLCAP002Business().getNextClaveProceso(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getExistePapel")]
        public async Task<IActionResult> getExistePapel(string clavePapel)
        {
            try
            {
                return Ok(await new CPLCAP002Business().getExistePapel(datosToken, clavePapel));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getExistenciaPapel")]
        public async Task<IActionResult> getExistenciaPapel(string clavePapel, string anchoPapel)
        {
            try
            {
                return Ok(await new CPLCAP002Business().getExistenciaPapel(datosToken, clavePapel, anchoPapel));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getRollosTransito")]
        public async Task<IActionResult> getRollosTransito(string clavePapel, string anchoPapel)
        {
            try
            {
                return Ok(await new CPLCAP002Business().getRollosTransito(datosToken, clavePapel, anchoPapel));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getPapelesDefaultCotizacion")]
        public async Task<IActionResult> getPapelesDefaultCotizacion()
        {
            try
            {
                return Ok(await new CPLCAP002Business().getPapelesDefaultCotizacion(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getCbxPreparacion")]
        public async Task<IActionResult> getCbxPreparacion()
        {
            try
            {
                return Ok(await new CPLCAP002Business().getCbxPreparacion(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("insertUpdateCplDat002")]
        public async Task<IActionResult> insertUpdateCplDat002(ListaCplCap002 Datos)
        {
            try
            {
                return Ok(await new CPLCAP002Business().insertUpdateCplDat002(datosToken, Datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("updateCplDat002")]
        public async Task<IActionResult> updateCplDat002(ListaCplCap002 Datos)
        {
            try
            {
                return Ok(await new CPLCAP002Business().updateCplDat002(datosToken, Datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
