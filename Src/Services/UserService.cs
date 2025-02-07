using Src.Models;

namespace Data.Services
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(string email, string password);
        Task<int> RegisterUserAsync(string email, string password);
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

        public async Task<int> RegisterUserAsync(string email, string password)
        {
            if (password.Length < 8)
            {
                throw new ArgumentException("Password must be at least 8 characters long.");
            }
            if (password.Length > 64)
            {
                throw new ArgumentException("Password cannot exceed 64 characters long.");
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
                Id = 
            };

            return await _userRepository.CreateUserAsync(user);           
        }
    }
}