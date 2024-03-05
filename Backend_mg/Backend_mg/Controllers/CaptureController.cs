using Backend_mg.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_mg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaptureController : ControllerBase
    {
        private readonly DbCotext _context;

        public CaptureController(DbCotext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<capturetable>>> GetCaptureInformation()
        {
            return await _context.capturetable.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<capturetable>> PostContactInformation(capturetable contactInformation)
        {
            try
            {
                DateTime dateTime = DateTime.Now;
                contactInformation.created_at = dateTime;
                _context.capturetable.Add(contactInformation);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCaptureInformation),  contactInformation);
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
