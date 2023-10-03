import './login.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    
        console.log('value is:', event.target.value);
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    
        console.log('value is:', event.target.value);
    };

    async function handleLogin() {
        console.log(email);
        console.log(password);
    
        const response = await axios.post(
            `${process.env.REACT_APP_API_LINK}/auth/login`,
            // '{\n  "email": "string",\n  "password": "string"\n}',
            {
              'email': 'email',
              'password': 'email'
            },
            {
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          );

        console.log(response);
        // navigate("/trang-chu");
    }

    return (
        <div class="login-page">
            <form class="container form-control login-form" >
                <h3 class="title" >Trang đăng nhập</h3>
                <div class="">
                    <label for="staticEmail2" >Email</label>
                    <input type="text" class="form-control" id="staticEmail2" placeholder="Email" onChange={handleChangeEmail}/>
                </div>
                <div class="">
                    <label for="inputPassword2" >Mật khẩu</label>
                    <input type="password" class="form-control" id="inputPassword2" placeholder="Mật khẩu" onChange={handleChangePassword}/>
                </div>
                <button type="" class="btn btn-primary" onClick={handleLogin}>Đăng nhập</button>
                <button type="" class="btn btn-secondary">Đăng kí</button>
                <div class="spinner-border text-primary" role="status" style={{margin: 'auto'}}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </form>   
        </div>
    );
}

export default LoginPage