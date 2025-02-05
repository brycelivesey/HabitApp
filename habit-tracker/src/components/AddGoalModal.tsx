import React, { useState } from 'react';
import { DailyGoal, Task } from '../types';
import styles from './AddGoalModal.module.css';
import { HexColorPicker } from 'react-colorful';

interface Props {
    onClose: () => void;
    onSubmit: (goal: DailyGoal) => void;
    goalToEdit?: DailyGoal;
}

const AddGoalModal: React.FC<Props> = ({ onClose, onSubmit, goalToEdit }) => {
    const [title, setTitle] = useState(goalToEdit?.title || '');;
    const [tasks, setTasks] = useState<Task[]>(
        goalToEdit?.tasks || [{ id: '1', name: '' }]
    );
    const [selectedColor, setSelectedColor] = useState(goalToEdit?.color || '#238636');
    const [showColorPicker, setShowColorPicker] = useState(false);

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

        const goalData: DailyGoal = {
            id: goalToEdit?.id || crypto.randomUUID(),
            title,
            tasks: tasks.filter(task => task.name.trim() !== ''),
            color: selectedColor,
            order: goalToEdit?.order || tasks.length + 1,
            activityLog: goalToEdit?.activityLog || {},
        };

        onSubmit(goalData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>{goalToEdit ? 'Edit Goal' : 'Create New Goal'}</h2>
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
                        <div className={styles.titleColorContainer}>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter goal title"
                                required
                            />
                            <div className={styles.colorPickerContainer}>
                                <button
                                    type="button"
                                    className={styles.colorPreview}
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                    style={{ backgroundColor: selectedColor }}
                                    aria-label="Select color"
                                />
                                {showColorPicker && (
                                    <div className={styles.colorPickerPopover}>
                                        <div
                                            className={styles.colorPickerCover}
                                            onClick={() => setShowColorPicker(false)}
                                        />
                                        <HexColorPicker
                                            color={selectedColor}
                                            onChange={setSelectedColor}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
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
                            {goalToEdit ? 'Save Changes' : 'Create Goal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGoalModal;