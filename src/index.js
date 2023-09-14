import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './pages/auth/login/index';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { initTheme, THEME, toggleTheme, setTheme, resetTheme  } from './utils/theme'

initTheme()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <LoginPage/> 
  </React.StrictMode>
);

