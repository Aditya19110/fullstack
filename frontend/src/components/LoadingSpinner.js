import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClass = size === 'lg' ? 'spinner-border-lg' : '';
  
  return (
    <div className="loading-container">
      <div className="text-center">
        <div className={`spinner-border text-primary ${sizeClass}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {message && <p className="mt-2 text-muted">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;