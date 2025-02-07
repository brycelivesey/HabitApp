using System.Security.Claims;

namespace Main.Middleware
{
    public class UserAuthMiddleware
    {
        private readonly RequestDelegate next;

        public UserAuthMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { error = "Authentication required." });
                return;
            }

            if (!int.TryParse(userIdClaim, out int userId) || userId <= 0)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(new { error = "Invalid user format." });
                return;
            }

            context.Items["UserId"] = userId;
            await this.next(context);
        }
    }
}