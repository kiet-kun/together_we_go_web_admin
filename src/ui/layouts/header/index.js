import './header.css';

const LayoutHeader = () => {
    return ( 
        <nav class="navbar navbar-expand-lg bg-body-tertiary header">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">TogotherWeGo Admin</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/trang-chu">Trang chủ</a>
              </li>
        
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Quản lý
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/trang-chu/quan-ly-nguoi-dung">Tài khoản</a></li>
                  <li><a class="dropdown-item" href="/trang-chu/quan-ly-nguoi-dung">Chuyến đi</a></li>
                  <li><a class="dropdown-item" href="/trang-chu/quan-ly-nguoi-dung">Apply</a></li>
                  <li><a class="dropdown-item" href="/trang-chu/quan-ly-nguoi-dung">Thông báo</a></li>
                  <li><a class="dropdown-item" href="/trang-chu/quan-ly-nguoi-dung">Tin nhắn</a></li>
                  <li><a class="dropdown-item" href="/trang-chu/quan-ly-nguoi-dung">Đánh giá</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="/dang-nhap">Đăng xuất</a></li>
                </ul>
              </li>
            </ul>
          
          </div>
        </div>
        </nav>
    )
}

export default LayoutHeader;