import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Admin from './pages/admin';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Admin />
  </React.StrictMode>
);
