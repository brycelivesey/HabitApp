namespace Src.Models
{
    public class DailyGoal
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public List<GoalTask> GoalTasks { get; set; }
        public string Color { get; set; }
        public int Order { get; set; }
        public Dictionary<string, int> ActivityLog { get; set; } // Key: date (YYYY-MM-DD), Value: completion count
        public Guid UserId { get; set; }
    }
}