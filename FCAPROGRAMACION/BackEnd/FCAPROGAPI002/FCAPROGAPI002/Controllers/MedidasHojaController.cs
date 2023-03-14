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
    public class MedidasHojaController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public MedidasHojaController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }
        [HttpGet("GetDatArticulo")]
        public async Task<IActionResult> GetDatArticulo(string claveArticulo)
        {
            try
            {
                return Ok(await new MedidasHojaBusiness().GetDatArticulo(datosToken.Conexion, claveArticulo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("Agregar")]
        public async Task<IActionResult> Agregar(ArticuloDTO art)
        {
            try
            {
                return Ok(await new MedidasHojaBusiness().Agregar(datosToken, art));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}