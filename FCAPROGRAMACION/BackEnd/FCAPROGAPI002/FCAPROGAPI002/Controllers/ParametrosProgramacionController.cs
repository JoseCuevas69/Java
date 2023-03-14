using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Entity;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{
    //[Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class ParametrosProgramacionController : ControllerBase
    {

        private readonly TokenData datosToken = new TokenData();
        public ParametrosProgramacionController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }
        [HttpGet("GetParametrosProg")]
        public async Task<IActionResult> GetParametrosProg()
        {
            try
            {
                return Ok(await new ParametrosProgramacionBusiness().GetParametrosProg(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("GetVariacion")]
        public async Task<IActionResult> GetVariacion()
        {
            try
            {
                return Ok(await new ParametrosProgramacionBusiness().GetVariacion(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("Agregar")]
        public async Task<IActionResult> Agregar(FCAPROGDAT015Entity variacion)
        {
            try
            {
                return Ok(await new ParametrosProgramacionBusiness().Agregar(datosToken, variacion));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("Editar")]
        public async Task<IActionResult> Editar(FCAPROGDAT015Entity variacion)
        {
            try
            {
                return Ok(await new ParametrosProgramacionBusiness().Editar(datosToken, variacion));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("AgregarParametros")]
        public async Task<IActionResult> AgregarParametros(FCAPROGDAT009Entity parametros)
        {
            try
            {
                return Ok(await new ParametrosProgramacionBusiness().AgregarParametros(datosToken, parametros));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}