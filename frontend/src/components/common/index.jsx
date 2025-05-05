import React from 'react';

// Loading Spinner Component
export const LoadingSpinner = () => (
  <div className="d-flex justify-content-center my-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Error Message Component
export const ErrorMessage = ({ message }) => (
  <div className="alert alert-danger my-3" role="alert">
    <strong>Error:</strong> {message}
  </div>
);

// Button with loading state
export const LoadingButton = ({ isLoading, loadingText, text, onClick, className = "btn btn-primary" }) => (
  <button className={className} onClick={onClick} disabled={isLoading}>
    {isLoading ? (
      <>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {loadingText || 'Loading...'}
      </>
    ) : (
      text
    )}
  </button>
);

// Refresh Button Component
export const RefreshButton = ({ onClick, isLoading }) => (
  <button className="btn btn-outline-secondary me-2" onClick={onClick} disabled={isLoading}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
    </svg>
    {isLoading ? ' Loading...' : ' Refresh'}
  </button>
);

// Add Button Component
export const AddButton = ({ onClick, text = "Add New" }) => (
  <button className="btn btn-primary" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg me-1" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
    </svg>
    {text}
  </button>
);