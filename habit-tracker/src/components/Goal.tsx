import React, { useState } from 'react';
import styles from '../App.module.css';
import { FaTrash } from 'react-icons/fa';
import ActivityCalendar from './ActivityCalendar';
import { DailyGoal } from '../types';

interface GoalProps {
    goal: DailyGoal;
    onDelete: (goalId: string) => void;
    handleComplete: (goalId: string) => void;
}

const Goal: React.FC<GoalProps> = ({ goal, onDelete, handleComplete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedYears, setSelectedYears] = useState<{ [goalId: string]: number | undefined }>({});

  const handleYearSelect = (goalId: string, year: number | undefined) => {
    setSelectedYears(prev => ({
      ...prev,
      [goalId]: year
    }));
  };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        onDelete(goal.id);
        setShowConfirmation(false);
    };

    return (
        <div className={styles.goalCard}>
            <button
                className={styles.deleteButton}
                onClick={handleDelete}
                aria-label="Delete goal"
            >
                <FaTrash size={12} />
            </button>

            <div key={goal.id}>
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
            {showConfirmation && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>Are you sure you want to delete "{goal.title}"?</p>
                        <div className={styles.modalButtons}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setShowConfirmation(false)}
                            >
                                No
                            </button>
                            <button
                                className={styles.confirmButton}
                                onClick={confirmDelete}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goal;