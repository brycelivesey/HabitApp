import React from 'react';
import styles from './ActivityCalendar.module.css';

interface Props {
  activityLog: {
    [date: string]: number;
  };
  year?: number;
}

const ActivityCalendar: React.FC<Props> = ({ activityLog, year = new Date().getFullYear() }) => {
  const getColorClass = (count: number) => {
    if (count === 0) return styles.dayEmpty;
    return styles.dayFilled;
  };

  const getOpacity = (count: number) => {
    if (count === 0) return 1; // Full opacity for gray boxes
    return Math.min((count / 5) * 100, 100) / 100; // Convert to 0-1 range for filled boxes
  };

  const getDaysArray = () => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const days: Date[] = [];
    
    for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
      days.push(new Date(dt));
    }
    
    return days;
  };

  return (
    <div className={styles.calendar}>
      {getDaysArray().map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const count = activityLog[dateStr] || 0;
        
        return (
          <div
            key={dateStr}
            className={`${styles.day} ${getColorClass(count)}`}
            style={{ opacity: getOpacity(count) }}
            title={`${count} contributions on ${dateStr}`}
          />
        );
      })}
    </div>
  );
};

export default ActivityCalendar;