import React, { useState } from 'react';
import { DailyGoal, Task } from '../types';
import styles from './AddGoalModal.module.css';

interface Props {
  onClose: () => void;
  onSubmit: (goal: DailyGoal) => void;
}

const AddGoalModal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([{ id: '1', name: '' }]);

  const handleAddTask = () => {
    setTasks(prev => [...prev, { id: crypto.randomUUID(), name: '' }]);
  };

  const handleRemoveTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleTaskChange = (id: string, value: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, name: value } : task
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGoal: DailyGoal = {
      id: crypto.randomUUID(),
      title,
      tasks: tasks.filter(task => task.name.trim() !== ''),
      activityLog: {}
    };

    onSubmit(newGoal);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Create New Goal</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Goal Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter goal title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tasks (Optional)</label>
            {tasks.map((task, index) => (
              <div key={task.id} className={styles.taskInput}>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleTaskChange(task.id, e.target.value)}
                  placeholder={`Task ${index + 1}`}
                />
                {tasks.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeTask}
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles.addTask}
              onClick={handleAddTask}
            >
              + Add Task
            </button>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!title.trim()}
            >
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;