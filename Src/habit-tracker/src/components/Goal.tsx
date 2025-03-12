import React, { useState, DragEvent, useEffect, useRef } from 'react';
import styles from '../App.module.css';
import { MdDragIndicator } from 'react-icons/md';
import ActivityCalendar from './ActivityCalendar';
import { DailyGoal } from '../types';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface GoalProps {
    goal: DailyGoal;
    onDelete: (goalId: string) => void;
    onEdit: (goal: DailyGoal) => void;
    handleComplete: (goalId: string) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, goalId: string) => void;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>, goalId: string) => void;
    onDrop: (e: DragEvent<HTMLDivElement>, goalId: string) => void
}

const Goal: React.FC<GoalProps> = ({
    goal,
    onDelete,
    onEdit,
    handleComplete,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedYears, setSelectedYears] = useState<{ [goalId: string]: number | undefined }>({});
    const [showMenu, setShowMenu] = useState(false);
    const [isDraggable, setIsDraggable] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mouseup', handleDragHandleMouseUp);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mouseup', handleDragHandleMouseUp);
        };
    }, []);

    const handleDragHandleMouseDown = () => {
        setIsDraggable(true);
    };

    const handleDragHandleMouseUp = () => {
        setIsDraggable(false);
    };

    const handleYearSelect = (goalId: string, year: number | undefined) => {
        setSelectedYears(prev => ({
            ...prev,
            [goalId]: year
        }));
    };

    const handleEdit = () => {
        onEdit(goal);
        setShowMenu(false);
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        onDelete(goal.id);
        setShowConfirmation(false);
    };

    return (
        <div
            className={styles.goalCard}
            draggable={isDraggable}
            onDragStart={(e) => isDraggable && onDragStart(e, goal.id)}
            onDragEnd={(e) => {
                onDragEnd(e);
                setIsDraggable(false);
            }}
            onDragOver={(e) => onDragOver(e, goal.id)}
            onDrop={(e) => onDrop(e, goal.id)}
        >
            <div className={styles.menuContainer} ref={menuRef}>
                <button
                    className={styles.menuButton}
                    onClick={() => setShowMenu(!showMenu)}
                    aria-label="Menu"
                >
                    <BsThreeDotsVertical size={16} />
                </button>
                {showMenu && (
                    <div className={styles.menuDropdown}>
                        <button
                            className={styles.menuItem}
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className={styles.menuItem}
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div key={goal.id}>
                <div className={styles.goalHeader}>
                    <h3>{goal.title}</h3>
                    <MdDragIndicator
                        className={styles.dragHandle}
                        size={28}
                        onMouseDown={handleDragHandleMouseDown} />
                </div>
                <ActivityCalendar
                    activityLog={goal.activityLog}
                    color={goal.color}
                    year={selectedYears[goal.id]}
                    onYearSelect={(year) => handleYearSelect(goal.id, year)}
                />
                <div className={styles.goalFooter}>
                    <ul className={styles.taskList}>
                        {goal.goalTasks.map(task => (
                            <li
                                key={task.id}
                                className={styles.taskItem}
                                style={{ ['--bullet-color' as string]: goal.color }}
                            >
                                {task.name}
                            </li>
                        ))}
                    </ul>
                    <button
                        className={styles.doneButton}
                        onClick={() => handleComplete(goal.id)}
                        style={{ backgroundColor: goal.color }}
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