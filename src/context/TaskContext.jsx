import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = (task) => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
  };

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const toggleTask = (id) => setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));

  const value = useMemo(() => ({ tasks, setTasks, addTask, deleteTask, toggleTask }), [tasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;