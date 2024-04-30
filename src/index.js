import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong. Try again later.</p>}>
    <App/>
    </ErrorBoundary>
    
  // </React.StrictMode>
);

