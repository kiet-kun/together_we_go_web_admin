import {
    useRoutes
} from 'react-router-dom';

import React, { useEffect, useState } from "react"
import NotiToast from '../ui/components/noti_toast';
import { PAGE_NAME, TOAST_TYPE } from '../constanst';
import { useNavigate } from "react-router-dom";
// PAGE
import BookingPage from '../ui/pages/dashboard/booking';
import UserPage from "../ui/pages/dashboard/user";
import LoginPage from "../ui/pages/auth/login";
import HomePage from "../ui/pages/dashboard/home";
import { ToastContainer, toast } from 'react-toastify';

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
    
    const handleClipBoard = (content) =>{
      navigator.clipboard.writeText(content);
      showToast('Đã copy', TOAST_TYPE.success);
    }

    const handleNavigation = (page_name) => {
      navigate(page_name);
    }

    let _appState = {
      showToast,
      handleClipBoard,
      handleNavigation,
    }

    let element = useRoutes([
        {path: PAGE_NAME.login, element: <LoginPage appState={_appState} />},
        {path: PAGE_NAME.home, element: <HomePage  appState={_appState}/>},
        {path: PAGE_NAME.user, element: <UserPage appState={_appState}/>},
        {path: PAGE_NAME.booking, element: <BookingPage appState={_appState}/>},
    ]);

    return <>
          <div>
         <ToastContainer />
            {element}
            {isShowToast && <NotiToast message={messageToast} type={typeToast}></NotiToast>}
            </div>
    </>;
}