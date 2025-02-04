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
    const today = new Date();
    const mostRecentSunday = new Date(today);
    mostRecentSunday.setDate(today.getDate() - today.getDay());
    
    const startDate = new Date(mostRecentSunday);
    startDate.setDate(startDate.getDate() - 364);
    
    const days: Date[] = [];
    for (let dt = new Date(startDate); dt <= today; dt.setDate(dt.getDate() + 1)) {
      days.push(new Date(dt));
    }
    
    return days;
  };

  return (
    <div className={styles.calendar}>
      {Array.from({ length: 53 }, (_, weekIndex) => (
        <div key={weekIndex} className={styles.column}>
          {[0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {
            const date = getDaysArray()[weekIndex * 7 + dayOfWeek];
            if (!date) return null;
            
            const dateStr = date.toISOString().split('T')[0];
            const formattedDate = date.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            }).replace(/(\d+)/, (d) => {
              const num = parseInt(d, 10);
              const suffix = ['th', 'st', 'nd', 'rd'][(num > 3 && num < 21) || num % 10 > 3 ? 0 : num % 10];
              return num + suffix;
            });
            const count = activityLog[dateStr] || 0;
  
            return (
              <div
                key={dateStr}
                className={`${styles.day} ${getColorClass(count)}`}
                style={{ opacity: getOpacity(count) }}
                title={`${count} contributions on ${formattedDate}`}
                role="tooltip"
                aria-label={`${count} contributions on ${formattedDate}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ActivityCalendar;