import React from 'react';
import { useDraggable } from '@dnd-kit/core';

// Draggable Task Card Component
const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task._id,
  });
  
  const cardStyle = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  
  // Determine card class based on status
  const getCardClass = (status) => {
    switch(status) {
      case 'pending': return 'pending-card';
      case 'in_progress': return 'progress-card';
      case 'completed': return 'completed-card';
      default: return '';
    }
  };
  
  // Determine badge class based on status
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'pending-badge';
      case 'in_progress': return 'progress-badge';
      case 'completed': return 'completed-badge';
      default: return '';
    }
  };
  
  // Determine badge class based on priority
  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'high': return 'high-priority';
      case 'medium': return 'medium-priority';
      case 'low': return 'low-priority';
      default: return '';
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes}
      className={`task-card ${getCardClass(task.status)}`}
      style={cardStyle}
    >
      <div className="task-menu">
        <div className="dropdown">
          <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Edit</a></li>
            <li><a className="dropdown-item" href="#">Delete</a></li>
            <li><a className="dropdown-item" href="#">View Details</a></li>
          </ul>
        </div>
      </div>
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-badges">
        <span className={`status-badge ${getStatusBadgeClass(task.status)}`}>
          {task.status.toUpperCase().replace('_', ' ')}
        </span>
        <span className={`priority-badge ${getPriorityBadgeClass(task.priority)}`}>
          {task.priority.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;