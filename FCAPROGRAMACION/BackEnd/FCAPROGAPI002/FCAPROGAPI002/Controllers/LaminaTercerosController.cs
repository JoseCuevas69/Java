/*
using System;
using System.Threading.Tasks;
using Business;
using Entity.DTO.Common;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
*/
using Business;
using Entity.DTO;
using Entity.DTO.Common;
//using Entity.DTO.Common;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//namespace FCAPROGAPI002.Controllers
namespace FCAPROGAPI002.Controllers
{
    ////[Authorize]
    //[Route("/[controller]")]
    //[ApiController]

    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class LaminaTercerosController : Controller
    {
        /*
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

        public LaminaTercerosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;

            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();

        }
        */
        private readonly TokenData datosToken = new TokenData();
        public LaminaTercerosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }




        [HttpGet("ObtieneAlmacenes")]
        public async Task<IActionResult> ObtieneAlmacenes()
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().ObtieneAlmacenes(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("DatosTraspasoOrigen")]
        public async Task<IActionResult> DatosTraspasoOrigen(string parOriAlmacen, string parOriOP)
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().DatosTraspasoOrigen(datosToken, parOriAlmacen, parOriOP));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("DatosTraspasoDestino")]
        public async Task<IActionResult> DatosTraspasoDestino(string parDesAlmacen, string parDesOP)
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().DatosTraspasoDestino(datosToken, parDesAlmacen, parDesOP));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("ValidarDatos")]
        public async Task<IActionResult> ValidarDatos(clsLamTerFiltros parLamTerFiltros)
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().ValidarDatos(datosToken, parLamTerFiltros));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("AplicarPreEntrada")]
        public async Task<IActionResult> AplicarPreEntrada( clsLamTerMovimiento parLamTerMovimiento)
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().AplicarPreEntrada(datosToken, parLamTerMovimiento));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("AlmacenesOrigen")]
        public async Task<IActionResult> AlmacenesOrigen()
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().AlmacenesOrigen(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("AlmacenesDestino")]
        public async Task<IActionResult> AlmacenesDestino()
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().AlmacenesDestino(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("AplicarTraspaso")]
        public async Task<IActionResult> AplicarTraspaso(clsLamTerMovimiento parLamTerMovimiento)
        {
            try
            {
                return Ok(await new clsLaminaTercerosBusiness().AplicarTraspaso(datosToken, parLamTerMovimiento));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



    }
}
