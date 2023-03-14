using Dapper;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class FCAPROG016MWData
    {
        public async Task<Result> getDatosPrincipal(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await con.QueryMultipleAsync(
                        "FCAPROG016MWSPC1",
                        new
                        {
                            Opcion = 1,
                            pZonaERP = DatosToken.Zona,
                            pUsuarioERP = DatosToken.Usuario
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Principal>();
                    //objResult.totalRecords = await result.ReadFirstAsync<int>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> agregarOP(TokenData DatosToken, FCAPROG016MWEntity datos)
        {
            Result objResult = new Result();

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QuerySingleAsync<ErrorSQL>(
                        "FCAPROG016MWSPC1",
                        new
                        {
                            Opcion = 2,
                            pZonaERP = DatosToken.Zona,
                            pOP = datos.op,
                            pUsuarioERP = DatosToken.Usuario
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> ValidaVariacion(TokenData DatosToken, ListaDatosPrincipal datos)
        {
            Result objResult = new Result();

            List<Principal2> eDato = new List<Principal2>();
            Principal2 dts;

            for (int i = 0; i < datos.data.Count; i++)
            {
                dts = new Principal2();
                dts.Prior = datos.data[i].Prior;
                dts.Usar = datos.data[i].Usar;
                dts.Refile = datos.data[i].Refile;
                dts.Op = datos.data[i].Op;
                dts.FechaEntrega = datos.data[i].FechaEntrega;
                dts.Cliente = datos.data[i].Cliente;
                dts.ClaveArticulo = datos.data[i].ClaveArticulo;
                dts.Articulo = datos.data[i].Articulo;
                dts.Cantidad = datos.data[i].Cantidad;
                dts.Hojas = datos.data[i].Hojas;
                dts.Ancho = Convert.ToDouble(datos.data[i].Ancho);
                dts.Largo = Convert.ToDouble(datos.data[i].Largo);
                dts.Piezas = Convert.ToDouble(datos.data[i].Piezas);
                dts.Resistencia = datos.data[i].Resistencia;
                dts.Flauta = datos.data[i].Flauta;
                dts.Tkg = datos.data[i].Tkg;
                dts.Lamina = datos.data[i].Lamina;
                dts.Parcial = datos.data[i].Parcial;
                dts.Mas = Convert.ToInt32(datos.data[i].Mas);
                dts.Proceso = datos.data[i].Proceso;
                dts.CantidadTras = datos.data[i].CantidadTras;
                dts.CantidadSol = datos.data[i].CantidadSol;
                dts.Autorizado = datos.data[i].Autorizado;
                dts.Variacion = Convert.ToDouble(datos.data[i].Variacion);
                dts.ConScore = datos.data[i].ConScore;
                dts.Existencia = datos.data[i].Existencia;
                dts.Utilizar = datos.data[i].Utilizar;
                dts.Tm2 = datos.data[i].Tm2;
                dts.ExcedentePT = datos.data[i].ExcedentePT;
                dts.ExcedeLamina = datos.data[i].ExcedeLamina;
                dts.CantAnt = datos.data[i].CantAnt;
                eDato.Add(dts);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QueryMultipleAsync(
                        "FCAPROG016MWSPC1",
                        new
                        {
                            Opcion = 4,
                            pZonaERP = DatosToken.Zona,
                            pDatosPrincipal = Ds.CreateDataTable(eDato).AsTableValuedParameter("CPLDAT004TD_001")
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ResValidaVariacion>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> ValidaHojasFaltan(TokenData DatosToken, ListaDatosPrincipal datos)
        {
            Result objResult = new Result();

            List<Principal2> eDato = new List<Principal2>();
            Principal2 dts;

            for (int i = 0; i < datos.data.Count; i++)
            {
                dts = new Principal2();
                dts.Prior = datos.data[i].Prior;
                dts.Usar = datos.data[i].Usar;
                dts.Refile = datos.data[i].Refile;
                dts.Op = datos.data[i].Op;
                dts.FechaEntrega = datos.data[i].FechaEntrega;
                dts.Cliente = datos.data[i].Cliente;
                dts.ClaveArticulo = datos.data[i].ClaveArticulo;
                dts.Articulo = datos.data[i].Articulo;
                dts.Cantidad = datos.data[i].Cantidad;
                dts.Hojas = datos.data[i].Hojas;
                dts.Ancho = Convert.ToDouble(datos.data[i].Ancho);
                dts.Largo = Convert.ToDouble(datos.data[i].Largo);
                dts.Piezas = Convert.ToDouble(datos.data[i].Piezas);
                dts.Resistencia = datos.data[i].Resistencia;
                dts.Flauta = datos.data[i].Flauta;
                dts.Tkg = datos.data[i].Tkg;
                dts.Lamina = datos.data[i].Lamina;
                dts.Parcial = datos.data[i].Parcial;
                dts.Mas = Convert.ToInt32(datos.data[i].Mas);
                dts.Proceso = datos.data[i].Proceso;
                dts.CantidadTras = datos.data[i].CantidadTras;
                dts.CantidadSol = datos.data[i].CantidadSol;
                dts.Autorizado = datos.data[i].Autorizado;
                dts.Variacion = Convert.ToDouble(datos.data[i].Variacion);
                dts.ConScore = datos.data[i].ConScore;
                dts.Existencia = datos.data[i].Existencia;
                dts.Utilizar = datos.data[i].Utilizar;
                dts.Tm2 = datos.data[i].Tm2;
                dts.ExcedentePT = datos.data[i].ExcedentePT;
                dts.ExcedeLamina = datos.data[i].ExcedeLamina;
                dts.CantAnt = datos.data[i].CantAnt;
                eDato.Add(dts);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QueryMultipleAsync(
                        "FCAPROG016MWSPC1",
                        new
                        {
                            Opcion = 5,
                            pZonaERP = DatosToken.Zona,
                            pDatosPrincipal = Ds.CreateDataTable(eDato).AsTableValuedParameter("CPLDAT004TD_001")
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ErrorSQL>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> aplicarCambios(TokenData DatosToken, ListaDatosPrincipal datos)
        {
            Result objResult = new Result();

            List<Principal2> eDato = new List<Principal2>();
            Principal2 dts;

            for (int i = 0; i < datos.data.Count; i++)
            {
                dts = new Principal2();
                dts.Prior = datos.data[i].Prior;
                dts.Usar = datos.data[i].Usar;
                dts.Refile = datos.data[i].Refile;
                dts.Op = datos.data[i].Op;
                dts.FechaEntrega = datos.data[i].FechaEntrega;
                dts.Cliente = datos.data[i].Cliente;
                dts.ClaveArticulo = datos.data[i].ClaveArticulo;
                dts.Articulo = datos.data[i].Articulo;
                dts.Cantidad = datos.data[i].Cantidad;
                dts.Hojas = datos.data[i].Hojas;
                dts.Ancho = Convert.ToDouble(datos.data[i].Ancho);
                dts.Largo = Convert.ToDouble(datos.data[i].Largo);
                dts.Piezas = Convert.ToDouble(datos.data[i].Piezas);
                dts.Resistencia = datos.data[i].Resistencia;
                dts.Flauta = datos.data[i].Flauta;
                dts.Tkg = datos.data[i].Tkg;
                dts.Lamina = datos.data[i].Lamina;
                dts.Parcial = datos.data[i].Parcial;
                dts.Mas = Convert.ToInt32(datos.data[i].Mas);
                dts.Proceso = datos.data[i].Proceso;
                dts.CantidadTras = datos.data[i].CantidadTras;
                dts.CantidadSol = datos.data[i].CantidadSol;
                dts.Autorizado = datos.data[i].Autorizado;
                dts.Variacion = Convert.ToDouble(datos.data[i].Variacion);
                dts.ConScore = datos.data[i].ConScore;
                dts.Existencia = datos.data[i].Existencia;
                dts.Utilizar = datos.data[i].Utilizar;
                dts.Tm2 = datos.data[i].Tm2;
                dts.ExcedentePT = datos.data[i].ExcedentePT;
                dts.ExcedeLamina = datos.data[i].ExcedeLamina;
                dts.CantAnt = datos.data[i].CantAnt;
                eDato.Add(dts);
            }

            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    TranformaDataTable Ds = new TranformaDataTable();

                    var result = await con.QueryMultipleAsync(
                        "FCAPROG016MWSPC1",
                        new
                        {
                            Opcion = 6,
                            pZonaERP = DatosToken.Zona,
                            pDatosPrincipal = Ds.CreateDataTable(eDato).AsTableValuedParameter("CPLDAT004TD_001")
                            // =================================================================================================================
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<ResValidaVariacion>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
