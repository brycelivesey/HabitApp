using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Src.Models;

namespace Src.Services
{
    public interface IJwtService
    {
        string CreateToken(User user);
    }
    public class JwtService : IJwtService
    {
        private readonly JwtSettings settings;

        public JwtService(IOptions<JwtSettings> settings)
        {
            this.settings = settings.Value;
        }

        public string CreateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.settings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: this.settings.Issuer,
                audience: this.settings.Audience,
                claims: new[] 
                { 
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("sub", user.Id.ToString())
                },
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}