using Microsoft.AspNetCore.Mvc.Filters;

namespace AuthServer.CustomAuth
{
    public class AuthenticatedFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var controller = (AuthenticatedController)context.Controller;
            controller.Identity = context.HttpContext.User.Identities.OfType<CustomIdentity>().First();
        }
    }
}
