import React from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { postDataToAPI } from '../../ultis/postApi'
import {useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataRaw = new FormData(e.currentTarget);
        const userData = {
            username: dataRaw.get('username'),
            password: dataRaw.get('password')
        }
        
        console.log(userData)
        try {
            const data = await postDataToAPI("/api/user/login", userData);
            if(data?.authenticated){
                localStorage.setItem("jwt", data.token);
                
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login'>
            <div class="container">
                <div class="login-container">
                    {/* <div class="circle circle-one"></div> */}
                    <div class="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
                        <h1 class="opacity">LOGIN</h1>
                        {/* <div th:if="${param.logout}">
                            <p style="color: green">You have been logged out    </p>
                        </div> */}
                        <form onSubmit={handleSubmit} action="#" method="post">
                            <input type="text" placeholder="USERNAME" name="username"/>
                            <input type="password" placeholder="PASSWORD" name="password" />
                            <button type="submit" class="opacity">SUBMIT</button>
                        </form>
                        {/* <div th:if="${param.error}">
                            <p style="color: red">Invalid Username or Password</p>
                        </div> */}
                        <div class="register-forget opacity">
                            <a onClick={() => navigate('/register')} className='register' href="">REGISTER</a>
                            <a className='forget' href="">FORGOT PASSWORD</a>
                        </div>
                    </div>
                    {/* <div class="circle circle-two"></div> */}
                </div>
                <div class="theme-btn-container"></div>
            </div>
        </div>
    )
}
