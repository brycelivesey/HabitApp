import React, { useMemo, useCallback } from 'react';
import styles from './ActivityCalendar.module.css';

interface Props {
    activityLog: {
        [date: string]: number;
    };
    color: string;
    year?: number;
    onYearSelect?: (year: number | undefined) => void;
}

const ActivityCalendar: React.FC<Props> = ({ activityLog, color, year, onYearSelect }) => {
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];

    const getColorClass = useCallback((count: number) => {
        if (count === 0) return styles.dayEmpty;
        return styles.dayFilled;
    }, []);

    const getOpacity = useCallback((count: number) => {
        if (count === 0) return 1;
        return Math.min((count / 5) * 100, 100) / 100;
    }, []);

    const daysArray = useMemo(() => {
        if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31);

            const daysBeforeStart = startDate.getDay();
            if (daysBeforeStart > 0) {
                startDate.setDate(startDate.getDate() - daysBeforeStart);
            }

            const daysAfterEnd = 6 - endDate.getDay();
            if (daysAfterEnd > 0) {
                endDate.setDate(endDate.getDate() + daysAfterEnd);
            }

            const days: Date[] = [];
            for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
                days.push(new Date(dt));
            }
            return days;
        } else {
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
        }
    }, [year]);

    const totalWeeks = useMemo(() =>
        year ? Math.ceil(daysArray.length / 7) : 53
        , [year, daysArray.length]);

    const calendarGrid = useMemo(() => (
        <div>
            <div className={styles.weekRow}>
                {Array.from({ length: totalWeeks }, (_, weekIndex) => {
                    const firstDayOfWeek = daysArray[weekIndex * 7];
                    const isFirstSundayOfMonth = firstDayOfWeek &&
                        firstDayOfWeek.getDate() <= 7 &&
                        firstDayOfWeek.getDay() === 0;

                    // Don't show label if it's the most recent week and would overflow
                    const isLastWeek = weekIndex === totalWeeks - 1;
                    const shouldShowLabel = isFirstSundayOfMonth && !isLastWeek;

                    return (
                        <div key={weekIndex} className={styles.column}>
                            <div className={styles.monthLabel}>
                                {shouldShowLabel ? firstDayOfWeek.toLocaleString('en-US', { month: 'short' }) : ''}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.weekRow}>
                {Array.from({ length: totalWeeks }, (_, weekIndex) => (
                    <div key={weekIndex} className={styles.column}>
                        {[0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {
                            const date = daysArray[weekIndex * 7 + dayOfWeek];
                            if (!date) return null;

                            const dateStr = date.toISOString().split('T')[0];
                            if (year && date.getFullYear() !== year) {
                                return <div key={dateStr} className={styles.day} style={{ visibility: 'hidden' }} />;
                            }

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
                                    style={{
                                        opacity: getOpacity(count),
                                        backgroundColor: count > 0 ? color : undefined
                                    }}
                                    title={`${count} contributions on ${formattedDate}`}
                                    role="tooltip"
                                    aria-label={`${count} contributions on ${formattedDate}`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    ), [daysArray, totalWeeks, year, activityLog, getColorClass, getOpacity]);

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendar}>
                {calendarGrid}
            </div>

            <div className={styles.yearSelector}>
                {years.map(y => (
                    <button
                        key={y}
                        className={`${styles.yearButton} ${year === y ? styles.selected : ''}`}
                        onClick={() => onYearSelect?.(year === y ? undefined : y)}
                    >
                        {y}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default React.memo(ActivityCalendar);