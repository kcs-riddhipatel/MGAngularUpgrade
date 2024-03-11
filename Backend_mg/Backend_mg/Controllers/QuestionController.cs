using Backend_mg.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_mg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly DbCotext _context;

        public QuestionController(DbCotext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizQuestions>>> GetQuestion()
        {
            return await _context.QuizQuestions.Where(q => q.FormID == 1)
        .ToListAsync(); ;
        }
    }
}
