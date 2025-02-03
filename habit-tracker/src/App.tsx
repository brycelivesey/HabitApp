import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import ActivityCalendar from './components/ActivityCalendar';
import AddGoalModal from './components/AddGoalModal';
import { DailyGoal } from './types';

const App: React.FC = () => {
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedGoals = localStorage.getItem('habitGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habitGoals', JSON.stringify(goals));
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
            <ActivityCalendar activityLog={goal.activityLog} />
            <button 
              className={styles.doneButton}
              onClick={() => handleComplete(goal.id)}
            >
              Done
            </button>
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