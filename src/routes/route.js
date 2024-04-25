import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { PAGE_NAME } from '../constanst';
// PAGE
import BookingPage from '../ui/pages/dashboard/booking';
import UserPage from "../ui/pages/dashboard/user";
import LoginPage from "../ui/pages/auth/login";
import HomePage from "../ui/pages/dashboard/home";

export const AppRoutes = () => {
  return <>
    <Router>
      <Routes>
        <Route path={PAGE_NAME.login} element={<LoginPage />}/>
        <Route path={PAGE_NAME.home} element={<HomePage />}/>
        <Route path={PAGE_NAME.user} element={<UserPage />} /> 
        <Route path={PAGE_NAME.booking} element={<BookingPage />}/>     
      </Routes>
    </Router>
  </>;
}