using Entity.DTO;
using Entity.DTO.Common;
using FCAPROGAPI002.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{

    [Route("/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IHttpContextAccessor _httpContext;
        public AuthController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            _appSettings = appSettings.Value;
            this._httpContext = httpContext;
        }

        [AllowAnonymous]
        [HttpPost("Token")]
        public IActionResult Token(UserJwt user)
        {
            JwtService.auth(_appSettings, user);
            return Ok(user);
        }

        //[AllowAnonymous]
        [HttpPost("TokenManual")]
        public IActionResult TokenManual(string pIdUsuario, string pZona)
        {
            JwtService.authManual(_appSettings, pIdUsuario, pZona);
            return Ok();
        }
    }
}
