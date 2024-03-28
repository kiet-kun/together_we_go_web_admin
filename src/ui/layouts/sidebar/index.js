import { PAGE_NAME } from '../../../constanst';
import './index.css';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    const menuItem=[
        {
            path:"/trang-chu",
            name:"Trang chủ",
            icon:<i class="bi bi-house-door pe-none me-2" width="16" height="16"></i>
        },
        {
            path:"#",
            name:"Thống kê",
            icon:<i class="bi bi-speedometer2 pe-none me-2" width="16" height="16"></i>
        },
        {
            path: PAGE_NAME.user,
            name:"Tài khoản",
            icon:<i class="bi bi-person pe-none me-2" width="16" height="16"></i>
        },
        {
            path: PAGE_NAME.booking,
            name:"Chuyến đi",
            icon:<i class="bi bi-postcard pe-none me-2" width="16" height="16"></i>
        },
    ]

    return  <>
         <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '240px', height: '100vh'}} >
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            {/* <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg> */}
            <img class="bi pe-none me-2" width="40" height="32" 
            src="/assets/image/twg_logo.png" alt="logo" />
            <span class="fs-4" style={{fontWeight : 'bold', color: 'grey'}}>TWG Admin</span>
            </a>
            <hr></hr>
            <ul class="nav nav-pills flex-column mb-auto">
            {/* <li class="nav-item">
                <a href="/trang-chu" class="nav-link link-body-emphasis" aria-current="page">
                <i class="bi bi-house-door pe-none me-2" width="16" height="16"></i>
               
                Trang chủ
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-body-emphasis">
                <i class="bi bi-speedometer2 pe-none me-2" width="16" height="16"></i>
                
                Thống kê
                </a>
            </li>
            <li>
                <a href="/quan-ly-nguoi-dung" class="nav-link link-body-emphasis">
                <i class="bi bi-person pe-none me-2" width="16" height="16"></i>
               
                Tài khoản
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-body-emphasis">
                <i class="bi bi-postcard pe-none me-2" width="16" height="16"></i>
                
                Chuyến đi
                </a>
            </li> */}
             {
                   menuItem.map((item, index)=>(
                    //    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                    //        <div className="icon">{item.icon}</div>
                    //        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    //    </NavLink>
                    //    <NavLink to={item.path} className="nav-link link" activeClassName="active">
                 
                    //         {item.icon}      
                    //         {item.name}
                      
                    //     </NavLink>
                         <li>
                         <a href={item.path} class="nav-link link"  key={index} activeclassName="active">
                            {item.icon}      
                            {item.name}
                         </a>
                     </li>
                   ))
            }
            </ul>
           
            <hr></hr>
            <div class="dropdown">
            <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
                <strong>Kiet Nguyen</strong>
            </a>
            <ul class="dropdown-menu text-small shadow">
                <li><a class="dropdown-item" href="#">Cài đặt</a></li>
                <li><a class="dropdown-item" href="#">Thông tin cá nhân</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="/dang-nhap">Đăng xuất</a></li>
            </ul>
            </div>
        </div>
    </>
}

export default SideBar;