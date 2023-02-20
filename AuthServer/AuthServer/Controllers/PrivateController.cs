using AuthServer.CustomAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuthServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PrivateController : AuthenticatedController
    {
        private readonly DataContext _dataContext;

        public PrivateController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Session>> Get()
        {
            //int.TryParse(User.Claims.FirstOrDefault(c => c.Type == "id")?.Value, out int userId);
            return Ok(_dataContext.Sessions?.Where(s => s.UserId == Identity.Id).OrderByDescending(s=>s.DateTime));
        }
    }
}
