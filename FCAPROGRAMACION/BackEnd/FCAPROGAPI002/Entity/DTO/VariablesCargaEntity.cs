using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class VariablesCargaEntity
    {
        public int IdParametro { get; set; }
        public string Parametro { get; set; }
        public string Descripcion { get; set; }
        public string Valor { get; set; }
    }

    public class ListaDataVariablesCargaEntity
    {
        public List<VariablesCargaEntity> listaDatosCarga { get; set; }

        ListaDataVariablesCargaEntity()
        {
            listaDatosCarga = new List<VariablesCargaEntity>();
        }
    }
}
