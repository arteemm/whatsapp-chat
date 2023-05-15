import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import cl from '../errorhandler.module.scss';

const ErrorFallback: React.ComponentType<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="container">
      <div className={cl.alert}>
        <h2>errors.text</h2>
        <p>errors.head: ${error.message}</p>
        <button className="btn color-button" onClick={resetErrorBoundary}>
          errors.again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
