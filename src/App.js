import React, { useState } from 'react';
import './App.css'; // Import CSS file

const App = () => {
  const [currentStatus, setCurrentStatus] = useState('None');
  const [statuses, setStatuses] = useState(Array(7).fill('None'));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(null); // Add a state for the selected date

  const handleStatusChange = (index, newStatus) => {
    if (index === -1) {
      // Change current day's status
      setCurrentStatus(newStatus);
    } else {
      // Change previous day's status
      const updatedStatuses = [...statuses];
      updatedStatuses[index] = newStatus;
      setStatuses(updatedStatuses);
    }
  };

  const handleTaskAdd = () => {
    if (newTask.trim() !== '') {
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new task
        const task = {
          date: selectedDate, // Assign the selected date to the task
          task: newTask,
        };
        setTasks((prevTasks) => [...prevTasks, task]);
      }
      setNewTask('');
    }
  };

  const handleTaskEdit = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const getFormattedDate = (offset) => {
    const today = new Date();
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - offset);
    return previousDay.toDateString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Done':
        return 'done';
      case 'Not Done':
        return 'not-done';
      case 'None':
        return 'none';
      default:
        return '';
    }
  };

  // Handle date selection from the calendar component
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Optionally, you can fetch the tasks for the selected date from a database or API and update the tasks state accordingly.
    // For simplicity, let's assume the tasks for each date are already available in the tasks array.
    const selectedTasks = tasks.filter(task => task.date === date);
    setTasks(selectedTasks);
  };

  return (
    <div className="habit-tracker-container">
      <h2>Habit Tracker</h2>
      <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} />
      <div className="current-habit">
        <h3>Today's Habit</h3>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleTaskAdd}>{editIndex === -1 ? 'Add' : 'Save'}</button>
        <div className={`habit-status ${getStatusClass(currentStatus)}`}>
          <span>Current Status: {currentStatus}</span>
          <button onClick={() => handleStatusChange(-1, 'Done')}>Done</button>
          <button onClick={() => handleStatusChange(-1, 'Not Done')}>Not Done</button>
          <button onClick={() => handleStatusChange(-1, 'None')}>None</button>
        </div>
      </div>
      <div className="previous-habits">
        <h3>Previous Days</h3>
        <table className="habit-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((status, index) => (
              <tr key={index}>
                <td>{getFormattedDate(index)}</td>
                <td className={status === 'Done' ? 'green' : status === 'Not Done' ? 'red' : ''}>{status}</td>
                <td>
                  <button onClick={() => handleStatusChange(index, 'Done')}>Done</button>
                  <button onClick={() => handleStatusChange(index, 'Not Done')}>Not Done</button>
                  <button onClick={() => handleStatusChange(index, 'None')}>None</button>
                </td>
                <td className="tasks">
                  {index === 0 ? (
                    tasks.map((task, i) => (
                      <div key={i}>
                        <p>{task.task}</p>
                        <button onClick={() => handleTaskEdit(i)}>Edit</button>
                        <button onClick={() => handleTaskDelete(i)}>Delete</button>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Example Calendar component
const Calendar = ({ selectedDate, onSelect }) => {
  // Add your calendar implementation here
  // This is just a placeholder component
  return (
    <div className="calendar">
      <h3>Calendar</h3>
      {/* Render your calendar UI here */}
      {/* Example: */}
      <button onClick={() => onSelect('2023-06-05')}>Select Date</button>
    </div>
  );
};

export default App;
