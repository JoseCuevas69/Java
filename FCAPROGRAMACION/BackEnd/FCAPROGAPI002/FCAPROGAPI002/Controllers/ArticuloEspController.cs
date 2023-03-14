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
    public class ArticuloEspController : Controller
    {
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

        public ArticuloEspController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;

            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();

        }

        [HttpGet("getMaquinas")]
        public async Task<IActionResult> GetMaquinas()
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().GetMaquinas(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getArticulos")]
        public async Task<IActionResult> GetArticulos(int startRow, int endRow, string parDescripcion)
        {
            try
            {
                //"undefined"

                parDescripcion = parDescripcion == "undefined" ? "" : parDescripcion;

                return Ok(await new clsArticuloEspBusiness().GetArticulos(datosToken, startRow, endRow, parDescripcion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
      
        [HttpGet("getArticuloEspecialesEnc")]
        public async Task<IActionResult> GetArticuloEspecialesEnc(string parClaveArticulo, string parClaveMaquina, string parDescripcion)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().GetArticuloEspecialesEnc(datosToken, parClaveArticulo, parClaveMaquina, parDescripcion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getArticuloEspecialesDet")]
        public async Task<IActionResult> GetArticuloEspecialesDet(string parClaveArticulo, string parClaveMaquina, string parDescripcion)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().GetArticuloEspecialesDet(datosToken, parClaveArticulo, parClaveMaquina, parDescripcion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }



        [HttpPost("AgregarEnc")]
        public async Task<IActionResult> AgregarEnc(clsArticuloEsp parArticuloEsp)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().AgregarEnc(datosToken, parArticuloEsp));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("ModificarEnc")]
        public async Task<IActionResult> ModificarEnc(clsArticuloEsp parArticuloEsp)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().ModificarEnc(datosToken, parArticuloEsp));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("EliminarEnc")]
        public async Task<IActionResult> EliminarEnc(clsArticuloEsp parArticuloEsp)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().EliminarEnc(datosToken, parArticuloEsp));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /*
        [HttpPost("AgregarDet")]
        public ActionResult AgregarDet(clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                //return Ok(new clsReservaBusiness().Agregar(datosToken, parReserva));
                return Ok(new clsArticuloEspBusiness().AgregarDet(datosToken, parArticuloEspDet));
            }
            catch (Exception ex)
            {
                //return StatusCode(500, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }*/

        
        [HttpPost("AgregarDet")]
        public async Task<IActionResult> AgregarDet(clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().AgregarDet(datosToken, parArticuloEspDet));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
                //return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("ModificarDet")]
        public async Task<IActionResult> ModificarDet(clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().ModificarDet(datosToken, parArticuloEspDet));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("EliminarDet")]
        public async Task<IActionResult> EliminarDet(clsArticuloEspDet parArticuloEspDet)
        {
            try
            {
                return Ok(await new clsArticuloEspBusiness().EliminarDet(datosToken, parArticuloEspDet));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
