using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Data.Core;
using Entity.DTO.Common;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FCAPROGAPI001
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();

            services.AddHttpContextAccessor();
            services.AddControllers();

            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });


            services.AddScoped(sp =>
            {
                var tokenData = new TokenData();
                var contextAccesor = sp.GetService<IHttpContextAccessor>();
                tokenData.Conexion = contextAccesor?.HttpContext?.Items["Conexion"] as string;
                tokenData.Zona = contextAccesor?.HttpContext?.Items["Zona"] as string;
                tokenData.Usuario = contextAccesor?.HttpContext?.Items["UsuarioERP"] as string;

                return tokenData;
            });

            services.AddScoped(sp =>
            {
                TokenData data = sp.GetService<TokenData>();
                return new SqlHelper(data?.Conexion ?? string.Empty);
            });

            // Se inyecta el servicio para realizar operaciones con SQL.
            /*services.AddScoped(sp =>
            {
                var contextAccesor = sp.GetService<IHttpContextAccessor>();
                string connection = contextAccesor?.HttpContext?.Items["Conexion"] as string;

                return new SqlHelper(connection);
            });*/

            // Inyectamos Data
            services.AddScoped<Data.SPFCAPROG018MWData>();

            // Inyectamos Business
            services.AddScoped<Business.ClsFCAPROG018MWBusiness>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptions<AppSettings> appSettings)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(x => x
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());

            app.UseAuthentication();

            app.UseAuthorization();

            app.Use(async (context, next) =>
            {
                IPrincipal identity = context.User;
                if (identity != null)
                {
                    ClaimsIdentity claims = identity.Identity as ClaimsIdentity;
                    if (claims.IsAuthenticated)
                    {
                        string zona = claims.FindFirst("Zona").Value;
                        context.Items["Conexion"] = appSettings.Value.Conexion.Replace("{Zona}", zona);
                        context.Items["UsuarioERP"] = claims.FindFirst("IdUsuario").Value;
                        context.Items["Zona"] = zona;
                    }
                }
                await next();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
