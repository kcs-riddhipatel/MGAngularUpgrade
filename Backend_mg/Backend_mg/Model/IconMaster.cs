using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

namespace Backend_mg.Model
{
    public class IconMaster
    {
        [Key]
        public int Id { get; set; }
        public string icon { get; set; }
        public string text { get; set; }
        public int count { get; set; }
        public string ClassName { get; set; }
    }
}
