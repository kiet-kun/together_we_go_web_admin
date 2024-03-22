import {
    useRoutes
} from 'react-router-dom';
import UserPage from "../pages/dashboard/user";
import LoginPage from "../pages/auth/login";
import HomePage from "../pages/dashboard/home";


export const AppRoutes = () => {
    let element = useRoutes([
        {path: '/dang-nhap', element: <LoginPage />},
        {path: '/trang-chu', element: <HomePage />},
        {path: '/quan-ly-nguoi-dung', element: <UserPage />},
    ]);
    
    return <>{element}

    </>;
}