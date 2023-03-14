using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Entity;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class AsignacionMaquinaController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public AsignacionMaquinaController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }

        [HttpGet("GetMaquinas")]
        public async Task<IActionResult> GetMaquinas()
        {
            try
            {
                return Ok(await new AsignacionMaquinaBusiness().GetMaquinas(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetRutas")]
        public async Task<IActionResult> GetRutas()
        {
            try
            {
                return Ok(await new AsignacionMaquinaBusiness().GetRutas(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetProcesosRelacionados")]
        public async Task<IActionResult> GetProcesosRelacionados(string ClaveArticulo)
        {
            try
            {
                return Ok(await new AsignacionMaquinaBusiness().GetProcesosRelacionados(datosToken.Conexion, ClaveArticulo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetAsginacionMaquina")]
        public async Task<IActionResult> GetAsginacionMaquina(string ClaveArticulo)
        {
            try
            {
                return Ok(await new AsignacionMaquinaBusiness().GetAsginacionMaquina(datosToken.Conexion, ClaveArticulo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetArticulosPorProceso")]
        public async Task<IActionResult> GetArticulosPorProceso(int startRow, int endRow, string proceso, string? filtro)
        {
            try
            {
                return Ok(await new AsignacionMaquinaBusiness().GetArticulosPorProceso(datosToken.Conexion, startRow, endRow, proceso, filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("GuardarProcesoMaquina")]
        public async Task<IActionResult> GuardarProcesoMaquina(List<AsignacionMaquinaEntity> datos)
        {
            try
            {
                return Ok(await new AsignacionMaquinaBusiness().GuardarProcesoMaquina(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("ActualizarProcesoMaquina")]
        public async Task<IActionResult> ActualizarProcesoMaquina(List<AsignacionMaquinaEntity> datos)
        {
            try
            {
                return Ok(await new AsignacionMaquinaBusiness().ActualizarProcesoMaquina(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}