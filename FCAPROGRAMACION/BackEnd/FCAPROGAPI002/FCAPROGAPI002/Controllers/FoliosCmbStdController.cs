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
    public class FoliosCmbStdController : Controller
    {

        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor _httpContext;
        private readonly TokenData datosToken = new TokenData();

        public FoliosCmbStdController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            appSettings = AppSettings.Value;

            _httpContext = httpContext;

            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();

        }


        [HttpGet("getPermisosUsuario")]
        public async Task<IActionResult> GetPermisosUsuario()
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().GetPermisosUsuario(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getBuscarOPsxPrograma")]
        public async Task<IActionResult> GetBuscarOPsxPrograma(int startRow, int endRow, string parPrograma)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().GetBuscarOPsxPrograma(datosToken, startRow, endRow, parPrograma));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getEstandaresvsPropuesta")]
        public async Task<IActionResult> GetEstandaresvsPropuesta(int startRow, int endRow, string parPrograma, string parCveArticulo, string parOp)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().GetEstandaresvsPropuesta(datosToken, startRow, endRow, parPrograma, parCveArticulo, parOp));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getCombinacionEstPropuestas")]
        public async Task<IActionResult> GetCombinacionEstPropuestas(int startRow, int endRow, string parPrograma, string parOp)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().GetCombinacionEstPropuestas(datosToken, startRow, endRow, parPrograma, parOp));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        #region CmoDat125 - TABLA DE LA GENERACION DE FOLIOS (ENCABEZADOS)

        [HttpPost("cmoDat125_Agregar")]
        public async Task<IActionResult> CmoDat125_Agregar(clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat125_Agregar(datosToken, parFoliosCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat125_Modificar")]
        public async Task<IActionResult> CmoDat125_Modificar(clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat125_Modificar(datosToken, parFoliosCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat125_Eliminar")]
        public async Task<IActionResult> CmoDat125_Eliminar(clsFoliosCmbStd parFoliosCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat125_Eliminar(datosToken, parFoliosCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        #endregion 

        #region CmoDat126 - TABLA DE LAS PROPUESTAS DE LA COMBINACION ESTANDAR
        [HttpPost("cmoDat126_Agregar")]
        public async Task<IActionResult> CmoDat126_Agregar(clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat126_Agregar(datosToken, parPropuestaCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat126_Modificar")]
        public async Task<IActionResult> CmoDat126_Modificar( clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat126_Modificar(datosToken, parPropuestaCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat126_Eliminar")]
        public async Task<IActionResult> CmoDat126_Eliminar(clsPropuestaCmbStd parPropuestaCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat126_Eliminar(datosToken, parPropuestaCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        #endregion

        #region CmoDat127 - TABLA DE LOS DATOS DE LOS AUTORIZADORES DE LOS FOLIOS
        [HttpPost("cmoDat127_Agregar")]
        public async Task<IActionResult> CmoDat127_Agregar(clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat127_Agregar(datosToken, parAutorizadoresCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat127_Modificar")]
        public async Task<IActionResult> CmoDat127_Modificar(clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat127_Modificar(datosToken, parAutorizadoresCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat127_Eliminar")]
        public async Task<IActionResult> CmoDat127_Eliminar(clsAutorizadoresCmbStd parAutorizadoresCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat127_Eliminar(datosToken, parAutorizadoresCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        #endregion

        #region CmoDat132 - TABLA DE DETALLE DE LOS CONCEPTOS SELECCIONADOS

        [HttpPost("cmoDat132_Agregar")]
        public async Task<IActionResult> CmoDat132_Agregar( clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat132_Agregar(datosToken, parConceptosCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat132_Modificar")]
        public async Task<IActionResult> CmoDat132_Modificar(clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat132_Modificar(datosToken, parConceptosCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("cmoDat132_Eliminar")]
        public async Task<IActionResult> CmoDat132_Eliminar(clsConceptosCmbStd parConceptosCmbStd)
        {
            try
            {
                return Ok(await new clsFoliosCmbStdBusiness().CmoDat132_Eliminar(datosToken, parConceptosCmbStd));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        #endregion






    }
}
