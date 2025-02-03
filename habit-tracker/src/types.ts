export interface Task {
    id: string;
    name: string;
  }
  
  export interface DailyGoal {
    id: string;
    title: string;
    tasks: Task[];
    activityLog: {
      [date: string]: number; // date in YYYY-MM-DD format, value is completion count
    };
  }