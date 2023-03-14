using Data;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class FCAPROG017MWBusiness
    {
        public async Task<Result> getMaquinas(TokenData DatosToken, string tipo, string tipoClave, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().getMaquinas(DatosToken, tipo, tipoClave, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getMaquinaMantenimiento(TokenData DatosToken, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().getMaquinaMantenimiento(DatosToken, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getSecuenciaMaquinasOpsCanceladas(TokenData DatosToken, string tipo, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().getSecuenciaMaquinasOpsCanceladas(DatosToken, tipo, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getComentariosOPArticulo(TokenData DatosToken, string op, string claveArticulo)
        {
            try
            {
                return await new FCAPROG017MWData().getComentariosOPArticulo(DatosToken, op, claveArticulo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAllOpsMaquina(TokenData DatosToken, string op)
        {
            try
            {
                return await new FCAPROG017MWData().getAllOpsMaquina(DatosToken, op);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getSigProCap(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG017MWData().getSigProCap(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_BuscaOP(TokenData DatosToken, string opc, string op)
        {
            try
            {
                return await new FCAPROG017MWData().mdlCap009_BuscaOP(DatosToken, opc, op);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_GetCbxModificaProceso(TokenData DatosToken, string claveMaquina, string mvt)
        {
            try
            {
                return await new FCAPROG017MWData().mdlCap009_GetCbxModificaProceso(DatosToken, claveMaquina, mvt);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_GetCbxProceso(TokenData DatosToken, string claveProceso)
        {
            try
            {
                return await new FCAPROG017MWData().mdlCap009_GetCbxProceso(DatosToken, claveProceso);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> mdlCap009_GetCbxRutaProceso(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG017MWData().mdlCap009_GetCbxRutaProceso(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> fechaTurnoTrabajo(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG017MWData().fechaTurnoTrabajo(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> validaArt(TokenData DatosToken, string claveArticulo, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().validaArt(DatosToken, claveArticulo, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOPProgramada(TokenData DatosToken, string op, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().getOPProgramada(DatosToken, op, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getJustificaciones(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG017MWData().getJustificaciones(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getValidaTodoCap005(TokenData DatosToken, objProgramasCap005 objDatosCap005)
        {
            try
            {
                return await new FCAPROG017MWData().getValidaTodoCap005(DatosToken, objDatosCap005);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOPProgramada2(TokenData DatosToken, string op, string programa, string cantidad)
        {
            try
            {
                return await new FCAPROG017MWData().getOPProgramada2(DatosToken, op, programa, cantidad);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getValidaProgramaProcAutoCap005(TokenData DatosToken, objProgramasCap005 objDatosCap005)
        {
            try
            {
                return await new FCAPROG017MWData().getValidaProgramaProcAutoCap005(DatosToken, objDatosCap005);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> validaJustificacionUsuario(TokenData DatosToken)
        {
            try
            {
                return await new FCAPROG017MWData().validaJustificacionUsuario(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> tieneProduccionTmpReal(TokenData DatosToken, string progPosAct, string progPosSig, string fechaTrabajo, string turnoTrabajo)
        {
            try
            {
                return await new FCAPROG017MWData().tieneProduccionTmpReal(DatosToken, progPosAct, progPosSig, fechaTrabajo, turnoTrabajo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001ValidaProgramaProcAuto(TokenData DatosToken, objProgramasCap001 obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap001ValidaProgramaProcAuto(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap009ProgramacionAutomatica(TokenData DatosToken, parSPLecOpc23 obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap009ProgramacionAutomatica(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getDatosCap016(TokenData DatosToken, string tipo, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().getDatosCap016(DatosToken, tipo, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap016ValidarTraspasoOps(TokenData DatosToken, objCap016ValidarTraspasoOps obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap016ValidarTraspasoOps(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> actualizarMaquina(TokenData DatosToken, objProgramasCap005 objDatosCap005)
        {
            try
            {
                return await new FCAPROG017MWData().actualizarMaquina(DatosToken, objDatosCap005);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> reordenarProgInmediatosPosteriores(TokenData DatosToken, objActOpc4 obj)
        {
            try
            {
                return await new FCAPROG017MWData().reordenarProgInmediatosPosteriores(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap004FijarFecha(TokenData DatosToken, cap004FijarFecha obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap004FijarFecha(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001EliminarOP(TokenData DatosToken, objSPActOpc6 obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap001EliminarOP(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001TerminarPrograma1(TokenData DatosToken, cap004FijarFecha obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap001TerminarPrograma1(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap001TerminarPrograma2(TokenData DatosToken, SPActOpc8 obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap001TerminarPrograma2(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> suspenderOP(TokenData DatosToken, cap001SuspenderOP obj)
        {
            try
            {
                return await new FCAPROG017MWData().suspenderOP(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> cap016TraspasarProgramas(TokenData DatosToken, SPActOpc10 obj)
        {
            try
            {
                return await new FCAPROG017MWData().cap016TraspasarProgramas(DatosToken, obj);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getCanSigProCap(TokenData DatosToken, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().getCanSigProCap(DatosToken, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> tieneProduccionRealCapSF(TokenData DatosToken, string progPosAct, string progPosSig, string claveMaquina)
        {
            try
            {
                return await new FCAPROG017MWData().tieneProduccionRealCapSF(DatosToken, progPosAct, progPosSig, claveMaquina);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
