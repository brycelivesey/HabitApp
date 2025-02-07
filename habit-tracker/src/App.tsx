import React, { useState, useEffect, DragEvent, useRef } from 'react';
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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [goalToEdit, setGoalToEdit] = useState<DailyGoal | undefined>(undefined);
  const initialRender = useRef(true);


  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    
    localStorage.setItem('habitGoals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (newGoal: DailyGoal) => {
    const maxOrder = Math.max(0, ...goals.map(g => g.order));
    setGoals(prev => [...prev, { ...newGoal, order: maxOrder + 1 }]);
    setIsModalOpen(false);
  };

  const handleEditGoal = (updatedGoal: DailyGoal) => {
    const updatedGoals = goals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    setIsModalOpen(false);
    setGoalToEdit(undefined);
  };

  const handleDeleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
  };

  const handleStartEdit = (goal: DailyGoal) => {
    setGoalToEdit(goal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGoalToEdit(undefined);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, goalId: string) => {
    e.dataTransfer.setData('text/plain', goalId);
    setDraggedId(goalId);
    (e.target as HTMLDivElement).classList.add(styles.dragging);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).classList.remove(styles.dragging);
    setDraggedId(null);
    document.querySelectorAll(`.${styles.goalCard}`).forEach(card => {
      card.classList.remove(styles.dragBefore, styles.dragAfter);
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, goalId: string) => {
    e.preventDefault();

    if (draggedId === goalId) return;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;

    // Remove existing placement classes
    target.classList.remove(styles.dragAfter, styles.dragBefore);

    // Add appropriate placement class
    if (mouseY > threshold) {
      target.classList.add(styles.dragAfter);
    } else {
      target.classList.add(styles.dragBefore);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetGoalId: string) => {
    e.preventDefault();
    const draggedGoalId = e.dataTransfer.getData('text/plain');

    if (draggedGoalId === targetGoalId) return;

    const draggedGoal = goals.find(g => g.id === draggedGoalId);
    const targetGoal = goals.find(g => g.id === targetGoalId);

    if (!draggedGoal || !targetGoal) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;
    const insertAfter = mouseY > threshold;

    setGoals(prev => {
      const newGoals = prev.filter(g => g.id !== draggedGoalId);
      const targetIndex = newGoals.findIndex(g => g.id === targetGoalId);
      const insertIndex = insertAfter ? targetIndex + 1 : targetIndex;

      newGoals.splice(insertIndex, 0, draggedGoal);

      // Reassign orders based on new positions
      return newGoals.map((goal, index) => ({
        ...goal,
        order: index
      }));
    });

    // Remove placement classes
    e.currentTarget.classList.remove(styles.dragAfter, styles.dragBefore);
  };

  const handleComplete = (goalId: string) => {
    const today = new Date().toLocaleDateString('en-CA');

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
            onEdit={handleStartEdit}
            handleComplete={handleComplete}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddGoalModal
          onClose={handleCloseModal}
          onSubmit={goalToEdit ? handleEditGoal : handleAddGoal}
          goalToEdit={goalToEdit}
        />
      )}
    </div>
  );
};

export default App;