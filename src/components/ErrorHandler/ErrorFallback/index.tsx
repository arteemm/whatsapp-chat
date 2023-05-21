import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import cl from '../errorhandler.module.scss';

const ErrorFallback: React.ComponentType<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-container">
      <div className={cl.alert}>
        <h2>Что-то пошло не так</h2>
        <p>{`Ошибка: ${error.message}`}</p>
        <button className="btn color-button" onClick={resetErrorBoundary}>
          попробовать снова
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
