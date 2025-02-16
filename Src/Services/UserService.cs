using Src.Models;
using Src.Repositories;

namespace Src.Services
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(string email, string password);
        Task<Guid> RegisterUserAsync(string email, string password);
        Task<User> GetUserByIdAsync(Guid id);
    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> AuthenticateAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null) 
            {
                return null;
            }
            
            bool isPasswordValid = BCrypt.Net.BCrypt.EnhancedVerify(password, user.Password);
            if (!isPasswordValid)
            {
                return null;
            }

            return user;
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task<Guid> RegisterUserAsync(string email, string password)
        {
            var emailParts = email.Split('@');
            if (emailParts.Length != 2 || string.IsNullOrWhiteSpace(emailParts[0]) || string.IsNullOrWhiteSpace(emailParts[1]))
            {
                throw new ArgumentException("Invalid email format.");
            }
            if (email.Length > 254)
            {
                throw new ArgumentException("Email cannot exceed 254 characters.");
            }
            if (password.Length < 8)
            {
                throw new ArgumentException("Password must be at least 8 characters long.");
            }
            if (password.Length > 64)
            {
                throw new ArgumentException("Password cannot exceed 64 characters long.");
            }

            // Add password complexity requirements
            if (!password.Any(char.IsUpper))
            {
                throw new ArgumentException("Password must contain at least one uppercase letter.");
            }
            if (!password.Any(char.IsLower))
            {
                throw new ArgumentException("Password must contain at least one lowercase letter.");
            }
            if (!password.Any(char.IsDigit))
            {
                throw new ArgumentException("Password must contain at least one number.");
            }
            if (!password.Any(ch => !char.IsLetterOrDigit(ch)))
            {
                throw new ArgumentException("Password must contain at least one special character.");
            }

            var existingUser = await _userRepository.GetUserByEmailAsync(email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Email already in use.");
            }
            
            string hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(password);

            var user = new User
            {
                Email = email,
                Password = hashedPassword,
                Id = Guid.NewGuid()
            };

            return await _userRepository.CreateUserAsync(user);           
        }
    }
}