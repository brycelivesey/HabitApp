using Microsoft.AspNetCore.Authorization;

namespace Src.Authorization;

public class UserAuthRequirement : IAuthorizationRequirement
{
}

public class UserAuthHandler : AuthorizationHandler<UserAuthRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserAuthRequirement requirement)
    {
        var userIdClaim = context.User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Task.CompletedTask;
        }

        if (!Guid.TryParse(userIdClaim, out Guid userId))
        {
            return Task.CompletedTask;
        }

        // Add the userId to the current HttpContext
        if (context.Resource is HttpContext httpContext)
        {
            httpContext.Items["userId"] = userId;
        }

        context.Succeed(requirement);
        return Task.CompletedTask;
    }
} 