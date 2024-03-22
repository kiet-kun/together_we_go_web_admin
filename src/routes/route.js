import {
    useRoutes
} from 'react-router-dom';
import UserPage from "../pages/dashboard/user";
import LoginPage from "../pages/auth/login";
import HomePage from "../pages/dashboard/home";
import React, { useEffect, useState } from "react"
import NotiToast from '../components/noti_toast';
import { PAGE_NAME } from '../constanst';
import { useNavigate } from "react-router-dom";

export const AppRoutes = () => {
    const [isShowToast, setIsShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState('');
    const [typeToast, setTypeToast] = useState('');

    const showToast = (message, type) => {
        setMessageToast(message);
        setTypeToast(type);
        setIsShowToast(true);
        setTimeout(() => {
          setIsShowToast(false);
        }, 3000); // Hide the toast after 3 seconds
      };
    const navigate = useNavigate();

    let element = useRoutes([
        {path: PAGE_NAME.login, element: <LoginPage showToast={showToast} navigate={navigate} />},
        {path: PAGE_NAME.home, element: <HomePage  showToast={showToast} navigate={navigate}/>},
        {path: PAGE_NAME.user, element: <UserPage showToast={showToast} navigate={navigate}/>},
    ]);

    return <>
            {element}
            {isShowToast && <NotiToast message={messageToast} type={typeToast}></NotiToast>}
    </>;
}