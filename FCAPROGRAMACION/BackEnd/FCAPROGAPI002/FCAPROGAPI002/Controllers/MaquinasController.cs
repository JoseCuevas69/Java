using System;
using System.Threading.Tasks;
using Business;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FCAPROGAPI002.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class MaquinasController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        public MaquinasController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;
            _httpContext = httpContext;
        }

        [HttpGet("getMaquinas")]
        public async Task<IActionResult> GetMaquinas(int startRow, int endRow, string tipoMaquina)
        {
            try
            {
                return Ok(await new MaquinasBusiness().GetMaquinas(appSettings.Conexion, startRow, endRow, tipoMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
