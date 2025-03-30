import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
    <h2 className="mb-4 text-2xl font-bold text-red-500">Something went wrong</h2>
    <p className="mb-4 text-gray-600">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
);

export default ErrorFallback;
