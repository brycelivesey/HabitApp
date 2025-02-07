using MongoDB.Driver;
using Src.Models;

namespace Src.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<Guid> CreateUserAsync(User user); 
    }

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDB"));
            var database = client.GetDatabase("GoalsDb");
            _users = database.GetCollection<User>("users");
        }

        public async Task<Guid> CreateUserAsync(User user)
        {
            await _users.InsertOneAsync(user);
            return user.Id;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            return await _users.Find(filter).FirstOrDefaultAsync();
        }
    }
}