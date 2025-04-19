import React, { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
          <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-item ${task.completed ? 'done' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    {task.text}
                    <button onClick={() => deleteTask(task.id)}>🗑</button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}