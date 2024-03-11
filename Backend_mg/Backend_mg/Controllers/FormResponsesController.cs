using Backend_mg.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_mg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormResponsesController : ControllerBase
    {

        private readonly DbCotext _context;

        public FormResponsesController(DbCotext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormResponses>>> GetFormResponses()
        {
            return await _context.FormResponses.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<FormResponses>> PostFormResponses(FormResponses contactInformation)
        {
            try
            {
                DateTime dateTime = DateTime.Now;
                contactInformation.submission_date = dateTime;
                _context.FormResponses.Add(contactInformation);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetFormResponses), contactInformation);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine(ex);
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
