import React from 'react';
import ReactDOM from "react-dom/client";
import './style/app.css';
import './style/index.css';
import App from './pages/App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
