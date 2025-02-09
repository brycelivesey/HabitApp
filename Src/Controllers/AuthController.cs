using System.Threading.Tasks;
using Src.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Src.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IUserService _userService;

        public AuthController(IJwtService jwtService, IUserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userService.AuthenticateAsync(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid Credentials.");
            }

            var token = _jwtService.CreateToken(user);
            var refreshToken = _jwtService.CreateRefreshToken();
            
            this.SetRefreshToken(refreshToken);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                await _userService.RegisterUserAsync(request.Email, request.Password);
            }
            catch (ArgumentException e)
            {
                return BadRequest(new { error = e.Message });
            }
            catch (InvalidOperationException e)
            {
                return Conflict(new { error = e.Message });
            }

            var user = await _userService.AuthenticateAsync(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized("Account created, failed to login.");
            }

            var token = _jwtService.CreateToken(user);
            var refreshToken = _jwtService.CreateRefreshToken();
            
            this.SetRefreshToken(refreshToken);
            return Ok(new { userId = user.Id, token });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("No refresh token provided.");
            }

            try
            {
                var userId = HttpContext.Items["userId"].ToString();
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Invalid token.");
                }

                var user = await _userService.GetUserByIdAsync(Guid.Parse(userId));
                if (user == null)
                {
                    return Unauthorized("User not found.");
                }

                // Create new access token
                var newAccessToken = _jwtService.CreateToken(user);
                var newRefreshToken = _jwtService.CreateRefreshToken();

                // Set refresh token in cookie
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7)
                };
                Response.Cookies.Append("refreshToken", newRefreshToken, cookieOptions);

                return Ok(new { token = newAccessToken });
            }
            catch
            {
                return Unauthorized("Invalid refresh token.");
            }
        }

        private void SetRefreshToken(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

    }
}