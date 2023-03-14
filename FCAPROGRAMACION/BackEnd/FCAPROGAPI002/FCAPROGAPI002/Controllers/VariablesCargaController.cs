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
    public class VariablesCargaController : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public VariablesCargaController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
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
                return Ok(await new VariablesCargaBusiness().getDatos(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("GuardarDatos")]
        public async Task<IActionResult> GuardarDatos(ListaDataVariablesCargaEntity DtsDatos)
        {
            try
            {
                return Ok(await new VariablesCargaBusiness().GuardarDatos(datosToken, DtsDatos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        // =================================================================================================
    }
}
