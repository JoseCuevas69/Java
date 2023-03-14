namespace Entity.DTO
{
    public class DesperdicioListable
    {
        public string Descripcion { get; set; }
        public string ClaveDesperdicio { get; set; }
        public string ClaveCargo{ get; set; }
        public string Cargo { get; set; }
        public string Unidad { get; set; }
    }


    public class DesperdicioSelectable
    {
        public string ClaveDesperdicio { get; set; }
        public int Cantidad { get; set; }
        public int FolioDesperdicio { get; set; }
        public string ClaveCargo { get; set; }
        public string Op { get; set; }
        public string Observaciones { get; set; }

    }
}
