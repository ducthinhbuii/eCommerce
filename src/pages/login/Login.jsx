import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { postDataToAPI } from '../../ultis/postApi'
import { fetchDataFromAPI } from '../../ultis/api'
import {useSelector, useDispatch } from 'react-redux';
import {saveUserLogin } from '../../redux/actions';
import Spinner from '../../components/spinner/Spinner'

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatchUserInfo();
        console.log("render")
    }, [jwt])

    const dispatchUserInfo = async () => {
        if (jwt) {
            try {
                const userInfo = await fetchDataFromAPI("/api/user/me", jwt);
                dispatch(saveUserLogin(userInfo));
                console.log(userInfo);
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const dataRaw = new FormData(e.currentTarget);
        const userData = {
            username: dataRaw.get('username'),
            password: dataRaw.get('password')
        }
        
        try {
            const data = await postDataToAPI("/api/user/login", userData);
            setIsLoading(false)
            console.log(data)
            if(data?.authenticated){
                localStorage.setItem("jwt", data.token);
                
                const userInfo = await fetchDataFromAPI("/api/user/me", data.token);
                dispatch(saveUserLogin(userInfo))
                navigate(-1);
                console.log(userInfo)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        isLoading ? <Spinner isLogin={true}/> :
        !isLoading &&
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
