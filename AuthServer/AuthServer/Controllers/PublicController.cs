using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AuthServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicController : ControllerBase
    {
        private readonly Application _application;

        public PublicController(IOptions<Application>options)
        {
            _application = options.Value;
        }

        [HttpGet]
        public ActionResult<List<Application>> Get()
        {
            return Ok(_application);
        }
    }
}
