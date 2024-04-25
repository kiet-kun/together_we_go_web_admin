import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// boostrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
// date picker css
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { initTheme, THEME, toggleTheme, setTheme, resetTheme  } from './utils/theme'
import { AppRoutes } from './routes/route';
import { BrowserRouter } from 'react-router-dom';
// change language
import './utils/i18n';
// notification
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

initTheme()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>  
  </React.StrictMode>
);

