// import React, { useEffect, useState } from 'react';
// import { DndContext, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { create } from 'zustand';

// // Define our Zustand store
// const useTaskStore = create((set) => ({
//   // Initial empty tasks array
//   tasks: [],
//   isLoading: false,
//   error: null,

//   // Set loading state
//   setLoading: (isLoading) => set({ isLoading }),

//   // Set error state
//   setError: (error) => set({ error }),

//   // Set tasks from API
//   setTasks: (tasks) => set({ tasks }),

//   // Actions to update tasks
//   updateTaskStatus: (id, newStatus) =>
//     set((state) => ({
//       tasks: state.tasks.map(task =>
//         task._id === id ? { ...task, status: newStatus } : task
//       )
//     })),

//   addTask: async (task) => {
//     set((state) => ({ isLoading: true }));

//     try {
//       // API call to add a new task
//       const response = await fetch('http://localhost:3000/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(task),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add task');
//       }

//       const data = await response.json();

//       // Add the new task to the state
//       set((state) => ({
//         tasks: [...state.tasks, data.data],
//         isLoading: false,
//       }));

//       return { success: true };
//     } catch (error) {
//       console.error('Error adding task:', error);
//       set((state) => ({
//         error: error.message,
//         isLoading: false
//       }));

//       return { success: false, error: error.message };
//     }
//   },

//   // Fetch tasks from API
//   fetchTasks: async () => {
//     set({ isLoading: true, error: null });

//     try {
//       // Replace this URL with your actual API endpoint
//       const response = await fetch('http://localhost:3000/api/tasks');

//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }

//       const data = await response.json();
//       const dataR = data.data;
//       set({ tasks: dataR, isLoading: false });
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       set({ error: error.message, isLoading: false });

//       // Fallback to sample data if API fails
//       set({
//         tasks: [
//           { _id: '1', title: 'Landing page', description: 'Home page', status: 'pending', priority: 'medium' },
//           { _id: '2', title: 'Button', description: 'test', status: 'pending', priority: 'low' },
//           { _id: '3', title: 'Sidebar component', description: 'test', status: 'in_progress', priority: 'high' },
//           { _id: '4', title: 'Dashboard Page', description: 'test', status: 'completed', priority: 'high' },
//         ]
//       });
//     }
//   }
// }));

// // Add Task Modal Component
// const AddTaskModal = ({ show, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     status: 'pending',
//     priority: 'medium',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   // Reset form when modal is opened or closed
//   useEffect(() => {
//     if (show) {
//       setFormData({
//         title: '',
//         description: '',
//         status: 'pending',
//         priority: 'medium',
//       });
//       setError(null);
//     }
//   }, [show]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     // Validate form
//     if (!formData.title.trim()) {
//       setError('Title is required');
//       setIsSubmitting(false);
//       return;
//     }

//     // Submit form
//     const result = await onSubmit(formData);

//     if (result.success) {
//       onClose();
//     } else {
//       setError(result.error || 'Failed to add task');
//     }

//     setIsSubmitting(false);
//   };

//   if (!show) return null;

//   return (
//     <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Add New Task</h5>
//             <button type="button" className="btn-close" onClick={onClose} disabled={isSubmitting}></button>
//           </div>
//           <div className="modal-body">
//             {error && (
//               <div className="alert alert-danger" role="alert">
//                 {error}
//               </div>
//             )}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="title" className="form-label">Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">Description</label>
//                 <textarea
//                   className="form-control"
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="3"
//                 ></textarea>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="status" className="form-label">Status</label>
//                 <select
//                   className="form-select"
//                   id="status"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="in_progress">In Progress</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="priority" className="form-label">Priority</label>
//                 <select
//                   className="form-select"
//                   id="priority"
//                   name="priority"
//                   value={formData.priority}
//                   onChange={handleChange}
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                   {isSubmitting ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Saving...
//                     </>
//                   ) : (
//                     'Save Task'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       {/* <div className="modal-backdrop fade show"></div> */}
//     </div>
//   );
// };

// // Draggable Task Card Component
// const TaskCard = ({ task }) => {
//   const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
//     id: task._id,
//   });

//   const cardStyle = {
//     opacity: isDragging ? 0.5 : 1,
//     cursor: isDragging ? 'grabbing' : 'grab',
//   };

//   // Determine card class based on status
//   const getCardClass = (status) => {
//     switch(status) {
//       case 'pending': return 'pending-card';
//       case 'in_progress': return 'progress-card';
//       case 'completed': return 'completed-card';
//       default: return '';
//     }
//   };

//   // Determine badge class based on status
//   const getStatusBadgeClass = (status) => {
//     switch(status) {
//       case 'pending': return 'pending-badge';
//       case 'in_progress': return 'progress-badge';
//       case 'completed': return 'completed-badge';
//       default: return '';
//     }
//   };

//   // Determine badge class based on priority
//   const getPriorityBadgeClass = (priority) => {
//     switch(priority) {
//       case 'high': return 'high-priority';
//       case 'medium': return 'medium-priority';
//       case 'low': return 'low-priority';
//       default: return '';
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className={`task-card ${getCardClass(task.status)}`}
//       style={cardStyle}
//     >
//       <div className="task-menu">
//         <div className="dropdown">
//           <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
//               <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
//             </svg>
//           </button>
//           <ul className="dropdown-menu">
//             <li><a className="dropdown-item" href="#">Edit</a></li>
//             <li><a className="dropdown-item" href="#">Delete</a></li>
//             <li><a className="dropdown-item" href="#">View Details</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="task-title">{task.title}</div>
//       <div className="task-description">{task.description}</div>
//       <div className="task-badges">
//         <span className={`status-badge ${getStatusBadgeClass(task.status)}`}>
//           {task.status.toUpperCase().replace('_', ' ')}
//         </span>
//         <span className={`priority-badge ${getPriorityBadgeClass(task.priority)}`}>
//           {task.priority.toUpperCase()}
//         </span>
//       </div>
//     </div>
//   );
// };

// // Column Component
// const Column = ({ title, status, tasks }) => {
//   const { setNodeRef } = useDroppable({
//     id: status,
//   });

//   const tasksInColumn = tasks.filter(task => task.status === status);

//   // Determine badge class based on status
//   const getBadgeClass = (status) => {
//     switch(status) {
//       case 'pending': return 'bg-danger';
//       case 'in_progress': return 'bg-warning';
//       case 'completed': return 'bg-success';
//       default: return 'bg-secondary';
//     }
//   };

//   return (
//     <div className="column">
//       <div className="column-header">
//         <h5>{title}</h5>
//         <span className={`badge-count ${getBadgeClass(status)}`}>
//           {tasksInColumn.length}
//         </span>
//       </div>

//       <div ref={setNodeRef} style={{ minHeight: '200px' }}>
//         <SortableContext items={tasksInColumn.map(t => t._id)} strategy={verticalListSortingStrategy}>
//           {tasksInColumn.map(task => (
//             <TaskCard key={task._id} task={task} />
//           ))}
//         </SortableContext>
//       </div>
//     </div>
//   );
// };

// // Loading Spinner Component
// const LoadingSpinner = () => (
//   <div className="d-flex justify-content-center my-5">
//     <div className="spinner-border text-primary" role="status">
//       <span className="visually-hidden">Loading...</span>
//     </div>
//   </div>
// );

// // Error Message Component
// const ErrorMessage = ({ message }) => (
//   <div className="alert alert-danger my-3" role="alert">
//     <strong>Error:</strong> {message}
//   </div>
// );

// // Task Manager Component
// const TaskManager = () => {
//   const { tasks, isLoading, error, fetchTasks, updateTaskStatus, addTask } = useTaskStore();
//   const [showAddModal, setShowAddModal] = useState(false);

//   // Fetch tasks when component mounts
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       // Update task status when dropped in a different column
//       updateTaskStatus(active.id, over.id);
//     }
//   };

//   const handleAddTask = async (taskData) => {
//     return await addTask(taskData);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center">
//         <h1 className="mb-4">Task Manager</h1>
//         <div>
//           <button className="btn btn-outline-secondary me-2" onClick={fetchTasks}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
//               <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
//               <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
//             </svg>
//             {isLoading ? ' Loading...' : ' Refresh'}
//           </button>
//           <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg me-1" viewBox="0 0 16 16">
//               <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
//             </svg>
//             Add New Task
//           </button>
//         </div>
//       </div>

//       {error && <ErrorMessage message={error} />}

//       {isLoading && tasks.length === 0 ? (
//         <LoadingSpinner />
//       ) : (
//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <div className="task-board">
//             <Column title="Pending" status="pending" tasks={tasks} />
//             <Column title="In Progress" status="in_progress" tasks={tasks} />
//             <Column title="Completed" status="completed" tasks={tasks} />
//           </div>
//         </DndContext>
//       )}

//       <AddTaskModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={handleAddTask}
//       />
//     </div>
//   );
// };

// export default TaskManager;

import React, { useState, useEffect } from "react";
import useTaskStore from "../store/taskStore";
import { axiosInstance } from "../utils/axiosConfig";
import { showToast } from "../utils/toast";
import { EllipsisVerticalIcon } from "lucide-react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

// Our simplified Task Manager application
function TaskManager() {
  // State for tasks and UI controls

  const {
    tasks,
    isLoading,
    setTasks,
    addTask,
    updateTaskStatus,
    updateTask,
    error,
    getAllTasks,
    showUpdateModal,
    updateId,
    setShowUpdateModal,
  } = useTaskStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // Load tasks when the component first renders
  useEffect(() => {
    getAllTasks();
  }, []);

  // Function to update a task's status

  // Handler for moving tasks between columns
  const handleMoveTask = (taskId, newStatus) => {
    // Update the task's status
    updateTaskStatus(taskId, newStatus);
  };

  function handleDragEnd(e) {
    console.log(e);

    const taskId = e.active.id;

    const newStatus = e.over.id;
    if (taskId && newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mt-4">
        {/* Header section */}
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-4">Task Manager</h1>
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={getAllTasks}
            >
              {isLoading ? "Loading..." : "Refresh"}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              Add New Task
            </button>
          </div>
        </div>

        {/* Show error message if there is one */}
        {error && (
          <div className="alert alert-danger my-3" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Show loading spinner if loading and no tasks */}

        {isLoading && tasks.length === 0 ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          /* Task board with columns */
          <div className="row">
            <div className="col-md-4">
              <TaskColumn
                title="Pending"
                status="pending"
                tasks={tasks}
                onMoveTask={handleMoveTask}
              />
            </div>
            <div className="col-md-4">
              <TaskColumn
                title="In Progress"
                status="in_progress"
                tasks={tasks}
                onMoveTask={handleMoveTask}
              />
            </div>
            <div className="col-md-4">
              <TaskColumn
                title="Completed"
                status="completed"
                tasks={tasks}
                onMoveTask={handleMoveTask}
              />
            </div>
          </div>
        )}

        {/* Show Add Task Modal if requested */}
        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onSubmit={(taskData) => {
              console.log(taskData);

              addTask(taskData);
              setShowAddModal(false);
            }}
          />
        )}

        {showUpdateModal && updateId && (
          <UpdateTaskModal
            onClose={() => setShowUpdateModal(false)}
            onSubmit={(updateId, taskData) => {
              updateTask(updateId, taskData);
              setShowUpdateModal(false);
            }}
          />
        )}
      </div>
    </DndContext>
  );
}

// Task Column Component
function TaskColumn({ title, status, tasks, onMoveTask }) {
  // Filter tasks that belong to this column
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const tasksInColumn = tasks.filter((task) => task.status == status);

  // Get appropriate badge color based on status
  const getBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "danger";
      case "in_progress":
        return "warning";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div ref={setNodeRef} className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <span className={`badge bg-${getBadgeColor(status)}`}>
          {tasksInColumn.length}
        </span>
      </div>
      <div className="card-body" style={{ minHeight: "400px" }}>
        {tasksInColumn.length === 0 ? (
          <p className="text-muted text-center mt-3">No tasks in this column</p>
        ) : (
          tasksInColumn.map((task) => (
            <TaskCard key={task._id} task={task} onMoveTask={onMoveTask} />
          ))
        )}
      </div>
    </div>
  );
}

// Task Card Component
function TaskCard({ task, onMoveTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const { showUpdateModal, setShowUpdateModal, setUpdateId, deleteTask } =
    useTaskStore();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "secondary";
    }
  };
  const getStatusColor = (priority) => {
    switch (priority) {
      case "pending":
        return "danger";
      case "in_progress":
        return "warning";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  const moveTask = (newStatus) => {
    if (task.status !== newStatus) {
      onMoveTask(task._id, newStatus);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowUpdateModal(true);
    setUpdateId(task._id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteTask(task._id);
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, cursor: "grab", border: `2px solid ${getStatusColor(task.status)}` }}
      className="card mb-2 shadow-sm"
      {...listeners}
      {...attributes}
    >
      <div className="card-body">
        <div className="d-flex align-items-start justify-content-between">
          <div className="flex-grow-1">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
          </div>

          <div className="dropdown" {...Object.keys(listeners).reduce((acc, key) => {
                acc[key] = (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                };
                return acc;
              }, {})}>
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              // Prevent drag when clicking the button
              onMouseDown={(e) => e.stopPropagation()}
            >
              <EllipsisVerticalIcon />
            </button>
            <ul className="dropdown-menu" {...Object.keys(listeners).reduce((acc, key) => {
                acc[key] = (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                };
                return acc;
              }, {})}>
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleEdit}
                  
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleDelete}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className={`badge bg-${getPriorityColor(task.priority)}`}>
            {task.priority.toUpperCase()}
          </span>
          <span className={`badge bg-${getStatusColor(task.status)}`}>
            {task.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}


// Add Task Modal Component
function AddTaskModal({ onClose, onSubmit }) {
  // State for the form data

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");

  // State for form submission and errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { updateId } = useTaskStore();

  // Handle form input changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simple validation
    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    // Submit the form
    onSubmit({
      title,
      description,
      status,
      priority,
    });
    setIsSubmitting(false);
  };

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-select"
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateTaskModal({ onClose, onSubmit }) {
  // State for the form data
  const { updateId, tasks } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");

  // State for form submission and errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateTask = tasks.filter((task) => task._id == updateId)[0];

    setTitle(updateTask.title);
    setDescription(updateTask.description);
    setStatus(updateTask.status);
    setPriority(updateTask.priority);
  }, [updateId]);
  // Handle form input changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simple validation
    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    // Submit the form
    onSubmit(updateId, {
      title,
      description,
      status,
      priority,
    });
    setIsSubmitting(false);
  };

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-select"
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
