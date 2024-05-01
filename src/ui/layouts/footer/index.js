const LayoutFooter = () => {
    return  <>
    <div class=" px-5">

  <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
    <div class="col mb-3">
      <a href="/" class="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
        <img class="bi pe-none me-2" width="40" height="32" 
            src="/assets/image/twg_logo.png" alt="logo" />
      </a>
      <p class="text-body-secondary">&copy; 2024</p>
    </div>

    <div class="col mb-3">

    </div>

    <div class="col mb-3">
      <h5>Thành viên</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Lê Minh Quân</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Nguyễn Hoàng Kiệt</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Địa chỉ</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Đại học CNNT ĐHQG-HCM, Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh.</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Liên lạc</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Facebook.com</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Github.com</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Email</a></li>
      </ul>
    </div>
  </footer>
    </div>

    </>
}

export default LayoutFooter;