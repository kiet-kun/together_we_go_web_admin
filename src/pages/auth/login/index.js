import './index.css'

const LoginPage = () => {
    return (
        <div class="page">
            <form class="container form-control login-form">
                <h3 class="title" >Trang đăng nhập</h3>
                <div class="">
                    <label for="staticEmail2" >Email</label>
                    <input type="text" class="form-control" id="staticEmail2" placeholder="Email"/>
                </div>
                <div class="">
                    <label for="inputPassword2" >Mật khẩu</label>
                    <input type="password" class="form-control" id="inputPassword2" placeholder="Mật khẩu"/>
                </div>
                <button type="submit" class="btn btn-primary">Đăng nhập</button>
                <button type="submit" class="btn btn-secondary">Đăng kí</button>
            </form> 
        </div>
    );
}

export default LoginPage