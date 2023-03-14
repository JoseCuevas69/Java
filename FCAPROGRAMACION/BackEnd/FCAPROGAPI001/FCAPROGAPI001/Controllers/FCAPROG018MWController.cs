using Entity;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FCAPRODAPI001.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class FCAPROG018MWController : ControllerBase
    {
        private readonly Business.ClsFCAPROG018MWBusiness _service;
        private readonly TokenData _tokenData;

        public FCAPROG018MWController(Business.ClsFCAPROG018MWBusiness service)
        {
            this._service = service;
        }

        [HttpGet("BuscaPrograma")]
        public async Task<IActionResult> BuscaPrograma(string programa)
        {
            var result = await _service.BuscaPrograma(programa);
            return Ok(result);
        }

        [HttpGet("BuscaCaptura")]
        public async Task<IActionResult> BuscaCaptura(string programa, string turno, string fechaProduccion)
        {
            DateTime newDate = DateTime.Parse(fechaProduccion);
            var result = await _service.BuscaCaptura(programa, turno, newDate.ToString("dd/MM/yyyy"));
            return Ok(result);
        }

        [HttpGet("ObtieneSupervisores")]
        public async Task<IActionResult> ObtieneSupervisores()
        {
            var result = await _service.ObtieneSupervisores();
            return Ok(result);
        }

        [HttpGet("ObtieneTripulaciones")]
        public async Task<IActionResult> ObtieneTripulaciones()
        {
            var result = await _service.ObtieneTripulaciones();
            return Ok(result);
        }

        [HttpGet("ObtieneDesperdicios")]
        public async Task<IActionResult> ObtieneDesperdicios()
        {
            var result = await _service.ObtieneDesperdicios();
            return Ok(result);
        }


        [HttpGet("LeeDesperdicio")]
        public async Task<IActionResult> LeeDesperdicio(string programa, string turno, string fechaProduccion, string op)
        {
            DateTime newDate = Convert.ToDateTime(fechaProduccion);
            var result = await _service.LeeDesperdicio(programa, turno, newDate.ToString("dd/MMM/yyyy"), op);
            return Ok(result);
        }

        [HttpGet("CalculaKGPapel")]
        public async Task<IActionResult> CalculaKGPapel(string programa)
        {
            var result = await _service.CalculaKGPapel(programa);
            return Ok(result);
        }

        [HttpGet("ObtieneGramaje")]
        public async Task<IActionResult> ObtieneGramaje(string clavePapel)
        {
            var result = await _service.ObtieneGramaje(clavePapel);
            return Ok(result);
        }

        [HttpGet("BuscaCapturaExistente")]
        public async Task<IActionResult> BuscaCapturaExistente(string programa, string turno, string fechaProduccion)
        {
            var result = await _service.BuscaCapturaExistente(programa, turno, fechaProduccion);
            return Ok(result);
        }

        [HttpGet("ValidaDatos")]
        public async Task<IActionResult> ValidaDatos(string programa, string turno)
        {
            var result = await _service.ValidaDatos(programa, turno);
            return Ok(result);
        }

        [HttpPost("Actualiza")]
        public async Task<IActionResult> Actualiza(actualiza datos)
        {
            var result = await _service.Actualiza(datos);
            return Ok(result);
        }

        [HttpPost("Modifica")]
        public async Task<IActionResult> Modifica(modifica datos)
        {
            DateTime newDate = Convert.ToDateTime(datos.SFechaProduccion);
            string newDateS = newDate.ToString("dd/MM/yyyy");
            datos.sFecha = newDateS;
            datos.SFechaProduccion = newDateS;
            datos.tablas.ForEach(x => x.sFechaProduccion = newDateS);
            var result = await _service.Modifica(datos);
            return Ok(result);
        }


        [HttpPost("ActualizaOPSProduccion")]
        public async Task<IActionResult> ActualizaOPSProduccion(string programa, string turno, string op, string numCortes, string laminasTotal, string laminasMalas, string fechaProduccion, string kgDesp)
        {
            var result = await _service.ActualizaOPSProduccion(programa, turno, op, numCortes, laminasTotal, laminasMalas, fechaProduccion, kgDesp);
            return Ok(result);
        }

        [HttpPost("ActualizaTotalCorrugado")]
        public async Task<IActionResult> ActualizaTotalCorrugado(string op, string laminasTotal, string fechaProduccion)
        {
            var result = await _service.ActualizaTotalCorrugado(op, laminasTotal, fechaProduccion);
            return Ok(result);
        }

        [HttpPost("InsertaCmoDat016")]
        public async Task<IActionResult> InsertaCmoDat016(
            string programa,
            string turno,
            string metrosLineales,
            string mCuadrados,
            string kgPapel,
            string kgDesp,
            string laminasDespegadas,
            string laminasCombas,
            string laminasDesorilladas,
            string fechaProduccion,
            string supervisor,
            string laminasDesperdicio,
            string horaInicio,
            string horaFin,
            string idTripulacion
        )
        {
            var result = await _service.InsertaCmoDat016(
                programa,
                turno,
                metrosLineales,
                mCuadrados,
                kgPapel,
                kgDesp,
                laminasDespegadas,
                laminasCombas,
                laminasDesorilladas,
                fechaProduccion,
                supervisor,
                _tokenData.Usuario,
                laminasDesperdicio,
                horaInicio,
                horaFin,
                idTripulacion
            );
            return Ok(result);
        }

        [HttpPost("ActualizaEstatusPrograma")]
        public async Task<IActionResult> ActualizaEstatusPrograma(string programa)
        {
            var result = await _service.ActualizaEstatusPrograma(programa);
            return Ok(result);
        }

        [HttpPost("ActualizaCorrugadoraOpsProduccion")]
        public async Task<IActionResult> ActualizaCorrugadoraOpsProduccion(
            string numCortes,
            string laminas,
            string laminasDesperdicio,
            string kgDesp,
            string programa,
            string op,
            string turno,
            string fechaProduccion)
        {
            var result = await _service.ActualizaCorrugadoraOpsProduccion(
                numCortes,
                laminas,
                laminasDesperdicio,
                kgDesp,
                programa,
                op,
                turno,
                fechaProduccion
            );
            return Ok(result);
        }

        [HttpPost("ActualizaCorrugadoraOpsProduccionOr")]
        public async Task<IActionResult> ActualizaCorrugadoraOpsProduccionOr(
            string numCortes,
            string laminas,
            string laminasDesperdicio,
            string kgDesp,
            string programa,
            string op,
            string turno,
            string fechaProduccion)
        {
            var result = await _service.ActualizaCorrugadoraOpsProduccionOr(
                numCortes,
                laminas,
                laminasDesperdicio,
                kgDesp,
                programa,
                op,
                turno,
                fechaProduccion
            );
            return Ok(result);
        }


        [HttpPost("InsertaCmoDat017")]
        public async Task<IActionResult> InsertaCmoDat017(
            string numCortes,
            string laminas,
            string laminasDesperdicio,
            string kgDesp,
            string programa,
            string op,
            string turno,
            string fechaProduccion)
        {
            var result = await _service.InsertaCmoDat017(
                numCortes,
                laminas,
                laminasDesperdicio,
                kgDesp,
                programa,
                op,
                turno,
                fechaProduccion
            );
            return Ok(result);
        }

        [HttpPost("ActualizaCorrugadoPorOP")]
        public async Task<IActionResult> ActualizaCorrugadoPorOP(string op, string laminasTotal)
        {
            var result = await _service.ActualizaCorrugadoPorOP(op, laminasTotal);
            return Ok(result);
        }

        [HttpPost("ActualizaCmoDat016")]
        public async Task<IActionResult> ActualizaCmoDat016(
            string programa,
            string turno,
            string metrosLineales,
            string mCuadrados,
            string kgPapel,
            //string kgDesp,
            string laminasDespegadas,
            string laminasCombas,
            string laminasDesorilladas,
            string fechaProduccion,
            string supervisor,
            string laminasDesperdicio,
            string horaInicio,
            string horaFin,
            string idTripulacion
        )
        {
            var result = await _service.ActualizaCmoDat016(
                programa,
                turno,
                metrosLineales,
                mCuadrados,
                kgPapel,
                //kgDesp,
                laminasDespegadas,
                laminasCombas,
                laminasDesorilladas,
                fechaProduccion,
                supervisor,
                _tokenData.Usuario,
                laminasDesperdicio,
                horaInicio,
                horaFin,
                idTripulacion
            );
            return Ok(result);
        }

        [HttpPost("ActualizaCmoDat016EnTurno")]
        public async Task<IActionResult> ActualizaCmoDat016EnTurno(
            string programa,
            string turno,
            string metrosLineales,
            string mCuadrados,
            string kgPapel,
            //string kgDesp,
            string laminasDespegadas,
            string laminasCombas,
            string laminasDesorilladas,
            string fechaProduccion,
            string supervisor,
            string laminasDesperdicio,
            string horaInicio,
            string horaFin,
            string idTripulacion
        )
        {
            var result = await _service.ActualizaCmoDat016EnTurno(
                programa,
                turno,
                metrosLineales,
                mCuadrados,
                kgPapel,
                //kgDesp,
                laminasDespegadas,
                laminasCombas,
                laminasDesorilladas,
                fechaProduccion,
                supervisor,
                _tokenData.Usuario,
                laminasDesperdicio,
                horaInicio,
                horaFin,
                idTripulacion
                );
            return Ok(result);
        }

        [HttpPost("ActualizaTurnoProduccion")]
        public async Task<IActionResult> ActualizaTurnoProduccion(
            string programa,
            string turno,
            string sFecha,
            string folioDesperdicio
        )
        {
            var result = await _service.ActualizaTurnoProduccion(programa, turno, sFecha, folioDesperdicio);
            return Ok(result);
        }

        [HttpPost("ActualizaEstatusPrograma_T")]
        public async Task<IActionResult> ActualizaEstatusPrograma_T(
            string programa
            )
        {
            var result = await _service.ActualizaEstatusPrograma_T(programa);
            return Ok(result);
        }
    }
}
