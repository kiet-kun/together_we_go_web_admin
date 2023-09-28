import { Routes, Route } from "react-router-dom";
import {
    useRoutes
} from 'react-router-dom';
import UserPage from "../pages/home/user";
import LoginPage from "../pages/auth/login";

export const AppRoutes = () => {
    let element = useRoutes([
        {path: '/', element: <LoginPage />},
        {path: '/home/user', element: <UserPage />},
    ]);
    
    return element;
}