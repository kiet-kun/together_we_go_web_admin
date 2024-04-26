import { PAGE_NAME } from '@/constanst';
import './index.css';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

const menuItem = [
    {
        path: PAGE_NAME.home,
        name: "Trang chủ",
        icon: "bi-house-door"
    },
    {
        path: "#",
        name: "Thống kê",
        icon: "bi-speedometer2"
    },
    {
        path: PAGE_NAME.user,
        name: "Tài khoản",
        icon: "bi-person"
    },
    {
        path: PAGE_NAME.booking,
        name: "Chuyến đi",
        icon: "bi-postcard"
    },
]

const SideBar = () => {
    const location = useLocation()
    const currentPage = location.pathname
    const [isSmall, setIsSmall] = useState(false)

    const dispatch = useDispatch()

    // const user = useSelector((state) => state.authentication.user)
    const user = useSelector((state) => state.authentication.user)
    // const  = useSelector((state) => state.authentication.user)
    // console.log(user);

    const handleClick = () => {
        setIsSmall(!isSmall)
    }

    return <>
        {/* Normal side bar */}
        {!isSmall && <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
            style={{ width: '240px', height: '100vh' }} >
            <a
                onClick={handleClick}
                href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">

                <img class="bi pe-none me-2" width="40" height="32"
                    src="/assets/image/twg_logo.png" alt="logo" />
                <span class="fs-4" style={{ fontWeight: 'bold', color: 'grey' }}>TWG Admin</span>
            </a>
            <hr></hr>
            <ul class="nav nav-pills flex-column mb-auto">

                {
                    menuItem.map((item, index) => (

                        <li>
                            <a href={item.path}
                                class={`nav-link   ${(item.path == currentPage) ? "active" : "link-body-emphasis"}`}
                                key={index}>

                                <i class={`bi ${item.icon} pe-none me-2`} width="16" height="16"></i>
                                {item.name}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <hr></hr>
            <div class="dropdown">
                <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={user.avatarUrl} alt="" width="32" height="32" class="rounded-circle me-2" />
                    <strong>{user.name}</strong>
                </a>
                <ul class="dropdown-menu text-small shadow">
                    <li><a class="dropdown-item" href="#">Cài đặt</a></li>
                    <li><a class="dropdown-item" href="#">Thông tin cá nhân</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="/dang-nhap">Đăng xuất</a></li>
                </ul>
            </div>
        </div>
        }
        {/* Small side bar */}
        {isSmall &&
            <div class="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: '4.5rem' }}>
                <a
                    onClick={handleClick}
                    href="#" class="d-block p-3 link-body-emphasis text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
                    <img class="bi pe-none me-2" width="40" height="32"
                        src="/assets/image/twg_logo.png" alt="logo" />

                    <span class="visually-hidden">Icon-only</span>
                </a>
                <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
                    {
                        menuItem.map((item, index) => (
                            <li>
                                <a href={item.path}
                                    title={item.name}
                                    class={`nav-link  py-3 border-bottom rounded-0 ${(item.path == currentPage) ? "active" : ""}`}
                                    key={index}>
                                    <i class={`bi ${item.icon} pe-none`} width="24" height="24"></i>
                                </a>
                            </li>
                        ))
                    }
                </ul>
                <div class="dropdown border-top">
                    <a href="#" class="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user.avatarUrl} alt="" width="32" height="32" class="rounded-circle me-2" />
                    </a>
                    <ul class="dropdown-menu text-small shadow">
                        <li><a class="dropdown-item" href="#">Cài đặt</a></li>
                        <li><a class="dropdown-item" href="#">Thông tin các nhân</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>}
    </>
}

export default SideBar;