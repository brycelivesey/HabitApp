import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import ActivityCalendar from './components/ActivityCalendar';
import AddGoalModal from './components/AddGoalModal';
import { DailyGoal } from './types';

const App: React.FC = () => {
  const [goals, setGoals] = useState<DailyGoal[]>(() => {
    const savedGoals = localStorage.getItem('habitGoals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        if (Array.isArray(parsedGoals)) {
          return parsedGoals;
        }
      } catch (error) {
        console.error('Error parsing goals from localStorage:', error);
        localStorage.removeItem('habitGoals');
      }
    }
    return [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYears, setSelectedYears] = useState<{ [goalId: string]: number | undefined }>({});

  useEffect(() => {
    try {
      localStorage.setItem('habitGoals', JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving goals to localStorage:', error);
    }
  }, [goals]);

  const handleAddGoal = (newGoal: DailyGoal) => {
    setGoals(prev => [...prev, newGoal]);
    setIsModalOpen(false);
  };

  const handleComplete = (goalId: string) => {
    const today = new Date().toISOString().split('T')[0];

    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const currentCount = goal.activityLog[today] || 0;
        return {
          ...goal,
          activityLog: {
            ...goal.activityLog,
            [today]: currentCount + 1
          }
        };
      }
      return goal;
    }));
  };

  const handleYearSelect = (goalId: string, year: number | undefined) => {
    setSelectedYears(prev => ({
      ...prev,
      [goalId]: year
    }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Add Goal
        </button>
      </header>

      <div className={styles.goalsList}>
        {goals.map(goal => (
          <div key={goal.id} className={styles.goalCard}>
            <h3>{goal.title}</h3>
            <ActivityCalendar
              activityLog={goal.activityLog}
              year={selectedYears[goal.id]}
              onYearSelect={(year) => handleYearSelect(goal.id, year)}
            />
            <div className={styles.goalFooter}>
              <ul className={styles.taskList}>
                {goal.tasks.map(task => (
                  <li key={task.id} className={styles.taskItem}>
                    {task.name}
                  </li>
                ))}
              </ul>
              <button
                className={styles.doneButton}
                onClick={() => handleComplete(goal.id)}
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AddGoalModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddGoal}
        />
      )}
    </div>
  );
};

export default App;