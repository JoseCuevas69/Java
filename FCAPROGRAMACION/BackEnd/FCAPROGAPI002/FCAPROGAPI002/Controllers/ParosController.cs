using System;
using System.Threading.Tasks;
using Business;
using Entity.DTO.Common;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class ParosController : Controller
    {
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

           public ParosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;
            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();

        }


        [HttpGet("getMaquinas")]
        public async Task<IActionResult> GetMaquinas(string tipoMaquina)
        {
            try
            {
                return Ok(await new ParosBusiness().GetMaquinas(datosToken, tipoMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getParos")]
        public async Task<IActionResult> GetParos(int startRow, int endRow, string TipoMaquina,  string TipoTiempo, string ClaveMaquina, string Fecha)
        {
            try
            {   
                return Ok(await new ParosBusiness().GetParos(datosToken, startRow, endRow, TipoMaquina, TipoTiempo, ClaveMaquina, Fecha));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        
        
        [HttpPost("Agregar")]
        public async Task<IActionResult> Agregar(clsParos parParos)
        {
            try
            {
                return Ok(await new ParosBusiness().Agregar(datosToken, parParos));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Modificar")]
        public ActionResult Modificar(clsParos parParos)
        {
            try
            {
                new ParosBusiness().Modificar(datosToken, parParos);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Eliminar")]
        public ActionResult Eliminar(clsParos parParos)
        {
            try
            {
                new ParosBusiness().Eliminar(datosToken, parParos);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        


    }
}
