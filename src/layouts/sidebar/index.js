const SideBar = () => {
    return  <>
         <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '280px', height: '100vh'}} >
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            {/* <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg> */}
            <img class="bi pe-none me-2" width="40" height="32" 
            src="/assets/image/twg_logo.png" alt="logo" />
            <span class="fs-4">TWG Admin</span>
            </a>
            <hr></hr>
            <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="/trang-chu" class="nav-link active" aria-current="page">
                <i class="bi bi-house-door pe-none me-2" width="16" height="16"></i>
                {/* <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"/></svg> */}
                Trang chủ
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-body-emphasis">
                <i class="bi bi-speedometer2 pe-none me-2" width="16" height="16"></i>
                {/* <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg> */}
                Thống kê
                </a>
            </li>
            <li>
                <a href="/quan-ly-nguoi-dung" class="nav-link link-body-emphasis">
                <i class="bi bi-person pe-none me-2" width="16" height="16"></i>
                {/* <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"/></svg> */}
                Tài khoản
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-body-emphasis">
                <i class="bi bi-postcard pe-none me-2" width="16" height="16"></i>
                {/* <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg> */}
                Chuyến đi
                </a>
            </li>
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