using System.ComponentModel.DataAnnotations;

namespace Backend_mg.Model
{
    public class capturetable
    {
        [Key]
        public int Id { get; set; }
        public int ContactId { get; set; } // Foreign key reference to ContactInformation table
        public string? Question1 { get; set; }
        public string? Question2 { get; set; }
        public string? Question3 { get; set; }
        public string? Question4 { get; set; }
        public string? Question5 { get; set; }
        public string? selected_radio_option { get; set; }
        public bool hobbies_reading { get; set; }
        public bool hobbies_gardening { get; set; }
        public bool hobbies_traveling { get; set; }
        public string? Picture { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now; 
    }
}
