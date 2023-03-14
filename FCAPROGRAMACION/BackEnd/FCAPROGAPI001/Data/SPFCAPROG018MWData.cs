using Dapper;
using Data.Core;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class SPFCAPROG018MWData
    {
        private readonly SqlHelper _sqlHelper;

        public SPFCAPROG018MWData(SqlHelper sqlHelper)
        {
            _sqlHelper = sqlHelper;
        }

        public Task<Result<IEnumerable<ProgramaListable>>> BuscaPrograma(string programa)
        {
            return _sqlHelper.ExecuteSPConsultaList<ProgramaListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 1,
                    Programa = programa
                }
             );
        }

        public Task<Result<IEnumerable<CapturaListable>>> BuscaCaptura(string programa, string turno, string fechaProduccion)
        {
            return _sqlHelper.ExecuteSPConsultaList<CapturaListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 2,
                    Programa = programa,
                    Turno = turno,
                    SFechaProduccion = fechaProduccion
                }
             );
        }

        public Task<Result<IEnumerable<SupervisorListable>>> ObtieneSupervisores()
        {
            return _sqlHelper.ExecuteSPConsultaList<SupervisorListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 3
                }
             );
        }

        public Task<Result<IEnumerable<TripulacionListable>>> ObtieneTripulaciones()
        {
            return _sqlHelper.ExecuteSPConsultaList<TripulacionListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 4
                }
             );
        }

        public Task<Result<IEnumerable<DesperdicioListable>>> ObtieneDesperdicios()
        {
            return _sqlHelper.ExecuteSPConsultaList<DesperdicioListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 5
                }
             );
        }


        public Task<Result<IEnumerable<DesperdicioSelectable>>> LeeDesperdicio(string programa, string turno, string fechaProduccion, string op)
        {
            return _sqlHelper.ExecuteSPConsultaList<DesperdicioSelectable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 6,
                    Programa = programa,
                    Turno = turno,
                    SFechaProduccion = fechaProduccion,
                    OP = op
                }
             );
        }


        public Task<Result<IEnumerable<KgPapelCalculado>>> CalculaKGPapel(string programa)
        {
            return _sqlHelper.ExecuteSPConsultaList<KgPapelCalculado>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 7,
                    Programa = programa
                }
             );
        }
        public Task<Result<IEnumerable<ProgramaListable>>> ValidaDatos(string programa, string turno)
        {
            return _sqlHelper.ExecuteSPConsultaList<ProgramaListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 10,
                    Programa = programa,
                    Turno = turno
                }
             );
        }

        public Task<Result<IEnumerable<GramajeListable>>> ObtieneGramaje(string clavePapel)
        {
            return _sqlHelper.ExecuteSPConsultaList<GramajeListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 8,
                    ClavePapel = clavePapel
                }
             );
        }

        public Task<Result<IEnumerable<CapturaExistenteListable>>> BuscaCapturaExistente(string programa, string turno, string fechaProduccion)
        {
            return _sqlHelper.ExecuteSPConsultaList<CapturaExistenteListable>(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 9,
                    Programa = programa,
                    Turno = turno,
                    SFechaProduccion = fechaProduccion,
                }
             );
        }


        public Task<Result<int>> ActualizaOPSProduccion(string programa, string turno, string op, string numCortes, string laminasTotal, string laminasMalas, string fechaProduccion, string kgDesp)
        {
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 1,
                    Programa = programa,
                    Turno = turno,
                    SFechaProduccion = fechaProduccion,
                    OP = op,
                    NumCortes = numCortes,
                    LaminasTotal = laminasTotal,
                    LaminasMalas = laminasMalas,
                    KgDesp = kgDesp
                }
             );
        }

        public Task<Result<int>> ActualizaTotalCorrugado(string op, string laminasTotal, string fechaProduccion)
        {
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 2,
                    SFechaProduccion = fechaProduccion,
                    OP = op,
                    LaminasTotal = laminasTotal
                }
             );
        }

        public Task<Result<int>> Actualiza(actualiza datos)
        {
            TranformaDataTable Ds = new TranformaDataTable();

            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 13,
                    FCAPROG018TD_001 = Ds.CreateDataTable(datos.tablas).AsTableValuedParameter("FCAPROG018TD_001"),
                    Programa = datos.Programa,
                    SFechaProduccion = datos.SFechaProduccion,
                    HoraInicio = datos.HoraInicio,
                    HoraFin = datos.HoraFin,
                    MetrosLineales = datos.MetrosLineales,
                    MCuadrados = datos.MCuadrados,
                    KgPapel = datos.KgPapel,
                    KgDesp = datos.KgDesp,
                    LaminasDespegadas = datos.LaminasDespegadas,
                    LaminasCombas = datos.LaminasCombas,
                    LaminasDesorilladas = datos.LaminasDesorilladas,
                    Supervisor = datos.Supervisor,
                    Turno = datos.Turno,
                    UsuarioSistema = datos.UsuarioSistema,
                    LaminasDesperdicio = datos.LaminasDesperdicio,
                    IdTripulacion = datos.IdTripulacion
                }
             );
        }
        public Task<Result<int>> Modifica(modifica datos)
        {
            TranformaDataTable Ds = new TranformaDataTable();
            DataTable jeje = Ds.CreateDataTable(datos.tablas);
            jeje.TableName = "FCAPROG018TD_002";
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 14,
                    FCAPROG018TD_002 = jeje.AsTableValuedParameter("FCAPROG018TD_002"),
                    TurnoChk = datos.TurnoChk,
                    SFechaProduccion = datos.SFechaProduccion,
                    HoraInicio = datos.HoraInicio,
                    HoraFin = datos.HoraFin,
                    MetrosLineales = datos.MetrosLineales,
                    MCuadrados = datos.MCuadrados,
                    LaminasDespegadas = datos.LaminasDespegadas,
                    LaminasCombas = datos.LaminasCombas,
                    LaminasDesorilladas = datos.LaminasDesorilladas,
                    Supervisor = datos.Supervisor,
                    UsuarioSistema = datos.UsuarioSistema,
                    KgPapel = datos.KgPapel,
                    LaminasDesperdicio = datos.LaminasDesperdicio,
                    IdTripulacion = datos.IdTripulacion,
                    Programa = datos.Programa,
                    Turno = datos.Turno,
                    sFecha = datos.sFecha,
                    FolioDesperdicio = datos.FolioDesperdicio
                }
             );
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
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 3,
                    Programa = programa,
                    SFechaProduccion = fechaProduccion,
                    HoraInicio = horaInicio,
                    HoraFin = horaFin,
                    MetrosLineales = metrosLineales,
                    MCuadrados = mCuadrados,
                    KgPapel = kgPapel,
                    KgDesp = kgDesp,
                    LaminasDespegadas = laminasDespegadas,
                    LaminasCombas = laminasCombas,
                    LaminasDesorilladas = laminasDesorilladas,
                    Supervisor = supervisor,
                    Turno = turno,
                    UsuarioSistema = usuarioSistema,
                    LaminasDesperdicio = laminasDesperdicio,
                    IdTripulacion = idTripulacion
                }
             );
        }

        public Task<Result<int>> ActualizaEstatusPrograma(string programa)
        {
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 4,
                    Programa = programa
                }
             );
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
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 5,
                    NumCortes = numCortes,
                    Laminas = laminas,
                    LaminasDesperdicio = laminasDesperdicio,
                    KgDesp = kgDesp,
                    Programa = programa,
                    Turno = turno,
                    OP = op,
                    SFechaProduccion = fechaProduccion
                }
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
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 6,
                    NumCortes = numCortes,
                    Laminas = laminas,
                    LaminasDesperdicio = laminasDesperdicio,
                    KgDesp = kgDesp,
                    Programa = programa,
                    Turno = turno,
                    OP = op,
                    SFechaProduccion = fechaProduccion
                }
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
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 7,
                    Programa = programa,
                    OP = op,
                    Turno = turno,
                    NumCortes = numCortes,
                    Laminas = laminas,
                    LaminasDesperdicio = laminasDesperdicio,
                    KgDesp = kgDesp,
                    SFechaProduccion = fechaProduccion
                }
             );
        }

        public Task<Result<int>> ActualizaCorrugadoPorOP(string op, string laminasTotal)
        {
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 8,
                    OP = op,
                    LaminasTotal = laminasTotal
                }
             );
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
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 9,
                    Programa = programa,
                    SFechaProduccion = fechaProduccion,
                    HoraInicio = horaInicio,
                    HoraFin = horaFin,
                    MetrosLineales = metrosLineales,
                    MCuadrados = mCuadrados,
                    KgPapel = kgPapel,
                    //KgDesp = kgDesp,
                    LaminasDespegadas = laminasDespegadas,
                    LaminasCombas = laminasCombas,
                    LaminasDesorilladas = laminasDesorilladas,
                    Supervisor = supervisor,
                    Turno = turno,
                    UsuarioSistema = usuarioSistema,
                    LaminasDesperdicio = laminasDesperdicio,
                    IdTripulacion = idTripulacion
                }
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
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 10,
                    Programa = programa,
                    SFechaProduccion = fechaProduccion,
                    HoraInicio = horaInicio,
                    HoraFin = horaFin,
                    MetrosLineales = metrosLineales,
                    MCuadrados = mCuadrados,
                    KgPapel = kgPapel,
                    //KgDesp = kgDesp,
                    LaminasDespegadas = laminasDespegadas,
                    LaminasCombas = laminasCombas,
                    LaminasDesorilladas = laminasDesorilladas,
                    Supervisor = supervisor,
                    Turno = turno,
                    UsuarioSistema = usuarioSistema,
                    LaminasDesperdicio = laminasDesperdicio,
                    IdTripulacion = idTripulacion
                }
             );
        }

        public Task<Result<int>> ActualizaTurnoProduccion(
            string programa,
            string turno,
            string sFecha,
            string folioDesperdicio
        )
        {
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 11,
                    Turno = turno,
                    Programa = programa,
                    SFecha = sFecha,
                    FolioDesperdicio = folioDesperdicio
                }
             );
        }

        public Task<Result<int>> ActualizaEstatusPrograma_T(
                string programa
            )
        {
            return _sqlHelper.ExecuteSPActualiza(
                sp => sp.SPCmoCap31,
                new
                {
                    Opcion = 12,
                    Programa = programa
                }
             );
        }
    }
}
