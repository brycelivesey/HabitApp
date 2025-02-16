using Microsoft.AspNetCore.Authorization;

namespace Src.Authorization;

public class RequireUserAuthAttribute : AuthorizeAttribute
{
    public RequireUserAuthAttribute() : base("RequireUserAuth")
    {
    }
} 