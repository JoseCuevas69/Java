using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class AprovechamientoLaminaController : ControllerBase
    {

        private readonly TokenData datosToken = new TokenData();
        public AprovechamientoLaminaController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }

        [HttpGet("GetDatosOp")]
        public async Task<IActionResult> GetDatosOp(int Op)
        {
            try
            {
                return Ok(await new AprovechamientoLaminaBusiness().GetDatosOp(datosToken.Conexion, Op));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}