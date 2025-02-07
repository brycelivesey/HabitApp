using System.Threading.Tasks;
using Data.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Src.Services;

namespace Src.Controllers
{
    [ApiController]
    [Route("Auth")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IUserService _userService;

        public AuthController(IJwtService jwtService, IUserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        [HttpPost("Login")]
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
            return Ok(new { token });
        }

        [HttpPost("Register")]
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
            catch (Exception e)
            {
                // Log the unexpected error here
                return StatusCode(500, new { error = "An unexpected error occurred" });
            }
            
            var user = await _userService.AuthenticateAsync(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized("Account created, failed to login.");
            }

            var token = _jwtService.CreateToken(user);

            return Ok(new { userId = user.Id, token });
        }
    }
}