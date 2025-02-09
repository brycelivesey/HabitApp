using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Src.Models;

namespace Src.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(Guid id);
        Task<Guid> CreateUserAsync(User user);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.Database);
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

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            return await _users.Find(filter).FirstOrDefaultAsync();
        }
    }
}