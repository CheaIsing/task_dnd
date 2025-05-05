import React from 'react'

const Task = () => {
  return (
    <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center">
      <h1 className="mb-4">Task Manager</h1>
      <button className="btn btn-primary">Add New Task</button>
    </div>
    
    <div className="task-board">
      {/* <!-- Pending Column --> */}
      <div className="column">
        <div className="column-header">
          <h5>Pending</h5>
          <span className="badge-count bg-danger">2</span>
        </div>
        
        {/* <!-- Task Card 1 --> */}
        <div className="task-card pending-card">
          <div className="task-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </div>
          <div className="task-title">Landing page</div>
          <div className="task-description">Home page</div>
          <div className="task-badges">
            <span className="status-badge pending-badge">PENDING</span>
            <span className="priority-badge medium-priority">MEDIUM</span>
          </div>
        </div>
        
        {/* <!-- Task Card 2 --> */}
        <div className="task-card pending-card">
          <div className="task-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </div>
          <div className="task-title">button</div>
          <div className="task-description">test</div>
          <div className="task-badges">
            <span className="status-badge pending-badge">PENDING</span>
            <span className="priority-badge low-priority">LOW</span>
          </div>
        </div>
      </div>
      
      {/* <!-- In Progress Column --> */}
      <div className="column">
        <div className="column-header">
          <h5>In_progress</h5>
          <span className="badge-count bg-warning">1</span>
        </div>
        
        {/* <!-- Task Card --> */}
        <div className="task-card progress-card">
          <div className="task-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </div>
          <div className="task-title">Sidebar component</div>
          <div className="task-description">test</div>
          <div className="task-badges">
            <span className="status-badge progress-badge">IN PROGRESS</span>
            <span className="priority-badge high-priority">HIGH</span>
          </div>
        </div>
      </div>
      
      {/* <!-- Completed Column --> */}
      <div className="column">
        <div className="column-header">
          <h5>Completed</h5>
          <span className="badge-count bg-success">1</span>
        </div>
        
        {/* <!-- Task Card --> */}
        <div className="task-card completed-card">
          <div className="task-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </div>
          <div className="task-title">Dashboard Page</div>
          <div className="task-description">test</div>
          <div className="task-badges">
            <span className="status-badge completed-badge">COMPLETED</span>
            <span className="priority-badge high-priority">HIGH</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Task