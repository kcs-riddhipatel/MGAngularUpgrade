using Backend_mg.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_mg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IconMasterController : ControllerBase
    {
        private readonly DbCotext _context;

        public IconMasterController(DbCotext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IconMaster>>> GetIconMaster()
        {
            return await _context.IconMaster.ToListAsync();
        }
    }
}
