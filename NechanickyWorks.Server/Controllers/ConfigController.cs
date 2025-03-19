using Microsoft.AspNetCore.Mvc;

namespace NechanickyWorks.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoogleMapsController : ControllerBase
    {
        // Assuming GetConfig should be accessed via GET
        [HttpGet("config")] // Adds explicit route and method
        public IActionResult GetConfig()
        {
            return Ok(new { ApiKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") });
        }
    }
}
