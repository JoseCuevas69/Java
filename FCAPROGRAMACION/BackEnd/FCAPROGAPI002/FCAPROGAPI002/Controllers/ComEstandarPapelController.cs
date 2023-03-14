using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class ComEstandarPapelController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public ComEstandarPapelController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
        }

        [HttpGet("GetResistencias")]
        public async Task<IActionResult> GetResistencias()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetResistencias(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetAccesosUsuarios")]
        public async Task<IActionResult> GetAccesosUsuarios()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetAccesosUsuarios(datosToken.Conexion, datosToken.Usuario));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetRutaProceso")]
        public async Task<IActionResult> GetRutaProceso()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetRutaProceso(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetProcesoEspecial")]
        public async Task<IActionResult> GetProcesoEspecial()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetProcesoEspecial(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetProceso")]
        public async Task<IActionResult> GetProceso(string procesos)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetProceso(datosToken.Conexion, procesos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetPapeles")]
        public async Task<IActionResult> GetPapeles()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetPapeles(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetClavePreparacion")]
        public async Task<IActionResult> GetClavePreparacion()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetClavePreparacion(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetImpermeabilizado")]
        public async Task<IActionResult> GetImpermeabilizado()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetImpermeabilizado(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetInsumos")]
        public async Task<IActionResult> GetInsumos()
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetInsumos(datosToken.Conexion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetCombinacionEstandarPapel")]
        public async Task<IActionResult> GetCombinacionEstandarPapel(int startRow, int endRow, string filtro)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetCombinacionEstandarPapel(datosToken.Conexion, startRow, endRow, filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetCalculoPesoM2")]
        public async Task<IActionResult> GetCalculoPesoM2(string claveArticulo, string liner1, string corrugado1, string liner2, string corrugado2, string liner3, string corrugado3, string liner4, string resistencia, string flauta)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetCalculoPesoM2(datosToken.Conexion, claveArticulo, liner1, corrugado1, liner2, corrugado2, liner3, corrugado3, liner4, resistencia, flauta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetArticulos")]
        public async Task<IActionResult> GetArticulos(int startRow, int endRow, string filtro)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetArticulos(datosToken.Conexion, startRow, endRow, filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("Agregar")]
        public async Task<IActionResult> Agregar(CombinacionEstandarPapel data)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().Agregar(datosToken, data));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("Actualizar")]
        public async Task<IActionResult> ActualizarCombinacionEstandar(CombinacionEstandarPapel data)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().ActualizarCombinacionEstandar(datosToken, data));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("Eliminar")]
        public async Task<IActionResult> EliminarCombinacionEstandar(string claveArticulo)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().EliminarCombinacionEstandar(datosToken, claveArticulo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("GetArticulosPorResistencia")]
        public async Task<IActionResult> GetArticulosPorResistencia(int startRow, int endRow, string resistencia)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GetArticulosPorResistencia(datosToken.Conexion, startRow, endRow, resistencia));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("GuardarCombinacionPorResistencia")]
        public async Task<IActionResult> GuardarCombinacionPorResistencia(List<FCAPROGDAT006TD001> datos)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GuardarCombinacionPorResistencia(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("GuardarEspecificaciones")]
        public async Task<IActionResult> GuardarEspecificaciones(EspecificacionesMaquinas datos)
        {
            try
            {
                return Ok(await new ComEstandarPapelBusiness().GuardarEspecificaciones(datosToken, datos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}