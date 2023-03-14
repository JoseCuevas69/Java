using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Business
{
    public class ClsFCAPROG018MWBusiness
    {
        private readonly Data.SPFCAPROG018MWData _repository;

        public ClsFCAPROG018MWBusiness(SPFCAPROG018MWData repository)
        {
            _repository = repository;
        }


        public Task<Result<IEnumerable<ProgramaListable>>> BuscaPrograma(string programa)
        {
            return _repository.BuscaPrograma(programa);
        }

        public Task<Result> leeHoraLocal(TokenData DatosToken)
        {
            return new FCAPROG019MWData().leeHoraLocal(DatosToken);
        }

        public Task<Result<IEnumerable<CapturaListable>>> BuscaCaptura(string programa, string turno, string fechaProduccion)
        {
            return _repository.BuscaCaptura(programa, turno, fechaProduccion);
        }

        public Task<Result<IEnumerable<SupervisorListable>>> ObtieneSupervisores()
        {
            return _repository.ObtieneSupervisores();
        }

        public Task<Result<IEnumerable<TripulacionListable>>> ObtieneTripulaciones()
        {
            return _repository.ObtieneTripulaciones();
        }

        public Task<Result<IEnumerable<DesperdicioListable>>> ObtieneDesperdicios()
        {
            return _repository.ObtieneDesperdicios();
        }


        public Task<Result<IEnumerable<DesperdicioSelectable>>> LeeDesperdicio(string programa, string turno, string fechaProduccion, string op)
        {
            return _repository.LeeDesperdicio(programa, turno, fechaProduccion, op);
        }

        public Task<Result<IEnumerable<KgPapelCalculado>>> CalculaKGPapel(string programa)
        {
            return _repository.CalculaKGPapel(programa);
        }
        public Task<Result<IEnumerable<ProgramaListable>>> ValidaDatos(string programa, string turno)
        {
            return _repository.ValidaDatos(programa, turno);
        }

        public Task<Result<IEnumerable<GramajeListable>>> ObtieneGramaje(string clavePapel)
        {
            return _repository.ObtieneGramaje(clavePapel);
        }

        public Task<Result<IEnumerable<CapturaExistenteListable>>> BuscaCapturaExistente(string programa, string turno, string fechaProduccion)
        {
            return _repository.BuscaCapturaExistente(programa, turno, fechaProduccion);
        }


        public Task<Result<int>> ActualizaOPSProduccion(string programa, string turno, string op, string numCortes, string laminasTotal, string laminasMalas, string fechaProduccion, string kgDesp)
        {
            return _repository.ActualizaOPSProduccion(programa, turno, op, numCortes, laminasTotal, laminasMalas, fechaProduccion, kgDesp);
        }

        public Task<Result<int>> ActualizaTotalCorrugado(string op, string laminasTotal, string fechaProduccion)
        {
            return _repository.ActualizaTotalCorrugado(op, laminasTotal, fechaProduccion);
        }

        public Task<Result<int>> Actualiza(actualiza datos)
        {
            return _repository.Actualiza(datos);
        }
        public Task<Result<int>> Modifica(modifica datos)
        {
            return _repository.Modifica(datos);
        }

        public Task<Result<int>> InsertaCmoDat016(
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
            string usuarioSistema,
            string laminasDesperdicio,
            string horaInicio,
        string horaFin,
            string idTripulacion
        )
        {
            return _repository.InsertaCmoDat016(
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
                usuarioSistema,
                laminasDesperdicio,
                horaInicio,
                horaFin,
                idTripulacion
            );
        }

        public Task<Result<int>> ActualizaEstatusPrograma(string programa)
        {
            return _repository.ActualizaEstatusPrograma(programa);
        }

        public Task<Result<int>> ActualizaCorrugadoraOpsProduccion(
            string numCortes,
            string laminas,
            string laminasDesperdicio,
            string kgDesp,
            string programa,
            string op,
            string turno,
            string fechaProduccion)
        {
            return _repository.ActualizaCorrugadoraOpsProduccion(
                numCortes,
                laminas,
                laminasDesperdicio,
                kgDesp,
                programa,
                op,
                turno,
                fechaProduccion
            );
        }

        public Task<Result<int>> ActualizaCorrugadoraOpsProduccionOr(
            string numCortes,
            string laminas,
            string laminasDesperdicio,
            string kgDesp,
            string programa,
            string op,
            string turno,
            string fechaProduccion)
        {
            return _repository.ActualizaCorrugadoraOpsProduccionOr(
                numCortes,
                laminas,
                laminasDesperdicio,
                kgDesp,
                programa,
                op,
                turno,
                fechaProduccion
            );
        }


        public Task<Result<int>> InsertaCmoDat017(
            string numCortes,
            string laminas,
            string laminasDesperdicio,
            string kgDesp,
            string programa,
            string op,
            string turno,
            string fechaProduccion)
        {
            return _repository.InsertaCmoDat017(
                numCortes,
                laminas,
                laminasDesperdicio,
                kgDesp,
                programa,
                op,
                turno,
                fechaProduccion
            );
        }

        public Task<Result<int>> ActualizaCorrugadoPorOP(string op, string laminasTotal)
        {
            return _repository.ActualizaCorrugadoPorOP(op, laminasTotal);
        }

        public Task<Result<int>> ActualizaCmoDat016(
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
            string usuarioSistema,
            string laminasDesperdicio,
            string horaInicio,
            string horaFin,
            string idTripulacion
        )
        {
            return _repository.ActualizaCmoDat016(
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
                usuarioSistema,
                laminasDesperdicio,
                horaInicio,
                horaFin,
                idTripulacion
            );
        }

        public Task<Result<int>> ActualizaCmoDat016EnTurno(
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
            string usuarioSistema,
            string laminasDesperdicio,
            string horaInicio,
            string horaFin,
            string idTripulacion
        )
        {
            return _repository.ActualizaCmoDat016EnTurno(
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
                usuarioSistema,
                laminasDesperdicio,
                horaInicio,
                horaFin,
                idTripulacion
                );
        }

        public Task<Result<int>> ActualizaTurnoProduccion(
            string programa,
            string turno,
            string sFecha,
            string folioDesperdicio
        )
        {
            return _repository.ActualizaTurnoProduccion(programa, turno, sFecha, folioDesperdicio);
        }

        public Task<Result<int>> ActualizaEstatusPrograma_T(
            string programa
            )
        {
            return _repository.ActualizaEstatusPrograma_T(programa);
        }
    }
}
