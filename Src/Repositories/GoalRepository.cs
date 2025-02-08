using Src.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace Src.Repositories
{
    public interface IGoalRepository
    {
        Task<DailyGoal> GetGoalAsync(Guid id);
        Task<List<DailyGoal>> GetUserGoalsAsync(Guid userId);
        Task<Guid> AddGoalAsync(DailyGoal goal);
        Task<Guid?> DeleteGoalAsync(Guid id);
        Task<Guid?> UpdateGoalAsync(DailyGoal goal);
        Task<Guid?> AddContributionAsync(Guid id, string date);
    }
    public class GoalRepository : IGoalRepository
    {
        private readonly IMongoCollection<DailyGoal> _goals;

        public GoalRepository(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.Database);
            _goals = database.GetCollection<DailyGoal>("goals");
        }

        public async Task<Guid> AddGoalAsync(DailyGoal goal)
        {
            await _goals.InsertOneAsync(goal);
            return goal.Id;
        }

        public async Task<Guid?> DeleteGoalAsync(Guid id)
        {
            var result = await _goals.DeleteOneAsync(g => g.Id == id);
            return result.DeletedCount > 0 ? id : null;
        }

        public async Task<Guid?> UpdateGoalAsync(DailyGoal goal)
        {
            var result = await _goals.ReplaceOneAsync(g => g.Id == goal.Id, goal);
            return result.ModifiedCount > 0 ? goal.Id : null;
        }

        public async Task<Guid?> AddContributionAsync(Guid id, string date)
        {
            var filter = Builders<DailyGoal>.Filter.Eq(g => g.Id, id);
            var update = Builders<DailyGoal>.Update.Inc($"ActivityLog.{date}", 1);
            var result = await _goals.UpdateOneAsync(filter, update);
            return result.ModifiedCount > 0 ? id : null;
        }

        public async Task<DailyGoal> GetGoalAsync(Guid id)
        {
            return await _goals.Find(g => g.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<DailyGoal>> GetUserGoalsAsync(Guid userId)
        {
            return await _goals.Find(g => g.UserId == userId).ToListAsync();
        }
    }
}