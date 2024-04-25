// boostrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
// date picker css
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { initTheme, THEME, toggleTheme, setTheme, resetTheme } from './utils/theme'
import { AppRoutes } from './routes/route';
// change language
import './utils/i18n';
// notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// redux - state management
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store.js'
import { Suspense } from "react";

function App() {
  return (
    <>
     <Suspense>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <AppRoutes></AppRoutes>
        </PersistGate>
      </Provider>
      </Suspense>
    </>
  );
}

export default App;