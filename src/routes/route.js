import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import {
    useRoutes
} from 'react-router-dom';

export const AppRoutes = () => {
    let element = useRoutes([
        {path: '/', element: <LoginPage />},
    ]);
    
    return element;
}