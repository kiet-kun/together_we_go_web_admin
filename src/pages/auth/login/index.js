import './login.css'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("/trang-chu");
    }
    return (
        <div class="login-page">
            <form class="container form-control login-form" onSubmit={handleLogin}>
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