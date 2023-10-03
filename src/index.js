import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import { initTheme, THEME, toggleTheme, setTheme, resetTheme  } from './utils/theme'
import { AppRoutes } from './routes/route';
import { BrowserRouter } from 'react-router-dom';

initTheme()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>  
  </React.StrictMode>
);

