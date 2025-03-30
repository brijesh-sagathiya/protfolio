import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App.tsx';
import ErrorFallback from './components/common/ErrorFallback';
import './index.css';
import { injectThemeVariables } from './utils/theme';

// Initialize theme variables
injectThemeVariables();

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Report web vitals
  import('web-vitals').then(vitals => {
    vitals.onCLS(console.warn);
    vitals.onFID(console.warn);
    vitals.onFCP(console.warn);
    vitals.onLCP(console.warn);
    vitals.onTTFB(console.warn);
  });
}

// Create root and render app
const root = createRoot(document.getElementById('root')!);
root.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
);
