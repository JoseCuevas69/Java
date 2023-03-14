using System;
using System.Collections.Generic;
using System.Text;
using Data;
using Entity.DTO.Common;
using Entity;
using System.Threading.Tasks;


namespace Business
{
    public class EstandaresImpBusiness
    {
        public Task<Result> ListarMaquinas(TokenData datosToken, string tipoMaquina)
        {
            return new EstandaresImpData().ListarMaquinas(datosToken, tipoMaquina);
        }
        public Task<Result> ListarEstandares(TokenData datosToken, int startRow, int endRow, string tipoMaquina, string claveMaquina)
        {
            return new EstandaresImpData().ListarEstandares(datosToken,startRow,endRow, tipoMaquina,claveMaquina);
        }
        public Task<Result> ListarProcesos(TokenData datosToken, string tipoMaquina, string claveMaquina)
        {
            return new EstandaresImpData().ListarProcesos(datosToken,  tipoMaquina, claveMaquina);
        }
        public Task<Result> GetEficiencia(TokenData datosToken, string claveMaquina)
        {
            return new EstandaresImpData().GetEficiencia(datosToken, claveMaquina);
        }
        public Task<Result> ListarVelocidadEstandar(TokenData datosToken, int startRow, int endRow, string claveMaquina)
        {
            return new EstandaresImpData().ListarVelocidadEstandar(datosToken, startRow, endRow, claveMaquina);
        }
        public Task<Result> ExisteTurno(TokenData datosToken, string claveMaquina,string ClaveArea, string Turno)
        {
            return new EstandaresImpData().ExisteTurno(datosToken, claveMaquina,ClaveArea,Turno);
        }
        public Task<Result> ActulizaTiempoEstPre(TokenData datosToken, EstandaresImpEntity obj)
        {
            return new EstandaresImpData().ActulizaTiempoEstPre(datosToken, obj);
        }
        public Task<Result> EliminaTiempoEstPre(TokenData datosToken, EstandaresImpEntity obj)
        {
            return new EstandaresImpData().EliminaTiempoEstPre(datosToken, obj);
        }
        public Task<Result> ActulizaVelocidadEstandar(TokenData datosToken, VelocidadEstandar obj)
        {
            return new EstandaresImpData().ActulizaVelocidadEstandar(datosToken, obj);
        }
        public Task<Result> EliminarVelocidadEstandar(TokenData datosToken, VelocidadEstandar obj)
        {
            return new EstandaresImpData().EliminarVelocidadEstandar(datosToken, obj);
        }
        public Task<Result> GuardaHorariosComida(TokenData datosToken, HorariosComida obj)
        {
            return new EstandaresImpData().GuardaHorariosComida(datosToken, obj);
        }
        public Task<Result> ModificaHorariosComida(TokenData datosToken, HorariosComida obj)
        {
            return new EstandaresImpData().ModificaHorariosComida(datosToken, obj);
        }
    }
}
