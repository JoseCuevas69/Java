using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ClaveArticuloporOpDTO
    {
        public int Op { get; set; }
        public string ClaveArticulo { get; set; }
    }
    public class DatosGeneralesDTO
    {
        public string Flauta { get; set; }
        public string Diseno { get; set; }
        public string Resistencia { get; set; }
        public decimal Arreglo { get; set; }
        public string Combinacion { get; set; }
        public string Tratamiento { get; set; }
        public decimal LargoDes { get; set; }
        public decimal AnchoDes { get; set; }
        public decimal LargoLamina { get; set; }
        public decimal AnchoLamina { get; set; }
    }
    public class MaquinasProcesadasDTO
    { 
        public string ClaveMaquina { get; set; }
    }
    public class SecuenciaImpresorasDTO
    {
        public int Op { get; set; }
        public string Cliente { get; set; }
        public string ClaveArticulo { get; set; }
        public string Articulo { get; set; }
        public string DesMed { get; set; }
        public int Cantidad { get; set; }
        public int Programa { get; set; }
        public string ClaveMaquina { get; set; }
        public string Combinacion { get; set; }
        public string FechaPrograma { get; set; }
    }
    public class SecuenciaCorrugadoraDTO
    {
        public int Cantidad { get; set; }
        public int Op { get; set; } 
        public string Cliente { get; set; }
        public string ClaveArticulo { get; set; }
        public string Descripcion { get; set; }
        public string DesMed { get; set; }
        public int Programa { get; set; }
        public int MetrosLineales { get; set; }
        public string combinacion { get; set; }
    }
    public class SaldoLaminaDTO
    {
        public int Op { get; set; }
        public string  ClaveCliente { get; set; }
        public string Cliente { get; set; }
        public string ClaveArticulo { get; set; }
        public string DesMed { get; set; }
        public string Articulo { get; set; }
        public int Lamina { get; set; }
        public string Combinacion { get; set; }
        public string Areas { get; set; }
    }
    public class SaldoExcedentesDTO
    {
        public int Op { get; set; }
        public string ClaveCliente { get; set; }
        public string Cliente { get; set; }
        public string ClaveArticulo { get; set; }
        public string DesMed { get; set; }
        public string Articulo { get; set; }
        public int Lamina { get; set; }
        public int Almacen { get; set; }
        public string Combinacion { get; set; }
    }
    public class OpsRepresentanteDTO
    {
        public string FechaEntrega { get; set; }
        public string FechaGenOpMaquila { get; set; }
        public int OP { get; set; }
        public string ClaveArticulo { get; set; }
        public string Articulo { get; set; }
        public string Cliente { get; set; }
        public string Pedido { get; set; }
        public int Cantidad { get; set; }
        public int Corrugado { get; set; }
        public int Impresora { get; set; }
        public int Embarcado { get; set; }
        public int Remisionado { get; set; }
        public string OPStatus { get; set; }
        public int Ava { get; set; }
        public string NotasOp { get; set; }
    }
}
