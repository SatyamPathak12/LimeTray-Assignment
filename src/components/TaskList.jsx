import React, { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';

export default function TaskList({ filter }) {
  const { tasks, toggleTask, deleteTask, setTasks } = useTasks();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'Completed': return tasks.filter(t => t.completed);
      case 'Pending': return tasks.filter(t => !t.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updated = Array.from(tasks);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setTasks(updated);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasklist">
        {(provided) => (
          <ul
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <AnimatePresence>
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <motion.li
                      className={`task-item ${task.completed ? 'done' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="task-left">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        <span>{task.text}</span>
                      </div>
                      <button onClick={() => deleteTask(task.id)}>🗑</button>
                    </motion.li>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
