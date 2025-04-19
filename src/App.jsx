import React, { useState, useEffect } from 'react';
import TaskProvider from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <TaskProvider>
      <div className="app-container">
        <h1 className="title">Task Manager</h1>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <TaskInput />
        <FilterButtons setFilter={setFilter} />
        <TaskList filter={filter} />
      </div>
    </TaskProvider>
  );
}
