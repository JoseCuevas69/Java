//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Business;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace FCAPROGAPI002.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIMetodosController : Controller 
    {

        // GET: api/APIMetodos
        [HttpGet]
        public IEnumerable<clsMetodos> Get()
        {
            clsMetodos[] lstLista = new clsMetodos[2];

            clsMetodos objMetodo = null;
            objMetodo = new clsMetodos();

            String strVersion = "v20211124.1";


            lstLista[0] = new clsMetodos();
            lstLista[0].API = "FCAPROGAPI002 - API";
            lstLista[0].Aplicacion = "FCAPROG001MW - Catalogo de Paros";
            lstLista[0].Version = strVersion;
            lstLista[0].Controller = "Auth";
            lstLista[0].Descripcion = "Objeto Controlador de Token";
            lstLista[0].Funciones = new[]
                                    {
                                          "GET: /Auth/Token"
                                    };

            lstLista[1] = new clsMetodos();
            lstLista[1].API = "FCAPROGAPI002 - API";
            lstLista[1].Aplicacion = "FCAPROG001MW - Catalogo de Paros";
            lstLista[1].Version = strVersion;
            lstLista[1].Controller = "Paros";
            lstLista[1].Descripcion = "Objeto Controlador de Catalogo de Paros";
            lstLista[1].Funciones = new[]
                                    {
                                          "GET: /Paros/getMaquinas?tipoMaquina=IM"
                                        , "GET: /Paros/getParos"
                                        , "GET: /Paros/Agregar"
                                        , "GET: /Paros/Modificar"
                                        , "GET: /Paros/Eliminar"
                                    };



           


            return lstLista; 
        }
    }
}
