namespace Entity.DTO.Common
{
    public class Result
    {
        public object data { get; set; }
        public int totalRecords { get; set; }
        public bool Correcto { get; set; }
        public string Mensaje { get; set; }
    }

    public class Result<TResult>
    {
        public TResult Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }

    }
}
