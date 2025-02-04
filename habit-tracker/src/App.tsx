import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import AddGoalModal from './components/AddGoalModal';
import { DailyGoal } from './types';
import Goal from './components/Goal';

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

  const handleDeleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
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
           <Goal 
           key={goal.id} 
           goal={goal} 
           onDelete={handleDeleteGoal}
           handleComplete={handleComplete}
       />
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