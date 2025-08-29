import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@vibe-kanban/ui-kit/styles';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);