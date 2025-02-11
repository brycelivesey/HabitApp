using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Src.Models;

namespace Src.Services
{
    public interface IMongoDbInitializer
    {
        Task InitializeAsync();
    }

    public class MongoDbInitializer : IMongoDbInitializer
    {
        private readonly IMongoDatabase _database;

        public MongoDbInitializer(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.Database);
        }

        public async Task InitializeAsync()
        {
            // Create User indexes
            var users = _database.GetCollection<User>("users");
            var emailIndex = Builders<User>.IndexKeys.Ascending(u => u.Email);
            var emailIndexOptions = new CreateIndexOptions { Unique = true };
            await users.Indexes.CreateOneAsync(new CreateIndexModel<User>(emailIndex, emailIndexOptions));

            // Create Goal indexes
            var goals = _database.GetCollection<DailyGoal>("goals");
            var goalIndexes = new[]
            {
                new CreateIndexModel<DailyGoal>(
                    Builders<DailyGoal>.IndexKeys.Ascending(g => g.UserId)
                ),
                new CreateIndexModel<DailyGoal>(
                    Builders<DailyGoal>.IndexKeys.Ascending(g => g.Id)
                )
            };
            await goals.Indexes.CreateManyAsync(goalIndexes);
        }
    }
} 