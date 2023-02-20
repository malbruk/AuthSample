using AuthServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.IO;
using System.Text.Json;

namespace AuthServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;

        public AuthController(IConfiguration configuration, DataContext dataContext)
        {
            _configuration = configuration;
            _dataContext = dataContext;
        }


        [HttpPost("/api/login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var user = _dataContext.Users?.FirstOrDefault(u => u.Email == loginModel.Email && u.Password == loginModel.Password);
            if (user is not null)
            {
                var jwt = CreateJWT(user);
                AddSession(user);
                return Ok(jwt);
            }
            return Unauthorized();
        }

        [HttpPost("/api/register")]
        public IActionResult Register([FromBody] LoginModel loginModel)
        {
            var name = loginModel.Email.Split("@")[0];
            var lastId = _dataContext.Users?.Max(u => u.Id) ?? 0;
            var newUser = new User { Id = lastId + 1, Name = name, Email = loginModel.Email, Password = loginModel.Password, Role = "temp_user" };
            _dataContext.Users?.Add(newUser);
            var jwt = CreateJWT(newUser);
            AddSession(newUser);
            return Ok(jwt);
        }

        private object CreateJWT(User user)
        {
            var claims = new List<Claim>()
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("name", user.Name),
                    new Claim("email", user.Email),
                    new Claim("role", user.Role)
                };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return new { Token = tokenString };
        }

        private void AddSession(User user)
        {
            var lastId = _dataContext.Sessions?.Max(u => u.Id) ?? 0;
            _dataContext.Sessions?.Add(new Session { Id = lastId + 1, UserId = user.Id, DateTime = DateTime.Now.ToString(), IP = Request.HttpContext.Connection.RemoteIpAddress.ToString(), IsValid = true });
        }
    }
}
