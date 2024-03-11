using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Backend_mg.Model
{
    public class FormResponses
    {
        [Key]
        public int response_id { get; set; }
        public int form_id { get; set; }
        public int QuestionID { get; set; }
        public int field_id { get; set; }
        public int contact_id { get; set; }
        public string response_value { get; set; }
        public DateTime submission_date { get; set; }
    }
}
