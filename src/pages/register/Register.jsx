import React from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const navigate = useNavigate();

    return (
        <div className='login'>
            <div class="container">
                <div class="login-container">
                    {/* <div class="circle circle-one"></div> */}
                    <div class="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
                        <h1 class="opacity">REGISTER</h1>
                        {/* <div th:if="${param.logout}">
                            <p style="color: green">You have been logged out    </p>
                        </div> */}
                        <form action="#" method="post">
                            <input type="text" placeholder="First Name" name="firstName" />
                            <input type="text" placeholder="Last Name" name="lastName" />
                            <input type="email" placeholder="Username" name="username"/>
                            <input type="email" placeholder="Email" name="email"/>
                            <input type="password" placeholder="Password" name="password" />
                            <input type="password" placeholder="Repeat your password" name="rePassword" />
                            <button type="submit" class="opacity">SUBMIT</button>
                        </form>
                        {/* <div th:if="${param.error}">
                            <p style="color: red">Invalid Username or Password</p>
                        </div> */}
                        <div class="register-forget opacity">
                            <a onClick={() => navigate('/login')} className='register' href="">LOGIN</a>
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
