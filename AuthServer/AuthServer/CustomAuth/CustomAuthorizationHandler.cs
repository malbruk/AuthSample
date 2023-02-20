using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using System.Security.Claims;

namespace AuthServer.CustomAuth
{
    public class CustomIdentity : ClaimsIdentity
    {
        public int Id { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; }

        public string? Role { get; set; }
    }

    public class CustomAuthorizationHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler defaultHandler = new();

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            int.TryParse(context.User.Claims.FirstOrDefault(c => c.Type == "id")?.Value, out int userId);

            context.User.AddIdentity(new CustomIdentity
            {
                Id = userId,
                UserName = context.User.Claims.FirstOrDefault(c => c.Type == "name")?.Value,
                Email = context.User.Claims.FirstOrDefault(c => c.Type == "email")?.Value,
                Role = context.User.Claims.FirstOrDefault(c => c.Type == "role")?.Value
            });

            await defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }
    }
}
