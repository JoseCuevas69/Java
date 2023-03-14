using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO.Common
{
    public class ErrorSQL
    {
        public int Id { get; set; }
        public int ErrorNumber { get; set; }
        public int ErrorState { get; set; }
        public int ErrorSeverity { get; set; }
        public string ErrorProcedure { get; set; }
        public int ErrorLine { get; set; }
        public string ErrorMessage { get; set; }
        public string Message { get; set; }
    }
}
