using Microsoft.AspNetCore.Mvc;

namespace AuthServer.CustomAuth
{
    [AuthenticatedFilter]
    public class AuthenticatedController : ControllerBase
    {
        public CustomIdentity Identity { get; set; }
    }
}
