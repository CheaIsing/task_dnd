import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

// Column Component
const Column = ({ title, status, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  
  const tasksInColumn = tasks.filter(task => task.status === status);
  
  // Determine badge class based on status
  const getBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'bg-danger';
      case 'in_progress': return 'bg-warning';
      case 'completed': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <h5>{title}</h5>
        <span className={`badge-count ${getBadgeClass(status)}`}>
          {tasksInColumn.length}
        </span>
      </div>
      
      <div ref={setNodeRef} style={{ minHeight: '200px' }}>
        <SortableContext items={tasksInColumn.map(t => t._id)} strategy={verticalListSortingStrategy}>
          {tasksInColumn.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;