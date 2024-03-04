using System.ComponentModel.DataAnnotations;

namespace Backend_mg.Model
{
    public class Dynamic_input_types
    {
        [Key]
        public int id { get; set; }
        public string field_type { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}
