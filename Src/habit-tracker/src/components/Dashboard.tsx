import React, { useState, useEffect, DragEvent } from 'react';
import styles from '../App.module.css';
import AddGoalModal from './AddGoalModal';
import { DailyGoal } from '../types';
import Goal from './Goal';
import { goalService } from '../services/goal.service';

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [goalToEdit, setGoalToEdit] = useState<DailyGoal | undefined>(undefined);
  let lastHoveredGoal: HTMLElement | null = null;

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await goalService.getGoals();
        setGoals(data);
      } catch (err) {
        console.error('Error fetching goals:', err);
      }
    };
    fetchGoals();
  }, []);

  const handleAddGoal = async (newGoal: DailyGoal) => {
    try {
      const goalId = await goalService.addGoal(newGoal);
      setGoals(prev => [...prev, { ...newGoal, id: goalId }]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding goal:', err);
    }
  };

  const handleEditGoal = async (updatedGoal: DailyGoal) => {
    try {
      await goalService.updateGoal(updatedGoal);
      setGoals(prev => prev.map(goal =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      ));
      setIsModalOpen(false);
      setGoalToEdit(undefined);
    } catch (err) {
      console.error('Error updating goal:', err);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await goalService.deleteGoal(goalId);
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    } catch (err) {
      console.error('Error deleting goal:', err);
    }
  };

  const handleComplete = async (goalId: string) => {
    const today = new Date().toLocaleDateString('en-CA');

    try {
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

      await goalService.addContribution(goalId, today);
    } catch (err) {
      console.error('Error adding contribution:', err);
      const updatedGoals = await goalService.getGoals();
      setGoals(updatedGoals);
    }
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

    const target = e.currentTarget;
    if (lastHoveredGoal && lastHoveredGoal !== target) {
      lastHoveredGoal.classList.remove(styles.dragAfter, styles.dragBefore);
    }

    if (draggedId === goalId) return;

    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;

    target.classList.remove(styles.dragAfter, styles.dragBefore);

    if (mouseY > threshold) {
      target.classList.add(styles.dragAfter);
    } else {
      target.classList.add(styles.dragBefore);
    }

    lastHoveredGoal = target;
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

      return newGoals.map((goal, index) => ({
        ...goal,
        order: index
      }));
    });

    e.currentTarget.classList.remove(styles.dragAfter, styles.dragBefore);
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
          goalCount={goals.length}
        />
      )}
    </div>
  );
};

export default Dashboard;