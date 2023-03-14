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
    public class PapelesController : Controller
    {
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

        public PapelesController (IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;
            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }

        [HttpGet("getPapeles")]
        public async Task<IActionResult> GetPapeles(int startRow, int endRow, string ClavePapel, string Descripcion)
        {
            try
            {
                ClavePapel = ClavePapel == "undefined" ? "" : ClavePapel;
                Descripcion = Descripcion == "undefined" ? "" : Descripcion;

                return Ok(await new clsPapelesBusiness().GetPapeles(datosToken, startRow, endRow, ClavePapel, Descripcion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getPermisos")]
        public async Task<IActionResult> GetPermisos()
        {
            try
            {
                return Ok(await new clsPapelesBusiness().GetPermisos(datosToken, 0, 1));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }


        [HttpPost("Agregar")]
        public async Task<IActionResult> Agregar(clsPapeles parPapeles)
        {
            try
            {

                return Ok(await new clsPapelesBusiness().Agregar(datosToken, parPapeles));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Modificar")]
        public async Task<IActionResult> Modificar(clsPapeles parPapeles)
        {
            try
            {
                
                return Ok(await new clsPapelesBusiness().Modificar(datosToken, parPapeles));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Eliminar")]
        public async Task<IActionResult> Eliminar(clsPapeles parPapeles)
        {
            try
            {

                return Ok(await new clsPapelesBusiness().Eliminar(datosToken, parPapeles));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Modificar2")]
        public async Task<IActionResult> Modificar2(clsPapeles parPapeles)
        {
            try
            {

                return Ok(await new clsPapelesBusiness().Modificar2(datosToken, parPapeles));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }






    }
}
