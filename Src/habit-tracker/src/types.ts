export interface GoalTask {
    id: number;
    name: string;
}

export interface DailyGoal {
    id: string;
    title: string;
    goalTasks: GoalTask[];
    color: string;
    order: number;
    activityLog: {
        [date: string]: number; // date in YYYY-MM-DD format, value is completion count
    };
}