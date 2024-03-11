using System.ComponentModel.DataAnnotations;

namespace Backend_mg.Model
{
    public class QuizQuestions
    {
        [Key]
        public int QuestionID { get; set; }
        public string QuestionText { get; set; }
        public int InputTypeID { get; set; }
        public int FormID { get; set; }
    }
}
