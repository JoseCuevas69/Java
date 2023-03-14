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
    public class EstandaresImpController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

        public EstandaresImpController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;

            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();

        }

        [HttpGet("getListarMaquinas")]
        public async Task<IActionResult> listarMaquinas(string tipoMaquina)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ListarMaquinas(datosToken, tipoMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getListarEstandares")]
        public async Task<IActionResult> listarEstandares(int startRow, int endRow,string tipoMaquina,string claveMaquina)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ListarEstandares(datosToken,startRow,endRow, tipoMaquina,claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getListarProcesos")]
        public async Task<IActionResult> listarProcesos( string tipoMaquina, string claveMaquina)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ListarProcesos(datosToken,tipoMaquina, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getEficiencia")]
        public async Task<IActionResult> GetEficiencia(string claveMaquina)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().GetEficiencia(datosToken, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getListarVelocidadEstandar")]
        public async Task<IActionResult> listarVelocidadEstandar(int startRow, int endRow, string claveMaquina)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ListarVelocidadEstandar(datosToken, startRow, endRow, claveMaquina));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getExisteTurno")]
        public async Task<IActionResult> ExisteTurno(string claveMaquina, string claveArea, string turno)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ExisteTurno(datosToken, claveMaquina,claveArea,turno));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostActTiempoEstPre")]
        public async Task<IActionResult> ActulizaTiempoEstPre(EstandaresImpEntity obj)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ActulizaTiempoEstPre(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostElmTiempoEstPre")]
        public async Task<IActionResult> ElimnaTiempoEstPre(EstandaresImpEntity obj)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().EliminaTiempoEstPre(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostActVelocidadEstandar")]
        public async Task<IActionResult> ActulizaVelocidadEstandar(VelocidadEstandar obj)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ActulizaVelocidadEstandar(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostElmVelocidadEstandar")]
        public async Task<IActionResult> EliminarVelocidadEstandar(VelocidadEstandar obj)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().EliminarVelocidadEstandar(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostGuardaHorariosComida")]
        public async Task<IActionResult> GuardaHorariosComida(HorariosComida obj)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().GuardaHorariosComida(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("PostModificaHorariosComida")]
        public async Task<IActionResult> ModificaHorariosComida(HorariosComida obj)
        {
            try
            {
                return Ok(await new EstandaresImpBusiness().ModificaHorariosComida(datosToken, obj));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}