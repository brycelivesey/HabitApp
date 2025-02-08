using Src.Models;
using Src.Repositories;

namespace Src.Services
{  
    public interface IGoalService
    {
        Task<DailyGoal> GetGoalAsync(Guid userId, Guid id);
        Task<List<DailyGoal>> GetUserGoalsAsync(Guid userId);
        Task<Guid> AddGoalAsync(Guid userId, DailyGoal goal);
        Task<Guid?> DeleteGoalAsync(Guid userId, Guid id);
        Task<Guid?> UpdateGoalAsync(Guid userId, DailyGoal goal);
        Task<Guid?> AddContributionAsync(Guid userId, Guid id, string date);
    }
    public class GoalService : IGoalService
    {
        private readonly IGoalRepository _goalRepository;

        public GoalService(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }

        public async Task<Guid> AddGoalAsync(Guid userId, DailyGoal goal)
        {
            foreach (var goalTask in goal.GoalTasks)
            {
                goalTask.Id = new Guid();
            }
            goal.Id = new Guid();
            goal.UserId = userId;
            return await _goalRepository.AddGoalAsync(goal);
        }
        public async Task<Guid?> DeleteGoalAsync(Guid userId, Guid id)
        {
            var goal = await this.GetGoalAsync(userId, id);
            return await _goalRepository.DeleteGoalAsync(goal.Id);
        }
        public async Task<Guid?> UpdateGoalAsync(Guid userId, DailyGoal goal)
        {
            var storedGoal = await this.GetGoalAsync(userId, goal.Id); // check for access
                     
            if (goal.GoalTasks != null)
            {
                var storedTaskIds = storedGoal.GoalTasks
                    .Select(t => t.Id)
                    .ToHashSet();

                var passedTaskIds = goal.GoalTasks
                    .Where(t => t != null && t.Id != Guid.Empty)
                    .Select(t => t.Id);
                    
                // Check if any passed task ID is not in stored tasks
                // or appears multiple times in passed tasks
                if (passedTaskIds.Any(id => !storedTaskIds.Contains(id)) || 
                    passedTaskIds.GroupBy(id => id).Any(g => g.Count() > 1))
                {
                    throw new InvalidOperationException("Invalid goal tasks: Tasks must exist and appear exactly once");
                }
            }

            foreach (var goalTask in goal.GoalTasks)
            {
                if (goalTask.Id == null || goalTask.Id == Guid.Empty)
                {
                    goalTask.Id = new Guid();
                }
            }
            return await _goalRepository.UpdateGoalAsync(goal);
        }
        public async Task<Guid?> AddContributionAsync(Guid userId, Guid id, string date)
        {
            var goal = await this.GetGoalAsync(userId, id);
            return await _goalRepository.AddContributionAsync(goal.Id, date);
        }

        public async Task<DailyGoal> GetGoalAsync(Guid userId, Guid id)
        {
            var goal = await _goalRepository.GetGoalAsync(id) ?? throw new UnauthorizedAccessException("Goal not found.");
            if (userId != goal.UserId)
            {
                throw new UnauthorizedAccessException("Access denied.");
            }
            return goal;
        }

        public async Task<List<DailyGoal>> GetUserGoalsAsync(Guid userId)
        {
            return await _goalRepository.GetUserGoalsAsync(userId);
        }
    }
}