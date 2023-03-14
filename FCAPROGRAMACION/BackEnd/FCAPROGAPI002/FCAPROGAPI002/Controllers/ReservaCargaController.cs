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
    //[Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class ReservaCargaController : Controller
    {
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

        public ReservaCargaController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;

            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();

        }

        [HttpGet("getReservas")]
        public async Task<IActionResult> GetReservas(int startRow, int endRow, string parZona)
        {
            try
            {
                return Ok(await new clsReservaBusiness().GetReservas(datosToken, startRow, endRow, parZona));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }


        [HttpPost("Agregar")]
        public ActionResult Agregar(clsReserva parReserva)
        {
            try
            {
                return Ok(new clsReservaBusiness().Agregar(datosToken, parReserva));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Modificar")]
        public ActionResult Modificar(clsReserva parReserva)
        {
            try
            {
                //new ParosBusiness().Modificar(datosToken, parParos);
                return Ok(new clsReservaBusiness().Modificar(datosToken, parReserva));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Eliminar")]
        public ActionResult Eliminar(clsReserva parReserva)
        {
            try
            {
                //new ParosBusiness().Eliminar(datosToken, parParos);
                return Ok(new clsReservaBusiness().Eliminar(datosToken, parReserva));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
