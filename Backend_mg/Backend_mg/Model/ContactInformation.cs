using System.ComponentModel.DataAnnotations;

namespace Backend_mg.Model
{
    public class ContactInformation
    {
        [Key]
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public string? Company { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? DeleteOn { get; set; }
        public int? DeletedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
