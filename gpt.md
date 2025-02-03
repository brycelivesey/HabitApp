I want to create an application that has the sole purpose of tracking habits daily and giving you an activity log similar to github's activity log.
I don't want to have any user accounts, I want it to be super lightweight and locally stored so that I dont have to serve it. 
The main features will be:
1. Create a daily goal - there is a plus button to add a daily goal, this daily goal can have a set/list of tasks (it will just be a popup with multiple input fields).
2. There will be an activity log/calendar - This should be almost exactly the same as github's activity log. Each daily goal will relate to its own activity log/calendar. it can either have the last 365 days or you can filter by year and show the 365 days in a specific year like 2024, 2025, etc.
3. For each "daily goal" there will be a "done" button - each time this is pressed, it will increment the count for the day (for that individual daily goal). Similar to GitHub, if you do this goal once in a day it will be a lower opacity opaque. for each time the goal is completed the opacity will go up 20%, up to 100% where anything more than 5 is just 100% solid color.
4. I want the UI design to be similar to github's too, their dark mode color scheme and button/component design is a good style to follow. 
Overall, the app should be pretty simple, it will have an add button in the top left. Will show pretty much just a list of activity logs that have the tiles like GitHub. The calendar will have a sort of container around it that is just a thin border that also contains the "done" button. each of these calendars will have tiles that represent the amount of times that goal was completed for the day. 
First lets decide what tech stack to use


Below is one way to build a lightweight, local-only habit tracker with a GitHub-like activity log. In this example, we’ll use **React** for the UI, **localStorage** to persist data in the browser (so no server or user accounts are needed), and **dayjs** for date manipulation. We’ll also use simple CSS to mimic GitHub’s dark mode and component styles.

Below is an outline of the project, including code samples for the main components. (You can use a tool like [Create React App](https://create-react-app.dev/) to quickly scaffold the project.)

---

## 1. Project Overview

### **Features:**
- **Add Daily Goals:** A plus button opens a modal/popup where you can enter a goal title and a list of tasks.
- **Per-Goal Activity Log:** Each goal shows its own “calendar” (similar to GitHub’s contribution graph) representing the last 365 days. (You can later extend this to filter by year.)
- **Increment “Done” Count:** Each goal has a “Done” button. Each press for today increases the count for that date. The tile for that day changes its “intensity” (opacity) by 20% per increment (up to 5+ completions).
- **GitHub-Like Dark Mode:** The design uses dark backgrounds, light text, and simple button styling similar to GitHub’s dark mode.

### **Tech Stack:**
- **React** – For the UI.
- **localStorage** – For persisting your daily goals and logs.
- **dayjs** – For handling dates (e.g., generating the last 365 days).
- **CSS** – Custom styles (or CSS modules) to mimic GitHub’s dark mode.

---

## 2. Example Code

Below is an example implementation. You can split these files as needed in your project.

### **File: `src/index.js`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Global CSS (GitHub dark mode, fonts, etc.)

ReactDOM.render(<App />, document.getElementById('root'));
```

---

### **File: `src/App.js`**

This component sets up the main layout, loads/saves goals from localStorage, and toggles the “Add Daily Goal” modal.

```jsx
import React, { useState, useEffect } from 'react';
import DailyGoalList from './components/DailyGoalList';
import DailyGoalForm from './components/DailyGoalForm';
import './App.css';

const App = () => {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Load saved goals from localStorage on mount
  useEffect(() => {
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  // Save goals to localStorage on every update
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const updateGoal = (updatedGoal) => {
    const newGoals = goals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(newGoals);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button className="add-button" onClick={() => setShowForm(true)}>
          +
        </button>
        <h1>Habit Tracker</h1>
      </header>
      <main>
        <DailyGoalList goals={goals} updateGoal={updateGoal} />
      </main>
      {showForm && (
        <DailyGoalForm
          addGoal={addGoal}
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default App;
```

---

### **File: `src/components/DailyGoalForm.js`**

A modal form for adding a new daily goal with an optional list of tasks. (We use the [uuid](https://www.npmjs.com/package/uuid) package to generate unique IDs.)

```jsx
import React, { useState } from 'react';
import './DailyGoalForm.css';
import { v4 as uuidv4 } from 'uuid';

const DailyGoalForm = ({ addGoal, closeForm }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState(['']);

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const addTaskField = () => {
    setTasks([...tasks, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newGoal = {
      id: uuidv4(),
      title: title.trim(),
      tasks: tasks.filter(task => task.trim() !== ''),
      logs: {} // Each key is a date string (YYYY-MM-DD), and its value is the count for that day.
    };
    addGoal(newGoal);
    closeForm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Daily Goal</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <div className="tasks-container">
            <h3>Tasks</h3>
            {tasks.map((task, index) => (
              <input
                key={index}
                type="text"
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                placeholder={`Task ${index + 1}`}
              />
            ))}
            <button type="button" onClick={addTaskField}>
              Add Task
            </button>
          </div>
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailyGoalForm;
```

---

### **File: `src/components/DailyGoalList.js`**

This component loops over your goals and renders each one with its own activity log calendar.

```jsx
import React from 'react';
import Calendar from './Calendar';
import './DailyGoalList.css';

const DailyGoalList = ({ goals, updateGoal }) => {
  return (
    <div className="goal-list">
      {goals.map(goal => (
        <div key={goal.id} className="goal-item">
          <h2>{goal.title}</h2>
          <Calendar goal={goal} updateGoal={updateGoal} />
        </div>
      ))}
    </div>
  );
};

export default DailyGoalList;
```

---

### **File: `src/components/Calendar.js`**

This component creates a grid for the last 365 days (using **dayjs**). It displays a “Done” button at the top and uses colored tiles whose opacity increases by 20% per completion (up to a maximum opacity for 5 or more completions).

```jsx
import React from 'react';
import './Calendar.css';
import dayjs from 'dayjs';

const Calendar = ({ goal, updateGoal }) => {
  // Today’s date
  const today = dayjs();

  // Generate an array for the last 365 days
  const days = [];
  for (let i = 0; i < 365; i++) {
    days.push(today.subtract(i, 'day'));
  }
  days.reverse(); // so the oldest day is first

  const handleDone = () => {
    const todayStr = today.format('YYYY-MM-DD');
    const currentCount = goal.logs[todayStr] || 0;
    const newCount = currentCount + 1;
    const updatedLogs = { ...goal.logs, [todayStr]: newCount };
    const updatedGoal = { ...goal, logs: updatedLogs };
    updateGoal(updatedGoal);
  };

  const getTileOpacity = (count) => {
    if (count >= 5) return 1;
    return count * 0.2;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="done-button" onClick={handleDone}>
          Done
        </button>
      </div>
      <div className="calendar-grid">
        {days.map(day => {
          const dateStr = day.format('YYYY-MM-DD');
          const count = goal.logs[dateStr] || 0;
          const opacity = getTileOpacity(count);
          return (
            <div
              key={dateStr}
              className="calendar-tile"
              title={`${dateStr}: ${count} done`}
              style={{ backgroundColor: `rgba(46, 160, 67, ${opacity})` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
```

---

## 3. CSS Styling

Below are some example CSS snippets. Feel free to adjust values to match the GitHub dark mode look more precisely.

### **File: `src/index.css`**

```css
/* Global Styles & Dark Mode */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #0d1117;
  color: #c9d1d9;
}
```

### **File: `src/App.css`**

```css
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  background-color: #238636;
  border: none;
  color: white;
  font-size: 1.5em;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 15px;
}

.add-button:hover {
  background-color: #2ea043;
}
```

### **File: `src/components/Calendar.css`**

```css
.calendar-container {
  border: 1px solid #30363d;
  padding: 10px;
  margin-top: 10px;
  border-radius: 6px;
}

.calendar-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}

.done-button {
  background-color: #238636;
  border: none;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9em;
}

.done-button:hover {
  background-color: #2ea043;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(52, 12px);
  grid-gap: 3px;
}

.calendar-tile {
  width: 12px;
  height: 12px;
  background-color: rgba(46, 160, 67, 0.1); /* default background for 0 completions */
  border-radius: 2px;
}
```

### **File: `src/components/DailyGoalForm.css`**

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #161b22;
  padding: 20px;
  border-radius: 6px;
  width: 300px;
}

.modal h2 {
  margin-top: 0;
}

.modal label {
  display: block;
  margin-bottom: 10px;
}

.modal input[type="text"] {
  width: 100%;
  padding: 6px;
  margin-top: 5px;
  border: 1px solid #30363d;
  border-radius: 4px;
  background-color: #0d1117;
  color: #c9d1d9;
}

.tasks-container h3 {
  margin-bottom: 5px;
}

.tasks-container input {
  margin-bottom: 5px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.form-buttons button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-buttons button[type="submit"] {
  background-color: #238636;
  color: #fff;
}

.form-buttons button[type="button"] {
  background-color: #30363d;
  color: #c9d1d9;
}
```

---

## 4. Final Notes

- **Local Data Persistence:** This setup uses `localStorage` so that all data is stored locally in your browser. (You might add a “Reset” button to clear all data if needed.)
- **Date Filtering:** The above calendar always shows the last 365 days. To add year filtering (e.g., display a specific year), you could add a dropdown or date picker and adjust the `days` array accordingly.
- **Extensibility:** You can extend this basic structure by adding more fields to each goal (such as notes), additional task checklists, or even export/import functionality.

By following this outline and code sample, you’ll have a simple, self-contained habit tracker that mimics GitHub’s activity log in both functionality and design. Enjoy building and happy coding!