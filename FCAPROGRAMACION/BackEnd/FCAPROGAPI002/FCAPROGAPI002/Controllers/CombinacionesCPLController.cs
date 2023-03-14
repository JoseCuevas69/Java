using Business;
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
    public class CombinacionesCPLController : Controller
    {
        private readonly TokenData datosToken = new TokenData();

        public CombinacionesCPLController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();
        }

        // ====================================================================================================================================
        // FJLM

        //[HttpGet("getDatosPrincipal")]
        //public async Task<IActionResult> getDatosPrincipal()
        //{
        //    try
        //    {
        //        return Ok(await new CPLCAP002Business().getDatosPrincipal(datosToken));
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
        //    }
        //}

        // ====================================================================================================================================
    }
}
