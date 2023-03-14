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
    public class DisponibilidadMaquinaController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public DisponibilidadMaquinaController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }
        [HttpGet("GetDisponibilidadMaquina")]
        public async Task<IActionResult> GetDisponibilidadMaquina(int anio, int mes , string ClaveMaquina)
        {
            try
            {
                return Ok(await new DisponibilidadMaquinaBusiness().GetDisponibilidadMaquina(datosToken.Conexion, anio , mes, ClaveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetMaquina")]
        public async Task<IActionResult> GetMaquina()
        {
            try
            {
                return Ok(await new DisponibilidadMaquinaBusiness().GetMaquina(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetValidarDisMaquina")]
        public async Task<IActionResult> GetValidarDisMaquina(int anio, int mes, string ClaveMaquina, string ClaveMaquinaDestino)
        {
            try
            {
                return Ok(await new DisponibilidadMaquinaBusiness().GetValidarDisMaquina(datosToken.Conexion, anio, mes, ClaveMaquina, ClaveMaquinaDestino));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("Agregar")]
        public async Task<IActionResult> Agregar(FCAPROGDAT017Entity diponibilidad)
        {
            try
            {
                return Ok(await new DisponibilidadMaquinaBusiness().Agregar(datosToken, diponibilidad));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("Copiar")]
        public async Task<IActionResult> Copiar(DisCopiaData diponibilidad)
        {
            try
            {
                return Ok(await new DisponibilidadMaquinaBusiness().Copiar(datosToken, diponibilidad));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("Editar")]
        public async Task<IActionResult> Editar(FCAPROGDAT017Entity diponibilidad)
        {
            try
            {
                return Ok(await new DisponibilidadMaquinaBusiness().Editar(datosToken, diponibilidad));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("Eliminar")]
        public async Task<IActionResult> Eliminar(FCAPROGDAT017Entity diponibilidad)
        {
            try
            {
                return Ok(await new DisponibilidadMaquinaBusiness().Eliminar(datosToken, diponibilidad));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}