import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { postDataToAPI } from '../../ultis/postApi'
import { fetchDataFromAPI } from '../../ultis/api'
import {useSelector, useDispatch } from 'react-redux';
import { authSlice } from './loginSlice'
import Spinner from '../../components/spinner/Spinner'
import { IDX_BE_URL } from '../../ultis/setting'

import axios from 'axios'


export const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errLogin, setErrLogin] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatchUserInfo();
        console.log("render")
    }, [jwt])


    const dispatchUserInfo = async () => {
        // const data = await fetchDataFromAPI("/api/order/", jwt)
        // console.log(data)
        if (jwt) {
            try {
                const userInfo = await fetchDataFromAPI("/api/user/me", jwt);
                dispatch(authSlice.actions.saveUserLogin(userInfo));
                console.log(userInfo);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const {data} = await axios.get(
                    IDX_BE_URL + "/api/user/google/me",
                    {
                        withCredentials: true
                    }
                )
                console.log(data)
                if(data.id){
                    dispatch(authSlice.actions.saveUserLogin(data))
                }
            } catch (error) {
                console.log(error)
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
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                dispatch(authSlice.actions.saveUserLogin(userInfo))
                navigate(-1);
                console.log(userInfo)
                setErrLogin(false)
            } else {
                setErrLogin(true);
            } 
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const handleGoogleLogin = async() => {
        console.log('login google')
        try {
            const data = await axios.get(
                IDX_BE_URL + "/api/user/login-google",
                {
                    withCredentials: true
                }
            )
            console.log(data)
            // if(response.redirected){
            //     document.location = response.url

            // }
        } catch (error) {
            console.log(error);
            document.location = IDX_BE_URL + "/api/user/login-google";
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
                            {errLogin && <p style={{color: 'red'}}>Username or password incorrect</p>}
                        </form>
                        <div className="login-oauth2">
                            <span>OR LOGIN WITH</span>
                            <span className="login-oauth2-google" onClick={handleGoogleLogin}>
                                <i class="fa-brands fa-google icon-google"></i>
                            </span>
                        </div>
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
