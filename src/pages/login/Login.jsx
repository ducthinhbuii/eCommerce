import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { postDataToAPI } from '../../ultis/postApi'
import { fetchDataFromAPI } from '../../ultis/api'
import {useSelector, useDispatch } from 'react-redux';
import { authSlice, fetchUserInfo, loginUser } from './loginSlice'
import Spinner from '../../components/spinner/Spinner'

import axios from 'axios'
import { getCartByUserId } from '../home/addSlice'
import { IDX_BE_URL } from '../../ultis/setting'


export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataRaw = new FormData(e.currentTarget);
        const userData = {
            username: dataRaw.get('username'),
            password: dataRaw.get('password')
        }
        
        try {
            const result = await dispatch(loginUser(userData)).unwrap();
            if (result?.id) {
                dispatch(getCartByUserId(result.id));
            }
            navigate("/");
        } catch (err) {
            console.log("Đăng nhập lỗi: ", err);
        }
    }

    const handleGoogleLogin = async() => {
        console.log('login google')
        document.location = IDX_BE_URL + "/api/user/login-google"; 
    }

    return (
        loading ? <Spinner isLogin={true}/> :
        !loading &&
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
                            {error && <p style={{ color: 'red' }}>{error }</p>}
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
